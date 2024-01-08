'use client';
import { Trash2 } from 'lucide-react';
import { cartProductPrice } from '@/components/AppContext';

import Image from 'next/image';
export default function CartProduct({ product, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b py-2" key={product._id}>
      <div className="sm:w-24">
        <Image
          src={product.image}
          width={240}
          height={240}
          alt={product.name}
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm text-gray-500">
            Size:<span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div>
            {product.extras.map((extra) => (
              <div key={extra._id} className="text-sm text-gray-500">
                Extra {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            type="button"
            className="p-2"
            onClick={() => onRemove(product._id)}
          >
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
}
