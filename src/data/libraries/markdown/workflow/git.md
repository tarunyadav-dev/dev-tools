# Git

Git is a distributed version control system (DVCS) designed to track changes in source code, coordinate collaboration between developers, and maintain the complete history of a project.

Unlike cloud platforms such as GitHub or GitLab, Git runs entirely on your local machine. Every repository contains the complete project history, making Git fast, reliable, and usable even without an internet connection.

Git was created in 2005 by **Linus Torvalds** during the development of the Linux kernel and has since become the industry standard version control system.

---

## Overview

Git helps developers answer questions such as:

- What changed?
- Who changed it?
- When was it changed?
- Why was it changed?
- Can this change be reverted?
- Can two developers work simultaneously without conflicts?

Instead of storing complete copies of every file, Git stores snapshots of your project, making operations extremely efficient.

---

## Why Git Exists

Before Git, teams commonly exchanged project folders manually or relied on centralized version control systems.

This approach introduced many problems:

- Files being overwritten
- No reliable history
- Difficult collaboration
- No branching support
- Slow merging
- High risk of data loss

Git solves these problems through:

- Distributed repositories
- Lightweight branches
- Fast merges
- Complete history tracking
- Offline development
- Cryptographic integrity checking

---

## Git vs GitHub

Many beginners confuse Git and GitHub.

| Git | GitHub |
|------|---------|
| Version control software | Cloud hosting platform |
| Runs locally | Runs on the internet |
| Open source | Commercial platform |
| Tracks project history | Hosts Git repositories |
| Works without internet | Requires internet for remote features |

:::note

Git does **not** require GitHub.

GitHub simply hosts Git repositories remotely and provides collaboration features such as Pull Requests, Issues, Discussions, Releases, and Actions.

:::

---

## Industry Applications

Git is used in nearly every software engineering domain.

Examples include:

- Web Development
- Backend APIs
- Mobile Applications
- Machine Learning
- Data Science
- DevOps
- Embedded Systems
- Game Development
- Linux Kernel Development
- Open Source Projects

---

## How Git Works

Git maintains three primary areas while you work.

```text
Working Directory

        │

        ▼

Staging Area (Index)

        │

        ▼

Repository (.git)
```

Every Git command moves changes between these areas.

Understanding these three stages is one of the most important Git concepts.

:::tip

Most Git problems occur because developers don't understand the difference between the **Working Directory**, **Staging Area**, and the **Repository**.

Master these three concepts before memorizing commands.

:::

---

## Git Workflow

A standard development workflow looks like this.

```text
Create Repository

↓

Modify Files

↓

git status

↓

git add

↓

git commit

↓

git pull

↓

Resolve Conflicts (if any)

↓

git push
```

For collaborative projects this workflow repeats hundreds of times every day.

---

## Installation

:::tabs

=== Windows

Download Git from the official website.

https://git-scm.com/downloads

Run the installer using the default configuration.

=== Ubuntu

```bash
sudo apt update

sudo apt install git
```

=== Arch Linux

```bash
sudo pacman -S git
```

=== Fedora

```bash
sudo dnf install git
```

=== macOS

```bash
brew install git
```

:::

---

## Verify Installation

```bash
git --version
```

Example output:

```text
git version 2.51.0
```

---

## Configure Git

Before creating repositories, configure your identity.

```bash
git config --global user.name "Your Name"

git config --global user.email "you@example.com"
```

Git stores this information inside every commit you create.

Verify your configuration.

```bash
git config --list
```

---

## Global vs Local Configuration

| Scope | Description |
|--------|-------------|
| System | Entire computer |
| Global | Current user |
| Local | Current repository |

In most cases, developers use the **Global** configuration for their personal machine.

:::warning

Never commit using someone else's name or email.

Incorrect Git identity becomes part of the project's permanent history.

:::

---

# Creating Your First Repository

A Git repository is a directory whose history is tracked by Git.

Every repository contains a hidden folder named `.git` which stores all commits, branches, references, configuration, logs, and object data.

Without the `.git` directory, a folder is just a normal folder.

---

## Initialize a Repository

```bash
git init
```

