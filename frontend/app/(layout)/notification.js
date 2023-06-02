"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import Dropdown from "../(component)/(styled)/dropdown";
import SvgIcon from "../(component)/(styled)/svg-icon";
import EmptyState from "../(component)/(styled)/empty-state";
import { Button } from "../(component)/(styled)/button";
import { useRouter } from "next/navigation";

export default function Notification() {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const translateNotification = (note) => {
    const str = content.notifications[note.type][lang];
    const key = Object.keys(note.meta || {}).find((k) => str.includes(k));
    return !key ? str : str.replace(key, note.meta[key]);
  };

  const handleMarkSeen = (note) => {
    if (!note.seen) {
      request("notification", "PUT", { query: `/${note.id}`, body: { seen: true } }).catch(console.log);
      const copy = [...notifications];
      const index = copy.findIndex(({ id }) => id == note.id);
      copy[index].seen = true;
      setNotifications(copy);
      refresh();
    }
    if (note.meta?.path) router.push(note.meta.path);
  };

  const getNotification = async (e) => {
    setLoading(true);
    try {
      const query = `?filters[seen][$not]=true&pagination[start]=${notifications.length}&pagination[limit]=10&sort=createdAt:desc`;
      const { data } = await request("notification", "GET", { query });
      if (!data[0]) setDone(true);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.notifications) setNotifications(user?.notifications);
  }, [user]);

  const { unseen, refresh } = useCheckNotifications({ user, getNotification });
  return (
    <Dropdown
      event="click"
      cls="ml-2 "
      icon={
        <div className="flex">
          <span className="w-8">
            <SvgIcon name="bell" />
          </span>
          <span className="text-sm font-medium text-red -mt-1">{unseen}</span>
        </div>
      }
      title={content.dropdown[lang]}>
      {!notifications[0] ? (
        <li className="w-44">
          <EmptyState lang={lang} type="notification" />
        </li>
      ) : (
        <>
          {notifications.map((note, i) => (
            // border-lbg border-b-[1px] last:border-none
            <li
              onClick={() => handleMarkSeen(note)}
              className={`overflow-hidden block w-60 md:w-72 my-1 px-4 py-2 break-words ${
                note.seen ? "bg-cbg dark:bg-dcbg" : "text-t bg-bg1"
              } hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200`}
              key={i}>
              {translateNotification(note)}
            </li>
          ))}
          {!done && (
            <li className="text-center py-2">
              <Button onClick={getNotification} loading={loading} cls=" !py-1 !text-sm">
                {content.btn[lang]}
              </Button>
            </li>
          )}
        </>
      )}
    </Dropdown>
  );
}

function useCheckNotifications({ user, getNotification }) {
  const mountedRef = useRef(0);
  const [notification, setNotifications] = useState(0);

  const fetchContent = async () => {
    try {
      if (user && !user.loading) {
        const { unseen } = await request("notification", "GET", { query: "/unseen" });
        if (unseen > notification && getNotification) getNotification();
        setNotifications(unseen);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(fetchContent, 1000 * 30);
  };

  useEffect(() => {
    if (mountedRef.current < 1) fetchContent();
    mountedRef.current = mountedRef.current + 1;
  }, []);

  return { unseen: notification, refresh: fetchContent };
}

const content = {
  dropdown: { en: "View notifications", ar: "عرض الاشعارات" },
  btn: { en: "Show more", ar: "أظهر المزيد" },
  notifications: {
    ORDER_CREATED: { en: "You have a new order (orderNumber)", ar: "(orderNumber) لديك طلب جديد" },
    ORDER_READY: {
      en: "Your order with the number orderNumber is ready",
      ar: "طلبك رقم orderNumber أصبح جاهز",
    },
    ORDER_SENT: {
      en: "Your order with the number orderNumber is sent",
      ar: "تم إرسال طلبك رقم orderNumber",
    },
    ORDER_DELIVERED: {
      en: "Your order with the number orderNumber is delivered",
      ar: "تم تسليم طلبك رقم orderNumber",
    },
    ORDER_CANCELED: {
      en: "Your order with the number orderNumber is canceled",
      ar: "تم إلغاء طلبك رقم orderNumber",
    },
    ORDER_RETURNED: {
      //
      en: "Your order with the number orderNumber is returned",
      ar: "تم إرجاع طلبك رقم orderNumber",
    },
    REQUEST_JOIN: {
      en: "storeOwner sent you a request to join his team",
      ar: "storeOwner ارسل لك طلب الانضمام إلى فريقه",
    },
    REQUEST_REJECTED: {
      en: "userName accepted to join your store team",
      ar: "userName قبلت للانضمام إلى فريقك المتجر",
    },
    REQUEST_ACCEPTED: {
      en: "userName rejected to join your store team",
      ar: "userName رفض الانضمام إلى فريقك المتجر",
    },
    STOCK_WARN: {
      en: "productName product stock is about to finished",
      ar: "مخزون المنتج على وشك الانتهاء productName",
    },
  },
};
