// LineUp: copy and demo data for the /lineup page, in both languages.
//
// Everything the page shows is a feature that runs today in the real app
// (Rustavi Basketball Academy, live on Google Play since 2026-09). The children,
// numbers and messages in the phone mockups are invented. No real family's data
// may ever appear on a marketing page.
//
// House rule for this page: no em dash anywhere in the copy.

export type Lang = "ka" | "en";

export const ACCENT = "#FA650F";

/** The WhatsApp chat opens pre-filled, in the visitor's language. */
export const whatsappUrl = (lang: Lang) =>
  "https://wa.me/995557624243?text=" +
  encodeURIComponent(
    lang === "en"
      ? "Hello, I'm interested in LineUp, the sports academy app."
      : "გამარჯობა, დავინტერესდი LineUp-ით, სპორტული აკადემიის აპლიკაციით."
  );
export const PHONE_HREF = "tel:+995557624243";
export const PHONE_LABEL = "557 62 42 43";
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.rustavihoops.portal";

/**
 * The mockups show the CURRENT month, so the page never looks like a frozen
 * screenshot ("November fee" read in May).
 */
export const monthIndex = () => new Date().getMonth();

type Kid = { first: string; last: string; no: number; group: string };

const KA_MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
const KA_MONTHS_GEN = ["იანვრის", "თებერვლის", "მარტის", "აპრილის", "მაისის", "ივნისის", "ივლისის", "აგვისტოს", "სექტემბრის", "ოქტომბრის", "ნოემბრის", "დეკემბრის"];
const KA_MONTHS_SHORT = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * The parent in the demo is Luka's. `kids` is his team (U-12), as the coach
 * sees it; index 0 is always Luka. The manager sees the whole academy, so the
 * payments list mixes teams.
 */
