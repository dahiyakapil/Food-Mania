import React from "react";
import FoodLogo from "../assets/images/Food_Logo.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-600 flex justify-between top-0 sticky ">
      <img className="w-14 h-15 p-1 " src={FoodLogo} alt="Food_Mania_Logo" />
      <ul className="flex  text-white cursor-pointer">
        <li className="flex items center justify-center p-5">
          <Link to="/">Home</Link>
        </li>

        <li className="flex items center justify-center p-5">
          <Link to="/about">About</Link>
        </li>


        <li className="flex items center justify-center p-5"><Link to="/contact">Contact</Link></li>
        <li className="flex items center justify-center p-5">Cart</li>
      </ul>
    </div>
  );
};

export default Navbar;
