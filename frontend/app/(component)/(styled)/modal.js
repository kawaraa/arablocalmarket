"use client";
import Transition from "../../(layout)/transitions";
import { Button, IconButton } from "./button";
import SvgIcon from "./svg-icon";

export default function Modal({ tag, title, okBtn, open, loading, onCancel, onApprove, icon, ...p }) {
  const cls = open ? "!h-full p-4 opacity-100" : "";

  return (
    <>
      <div
        className={`z-9 fixed inset-0 h-0 p-0 bg-blur opacity-0 transition-opacity duration-200 ${cls}`}
        onClick={onCancel}></div>

      {/* look into dialog tag */}
      <Transition
        Tag={tag || "article"}
        base="z-9 fixed left-5 bottom-10 right-5 p-4 overflow-hidden rounded-lg bg-bg dark:bg-dcbg md:min-w-[550px] md:max-w-xl md:left-1/2 md:bottom-1/2 md:-translate-x-1/2 md:translate-y-1/2 print:top-0 print:text-t"
        enter="opacity-100 md:scale-100"
        exit="opacity-0 translate-y-4 md:scale-75"
        time="300"
        open={open}
        aria-label={`${title} modal window`}
        role="dialog"
        aria-modal="true"
        {...p}>
        {onCancel && (
          <IconButton
            icon="close"
            handler={onCancel}
            label="Cancel and close the modal window"
            cls="absolute top-4 right-4 print:hidden"
          />
        )}
        <div className="block py-4 md:flex justify-start">
          {icon && (
            <div
              className={`h-12 w-12 shrink-0 p-2 mx-auto mt-1 md:mr-2 rounded-full ${
                icon === "warning" ? "bg-lb text-red" : "bg-pc text-t"
              }`}>
              {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
            </div>
          )}

          <div className="flex-auto mt-3 md:text-left">
            <h2 className="mb-1 text-lg text-center print:text-3xl print:font-semibold">{title}</h2>
            {p.children}
          </div>
        </div>

        {onApprove && (
          <div className="pt-3 flex justify-end">
            <Button
              type={tag == "form" ? "submit" : ""}
              text={okBtn}
              handler={onApprove}
              loading={loading}
              cls="print:hidden w-full md:w-auto justify-center py-2"
            />
          </div>
        )}
      </Transition>
    </>
  );
}
