# GitHub Secrets Setup

## Required Secrets

Add these 4 secrets to: **Settings → Secrets and variables → Actions**

| Secret Name | Purpose |
|-------------|---------|
| `WEBHOOK_OTP` | OTP/visitor tracking |
| `WEBHOOK_DNS_CHECKER` | DNS monitoring |
| `WEBHOOK_WHO_OPENED` | Page access tracking |
| `MISTRAL_API_KEY` | AI chatbot API key |

> **Note:** Contact repository owner for actual secret values.

## How It Works

- HTML files use placeholders (e.g., `__WEBHOOK_OTP__`)
- GitHub Actions workflow injects real values at build time
- Deployed site has actual working URLs
- Secrets never committed to repository
