// translations.ts
import { Language, Translations } from './types';

export const translations: Translations = {
  safe: { ko: "안전", en: "Safe", ja: "安全", zh: "安全" },
  caution: { ko: "주의", en: "Caution", ja: "注意", zh: "注意" },
  danger: { ko: "위험", en: "Danger", ja: "危険", zh: "危险" },
  safeMessage: { ko: "산책하기 좋은 노면 온도입니다!", en: "The pavement temperature is perfect for walking!", ja: "散歩に最適な路面温度です！", zh: "路面温度适合散步！" },
  cautionMessage: { ko: "짧은 산책을 권장합니다", en: "Short walks are recommended", ja: "短時間の散歩を推奨します", zh: "推荐短时间散步" },
  dangerMessage: { ko: "여기서의 산책은 피하세요!", en: "Please avoid walking here!", ja: "ここでの散歩は避けてください！", zh: "请避免在此散步！" },
  asphaltTemp: { ko: "노면 온도", en: "Surface Temp", ja: "路面温度", zh: "路面温度" },
  startWalk: { ko: "산책 시작", en: "Start Walk", ja: "散歩を開始", zh: "开始散步" },
  recommendations: { ko: "산책 조언", en: "Walking Advice", ja: "散歩のアドバイス", zh: "散步建议" },
  viewDetails: { ko: "상세보기", en: "View Details", ja: "詳細を見る", zh: "查看详情" },
  lastUpdated: { ko: "마지막 업데이트", en: "Last Updated", ja: "最終更新", zh: "最后更新" },
  safeRecommendations: {
    ja: ["こまめに水分補給をしましょう", "ゆったり散歩を楽しみましょう", "公園を活用しましょう"],
    en: ["Stay hydrated with frequent water breaks", "Enjoy a relaxed walk", "Take advantage of parks"],
    ko: ["자주 물을 마시게 해주세요", "여유롭게 산책을 즐기세요", "공원을 적극 활용하세요"],
    zh: ["及时补充水分", "轻松地享受散步吧", "多利用公园"],
  },
  cautionRecommendations: {
    ja: ["日陰や芝生で散歩しましょう", "散歩は15〜20分以内にしましょう", "肉球を守るための靴やバームを使いましょう"],
    en: ["Walk in shaded areas or on grass", "Keep walks to 15-20 minutes", "Use boots or paw balm to protect your dog's paws"],
    ko: ["그늘이나 잔디밭에서 산책하세요", "산책은 15~20분 이내로 하세요", "강아지 발을 보호하는 신발이나 발 패드 전용 밤을 사용하세요"],
    zh: ["在阴凉处或草地散步", "散步时间控制在15-20分钟内", "使用鞋子或护掌膏保护狗狗的脚掌"],
  },
  dangerRecommendations: {
    ja: ["すぐに涼しい場所へ移動しましょう", "路面温度が高く、散歩に適していません", "火傷の恐れがあります"],
    en: ["Move to a cool place immediately", "Pavement temperature is too high for walking", "There is a risk of burns"],
    ko: ["바로 시원한 곳으로 이동하세요", "노면 온도가 높아 산책하기 적합하지 않습니다", "화상의 위험이 있습니다"],
    zh: ["立即移到凉爽的地方", "路面温度过高，不适合散步", "有烫伤风险"],
  },
  notifications: { ko: "알림", en: "Notifications", ja: "通知", zh: "通知" },
  dangerTempAlert: { ko: "위험 온도 알림", en: "Danger Temperature Alert", ja: "危険温度アラート", zh: "危险温度警报" },
  units: { ko: "단위", en: "Units", ja: "単位", zh: "单位" },
  celsius: { ko: "섭씨 (°C)", en: "Celsius (°C)", ja: "摂氏 (°C)", zh: "摄氏温度 (°C)" },
  fahrenheit: { ko: "화씨 (°F)", en: "Fahrenheit (°F)", ja: "華氏 (°F)", zh: "华氏温度 (°F)" },
  language: { ko: "언어", en: "Language", ja: "言語", zh: "语言" },
  dashboard: { ko: "대시보드", en: "Dashboard", ja: "ダッシュボード", zh: "仪表板" },
  detail: { ko: "상세정보", en: "Details", ja: "詳細", zh: "详情" },
  history: { ko: "기록", en: "History", ja: "履歴", zh: "历史" },
  settings: { ko: "설정", en: "Settings", ja: "設定", zh: "设置" },
  info: { ko: "정보", en: "Info", ja: "情報", zh: "信息" },
  dogWalkSafety: { ko: "강아지 산책 안전", en: "Dog Walk Safety", ja: "犬の散歩安全", zh: "狗狗散步安全" },
  detailInfo: { ko: "상세 정보", en: "Detail Information", ja: "詳細情報", zh: "详细信息" },
  airTemp: { ko: "기온", en: "Air Temperature", ja: "気温", zh: "气温" },
  humidity: { ko: "습도", en: "Humidity", ja: "湿度", zh: "湿度" },
  sevenSecondTestTitle: { ko: "팁: 7초 테스트", en: "Tip: 7-Second Test", ja: "豆知識：7秒テスト", zh: "提示：7秒测试" },
  sevenSecondTestDesc: { 
    ko: "손등을 아스팔트에 대고 7초간 견딜 수 없는 뜨거움이면, 강아지 산책하기에는 너무 뜨겁습니다.", 
    en: "If you cannot hold the back of your hand against the asphalt for 7 seconds, it's too hot for your dog to walk on.", 
    ja: "手の甲をアスファルトに当てて、7秒間耐えられない熱さなら、わんちゃんの散歩には熱すぎます。", 
    zh: "如果您无法将手背放在沥青上持续7秒，那么对您的狗狗来说太热了，不适合散步。" 
  },
  
  // 기록 페이지
  noWalksFound: { ko: "산책 기록이 없습니다.", en: "No walk records found.", ja: "散歩の記録がありません。", zh: "没有散步记录。" },
  startNewWalk: { ko: "홈 화면에서 새로운 산책을 시작하세요!", en: "Start a new walk from the home screen!", ja: "ホーム画面から新しい散歩を始めましょう！", zh: "从主屏幕开始新的散步！" },
  backToHome: { ko: "홈으로 이동", en: "Go to Home", ja: "ホームに戻る", zh: "返回首页" },
  totalDuration: { ko: "총 시간", en: "Total Duration", ja: "合計時間", zh: "总时间" },
  safeTime: { ko: "안전", en: "Safe", ja: "安全", zh: "安全" },
  cautionTime: { ko: "주의", en: "Caution", ja: "注意", zh: "注意" },
  dangerTime: { ko: "위험", en: "Danger", ja: "危険", zh: "危险" },
  walkMemo: { ko: "산책 메모", en: "Walk Memo", ja: "散歩メモ", zh: "散步备忘录" },
  edit: { ko: "수정", en: "Edit", ja: "編集する", zh: "编辑" },
  noMemoYet: { 
    ko: "아직 메모가 없습니다. '수정' 버튼에서 추가할 수 있습니다.", 
    en: "No memo yet. You can add one by pressing the 'Edit' button.", 
    ja: "メモはまだありません。「編集する」ボタンから追加できます。", 
    zh: "还没有备忘录。您可以通过按“编辑”按钮添加。" 
  },
  
  // 정보 페이지
  appIntro: { ko: "앱 소개", en: "App Introduction", ja: "アプリ紹介", zh: "应用介绍" },
  appDescription: { 
    ko: "Dog Walk Safety는 실시간으로 노면 온도를 모니터링하고 반려동물의 안전한 산책을 지원하는 앱입니다. 폭염으로부터 소중한 반려동물을 보호하고 안심하고 산책할 수 있는 환경을 제공합니다.", 
    en: "Dog Walk Safety is an app that monitors pavement temperature in real time and supports safe walks for your pets. It protects your precious pets from extreme heat and provides an environment for worry-free walks.", 
    ja: "Dog Walk Safetyは、リアルタイムで路面温度をモニタリングし、ペットの安全な散歩をサポートするアプリです。猛暑から大切なペットを守り、安心してお散歩できる環境を提供します。", 
    zh: "Dog Walk Safety 是一款实时监测路面温度并支持宠物安全散步的应用程序。它保护您珍贵的宠物免受酷热，并提供无忧无虑的散步环境。" 
  },
  safetyRules: { ko: "안전 수칙", en: "Safety Rules", ja: "安全のために", zh: "安全规则" },
  tempGuide: { ko: "온도별 가이드", en: "Temperature Guide", ja: "温度別ガイド", zh: "温度指南" },
  
  // 설정 페이지
  dangerTempDesc: { 
    ko: "노면 온도가 35°C를 초과할 경우 알림", 
    en: "Alert when pavement temperature exceeds 35°C", 
    ja: "路面温度が35°Cを超えた場合にアラート", 
    zh: "当路面温度超过35°C时发出警报" 
  },
  walkTimeAlert: { ko: "지속 고온 알림", en: "Continuous High Temperature Alert", ja: "継続する高温アラート", zh: "持续高温警报" },
  walkTimeDesc: { 
    ko: "노면 온도가 30°C 이상인 상태가 5분간 지속되면 알림", 
    en: "Alert when pavement temperature remains above 30°C for 5 minutes", 
    ja: "路面温度が30°C以上の状態が5分間続くとアラート", 
    zh: "当路面温度持续5分钟超过30°C时发出警报" 
  },
  safetyRulesContent: {
    ko: "• 한낮의 뜨거운 시간대(오전 10시~오후 4시)에는 산책을 피하세요\n• 그늘진 길이나 잔디를 이용하세요\n• 강아지 발바닥을 자주 확인하세요\n• 항상 신선한 물을 준비하세요",
    en: "• Avoid walks during the hottest hours of the day (10am-4pm)\n• Use shaded paths or grass\n• Check your dog's paws frequently\n• Always have fresh water available",
    ja: "• 一日の中で最も暑い時間帯（午前10時～午後4時）の散歩は避けましょう\n• 日陰の道や芝生を利用しましょう\n• 犬の肉球を頻繁に確認しましょう\n• 常に新鮮な水を準備しましょう",
    zh: "• 避免在一天中最热的时间（上午10点至下午4点）散步\n• 使用阴凉的小路或草地\n• 经常检查狗狗的爪子\n• 始终准备新鲜的水"
  },
  
  tempGuideContent: {
    ko: "• 25°C 이하: 안전 - 장시간 산책 가능\n• 25°C ~ 35°C: 주의 - 짧은 산책 권장\n• 35°C 이상: 위험 - 산책 피해야 함",
    en: "• Below 25°C: Safe - Long walks possible\n• 25°C ~ 35°C: Caution - Short walks recommended\n• Above 35°C: Danger - Avoid walking",
    ja: "• 25°C以下: 安全 - 長時間の散歩が可能\n• 25°C～35°C: 注意 - 短時間の散歩を推奨\n• 35°C以上: 危険 - 散歩は避けるべき",
    zh: "• 低于25°C：安全 - 可以进行长时间散步\n• 25°C ~ 35°C：注意 - 建议短时间散步\n• 高于35°C：危险 - 应避免散步"
  },
  stopWalk: { ko: "산책 정지", en: "Stop Walk", ja: "散歩を停止", zh: "停止散步" },
    
  // 기록 페이지 추가 번역
  walkHistory: { ko: "산책 기록", en: "Walk History", ja: "散歩の記録", zh: "散步记录" },
  date: { ko: "날짜", en: "Date", ja: "日付", zh: "日期" },
  duration: { ko: "시간", en: "Duration", ja: "時間", zh: "时间" },
  temperature: { ko: "온도", en: "Temperature", ja: "温度", zh: "温度" },
  status: { ko: "상태", en: "Status", ja: "状態", zh: "状态" },
  
  // 상세보기 모달 관련 번역
  walkDetails: { ko: "산책 상세정보", en: "Walk Details", ja: "散歩の詳細", zh: "散步详情" },
  startTime: { ko: "시작 시간", en: "Start Time", ja: "開始時間", zh: "开始时间" },
  endTime: { ko: "종료 시간", en: "End Time", ja: "終了時間", zh: "结束时间" },
  totalTime: { ko: "총 시간", en: "Total Time", ja: "合計時間", zh: "总时间" },
  avgTemp: { ko: "평균 온도", en: "Average Temp", ja: "平均温度", zh: "平均温度" },
  maxTemp: { ko: "최고 온도", en: "Max Temp", ja: "最高温度", zh: "最高温度" },
  close: { ko: "닫기", en: "Close", ja: "閉じる", zh: "关闭" },
  
};

export const useTranslation = (language: Language) => (key: string) => {
  const translation = translations[key];
  if (!translation) return key;
  
  // Handle both string and array translations
  if (Array.isArray(translation)) {
    // 배열인 경우 해당 언어의 인덱스를 찾아 반환
    const langIndex = ['ko', 'en', 'ja', 'zh'].indexOf(language);
    return translation[langIndex] || key;
  }
  
  return translation[language] || key;
};