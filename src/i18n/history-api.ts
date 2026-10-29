import type { Locale } from "./config";

type ApiCopy = { filter: string; all: string; unknown: string; empty: string };

/** Small shared labels for the run-history filter and capture badges. */
export const historyApiCopy: Record<Locale, ApiCopy> = {
  en: { filter: "Graphics API", all: "All", unknown: "API not recorded", empty: "No reports for this graphics API yet." },
  ru: { filter: "Графический API", all: "Все", unknown: "API не указан", empty: "Для этого графического API пока нет отчётов." },
  de: { filter: "Grafik-API", all: "Alle", unknown: "API nicht erfasst", empty: "Noch keine Berichte für diese Grafik-API." },
  es: { filter: "API gráfica", all: "Todos", unknown: "API no registrada", empty: "Aún no hay informes para esta API gráfica." },
  fr: { filter: "API graphique", all: "Tous", unknown: "API non renseignée", empty: "Aucun rapport pour cette API graphique pour le moment." },
  pt: { filter: "API gráfica", all: "Todos", unknown: "API não registrada", empty: "Ainda não há relatórios para esta API gráfica." },
  tr: { filter: "Grafik API’si", all: "Tümü", unknown: "API kaydedilmemiş", empty: "Bu grafik API’si için henüz rapor yok." },
  zh: { filter: "图形 API", all: "全部", unknown: "未记录 API", empty: "此图形 API 暂无报告。" },
  ja: { filter: "グラフィックスAPI", all: "すべて", unknown: "API未記録", empty: "このグラフィックスAPIのレポートはまだありません。" },
  ko: { filter: "그래픽 API", all: "전체", unknown: "API 미기록", empty: "이 그래픽 API의 보고서가 아직 없습니다." },
  hi: { filter: "ग्राफ़िक्स API", all: "सभी", unknown: "API दर्ज नहीं है", empty: "इस ग्राफ़िक्स API के लिए अभी कोई रिपोर्ट नहीं है।" },
  ar: { filter: "واجهة الرسوميات", all: "الكل", unknown: "واجهة غير مسجلة", empty: "لا توجد تقارير لهذه الواجهة الرسومية بعد." },
};
