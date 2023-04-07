"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import SvgIcon from "../../(component)/(styled)/svg-icon";

export default function Checkout({ params, searchParams }) {
  const router = useRouter();
  const { lang } = useContext(AppSessionContext);
  const page = params.result;

  if (!(page in content)) {
    router.replace("/");
    return null;
  }

  return (
    <div>
      <article className="py-8">
        <div
          className={`w-10 h-10 mx-auto mt-10 text-[50px] rounded-full text-bg ${
            page == "error" ? "bg-red p-2" : " bg-green p-1"
          }`}>
          <SvgIcon name={page == "error" ? "crossMark" : "checkMark"} />
        </div>

        <h3 className="mt-10 mb-2 text-lg font-medium text-center">{content[page].h1[lang]}</h3>
        <p className="mt-5 text-center">{content[page].p[lang][0]}</p>
        {page == "success" ? (
          <>
            <p className="text-center my-2">
              <strong>{content[page].p[lang][1]}</strong>
              <span>{content[page].p[lang][2]}</span>
            </p>
            <p className="text-center">{content[page].p[lang][3]}</p>
          </>
        ) : (
          <p className="text-center">{content[page].p[lang][1]}</p>
        )}
      </article>
    </div>
  );
}
// Please note:
// if you chose pay on delivery and the delivery man can find you or you don't come to collect your order, you will be baned after 3 times
const content = {
  success: {
    h1: {
      en: "Congrats! You order has been received, thank you for using ArabLocalMarket.com",
      ar: "تهاني! لقد تم استلام طلبك ، شكرًا لك على استخدام ArabLocalMarket.com",
    },

    p: {
      en: [
        "You will receive an confirmation Email, SMS or via app notification in a few mins",
        "Please note: ",
        "If you chose to pay on delivery, make sure you stay at the address you provided so the delivery man can find you, if the delivery man can not find you, and you don't come to collect your order or you don't showup, you will be baned from ordering with on delivery pay until you sign in",
        "If you have already paid, and the delivery man can not find your address, the store owner will refund your money if you don't pick up your order at the store within 12 hours",
      ],
      ar: [
        "ستتلقى رسالة تأكيد بالبريد الإلكتروني أو رسالة نصية قصيرة أو عبر إشعار التطبيق في غضون دقائق قليلة",
        "يرجى الملاحظة:",
        "إذا اخترت الدفع عند التسليم ، فتأكد من البقاء على العنوان الذي قدمته حتى يتمكن عامل التوصيل من العثور عليك ، إذا لم يتمكن عامل التوصيل من العثور عليك ، ولم تأت لاستلام طلبك أو لم تحضر ، سيتم منعك من الطلب باستخدام الدفع عند التسليم حتى تقوم بتسجيل الدخول",
        "إذا كنت قد دفعت بالفعل ، ولم يتمكن رجل التوصيل من العثور على عنوانك ، فسيعيد مالك المتجر أموالك إذا لم تستلم طلبك في المتجر خلال 12 ساعة",
      ],
    },
  },
  error: {
    h1: {
      en: "Failed! Payment or order has not been confirmed, please try again",
      ar: "فشل! لم يتم تأكيد الدفع أو الطلب ، يرجى المحاولة مرة أخرى",
    },
    p: {
      en: ["Please make sure you entered you information correctly"],
      ar: ["من فضلك تأكد من انك ادخال المعلومات الخاصة بك بشكل صحيح"],
    },
  },
};