This command converts the current directory into a Git repository.

Example:

```bash
mkdir portfolio

cd portfolio

git init
```

Output

```text
Initialized empty Git repository in /portfolio/.git/
```

Git creates the hidden `.git` folder automatically.

---

## Clone an Existing Repository

Instead of creating a new repository, developers usually clone an existing remote project.

```bash
git clone <repository-url>
```

Example

```bash
git clone https://github.com/facebook/react.git
```

Git automatically performs:

- Download repository
- Download commit history
- Create working directory
- Configure remote origin
- Checkout default branch

After cloning, the project is immediately ready to use.

---

## Repository Structure

After initialization, a repository looks similar to this.

:::tree

project/
├── .git/
├── src/
├── public/
├── package.json
└── README.md

:::

The `.git` directory contains the complete repository database.

---

## Inside the .git Folder

:::tree

.git/
├── HEAD
├── config
├── description
├── hooks/
├── index
├── info/
├── logs/
├── objects/
├── refs/
└── packed-refs

:::

Important files include:

| File | Purpose |
|------|----------|
| HEAD | Current checked-out branch |
| config | Repository configuration |
| hooks | Client-side automation scripts |
| objects | Stores commits, trees and blobs |
| refs | Branches and tags |
| logs | Reference history |
| index | Staging area database |

:::danger

Never manually edit files inside the `.git` directory unless you understand Git internals.

Incorrect modifications may permanently corrupt the repository.

:::

---

## Understanding HEAD

HEAD represents your current working position.

Normally it points to the active branch.

Example

```text
HEAD

↓

main

↓

Latest Commit
```

Whenever you switch branches, Git simply changes where HEAD points.

---

## Three Areas of Git

Git separates your work into three different areas.

```text
Working Directory

↓

Staging Area (Index)

↓

Local Repository
```

### Working Directory

Contains the files you edit.

Changes here are **not** yet tracked by Git.

---

### Staging Area

Also called the **Index**.

Files added here become part of the next commit.

Think of the staging area as a "shopping cart" for your commit.

---

### Local Repository

Stores the permanent commit history.

Once changes reach the repository, Git records them as a snapshot.

---

## Checking Repository Status

The most frequently used Git command.

```bash
git status
```

Example

```text
On branch main

No commits yet

nothing to commit
```

When files change:

```text
modified: app.ts

Untracked files:

README.md
```

Industry practice:

Run `git status` before almost every commit.

It prevents accidental commits and quickly shows the current repository state.

---

## Understanding File States

Every file in Git belongs to one of several states.

```text
Untracked

↓

Tracked

↓

Modified

↓

Staged

↓

Committed
```

### Untracked

Git has never seen the file.

### Tracked

Git already knows this file.

### Modified

The tracked file has changed.

### Staged

The changes are prepared for the next commit.

### Committed

The snapshot has been permanently recorded.

Understanding these states removes much of the confusion beginners face.

---

## Staging Files

Add one file.

```bash
git add app.ts
```

Add multiple files.

```bash
git add app.ts server.ts README.md
```

Stage every modified file.

```bash
git add .
```

Stage every tracked modification.

```bash
git add -u
```

Stage interactively.

```bash
git add -p
```

---

## Industry Recommendation

Avoid always using

```bash
git add .
```

Instead, review changes first.

```bash
git status

git diff

git add specific-file.ts
```

This prevents accidental commits of temporary files.

---

## Viewing Changes

See unstaged changes.

```bash
git diff
```

See staged changes.

```bash
git diff --cached
```

Compare commits.

```bash
git diff HEAD~1 HEAD
```

Large teams use `git diff` continuously before committing.

---

## Creating Your First Commit

After staging files:

```bash
git commit -m "Initial project setup"
```

Git creates a permanent snapshot.

Every commit contains:

- Author
- Email
- Timestamp
- Parent commit
- Commit message
- File snapshot

Commits are immutable.

They should represent one meaningful logical change.

---

## Writing Good Commit Messages

Avoid messages like:

```text
update

changes

fix

work

final
```

Good examples:

```text
Initialize Next.js project

Add authentication middleware

Implement markdown parser

Fix sidebar scrolling bug

Refactor React Flow renderer

Improve documentation layout
```

