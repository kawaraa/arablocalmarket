import Article from "../../(component)/article";
import Footer from "../../(layout)/footer";
import { LinkButton } from "../../(component)/(styled)/button";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import getMetadata from "../../metadata";

export default function Help({ params }) {
  const lang = params.lang;

  return (
    <>
      <section className="max-w-4xl mx-auto mb-24 pt-10 px-2">
        <h1 className="text-2xl font-semibold">{content.h1[lang]}</h1>
        {content.articles.map((a, i) => (
          <Article lang={lang} article={a} key={i} />
        ))}
      </section>
      <div className="mb-20 flex justify-center">
        <LinkButton hrefLang={lang} href="/contact" cls="!rounded-full">
          {content.contactUs[lang]}
          <span className={"w-8 " + (lang == "ar" ? "rotate-90" : "-rotate-90")}>
            <SvgIcon name="arrowDown" />
          </span>
        </LinkButton>
      </div>

      <Footer lang={lang} />
    </>
  );
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  return getMetadata({ lang, title: content.title[lang] + " - ALM" });
}

const content = {
  title: { en: "Help", ar: "المساعدة" },
  h1: { en: "Common questions", ar: "الأسئلة الشائعة" },
  contactUs: { en: "Contact us", ar: "تواصل معنا" },
  articles: [
    {
      h: {
        en: "- How many stores can I have per account?",
        ar: "- كم عدد المتاجر التي يمكنني إنشائها لكل حساب؟",
      },
      p: {
        en: ["One user account can have only 3 stores with 3 different subscriptions or store plans"],
        ar: ["يمكن أن يحتوي حساب مستخدم واحد على 3 متاجر فقط مع 3 اشتراكات مختلفة أو خطط متاجر"],
      },
    },
    {
      h: {
        en: "- What happens if I don't pay my store subscription or plan?",
        ar: "- ماذا يحدث إذا لم أدفع اشتراك متجري؟",
      },
      p: {
        en: [
          "If you missed paying your store subscription bill or if a payment fails 3 times, then your store will become inactive right after the bill's due date til you settle your billing information",
        ],
        ar: [
          "إذا فاتتك دفع فاتورة اشتراك متجرك أو إذا فشلت عملية الدفع 3 مرات ، فسيصبح متجرك غير نشط بعد تاريخ استحقاق الفاتورة حتى تقوم بتسوية معلومات الفواتير الخاصة بك",
        ],
      },
    },
    {
      h: {
        en: "- What happens when you deactivate or cancel my store subscription or plan?",
        ar: "- ماذا يحدث عندما تقوم بإلغاء تنشيط اشتراك المتجر الخاص بي؟",
      },
      p: {
        en: [
          "Once you deactivate your store or cancel store subscription or plan, then your store will be unpublished then becomes unavailable to the public and internet, this means your customers will not view your store neither store products",
        ],
        ar: [
          "بمجرد إلغاء اشتراك المتجر، سيتم إلغاء نشر متجرك ثم يصبح غير متاح للجمهور والإنترنت، وهذا يعني أن عملائك لن يشاهدوا متجرك ولا منتجات المتجر",
        ],
      },
    },
    {
      h: { en: "- Do you have to pay monthly or yearly?", ar: "- هل يجب أن تدفع شهريًا أم سنويًا؟" },
      p: {
        en: ["All ALM store plans are month to month unless you sign up for a yearly subscription plan"],
        ar: ["شهرية ما لم تقم بالتسجيل في خطة اشتراك سنوية جميع خطط متجر ALM "],
      },
    },
    {
      h: {
        en: "- What happen if I do not reactive my store plan?",
        ar: "- ماذا يحدث إذا لم أقم بإعادة تنشيط اشتراك متجري؟",
      },
      p: {
        en: [
          "If you do not reactivate your store within 60 days by subscribing to a new plan, your store and all the listed products in the store and all the orders will be permanently deleted, therefor you can not recover it anymore",
        ],
        ar: [
          "إذا لم تقم بإعادة تنشيط متجرك خلال 60 يومًا من خلال الاشتراك في اشتراك جديدة، فسيتم حذف متجرك وجميع المنتجات المدرجة في المتجر وجميع الطلبات نهائيًا ، لذلك لا يمكنك استعادتها بعد الآن",
        ],
      },
    },
    {
      h: { en: "- How much do you earn per referred client?", ar: "- كم تربح من كل عميل محال؟" },
      p: {
        en: [
          "We pay 25%, E.g. if you bring a new client to ArabLocalMarket that signs up for paid Store Plan of €50, you will earn 25% of the total mount excluding Tax which will be €12.50 in this case",
        ],
        ar: [
          "ندفع 25٪ ، على سبيل المثال. إذا أحضرت عميلاً جديدًا إلى ArabLocalMarket الذي اشترك في خطة المتجر المدفوعة بقيمة 50 يورو ، فستكسب 25 ٪ من إجمالي التحميل باستثناء الضرائب التي ستكون 12.50 يورو في هذه الحالة",
        ],
      },
    },
    {
      h: { en: "- How often you get paid?", ar: "- كم مرة تدفع لك؟" },
      p: {
        en: [
          "Payouts should be sent to your bank account on the first of the month, but also there megiht be some delay depending on you bannk",
        ],
        ar: [
          "يجب إرسال المدفوعات إلى حسابك المصرفي في الأول من الشهر ، ولكن هناك أيضًا بعض التأخير اعتمادًا على حسابك البنكي",
        ],
      },
    },
    // { h: { en: "", ar: "" }, p: { en: [""], ar: [""] } },
  ],
};
