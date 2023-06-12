"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { Button, IconButton } from "../(component)/(styled)/button";

export default function BarcodeScanner({ lang, onDetect, onError, onClose, cls }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const ctx = canvasRef.current.getContext("2d");
    const video = videoRef.current;

    try {
      video.autoplay = true;
      const constraints = {
        audio: false,
        video: { facingMode: { exact: "environment" } }, // width: 1920, height: 1080,width: { min: 1280 },
        height: { min: 720 },
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

      video.addEventListener("canplay", (event) => video.play());
      video.addEventListener("loadeddata", (event) => check());

      const checkResult = (result) => {
        if (!result?.codeResult?.code) check();
        else {
          onDetect((result.codeResult.code + "").trim());
          stopStreams();
        }
      };

      const check = async () => {
        if (!video?.srcObject || !canvasRef.current?.toDataURL) return;
        const x = (video.videoWidth - width) / 2;
        const y = (video.videoHeight - height) / 2;

        ctx.drawImage(video, x, y, width, height, 0, 0, width, height);

        Quagga.decodeSingle(
          {
            decoder: { readers },
            src: canvasRef.current.toDataURL("image/jpeg", 1.0),
            locate: false,
            multiple: false,
          },
          checkResult
        );
      };
    } catch (error) {
      stopStreams();
      onError(`${error.name}: ${error.message}`);
    }
  };

  const stopStreams = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current?.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => stopStreams, []);

  return (
    <div
      dir="ltr"
      className={`overflow-hidden w-full h-52 sm:h-64 flex justify-center items-center w-full ${cls || ""}`}>
      <Script src="/barcode-scanner/quagga.min.js" onReady={initializeScanner}></Script>

      {onClose && (
        <IconButton
          icon="crossMark"
          onClick={() => onClose(stopStreams())}
          title="Cancel and close the modal window"
          cls="w-8 absolute top-4 right-4 hover:text-red print:hidden"
        />
      )}
      <div className="relative w-full">
        <video ref={videoRef} className="w-full bg-lbg dark:bg-cbg"></video>

        {videoRef.current?.paused && (
          <div className="absolute inset-0 w-full h-full bg-blur flex justify-center items-center">
            <Button onClick={() => videoRef.current?.play()}>{content.startBtn[lang]}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
const content = {
  permissionErr: { en: "Could not access camera.", ar: "تعذر الوصول إلى الكاميرا" },
  startBtn: { en: "Start", ar: "بدء" },
};

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
