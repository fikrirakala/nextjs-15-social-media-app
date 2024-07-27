## Project & IDE Setup

1. Create Next.js 15 project

```
npx create-next-app@rc
```

2. Install dependencies

```
npm i lucia @lucia-auth/adapter-prisma prisma @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react --legacy-peer-deps
```

3. Install Dev dependencies

```
npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss@latest --legacy-peer-deps
```

4. Install shadcn-ui

```
npx --legacy-peer-deps shadcn-ui@latest init
```

5. Install Shadcn custom theme(global.css)

6. Install Shadcn-ui components

```
npx --legacy-peer-deps shadcn-ui@latest add button dialog dropdown-menu form input label skeleton tabs textarea toast tooltip
```

7. Install TailwindCSS IntelliSense IDE Extension

8. Configure Files:Associations setting ({items: \*.css, value: tailwindcss})

9. Configure Editor:Quick Sugestions setting (strings: on)

10. Install Prettier IDE Extension

11. Configure Editor:Default Formatter setting to Prettier

12. Create prettier.config.js file

```
module.exports = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-prisma"],
};
```

13. Customize .eslintrc.json file

```
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

14. Install Prisma Extension

15. Install prettier-plugin-prisma Dev dependencie package

16. Install ESLint Extension

17. Download images and put them in the assets folder(src/assets)

18. Customize the metadata of the root layout

19. Customize the next.config file(cache setting)

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
```

## Database Setup

1. Create Vercel Progres database

2. Setup Prisma ORM

```
npx prisma init
```

3. Copy database env.local credentials into the .env file.

```
POSTGRES_URL="*******************"
POSTGRES_PRISMA_URL="****************"
POSTGRES_URL_NO_SSL="**********************"
POSTGRES_URL_NON_POOLING="*******************"
POSTGRES_USER="**************"
POSTGRES_HOST="*********************"
POSTGRES_PASSWORD="*****************"
POSTGRES_DATABASE="***********"
```

4. Copy database configuration for Prisma into the schema.prisma file.

```
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

5. Add prefiewFeatures option into the generator client object in the schema.prisma file

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearch"]
}
```

6. Create a prisma client file inside the lib folder(prisma.ts)

## Lucia Auth Setup

1. Create Prisma schema for user and session model (schema.prisma)

```
model User {
  id           String    @id
  username     String    @unique
  displayName  String
  email        String?   @unique
  passwordHash String?
  googleId     String?   @unique
  avatarUrl    String?
  bio          String?
  sessions     Session[]

  createdAt DateTime @default(now())

  @@map("users")
}

model Session {
  id        String   @id
  userId    String
  expiresAt DateTime

  User User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

2. Create users and sessions tables in database by running the following command

```
npx prisma db push
```

3. Create auth.ts file (src/auth.ts)

4. Create validation schema for sign-up and login form (lib/validation.ts)

5. Add @node-rs/argon2 inside the next.config file

6. Create server action file for signup form (signup/actions.ts)

7. Create server action file for login form (login/actions.ts)

8. Create server action file for logout (auth/actions.ts)

9. Create Sign up page (page, signup form, loading button, password input)

10. Create Login page (page, login form)

## Navbar & Session Provider

1. Create auth layout (auth/layout.tsx)

2. Create main route groups

3. Create main layout

4. Create main session provider

5. Create Navbar (logo, user button, search)

## Dark mode

1. Create ThemeProvider

2. Create Theme toggle component

## Sidebar

1. Create Menubar component
