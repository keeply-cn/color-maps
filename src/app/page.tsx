import Link from 'next/link';
import { getAvailableMaps } from '@/data/maps';

export default function Home() {
  const maps = getAvailableMaps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          🎨 Color Maps
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          四色定理地图涂色游戏
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">选择地图</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {maps.map(map => (
              <Link
                key={map.id}
                href={`/game/${map.id}`}
                className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="text-3xl mb-2">🗺️</div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">
                  {map.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {map.regionCount} 个区域
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white/80 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📖 游戏规则</h3>
          <ul className="text-left text-gray-600 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>使用 <strong>≤4 种颜色</strong> 为地图涂色</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>相邻区域</strong> 不能使用相同颜色</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>所有区域都正确涂色即 <strong>挑战成功</strong></span>
            </li>
          </ul>
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          <p>基于四色定理 · 任何平面地图最多只需四种颜色</p>
        </footer>
      </div>
    </div>
  );
}
