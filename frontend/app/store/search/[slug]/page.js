import StoresNearby from "../../page";

export default function StoreSearch(props) {
  return <StoresNearby {...props} searchParams={{ ...props.searchParams, search: props.params.slug }} />;
}
