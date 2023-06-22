import StoresNearby from "../../../page";

export default function Lang(props) {
  return (
    <StoresNearby
      {...props}
      params={{ ...props.params, lang: "ar" }}
      searchParams={{ ...props.searchParams, search: props.params.slug }}
    />
  );
}
