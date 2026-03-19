# 快速启动指南

## 5 分钟快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd color-maps
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 打开浏览器
访问 [http://localhost:3000](http://localhost:3000)

🎉 开始游戏！

## 常用命令

### 开发
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm start            # 启动生产服务器
npm test             # 运行测试
npm run lint         # 代码检查
```

## 项目结构速览

```
color-maps/
├── src/
│   ├── app/              # 页面
│   │   ├── page.tsx      # 首页（地图选择）
│   │   └── game/         # 游戏页面
│   ├── components/       # UI 组件
│   ├── data/            # 地图数据
│   ├── hooks/           # React Hooks
│   ├── services/        # 业务逻辑
│   └── types/           # TypeScript 类型
├── public/              # 静态资源
└── tests/               # 测试文件
```

## 核心文件说明

### 页面
- `src/app/page.tsx` - 首页，地图选择界面
- `src/app/game/[mapId]/page.tsx` - 游戏页面

### 组件
- `src/components/MapRenderer.tsx` - 地图渲染
- `src/components/ColorPicker.tsx` - 颜色选择器
- `src/components/GameInfo.tsx` - 游戏信息面板
- `src/components/VictoryModal.tsx` - 胜利弹窗

### 数据
- `src/data/maps.ts` - 地图管理
- `src/data/world-map.ts` - 世界地图数据

### 服务
- `src/services/four-color.ts` - 四色定理验证
- `src/services/adjacency.ts` - 邻接关系计算
- `src/services/audio.ts` - 音效服务
- `src/services/db.ts` - 数据存储

## 添加新地图

### 1. 创建地图数据
在 `src/data/` 创建新文件：

```typescript
// src/data/my-map.ts
import type { Region } from '@/types';

export const MY_MAP: Region[] = [
  {
    id: 'region1',
    name: '区域1',
    path: 'M 10 10 L 50 10 L 50 50 L 10 50 Z',
    neighbors: ['region2']
  },
  // ... 更多区域
];
```

### 2. 注册地图
在 `src/data/maps.ts` 中：

```typescript
import { MY_MAP } from './my-map';

// 在 getMapData 中添加
case 'my-map':
  return MY_MAP;

// 在 getAvailableMaps 中添加
{
  id: 'my-map',
  name: '我的地图',
  description: '描述',
  regionCount: MY_MAP.length,
  difficulty: 'medium',
  category: 'world',
}
```

### 3. 测试
访问 `/game/my-map` 查看效果

## 修改颜色

在 `src/types/index.ts` 中修改 `FOUR_COLORS`：

```typescript
export const FOUR_COLORS: ColorConfig[] = [
  { id: 'red', name: '红色', value: '#ef4444', tailwindClass: 'bg-red-500' },
  { id: 'green', name: '绿色', value: '#22c55e', tailwindClass: 'bg-green-500' },
  { id: 'blue', name: '蓝色', value: '#3b82f6', tailwindClass: 'bg-blue-500' },
  { id: 'yellow', name: '黄色', value: '#eab308', tailwindClass: 'bg-yellow-500' },
];
```

## 调试技巧

### 1. 查看游戏状态
在浏览器控制台：
```javascript
// 查看 IndexedDB 数据
indexedDB.databases()
```

### 2. 清除保存的进度
```javascript
// 在浏览器控制台
indexedDB.deleteDatabase('color-maps-db')
```

### 3. 测试音效
```javascript
// 在浏览器控制台
const audio = new AudioContext();
const osc = audio.createOscillator();
osc.connect(audio.destination);
osc.start();
setTimeout(() => osc.stop(), 200);
```

## 常见问题

### Q: 地图不显示？
A: 检查浏览器控制台错误，确认 SVG 路径数据正确

### Q: 音效不工作？
A: 确保浏览器支持 Web Audio API，检查音效开关

### Q: 进度没有保存？
A: 检查浏览器是否支持 IndexedDB，清除浏览器缓存重试

### Q: 构建失败？
A: 删除 `.next` 和 `node_modules`，重新安装依赖

## 性能优化

### 开发环境
```bash
# 使用 Turbopack（更快的开发服务器）
npm run dev --turbopack
```

### 生产环境
```bash
# 分析包大小
npm run build
# 查看 .next/analyze/ 目录
```

## 部署

### Vercel（推荐）
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 获取帮助

- 📖 查看 [README.md](./README.md)
- 🐛 提交 [Issue](https://github.com/your-repo/issues)
- 💬 参与 [Discussions](https://github.com/your-repo/discussions)
- 📧 联系维护者

## 下一步

- [ ] 阅读完整 [README.md](./README.md)
- [ ] 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何贡献
- [ ] 浏览 [DEPLOYMENT.md](./DEPLOYMENT.md) 学习部署
- [ ] 阅读 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) 了解项目全貌

---

祝你玩得开心！🎨🗺️
