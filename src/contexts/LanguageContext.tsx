import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "ka" | "en"; // Georgian and English

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation keys and their values
const translations = {
  ka: {
    // Home page
    "home.hero.title": "შექმენი წარმატებული ბიზნესი ციფრული გზით",
    "home.hero.subtitle":
      "ვიფა - თქვენი სანდო პარტნიორი ციფრული წარმატებისთვის",
    "home.hero.description":
      "ჩვენ გთავაზობთ სრულ ციფრულ სერვისებს: ვებსაიტის შექმნა, სოციალური მედია მართვა, ციფრული რეკლამა და კონტენტ პროდუქცია",
    "home.hero.getStarted": "დაიწყე პროექტი",
    "home.hero.ourServices": "ჩვენი სერვისები",

    // Problem-Solution Section
    "home.problems.title": "ხომ არ გაქვს ეს პრობლემები?",
    "home.problems.lowSales": "ნაკლები გაყიდვები და კლიენტები ვერ პოულობ",
    "home.problems.noOnlinePresence": "შენი ბიზნესი ონლაინ პრაქტიკულად არ ჩანს",
    "home.problems.ineffectiveMarketing":
      "რეკლამაზე ფულს ხარჯავ, მაგრამ შედეგი არაფერი",

    "home.solutions.title": "ჩვენ გვაქვს გამოსავალი",
    "home.solutions.digitalStrategy":
      "სრული ციფრული სტრატეგია შენი ბიზნესისთვის",
    "home.solutions.brandVisibility":
      "ბრენდის ხილვადობის გაზრდა სწორ ადამიანებთან",
    "home.solutions.targetedMarketing":
      "დამიზნებული მარკეტინგი მდგრადი შედეგებისთვის",

    // Journey Section
    "home.journey.title": "როგორ მუშაობს ჩვენი თანამშრომლობა",
    "home.journey.step1.title": "კვლევა & სტრატეგია",
    "home.journey.step1.description":
      "ანალიზი და საუკეთესო სტრატეგიის შემუშავება შენი ბიზნესისთვის",
    "home.journey.step2.title": "განხორციელება",
    "home.journey.step2.description":
      "ფოკუსირებული მუშაობა მაღალი ხარისხის შედეგებისთვის",
    "home.journey.step3.title": "მუდმივი ოპტიმიზაცია",
    "home.journey.step3.description":
      "რეგულარული მონიტორინგი და გაუმჯობესება შედეგების მიღწევისთვის",

    // Approach Section
    "home.approach.title": "რით ვეხმარებით შენს ბიზნესს",
    "home.approach.subtitle":
      "ყოველი პროექტი უნიკალურია - ამიტომ ინდივიდუალურ მიდგომას ვიყენებთ",
    "home.approach.webdev.description":
      "თანამედროვე, სწრაფი ვებსაიტები რომელიც კლიენტებს მოიზიდავს",
    "home.approach.webdev.benefit1":
      "სრულად მობილურ მოწყობილობებზე ადაპტირებული",
    "home.approach.webdev.benefit2": "მაღალი რანგის SEO Google-ში ჩასანებად",
    "home.approach.webdev.benefit3": "უსაფრთხო და სწრაფი ჰოსტინგი",
    "home.approach.ads.description":
      "მიზნობრივი რეკლამა რომელიც შედეგებს იღებს",
    "home.approach.ads.benefit1": "ექსპერტული მართვა Google-სა და Facebook-ზე",
    "home.approach.ads.benefit2": "ხარჯების ოპტიმიზაცია და ROI-ის ზრდა",
    "home.approach.ads.benefit3":
      "რეგულარული რეპორტები და გამჭირვალე კომუნიკაცია",
    "home.approach.social.description":
      "სოციალური მედია სტრატეგია ბრენდის ზრდისთვის",
    "home.approach.social.benefit1": "ყოველდღიური კონტენტი და ურთიერთობა",
    "home.approach.social.benefit2": "ორგანული მიმდევრების ზრდა",
    "home.approach.social.benefit3": "ბრენდის ცნობადობის გაზრდა",
    "home.approach.learnMore": "გაიგე მეტი",

    // Services section
    "home.services.title": "ჩვენი სერვისები",
    "home.services.subtitle": "სრული ციფრული გამოსავლები შენი ბიზნესისთვის",

    "home.services.webdev.title": "ვებსაიტი",
    "home.services.webdev.description":
      "პროფესიონალური, მობილურზე ოპტიმიზირებული ვებსაიტები და ონლაინ მაღაზიები",
    "home.services.webdev.price": "₾800-დან",
    "home.services.webdev.button": "გაიგე მეტი",

    "home.services.content.title": "კონტენტ პროდუქცია",
    "home.services.content.description":
      "პროფესიონალური ფოტო/ვიდეო სერვისები და ბრენდინგი",
    "home.services.content.price": "₾300-დან",
    "home.services.content.button": "გაიგე მეტი",

    "home.services.social.title": "სოციალური მედია მართვა",
    "home.services.social.description":
      "სრული Instagram/Facebook გვერდების მართვა და ზრდა",
    "home.services.social.price": "₾400/თვე",
    "home.services.social.button": "გაიგე მეტი",

    "home.services.ads.title": "ციფრული რეკლამა",
    "home.services.ads.description":
      "Facebook/Instagram რეკლამების მართვა და ოპტიმიზაცია",
    "home.services.ads.price": "₾500/თვე",
    "home.services.ads.button": "გაიგე მეტი",

    // Why Choose Us section
    "home.whyUs.title": "რატომ ვიფა?",
    "home.whyUs.subtitle": "ყველაფერი ერთ ადგილზე - ციფრული წარმატებისთვის",

    "home.whyUs.experience.title": "გამოცდილება",
    "home.whyUs.experience.description":
      "3+ წლიანი გამოცდილება ციფრულ მარკეტინგში",

    "home.whyUs.results.title": "შედეგები",
    "home.whyUs.results.description":
      "200+ წარმატებული პროექტი და კმაყოფილი კლიენტები",

    "home.whyUs.support.title": "მხარდაჭერა",
    "home.whyUs.support.description": "24/7 მხარდაჭერა და უფასო კონსულტაციები",

    "home.whyUs.price.title": "ფასი",
    "home.whyUs.price.description":
      "კონკურენტული ფასები და მოქნილი გადახდის პირობები",

    // CTA section
    "home.cta.title": "მზად ხარ ბიზნესის ზრდისთვის?",
    "home.cta.description":
      "დაიწყე ჩვენთან თანამშრომლობა და ნახე შენი ბიზნესის ციფრული ტრანსფორმაცია",
    "home.cta.button": "დაიწყე პროექტი",
    "home.cta.contact": "დაგვიკავშირდი",
    "home.cta.callNow": "დარეკე ახლავე - 557 62 42 43",
    "home.cta.benefits":
      "🎁 პირველი კონსულტაცია უფასო • ✨ ბიზნეს გეგმის შემუშავება",

    // Navigation
    "nav.home": "მთავარი",
    "nav.services": "სერვისები",
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.portfolio": "პორტფოლიო",
    "nav.blog": "ბლოგი",
    "nav.startProject": "პროექტის დაწყება",

    // Footer
    "footer.brand.tagline": "ციფრული პარტნიორი",
    "footer.brand.description":
      "შენი ბრენდის ციფრული ტრანსფორმაცია. ჩვენ გთავაზობთ სრულ ეკოსისტემას: ვებ განვითარება, SEO და სოციალური მედიის სტრატეგიული მართვა.",

    "footer.quickLinks.title": "სწრაფი ბმულები",
    "footer.quickLinks.home": "მთავარი",
    "footer.quickLinks.about": "ჩვენ შესახებ",
    "footer.quickLinks.contact": "კონტაქტი",

    "footer.services.title": "სერვისები",
    "footer.services.webdev": "ვებ განვითარება",
    "footer.services.ads": "ციფრული რეკლამა",
    "footer.services.social": "სოციალური მედია",

    "footer.contact.title": "კონტაქტი",
    "footer.contact.location": "თბილისი, საქართველო",

    "footer.newsletter.title": "სიახლეები",
    "footer.newsletter.placeholder": "შეიყვანეთ თქვენი ელ-ფოსტა",
    "footer.newsletter.subscribe": "დადასტურება",

    "footer.copyright": "ყველა უფლება დაცულია.",
    "footer.privacy": "კონფიდენციალურობის პოლიტიკა",
    "footer.terms": "მომსახურების პირობები",
    "footer.createdBy": "შექმნილია",
    "footer.createdByTeam": "გუნდის მიერ",
    "footer.backToTop": "ზემოთ დაბრუნება",

    // About Page
    "about.hero.title": "ვიფა ციფრული შესახებ",
    "about.hero.subtitle": "თქვენი სანდო პარტნიორი ციფრულ ზრდაში",
    "about.hero.description":
      "ჩვენ ვქმნით ციფრული მარკეტინგის სტრატეგიებს რომელიც ბიზნესებს ეხმარება ონლაინ ზრდაში. ჩვენი გამოცდილება 3+ წელს მოიცავს 200+ წარმატებული პროექტით.",

    "about.vision.title": "ჩვენი ხედვა",
    "about.vision.description":
      "გავხდეთ წამყვანი ციფრული მარკეტინგის სააგენტო საქართველოში, ვეხმაროთ ნებისმიერი ზომის ბიზნესს მისი ონლაინ მიზნების მიღწევაში.",

    "about.values.title": "ჩვენი",
    "about.values.quality": "ხარისხი",
    "about.values.qualityDesc":
      "ვაწარმოებთ მაღალი ხარისხის გამოსავლებს რომლებიც მოლოდინს აღემატება",
    "about.values.innovation": "ინოვაცია",
    "about.values.innovationDesc":
      "ვიყენებთ ციფრული მარკეტინგის უახლეს ტრენდებს",
    "about.values.results": "შედეგები",
    "about.values.resultsDesc":
      "ვფოკუსირდებით გამზომ შედეგებზე თქვენი ბიზნესისთვის",

    "about.team.title": "ჩვენი გუნდი",
    "about.team.subtitle": "გაიცანით ექსპერტები თქვენი წარმატების უკან",

    "about.stats.projects": "დასრულებული პროექტები",
    "about.stats.clients": "კმაყოფილი კლიენტები",
    "about.stats.experience": "წლიანი გამოცდილება",
    "about.stats.support": "მხარდაჭერა",

    // About Story Section
    "about.story.title": "ჩვენი",
    "about.story.titleHighlight": "ისტორია",
    "about.story.paragraph1":
      "ვიფა ციფრული დაარსდა 2021 წელს იმ მიზნით, რომ საქართველოში მცირე და საშუალო ბიზნესებს ეხმარება ციფრული ტრანსფორმაციის პროცესში. ჩვენ ვიყავით თვითნასწავლები, რომლებმაც საკუთარი გამოცდილებით შეიმუშავეს უნიკალური მიდგომა.",

    "about.story.paragraph2":
      "დღეს ჩვენ ვართ გუნდი, რომელიც აერთიანებს კრეატიულ და ტექნიკურ ექსპერტებს. ყოველი პროექტი ჩვენთვის გამოწვევაა, რომელსაც ვუდგებით ყველა ჩვენი ცოდნითა და გამოცდილებით.",

    "about.story.paragraph3":
      "ჩვენი მისიაა თითოეული კლიენტისთვის შევქმნათ ისეთი ციფრული არსებობა, რომელიც მათ ბიზნესს რეალურ წარმატებას მოუტანს.",

    // What We Do Section
    "about.whatWeDo.title": "რას",
    "about.whatWeDo.titleHighlight": "ვაკეთებთ",
    "about.whatWeDo.description":
      "ჩვენ გთავაზობთ სრულ ციფრული მარკეტინგის სერვისებს - ვებ განვითარებიდან ციფრული რეკლამის კამპანიებამდე.",

    // Services
    "about.services.webdev.title": "ვებ განვითარება",
    "about.services.webdev.description":
      "თანამედროვე, სწრაფი და მობილურზე ოპტიმიზირებული ვებსაიტები",

    "about.services.content.title": "კონტენტ პროდუქცია",
    "about.services.content.description":
      "პროფესიონალური ფოტო და ვიდეო მასალების შექმნა",

    "about.services.social.title": "სოციალური მედია",
    "about.services.social.description":
      "Instagram და Facebook გვერდების მართვა და ზრდა",

    "about.services.ads.title": "ციფრული რეკლამა",
    "about.services.ads.description":
      "Google Ads და სოციალური მედიის რეკლამები",

    // Values Section
    "about.values.sectionTitle": "ჩვენი",
    "about.values.titleHighlight": "ღირებულებები",

    "about.values.innovation.title": "ინოვაცია",
    "about.values.innovation.description":
      "ყოველთვის ვეძებთ ახალ და ეფექტურ გზებს",

    "about.values.partnership.title": "პარტნიორობა",
    "about.values.partnership.description":
      "ჩვენ არ ვართ მხოლოდ მომსახურების მწარმოებლები, არამედ თქვენი პარტნიორები",

    "about.values.quality.title": "ხარისხი",
    "about.values.quality.description":
      "ყოველი პროექტი შესრულებულია უმაღლესი ხარისხის სტანდარტებით",

    "about.values.growth.title": "ზრდა",
    "about.values.growth.description":
      "ჩვენი მიზანია თქვენი ბიზნესის მდგრადი ზრდა",

    // Team Section
    "about.team.ceo.name": "გიორგი ვეფხვაძე",
    "about.team.ceo.role": "CEO & ვებ განვითარების ექსპერტი",
    "about.team.ceo.bio":
      "ვებ განვითარების სფეროში 4+ წლიანი გამოცდილება. პასუხისმგებელია ტექნიკურ გადაწყვეტებსა და პროექტების მართვაზე.",
    "about.team.ceo.skill1": "React/TypeScript",
    "about.team.ceo.skill2": "Node.js",
    "about.team.ceo.skill3": "Project Management",

    "about.team.creative.name": "ანა გელაშვილი",
    "about.team.creative.role": "კრეატიული დირექტორი",
    "about.team.creative.bio":
      "კრეატიული სტრატეგიის და ბრენდინგის ექსპერტი. პასუხისმგებელია ყველა კრეატიულ პროცესზე.",
    "about.team.creative.skill1": "Brand Strategy",
    "about.team.creative.skill2": "Content Creation",
    "about.team.creative.skill3": "Social Media",

    "about.team.developer.name": "დავით კვარაცხელია",
    "about.team.developer.role": "ციფრული მარკეტინგის ექსპერტი",
    "about.team.developer.bio":
      "ციფრული რეკლამისა და SEO-ს სპეციალისტი. პასუხისმგებელია მარკეტინგის კამპანიებზე.",
    "about.team.developer.skill1": "Google Ads",
    "about.team.developer.skill2": "Facebook Ads",
    "about.team.developer.skill3": "SEO/SEM",

    "about.cta.title": "მზად ხარ დაიწყო თანამშრომლობა?",
    "about.cta.startProject": "დაიწყე პროექტი",
    "about.cta.contactUs": "დაგვიკავშირდი",

    // Services Page
    "services.hero.title": "ჩვენი სერვისები",
    "services.hero.subtitle": "სრული ციფრული მარკეტინგის გამოსავლები",
    "services.hero.description":
      "ჩვენ გთავაზობთ ღია ციფრული მარკეტინგის სერვისებს შენი ბიზნესის ონლაინ ზრდისთვის.",

    // Services for Navigation
    "services.webdev.title": "ვებ განვითარება",
    "services.advertising.title": "ციფრული რეკლამა",

    "services.webdev.description":
      "თანამედროვე, რესპონსული ვებსაიტები და ონლაინ მაღაზიები",
    "services.webdev.features.responsive": "მობილურზე მორგებული დიზაინი",
    "services.webdev.features.seo": "SEO ოპტიმიზირებული",
    "services.webdev.features.fast": "სწრაფი ჩატვირთვა",
    "services.webdev.features.secure": "უსაფრთხო ჰოსტინგი",

    "services.social.title": "სოციალური მედიის მართვა",
    "services.social.description": "სრული სოციალური მედიის სტრატეგია და მართვა",
    "services.social.features.content": "კონტენტის შექმნა",
    "services.social.features.scheduling": "პოსტების დაგეგმვა",
    "services.social.features.analytics": "ანალიტიკა & რეპორტები",
    "services.social.features.growth": "აუდიტორიის ზრდა",

    "services.ads.title": "ციფრული რეკლამა",
    "services.ads.description":
      "Google Ads და სოციალური მედიის სარეკლამო კამპანიები",
    "services.ads.features.google": "Google Ads",
    "services.ads.features.facebook": "Facebook & Instagram რეკლამა",
    "services.ads.features.optimization": "კამპანიის ოპტიმიზაცია",
    "services.ads.features.reporting": "დეტალური რეპორტები",

    "services.content.title": "კონტენტ პროდუქცია",
    "services.content.description":
      "პროფესიონალური ფოტო/ვიდეო კონტენტი და ბრენდინგი",
    "services.content.features.photography": "პროდუქტის ფოტოგრაფია",
    "services.content.features.video": "ვიდეო პროდუქცია",
    "services.content.features.branding": "ბრენდის დიზაინი",
    "services.content.features.copywriting": "კოპირაიტინგი",

    // Start Project Page
    "startProject.hero.title": "დაიწყე შენი",
    "startProject.hero.titleHighlight": "ციფრული პროექტი",
    "startProject.hero.titleSuffix": "დღეს",
    "startProject.hero.description":
      "მოგვითხარი შენი ბიზნესის შესახებ და ჩვენ შევქმნით ინდივიდუალურ ციფრული მარკეტინგის სტრატეგიას შენთვის.",

    "startProject.progress.step": "ნაბიჯი",

    "startProject.step1.title": "რა სერვისები გჭირდება?",
    "startProject.step1.subtitle": "არჩიე ყველა სერვისი რომელიც გაინტერესებს",

    "startProject.step2.title": "მოგვითხარი შენი ბიზნესის შესახებ",
    "startProject.step2.subtitle": "დაგვეხმარე უკეთ გავიგოთ შენი საჭიროებები",

    "startProject.services.website.title": "ვებსაიტის განვითარება",
    "startProject.services.website.description":
      "პროფესიონალური, მობილურზე ოპტიმიზირებული ვებსაიტები და ონლაინ მაღაზიები",

    "startProject.services.content.title": "კონტენტ პროდუქცია",
    "startProject.services.content.description":
      "პროფესიონალური ფოტო/ვიდეო სერვისები და ბრენდინგი",

    "startProject.services.social.title": "სოციალური მედია",
    "startProject.services.social.description":
      "სრული Instagram/Facebook მართვა და ზრდა",

    "startProject.services.ads.title": "ციფრული რეკლამა",
    "startProject.services.ads.description":
      "Facebook/Instagram რეკლამების მართვა და ოპტიმიზაცია",

    "startProject.form.name": "შენი სახელი",
    "startProject.form.namePlaceholder": "შეიყვანე შენი სრული სახელი",
    "startProject.form.email": "ელ-ფოსტა",
    "startProject.form.phone": "ტელეფონი",
    "startProject.form.businessName": "ბიზნესის სახელი",
    "startProject.form.businessNamePlaceholder":
      "შენი ბიზნესის ან კომპანიის სახელი",

    "startProject.buttons.back": "უკან",
    "startProject.buttons.next": "შემდეგი",
    "startProject.buttons.submit": "პროექტის გაგზავნა",
    "startProject.buttons.submitting": "იგზავნება...",

    "startProject.errors.submitError":
      "პროექტის გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ თავიდან.",

    // Footer
    "startProject.footer.trustIndicators":
      " შენი ინფორმაცია დაცულია •  უფასო კონსულტაცია •  სწრაფი პასუხი",

    // SEO Meta Tags
    "seo.home.title":
      "Vifa Digital - ციფრული მარკეტინგის სააგენტო საქართველოში | vifadigital.com",
    "seo.home.description":
      "Vifa Digital - წამყვანი ციფრული მარკეტინგის სააგენტო საქართველოში. ვებ განვითარება, სოციალური მედიის მართვა, ციფრული რეკლამა, SEO ოპტიმიზაცია. vifadigital.com",
    "seo.home.keywords":
      "Vifa Digital, vifadigital.com, ციფრული მარკეტინგი, ვებ განვითარება, სოციალური მედია მართვა, Google Ads, Facebook რეკლამა, SEO, საქართველო, თბილისი",

    "seo.about.title": "ჩვენ შესახებ - Vifa Digital გუნდი | vifadigital.com",
    "seo.about.description":
      "Vifa Digital გუნდის შესახებ. ჩვენი გამოცდილება, მიზნები და ღირებულებები ციფრული მარკეტინგის სფეროში საქართველოში. vifadigital.com",
    "seo.about.keywords":
      "Vifa Digital გუნდი, vifadigital.com, ციფრული მარკეტინგის კომპანია, ვებ განვითარება, მარკეტინგის სააგენტო საქართველო",

    "seo.services.social.title":
      "სოციალური მედიის მართვა - Vifa Digital | vifadigital.com",
    "seo.services.social.description":
      "პროფესიონალური სოციალური მედიის მართვა Instagram, Facebook, TikTok-ისთვის. კონტენტის შექმნა, გამოქვეყნება და ანალიტიკა.",
    "seo.services.social.keywords":
      "სოციალური მედია, Instagram მართვა, Facebook მარკეტინგი, TikTok, კონტენტის შექმნა",

    "seo.services.ads.title":
      "ციფრული რეკლამა - Vifa Digital | vifadigital.com",
    "seo.services.ads.description":
      "Google Ads, Facebook და Instagram სარეკლამო კამპანიების მართვა. ROI ოპტიმიზაცია და გაყიდვების ზრდა.",
    "seo.services.ads.keywords":
      "Google Ads, Facebook რეკლამა, Instagram რეკლამა, PPC, ციფრული რეკლამა",

    "seo.services.webdev.title":
      "ვებ განვითარება - Vifa Digital | vifadigital.com",
    "seo.services.webdev.description":
      "რესპონსული ვებსაიტები და ონლაინ მაღაზიების განვითარება. SEO ოპტიმიზაცია, უსაფრთხოება და სწრაფი ჩატვირთვა.",
    "seo.services.webdev.keywords":
      "ვებ განვითარება, ონლაინ მაღაზია, ვებსაიტის შექმნა, SEO, რესპონსული დიზაინი",

    "seo.startProject.title":
      "პროექტის დაწყება - Vifa Digital | vifadigital.com",
    "seo.startProject.description":
      "დაიწყეთ თქვენი ციფრული პროექტი Vifa Digital-თან. უფასო კონსულტაცია და პერსონალიზირებული გამოსავლები. vifadigital.com",
    "seo.startProject.keywords":
      "პროექტის დაწყება, კონსულტაცია, ციფრული მარკეტინგი, ვებ განვითარება",

    // NewHome page
    "newHome.badge": "გააციფრულე შენი ბიზნესი",
    "newHome.hero.title": "შექმენი კომუნიკაციის ხიდი",
    "newHome.hero.brand": "ბრენდსა და მომხმარებელს ",
    "newHome.hero.connection": "შორის",
    "newHome.hero.description":
      "ჩვენი ყველა პროექტი იწყება თქვენი ბიზნესის საჭიროებების ღრმა ანალიზით. ეს საწყისი კვლევა უზრუნველყოფს, რომ მიღებული სტრატეგია ზუსტად იყოს მორგებული თქვენს უნიკალურ მიზნებსა და ეფექტურ შედეგებს.",

    "newHome.hero.startProject": "დაიწყე პროექტი",
    "newHome.hero.aboutUs": "ჩვენ შესახებ",
    "newHome.visual.description": "ვირტუალური საკომუნიკაციო ხიდი",
    "newHome.visual.brand": "ბრენდი",
    "newHome.visual.audience": "აუდიტორია",
    "newHome.services.research.title": "კვლევა & ანალიზი",
    "newHome.services.research.description":
      "ღრმა ბაზრის კვლევა, კონკურენტების ანალიზი და თქვენი ბიზნესის უნიკალური შესაძლებლობების გამოვლენა",
    "newHome.services.strategy.title": "სტრატეგია & დაგეგმვა",
    "newHome.services.strategy.description":
      "პერსონალიზირებული ციფრული მარკეტინგის სტრატეგია, რომელიც მორგებულია თქვენს მიზნებზე და ბიუჯეტზე",
    "newHome.services.execution.title": "განხორციელება",
    "newHome.services.execution.description":
      "პროფესიონალური პროდუქტის შექმნა, მუდმივი ოპტიმიზაცია და გამჭირვალე რეპორტინგი შედეგების მისაღწევად",
    "newHome.partners.title": "პარტნიორი კომპანიები",
    "newHome.partners.subtitle": "იხილეთ ჩვენი წარმატებული პარტნიორები",
    "newHome.partners.projects": "პროექტი",
    "newHome.partners.satisfaction": "კმაყოფილი",
    "newHome.partners.experience": "წელი",
    "newHome.clients.technology": "ტექნოლოგია",
    "newHome.clients.food": "საკვები",
    "newHome.clients.medicine": "მედიცინა",
    "newHome.clients.commerce": "კომერცია",
    "newHome.clients.education": "განათლება",
    "newHome.clients.fashion": "მოდა",
    "newHome.clients.tech.description": "ვებსაიტი და ციფრული მარკეტინგი",
    "newHome.clients.restaurant.description": "სოციალური მედიის მართვა",
    "newHome.clients.healthcare.description": "სრული ციფრული მარკეტინგი",
    "newHome.clients.ecommerce.description": "ვებ განვითარება და რეკლამა",
    "newHome.clients.education.description": "ბრენდინგი და მარკეტინგი",
    "newHome.clients.fashion.description": "სოციალური მედია და კონტენტი",
    "newHome.cta.question": "გსურთ შეუერთდეთ ჩვენს წარმატებულ კლიენტებს?",
    "newHome.cta.button": "დაიწყეთ თანამშრომლობა",
    // Interactive Information Section
    "newHome.interactive.title": "რატომ არის ციფრული წარმატება აუცილებელი",
    "newHome.interactive.titleHighlight": "დღეს?",
    "newHome.interactive.intro":
      "21-ე საუკუნეში მომხმარებლები პირველ რიგში ონლაინ ეძებენ ბიზნესს. ვებსაიტი არის შენი სანდოობის, ხილვადობის და ზრდის მთავარი ინსტრუმენტი.",

    // Left Side - Process Animation
    "newHome.interactive.processTitle": "როგორ მუშაობს",
    "newHome.interactive.processTitleHighlight": "ციფრული მარკეტინგი?",

    "newHome.interactive.step1.title": "1. კვლევა",
    "newHome.interactive.step1.subtitle": "აუდიტორიის გაცნობა",
    "newHome.interactive.step1.description":
      "ვადგენთ თქვენი კლიენტების მოთხოვნებს და იმ სირთულეებს, რასაც ისინი აწყდებიან. ეს გვეხმარება ზუსტად განვსაზღვროთ, როგორ შეუძლია თქვენს პროდუქტს ან სერვისს შესთავაზოს მათ რეალური სარგებელი.",

    "newHome.interactive.step2.title": "2. სტრატეგია",
    "newHome.interactive.step2.subtitle": "სწორი გზის დაგეგმვა",
    "newHome.interactive.step2.description":
      "ვქმნით კონკრეტულ და მიზანმიმართულ გეგმას, რომელიც პასუხობს კითხვებს: რა კონტენტით, რომელ პლატფორმებზე და რამხელა ბიუჯეტით უნდა მიაღწიოთ წარმატებას.",

    "newHome.interactive.step3.title": "3. განხორციელება",
    "newHome.interactive.step3.subtitle": "კამპანიების გაშვება",
    "newHome.interactive.step3.description":
      "აქტიური ფაზა მოიცავს: რეკლამების გაშვებას, კონტენტის გამოქვეყნებას და ყველა მიმდინარე პროცესის ეფექტურ მართვასა და კონტროლს.",

    "newHome.interactive.step4.title": "4. შედეგი",
    "newHome.interactive.step4.subtitle": "გაზომვა და გაუმჯობესება",
    "newHome.interactive.step4.description":
      "ვზომავთ მიღებულ რეალურ შედეგებს. მიღებული მონაცემების საფუძველზე, ვახდენთ სტრატეგიის ოპტიმიზაციას იმ კომპონენტების გასაუმჯობესებლად, რომლებიც არ მუშაობს სასურველი ეფექტით.",

    // Right Side - 21st Century Challenges
    "newHome.interactive.challengesTitle": "21-ე საუკუნის გამოწვევები",

    "newHome.interactive.challenge1.icon": "⚙️",
    "newHome.interactive.challenge1.title": "ინფორმაციის სიჭარბე",
    "newHome.interactive.challenge1.description":
      "ინფორმაციის სიჭარბის პირობებში, მომხმარებლის ყურადღების მოსაზიდად მხოლოდ 3 - 8 წამი გაქვთ. პირველი შთაბეჭდილება გადამწყვეტია. ჩვენ ვქმნით დიზაინს, რომელიც მომენტალურად გადმოსცემს მთავარ სათქმელს.",

    "newHome.interactive.challenge2.icon": "💼",
    "newHome.interactive.challenge2.title": "მობილური გამოცდილება",
    "newHome.interactive.challenge2.description":
      "ტრეფიკის 75%-ზე მეტი მოდის სმარტფონებიდან. თქვენი ვებსაიტი აუცილებლად უნდა იყოს სრულად ადაპტირებული, სწრაფი და უზრუნველყოფდეს უმაღლეს მობილურ გამოცდილებას, რათა არ დაკარგოთ პოტენციური კლიენტები.",

    "newHome.interactive.challenge3.icon": "📊",
    "newHome.interactive.challenge3.title": "ახალი ტექნოლოგიები",
    "newHome.interactive.challenge3.description":
      "ხელოვნური ინტელექტი (AI), პროცესების ავტომატიზაცია და ციფრული პლატფორმების მუდმივი ევოლუცია მოითხოვს უწყვეტ ადაპტაციას.",

    "newHome.interactive.challenge4.icon": "🎯",
    "newHome.interactive.challenge4.title": "გლობალური კონკურენცია",
    "newHome.interactive.challenge4.description":
      "ონლაინ სივრცეში კონკურენცია გლობალურია. უნიკალური სტრატეგია და პროფესიონალური მიდგომა აუცილებელია იმისათვის, რომ გამოირჩეთ და მოიპოვოთ მომხმარებლის ყურადღება",

    "newHome.final.question": "მზად ხარ დაიწყო თანამშრომლობა?",
    "newHome.final.button": "დაიწყე პროექტი",

    // Privacy Policy
    "privacy.title": "კონფიდენციალურობის პოლიტიკა",
    "privacy.description":
      "თქვენი პერსონალური მონაცემების დაცვა ჩვენთვის უმნიშვნელოვანესია",
    "privacy.lastUpdated": "ბოლო განახლება",

    "privacy.dataCollection.title": "მონაცემების შეგროვება",
    "privacy.dataCollection.content":
      "ჩვენ ვაგროვებთ თქვენს მიერ ნებაყოფლობით მოწოდებულ ინფორმაციას, როდესაც:\n\n• სარგებლობთ ჩვენი ვებგვერდით\n• მიმართავთ ჩვენს კომპანიას\n• იყენებთ ჩვენს მომსახურებას\n• გამოიწერთ ჩვენს სიახლეებსა თუ განახლებებს\n\nჩვენ მიერ შეგროვებული ინფორმაცია მოიცავს:\n\n• სახელსა და გვარს\n• ელექტრონული ფოსტის მისამართს\n• ტელეფონის ნომერს\n• ბიზნესთან დაკავშირებულ ინფორმაციას",

    "privacy.dataUsage.title": "მონაცემების გამოყენება",
    "privacy.dataUsage.content":
      "თქვენი პერსონალური მონაცემები გამოიყენება შემდეგი მიზნებისთვის:\n\n• თქვენთვის მომსახურების გაწევა\n• თქვენთან კომუნიკაცია და კონსულტაციების ჩატარება\n• ჩვენი სერვისების გაუმჯობესება\n• კანონმდებლობით გათვალისწინებული ვალდებულებების შესრულება\n\nჩვენ არასდროს გადავცემთ ან ვყიდით თქვენს პერსონალურ მონაცემებს მესამე მხარეებზე კომერციული მიზნებისთვის.",

    "privacy.dataSecurity.title": "მონაცემების უსაფრთხოება",
    "privacy.dataSecurity.content":
      "ჩვენ ვიყენებთ ინდუსტრიის სტანდარტებთან შესაბამის უსაფრთხოების ზომებს, მათ შორის:\n\n• SSL შიფრაციას მონაცემთა გადაცემის უზრუნველსაყოფად\n• უსაფრთხო სერვერებსა და დაცულ მონაცემთა ბაზებს\n• მონაცემებზე წვდომის შეზღუდვას, რომელიც ხელმისაწვდომია მხოლოდ ავტორიზებული პერსონალისთვის\n• უსაფრთხოების რეგულარულ აუდიტს\n• დაცულ სარეზერვო ასლებს (ბექაპებს)\n\nმიუხედავად ჩვენი ძალისხმევისა, გთხოვთ, გაითვალისწინოთ, რომ ინტერნეტის საშუალებით მონაცემთა გადაცემა 100%-ით დაცული ვერ იქნება.",

    "privacy.userRights.title": "თქვენი უფლებები",
    "privacy.userRights.content":
      "თქვენ გაქვთ შემდეგი უფლებები:\n\n• მოითხოვოთ თქვენს შესახებ არსებული ინფორმაციის გაცნობა\n• მოითხოვოთ თქვენი მონაცემების გასწორება ან განახლება\n• მოითხოვოთ თქვენი მონაცემების წაშლა\n• შეაჩეროთ თქვენი მონაცემების დამუშავება\n• მოითხოვოთ თქვენი მონაცემების გადატანა (მონაცემთა პორტაბელურობა)\n\nამ უფლებების რეალიზაციისთვის დაგვიკავშირდით ქვემოთ მოცემული საკონტაქტო ინფორმაციით.",

    "privacy.contact.title": "კონტაქტი კონფიდენციალურობის საკითხებზე",
    "privacy.contact.description":
      "თუ გაქვთ კითხვები ამ პოლიტიკასთან დაკავშირებით, დაგვიკავშირდით:",
    "privacy.contact.email": "ელ-ფოსტა",
    "privacy.contact.phone": "ტელეფონი",

    // Terms of Service
    "terms.title": "მომსახურების პირობები",
    "terms.description": "ჩვენი სერვისების გამოყენების წესები და პირობები",
    "terms.lastUpdated": "ბოლო განახლება",

    "terms.services.title": "ჩვენი სერვისები",
    "terms.services.content":
      "Vifa Digital გთავაზობთ შემდეგ მომსახურებას:\n\n• ვებგვერდების შექმნა და განვითარება\n• ციფრული მარკეტინგის მომსახურება\n• სოციალური მედიის მართვა\n• კონტენტის შექმნა და წარმოება\n• SEO (საძიებო სისტემის) ოპტიმიზაცია\n• ბრენდინგის მომსახურება\n\nყველა სერვისს გთავაზობთ პროფესიონალური სტანდარტებით, შეთანხმებული ვადების და ბიუჯეტის ფარგლებში.",

    "terms.userResponsibilities.title": "კლიენტის ვალდებულებები",
    "terms.userResponsibilities.content":
      "ჩვენი სერვისების გამოყენებისას თქვენ ვალდებული ხართ:\n\n• მოგვაწოდოთ ზუსტი და სრულყოფილი ინფორმაცია\n• დროულად განახორციელოთ შეთანხმებული გადახდები\n• ითანამშრომლოთ ჩვენს გუნდთან\n• არ გამოიყენოთ ჩვენი სერვისები არაკანონიერი მიზნებისთვის\n• არ დაარღვიოთ ინტელექტუალური საკუთრების უფლებები\n• წინასწარ შეგვატყობინოთ ნებისმიერი ცვლილების შესახებ\n\nაღნიშნული პირობების დარღვევის შემთხვევაში, შესაძლებელია ხელშეკრულების შეწყვეტა.",

    "terms.limitations.title": "პასუხისმგებლობის შეზღუდვა",
    "terms.limitations.content":
      "Vifa Digital-ის პასუხისმგებლობა შემოიფარგლება შემდეგით:\n\n• ჩვენი პასუხისმგებლობა არ აღემატება პროექტის ღირებულებას\n• არ ვართ პასუხისმგებლები არაპირდაპირი ზარალისთვის\n• ვერ მოგცემთ ზუსტ გარანტიას კონკრეტული ბიზნესის შედეგების მიღწევაში\n• არ ვართ პასუხისმგებლები მესამე მხარის პლატფორმების ფუნქციონირებაზე\n\nყველა გარანტია შემოიფარგლება ხელშეკრულების პირობებით.",

    "terms.termination.title": "ხელშეკრულების შეწყვეტა",
    "terms.termination.content":
      "ხელშეკრულების შეწყვეტა შესაძლებელია:\n\n• ორმხრივი შეთანხმებით\n• ერთ-ერთი მხარის მიერ 30-დღიან ვადაში წინასწარი შეტყობინებით\n• პირობების დარღვევის შემთხვევაში\n• გადახდის ვალდებულებების დარღვევისას\n\nხელშეკრულების შეწყვეტის შემდეგ:\n\n• ყველა სამუშაო წყდება\n• შესრულებული სამუშაოს ანაზღაურება ხდება\n• კონფიდენციალურობის ვალდებულებები ძალაში რჩება",

    "terms.contact.title": "კონტაქტი პირობების შესახებ",
    "terms.contact.description": "ამ პირობებთან დაკავშირებით კითხვებისთვის:",
    "terms.contact.email": "ელ-ფოსტა",
    "terms.contact.phone": "ტელეფონი",
  },

  en: {
    // English translations will be added here later
    // For now, return Georgian as fallback
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Check localStorage or default to Georgian
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && (savedLanguage === "ka" || savedLanguage === "en")
      ? savedLanguage
      : "ka";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", currentLanguage);

    // Set document language attribute
    document.documentElement.lang =
      currentLanguage === "ka" ? "ka-GE" : "en-US";
  }, [currentLanguage]);

  const toggleLanguage = () => {
    if (isTransitioning) return; // Prevent multiple rapid clicks

    setIsTransitioning(true);

    // Add a smooth transition delay
    setTimeout(() => {
      setCurrentLanguage((prev) => (prev === "ka" ? "en" : "ka"));

      // Reset transition state after language change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Allow time for content to update
    }, 150); // Small delay before changing language
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage] as Record<
      string,
      string
    >;
    const georgianTranslations = translations.ka as Record<string, string>;
    // If English translation doesn't exist, fall back to Georgian
    return currentTranslations[key] || georgianTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
