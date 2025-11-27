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
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import { signUp } from "@/lib/authClient"
import { Link } from "@tanstack/react-router"

// ✅ Define Zod schema
const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .email("Invalid email address")
    .endsWith("@stu.kau.edu.sa", "Email must end with @stu.kau.edu.sa"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
})

export const signupServerFunc = createServerFn({ method: "POST" })
  .inputValidator(signupSchema)
  .handler(async ({ data }) => {

    const user = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.username,
    })

    console.log(user.error)

    if (user.error) {
      throw new Error(JSON.stringify([{ path: ["general"], message: "Failed to create account. User may already exist." }]))
    }

    return { success: true, email: data.email }
  })

// ✅ Client Component
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [viewPassword, setViewPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      await signupServerFunc({ data: { username, email, password } })
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
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

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="invct"
                  />
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </Field>

              {errors.general && (
                <p className="text-sm text-center text-red-500">
                  {errors.general}
                </p>
              )}

              <Field>
                <Button
                  className="cursor-pointer text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign up"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login" >Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}