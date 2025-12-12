# 🌐 多语言支持（i18n）使用指南

## 概述

Awesome AI Models 现已支持多语言功能，用户可以在中文（简体）和英文之间自由切换。

## 功能特性

### ✨ 支持的语言
- **中文（简体）**: `zh-CN`
- **English**: `en`

### 🎯 翻译范围
- ✅ 导航栏（标题、副标题）
- ✅ 页面标题和描述
- ✅ 搜索框占位符
- ✅ 筛选器标签（组织、类型）
- ✅ 视图切换按钮（时间线/网格）
- ✅ 模型计数显示
- ✅ 空状态提示
- ✅ 页脚信息
- ✅ 按钮文本（Repo/GitHub）
- ✅ 日期格式本地化

### 🔄 自动检测
系统会自动检测用户浏览器语言：
- 浏览器语言为中文 → 默认显示中文
- 浏览器语言为其他 → 默认显示英文

### 💾 持久化存储
用户选择的语言偏好会保存在浏览器的 LocalStorage 中，下次访问时自动应用。

---

## 使用方法

### 用户端使用

1. **切换语言**
   - 点击导航栏右上角的 `🌐 中文` 或 `🌐 English` 按钮
   - 页面内容会立即切换到对应语言

2. **语言偏好**
   - 选择的语言会自动保存
   - 刷新页面或下次访问时保持选择

---

## 开发者指南

### 架构设计

```
docs/
├── js/
│   ├── i18n.js          # i18n 核心库
│   └── app.js           # 主应用（集成 i18n）
├── index.html           # HTML（添加 data-i18n 属性）
└── models.json          # 模型数据
```

### 核心组件

#### 1. i18n.js - 国际化引擎

```javascript
// 翻译配置
const translations = {
    'zh-CN': { /* 中文翻译 */ },
    'en': { /* 英文翻译 */ }
};

// i18n 类
class I18n {
    detectLanguage()      // 自动检测浏览器语言
    setLanguage(lang)     // 设置语言
    t(key, params)        // 获取翻译（支持参数替换）
    updatePageContent()   // 更新页面内容
}
```

#### 2. HTML 标记

使用 `data-i18n` 属性标记需要翻译的元素：

```html
<!-- 文本内容 -->
<h1 data-i18n="nav.title">Awesome AI Models</h1>

<!-- 输入框占位符 -->
<input data-i18n="search.placeholder" placeholder="搜索..." />

<!-- 按钮 -->
<button data-i18n="view.timeline">📅 时间线</button>
```

#### 3. JavaScript 集成

```javascript
// 初始化语言显示
i18n.updatePageContent();

// 切换语言
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    i18n.setLanguage(newLang);
});

// 监听语言变化事件
window.addEventListener('languageChanged', (e) => {
    // 更新动态内容
    updateModelCount();
    renderModels();
});
```

---

## 添加新翻译

### 步骤 1: 在 i18n.js 中添加翻译键

```javascript
const translations = {
    'zh-CN': {
        // 添加新的翻译键
        'new.feature': '新功能',
    },
    'en': {
        'new.feature': 'New Feature',
    }
};
```

### 步骤 2: 在 HTML 中使用

```html
<div data-i18n="new.feature">新功能</div>
```

### 步骤 3: 在 JavaScript 中使用

```javascript
const text = i18n.t('new.feature');
console.log(text); // 输出当前语言的翻译
```

---

## 参数化翻译

支持在翻译中使用动态参数：

```javascript
// 在 translations 中定义
'view.count': '显示 {current} / {total} 个模型'  // 中文
'view.count': 'Showing {current} / {total} models'  // 英文

// 使用时传入参数
i18n.t('view.count', { current: 28, total: 28 });
// 中文输出: "显示 28 / 28 个模型"
// 英文输出: "Showing 28 / 28 models"
```

---

## 日期本地化

日期格式会根据当前语言自动调整：

```javascript
const locale = i18n.getCurrentLanguage() === 'zh-CN' ? 'zh-CN' : 'en-US';
const formattedDate = date.toLocaleDateString(locale, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// 中文: "2024年8月1日"
// 英文: "August 1, 2024"
```

---

## 添加新语言

### 步骤 1: 在 translations 对象中添加新语言

