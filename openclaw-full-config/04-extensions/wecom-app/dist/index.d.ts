import { IncomingMessage, ServerResponse } from 'http';

/**
 * 企业微信自建应用类型定义
 */
/** DM 消息策略 */
type WecomAppDmPolicy = "open" | "pairing" | "allowlist" | "disabled";
/**
 * 企业微信自建应用账户配置
 * 相比普通 wecom 智能机器人，增加了 corpId, corpSecret, agentId 用于主动发送消息
 */
type WecomAppAccountConfig = {
    name?: string;
    enabled?: boolean;
    /** Webhook 路径 */
    webhookPath?: string;
    /** 回调 Token */
    token?: string;
    /** 回调消息加密密钥 */
    encodingAESKey?: string;
    /** 接收者 ID (用于解密验证) */
    receiveId?: string;
    /** 企业 ID (用于主动发送) */
    corpId?: string;
    /** 应用 Secret (用于主动发送) */
    corpSecret?: string;
    /** 应用 AgentId (用于主动发送) */
    agentId?: number;
    /** 企业微信 API 基础地址（可选，默认 https://qyapi.weixin.qq.com） */
    apiBaseUrl?: string;
    /** 入站媒体（图片/文件）落盘设置 */
    inboundMedia?: {
        /** 是否启用入站媒体落盘（默认 true） */
        enabled?: boolean;
        /** 保存目录（默认 /root/.openclaw/media/wecom-app/inbound） */
        dir?: string;
        /** 单个文件最大字节数（默认 10MB） */
        maxBytes?: number;
        /** 保留天数（默认 7） */
        keepDays?: number;
    };
    /** 媒体文件大小限制 (MB)，默认 100 */
    maxFileSizeMB?: number;
    /**
     * 语音发送转码策略（可选）
     * enabled=true 时：当检测到 wav/mp3 等不支持的语音格式，
     * - 若系统存在 ffmpeg：自动转码为 amr 再以 voice 发送
     * - 若无 ffmpeg：降级为 file 发送
     */
    voiceTranscode?: {
        enabled?: boolean;
        prefer?: "amr";
    };
    /**
     * 入站语音 ASR 配置（腾讯云录音文件识别极速版）
     */
    asr?: {
        enabled?: boolean;
        appId?: string;
        secretId?: string;
        secretKey?: string;
        engineType?: string;
        timeoutMs?: number;
    };
    /** 欢迎文本 */
    welcomeText?: string;
    /** DM 策略 */
    dmPolicy?: WecomAppDmPolicy;
    /** DM 允许列表 */
    allowFrom?: string[];
};
/**
 * 企业微信自建应用配置 (顶层)
 */
type WecomAppConfig = WecomAppAccountConfig & {
    accounts?: Record<string, WecomAppAccountConfig>;
    defaultAccount?: string;
};
/**
 * 解析后的企业微信自建应用账户
 */
