# 🏰 Citadel - The Password Manager

**Citadel** is a modern, secure password manager built with Next.js 15, featuring client-side encryption, passkey authentication, and a beautiful user interface. Your passwords are encrypted on your device before being stored, ensuring maximum security and privacy.

## ✨ Features

- 🔐 **End-to-End Encryption**: All vault items are encrypted client-side using AES-256-GCM encryption
- 🔑 **Passkey Support**: Modern WebAuthn-based authentication with biometric support (Face ID, Touch ID, Windows Hello)
- 🎨 **Beautiful UI**: Stunning animations with Framer Motion and Paper Design shaders
- 🌓 **Dark Mode**: Full dark mode support with seamless theme switching
- 🔒 **Password Generator**: Generate strong, customizable passwords with real-time strength indicators
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🗄️ **Vault Management**: Store and organize passwords, notes, URLs, and tags
- 🔍 **Search & Filter**: Quickly find vault items with search and tag filtering
- 🚀 **Performance**: Built with Next.js 15 and Turbopack for blazing-fast development

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Visual Effects**: [@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist Sans, Geist Mono, Outfit

### Backend & Authentication
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **WebAuthn**: [@simplewebauthn/browser](https://simplewebauthn.dev/) & [@simplewebauthn/server](https://simplewebauthn.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Session Management**: Better Auth with cookie-based sessions

### Encryption & Security
- **Encryption Algorithm**: AES-256-GCM
- **Key Derivation**: PBKDF2 with SHA-256 (100,000 iterations)
- **Client-Side Encryption**: All vault data is encrypted in the browser before transmission

### Development Tools
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linter/Formatter**: [Biome](https://biomejs.dev/)
- **Build Tool**: Turbopack (Next.js 15)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher ([Download here](https://nodejs.org/))
- **npm**, **yarn**, **pnpm**, or **bun**: Package manager of your choice
- **MongoDB**: Local instance or MongoDB Atlas account ([Get started](https://www.mongodb.com/))
- **Git**: For cloning the repository

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vashishta-Mithra-Reddy/citadel.git
cd citadel
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# Better Auth Configuration
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Optional: For production deployment
# BETTER_AUTH_URL=https://yourdomain.com
```

**Important Notes:**
- Replace `your_mongodb_connection_string` with your actual MongoDB connection string
  - Local MongoDB: `mongodb://localhost:27017/citadel`
  - MongoDB Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/citadel`
- Generate a secure random string for `BETTER_AUTH_SECRET` (32+ characters recommended)
  - You can use: `openssl rand -base64 32`

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see Citadel in action! 🎉

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
citadel/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/             # Sign-in page
│   │   └── sign-up/             # Sign-up page
│   ├── api/                     # API routes
│   ├── dashboard/               # Dashboard page
│   ├── password-generator/      # Password generator tool
│   ├── providers/               # React context providers
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── vault/                   # Vault-related components
│   ├── webauthn/                # Passkey/WebAuthn components
│   ├── Header.tsx               # Main header
│   ├── HomeClient.tsx           # Home page client component
│   └── PasswordGenerator.tsx    # Password generator component
├── lib/                         # Utility libraries
│   ├── auth-client.ts          # Better Auth client configuration
│   ├── crypto.ts               # Encryption utilities
│   ├── db.ts                   # MongoDB connection
│   └── utils.ts                # General utilities
├── types/                       # TypeScript type definitions
├── utils/                       # Server-side utilities
│   └── auth.ts                 # Better Auth server configuration
├── public/                      # Static assets
├── biome.json                  # Biome configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🧩 Component Details

### Core Components

#### 1. **Vault** (`components/vault/Vault.tsx`)
The main vault component that displays all encrypted password items.

**Features:**
- Displays encrypted vault items in a grid layout
- Search functionality to filter items
- Tag-based filtering
- Click to reveal passwords temporarily
- Edit and delete vault items
- Animated transitions

**Props:**
```typescript
interface VaultProps {
  encryptedItems: { 
    _id: string; 
    ciphertext: string; 
    iv: string 
  }[];
}
```

#### 2. **VaultItemForm** (`components/vault/VaultItemForm.tsx`)
Modal form for adding/editing vault items.

**Features:**
- Add or edit passwords, notes, URLs, and tags
- Real-time validation
- Automatic encryption before saving
- Smooth modal animations

#### 3. **UnlockVaultForm** (`components/vault/UnlockVaultForm.tsx`)
Password verification form to unlock the encrypted vault.

**Features:**
- Verifies master password
- Derives encryption key client-side
- Unlocks vault without exposing password to server
- Error handling for incorrect passwords

#### 4. **PasswordGenerator** (`components/PasswordGenerator.tsx`)
Advanced password generation tool with customization options.

**Features:**
- Adjustable password length (8-32 characters)
- Character type selection (uppercase, lowercase, numbers, symbols)
- Exclude similar characters option
- Real-time password strength indicator
- One-click copy to clipboard
- Smooth animations and visual feedback

**Password Options:**
```typescript
interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeSpecialChars: string[];
}
```

#### 5. **PassKeySetup** (`components/webauthn/PassKeySetup.tsx`)
Component for registering passkeys/WebAuthn credentials.

**Features:**
- Registers device for biometric authentication
- Auto-detects device type (browser and OS)
- Uses WebAuthn API
- Fallback to traditional password if not supported

#### 6. **PassKeyLogin** (`components/webauthn/PassKeyLogin.tsx`)
WebAuthn-based login component.

**Features:**
- Biometric authentication (Face ID, Touch ID, Windows Hello)
- Platform authenticator support
- Secure and passwordless login

#### 7. **Header** (`components/Header.tsx`)
Main navigation header.

**Features:**
- User authentication status display
- Theme switcher integration
- Responsive navigation
- Smooth animations

#### 8. **ThemeSwitcher** (`components/ThemeSwitcher.tsx`)
Dark/light mode toggle.

**Features:**
- Persistent theme preference
- System theme detection
- Smooth theme transitions

### Provider Components

#### 9. **AuthProvider** (`app/providers/AuthProvider.tsx`)
Context provider for authentication state management.

**Features:**
- Session state management
- User data access throughout the app
- Protected route handling

#### 10. **EncryptionProvider** (`app/providers/EncryptionProvider.tsx`)
Context provider for encryption key management.

**Features:**
- Manages encryption key lifecycle
- Vault lock/unlock state
- Secure key storage in memory only (never persisted)

## 🔒 Security Features

### Client-Side Encryption

All vault items are encrypted on the client side before being sent to the server:

1. **Key Derivation**: User's master password is combined with a unique salt using PBKDF2 (100,000 iterations) to derive an AES-256 key
2. **Encryption**: Vault items are encrypted using AES-256-GCM with a random IV for each item
3. **Storage**: Only the ciphertext and IV are stored in the database
4. **Decryption**: Happens client-side after successful authentication

### WebAuthn/Passkey Support

- Uses the latest WebAuthn standard (Level 2)
- Supports platform authenticators (Touch ID, Face ID, Windows Hello)
- Phishing-resistant authentication
- No password exposure during passkey authentication

### Session Management

- Secure HTTP-only cookies
- Session caching for performance (10-minute cache)
- Automatic session expiration
- CSRF protection

### Password Generation

- Cryptographically secure random number generation
- Customizable complexity
- Avoids ambiguous characters when selected
- Real-time strength assessment

## 🧪 Development Workflow

### Linting

```bash
npm run lint
```

Uses Biome for fast, modern linting and formatting.

### Formatting

```bash
npm run format
```

Automatically formats code according to Biome rules.

### Type Checking

TypeScript is configured with strict mode. Type check with:

```bash
npx tsc --noEmit
```

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy Citadel is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Vashishta-Mithra-Reddy/citadel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `MONGO_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (set to your production domain)
4. Deploy!

### Other Platforms

Citadel can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js runtime
- **Railway**: Deploy with zero configuration
- **DigitalOcean App Platform**: Full Next.js support
- **Docker**: Create a Dockerfile for containerized deployment

**Important for Passkeys**: Ensure your production domain is served over HTTPS for WebAuthn to work properly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Better Auth](https://www.better-auth.com/) - Authentication library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Vashishta-Mithra-Reddy/citadel/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Built with ❤️ by [Vashishta Mithra Reddy](https://github.com/Vashishta-Mithra-Reddy)**

**Live Demo**: [https://citadel.v19.tech](https://citadel.v19.tech)
