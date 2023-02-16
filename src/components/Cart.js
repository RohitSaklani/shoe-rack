import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { UseAuthContext } from "./context/AuthContext";
import Rating from "react-rating";
import { RxCross2 } from "react-icons/rx";

import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const Cart = () => {
  const { user } = UseAuthContext();

  const [cartProducts, setCartProducts] = useState([]);
  async function getCartItems() {
    const ref = doc(db, "users", user?.email);
    const res = await getDoc(ref);
    console.log(res.data().cartItems);
    setCartProducts(res.data().cartItems);
  }

  async function removeItem(product) {
    try {
      const ref = doc(db, "users", user?.email);
      await updateDoc(ref, { cartItems: arrayRemove(product) });
      setCartProducts(cartProducts.filter((ele) => product.id !== ele.id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="flex flex-col items-start px-1 md:px-7 py-5 gap-4">
      <p className=" text-2xl font-semibold  shadow-lg px-1 py-1 ">
        Cart Items
      </p>
      <div className="flex  flex-wrap justify-start  w-full  ">
        {cartProducts?.map((product) => {
          return (
            <div
              key={product.id}
              className="mx-[5px] my-[5px] w-[160px] h-auto sm:w-[210px] md:w-[235px] lg:w-[300px] "
            >
              <div className=" relative w-full h-[150px] sm:h-[180px] lg:h-[260px] ">
                <img
                  className="w-full h-full object-cover  rounded-lg"
                  src={product.imageURL}
                  alt="img"
                ></img>
                <div
                  className="absolute top-1 right-2"
                  onClick={() => removeItem(product)}
                >
                  <RxCross2 size={20} />
                </div>

                <div className="absolute bottom-1 left-1 ">
                  <span className=" bg-gray-200 px-2 pb-1 font-medium ">
                    {"$ " + product.price}
                  </span>
                </div>
              </div>

              <div className="">
                <p className=" text-[14px] font-medium lg:text-base">
                  {product.name}
                </p>
                <p className=" text-[10px] text-gray-600 font-medium lg:text-xs">
                  {product.brand}
                </p>

                <Rating
                  emptySymbol={<AiOutlineStar />}
                  fullSymbol={<AiTwotoneStar />}
                  readonly
                  initialRating={product.rating}
                ></Rating>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