type ResolvedWecomAppAccount = {
    accountId: string;
    name?: string;
    enabled: boolean;
    configured: boolean;
    /** 回调 Token */
    token?: string;
    /** 回调消息加密密钥 */
    encodingAESKey?: string;
    /** 接收者 ID */
    receiveId: string;
    /** 企业 ID */
    corpId?: string;
    /** 应用 Secret */
    corpSecret?: string;
    /** 应用 AgentId */
    agentId?: number;
    /** 是否支持主动发送 (corpId + corpSecret + agentId 均已配置) */
    canSendActive: boolean;
    config: WecomAppAccountConfig;
};
/** 消息发送目标 */
type WecomAppSendTarget = {
    /** 用户 ID */
    userId: string;
};
/** Access Token 缓存条目 */
type AccessTokenCacheEntry = {
    token: string;
    expiresAt: number;
};
type WecomAppInboundBase = {
    MsgId?: string;
    msgid?: string;
    aibotid?: string;
    response_url?: string;
    from?: {
        userid?: string;
        corpid?: string;
    };
    FromUserName?: string;
    ToUserName?: string;
    CreateTime?: number;
    MsgType?: string;
    msgtype?: string;
    AgentID?: number;
};
type WecomAppInboundText = WecomAppInboundBase & {
    msgtype: "text";
    MsgType?: "text";
    text?: {
        content?: string;
    };
    Content?: string;
    quote?: unknown;
};
type WecomAppInboundVoice = WecomAppInboundBase & {
    msgtype: "voice";
    MsgType?: "voice";
    voice?: {
        content?: string;
    };
    Recognition?: string;
    /** 语音 MediaId (用于下载原始语音文件) */
    MediaId?: string;
    /** 语音格式 (amr/speex) */
    Format?: string;
    quote?: unknown;
};
type WecomAppInboundImage = WecomAppInboundBase & {
    msgtype: "image";
    MsgType?: "image";
    image?: {
        url?: string;
    };
    PicUrl?: string;
    MediaId?: string;
};
type WecomAppInboundLocation = WecomAppInboundBase & {
    msgtype: "location";
    MsgType?: "location";
    Location_X?: string | number;
    Location_Y?: string | number;
    Scale?: string | number;
    Label?: string;
    Poiname?: string;
    Latitude?: string | number;
    Longitude?: string | number;
    Precision?: string | number;
    location?: {
        latitude?: string | number;
        longitude?: string | number;
        lat?: string | number;
        lng?: string | number;
        scale?: string | number;
        precision?: string | number;
        label?: string;
        address?: string;
        name?: string;
    };
};
type WecomAppInboundEvent = WecomAppInboundBase & {
    msgtype: "event";
    MsgType?: "event";
    create_time?: number;
    Event?: string;
    EventKey?: string;
    event?: {
        eventtype?: string;
        [key: string]: unknown;
    };
};
type WecomAppInboundStreamRefresh = WecomAppInboundBase & {
    msgtype: "stream";
    stream?: {
        id?: string;
    };
};
type WecomAppInboundMessage = WecomAppInboundText | WecomAppInboundVoice | WecomAppInboundImage | WecomAppInboundLocation | WecomAppInboundStreamRefresh | WecomAppInboundEvent | (WecomAppInboundBase & Record<string, unknown>);

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (undefined && undefined.__exportStar) || function(m, exports$1) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./errors.cjs"), exports);
__exportStar(require("./helpers/parseUtil.cjs"), exports);
__exportStar(require("./helpers/typeAliases.cjs"), exports);
__exportStar(require("./helpers/util.cjs"), exports);
__exportStar(require("./types.cjs"), exports);
__exportStar(require("./ZodError.cjs"), exports);

/**
 * 企业微信自建应用配置 schema
 */

/** 默认账户 ID */
declare const DEFAULT_ACCOUNT_ID = "default";
interface PluginConfig {
    session?: {
        store?: unknown;
    };
    channels?: {
        "wecom-app"?: WecomAppConfig;
    };
}

/**
 * 企业微信自建应用 ChannelPlugin 实现
 *
 * 与普通 wecom 智能机器人不同，自建应用支持主动发送消息
 */

