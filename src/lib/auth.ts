import { PrismaClient } from "@/generated/prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";

import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // or your SMTP provider
    port: 465,
    secure: true, // true for port 465, false for others
    auth: {
        user: process.env.SMTP_USER, // e.g. your Gmail or SMTP user
        pass: process.env.SMTP_PASS, // your app password or SMTP password
    },
});

export const auth = betterAuth({
    database: prismaAdapter(
        prisma,
        {
            provider: "postgresql"
        }
    ),
    emailAndPassword: {
        enabled: true,
        additionalUserInfo: {
            username: {
                required: true,
                unique: true,
            }
        },
        requireEmailVerification: true,
        autoSignIn: false,
        minPasswordLength: 8,
    },
    user: {
        fields: {
            "name": "username"
        }
    },
    emailVerification: {
        sendOnSignUp: true,               // send automatically on sign-up
        autoSignInAfterVerification: true, // optional
        expiresIn: 3600,                  // 1 hour expiration

        sendVerificationEmail: async ({ user, url }) => {
            const mailOptions = {
                from: `"KAUBuddy" <${process.env.SMTP_USER}>`,
                to: user.email,
                subject: "Verify your email address",
                text: `Hi ${user.name || "there"},\n\nPlease verify your email by clicking this link:\n${url}\n\nThis link will expire in 1 hour.`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.5;">
                        <h2>Welcome to KAUBuddy, ${user.name || "friend"}!</h2>
                        <p>Click the button below to verify your email address:</p>
                        <a href="${url}" 
                        style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
                            Verify Email
                        </a>
                        <p style="margin-top:10px;">Or copy and paste this link into your browser:</p>
                        <p>${url}</p>
                        <p>This link expires in 1 hour.</p>
                    </div>
                    `,
            };

            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {

            }
        }
    },
    plugins: [reactStartCookies()]
})