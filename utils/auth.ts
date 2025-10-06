import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, client } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      salt: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      verificationCipher: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      verificationIv: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true, 
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000", "http://playground:3000"],
  plugins: [nextCookies()],
});