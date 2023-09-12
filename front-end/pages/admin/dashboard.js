import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#00C2FF',
        color: '00C2FF',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Admin Dashboard" showFooter={false}>
      <div className='container mx-auto pt-32 pb-32'>
        <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-center items-center xl:space-x-[20rem] xl:space-y-0 lg:space-y-10 md:space-y-10 sm:space-y-10 xs:space-y-10 py-10 text-white bg-pitchBlack rounded-xl">
          <div className='flex flex-col text-2xl xl:items-start lg:items-center md:items-center sm:items-center xs:items-center space-y-3 bg-darkBlack xl:px-10 lg:px-[20.5rem] md:px-[18rem] sm:px-[9.6rem] xs:px-[8rem] pt-5 xl:h-[41rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[20rem] rounded-xl'>
            <Link href="/admin/dashboard" className="font-bold text-cyan">
              Dashboard
            </Link>
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/users">Users</Link>
          </div>
          <div className="md:col-span-3 bg-darkBlack px-10 xl:w-[50rem] lg:w-[50rem] md:w-[44.5rem] sm:w-[28rem] xs:w-[25rem] py-5 rounded-xl">
            <h1 className="mb-4 text-xl">Admin Dashboard</h1>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="card m-5 p-5">
                    <p className="text-3xl text-cyan">${summary.ordersPrice} </p>
                    <p>Sales</p>
                    <Link href="/admin/orders" className='hover:underline hover:text-cyan'>View sales</Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl text-cyan">{summary.ordersCount} </p>
                    <p>Orders</p>
                    <Link href="/admin/orders" className='hover:underline hover:text-cyan'>View orders</Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl text-cyan">{summary.productsCount} </p>
                    <p>Products</p>
                    <Link href="/admin/products" className='hover:underline hover:text-cyan'>View products</Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl text-cyan">{summary.usersCount} </p>
                    <p>Users</p>
                    <Link href="/admin/users" className='hover:underline hover:text-cyan'>View users</Link>
                  </div>
                </div>
                <h2 className="text-xl">Sales Report</h2>
                <Bar
                  options={{
                    legend: { display: true, position: 'right', backgroundColor: '#00C2FF' },
                  }}
                  data={data}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
