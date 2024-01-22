import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Header = ({ user }) => {
  return (
    <div className="Header">
      <div className="Container">
        <div className="Navbar">
          <div className="NavbarLogo">
            <h1>Товары</h1>
            <div className="NavbarLink">
              <NavLink to="/" className="header__link">
                Главная
              </NavLink>
              <NavLink to="/product" className="header__link">
                Товары
              </NavLink>
              <NavLink to="/newProduct" className="header__link">
                Новый товар
              </NavLink>
            </div>
          </div>
          <div>
            <h2>Username:{user} </h2>
          </div>
          <NavLink to="/login">
            <div className="logOut">
              <FaArrowRight className="RightIcon" />
              <button className="LogOutBtn">Выйти</button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
