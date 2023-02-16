import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { UseAuthContext } from "./context/AuthContext";
import { db } from "../firebase";

import {
  AiOutlineStar,
  AiOutlineHeart,
  AiTwotoneHeart,
  AiTwotoneStar,
} from "react-icons/ai";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Product = (props) => {
  const { product } = props.value;
  const { user } = UseAuthContext();

  const [cart, setCart] = useState();

  async function updateCart() {
    const ref = doc(db, "users", `${user?.email}`);

    // if (!user?.email) {
    //   alert("Please login first");
    //   return;
    // }
    if (cart === true) {
      await updateDoc(ref, { cartItems: arrayUnion(product) });
    }
    if (cart === false) {
      await updateDoc(ref, { cartItems: arrayRemove(product) });
    }
  }

  useEffect(() => {
    updateCart();
  }, [cart]);

  return (
    <div className="mx-[5px] my-[5px] w-[160px] h-auto sm:w-[210px] md:w-[235px] lg:w-[300px] ">
      <div className=" relative w-full h-[150px] sm:h-[180px] lg:h-[260px] ">
        <img
          className="w-full h-full object-cover   shadow-xl  rounded-2xl"
          src={product.imageURL}
          alt="img"
        ></img>
        <div
          className="absolute top-0 right-0 p-1 cursor-pointer"
          onClick={() =>
            user?.email ? setCart(!cart) : alert("Please login First")
          }
        >
          {!cart ? (
            <AiOutlineHeart className="text-base  md:text-2xl" />
          ) : (
            <AiTwotoneHeart className="text-base  md:text-2xl" />
          )}
        </div>
        <div className="absolute bottom-1 left-1   ">
          <span className=" bg-gray-200 px-2 pb-1 font-medium  rounded-bl-xl ">
            {"$ " + product.price}
          </span>
        </div>
      </div>
      <div className="">
        <p className=" text-[14px] font-medium lg:text-base">{product.name}</p>
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
};

export default Product;
