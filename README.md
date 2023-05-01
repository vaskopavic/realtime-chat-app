# Realtime Messaging Chat App with Redis, TypeScript, and Tailwind CSS

This is a full-stack realtime messaging chat application that allows users to add friends and send friend requests via email. It is built with TypeScript and Tailwind CSS, and performs database queries with Redis for optimal performance. It also features Google authentication and protection of sensitive routes.

Features:

- Realtime messaging
- Adding friends and sending friend requests via email
- Performant database queries with Redis
- Responsive UI built with TailwindCSS
- Protection of sensitive routes
- Google authentication
- Built with TypeScript
- Icons from Lucide
- Class merging with tailwind-merge
- Conditional classes with clsx
- Variants with class-variance-authority

### Prerequisites

**Node version 14.x**


### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXTAUTH_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_SECRET=
```

### Start the app

```shell
npm run dev
```
