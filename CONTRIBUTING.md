# Contributing Guide (autosort-js)

This repository is public and welcomes community contributions.  
To keep changes safe and high-quality, contributions should go through **Fork + Pull Request (PR)** and get reviewed before merging.

---

## ✅ Quick Rules

- **Do not push directly to `main`/`develop`.**
- Use **Fork → Branch → PR** workflow.
- Keep PRs small and focused (one algorithm / one feature / one fix).
- Add or update **tests** when you change behavior.
- Reference related issues using **Refs #ID** (avoid auto-closing tracking issues).

---

## 🧭 Workflow (Fork → Branch → PR)

### 1) Fork the repo
On GitHub, click **Fork** (top-right) to create your own copy under your account.

### 2) Clone your fork
```bash
git clone https://github.com/<YOUR_USERNAME>/autosort-js.git
cd autosort-js
npm install
```

### 3) Create a new branch
Use a clear branch name:
```bash
git switch -c feature/insertion-sort
# or: feature/quick-sort, feature/merge-sort, feature/heap-sort, tests/coverage, fix/<bug-name>
```

### 4) Make changes + run tests
```bash
npm test
```

### 5) Commit and push
```bash
git add .
git commit -m "Add insertion sort"
git push -u origin feature/insertion-sort
```

### 6) Open a Pull Request (PR)
On GitHub, you will see a prompt like **Compare & pull request**.
Open the PR against the main repository branch (`develop` or `main` depending on project rules).

In the PR description:
- Reference the related issue:
  - ✅ `Refs #1` or `Related to #1`
  - ❌ Avoid `Fixes #1` / `Closes #1` if the issue is a **tracking issue** (otherwise it auto-closes).

---

## 🧩 Issue Ownership (Assignees)

- **Assignees** means “who is responsible for this task”.
- In a public repo, contributors usually work via **forks**, so assignments are optional.
- If an issue includes multiple tasks, please **claim one specific part** before starting.

Example:
- “I will implement Insertion Sort + tests.”
- “I will work on Heap Sort integration into autoSort.”

---

## 🔒 Recommended Maintainer Settings (Owner Checklist)

### Branch protection (recommended)
GitHub: **Settings → Branches → Add branch protection rule** for `main` (and/or `develop`)

Suggested options:
- ✅ Require a pull request before merging
- ✅ Require approvals (optional but recommended)
- ✅ Require status checks (if CI is set up)
- ✅ Restrict who can push (optional)

### Keep issue #1 as tracking
If issue #1 is a “tracking issue”, prefer splitting into smaller issues later:
- Add Insertion Sort
- Add Quick Sort
- Add Merge Sort
- Add Heap Sort
- Improve test coverage

---

## 💬 Copy‑Paste Reply to Contributors (Issue Comment)

Use this when someone asks “can you assign this to me?” on a tracking issue:

```text
Hi! Thanks for your interest 🙌

This is a tracking issue and may stay open for multiple PRs. Please pick one part to work on (Insertion / Quick / Merge / Heap / tests).

Since this is a public repo, please fork the repository and open a PR.
In your PR description, reference this issue with “Refs #1” (avoid “Fixes/Closes” so the tracking issue won’t auto-close).
```

---

## ✅ Testing

Run:
```bash
npm test
```

If you add a new algorithm:
- Add tests for ascending/descending
- Add tests for edge cases (empty array, single item, duplicates)
- If applicable, add tests for comparator and mixed-type input

---

Thanks for contributing! 🙌
