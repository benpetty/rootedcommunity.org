-include .env
export

.DEFAULT_GOAL := help

.PHONY: help install dev build preview studio deploy-studio seed seed-replace patch-mission-toc og-image lint format upgrade upgrade-latest

help: ## Show this help message with all available targets
	@grep -hE '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies for root and studio/
	yarn install
	@if [ -d studio ]; then cd studio && yarn install; fi

dev: ## Start the Astro dev server at localhost:4321
	yarn dev

build: ## Build the production site to ./dist/
	yarn build

preview: ## Preview the production build locally
	yarn preview

studio: ## Start the Sanity Studio dev server at localhost:3333
	cd studio && npx sanity dev

deploy-studio: ## Deploy Sanity Studio to rooted-community.sanity.studio
	cd studio && npx sanity deploy

seed: ## Seed Sanity with verbatim content (only adds missing docs; uses CLI auth)
	node scripts/seed.mjs | (cd studio && npx -y sanity@latest datasets import - $(SANITY_DATASET) --missing)

seed-replace: ## Re-seed Sanity, overwriting any existing docs (destructive — overwrites Studio edits)
	node scripts/seed.mjs | (cd studio && npx -y sanity@latest datasets import - $(SANITY_DATASET) --replace)

og-image: ## Regenerate public/og-default.jpg (fallback social-sharing image)
	node scripts/og-default.mjs

patch-mission-toc: ## Add Theory of Change drafts to missionPage (surgical, leaves other fields alone)
	cd studio && npx sanity exec ../scripts/patch-mission-toc.mjs --with-user-token

lint: ## Run ESLint
	yarn lint

format: ## Auto-fix lint and formatting issues
	yarn format

# Upgrade dependencies to their latest minor/patch versions, respecting the
# tilde (~) ranges in package.json. Safe for routine maintenance — will not
# introduce breaking major-version changes.
upgrade: ## Upgrade deps within tilde range (safe minor/patch bumps)
	-@yarn outdated
	@yarn upgrade --tilde

# Upgrade dependencies to their absolute latest versions, ignoring semver
# ranges in package.json entirely. Use when intentionally adopting major
# version bumps. Review the `yarn outdated` output before and after carefully.
upgrade-latest: ## Upgrade deps to absolute latest, ignoring semver
	-@yarn outdated
	@yarn upgrade --latest
	-@yarn outdated
