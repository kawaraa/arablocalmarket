"use client";
import { useEffect, useState } from "react";
import { request } from "../(service)/api-provider";
import { Button, IconButton } from "../(component)/(styled)/button";
import Modal from "../(component)/(styled)/modal";
import { InputField } from "../(component)/(styled)/inputs";
import shdCnt from "../(layout)/json/shared-content.json";

export default function Payout({ lang, bankAccount, showMessage }) {
  const [showForm, setShowForm] = useState(false);
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddingBank = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {};
    try {
      new FormData(e.target).forEach((value, key) => (data[key] = value));
      const { bankName } = await request("bank", "POST", { data });
      const info = bankName.split(":");
      setBankId(info[0]);
      setBankName(info[1]);

      setShowForm(false);
      showMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      showMessage({ type: "error", text: error.message, duration: 5 });
    }
    setLoading(false);
  };

  const handleDeleteBank = async () => {
    try {
      await request("bank", "DELETE", { query: `/${bankId}` });
      setBankId("");
      setBankName("");
      showMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      showMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    if (bankAccount) {
      const info = bankAccount.split(":");
      setBankId(info[0]);
      setBankName(info[1]);
    }
  }, [bankAccount]);

  return (
    <>
      <section id="payout">
        <h3 className="text-lg font-semibold mb-2 mt-6">{content.h[lang]}</h3>

        {bankName ? (
          <div className="flex items-center">
            <p className="">{bankName}</p>
            <IconButton onClick={handleDeleteBank} icon="bin" cls="w-8 hover:text-bg3" />
          </div>
        ) : (
          <div className="flex items-center">
            <p className="text-sm opacity-60">{content.noPayout[lang]}</p>
            <span className="w-3 h-3"></span>
            <Button
              icon="plus"
              onClick={() => setShowForm(true)}
              loading={loading}
              cls="!py-1 !px-2 !text-sm">
              {content.adBtn[lang]}
            </Button>
          </div>
        )}
      </section>

      <Modal
        tag="form"
        title={shdCnt.bankInfo.title[lang]}
        open={showForm}
        okBtn={shdCnt.create[lang]}
        onSubmit={handleAddingBank}
        onApprove={() => {}}
        onCancel={() => setShowForm(false)}
        loading={loading}>
        <div className="p-5">
          <p className="mb-5 text-xs text-orange">{content.terms[lang]}</p>
          <InputField
            type="text"
            name="accountHolder"
            label={shdCnt.bankInfo.holder[lang]}
            placeholder={shdCnt.ex[lang] + " John Doe"}
            required
            full
            cls="flex-col my-1"
          />
          <InputField
            type="text"
            name="iban"
            label={shdCnt.bankInfo.number[lang]}
            placeholder={shdCnt.ex[lang] + " FI21 1234 5698 7654 3210"}
            required
            full
            cls="flex-col my-1"
          />
          <InputField
            type="text"
            name="bic"
            label={shdCnt.bankInfo.bic[lang]}
            // title="Bank Identifier Number" // Todo: Add a tooltip
            placeholder={shdCnt.ex[lang] + " BOHIUS77"}
            required
            full
            cls="flex-col my-1"
          />
        </div>
      </Modal>
    </>
  );
}

const content = {
  // Setup Payout bank account
  h: { en: "Payout bank account", ar: "طريقة تلقي المدفوعات" },
  noPayout: { en: "You don't have any banking information", ar: "ليس لديك أي معلومات مصرفية" },
  adBtn: { en: "Add a bank", ar: "أضف البنك" },
  terms: {
    en: "Please make sure this bank can receive money in Euro currency (€) so arrive without any issue",
    ar: "يرجى التأكد من أن هذا البنك يمكنه تلقي الأموال بعملة اليورو (€) حتى تصل دون أي مشكلة",
  },
};
