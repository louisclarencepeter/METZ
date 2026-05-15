# METZ
## Currently Optimized for mobile first

## Built with

This project was built using these technologies:

- React
- Vite
- React Router
- Lucide React
- HTML5
- CSS3

## Features

- Responsive navigation with mobile menu
- Project portfolio filtering
- Contact form that prepares an email inquiry
- Reusable content data for services, projects, leadership, and company details

## Development

This project targets Node.js `24.10.0` with npm `11.12.0`.

If you use nvm, select the project Node version first:

```bash
nvm use
```

Install dependencies and start the local React dev server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Contact form (Netlify Function + Resend)

The contact form posts JSON to `/api/contact`, which is redirected to a
Netlify Function at `netlify/functions/contact.js`. The function calls the
[Resend](https://resend.com) REST API to deliver the inquiry to
`info@metzengineering.co.tz`, with the visitor's address set as `Reply-To`.

Required setup:

1. **Verify the sender domain** (`metzengineering.co.tz`) in Resend so the
   function can send from `noreply@metzengineering.co.tz`.
2. **Set the `RESEND_API_KEY` environment variable** in Netlify
   (Site settings → Environment variables). The function returns a 500 if it
   is missing.

To run the function locally, use the Netlify CLI (plain `vite` does not
execute Netlify Functions):

```bash
npm install -g netlify-cli
netlify dev
```

Then create a `.env` file (gitignored) with `RESEND_API_KEY=...` for local
testing.

## Security Policy
Please refer to the [security policy](SECURITY.md) here

## Progress

![status](https://img.shields.io/badge/status-ongoing-orange?style=flat-square)
