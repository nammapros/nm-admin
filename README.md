# NammaPros Admin Portal

Standalone Next.js admin management portal.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | HTTPS origin of the backend Django API | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_OPERATIONS_URL` | URL of the operations dashboard | `https://ops.yourdomain.com` |

---

## Deployment Options

### 1. Vercel (Recommended)
1. Import repository into Vercel.
2. Set Root Directory: `portals/admin` (or `./` if pushed to its own GitHub repository).
3. Framework: **Next.js**
4. Add environment variables (`NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_OPERATIONS_URL`).
5. Click **Deploy**.

### 2. Docker / Google Cloud Run
```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL="https://api.yourdomain.com" \
  -t nammapros-admin .
```
Deploy to Google Cloud Run:
```bash
gcloud run deploy nammapros-admin \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_API_BASE_URL="https://api.yourdomain.com"
```

### 3. Render
1. New Web Service on Render.
2. Root directory: `portals/admin`
3. Environment: **Node**
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
