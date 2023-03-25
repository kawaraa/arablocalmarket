"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function CustomBarcodeDetecter({ onDetect, onError }) {
  const videoRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    if (videoRef.current?.srcObject) return;
    try {
      const getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      // formats
      const barcodeDetector = new BarcodeDetector({ formats: ["code_39", "codabar", "ean_13"] });
      // check compatibility
      if (!barcodeDetector) throw new Error("Barcode Detector supported!");
      else console.log("Barcode Detector is not supported by this browser.");

      const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      const stream = await getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const check = async () => {
        if (!videoRef.current?.srcObject) return;

        const x = (videoRef.current.videoWidth - width) / 2;
        const y = (videoRef.current.videoHeight - height) / 2;
        ctx.drawImage(videoRef.current, x, y, width, height, 0, 0, width, height);

        const img = canvas.toDataURL();
        setImage(canvas.toDataURL());

        const barcodes = await barcodeDetector.detect(canvas).catch((err) => console.log(err));
        console.log(barcodes);
        if (!barcodes[0]) return check();

        barcodes.forEach((barcode) => {
          console.log(barcode.rawValue);
          onDetect(barcode.rawValue);
          stopStreams();
        });
      };

      // check();
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      stopStreams();
      if (error.message == "Permission denied") onError("Can not access camera.");
      else onError(error.message);
    }
  };

  const stopStreams = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    initializeScanner();
    return stopStreams;
  }, []);

  return (
    <div className="text-center bg-blur min-h-44 w-full">
      <video ref={videoRef} id="yourElement" style={{ width: "100%" }} />
      <div></div>
    </div>
  );
}

const formats = [
  "aztec",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  "data_matrix",
  "ean_13",
  "ean_8",
  "itf",
  "pdf417",
  "qr_code",
  "unknown",
  "upc_a",
  "upc_e",
];

// const ean = ["ean_reader", "ean_8_reader"];
// const upc = ["upc_reader", "upc_e_reader"];
// const codes = ["code_128_reader","code_39_reader","code_39_vin_reader",]
// const other = ["codabar_reader","i2of5_reader"]
// const  readers =  [...ean, ...upc, ...codes, ...other]