```javascript
const translations = {
    'zh-CN': { /* ... */ },
    'en': { /* ... */ },
    'ja': {  // 日语
        'nav.title': 'Awesome AI Models',
        'nav.subtitle': 'オープンソース AI モデル タイムライン',
        // ... 其他翻译
    }
};
```

### 步骤 2: 更新语言检测逻辑（可选）

```javascript
detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) return 'zh-CN';
    if (browserLang.startsWith('ja')) return 'ja';
    return 'en';
}
```

### 步骤 3: 更新语言切换 UI

可以将按钮改为下拉菜单以支持多语言选择。

---

## API 参考

### i18n 对象方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `detectLanguage()` | 无 | `string` | 检测浏览器语言 |
| `getStoredLanguage()` | 无 | `string\|null` | 获取存储的语言偏好 |
| `setLanguage(lang)` | `lang: string` | 无 | 设置当前语言 |
| `t(key, params)` | `key: string`, `params?: object` | `string` | 获取翻译文本 |
| `updatePageContent()` | 无 | 无 | 更新页面所有翻译内容 |
| `getCurrentLanguage()` | 无 | `string` | 获取当前语言 |
| `getAvailableLanguages()` | 无 | `string[]` | 获取所有可用语言 |

### 事件

| 事件名 | 详情 | 说明 |
|--------|------|------|
| `languageChanged` | `{ lang: string }` | 语言切换时触发 |

---

## 最佳实践

### 1. 翻译键命名规范
```
[模块].[元素].[属性?]

示例:
nav.title           # 导航栏标题
filter.organization # 筛选器-组织标签
view.count          # 视图-计数文本
```

### 2. 保持翻译简洁
- 避免过长的翻译文本
- 考虑不同语言的长度差异
- 测试在不同屏幕尺寸下的显示效果

### 3. 语义化标记
```html
<!-- ✅ 好 -->
<h1 data-i18n="header.title">标题</h1>

<!-- ❌ 避免 -->
<div data-i18n="text1">标题</div>
```

### 4. 动态内容更新
```javascript
// 监听语言变化，更新动态生成的内容
window.addEventListener('languageChanged', () => {
    // 重新渲染需要翻译的动态内容
    createFilterButtons();
    renderModels();
});
```

---

## 性能考虑

1. **按需更新**: 只更新可见的内容，避免全局更新
2. **缓存翻译**: 翻译结果可以缓存以提高性能
3. **延迟加载**: 大型翻译文件可以按需加载

---

## 浏览器兼容性

| 功能 | 要求 |
|------|------|
| LocalStorage | IE 8+ |
| CustomEvent | IE 9+ |
| querySelector | IE 8+ |
| Arrow Functions | 现代浏览器（可用 Babel 转译） |

---

## 故障排除

### 问题 1: 翻译不显示
**原因**: HTML 元素没有 `data-i18n` 属性  
**解决**: 添加 `data-i18n="translation.key"` 属性

### 问题 2: 语言切换后部分内容未更新
**原因**: 动态生成的内容没有监听 `languageChanged` 事件  
**解决**: 添加事件监听器并重新渲染内容

### 问题 3: 参数替换不生效
**原因**: 占位符格式不正确  
**解决**: 确保使用 `{paramName}` 格式

---

## 更新日志

### v1.0.0 (2024-12-12)
- ✅ 实现中文/英文双语支持
- ✅ 自动检测浏览器语言
- ✅ LocalStorage 持久化
- ✅ 日期格式本地化
- ✅ 全页面内容翻译
- ✅ 语言切换按钮

---

## 未来计划

- [ ] 添加更多语言（日语、韩语、法语等）
- [ ] 支持从外部文件加载翻译
- [ ] 翻译管理后台
- [ ] RTL（从右到左）语言支持
- [ ] 翻译质量检查工具

---

## 贡献翻译

欢迎贡献新的语言翻译！

1. Fork 项目
2. 编辑 `docs/js/i18n.js`
3. 添加新语言的翻译对象
4. 测试翻译是否正确显示
5. 提交 Pull Request

---

## 许可证

与项目主许可证相同

---

## 联系方式

- **GitHub**: [@sav7ng](https://github.com/sav7ng)
- **Issues**: https://github.com/sav7ng/awesome-ai-models/issues

---

**最后更新**: 2024-12-12  
**版本**: v1.0.0
