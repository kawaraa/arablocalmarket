"use client";
import { useEffect, useRef } from "react";
import { IconButton } from "./(styled)/button";

export default function BrowserBarcodeDetecter({ lang, onDetect, onError, onClose, cls }) {
  const videoRef = useRef(document.createElement("video"));
  const canvasRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const video = videoRef.current;
    const ctx = canvasRef.current.getContext("2d");
    video.autoplay = true;

    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      const barcodeDetector = new BarcodeDetector({ formats });
      if (!barcodeDetector) throw new Error("Barcode Detector is not supported by this browser.");
      // console.log("Barcode Detector supported!");

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

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      video.addEventListener("play", () => {
        const x = (video.videoWidth - width) / 2;
        const y = (video.videoHeight - height) / 2;
        ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
      });

      const check = async () => {
        if (!video?.srcObject || !canvasRef.current) return;
        const x = (video.videoWidth - width) / 2;
        const y = (video.videoHeight - height) / 2;
        ctx.drawImage(video, x, y, width, height, 0, 0, width, height);

        const barCodes = await barcodeDetector.detect(canvasRef.current).catch((err) => console.log(err));
        if (!barCodes[0]) return check();
        onDetect((barCodes[0].rawValue + "").trim());
        stopStreams();
      };

      check();
      video.play();
    } catch (error) {
      // console.error(`${error.name}: ${error.message}`);
      stopStreams();
      if (error.message == "Permission denied") onError(content.permissionErr[lang]);
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
    <div
      dir="ltr"
      className={`overflow-hidden w-full h-52 flex justify-center items-center w-full ${cls || ""}`}>
      {onClose && (
        <IconButton
          icon="crossMark"
          onClick={() => onClose(stopStreams())}
          title="Cancel and close the modal window"
          cls="absolute top-4 right-4 hover:text-red print:hidden"
        />
      )}

      <canvas ref={canvasRef} className="w-full bg-lbg dark:bg-cbg"></canvas>
    </div>
  );
}

const content = { permissionErr: { en: "Could not access camera.", ar: "تعذر الوصول إلى الكاميرا" } };

const formats = [
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
  "itf",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  // "qr_code",
  // "aztec",
  // "data_matrix",
  // "pdf417",
  // "unknown",
];
