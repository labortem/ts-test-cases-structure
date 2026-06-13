# Deployment

How this package goes from a pull request to a published version on the registries.

The pipeline follows a GitFlow-style model: work happens on branches, lands on `dev`, then on `master` through pull
requests, and a published GitHub release deploys to the package registries.

```
feature branch ──PR──▶ dev ──PR──▶ master ──push──▶ draft release ──publish──▶ registries
     │                  │            │                    │                        │
   checks             checks    version check        create draft            validate + publish
 (pretty, test)   (pretty, test)  (PR → master)      (tag = version)        (tag/name = version)
```

Every automated write (commits, releases, issues) is performed by the organization bot account **Henri**
(`@labortem-bot`) and, for git commits, SSH-signed so they show up as _Verified_.

## Branch protection (`master`)

`master` is governed by the **Master** repository ruleset:

-   direct pushes are forbidden — changes land only through a pull request,
-   force pushes (`non_fast_forward`) and branch deletion are forbidden,
-   these status checks must pass before merging:
    -   `Check version availability (https://registry.npmjs.org)`
    -   `Test`

The bot bypasses the ruleset (via the `Bots` team) only so the automated revert can push to `master`; see
[Configuration](#configuration).

## Continuous checks (every pull request)

On every pull request, [`checks-on-pull-request.yml`](../.github/workflows/checks-on-pull-request.yml) runs two
independent jobs:

-   **Pretty** — runs `mise run pretty` (Prettier) and commits any formatting back to the PR branch as the bot
    (`[ACTIONS] Pretty [skip ci]`). The `[skip ci]` marker avoids an infinite loop.
-   **Test** — runs `mise run test` (the type-level test suite, type-checked with `tsc`).

On pull requests **targeting `master`**, an extra check runs:
[`check-version-on-pull-request-master.yml`](../.github/workflows/check-version-on-pull-request-master.yml). For each
targeted registry it verifies the version in `package.json` is **not already published**, and fails otherwise. This
blocks a version clash _before_ the merge instead of reverting it afterwards.

## Releasing a new version

1. **Bump the version** in `package.json` on your branch (semantic versioning).
2. Open a **pull request to `master`**. The version-availability check confirms the version is free; `Pretty` and `Test`
   must be green.
3. **Merge** the pull request. The push to `master` triggers
   [`create-release-on-push-master.yml`](../.github/workflows/create-release-on-push-master.yml), which:
    - builds the type declarations (`mise run build`) and packs the tarball (`npm pack`),
    - creates a **draft** GitHub release whose **tag and name are the package version**, with the `.tgz` attached as an
      asset.
4. **Review the draft release** (the body contains a checklist: tag/name match the version, the asset contains the right
   files, the changelog is filled), edit the changelog, then **publish** it.
5. Publishing triggers [`publish-on-release.yml`](../.github/workflows/publish-on-release.yml):
    - **validate** — the release tag and name must both equal the package version, otherwise the release is rejected,
    - **publish** — for each registry, re-checks availability and runs `npm publish` on the tarball,
    - **revert** (on validation failure) — reverts the release commit on `master` and opens a hotfix issue.

## Workflows reference

| Workflow                                                                                                    | Trigger                   | Purpose                                                        |
| ----------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| [`checks-on-pull-request.yml`](../.github/workflows/checks-on-pull-request.yml)                             | `pull_request`            | Format the PR branch and run the test suite                    |
| [`check-version-on-pull-request-master.yml`](../.github/workflows/check-version-on-pull-request-master.yml) | `pull_request` → `master` | Fail if the version already exists on a registry               |
| [`create-release-on-push-master.yml`](../.github/workflows/create-release-on-push-master.yml)               | `push` → `master`         | Build, pack and create a draft release tagged with the version |
| [`publish-on-release.yml`](../.github/workflows/publish-on-release.yml)                                     | `release: published`      | Validate the release and publish the tarball to the registries |

## Registries

The registry list lives in a single repository variable, **`REGISTRIES`** (a JSON array), read via
`fromJSON(vars.REGISTRIES)` by both the version-check and publish matrices. Today a single registry is targeted — GitHub
Packages, authenticated with the bot PAT:

```json
[
	{ "registry": "https://npm.pkg.github.com", "token_secret": "LABORTEM_BOT_PAT" }]
```

Adding another registry is one entry in `REGISTRIES` (a `registry` URL and its `token_secret` — the **name** of the auth
secret, never its value, since the matrix is evaluated before the `secrets` context is available). The new registry then
also appears as its own required status check on the `master` ruleset.

## The bot account

All automation is attributed to **Henri** (`@labortem-bot`), the organization machine account:

-   API actions (release creation, asset upload, issues, revert push) authenticate with the bot PAT `LABORTEM_BOT_PAT`
    instead of the ephemeral `GITHUB_TOKEN` (which would appear as `github-actions[bot]`),
-   git commits are SSH-signed with the bot key, so they are _Verified_ under the bot identity. For the _Verified_ badge
    to appear, the matching public key must be registered on the bot account as a **signing key** (Settings → SSH and
    GPG keys → New SSH key → type _Signing Key_).

Because the bot pushes with a real PAT, its pushes **do** trigger workflows — hence the `[skip ci]` marker on the
automated formatting commit.

## Configuration

### Repository secrets

| Secret                             | Used for                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LABORTEM_BOT_PAT`                 | Bot-authenticated checkouts, release creation, issues, revert push, and publishing to GitHub Packages (requires `write:packages` and `read:packages` scopes) |
| `LABORTEM_BOT_SIGNING_PRIVATE_KEY` | SSH private key used to sign the bot's commits (passphrase-less)                                                                                             |
| `LABORTEM_BOT_GIT_COMMIT_USERNAME` | git author/committer name for bot commits                                                                                                                    |
| `LABORTEM_BOT_GIT_COMMIT_EMAIL`    | git author/committer email for bot commits                                                                                                                   |

### Repository variables

| Variable     | Used for                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------- |
| `REGISTRIES` | JSON array of `{ registry, token_secret }` shared by the version-check and publish matrices |

### Ruleset bypass

The automated `revert` job pushes directly to `master`, which the ruleset normally forbids. To allow it, the **`Bots`**
team (containing Henri) is added as a `bypass_actor` (`always`) on the **Master** ruleset. A team can only be a bypass
actor if it has access to the repository, so the `Bots` team must be granted at least **Write** access to this
repository first.

> If you prefer not to grant a ruleset bypass, the `revert` job can instead open a revert pull request (no bypass
> needed, but the revert is not applied automatically), or be reduced to opening an issue only.
