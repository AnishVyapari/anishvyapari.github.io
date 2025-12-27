# 🤖 Automated DNS Monitor Setup

## ✅ What's Been Set Up

Your DNS monitor now runs **completely automatically** using GitHub Actions - no browser needed!

## 🔄 How It Works

### GitHub Actions Workflow
- **Runs every 5 minutes** automatically
- **Checks** `anishvyapari.github.io` status
- **Sends Discord notification** with every check
- **Works 24/7** even when you're not visiting the site

### What Gets Sent to Discord Every 5 Minutes:
- ✅/❌ Domain status (Online/Offline)
- ⏱️ Response time in milliseconds
- 📊 Check number
- 🕐 Timestamp (India timezone)
- 🤖 Source: GitHub Actions

## 📊 Where to Monitor

### 1. Discord Channel
Check your Discord webhook channel - you'll get a message every 5 minutes with the domain status.

### 2. GitHub Actions Dashboard
Visit: `https://github.com/AnishVyapari/anishvyapari.github.io/actions`
- See all workflow runs
- View logs for each check
- Manually trigger a check anytime

## 🚀 Manual Trigger

You can manually trigger a DNS check anytime:
1. Go to your GitHub repo
2. Click "Actions" tab
3. Select "DNS Monitor" workflow
4. Click "Run workflow" button

## 🛠️ Configuration

The workflow is configured in: `.github/workflows/dns-monitor.yml`

### To Change Check Frequency:
Edit the cron schedule in `dns-monitor.yml`:
```yaml
schedule:
  - cron: '*/5 * * * *'  # Every 5 minutes
```

**Cron Examples:**
- Every 5 minutes: `*/5 * * * *`
- Every 10 minutes: `*/10 * * * *`
- Every 30 minutes: `*/30 * * * *`
- Every hour: `0 * * * *`

### Discord Webhook
The webhook URL is hardcoded in the workflow. To use GitHub Secrets instead:
1. Go to your repo Settings → Secrets → Actions
2. Add secret: `DISCORD_WEBHOOK` = your webhook URL
3. The workflow will automatically use it

## 📁 Files Created

1. **`.github/workflows/dns-monitor.yml`** - Auto-check workflow
2. **`dns-monitor.html`** - Browser-based monitor (optional, for manual checks)
3. **`README.md`** - Project documentation

## ⚡ Quick Test

The workflow will run automatically every 5 minutes. To verify it's working:
1. Wait 5 minutes, or manually trigger it
2. Check your Discord for the notification
3. Visit GitHub Actions to see the run logs

## 🎯 Benefits

- ✅ **No browser needed** - Runs on GitHub's servers
- ✅ **24/7 monitoring** - Always checking, even when you sleep
- ✅ **Free** - GitHub Actions is free for public repos
- ✅ **Reliable** - GitHub's infrastructure
- ✅ **Instant alerts** - Know immediately if your site goes down

## 📝 Next Steps

1. ✅ Wait for the first automatic check (within 5 minutes)
2. ✅ Check your Discord for the notification
3. ✅ Visit GitHub Actions to confirm it's running
4. 🎉 Relax - your domain is being monitored!

---

**Note:** GitHub Actions may have a slight delay (1-2 minutes) in starting scheduled workflows, so checks might run at 5:01, 10:02, etc. This is normal.
