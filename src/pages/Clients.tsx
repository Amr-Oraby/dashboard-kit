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
