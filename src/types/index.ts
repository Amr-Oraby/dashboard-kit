export type Role = 'super_admin' | 'admin' | 'manager' | 'support';
export type User = { id: string; name: string; email: string; avatar?: string; role: Role; };
export type Client = { id: string; name: string; email: string; phone: string; company: string; status: 'Active' | 'Inactive' | 'Pending'; created: string; };
export type Product = { id: string; name: string; category: string; price: number; stock: number; status: 'In Stock' | 'Low Stock' | 'Out of Stock'; };
export type Order = { id: string; clientName: string; date: string; amount: number; paymentStatus: 'Paid' | 'Unpaid' | 'Refunded'; status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; };
