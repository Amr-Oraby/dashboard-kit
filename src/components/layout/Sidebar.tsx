import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, PieChart, MessageSquare, Settings, Hash, Component } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const basePath = `/${lang || 'en'}`;

  const navItems = [
    { label: t('dashboard'), icon: LayoutDashboard, path: basePath },
    { label: t('clients'), icon: Users, path: `${basePath}/clients` },
    { label: t('products'), icon: Package, path: `${basePath}/products` },
    { label: t('orders'), icon: ShoppingCart, path: `${basePath}/orders` },
    { label: t('analytics'), icon: PieChart, path: `${basePath}/analytics` },
    { label: t('messages'), icon: MessageSquare, path: `${basePath}/messages` },
  ];
  return (
    <aside className="w-64 h-full bg-white/50 border-r border-white/60 flex flex-col pt-8 pb-6 px-4">
      <div className="flex items-center gap-2 px-4 mb-10">
        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-sm transform rotate-45" />
        </div>
        <span className="text-xl font-bold">iDraft</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
                isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('integrations')}</p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/60 hover:text-foreground transition-colors">
              <Hash className="w-4 h-4" /> Slack
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/60 hover:text-foreground transition-colors">
              <Component className="w-4 h-4" /> Notion
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/60">
        <NavLink
          to={`${basePath}/settings`}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
            isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" /> {t('settings')}
        </NavLink>
      </div>
    </aside>
  );
}
