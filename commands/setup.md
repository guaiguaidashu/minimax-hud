# MiniMax Token Plan HUD Setup

This plugin displays your MiniMax Token Plan usage in the Claude Code status line.

## Requirements

- MiniMax API Key configured via `ANTHROPIC_AUTH_TOKEN` environment variable
- MiniMax Token Plan subscription

## Status Line Configuration

Add the following to your `settings.json`:

```json
{
  "statusLine": {
    "command": "bash -c 'plugin_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ '\"'\"'{ print $(NF-1) \"\\t\" $(0) }'\"'\"' | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); exec \"/opt/homebrew/bin/node\" \"${plugin_dir}dist/index.js\"'"
  }
}
```

Or for Intel Macs:

```json
{
  "statusLine": {
    "command": "bash -c 'plugin_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ '\"'\"'{ print $(NF-1) \"\\t\" $(0) }'\"'\"' | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); exec \"/usr/local/bin/node\" \"${plugin_dir}dist/index.js\"'"
  }
}
```

## Display Format

The plugin shows:
- **5h**: 5-hour rolling window quota (e.g., `5h ░░░░░░ 2%`)
- **周**: Weekly quota (e.g., `周 █░░░░░ 15%`)

Example output: `[TP 5h ░░░░░░ 2% | 周 █░░░░░ 15%]`

## Notes

- Uses 60-second cache to avoid excessive API calls
- Data fetched from MiniMax API: `https://www.minimaxi.com/v1/token_plan/remains`
- Requires `ANTHROPIC_AUTH_TOKEN` environment variable to be set
