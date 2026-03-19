import type { Region } from '@/types';

/**
 * 简化版世界地图 - 适合7-12岁儿童
 * 包含主要大国和地理位置明显的国家（约50个）
 * 简化的SVG路径，便于识别和涂色
 */
export const WORLD_MAP: Region[] = [
  // 北美洲
  {
    id: 'US',
    name: '美国',
    path: 'M 50 80 L 180 80 L 180 140 L 50 140 Z',
    neighbors: ['CA', 'MX']
  },
  {
    id: 'CA',
    name: '加拿大',
    path: 'M 50 20 L 200 20 L 200 80 L 50 80 Z',
    neighbors: ['US']
  },
  {
    id: 'MX',
    name: '墨西哥',
    path: 'M 60 140 L 140 140 L 130 170 L 70 170 Z',
    neighbors: ['US', 'GT']
  },
  {
    id: 'GT',
    name: '危地马拉',
    path: 'M 100 170 L 120 170 L 120 180 L 100 180 Z',
    neighbors: ['MX', 'HN']
  },
  {
    id: 'HN',
    name: '洪都拉斯',
    path: 'M 120 170 L 140 170 L 140 180 L 120 180 Z',
    neighbors: ['GT', 'NI']
  },
  {
    id: 'NI',
    name: '尼加拉瓜',
    path: 'M 120 180 L 140 180 L 140 190 L 120 190 Z',
    neighbors: ['HN', 'CR']
  },
  {
    id: 'CR',
    name: '哥斯达黎加',
    path: 'M 120 190 L 140 190 L 140 195 L 120 195 Z',
    neighbors: ['NI', 'PA']
  },
  {
    id: 'PA',
    name: '巴拿马',
    path: 'M 130 195 L 150 195 L 150 200 L 130 200 Z',
    neighbors: ['CR', 'CO']
  },

  // 南美洲
  {
    id: 'CO',
    name: '哥伦比亚',
    path: 'M 140 200 L 170 200 L 170 230 L 140 230 Z',
    neighbors: ['PA', 'VE', 'BR', 'PE', 'EC']
  },
  {
    id: 'VE',
    name: '委内瑞拉',
    path: 'M 170 200 L 210 200 L 210 220 L 170 220 Z',
    neighbors: ['CO', 'BR', 'GY']
  },
  {
    id: 'GY',
    name: '圭亚那',
    path: 'M 210 200 L 230 200 L 230 220 L 210 220 Z',
    neighbors: ['VE', 'BR', 'SR']
  },
  {
    id: 'SR',
    name: '苏里南',
    path: 'M 230 200 L 245 200 L 245 220 L 230 220 Z',
    neighbors: ['GY', 'BR']
  },
  {
    id: 'BR',
    name: '巴西',
    path: 'M 170 220 L 260 220 L 260 300 L 190 300 L 170 270 Z',
    neighbors: ['VE', 'GY', 'SR', 'CO', 'PE', 'BO', 'PY', 'AR', 'UY']
  },
  {
    id: 'EC',
    name: '厄瓜多尔',
    path: 'M 130 230 L 150 230 L 150 250 L 130 250 Z',
    neighbors: ['CO', 'PE']
  },
  {
    id: 'PE',
    name: '秘鲁',
    path: 'M 130 250 L 170 250 L 170 290 L 130 290 Z',
    neighbors: ['EC', 'CO', 'BR', 'BO', 'CL']
  },
  {
    id: 'BO',
    name: '玻利维亚',
    path: 'M 160 280 L 190 280 L 190 310 L 160 310 Z',
    neighbors: ['PE', 'BR', 'PY', 'AR', 'CL']
  },
  {
    id: 'CL',
    name: '智利',
    path: 'M 140 290 L 160 290 L 160 350 L 140 350 Z',
    neighbors: ['PE', 'BO', 'AR']
  },
  {
    id: 'AR',
    name: '阿根廷',
    path: 'M 160 300 L 200 300 L 200 360 L 160 360 Z',
    neighbors: ['BO', 'PY', 'BR', 'UY', 'CL']
  },
  {
    id: 'PY',
    name: '巴拉圭',
    path: 'M 180 290 L 200 290 L 200 310 L 180 310 Z',
    neighbors: ['BO', 'BR', 'AR']
  },
  {
    id: 'UY',
    name: '乌拉圭',
    path: 'M 200 310 L 215 310 L 215 325 L 200 325 Z',
    neighbors: ['BR', 'AR']
  },

  // 欧洲
  {
    id: 'IS',
    name: '冰岛',
    path: 'M 320 40 L 340 40 L 340 50 L 320 50 Z',
    neighbors: []
  },
  {
    id: 'NO',
    name: '挪威',
    path: 'M 360 20 L 380 20 L 380 70 L 360 70 Z',
    neighbors: ['SE', 'FI']
  },
  {
    id: 'SE',
    name: '瑞典',
    path: 'M 380 30 L 400 30 L 400 80 L 380 80 Z',
    neighbors: ['NO', 'FI']
  },
  {
    id: 'FI',
    name: '芬兰',
    path: 'M 400 30 L 425 30 L 425 75 L 400 75 Z',
    neighbors: ['NO', 'SE', 'RU']
  },
  {
    id: 'GB',
    name: '英国',
    path: 'M 340 70 L 360 70 L 360 95 L 340 95 Z',
    neighbors: ['IE']
  },
  {
    id: 'IE',
    name: '爱尔兰',
    path: 'M 325 75 L 340 75 L 340 90 L 325 90 Z',
    neighbors: ['GB']
  },
  {
    id: 'FR',
    name: '法国',
    path: 'M 350 95 L 380 95 L 380 120 L 350 120 Z',
    neighbors: ['ES', 'BE', 'DE', 'CH', 'IT']
  },
  {
    id: 'ES',
    name: '西班牙',
    path: 'M 330 110 L 360 110 L 360 135 L 330 135 Z',
    neighbors: ['PT', 'FR']
  },
  {
    id: 'PT',
    name: '葡萄牙',
    path: 'M 315 115 L 330 115 L 330 135 L 315 135 Z',
    neighbors: ['ES']
  },
  {
    id: 'IT',
    name: '意大利',
    path: 'M 385 105 L 405 105 L 400 140 L 390 140 Z',
    neighbors: ['FR', 'CH', 'AT', 'SI']
  },
  {
    id: 'DE',
    name: '德国',
    path: 'M 375 85 L 400 85 L 400 105 L 375 105 Z',
    neighbors: ['DK', 'PL', 'CZ', 'AT', 'CH', 'FR', 'BE', 'NL']
  },
  {
    id: 'PL',
    name: '波兰',
    path: 'M 400 80 L 425 80 L 425 100 L 400 100 Z',
    neighbors: ['DE', 'CZ', 'SK', 'UA', 'BY', 'LT']
  },
  {
    id: 'UA',
    name: '乌克兰',
    path: 'M 425 90 L 470 90 L 470 115 L 425 115 Z',
    neighbors: ['PL', 'SK', 'HU', 'RO', 'MD', 'RU', 'BY']
  },
  {
    id: 'RU',
    name: '俄罗斯',
    path: 'M 425 20 L 650 20 L 650 120 L 470 120 L 470 90 L 425 90 L 425 75 Z',
    neighbors: ['NO', 'FI', 'BY', 'UA', 'GE', 'AZ', 'KZ', 'MN', 'CN']
  },

  // 非洲
  {
    id: 'EG',
    name: '埃及',
    path: 'M 410 150 L 435 150 L 435 180 L 410 180 Z',
    neighbors: ['LY', 'SD']
  },
  {
    id: 'LY',
    name: '利比亚',
    path: 'M 380 145 L 410 145 L 410 175 L 380 175 Z',
    neighbors: ['TN', 'DZ', 'NE', 'TD', 'SD', 'EG']
  },
  {
    id: 'DZ',
    name: '阿尔及利亚',
    path: 'M 340 140 L 380 140 L 380 175 L 340 175 Z',
    neighbors: ['MA', 'TN', 'LY', 'NE', 'ML', 'MR']
  },
  {
    id: 'SD',
    name: '苏丹',
    path: 'M 410 180 L 450 180 L 450 210 L 410 210 Z',
    neighbors: ['EG', 'LY', 'TD', 'CF', 'SS', 'ET', 'ER']
  },
  {
    id: 'ET',
    name: '埃塞俄比亚',
    path: 'M 440 200 L 470 200 L 470 225 L 440 225 Z',
    neighbors: ['ER', 'DJ', 'SO', 'KE', 'SS', 'SD']
  },
  {
    id: 'KE',
    name: '肯尼亚',
    path: 'M 440 225 L 465 225 L 465 250 L 440 250 Z',
    neighbors: ['ET', 'SO', 'TZ', 'UG', 'SS']
  },
  {
    id: 'TZ',
    name: '坦桑尼亚',
    path: 'M 430 250 L 465 250 L 465 280 L 430 280 Z',
    neighbors: ['KE', 'UG', 'RW', 'BI', 'CD', 'ZM', 'MW', 'MZ']
  },
  {
    id: 'ZA',
    name: '南非',
    path: 'M 400 310 L 445 310 L 445 350 L 400 350 Z',
    neighbors: ['NA', 'BW', 'ZW', 'MZ', 'LS']
  },
  {
    id: 'NG',
    name: '尼日利亚',
    path: 'M 360 190 L 385 190 L 385 210 L 360 210 Z',
    neighbors: ['BJ', 'NE', 'TD', 'CM']
  },
  {
    id: 'CD',
    name: '刚果（金）',
    path: 'M 390 220 L 435 220 L 435 270 L 390 270 Z',
    neighbors: ['CF', 'SS', 'UG', 'RW', 'BI', 'TZ', 'ZM', 'AO', 'CG']
  },

  // 亚洲
  {
    id: 'TR',
    name: '土耳其',
    path: 'M 420 120 L 465 120 L 465 140 L 420 140 Z',
    neighbors: ['GR', 'BG', 'GE', 'AM', 'AZ', 'IR', 'IQ', 'SY']
  },
  {
    id: 'SA',
    name: '沙特阿拉伯',
    path: 'M 450 150 L 500 150 L 500 190 L 450 190 Z',
    neighbors: ['JO', 'IQ', 'KW', 'QA', 'AE', 'OM', 'YE']
  },
  {
    id: 'IR',
    name: '伊朗',
    path: 'M 480 125 L 530 125 L 530 160 L 480 160 Z',
    neighbors: ['TR', 'IQ', 'KW', 'SA', 'AE', 'OM', 'AF', 'PK', 'TM', 'AZ', 'AM']
  },
  {
    id: 'IQ',
    name: '伊拉克',
    path: 'M 455 135 L 480 135 L 480 160 L 455 160 Z',
    neighbors: ['TR', 'SY', 'JO', 'SA', 'KW', 'IR']
  },
  {
    id: 'AF',
    name: '阿富汗',
    path: 'M 520 130 L 555 130 L 555 160 L 520 160 Z',
    neighbors: ['IR', 'TM', 'UZ', 'TJ', 'CN', 'PK']
  },
  {
    id: 'PK',
    name: '巴基斯坦',
    path: 'M 540 155 L 575 155 L 575 190 L 540 190 Z',
    neighbors: ['AF', 'IR', 'IN', 'CN']
  },
  {
    id: 'IN',
    name: '印度',
    path: 'M 560 165 L 610 165 L 610 230 L 560 230 Z',
    neighbors: ['PK', 'CN', 'NP', 'BT', 'MM', 'BD']
  },
  {
    id: 'CN',
    name: '中国',
    path: 'M 590 90 L 680 90 L 680 180 L 590 180 Z',
    neighbors: ['RU', 'MN', 'KZ', 'KG', 'TJ', 'AF', 'PK', 'IN', 'NP', 'BT', 'MM', 'LA', 'VN', 'KP']
  },
  {
    id: 'MN',
    name: '蒙古',
    path: 'M 590 60 L 660 60 L 660 95 L 590 95 Z',
    neighbors: ['RU', 'CN']
  },
  {
    id: 'KZ',
    name: '哈萨克斯坦',
    path: 'M 490 70 L 590 70 L 590 110 L 490 110 Z',
    neighbors: ['RU', 'CN', 'KG', 'UZ', 'TM']
  },
  {
    id: 'JP',
    name: '日本',
    path: 'M 710 100 L 740 100 L 740 150 L 710 150 Z',
    neighbors: []
  },
  {
    id: 'KR',
    name: '韩国',
    path: 'M 690 125 L 705 125 L 705 145 L 690 145 Z',
    neighbors: ['KP']
  },
  {
    id: 'KP',
    name: '朝鲜',
    path: 'M 680 115 L 695 115 L 695 135 L 680 135 Z',
    neighbors: ['CN', 'RU', 'KR']
  },
  {
    id: 'TH',
    name: '泰国',
    path: 'M 620 200 L 645 200 L 645 235 L 620 235 Z',
    neighbors: ['MM', 'LA', 'KH', 'MY']
  },
  {
    id: 'VN',
    name: '越南',
    path: 'M 640 180 L 660 180 L 660 230 L 640 230 Z',
    neighbors: ['CN', 'LA', 'KH']
  },
  {
    id: 'MY',
    name: '马来西亚',
    path: 'M 620 235 L 655 235 L 655 255 L 620 255 Z',
    neighbors: ['TH', 'ID', 'BN']
  },
  {
    id: 'ID',
    name: '印度尼西亚',
    path: 'M 610 250 L 710 250 L 710 280 L 610 280 Z',
    neighbors: ['MY', 'PG', 'TL']
  },
  {
    id: 'AU',
    name: '澳大利亚',
    path: 'M 650 300 L 750 300 L 750 370 L 650 370 Z',
    neighbors: []
  },
  {
    id: 'NZ',
    name: '新西兰',
    path: 'M 770 340 L 795 340 L 795 375 L 770 375 Z',
    neighbors: []
  },
];
