#!/usr/bin/env bash
set -euo pipefail
# Usage:
#   bash scripts/import_tutorial_subtree.sh <repo_url> [branch] [category] [folder]
#   category ∈ {payload,nextjs,tailwind}
#   folder   final directory name inside the category (e.g., 20250812_forms_tutorial)

REPO_URL="${1:-}"; BRANCH="${2:-main}"; CATEGORY="${3:-payload}"; FOLDER="${4:-}"
if [[ -z "$REPO_URL" ]]; then echo "Error: repo_url required"; exit 1; fi
if [[ ! "$CATEGORY" =~ ^(payload|nextjs|tailwind)$ ]]; then echo "Error: category must be payload|nextjs|tailwind"; exit 1; fi
if [[ -z "$FOLDER" ]]; then
  base="$(basename "${REPO_URL%.*}")"
  FOLDER="$(echo "$base" | tr -cs '[:alnum:]' '_' )_tutorial"
fi

# Ensure we're at repo root
cd "$(git rev-parse --show-toplevel)"

mkdir -p "$CATEGORY"
TARGET="$CATEGORY/$FOLDER"
if [[ -e "$TARGET" ]]; then echo "Error: $TARGET already exists"; exit 1; fi

# Stable remote name for this source repo
REMOTE="st_$(echo "${CATEGORY}_${FOLDER}" | tr -cs '[:alnum:]' '_' )"
git remote get-url "$REMOTE" >/dev/null 2>&1 || git remote add "$REMOTE" "$REPO_URL"
git fetch "$REMOTE" --tags

# Import full history under TARGET via git subtree
git subtree add --prefix="$TARGET" "$REMOTE" "$BRANCH" -m "subtree: import $REPO_URL into $TARGET"
echo
echo "✅ Imported:"
echo "  Source: $REPO_URL ($BRANCH)"
echo "  Into:   $TARGET"
echo "  Remote: $REMOTE"
echo
echo "Pull updates: git subtree pull --prefix=\"$TARGET\" \"$REMOTE\" \"$BRANCH\""
echo "Push back:   git subtree push --prefix=\"$TARGET\" \"$REMOTE\" \"$BRANCH\""
