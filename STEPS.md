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

## Creating posts (tip-tap editor)

1. Create Post prisma model

2. Create validation schema for creating Post

3. Create Post Editor component actions file

4. Add Toaster component to root layout

5. Create Post Editor component

6. Add styles.css for editor

7. Add Post Editor component to main page

## Loading posts server side

1. Create Post component

2. Render Posts on the main page

## Trending Sidebar

1. Create Trends Sidebar

2. Create WhoToFollow component

3. Create Trending Topics component

## React query setup

1. Create api routes (app/api/posts/for-you/route.ts)

2. Create React Query Provider (app/ReactQueryProvider.tsx)

3. Add React Query Provider to root layout

4. Create ForYouFeed component

5. Add ForYouFeed to main page

6. Clear query client when logout (UserButton.tsx)

## Ky Setup

1. Create ky client file (/lib/ky.ts)

2. Use inside ForYouFeed component(queryFn)

## useInfiniteQuery

1. Create route.ts (api/posts/for-you/route.ts)

2. Create infinite for you feed component

3. Create infinite scroll container component

4. Create loading skeleton

## useMutation

1. Create useSubmitPostMutation custom hook (components/posts/editor/mutations.ts)

2. Update submitPost actions to return new post (components/posts/editor/actions.ts)

3. Use mutation hook in post editor component (components/posts/editor/PostEditor.tsx)

## Deleting post

1. Create delete actions (components/posts/actions.ts)

2. Create delete post mutation (components/posts/mutations.ts)

3. Create delete post dialog (component/posts/DeletePostDialog.tsx)

4. Create post more button (component/posts/PostMoreButton.tsx)

5. Add PostMoreButton to Post component (component/posts/Post.tsx)

## Follow Feature

1. Create prisma schema data model (Follow)

2. Create follow actions

3. Create useFollowerInfo custom hook (src/useFollowerInfo.ts)

4. Create Follow Button

5. Add Follow Button to TrendSidebar

## Following Feed

1. Create api routes (api/posts/following/route.ts)

2. Create following feed component (main/FollowingFeed.tsx)

3. Create tabs in the main page

4. Add following feed and for you feed components inside the tabs

## User Profile Page

1. Create user profile page

2. Create loading page and not-fount page

3. Refactor useSubmitPostMutation

## React Linkify It

1. Install react-linkify-it

2. Create Linkify component

3. Wrap post content with linkify (Post.tsx)

4. Wrap bio with linkify (UserProfile.tsx)

## User Tooltip

1. Create UserTooltip component

2. Wrap username link inside the UserTooltip component (Post, TrendsSidebar, Linkify)

3. Create username api routes (api/users/username/[username]/route.ts)

4. Create UserLinkWithTooltip component
