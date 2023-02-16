import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { signUp } = UseAuthContext();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, pass);
      console.log("isnide signup");
      setDoc(doc(db, "users", email), { cartItems: [] });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className=" bg-green-200 w-[300px] h-[400px] md:w-[400px] md:h-[500px] m-auto  mt-4 px-8	 pt-10">
      <p className=" text-3xl ">Sign up</p>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4  mt-8">
        <p className="text-red-700  md:font-medium">{error}</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="h-[35px] rounded-sm px-3"
          type="text"
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => setPass(e.target.value)}
          className="h-[35px] rounded-sm px-3"
          type="password"
          placeholder="Password"
        ></input>
        <button className=" bg-green-400 h-[35px] rounded-sm mt-3 hover:bg-green-500 ">
          Sign Up
        </button>
      </form>
      <div className="">
        <p className="text-xs mt-4">
          Already a User ?
          <Link to="/signin">
            <span className="font-medium hover:text-sm">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
