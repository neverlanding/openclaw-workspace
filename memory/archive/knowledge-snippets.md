## 🔍 知识片段

### 技能安装工作流程（重要！）
**生效时间**：2026-02-28
**规则**：
1. **安全检查**：先用 `skill-vetter` 检查技能安全性
2. **分类建议**：我判断是公共技能还是某个搭子的专属技能
3. **最终确认**：组长拍板决定是否安装

**技能分类原则**：
- 公共技能：feishu系列、web工具、file操作、ngrok等通用工具
- 专属技能：与搭子核心职责强相关的专业工具

### Agent 创建流程
1. 创建目录结构：`mkdir -p ~/.openclaw/agents/{name}/{agent,sessions}`
2. 写入配置文件：AGENTS.md, SOUL.md, USER.md
3. 注册到 Gateway：编辑 `openclaw.json`
4. 重启 Gateway 或等待自动加载

### 常用命令
- `sessions_spawn` - 创建子Agent会话
- `sessions_send` - 向Agent发送消息
- `sessions_list` - 查看所有会话
- `memory_search` - 搜索记忆
- `subagents list` - 查看子代理状态

---

*最后更新：2026-03-02*

---

