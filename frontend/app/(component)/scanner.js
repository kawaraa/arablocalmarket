"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
// import Quagga from "quagga";

export default function Scanner({ title, open, onClose, onDetectBarcode, onError }) {
  const videoRef = useRef(null);
  const width = 320;
  const height = 240;

  const initializeScanner = async () => {
    console.log(videoRef);

    const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
    if (!("ontouchstart" in document.documentElement)) constraints.video = true;

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    const check = (period) => {
      if (!videoRef.current?.srcObject) return;
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      Quagga.decodeSingle(
        {
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "code_128_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader",
            ],
          },
          // locate: true,
          src: canvas.toDataURL("image/png"),
        },
        (res) => {
          //   console.log("Result: \n\n ", res, "\n\n");
          res?.codeResult?.code
            ? onDetectBarcode(res.codeResult.code)
            : setTimeout(() => check(period), period);
        }
      );
    };
    check(2000);

    // console.log(Quagga);
    // Quagga.onProcessed(console.log);
    // Quagga.onDetected(console.log);
    // Quagga.init(
    //   {
    //     inputStream: {
    //       name: "Live",
    //       type: "LiveStream",
    //       target: videoRef, // Or '#yourElement' (optional)
    //       //   target: document.querySelector("#yourElement"),
    //     },
    //     decoder: { readers: ["code_128_reader"] },
    //   },
    //   (err) => {
    //     if (err) return console.log(err);
    //     console.log("Initialization finished. Ready to start");
    //     // window.Quagga.start();
    //   }
    // );
  };

  //   useEffect(() => {
  //     if (videoRef) initializeScanner();
  //   }, [videoRef]);

  return (
    <div className="text-center bg-red min-h-44 w-full">
      <Script src="/barcode-scanner/quagga.js" onLoad={() => initializeScanner()}></Script>
      <video ref={videoRef} id="yourElement" style={{ width: "100%" }} />
    </div>
  );
}
