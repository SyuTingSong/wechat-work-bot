# wechat-work-bot

企业微信群机器人

## 安装

### pnpm

```shell
pnpm add wechat-work-bot
```

### yarn

```shell
yarn add wechat-work-bot
```

### npm

```shell
npm install --save wechat-work-bot
```

## 使用

### 直接使用createBot函数

```typescript
import createBot from 'wechat-work-bot';

const bot = createBot('your group bot key');
bot.text('Hello, world!');
```

### 从`WechatWorkBot`类创建

```typescript
import { WechatWorkBot } from 'wechat-work-bot';

const bot = new WechatWorkBot({ key: 'your group bot key' });
bot.text('Hello, world');
```

## 软件许可

本软件是基于`LGPL v2.1`许可证发布的自由软件，你可以自由地在软件中引入和使用本库，而无需开放源码。

如果你要发布基于本库创作的衍生软件作品，应确保你发布的衍生软件作品以
`LGPL v2.1`或更高版本开源，或者你也可以将衍生软件作品的许可证转换为
`GPL v2.0`或更高版本。

完整的软件许可请阅读 [LICENSE](LICENSE) 文件。
