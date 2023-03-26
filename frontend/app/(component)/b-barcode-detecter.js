"use client";
import { useEffect, useRef } from "react";
import { IconButton } from "./(styled)/button";

export default function BrowserBarcodeDetecter({ onDetect, onError, onClose, cls }) {
  const videoRef = useRef(document.createElement("video"));
  const canvasRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    video.autoplay = true;

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

      if (!video?.srcObject) {
        if (navigator.mediaDevices.getUserMedia) {
          video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        } else {
          video.srcObject = await new Promise((res, rej) => navigator.getUserMedia(constraints, res, rej));
        }
      }

      canvas.width = width;
      canvas.height = height;

      video.addEventListener("loadedmetadata", (event) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      });

      video.addEventListener("play", () => {
        // Flip the video only on mobile / touch devices.
        if (constraints.video !== true) {
          ctx.translate(video.videoWidth, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(video, 0, 0);
      });

      const check = async () => {
        if (!video?.srcObject || !canvas) return;
        ctx.drawImage(video, 0, 0);
        const barCodes = await barcodeDetector.detect(canvas).catch((err) => console.log(err));
        if (!barCodes[0]) return check();
        onDetect(barCodes[0].rawValue);
        stopStreams();
      };

      check();
      video.play();
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      stopStreams();
      if (error.message == "Permission denied") onError("Can not access camera.");
      else onError(error.message);
    }
  };

  const stopStreams = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current?.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
    }
    videoRef.current.srcObject = null;
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
          cls="absolute top-4 right-4 hover:text-red print:hidden"
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
