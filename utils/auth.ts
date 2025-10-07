import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, client } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";

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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  relyingParty: {
    name: "Citadel",
    id:
      process.env.NODE_ENV === "development" ? "localhost" : "citadel.v19.tech",
  },
  trustedOrigins: ["http://localhost:3000", "http://playground:3000", "https://citadel.v19.tech/"],
  plugins: [passkey(), nextCookies()],
});
