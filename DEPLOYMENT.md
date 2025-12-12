# 📦 部署指南

## GitHub Pages 部署步骤

### 1. 启用 GitHub Pages

1. 访问你的 GitHub 仓库：https://github.com/sav7ng/awesome-ai-models
2. 点击 **Settings** （设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单中选择：
   - **Source**: GitHub Actions
5. 保存设置

### 2. 触发自动部署

部署会在以下情况自动触发：
- ✅ 推送代码到 `main` 分支
- ✅ 手动触发工作流

**手动触发步骤：**
1. 进入仓库的 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** 按钮
4. 选择 `main` 分支
5. 点击绿色的 **Run workflow** 按钮

### 3. 查看部署状态

1. 在 **Actions** 标签页查看工作流运行状态
2. 等待部署完成（通常需要 1-2 分钟）
3. 部署成功后，网站将在以下地址可用：
   - **https://sav7ng.github.io/awesome-ai-models/**

### 4. 验证部署

访问你的网站并检查：
- ✅ 页面正常加载
- ✅ 深浅色主题切换正常
- ✅ 粒子背景效果运行
- ✅ 筛选和搜索功能正常
- ✅ Timeline 和 Grid 视图切换正常
- ✅ 所有链接可点击

## 常见问题

### 问题 1: 404 错误
**解决方案：**
- 确保 GitHub Pages 设置中选择了 "GitHub Actions"
- 检查工作流是否成功运行
- 等待几分钟让 DNS 传播

### 问题 2: 工作流失败
**解决方案：**
- 检查 Actions 标签页的错误日志
- 确保仓库有 Pages 写入权限
- 重新运行工作流

### 问题 3: 样式或 JS 不加载
**解决方案：**
- 检查浏览器控制台是否有错误
- 确保所有 CDN 链接可访问
- 清除浏览器缓存

## 更新网站内容

### 添加新模型

1. 编辑 `docs/models.json`
2. 添加新的模型条目：
```json
{
  "name": "新模型名称",
  "org": "组织名称",
  "date": "YYYY-MM-DD",
  "repo": "https://github.com/...",
  "tags": ["LLM"],
  "description": "简短描述"
}
```
3. 提交并推送：
```bash
git add docs/models.json
git commit -m "feat: 添加新模型"
git push
```

### 修改样式

1. 编辑 `docs/css/style.css`
2. 提交并推送更改
3. GitHub Actions 会自动重新部署

## 本地开发

### 启动本地服务器

**Python:**
```bash
cd docs
python -m http.server 8000
```

**Node.js:**
```bash
cd docs
npx serve
```

访问：http://localhost:8000

### 实时预览更改

每次修改后刷新浏览器即可看到更新。

## 性能优化建议

### 已实现的优化
✅ CDN 加载所有依赖
✅ 响应式图片和布局
✅ 代码压缩（通过 CDN）
✅ 懒加载动画（AOS）

### 可选优化
- 添加 Service Worker（PWA）
- 实现图片懒加载
- 使用 WebP 格式图片
- 启用 HTTP/2

## 监控和分析

### Google Analytics（可选）

在 `docs/index.html` 的 `<head>` 中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 自定义域名（可选）

### 设置步骤

1. 在 `docs/` 目录创建 `CNAME` 文件
2. 添加你的域名：`your-domain.com`
3. 在域名提供商设置 DNS：
   - 类型：`CNAME`
   - 名称：`@` 或 `www`
   - 值：`sav7ng.github.io`
4. 提交并推送 CNAME 文件
5. 在 GitHub Settings > Pages 中输入自定义域名

## 备份和恢复

### 备份
所有内容都在 Git 仓库中，定期推送即可。

### 恢复
```bash
git clone https://github.com/sav7ng/awesome-ai-models.git
cd awesome-ai-models
# 重新部署会自动触发
```

## 技术支持

如有问题，请：
1. 查看 GitHub Issues
2. 提交新的 Issue
3. 参考 README.md

---

🎉 恭喜！你的 AI 模型时间线网站已成功部署！
