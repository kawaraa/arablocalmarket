"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { IconButton } from "./(styled)/button";

export default function BarcodeScanner({ onDetect, onError, onClose, cls }) {
  const [camera, setCamera] = useState(null);
  const [borderSize, setBorderSize] = useState([]);
  const canvasRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const video = document.createElement("video");
    const canvas1 = document.createElement("canvas");

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvasRef.current.getContext("2d");
    video.autoplay = true;
    video.autoplay = true;

    try {
      const constraints = {
        audio: false,
        video: { width: 1920, height: 1080, facingMode: { exact: "environment" } },
      };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      let stream = null;
      if (camera) stream = camera;
      else {
        if (navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } else {
          stream = await new Promise((res, rej) => navigator.getUserMedia(constraints, res, rej));
        }
        setCamera(stream);
      }

      video.srcObject = stream;

      canvas1.width = width;
      canvas1.height = height;

      video.addEventListener("play", function () {
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
        ctx2.drawImage(video, 0, 0);

        (function loop() {
          if (!video.paused && !video.ended) {
            ctx2.drawImage(video, 0, 0);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
          }
        })();
      });

      // video.addEventListener("seeked", () => ctx2.drawImage(video, 0, 0));

      const checkResult = (result) => {
        if (!result?.codeResult?.code) setTimeout(check, 50);
        else {
          onDetect(result.codeResult.code);
          stopStreams();
        }
      };

      const check = () => {
        if (!video?.srcObject) return;
        const x = (video.videoWidth - width) / 2;
        const y = (video.videoHeight - height) / 2;
        // ctx2.drawImage(video, 0, 0);
        ctx1.drawImage(video, x, y, width, height, 0, 0, width, height);

        (height / video.videoHeight) * 100;
        if (!borderSize[0]) {
          setBorderSize([(width / video.videoWidth) * 100, (height / video.videoHeight) * 100]);
        }
        // canvas.toDataURL("image/jpeg", 1.0);
        Quagga.decodeSingle(
          { decoder: { readers }, src: canvas1.toDataURL(), locate: false, multiple: false },
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
    if (camera) {
      const tracks = camera.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
    }
  };

  useEffect(() => stopStreams, []);

  return (
    <div className={`overflow-hidden w-full h-52 flex justify-center items-center w-full ${cls || ""}`}>
      <Script src="/barcode-scanner/quagga.min.js" onReady={initializeScanner}></Script>

      {onClose && (
        <IconButton
          icon="close"
          handler={() => onClose(stopStreams())}
          label="Cancel and close the modal window"
          cls="absolute top-4 right-4 print:hidden"
        />
      )}
      <div className="relative">
        {/* <video ref={videoRef} className="w-full bg-lbg dark:bg-cbg mirror" /> */}
        {/* <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="mirror"></video> */}
        <canvas ref={canvasRef} className="mirror w-full"></canvas>
        <div
          className={`absolute top-1/2 left-1/2 w-[${borderSize[0] || 0}%] h-[${
            borderSize[1] || 0
          }%] border-4 border-red -translate-x-1/2 -translate-y-1/2`}></div>
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
