import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Users">
      <div className='container mx-auto pt-32 pb-32'>
        <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-center items-center xl:space-x-32 xl:space-y-0 lg:space-y-10 md:space-y-10 sm:space-y-10 xs:space-y-10 py-10 text-white bg-pitchBlack rounded-xl">
          <div className='flex flex-col text-2xl xl:items-start lg:items-center md:items-center sm:items-center xs:items-center space-y-3 bg-darkBlack xl:px-10 lg:px-[20.5rem] md:px-[18rem] sm:px-[9.6rem] xs:px-[8rem] pt-5 xl:h-[41rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[20rem] rounded-xl'>
            <Link href="/admin/dashboard">
              Dashboard
            </Link>
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/users" className="font-bold text-cyan">Users</Link>
          </div>
          <div className="overflow-x-auto md:col-span-3 bg-darkBlack px-10 xl:w-[65rem] lg:w-[60rem] md:w-[44.5rem] sm:w-[28rem] xs:w-[25rem] py-5 rounded-xl">
            <h1 className="mb-4 text-xl">Users</h1>
            {loadingDelete && <div>Deleting...</div>}
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="p-5 text-left">ID</th>
                      <th className="p-5 text-left">NAME</th>
                      <th className="p-5 text-left">EMAIL</th>
                      <th className="p-5 text-left">ADMIN</th>
                      {/* <th className="p-5 text-left">ACTIONS</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b">
                        <td className=" p-5 ">{user._id.substring(20, 24)}</td>
                        <td className=" p-5 ">{user.name}</td>
                        <td className=" p-5 ">{user.email}</td>
                        <td className=" p-5 ">{user.isAdmin ? 'YES' : 'NO'}</td>
                        {/* <td className=" p-5 ">
                          <Link
                            href={`/admin/user/${user._id}`}
                            passHref
                            type="button"
                            className="default-button"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button
                            type="button"
                            className="default-button"
                            onClick={() => deleteHandler(user._id)}
                          >
                            Delete
                          </button>
                        </td> */}
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
