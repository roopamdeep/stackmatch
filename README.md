# StackMatch 🚀

AI-powered hiring platform that matches developers and companies based on real tech stacks.

StackMatch eliminates the mismatch between job requirements and candidate skills by using AI to score resumes against job descriptions — giving companies ranked candidates and developers better job matches.

## Features

- 🔐 JWT Authentication from scratch
- 👥 Role-based access control (Developer vs Company)
- 📄 Resume upload and storage (AWS S3)
- 🤖 AI resume scoring against job descriptions (OpenAI)
- 📧 Automated email notifications (Resend)
- 🐳 Dockerized with CI/CD pipeline (GitHub Actions)

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

**Backend**
- Next.js API Routes
- JWT + bcrypt (auth from scratch)
- Prisma ORM
- PostgreSQL (Neon)

**Infrastructure**
- AWS S3 (resume storage)
- Vercel (hosting)
- Docker
- GitHub Actions (CI/CD)

**Services**
- OpenAI API (AI scoring)
- Resend (emails)

## Architecture

MVC pattern with clear separation:
- **Models** — Prisma schema (User, Company, Developer, Job, Application, Notification)
- **Views** — React components and pages
- **Controllers** — API routes with business logic

## Run locally

```bash
git clone https://github.com/roopamdeep/stackmatch.git
cd stackmatch
npm install
npm run dev
```

## Tests

```bash
npm test
```
13 tests passing across auth, API, and components.