export const app = {
  ka: {
    menu: "მენიუ",
    academy: "LineUp",
    academySub: "ACADEMY",
    group: "U-12",
    kids: [
      { first: "ლუკა", last: "ბერიძე", no: 10, group: "U-12" },
      { first: "ნიკა", last: "კაპანაძე", no: 7, group: "U-12" },
      { first: "გიორგი", last: "მესხი", no: 4, group: "U-12" },
      { first: "საბა", last: "ჯაფარიძე", no: 11, group: "U-12" },
      { first: "ანა", last: "ლომიძე", no: 9, group: "U-12" },
    ] as Kid[],
    academyKids: [
      { first: "ლუკა", last: "ბერიძე", no: 10, group: "U-12" },
      { first: "დავით", last: "ქავთარაძე", no: 5, group: "U-10" },
      { first: "ნიკა", last: "კაპანაძე", no: 7, group: "U-12" },
      { first: "მარიამ", last: "გელაშვილი", no: 3, group: "U-14" },
      { first: "ლევან", last: "ხარაბაძე", no: 8, group: "U-10" },
      { first: "გიორგი", last: "მესხი", no: 4, group: "U-12" },
    ] as Kid[],
    /** Paid state of academyKids[1..]; Luka (0) is the one the visitor marks. */
    academyPaid: [true, true, false, true, true],
    now: "ახლა",
    attendance: "დასწრება",
    rating: "შეფასება",
    growth: "ზრდა",
    lastPractices: "ბოლო ვარჯიშები",
    all: "ყველა",
    chips: ["პარ", "ოთხ", "ორშ"],
    coachComment: "მწვრთნელის კომენტარი",
    comment: "დღეს დაცვაში ბევრად უკეთესი იყო. განაგრძეთ ასე.",
    nextActivity: "შემდეგი აქტივობა",
    tomorrow: "ხვალ · 15:00",
    practice: "ვარჯიში",
    cantCome: "ვერ დაესწრება? მონიშნე",
    reportedAbsent: "მწვრთნელმა იცის: ვერ დაესწრება",
    cancelled: "გაუქმდა",
    feeOf: (m: number) => `${KA_MONTHS_GEN[m]} გადასახადი`,
    unpaid: "გადასახდელია",
    paid: "გადახდილია ✓",
    starBadge: "დღის ვარსკვლავი",
    navParent: ["მთავარი", "კალენდარი", "დასწრება", "პროგრესი"],
    payments: "გადახდები",
    monthName: (m: number) => KA_MONTHS[m],
    monthShort: (m: number) => KA_MONTHS_SHORT[(m + 12) % 12],
    paidOf: (n: number, of: number) => `${n}/${of} გადახდილია`,
    filters: ["ყველა", "გადახდილი", "გადაუხდელი"],
    search: "მოთამაშის ძებნა",
    statusPaid: "გადახდილი",
    statusUnpaid: "გადაუხდელი",
    navManager: ["მთავარი", "მოთამაშეები", "გადახდები", "კალენდარი"],
    attendanceTitle: "დასწრება",
    today: "დღეს",
    everyoneCame: "ყველა მოვიდა",
    starHint: "დამსწრეს შეგიძლია „დღის ვარსკვლავი“ მიანიჭო, მშობელი ნახავს.",
    save: "შენახვა",
    willBeAbsent: "ვერ მოვა",
    navCoach: ["გუნდები", "დასწრება", "კალენდარი", "თამაშები"],
    calendar: "კალენდარი",
    thisWeek: "ეს კვირა",
    cancel: "გაუქმება",
    game: "თამაში",
    gameVs: "vs „ვარსკვლავი“",
    sat: "შაბ · 12:00",
    progress: "პროგრესი",
    lastRating: "ბოლო შეფასება",
    skills: [
      { label: "ტექნიკა", value: 8 },
      { label: "ფიზიკა", value: 7 },
      { label: "დისციპლინა", value: 8 },
    ],
    // manager: announcement
    announce: "ახალი განცხადება",
    to: "ვის",
    audiences: ["ყველა მშობელი", "U-12", "U-10"],
    announceTitle: "შაბათის ვარჯიში",
    announceBody: "შაბათს ვარჯიში 12:00-ზე იქნება, ჩვეულებრივ დარბაზში. ფორმა თან იქონიეთ.",
    recipients: (n: number) => `${n} მშობელი მიიღებს`,
    send: "გაგზავნა",
    sentLately: "ბოლოს გაგზავნილი",
    sent: [
      { title: "ახალი ფორმები", meta: "ყველა მშობელი · 2 დღის წინ" },
      { title: "ტურნირი ქუთაისში", meta: "U-12 · 1 კვირის წინ" },
    ],
    // coach: evaluation
    newEvaluation: "ახალი შეფასება",
    evalComment: "კომენტარი მშობლისთვის",
    // push notifications: the real app's texts
    pushPaidTitle: "გადასახადი აღრიცხულია",
    pushPaidBody: (m: number) => `ლუკა ბერიძე · ${KA_MONTHS[m]}: გადახდილად მოინიშნა.`,
    pushStarTitle: "დღის ვარსკვლავი",
    pushStarBody: "ლუკა დღის ვარსკვლავი იყო!",
    pushCancelTitle: "ვარჯიში გაუქმდა",
    pushCancelBody: "ხვალინდელი ვარჯიში გაუქმდა.",
    pushAbsenceTitle: "გაცდენის შეტყობინება",
    pushAbsenceBody: "ლუკა ბერიძე ვერ დაესწრება ვარჯიშს.",
  },
  en: {
    menu: "Menu",
    academy: "LineUp",
    academySub: "ACADEMY",
    group: "U-12",
    kids: [
      { first: "Luka", last: "Beridze", no: 10, group: "U-12" },
      { first: "Nika", last: "Kapanadze", no: 7, group: "U-12" },
      { first: "Giorgi", last: "Meskhi", no: 4, group: "U-12" },
      { first: "Saba", last: "Japaridze", no: 11, group: "U-12" },
      { first: "Ana", last: "Lomidze", no: 9, group: "U-12" },
    ] as Kid[],
    academyKids: [
      { first: "Luka", last: "Beridze", no: 10, group: "U-12" },
      { first: "Davit", last: "Kavtaradze", no: 5, group: "U-10" },
      { first: "Nika", last: "Kapanadze", no: 7, group: "U-12" },
      { first: "Mariam", last: "Gelashvili", no: 3, group: "U-14" },
      { first: "Levan", last: "Kharabadze", no: 8, group: "U-10" },
      { first: "Giorgi", last: "Meskhi", no: 4, group: "U-12" },
    ] as Kid[],
    academyPaid: [true, true, false, true, true],
    now: "now",
    attendance: "Attendance",
    rating: "Rating",
    growth: "Growth",
    lastPractices: "Last practices",
    all: "All",
    chips: ["Fri", "Wed", "Mon"],
    coachComment: "Coach's comment",
    comment: "Much better on defence today. Keep it up.",
    nextActivity: "Next up",
    tomorrow: "Tomorrow · 15:00",
    practice: "Practice",
    cantCome: "Can't make it? Let the coach know",
    reportedAbsent: "The coach knows: won't attend",
    cancelled: "Cancelled",
    feeOf: (m: number) => `${EN_MONTHS[m]} fee`,
    unpaid: "Due",
    paid: "Paid ✓",
    starBadge: "Star of the day",
    navParent: ["Home", "Calendar", "Attendance", "Progress"],
    payments: "Payments",
    monthName: (m: number) => EN_MONTHS[m],
    monthShort: (m: number) => EN_MONTHS[(m + 12) % 12].slice(0, 3),
    paidOf: (n: number, of: number) => `${n}/${of} paid`,
    filters: ["All", "Paid", "Unpaid"],
    search: "Search players",
    statusPaid: "Paid",
    statusUnpaid: "Unpaid",
    navManager: ["Home", "Players", "Payments", "Calendar"],
    attendanceTitle: "Attendance",
    today: "Today",
    everyoneCame: "Everyone came",
    starHint: "Give a present player “Star of the day”. The parent sees it.",
    save: "Save",
    willBeAbsent: "Absent",
    navCoach: ["Teams", "Attendance", "Calendar", "Games"],
    calendar: "Calendar",
    thisWeek: "This week",
    cancel: "Cancel",
    game: "Game",
    gameVs: "vs “Stars”",
    sat: "Sat · 12:00",
    progress: "Progress",
    lastRating: "Latest rating",
    skills: [
      { label: "Technique", value: 8 },
      { label: "Physical", value: 7 },
      { label: "Discipline", value: 8 },
    ],
    announce: "New announcement",
    to: "To",
    audiences: ["All parents", "U-12", "U-10"],
    announceTitle: "Saturday practice",
    announceBody: "Saturday's practice is at 12:00, in the usual hall. Please bring the kit.",
    recipients: (n: number) => `${n} parents will get it`,
    send: "Send",
    sentLately: "Sent lately",
    sent: [
      { title: "New kits", meta: "All parents · 2 days ago" },
      { title: "Tournament in Kutaisi", meta: "U-12 · 1 week ago" },
    ],
    newEvaluation: "New rating",
    evalComment: "Comment for the parent",
    pushPaidTitle: "Fee recorded",
    pushPaidBody: (m: number) => `Luka Beridze · ${EN_MONTHS[m]}: marked as paid.`,
    pushStarTitle: "Star of the day",
    pushStarBody: "Luka was the star of the day!",
    pushCancelTitle: "Practice cancelled",
    pushCancelBody: "Tomorrow's practice is cancelled.",
    pushAbsenceTitle: "Absence notice",
    pushAbsenceBody: "Luka Beridze won't make it to practice.",
  },
};

