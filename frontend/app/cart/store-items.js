import { CheckInput } from "../(component)/(styled)/inputs";
import LineItems from "../(component)/line-items";
import { StoreHeaderInfo } from "../(component)/order-card";

export default function StoreItems({ favorite, onCheck, onRemove, ...store }) {
  return (
    <section className="my-2 p-3 bg-cbg card rounded-lg">
      <StoreHeaderInfo id={store.id} name={store.name} phone={store.phone} cls="mb-3">
        {!favorite && <CheckInput type="radio" name="store" onChange={() => onCheck(store)} />}
      </StoreHeaderInfo>

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
