"use client";
import { useState } from "react";

export default function Login({ a }) {
  return (
    <div className="absolute inset-0 h-[100vh] w-full">
      {/* bg-gradient-to-t from-p-c to-l-bg */}
      {/* <div className="w-full h-32  my-10 flex justify-center rounded-3xl bg-gradient-to-r from-p-c to-l-bg shadow-md"></div> */}
      <div className="w-full h-32 bg-d-bg text-p-c my-10 flex justify-center rounded-3xl lazy-c">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full">
          <defs id="SvgjsDefs3647">
            <linearGradient id="SvgjsLinearGradient3654">
              <stop id="SvgjsStop3655" stop-color="#006838" offset="0"></stop>
              <stop id="SvgjsStop3656" stop-color="#88f2c1" offset="1"></stop>
            </linearGradient>
          </defs>
          <g
            id="SvgjsG3648"
            featurekey="symbolFeature-0"
            transform="matrix(1.06623 0 0 0.816315 244.541 265.563)"
            fill="none"
            stroke="currentColor">
            <path d="m-209.8,-215.34l54.78,0m2.2,0.32c1.18,0 2.2,-1.27 2.2,-2.84l0,-43c0.88,0.27 1.23,0.42 1.86,0.42c3.71,0 6.48,-5.11 6.67,-8.45l0.1,-1.59l-0.1,0c0.01,0 0.01,-0.29 -0.02,-0.46c-0.06,-0.24 -0.17,-0.41 -0.3,-0.56l-9.24,-40.48c-0.13,-0.58 -0.55,-0.99 -1.02,-0.99l-59.52,0c-0.47,0 -0.87,0.42 -1.02,1.02l-9.11,40.35c-0.21,0.19 -0.38,0.42 -0.46,0.76c-0.03,0.14 -0.01,0.36 -0.01,0.36l-0.09,0l0.09,1.59c0.19,3.34 2.97,8.42 6.69,8.42c0.64,0 0.98,-0.13 1.86,-0.39l0,43c0,1.57 1.04,2.84 2.2,2.84m47.48,-55.46l-3.99,-40.12l6.38,0l6.64,40.12l-9.03,0zm-22.38,0l1.32,-40.12l6.12,0l1.26,40.12l-8.7,0zm-22.36,0l6.57,-40.12l6.41,0l-4.07,40.12l-8.92,0zm-0.53,35.4l0,-29.13c0.88,2.08 2.89,3.78 5.04,3.78c2.45,0 4.41,-2.21 5.56,-4.66c1.16,2.45 3.14,4.66 5.59,4.66c2.45,0 4.46,-2.21 5.61,-4.66c1.15,2.45 3.16,4.66 5.61,4.66c2.44,0 4.46,-2.21 5.61,-4.66c1.16,2.45 3.17,4.66 5.61,4.66c2.45,0 4.47,-2.21 5.62,-4.66c1.15,2.45 3.05,4.66 5.49,4.66c2.15,0 4.15,-1.7 5.04,-3.78l0,29.13l-54.77,0z" />
          </g>
        </svg>
      </div>
    </div>
  );
}
