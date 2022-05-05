import React from "react";
import banner from "../../images/banner.png";
import offer from "../../images/offer.jpg";
import {Link} from "react-router-dom";
import {Carousel} from "react-bootstrap";
import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={offer} alt="First slide" />
          <Carousel.Caption>
            <h3>
              Buy latest products from <br />
              Shop Now
            </h3>
            <p>
              {" "}
              Shop now is top ecommerce store where you can buy the latest goods
              available in the market.
            </p>
            <Link to="/products" className="btn">
              Explore Our Projects &#8594;
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block w-100" src={offer} alt="Second slide" />
          <Carousel.Caption>
            <h3>
              Buy latest products from <br />
              Shop Now
            </h3>
            <p>
              Shop now is top ecommerce store where you can buy the latest goods
              available in the market.
            </p>
            <Link to="/products" className="btn">
              Explore Our Projects &#8594;
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={offer} alt="Third slide" />
          <Carousel.Caption>
            <h3>
              Buy latest products from <br />
              Shop Now
            </h3>
            <p>
              Shop now is top ecommerce store where you can buy the latest goods
              available in the market.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="row">
        <div className="col-2">
          <h1>
            Buy latest products from <br />
            Shop Now
          </h1>
          <p>
            Shop now is top ecommerce store where you can buy the latest goods
            available in the market.
          </p>
          <Link to="/products" className="btn">
            Explore Our Projects &#8594;
          </Link>
        </div>

        <div className="col-2">
          <img src={banner} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
