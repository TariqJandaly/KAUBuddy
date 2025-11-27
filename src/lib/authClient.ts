import { createAuthClient } from "better-auth/react"

export const { useSession, signIn, signOut, signUp, getSession } = createAuthClient({
    baseURL: "https://3000--main--kaubuddy--tariqjandaly--lrdfr2nm37s7m.pit-1.try.coder.app",
})