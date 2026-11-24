# AxiomBridge Consulting

Production-ready foundation and enquiry system for the AxiomBridge Consulting corporate website.

The application shell, design tokens, route structure, SEO plumbing, reusable components and a complete contact enquiry flow are implemented. The remaining marketing page content will be built on top of this base.

## Stack

- **Framework:** Next.js 16 (App Router, React Server Components, Cache Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with CSS-first design tokens
- **UI primitives:** shadcn-style components built on Radix UI
- **Forms:** React Hook Form + Zod with shared client/server validation
- **Email:** Resend via a server-only Route Handler
- **Icons:** Lucide
- **Fonts:** Playfair Display (display) and Plus Jakarta Sans (body) via `next/font`

## Getting started

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site origin used by metadata, sitemap and robots. Falls back to `http://localhost:3000` in development. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Public contact email. Defaults to `contact@axiombridge.com`. |
| `NEXT_PUBLIC_CONTACT_PHONE` | No | Public telephone number. Defaults to `+234 1 800 2946`. |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | Optional LinkedIn profile URL. The footer link is omitted when blank. |
| `RESEND_API_KEY` | Email delivery | Resend API key. Server-only; never prefix with `NEXT_PUBLIC_`. |
| `ENQUIRY_FROM_EMAIL` | Email delivery | Sender address that must be verified in Resend. |
| `ENQUIRY_TO_EMAIL` | Email delivery | Inbox that receives enquiry notifications. |

Public values are validated in `lib/env.ts`. Server-only email credentials are read lazily in `lib/env.server.ts`, which imports `server-only` so it cannot be bundled into a Client Component. All three email variables must be set before the enquiry endpoint will send mail; until then it returns a generic `503` response. No real credentials or addresses are committed.

## Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Serve the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting
npm run check      # Lint and typecheck
npm test           # Run the Vitest suite
npm run test:watch # Run Vitest in watch mode
```

## Routes

| Route | Status |
| --- | --- |
| `/` | Minimal home composition: hero, credibility metrics, principles and closing CTA |
| `/about` | Foundation page |
| `/services` | Foundation page with all five practice areas and anchor links |
| `/industries` | Foundation page with six sector cards |
| `/contact` | Enquiry form, office details and direct email/telephone links |
| `/api/enquiries` | POST-only Route Handler for validated enquiry submissions |
| `/legal/[policy]` | Three legal routes, generated statically. Marked `noindex` while copy is in preparation. |
| `/robots.txt`, `/sitemap.xml` | Generated from site configuration |
| 404 | Branded not-found page |

There is deliberately no Insights route, navigation item or homepage section.

## Architecture

```text
app/
  api/enquiries/route.ts      Secure enquiry submission endpoint
  layout.tsx                  Root fonts, metadata, viewport
  globals.css                 Tailwind v4 tokens and global styles
  (marketing)/
    layout.tsx                Header, skip link, main landmark, footer
    page.tsx                  Home composition
    about/page.tsx
    services/page.tsx
    industries/page.tsx
    contact/page.tsx
    legal/[policy]/page.tsx
  not-found.tsx
  robots.ts
  sitemap.ts
components/
  forms/                      EnquiryForm, FormField, StatusAlert
  layout/                     Container, Section, Logo, header, footer, navigation
  marketing/                  PageHeader, hero, grids, CTA, ContactDetails
  ui/                         Button, Input, Select, Textarea, Card, Sheet, etc.
content/
  company.ts                  Typed metrics, principles, practice areas, industries
  enquiry.ts                  Service options and response copy
  legal.ts                    Legal route metadata
  navigation.ts               Primary navigation
lib/
  email/                      HTML escaping and Resend enquiry templates
  server/                     Rate limiter and client-key helper
  validation/enquiry.ts       Shared Zod schema
  env.ts                      Validated public environment values
  env.server.ts               Validated server-only email configuration
  site.ts                     Site configuration and contact details
  navigation.ts               Active-route helper
  utils.ts                    `cn` with project-aware tailwind-merge config
tests/                          Schema, endpoint, email and form tests
```

Copy and structured content live in `content/`, not inside page components. Reusable presentation lives in `components/`, and route files compose those pieces.

## Server and client boundaries

Server Components are the default. Client components are:

- `components/layout/desktop-nav.tsx` — active route state
- `components/layout/mobile-nav.tsx` — mobile navigation and open/close behaviour
- `components/ui/sheet.tsx` — Radix Dialog-based sheet primitive
- `components/forms/enquiry-form.tsx` — React Hook Form, validation feedback and `fetch` submission

The form primitives (`Input`, `Textarea`, `Select`, `FormField`, `StatusAlert`) are presentational and become part of the client boundary when imported by `EnquiryForm`. Buttons, cards, headings, grids, sections, the footer and all email/rate-limit logic remain server-side. The Route Handler is the only place that reads Resend credentials or sends email.

## Enquiry system

### Flow

1. `EnquiryForm` uses React Hook Form with the Zod resolver from `lib/validation/enquiry.ts`.
2. On submit it sends JSON to `POST /api/enquiries` with `X-Requested-With: XMLHttpRequest`.
3. The Route Handler revalidates the payload with the same Zod schema.
4. It sends two emails through Resend: a notification to `ENQUIRY_TO_EMAIL` with the customer as reply-to, and a confirmation to the customer with the company inbox as reply-to.
5. The form presents loading, success, validation-error and delivery-error states without reloading the page.

### Endpoint contract

- **Success:** `200` with `{ "success": true, "message": "..." }`
- **Validation failure:** `400` with `{ "success": false, "message": "...", "fieldErrors": { ... } }`
- **Unsafe request:** `403` (origin or request header), `415` (non-JSON), `413` (oversized body)
- **Rate limited:** `429` with a `Retry-After` header
- **Email not configured:** `503`
- **Email delivery failure:** `502`

All responses include `Cache-Control: no-store`. Field errors contain field names and messages only; submitted values are never echoed.

### Spam protection and logging

- Hidden honeypot `website` field. Bots that fill it receive a normal success response but no email is sent.
- Five submissions per client per ten minutes, keyed by a salted SHA-256 hash of the forwarded IP. Raw IP addresses are not stored.
- Origin validation, required `X-Requested-With` header, JSON content-type check and a 16 KB body limit.
- `escapeHtml` protects the HTML email templates from injected markup.
- Errors are logged with event names and safe reason codes only. Customer names, emails, message bodies and provider errors are never written to logs.

The limiter is in-process and suitable for a single Node.js instance. For multiple serverless instances, swap `lib/server/rate-limit.ts` for a shared store such as Redis while keeping the same `check(key)` interface.

### Privacy and consent

The form links to `/legal/privacy-policy` and requires an explicit consent checkbox before submission. The consent state is validated again on the server. The linked legal page is still a placeholder and must be replaced with approved policy copy before public launch.

### Activating email delivery

1. Create a Resend account and verify the domain used for `ENQUIRY_FROM_EMAIL`.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` and `ENQUIRY_TO_EMAIL` in your deployment environment.
3. Replace the default public contact details with the real company values.
4. Run `npm test`, `npm run check` and `npm run build`.
5. Submit a test enquiry and confirm both emails arrive. Check spam folders and Resend logs.

No credentials or addresses are committed. Until the three server variables are set, the endpoint intentionally returns `503`.

### Tests

`npm test` runs 24 tests covering:

- valid schema parsing and trimming
- missing fields, malformed email, invalid service, short message and missing consent
- valid endpoint submissions and both outbound emails
- honeypot spam, rate limiting, unsafe requests and oversized bodies
- redacted logging on delivery failure
- missing email configuration
- form validation, loading, success and server-error states
- HTML escaping in email templates

## Design system

All tokens are defined in `app/globals.css` using Tailwind CSS v4's `@theme` blocks.

- **Palette:** warm ivory canvas, navy surfaces, muted gold accents and slate body text
- **Type scale:** `text-display-*`, `text-headline-*`, `text-title-*`, `text-body-*`, `text-label-*`
- **Spacing:** semantic `margin`, `gutter` and `section` rhythm tokens
- **Breakpoints:** mobile-first with tablet at `md` (768px) and desktop navigation at `lg` (1024px)
- **Elevation:** `shadow-card`, `shadow-drawer`, `shadow-modal`

Because the type scale uses custom `text-*` names, `lib/utils.ts` extends `tailwind-merge` to keep font sizes from being mistaken for text colours. Keep that config in sync when new type tokens are added.

## Images and fonts

- Reference photography is stored locally under `public/images/` and rendered with `next/image`.
- Image formats, device sizes and cache lifetime are configured in `next.config.ts`.
- Fonts are loaded with `next/font/google`, exposed as CSS variables and mapped to `font-sans` / `font-display`.

## SEO and accessibility

- Global metadata, Open Graph and Twitter card data use `NEXT_PUBLIC_SITE_URL`.
- Canonical URLs are set per page.
- `sitemap.xml` and `robots.txt` are generated from `lib/site.ts`.
- Legal routes are intentionally `noindex` until final policy copy is supplied.
- The shell includes a skip link, landmark regions, visible focus states and reduced-motion handling.
- Custom gold text was darkened to `#7d612e` to keep small labels above the WCAG AA contrast threshold on ivory, surface and muted backgrounds.
- The home page scored 100 for Accessibility, Best Practices and SEO in a local Lighthouse run.

## Current scope and next steps

- The home page is a deliberately minimal composition; the remaining homepage sections are still to be built.
- Legal policy copy is pending. The routes exist, carry an “In preparation” notice and are excluded from indexing.
- The hero photograph is a local reference asset and should be replaced with final licensed photography.
- The enquiry system is complete but inactive until real Resend credentials and verified sender/recipient addresses are supplied.
- CMS integration and analytics remain out of scope.

## Deployment

Set `NEXT_PUBLIC_SITE_URL`, the public contact details and the three server-only email variables in the production environment before building. Then:

```bash
npm test
npm run check
npm run build
npm run start
```

The project uses Next.js Cache Components and partial prefetching. The footer copyright year is derived inside a cached `"use cache"` function so it can be prerendered without making the shell dynamic.