export type AppText = (typeof app)["ka"];

export const page = {
  ka: {
    seoTitle: "LineUp: სპორტული აკადემიის მართვის აპლიკაცია | გადახდები, დასწრება, მშობლები",
    seoDescription:
      "სპორტული აკადემიის აპლიკაცია მენეჯერის, მწვრთნელისა და მშობლისთვის. გადახდების აღრიცხვა თვეების მიხედვით, დასწრება 10 წამში, შეფასებები და შეტყობინებები მშობლებს. ფეხბურთის, კალათბურთისა და სხვა სპორტის აკადემიებისთვის.",
    seoKeywords:
      "სპორტული აკადემიის მართვა, აკადემიის აპლიკაცია, ფეხბურთის აკადემიის პროგრამა, კალათბურთის აკადემია, დასწრების აღრიცხვა, გადახდების აღრიცხვა, მშობლების აპლიკაცია, მწვრთნელის აპლიკაცია, სპორტული სკოლის პროგრამა, LineUp",
    breadcrumb: "LineUp",
    kicker: "ფეხბურთის, კალათბურთის და სხვა აკადემიებისთვის",
    heroTitle: "სპორტული აკადემიის მართვა, ერთ აპში.",
    heroSubtitle: "მენეჯერი ნიშნავს გადახდას, მწვრთნელი დასწრებას. მშობელი ყველაფერს იმავე წამს ხედავს.",
    ctaWrite: "მოგვწერეთ WhatsApp-ში",
    orCall: "ან დაგვირეკეთ",
    proofLine: "მუშაობს რუსთავის კალათბურთის აკადემიაში",

    scenarios: {
      payment: {
        tab: "გადახდა",
        hint: "დააჭირე ლუკას სტრიქონს",
        done: "მენეჯერმა ერთხელ დააჭირა. მშობელს დადასტურება მაშინვე მიუვიდა.",
      },
      star: {
        tab: "დღის ვარსკვლავი",
        hint: "მიანიჭე ლუკას ვარსკვლავი",
        done: "მწვრთნელი ვარჯიშზევე ნიშნავს. მშობელი იმავე წამს იგებს.",
      },
      cancel: {
        tab: "გაუქმება",
        hint: "გააუქმე ხვალინდელი ვარჯიში",
        done: "გუნდის ყველა მშობელს შეტყობინება იმავე წამს მისდის.",
      },
      absence: {
        tab: "გაცდენა",
        hint: "მშობლის ტელეფონზე დააჭირე „ვერ დაესწრება?“",
        done: "მწვრთნელმა ვარჯიშამდე იცის, ვინ არ მოვა.",
      },
    },
    tapHere: "დააჭირე აქ",
    replay: "თავიდან",
    next: "შემდეგი",
    phoneOf: { manager: "მენეჯერი", coach: "მწვრთნელი", parent: "მშობელი" },

    roles: {
      manager: {
        label: "მენეჯერი",
        title: "მთელი აკადემია, ერთ ეკრანზე.",
        text: "აღარც Excel-ის ცხრილები, აღარც ჩატებში გადარიცხვის სქრინების ძებნა. გადახდები თვეების მიხედვით, და განცხადება ყველა მშობელს ან ერთ გუნდს, ერთი შეხებით.",
        points: ["გადახდების ისტორია: ვინ მონიშნა და როდის", "ონლაინ რეგისტრაცია ახალი მშობლებისთვის", "გუნდები, მწვრთნელები და მოთამაშეები"],
      },
      coach: {
        label: "მწვრთნელი",
        title: "დასწრება და შეფასება, ვარჯიშზევე.",
        text: "„ყველა მოვიდა“ ერთი ღილაკით, და დასწრება ათ წამშია მონიშნული. ტექნიკა, ფიზიკა, დისციპლინა და კომენტარი მშობლისთვის.",
        points: ["„დღის ვარსკვლავი“", "კალენდარი: ვარჯიშები, თამაშები, გაუქმება", "თამაშის შედეგები და ფოტოგალერეა"],
      },
      parent: {
        label: "მშობელი",
        title: "მშობელმა ყველაფერი იცის.",
        text: "დასწრება, შეფასება და მწვრთნელის კომენტარი მის ტელეფონში. შეტყობინება მოდის მხოლოდ მისი შვილის გუნდზე.",
        points: ["პროგრესის გრაფიკები", "„ვერ დაესწრება“ ერთი შეხებით", "გადასახადის სტატუსი", "რამდენიმე შვილი ერთ ანგარიშში"],
      },
    },

    proofLabel: "უკვე მუშაობს",
    proofTitle: "რუსთავის კალათბურთის აკადემია",
    proofText: "აპი Google Play-ზეა და ყოველდღე იყენებენ მშობლები, მწვრთნელები და აკადემიის მენეჯერი.",
    stats: [
      { value: "140+", label: "მოთამაშე" },
      { value: "90+", label: "მშობელი" },
      { value: "5", label: "მწვრთნელი" },
    ],
    playLink: "ნახე Google Play-ზე",

    startLabel: "დაწყება",
    startTitle: "თქვენს აკადემიაზე აწყობილი.",
    startText:
      "თქვენი სახელი, ლოგო და ფერები. ფეხბურთი, კალათბურთი, ჭიდაობა თუ ცურვა: გუნდები და შეფასების კრიტერიუმები თქვენს სპორტზე ეწყობა.",
    steps: [
      { title: "გაცნობა", text: "მოკლე ზარი: რამდენი გუნდი, მწვრთნელი და ბავშვი გყავთ." },
      { title: "მორგება", text: "ვაწყობთ თქვენს სახელზე. მოთამაშეებს და გუნდებს ჩვენ შევიტანთ." },
      { title: "მშობლები შედიან", text: "ტელეფონის ნომრით, მეილის გარეშე. Android-ზე და iPhone-ზე." },
      { title: "მუშაობს", text: "გადახდები, დასწრება და შეტყობინებები პირველივე კვირიდან." },
    ],

    faqTitle: "კითხვები",

    finalTitle: "ვაჩვენოთ თქვენს აკადემიაზე?",
    finalText: "მოგვწერეთ და მოკლე ზარში გაჩვენებთ, როგორ იმუშავებს LineUp თქვენს გუნდებზე.",
  },
  en: {
    seoTitle: "LineUp: Sports Academy Management App | Payments, Attendance, Parents",
    seoDescription:
      "A sports academy app for managers, coaches and parents. Monthly payment tracking, attendance in 10 seconds, player ratings and notifications to parents. For football, basketball and other sports academies.",
    seoKeywords:
      "sports academy management, academy app, football academy software, basketball academy, attendance tracking, payment tracking, parent app, coach app, sports school software, LineUp",
    breadcrumb: "LineUp",
    kicker: "For football, basketball and other academies",
    heroTitle: "Run your sports academy from one app.",
    heroSubtitle: "The manager marks a payment, the coach marks attendance. The parent sees it the same second.",
    ctaWrite: "Message us on WhatsApp",
    orCall: "or call",
    proofLine: "Running at Rustavi Basketball Academy",

    scenarios: {
      payment: {
        tab: "Payment",
        hint: "Tap Luka's row",
        done: "The manager tapped once. The parent got the confirmation instantly.",
      },
      star: {
        tab: "Star of the day",
        hint: "Give Luka the star",
        done: "The coach marks it at practice. The parent knows the same second.",
      },
      cancel: {
        tab: "Cancellation",
        hint: "Cancel tomorrow's practice",
        done: "Every parent on the team gets a notification the same second.",
      },
      absence: {
        tab: "Absence",
        hint: "On the parent's phone, tap “Can't make it?”",
        done: "The coach knows who's missing before practice.",
      },
    },
    tapHere: "Tap here",
    replay: "Replay",
    next: "Next",
    phoneOf: { manager: "Manager", coach: "Coach", parent: "Parent" },

    roles: {
      manager: {
        label: "Manager",
        title: "The whole academy, on one screen.",
        text: "No more spreadsheets, no more digging through chats for transfer screenshots. Payments month by month, and an announcement to every parent or one team in one tap.",
        points: ["Payment history: who marked it, and when", "Online sign-up for new parents", "Teams, coaches and players"],
      },
      coach: {
        label: "Coach",
        title: "Attendance and ratings, at practice.",
        text: "“Everyone came” in one tap: attendance in ten seconds. Technique, physical, discipline and a comment for the parent.",
        points: ["“Star of the day”", "Calendar: practices, games, cancellations", "Game results and a photo gallery"],
      },
      parent: {
        label: "Parent",
        title: "Parents know everything.",
        text: "Attendance, ratings and the coach's comment on their phone. Notifications only about their own child's team.",
        points: ["Progress charts", "“Can't make it” in one tap", "Fee status", "Several children in one account"],
      },
    },

    proofLabel: "Already running",
    proofTitle: "Rustavi Basketball Academy",
    proofText: "The app is on Google Play and used every day by parents, coaches and the academy's manager.",
    stats: [
      { value: "140+", label: "players" },
      { value: "90+", label: "parents" },
      { value: "5", label: "coaches" },
    ],
    playLink: "See it on Google Play",

    startLabel: "Getting started",
    startTitle: "Set up for your academy.",
    startText:
      "Your name, logo and colours. Football, basketball, wrestling or swimming: teams and rating criteria are set up for your sport.",
    steps: [
      { title: "Get to know you", text: "A short call: how many teams, coaches and children you have." },
      { title: "Set it up", text: "Built on your name. We enter your players and teams for you." },
      { title: "Parents sign in", text: "With their phone number, no email. On Android and iPhone." },
      { title: "It runs", text: "Payments, attendance and notifications from the first week." },
    ],

    faqTitle: "Questions",

    finalTitle: "Shall we show it on your academy?",
    finalText: "Message us and in a short call we'll show you how LineUp would run your teams.",
  },
};

