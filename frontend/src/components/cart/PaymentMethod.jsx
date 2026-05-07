import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { calculateCost } from '../helpers/helpers'
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/orderApi'
import { toast } from 'react-hot-toast'
<<<<<<< HEAD
// import { useNavigate } from 'react-router-dom'
=======
import { useNavigate } from 'react-router-dom'
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

const PaymentMethod = () => {

  const [method, setMethod] = useState('')
<<<<<<< HEAD
=======
  const navigate = useNavigate()
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

  // const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

<<<<<<< HEAD
  const [ stripeCheckoutSession, { data: checkoutData, error: checkoutError} ] = useStripeCheckoutSessionMutation();
=======
  const [ stripeCheckoutSession, { data: checkoutData, error: checkoutError, isLoading} ] = useStripeCheckoutSessionMutation();
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

  useEffect(() => {
    if(checkoutData){
      console.log("=============================")
      console.log(checkoutData)
      console.log("=============================")
      window.location.href = checkoutData?.url
    }

    if(checkoutError){
      toast.error(checkoutError?.data?.message)
    }
  }, [checkoutError, checkoutData])

  useEffect(() => {
    
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
<<<<<<< HEAD
      window.location.href = "/"
    }
  }, [error, isSuccess])
=======
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a

  const submitHandler = (e) => {
    e.preventDefault();

    const { 
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice } = calculateCost(cartItems);

    if(method === 'COD'){
      //Create COD order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid"
        },
        paymentMethod: "COD"
      };

      createNewOrder(orderData)
    }

    if(method === 'card'){
      //Stripe checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData)
    }
  }

  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckoutSteps confirmOrder shipping payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
<<<<<<< HEAD
                value="Card"
                onChange={(e) => setMethod("Card")}
=======
                value="card"
                onChange={(e) => setMethod("card")}
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

<<<<<<< HEAD
            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
=======
            <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentMethod
