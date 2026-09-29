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
                  <TableCell>${order.amount}</TableCell>
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
