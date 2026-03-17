# 飞书权限配置申请指南

## 📋 需要申请的权限清单

### 🔴 高优先级（立即申请）

| 序号 | 权限名称 | 类型 | 用途说明 |
|:---:|:---|:---:|:---|
| 1 | `cardkit:card:read` | tenant | 读取交互卡片（富文本消息） |
| 2 | `cardkit:card:write` | tenant | 创建/更新交互卡片 |
| 3 | `aily:file:read` | tenant | AI助手读取文件内容 |
| 4 | `aily:file:write` | tenant | AI助手写入/生成文件 |
| 5 | `aily:file:read` | user | 用户级别文件读取 |
| 6 | `aily:file:write` | user | 用户级别文件写入 |

### 🟡 中优先级（建议申请）

| 序号 | 权限名称 | 类型 | 用途说明 |
|:---:|:---|:---:|:---|
| 7 | `application:bot.menu:write` | tenant | 配置机器人菜单 |
| 8 | `contact:user.employee_id:readonly` | tenant | 通过员工工号查询用户信息 |
| 9 | `application:application:self_manage` | tenant | 应用自管理权限 |
| 10 | `corehr:file:download` | tenant | 下载HR相关文件 |

---

## 🚀 配置步骤

### 步骤1: 登录飞书开放平台
```
网址: https://open.feishu.cn/app/
账号: 使用飞书管理员账号登录
```

### 步骤2: 选择应用
1. 进入"开发者后台"
2. 点击"创建应用"或选择已有应用
3. 找到你的OpenClaw应用（如：搭子总管、方案搭子等）

### 步骤3: 进入权限管理
1. 点击左侧菜单"权限管理"
2. 点击"申请权限"按钮
3. 进入权限申请页面

### 步骤4: 批量申请权限

#### 方法A: 手动逐个申请（推荐）
在搜索框中依次搜索以下权限并勾选：

```
cardkit:card:read
cardkit:card:write
aily:file:read
aily:file:write
application:bot.menu:write
contact:user.employee_id:readonly
```

#### 方法B: 通过API批量申请（需要管理员权限）
```bash
# 使用飞书API批量申请权限
# 需要tenant_access_token

curl -X POST \
  'https://open.feishu.cn/open-apis/application/v6/scope/apply' \
  -H 'Authorization: Bearer YOUR_TENANT_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "scopes": [
      {
        "scope": "cardkit:card:read",
        "scope_type": "tenant"
      },
      {
        "scope": "cardkit:card:write",
        "scope_type": "tenant"
      },
      {
        "scope": "aily:file:read",
        "scope_type": "tenant"
      },
      {
        "scope": "aily:file:write",
        "scope_type": "tenant"
      },
      {
        "scope": "aily:file:read",
        "scope_type": "user"
      },
      {
        "scope": "aily:file:write",
        "scope_type": "user"
      }
    ]
  }'
```

### 步骤5: 提交申请
1. 勾选需要的权限
2. 填写申请原因：
   ```
   申请原因：
   - 使用交互卡片展示富文本消息
   - AI助手需要读写文件功能
   - 配置机器人菜单提升用户体验
   ```
3. 点击"提交申请"
4. 等待管理员审批（通常1-2个工作日）

### 步骤6: 验证权限
申请通过后，重新检查权限：
```bash
openclaw feishu scopes
```

或调用API验证：
```bash
curl -X GET \
  'https://open.feishu.cn/open-apis/application/v6/scopes' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

---

## 📱 快捷链接

### 直接访问链接
```
https://open.feishu.cn/app/cli_a90ed7d1f6389cd9/permission
https://open.feishu.cn/app/cli_a92bd5e6d339dcd2/permission
https://open.feishu.cn/app/cli_a92ce59b76fb9cc2/permission
...
```

### 8个应用的App ID
| 应用 | App ID |
|:---|:---|
| 搭子总管 | cli_a90ed7d1f6389cd9 |
| 方案搭子 | cli_a92bd5e6d339dcd2 |
| 办公搭子 | cli_a92ce59b76fb9cc2 |
| 公众号搭子 | cli_a92cc78ef8b89ccd |
| 新闻搭子 | cli_a92ce03f79b85cee |
| 读书搭子 | cli_a92ce21baa3a9cb5 |
| 理财搭子 | cli_a92ce269bd789cc6 |
| 代码搭子 | cli_a92ce2c190769cb3 |

---

## 🛠️ 替代方案：自动配置脚本

如果你希望自动化配置，可以使用以下脚本：

```bash
#!/bin/bash
# 飞书权限自动申请脚本

APP_IDS=(
    "cli_a90ed7d1f6389cd9"  # boss
    "cli_a92bd5e6d339dcd2"  # planner
    "cli_a92ce59b76fb9cc2"  # office
    "cli_a92cc78ef8b89ccd"  # writer
    "cli_a92ce03f79b85cee"  # news
    "cli_a92ce21baa3a9cb5"  # reader
    "cli_a92ce269bd789cc6"  # finance
    "cli_a92ce2c190769cb3"  # coder
)

SCOPES=(
    "cardkit:card:read"
    "cardkit:card:write"
    "aily:file:read"
    "aily:file:write"
    "application:bot.menu:write"
)

for app_id in "${APP_IDS[@]}"; do
    echo "配置应用: $app_id"
    # 这里需要调用飞书API或使用浏览器自动化
    # 由于需要人工审批，建议使用浏览器插件或RPA工具
done
```

---

## ⚠️ 注意事项

1. **权限审批**：部分权限需要企业管理员审批
2. **安全考虑**：cardkit和aily权限较敏感，申请时需说明用途
3. **分步申请**：建议先申请高优先级权限，通过后再申请其他
4. **测试验证**：每个权限申请后，测试对应功能是否正常

---

## 📞 需要帮助？

- 飞书开放平台文档：https://open.feishu.cn/document/
- 权限说明：https://open.feishu.cn/document/ukTMukTMukTM/uITNz4iM1MjLyUzM
- 技术支持：飞书开放平台工单系统

---

## ✅ 配置检查清单

配置完成后，验证以下功能：

- [ ] 交互卡片发送正常
- [ ] AI可以读取文件
- [ ] AI可以生成文件
- [ ] 机器人菜单显示正常
- [ ] 消息发送/接收正常

---

生成时间: 2026-03-16 16:58
生成人: 搭子总管
