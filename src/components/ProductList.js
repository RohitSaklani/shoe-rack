import React, { useEffect } from "react";
import Product from "./Product";

const ProductList = (props) => {
  const { products } = props.value;

  useEffect(() => {
    console.log("productlist useffect called");
  });

  return (
    <div className="flex  flex-wrap justify-center md:justify-start w-full mt-2 md:ml-[210px]">
      {products?.map((product) => {
        return <Product key={product.id} value={{ product }} />;
      })}
    </div>
  );
};

export default ProductList;
