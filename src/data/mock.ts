import type { Client, Product, Order, User } from '../types';

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
