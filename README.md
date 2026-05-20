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

The contact form posts JSON to `/api/contact`, which is handled by the Netlify
Function at `netlify/functions/contact.js`. The function calls the
[Resend](https://resend.com) REST API to deliver the inquiry, with the visitor's
address set as `Reply-To`.

Required setup:

1. **Verify the sender domain** (`metzengineering.co.tz`) in Resend so the
   function can send from `noreply@metzengineering.co.tz`.
2. **Create a Resend API key** with permission to send email.
3. **Set the environment variables** in Netlify
   (Site settings → Environment variables):

```bash
RESEND_API_KEY=re_...
CONTACT_FROM=METZ Website <noreply@metzengineering.co.tz>
CONTACT_TO=info@metzengineering.co.tz
```

`CONTACT_FROM` and `CONTACT_TO` are optional. If omitted, the function uses the
values shown above. `RESEND_API_KEY` is required, and the function returns a 500
if it is missing.

To run the function locally, use the Netlify CLI (plain `vite` does not
execute Netlify Functions):

```bash
npm install -g netlify-cli
netlify dev
```

Then create a `.env` file (gitignored) with `RESEND_API_KEY=...` for local
testing. You can also add `CONTACT_FROM` and `CONTACT_TO` there when testing a
different sender or recipient.

## Security Policy
Please refer to the [security policy](SECURITY.md) here

## Progress

![status](https://img.shields.io/badge/status-ongoing-orange?style=flat-square)
