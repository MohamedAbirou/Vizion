import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successfully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`Order ${orderId}`} showFooter={false}>
      <div className="flex xl:flex-row lg:flex-row md:flex-col items-center sm:flex-col xs:flex-col justify-between relative top-32 xl:space-x-5 lg:space-x-5 space-x-0 space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5 xl:mx-32 lg:mx-32">
        {loading ? (
          <div className='text-white'>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <>
            <div className="bg-pitchBlack xl:w-[45rem] lg:w-[40rem] md:w-[35rem] sm:w-[28rem] xs:w-[22rem] h-[31rem] px-8 rounded-2xl mb-20">
              <h1 className="text-white text-2xl font-medium uppercase  pt-5 pb-10 text-center">
                Order No &nbsp; <span className='text-cyan'>{orderId.substring(0, 10)}...</span>
              </h1>
              <div>
                <h1 className="text-white text-xl pb-5 font-semibold">
                  shipping address:
                </h1>
                <p className="text-white text-lg font-medium">
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </p>
                {isDelivered ? (
                  <div className="text-green-500 font-semibold pt-2">Delivered at {deliveredAt}</div>
                ) : (
                  <div className="text-red-500 font-semibold pt-2">Not delivered</div>
                )}
                <div className="mt-3">
                  <Link
                    href="/shipping"
                    className="text-yellow-500 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <h1 className="text-white text-xl pt-10 pb-5 font-semibold">
                  Payment Method:
                </h1>
                <p className="text-cyan text-lg font-semibold">{paymentMethod}</p>
                {isPaid ? (
                  <div className="text-green-500 font-semibold pt-2">Paid at {paidAt}</div>
                ) : (
                  <div className="text-red-500 font-semibold pt-2">Not paid</div>
                )}
                <div className="mt-3">
                  <Link
                    href="/payment"
                    className="text-yellow-500 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-pitchBlack xl:w-[45rem] lg:w-[40rem] md:w-[35rem] sm:w-[28rem] xs:w-[22rem] xl:h-[43rem] lg:h-[48rem] md:h-[48rem] sm:h-[48rem] xs:h-[50rem] px-8 rounded-2xl">
              <h1 className="text-white text-3xl font-extrabold uppercase pt-5 pb-10 text-center">
                order summary
              </h1>
              <div>
                <h1 className="text-white text-xl pb-5 font-semibold">
                  items:&nbsp; {/* {orderItems.quantity} */}
                </h1>
              </div>
              {orderItems.map((item) => (
                <>
                  <div className="bg-darkBlack flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-between items-center space-y-0 lg:space-y-3 md:space-y-3 sm:space-y-3 xs:space-y-3 rounded-xl xl:py-0 lg:py-2 md:py-2 sm:py-2 xs:py-2 mb-5">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[150px] h-[50px] xl:rounded-s-xl xl:rounded-none rounded-xl"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-lg text-white hover:text-cyan font-semibold"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-white font-semibold">${item.price}</div>
                    <div className="text-white font-semibold xl:pe-10">
                      X {item.quantity}
                    </div>
                  </div>
                  <div className="flex justify-between pt-3">
                    <div className="text-white capitalize text-lg font-semibold space-y-3">
                      <h1>subtotal: </h1>
                      <h1>taxes & fees: </h1>
                      <h1 className="pb-4">shipping: </h1>
                    </div>
                    <div className="text-white capitalize text-lg font-semibold space-y-3">
                      <h1>${item.quantity * item.price}</h1>
                      <h1>${taxPrice}</h1>
                      <h1>${shippingPrice}</h1>
                    </div>
                  </div>
                  <hr className="pb-4" />
                  <div className="flex justify-between text-white capitalize text-lg font-semibold space-y-3">
                    <div>
                      <h1>total: </h1>
                    </div>
                    <div>
                      <h1>${totalPrice}</h1>
                    </div>
                  </div>
                </>
              ))}
              {!isPaid && (
                <div>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <div>Loading...</div>}
                </div>
              )}
              {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                <div className='xl:mt-32 lg:mt-24 md:mt-24 sm:mt-24 xs:mt-20'>
                  {loadingDeliver && <div>Loading...</div>}
                  <button
                    className="bg-cyan text-black font-bold text-xl py-2 rounded-xl uppercase w-full"
                    onClick={deliverOrderHandler}
                  >
                    Deliver Order
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
