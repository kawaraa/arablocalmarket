export default function EmptyState({ lang, type }) {
  return (
    <div className="w-full max-w-[600px] mx-auto py-2 text-center text-[#f5f5f5] dark:text-t">
      <svg className="block w-[20%] mx-auto" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="currentColor" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fillRule="nonzero" stroke="#d9d9d9">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="currentColor"></path>
          </g>
        </g>
      </svg>
      <p className="text-sm mt-5 text-blur dark:text-t">{content[type][lang]}</p>
    </div>
  );
}

const content = {
  no: { en: "No data", ar: "لايوجد بيانات" },
  notFound: { en: "Data Not Found", ar: "لم يتم العثور على بيانات" },
  noStore: { en: "There isn't any store in the selected range", ar: "لا يوجد أي متجر في النطاق المحدد" },
  notification: { en: "You don't have any notifications", ar: "ليس لديك أي إخطارات" },
};

// <h4>Could not find stores near you!</h4>
// <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>
