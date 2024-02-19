import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { db } from "../../Utility/Firebase";


function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(typeof total);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
       //2. Using stripe it will confirm the client side (react side confirmation)

       const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

//3. After confirming it will store the order inside Firestore database and clears(empties) the basket
            await db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
// Empty the basket after paying for the order
dispatch({ type: Type.EMPTY_BASKET });


 // empty the basket
setProcessing(false);
navigate("/orders", { state: { msg: "We have received your new Order" } });
    }  catch (error) {
      console.log(error);
      setProcessing(false);
    }

   

    
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        {" "}
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>5689 Kera court</div>
            <div>Addid Ababa, Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "blue" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="blue" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
