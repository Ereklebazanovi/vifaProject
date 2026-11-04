// Ready-made emails per IT direction. Picking one fills the email; everything stays
// editable, and any offer ("this month 20% off") is typed into the text by hand.
// Images live in public/email/ (1200x630 flyers), served from vifadigital.ge.

export interface EmailTemplate {
  id: string;
  label: string;
  subject: string;
  body: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
}

const IMG = "https://vifadigital.ge/email";

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "web",
    label: "საიტი და PWA",
    subject: "{name}, თანამედროვე საიტი თქვენი ბიზნესისთვის",
    body:
      "გამარჯობა {name}!\n\n" +
      "VIFA Digital ქმნის სწრაფ, მობილურზე მორგებულ საიტებსა და ონლაინ მაღაზიებს, რომლებიც Google-ში ჩანს და კლიენტებს მოგიყვანთ. საჭიროების შემთხვევაში საიტი ტელეფონზე აპლიკაციასავით დაყენდება (PWA), App Store-ის გარეშე.\n\n" +
      "მარტივი სავიზიტო საიტიდან რთულ პლატფორმამდე: ადმინ პანელით, ონლაინ გადახდით და საწყობის სისტემასთან კავშირით. ფასი 500₾-დან.\n\n" +
      "სიამოვნებით მოგიყვებით, როგორ შეიძლება ეს თქვენს ბიზნესზე აეწყოს.",
    image: `${IMG}/web.jpg`,
    buttonText: "ნახეთ დეტალები და ფასები",
    buttonUrl: "https://vifadigital.ge/services/web",
  },
  {
    id: "chatbot",
    label: "AI ჩატბოტი",
    subject: "{name}, AI ჩატბოტი, რომელიც კლიენტებს 24/7 პასუხობს",
    body:
      "გამარჯობა {name}!\n\n" +
      "კლიენტები Facebook-ზე ხშირად მაშინ წერენ, როცა პასუხის გაცემა ვერ ხერხდება: საღამოს, ღამით, დატვირთულ საათებში. VIFA-ს AI ჩატბოტი Messenger-ში ქართულად პასუხობს 24/7: ფასებზე, სერვისებზე, სამუშაო საათებზე და ჯავშნებზე.\n\n" +
      "ბოტი თქვენი ბიზნესის ინფორმაციაზე სწავლობს, პასუხებს კი ადმინ პანელიდან თავად ცვლით. გაშვება 7-14 დღეში, ფასი 500₾-დან.",
    image: `${IMG}/chatbot.jpg`,
    buttonText: "ნახეთ, როგორ მუშაობს",
    buttonUrl: "https://vifadigital.ge/services/ai-chatbot",
  },
  {
    id: "wms",
    label: "Invento WMS",
    subject: "{name}, მარაგები, შეკვეთები და ფინანსები ერთ სისტემაში",
    body:
      "გამარჯობა {name}!\n\n" +
      "თუ Instagram-ზე, Facebook-ზე ან მაღაზიაში ყიდით, Invento WMS შეკვეთას 10 წამში ატარებს, ნაშთს ავტომატურად აკლებს და ინვოისს თავად ქმნის. Excel-ის ცხრილები და ჩატებში ძებნა აღარ დაგჭირდებათ.\n\n" +
      "სისტემა მუშაობს ტელეფონზეც და კომპიუტერზეც, გუნდის ყველა წევრი ერთსა და იმავე განახლებულ მონაცემს ხედავს. ფასი თვეში 79₾-დან.",
    image: `${IMG}/wms.jpg`,
    buttonText: "ნახეთ Invento WMS",
    buttonUrl: "https://vifadigital.ge/inventowms",
  },
  {
    id: "lineup",
    label: "LineUp",
    subject: "{name}, აკადემიის მართვა ერთ აპლიკაციაში",
    body:
      "გამარჯობა {name}!\n\n" +
      "LineUp სპორტული აკადემიის აპლიკაციაა მენეჯერის, მწვრთნელისა და მშობლისთვის. მენეჯერი გადახდას ერთი შეხებით ნიშნავს, მწვრთნელი დასწრებას ვარჯიშზევე, მშობელი კი ყველაფერს იმავე წამს ხედავს ტელეფონში.\n\n" +
      "LineUp უკვე მუშაობს რუსთავის კალათბურთის აკადემიაში: 140-ზე მეტი მოთამაშე, 90-ზე მეტი მშობელი და 5 მწვრთნელი. აპი თქვენი აკადემიის სახელით, ლოგოთი და ფერებით ეწყობა.",
    image: `${IMG}/lineup.jpg`,
    buttonText: "ნახეთ LineUp",
    buttonUrl: "https://vifadigital.ge/lineup",
  },
  {
    id: "vifa",
    label: "VIFA (ყველა სერვისი)",
    subject: "{name}, VIFA Digital: თქვენი ციფრული პარტნიორი",
    body:
      "გამარჯობა {name}!\n\n" +
      "VIFA Digital ბიზნესს ციფრულ ზრდაში ეხმარება: ვქმნით საიტებსა და ონლაინ მაღაზიებს, AI ჩატბოტებს Facebook-ისთვის, ხოლო საკუთარი პროდუქტები, Invento WMS და LineUp, მარაგებისა და სპორტული აკადემიების მართვას ამარტივებს.\n\n" +
      "სიამოვნებით მოგიყვებით, რომელი გადაწყვეტა მოერგება თქვენს ბიზნესს.",
    image: `${IMG}/vifa.jpg`,
    buttonText: "ნახეთ vifadigital.ge",
    buttonUrl: "https://vifadigital.ge",
  },
];
