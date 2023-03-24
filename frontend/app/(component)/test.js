// import React, { useEffect, useRef } from "react";
// import { message, Modal } from "antd";
// import Quagga from "quagga";

// const BarcodeScanner = ({ visibility, setVisibility, onDetectBarcode }) => {
//   const videoRef = useRef(null);
//   const width = 320;
//   const height = 240;

//   const getVideo = async () => {
//     try {
//       const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
//       if (!("ontouchstart" in document.documentElement)) constraints.video = true;

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = width;
//       canvas.height = height;

//       const check = (period) => {
//         if (!videoRef.current?.srcObject) return;
//         ctx.drawImage(videoRef.current, 0, 0, width, height);

//         Quagga.decodeSingle(
//           {
//             decoder: { readers: ["ean_reader"] },
//             locate: true,
//             src: canvas.toDataURL("image/png"),
//           },
//           (res) => (res?.codeResult?.code ? onDetectBarcode(res.codeResult.code) : setTimeout(check, period))
//         );
//       };

//       check(2000);
//     } catch (error) {
//       if (error.message == "Permission denied") message.error("Can not access camera.");
//       else message.error(error.message);
//       setVisibility(false);
//       document.querySelector(".ant-modal-root")?.remove();
//     }
//   };

//   const stopStreams = () => {
//     if (videoRef.current?.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
//       videoRef.current.srcObject = null;
//       setVisibility(false);
//     }
//   };

//   useEffect(() => {
//     if (!visibility) stopStreams();
//     else if (visibility && videoRef) getVideo();
//   }, [visibility, videoRef]);

//   return (
//     <Modal title="Barcode scanner" visible={visibility} destroyOnClose footer={null} onCancel={stopStreams}>
//       <div style={{ textAlign: "center" }}>
//         <video ref={videoRef} style={{ width: "100%" }} />
//       </div>
//     </Modal>
//   );
// };

// export default BarcodeScanner;
