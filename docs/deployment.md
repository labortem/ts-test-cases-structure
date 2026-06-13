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
    -   `Version gate` (a fixed-name job that aggregates every registry leg of the version check)
    -   `Test`

The bot bypasses the ruleset (via the `Bots` team) only so the automated revert can push to `master`; see
[Configuration](#configuration).

## Continuous checks (every pull request)

On every pull request, [`checks-on-pull-request.yml`](../.github/workflows/checks-on-pull-request.yml) runs two
independent jobs:

-   **Pretty** — runs `mise run pretty` (Prettier) and commits any formatting back to the PR branch as the bot
    (`[ACTIONS] Pretty`). The commit re-triggers the checks, but Prettier is idempotent, so the next run finds nothing
    to format and makes no commit — no loop, and `Test` / `Version gate` report on the final commit.
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
    - **publish** — for each registry: publishes the release tarball if the version is missing there; **skips** if the
      version already exists with a matching integrity; **fails** if it exists with a different integrity (a registry
      desync),
    - **revert** (only on the `release` event, on validation failure) — reverts the release commit on `master` and opens
      a hotfix issue.

### Re-publishing an existing version to a new registry

`publish-on-release.yml` also has a `workflow_dispatch` trigger taking a `tag` input, so an already-released version can
be pushed to a registry that was added later — **without any code change or version bump**:

1. add the new registry (and its `token_secret`) to `DEPLOYMENT_REGISTRIES`, and create that secret,
2. run the workflow manually with `tag` set to the release tag (e.g. `1.0.0`).

It checks out the tag, re-downloads that release's tarball, and applies the same per-registry logic: registries that
already have the version (with matching integrity) are skipped, the new one is published. Because the published artifact
is always the release's attached tarball — never a rebuild — every registry receives identical bytes, and the integrity
check catches any divergence instead of compounding it.

## Workflows reference

| Workflow                                                                                                    | Trigger                   | Purpose                                                        |
| ----------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| [`checks-on-pull-request.yml`](../.github/workflows/checks-on-pull-request.yml)                             | `pull_request`            | Format the PR branch and run the test suite                    |
| [`check-version-on-pull-request-master.yml`](../.github/workflows/check-version-on-pull-request-master.yml) | `pull_request` → `master` | Fail if the version already exists on a registry               |
| [`create-release-on-push-master.yml`](../.github/workflows/create-release-on-push-master.yml)               | `push` → `master`         | Build, pack and create a draft release tagged with the version |
| [`publish-on-release.yml`](../.github/workflows/publish-on-release.yml)                                     | `release: published`      | Validate the release and publish the tarball to the registries |

## Registries

The registry list lives in a single repository variable, **`DEPLOYMENT_REGISTRIES`** (a JSON array), read via
`fromJSON(vars.DEPLOYMENT_REGISTRIES)` by both the version-check and publish matrices. Today a single registry is
targeted — GitHub Packages, authenticated with the bot PAT:

```json
[
	{ "registry": "https://npm.pkg.github.com", "token_secret": "LABORTEM_BOT_PAT" }]
```

Adding another registry is one entry in `DEPLOYMENT_REGISTRIES` (a `registry` URL and its `token_secret` — the **name**
of the auth secret, never its value, since the matrix is evaluated before the `secrets` context is available). The
`master` ruleset requires the fixed-name `Version gate` job (which aggregates all registry legs), so adding a registry
needs **no** ruleset change.

## The bot account

All automation is attributed to **Henri** (`@labortem-bot`), the organization machine account:

-   API actions (release creation, asset upload, issues, revert push) authenticate with the bot PAT `LABORTEM_BOT_PAT`
    instead of the ephemeral `GITHUB_TOKEN` (which would appear as `github-actions[bot]`),
-   git commits are SSH-signed with the bot key, so they are _Verified_ under the bot identity. For the _Verified_ badge
    to appear, the matching public key must be registered on the bot account as a **signing key** (Settings → SSH and
    GPG keys → New SSH key → type _Signing Key_).

Because the bot pushes with a real PAT, its pushes **do** trigger workflows. This is intentional: the formatting commit
must re-run the required checks (`Test`, `Version gate`) so they report on the PR's final commit. A `[skip ci]` marker
would skip every workflow for that commit and leave the required checks stuck on "Expected".

## Configuration

### Repository secrets

| Secret                             | Used for                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LABORTEM_BOT_PAT`                 | Bot-authenticated checkouts, release creation, issues, revert push, and publishing to GitHub Packages (requires `write:packages` and `read:packages` scopes) |
| `LABORTEM_BOT_SIGNING_PRIVATE_KEY` | SSH private key used to sign the bot's commits (passphrase-less)                                                                                             |
| `LABORTEM_BOT_GIT_COMMIT_USERNAME` | git author/committer name for bot commits                                                                                                                    |
| `LABORTEM_BOT_GIT_COMMIT_EMAIL`    | git author/committer email for bot commits                                                                                                                   |

### Repository variables

| Variable                | Used for                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `DEPLOYMENT_REGISTRIES` | JSON array of `{ registry, token_secret }` shared by the version-check and publish matrices |

### Ruleset bypass

The automated `revert` job pushes directly to `master`, which the ruleset normally forbids. To allow it, the **`Bots`**
team (containing Henri) is added as a `bypass_actor` (`always`) on the **Master** ruleset. A team can only be a bypass
actor if it has access to the repository, so the `Bots` team must be granted at least **Write** access to this
repository first.

> If you prefer not to grant a ruleset bypass, the `revert` job can instead open a revert pull request (no bypass
> needed, but the revert is not applied automatically), or be reduced to opening an issue only.
