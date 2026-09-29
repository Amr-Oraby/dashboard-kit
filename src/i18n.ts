import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      clients: "Clients",
      products: "Products",
      orders: "Orders",
      analytics: "Analytics",
      messages: "Messages",
      settings: "Settings",
      integrations: "Integrations",
      create: "Create",
      hi: "Hi, {{name}}!",
      overview_desc: "Here is your dashboard overview.",
      overall_info: "Overall Information",
      tasks_done: "Tasks done for all time",
      projects_stopped: "projects are stopped",
      projects: "Projects",
      in_progress: "In Progress",
      completed: "Completed",
      weekly_progress: "Weekly progress",
      month_progress: "Month progress",
      month_goals: "Month goals:",
      task_in_process: "Task In process",
      add_task: "Add task",
      open_archive: "Open archive",
      download_report: "Download Report",
      compared_to_last_month: "+20% compared to last month*"
    }
  },
  ar: {
    translation: {
      dashboard: "لوحة القيادة",
      clients: "العملاء",
      products: "المنتجات",
      orders: "الطلبات",
      analytics: "التحليلات",
      messages: "الرسائل",
      settings: "الإعدادات",
      integrations: "عمليات الدمج",
      create: "إنشاء",
      hi: "مرحباً، {{name}}!",
      overview_desc: "إليك نظرة عامة على لوحة القيادة.",
      overall_info: "معلومات عامة",
      tasks_done: "المهام المنجزة في كل الأوقات",
      projects_stopped: "مشاريع متوقفة",
      projects: "مشاريع",
      in_progress: "قيد التنفيذ",
      completed: "مكتمل",
      weekly_progress: "التقدم الأسبوعي",
      month_progress: "تقدم الشهر",
      month_goals: "أهداف الشهر:",
      task_in_process: "المهام قيد المعالجة",
      add_task: "إضافة مهمة",
      open_archive: "افتح الأرشيف",
      download_report: "تحميل التقرير",
      compared_to_last_month: "+20٪ مقارنة بالشهر الماضي*"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
