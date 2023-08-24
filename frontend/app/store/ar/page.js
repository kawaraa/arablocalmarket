import StoresNearby from "../page";

export default function StoresByLang(props) {
  return <StoresNearby {...props} params={{ ...props.params, lang: "ar" }} />;
}
