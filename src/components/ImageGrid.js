import * as React from "react";
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
          onLoad={restoreOriginalDimensions}
          height={window.innerWidth <= 600 ? "100px" : "200px"}
          width={window.innerWidth <= 600 ? "100px" : "200px"}
        ></img>
      </div>
    </div>
  );
};

const ImageGrid = () => {
  let gridItemsArray = []; // grid items to be rendered
  gridItemsArray.push(<GridItem img={img0} />);
  gridItemsArray.push(<GridItem img={img1} />);
  gridItemsArray.push(<GridItem img={img2} />);
  gridItemsArray.push(<GridItem img={img3} />);
  gridItemsArray.push(<GridItem img={img4} />);
  gridItemsArray.push(<GridItem img={img5} />);

  return (
    <div className="image-grid">
      <div className="image-grid-actions-bar">
        <span>Actions:</span>
        <button className="image-grid-action-button" type="button">
          Whitelist
        </button>
      </div>
      <div className="image-grid-contents">
        {gridItemsArray.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
