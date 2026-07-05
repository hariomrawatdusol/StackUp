# StackUp — Multi-Skill Creator Marketplace

> Stack skills. Stack clients. Stack income.

Gen-Z marketplace where creators list **skill-stacks** (Editor + Model + UGC) and brands hire one creator instead of three. Built with Next.js 15, Tailwind, Framer Motion, Zustand.

## ⚡ Local dev

```bash
yarn install
yarn dev
# open http://localhost:3000
```

## 🚀 Deploy to Vercel (from your machine)

The fastest path — no CI needed:

```bash
# 1. push code to a fresh GitHub repo
git init && git add . && git commit -m "stackup mvp"
gh repo create stackup --public --source=. --push
# (or use the GitHub web UI)

# 2. install vercel CLI once
npm i -g vercel

# 3. deploy
vercel --prod
```

Vercel auto-detects Next.js. **Zero env vars required** — the MVP is fully client-side.

### Alternative: 2-click Vercel Dashboard
1. Push repo to GitHub
2. Go to https://vercel.com/new → Import the repo → Deploy

## 🌐 Connect `stackupapp.in`

After the first deploy succeeds:

1. Vercel Dashboard → your project → **Settings → Domains**
2. Add `stackupapp.in` and `www.stackupapp.in`
3. Vercel shows DNS records to set at your registrar (BigRock/GoDaddy/Namecheap):
   - Apex `stackupapp.in`: **A** record → `76.76.21.21`
   - Subdomain `www`: **CNAME** → `cname.vercel-dns.com`
4. Wait 5–30 min for DNS propagation. Vercel auto-issues an SSL cert.
5. Set `stackupapp.in` as the **Primary Domain** so `www` → apex redirects.

## 🧪 Post-deploy smoke test
- [ ] `/` shows intro animation → hero
- [ ] `/onboard` split screen works
- [ ] Post a project on `/dashboard/brand` → escrow toast
- [ ] Quick Apply on `/dashboard/creator` → confetti
- [ ] `stackupapp.in` resolves → site loads over HTTPS

## 🛣 Roadmap (skipped for MVP validation)
- Real auth (Google OAuth)
- Razorpay UPI escrow
- AI-powered creator matching
- Chat / DMs

---
Built by Gen-Z for Gen-Z. 💨
