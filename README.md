# Native Kids Learning Grove

create website look alike this but for native kid academy and without the video

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://native-kids-learning-grove.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/022ae6c7-1c10-4880-b549-b5cfbb873ea7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Booking and contact

Booking buttons open WhatsApp directly. The contact number and message builders live in `src/lib/contact.ts`.
`/trial` is a contact page with no form or database calls; retired staff URLs redirect there.
No database environment variables are required. Existing Supabase data is unchanged.