declare const wecomAppPlugin: {
    id: string;
    meta: {
        id: "wecom-app";
        label: "WeCom App";
        selectionLabel: "WeCom Self-built App (企微自建应用)";
        docsPath: "/channels/wecom-app";
        docsLabel: "wecom-app";
        blurb: "企业微信自建应用，支持主动发送消息";
        aliases: readonly ["qywx-app", "企微自建应用", "企业微信自建应用"];
        order: 84;
    };
    capabilities: {
        chatTypes: readonly ["direct"];
        media: boolean;
        reactions: boolean;
        threads: boolean;
        edit: boolean;
        reply: boolean;
        polls: boolean;
        /** 自建应用支持主动发送 */
        activeSend: boolean;
    };
    messaging: {
        normalizeTarget: (raw: string) => string | undefined;
        targetResolver: {
            looksLikeId: (raw: string, normalized?: string) => boolean;
            hint: string;
        };
        formatTargetDisplay: (params: {
            target: string;
            display?: string;
        }) => string;
    };
    configSchema: {
        schema: {
            type: string;
            additionalProperties: boolean;
            properties: {
                name: {
                    type: string;
                };
                enabled: {
                    type: string;
                };
                webhookPath: {
                    type: string;
                };
                token: {
                    type: string;
                };
                encodingAESKey: {
                    type: string;
                };
                receiveId: {
                    type: string;
                };
                corpId: {
                    type: string;
                };
                corpSecret: {
                    type: string;
                };
                agentId: {
                    type: string;
                };
                apiBaseUrl: {
                    type: string;
                };
                inboundMedia: {
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        enabled: {
                            type: string;
                        };
                        dir: {
                            type: string;
                        };
                        maxBytes: {
                            type: string;
                        };
                        keepDays: {
                            type: string;
                        };
                    };
                };
                voiceTranscode: {
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        enabled: {
                            type: string;
                        };
                        prefer: {
                            type: string;
                            enum: string[];
                        };
                    };
                };
                asr: {
                    type: string;
                    additionalProperties: boolean;
                    properties: {
                        enabled: {
                            type: string;
                        };
                        appId: {
                            type: string;
                        };
                        secretId: {
                            type: string;
                        };
                        secretKey: {
                            type: string;
                        };
                        engineType: {
                            type: string;
                        };
                        timeoutMs: {
                            type: string;
                        };
                    };
                };
                welcomeText: {
                    type: string;
                };
                dmPolicy: {
                    type: string;
                    enum: string[];
                };
                allowFrom: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                maxFileSizeMB: {
                    type: string;
                };
                defaultAccount: {
                    type: string;
                };
                accounts: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        additionalProperties: boolean;
                        properties: {
                            name: {
                                type: string;
                            };
                            enabled: {
                                type: string;
                            };
                            webhookPath: {
                                type: string;
                            };
                            token: {
                                type: string;
                            };
                            encodingAESKey: {
                                type: string;
                            };
                            receiveId: {
                                type: string;
                            };
                            corpId: {
                                type: string;
                            };
                            corpSecret: {
                                type: string;
                            };
                            agentId: {
                                type: string;
                            };
                            apiBaseUrl: {
                                type: string;
                            };
                            inboundMedia: {
                                type: string;
                                additionalProperties: boolean;
                                properties: {
                                    enabled: {
                                        type: string;
                                    };
                                    dir: {
                                        type: string;
                                    };
                                    maxBytes: {
                                        type: string;
                                    };
                                    keepDays: {
                                        type: string;
                                    };
                                };
                            };
                            asr: {
                                type: string;
                                additionalProperties: boolean;
                                properties: {
                                    enabled: {
                                        type: string;
                                    };
                                    appId: {
                                        type: string;
                                    };
                                    secretId: {
                                        type: string;
                                    };
                                    secretKey: {
                                        type: string;
                                    };
                                    engineType: {
                                        type: string;
                                    };
                                    timeoutMs: {
                                        type: string;
                                    };
                                };
                            };
                            welcomeText: {
                                type: string;
                            };
                            dmPolicy: {
                                type: string;
                                enum: string[];
                            };
                            allowFrom: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            groupPolicy: {
                                type: string;
                                enum: string[];
                            };
                            groupAllowFrom: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                            requireMention: {
                                type: string;
                            };
                            maxFileSizeMB: {
                                type: string;
                            };
                        };
                    };
                };
            };
        };
    };
    reload: {
        configPrefixes: string[];
    };
    config: {
        listAccountIds: (cfg: PluginConfig) => string[];
        resolveAccount: (cfg: PluginConfig, accountId?: string) => ResolvedWecomAppAccount;
        defaultAccountId: (cfg: PluginConfig) => string;
        setAccountEnabled: (params: {
            cfg: PluginConfig;
            accountId?: string;
            enabled: boolean;
        }) => PluginConfig;
        deleteAccount: (params: {
            cfg: PluginConfig;
            accountId?: string;
        }) => PluginConfig;
        isConfigured: (account: ResolvedWecomAppAccount) => boolean;
        describeAccount: (account: ResolvedWecomAppAccount) => {
            accountId: string;
            name: string | undefined;
            enabled: boolean;
            configured: boolean;
            canSendActive: boolean;
            webhookPath: string;
        };
        resolveAllowFrom: (params: {
            cfg: PluginConfig;
            accountId?: string;
        }) => string[];
        formatAllowFrom: (params: {
            allowFrom: (string | number)[];
        }) => string[];
    };
    /**
     * 目录解析 - 用于将 wecom-app:XXX 格式的 target 解析为可投递目标
     *
     * 支持的输入格式：
     * - "wecom-app:user:xxx" → { channel: "wecom-app", to: "xxx" }
     * - "user:xxx" → { channel: "wecom-app", to: "xxx" }
     * - "xxx" (仅小写 ID 风格) → { channel: "wecom-app", to: "xxx" }
     * - 带 accountId: "user:xxx@account1" → { channel: "wecom-app", accountId: "account1", to: "xxx" }
     */
    directory: {
        /**
         * 检查此通道是否可以解析给定的目标格式
         * 用于框架层判断是否调用 resolveTarget
         */
        canResolve: (params: {
            target: string;
        }) => boolean;
        /**
         * 解析单个目标地址
         * 将各种格式的 target 解析为可用的投递对象
         *
         * IMPORTANT: 返回的 `to` 字段必须是纯 ID（不含 user:/group: 前缀），
         * 因为 OpenClaw 框架会用这个值来匹配 inbound context 中的 From/To 字段。
         *
         * 例如：如果 inbound context 的 From 是 "wecom-app:user:CaiHongYu"，
         * 那么 resolveTarget 必须返回 { channel: "wecom-app", to: "CaiHongYu" }，
         * 而不是 { channel: "wecom-app", to: "user:CaiHongYu" }。
         */
        resolveTarget: (params: {
            cfg: PluginConfig;
            target: string;
        }) => {
            channel: string;
            accountId?: string;
            to: string;
        } | null;
        /**
         * 批量解析多个目标地址
         * 用于框架层批量发送消息
         */
        resolveTargets: (params: {
            cfg: PluginConfig;
            targets: string[];
        }) => Array<{
            channel: string;
            accountId?: string;
            to: string;
        }>;
        /**
         * 获取此通道支持的目标格式说明
         * 用于帮助信息和错误提示
         *
         * 注意：虽然支持多种输入格式，但 resolveTarget 返回的 `to` 字段
         * 始终是纯 ID（不含前缀），以便框架正确匹配 inbound context。
         */
        getTargetFormats: () => string[];
    };
    /**
     * 主动发送消息 (自建应用特有功能)
     */
    outbound: {
        deliveryMode: string;
        /**
         * 主动发送文本消息
         */
        sendText: (params: {
            cfg: PluginConfig;
            accountId?: string;
            to: string;
            text: string;
            options?: {
                markdown?: boolean;
            };
        }) => Promise<{
            channel: string;
            ok: boolean;
            messageId: string;
            error?: Error;
        }>;
        /**
         * 发送媒体消息（支持图片、语音、文件）
         * OpenClaw outbound 适配器要求的接口
         */
        sendMedia: (params: {
            cfg: PluginConfig;
            accountId?: string;
            to: string;
            mediaUrl: string;
            text?: string;
            mimeType?: string;
        }) => Promise<{
            channel: string;
            ok: boolean;
            messageId: string;
            error?: Error;
        }>;
    };
    gateway: {
        startAccount: (ctx: {
            cfg: PluginConfig;
            runtime?: unknown;
            abortSignal?: AbortSignal;
            accountId: string;
            setStatus?: (status: Record<string, unknown>) => void;
            log?: {
                info: (msg: string) => void;
                error: (msg: string) => void;
            };
        }) => Promise<void>;
        stopAccount: (ctx: {
            accountId: string;
            setStatus?: (status: Record<string, unknown>) => void;
        }) => Promise<void>;
    };
};

