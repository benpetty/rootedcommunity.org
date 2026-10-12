-include .env
export

.DEFAULT_GOAL := help

.PHONY: help install dev build preview studio deploy-studio seed seed-replace patch-mission-toc publish-drafts image-review og-image lint format upgrade upgrade-latest

help: ## Show this help message with all available targets
	@grep -hE '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies for root and studio/
	pnpm install
	@if [ -d studio ]; then cd studio && pnpm install; fi

dev: ## Start the Astro dev server at localhost:4321
	pnpm dev

build: ## Build the production site to ./dist/
	pnpm build

preview: ## Preview the production build locally
	pnpm preview

studio: ## Start the Sanity Studio dev server at localhost:3333
	cd studio && pnpm exec sanity dev

deploy-studio: ## Deploy Sanity Studio to rooted-community.sanity.studio
	cd studio && pnpm exec sanity deploy

seed: ## Seed Sanity with verbatim content (only adds missing docs; uses CLI auth)
	node scripts/seed.mjs | (cd studio && pnpm dlx sanity@latest datasets import - $(SANITY_DATASET) --missing)

seed-replace: ## Re-seed Sanity, overwriting any existing docs (destructive — overwrites Studio edits)
	node scripts/seed.mjs | (cd studio && pnpm dlx sanity@latest datasets import - $(SANITY_DATASET) --replace)

og-image: ## Regenerate public/og-default.jpg (fallback social-sharing image)
	node scripts/og-default.mjs

patch-mission-toc: ## Add Theory of Change drafts to missionPage (surgical, leaves other fields alone)
	cd studio && pnpm exec sanity exec ../scripts/patch-mission-toc.mjs --with-user-token

publish-drafts: ## Patch all 7 programs + Theory of Change with framework-level draft content (surgical; uses temp editor token)
	@echo "Creating temporary editor token..."
	@TOKEN_JSON=$$(cd studio && pnpm dlx sanity@latest tokens add "Bulk content patch (temp)" --role editor --json); \
	TOKEN_ID=$$(echo "$$TOKEN_JSON" | node -e "let s=''; process.stdin.on('data',c=>s+=c).on('end',()=>console.log(JSON.parse(s).id))"); \
	TOKEN_KEY=$$(echo "$$TOKEN_JSON" | node -e "let s=''; process.stdin.on('data',c=>s+=c).on('end',()=>console.log(JSON.parse(s).key))"); \
	echo "Patching documents..."; \
	SANITY_WRITE_TOKEN="$$TOKEN_KEY" node scripts/publish-drafts.mjs; \
	echo "Cleaning up temporary token..."; \
	(cd studio && pnpm dlx sanity@latest tokens delete "$$TOKEN_ID" --yes) || echo "Token cleanup failed; delete '$$TOKEN_ID' manually if needed"

image-review: ## Print draft asset URLs for the 8 hero-image slots (no writes)
	node scripts/image-review.mjs

lint: ## Run ESLint
	pnpm lint

format: ## Auto-fix lint and formatting issues
	pnpm format

# Upgrade dependencies within the semver ranges in package.json. Safe for
# routine maintenance — will not introduce breaking major-version changes.
upgrade: ## Upgrade deps within their package.json ranges (safe bumps)
	-@pnpm outdated
	@pnpm update

# Upgrade dependencies to their absolute latest versions, ignoring semver
# ranges in package.json entirely. Use when intentionally adopting major
# version bumps. Review the `pnpm outdated` output before and after carefully.
upgrade-latest: ## Upgrade deps to absolute latest, ignoring semver
	-@pnpm outdated
	@pnpm update --latest
	-@pnpm outdated
