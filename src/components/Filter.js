import React, { useEffect, useState } from "react";

const Filter = (props) => {
  const { state, dispatch, applyFilters } = props.value;

  const genders = ["MEN", "WOMEN", "KIDS"];
  const categories = ["CASUAL", "RUNNING", "FOOTBALL"];
  const brands = ["Reebok", "NIKE", "Vans", "ADIDAS", "HUSHPUPPIES"];

  async function reset() {
    console.log("before reset dispatch");
    await dispatch({ type: "RESET" });
    console.log("after reset dispatch");
    applyFilters();
    console.log("after aplly filter");
  }

  useEffect(() => {
    console.log("filter useffect called");
  });

  return (
    <div
      id="filter"
      className=" hidden bg-gray-300 md:flex flex-col fixed w-[200px] h-full md:bg-gray-500/10 px-4 py-1 shadow-lg z-10"
    >
      <div className=" text-lg font-bold">
        <p>Filters</p>
      </div>
      <hr className=" border-indigo-900 border-1"></hr>
      <div className="flex  flex-col  gap-2 ">
        <p>{state.type}</p>

        <div className="flex flex-col ">
          <p className=" font-bold"> gender</p>
          {genders.map((gender) => {
            return (
              <div key={gender} className="flex  items-center gap-2">
                <input
                  className="w-[15px] h-[15px] cursor-pointer "
                  id={gender}
                  type="checkbox"
                  name="gender"
                  checked={state.gender.includes(gender) ? true : false}
                  onChange={(e) => {
                    if (e.target.checked)
                      dispatch({ type: "GENDER", payload: gender });
                    else dispatch({ type: "GENDER_UNCHECK", payload: gender });
                  }}
                />
                <label htmlFor={gender}>{gender}</label>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col ">
          <p className=" font-bold"> category</p>
          {categories.map((category) => {
            return (
              <div key={category} className="flex  items-center gap-2">
                <input
                  className="w-[15px] h-[15px] cursor-pointer "
                  id="casual"
                  type="checkbox"
                  name={category}
                  checked={state.category.includes(category) ? true : false}
                  onChange={(e) => {
                    if (e.target.checked)
                      dispatch({ type: "CATEGORY", payload: category });
                    else
                      dispatch({
                        type: "CATGEORY_UNCHECK",
                        payload: category,
                      });
                  }}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col ">
          <p className=" font-bold"> Brand</p>
          {brands.map((brand) => {
            return (
              <div key={brand} className="flex  items-center gap-2">
                <input
                  className="w-[15px] h-[15px] cursor-pointer "
                  id="casual"
                  type="checkbox"
                  name={brand}
                  checked={state.brand.includes(brand) ? true : false}
                  onChange={(e) => {
                    if (e.target.checked)
                      dispatch({ type: "BRAND", payload: brand });
                    else
                      dispatch({
                        type: "BRAND_UNCHECK",
                        payload: brand,
                      });
                  }}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            );
          })}
        </div>
        <div>
          <p className="font-medium"> Price</p>

          <input
            type="range"
            min="10"
            max="400"
            defaultValue={state.price}
            onChange={(e) =>
              dispatch({ type: "PRICE", payload: e.target.value })
            }
          ></input>
          <p>10 - {state.price}</p>
        </div>
        <button
          className="w-full border-2 border-blue-800 font-semibold  text-blue-800 py-1 mt-2 md:hover:bg-blue-800 md:hover:text-white"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
        <button
          className="w-full border-2  border-blue-800 font-semibold  text-blue-800 py-1 mt-2 md:hover:bg-blue-800 md:hover:text-white"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
