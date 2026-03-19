import Link from 'next/link';
import { getAvailableMaps } from '@/data/maps';

export default function Home() {
  const maps = getAvailableMaps();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return '';
    }
  };

  const getMapIcon = (category: string) => {
    switch (category) {
      case 'world':
        return '🌍';
      case 'china':
        return '🇨🇳';
      case 'province':
        return '🗺️';
      default:
        return '🗺️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-3">
            🎨 Color Maps
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            四色定理地图涂色游戏
          </p>
          <p className="text-sm text-gray-500">
            适合 7-12 岁儿童 · 学习地理 · 培养逻辑思维
          </p>
        </div>

        {/* 地图选择卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            选择地图开始挑战
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {maps.map(map => (
              <Link
                key={map.id}
                href={`/game/${map.id}`}
                className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
              >
                {/* 难度标签 */}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(map.difficulty)}`}>
                    {getDifficultyText(map.difficulty)}
                  </span>
                </div>

                {/* 图标 */}
                <div className="text-4xl mb-3">{getMapIcon(map.category)}</div>
                
                {/* 标题 */}
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-2 transition-colors">
                  {map.name}
                </h3>
                
                {/* 描述 */}
                <p className="text-sm text-gray-600 mb-3">
                  {map.description}
                </p>
                
                {/* 区域数量 */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>{map.regionCount} 个区域</span>
                </div>

                {/* 悬停效果 */}
                <div className="absolute inset-0 rounded-xl bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* 游戏规则 */}
        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📖</span>
            <span>游戏规则</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">选择颜色</p>
                <p className="text-gray-600">使用红、黄、蓝、绿四种颜色</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">涂色规则</p>
                <p className="text-gray-600">相邻区域不能使用相同颜色</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">完成挑战</p>
                <p className="text-gray-600">所有区域正确涂色即获胜</p>
              </div>
            </div>
          </div>
        </div>

        {/* 教育价值 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>✨</span>
            <span>学习收获</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌏</span>
              <span>认识国家和省份位置</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <span>培养色彩感知能力</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <span>锻炼逻辑思维能力</span>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>基于四色定理 · 任何平面地图最多只需四种颜色</p>
          <p className="mt-1 text-xs">支持离线使用 · 自动保存进度</p>
        </footer>
      </div>
    </div>
  );
}