/**
 * 企业微信自建应用插件运行时管理
 */
interface PluginRuntime {
    log?: (msg: string) => void;
    error?: (msg: string) => void;
    channel?: {
        routing?: {
            resolveAgentRoute?: (params: {
                cfg: unknown;
                channel: string;
                accountId?: string;
                peer: {
                    kind: string;
                    id: string;
                };
            }) => {
                sessionKey: string;
                accountId: string;
                agentId?: string;
            };
        };
        reply?: {
            dispatchReplyFromConfig?: (params: {
                ctx: unknown;
                cfg: unknown;
                dispatcher?: unknown;
                replyOptions?: unknown;
            }) => Promise<{
                queuedFinal: boolean;
                counts: {
                    final: number;
                };
            }>;
            dispatchReplyWithBufferedBlockDispatcher?: (params: {
                ctx: unknown;
                cfg: unknown;
                dispatcherOptions: {
                    deliver: (payload: {
                        text?: string;
                    }) => Promise<void>;
                    onError?: (err: unknown, info: {
                        kind: string;
                    }) => void;
                };
            }) => Promise<void>;
            finalizeInboundContext?: (ctx: unknown) => unknown;
            createReplyDispatcher?: (params: unknown) => unknown;
            createReplyDispatcherWithTyping?: (params: unknown) => {
                dispatcher: unknown;
                replyOptions?: unknown;
                markDispatchIdle?: () => void;
            };
            resolveHumanDelayConfig?: (cfg: unknown, agentId?: string) => unknown;
            resolveEnvelopeFormatOptions?: (cfg: unknown) => unknown;
            formatAgentEnvelope?: (params: {
                channel: string;
                from: string;
                previousTimestamp?: number;
                envelope?: unknown;
                body: string;
            }) => string;
        };
        session?: {
            resolveStorePath?: (store: unknown, params: {
                agentId?: string;
            }) => string | undefined;
            readSessionUpdatedAt?: (params: {
                storePath?: string;
                sessionKey: string;
            }) => number | null;
            recordInboundSession?: (params: {
                storePath: string;
                sessionKey: string;
                ctx: unknown;
                updateLastRoute?: {
                    sessionKey: string;
                    channel: string;
                    to: string;
                    accountId?: string;
                    threadId?: string | number;
                };
                onRecordError?: (err: unknown) => void;
            }) => Promise<void>;
        };
        text?: {
            resolveMarkdownTableMode?: (params: {
                cfg: unknown;
                channel: string;
                accountId?: string;
            }) => unknown;
            convertMarkdownTables?: (text: string, mode: unknown) => string;
        };
    };
    system?: {
        enqueueSystemEvent?: (message: string, options?: unknown) => void;
    };
    [key: string]: unknown;
}
/**
 * 设置企业微信自建应用运行时
 */