:::tip

A commit should answer one question:

**What changed?**

A future developer should understand the purpose without opening the code.

:::

---

## Conventional Commits

Many companies follow the Conventional Commits specification.

Examples:

```text
feat: add authentication

fix: resolve login bug

docs: update installation guide

style: format sidebar component

refactor: simplify parser logic

perf: optimize markdown rendering

test: add parser unit tests

build: update dependencies

ci: configure GitHub Actions

chore: remove unused files
```

Using this format makes changelogs and release automation much easier.

---

## Common Beginner Mistakes

- Committing unrelated changes together.
- Using meaningless commit messages.
- Forgetting to review `git diff`.
- Committing generated files accidentally.
- Forgetting `.gitignore`.
- Creating huge commits containing hundreds of unrelated changes.

:::warning

Small, focused commits are easier to review, debug, revert, and understand.

Large commits make collaboration difficult.

:::

---

# Branching

A branch is an independent line of development.

Instead of modifying the main project directly, developers create separate branches for features, bug fixes, experiments, or releases.

Every branch has its own commit history while still sharing the project's common history.

Git branches are extremely lightweight because they simply point to commits rather than copying the entire project.

---

## Why Branches Exist

Imagine five developers working on the same project.

Without branches:

- Everyone edits the same code.
- Files overwrite each other.
- Bugs reach production easily.
- Collaboration becomes difficult.

Branches solve these problems by allowing developers to work independently.

Example:

```text
                main
                 │
                 ●
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼

 feature/login      feature/profile

        │                 │

        ●                 ●

        │                 │

        └────────┬────────┘

                 ▼

               merge
```

---

## Viewing Branches

Show all local branches.

```bash
git branch
```

Example

```text
* main
  develop
  feature/auth
```

The `*` indicates the current branch.

---

## Create a Branch

```bash
git branch feature/login
```

This creates a new branch.

You remain on your current branch.

---

## Switch Branch

Modern Git

```bash
git switch feature/login
```

Older Git

```bash
git checkout feature/login
```

Industry recommendation:

Prefer `git switch` because it has a clearer purpose.

---

## Create and Switch

Instead of two commands

```bash
git branch feature/login

git switch feature/login
```

Use

```bash
git switch -c feature/login
```

This is the command most developers use daily.

---

## Delete a Branch

Delete merged branch.

```bash
git branch -d feature/login
```

Force delete.

```bash
git branch -D feature/login
```

:::warning

Never force delete a branch unless you are certain the work is no longer required.

:::

---

## Rename Branch

Rename current branch.

```bash
git branch -m new-name
```

Example

```bash
git branch -m feature/authentication
```

---

## Branch Naming

Use meaningful names.

Good examples

```text
feature/login

feature/dashboard

fix/navbar

fix/payment

docs/git-handbook

refactor/parser

release/v1.2.0
```

Avoid

```text
branch1

test

new

work

abc
```

---

# Merge

A merge combines changes from one branch into another.

Example

```text
main

●────●────●

      \
       \
feature

        ●────●

              │

              ▼

            merge
```

Command

```bash
git merge feature/login
```

Git attempts to combine histories automatically.

---

## Fast Forward Merge

If no commits exist on the target branch, Git simply moves the branch pointer.

Example

```text
Before

main

●────●

       \
        ●────●

After

main

●────●────●────●
```

No merge commit is created.

---

## Three-Way Merge

When both branches contain new commits, Git creates a merge commit.

Example

```text
main

●────●────●

      \

       ●────●

            │

            ▼

            ● Merge Commit
```

This preserves both histories.

---

# Merge Conflicts

Sometimes two developers edit the same lines.

Git cannot decide which version should survive.

Example

Developer A

```tsx
const theme = "dark";
```

Developer B

```tsx
const theme = "light";
```

Git reports

```text
CONFLICT (content)
```

You must resolve the conflict manually.

---

## Conflict Markers

Git inserts markers.

```text
<<<<<<< HEAD

Current branch

=======

Incoming branch

>>>>>>> feature/login
```

Remove the markers.

