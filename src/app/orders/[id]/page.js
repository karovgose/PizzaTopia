'use client';
import AddressInputs from '@/components/AddressInputs';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import CartProduct from '@/components/CartProduct';
import SectionHeaders from '@/components/SectionHeaders';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function OrderPage() {
  const { clearCartProduct } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCartProduct();
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id).then((response) =>
        response.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        })
      );
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={'Your order'} />
        <div className="mt-4 mb-8">
          <p>Thank for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product, i) => (
              <CartProduct key={i} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
            </div>
            <div className="text-right py-2 text-gray-500">
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
            </div>
            <div className="text-right py-2 text-gray-500">
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                addressProps={{ phone, street, zipCode, city, country }}
                setAddressProps={handleAddressChange}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
