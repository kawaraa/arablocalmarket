import React, { useEffect, useRef } from "react";
import Quagga from "quagga";
import Modal from "./(styled)/modal";

const BarcodeScanner = ({ title, open, onClose, onDetectBarcode, onError }) => {
  const videoRef = useRef(null);
  const width = 320;
  const height = 240;

  const getVideo = async () => {
    console.log(videoRef);
    try {
      // const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
      // if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      // const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // videoRef.current.srcObject = stream;
      // videoRef.current.play();
      // const canvas = document.createElement("canvas");
      // const ctx = canvas.getContext("2d");
      // canvas.width = width;
      // canvas.height = height;

      const check = (period) => {
        if (!videoRef.current?.srcObject) return;
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        Quagga.decodeSingle(
          {
            decoder: { readers: ["ean_reader"] },
            locate: true,
            src: canvas.toDataURL("image/png"),
          },
          (res) => (res?.codeResult?.code ? onDetectBarcode(res.codeResult.code) : setTimeout(check, period))
        );
      };

      window.Quagga.onProcessed(console.log);
      window.Quagga.onDetected(console.log);
      window.Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoRef, // Or '#yourElement' (optional)
            // target: document.querySelector("#yourElement"),
          },
          decoder: { readers: ["code_128_reader"] },
        },
        (err) => {
          if (err) return console.log(err);
          console.log("Initialization finished. Ready to start");
          window.Quagga.start();
        }
      );

      // check(1000);
    } catch (error) {
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
    if (videoRef && open) getVideo();
  }, [videoRef]);

  return (
    <Modal title={title} open={open} onCancel={() => onClose(stopStreams())}>
      <div className="text-center">
        <video id="yourElement" ref={videoRef} style={{ width: "100%" }} />
      </div>
    </Modal>
  );
};

export default BarcodeScanner;