Keep the correct code.

Then

```bash
git add .

git commit
```

Conflict resolved.

---

:::tip

Merge conflicts are normal.

Experienced developers solve them daily.

Do not panic when Git reports conflicts.

:::

---

# Rebase

Rebase rewrites commit history by placing your commits on top of another branch.

Example

Before

```text
main

●────●────●

      \

       ●────●
```

After

```text
main

●────●────●────●────●
```

History becomes linear.

Command

```bash
git rebase main
```

---

## Merge vs Rebase

| Merge | Rebase |
|--------|---------|
| Preserves history | Rewrites history |
| Creates merge commit | No merge commit |
| Safer | Cleaner history |
| Easier for beginners | Requires understanding |

Industry practice

- Private branches → Rebase
- Shared branches → Merge

---

:::danger

Never rebase commits that other developers are already using.

History rewriting can break shared repositories.

:::

---

# Cherry Pick

Cherry Pick copies one specific commit into another branch.

Command

```bash
git cherry-pick <commit-id>
```

Useful when only one bug fix should be copied.

---

# Detached HEAD

HEAD normally points to a branch.

Detached HEAD means HEAD points directly to a commit.

Example

```bash
git checkout a37d82
```

Now

```text
HEAD

↓

Commit

↓

No Branch
```

Commits made here can become unreachable.

To continue working safely

```bash
git switch -c experiment
```

---

# Industry Branching Strategies

Large companies follow consistent branching models.

---

## GitHub Flow

Simple workflow.

```text
main

↓

feature branch

↓

Pull Request

↓

Review

↓

Merge

↓

Delete Branch
```

Recommended for most web applications.

---

## Git Flow

Uses dedicated branches.

```text
main

develop

feature/*

release/*

hotfix/*
```

Suitable for large enterprise software.

---

## Trunk Based Development

Everyone works on a single branch.

Small feature branches.

Very frequent merges.

Common in companies practicing Continuous Deployment.

---

## Which Strategy Should You Use?

| Project | Recommendation |
|----------|----------------|
| Personal Projects | GitHub Flow |
| Startups | GitHub Flow |
| Open Source | GitHub Flow |
| Enterprise Products | Git Flow |
| CI/CD Heavy Teams | Trunk Based Development |

---

## Best Practices

- Create one branch per feature.
- Merge frequently.
- Delete merged branches.
- Keep branches small.
- Pull latest changes before merging.
- Review Pull Requests carefully.
- Avoid long-lived branches.

---

## Common Errors

### Merge Conflict

Resolve manually.

### Branch Already Exists

Choose another branch name.

### Detached HEAD

Create a new branch immediately.

### Accidentally Commit to Main

Create a new branch.

Cherry-pick the commit.

Reset main.

---

:::success

Branches allow developers to experiment freely without affecting the main project.

Mastering branching and merging is one of the most valuable Git skills for professional software development.

:::

---

# Remote Repositories

Until now, every repository we created exists only on our local computer.

A **remote repository** is a copy of your Git repository stored on another machine or cloud service.

Popular remote hosting platforms include:

- GitHub
- GitLab
- Bitbucket
- Azure DevOps

Remote repositories allow multiple developers to collaborate on the same project.

---

## Git and GitHub

Git and GitHub serve different purposes.

Git is responsible for:

- Tracking history
- Creating commits
- Managing branches
- Merging changes

GitHub provides:

- Remote repository hosting
- Pull Requests
- Code Reviews
- Issue Tracking
- Releases
- Repository Security
- Team Collaboration

Think of GitHub as a collaboration platform built on top of Git.

---

## Create a Remote

After creating a repository on GitHub, connect it to your local project.

```bash
git remote add origin https://github.com/username/project.git
```

Verify configured remotes.

```bash
git remote -v
```

Example

```text
origin

https://github.com/username/project.git
```

---

## What is Origin?

`origin` is simply the default name for the remote repository.

It is **not** a special Git keyword.

You can use any name.

Example

```bash
git remote add production https://...
```

However, almost every project uses **origin**.

---

## Clone Repository

Clone downloads an existing project together with its history.

```bash
git clone https://github.com/facebook/react.git
```

