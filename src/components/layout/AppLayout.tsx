import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export default function AppLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className="h-screen w-screen flex overflow-hidden app-container !rounded-none !border-none" dir={i18n.dir()}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
         <Header />
         <main className="flex-1 overflow-y-auto px-8 pb-8">
            <Outlet />
         </main>
      </div>
    </div>
  );
}
