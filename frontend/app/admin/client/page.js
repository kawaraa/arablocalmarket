"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import Link from "next/link";
import { request } from "../../(service)/api-provider";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { copyText } from "../../(service)/utilities";
import shdCnt from "../../(layout)/json/shared-content.json";
import Table, { trClass, tdClass } from "../../(component)/table";
import { Button } from "../../(component)/(styled)/button";

export default function Client({}) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [details, setDetails] = useState({ totalEarnings: 0, paid: 0, pending: 0, payable: 0 });
  const [affiliates, setAffiliates] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const showOne = () => addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });

  const getAffiliates = async () => {
    const query = `?pagination[start]=${affiliates.length}&pagination[limit]=20&sort=createdAt:desc`;
    try {
      const { data, meta } = await request("affiliate", "GET", { query });
      setAffiliates(affiliates.concat(data));
      setLoadMore(!!data[0] || affiliates.length < meta.pagination.total);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
    else if (user && !user?.loading) {
      getAffiliates();

      request("invoice", "GET", { query: "/earnings" })
        .then(setDetails)
        .catch(() => null);
    }
  }, [user]);

  if (!user || user.loading) return null;

  const referralLink = `${window.origin}/pricing?referral=${user.id}`;
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold">{content.h1[lang]}</h1>
      <p className="text-sm">{content.h1P[lang]}</p>

      <div className="flex flex-col sm:flex-row items-center my-5 card p-3 rounded-md">
        <strong>{content.referral[lang]}:</strong>
        <span className="w-2 h-2"></span>
        <button
          onClick={() => copyText(referralLink, showOne)}
          className="flex items-center p-1 text-sm font-semibold text-link bg-lbg dark:bg-dcbg rounded-md">
          <span className="w-3"></span>
          {referralLink}
          <span className="w-5 mx-2">
            <SvgIcon name="copy" />
          </span>
        </button>
      </div>

      {details?.payable > 0 && !user.bankAccount && (
        <div dir="auto" className="mb-5 mt-3 px-3 py-1 bg-bg1 text-xs text-t rounded-md">
          <p className="">{content.warn[lang][0]}.</p>
          <p className="">
            {content.warn[lang][1]}{" "}
            <Link
              href="/settings/#payout"
              className="font-semibold hover:text-bg underline underline-offset-4 transition">
              {content.warn[lang][2]}
            </Link>
            .
          </p>
        </div>
      )}

      <Table lang={lang} header={content.detailsHeader.map((h) => h[lang])} cls="mb-10" hCls="!py-1">
        <tr className={trClass + " text-xl font-semibold"}>
          <td className={tdClass + " text-black"}>€{details.totalEarnings}</td>
          <td className={tdClass + " text-blue"}>€{details.paid}</td>
          <td className={tdClass + " text-orange"}>€{details.pending}</td>
          <td className={tdClass + " text-green"}>€{details.payable}</td>
        </tr>
      </Table>

      <Table lang={lang} header={content.tableHeader.map((h) => h[lang])}>
        {affiliates.map((aff, i) => (
          <tr className={trClass} key={i}>
            <td className={tdClass}>
              <Link href={`/store/${aff.store.id}`} className="text-link">
                {aff.store.name}
              </Link>
            </td>
            <td className={tdClass}>{new Date(aff.createdAt).toLocaleDateString("nl")}</td>
            <td className={tdClass}>€{aff.price}</td>
            <td className={tdClass}>€{(aff.price / 100) * aff.percentage}</td>
          </tr>
        ))}

        {!!affiliates[0] && (
          <tr className={trClass + " font-semibold"}>
            <td className={`${tdClass} text-sm ${lang == "en" ? " text-right" : " text-left"}`} colSpan={3}>
              {content.total[lang]}
            </td>
            <td className={tdClass + " text-lg"}>
              €{affiliates.reduce((total, aff) => total + (aff.price / 100) * aff.percentage, 0)}
            </td>
          </tr>
        )}
      </Table>

      {loadMore && !!affiliates[0] && (
        <div className="text-center mt-5">
          <Button onClick={getAffiliates} cls="!py-1 !px-2 text-sm">
            {content.loadBtn[lang]}
          </Button>
        </div>
      )}
    </div>
  );
}

const content = {
  h1: { en: "Referred clients", ar: "العملاء المحالين" },
  h1P: {
    en: "Here you will find all that clients have joined ArabLocalMarket through your referral link",
    ar: "ستجد هنا جميع العملاء الذين انضموا إلى ArabLocalMarket من خلال رابط الإحالة الخاص بك",
  },
  referral: { en: "Your Referral / Affiliate link", ar: "رابط الإحالة الخاص بك" },
  warn: {
    en: [
      "Please add your banking details to be able to transfer your earnings",
      "You can add your banking details in your",
      "account settings",
    ],
    ar: [
      "الرجاء إضافة تفاصيل المصرفية الخاصة بك حتى تتمكن من سحب أرباحك",
      "يمكنك إضافة التفاصيل المصرفية الخاصة بك في",
      "إعدادت الحساب",
    ],
  },
  detailsHeader: [
    { en: "Total earnings", ar: "مجموع الأرباح" },
    { en: "Paid", ar: "المدفوع" },
    { en: "Pending", ar: "معلق" },
    { en: "Payable", ar: "قابل لدفع" },
  ],
  tableHeader: [
    { en: "Store", ar: "المتجر" },
    { en: "Since", ar: "منذ" },
    { en: "Subscription", ar: "الاشتراك" },
    { en: "Profit", ar: "أرباح" },
  ],
  total: { en: "Total monthly profit", ar: "إجمالي الأرباح الشهرية" },
  loadBtn: { en: "Load more", ar: "تحميل المزيد" },
};