Git automatically:

- Downloads commits
- Downloads branches
- Creates working directory
- Configures origin
- Checks out the default branch

---

## Fetch

Download changes without modifying your local branch.

```bash
git fetch
```

Useful when you want to inspect incoming changes before merging.

---

## Pull

Download and merge changes.

```bash
git pull
```

Internally

```text
git fetch

↓

git merge
```

Most developers execute `git pull` before starting work.

---

## Push

Upload local commits.

```bash
git push
```

Push current branch.

```bash
git push origin main
```

Push new branch.

```bash
git push origin feature/login
```

---

## First Push

The first push usually requires

```bash
git push -u origin main
```

The `-u` flag creates an upstream relationship.

Future pushes become

```bash
git push
```

without specifying the branch.

---

## Remote Branches

List remote branches.

```bash
git branch -r
```

List both local and remote.

```bash
git branch -a
```

---

## View Remote Information

```bash
git remote show origin
```

Displays

- Fetch URL
- Push URL
- Remote branches
- Tracking branches

---

## Remove Remote

```bash
git remote remove origin
```

---

## Change Remote URL

```bash
git remote set-url origin NEW_URL
```

Useful after moving repositories.

---

# HTTPS vs SSH

GitHub supports two authentication methods.

---

## HTTPS

Example

```text
https://github.com/user/project.git
```

Advantages

- Easy to setup
- Works everywhere

Disadvantages

- Authentication required

---

## SSH

Example

```text
git@github.com:user/project.git
```

Advantages

- Faster authentication
- No repeated password prompts
- Industry standard

Disadvantages

- Initial configuration required

---

## Generate SSH Key

```bash
ssh-keygen -t ed25519
```

Copy the public key.

```bash
cat ~/.ssh/id_ed25519.pub
```

Paste it into

```text
GitHub

↓

Settings

↓

SSH and GPG Keys
```

Test connection.

```bash
ssh -T git@github.com
```

Expected output

```text
Hi username!

You've successfully authenticated.
```

:::tip

Professional developers generally prefer SSH for daily development.

:::

---

# .gitignore

Some files should never be committed.

Examples include:

- node_modules
- .env
- build
- dist
- logs
- cache
- temporary files

Example

```text
node_modules/

.env

dist/

build/

*.log

.cache/
```

---

## Why Ignore Files?

Ignoring unnecessary files keeps repositories:

- Smaller
- Cleaner
- Faster
- More secure

:::danger

Never commit:

- API Keys
- Passwords
- Database Credentials
- Private Certificates
- Secret Tokens

Use environment variables instead.

:::

---

# Fork

Fork creates your own copy of another person's repository.

Typical workflow

```text
Original Repository

↓

Fork

↓

Clone

↓

Create Branch

↓

Commit

↓

Push

↓

Pull Request
```

Forking is commonly used in open source projects.

---

# Pull Request

A Pull Request (PR) asks maintainers to review your changes before merging.

Typical process

```text
Create Branch

↓

Commit

↓

Push

↓

Open Pull Request

↓

Code Review

↓

Changes Requested

↓

Approve

↓

Merge
```

Good Pull Requests are:

- Small
- Well documented
- Focused on one feature
- Easy to review

---

# Open Source Contribution Workflow

```text
Fork Repository

↓

Clone Fork

↓

Create Feature Branch

↓

Write Code

↓

Commit

↓

Push

↓

Open Pull Request

↓

Review

↓

Merge
```

This workflow is used by projects such as:

- React
- Next.js
- Linux
- Kubernetes
- TensorFlow

---

# Daily Git Workflow

A typical workday looks like this.

```text
git pull

↓

Create Feature Branch

↓

Write Code

↓

git status

↓

git diff

↓

git add

↓

git commit

↓

git push

↓

Open Pull Request
```

Following the same workflow every day reduces mistakes and keeps project history clean.

---

# Best Practices

- Pull before starting work.
- Commit frequently.
- Push completed work.
- Never commit secrets.
- Use feature branches.
- Write meaningful commit messages.
- Review changes using `git diff`.
- Keep Pull Requests focused.
- Prefer SSH authentication.

