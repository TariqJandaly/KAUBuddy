"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
import { useState } from "react"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { signIn } from "@/lib/authClient"
import { Link, useNavigate } from "@tanstack/react-router"

// ✅ Define Zod schema
const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .endsWith("@stu.kau.edu.sa", "Email must end with @stu.kau.edu.sa"),
  password: z.string().min(1, "Password is required"),
})

export const canLoginServerFunc = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {

    // Attempt to login in the server to check creds
    const user = await signIn.email({ email: data.email, password: data.password })

    if (user.error) {
      throw new Error(JSON.stringify([{ path: ["general"], message: "Invalid credentials." }]))
    }

    return { success: true, email: data.email }
  })

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [viewPassword, setViewPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      const login = await canLoginServerFunc({ data: { email, password } })

      if (login.success) {
        // Login in the client if the user exists
        await signIn.email({ email, password })
        navigate({ to: "/app" })
      }

    } catch (err: any) {
      const error = JSON.parse(err.message)
      // TanStack ServerFn will throw Zod validation errors or custom errors
      if (error) {
        // Extract Zod field errors
        const fieldErrors: Record<string, string> = {}

        for (const issue of error) {
          const path = issue.path[0]
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message
        }

        setErrors(fieldErrors)
      } else {
        setErrors({ general: "An unknown error occurred" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="student@stu.kau.edu.sa"
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={viewPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupButton
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setViewPassword(prev => !prev)}
                  >
                    {viewPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroup>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </Field>

              {errors.general && (
                <p className="text-sm text-center text-red-500">
                  {errors.general}
                </p>
              )}

              <Field>
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup" >Signup</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
