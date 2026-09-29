import React from 'react';
import { Search, Bell, Plus, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { currentUser } from '@/data/mock';

export function Header() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLang = () => {
    const currentLang = lang || 'en';
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    
    // Replace the language segment in the pathname
    const newPath = location.pathname.replace(new RegExp(`^/${currentLang}`), `/${nextLang}`);
    
    i18n.changeLanguage(nextLang);
    navigate(newPath + location.search);
  };

  return (
    <header className="h-24 px-8 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('hi', { name: currentUser.name })}</h1>
        <p className="text-sm text-muted-foreground">{t('overview_desc')}</p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleLang} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors shadow-sm">
          <Globe className="w-4 h-4" /> {i18n.language === 'en' ? 'AR' : 'EN'}
        </button>

        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> {t('create')}
        </button>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-muted-foreground hover:text-foreground transition-colors border border-white/60">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-muted-foreground hover:text-foreground transition-colors border border-white/60 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
          </button>
        </div>

        <div className="px-2 border-l border-white/60">
          <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}
