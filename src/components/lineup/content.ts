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

export const WHATSAPP_URL =
  "https://wa.me/995557624243?text=" +
  encodeURIComponent("გამარჯობა, დავინტერესდი LineUp-ით, სპორტული აკადემიის აპლიკაციით.");
export const PHONE_HREF = "tel:+995557624243";
export const PHONE_LABEL = "557 62 42 43";
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.rustavihoops.portal";

/** The parent in the demo is Luka's. Index 0 of `kids` is always Luka. */
export const app = {
  ka: {
    menu: "მენიუ",
    academy: "LineUp",
    academySub: "ACADEMY",
    group: "U-12",
    kids: [
      { first: "ლუკა", last: "ბერიძე", no: 10 },
      { first: "ნიკა", last: "კაპანაძე", no: 7 },
      { first: "გიორგი", last: "მესხი", no: 4 },
      { first: "საბა", last: "ჯაფარიძე", no: 11 },
      { first: "ანა", last: "ლომიძე", no: 9 },
    ],
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
    fee: "ნოემბრის გადასახადი",
    unpaid: "გადასახდელია",
    paid: "გადახდილია ✓",
    starBadge: "დღის ვარსკვლავი",
    navParent: ["მთავარი", "კალენდარი", "დასწრება", "პროგრესი"],
    payments: "გადახდები",
    month: "ნოემბერი",
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
    pushPaidTitle: "გადასახადი აღრიცხულია",
    pushPaidBody: "ლუკა ბერიძე · ნოემბერი: გადახდილად მოინიშნა.",
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
      { first: "Luka", last: "Beridze", no: 10 },
      { first: "Nika", last: "Kapanadze", no: 7 },
      { first: "Giorgi", last: "Meskhi", no: 4 },
      { first: "Saba", last: "Japaridze", no: 11 },
      { first: "Ana", last: "Lomidze", no: 9 },
    ],
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
    fee: "November fee",
    unpaid: "Due",
    paid: "Paid ✓",
    starBadge: "Star of the day",
    navParent: ["Home", "Calendar", "Attendance", "Progress"],
    payments: "Payments",
    month: "November",
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
    pushPaidTitle: "Fee recorded",
    pushPaidBody: "Luka Beridze · November: marked as paid.",
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
    kicker: "სპორტული აკადემიებისთვის",
    heroTitle: "სპორტული აკადემიის მართვა, ერთ აპში.",
    heroSubtitle: "მენეჯერი ნიშნავს გადახდას, მწვრთნელი დასწრებას. მშობელი ყველაფერს იმავე წამს ხედავს.",
    ctaDemo: "მოითხოვე დემო",
    proofLine: "მუშაობს რუსთავის კალათბურთის აკადემიაში",

    scenarios: {
      payment: {
        tab: "გადახდა",
        hint: "დააჭირე ლუკას „გადაუხდელი“-ს",
        done: "მენეჯერმა ერთხელ დააჭირა. მშობელს ქვითარი მაშინვე მიუვიდა.",
      },
      star: {
        tab: "დღის ვარსკვლავი",
        hint: "მონიშნე, რომ ლუკა მოვიდა",
        hint2: "ახლა მიანიჭე ვარსკვლავი",
        done: "მწვრთნელი ვარჯიშზევე ნიშნავს. მშობელი იმავე წამს იგებს.",
      },
      cancel: {
        tab: "გაუქმება",
        hint: "გააუქმე ხვალინდელი ვარჯიში",
        done: "გუნდის ყველა მშობელს ერთდროულად მისდის.",
      },
      absence: {
        tab: "გაცდენა",
        hint: "მშობლის ტელეფონზე დააჭირე „ვერ დაესწრება?“",
        done: "მწვრთნელმა ვარჯიშამდე იცის, ვინ არ მოვა.",
      },
    },
    replay: "თავიდან",
    phoneOf: { manager: "მენეჯერი", coach: "მწვრთნელი", parent: "მშობელი" },

    roles: {
      manager: {
        label: "მენეჯერი",
        title: "ვინ გადაიხადა, ერთი შეხედვით.",
        text: "თვის სია ერთ ეკრანზე. ერთი შეხება და მშობელს ქვითარი მისდის. ყოველი მონიშვნა ისტორიაში რჩება: ვინ და როდის.",
        points: ["განცხადება ყველა მშობელს ან ერთ გუნდს", "გუნდები, მწვრთნელები და მოთამაშეები", "ონლაინ რეგისტრაცია ახალი მშობლებისთვის"],
      },
      coach: {
        label: "მწვრთნელი",
        title: "დასწრება ათ წამში.",
        text: "„ყველა მოვიდა“ ერთი ღილაკით. „დღის ვარსკვლავი“ და კომენტარი მშობლისთვის, პირდაპირ ვარჯიშიდან.",
        points: ["შეფასებები: ტექნიკა, ფიზიკა, დისციპლინა", "კალენდარი: ვარჯიშები, თამაშები, გაუქმება", "თამაშის შედეგები და ფოტოგალერეა"],
      },
      parent: {
        label: "მშობელი",
        title: "მშობელმა ყველაფერი იცის.",
        text: "დასწრება, შეფასება და მწვრთნელის კომენტარი მის ტელეფონში. შეტყობინება მოდის მხოლოდ მისი შვილის გუნდზე.",
        points: ["პროგრესის გრაფიკები", "„ვერ დაესწრება“ ერთი შეხებით", "გადასახადის სტატუსი და ქვითარი", "რამდენიმე შვილი ერთ ანგარიშში"],
      },
    },

    proofLabel: "უკვე მუშაობს",
    proofTitle: "Rustavi Basketball Academy",
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
    orCall: "ან დაგვირეკეთ",
  },
  en: {
    seoTitle: "LineUp: Sports Academy Management App | Payments, Attendance, Parents",
    seoDescription:
      "A sports academy app for managers, coaches and parents. Monthly payment tracking, attendance in 10 seconds, player ratings and notifications to parents. For football, basketball and other sports academies.",
    seoKeywords:
      "sports academy management, academy app, football academy software, basketball academy, attendance tracking, payment tracking, parent app, coach app, sports school software, LineUp",
    breadcrumb: "LineUp",
    kicker: "For sports academies",
    heroTitle: "Run your sports academy from one app.",
    heroSubtitle: "The manager marks a payment, the coach marks attendance. The parent sees it the same second.",
    ctaDemo: "Request a demo",
    proofLine: "Running at Rustavi Basketball Academy",

    scenarios: {
      payment: {
        tab: "Payment",
        hint: "Tap Luka's “Unpaid”",
        done: "The manager tapped once. The parent got the receipt instantly.",
      },
      star: {
        tab: "Star of the day",
        hint: "Mark Luka as present",
        hint2: "Now give him the star",
        done: "The coach marks it at practice. The parent knows the same second.",
      },
      cancel: {
        tab: "Cancellation",
        hint: "Cancel tomorrow's practice",
        done: "Every parent on the team gets it at once.",
      },
      absence: {
        tab: "Absence",
        hint: "On the parent's phone, tap “Can't make it?”",
        done: "The coach knows who's missing before practice.",
      },
    },
    replay: "Replay",
    phoneOf: { manager: "Manager", coach: "Coach", parent: "Parent" },

    roles: {
      manager: {
        label: "Manager",
        title: "Who paid, at a glance.",
        text: "The month's list on one screen. One tap and the parent gets a receipt. Every mark stays in the history: who and when.",
        points: ["Announcements to every parent or one team", "Teams, coaches and players", "Online sign-up for new parents"],
      },
      coach: {
        label: "Coach",
        title: "Attendance in ten seconds.",
        text: "“Everyone came” in one tap. “Star of the day” and a comment for parents, straight from practice.",
        points: ["Ratings: technique, physical, discipline", "Calendar: practices, games, cancellations", "Game results and a photo gallery"],
      },
      parent: {
        label: "Parent",
        title: "Parents know everything.",
        text: "Attendance, ratings and the coach's comment on their phone. Notifications only about their own child's team.",
        points: ["Progress charts", "“Can't make it” in one tap", "Fee status and receipts", "Several children in one account"],
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
    orCall: "or call",
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
      answer: "მენეჯერი თვის სიაში ერთი შეხებით ნიშნავს, ვინ გადაიხადა. მშობელს ქვითარი ავტომატურად მისდის, ყოველი მონიშვნა კი ისტორიაში რჩება.",
    },
    {
      question: "რა ღირს?",
      answer: "ფასი აკადემიის ზომაზეა დამოკიდებული. მოგვწერეთ და შევთანხმდებით.",
    },
    {
      question: "რა ენაზეა აპი?",
      answer: "ქართულად.",
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
      answer: "The manager marks who has paid in the month's list with one tap. The parent gets a receipt automatically, and every mark stays in the history.",
    },
    {
      question: "How much does it cost?",
      answer: "It depends on the size of the academy. Message us and we'll agree on it.",
    },
    {
      question: "What language is the app in?",
      answer: "Georgian.",
    },
  ],
};
