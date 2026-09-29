const fs = require('fs');
const path = require('path');

const files = {
  'src/index.css': `@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/geist";

@theme {
  --color-background: #e9eaec;
  --color-foreground: #111111;
  --color-card: #ffffff;
  --color-card-foreground: #111111;
  --color-popover: #ffffff;
  --color-popover-foreground: #111111;
  --color-primary: #1a1a1a;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f4f5f7;
  --color-secondary-foreground: #111111;
  --color-muted: #f4f5f7;
  --color-muted-foreground: #6b7280;
  --color-border: #e5e7eb;
  --color-input: #e5e7eb;
  --color-ring: #111111;
  --radius-xl: 1.5rem;
  --radius-lg: 1rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;
}

body {
  @apply bg-background text-foreground antialiased font-sans;
  background-image: radial-gradient(circle at 50% -20%, #ffffff 0%, transparent 80%);
}

.app-container {
  @apply bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem];
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`,

  'src/types/index.ts': `
export type Role = 'super_admin' | 'admin' | 'manager' | 'support';
export type User = { id: string; name: string; email: string; avatar?: string; role: Role; };
export type Client = { id: string; name: string; email: string; phone: string; company: string; status: 'Active' | 'Inactive' | 'Pending'; created: string; };
export type Product = { id: string; name: string; category: string; price: number; stock: number; status: 'In Stock' | 'Low Stock' | 'Out of Stock'; };
export type Order = { id: string; clientName: string; date: string; amount: number; paymentStatus: 'Paid' | 'Unpaid' | 'Refunded'; status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; };
`,

  'src/data/mock.ts': `
import { Client, Product, Order, User } from '../types';

export const currentUser: User = { id: 'u1', name: 'Dilan', email: 'dilan@example.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=dilan' };

export const mockClients: Client[] = [
  { id: 'c1', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1 555-0100', company: 'Acme', status: 'Active', created: '2023-01-15' },
  { id: 'c2', name: 'Global Tech', email: 'info@globaltech.com', phone: '+1 555-0101', company: 'Global Tech', status: 'Active', created: '2023-02-20' },
  { id: 'c3', name: 'Stark Industries', email: 'hello@stark.com', phone: '+1 555-0102', company: 'Stark Ind.', status: 'Inactive', created: '2023-03-05' },
  { id: 'c4', name: 'Wayne Ent', email: 'contact@wayne.com', phone: '+1 555-0103', company: 'Wayne Ent', status: 'Pending', created: '2023-04-10' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Pro Dashboard', category: 'Software', price: 99, stock: 150, status: 'In Stock' },
  { id: 'p2', name: 'Analytics Plugin', category: 'Plugin', price: 49, stock: 30, status: 'Low Stock' },
  { id: 'p3', name: 'Design System', category: 'Design', price: 199, stock: 0, status: 'Out of Stock' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', clientName: 'Acme Corp', date: '2023-09-01', amount: 1250, paymentStatus: 'Paid', status: 'Delivered' },
  { id: 'ORD-002', clientName: 'Global Tech', date: '2023-09-02', amount: 450, paymentStatus: 'Unpaid', status: 'Pending' },
  { id: 'ORD-003', clientName: 'Stark Industries', date: '2023-09-03', amount: 3200, paymentStatus: 'Paid', status: 'Processing' },
];
`,

  'src/components/ui/card.tsx': `
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-3xl border border-white/40 bg-card text-card-foreground shadow-sm overflow-hidden", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
`,

  'src/components/ui/badge.tsx': `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "text-foreground border border-input",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  }
  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
  )
}
export { Badge }
`,

  'src/components/layout/Sidebar.tsx': `
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, PieChart, MessageSquare, Settings, Slack, Component } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Clients', icon: Users, path: '/clients' },
  { label: 'Products', icon: Package, path: '/products' },
  { label: 'Orders', icon: ShoppingCart, path: '/orders' },
  { label: 'Analytics', icon: PieChart, path: '/analytics' },
  { label: 'Messages', icon: MessageSquare, path: '/messages' },
];

export function Sidebar() {
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
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Integrations</p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/60 hover:text-foreground transition-colors">
              <Slack className="w-4 h-4" /> Slack
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/60 hover:text-foreground transition-colors">
              <Component className="w-4 h-4" /> Notion
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/60">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
            isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" /> Settings
        </NavLink>
      </div>
    </aside>
  );
}
`,

  'src/components/layout/Header.tsx': `
import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { currentUser } from '@/data/mock';

export function Header() {
  return (
    <header className="h-24 px-8 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hi, {currentUser.name}!</h1>
        <p className="text-sm text-muted-foreground">Here is your dashboard overview.</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create
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

        <div className="pl-2 ml-2 border-l border-white/60">
          <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}
`,

  'src/components/layout/AppLayout.tsx': `
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export default function AppLayout() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center">
       <div className="app-container w-full max-w-[1500px] h-[92vh] flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden relative">
             <Header />
             <main className="flex-1 overflow-y-auto px-8 pb-8">
                <Outlet />
             </main>
          </div>
       </div>
    </div>
  );
}
`,

  'src/pages/Dashboard.tsx': `
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, Circle, ArrowUpRight, Share2, MoreVertical, Pin, Edit3, Trash2, Bell, Plus } from 'lucide-react';

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="col-span-1">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">Overall Information</h3>
              <div className="flex gap-2 text-white/50">
                <Share2 className="w-5 h-5 cursor-pointer hover:text-white" />
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
              </div>
            </div>
            <div className="flex gap-6 items-end mb-8">
              <div>
                <div className="text-5xl font-bold mb-1">43</div>
                <div className="text-sm text-white/60 leading-tight">Tasks done<br/>for all time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-sm text-white/60 leading-tight">projects are<br/>stopped</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Projects', val: '28', icon: <Circle className="w-4 h-4" /> },
                { label: 'In Progress', val: '14', icon: <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent" /> },
                { label: 'Completed', val: '11', icon: <CheckCircle2 className="w-4 h-4" /> },
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
              <h3 className="text-lg font-semibold">Weekly progress</h3>
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
              <h3 className="text-lg font-semibold">Month progress</h3>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-green-600 font-medium mb-6">+20% compared to last month*</p>
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
                Download Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="h-full bg-white/80 border-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Month goals:</h3>
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
                  <div className={\`w-5 h-5 rounded-md flex items-center justify-center border transition-colors \${item.checked ? 'bg-primary border-primary' : 'border-input bg-white group-hover:border-primary'}\`}>
                    {item.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={\`text-sm \${item.checked ? 'font-medium' : 'text-muted-foreground group-hover:text-foreground'}\`}>{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Task In process (2)</h3>
          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Open archive <ArrowUpRight className="w-3 h-3" />
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
            <span className="font-medium">Add task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content.trim() + '\\n');
}
console.log("Scaffold 1 complete");
