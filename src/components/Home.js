import React, { useEffect, useReducer, useState } from "react";
import { db } from "../firebase";
import Filter from "./Filter";
import ProductList from "./ProductList";
import { getDocs } from "firebase/firestore";

import { collection, query, where } from "firebase/firestore";
var _ = require("lodash");

const initial = { gender: [], category: [], brand: [], price: 400 };

function reducer(state, action) {
  switch (action.type) {
    case "GENDER":
      return {
        ...state,
        gender: state.gender
          ? [...state.gender, action.payload]
          : [action.payload],
      };
    case "GENDER_UNCHECK": {
      return {
        ...state,
        gender: state.gender.filter((ele) => ele !== action.payload),
      };
    }
    case "CATEGORY":
      return {
        ...state,
        category: state.category
          ? [...state.category, action.payload]
          : [action.payload],
      };
    case "CATGEORY_UNCHECK": {
      return {
        ...state,
        category: state.category.filter((ele) => ele !== action.payload),
      };
    }
    case "BRAND":
      return {
        ...state,
        brand: state.brand
          ? [...state.brand, action.payload]
          : [action.payload],
      };
    case "BRAND_UNCHECK": {
      return {
        ...state,
        brand: state.brand.filter((ele) => ele !== action.payload),
      };
    }
    case "PRICE": {
      return { ...state, price: action.payload };
    }
    case "RESET": {
      return { gender: [], category: [], brand: [], price: 400 };
    }

    default:
      return {};
  }
}

const Home = () => {
  const [products, setProducts] = useState([]);

  const [state, dispatch] = useReducer(reducer, initial);

  async function applyFilters() {
    let genderR = [];
    let categoryR = [];
    let brandR = [];
    let priceR = [];
    let resp;

    const ref = collection(db, "products");

    console.log("apllyfilter called ");

    let allRes = [];
    if (state.gender.length !== 0) {
      resp = await getDocs(query(ref, where("gender", "in", state.gender)));

      resp.forEach((doc) => {
        genderR = [...genderR, doc.data()];
      });
      allRes = [...allRes, genderR];
    }

    if (state.category.length !== 0) {
      resp = await getDocs(query(ref, where("category", "in", state.category)));
      resp.forEach((doc) => {
        categoryR = [...categoryR, doc.data()];
      });
      allRes = [...allRes, categoryR];
    }

    if (state.brand.length !== 0) {
      resp = await getDocs(query(ref, where("brand", "in", state.brand)));
      resp.forEach((doc) => {
        brandR = [...brandR, doc.data()];
      });
      allRes = [...allRes, brandR];
    }

    resp = await getDocs(query(ref, where("price", "<=", Number(state.price))));
    resp.forEach((doc) => {
      priceR = [...priceR, doc.data()];
    });
    allRes = [...allRes, priceR];

    const res = _.intersectionBy(...allRes, "id");

    console.log(res.map((e) => e.id));

    setProducts(res);
  }

  useEffect(() => {
    applyFilters();
  }, []);

  useEffect(() => {
    console.log("state changed");
  }, [state]);

  return (
    <div className="flex ">
      <Filter value={{ state, dispatch, applyFilters }} />

      <ProductList value={{ products }} />
    </div>
  );
};

export default Home;

// useEffect(() => {
//   for (const key in data) {
//     setDoc(doc(db, "products", key), data[key]);
//   }
// }, []);
