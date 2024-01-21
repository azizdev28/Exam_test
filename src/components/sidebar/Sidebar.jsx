import React from "react";
import "./Sidebar.scss";
import { IoSettings } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsHandbagFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import Logo from "../../assets/images/Logo.svg";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="SideBarLogo">
        <NavLink to="/">
          <img
            className="logo__img"
            width={50}
            height={40}
            src={Logo}
            alt="Logo"
          />
        </NavLink>
      </div>

      <div className="SideBarIcon">
        <NavLink to="/">
          <IoSettings className="Icon" />
        </NavLink>
        <NavLink to="/product">
          <BsHandbagFill className="Icon" />
        </NavLink>
        {/* <NavLink to="/newProduct">
          <FaCirclePlus className="Icon" />
        </NavLink> */}
        <NavLink to="/login">
          <CgProfile className="Icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
