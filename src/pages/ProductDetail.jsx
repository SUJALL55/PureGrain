import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, products } from '@/lib/products';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Check, ArrowLeft, Leaf, Star, Shield, Truck, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ProductCard from '@/components/home/ProductCard';

export default function ProductDetail() {
  const { id: productId } = useParams();
  const product = getProduct(productId);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showImage, setShowImage] = useState('main');
  const { addToCart, updateQty, getItemQty } = useCart();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Product not found</p>
        <Link to="/products" className="text-primary underline">Browse Products</Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const itemQty = getItemQty(product.id, variant.weight);

  const handleAddToCart = () => {
    if (itemQty > 0) {
      const key = `${product.id}-${variant.weight}`;
      updateQty(key, itemQty + 1);
    } else {
      addToCart(product, variant);
    }
  };

  const handleIncrement = () => {
    const key = `${product.id}-${variant.weight}`;
    updateQty(key, itemQty + 1);
  };

  const handleDecrement = () => {
    const key = `${product.id}-${variant.weight}`;
    if (itemQty === 1) {
      updateQty(key, 0);
    } else if (itemQty > 1) {
      updateQty(key, itemQty - 1);
    }
  };

  const currentImage = showImage === 'grain' && product.grainWheel
    ? product.grainWheel
    : showImage === 'detail' && product.detailImage
    ? product.detailImage
    : product.image;

  const relatedProducts = products.filter(p => p.id !== productId).slice(0, 2);

  return (
    <div className="pb-16">
      {/* Top breadcrumb */}
      <div className="bg-secondary/30 border-b border-border px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-secondary/30 rounded-3xl overflow-hidden aspect-square"
            >
              <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowImage('main')}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${showImage === 'main' ? 'border-primary' : 'border-border'}`}
              >
                <img src={product.image} alt="Product" className="w-full h-full object-cover" />
              </button>
              {product.detailImage && product.detailImage !== product.image && (
                <button
                  onClick={() => setShowImage('detail')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${showImage === 'detail' ? 'border-primary' : 'border-border'}`}
                >
                  <img src={product.detailImage} alt="Detail" className="w-full h-full object-cover" />
                </button>
              )}
              {product.grainWheel && (
                <button
                  onClick={() => setShowImage('grain')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${showImage === 'grain' ? 'border-primary' : 'border-border'}`}
                >
                  <img src={product.grainWheel} alt="Grain Wheel" className="w-full h-full object-cover" />
                </button>
              )}
            </div>

            {/* Delivery info strip */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5 text-sm flex-1">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">100% Natural Guarantee</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <Leaf className="w-3 h-3" />
              {product.category === 'atta' ? 'Stone Ground Atta' : 'Healthy Snack'}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-1">
              {product.name}
            </h1>
            <p className="text-primary font-medium italic mb-4 text-sm">{product.tagline}</p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-primary fill-primary" />)}
              </div>
              <span className="text-sm text-muted-foreground">4.9 · 200+ reviews</span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.badges.map((b, i) => (
                <Badge key={i} variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-medium">
                  {b}
                </Badge>
              ))}
            </div>

            {/* Features */}
            <div className="bg-secondary/40 rounded-2xl p-5 mb-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Why You'll Love It</p>
              <div className="space-y-2.5">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-5 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                      selectedVariant === i
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-card text-foreground hover:border-primary/30'
                    }`}
                  >
                    <span className="block font-bold">{v.weight}</span>
                    <span className="text-xs opacity-70">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs text-muted-foreground">Price</span>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-bold text-primary">₹{variant.price}</p>
                    {variant.mrp && (
                      <span className="text-lg text-muted-foreground line-through">₹{variant.mrp}</span>
                    )}
                  </div>
                  {variant.mrp && (
                    <span className="inline-block mt-1 text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {Math.round((1 - variant.price / variant.mrp) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Per {variant.weight}</p>
                  <p className="text-xs text-accent font-semibold">In Stock</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {itemQty > 0 ? (
                  <motion.div
                    key="quantity-controls-detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between w-full px-3 py-2.5 border border-stone-200 rounded-xl bg-white shadow-sm"
                  >
                    <span className="text-stone-800 font-semibold text-sm">
                      {itemQty} {itemQty === 1 ? 'in cart' : 'in cart'}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDecrement}
                        className="p-0.5 hover:bg-stone-50 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-stone-900 stroke-[2.5px]" />
                      </button>
                      <button
                        onClick={handleIncrement}
                        className="p-0.5 hover:bg-stone-50 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-stone-900 stroke-[2.5px]" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add-button-detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 text-sm rounded-xl bg-[#FFD700] hover:bg-[#F0C800] text-black font-bold transition-all active:scale-[0.98] flex items-center justify-center shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2 inline" />
                      Add to Cart — ₹{variant.price}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Grain Wheel */}
        {product.grainWheel && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Grain Blend</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-4">
              The Power Inside
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm sm:text-base">
              Every grain is carefully selected and blended for maximum nutrition.
            </p>
            <div className="max-w-lg mx-auto">
              <img src={product.grainWheel} alt="Grain blend" className="w-full rounded-3xl shadow-xl" />
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}