import React from "react";
import "./Home.scss";
import Images from "../../assets/images/image 2.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__block HomeLine">
          <h1 className="HomeInfo">Вы пока не создали ни одного товара</h1>
          <img className="home__img" src={Images} alt="Images" />
          <div>
            <NavLink to="/newProduct">
              <button className="CreateBtn">Создать первый товар</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