export const faq: Record<Lang, { question: string; answer: string }[]> = {
  ka: [
    {
      question: "რა არის LineUp?",
      answer:
        "LineUp სპორტული აკადემიის მართვის აპლიკაციაა. მენეჯერი გადახდებს და გუნდებს მართავს, მწვრთნელი დასწრებას და შეფასებებს ნიშნავს, მშობელი კი თავისი შვილის დასწრებას, პროგრესსა და გადასახადის სტატუსს ხედავს და შეტყობინებებს იღებს.",
    },
    {
      question: "რომელი სპორტისთვისაა?",
      answer:
        "ნებისმიერისთვის: ფეხბურთი, კალათბურთი, ჭიდაობა, ცურვა და სხვა. გუნდები, ასაკობრივი ჯგუფები და შეფასების კრიტერიუმები თქვენს სპორტზე ეწყობა.",
    },
    {
      question: "მუშაობს iPhone-ზე და Android-ზე?",
      answer: "დიახ. აპი ორივე სისტემაზე მუშაობს, ტელეფონის მთავარი ეკრანიდან, შეტყობინებებით. მენეჯერს კომპიუტერიდანაც შეუძლია მუშაობა.",
    },
    {
      question: "როგორ შედიან მშობლები?",
      answer: "ტელეფონის ნომრით. მეილი არ სჭირდებათ. პირველ შესვლაზე მშობელი თავის პაროლს აყენებს.",
    },
    {
      question: "ბავშვების მონაცემები დაცულია?",
      answer:
        "ბავშვის მონაცემებს ხედავს მხოლოდ მისი მშობელი, მისი მწვრთნელი და აკადემიის მენეჯერი. ყოველი გადახდის მონიშვნა ჟურნალში იწერება: ვინ და როდის. მონაცემებს არ ვყიდით და რეკლამას არ ვაჩვენებთ.",
    },
    {
      question: "როგორ მუშაობს გადახდების აღრიცხვა?",
      answer: "მენეჯერი თვის სიაში ერთი შეხებით ნიშნავს, ვინ გადაიხადა. მშობელს დადასტურება ავტომატურად მისდის, ყოველი მონიშვნა კი ისტორიაში რჩება.",
    },
    {
      question: "რა ღირს?",
      answer: "ღირებულება მოთამაშეებისა და გუნდების რაოდენობაზეა დამოკიდებული. მოგვწერეთ, რამდენი ბავშვი და გუნდი გყავთ, და ზუსტ პირობებს გეტყვით.",
    },
  ],
  en: [
    {
      question: "What is LineUp?",
      answer:
        "LineUp is a sports academy management app. The manager runs payments and teams, the coach marks attendance and ratings, and the parent sees their child's attendance, progress and fee status and gets notifications.",
    },
    {
      question: "Which sports is it for?",
      answer: "Any: football, basketball, wrestling, swimming and more. Teams, age groups and rating criteria are set up for your sport.",
    },
    {
      question: "Does it work on iPhone and Android?",
      answer: "Yes. It runs on both, from the phone's home screen, with notifications. The manager can also work from a computer.",
    },
    {
      question: "How do parents sign in?",
      answer: "With their phone number. No email needed. On the first sign-in the parent sets their own password.",
    },
    {
      question: "Is the children's data safe?",
      answer:
        "A child's data is visible only to their parent, their coach and the academy's manager. Every payment mark is logged: who and when. We don't sell data and show no ads.",
    },
    {
      question: "How does payment tracking work?",
      answer: "The manager marks who has paid in the month's list with one tap. The parent gets a confirmation automatically, and every mark stays in the history.",
    },
    {
      question: "How much does it cost?",
      answer: "It depends on the number of players and teams. Tell us how many children and teams you have, and we'll give you the exact terms.",
    },
    {
      question: "What language is the app in?",
      answer: "Georgian. The demo on this page is shown in English so you can follow it.",
    },
  ],
};
