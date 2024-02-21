import React, { useState } from "react";
import "./ImageGrid.scss";

import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const GridItem = (props) => {
  function restoreOriginalDimensions(e) {
    e.target.removeAttribute("width");
    e.target.removeAttribute("height");
  }
  return (
    <div className="image-grid-item">
      <div className="image-grid-item-contents">
        <img
          alt={"thumbnail"}
          className="image-grid-item-image"
          src={props.img}
          onClick={props.onClick}
          onLoad={restoreOriginalDimensions}
          height={window.innerWidth <= 600 ? "100px" : "200px"}
          width={window.innerWidth <= 600 ? "100px" : "200px"}
        ></img>
      </div>
    </div>
  );
};

const ImageGrid = () => {
  const [sideImage, setSideImage] = useState();
  let gridItemsArray = []; // grid items to be rendered

  // placeholder hardcoded images in lieu of a backend
  gridItemsArray.push(
    <GridItem img={img0} onClick={() => handleClick(img0)} />
  );
  gridItemsArray.push(
    <GridItem img={img1} onClick={() => handleClick(img1)} />
  );
  gridItemsArray.push(
    <GridItem img={img2} onClick={() => handleClick(img2)} />
  );
  gridItemsArray.push(
    <GridItem img={img3} onClick={() => handleClick(img3)} />
  );
  gridItemsArray.push(
    <GridItem img={img4} onClick={() => handleClick(img4)} />
  );
  gridItemsArray.push(
    <GridItem img={img5} onClick={() => handleClick(img5)} />
  );

  function handleClick(img) {
    setSideImage(img);
  }

  return (
    <div className="image-grid">
      <div className="image-grid-actions-bar">
        <span>Actions:</span>
        <button className="image-grid-action-button" type="button">
          Whitelist
        </button>
      </div>

      <div className="image-grid-content">
        <div className="image-grid-items">
          {gridItemsArray.map((component, index) => (
            <React.Fragment key={index}>{component}</React.Fragment>
          ))}
        </div>
        {sideImage && (
          <div className="image-grid-details">
            <div className="image-grid-details-content">
              <img alt="side img" src={sideImage}></img>
              <p>placeholder text</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
