"use client";

import { useState } from "react";
import Modal from "../../../(component)/(styled)/modal";

export default function SelectProductPopup({ lang, open, onAddProduct, onCancel }) {
  const [item, setItem] = useState({});

  return (
    <Modal
      open={open}
      onCancel={() => onCancel(null)}
      onApprove={() => onAddProduct(item)}
      okBtn={content.addBtn[lang]}>
      Product
    </Modal>
  );
}

const content = {
  addBtn: { en: "Add", ar: "أضف" },
};
