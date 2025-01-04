import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { logout } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux"

const BurgerMenuList = ({ closeMenu,user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-7 font-medium bg-richblack-800 text-white p-4">
      <Link
        to="/"
        className="hover:text-richblack-50 transition duration-300"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/catalog/blockchain"
        className="hover:text-richblack-50 transition duration-300"
        onClick={closeMenu}
      >
        Catalog
      </Link>
      <Link
        to="/about"
        className="hover:text-richblack-50 transition duration-300"
        onClick={closeMenu}
      >
        About Us
      </Link>
      <Link
        to="/contact"
        className="hover:text-richblack-50 transition duration-300"
        onClick={closeMenu}
      >
        Contact Us
      </Link>

      <div className="flex gap-6 ">
        {user ? (
          <button
            onClick={() => {
              dispatch(logout(navigate))
              closeMenu()
            }}
            className="bg-yellow-50 text-black w-full rounded-md py-2 px-4 hover:bg-yellow-100 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <div className="w-full items-center justify-center">
            <Link
              to="/login"
              onClick={closeMenu}
            >
            <button className="w-1/2 bg-yellow-50 text-black rounded-md mr-2 py-2 px-4 hover:bg-yellow-100 transition duration-300" >
              Login
            </button>
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
            >
            <button className="w-1/2 bg-yellow-50 text-black rounded-md mr-2 mt-2 py-2 px-4 hover:bg-yellow-100 transition duration-300">
              Sign Up
            </button>
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenuList;  