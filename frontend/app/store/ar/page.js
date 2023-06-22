import StoresNearby from "../page";

export default function LandingPageByLang(props) {
  return <StoresNearby {...props} params={{ ...props.params, lang: "ar" }} />;
}
