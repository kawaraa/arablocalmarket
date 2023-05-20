"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Profile from "./(component)/profile";
import Account from "./(component)/account";
import shdCnt from "../(layout)/json/shared-content.json";
import { request } from "../(service)/api-provider";
import { Button } from "../(component)/(styled)/button";
import Modal from "../(component)/(styled)/modal";

export default function Settings(props) {
  const router = useRouter();
  const { lang, user, updateUser, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const handleUpdate = async (data) => {
    try {
      if (!data.address && !data.password) setAppLoading(true);

      if (data.password) await request("updatePassword", "POST", data);
      else await request("updateUser", "PUT", { query: user.id, body: data });

      if (!data.address && !data.password) setAppLoading(false);
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
    } catch (error) {
      setAppLoading(false);
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await request("updateUser", "DELETE", { query: user.id });
      window.localStorage.removeItem("accessToken");
      setLoading(false);
      setConfirmDeletion(false);
      setTimeout(() => updateUser(null), 200);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    document.title = "Admin Settings - ALM";
  }, []);

  if (user?.loading) return null;
  else if (!user) return router.replace("/signin");
  return (
    <>
      <article className="mt-4 max-w-md mx-auto">
        <h1 className="text-2xl mb-6">{content.h1[lang]}</h1>
        <Profile lang={lang} {...user} handleUpdate={handleUpdate} setMessage={addMessage} />
        <Account lang={lang} {...user} handleUpdate={handleUpdate} />

        {/* <div className="text-center pt-10">
          <Button
            icon="bin"
            onClick={() => setConfirmDeletion(true)}
            cls="!text-sm !bg-bg3 !text-bg"
            iconCls="w-5">
            {content.deleteBtn[lang]}
          </Button>
        </div> */}
      </article>

      <Modal
        title={content.confirmTitle[lang]}
        okBtn={shdCnt.yes[lang]}
        onCancel={() => setConfirmDeletion(false)}
        onApprove={handleDeleteAccount}
        open={confirmDeletion}
        loading={loading}>
        <p className="my-5">
          <strong>{content.confirmP[lang][0]} </strong>
          {content.confirmP[lang][1]}
        </p>
        <p className="my-5">{content.confirmP[lang][2]}</p>
      </Modal>
    </>
  );
}

const content = {
  h1: { en: "Settings", ar: "إعدادات" },
  deleteBtn: { en: "Delete account", ar: "حذف الحساب" },
  confirmTitle: { en: "Account delete confirmation", ar: "تأكيد حذف الحساب" },
  confirmP: {
    en: [
      "Please note:",
      "Deleting the account will also delete all the stores and all products",
      "Are you sure you want to delete this your account?",
    ],
    ar: [
      "يرجى الملاحظة:",
      "سيؤدي حذف الحساب أيضًا إلى حذف جميع المتاجر وجميع المنتجات",
      "هل أنت متأكد أنك تريد حذف هذا حسابك؟",
    ],
  },
};
