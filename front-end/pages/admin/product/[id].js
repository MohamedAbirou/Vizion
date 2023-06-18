import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
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
          <div className="md:col-span-3 bg-darkBlack px-10 xl:w-[65rem] lg:w-[60rem] md:w-[44.5rem] sm:w-[28rem] xs:w-[25rem] py-5 rounded-xl">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <form
                className="mx-auto max-w-screen-md text-white font-medium"
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className="mb-8 text-xl uppercase font-semibold">{`Edit Product ${productId}`}</h1>
                <div className="mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="name"
                    autoFocus
                    {...register('name', {
                      required: 'Please enter name',
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="slug"
                    {...register('slug', {
                      required: 'Please enter slug',
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="price"
                    {...register('price', {
                      required: 'Please enter price',
                    })}
                  />
                  {errors.price && (
                    <div className="text-red-500">{errors.price.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image">image</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="image"
                    {...register('image', {
                      required: 'Please enter image',
                    })}
                  />
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={uploadHandler}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="category">category</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="category"
                    {...register('category', {
                      required: 'Please enter category',
                    })}
                  />
                  {errors.category && (
                    <div className="text-red-500">{errors.category.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="brand">brand</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="brand"
                    {...register('brand', {
                      required: 'Please enter brand',
                    })}
                  />
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="countInStock">countInStock</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="countInStock"
                    {...register('countInStock', {
                      required: 'Please enter countInStock',
                    })}
                  />
                  {errors.countInStock && (
                    <div className="text-red-500">
                      {errors.countInStock.message}
                    </div>
                  )}
                </div>
                <div className="mb-10">
                  <label htmlFor="countInStock">description</label>
                  <input
                    type="text"
                    className="w-full py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="description"
                    {...register('description', {
                      required: 'Please enter description',
                    })}
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <button disabled={loadingUpdate} className="bg-cyan w-full text-black font-bold text-xl px-8 py-1 rounded-md uppercase">
                    {loadingUpdate ? 'Loading' : 'Update'}
                  </button>
                </div>
                <div className="mb-4">
                  <button className='bg-red-500 w-full text-black font-bold text-xl px-8 py-1 rounded-md uppercase'>
                    <Link href={`/admin/products`}>Back</Link>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
