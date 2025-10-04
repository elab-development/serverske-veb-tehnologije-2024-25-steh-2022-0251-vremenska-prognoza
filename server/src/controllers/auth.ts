import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "../db/db";
import * as schema from "../db/schema/users";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
        input: false,
        required: false,
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await sendEmail({
          to: email,
          subject: "Verify your email",
          html: `Your verification code is: ${otp}`,
        });
      },
    }),
  ],
  trustedOrigins: ["http://localhost:5173"],
});
