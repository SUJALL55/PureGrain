import React from 'react';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Products</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Goodness in Every Grain
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Handpicked, stone-ground, and delivered fresh — with nothing but nature's best.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}