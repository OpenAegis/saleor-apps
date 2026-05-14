# Saleor Apps multi-app deployment

Deploy this repository from the repository root to publish every app in one Vercel deployment. The root `vercel.json` builds each app and enables `DEPLOY_ALL_APPS=true`, which makes every Next.js app use its route prefix.

Available routes:

- `/avatax`
- `/cms`
- `/klaviyo`
- `/np-atobarai`
- `/products-feed`
- `/search`
- `/segment`
- `/smtp`
- `/stripe`

Deploying an individual app from its own directory still works as before because route prefixes are only enabled when `DEPLOY_ALL_APPS=true`.
