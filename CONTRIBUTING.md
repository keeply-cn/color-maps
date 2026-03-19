# 贡献指南

感谢你对 Color Maps 项目的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/your-repo/color-maps/issues) 是否已有相同问题
2. 如果没有，创建新 Issue，包含：
   - Bug 描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 截图（如果适用）
   - 浏览器和操作系统信息

### 提出新功能

1. 创建 Issue 描述你的想法
2. 等待维护者反馈
3. 获得批准后开始开发

### 提交代码

1. Fork 项目
2. 创建功能分支
```bash
git checkout -b feature/amazing-feature
```

3. 提交更改
```bash
git commit -m 'Add some amazing feature'
```

4. 推送到分支
```bash
git push origin feature/amazing-feature
```

5. 创建 Pull Request

## 开发指南

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 运行测试

```bash
npm test
```

### 代码检查

```bash
npm run lint
```

### 构建

```bash
npm run build
```

## 代码规范

### TypeScript

- 使用 TypeScript 严格模式
- 为所有函数添加类型注解
- 避免使用 `any` 类型

### React

- 使用函数组件和 Hooks
- 组件名使用 PascalCase
- Props 接口以 `Props` 结尾

### 样式

- 使用 Tailwind CSS
- 避免内联样式（除非必要）
- 响应式优先（移动端优先）

### 命名规范

- 文件名：kebab-case（如 `map-renderer.tsx`）
- 组件名：PascalCase（如 `MapRenderer`）
- 函数名：camelCase（如 `handleClick`）
- 常量名：UPPER_SNAKE_CASE（如 `FOUR_COLORS`）

## 提交信息规范

使用语义化提交信息：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```
feat: 添加世界地图数据
fix: 修复触摸交互问题
docs: 更新 README
```

## 添加新地图

### 1. 创建地图数据文件

在 `src/data/` 目录创建新文件，如 `usa-map.ts`：

```typescript
import type { Region } from '@/types';

export const USA_MAP: Region[] = [
  {
    id: 'CA',
    name: '加利福尼亚',
    path: 'M 10 10 L 50 10 L 50 50 L 10 50 Z',
    neighbors: ['NV', 'OR', 'AZ']
  },
  // ... 更多州
];
```

### 2. 更新地图管理

在 `src/data/maps.ts` 中：

```typescript
import { USA_MAP } from './usa-map';

export function getMapData(mapId: string): Region[] {
  switch (mapId) {
    case 'usa':
      return USA_MAP;
    // ... 其他地图
  }
}

export function getAvailableMaps(): MapInfo[] {
  return [
    // ... 其他地图
    {
      id: 'usa',
      name: '美国地图',
      description: '50个州',
      regionCount: USA_MAP.length,
      difficulty: 'hard',
      category: 'world',
    },
  ];
}
```

### 3. 测试地图

- 确保所有区域都有邻接关系
- 验证邻接关系是双向的
- 测试四色定理验证

## 添加新功能

### 1. 规划

- 在 Issue 中讨论功能设计
- 考虑用户体验
- 考虑性能影响

### 2. 实现

- 编写清晰的代码
- 添加必要的注释
- 遵循现有代码风格

### 3. 测试

- 添加单元测试
- 手动测试所有场景
- 测试移动端和桌面端

### 4. 文档

- 更新 README（如果需要）
- 添加代码注释
- 更新 MEMORY.md

## 优化建议

### 性能优化

- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo 和 useCallback
- 优化大型地图的 SVG 路径

### 可访问性

- 添加 ARIA 标签
- 支持键盘导航
- 确保颜色对比度

### 国际化

- 使用 i18n 库
- 提取所有文本到语言文件
- 支持 RTL 语言

## 问题和帮助

- 查看 [Issues](https://github.com/your-repo/color-maps/issues)
- 加入讨论
- 联系维护者

## 行为准则

- 尊重他人
- 建设性反馈
- 包容和友好

## 许可证

贡献的代码将使用 MIT 许可证。

---

再次感谢你的贡献！🎉