declare function setWecomAppRuntime(next: PluginRuntime): void;
/**
 * 获取企业微信自建应用运行时 (必须已初始化)
 */
declare function getWecomAppRuntime(): PluginRuntime;

/**
 * 企业微信自建应用 API
 *
 * 提供 Access Token 缓存和主动发送消息能力
 */

/**
 * 移除 Markdown 格式，转换为纯文本
 * 方案 C: 代码块缩进，标题用【】标记，表格简化
 * 企业微信文本消息不支持 Markdown
 */
declare function stripMarkdown(text: string): string;
/**
 * 获取 Access Token（带缓存）
 */
declare function getAccessToken(account: ResolvedWecomAppAccount): Promise<string>;
/**
 * 清除指定账户的 Access Token 缓存
 */
declare function clearAccessTokenCache(account: ResolvedWecomAppAccount): void;
/**
 * 清除所有 Access Token 缓存
 */
declare function clearAllAccessTokenCache(): void;
/** 发送消息结果 */
type SendMessageResult = {
    ok: boolean;
    errcode?: number;
    errmsg?: string;
    invaliduser?: string;
    invalidparty?: string;
    invalidtag?: string;
    msgid?: string;
};
/**
 * 发送企业微信应用消息
 *
 * @param account - 已解析的账户配置
 * @param target - 发送目标 (userId)
 * @param message - 消息内容 (会自动移除 Markdown 格式)
 */
declare function sendWecomAppMessage(account: ResolvedWecomAppAccount, target: WecomAppSendTarget, message: string): Promise<SendMessageResult>;
/**
 * 发送 Markdown 格式消息 (仅企业微信客户端支持)
 */
declare function sendWecomAppMarkdownMessage(account: ResolvedWecomAppAccount, target: WecomAppSendTarget, markdownContent: string): Promise<SendMessageResult>;
/**
 * 发送图片消息
 * @param account 账户配置
 * @param target 发送目标
 * @param mediaId 图片 media_id
 */
declare function sendWecomAppImageMessage(account: ResolvedWecomAppAccount, target: WecomAppSendTarget, mediaId: string): Promise<SendMessageResult>;
/**
 * 下载并发送图片（完整流程）
 * @param account 账户配置
 * @param target 发送目标
 * @param imageUrl 图片 URL
 */
declare function downloadAndSendImage(account: ResolvedWecomAppAccount, target: WecomAppSendTarget, imageUrl: string): Promise<SendMessageResult>;

