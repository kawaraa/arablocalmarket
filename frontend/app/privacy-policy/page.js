import { cookies } from "next/headers";
import Footer from "../(layout)/footer";
import Article from "../(component)/article";

export default function PrivacyPolicy({ params, searchParams }) {
  const cookieStore = cookies();
  let lang = (params?.lang || cookieStore.get("lang")?.value || searchParams?.lang)?.toLowerCase();
  if (!/en|ar/gim.test(lang)) lang = "en";

  return (
    <>
      <section className="max-w-4xl mx-auto mb-20 pt-10 px-2">
        <h1 className="my-10 text-center text-4xl sm:text-5xl font-extrabold">{content.title[lang]}</h1>
        <p className="text-center text-sm mb-5">{content.updated[lang]}</p>

        <p>
          {content.declare[lang][0]}.
          <br />
          {content.declare[lang][1]}.
        </p>

        {content.articles.map((a, i) => (
          <Article lang={lang} article={a} key={i} />
        ))}
      </section>

      <Footer lang={lang} />
    </>
  );
}

const content = {
  title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
  updated: { en: "Last updated on November 2, 2023", ar: "تم التحديث الأخير في 2 نوفمبر 2023" },
  declare: {
    en: [
      'This privacy policy ("Policy") describes how ArabLocalMarket Labs Inc. ("ArabLocalMarket","we", "us" or "our") collects, protects and uses the personally identifiable information ("Personal Information") you ("User", "you" or "your") may provide through the ArabLocalMarket website (arablocalmarket.com) or in in the course of subscripting to any ArabLocalMarket Store Plan (Plan, Subscription)',
      "The Policy also describes the choices available to you regarding our use of your Personal Information and how you can access and update this information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage",
    ],
    ar: [
      'تصف سياسة الخصوصية هذه ("السياسة") كيف تقوم شركة ArabLocalMarket Labs Inc. ("ArabLocalMarket" أو "نحن" أو "نحن" أو "خاصتنا") بجمع وحماية واستخدام معلومات التعريف الشخصية ("المعلومات الشخصية") أنت ("المستخدم "،" أو "أنت" أو "الخاص بك") من خلال موقع ArabLocalMarket (arablocalmarket.com) أو في سياق الاشتراك في أي خطة متجر ArabLocalMarket (خطة ، اشتراك)',
      "توضح السياسة أيضًا الخيارات المتاحة لك فيما يتعلق باستخدامنا لمعلوماتك الشخصية وكيف يمكنك الوصول إلى هذه المعلومات وتحديثها. لا تنطبق هذه السياسة على ممارسات الشركات التي لا نملكها أو نتحكم فيها ، أو على الأفراد الذين لا نوظفهم أو نديرهم",
    ],
  },
  articles: [
    {
      h: { en: "Collection of personal information", ar: "جمع المعلومات الشخصية" },
      p: {
        en: [
          "We receive and store any information you knowingly provide to us when you make a purchase through the Website",
          "Currently this is limited to your name, address and bank if you earn money via affiliate program and phone, email address which are required for you to be able to sign in to the Website and access any purchased ArabLocalMarket products",
        ],
        ar: [
          "نتلقى ونخزن أي معلومات تزودنا بها عن قصد عند إجراء عملية شراء عبر الموقع الإلكتروني",
          "يقتصر هذا حاليًا على اسمك وعنوانك وبنكك إذا ربحت أموالًا عبر البرنامج التابع والهاتف وعنوان البريد الإلكتروني المطلوب لتتمكن من تسجيل الدخول إلى الموقع والوصول إلى أي من منتجات ArabLocalMarket التي تم شراؤها",
        ],
      },
    },
    // {
    //   h: { en: "Collection of non-personal information", ar: "" },
    //   p: {
    //     en: [
    //       "When you visit the Website our servers automatically record information that your browser sends. This data may include information such as your device's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics",
    //     ],
    //     ar: [""],
    //   },
    // },
    {
      h: { en: "Purchases", ar: "المشتريات" },
      p: {
        en: [
          'All purchases made through the Website are processed by a third party payment processor, Stripe (<a href="https://stripe.com/">stripe.com</a>)',
          "Stripe may ask you for personal and/or non-personal information, such as your name, address, email address, credit card information, or other Personal Information",
          'Stripe has a privacy policy ( <a href="https://stripe.com/legal">stripe.com/legal</a>) that describes their collection and use of personal information. ArabLocalMarket does not control stripe or its collection or use of information. Any questions or concerns about Stripe\'s practices should be directed to Strip',
          "Stripe provides us with certain non-personal information relating to purchases made by visitors to the Website. The non-personal information may include details of the purchase such as the date, amount paid, and product purchased",
          "The non-personal purchase information may be linked to the Personal Information you provide to us (as stated above)",
          "Stripe does not supply us with any of your other Personal Information such as your name, street address, or credit card information",
        ],
        ar: [
          'تتم معالجة جميع عمليات الشراء التي تتم عبر موقع الويب بواسطة معالج دفع تابع لجهة خارجية، Stripe (<a href="https://stripe.com/">stripe.com</a>)',
          "قد يطلب منك Stripe معلومات شخصية و / أو غير شخصية ، مثل اسمك أو عنوانك أو عنوان بريدك الإلكتروني أو معلومات بطاقة الائتمان أو معلومات شخصية أخرى",
          'لدى Stripe سياسة خصوصية (<a href="https://stripe.com/legal">stripe.com/legal</a>) تصف جمع المعلومات الشخصية واستخدامها. ArabLocalMarket لا يتحكم في الشريط أو جمعه أو استخدامه للمعلومات. يجب توجيه أي أسئلة أو مخاوف بشأن ممارسات Stripe إلى Stripe',
          "يزودنا Stripe ببعض المعلومات غير الشخصية المتعلقة بالمشتريات التي يقوم بها زوار الموقع. قد تتضمن المعلومات غير الشخصية تفاصيل الشراء مثل التاريخ والمبلغ المدفوع والمنتج الذي تم شراؤه",
          "قد يتم ربط معلومات الشراء غير الشخصية بالمعلومات الشخصية التي تزودنا بها (كما هو مذكور أعلاه)",
          "لا يزودنا Stripe بأي من معلوماتك الشخصية الأخرى مثل اسمك أو عنوان الشارع أو معلومات بطاقة الائتمان الخاصة بك",
        ],
      },
    },
    {
      h: { en: "Managing personal information", ar: "إدارة المعلومات الشخصية" },
      p: {
        en: [
          'You are able to update your Personal Information in your "Account Settings" on the Website (as stated above). You may also request that we delete your all information by deleting your account in your "Account Settings", but this will prevent you from accessing the products you have purchased from ArabLocalMarket',
          // "When you update information, we may maintain a copy of the unrevised information in our records. Some information may remain in our private records after deletion of such information from your account for a retention period",
          // "Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, your rights to access, add to, and update your information cannot be enforced after the expiration of the retention period",
          // "We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements",
          // "We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally",
        ],
        ar: [
          'يمكنك تحديث معلوماتك الشخصية في "إعدادات الحساب" على موقع الويب (كما هو مذكور أعلاه). يمكنك أيضًا أن تطلب منا حذف جميع معلوماتك عن طريق حذف حسابك في "إعدادات الحساب" ، لكن هذا سيمنعك من الوصول إلى المنتجات التي اشتريتها من ArabLocalMarket',
        ],
      },
    },
    // {
    //   h: { en: "Use and processing of collected information", ar: "" },
    //   p: {
    //     en: [
    //       "Any of the information we collect from you may be used to personalize your experience; improve our Website; improve customer service; process transactions; send notification emails such as password reminders, updates, etc; and operate our Website. Non-Personal Information collected is used only to identify potential cases of abuse and establish statistical information regarding Website usage",
    //       "This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system",
    //       "We may process Personal Information related to you if one of the following applies:",
    //       "(i) You have given their consent for one or more specific purposes, Note that under some legislation we may be allowed to process information until you object to such processing (by opting out), without having to rely on consent or any other of the following legal bases below. This, however, does not apply, whenever the processing of Personal Information is subject to European data protection law;",
    //       "(ii) Provision of information is necessary for the performance of an agreement with you and/or for any pre-contractual obligations thereof;",
    //       "(ii) Processing is necessary for compliance with a legal obligation to which you are subject;",
    //       "(iv) Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us;",
    //       "(v) Processing is necessary for the purposes of the legitimate interests pursued by us or by a third party",
    //       "In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract",
    //     ],
    //     ar: [""],
    //   },
    // },
    // {
    //   h: { en: "Information transfer and storage", ar: "" },
    //   p: {
    //     en: [
    //       "Depending on your location, data transfers may involve transferring and storing your information in a country other than your own",
    //       "You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information",
    //       "If any such transfer takes place, you can find out more by checking the relevant sections of this document or inquire with us using the information provided in the Contact section",
    //     ],
    //     ar: [""],
    //   },
    // },
    // {
    //   h: { en: "The rights of users", ar: "" },
    //   p: {
    //     en: [
    //       "You may exercise certain rights regarding your information processed by us",
    //       "In particular, you have the right to do the following:",
    //       "(i) you have the right to withdraw consent where you have previously given your consent to the processing of your information;",
    //       "(ii) you have the right to object to the processing of your information if the processing is carried out on a legal basis other than consent;",
    //       "(iii) you have the right to learn if information is being processed by us, obtain disclosure regarding certain aspects of the processing and obtain a copy of the information undergoing processing;",
    //       "(iv) you have the right to verify the accuracy of your information and ask for it to be updated or corrected;",
    //       "(v) you have the right, under certain circumstances, to restrict the processing of your information, in which case, we will not process your information for any purpose other than storing it;",
    //       "(vi) you have the right, under certain circumstances, to obtain the erasure of your Personal Information from us;",
    //       "(vii) you have the right to receive your information in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance",
    //       "This provision is applicable provided that your information is processed by automated means and that the processing is based on your consent, on a contract which you are part of or on pre-contractual obligations thereof",
    //     ],
    //     ar: [""],
    //   },
    // },
    {
      h: { en: "Privacy of children", ar: "خصوصية الأطفال" },
      p: {
        en: [
          "We do not knowingly collect any Personal Information from children under the age of 13",
          "If you are under the age of 13, please do not submit any Personal Information through our Website",
          "We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through our Website without their permission",
          "If you have reason to believe that a child under the age of 13 has provided Personal Information to us through our Website, please contact us",
        ],
        ar: [
          "نحن لا نجمع أي معلومات شخصية عن عمد من الأطفال دون سن 13 عامًا",
          "إذا كان عمرك أقل من 13 عامًا ، فيرجى عدم إرسال أي معلومات شخصية من خلال موقعنا الإلكتروني",
          "نحن نشجع الآباء والأوصياء القانونيين على مراقبة استخدام أطفالهم للإنترنت وللمساعدة في تطبيق هذه السياسة من خلال توجيه أطفالهم إلى عدم تقديم معلومات شخصية من خلال موقعنا الإلكتروني أبدًا دون إذنهم",
          "إذا كان لديك سبب للاعتقاد بأن طفلًا يقل عمره عن 13 عامًا قد قدم لنا معلومات شخصية من خلال موقعنا على الويب ، فيرجى الاتصال بنا",
        ],
      },
    },
    {
      h: { en: "Cookies", ar: "ملفات تعريف الارتباط" },
      p: {
        en: [
          'The Website uses "cookies" to help personalize your online experience',
          "A cookie is a text file that is placed on your hard disk by a web page server",
          "Cookies cannot be used to run programs or deliver viruses to your computer",
          "Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you",
          'In order for the website to properly function, most of these "cookies" are required, means we may use cookies to collect, store, and track information for statistical purposes to operate our Website',
          // "You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer",
          // "In addition to using cookies and related technologies as described above, we also may permit certain third-party companies to help us tailor advertising that we think may be of interest to users and to collect and use other data about user activities on the Website",
          // "These companies may deliver ads that might also place cookies and otherwise track user behavior",
        ],
        ar: [
          'يستخدم موقع الويب "ملفات تعريف الارتباط" للمساعدة في تخصيص تجربتك على الإنترنت',
          "ملف تعريف الارتباط هو ملف نصي يتم وضعه على القرص الثابت الخاص بك عن طريق خادم صفحة الويب",
          "يتم تخصيص ملفات تعريف الارتباط لك بشكل فريد ، ولا يمكن قراءتها إلا بواسطة خادم ويب في المجال الذي أصدر ملف تعريف الارتباط لك",
          'لكي يعمل موقع الويب بشكل صحيح ، فإن معظم "ملفات تعريف الارتباط" هذه مطلوبة ، مما يعني أننا قد نستخدم ملفات تعريف الارتباط لجمع المعلومات وتخزينها وتتبعها لأغراض إحصائية لتشغيل موقعنا',
        ],
      },
    },
    {
      h: { en: "Links to other websites", ar: "روابط لمواقع أخرى" },
      p: {
        en: [
          "Our Website contains links to other websites that are not owned or controlled by us",
          "Please be aware that we are not responsible for the privacy practices of such other websites or third parties",
          "We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information",
          "In particular, as noted above, purchases made through the Website are handled by Stripe and all such transactions, including any Personal Information or non-personal information collected by Stripe, are under the control of Stripe",
          'We encourage purchasers to read Stripe’s Privacy Policy (<a href="https://stripe.com/legal">stripe.com/legal-buyers/</a>)',
        ],
        ar: [
          "يحتوي موقعنا على روابط لمواقع أخرى لا نملكها ولا نتحكم فيها",
          "يرجى العلم أننا لسنا مسؤولين عن ممارسات الخصوصية لهذه المواقع الأخرى أو الأطراف الثالثة",
          "نشجعك على أن تكون على دراية عندما تغادر موقعنا وأن تقرأ بيانات الخصوصية لكل موقع ويب قد يجمع معلومات شخصية",
          "على وجه الخصوص ، كما هو مذكور أعلاه ، يتم التعامل مع عمليات الشراء التي تتم من خلال الموقع بواسطة Stripe وجميع هذه المعاملات ، بما في ذلك أي معلومات شخصية أو معلومات غير شخصية يتم جمعها بواسطة Stripe ، تخضع لسيطرة Stripe",
          'نحن نشجع المشترين على قراءة سياسة خصوصية Stripe (<a href="https://stripe.com/legal">stripe.com/legal-buyers/ </a>)',
        ],
      },
    },
    {
      h: { en: "Information security", ar: "أمن المعلومات" },
      p: {
        en: [
          "We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure",
          "We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed",
          "Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and our Website cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third-party, despite best efforts",
        ],
        ar: [
          "نقوم بتأمين المعلومات التي تقدمها على خوادم الكمبيوتر في بيئة آمنة ومحكومة ومحمية من الوصول أو الاستخدام أو الكشف غير المصرح به",
          "نحافظ على ضمانات إدارية وفنية ومادية معقولة في محاولة للحماية من الوصول غير المصرح به إلى المعلومات الشخصية واستخدامها وتعديلها والكشف عنها في سيطرتها وحفظها. ومع ذلك ،لا يمكن ضمان نقل البيانات عبر الإنترنت أو الشبكة اللاسلكية",
          "لذلك ، بينما نسعى جاهدين لحماية معلوماتك الشخصية ، فإنك تقر بأن (1) هناك قيود أمنية وخصوصية للإنترنت خارجة عن سيطرتنا ؛ (2) لا يمكن ضمان أمان وسلامة وخصوصية أي وجميع المعلومات والبيانات المتبادلة بينك وبين موقعنا الإلكتروني ؛ و (3) قد يتم عرض أي من هذه المعلومات والبيانات أو العبث بها أثناء النقل من قبل طرف ثالث ، على الرغم من بذل أقصى الجهود",
        ],
      },
    },
    {
      h: { en: "Data breach", ar: "خرق البيانات" },
      p: {
        en: [
          "In the event we become aware that the security of the Website has been compromised or users' Personal Information has been disclosed to unrelated third-parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities",
          "In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the breach or if notice is otherwise required by law",
          "When we do we will send you an email",
        ],
        ar: [
          "في حال علمنا أن أمان الموقع قد تعرض للخطر أو تم الكشف عن معلومات المستخدمين الشخصية لأطراف ثالثة غير ذات صلة نتيجة لنشاط خارجي ، بما في ذلك ، على سبيل المثال لا الحصر ، الهجمات الأمنية أو الاحتيال ، فإننا نحتفظ بـ الحق في اتخاذ تدابير مناسبة بشكل معقول ، بما في ذلك ، على سبيل المثال لا الحصر ، التحقيق والإبلاغ ، وكذلك إخطار سلطات إنفاذ القانون والتعاون معها",
          "في حالة حدوث خرق للبيانات ، سنبذل جهودًا معقولة لإخطار الأفراد المتأثرين إذا اعتقدنا أن هناك خطرًا معقولًا لإلحاق الضرر بالمستخدم نتيجة للانتهاك أو إذا كان الإشعار مطلوبًا بخلاف ذلك بموجب القانون",
          "عندما نفعل ذلك سوف نرسل لك بريدًا إلكترونيًا",
        ],
      },
    },
    {
      h: { en: "Legal disclosure", ar: "الإفصاح القانوني" },
      p: {
        en: [
          "We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request",
          "In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account and personal data will likely be among the assets transferred",
        ],
        ar: [
          "سنكشف عن أي معلومات نجمعها أو نستخدمها أو نستلمها إذا كان ذلك مطلوبًا أو مسموحًا به بموجب القانون ، مثل الامتثال لأمر استدعاء أو إجراء قانوني مماثل ، وعندما نعتقد بحسن نية أن الكشف ضروري لحماية حقوقنا ، وحماية سلامتك أو سلامة الآخرين ، أو التحقيق في الاحتيال ، أو الرد على طلب حكومي",
          "في حال مررنا بمرحلة انتقالية في العمل ، مثل الاندماج أو الاستحواذ من قبل شركة أخرى ، أو بيع كل أو جزء من أصولها ، فمن المحتمل أن يكون حساب المستخدم والبيانات الشخصية الخاصة بك من بين الأصول المنقولة",
        ],
      },
    },
    {
      h: { en: "Changes and amendments / Changelogs", ar: "التغييرات والتعديلات / سجلات التغيير" },
      p: {
        en: [
          "We reserve the right to modify this privacy policy relating to the Website at any time, effective upon posting of an updated version of this Policy on the Website",
          "When we do we will revise the updated date at the bottom of this page, Continued use of the Website after any such changes shall constitute your consent to such changes",
        ],
        ar: [
          "نحتفظ بالحق في تعديل سياسة الخصوصية هذه المتعلقة بالموقع الإلكتروني في أي وقت ، وتكون سارية عند نشر نسخة محدثة من هذه السياسة على الموقع",
          "عندما نقوم بذلك ، سنقوم بمراجعة التاريخ المحدث في أسفل هذه الصفحة ، ويشكل استمرار استخدام الموقع بعد أي تغييرات من هذا القبيل موافقتك على هذه التغييرات",
        ],
      },
    },
    {
      h: { en: "Acceptance of this policy", ar: "قبول هذه السياسة" },
      p: {
        en: [
          "You acknowledge that you have read this Policy and agree to all its terms and conditions",
          "By using the Website you agree to be bound by this Policy",
          "If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website",
        ],
        ar: [
          "أنت تقر بأنك قد قرأت هذه السياسة وتوافق على جميع الشروط والأحكام الخاصة بها",
          "باستخدام موقع الويب ، فإنك توافق على الالتزام بهذه السياسة",
          "إذا كنت لا توافق على الالتزام بشروط هذه السياسة ، فأنت غير مصرح لك باستخدام الموقع أو الوصول إليه",
        ],
      },
    },
  ],
};
