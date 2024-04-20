import React, { useState, useRef } from "react";
import "./ImageGrid.scss";
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';

const GridItem = (props) => {
  function restoreOriginalDimensions(e) {
    e.target.removeAttribute("width");
    e.target.removeAttribute("height");
  }
  return (
    <div className="image-grid-item">
      <div className="image-grid-item-contents">
        <div className="image-grid-item-checkbox">
          {props.showCheckbox && <Checkbox {...props.checkedImages} />}
        </div>
        <img
          alt={"thumbnail"}
          className="image-grid-item-image"
          src={props.imgUrl}
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
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [checkedImages, setCheckedImages] = useState();
  const [gridItemsArray, setGridItemsArray] = useState([]);
  const fetched = useRef(false);

  async function getImages() {
    console.log("Fetching images!")
    var base64s;
    await fetch("http://localhost:8080/image/getAll", {
      method: "GET"
    })
    .then(response => response.json())
    .then((result) => { base64s = result; })
    convertToGridItems(base64s);
  }
  function convertToGridItems(base64s) {
    base64s.forEach((base64) => {
      let imageUrl = base64ToImage(base64);
      setGridItemsArray(gridItemsArray => [...gridItemsArray, 
        <GridItem imgUrl={imageUrl} onClick={() => handleClick(imageUrl)} checkedImages={checkedImages} showCheckbox={showCheckbox}/>
      ]);
    })
  }
  function base64ToImage(str) {
    const binaryString = atob(str);
    const bytes = new Uint8Array(binaryString.length);

    for (let i=0;i<binaryString.length;i++)
    {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  }
  if(!fetched.current) { // prevent fetching multiple times
    getImages();
    fetched.current = true;
  }

  function handleClick(img) {
    setSideImage(img);
  }

  function enableSelect(img) {
    setShowCheckbox(!showCheckbox);
  }

  /*
  * Encodes the uploaded image to a base64 string and
  * Stores the encoded image, along with other metadata, in a JSON object then
  * Sends it to the backend.
  */
  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log("Uploading image");

    try {
        const reader = new FileReader();
        var base64Image = "";

        // Create a promise to handle the asynchronous file reading
        const readImageFile = (file) => {
            return new Promise((resolve, reject) => {
                reader.onload = function (e) {
                    base64Image = e.target?.result; // Encode image to base64 string
                    resolve(base64Image);
                };

                reader.onerror = function (error) {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        };

        readImageFile(file)
            .then((base64Image) => {
                //console.log(base64Image)
                var strImage = base64Image.split("base64,")[1];
                var jsonData = {
                    "base64": strImage
                }
                console.log(jsonData)
                //console.log(JSON.stringify(jsonData))
                return fetch("http://localhost:8080/image/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify(jsonData)
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.error("Error:", error.message);
    }
  };

  return (
    <div className="image-grid">
      <div className="image-grid-actions-bar">
        <span>Actions:</span>
        <button className="image-grid-action-button button-select" type="button" onClick={enableSelect}>
          Select
        </button>
        <span>Check image: <input
          id="files"
          type="file"
          accept="image/jpeg"
          onChange={(e) => handleImageUpload(e)}
        /></span>
      </div>
      
      {showCheckbox && <Alert severity="info" sx={{paddingTop: "50px"}}>Select images to perform actions.</Alert>}

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
