import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { UseAuthContext } from "./components/context/AuthContext";

function App() {
  const { user } = UseAuthContext();
  return (
    <div className=" ">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/cart"
            element={user?.email ? <Cart /> : <SignUp />}
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
