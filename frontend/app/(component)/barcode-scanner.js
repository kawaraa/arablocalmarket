"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function BarcodeScanner({ onDetect, onError }) {
  const videoRef = useRef(null);
  const width = 320;
  const height = 240;

  const [image, setImage] = useState("");

  const initializeScanner = async () => {
    if (videoRef.current?.srcObject) return;
    try {
      const constraints = {
        audio: false,
        video: { width: 1920, height: 1080, facingMode: { exact: "environment" } },
        advanced: [{ zoom: 300 }],
      };
      //  width: 1920, height: 1080,
      // { width: 1920, height: 1080 }, { aspectRatio: 1.7777777778 },
      // zoom: true

      // const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      videoRef.current.addEventListener("loadedmetadata", (e) => {
        // canvas.width = videoRef.current.videoWidth;
        // canvas.height = videoRef.current.videoHeight;
      });

      const checkResult = (result) => {
        if (!result?.codeResult?.code) setTimeout(check, 50);
        else {
          onDetect(result.codeResult.code);
          stopStreams();
        }
      };

      const check = () => {
        if (!videoRef.current?.srcObject) return;

        // console.log(canvas.width);
        // console.log(canvas.height);
        // ctx.drawImage(videoRef.current, 0, 0, width, height);
        // ctx.drawImage(videoRef.current, 210, 150, 300, 300, 0, 0, 400, 400);
        const x = (videoRef.current.videoWidth - 300) / 2;
        const y = (videoRef.current.videoHeight - 150) / 2;
        ctx.drawImage(videoRef.current, x, y, 300, 150, 0, 0, 300, 150);
        const img = canvas.toDataURL();
        // "image/png" || "image/jpeg", 1.0
        // console.log("AAA");
        setImage(img);
        Quagga.decodeSingle({ decoder: { readers }, src: img, locate: false, multiple: false }, checkResult);
      };
      check();
      // setInterval(() => check(), 500);
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

  useEffect(() => stopStreams, []);

  return (
    <div className="text-center min-h-44 w-full">
      <Script src="/barcode-scanner/quagga.min.js" onReady={initializeScanner}></Script>
      <div className="relative">
        <video ref={videoRef} id="yourElement" className="bg-blur" style={{ width: "100%" }} />

        {/* <div className="absolute top-0 left-0 w-1/2 h-1/2 border translate-x-1/2 translate-y-1/2 "></div> */}
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <div className="w-1/3 h-1/3 border"></div>
        </div>
      </div>
      <div className=" mt-10">
        <img src={image} alt="" className="w-full bg-bg2" />
      </div>
    </div>
  );
}

const readers = [
  "ean_reader",
  "ean_8_reader",
  "upc_reader",
  "upc_e_reader",
  "code_128_reader",
  "code_39_reader",
  "code_39_vin_reader",
  "codabar_reader",
  "i2of5_reader",
];

// const ean = ["ean_reader", "ean_8_reader"];
// const upc = ["upc_reader", "upc_e_reader"];
// const codes = ["code_128_reader","code_39_reader","code_39_vin_reader",]
// const other = ["codabar_reader","i2of5_reader"]
// const  readers =  [...ean, ...upc, ...codes, ...other]
