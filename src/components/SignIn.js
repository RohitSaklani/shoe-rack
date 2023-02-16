import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UseAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, pass);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className=" bg-green-200 w-[300px] h-[400px] md:w-[400px] md:h-[500px] m-auto  mt-4 px-8	 pt-10">
      <p className="text-[30px] ">Sign In</p>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4  mt-8">
        <p className="text-red-700 font-medium">{error}</p>
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
          Sign In
        </button>
      </form>
      <div className="">
        <p className="text-xs mt-4">
          New User ?
          <Link to="/signup">
            <span className="font-medium hover:text-sm">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
