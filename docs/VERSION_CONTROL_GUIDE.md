# Version Control Guide

## 1. Git Workflow Overview

This project is managed with a lightweight Git workflow designed for a 4-member Expo/React Native team. The workflow keeps the `main` branch production-safe, uses `dev` as the integration branch, and requires feature work to be completed in isolated branches before review and merge.

### Team Roles

- Sithira — Team Leader, PR reviewer, and final approver
- Kaveen — Developer
- Geethma — Developer
- Lakeesha — Developer

## 2. Branching Strategy

### Protected branches

- `main` — production-ready code only
- `dev` or `develop` — staging/integration branch for collaborative work

### Feature branch naming

Use the format:

```bash
git checkout -b feature/<developer-name>/<feature-name>
```

Examples:

```bash
git checkout -b feature/kaveen/map-integration
git checkout -b feature/geethma/route-screen
git checkout -b feature/lakeesha/ticket-screen
git checkout -b feature/sithira/login-flow
```

### Bugfix branch naming

Use the format:

```bash
git checkout -b fix/<developer-name>/<issue>
```

Examples:

```bash
git checkout -b fix/kaveen/map-eta-bug
git checkout -b fix/geethma/route-filter-error
git checkout -b fix/lakeesha/qr-scan-crash
```

### Rule

- Never commit directly to `main`
- Always branch off `dev`
- Only merge into `dev` after review and approval
- Promote `dev` to `main` only when the app is stable and ready for release

## 3. Commit Message Standards

Use Conventional Commits to keep history readable and consistent.

### Commit format

```bash
<type>: <short description>
```

### Common commit types

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting or styling changes without logic changes
- `refactor:` — code cleanup or restructuring
- `chore:` — maintenance tasks, config, tooling

### Examples for this project

```bash
git commit -m "feat: add live bus tracking map screen"
git commit -m "fix: correct ETA calculation for delayed buses"
git commit -m "docs: update developer onboarding guide"
git commit -m "style: improve route card layout for smaller devices"
git commit -m "refactor: extract auth state into reusable hook"
```

### Good commit rules

- Use lowercase for the type
- Keep the subject short and specific
- Use present tense
- Prefer one logical change per commit

## 4. Pull Request Policy

### Required flow

1. Create a feature or fix branch from `dev`
2. Develop and test locally
3. Commit changes using conventional commit format
4. Push the branch to the remote repository
5. Open a pull request targeting `dev`
6. Wait for Sithira to review and approve
7. Merge only after review is complete and conflicts are resolved

### Review requirements

- Minimum 1 reviewer required
- Sithira must review and approve before merge
- The PR should contain a clear summary of the feature or fix
- Include notes on testing and screenshots if relevant

### Merge rules

- Do not merge broken or untested code
- Resolve conflicts before requesting review
- Keep PRs focused on a single feature or issue

## 5. Expo File Conflict Prevention

Because Expo projects often involve lockfiles and app config files, avoid unnecessary merge conflicts.

### Files to handle carefully

- `app.json`
- `package-lock.json`
- `package.json`
- native config files and generated workspace files

### Prevention rules

- Coordinate before updating dependencies or Expo config
- Avoid editing `app.json` and `package-lock.json` in the same PR as unrelated UI changes
- If multiple people modify Expo config, sync before pushing
- Run the following after dependency changes:

```bash
npx expo install --fix
```

### Example conflict safety check

Before pushing:

```bash
git pull origin dev
git status
git diff
```

If conflicts appear, resolve them before opening the PR.

## 6. Git Cheat Sheet

### 1. Pull the latest updates from `dev`

```bash
git checkout dev
git pull origin dev
```

### 2. Create a feature branch

```bash
git checkout -b feature/<developer-name>/<feature-name>
```

Example:

```bash
git checkout -b feature/kaveen/map-integration
```

### 3. Make changes and check status

```bash
git status
git add .
```

### 4. Commit with Conventional Commit format

```bash
git commit -m "feat: add live bus map integration"
```

### 5. Push the branch

```bash
git push -u origin feature/kaveen/map-integration
```

### 6. Open a PR into `dev`

- Go to GitHub/GitLab
- Select the feature branch
- Open a PR to `dev`
- Add a summary and testing notes
- Request review from Sithira

### 7. After review, merge into `dev`

```bash
git checkout dev
git pull origin dev
git merge feature/kaveen/map-integration
```

### 8. Delete local feature branch after merge

```bash
git branch -d feature/kaveen/map-integration
```

## 7. Recommended Daily Workflow

```bash
git checkout dev
git pull origin dev
git checkout -b feature/<developer-name>/<feature-name>
# work on code
# run tests / Expo checks
# commit changes
# push branch
# open PR
```

## 8. Final Team Rules

- Always branch from `dev`
- Never merge your own PR without review
- Keep PRs small and focused
- Keep commit history clean and readable
- Coordinate on Expo dependency changes
- Test before pushing to avoid broken builds

## 9. Release Workflow

When the team is ready to ship:

```bash
git checkout dev
git pull origin dev
git checkout main
git pull origin main
git merge dev
git push origin main
```

Only merge `dev` into `main` when the app passes QA and is approved for release.
