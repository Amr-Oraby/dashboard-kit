import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Messages() {
  const { t } = useTranslation();
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">{t('messages')}</h2>
      <div className="flex items-center justify-center h-[60vh] bg-white/50 rounded-3xl border border-white border-dashed text-muted-foreground">
        {t('messages')} Chat UI Placeholder
      </div>
    </div>
  );
}
