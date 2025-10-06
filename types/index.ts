export interface SessionData {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    expiresAt: Date;
    userId: string;
    userAgent?: string | null | undefined;
    ipAddress?: string | null | undefined;
  };
}
