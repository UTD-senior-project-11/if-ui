import React, { useState, useRef } from "react";
import "./ImageGrid.scss";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [gridItemsArray, setGridItemsArray] = useState([]);
  const [checkAI, setCheckAI] = useState(false);
  const [banned, setBanned] = useState(false);
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
        <GridItem imgUrl={imageUrl} onClick={() => handleClick(imageUrl)}/>
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

  const handleClose = () => {
    setCheckAI(false);
  };

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
        const readImageFile = async (file) => {
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

        await readImageFile(file)
            .then((base64Image) => {
                //console.log(base64Image)
                var strImage = base64Image.split("base64,")[1];
                var jsonData = {
                    "base64": strImage
                }
                //console.log(JSON.stringify(jsonData))
                return fetch("http://localhost:8080/image/compare", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify(jsonData)
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            })
            /*.then(() => {
              return fetch("http://localhost:8080/image/compareresult", {
                method: "GET"
              })
            })*/
            //.then(response => response.json())
            .then(res => res.text())
            .then((res) => {
              console.log(`res:`);
              console.log(res);
              const banStatus = res === "D" ? true : false; // ban dogs, allow cats
              console.log(`ban result: ${banStatus}`);
              setBanned(res);
              setCheckAI(true); // open check AI dialog
            });
    } catch (error) {
        console.error("Error:", error.message);
    }
  };

  return (
    <div className="image-grid">
      <div className="image-grid-actions-bar">
        <span>Upload image to check: <input
          id="files"
          type="file"
          accept="image/jpeg"
          onChange={(e) => handleImageUpload(e)}
        /></span>
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
            </div>
          </div>
        )}
      </div>
      <Dialog
        open={checkAI}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Image Classification Result"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Based on the AI model trained thus far, the selected image is to be <b>{ banned ? "banned (dog)" : "not banned (cat)" }</b>.
          </DialogContentText>
          <DialogContentText sx={{ fontSize: "0.6rem" }}>
            Disclaimer: The AI cannot promise 100% accuracy. Accuracy improves with a larger, diverse dataset.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageGrid;
