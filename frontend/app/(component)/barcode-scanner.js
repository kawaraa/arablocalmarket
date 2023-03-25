"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function BarcodeScanner({ onDetect, onError }) {
  const [borderSize, setBorderSize] = useState([]);
  const videoRef = useRef(null);
  const width = 500;
  const height = 250;

  const [image, setImage] = useState("");

  const initializeScanner = async () => {
    if (videoRef.current?.srcObject) return;
    try {
      const constraints = {
        audio: false,
        video: { width: 1920, height: 1080, facingMode: { exact: "environment" } },
      };

      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const checkResult = (result) => {
        if (!result?.codeResult?.code) setTimeout(check, 50);
        else {
          onDetect(result.codeResult.code);
          stopStreams();
        }
      };

      const check = () => {
        if (!videoRef.current?.srcObject) return;
        const x = (videoRef.current.videoWidth - width) / 2;
        const y = (videoRef.current.videoHeight - height) / 2;
        ctx.drawImage(videoRef.current, x, y, width, height, 0, 0, width, height);

        (height / videoRef.current.videoHeight) * 100;
        if (!borderSize[0]) {
          setBorderSize([
            (width / videoRef.current.videoWidth) * 100,
            (height / videoRef.current.videoHeight) * 100,
          ]);
        }
        // console.log(videoRef.current.naturalWidth);
        // console.log(videoRef.current.naturalHeight);
        // console.log(videoRef.current.style.width, videoRef.current.style.height);

        // canvas.toDataURL("image/jpeg", 1.0);
        setImage(canvas.toDataURL());
        Quagga.decodeSingle(
          { decoder: { readers }, src: canvas.toDataURL(), locate: false, multiple: false },
          checkResult
        );
      };

      check();
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
          <div className={`w-[${borderSize[0] || 0}%] h-[${borderSize[1] || 0}%] border duration-150`}></div>
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
