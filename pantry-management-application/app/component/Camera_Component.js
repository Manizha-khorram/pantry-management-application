"use client";

// CameraComponent.js
import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";

const CameraComponent = ({ onCapture, onClose }) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setImage(photo);
      onCapture(photo);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Camera ref={camera} aspectRatio={16 / 9} />
      <button
        onClick={takePicture}
        style={{ position: "absolute", bottom: 20, left: 20 }}
      >
        Capture
      </button>
      <button
        onClick={onClose}
        style={{ position: "absolute", bottom: 20, left: 100 }}
      >
        Close
      </button>
      {image && (
        <img
          src={image}
          alt="Captured"
          style={{ position: "absolute", top: 20, left: 20, width: 200 }}
        />
      )}
    </div>
  );
};

export default CameraComponent;
