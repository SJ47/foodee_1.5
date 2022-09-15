import React from "react";
import Request from "../helpers/request";
import "../css/PaymentForm.css";
import CheckoutForm from "./CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// const STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY;  // This method if using create-react-app
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY; // This method if using Vite

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ basket, basketValue, baseUrl, customer, baseUrlv2 }) => {
    // Handle payment
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePaymentPost = (payment) => {
        payment.totalPayment = basketValue;
        const request = new Request();
        request
            .post(baseUrl + "payments", payment)
            .then(window.alert("Payment Accepted"))
            .then((window.location = "/thankyou"));
    };

    let orderTotal = 0;
    const orderList = basket.map((item, index) => {
        orderTotal = orderTotal + item.price * item.quantity;
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>£{item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
            </tr>
        );
    });

    const handleClipboardClick = () => {
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
                    <thead>
                        <tr>
                            <th>Order Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody align="left">{orderList}</tbody>
                </table>
                <h2 className="payment-total-text">
                    Total: £{orderTotal.toFixed(2)}
                </h2>
            </div>

            <div className="stripe-checkout-form payment-form">
                <p className="popup">
                    Test card no: 4242 4242 4242 4242
                    <i
                        className="fas fa-clipboard"
                        onClick={handleClipboardClick}
                    ></i>
                    <span className="popuptext" id="myPopup">
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
                        baseUrlv2={baseUrlv2}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentForm;