---

# Common Errors

### Authentication Failed

Usually caused by:

- Incorrect credentials
- Expired token
- Wrong SSH key

---

### Push Rejected

Another developer pushed changes first.

Solution

```bash
git pull

git push
```

---

### Remote Already Exists

```text
fatal: remote origin already exists
```

Check configured remotes.

```bash
git remote -v
```

---

### Permission Denied (SSH)

Verify your SSH key is added to GitHub.

Test

```bash
ssh -T git@github.com
```

---

:::success

Local Git manages your project's history.

GitHub enables collaboration.

Mastering both allows you to work efficiently in personal projects, startups, enterprise teams, and open-source communities.

:::

---

# Git Internals

Although Git appears to store files, it actually stores snapshots of your project.

Every object inside Git is identified using a cryptographic hash.

Git stores four primary object types.

| Object | Purpose |
|----------|----------|
| Blob | Stores file contents |
| Tree | Stores directory structure |
| Commit | Stores project snapshot |
| Tag | Named reference to a commit |

---

## Blob

A Blob stores only file content.

It does **not** store:

- filename
- directory
- permissions

Multiple files with identical content share the same Blob.

---

## Tree

A Tree represents folders.

It connects:

- filenames
- permissions
- blobs
- subdirectories

---

## Commit

A commit stores:

- Tree reference
- Parent commit
- Author
- Committer
- Timestamp
- Commit message

Every commit references the complete project snapshot.

---

## SHA Hash

Git identifies every object using SHA.

Example

```text
3b18e13c2d52d...
```

Modern Git supports SHA-256 while older repositories commonly use SHA-1.

Hashes uniquely identify commits.

---

## View Commit History

Compact history

```bash
git log --oneline
```

Detailed history

```bash
git log
```

Graph view

```bash
git log --graph --oneline --decorate --all
```

Industry recommendation

Alias this command because you'll use it frequently.

---

## View Commit Details

```bash
git show
```

Specific commit

```bash
git show <commit-id>
```

Displays:

- Metadata
- Changed files
- Diff

---

# Undoing Changes

One of the most important Git skills is knowing how to safely undo mistakes.

---

## Restore

Discard unstaged changes.

```bash
git restore file.ts
```

Restore everything.

```bash
git restore .
```

---

## Reset

Unstage files.

```bash
git reset
```

Reset to previous commit.

```bash
git reset HEAD~1
```

Soft reset

```bash
git reset --soft HEAD~1
```

Mixed reset

```bash
git reset --mixed HEAD~1
```

Hard reset

```bash
git reset --hard HEAD~1
```

| Reset Type | Commit | Stage | Working Directory |
|------------|--------|-------|-------------------|
| Soft | ✔ | ✘ | ✘ |
| Mixed | ✔ | ✔ | ✘ |
| Hard | ✔ | ✔ | ✔ |

:::danger

Never use

```bash
git reset --hard
```

unless you are certain you no longer need the discarded work.

:::

---

## Revert

Undo a commit without rewriting history.

```bash
git revert <commit-id>
```

Git creates a new commit that reverses the previous one.

Recommended for shared repositories.

---

# Stash

Temporarily save unfinished work.

Save changes

```bash
git stash
```

List stashes

```bash
git stash list
```

Restore latest stash

```bash
git stash pop
```

Apply without deleting

```bash
git stash apply
```

Useful when switching branches quickly.

---

# Tags

Tags mark important commits.

Example

```bash
git tag v1.0.0
```

Annotated tag

```bash
git tag -a v1.0.0
```

Push tags

```bash
git push origin --tags
```

Tags commonly represent releases.

---

# Git Clean

Remove untracked files.

Preview

```bash
git clean -n
```

Delete

```bash
git clean -f
```

Remove directories

```bash
git clean -fd
```

:::warning

Always preview using

```bash
git clean -n
```

before deleting files.

:::

---

# Git Reflog

Reflog records every movement of HEAD.

View

```bash
git reflog
```

Useful when recovering lost commits.

Many "deleted" commits can still be recovered using reflog.

---

# Git Bisect

Git Bisect performs binary search through commit history.

