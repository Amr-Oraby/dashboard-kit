import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, Circle, ArrowUpRight, Share2, MoreVertical, Pin, Edit3, Trash2, Bell, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const weeklyData = [
  { name: 'M', sport: 40, study: 24 }, { name: 'T', sport: 30, study: 13 },
  { name: 'W', sport: 20, study: 48 }, { name: 'T', sport: 27, study: 39 },
  { name: 'F', sport: 18, study: 48 }, { name: 'S', sport: 23, study: 38 },
  { name: 'S', sport: 34, study: 43 },
];

const pieData = [
  { name: 'Sport', value: 400, color: '#111' },
  { name: 'Study', value: 300, color: '#666' },
  { name: 'Project', value: 300, color: '#ccc' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="col-span-1">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">{t('overall_info')}</h3>
              <div className="flex gap-2 text-white/50">
                <Share2 className="w-5 h-5 cursor-pointer hover:text-white" />
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
              </div>
            </div>
            <div className="flex gap-6 items-end mb-8">
              <div>
                <div className="text-5xl font-bold mb-1">43</div>
                <div className="text-sm text-white/60 leading-tight">{t('tasks_done')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-sm text-white/60 leading-tight">{t('projects_stopped')}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t('projects'), val: '28', icon: <Circle className="w-4 h-4" /> },
                { label: t('in_progress'), val: '14', icon: <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent" /> },
                { label: t('completed'), val: '11', icon: <CheckCircle2 className="w-4 h-4" /> },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors">
                  <div className="text-white/60 mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold mb-1">{item.val}</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="h-full bg-white/80 border-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{t('weekly_progress')}</h3>
              <div className="p-2 bg-secondary rounded-full cursor-pointer hover:bg-gray-200">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Sport</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> Study</div>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <Line type="monotone" dataKey="sport" stroke="#111" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="study" stroke="#999" strokeWidth={3} dot={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="h-full bg-white/80 border-white">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{t('month_progress')}</h3>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-green-600 font-medium mb-6">{t('compared_to_last_month')}</p>
            <div className="flex-1 flex items-center justify-between mb-6">
              <div className="space-y-3 text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Sport</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#666]" /> Study</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ccc]" /> Project</div>
              </div>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={35} outerRadius={45} paddingAngle={2} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">120%</span>
                  <span className="text-[10px] text-muted-foreground">overdone</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex-1 rounded-full border border-input flex items-center justify-center gap-2 text-sm font-medium hover:bg-secondary transition-colors">
                {t('download_report')}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="h-full bg-white/80 border-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{t('month_goals')}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">1/4</span>
                <Edit3 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Read 2 books', checked: true },
                { label: 'Sports every day', checked: false },
                { label: 'Complete the course', checked: false },
                { label: 'Bend down with a parachute', checked: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${item.checked ? 'bg-primary border-primary' : 'border-input bg-white group-hover:border-primary'}`}>
                    {item.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${item.checked ? 'font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('task_in_process')} (2)</h3>
          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            {t('open_archive')} <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Card className="bg-white border-none shadow-sm relative rounded-3xl group cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-2xl border border-input flex items-center justify-center text-lg bg-secondary">🎁</div>
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </div>
              <h4 className="font-semibold leading-tight mb-auto text-base">Buy Susan a gift<br/>for Bitherday</h4>
              <div className="flex justify-between items-end mt-4">
                <span className="text-xs text-muted-foreground font-medium">Today</span>
                <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Bell className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm relative rounded-3xl group cursor-pointer hover:shadow-md transition-shadow">
            <div className="absolute -top-12 right-0 bg-primary text-primary-foreground text-xs rounded-xl p-2 shadow-xl z-10 w-28 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="flex items-center justify-between p-1.5 hover:bg-white/10 rounded-md">Pin Note <Pin className="w-3 h-3"/></div>
               <div className="flex items-center justify-between p-1.5 hover:bg-white/10 rounded-md">Edit <Edit3 className="w-3 h-3"/></div>
               <div className="flex items-center justify-between p-1.5 hover:bg-white/10 rounded-md text-red-400">Delete <Trash2 className="w-3 h-3"/></div>
            </div>
            <CardContent className="p-5 flex flex-col h-full min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-2xl border border-input flex items-center justify-center text-lg bg-secondary">⚕️</div>
                <MoreVertical className="w-4 h-4 text-foreground" />
              </div>
              <h4 className="font-semibold leading-tight mb-auto text-base">Doctor's<br/>appointment on<br/>Tuesday</h4>
              <div className="flex justify-between items-end mt-4">
                <span className="text-xs text-muted-foreground font-medium">02.09.2023</span>
                <div className="w-10 h-10 rounded-2xl bg-white border border-input flex items-center justify-center text-muted-foreground group-hover:bg-secondary transition-colors">
                  <Bell className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <button className="h-full min-h-[180px] rounded-3xl border-2 border-dashed border-input bg-white/50 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:bg-white/80 hover:text-foreground transition-all hover:border-solid hover:border-gray-300">
            <Plus className="w-6 h-6" /> 
            <span className="font-medium">{t('add_task')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
