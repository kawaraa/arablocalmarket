"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./(styled)/button";

export default function BrowserBarcodeDetecter({ onDetect, onError, onClose, cls }) {
  const [camera, setCamera] = useState(null);
  const videoRef = useRef(document.createElement("video"));
  const canvasRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const ctx = canvasRef.current.getContext("2d");
    videoRef.current.autoplay = true;

    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      const barcodeDetector = new BarcodeDetector({ formats });
      if (barcodeDetector) console.log("Barcode Detector supported!");
      else throw new Error("Barcode Detector is not supported by this browser.");

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

      videoRef.current.srcObject = stream;
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      videoRef.current.addEventListener("play", () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Flip the video only on mobile / touch devices.
        if (constraints.video !== true) {
          ctx.translate(videoRef.current.videoWidth, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(videoRef.current, 0, 0);
      });

      const check = async () => {
        if (!videoRef.current?.srcObject || !canvasRef.current) return;
        ctx.drawImage(videoRef.current, 0, 0);
        const barCodes = await barcodeDetector.detect(canvasRef.current).catch((err) => console.log(err));
        if (!barCodes[0]) return check();
        onDetect(barCodes[0].rawValue);
        stopStreams();
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
    console.log(videoRef.current);
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current?.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
    }
  };

  useEffect(() => {
    initializeScanner();
    return stopStreams;
  }, []);

  return (
    <div className={`overflow-hidden w-full h-52 flex justify-center items-center w-full ${cls || ""}`}>
      {onClose && (
        <IconButton
          icon="close"
          handler={() => onClose(stopStreams())}
          label="Cancel and close the modal window"
          cls="absolute top-4 right-4 print:hidden"
        />
      )}

      <canvas ref={canvasRef} className="w-full bg-lbg dark:bg-cbg mirror"></canvas>
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
