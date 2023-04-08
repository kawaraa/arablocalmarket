import Link from "next/link";
import { CheckInput } from "../../(component)/(styled)/inputs";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import LineItems from "../../(component)/line-items";

export default function StoreItems({ favorite, onCheck, onRemove, ...store }) {
  const hCls = "hover:text-pc2 duration-150";

  return (
    <section className="my-2 p-3 bg-cbg card rounded-lg">
      <div
        dir="ltr"
        className="pb-2 flex justify-between items-center border-b-[1px] border-bc dark:border-bf">
        {!favorite && <CheckInput type="radio" name="store" onChange={() => onCheck(store)} />}

        <h3 className="font-medium flex-auto mx-2">
          <Link href={"/store/" + store.id} className={hCls}>
            {store.name}
          </Link>
        </h3>

        <a className={"w-5 mx-2 " + hCls} href={"tel:" + store.phone}>
          <SvgIcon name="phone" />
        </a>
        <a
          href={"https://wa.me/" + store.phone}
          target="_blank"
          title="WhatsApp"
          aria-label="WhatsApp"
          className={"w-6 text-green dark:text-pc " + hCls}>
          <SvgIcon name="whatsapp" />
        </a>
      </div>

      <LineItems
        favorite={favorite}
        items={store.items}
        currency={store.currency}
        storeId={store.id}
        onRemove={onRemove}
      />
    </section>
  );
}
