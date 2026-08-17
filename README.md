# Members Only

An Express application with Passport authentication, PostgreSQL-backed sessions, and member/admin access levels.

## Deploying on Coolify

Create an application from this repository and select **Dockerfile** as the build pack. Configure container port `3000` and optionally use `/health` as the health-check path.

Set these runtime environment variables in Coolify:

- `DATABASE_URL`: the PostgreSQL connection string; prefer a Coolify database's internal URL.
- `SECRET`: a random session secret containing at least 32 characters. Generate one with `openssl rand -base64 48`.
- `PASSCODE`: the code that upgrades a user to member status.
- `ADMIN_PASSCODE`: the code that upgrades a user to administrator status.
- `NODE_ENV=production`.

The container defaults to `0.0.0.0:3000`. It automatically creates the application and session tables when it starts, so PostgreSQL must be reachable during startup.

For an external database that requires TLS, include its SSL option in `DATABASE_URL`, such as `?sslmode=require`.

## Local development

Copy `.env.example` to `.env`, fill in the values, then run:

```sh
npm ci
npm run db:init
npm run dev
```
