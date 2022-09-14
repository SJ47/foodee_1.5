import React from "react";
import Request from "../helpers/request";
import "../css/PaymentForm.css";
// import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
// console.log("PK: ", STRIPE_PUBLISHABLE_KEY);

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
// const promise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ basket, basketValue, baseUrl, customer }) => {
    // Handle payment
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePaymentPost = (payment) => {
        payment.totalPayment = basketValue;
        const request = new Request();
        request
            .post(baseUrl + "payments", payment)
            .then(window.alert("Payment Accepted"))
            .then((window.location = "/thankyou"));
        // .then(() => window.location = '/thankyou')
        // change '/' to whichever route the home page is called
    };
    console.log(handlePaymentPost);

    // const handleChange = (event) => {
    //     let propertyName = event.target.name;
    //     let copiedCardDetails = { ...cardDetails }
    //     copiedCardDetails[propertyName] = event.target.value;

    //     setCardDetails(copiedCardDetails)
    // }

    // const handleSubmitPayment = (event) => {
    //     event.preventDefault();
    //     handlePaymentPost(cardDetails)
    // }

    let orderTotal = 0;
    const orderList = basket.map((item, index) => {
        orderTotal = orderTotal + item.price * item.quantity;
        return (
            <tr key={index}>
                <td> {item.name}</td> <td>£{item.price.toFixed(2)}</td>{" "}
                <td>{item.quantity}</td>
            </tr>
        );
    });

    // if (basket.length > 0) {
    //     basket.map((item) => {
    //         console.log("Item in basket: ", item);
    //     })
    // }

    const handleClipboardClick = () => {
        // console.log("Clipboard Clicked");
        const testCardNumber = "4242424242424242";
        const el = document.createElement("textarea");
        el.value = testCardNumber; //str is your string to copy
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy"); // Copy command
        document.body.removeChild(el);

        var popup = document.getElementById("myPopup");
        setTimeout(() => {
            popup.classList.toggle("show");
        }, 1500);

        popup.classList.toggle("show");
    };

    return (
        <div className="payment-form-container">
            <div className="order-form-summary">
                <h1>Order Summary Payment</h1>
                <table className="order-table-front-end">
                    <tr>
                        <th>Order Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                    {orderList}
                </table>
                {/* <table>{orderList}</table> */}
                <h2 className="payment-total-text">
                    Total: £{orderTotal.toFixed(2)}
                </h2>
            </div>

            <div className="stripe-checkout-form payment-form">
                <p className="popup">
                    Test card no: 4242 4242 4242 4242
                    <i
                        class="fas fa-clipboard"
                        onClick={handleClipboardClick}
                    ></i>
                    <span class="popuptext" id="myPopup">
                        Copied to clipboard...
                    </span>
                </p>
                <p>Expiry: any date in future</p>
                <p>cvv/cvc any 3 digits</p>
                <Elements stripe={promise}>
                    <CheckoutForm
                        basketValue={basketValue}
                        basket={basket}
                        baseUrl={baseUrl}
                        customer={customer}
                    />
                </Elements>
            </div>

            {/* <form className="payment-form" onSubmit={handleSubmitPayment}>
                <h3> Enter Card Details</h3>
                <input type="text" placeholder="Card Holder Name" name="cardHolder" onChange={handleChange} value={cardDetails.CardHolder} required />
                <input type="text" placeholder="Card Number" name="cardNumber" onChange={handleChange} value={cardDetails.cardNumber} required />
                <input type="text" placeholder="Expiry Month" name="cardExpiryMonth" onChange={handleChange} value={cardDetails.cardExpiryMonth} required />
                <input type="text" placeholder="Expiry Year" name="cardExpiryYear" onChange={handleChange} value={cardDetails.cardExpiryYear} required />
                <input type="text" placeholder="CVV" name="cardCvv" onChange={handleChange} value={cardDetails.cardCvv} required /> */}
            {/* <Link to="/thankyou"> */}
            {/* <button type="submit">PAY NOW </button> */}
            {/* </Link> */}

            {/* </form> */}
        </div>
    );
};

export default PaymentForm;
