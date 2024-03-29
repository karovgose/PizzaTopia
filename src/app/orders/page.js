'use client';
import SectionHeaders from '@/components/SectionHeaders';
import Tabs from '@/components/Tabs';
import { UseProfile } from '@/components/UseProfile';
import DateTimeForHuman from '@/libs/DateTimeForHuman';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = UseProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  function fetchOrder() {
    fetch('/api/orders').then((response) => {
      setLoadingOrders(true);
      response.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <div className="mt-8 ">
        {loadingOrders && (
          <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-200 rounded-lg  mb-2 p-4 flex flex-col md:flex-row justify-between items-center gap-2"
            >
              <div className="flex-grow flex flex-col md:flex-row md:items-center gap-2">
                <div>
                  <div
                    className={
                      (order.paid ? 'bg-green-500 ' : 'bg-red-500 ') +
                      'p-2 rounded-md text-white text-center'
                    }
                  >
                    {order.paid ? 'paid' : 'not paid'}
                  </div>
                </div>
                <div>
                  <div> {order.userEmail}</div>
                  <div className="text-gray-500 text-sm text-center flex items-center justify-center flex-col">
                    {Array.isArray(order?.cartProducts)
                      ? order.cartProducts.map((p, i) => (
                          <p key={i}>{p.name}</p>
                        ))
                      : ''}
                  </div>
                </div>
              </div>
              <div className="md:flex md:gap-2 md:items-center md:justify-end md:whitespace-nowrap">
                {DateTimeForHuman(order.createdAt)}
                <Link
                  href={'/orders/' + order._id}
                  className="button mt-2 bg-gray-3
                  
                  00"
                >
                  show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
