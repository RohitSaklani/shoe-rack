import React from "react";

import { Link, useLocation } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavBar = () => {
  const { user, logOut } = UseAuthContext();
  const url = useLocation();
  console.log(url);

  function showFilter() {
    const filter = document.getElementById("filter");
    // filter.style.display = "block";
    filter.classList.toggle("block");
  }

  return (
    <div className=" sticky top-0 flex w-full justify-between items-center px-4 py-3  shadow-xl  bg-blue-900 z-10">
      {url.pathname === "/" ? (
        <div id="menu-icon" className="block md:hidden" onClick={showFilter}>
          <FiMenu size={25} />
        </div>
      ) : null}
      <Link to="/">
        <div className="bg-gradient-to-r from-red-400 to-yellow-400 px-2 py-2 cursor-pointer  rounded-md">
          <span className="  text-lg md:text-3xl font-semibold">ShoeRACK</span>
        </div>
      </Link>

      <div className=" flex gap-3  items-center ">
        <Link to="/cart">
          <AiOutlineShoppingCart size={30} className=" text-orange-500" />
        </Link>

        {user ? (
          <Link to="/">
            <button
              onClick={logOut}
              className=" border-2 border-orange-500 font-medium text-orange-500 md:hover:text-white md:hover:bg-orange-500   px-2 py-1"
            >
              Log Out
            </button>
          </Link>
        ) : (
          <div>
            {/* <Link to="/signin">
              <button className="mr-3  px-2 py-1 font-medium text-green-700  hover:text-white hover:bg-green-600 hover:border-green-700  border-2 border-green-700/0  	">
                Sign In
              </button>
            </Link> */}
            <Link to="/signup">
              <button className=" border-2 border-orange-500 font-medium text-orange-500 md:hover:text-white md:hover:bg-orange-500   px-2 py-1">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
