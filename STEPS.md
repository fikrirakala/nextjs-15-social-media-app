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

## Update user profile

1. Setup Uploadthing

   - Create a new app
   - Copy api key to .env file
   - Set up a file router (app/api/uploadthing/core.ts, app/api/uploadthing/route.ts)
   - Create The UploadThing Components (lib/uploadthing.ts)
   - Configure tailwind.config.ts
   - Add NextSSRPlugin in the body of the root layout
   - Add image remote patterns inside next.config.js file

2. Create Validation schema

3. Create update user actions (app/main/users/username/actions.ts)

4. Create useUpdateProfileMutation hook

5. Create Edit Profile Button

6. Add Edit Profile Button to User Profile

7. Create Edit Profile Dialog component

8. Create Avatar Input component

9. Create Crop Image Dialog component

## Post Media Upload

1. Create Prisma Schema Model for Media

2. Add uploadthing attachment file route (api/uploadthing/core.ts)

3. Update createPostSchema validation

4. Update Post Editor Actions (src/components/posts/editor/actions.ts)

5. Create useMediaUpload hook

6. Update PostEditor component (PostEditor.tsx)

7. Create Add Attachments Button and add it to Post Editor component

8. Create Attachment Previews component and add it to Post Editor

9. Update getPostDataInclude (lib/types.ts)

10. Create Image Previews component and then add it to Post component

## Drag & Drop and Copy-Paste Uploads

1. Create drag & drop feature using useDropZone hook from uploadthing (PostEditor)

2. Create copy-paste feature

## Cron job delete orphaned images

1. Create vercel.json file and add crons setting

2. Add crons secret key in .env file

3. Create api route (api/clear-uploads)

## Post Detail Page

1. Create Post detail page

2. Add SuppressHydrationWarning attribute to Link Date of Post (Post.tsx)

## Likes Feature

1. Create Prisma schema model for Like feature

2. Create Like api route (api/posts/postId/likes/route.ts)

3. Create Like Button component (components/posts/LikeButton.tsx)

4. Add Like button to Post component

## Bookmarks Feature

1. Create Prisma schema model for Bookmark

2. Create Bookmark info type

3. Create Bookmark api route (api/posts/postId/bookmark/route.ts)

4. Create Bookmark button and add it to Post component

5. Create Bookmarked api route (api/posts/bookmarked/route.ts)

6. Create Bookmarks component (main/bookmarks/Bookmarks.tsx)

7. Create Bookmarks page

## Comments Feature

1. Create Prisma schema model for Comment

2. Create validation schema for creating comment

3. Update types

4. Create comments actions (/components/comments/actions.ts)

5. Create comments api route (/api/posts/postId/comments/route.ts)

6. Create Comments component (/components/comments/Comments.tsx)

7. Update Post component

8. Create comments mutation hook

## Notifications Feature

1. Create Prisma Schema Model

2. Update Likes api route (/api/posts/postId/likes/route.ts)

3. Update Followers api route (/api/users/userId/followers/route.ts)

4. Update Comments actions (components/comments/actions.ts)

5. Update types

6. Create Notifications api route (/api/notifications/route.ts)

7. Create Notifications page (/main/notifications/page.tsx)

8. Create Notifications component

9. Create Notifications Button for Menubar

## Direct Messages Chat

1. Create Stream account (getstream.io)

2. Update .env file with Stream's key and secret

3. Create Stream client (/lib/stream.ts)

4. Create a route to authenticate a user in Stream (/api/get-token/route.ts)

5. Create messages hook (/main/messages/useInitializeChatClient.ts)

6. Create Chat component (/main/messages/Chat)

7. Create Messages page and add Chat component

8. Update globals.css with Stream chat style

9. Update auth signup actions (/auth/signup/actions.ts)

10. Update Users's update server actions (/main/users/username/actions.ts)

11. Update Uploadthing core file (/api/uploadthing/core.ts)

12. Create useDebounce hook for search input (/hook/useDebounce.ts)

13. Create messages unread count api (/api/messages/unread-count/route.ts)

14. Create Messages Button and add it to Menubar

## Search Feature

1. Create Search api route

2. Create Search Results Component

3. Create Search page

4. Update next.config.js file to add hashtag link rewrite

## Deployment

1. Update package.json
