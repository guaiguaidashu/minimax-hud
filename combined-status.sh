#!/bin/zsh
# Combined statusline output for claude-hud and minimax-token-hud

CLAUDE_CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"

# Find claude-hud directory
hud_dir=$(ls -d "$CLAUDE_CONFIG_DIR/plugins/cache/claude-hud/claude-hud/"*/ 2>/dev/null | \
  awk -F/ '{ print $(NF-1) "\t" $(0) }' | \
  sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | \
  tail -1 | cut -f2-)

# Find minimax-token-hud directory
tp_dir=$(ls -d "$CLAUDE_CONFIG_DIR/plugins/cache/minimax-token-hud/minimax-token-hud/"*/ 2>/dev/null | \
  awk -F/ '{ print $(NF-1) "\t" $(0) }' | \
  sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | \
  tail -1 | cut -f2-)

# Run claude-hud first (it outputs to stdout)
if [ -n "$hud_dir" ]; then
  "$hud_dir/dist/index.js" 2>/dev/null
fi

# Run minimax-token-hud second (outputs below claude-hud)
if [ -n "$tp_dir" ]; then
  "$tp_dir/dist/index.js" 2>/dev/null
fi
