"use client";

export default function Test() {
  return (
    <div>
      {window.document.cookie} <br />
      {window?.BarcodeDetector?.name}
    </div>
  );
}
