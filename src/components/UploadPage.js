import "./UploadPage.scss";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const UploadPage = () => {
    const [errors, setErrors] = useState({
        url: "",
        imageErrorMessage: "",
        imageMissing: false,
        filetype: false,
        filesize: false,
    });
    const errorMessages = {
        url: "Invalid URL",
        imageMissing: "Don't forget to upload an image!",
        filetype: "Images must be .jpg or .jpeg.",
        filesize: "Images must be less than 10MB.",
    };

    const [uploadedImage, setUploadedImage] = useState(null);
    const [dragEntered, setDragEntered] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    /*
     * Updates uploadedImage state only if certain conditions are met
     * Current conditions:
     ** File type is .jpg or .jpeg
     ** File size is less than 5MB
     */
    const handleImageUpload = (event, dragAndDrop = false) => {
        const file = dragAndDrop ? event.dataTransfer.files[0] : event.target.files[0];
        if (dragAndDrop) {
            event.preventDefault();
            setDragEntered(false);
        }
        if (!validateFileType(file)) {
            setErrors({
                ...errors,
                imageErrorMessage: errorMessages.filetype,
                imageMissing: false,
                filetype: true,
                filesize: false,
            });
        } else if (!validateFileSize(file)) {
            setErrors({
                ...errors,
                imageErrorMessage: errorMessages.filesize,
                imageMissing: false,
                filetype: false,
                filesize: true,
            });
        } else {
            setUploadedImage(file);
            setErrors({
                ...errors,
                imageErrorMessage: "",
                imageMissing: false,
                filetype: false,
                filesize: false,
            });
        }
    };

    const validateFileType = (file) => {
        if (file.type === "image/jpeg") {
            // Accepts .jpg, .jpeg
            return true;
        } else {
            return false;
        }
    };

    const validateFileSize = (file) => {
        if (file.size < 10485760) {
            // 1 MB = 1048576 bytes
            return true;
        } else {
            return false;
        }
    };

    /*
     * Encodes the uploaded image to a base64 string and
     * Stores the encoded image, along with other metadata, in a JSON object then
     * Sends it to the backend.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (uploadedImage == null) {
            setErrors({
                ...errors,
                imageErrorMessage: errorMessages.imageMissing,
                imageMissing: true,
                filetype: false,
                filesize: false,
            });
            return;
        }

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

            readImageFile(uploadedImage)
                .then((base64Image) => {
                    //console.log(base64Image)
                    var strImage = base64Image.split("base64,")[1];
                    var jsonData = {
                        "base64": strImage
                    }
                    console.log(jsonData)
                    //console.log(JSON.stringify(jsonData))
                    setShowSpinner(true);
                    return fetch("http://localhost:8080/image/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                          },
                        body: JSON.stringify(jsonData)
                    });
                })
                .then(() => {
                    setFormSubmitted(true);
                    setShowSpinner(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "80vh" }}
            className="upload-page"
        >
            <h1 className="upload-page-title">Upload image</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                    <div className="upload-page-form-container">
                        <label htmlFor="files">
                            <div
                                className="upload-page-upload-image-container"
                                style={{
                                    backgroundColor: dragEntered ? "#333" : "transparent",
                                    borderColor: errors.imageMissing ? "red" : "black",
                                }}
                                onDrop={(e) => handleImageUpload(e, true)}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={() => setDragEntered(true)}
                                onDragLeave={() => setDragEntered(false)}
                            >
                                {uploadedImage ? (
                                    <img
                                        alt="thumbnail"
                                        src={URL.createObjectURL(uploadedImage)}
                                        className="upload-page-upload-image-thumbnail"
                                    />
                                ) : (
                                    <div className="upload-page-upload-image-text">
                                        <b>Select Image</b> or <b>Drag and Drop</b>
                                        <br />
                                        <div className="upload-page-upload-image-text-limits">
                                            <span
                                                className="upload-page-upload-image-text-limits-filetype"
                                                style={{ color: errors.filetype ? "red" : "black" }}
                                            >
                                                JPEG files only.
                                            </span>
                                            <br />
                                            <span
                                                className="upload-page-upload-image-text-limits-filesize"
                                                style={{ color: errors.filesize ? "red" : "black" }}
                                            >
                                                10MB max file size.
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </label>
                        <input
                            id="files"
                            type="file"
                            accept="image/jpeg"
                            multiple={true}
                            style={{ display: "none" }}
                            onChange={(e) => handleImageUpload(e)}
                            disabled={formSubmitted}
                        />
                        {errors.imageErrorMessage !== "" && (
                            <Alert
                                severity="error"
                                variant="filled"
                                sx={{ color: "white", width: "fit-content" }}
                                onClose={() => {
                                    setErrors({
                                        ...errors,
                                        imageErrorMessage: "",
                                    });
                                }}
                            >
                                {errors.imageErrorMessage}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ fontSize: "1.5em" }}
                            disabled={formSubmitted}
                        >
                            Submit
                        </Button>
                        {showSpinner && <CircularProgress />}
                        {formSubmitted && (
                            <div className="upload-page-submitted">
                                <p className="upload-page-submitted-text">
                                    Submitted! Thank you!
                                </p>
                                <Button
                                    variant="outlined"
                                    onClick={() => window.location.reload()}
                                >
                                    Click to Refresh
                                </Button>
                            </div>
                        )}
                    </div>
                </FormControl>
            </form>
        </Grid>
    );
};

export default UploadPage;