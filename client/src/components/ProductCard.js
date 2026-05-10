import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="tech-card overflow-hidden flex flex-col h-full">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-slate-800 flex items-center justify-center border-b border-slate-700">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="object-contain h-full w-full" />
        ) : (
          <span className="text-slate-500 italic">No Image</span>
        )}
      </div>

      <div className="p-5 flex-grow space-y-3">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-blue-500 uppercase">{product.brand}</span>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star size={14} fill="currentColor" /> {product.rating || 0}
          </div>
        </div>

        <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
        
        {/* Quick Specs */}
        <div className="flex flex-wrap gap-2 text-[10px]">
          {product.specs?.ram && <span className="bg-slate-800 px-2 py-1 rounded">{product.specs.ram} RAM</span>}
          {product.specs?.storage && <span className="bg-slate-800 px-2 py-1 rounded">{product.specs.storage}</span>}
        </div>

        <p className="text-xl font-bold text-white mt-auto">
          ${product.price.toLocaleString()}
        </p>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Link 
          href={`/products/${product._id}`} 
          className="w-full btn-primary text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
