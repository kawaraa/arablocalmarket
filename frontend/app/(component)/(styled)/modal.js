"use client";
import Transition from "../../(layout)/transitions";
import Button from "./button";
import CloseButton from "./icon-button";
import icons from "./icons";

export default function Modal({ children, title, okBtn, open, loading, onCancel, onApprove, icon }) {
  const cls = open ? "h-full p-4 opacity-100" : "";

  return (
    <>
      <div
        className={`z9 fixed inset-0 h-0 p-0 bg-blur opacity-0 transition-opacity duration-200 ${cls}`}
        onClick={onCancel}></div>

      <Transition
        tag="section"
        base="z9 fixed left-5 bottom-10 right-5 p-4 overflow-hidden rounded-lg bg-bg dark:bg-dcbg md:min-w-[550px] md:max-w-xl md:left-1/2 md:bottom-1/2 md:-translate-x-1/2 md:translate-y-1/2"
        enter="opacity-100 md:scale-100"
        exit="opacity-0 translate-y-4 md:scale-75"
        time="200"
        open={open}
        wrapperProps={{ "aria-label": `${title} modal window`, role: "dialog", "aria-modal": "true" }}>
        <CloseButton
          icon="close"
          handler={onCancel}
          label="Cancel and close the modal window"
          cls="absolute top-5 right-5"
        />

        <div className="block bg-l-bg pb-4 md:flex justify-start">
          <div
            className={`h-12 w-12 shrink-0 p-2 mx-auto mt-1 md:mr-2 rounded-full ${
              icon === "warning" ? "bg-lb text-red" : "bg-pc text-t"
            }`}>
            {(typeof icon === "string" && icons[icon]) || icon}
          </div>
          <div className="flex-auto mt-3 text-sm text-center text-l-c md:text-left">
            <h2 className="mb-1 text-lg text-l-tc">{title}</h2>
            {children}
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <Button
            text={okBtn}
            handler={onApprove}
            loading={loading}
            cls="w-full md:w-auto justify-center py-2"
          />
        </div>
      </Transition>
    </>
  );
}
