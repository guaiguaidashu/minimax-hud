# MiniMax Token HUD

A Claude Code statusline plugin to display MiniMax Token Plan usage.

## Features

- **5-hour rolling window** quota display
- **Weekly quota** display
- Usage percentage and quota bar visualization
- 60-second local cache to reduce API calls

## Output Example

![MiniMax Token HUD](https://minimax-algeng-chat-tts.oss-cn-wulanchabu.aliyuncs.com/ccv2%2F2026-04-18%2FMiniMax-M2.7%2F2027217101604786507%2F65e51ca53d2826e088c7e93ff0bccb8a4425645ede8443cc4276860735f789a7..png?Expires=1776606149&OSSAccessKeyId=LTAI5tGLnRTkBjLuYPjNcKQ8&Signature=NCCGv%2Fq1MKfHk%2FKqgFGMf9CnXc0%3D)

```
[Token Plan: Usage ██░░░░░░░ 25% (1h 30m / 5h) | ██████████ 85% (2d / 7d)]
```

## Installation

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/guaiguaidashu/minimax-hud.git
```

2. Install dependencies and build:
```bash
cd minimax-hud
npm install
npm run build
```

3. Configure the statusLine in `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash -c 'tp_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); \"/opt/homebrew/bin/node\" \"${tp_dir}dist/index.js\" 2>/dev/null'"
  }
}
```

## Usage with claude-hud

If you have [claude-hud](https://github.com/jarrodwatts/claude-hud) installed, you can display both plugins together:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash -c 'hud_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/claude-hud/claude-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); tp_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); hud_out=$(\"/opt/homebrew/bin/node\" \"${hud_dir}dist/index.js\" 2>/dev/null); tp_out=$(\"/opt/homebrew/bin/node\" \"${tp_dir}dist/index.js\" 2>/dev/null); printf \"%s\\n%s\" \"$hud_out\" \"$tp_out\"'"
  }
}
```

Result:
```
[claude-hud output]
[Token Plan: Usage ██░░░░░░░ 25% (1h 30m / 5h) | ██████████ 85% (2d / 7d)]
```

## Authentication

Uses the `ANTHROPIC_AUTH_TOKEN` environment variable (shared with Claude Code).

## Configuration

Plugin config directory: `~/.claude/plugins/minimax-token-hud/config.json`

```json
{
  "showBar": true,
  "showFiveHour": true,
  "showWeekly": true
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showBar` | boolean | true | Show quota bar |
| `showFiveHour` | boolean | true | Show 5-hour quota |
| `showWeekly` | boolean | true | Show weekly quota |

## Local Development

```bash
npm run test
```

## Tech Stack

- TypeScript
- Node.js >= 18.0.0
- ES Modules

## Project Structure

```
minimax-token-hud/
├── src/
│   ├── index.ts       # Main entry point
│   ├── api.ts         # MiniMax API calls
│   ├── cache.ts       # Local cache (60s TTL)
│   ├── config.ts      # Configuration management
│   ├── render.ts      # Rendering logic
│   ├── colors.ts      # ANSI color utilities
│   └── types.ts       # Type definitions
├── dist/              # Build output
├── .claude-plugin/    # Plugin metadata
├── commands/          # User commands
└── package.json
```

## Acknowledgments

This project is inspired by [claude-hud](https://github.com/jarrodwatts/claude-hud) by Jarrod Watts.

## License

MIT
