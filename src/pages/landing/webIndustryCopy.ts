import type { WebIndustrySlug } from "../../components/ui/industryShowcases";
import { webProjects } from "../../data/webProjects";

type Copy = { ka: string; en: string };
type Pair = [Copy, Copy];
type PackageCopy = { body: Copy; features: Copy[] };

const copy = (ka: string, en: string): Copy => ({ ka, en });
const packageCopy = (body: Copy, ...features: Copy[]): PackageCopy => ({ body, features });

export const webIndustryCopy: Record<WebIndustrySlug, {
  title?: Copy;
  whatsappMessage: Copy;
  serviceIntro: Copy;
  pricingGuide?: Copy;
  website: Copy;
  chatbot: Copy;
  chat: Pair;
  packages: PackageCopy[];
  // A project from webProjects; an industry page may relabel its category.
  projects?: (Omit<(typeof webProjects)[keyof typeof webProjects], "category"> & { category: Copy })[];
  questions: Record<"ka" | "en", string[]>;
  detailQuestions: Pair;
}> = {
  food: {
    whatsappMessage: copy("გამარჯობა, მაინტერესებს რესტორნის ვებსაიტის დამზადება.", "Hello, I’m interested in a website for a restaurant."),
    serviceIntro: copy(
      "სტუმარს მენიუ რესტორანში მოსვლამდეც შეუძლია ნახოს და Google-ის ძიებითაც მიაგნოს. ფასებსა და კერძების ხელმისაწვდომობას მართვის პანელიდან განაახლებთ. იმავე ბმულს სოციალურ ქსელებშიც გააზიარებთ და ადგილზე მყოფ სტუმარსაც გაუგზავნით, ამიტომ მენიუს ცალკე ვერსიის განახლება აღარ დაგჭირდებათ.",
      "Guests can check the menu before they visit and find it through Google search. Update prices and dish availability from the dashboard. Share the same link on social media and with guests on site, so you only have one menu to update."),
    pricingGuide: copy(
      "თუ სტუმრებს ძირითადად მენიუს ბმულს უგზავნით, ვებ-მენიუ საკმარისია. ის რესტორნის სამუშაო საათებსა და მისამართსაც აჩვენებს. ვებ-პლატფორმა გამოგადგებათ, თუ მაგიდისა და ბანკეტის მოთხოვნების მიღება საკუთარ ვებსაიტზევე გინდათ. ღონისძიებების კალენდარში სტუმრები ცოცხალი მუსიკის საღამოების თარიღებსაც ნახავენ.",
      "The web menu is enough if you mainly share a menu link. It also shows the restaurant’s opening hours and address. Pick the platform to receive table and banquet requests on your website. Guests can see your live music dates in the events calendar."),
    website: copy("კერძები, ფასები და მაგიდის ჯავშანი.", "Dishes, prices and table reservations."),
    chatbot: copy("პასუხები მენიუზე და ჯავშნები მიმოწერაში.", "Menu questions and bookings in chat."),
    chat: [
      copy("ხვალ 20:00-ზე 4 სტუმრისთვის მაგიდა გაქვთ?", "Is there a table for four tomorrow at 20:00?"),
      copy("დიახ, თავისუფალია. ვისი სახელით დავჯავშნო?", "Yes, there is. What name should I put on the booking?"),
    ],
    packages: [
      packageCopy(copy("ცალკე ვებსაიტი თქვენი მენიუსთვის.", "A standalone website for your menu."),
        copy("კერძების ფოტოები და აღწერები", "Dishes with photos and descriptions"),
        copy("მენიუ რამდენიმე ენაზე", "Menu in multiple languages"),
        copy("ფასების მართვა", "Price management")),
      packageCopy(copy("ვებსაიტი მაგიდის ჯავშნებისა და ღონისძიებებისთვის.", "A website for table bookings and events."),
        copy("მაგიდის ჯავშნის კალენდარი", "Table reservation calendar"),
        copy("ბანკეტის მოთხოვნის ფორმა", "Banquet inquiry form"),
        copy("შეტყობინებები ელფოსტაზე", "Email notifications")),
    ],
    questions: {
      ka: ["რა ღირს რესტორნის ვებსაიტის დამზადება?", "რით სჯობს საკუთარი ვებსაიტი QR მენიუს ან Wolt-ს?", "შეიძლება მაგიდის ონლაინ ჯავშნის დამატება?", "მენიუ რამდენ ენაზე იქნება?"],
      en: ["What does it cost?", "Why have my own site?", "Can diners book online?", "Is the menu multilingual?"],
    },
    detailQuestions: [
      copy("რას მოიცავს ციფრული მენიუ?", "What does the digital menu include?"),
      copy("როგორ მიიღებთ მაგიდისა და ბანკეტის ჯავშნებს?", "How do you receive table and banquet bookings?"),
    ],
  },
  tourism: {
    title: copy("სასტუმროები და ტურიზმი", "Hotels and tourism"),
    whatsappMessage: copy("გამარჯობა, მაინტერესებს ვებსაიტის დამზადება სასტუმროს ან ტურისტული ბიზნესისთვის.", "Hello, I’m interested in a website for a hotel or tourism business."),
    serviceIntro: copy(
      "საკუთარი ვებსაიტის ბმულით სტუმარს შეგიძლიათ პირდაპირ გაუზიაროთ ინფორმაცია სასტუმროზე. უცხოელი სტუმარი ენას თავად აირჩევს და გზას რუკაზე ნახავს. კითხვების შემთხვევაში დაგიკავშირდებათ WhatsApp-ით, Viber-ით ან ელფოსტით. ნომრების ფოტოებსა და აღწერებს მართვის პანელიდან განაახლებთ.",
      "Send guests a single link to your hotel information. International guests can choose their language and look up directions on a map. They can reach you on WhatsApp, Viber or email. Update room photos and descriptions from the dashboard."),
    pricingGuide: copy(
      "კატალოგი საშუალოდ 2-3 კვირაში მზადდება, ჯავშნების პლატფორმა კი 3-5 კვირაში. პროექტის ზუსტ ვადას მოთხოვნების განხილვის შემდეგ ვათანხმებთ. თუ ჯავშნებს ტელეფონით ან ელფოსტით იღებთ, კატალოგზე სტუმრებს ამ გზებით დაკავშირება შეეძლებათ. პლატფორმაზე სტუმარი თარიღებს პირდაპირ მიუთითებს.",
      "The catalog typically takes 2-3 weeks to build and the booking platform 3-5 weeks. We agree on the exact timeline after reviewing your requirements. Guests can contact you by phone or email from the catalog, or submit their dates directly on the booking platform."),
    website: copy("ნომრების ფოტოები და კალენდარი თარიღების ასარჩევად.", "Room photos and a calendar for choosing dates."),
    chatbot: copy("ჯავშნის მოთხოვნა პირდაპირ მიმოწერიდან.", "Booking requests directly in chat."),
    chat: [
      copy("12-15 დეკემბერს ორი სტუმრისთვის ოთახი გაქვთ?", "Is there a room for two on 12-15 December?"),
      copy("რა სახელით შევავსო ჯავშნის მოთხოვნა?", "What name should I use for the booking request?"),
    ],
    packages: [
      packageCopy(copy("ნომრები, ფოტოები და საკონტაქტო ინფორმაცია ერთ ვებსაიტზე.", "Rooms, photos and contact details."),
        copy("ნომრების ფოტო და ვიდეოგალერეა", "Room photos and videos"),
        copy("ვებსაიტი რამდენიმე ენაზე", "Multilingual website"),
        copy("Google Maps-ის რუკა და გზამკვლევი", "Google Maps and directions")),
      packageCopy(copy("სტუმარი ჯავშანს თქვენი ვებსაიტიდან ითხოვს.", "Direct reservation requests."),
        copy("კალენდარი თარიღების ასარჩევად", "Calendar for selecting dates"),
        copy("შეტყობინებები სტუმარსა და ადმინისტრაციას", "Notifications for guests and staff"),
        copy("სეზონური ფასების მართვა", "Seasonal price management")),
    ],
    questions: {
      ka: ["რა ღირს სასტუმროს ვებსაიტის დამზადება?", "შეიძლება ონლაინ ჯავშნის დამატება?", "სტუმარს შეუძლია სასურველი ენის არჩევა?", "რამდენ ხანში მზადდება სასტუმროს ვებსაიტი?"],
      en: ["What does it cost?", "Can guests book online?", "Is the site multilingual?", "How long will it take?"],
    },
    detailQuestions: [
      copy("როგორ მუშაობს პირდაპირი ჯავშანი?", "How do direct bookings work?"),
      copy("როგორ იპოვიან სტუმრები სასტუმროს Google-ში?", "How will guests find the hotel on Google?"),
    ],
  },
  retail: {
    whatsappMessage: copy("გამარჯობა, მაინტერესებს ონლაინ მაღაზიის დამზადება.", "Hello, I’m interested in building an online store."),
    serviceIntro: copy(
      "თუ შეკვეთებს სოციალურ ქსელებში იღებთ, მყიდველებს შეგიძლიათ პირდაპირ პროდუქტის ან კატალოგის ბმული გაუგზავნოთ.",
      "If you take orders on social media, send buyers a direct link to the product or catalog."),
    website: copy("კატალოგი, კალათა და ბარათით გადახდა.", "Catalog, cart and card payments."),
    chatbot: copy("შეკვეთები და პასუხები მიმოწერაში.", "Orders and answers in chat."),
    chat: [
      copy("თბილისში მიტანა რა ღირს?", "How much is delivery in Tbilisi?"),
      copy("5 ₾, 1-2 დღეში.", "5 ₾ in 1-2 days."),
    ],
    packages: [
      packageCopy(copy("სოციალური ქსელებით მოვაჭრეებისთვის.", "For social media shops."),
        copy("ზომები და ფერები", "Sizes and colors"),
        copy("პროდუქტების მართვა", "Product management"),
        copy("კალათა და ელფოსტა", "Cart and email alerts")),
      packageCopy(copy("მაღაზია ონლაინ გადახდებით.", "Store with payments."),
        copy("Visa და Mastercard", "Visa and Mastercard"),
        copy("ყიდვა რეგისტრაციის გარეშე", "Guest checkout"),
        copy("ფასდაკლების კუპონები", "Discount coupons")),
      packageCopy(copy("მაღაზია მარაგების პროგრამით. WMS-ის გამოწერა ცალკეა.", "Store with WMS. The WMS subscription is separate."),
        copy("მარაგის სინქრონიზაცია", "Stock sync"),
        copy("კურიერის ეტიკეტები", "Courier labels"),
        copy("მომხმარებელთა ბაზა", "Customer database")),
    ],
    projects: [
      { ...webProjects.all4kids, category: copy("საბავშვო მარკეტპლეისი", "Kids’ marketplace") },
      { ...webProjects.geoMarti, category: copy("ტექნიკის ონლაინ მაღაზია", "Online appliance store") },
      webProjects.lifeStore,
    ],
    questions: {
      ka: ["რა ღირს ონლაინ მაღაზია?", "რამდენ ხანში მზადდება?", "შეიძლება ბარათით გადახდა?", "როგორ ვმართავ მარაგსა და კურიერებს?", "მობილურზე სწრაფად იმუშავებს?"],
      en: ["What does it cost?", "When can I launch?", "Can customers pay by card?", "Can I manage fulfillment?", "Is it fast on mobile?"],
    },
    detailQuestions: [
      copy("რა განსხვავებაა კატალოგსა და ონლაინ მაღაზიას შორის?", "How does a catalog differ from an online store?"),
      copy("როგორ უკავშირდება მაღაზია საწყობსა და მიწოდებას?", "How does the store connect to stock and delivery?"),
    ],
  },
  beauty: {
    title: copy("სალონები და ესთეტიკის ცენტრები", "Salons and beauty clinics"),
    whatsappMessage: copy("გამარჯობა, მაინტერესებს სალონის ვებსაიტის დამზადება.", "Hello, I’m interested in a website for a salon."),
    serviceIntro: copy(
      "ვებსაიტის ბმულით კლიენტს ერთდროულად გაუზიარებთ ფასებსა და ნამუშევრებს. თუ ონლაინ ჩაწერას დაამატებთ, კლიენტი დროსთან ერთად სასურველ სპეციალისტსაც თავად აირჩევს.",
      "Share one website link with your prices and work. With online booking, clients choose both the time and the specialist."),
    pricingGuide: copy(
      "თუ მხოლოდ მომსახურებების ჩვენება გინდათ, კატალოგით დაიწყეთ. ჯავშნებისა და პროდუქციის გაყიდვის გაერთიანება კი მაშინ გამოგადგებათ, როცა კლიენტებს მოვლის საშუალებებს ვიზიტებს შორისაც სთავაზობთ.",
      "Start with the catalog if you only need to show your services. Combine bookings and online sales if you also sell beauty products between visits."),
    website: copy("ფასები, ნამუშევრები და ონლაინ ჩაწერა.", "Prices, before-and-after photos and online booking."),
    chatbot: copy("პასუხები ფასებზე და ჩაწერა მიმოწერაში.", "Price questions and bookings in chat."),
    chat: [
      copy("კვირას 13:00-ზე მანიკურზე ჩამწერთ?", "Can I book a manicure on Sunday at 13:00?"),
      copy("მზადაა: კვირა, 13:00. გელოდებით!", "Done: Sunday at 13:00. See you then!"),
    ],
    packages: [
      packageCopy(copy("მომსახურებები ერთ გვერდზე.", "A service catalog."),
        copy("მომსახურებები და ფასები", "Services and prices"),
        copy("გალერეა «მანამდე და შემდეგ»", "Before-and-after gallery"),
        copy("ვებსაიტი სამ ენაზე", "Website in three languages")),
      packageCopy(copy("ვიზიტების ონლაინ მართვა.", "Online appointments."),
        copy("ჩაწერა საკომისიოს გარეშე", "Commission-free bookings"),
        copy("ჯავშნების მართვა", "Booking dashboard"),
        copy("SMS შეტყობინებები პროვაიდერის ტარიფით", "SMS notifications at the provider’s rate")),
      packageCopy(copy("ჩაწერა და პროდუქციის გაყიდვა.", "Bookings and product sales."),
        copy("ონლაინ მაღაზია", "Online store"),
        copy("ბარათით გადახდა", "Card payments"),
        copy("მარაგის კონტროლი", "Stock tracking")),
    ],
    questions: {
      ka: ["რა ღირს სალონის ვებსაიტი?", "შეიძლება ონლაინ ჩაწერის დამატება?", "ფასებსა და ფოტოებს თავად შევცვლი?", "შემიძლია მოვლის საშუალებები გავყიდო?"],
      en: ["What does it cost?", "Can clients book online?", "Can I edit prices and photos?", "Can I sell products online?"],
    },
    detailQuestions: [
      copy("რა ფუნქციები ექნება სალონის ვებსაიტს?", "What features can a salon website have?"),
      copy("როგორ ეხმარება ვებსაიტი სალონს ჯავშნების მიღებაში?", "How does a website help a salon take bookings?"),
    ],
  },
  "legal-finance": {
    title: copy("იურიდიული და საფინანსო კომპანიები", "Law and finance firms"),
    whatsappMessage: copy("გამარჯობა, მაინტერესებს ვებსაიტის დამზადება იურიდიული ან საფინანსო კომპანიისთვის.", "Hello, I’m interested in a website for a law or financial services firm."),
    serviceIntro: copy(
      "ადამიანი, რომელიც პირველად გიკავშირდებათ, ვებსაიტზე ნახავს, რა საკითხებზე მუშაობთ და ვინ არის თქვენს გუნდში. თუ უცხოელ კლიენტებთანაც მუშაობთ, მომსახურებების აღწერას მათთვის გასაგებ ენაზე გამოაქვეყნებთ. კითხვებისთვის სტუმარს საკონტაქტო ფორმაც ექნება.",
      "People contacting you for the first time can see what matters you handle and who is on your team. If you work with international clients, you can publish your services in a language they read. Visitors can also use the contact form."),
    pricingGuide: copy(
      "კორპორატიული ვებსაიტი გამოგადგებათ, თუ გუნდის, მომსახურებებისა და სიახლეების გამოქვეყნება გჭირდებათ. ბლოგსა და გუნდის გვერდს მართვის პანელიდან თავად განაახლებთ. თუ უკვე არსებულ კლიენტებთან ხშირად ცვლით ხელშეკრულებებსა და სხვა კონფიდენციალურ დოკუმენტებს, ვებ-პორტალი მათთვის დახურულ სივრცეს ამატებს. კლიენტი თავისი ანგარიშით შედის და დოკუმენტებს იმავე სივრცეში იღებს.",
      "Choose the corporate site to publish your team, services and news. You can update the blog and team page yourself. If you regularly exchange contracts and other sensitive documents with existing clients, the portal adds a private space for them. Clients sign in to their own account and receive documents there."),
    website: copy("გუნდი, მომსახურებები და დახურული პორტალი.", "Team, services and a private client portal."),
    chatbot: copy("პასუხები სამუშაო საათებსა და მისამართზე.", "Answers about opening hours and location."),
    chat: [
      copy("როგორ დაგიკავშირდეთ?", "How can I contact you?"),
      copy("საკონტაქტო ინფორმაციას ვებსაიტზე ნახავთ.", "You can find the contact details on our website."),
    ],
    packages: [
      packageCopy(copy("ვებსაიტი გუნდის, მომსახურებებისა და სიახლეებისთვის.", "Team, services and news."),
        copy("ვებსაიტი ქართულად, ინგლისურად და რუსულად", "Georgian, English and Russian"),
        copy("ბლოგი და კონტენტის მართვის პანელი", "Blog and content management panel"),
        copy("საკონტაქტო ფორმა შეტყობინებებით", "Contact form with notifications")),
      packageCopy(copy("ვებსაიტი კლიენტების დახურული სივრცით.", "A private client space."),
        copy("კლიენტის ანგარიში", "Client login"),
        copy("დოკუმენტების უსაფრთხო გაცვლა", "Secure document sharing"),
        copy("ჩატი ვებსაიტზე", "Website live chat")),
    ],
    projects: [webProjects.darchiaPartners],
    questions: {
      ka: ["რა ღირს იურიდიული კომპანიის ვებსაიტის დამზადება?", "შეიძლება კლიენტებისთვის დახურული პორტალის შექმნა?", "ვებსაიტი რამდენიმე ენაზე იქნება?", "ბლოგსა და გუნდის გვერდს თავად განვაახლებ?"],
      en: ["What does it cost?", "Can clients have a private portal?", "Is the site multilingual?", "Can I update the blog and team?"],
    },
    detailQuestions: [
      copy("რა უნდა ჩანდეს კომპანიის ვებსაიტზე?", "What should a firm’s website show?"),
      copy("როგორ ცვლით დოკუმენტებს კლიენტის პორტალში?", "How do you share documents through the client portal?"),
    ],
  },
};
