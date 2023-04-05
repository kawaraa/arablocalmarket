import SvgIcon from "../../(component)/(styled)/svg-icon";
import StarRating from "../../(component)/(styled)/rating";

export const StoreCustomerInfo = ({ lang, about, ratings, distance }) => {
  // let dst = +distance;
  // let measuringUnit = "KM";

  // if (dst < 1) {
  //   dst = dst * 1000;
  //   measuringUnit = "M";
  // }

  return (
    <section dir="auto" className="p-3">
      <p className="text-sm mb-1">{about}</p>

      <p className="flex justify-between items-center">
        <span>
          <StarRating stars={ratings.stars} cls="text-md lg:text-base" />
          <span className="text-sm mx-1 ">{ratings.total}</span>
        </span>
        <span>
          <strong className="text-sm">
            {/* distance.unit */}
            {distance.length} {content.unit[lang]}
          </strong>
        </span>
      </p>
    </section>
  );
};

export const StoreAdminInfo = ({ totalOrders, employees, favorites, ratings }) => {
  return (
    <section dir="auto" className="p-3">
      <p className="flex justify-between items-center mb-2">
        <span className="flex items-center ">
          <span className="flex items-center ">
            <span className="w-7 ">
              {/* <SvgIcon name="avatar" /> */}
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M78.8,62.1l-3.6-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,70.6c-1.2,0.6-2.7,0.6-3.9,0L26.5,60.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.6,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,78.5c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,65,80.4,62.8,78.8,62.1z" />
                <path d="M78.8,48.1l-3.7-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,56.6c-1.2,0.6-2.7,0.6-3.9,0L26.6,46.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.7,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,64.6c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,51.1,80.4,48.9,78.8,48.1 z" />
                <path d="M21.2,37.8l26.8,12.7c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7c1.6-0.8,1.6-2.9,0-3.7L51.9,21.4 c-1.2-0.6-2.7-0.6-3.9,0L21.2,34.2C19.6,34.9,19.6,37.1,21.2,37.8z" />
              </svg>
            </span>
            <strong className="text-sm mr-1">{totalOrders}</strong>
          </span>
        </span>
        <span className="flex items-center ">
          <span className="mr-1 ">{employees}</span>
          {/* Employees */}
          <span className="w-4 ">
            <SvgIcon name="avatar" />
          </span>
        </span>
      </p>

      <p className="flex justify-between items-center">
        <span>
          <StarRating stars={ratings.stars} cls="lg:text-base" />
          <span className="mx-1 text-t dark:text-dt">{ratings.total}</span>
        </span>
        <span className="flex items-center">
          <span className="mr-1">{favorites}</span>
          <span className="w-4 text-red fill-none">
            <SvgIcon name="heart" />
          </span>
        </span>
      </p>
    </section>
  );
};
const content = { unit: { en: "km", ar: "كم" } };