/**
 * 企业微信自建应用发送消息封装
 *
 * 提供业务层简化 API，规范化 target 格式，统一调用入口
 *
 * 使用示例：
 * - 私聊：sendWecomDM("caihongyu", { text: "Hello" })
 */

/**
 * 发送消息选项
 */
type SendMessageOptions = {
    /** 文本内容 */
    text?: string;
    /** 媒体文件路径或 URL（图片） */
    mediaPath?: string;
};
/**
 * 发送消息结果
 */
type SendResult = {
    ok: boolean;
    msgid?: string;
    error?: string;
};
/**
 * 规范化目标格式
 *
 * 输入格式（用户侧传入）：
 * - 私聊："caihongyu" 或 "user:caihongyu"
 * - 带 channel 前缀："wecom-app:user:caihongyu"
 *
 * 输出格式（OpenClaw 标准）：
 * - 私聊："user:caihongyu"
 */
declare function normalizeTarget(target: string, type: "user"): string;
/**
 * 将规范化的 target 字符串解析为 WecomAppSendTarget
 */
declare function parseTarget(target: string): WecomAppSendTarget;
/**
 * 发送私聊消息
 *
 * @param account - 已解析的账户配置
 * @param userId - 用户 ID（如 "caihongyu"），支持带 "user:" 前缀
 * @param options - 消息选项
 *
 * @example
 * ```ts
 * // 发送文本
 * await sendWecomDM(account, "caihongyu", { text: "Hello!" });
 *
 * // 发送图片
 * await sendWecomDM(account, "caihongyu", { mediaPath: "/path/to/image.jpg" });
 *
 * // 发送文本和图片
 * await sendWecomDM(account, "caihongyu", {
 *   text: "Check out this image!",
 *   mediaPath: "https://example.com/image.jpg"
 * });
 * ```
 */
declare function sendWecomDM(account: ResolvedWecomAppAccount, userId: string, options: SendMessageOptions): Promise<SendResult>;
/**
 * 发送消息（自动识别目标格式）
 *
 * 支持多种 target 格式：
 * - "user:xxx" → 私聊
 * - "wecom-app:user:xxx" → 私聊（带 channel 前缀）
 * - "xxx" → 私聊（裸 ID，默认当作用户）
 *
 * @param account - 已解析的账户配置
 * @param target - 目标（支持 "user:xxx"、"wecom-app:user:xxx"、"xxx" 格式）
 * @param options - 消息选项
 */
declare function sendWecom(account: ResolvedWecomAppAccount, target: string, options: SendMessageOptions): Promise<SendResult>;

/**
 * @openclaw-china/wecom-app
 * 企业微信自建应用渠道插件入口
 *
 * 导出:
 * - wecomAppPlugin: ChannelPlugin 实现
 * - DEFAULT_ACCOUNT_ID: 默认账户 ID
 * - setWecomAppRuntime: 设置 Moltbot 运行时
 * - sendWecomAppMessage: 主动发送消息
 * - getAccessToken: 获取 Access Token
 */

/**
 * Moltbot 插件 API 接口
 */
interface MoltbotPluginApi {
    registerChannel: (opts: {
        plugin: unknown;
    }) => void;
    registerHttpHandler?: (handler: (req: IncomingMessage, res: ServerResponse) => Promise<boolean> | boolean) => void;
    runtime?: unknown;
    [key: string]: unknown;
}

declare const plugin: {
    id: string;
    name: string;
    description: string;
    configSchema: {
        type: string;
        additionalProperties: boolean;
        properties: {};
    };
    register(api: MoltbotPluginApi): void;
};

export { type AccessTokenCacheEntry, DEFAULT_ACCOUNT_ID, type MoltbotPluginApi, type ResolvedWecomAppAccount, type SendMessageOptions, type SendResult, type WecomAppConfig, type WecomAppDmPolicy, type WecomAppInboundMessage, type WecomAppSendTarget, clearAccessTokenCache, clearAllAccessTokenCache, plugin as default, downloadAndSendImage, getAccessToken, getWecomAppRuntime, normalizeTarget, parseTarget, sendWecom, sendWecomAppImageMessage, sendWecomAppMarkdownMessage, sendWecomAppMessage, sendWecomDM, setWecomAppRuntime, stripMarkdown, wecomAppPlugin };
