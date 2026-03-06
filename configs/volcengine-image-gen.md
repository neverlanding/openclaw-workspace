# 火山引擎图像生成API配置

**更新时间**: 2026-03-03 20:01

## 认证信息

- **Access Key ID (AK)**: AKLTYTgwYjQ1YjA0OWRiNGVlZGIwMGQyNTEyYmE0NmQ5Zjc
- **Secret Access Key (SK)**: ✅ 已提供（Base64解码后）
- **服务区域**: cn-beijing

## 模型信息

- **模型名称**: 豆包图像生成 / Doubao-image-generation
- **API Endpoint**: https://ml-platform-cn-beijing.volces.com/api/v1/
- **请求方式**: POST

## 配置步骤

1. [x] 获取 AK
2. [x] 获取 SK
3. [ ] 开通图像生成服务
4. [ ] 创建技能脚本
5. [ ] 测试API调用

## 下一步

现在需要：
1. 在火山引擎控制台开通「图像生成」服务
2. 创建OpenClaw技能脚本
3. 测试API调用是否正常

## 安全提醒

⚠️ AK/SK 已安全记录，请勿泄露！

---

## 更新 - 2026-03-03 20:12

**服务状态**: ✅ 已开通

## 需要确认的API信息

请从火山引擎控制台获取以下信息：

1. **API Endpoint** (完整地址)
   - 格式: https://ml-platform-cn-beijing.volces.com/api/v1/...
   
2. **模型ID** 
   - 如: Doubao-image-generation-v1
   
3. **请求参数格式**
   - prompt (提示词)
   - width/height (尺寸)
   - image_count (数量)
   - 其他参数...

获取后提供给我，立即创建技能脚本！

---

## 技能安装状态 - 2026-03-03 20:25

**状态**: ✅ 已安装

**技能路径**: `~/.openclaw/workspace-boss/skills/volcengine-image-gen/`

**使用方法**:
```bash
cd ~/.openclaw/workspace-boss/skills/volcengine-image-gen
python3 scripts/generate.py "提示词" [模型] [尺寸]
```

**示例**:
```bash
python3 scripts/generate.py "一只可爱的猫"
python3 scripts/generate.py "科幻城市夜景" doubao-seedream-3.0-t2i 1280x720
```

**支持的模型**:
- doubao-seedream-3.0-t2i (推荐)
- doubao-seedream-4.0
- doubao-seedream-4.5
- doubao-seedream-5.0-lite
