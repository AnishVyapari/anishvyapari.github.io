# 🔧 DNS Monitor Troubleshooting Guide

## ✅ **Fix Applied**

**Domain Corrected**: Changed from `anishvyapari.github.io` to `www.vyapari.space` to match your CNAME configuration.

---

## 🚨 **Why It Might Not Be Working**

### **1. GitHub Actions Not Enabled**
GitHub Actions might be disabled on your repository.

**How to Fix:**
1. Go to: https://github.com/AnishVyapari/anishvyapari.github.io/settings/actions
2. Under **"Actions permissions"**, select:
   - ✅ **"Allow all actions and reusable workflows"**
3. Scroll down and ensure **"Workflow permissions"** is set to:
   - ✅ **"Read and write permissions"**
4. Click **"Save"**

### **2. Workflow Not Running Yet**
The workflow runs every 5 minutes. It might need time to start.

**How to Test Immediately:**
1. Go to: https://github.com/AnishVyapari/anishvyapari.github.io/actions
2. Click on **"DNS Monitor"** in the left sidebar
3. Click the **"Run workflow"** dropdown button (top right)
4. Click **"Run workflow"** green button
5. Wait 10-20 seconds and refresh the page
6. You should see a new workflow run appear
7. Check your Discord for the notification

### **3. Discord Webhook Invalid/Expired**
Discord webhooks can expire or be deleted.

**How to Check:**
1. Open a new browser tab
2. Paste this URL (replace with your webhook):
   ```
   https://discord.com/api/webhooks/1454346692336812117/_2m6XFh4ggupAyMhA52Hml5Yj_LUsyCxWeLlnM9RG7oml8bISKd9x-m1pDMGidbKw24p
   ```
3. If you see a JSON response with `{"type": 1, ...}`, the webhook is valid
4. If you see an error, you need to create a new webhook

**How to Create New Webhook:**
1. Go to your Discord server
2. Right-click the channel → **Edit Channel**
3. Go to **Integrations** → **Webhooks**
4. Click **"New Webhook"**
5. Copy the webhook URL
6. Update it in `.github/workflows/dns-monitor.yml` (line 16)

### **4. Rate Limiting (Every 5 Minutes is Aggressive)**
GitHub might throttle workflows that run too frequently.

**Recommended Change:**
- Change from every 5 minutes to every 10-15 minutes
- Edit `.github/workflows/dns-monitor.yml` line 5:
  ```yaml
  - cron: '*/10 * * * *'  # Every 10 minutes
  ```

---

## 📋 **Step-by-Step Verification Checklist**

Run through this checklist:

- [ ] **1. Check GitHub Actions is enabled**
  - Visit: https://github.com/AnishVyapari/anishvyapari.github.io/settings/actions
  - Verify "Allow all actions" is selected

- [ ] **2. Manually trigger the workflow**
  - Visit: https://github.com/AnishVyapari/anishvyapari.github.io/actions
  - Click "DNS Monitor" → "Run workflow"

- [ ] **3. Check workflow run status**
  - After triggering, click on the new run
  - Check if it's green (success) or red (failed)
  - Click "Check Domain Status" to see logs

- [ ] **4. Verify Discord webhook**
  - Test webhook URL in browser
  - Should return JSON, not 404

- [ ] **5. Check Discord channel**
  - Make sure you're in the correct channel
  - Check message history for notifications

---

## 🧪 **Manual Test Command**

To test the DNS check locally:

```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://www.vyapari.space"
```

Expected output: `200` (success)

---

## 🔍 **Viewing Workflow Logs**

To see what's happening:

1. Go to: https://github.com/AnishVyapari/anishvyapari.github.io/actions
2. Click on any workflow run
3. Click "Check Domain Status"
4. You'll see the full output including:
   - Domain checked
   - Response time
   - Discord webhook response
   - Any errors

---

## ⚡ **Quick Fix Summary**

**Most Common Issue:** GitHub Actions not enabled

**Quick Fix:**
1. https://github.com/AnishVyapari/anishvyapari.github.io/settings/actions
2. Enable "Allow all actions"
3. Set "Read and write permissions"
4. Save settings
5. Go to Actions tab → "Run workflow" manually
6. Check Discord

---

## 🆘 **Still Not Working?**

If after following all steps above it's still not working:

1. Check the **Actions** tab for error messages
2. Verify your **Discord server** allows webhooks
3. Try creating a **new Discord webhook**
4. Check if your **repository is public** (GitHub Actions free tier requires public repos for scheduled workflows)

---

## 📊 **Expected Behavior When Working**

When everything is working correctly:

- ✅ Every 5 minutes, a new workflow run appears in Actions tab
- ✅ Each run shows green checkmark (success)
- ✅ Discord receives a message with:
  - Domain: www.vyapari.space
  - Response time in milliseconds
  - Check number
  - Timestamp in IST
- ✅ Logs show: "DNS check completed: online (XXXms)"

---

**Last Updated:** 2025-12-27
**Domain:** www.vyapari.space
**Webhook:** Discord (configured)
**Schedule:** Every 5 minutes
