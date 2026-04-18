# MiniMax Token HUD

MiniMax Token Plan 用量显示插件，用于 Claude Code 状态行。

## 功能

- 显示 **5小时滚动窗口** 配额用量
- 显示 **周配额** 用量
- 显示剩余额度百分比和配额条
- 60秒本地缓存，避免频繁调用 API

## 输出示例

```
[Token Plan: Usage ██░░░░░░░ 25% (1h 30m / 5h) | ██████████ 85% (2d / 7d)]
```

## 安装

### 方式一：Claude Code 插件市场（待发布）

### 方式二：手动安装

1. 克隆仓库：
```bash
git clone https://github.com/guaiguaidashu/minimax-hud.git
```

2. 安装依赖并编译：
```bash
cd minimax-hud
npm install
npm run build
```

3. 在 `~/.claude/settings.json` 中配置 statusLine 命令：

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash -c 'tp_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); \"/opt/homebrew/bin/node\" \"${tp_dir}dist/index.js\" 2>/dev/null'"
  }
}
```

## 与 claude-hud 组合使用

如果已安装 [claude-hud](https://github.com/jarrodwatts/claude-hud)，可以同时显示两个插件：

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash -c 'hud_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/claude-hud/claude-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); tp_dir=$(ls -d \"${CLAUDE_CONFIG_DIR:-$HOME/.claude}\"/plugins/cache/minimax-token-hud/minimax-token-hud/*/ 2>/dev/null | awk -F/ \"{ print $(NF-1) \\\"\\t\\\" $(0) }\" | sort -t. -k1,1n -k2,2n -k3,1n -k4,4n | tail -1 | cut -f2-); hud_out=$(\"/opt/homebrew/bin/node\" \"${hud_dir}dist/index.js\" 2>/dev/null); tp_out=$(\"/opt/homebrew/bin/node\" \"${tp_dir}dist/index.js\" 2>/dev/null); printf \"%s\\n%s\" \"$hud_out\" \"$tp_out\"'"
  }
}
```

效果：
```
[claude-hud output]
[Token Plan: Usage ██░░░░░░░ 25% (1h 30m / 5h) | ██████████ 85% (2d / 7d)]
```

## 认证

使用 `ANTHROPIC_AUTH_TOKEN` 环境变量进行认证（与 Claude Code 共享）。

## 配置

插件配置目录：`~/.claude/plugins/minimax-token-hud/config.json`

```json
{
  "showBar": true,
  "showFiveHour": true,
  "showWeekly": true
}
```

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showBar` | boolean | true | 显示配额条 |
| `showFiveHour` | boolean | true | 显示5小时配额 |
| `showWeekly` | boolean | true | 显示周配额 |

## 本地开发测试

```bash
npm run test
```

## 技术栈

- TypeScript
- Node.js >= 18.0.0
- ES Modules

## 项目结构

```
minimax-token-hud/
├── src/
│   ├── index.ts       # 主入口
│   ├── api.ts         # MiniMax API 调用
│   ├── cache.ts       # 本地缓存（60秒TTL）
│   ├── config.ts      # 配置管理
│   ├── render.ts      # 渲染逻辑
│   ├── colors.ts      # ANSI 颜色工具
│   └── types.ts       # 类型定义
├── dist/              # 编译输出
├── .claude-plugin/    # 插件元数据
├── commands/          # 用户命令文档
└── package.json
```

## 致谢

本项目受 [claude-hud](https://github.com/jarrodwatts/claude-hud) 启发，作者为 Jarrod Watts。

## License

MIT
