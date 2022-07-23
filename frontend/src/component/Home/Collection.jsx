import React from "react";
import "./Collection.css";
import womencollection from "../../images/women-collection.jpg";
import mencollection from "../../images/men-collection.jpg";
import electroniccollection from "../../images/electroniccollection.jpg";

const Collection = () => {
  return (
    <div className="collections-wrapper">
      <div className="collection">
        <img src={mencollection} alt="mencollection" />
        <p className="collection-title">
          Men <br />
          Apparels{" "}
        </p>
      </div>
      <div className="collection">
        <img src={womencollection} alt="womencollection" />
        <p className="collection-title">
          Women <br />
          Apparels{" "}
        </p>
      </div>
      <div className="collection-full">
        <img src={electroniccollection} alt="electroniccollection" />
        <p className="collection-title">
          Electronic Devices <br />
          Apparels{" "}
        </p>
      </div>
    </div>
  );
};

export default Collection;
