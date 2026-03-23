# JobBoard

A full-stack job board platform built with Next.js. It has two sides — a public website for job seekers and an admin panel for employers and admins.

## Tech Stack

- **Next.js 16.2** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Prisma ORM** + **PostgreSQL**
- **Auth.js** (Google & GitHub OAuth)

## Features

**For Seekers**

- Browse and search job listings
- View company profiles
- Apply to jobs with a resume and cover letter
- Track all applications and their statuses from a personal dashboard

**For Employers / Admins**

- Post and manage job listings (Draft → Active → Closed)
- Review applications and move them through the hiring pipeline
- Manage company profiles and team members
- Admin dashboard with overview stats

## Getting Started

### Prerequisites

- Node.js v22
- PostgreSQL database
- Google and GitHub OAuth app credentials

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/job-app.git
cd job-app

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Push the database schema
npx prisma db push

# 5. (Optional) Seed sample data
npx prisma db seed

# 6. Start the dev server
pnpm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."

NEXTAUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret"

GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

## Project Structure

```
app/
├── (admin)/        # Admin panel — employers & admins
│   ├── dashboard/
│   ├── jobs/
│   ├── applications/
│   └── companies/
├── (website)/      # Public site — seekers
│   ├── jobs/
│   ├── companies/
│   └── profile/
└── api/auth/       # Auth.js route handler
```

## User Roles

| Role       | Access                                              |
| ---------- | --------------------------------------------------- |
| `SEEKER`   | Public site, apply to jobs, view own applications   |
| `EMPLOYER` | Admin panel, manage own company jobs & applications |
| `ADMIN`    | Full access to everything                           |

## License

MIT
