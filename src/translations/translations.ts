// src/translations/translations.ts

export type Language = "ko" | "en" | "ja" | "zh"

export interface Translations {
  [key: string]: {
    ko: string
    en: string
    ja: string
    zh: string
  }
}

export const translations: Translations = {
  // Navigation
  dashboard: { ko: "홈", en: "Home", ja: "ホーム", zh: "首页" },
  detail: { ko: "상세", en: "Detail", ja: "詳細", zh: "详情" },
  history: { ko: "기록", en: "History", ja: "履歴", zh: "记录" },
  settings: { ko: "설정", en: "Settings", ja: "設定", zh: "设置" },
  info: { ko: "정보", en: "Info", ja: "情報", zh: "信息" },

  // Main content
  title: { ko: "Dog Walk Safety", en: "Dog Walk Safety", ja: "Dog Walk Safety", zh: "Dog Walk Safety" },
  subtitle: {
    ko: "실시간 노면 온도 모니터링 앱",
    en: "Real-time Road Surface Temperature Monitoring App",
    ja: "リアルタイム路面温度監視アプリ",
    zh: "实时路面温度监测应用",
  },

  // Status
  safe: { ko: "안전", en: "Safe", ja: "安全", zh: "安全" },
  caution: { ko: "주의", en: "Caution", ja: "注意", zh: "注意" },
  danger: { ko: "위험", en: "Danger", ja: "危険", zh: "危险" },

  // Connection Status
  connected: { ko: "연결됨", en: "Connected", ja: "接続済み", zh: "已连接" },
  disconnected: { ko: "연결 끊김", en: "Disconnected", ja: "切断", zh: "已断开" },
  connecting: { ko: "연결 중", en: "Connecting", ja: "接続中", zh: "连接中" },
  secondsAgo: { ko: "초 전", en: "s ago", ja: "秒前", zh: "秒前" },
  minutesAgo: { ko: "분 전", en: "m ago", ja: "分前", zh: "分钟前" },

  // Measurements
  asphaltTemp: { ko: "노면 온도", en: "Surface Temp", ja: "路面温度", zh: "路面温度" },
  solarRadiation: { ko: "일사량", en: "Solar Radiation", ja: "日射量", zh: "太阳辐射" },
  humidity: { ko: "습도", en: "Humidity", ja: "湿度", zh: "湿度" },
  airTemp: { ko: "기온", en: "Air Temp", ja: "気温", zh: "气温" },
  wind: { ko: "바람", en: "Wind", ja: "風", zh: "风" },
  northeast: { ko: "북동풍", en: "Northeast", ja: "北東風", zh: "东北风" },

  // Messages
  safeMessage: {
    ko: "산책하기에 최적의 노면 온도입니다!",
    en: "The pavement temperature is perfect for walking!",
    ja: "散歩に最適な路面温度です！",
    zh: "路面温度适合散步！",
  },
  cautionMessage: {
    ko: "짧은 산책을 추천합니다",
    en: "Short walks are recommended",
    ja: "短時間の散歩を推奨します",
    zh: "推荐短时间散步",
  },
  dangerMessage: {
    ko: "여기서는 산책을 피해주세요!",
    en: "Please avoid walking here!",
    ja: "ここでの散歩は避けてください！",
    zh: "请避免在此散步！",
  },

  // Detail page
  detailInfo: { ko: "상세 정보", en: "Detail", ja: "詳細", zh: "详细" },
  hourlyForecast: { ko: "24시간 예보", en: "24-Hour Forecast", ja: "24時間予報", zh: "24小时预报" },
  safetyZones: { ko: "안전 구간", en: "Safety Zones", ja: "安全区域", zh: "安全区域" },
  normalWalk: { ko: "정상 산책 가능", en: "Normal walking allowed", ja: "通常の散歩可能", zh: "可正常散步" },
  shortWalk: { ko: "짧은 산책 권장", en: "Short walks recommended", ja: "短時間散歩推奨", zh: "建议短时间散步" },
  noWalk: { ko: "산책 금지", en: "No walking", ja: "散歩禁止", zh: "禁止散步" },
  fromOneHour: { ko: "1시간 전 대비", en: "from 1h ago", ja: "1時間前から", zh: "与1小时前相比" },
  sevenSecondTestTitle: {
    ko: "팁: 7초 테스트",
    en: "Tip: The 7-Second Test",
    ja: "豆知識：7秒テスト",
    zh: "小知识：7秒测试",
  },
  sevenSecondTestDesc: {
    ko: "손등을 아스팔트에 대고 7초 동안 견딜 수 없다면 강아지가 산책하기에는 너무 뜨겁습니다.",
    en: "Place the back of your hand on the pavement. If you can't hold it for 7 seconds, it's too hot for your dog's paws.",
    ja: "手の甲をアスファルトに当てて、7秒間耐えられない熱さなら、わんちゃんの散歩には熱すぎます。",
    zh: "将手背放在沥青上，如果无法坚持7秒，说明对于狗狗散步来说太烫了。",
  },

  // History page
  walkReport: { ko: "산책 리포트", en: "Walk Report", ja: "散歩レポート", zh: "步行报告" },
  noWalksFound: {
    ko: "산책 기록이 없습니다.",
    en: "No walk records found.",
    ja: "散歩の記録がありません。",
    zh: "未找到步行记录。",
  },
  startNewWalk: {
    ko: "홈 화면에서 새 산책을 시작하세요!",
    en: "Start a new walk from the home screen!",
    ja: "ホーム画面から新しい散歩を始めましょう！",
    zh: "请从主屏幕开始新的步行！",
  },
  totalDuration: { ko: "총 산책 시간", en: "Total Duration", ja: "合計時間", zh: "总时长" },
  safeTime: { ko: "안전", en: "Safe", ja: "安全", zh: "安全" },
  cautionTime: { ko: "주의", en: "Caution", ja: "注意", zh: "注意" },
  dangerTime: { ko: "위험", en: "Danger", ja: "危険", zh: "危险" },
  backToHome: { ko: "홈으로 돌아가기", en: "Back to Home", ja: "ホームに戻る", zh: "返回首页" },
  walkMemo: { ko: "산책 메모", en: "Walk Memo", ja: "散歩メモ", zh: "散步笔记" },
  edit: { ko: "편집", en: "Edit", ja: "編集する", zh: "编辑" },
  memoPlaceholder: {
    ko: "오늘 산책은 어땠나요? 기록을 남겨보세요...",
    en: "How was today's walk? Leave a note...",
    ja: "今日の散歩の様子や気づいたことを記録しましょう...",
    zh: "今天的散步怎么样？记录一下吧...",
  },
  save: { ko: "저장", en: "Save", ja: "保存", zh: "保存" },
  cancel: { ko: "취소", en: "Cancel", ja: "キャンセル", zh: "取消" },
  noMemoYet: {
    ko: "메모가 아직 없습니다. '편집' 버튼을 눌러 추가할 수 있습니다.",
    en: "No memo yet. You can add one by clicking the 'Edit' button.",
    ja: "メモはまだありません。「編集する」ボタンから追加できます。",
    zh: "还没有笔记。可以点击编辑按钮添加。",
  },
  hours: { ko: "시간", en: "h", ja: "時間", zh: "小时" },
  minutes: { ko: "분", en: "m", ja: "分", zh: "分钟" },
  seconds: { ko: "초", en: "s", ja: "秒", zh: "秒" },

  // Settings page
  dangerTempAlert: { ko: "위험 온도 알림", en: "Danger Temperature Alert", ja: "危険温度アラート", zh: "危险温度警报" },
  dangerTempDesc: {
    ko: "노면 온도가 {temp} 이상일 때 알림",
    en: "Alert when road surface temp is above {temp}",
    ja: "路面温度が{temp}を超えた場合にアラート",
    zh: "路면温度超过{temp}时提醒",
  },
  walkTimeAlert: {
    ko: "지속적인 고온 알림",
    en: "Sustained Heat Alert",
    ja: "継続する高温アラート",
    zh: "持续高温警报",
  },
  walkTimeDesc: {
    ko: "노면 온도가 {temp} 이상일 때 5분간 지속되면 알림",
    en: "Alert if surface temperature stays above {temp} for 5 minutes",
    ja: "路面温度が{temp}以上の状態が5分間続くとアラート",
    zh: "路面温度持续高于{temp}达5分钟时提醒",
  },
  celsius: { ko: "섭씨 (°C)", en: "Celsius (°C)", ja: "摂氏 (°C)", zh: "摄氏 (°C)" },
  fahrenheit: { ko: "화씨 (°F)", en: "Fahrenheit (°F)", ja: "華氏 (°F)", zh: "华氏 (°F)" },
  language: { ko: "언어", en: "Language", ja: "言語", zh: "语言" },
  notifications: { ko: "알림", en: "Notifications", ja: "通知", zh: "通知" },
  units: { ko: "단위", en: "Units", ja: "単位", zh: "单位" },

  // Info page
  appIntro: { ko: "앱 소개", en: "About the App", ja: "アプリ紹介", zh: "应用介绍" },
  appDescription: {
    ko: "Dog Walk Safety는 실시간으로 노면 온도를 모니터링하여 반려동물이 안전하게 산책할 수 있도록 돕는 앱입니다. 폭염으로부터 소중한 반려동물을 보호하고, 안심하고 산책할 수 있는 환경을 제공합니다.",
    en: "Dog Walk Safety is an app that monitors real-time road surface temperature to ensure safe walks for your pets. It protects your beloved pets from extreme heat and provides a safe, comfortable walking environment.",
    ja: "Dog Walk Safetyは、リアルタイムで路面温度をモニタリングし、ペットの安全な散歩をサポートするアプリです。猛暑から大切なペットを守り、安心してお散歩できる環境を提供します。",
    zh: "Dog Walk Safety是一款应用，通过实时监测路面温度，帮助宠物安全地散步。它帮助您保护心爱的宠物免受酷热伤害，并提供安全舒适的散步环境。",
  },
  safetyRules: { ko: "안전을 위해", en: "For Safety", ja: "安全のために", zh: "为了安全" },
  tempGuide: { ko: "온도별 가이드", en: "Temperature Guide", ja: "温度別ガイド", zh: "温度指南" },
  safeDesc: {
    ko: "적절한 노면 온도입니다. 충분한 물을 준비하고 즐거운 산책 시간을 보내세요!",
    en: "The road surface temperature is ideal. Prepare plenty of water and enjoy your walk!",
    ja: "適切な路面温度です。十分な水分を用意し、楽しい散歩時間をお過ごしください！",
    zh: "路面温度适宜。请准备充足的饮用水，享受愉快的散步时光！",
  },
  cautionDesc: {
    ko: "단시간의 산책(15-20분)을 권장합니다. 그늘이나 잔디길 등을 이용해 주시기 바랍니다.",
    en: "Short walks (15-20 minutes) are recommended. Use shaded areas and grassy paths.",
    ja: "短時間の散歩（15-20分）を推奨します。日陰や芝生の道を利用してください。",
    zh: "建议进行短时间散步（15-20分钟）。请选择阴凉处或草地。",
  },
  dangerDesc: {
    ko: "그 도로 표면에서의 산책은 피하는 것이 좋습니다. 반려동물의 발바닥이 화상을 입을 위험이 있습니다.",
    en: "Avoid walking on that pavement. There is a risk of burns to your pet's paw pads.",
    ja: "その路面の散歩は避けましょう。肉球のやけどの恐れがあります。",
    zh: "建议避免在该道路表面行走。宠物肉垫有被烫伤的风险。",
  },
  emergencyResponse: { ko: "응급상황 대처법", en: "Emergency Response", ja: "緊急時対応", zh: "紧急情况处理" },
  heatStrokeSymptoms: { ko: "열중증 증상", en: "Heat Stroke Symptoms", ja: "熱中症症状", zh: "中暑症状" },
  heatStrokeDesc: {
    ko: "과호흡, 침 흘림, 구토, 의식 저하 또는 상실",
    en: "Heavy panting, drooling, vomiting, loss of consciousness",
    ja: "激しい呼吸やよだれ、嘔吐、意識喪失",
    zh: "过度呼吸、流涎、呕吐、意识丧失",
  },
  firstAid: { ko: "응급처치", en: "First Aid", ja: "応急処置", zh: "急救" },
  firstAidDesc: {
    ko: "즉시 그늘로 이동하고, 찬물로 몸을 적신 후, 수의사에게 연락하세요",
    en: "Move to shade immediately, wet body with cold water, contact veterinarian",
    ja: "すぐに日陰に移動し、冷水で体を濡らし、獣医師に連絡してください",
    zh: "立即移到阴凉处，用冷水浇湿身体，联系兽医",
  },
  contact: { ko: "문의하기", en: "Contact Us", ja: "お問い合わせ", zh: "联系我们" },

  // Recommendations
  recommendations: { ko: "산책 조언", en: "Walking Advice", ja: "散歩のアドバイス", zh: "散步建议" },
  viewDetails: { ko: "자세히 보기", en: "View Details", ja: "詳細を見る", zh: "查看详情" },

  // Common
  lastUpdated: { ko: "마지막 업데이트", en: "Last Updated", ja: "最終更新", zh: "最后更新" },
  loading: { ko: "로딩 중...", en: "Loading...", ja: "読み込み中...", zh: "加载中..." },

  // Walk Timer
  walkTime: { ko: "산책 시간", en: "Walk Time", ja: "散歩時間", zh: "散步时间" },
  startWalk: { ko: "산책 시작", en: "Start Walk", ja: "散歩を開始", zh: "开始散步" },
  end: { ko: "종료", en: "End", ja: "終了", zh: "结束" },
  confirmEndWalk: {
    ko: "정말로 종료하시겠습니까?",
    en: "Are you sure you want to end?",
    ja: "本当に終了しますか？",
    zh: "您确定要结束吗？",
  },
  confirmStartWalk: { // 👈 これを追加
    ko: "산책을 시작하시겠습니까?",
    en: "Are you sure you want to start?",
    ja: "本当に開始しますか？",
    zh: "您确定要开始吗？",
  },
  yes: { ko: "예", en: "Yes", ja: "はい", zh: "是" },
  no: { ko: "아니요", en: "No", ja: "いいえ", zh: "否" },

  // 新しいキーを追加
  walkAdvice1: { ko: "자주 수분을 보충하세요", en: "Stay hydrated frequently", ja: "こまめに水分補給をしましょう", zh: "经常补充水分" },
  walkAdvice2: { ko: "편안하게 산책을 즐겨보세요", en: "Enjoy a leisurely walk", ja: "ゆったり散歩を楽しみましょう", zh: "享受悠闲的散步" },
  walkAdvice3: { ko: "공원을 활용합시다", en: "Utilize parks", ja: "公園を活用しましょう", zh: "利用公园" },
  cautionAdvice1: { ko: "그늘이나 잔디밭에서 산책해 보세요", en: "Walk in the shade or on grass", ja: "日陰や芝生で散歩しましょう", zh: "在阴凉处或草地上散步" },
  cautionAdvice2: { ko: "산책은 15~20분 이내에 하세요", en: "Limit walks to 15-20 minutes", ja: "散歩は15〜20分以内にしましょう", zh: "散步时间控制在15-20分钟以内" },
  cautionAdvice3: { ko: "발바닥을 보호하기 위해 신발이나 크림을 사용하세요", en: "Use paw protectors or balm", ja: "肉球を守るための靴やバームを使いましょう", zh: "使用保护脚垫的鞋或润肤膏" },
  dangerAdvice1: { ko: "즉시 시원한 곳으로 이동합시다", en: "Move to a cool place immediately", ja: "すぐに涼しい場所へ移動しましょう", zh: "立即移到阴凉处" },
  dangerAdvice2: { ko: "도로 표면 온도가 높아 산책하기에 적합하지 않습니다", en: "Pavement is too hot for walking", ja: "路面温度が高く、散歩に適していません", zh: "路面温度过高，不适合散步" },
  dangerAdvice3: { ko: "화상의 위험이 있습니다", en: "Risk of burns", ja: "火傷の恐れがあります", zh: "有烫伤的风险" },
}

export const useTranslation = (language: "ko" | "en" | "ja" | "zh") => {
  return (key: string) => translations[key]?.[language] || key
}