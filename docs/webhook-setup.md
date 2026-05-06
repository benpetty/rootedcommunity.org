# Sanity → GitHub auto-rebuild webhook

When set up, this makes the live site rebuild automatically every time someone publishes a change in Sanity Studio. Without it, a publish updates the Sanity database but the static site doesn't refresh until someone manually triggers a deploy.

This is a **one-time setup** that takes ~5 minutes. Skip until the org is ready to start authoring content; until then, the manual fallback below is fine.

---

## Step 1 — Create a fine-grained GitHub PAT

You need a token with permission to dispatch repository events. A **fine-grained personal access token** scoped to just this repo is the right tool — minimal blast radius, easy to rotate.

1. Open https://github.com/settings/personal-access-tokens/new
2. Token name: `rootedcommunity.org Sanity webhook`
3. Expiration: 1 year (or the longest you're comfortable with — set a calendar reminder to rotate)
4. Repository access: **Only select repositories** → choose `benpetty/rootedcommunity.org`
5. Repository permissions:
   - **Contents: Read and write** (needed for `repository_dispatch`)
   - All others: No access
6. Click **Generate token**
7. **Copy the token immediately** (it starts with `github_pat_…`) — GitHub only shows it once

---

## Step 2 — Create the webhook in Sanity

1. Open https://www.sanity.io/manage/project/wnfi1j4a/api/webhooks (or: Sanity dashboard → API → Webhooks → Create Webhook)
2. Fill in:

| Field | Value |
|---|---|
| **Name** | `Deploy on content change` |
| **Description** | Triggers GitHub Actions to rebuild the static site whenever content is published. |
| **URL** | `https://api.github.com/repos/benpetty/rootedcommunity.org/dispatches` |
| **Dataset** | `production` |
| **Trigger on** | Create, Update, Delete |
| **Filter (GROQ)** | `_type in ["siteSettings", "homePage", "missionPage", "impactPage", "getInvolvedPage", "contactPage", "program", "person", "partner", "impactMetric"]` |
| **Projection** | leave empty (we don't need the document body in the webhook) |
| **Status** | Enabled |
| **HTTP method** | POST |
| **HTTP Headers** | (see below — two headers) |
| **API version** | leave default |
| **Include drafts** | unchecked (we only want to rebuild on actual publish) |
| **Secret** | leave empty (we use bearer auth instead) |

### HTTP Headers (add two)

**Header 1**
- Name: `Accept`
- Value: `application/vnd.github+json`

**Header 2**
- Name: `Authorization`
- Value: `Bearer <PASTE THE GITHUB PAT FROM STEP 1>`

(Replace `<PASTE …>` with the actual `github_pat_…` token. The word `Bearer` and the space between are required.)

### Body (the JSON sent to GitHub)

In the "HTTP Body" or "Payload" field, enter:

```json
{
  "event_type": "sanity-content-update",
  "client_payload": {
    "trigger": "sanity-webhook",
    "documentId": "$_id",
    "documentType": "$_type"
  }
}
```

The `$_id` and `$_type` are Sanity webhook variables that get filled in with the actual document being published.

3. Click **Save**.

---

## Step 3 — Verify it works

1. Open Sanity Studio at https://rooted-community.sanity.studio/
2. Edit any document (e.g. tweak the homepage subhead)
3. Click **Publish**
4. Within ~5–10 seconds, check https://github.com/benpetty/rootedcommunity.org/actions — you should see a new "Deploy to GitHub Pages" workflow run kicking off, triggered by `repository_dispatch`
5. Wait ~1–2 minutes for the workflow to complete
6. Refresh https://rootedcommunity.org/ — the change should be live

If the workflow doesn't trigger:
- Check the Sanity webhook's **Logs** tab — you'll see the request and GitHub's response. A 401 or 404 usually means the PAT or the URL is wrong.

---

## Manual fallback (when webhook isn't set up yet)

To trigger a deploy without the webhook, run:

```bash
gh workflow run "Deploy to GitHub Pages" --repo benpetty/rootedcommunity.org
```

Or visit https://github.com/benpetty/rootedcommunity.org/actions/workflows/deploy.yml and click **Run workflow → Run workflow**.

This works any time and is a useful escape hatch even after the webhook is configured (e.g. if a webhook attempt fails for any reason).

---

## Rotating the PAT

When the PAT is approaching expiration, GitHub will email you. To rotate:

1. Generate a new PAT following Step 1
2. Update the `Authorization` header in the Sanity webhook with the new token
3. Test with a small content change
4. Delete the old PAT in GitHub settings

Set a calendar reminder for ~1 month before expiration.
