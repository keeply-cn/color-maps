# 部署指南

## 部署到 Vercel（推荐）

### 方式一：通过 Vercel CLI

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 登录 Vercel
```bash
vercel login
```

3. 部署
```bash
vercel
```

4. 生产部署
```bash
vercel --prod
```

### 方式二：通过 GitHub

1. 将代码推送到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. 访问 [Vercel](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

## 部署到 Netlify

1. 构建项目
```bash
npm run build
```

2. 安装 Netlify CLI
```bash
npm i -g netlify-cli
```

3. 登录 Netlify
```bash
netlify login
```

4. 部署
```bash
netlify deploy --prod --dir=.next
```

## 部署到自己的服务器

### 使用 PM2

1. 构建项目
```bash
npm run build
```

2. 安装 PM2
```bash
npm i -g pm2
```

3. 启动应用
```bash
pm2 start npm --name "color-maps" -- start
```

4. 设置开机自启
```bash
pm2 startup
pm2 save
```

### 使用 Docker

1. 创建 Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. 构建镜像
```bash
docker build -t color-maps .
```

3. 运行容器
```bash
docker run -p 3000:3000 color-maps
```

## 环境变量

本项目不需要额外的环境变量。

## 性能优化建议

### 1. 启用 CDN
- 使用 Vercel 或 Netlify 自动获得全球 CDN
- 或配置 Cloudflare CDN

### 2. 图片优化
- 添加真实的图标文件（icon-192.png, icon-512.png）
- 使用 WebP 格式

### 3. 缓存策略
- Service Worker 已配置缓存
- 建议设置 HTTP 缓存头：
  ```
  Cache-Control: public, max-age=31536000, immutable
  ```

### 4. 压缩
- 启用 Gzip/Brotli 压缩
- Vercel 和 Netlify 自动启用

## 监控和分析

### Google Analytics
在 `src/app/layout.tsx` 中添加：
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Vercel Analytics
```bash
npm i @vercel/analytics
```

在 `src/app/layout.tsx` 中添加：
```tsx
import { Analytics } from '@vercel/analytics/react';

// 在 body 中添加
<Analytics />
```

## 域名配置

### Vercel
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Vercel

### Netlify
1. 在 Netlify 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Netlify

## SSL 证书

Vercel 和 Netlify 自动提供免费的 SSL 证书（Let's Encrypt）。

## 故障排查

### 构建失败
```bash
# 清除缓存
rm -rf .next node_modules
npm install
npm run build
```

### Service Worker 不工作
- 确保使用 HTTPS（本地开发除外）
- 检查浏览器控制台错误
- 清除浏览器缓存

### 地图不显示
- 检查浏览器控制台错误
- 确认 SVG 路径数据正确
- 检查 IndexedDB 是否可用

## 更新部署

### Vercel
推送到 GitHub 自动触发部署

### 手动更新
```bash
git pull
npm install
npm run build
pm2 restart color-maps
```

## 备份

### 数据备份
用户数据存储在浏览器 IndexedDB 中，无需服务器备份。

### 代码备份
- 使用 Git 版本控制
- 定期推送到 GitHub/GitLab

## 成本估算

### Vercel（推荐）
- Hobby 计划：免费
- Pro 计划：$20/月（如需更多资源）

### Netlify
- Starter 计划：免费
- Pro 计划：$19/月

### 自托管
- VPS：$5-20/月（DigitalOcean, Linode 等）
- 域名：$10-15/年

## 支持

如有问题，请提交 Issue 到 GitHub 仓库。
