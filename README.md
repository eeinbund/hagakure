# Hagakure Site

This folder is set up to publish the static website in `frontend/` to GitHub Pages for free.

## What is included

- `frontend/`: the public website files
- `.github/workflows/deploy-pages.yml`: automatic GitHub Pages deployment workflow
- `.gitignore`: intentionally ignores the rest of this research folder so private and non-website files do not get published by accident

## Local preview

Open the site directly:

```bash
open /Users/evan/Desktop/ELM/frontend/index.html
```

Or run a local server:

```bash
cd /Users/evan/Desktop/ELM/frontend
python -m http.server 8000
open http://localhost:8000
```

## Publish to GitHub Pages

1. Create a new empty GitHub repository.
2. In Terminal, run:

```bash
cd /Users/evan/Desktop/ELM
git init
git branch -M main
git add .
git commit -m "Initial Hagakure site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. On GitHub, open the repository.
4. Go to `Settings` -> `Pages`.
5. Under `Build and deployment`, set `Source` to `GitHub Actions`.
6. Wait for the `Deploy Hagakure Site` workflow to finish.

## Resulting URL

- If the repository is named `YOUR_USERNAME.github.io`, the site URL will be:

```text
https://YOUR_USERNAME.github.io/
```

- Otherwise, the site URL will usually be:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

Because the site uses relative asset paths, it works correctly from either URL shape.
