const fs = require('fs');
const path = require('path');

const files = {
  'src/components/ui/table.tsx': `
import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b border-border/50", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
))
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
`,

  'src/pages/Clients.tsx': `
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockClients } from '@/data/mock';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function Clients() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search clients..." className="pl-9 pr-4 py-2 rounded-full border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/90">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      <Card className="flex-1 bg-white/80 border-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'Active' ? 'success' : client.status === 'Pending' ? 'warning' : 'secondary'}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.created}</TableCell>
                  <TableCell className="text-right">
                    <button className="p-2 hover:bg-secondary rounded-full">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
`,

  'src/pages/Products.tsx': `
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockProducts } from '@/data/mock';
import { Badge } from '@/components/ui/badge';

export default function Products() {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map(product => (
          <Card key={product.id} className="bg-white/80 border-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-full h-32 bg-secondary rounded-2xl mb-4 flex items-center justify-center text-muted-foreground text-sm">
                Image Placeholder
              </div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">\${product.price}</span>
                <Badge variant={product.status === 'In Stock' ? 'success' : product.status === 'Low Stock' ? 'warning' : 'destructive'}>
                  {product.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
`,

  'src/pages/Orders.tsx': `
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mock';

export default function Orders() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <Card className="flex-1 bg-white/80 border-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>\${order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={order.paymentStatus === 'Paid' ? 'success' : 'secondary'}>{order.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'destructive' : 'warning'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
`,

  'src/pages/Analytics.tsx': `
import React from 'react';

export default function Analytics() {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <div className="flex items-center justify-center h-[60vh] bg-white/50 rounded-3xl border border-white border-dashed text-muted-foreground">
        Analytics Page Placeholder
      </div>
    </div>
  );
}
`,

  'src/pages/Messages.tsx': `
import React from 'react';

export default function Messages() {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="flex items-center justify-center h-[60vh] bg-white/50 rounded-3xl border border-white border-dashed text-muted-foreground">
        Messages Chat UI Placeholder
      </div>
    </div>
  );
}
`,

  'src/pages/Settings.tsx': `
import React from 'react';

export default function Settings() {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="flex items-center justify-center h-[60vh] bg-white/50 rounded-3xl border border-white border-dashed text-muted-foreground">
        Settings Page Placeholder
      </div>
    </div>
  );
}
`,

  'src/App.tsx': `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`,

  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content.trim() + '\\n');
}
console.log("Scaffold 2 complete");
