import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [passkeyClient()],
});
export const { signIn, signUp, useSession } = createAuthClient();
