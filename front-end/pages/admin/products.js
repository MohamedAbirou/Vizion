import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully');
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Product deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Admin Products">
      <div className='container mx-auto pt-10 pb-32'>
        <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-center items-center xl:space-x-32 xl:space-y-0 lg:space-y-10 md:space-y-10 sm:space-y-10 xs:space-y-10 py-10 text-white bg-pitchBlack rounded-xl">
          <div className='flex flex-col text-2xl xl:items-start lg:items-center md:items-center sm:items-center xs:items-center space-y-3 bg-darkBlack xl:px-10 lg:px-[20.5rem] md:px-[18rem] sm:px-[9.6rem] xs:px-[8rem] pt-5 xl:h-[41rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[20rem] rounded-xl'>
            <Link href="/admin/dashboard">
              Dashboard
            </Link>
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/products" className="font-bold text-cyan">Products</Link>
            <Link href="/admin/users">Users</Link>
          </div>
          <div className="overflow-x-auto md:col-span-3 bg-darkBlack px-10 xl:w-[65rem] lg:w-[60rem] md:w-[44.5rem] sm:w-[28rem] xs:w-[25rem] py-5 rounded-xl">
            <div className="flex justify-between mb-8">
              <h1 className="mb-4 text-xl uppercase font-semibold">Products</h1>
              {loadingDelete && <div>Deleting item...</div>}
              {/* <button
                disabled={loadingCreate}
                onClick={createHandler}
                className="bg-cyan text-black font-bold text-xl px-8 py-2 rounded-xl uppercase"
              >
                {loadingCreate ? 'Loading' : 'Create'}
              </button> */}
            </div>
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
                      <th className="p-5 text-left">NAME</th>
                      <th className="p-5 text-left">PRICE</th>
                      <th className="p-5 text-left">CATEGORY</th>
                      <th className="p-5 text-left">COUNT</th>
                      <th className="p-5 text-left">RATING</th>
                      <th className="p-5 text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b text-center">
                        <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                        <td className=" p-5 ">{product.name}</td>
                        <td className=" p-5 ">${product.price}</td>
                        <td className=" p-5 ">{product.category}</td>
                        <td className=" p-5 ">{product.countInStock}</td>
                        <td className=" p-5 ">{product.rating}</td>
                        <td className=" p-5">
                          <Link
                            href={`/admin/product/${product._id}`}
                            type="button"
                            className="default-button"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className="default-button"
                            type="button"
                          >
                            Delete
                          </button>
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

AdminProdcutsScreen.auth = { adminOnly: true };
