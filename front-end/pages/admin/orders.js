import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className='container mx-auto pt-32 pb-32'>
        <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-center items-center xl:space-x-32 xl:space-y-0 lg:space-y-10 md:space-y-10 sm:space-y-10 xs:space-y-10 py-10 text-white bg-pitchBlack rounded-xl">
          <div className='flex flex-col text-2xl xl:items-start lg:items-center md:items-center sm:items-center xs:items-center space-y-3 bg-darkBlack xl:px-10 lg:px-[20.5rem] md:px-[18rem] sm:px-[9.6rem] xs:px-[8rem] pt-5 xl:h-[41rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[20rem] rounded-xl'>
            <Link href="/admin/dashboard">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="font-bold text-cyan">Orders</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/users">Users</Link>
          </div>
          <div className="overflow-x-auto md:col-span-3 bg-darkBlack px-10 xl:w-[50rem] lg:w-[50rem] md:w-[44.5rem] sm:w-[28rem] xs:w-[25rem] py-5 rounded-xl">
            <h1 className="mb-4 text-xl">Admin Orders</h1>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">ID</th>
                      <th className="p-5 text-left">USER</th>
                      <th className="p-5 text-left">DATE</th>
                      <th className="p-5 text-left">TOTAL</th>
                      <th className="p-5 text-left">PAID</th>
                      <th className="p-5 text-left">DELIVERED</th>
                      <th className="p-5 text-left">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="p-5">{order._id.substring(20, 24)}</td>
                        <td className="p-5">
                          {order.user ? order.user.firstName : 'DELETED USER'}
                        </td>
                        <td className="p-5">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="p-5">${order.totalPrice}</td>
                        <td className="p-5">
                          {order.isPaid
                            ? `${order.paidAt.substring(0, 10)}`
                            : 'not paid'}
                        </td>
                        <td className="p-5">
                          {order.isDelivered
                            ? `${order.deliveredAt.substring(0, 10)}`
                            : 'not delivered'}
                        </td>
                        <td className="p-5">
                          <Link href={`/order/${order._id}`} passHref>
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
