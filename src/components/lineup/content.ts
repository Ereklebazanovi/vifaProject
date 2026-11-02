// LineUp — copy and demo data for the /lineup page, in both languages.
//
// Everything the page shows is a feature that runs today in the real app
// (Rustavi Basketball Academy, live on Google Play since 2026-09). The children,
// numbers and messages in the phone mockups are invented: no real family's data
// may ever appear on a marketing page.
//
// The notification texts are the real app's own ("გადასახადი აღრიცხულია",
// "დღის ვარსკვლავი", "ვარჯიში გაუქმდა", "გაცდენის შეტყობინება").

export type Lang = "ka" | "en";

export const ACCENT = "#FA650F";

export const WHATSAPP_URL =
  "https://wa.me/995557624243?text=" +
  encodeURIComponent("გამარჯობა, დავინტერესდი LineUp-ით — სპორტული აკადემიის აპლიკაციით.");
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
    // parent home
    attendance: "დასწრება",
    rating: "შეფასება",
    growth: "ზრდა",
    lastPractices: "ბოლო ვარჯიშები",
    all: "ყველა",
    chips: ["პარ", "ოთხ", "ორშ"],
    coachComment: "მწვრთნელის კომენტარი",
    comment: "დღეს დაცვაში ბევრად უკეთესი იყო — განაგრძეთ ასე.",
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
    // manager payments
    payments: "გადახდები",
    month: "ნოემბერი",
    paidOf: (n: number, of: number) => `${n}/${of} გადახდილია`,
    filters: ["ყველა", "გადახდილი", "გადაუხდელი"],
    search: "მოთამაშის ძებნა",
    statusPaid: "გადახდილი",
    statusUnpaid: "გადაუხდელი",
    navManager: ["მთავარი", "მოთამაშეები", "გადახდები", "კალენდარი"],
    // coach attendance
    attendanceTitle: "დასწრება",
    today: "დღეს",
    everyoneCame: "ყველა მოვიდა",
    starHint: "დამსწრეს შეგიძლია „დღის ვარსკვლავი“ მიანიჭო — მშობელი ნახავს.",
    save: "შენახვა",
    willBeAbsent: "ვერ მოვა",
    navCoach: ["გუნდები", "დასწრება", "კალენდარი", "თამაშები"],
    // coach calendar
    calendar: "კალენდარი",
    thisWeek: "ეს კვირა",
    cancel: "გაუქმება",
    game: "თამაში",
    gameVs: "vs „ვარსკვლავი“",
    sat: "შაბ · 12:00",
    // progress
    progress: "პროგრესი",
    lastRating: "ბოლო შეფასება",
    skills: [
      { label: "ტექნიკა", value: 8 },
      { label: "ფიზიკა", value: 7 },
      { label: "დისციპლინა", value: 8 },
    ],
    // push notifications — the real app's texts
    pushPaidTitle: "გადასახადი აღრიცხულია",
    pushPaidBody: "ლუკა ბერიძე · ნოემბერი — გადახდილად მოინიშნა.",
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
    comment: "Much better on defence today — keep it up.",
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
    starHint: "Give a present player “Star of the day” — the parent sees it.",
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
    pushPaidBody: "Luka Beridze · November — marked as paid.",
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
    seoTitle: "LineUp — სპორტული აკადემიის მართვის აპლიკაცია | გადახდები, დასწრება, მშობლები",
    seoDescription:
      "სპორტული აკადემიის აპლიკაცია მენეჯერის, მწვრთნელისა და მშობლისთვის: გადახდების აღრიცხვა თვეების მიხედვით, დასწრება 10 წამში, შეფასებები და push-შეტყობინებები მშობლებს. ფეხბურთის, კალათბურთისა და ნებისმიერი სპორტის აკადემიისთვის.",
    seoKeywords:
      "სპორტული აკადემიის მართვა, აკადემიის აპლიკაცია, ფეხბურთის აკადემიის პროგრამა, კალათბურთის აკადემია, დასწრების აღრიცხვა, გადახდების აღრიცხვა, მშობლების აპლიკაცია, მწვრთნელის აპლიკაცია, სპორტული სკოლის პროგრამა, LineUp",
    breadcrumb: "LineUp — აკადემიის აპი",
    eyebrow: "LineUp · სპორტული აკადემიებისთვის",
    heroTitleA: "სპორტული აკადემიის მართვა",
    heroTitleB: "ერთ აპში",
    heroSubtitle:
      "გადახდები, დასწრება, შეფასებები და მშობლებთან კავშირი — მენეჯერის, მწვრთნელისა და მშობლის ტელეფონში. Excel-ის, რვეულისა და მესენჯერის ჯგუფების ნაცვლად.",
    ctaDemo: "მოითხოვე დემო",
    ctaTry: "გამოსცადე ახლავე",
    heroTrust: "უკვე მუშაობს რუსთავის კალათბურთის აკადემიაში · Google Play-ზე",

    painsEyebrow: "ნაცნობია?",
    painsTitle: "აკადემია იზრდება — რვეული კი არა",
    pains: [
      {
        before: "„ვინ გადაიხადა ამ თვეში?“",
        beforeText: "ბანკის ამონაწერი, Excel და ხელით მონიშვნა — ყოველ თვე, ყველა ბავშვზე.",
        after: "ერთი სია, თვეების მიხედვით. ერთი შეხება — და მშობელს ქვითარი მისდის.",
      },
      {
        before: "„ხვალ ვარჯიში არ გვაქვს“ — ვინ წაიკითხა?",
        beforeText: "მესენჯერის ჯგუფში მნიშვნელოვანი შეტყობინება ასობით სხვას შორის იკარგება.",
        after: "შეტყობინება პირდაპირ მშობლის ტელეფონზე — მხოლოდ მისი შვილის გუნდზე.",
      },
      {
        before: "„როგორ არის ჩემი შვილი?“",
        beforeText: "მწვრთნელს ყველა მშობელს ცალ-ცალკე უწევს ახსნა, მშობელი კი პროგრესს ვერ ხედავს.",
        after: "დასწრება, შეფასებები და მწვრთნელის კომენტარი — მშობლის ტელეფონში, ყოველდღე.",
      },
    ],

    demoEyebrow: "ცოცხალი დემო",
    demoTitle: "დააჭირე — და ნახე, რას ხედავს მშობელი",
    demoSubtitle:
      "მარცხნივ აკადემიის ტელეფონია, მარჯვნივ — მშობლის. ყველაფერი ნამდვილი აპივით მუშაობს; ბავშვები და ციფრები მოგონილია.",
    scenarios: {
      payment: {
        tab: "გადახდა",
        hint: "დააჭირე ლუკას „გადაუხდელი“-ს",
        done: "მენეჯერმა ერთხელ დააჭირა — მშობელს ქვითარი მაშინვე მიუვიდა, და ორივე ხედავს ერთსა და იმავეს.",
      },
      star: {
        tab: "დღის ვარსკვლავი",
        hint: "მონიშნე, რომ ლუკა მოვიდა ✓",
        hint2: "ახლა მიანიჭე ⭐",
        done: "მწვრთნელი დასწრებას ვარჯიშზევე ნიშნავს — ვარსკვლავს მშობელი იმავე წამს იგებს.",
      },
      cancel: {
        tab: "ვარჯიში გაუქმდა",
        hint: "გააუქმე ხვალინდელი ვარჯიში",
        done: "გუნდის ყველა მშობელს ერთდროულად მისდის — მესენჯერში ძებნა აღარ სჭირდება.",
      },
      absence: {
        tab: "გაცდენა",
        hint: "მშობლის მხრიდან: „ვერ დაესწრება“",
        done: "მშობელი ერთი შეხებით აცნობებს — მწვრთნელმა ვარჯიშამდე იცის, ვინ არ მოვა.",
      },
    },
    roleManager: "მენეჯერი",
    roleCoach: "მწვრთნელი",
    roleParent: "მშობელი",
    replay: "თავიდან",
    phoneOf: { manager: "მენეჯერის ტელეფონი", coach: "მწვრთნელის ტელეფონი", parent: "მშობლის ტელეფონი" },

    rolesEyebrow: "სამი როლი",
    rolesTitle: "თითოეულს — თავისი ეკრანი",
    roles: {
      manager: {
        title: "მენეჯერი ხედავს მთელ აკადემიას",
        points: [
          "გადახდები თვეების მიხედვით — ვინ გადაიხადა, ვინ არა",
          "ქვითარი მშობელს ავტომატურად მისდის",
          "გადახდების ისტორია: ვინ მონიშნა და როდის",
          "განცხადება ყველა მშობელს ან ერთ გუნდს",
          "გუნდები, მწვრთნელები და მოთამაშეები ერთ ადგილას",
          "ონლაინ რეგისტრაცია ახალი მშობლებისთვის",
        ],
      },
      coach: {
        title: "მწვრთნელი — ვარჯიშზე, ტელეფონით",
        points: [
          "დასწრება 10 წამში — „ყველა მოვიდა“ ერთი ღილაკით",
          "„დღის ვარსკვლავი“ და კომენტარი მშობლებისთვის",
          "შეფასებები: ტექნიკა, ფიზიკა, დისციპლინა",
          "კალენდარი: ვარჯიშები, თამაშები, გაუქმება",
          "თამაშის შედეგები და ფოტოგალერეა",
        ],
      },
      parent: {
        title: "მშობელი ხედავს თავისი შვილის ყველაფერს",
        points: [
          "დასწრება, შეფასება და ზრდა — მთავარ ეკრანზე",
          "პროგრესის გრაფიკები და მწვრთნელის კომენტარები",
          "კალენდარი და „ვერ დაესწრება“ ერთი შეხებით",
          "გადასახადის სტატუსი და ქვითარი",
          "მიწერა მწვრთნელს და მენეჯერს",
          "რამდენიმე შვილი — ერთ ანგარიშში",
        ],
      },
    },

    fitEyebrow: "ნებისმიერი სპორტი",
    fitTitle: "თქვენს აკადემიაზე მორგებული",
    fitText:
      "თქვენი სახელი, ლოგო და ფერები. გუნდები, ასაკობრივი ჯგუფები და შეფასების კრიტერიუმები თქვენს სპორტზე ეწყობა — მოთამაშეებს და ჯგუფებს ჩვენ შევიტანთ.",
    sports: ["⚽ ფეხბურთი", "🏀 კალათბურთი", "🤼 ჭიდაობა", "🏊 ცურვა", "🥋 ძიუდო", "🎾 ჩოგბურთი", "🏐 ფრენბურთი", "🤸 ტანვარჯიში"],

    stepsEyebrow: "როგორ ვიწყებთ",
    stepsTitle: "ოთხი ნაბიჯი",
    steps: [
      { title: "გაცნობა", text: "მოკლე ზარი: რამდენი გუნდი, მწვრთნელი და ბავშვი გყავთ, როგორ აგროვებთ გადასახადს." },
      { title: "მორგება", text: "ვაწყობთ თქვენს სახელზე, ლოგოსა და ფერებზე. მოთამაშეებს და გუნდებს ჩვენ შევიტანთ." },
      { title: "მშობლები შედიან", text: "ტელეფონის ნომრით — მეილი არ სჭირდება. მუშაობს Android-ზე და iPhone-ზე." },
      { title: "მუშაობს", text: "გადახდები, დასწრება და შეტყობინებები — პირველივე კვირიდან." },
    ],

    caseEyebrow: "უკვე მუშაობს",
    caseTitle: "Rustavi Basketball Academy",
    caseText:
      "მშობლები ყოველდღე ხედავენ დასწრებას, შეფასებებს და გადასახადის სტატუსს. მწვრთნელები დასწრებას ვარჯიშზევე ნიშნავენ, მენეჯერი კი გადახდებს ერთ სიაში ხედავს.",
    caseStats: [
      { value: "140+", label: "მოთამაშე" },
      { value: "90+", label: "მშობელი" },
      { value: "5", label: "მწვრთნელი" },
    ],
    casePlay: "Google Play-ზე",

    trustTitle: "ბავშვების მონაცემები — დაცული",
    trust: [
      "ბავშვის მონაცემებს ხედავს მხოლოდ მისი მშობელი და მწვრთნელი",
      "ყოველი გადახდის მონიშვნა იწერება — ვინ და როდის",
      "რეკლამის და მონაცემების გაყიდვის გარეშე",
    ],

    faqEyebrow: "კითხვები",
    faqTitle: "ხშირად დასმული კითხვები",

    finalTitle: "ვაჩვენოთ თქვენს აკადემიაზე?",
    finalText: "მოგვწერეთ — 15 წუთში გაჩვენებთ, როგორ იმუშავებს LineUp თქვენს გუნდებზე.",
  },
  en: {
    seoTitle: "LineUp — Sports Academy Management App | Payments, Attendance, Parents",
    seoDescription:
      "A sports academy app for managers, coaches and parents: monthly payment tracking, attendance in 10 seconds, player ratings and push notifications to parents. For football, basketball and any sports academy.",
    seoKeywords:
      "sports academy management, academy app, football academy software, basketball academy, attendance tracking, payment tracking, parent app, coach app, sports school software, LineUp",
    breadcrumb: "LineUp — academy app",
    eyebrow: "LineUp · for sports academies",
    heroTitleA: "Run your sports academy",
    heroTitleB: "from one app",
    heroSubtitle:
      "Payments, attendance, ratings and parent communication — on the manager's, the coach's and the parent's phone. Instead of spreadsheets, notebooks and group chats.",
    ctaDemo: "Request a demo",
    ctaTry: "Try it live",
    heroTrust: "Already running at Rustavi Basketball Academy · on Google Play",

    painsEyebrow: "Sound familiar?",
    painsTitle: "The academy grows — the notebook doesn't",
    pains: [
      {
        before: "“Who paid this month?”",
        beforeText: "Bank statements, spreadsheets and ticking boxes by hand — every month, for every child.",
        after: "One list, month by month. One tap — and the parent gets a receipt.",
      },
      {
        before: "“No practice tomorrow” — who read it?",
        beforeText: "In a group chat, the one message that matters drowns among hundreds of others.",
        after: "A notification straight to the parent's phone — only for their child's team.",
      },
      {
        before: "“How is my child doing?”",
        beforeText: "The coach explains it to every parent one by one, and parents never see the progress.",
        after: "Attendance, ratings and the coach's comment — on the parent's phone, every day.",
      },
    ],

    demoEyebrow: "Live demo",
    demoTitle: "Tap — and see what the parent sees",
    demoSubtitle:
      "The academy's phone is on the left, a parent's on the right. It works like the real app; the children and numbers are made up.",
    scenarios: {
      payment: {
        tab: "Payment",
        hint: "Tap Luka's “Unpaid”",
        done: "The manager tapped once — the parent got the receipt instantly, and both see the same thing.",
      },
      star: {
        tab: "Star of the day",
        hint: "Mark Luka as present ✓",
        hint2: "Now give him a ⭐",
        done: "The coach marks attendance at practice — the parent hears about the star the same second.",
      },
      cancel: {
        tab: "Cancelled practice",
        hint: "Cancel tomorrow's practice",
        done: "Every parent on the team gets it at once — no digging through a group chat.",
      },
      absence: {
        tab: "Absence",
        hint: "From the parent: “Can't make it”",
        done: "The parent lets the coach know in one tap — the coach knows who's missing before practice.",
      },
    },
    roleManager: "Manager",
    roleCoach: "Coach",
    roleParent: "Parent",
    replay: "Replay",
    phoneOf: { manager: "Manager's phone", coach: "Coach's phone", parent: "Parent's phone" },

    rolesEyebrow: "Three roles",
    rolesTitle: "Each with its own screen",
    roles: {
      manager: {
        title: "The manager sees the whole academy",
        points: [
          "Payments month by month — who paid, who didn't",
          "Receipts go to parents automatically",
          "Payment history: who marked it, and when",
          "Announcements to every parent or one team",
          "Teams, coaches and players in one place",
          "Online sign-up for new parents",
        ],
      },
      coach: {
        title: "The coach — at practice, on the phone",
        points: [
          "Attendance in 10 seconds — “Everyone came” in one tap",
          "“Star of the day” and comments for parents",
          "Ratings: technique, physical, discipline",
          "Calendar: practices, games, cancellations",
          "Game results and a photo gallery",
        ],
      },
      parent: {
        title: "The parent sees everything about their child",
        points: [
          "Attendance, rating and growth — on the home screen",
          "Progress charts and the coach's comments",
          "Calendar and “can't make it” in one tap",
          "Fee status and receipts",
          "Messages to the coach and the manager",
          "Several children — one account",
        ],
      },
    },

    fitEyebrow: "Any sport",
    fitTitle: "Made for your academy",
    fitText:
      "Your name, logo and colours. Teams, age groups and rating criteria are set up for your sport — and we enter your players and teams for you.",
    sports: ["⚽ Football", "🏀 Basketball", "🤼 Wrestling", "🏊 Swimming", "🥋 Judo", "🎾 Tennis", "🏐 Volleyball", "🤸 Gymnastics"],

    stepsEyebrow: "How we start",
    stepsTitle: "Four steps",
    steps: [
      { title: "Get to know you", text: "A short call: how many teams, coaches and children you have, and how you collect fees." },
      { title: "Set it up", text: "Your name, logo and colours. We enter your players and teams for you." },
      { title: "Parents sign in", text: "With their phone number — no email needed. Works on Android and iPhone." },
      { title: "It runs", text: "Payments, attendance and notifications — from the very first week." },
    ],

    caseEyebrow: "Already running",
    caseTitle: "Rustavi Basketball Academy",
    caseText:
      "Parents see attendance, ratings and fee status every day. Coaches mark attendance at practice, and the manager sees every payment in one list.",
    caseStats: [
      { value: "140+", label: "players" },
      { value: "90+", label: "parents" },
      { value: "5", label: "coaches" },
    ],
    casePlay: "On Google Play",

    trustTitle: "Children's data — protected",
    trust: [
      "A child's data is visible only to their parent and coach",
      "Every payment mark is logged — who and when",
      "No ads, and no selling of data",
    ],

    faqEyebrow: "Questions",
    faqTitle: "Frequently asked questions",

    finalTitle: "Shall we show it on your academy?",
    finalText: "Message us — in 15 minutes we'll show you how LineUp would run your teams.",
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
      answer:
        "დიახ. აპი ორივე სისტემაზე მუშაობს, ტელეფონის მთავარი ეკრანიდან, შეტყობინებებით. მენეჯერს შეუძლია კომპიუტერიდანაც იმუშაოს.",
    },
    {
      question: "როგორ შედიან მშობლები?",
      answer:
        "ტელეფონის ნომრით. მეილი არ სჭირდებათ. პირველ შესვლაზე მშობელი თავის პაროლს აყენებს.",
    },
    {
      question: "ბავშვების მონაცემები დაცულია?",
      answer:
        "ბავშვის მონაცემებს ხედავს მხოლოდ მისი მშობელი, მისი მწვრთნელი და აკადემიის მენეჯერი. ყოველი გადახდის მონიშვნა ჟურნალში იწერება — ვინ და როდის. მონაცემებს არ ვყიდით და რეკლამას არ ვაჩვენებთ.",
    },
    {
      question: "როგორ მუშაობს გადახდების აღრიცხვა?",
      answer:
        "მენეჯერი თვის სიაში ერთი შეხებით ნიშნავს, ვინ გადაიხადა. მშობელს ქვითარი ავტომატურად მისდის, ხოლო ყოველი მონიშვნა ისტორიაში რჩება.",
    },
    {
      question: "რა ღირს?",
      answer: "ფასი აკადემიის ზომაზეა დამოკიდებული. მოგვწერეთ და შეგითანხმებთ.",
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
      answer:
        "Any: football, basketball, wrestling, swimming and more. Teams, age groups and rating criteria are set up for your sport.",
    },
    {
      question: "Does it work on iPhone and Android?",
      answer:
        "Yes. It runs on both, from the phone's home screen, with notifications. The manager can also work from a computer.",
    },
    {
      question: "How do parents sign in?",
      answer: "With their phone number — no email needed. On the first sign-in the parent sets their own password.",
    },
    {
      question: "Is the children's data safe?",
      answer:
        "A child's data is visible only to their parent, their coach and the academy's manager. Every payment mark is logged — who and when. We don't sell data and show no ads.",
    },
    {
      question: "How does payment tracking work?",
      answer:
        "The manager marks who has paid in the month's list with one tap. The parent gets a receipt automatically, and every mark stays in the history.",
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
