"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import Footer from "../(layout)/footer";
import { Select, Textarea } from "../(component)/(styled)/inputs";
import { Button } from "../(component)/(styled)/button";
import shdCnt from "../(layout)/json/shared-content.json";
import { request } from "../(service)/api-provider";

export default function Contact() {
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!user) throw new Error(shdCnt.contactErr[lang]);
      const data = {};
      new FormData(e.target).forEach((value, key) => (data[key] = value));
      await request("contact", "POST", { data });
      e.target.reset();
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = content.h1[lang] + " - ALM";
  }, []);

  return (
    <>
      <form onSubmit={handleSend} className="max-w-xl card rounded-lg mx-auto my-20 p-5">
        <h1 className="text-2xl text-center font-bold mb-10">{content.h1[lang]}</h1>
        <Select
          name="subject"
          label={<span className="inline-block min-w-[100px]">{content.labels[0][lang]}</span>}
          cls="flex flex-col sm:flex-row sm:items-center"
          inCls="flex-1 rounded-md">
          {content.subjects.map((s, i) => (
            <option value={s[lang]} key={i}>
              {s[lang]}
            </option>
          ))}
        </Select>

        <Textarea
          required
          name="Message"
          label={<span className="inline-block min-w-[90px]">{content.labels[1][lang]}</span>}
          cls="mt-8 flex flex-col sm:flex-row "
        />
        <div className="text-center mt-10">
          <Button type="submit" loading={loading} cls="w-full sm:w-auto">
            {content.btn[lang]}
          </Button>
        </div>
      </form>

      <Footer lang={lang} />
    </>
  );
}

const content = {
  h1: { en: "Contact us", ar: "تواصل معنا" },
  labels: [
    { en: "Subject", ar: "الموضوع" },
    { en: "Message", ar: "الرسالة" },
  ],
  btn: { en: "Send", ar: "إرسال" },
  subjects: [
    { en: "General Inquiry", ar: "استفسار عام" },
    { en: "Customer Support", ar: "دعم العملاء" },
    { en: "Report a Bug or Technical Issue", ar: "الإبلاغ عن خطأ أو مشكلة فنية" },
    { en: "Feedback or Suggestions", ar: "ملاحظات أو اقتراحات" },
    { en: "Partnership Opportunities", ar: "فرص الشراكة" },
    { en: "Collaboration or Sponsorship", ar: "التعاون أو الرعاية والكفالة" },
    { en: "Media or Press", ar: "وسائل الإعلام أو الصحافة" },
    { en: "Employment or Careers", ar: "العمل أو الوظائف" },
    { en: "Marketing or Advertising", ar: "تسويق أو دعاية" },
    { en: "Request for Quote", ar: "طلب للحصول على سعر خاص" },
    { en: "Complaint or Dispute", ar: "شكوى أو نزاع" },
    { en: "Privacy Concerns", ar: "مخاوف الخصوصية" },
    { en: "Product Support", ar: "دعم المنتجات" },
    { en: "Billing and Payment", ar: "الفواتير والدفع" },
    { en: "Account Assistance", ar: "مساعدة الحساب" },
    { en: "Job Application", ar: "طلب وظيفي" },
    { en: "Other", ar: "شيء آخر" },
  ],
};