Start

```bash
git bisect start
```

Mark bad commit

```bash
git bisect bad
```

Mark good commit

```bash
git bisect good <commit-id>
```

Git automatically narrows the search.

Extremely useful for debugging regressions.

---

# Git Aliases

Aliases reduce repetitive typing.

Example

```bash
git config --global alias.st status

git config --global alias.co checkout

git config --global alias.br branch

git config --global alias.cm commit

git config --global alias.lg "log --graph --oneline --decorate --all"
```

Now

```bash
git st

git lg
```

replace much longer commands.

---

# Performance Tips

- Clone shallow repositories when history isn't required.
- Keep commits focused.
- Avoid committing generated files.
- Use `.gitignore`.
- Review diffs before commits.
- Pull frequently.
- Push frequently.
- Delete merged branches.
- Compress repositories using Git GC.

---

# Common Interview Questions

- Difference between Git and GitHub?
- Merge vs Rebase?
- Fetch vs Pull?
- Reset vs Restore vs Revert?
- Blob vs Tree?
- Detached HEAD?
- Cherry Pick?
- Stash?
- Fast Forward Merge?
- Why use `.gitignore`?
- Why are commits immutable?
- Explain Git Internals.

---

# Daily Command Cheatsheet

```bash
git status

git add .

git commit -m ""

git pull

git push

git branch

git switch

git merge

git rebase

git stash

git log --oneline

git diff

git restore

git reset

git show

git fetch

git remote -v

git clone

git tag

git reflog
```

---

# Keyboard Shortcuts

| Shortcut | Description |
|----------|-------------|
| ↑ | Previous command |
| Tab | Auto complete |
| Ctrl + C | Cancel command |
| Ctrl + L | Clear terminal |
| Ctrl + R | Search command history |

---

# Recommended Git Configuration

```bash
git config --global init.defaultBranch main

git config --global pull.rebase false

git config --global core.editor "code --wait"

git config --global color.ui auto
```

---

# Recommended Open Source Repositories

Studying large repositories teaches Git workflows and project organization.

- Linux Kernel
- React
- Next.js
- Kubernetes
- VS Code
- TensorFlow
- PyTorch
- TypeScript
- FastAPI
- Node.js

---

# Recommended Videos

:::video

https://www.youtube.com/watch?v=RGOj5yH7evk

:::

:::video

https://www.youtube.com/watch?v=8JJ101D3knE

:::

:::video

https://www.youtube.com/watch?v=Uszj_k0DGsg

:::

---

# Resources

:::resources

Official Git Documentation

https://git-scm.com/docs

Git Book

https://git-scm.com/book/en/v2

Git Reference

https://git-scm.com/docs

GitHub Docs

https://docs.github.com

Atlassian Git Tutorials

https://www.atlassian.com/git

Learn Git Branching

https://learngitbranching.js.org

Conventional Commits

https://www.conventionalcommits.org

Git Ignore Templates

https://github.com/github/gitignore

Git Cheat Sheet

https://education.github.com/git-cheat-sheet-education.pdf

:::

---

# Related Documentation

:::related

github

gitignore

github-actions

docker

linux

bash

vscode

terminal

ssh

:::

---

# Checklist

- [x] Install Git
- [x] Configure Git
- [x] Create Repository
- [x] Clone Repository
- [x] Understand Working Tree
- [x] Stage Files
- [x] Create Commits
- [x] Branching
- [x] Merge
- [x] Resolve Conflicts
- [x] Rebase
- [x] Cherry Pick
- [x] Remote Repositories
- [x] GitHub Integration
- [x] Pull Requests
- [x] SSH Authentication
- [x] Git Internals
- [x] Reset
- [x] Restore
- [x] Revert
- [x] Stash
- [x] Tags
- [x] Reflog
- [x] Bisect
- [x] Performance Tips
- [x] Best Practices
- [x] Resources

---

> Git is more than a collection of commands. It is a way of thinking about software history, collaboration, experimentation, and recovery. Developers who understand Git concepts—not just command syntax—work more confidently, resolve problems faster, and collaborate more effectively. Master the concepts first; the commands will naturally become second nature.