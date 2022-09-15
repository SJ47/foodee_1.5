import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import Request from "../helpers/request";
import "../css/PaymentForm.css";

const CheckoutForm = ({ basketValue, basket, baseUrl, customer, baseUrlv2 }) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const request = new Request();
        request
            .post(baseUrlv2 + "/create-payment-intent", basketValue) // I would likely pass my basket of items here was basketValue before
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setClientSecret(data.client_secret);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);

        if (customer) {
            if (!customer.firstName) {
                customer.firstName = "first name not provided";
            }
            if (!customer.lastName) {
                customer.lastName = "last name not provided";
            }
            if (!customer.email) {
                customer.email = "email@not_provided.com";
            }
        } else {
            customer = {
                firstName: "first name not provided",
                lastName: "last name not provided",
                email: "email@not_provided.com",
            };
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: customer.firstName + " " + customer.lastName,
                    email: customer.email,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // const request = new Request();
            // request
            //     .post(baseUrl + "/payments", {
            //         totalPayment: basketValue.toFixed(2),
            //     }) // I would likely pass my basket of items here was basketValue before
            //     .then((res) => {
            //         return res.json();
            //     });
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement
                id="card-element"
                options={(cardStyle, { hidePostalCode: true })}
                onChange={handleChange}
            />

            <button disabled={processing || disabled || succeeded} id="submit">
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>

            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}

            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded
                <Link to="/thankyou"> Continue</Link>
                {/* <a href={`/thankyou`}> Continue.</a> */}
            </p>
            {/* <Link to="/thankyou">
                <button className="order-btn" type="submit">
                    SUBMIT
                </button>
            </Link> */}
        </form>
    );
};

export default CheckoutForm;
