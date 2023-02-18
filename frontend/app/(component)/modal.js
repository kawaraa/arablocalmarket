"use client";
import Transition from "../(layout)/transitions";
import Button from "./(styled)/button";
import CloseButton from "./(styled)/close-button";
import icons from "./(styled)/icons";

export default function Modal({ children, title = "Warning", okBtn = "Ok", open, onCancel, onApprove }) {
  const cls = open ? "h-full p-4 opacity-100" : "";

  return (
    <>
      <div
        className={`z9 fixed inset-0 h-0 p-0 bg-blur opacity-0 transition-opacity ${cls}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onCancel}></div>

      <Transition
        tag="section"
        base="z9 fixed left-5 bottom-10 right-5 p-4 overflow-hidden rounded-lg bg-l-bg md:min-w-[550px] md:max-w-xl md:left-[50%] md:bottom-[50%] md:translate-x-[-50%] md:translate-y-[50%]"
        enter="opacity-100 translate-y-0 md:scale-100"
        exit="opacity-0 translate-y-4 md:translate-y-0 md:scale-75"
        time="200"
        open={open}>
        <CloseButton icon="close" handler={onCancel} cls="absolute top-5 right-5" />

        <div className="block bg-l-bg pb-4 md:flex justify-start">
          <div className="h-12 w-12 shrink-0 p-3 mx-auto mt-1 md:mr-2 rounded-full bg-red text-[#ff4995]">
            {icons.warningTriangular}
          </div>
          <div className="mt-3 text-sm text-center text-l-c md:text-left">
            <h2 className="mb-1 text-lg text-l-tc">{title}</h2>
            {children}
          </div>
        </div>
        <div className="pt-3 flex justify-end">
          <Button handler={onApprove} cls="w-full md:w-auto justify-center py-2">
            {okBtn}
          </Button>
        </div>
      </Transition>
    </>
  );
}
