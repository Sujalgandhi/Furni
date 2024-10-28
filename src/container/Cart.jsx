import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementProduct, getTotal, incrementProduct, removeCart } from "../features/product/productSlice";

function Cart() {
  const { cart, netTotal } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((cartItem, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <img src={cartItem.image} alt="Product" className="img-fluid" />
                        </td>
                        <td className="product-name">
                          <h2 className="h5 text-black">{cartItem.title}</h2>
                        </td>
                        <td>${cartItem.price}</td>
                        <td>
                          <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: 120 }}>
                            <button
                              className="btn btn-outline-black decrease"
                              type="button"
                              onClick={() => dispatch(decrementProduct(index))}
                            >
                              −
                            </button>
                            <input
                              value={cartItem.quantity}
                              type="text"
                              className="form-control text-center quantity-amount"
                              readOnly
                            />
                            <button
                              className="btn btn-outline-black increase"
                              type="button"
                              onClick={() => dispatch(incrementProduct(index))}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                        <td>
                          <button 
                          className="btn btn-black btn-sm"
                          onClick={() => dispatch(removeCart(index))}
                          >X</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-outline-black btn-sm btn-block">
                Continue Shopping
              </button>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <h3 className="text-black h4 text-uppercase border-bottom mb-5">Cart Totals</h3>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${netTotal.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${netTotal.toFixed(2)}</strong>
                    </div>
                  </div>
                  <button
                    className="btn btn-black btn-lg py-3 btn-block"
                    onClick={() => (window.location.href = "/checkout")}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
