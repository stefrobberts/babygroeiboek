# Babygroeiboek.nl

Een premium digitale baby-app waarin ouders de eerste levensjaren van hun
kindje vastleggen: voedingen, slaap, luiers, groei, mijlpalen en de mooiste
foto's, allemaal samenkomend in een rustige, warme tijdlijn.

## Tech stack

| Laag           | Keuze                                |
| -------------- | ------------------------------------ |
| Framework      | Next.js 15 (App Router, Turbopack)   |
| Taal           | TypeScript (strict)                  |
| Styling        | Tailwind CSS v4                      |
| UI-componenten | shadcn/ui (Base UI) + Lucide Icons   |
| Data fetching  | React Query                          |
| Formulieren    | React Hook Form + Zod                |
| Animaties      | Framer Motion                        |
| Datums         | date-fns                             |
| Grafieken      | Recharts                             |
| Database/Auth  | Supabase (PostgreSQL, Auth, Storage) |
| Hosting        | Vercel                               |

## Architectuur

Feature-based structuur onder `src/`:

```
src/
  app/            Routes (App Router) — (auth) en (app) route groups
  components/     Design system: ui/, layout/, shared/
  features/       Eén map per domeinfeature (dashboard, feeding, sleep, ...)
  lib/            Supabase clients, generieke helpers
  hooks/          Herbruikbare React hooks
  types/          Gedeelde TypeScript types, incl. database.types.ts
  services/       Server-only data access (Supabase queries)
  actions/        Server Actions (auth, mutaties)
  providers/      React context providers (React Query, thema, tooltips)
  utils/          Pure helper-functies (leeftijd, datumformattering)
  config/         Site-config en navigatie
supabase/
  migrations/     SQL-migraties: schema, RLS-policies, storage buckets
```

Iedere feature (`feeding`, `sleep`, `diapers`, ...) krijgt een eigen map met
`components/` en `types/`, zodat de app jarenlang uitbreidbaar blijft zonder
dat features met elkaar verweven raken.

## Aan de slag

### 1. Dependencies installeren

```bash
npm install
```

### 2. Supabase-project opzetten

1. Maak een project aan op [supabase.com](https://supabase.com).
2. Kopieer `.env.example` naar `.env.local` en vul de Supabase-variabelen in
   (Project settings → API).
3. Zet Google als OAuth-provider aan in Supabase Auth → Providers, en vul de
   client ID/secret in `.env.local` aan.
4. Voer de migraties uit tegen je project:

   ```bash
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```

   Dit maakt alle tabellen, Row Level Security policies en Storage buckets
   aan (zie `supabase/migrations/`).

### 3. Development server starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Commando               | Omschrijving                               |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Development server (Turbopack)             |
| `npm run build`        | Productie-build                            |
| `npm run start`        | Productie-server starten                   |
| `npm run lint`         | ESLint                                     |
| `npm run lint:fix`     | ESLint met automatische fixes              |
| `npm run format`       | Prettier — bestanden herschrijven          |
| `npm run format:check` | Prettier — controleren zonder te schrijven |
| `npm run typecheck`    | TypeScript zonder te builden               |

## Database & beveiliging

- Elke tabel is voorzien van Row Level Security, gescoped op het gezin
  (`family_id`) van de ingelogde gebruiker.
- Foto's en avatars staan in private Supabase Storage buckets — geen enkele
  bucket is publiek toegankelijk.
- `supabase/migrations/00000000000001_schema.sql` bevat het volledige schema,
  `00000000000002_rls.sql` de policies, `00000000000003_storage.sql` de
  Storage-configuratie.

## Deployment

Het project is geconfigureerd voor directe deployment op Vercel:

1. Importeer de repository in Vercel.
2. Zet dezelfde variabelen als in `.env.example` in de Vercel
   project-instellingen (Environment Variables).
3. Vercel detecteert Next.js automatisch; geen extra build-configuratie
   nodig.

## Bijdragen

Commits volgen [Conventional Commits](https://www.conventionalcommits.org)
(`feat:`, `fix:`, `chore:`, ...). Husky draait bij elke commit automatisch
lint-staged (ESLint + Prettier op gewijzigde bestanden) en controleert het
commitbericht.
