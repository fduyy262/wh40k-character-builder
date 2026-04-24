# WH40K Character Builder

五页式 SillyTavern 角色创建扩展，适配你当前的 A–N 面板设计：

1. 开始游戏
2. B / C / F / G / I
3. A / D / E / H
4. K / L / N
5. J + 最终确认

## 文件结构

```text
wh40k-character-builder/
  manifest.json
  index.js
  style.css
  README.md
```

## 安装方式（本地）

把整个 `wh40k-character-builder` 文件夹放到：

```text
data/<你的user-handle>/extensions/
```

然后重启或刷新 SillyTavern。

## 安装方式（Git 仓库）

1. 新建一个 Git 仓库。
2. 把这 4 个文件上传到仓库根目录。
3. 在 SillyTavern 扩展页面使用 **Install extension**，填入仓库地址。

## 说明

- 这是一个 UI 扩展，不是 Regex 脚本，也不是主题文件。
- `style.css` 会通过 `manifest.json` 自动加载，不需要单独导入。
- 默认会在空白新聊天中自动弹出；也会在右下角显示“角色创建器”按钮。
- 最终会发送一条模板消息，例如：

```text
A3 B1 C6 D2 E3 F1 G2 H15 I4 J5 K4 L3 N7
名字：阿玛拉
```

## 可调配置

在 `index.js` 顶部可以改：

- `TARGET_CHARACTER_NAME`
- `AUTO_OPEN_FOR_EMPTY_CHAT`
- `AUTO_SEND_AFTER_FILL`

## 当前逻辑

- 非法组合不会在前端强制全部拦截。
- 扩展会给出兼容性提示。
- 真正的自动修正，交给你的世界书规则与角色生成规则处理。
