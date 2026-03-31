# Security

## Repository scan (portfolio)

- Application code in this repo is a static marketing site: there are **no API routes** and **no `process.env` usage** in committed source.
- **No API keys, tokens, or private URLs** were found in `app/`, `components/`, `lib/`, or `next.config.ts`.
- Temporary Devpost HTML scrapes (`dubbify.html`, `rua.html`, etc.) were **removed** — do not re-commit scraped pages; they can contain cookies or session-related data.

## Local secrets

1. Copy `.env.example` to `.env.local`.
2. Put real values only in `.env.local` (gitignored).
3. For Next.js: remember `NEXT_PUBLIC_*` is **exposed to the browser** — never put private keys there.

## If a key was ever exposed

1. **Rotate** the credential at the provider (revoke old key).
2. Remove it from git **history** if it was committed:
   - [git filter-repo](https://github.com/newren/git-filter-repo) or [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
3. Force-push cleaned branches and ask collaborators to re-clone.

## Verify after changes

```bash
# Search for common secret patterns (adjust as needed)
rg -i "sk-|api[_-]?key|secret|token|ghp_|github_pat_|BEGIN (RSA |EC )?PRIVATE" --glob '!node_modules/**' --glob '!.next/**'
```
