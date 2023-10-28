import getMetadata from "../../metadata";
import Footer from "../../(layout)/footer";

export default function MakeMoney({ params }) {
  const lang = params.lang;
  return (
    <>
      <h1 className="text-center font-bold mt-10 mb-5 lazy-b">
        <span className="block text-3xl sm:text-4xl mb-4 font-bold mb-sm">{content.h1[lang][0]}</span>
        <span className="block ">{content.h1[lang][1]}</span>
      </h1>

      <p className=" lazy-l">{content.h1P[lang][0]}</p>
      <p className=" lazy-r">{content.h1P[lang][1]}</p>

      <h2 className="lazy-l">{content.h1P[lang][1]}</h2>

      <ol className="list-decimal mx-5 my-8 lazy-b">
        {content.ol[lang].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>

      {content.h2P[lang].map((item, i) => (
        <p className="lazy-b" key={i}>
          {item}
        </p>
      ))}

      <div className="h-24"></div>

      <Footer lang={lang} />
    </>
  );
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  return getMetadata({ lang, title: content.title[lang] });
}

const content = {
  title: {
    en: "Make money online with ArabLocalMarket",
    ar: "اربح المال عبر الإنترنت مع السوق المحلي العربي",
  },
  h1: {
    en: [
      "You don't have experience but you still want to make money online?",
      "Become Representative and start making money with ArabLocalMarket",
    ],
    ar: [
      "ليس لديك خبرة ولكنك لا تزال ترغب في كسب المال عبر الإنترنت؟",
      "كن مندوب وابدأ في جني الأموال معنا السوق المحلي العربي",
    ],
  },
  h1P: {
    en: [
      "ArabLocalMarket.com is the first online local market where customers find all types of local stores like Eastern and Arabic groceries, restaurants or even services like automobile mechanics and more",
      "Local store owners can create an online store for a monthly subscription, where they list their products and services so customers can see them",
    ],
    ar: [
      "ArabLocalMarket.com هو أول سوق محلي على الإنترنت حيث يجد العملاء جميع أنواع المتاجر المحلية مثل البقالة الشرقية والعربية أو المطاعم أو حتى الخدمات مثل ميكانيكا السيارات والمزيد",
      "يمكن لمالكي المتاجر المحلية إنشاء متجر على الإنترنت مقابل اشتراك شهري ، حيث يسردون منتجاتهم وخدماتهم حتى يتمكن العملاء من رؤيتها",
    ],
  },
  h2: {
    en: "Here is how it works",
    ar: "تعلم كيف يعمل",
  },
  ol: {
    en: [
      "Go to ArabLocalMarket.com and create an account",
      "Confirm your Email address",
      "Go to Clients page",
      "Copy your referral link and share it with the store owner you know",
    ],
    ar: [
      "اذهب إلى ArabLocalMarket.com وأنشئ حسابًا",
      "أكد عنوان بريدك الألكتروني",
      "انتقل إلى صفحة العملاء",
      "انسخ رابط الإحالة الخاص بك وشاركه مع صاحب المتجر الذي تعرفه",
    ],
  },
  h2P: {
    en: [
      "Once the store owner creates an account then creates a store, he will automatically be added to your client list and you will start earning money once the store owner starts paying for the store plan",
      "On client page you will see how much the store owner pays monthly and how much you will earn",
      "Earning rate currently is 25% of any paid subscription, For example, if you invite 10 stores who pay €50 monthly, you will earn €12.5 times 10 which is €125 monthly",
      "To make sure you get paid, do not forget to provide your bank information in your settings page",
      "Give it a try and start making money from now, it's easy",
    ],
    ar: [
      "بمجرد أن ينشئ صاحب المتجر حسابًا ثم ينشئ متجرًا ، ستتم إضافته تلقائيًا إلى قائمة عملائك وستبدأ في كسب المال بمجرد أن يبدأ صاحب المتجر في الدفع مقابل خطة المتجر",
      "في صفحة العميل ، سترى المبلغ الذي يدفعه صاحب المتجر شهريًا والمبلغ الذي ستكسبه",
      "معدل الربح حاليًا هو 25 ٪ من أي اشتراك مدفوع ، على سبيل المثال ، إذا قمت بدعوة 10 متاجر تدفع 50 يورو شهريًا ، فستربح 12.5 يورو مرة 10 أي ما يعادل 125 يورو شهريًا",
      "للتأكد من حصولك على أموال ، لا تنس تقديم معلوماتك المصرفية في صفحة الإعدادات الخاصة بك",
      "جربها وابدأ في جني الأموال من الآن، إنه سهل",
    ],
  },
};
