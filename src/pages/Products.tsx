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
                <span className="font-bold">${product.price}</span>
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
