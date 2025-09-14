import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'ka' | 'en'; // Georgian and English

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation keys and their values
const translations = {
  ka: {
    // Home page
    'home.hero.title': 'შექმენი წარმატებული ბიზნესი ციფრული გზით',
    'home.hero.subtitle': 'ვიფა - თქვენი ნდობილი პარტნიორი ციფრული წარმატებისთვის',
    'home.hero.description': 'ჩვენ გთავაზობთ სრულ ციფრულ სერვისებს: ვებსაიტის შექმნა, სოციალური მედია მართვა, ციფრული რეკლამა და კონტენტ პროდუქცია',
    'home.hero.getStarted': 'დაიწყე პროექტი',
    'home.hero.ourServices': 'ჩვენი სერვისები',
    
    // Services section
    'home.services.title': 'ჩვენი სერვისები',
    'home.services.subtitle': 'სრული ციფრული გადაწყვეტები თქვენი ბიზნესისთვის',
    
    'home.services.webdev.title': 'ვებსაიტი + ონლაინ მაღაზია',
    'home.services.webdev.description': 'პროფესიონალური, მობილურზე ოპტიმიზებული ვებსაიტები და ონლაინ მაღაზიები',
    'home.services.webdev.price': '800₾-დან',
    'home.services.webdev.button': 'შეიტყვე მეტი',
    
    'home.services.content.title': 'კონტენტ პროდუქცია',
    'home.services.content.description': 'პროფესიონალური ფოტო/ვიდეო სერვისი და ბრენდინგი',
    'home.services.content.price': '300₾-დან',
    'home.services.content.button': 'შეიტყვე მეტი',
    
    'home.services.social.title': 'სოციალური მედია მართვა',
    'home.services.social.description': 'Instagram/Facebook გვერდების სრული მართვა და ზრდა',
    'home.services.social.price': '400₾/თვე',
    'home.services.social.button': 'შეიტყვე მეტი',
    
    'home.services.ads.title': 'ციფრული რეკლამა',
    'home.services.ads.description': 'Facebook/Instagram რეკლამების მართვა და ოპტიმიზაცია',
    'home.services.ads.price': '500₾/თვე',
    'home.services.ads.button': 'შეიტყვე მეტი',
    
    // Why Choose Us section
    'home.whyUs.title': 'რატომ ვიფა?',
    'home.whyUs.subtitle': 'ყველაფერი ერთ ადგილას - ციფრული წარმატებისთვის',
    
    'home.whyUs.experience.title': 'გამოცდილება',
    'home.whyUs.experience.description': '3+ წლიანი გამოცდილება ციფრულ მარკეტინგში',
    
    'home.whyUs.results.title': 'შედეგები',
    'home.whyUs.results.description': '200+ წარმატებული პროექტი და კმაყოფილი კლიენტები',
    
    'home.whyUs.support.title': 'მხარდაჭერა',
    'home.whyUs.support.description': '24/7 მხარდაჭერა და უფასო კონსულტაციები',
    
    'home.whyUs.price.title': 'ფასი',
    'home.whyUs.price.description': 'კონკურენტული ფასები და მოქნილი გადახდის პირობები',
    
    // CTA section
    'home.cta.title': 'მზად ხარ შენი ბიზნესის ზრდისთვის?',
    'home.cta.description': 'დაიწყე თანამშრომლობა ჩვენთან და ნახე შენი ბიზნესის ციფრული ტრანსფორმაცია',
    'home.cta.button': 'დაიწყე პროექტი',
    'home.cta.contact': 'დაგვიკავშირდი',
    'home.cta.callNow': '📞 დარეკე ახლა - 555 123 456',
    'home.cta.benefits': '🎁 პირველი კონსულტაცია უფასოა • ✨ ბიზნეს გეგმის შემუშავება',
    
    // Navigation
    'nav.home': 'მთავარი',
    'nav.services': 'სერვისები',
    'nav.about': 'ჩვენს შესახებ',
    'nav.startProject': 'პროექტის დაწყება',
    'nav.theme': 'თემა',
    'nav.language': 'ენა',
    'nav.tagline': 'ციფრული სააგენტო',
    
    // Office Location
    'office.title': 'ჩვენი ოფისი',
    'office.subtitle': 'ესტუმრეთ ჩვენს ოფისს უფასო კონსულტაციისთვის',
    'office.address': 'მისამართი',
    'office.address.full': 'მეგობრობის 4, რუსთავი, საქართველო',
    'office.viewOnMaps': 'Google Maps-ში ნახვა',
    'office.workingHours': 'სამუშაო საათები',
    'office.hours.weekdays': 'ორშაბათი-პარასკევი: 10:00-18:00',
    'office.hours.saturday': 'შაბათი: 10:00-15:00',
    'office.hours.sunday': 'კვირა: დახურულია',
    'office.contact': 'კონტაქტი',
    'office.route': 'მარშრუტი',
    'office.streetView': 'ქუჩის ნახვა',
    'office.share': 'გაზიარება',
    'office.map': 'რუქა',
    'office.satellite': 'სატელიტი',
    'office.hybrid': 'ჰიბრიდი',
    'office.status.open': 'ღია',
    'office.status.closed': 'დახურული',
    'office.addressCopied': 'მისამართი დაკოპირდა!',
    'office.mapLoading': 'რუქა იტვირთება...',
    'office.mapError': 'რუქის ჩატვირთვისას შეცდომა',
    'office.retry': 'თავიდან ცდა',
    
    // Services navigation
    'services.social.title': 'სოციალური მედიის მართვა',
    'services.social.description': 'Instagram & Facebook მართვა',
    'services.ads.title': 'ციფრული რეკლამა',
    'services.ads.description': 'Facebook & Google რეკლამები',
    'services.webdev.title': 'ვებ განვითარება',
    'services.webdev.description': 'ვებსაიტები და ონლაინ მაღაზიები',
    'services.content.title': 'კონტენტ პროდუქცია',
    'services.content.description': 'ფოტო, ვიდეო და ბრენდინგი',
    
    // Digital Advertising Page
    'ads.hero.title': 'ციფრული რეკლამით',
    'ads.hero.subtitle': 'ზრდა და მოგება',
    'ads.hero.description': 'Google, Facebook, Instagram და სხვა პლატფორმებზე ეფექტური რეკლამური კამპანიებით მოიზიდეთ ახალი კლიენტები და გაზარდეთ გაყიდვები',
    'ads.stats.roi': 'საშუალო ROI ზრდა',
    'ads.stats.cpa': 'CPA შემცირება',
    'ads.stats.campaigns': 'წარმატებული კამპეინი',
    'ads.stats.monitoring': 'მონიტორინგი',
    'ads.platforms.google.audience': '90% მოსახლეობა',
    'ads.platforms.meta.audience': '2.9B მომხმარებელი',
    'ads.platforms.youtube.audience': '2B+ ყურება',
    'ads.platforms.tiktok.audience': '1B+ აქტივი',
    'ads.platforms.linkedin.audience': '900M პროფესიონალი',
    'ads.types.title': 'რეკლამის ტიპები',
    'ads.types.subtitle': 'ყოველი ბიზნესისთვის შესაფერისი რეკლამური ფორმატები',
    'ads.types.search.description': 'Google-ში ძებნის შედეგებში თქვენი ბიზნესის ჩვენება',
    'ads.types.search.benefit1': 'მაღალი intent',
    'ads.types.search.benefit2': 'ზუსტი targeting',
    'ads.types.search.benefit3': 'მყისიერი შედეგები',
    'ads.types.display.description': 'ვიზუალური რეკლამები მილიონობით ვებსაიტზე',
    'ads.types.display.benefit1': 'Brand awareness',
    'ads.types.display.benefit2': 'Retargeting',
    'ads.types.display.benefit3': 'ვიზუალური impact',
    'ads.types.video.description': 'ვიდეო რეკლამები YouTube-ზე და სოციალურ მედიაში',
    'ads.types.video.benefit1': 'მაღალი engagement',
    'ads.types.video.benefit2': 'ემოციური კავშირი',
    'ads.types.video.benefit3': 'ვირალური პოტენციალი',
    'ads.types.shopping.description': 'პროდუქტების პირდაპირი ჩვენება ძებნის შედეგებში',
    'ads.types.shopping.benefit1': 'მაღალი conversion',
    'ads.types.shopping.benefit2': 'პროდუქტის ვიზუალიზაცია',
    'ads.types.shopping.benefit3': 'ფასების შედარება',
    'ads.services.title': 'ჩვენი სერვისები',
    'ads.services.subtitle': 'სრული ციფრული რეკლამის მენეჯმენტი',
    'ads.services.targeting.title': 'სამიზნე აუდიტორიის განსაზღვრა',
    'ads.services.targeting.description': 'დეტალური მარკეტ რესერჩი და იდეალური კლიენტის პროფილის შექმნა',
    'ads.services.strategy.title': 'კამპანიის სტრატეგია',
    'ads.services.strategy.description': 'ROI-ზე ორიენტირებული რეკლამური სტრატეგიის შემუშავება',
    'ads.services.creative.title': 'კრეატივის შექმნა',
    'ads.services.creative.description': 'ეფექტური რეკლამური მასალების დიზაინი და A/B ტესტირება',
    'ads.services.optimization.title': 'ოპტიმიზაცია და რეპორტინგი',
    'ads.services.optimization.description': 'მუდმივი მონიტორინგი, ოპტიმიზაცია და დეტალური ანალიტიკა',
    'ads.process.title': 'როგორ ვმუშაობთ',
    'ads.process.subtitle': 'ჩვენი დამტკიცებული მეთოდოლოგია მაქსიმალური ROI-სთვის',
    'ads.process.step1.title': 'ბიზნეს ანალიზი',
    'ads.process.step1.description': 'თქვენი ბიზნესის, კონკურენტების და ბაზრის სიღრმისეული შესწავლა',
    'ads.process.step2.title': 'სტრატეგიის შემუშავება',
    'ads.process.step2.description': 'მიზნების დაყენება, KPI-ების განსაზღვრა და კამპეინის დაგეგმვა',
    'ads.process.step3.title': 'კამპეინის ლონჩი',
    'ads.process.step3.description': 'რეკლამების შექმნა, targeting სეტაპი და კამპეინის გაშვება',
    'ads.process.step4.title': 'ოპტიმიზაცია',
    'ads.process.step4.description': 'ყოველდღიური მონიტორინგი, ტესტირება და უკეთესი შედეგებისთვის სწორება',
    'ads.cta.title': 'მზად ხართ',
    'ads.cta.highlight': 'გაზარდოთ',
    'ads.cta.suffix': 'გაყიდვები?',
    'ads.cta.description': 'დაიწყეთ უფასო რეკლამის აუდიტით და ნახეთ თქვენი პოტენციალი',
    'ads.cta.button1': 'უფასო რეკლამის აუდიტი',
    'ads.cta.button2': 'დაგვიკავშირდით',
    'ads.cta.benefits': '🎁 უფასო კამპეინის აუდიტი • 📊 ROI პროგნოზი • 🚀 სწრაფი სტარტი',
    
    // Social Media Service Page
    'social.hero.title': 'სოციალური მედიის',
    'social.hero.subtitle': 'პროფესიონალური მართვა',
    'social.hero.description': 'ჩვენ ვართ ექსპერტები Instagram, Facebook, TikTok და YouTube-ს წარმატებულ მართვაში. დავეხმარებით თქვენს ბრენდს მიაღწიოს მაქსიმალურ ხილვადობას და ენგეიჯმენტს ყველა პლატფორმაზე.',
    
    // Platform descriptions
    'social.platforms.facebook.description': 'ყველაზე დიდი სოციალური ქსელი',
    'social.platforms.facebook.stats': '2.9B+ active users',
    'social.platforms.facebook.bestFor': 'Local Business, B2B კომპანიები',
    'social.platforms.facebook.feature1': 'Facebook Pages მართვა',
    'social.platforms.facebook.feature2': 'Facebook Ads Campaign',
    'social.platforms.facebook.feature3': 'Events და Community',
    'social.platforms.facebook.feature4': 'Facebook Shop',
    'social.platforms.facebook.feature5': 'Messenger Marketing',
    
    'social.platforms.instagram.description': 'ვიზუალური კონტენტის უზრუნველყოფა',
    'social.platforms.instagram.stats': '1B+ active users',
    'social.platforms.instagram.bestFor': 'ვიზუალური ბრენდები, B2C კომპანიები',
    'social.platforms.instagram.feature1': 'Stories და Reels შექმნა',
    'social.platforms.instagram.feature2': 'IGTV ვიდეო კონტენტი',
    'social.platforms.instagram.feature3': 'Shopping Integration',
    'social.platforms.instagram.feature4': 'Hashtag ოპტიმიზაცია',
    'social.platforms.instagram.feature5': 'Instagram Ads მართვა',
    
    'social.platforms.tiktok.description': 'ვირუსული კონტენტის პლატფორმა',
    'social.platforms.tiktok.stats': '1B+ active users',
    'social.platforms.tiktok.bestFor': 'Gen Z აუდიტორია, Creative ბრენდები',
    'social.platforms.tiktok.feature1': 'ვირუსული ვიდეო კონტენტი',
    'social.platforms.tiktok.feature2': 'Trending Challenges',
    'social.platforms.tiktok.feature3': 'TikTok Shop Integration',
    'social.platforms.tiktok.feature4': 'Influencer Collaboration',
    'social.platforms.tiktok.feature5': 'ბრენდ ამბასადორები',
    
    'social.platforms.youtube.description': 'ვიდეო კონტენტის ლიდერი',
    'social.platforms.youtube.stats': '2B+ active users',
    'social.platforms.youtube.bestFor': 'Educational კონტენტი, B2B სერვისები',
    'social.platforms.youtube.feature1': 'YouTube Channel მართვა',
    'social.platforms.youtube.feature2': 'Video SEO ოპტიმიზაცია',
    'social.platforms.youtube.feature3': 'YouTube Shorts',
    'social.platforms.youtube.feature4': 'Monetization სტრატეგია',
    'social.platforms.youtube.feature5': 'YouTube Ads',
    
    // Platform Services section
    'social.platformServices.title': 'ჩვენი სერვისები:',
    
    // Stats section
    'social.stats.title': 'შედეგები პლატფორმების მიხედვით',
    'social.stats.instagram.stat': '500K+',
    'social.stats.instagram.desc': 'შექმნილი Posts & Stories',
    'social.stats.facebook.stat': '2M+',
    'social.stats.facebook.desc': 'მიღწეული Reach',
    'social.stats.tiktok.stat': '50M+',
    'social.stats.tiktok.desc': 'ვირალური Views',
    'social.stats.youtube.stat': '1M+',
    'social.stats.youtube.desc': 'გამოწერების ზრდა',
    
    // Services section
    'social.services.title': 'ჩვენი სერვისები',
    'social.services.subtitle': 'სრული სპექტრი სოციალური მედიის მართვისთვის',
    
    'social.services.planning.title': 'კონტენტის დაგეგმვა',
    'social.services.planning.description': 'ყოველდღიური პოსტების დაგეგმვა და ავტომატური გამოქვეყნება',
    'social.services.planning.feature1': 'კონტენტ კალენდარი',
    'social.services.planning.feature2': 'Auto-posting',
    'social.services.planning.feature3': 'Optimal timing',
    'social.services.planning.feature4': 'Cross-platform',
    
    'social.services.visual.title': 'ვიზუალური კონტენტი',
    'social.services.visual.description': 'პროფესიონალური ფოტოები, გრაფიკული დიზაინი და ვიდეო პროდუქცია',
    'social.services.visual.feature1': 'ფოტო შექმნა',
    'social.services.visual.feature2': 'გრაფიკული დიზაინი',
    'social.services.visual.feature3': 'ვიდეო მონტაჟი',
    'social.services.visual.feature4': 'ბრენდ იდენტობა',
    
    'social.services.community.title': 'Community Management',
    'social.services.community.description': 'აუდიტორიასთან ურთიერთობა, კომენტარების პასუხი და ენგეიჯმენტის ზრდა',
    'social.services.community.feature1': '24/7 მონიტორინგი',
    'social.services.community.feature2': 'სწრაფი პასუხები',
    'social.services.community.feature3': 'Crisis management',
    'social.services.community.feature4': 'Follower growth',
    
    'social.services.analytics.title': 'ანალიტიკა და რეპორტინგი',
    'social.services.analytics.description': 'დეტალური ანალიზი, ROI თვალყურის დევნება და სტრატეგიის ოპტიმიზაცია',
    'social.services.analytics.feature1': 'Performance tracking',
    'social.services.analytics.feature2': 'Engagement მეტრიკები',
    'social.services.analytics.feature3': 'ROI ანალიზი',
    'social.services.analytics.feature4': 'კონკურენტების მონიტორინგი',
    
    // Process section
    'social.process.title': 'როგორ ვმუშაობთ',
    'social.process.subtitle': 'ჩვენი გამოცდილი პროცესი გარანტირებულ შედეგებისთვის',
    
    'social.process.step1.title': 'ანალიზი და სტრატეგია',
    'social.process.step1.description': 'ბრენდის ანალიზი, მიზნობრივი აუდიტორიის განსაზღვრა და კონტენტ სტრატეგიის შემუშავება',
    
    'social.process.step2.title': 'კონტენტის შექმნა',
    'social.process.step2.description': 'ბრენდის იდენტობის შესაბამისი ვიზუალური და ტექსტური კონტენტის პროდუქცია',
    
    'social.process.step3.title': 'გამოქვეყნება და მართვა',
    'social.process.step3.description': 'ოპტიმალურ დროს კონტენტის გამოქვეყნება და აუდიტორიასთან ურთიერთობა',
    
    'social.process.step4.title': 'ანალიზი და ოპტიმიზაცია',
    'social.process.step4.description': 'შედეგების ანალიზი, რეპორტინგი და სტრატეგიის მუდმივი გაუმჯობესება',
    
    // Testimonials section
    'social.testimonials.title': 'მომხმარებლების შეფასებები',
    
    'social.testimonials.testimonial1.text': 'VIFA-მ ჩვენი Instagram გვერდი სრულიად გარდაქმნა. კლიენტები ყოველდღე გვიკითხავენ სად ვნახეთ ეს ლამაზი ფოტოებო.',
    'social.testimonials.testimonial1.author': 'ანა გ.',
    'social.testimonials.testimonial1.business': 'სილამაზის სალონი',
    'social.testimonials.testimonial1.platform': 'Instagram',
    
    'social.testimonials.testimonial2.text': '3 თვეში ონლაინ შეკვეთები გაორმაგდა. მათი კონტენტ სტრატეგია მართლაც მუშაობს!',
    'social.testimonials.testimonial2.author': 'გიორგი მ.',
    'social.testimonials.testimonial2.business': 'რესტორანი "ქართული სუფრა"',
    'social.testimonials.testimonial2.platform': 'Facebook',
    
    'social.testimonials.testimonial3.text': 'TikTok-ზე ჩვენი ვიდეო 100K views-ს მიაღწია! ახალი თაობა ჩვენს ბრენდს ცნობს.',
    'social.testimonials.testimonial3.author': 'თინა კ.',
    'social.testimonials.testimonial3.business': 'Fashion Brand',
    'social.testimonials.testimonial3.platform': 'TikTok',
    
    // CTA section
    'social.cta.title': 'მზად ხართ',
    'social.cta.highlight': 'გაზარდოთ',
    'social.cta.subtitle': 'თქვენი ბრენდი',
    'social.cta.suffix': 'ყველა პლატფორმაზე?',
    'social.cta.description': 'გაიარეთ კონსულტაცია და გაეცანით, თუ როგორ შეგვიძლია დაგეხმაროთ Instagram-ზე, Facebook-ზე, TikTok-სა და YouTube-ზე თქვენი წარმატების მიღწევაში',
    'social.cta.button': 'პროექტის დაგეგმვა',
    
    // FAQ section
    'social.faq.title': 'ხშირად დასმული კითხვები',
    'social.faq.subtitle': 'პასუხები ყველაზე პოპულარულ კითხვებზე',
    
    'social.faq.q1.question': 'რომელ პლატფორმებზე მუშაობთ?',
    'social.faq.q1.answer': 'ჩვენ ვართ სპეციალისტები Instagram, Facebook, TikTok და YouTube-ს მართვაში. ყველა პლატფორმისთვის გვაქვს გამოცდილი გუნდი და დამოწმებული შედეგები.',
    
    'social.faq.q2.question': 'რამდენ ხანში ჩანს შედეგები?',
    'social.faq.q2.answer': 'პირველი შედეგები ჩვეულებრივ ჩანს 2-4 კვირაში, მაგრამ მნიშვნელოვანი ზრდა სჩანს 2-3 თვეში. ყველაფერი დამოკიდებულია თქვენს ბიზნესზე და მიზნებზე.',
    
    'social.faq.q3.question': 'თუ ჩვენ უკვე გვაქვს სოციალური მედია?',
    'social.faq.q3.answer': 'კარგია! ჩვენ ჯერ გავაანალიზებთ თქვენს არსებულ გვერდებს, შემდეგ შევქმნით სტრატეგიას რომ გავაუმჯობესოთ მათი ეფექტურობა.',
    
    'social.faq.q4.question': 'რა ჯდება თვეში სერვისი?',
    'social.faq.q4.answer': 'ფასი დამოკიდებულია პაკეტზე და პლატფორმების რაოდენობაზე. დაგვიკავშირდით უფასო კონსულტაციისთვის და ინდივიდუალური შეთავაზებისთვის.',
    
    'social.faq.q5.question': 'გაქვთ თუ არა გარანტია?',
    'social.faq.q5.answer': 'ჩვენ ვაძლევთ გარანტიას ენგეიჯმენტის ზრდაზე და კონტენტის ხარისხზე. თუ 3 თვეში არ დაინახავთ შედეგს, გავაგრძელებთ მუშაობას უფასოდ.',
    
    // Contact section
    'social.contact.title': 'დაგვიკავშირდით დღესვე',
    'social.contact.phone.title': 'ტელეფონი',
    'social.contact.phone.info': '+995 555 123 456',
    'social.contact.email.title': 'ელფოსტა',
    'social.contact.email.info': 'info@vifa.ge',
    'social.contact.social.title': 'მიმართეთ',
    'social.contact.social.info': 'WhatsApp ან Messenger',
    'social.contact.hours': 'სამუშაო საათები: ორშ-პარ 10:00-19:00 | სპეციალური მხარდაჭერა 24/7',
    
    // Web Development Page
    'webdev.businessResults.title1': 'უკეთესი იმიჯი',
    'webdev.businessResults.desc1': 'პროფესიონალური ვებსაიტი = ნდობა და ავტორიტეტი',
    'webdev.businessResults.title2': 'მეტი შესაძლებლობა',
    'webdev.businessResults.desc2': 'Online presence = კლიენტები გიპოვიან',
    'webdev.businessResults.title3': 'ადვილი კავშირი',
    'webdev.businessResults.desc3': 'WhatsApp + ტელეფონი = მყისიერი კონტაქტი',
    'webdev.businessResults.title4': 'Google-ში აღმოჩენა',
    'webdev.businessResults.desc4': 'SEO + Maps = კლიენტები ადვილად გიპოვიან',
    
    // Hero section
    'webdev.hero.title1': 'ვებსაიტი რომელიც',
    'webdev.hero.title2': 'აკეთებს ფულს',
    'webdev.hero.description.part1': 'შექმენი',
    'webdev.hero.description.highlight': 'პროფესიონალური ვებსაიტი',
    'webdev.hero.description.part2': 'რომელიც ხელს შეუწყობს ბიზნესის განვითარებას და',
    'webdev.hero.description.part3': 'მოიტანს რეალურ შემოსავალს',
    
    // Packages section
    'webdev.packages.title': 'ვებ-განვითარების',
    'webdev.packages.titleHighlight': 'პაკეტები',
    'webdev.packages.subtitle': 'აირჩიეთ თქვენი ბიზნესისთვის შესაბამისი პაკეტი',
    
    // Basic Package
    'webdev.packages.basic.title': '🟦 საწყისი პაკეტი (Starter)',
    'webdev.packages.basic.description': '👉 იდეალურია მათთვის, ვისაც უბრალოდ მარტივი ონლაინ ყოფნა სჭირდება',
    'webdev.packages.basic.price': '250₾',
    'webdev.packages.basic.priceNote': 'ფიქსირებული ფასი',
    'webdev.packages.basic.feature1': 'ერთი გვერდიანი საიტი (Landing Page)',
    'webdev.packages.basic.feature2': 'ძირითადი ტექსტი და სურათები',
    'webdev.packages.basic.feature3': 'კონტაქტის ფორმა ან WhatsApp ღილაკი',
    'webdev.packages.basic.feature4': 'მობილურზე მორგებული დიზაინი',
    'webdev.packages.basic.feature5': 'უფასო ჰოსტინგი',
    'webdev.packages.basic.feature5Note': '- Vercel Enterprise დონე',
    'webdev.packages.basic.feature6': 'SSL სერტიფიკატი',
    'webdev.packages.basic.feature6Note': '+ უსაფრთხოება',
    'webdev.packages.basic.delivery': 'მიწოდება 7 დღეში',
    'webdev.packages.basic.button': 'დაუყოვნებლივ დაიწყე!',
    
    // Standard Package
    'webdev.packages.standard.title': '🟩 სტანდარტული პაკეტი (Standard)',
    'webdev.packages.standard.description': '👉 მათთვის, ვისაც სურს ცოტა უფრო გაფართოებული საიტი',
    'webdev.packages.standard.price': '350₾',
    'webdev.packages.standard.priceNote': 'ფიქსირებული ფასი',
    'webdev.packages.standard.feature1': '2–3 გვერდიანი ვებგვერდი',
    'webdev.packages.standard.feature2': 'საბაზისო SEO ოპტიმიზაცია',
    'webdev.packages.standard.feature3': 'Google Maps + ანალიტიკა',
    'webdev.packages.standard.feature4': 'ტექსტისა და სურათების ჩასმა',
    'webdev.packages.standard.feature5': 'უფასო ჰოსტინგი + დომეინი',
    'webdev.packages.standard.feature5Note': '- 1 წელი',
    'webdev.packages.standard.feature6': '95+ PageSpeed',
    'webdev.packages.standard.feature6Note': '- სწრაფი ჩატვირთვა',
    'webdev.packages.standard.delivery': 'მიწოდება 10–12 დღეში',
    'webdev.packages.standard.button': 'დაუყოვნებლივ დაიწყე!',
    
    // Premium Package
    'webdev.packages.premium.title': '🟨 პრემიუმ პაკეტი (Premium)',
    'webdev.packages.premium.description': '👉 საუკეთესოა პატარა ბიზნესებისთვის, ვისაც სჭირდება პროფესიული ონლაინ ვიტრინა',
    'webdev.packages.premium.price': '550₾',
    'webdev.packages.premium.priceNote': 'ფიქსირებული ფასი',
    'webdev.packages.premium.popular': 'პოპულარული',
    'webdev.packages.premium.feature1': '4–5 გვერდიანი საიტი',
    'webdev.packages.premium.feature2': 'სერვისების/პროდუქტების კატალოგი',
    'webdev.packages.premium.feature3': 'კონტაქტის ფორმა + სოციალური ქსელების ინტეგრაცია',
    'webdev.packages.premium.feature4': 'Professional SEO',
    'webdev.packages.premium.feature4Note': '+ Google Analytics',
    'webdev.packages.premium.feature5': 'უფასო ჰოსტინგი + დომეინი',
    'webdev.packages.premium.feature5Note': '- 1 წელი',
    'webdev.packages.premium.feature6': 'Lightning Speed',
    'webdev.packages.premium.feature6Note': '- 1.2წმ ჩატვირთვა',
    'webdev.packages.premium.feature7': '1 კვირა ტექნიკური მხარდაჭერა',
    'webdev.packages.premium.delivery': 'მიწოდება 14–16 დღეში',
    'webdev.packages.premium.button': 'დაუყოვნებლივ დაიწყე!',
    
    // SEO Guarantee section
    'webdev.seo.title': '🏆 SEO გარანტია',
    'webdev.seo.titleHighlight': 'ყველა პაკეტში',
    'webdev.seo.description': 'თქვენი ვებსაიტი იქნება',
    'webdev.seo.descriptionHighlight': 'Google-ში ხილვადი',
    'webdev.seo.descriptionEnd': '- ეს არის ჩვენი პროფესიონალური გარანტია',
    'webdev.seo.feature1.title': 'Responsive Design',
    'webdev.seo.feature1.desc': 'ყველა მოწყობილობაზე',
    'webdev.seo.feature2.title': 'სისწრაფე',
    'webdev.seo.feature2.desc': '1.2წმ ჩატვირთვა',
    'webdev.seo.feature3.title': 'უსაფრთხოება',
    'webdev.seo.feature3.desc': 'SSL + Enterprise მხარდაჭერა',
    'webdev.seo.feature4.title': '95+ Score',
    'webdev.seo.feature4.desc': 'PageSpeed ოპტიმიზაცია',
    
    // Vercel Infrastructure section
    'webdev.vercel.title1': 'Enterprise',
    'webdev.vercel.title2': 'Infrastructure',
    'webdev.vercel.description': 'თქვენი ვებსაიტი იმუშავებს',
    'webdev.vercel.descriptionHighlight': 'Netflix-ის, TikTok-ისა და Airbnb-ის',
    'webdev.vercel.descriptionEnd': 'იმავე პლატფორმაზე - ეს არის ჩვენი ყოველდღიური რეალობა!',
    'webdev.vercel.hostingTitle': 'Vercel Hosting',
    'webdev.vercel.hostingSubtitle': 'Enterprise Performance',
    'webdev.vercel.feature1.title': 'Lightning Speed',
    'webdev.vercel.feature1.desc': '1.2 წამში ჩატვირთვა მსოფლიოს ნებისმიერ წერტილში',
    'webdev.vercel.feature2.title': 'Global CDN',
    'webdev.vercel.feature2.desc': '100+ სერვერი მთელ მსოფლიოში - ყველგან სწრაფი',
    'webdev.vercel.feature3.title': 'Enterprise Security',
    'webdev.vercel.feature3.desc': 'DDoS დაცვა, SSL სერტიფიკატი, უსაფრთხოება',
    'webdev.vercel.feature4.title': '99.99% Uptime',
    'webdev.vercel.feature4.desc': 'თქვენი ვებსაიტი ყოველთვის მუშაობს',
    'webdev.vercel.comparison.title': 'ჩვეულებრივ ჰოსტინგთან შედარება:',
    'webdev.vercel.comparison.regular': 'ჩვეულებრივი ჰოსტინგი',
    'webdev.vercel.comparison.regularSpeed': '3-8 წამი ჩატვირთვა',
    'webdev.vercel.comparison.regularPrice': '200₾/თვე+',
    'webdev.vercel.comparison.vercel': 'Vercel Enterprise',
    'webdev.vercel.comparison.vercelSpeed': '1.2 წამი ჩატვირთვა',
    'webdev.vercel.comparison.vercelPrice': 'ჩართულია!',
    
    // Analytics Dashboard
    'webdev.analytics.title': 'Live Analytics Dashboard',
    'webdev.analytics.live': 'LIVE',
    'webdev.analytics.todayVisitors': 'დღევანდელი ვიზიტორები',
    'webdev.analytics.pageViews': 'Page Views',
    'webdev.analytics.devices': 'მოწყობილობები',
    'webdev.analytics.last24h': 'ბოლო 24 საათი',
    'webdev.analytics.mobile': 'Mobile',
    'webdev.analytics.desktop': 'Desktop',
    'webdev.analytics.performance': 'წარმადობის მეტრიკები',
    'webdev.analytics.loading': 'ჩატვირთვა',
    'webdev.analytics.speedScore': 'Speed Score',
    'webdev.analytics.uptime': 'Uptime',
    'webdev.analytics.insights.title': 'რა შეიტყობთ ანალიტიკიდან:',
    'webdev.analytics.insights.1': '• რომელი გვერდები ყველაზე პოპულარულია',
    'webdev.analytics.insights.2': '• საიდან მოდიან კლიენტები',
    'webdev.analytics.insights.3': '• რა დროს არიან ყველაზე აქტიურები',
    'webdev.analytics.insights.4': '• მობილურზე თუ კომპიუტერზე ნახულობენ',
    
    // Technology section
    'webdev.tech.title': 'მოდერნული ტექნოლოგიები',
    'webdev.tech.subtitle': 'წარმატებული ვებსაიტებისთვის',
    'webdev.tech.react': 'Modern UI',
    'webdev.tech.typescript': 'Type Safety',
    'webdev.tech.firebase': 'Database',
    'webdev.tech.vercel': 'Enterprise Hosting',
    
    // Guarantees section
    'webdev.guarantees.1.title': 'ყველა მოწყობილობაზე',
    'webdev.guarantees.1.desc': 'Desktop, Tablet, Mobile - ყველგან შესანიშნავი ხედვა',
    'webdev.guarantees.2.title': 'Performance Optimized',
    'webdev.guarantees.2.desc': '95+ PageSpeed Score, სწრაფი ჩატვირთვა',
    'webdev.guarantees.3.title': 'Flexible & Secure',
    'webdev.guarantees.3.desc': 'დამატებითი ფუნქციები და უსაფრთხოება',
    
    // Final CTA section
    'webdev.cta.title': 'მზად ხართ',
    'webdev.cta.highlight': 'წარმატებისთვის',
    'webdev.cta.title2': '?',
    'webdev.cta.description': '1,200₾-ით მიიღეთ professional ვებსაიტი რომელიც 2-3 კვირაში ',
    'webdev.cta.descriptionHighlight': 'წარმოგიდგენთ ციფრულ სივრცეში',
    'webdev.cta.button1': '📋 შეკვეთის განთავსება',
    'webdev.cta.button2': '💬 WhatsApp დაკავშირება',
    'webdev.cta.benefits': '🎁 უფასო კონსულტაცია • 🚀 სწრაფი დაწყება • 💰 ღია ფასები',
    'webdev.cta.guarantee': 'ხარისხის გარანტია: პროფესიონალური ვებსაიტი ძალიან მოკლე დროში! 💪',
    
    // Footer
    'footer.brand.tagline': 'ციფრული სააგენტო',
    'footer.brand.description': 'ვქმნით ინოვაციურ ციფრულ გადაწყვეტილებებს, რომელიც გეხმარებათ ბიზნესის ზრდასა და წარმატებაში ციფრულ სივრცეში.',
    'footer.quickLinks.title': 'სწრაფი ბმულები',
    'footer.quickLinks.home': 'მთავარი',
    'footer.quickLinks.about': 'ჩვენს შესახებ',
    'footer.quickLinks.contact': 'კონტაქტი',
    'footer.services.title': 'ჩვენი სერვისები',
    'footer.services.webdev': 'ვებ განვითარება',
    'footer.services.content': 'კონტენტ პროდუქცია',
    'footer.services.ads': 'ციფრული რეკლამა',
    'footer.services.social': 'სოციალური მედია',
    'footer.contact.title': 'დაგვიკავშირდით',
    'footer.contact.location': 'თბილისი, საქართველო',
    'footer.newsletter.title': 'მიიღეთ სიახლეები',
    'footer.newsletter.placeholder': 'თქვენი ელფოსტა',
    'footer.newsletter.subscribe': 'გამოწერა',
    'footer.copyright': 'ყველა უფლება დაცულია.',
    'footer.privacy': 'კონფიდენციალურობა',
    'footer.terms': 'წესები',
    'footer.createdBy': 'შექმნილი',
    'footer.createdByTeam': 'გუნდის მიერ',
    'footer.backToTop': 'ზევით ასვლა',

    // Feature translations for services
    'webdev.features.lightningSpeed': 'Lightning Speed - 1.2წმ ჩატვირთვა',
    'ads.features.targetAudience': 'სამიზნე აუდიტორიის განსაზღვრა',
    'ads.features.abTesting': 'A/B Testing & ოპტიმიზაცია',
    'ads.features.roiTracking': 'ROI თვალყურის დევნება',
    'social.features.postsPerWeek': '3-4 პოსტი კვირაში',
    'social.features.storiesReels': 'Stories და Reels',
    'social.features.commentManagement': 'კომენტარების მართვა',
    'social.features.monthlyReports': 'თვიური Analytics რეპორტი',

    // About page translations
    'about.hero.title': 'ჩვენ ვართ',
    'about.hero.description': 'ციფრული სააგენტო, რომელიც ქმნის მომავალს დღეს. ვეხმარებით ბიზნესებს იზრდებოდნენ ციფრულ სივრცეში ინოვაციური გადაწყვეტილებებით.',

    'about.stats.projects': 'დასრულებული პროექტი',
    'about.stats.clients': 'კმაყოფილი კლიენტი',
    'about.stats.experience': 'წლიანი გამოცდილება',
    'about.stats.support': 'მხარდაჭერა',

    'about.story.title': 'ჩვენი',
    'about.story.titleHighlight': 'ისტორია',
    'about.story.paragraph1': 'VIFA დაფუძნდა 2021 წელს, როდესაც ჩვენმა გუნდმა გადაწყვიტა შექმნათ ციფრული სააგენტო, რომელიც დაეხმარებოდა ქართულ ბიზნესებს წარმატებულად ფუნქციონირებაში ციფრულ სივრცეში.',
    'about.story.paragraph2': 'დღეს ჩვენ ვართ წამყვანი ციფრული სააგენტო საქართველოში, რომელიც მომსახურებას უწევს როგორც მცირე ბიზნესებს, ასევე დიდ კორპორაციებს. ჩვენი მიზანია ყოველი კლიენტისთვის შევქმნათ უნიკალური და ეფექტური ციფრული გადაწყვეტილება.',
    'about.story.paragraph3': 'ჩვენ გვწამს, რომ ყოველი ბიზნესი უნიკალურია და საჭიროებს ინდივიდუალურ მიდგომას. ამიტომაც ჩვენი ყოველი პროექტი იწყება კლიენტის საჭიროებების ღრმა გაგებით.',

    'about.values.title': 'ჩვენი',
    'about.values.titleHighlight': 'ღირებულებები',
    'about.values.description': 'ეს არის ის პრინციპები, რომლებზეც დაფუძნებულია ჩვენი მუშაობა',
    'about.values.innovation.title': 'ინოვაცია',
    'about.values.innovation.description': 'ყოველთვის ვიყენებთ უახლეს ტექნოლოგიებს და მეთოდებს, რომ შევქმნათ უნიკალური და ეფექტური გადაწყვეტილებები.',
    'about.values.partnership.title': 'პარტნიორობა',
    'about.values.partnership.description': 'ჩვენი კლიენტები არიან ჩვენი პარტნიორები. ვმუშაობთ ერთად მათი ბიზნესის წარმატებისთვის.',
    'about.values.quality.title': 'ღირებული შედეგი',
    'about.values.quality.description': 'ყოველი პროექტი არის ჩვენი ვნებისა და პროფესიონალიზმის შედეგი. ვისწრაფვით სრულყოფილებისკენ.',
    'about.values.growth.title': 'ზრდა',
    'about.values.growth.description': 'ვეხმარებით ბიზნესებს გაიზარდონ ციფრული სივრცეში და მიაღწიონ თავიანთ მიზნებს.',

    'about.team.ceo.name': 'გიორგი ვაშაკიძე',
    'about.team.ceo.role': 'CEO & Founder',
    'about.team.ceo.bio': 'ციფრული მარკეტინგის ექსპერტი 5+ წლიანი გამოცდილებით',
    'about.team.ceo.skill1': 'სტრატეგია',
    'about.team.ceo.skill2': 'ლიდერობა',
    'about.team.ceo.skill3': 'ბიზნეს განვითარება',

    'about.team.creative.name': 'ნინო ჯაფარიძე',
    'about.team.creative.role': 'Creative Director',
    'about.team.creative.bio': 'კრეატიული დირექტორი და UX/UI დიზაინერი',
    'about.team.creative.skill1': 'UI/UX დიზაინი',
    'about.team.creative.skill2': 'ბრენდინგი',
    'about.team.creative.skill3': 'კრეატივი',

    'about.team.developer.name': 'დავით მელაძე',
    'about.team.developer.role': 'Lead Developer',
    'about.team.developer.bio': 'Full-stack დეველოპერი თანამედროვე ტექნოლოგიების ექსპერტი',
    'about.team.developer.skill1': 'React',
    'about.team.developer.skill2': 'Node.js',
    'about.team.developer.skill3': 'ვებ განვითარება',

    'about.whatWeDo.title': 'რას',
    'about.whatWeDo.titleHighlight': 'ვაკეთებთ',
    'about.whatWeDo.description': 'ჩვენი სერვისები მოიცავს ციფრული მარკეტინგის ყველა ასპექტს',

    'about.services.webdev.title': 'ვებ განვითარება',
    'about.services.webdev.description': 'თანამედროვე, მობილურზე ოპტიმიზებული ვებსაიტები და ონლაინ მაღაზიები',
    'about.services.content.title': 'კონტენტ პროდუქცია',
    'about.services.content.description': 'პროფესიონალური ფოტო, ვიდეო და ბრენდინგის მომსახურება',
    'about.services.social.title': 'სოციალური მედია',
    'about.services.social.description': 'სრული მომსახურება Facebook, Instagram და სხვა პლატფორმებზე',
    'about.services.ads.title': 'ციფრული რეკლამა',
    'about.services.ads.description': 'ეფექტური რეკლამური კამპანიები და მარკეტინგული სტრატეგია',

    'about.cta.title': 'მზად ხართ დაიწყოთ მომავლის შენება?',
    'about.cta.description': 'მოდით ერთად შევქმნათ რაღაც შესანიშნავი. ჩვენ ველოდებით თქვენს იდეებს და ვნახავთ როგორ შეგვიძლია მათი რეალიზება.',
    'about.cta.startProject': 'პროექტის დაწყება',
    'about.cta.contactUs': 'დაგვიკავშირდით',

    // Start Project page translations
    'startProject.hero.title': 'დაიწყე',
    'startProject.hero.titleHighlight': 'წარმატებული',
    'startProject.hero.titleSuffix': 'ბიზნესის შენება',

    'startProject.progress.step': 'ნაბიჯი',

    'startProject.errors.submitError': 'შეცდომა მოხდა. გთხოვთ კიდევ სცადოთ.',

    // Services
    'startProject.services.website.title': 'ვებსაიტი + ონლაინ მაღაზია',
    'startProject.services.website.description': 'მობილურზე ოპტიმიზებული ვებსაიტი',
    'startProject.services.website.price': '800₾-დან',
    'startProject.services.content.title': 'კონტენტ პროდუქცია',
    'startProject.services.content.description': 'ფოტო/ვიდეო და ბრენდინგი',
    'startProject.services.content.price': '300₾-დან',
    'startProject.services.social.title': 'სოციალური მედია',
    'startProject.services.social.description': 'Instagram/Facebook მართვა',
    'startProject.services.social.price': '400₾/თვე',
    'startProject.services.ads.title': 'ციფრული რეკლამა',
    'startProject.services.ads.description': 'Facebook/Instagram რეკლამები',
    'startProject.services.ads.price': '500₾/თვე',

    // Business types
    'startProject.businessTypes.restaurant': 'რესტორანი/კაფე',
    'startProject.businessTypes.retail': 'ონლაინ მაღაზია',
    'startProject.businessTypes.fitness': 'ფიტნეს/სპორტი',
    'startProject.businessTypes.beauty': 'სილამაზე/ჯანმრთელობა',
    'startProject.businessTypes.business': 'ბიზნეს სერვისები',
    'startProject.businessTypes.other': 'სხვა',

    // Budget ranges
    'startProject.budget.small.range': '500₾ - 1,500₾',
    'startProject.budget.small.description': 'მცირე ბიუჯეტი',
    'startProject.budget.medium.range': '1,500₾ - 3,000₾',
    'startProject.budget.medium.description': 'საშუალო ბიუჯეტი',
    'startProject.budget.large.range': '3,000₾ - 5,000₾',
    'startProject.budget.large.description': 'დიდი ბიუჯეტი',
    'startProject.budget.enterprise.range': '5,000₾+',
    'startProject.budget.enterprise.description': 'კომპლექსური პროექტი',

    // Form steps
    'startProject.step1.title': 'რა სერვისები გჭირდებათ?',
    'startProject.step1.subtitle': 'შეგიძლიათ აირჩიოთ რამდენიმე ვარიანტი',
    'startProject.step2.title': 'რა ტიპის ბიზნესია?',
    'startProject.step2.subtitle': 'აირჩიეთ თქვენი ბიზნესის კატეგორია',
    'startProject.step3.title': 'რა ბიუჯეტი გაქვთ?',
    'startProject.step3.subtitle': 'აირჩიეთ თქვენთვის მოსახერხებელი ბიუჯეტი',
    'startProject.step4.title': 'საკონტაქტო ინფორმაცია',
    'startProject.step4.subtitle': 'შეავსეთ ინფორმაცია რომ დაგიკავშირდეთ',
    'startProject.step5.title': 'მიზნები და ვადები',
    'startProject.step5.subtitle': 'მოგვიყევით თქვენი მიზნების შესახებ',

    // Form fields
    'startProject.form.name': 'სახელი',
    'startProject.form.namePlaceholder': 'თქვენი სახელი',
    'startProject.form.businessName': 'კომპანიის სახელი',
    'startProject.form.businessNamePlaceholder': 'ბიზნესის სახელი',
    'startProject.form.email': 'ემაილი',
    'startProject.form.phone': 'ტელეფონი',
    'startProject.form.goalsLabel': 'რა მიზნები გაქვთ ამ პროექტით?',
    'startProject.form.goalsPlaceholder': 'მაგ: მეტი კლიენტის მოზიდვა, ონლაინ გაყიდვების ზრდა...',
    'startProject.form.timelineLabel': 'როდის გსურთ პროექტის დაწყება?',
    'startProject.form.timelinePlaceholder': 'მაგ: რაც შეიძლება მალე, 2 კვირაში, ჯერ დაგეგმვის ეტაპზე ვარ...',

    // Buttons
    'startProject.buttons.back': 'უკან',
    'startProject.buttons.next': 'შემდეგი',
    'startProject.buttons.submitting': 'იგზავნება...',
    'startProject.buttons.submit': 'შეკვეთის გაგზავნა',

    // Success page
    'startProject.success.title': 'შეკვეთა წარმატებით გაიგზავნა!',
    'startProject.success.description': 'გმადლობთ ნდობისთვის! ჩვენი გუნდი დაგიკავშირდებათ 24 საათის განმავლობაში და მოგაწვდით დეტალურ შეთავაზებას.',
    'startProject.success.email.subtitle': 'ემაილზე მიიღებთ',
    'startProject.success.email.title': 'დეტალურ შეთავაზებას',
    'startProject.success.phone.subtitle': '24 საათში',
    'startProject.success.phone.title': 'დაგიკავშირდებით',
    'startProject.success.consultation.subtitle': 'უფასო',
    'startProject.success.consultation.title': 'კონსულტაცია',
    'startProject.success.newOrder': 'ახალი შეკვეთა',
    'startProject.success.backToHome': 'მთავარ გვერდზე',

    // Footer
    'startProject.footer.trustIndicators': '🔒 თქვენი ინფორმაცია დაცულია • 🎁 უფასო კონსულტაცია • ⚡ სწრაფი პასუხი',

    // SEO Meta Tags
    'seo.home.title': 'VIFA - ციფრული მარკეტინგის სააგენტო საქართველოში',
    'seo.home.description': 'VIFA - წამყვანი ციფრული მარკეტინგის სააგენტო საქართველოში. ვებსაიტების განვითარება, სოციალური მედიის მართვა, ციფრული რეკლამა. პროფესიონალური სერვისები თბილისში.',
    'seo.home.keywords': 'ციფრული მარკეტინგი, ვებსაიტის შექმნა, სოციალური მედია, რეკლამა, საქართველო, თბილისი, VIFA',

    'seo.about.title': 'ჩვენ შესახებ - VIFA Team',
    'seo.about.description': 'VIFA-ს გუნდის შესახებ. ჩვენი გამოცდილება, მიზნები და ღირებულებები ციფრული მარკეტინგის სფეროში საქართველოში.',
    'seo.about.keywords': 'VIFA გუნდი, ციფრული მარკეტინგის კომპანია, ვებ განვითარება, საქართველო',

    'seo.services.social.title': 'სოციალური მედიის მართვა - VIFA',
    'seo.services.social.description': 'პროფესიონალური სოციალური მედიის მართვა Instagram, Facebook, TikTok-ზე. შინაარსის შექმნა, გამოქვეყნება და ანალიზი.',
    'seo.services.social.keywords': 'სოციალური მედია, Instagram მართვა, Facebook მარკეტინგი, TikTok, შინაარსის შექმნა',

    'seo.services.ads.title': 'ციფრული რეკლამა - VIFA',
    'seo.services.ads.description': 'Google Ads, Facebook და Instagram რეკლამების კამპანიების მართვა. ROI ოპტიმიზაცია და გაყიდვების ზრდა.',
    'seo.services.ads.keywords': 'Google Ads, Facebook რეკლამა, Instagram რეკლამა, PPC, ციფრული რეკლამა',

    'seo.services.webdev.title': 'ვებსაიტის განვითარება - VIFA',
    'seo.services.webdev.description': 'რესპონსიული ვებსაიტების და ონლაინ მაღაზიების შექმნა. SEO ოპტიმიზაცია, უსაფრთხოება და სწრაფი ჩატვირთვა.',
    'seo.services.webdev.keywords': 'ვებსაიტის შექმნა, ონლაინ მაღაზია, ვებ განვითარება, SEO, რესპონსიული დიზაინი',

    'seo.startProject.title': 'პროექტის დაწყება - VIFA',
    'seo.startProject.description': 'დაიწყეთ თქვენი ციფრული პროექტი VIFA-სთან ერთად. უფასო კონსულტაცია და პერსონალიზებული გადაწყვეტები.',
    'seo.startProject.keywords': 'პროექტის დაწყება, კონსულტაცია, ციფრული მარკეტინგი, ვება განვითარება',
  },

  
  en: {
    // Home page
    'home.hero.title': 'Build a Successful Business Digitally',
    'home.hero.subtitle': 'Vifa - Your Trusted Partner for Digital Success',
    'home.hero.description': 'We offer complete digital services: website creation, social media management, digital advertising, and content production',
    'home.hero.getStarted': 'Start Project',
    'home.hero.ourServices': 'Our Services',
    
    // Services section
    'home.services.title': 'Our Services',
    'home.services.subtitle': 'Complete digital solutions for your business',
    
    'home.services.webdev.title': 'Website + Online Store',
    'home.services.webdev.description': 'Professional, mobile-optimized websites and online stores',
    'home.services.webdev.price': 'From ₾800',
    'home.services.webdev.button': 'Learn More',
    
    'home.services.content.title': 'Content Production',
    'home.services.content.description': 'Professional photo/video services and branding',
    'home.services.content.price': 'From ₾300',
    'home.services.content.button': 'Learn More',
    
    'home.services.social.title': 'Social Media Management',
    'home.services.social.description': 'Complete Instagram/Facebook page management and growth',
    'home.services.social.price': '₾400/month',
    'home.services.social.button': 'Learn More',
    
    'home.services.ads.title': 'Digital Advertising',
    'home.services.ads.description': 'Facebook/Instagram ads management and optimization',
    'home.services.ads.price': '₾500/month',
    'home.services.ads.button': 'Learn More',
    
    // Why Choose Us section
    'home.whyUs.title': 'Why Vifa?',
    'home.whyUs.subtitle': 'Everything in one place - for digital success',
    
    'home.whyUs.experience.title': 'Experience',
    'home.whyUs.experience.description': '3+ years of experience in digital marketing',
    
    'home.whyUs.results.title': 'Results',
    'home.whyUs.results.description': '200+ successful projects and satisfied clients',
    
    'home.whyUs.support.title': 'Support',
    'home.whyUs.support.description': '24/7 support and free consultations',
    
    'home.whyUs.price.title': 'Price',
    'home.whyUs.price.description': 'Competitive prices and flexible payment terms',
    
    // CTA section
    'home.cta.title': 'Ready to Grow Your Business?',
    'home.cta.description': 'Start collaborating with us and see your business digital transformation',
    'home.cta.button': 'Start Project',
    'home.cta.contact': 'Contact Us',
    'home.cta.callNow': '📞 Call Now - 555 123 456',
    'home.cta.benefits': '🎁 First consultation is free • ✨ Business plan development',
    
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.startProject': 'Start Project',
    'nav.theme': 'Theme',
    'nav.language': 'Language',
    'nav.tagline': 'Digital Agency',
    
    // Office Location
    'office.title': 'Our Office',
    'office.subtitle': 'Visit our office for a free consultation',
    'office.address': 'Address',
    'office.address.full': 'Megobroba 4, Rustavi, Georgia',
    'office.viewOnMaps': 'View on Google Maps',
    'office.workingHours': 'Working Hours',
    'office.hours.weekdays': 'Monday-Friday: 10:00-18:00',
    'office.hours.saturday': 'Saturday: 10:00-15:00',
    'office.hours.sunday': 'Sunday: Closed',
    'office.contact': 'Contact',
    'office.route': 'Route',
    'office.streetView': 'Street View',
    'office.share': 'Share',
    'office.map': 'Map',
    'office.satellite': 'Satellite',
    'office.hybrid': 'Hybrid',
    'office.status.open': 'Open',
    'office.status.closed': 'Closed',
    'office.addressCopied': 'Address copied!',
    'office.mapLoading': 'Map is loading...',
    'office.mapError': 'Error loading map',
    'office.retry': 'Try again',
    
    // Services navigation
    'services.social.title': 'Social Media Management',
    'services.social.description': 'Instagram & Facebook management',
    'services.ads.title': 'Digital Advertising',
    'services.ads.description': 'Facebook & Google ads',
    'services.webdev.title': 'Web Development',
    'services.webdev.description': 'Websites and online stores',
    'services.content.title': 'Content Production',
    'services.content.description': 'Photo, video and branding',
    
    // Digital Advertising Page
    'ads.hero.title': 'Digital Advertising',
    'ads.hero.subtitle': 'Growth and Profit',
    'ads.hero.description': 'Attract new customers and increase sales with effective advertising campaigns on Google, Facebook, Instagram and other platforms',
    'ads.stats.roi': 'Average ROI Growth',
    'ads.stats.cpa': 'CPA Reduction',
    'ads.stats.campaigns': 'Successful Campaigns',
    'ads.stats.monitoring': 'Monitoring',
    'ads.platforms.google.audience': '90% Population',
    'ads.platforms.meta.audience': '2.9B Users',
    'ads.platforms.youtube.audience': '2B+ Views',
    'ads.platforms.tiktok.audience': '1B+ Active',
    'ads.platforms.linkedin.audience': '900M Professionals',
    'ads.types.title': 'Ad Types',
    'ads.types.subtitle': 'Suitable advertising formats for every business',
    'ads.types.search.description': 'Show your business in Google search results',
    'ads.types.search.benefit1': 'High intent',
    'ads.types.search.benefit2': 'Precise targeting',
    'ads.types.search.benefit3': 'Instant results',
    'ads.types.display.description': 'Visual ads on millions of websites',
    'ads.types.display.benefit1': 'Brand awareness',
    'ads.types.display.benefit2': 'Retargeting',
    'ads.types.display.benefit3': 'Visual impact',
    'ads.types.video.description': 'Video ads on YouTube and social media',
    'ads.types.video.benefit1': 'High engagement',
    'ads.types.video.benefit2': 'Emotional connection',
    'ads.types.video.benefit3': 'Viral potential',
    'ads.types.shopping.description': 'Direct product display in search results',
    'ads.types.shopping.benefit1': 'High conversion',
    'ads.types.shopping.benefit2': 'Product visualization',
    'ads.types.shopping.benefit3': 'Price comparison',
    'ads.services.title': 'Our Services',
    'ads.services.subtitle': 'Complete digital advertising management',
    'ads.services.targeting.title': 'Target Audience Definition',
    'ads.services.targeting.description': 'Detailed market research and ideal client profile creation',
    'ads.services.strategy.title': 'Campaign Strategy',
    'ads.services.strategy.description': 'ROI-oriented advertising strategy development',
    'ads.services.creative.title': 'Creative Development',
    'ads.services.creative.description': 'Effective advertising material design and A/B testing',
    'ads.services.optimization.title': 'Optimization and Reporting',
    'ads.services.optimization.description': 'Continuous monitoring, optimization and detailed analytics',
    'ads.process.title': 'How We Work',
    'ads.process.subtitle': 'Our proven methodology for maximum ROI',
    'ads.process.step1.title': 'Business Analysis',
    'ads.process.step1.description': 'In-depth study of your business, competitors and market',
    'ads.process.step2.title': 'Strategy Development',
    'ads.process.step2.description': 'Goal setting, KPI definition and campaign planning',
    'ads.process.step3.title': 'Campaign Launch',
    'ads.process.step3.description': 'Ad creation, targeting setup and campaign launch',
    'ads.process.step4.title': 'Optimization',
    'ads.process.step4.description': 'Daily monitoring, testing and adjustments for better results',
    'ads.cta.title': 'Ready to',
    'ads.cta.highlight': 'Increase',
    'ads.cta.suffix': 'Sales?',
    'ads.cta.description': 'Start with a free advertising audit and see your potential',
    'ads.cta.button1': 'Free Advertising Audit',
    'ads.cta.button2': 'Contact Us',
    'ads.cta.benefits': '🎁 Free campaign audit • 📊 ROI forecast • 🚀 Quick start',

    // Social Media Service Page
    'social.hero.title': 'Social Media',
    'social.hero.subtitle': 'Professional Management',
    'social.hero.description': 'We are experts in successful management of Instagram, Facebook, TikTok and YouTube. We help your brand achieve maximum visibility and engagement on all platforms.',
    
    // Platform descriptions
    'social.platforms.facebook.description': 'The largest social network',
    'social.platforms.facebook.stats': '2.9B+ active users',
    'social.platforms.facebook.bestFor': 'Local Business, B2B companies',
    'social.platforms.facebook.feature1': 'Facebook Pages management',
    'social.platforms.facebook.feature2': 'Facebook Ads Campaign',
    'social.platforms.facebook.feature3': 'Events and Community',
    'social.platforms.facebook.feature4': 'Facebook Shop',
    'social.platforms.facebook.feature5': 'Messenger Marketing',
    
    'social.platforms.instagram.description': 'Visual content provision',
    'social.platforms.instagram.stats': '1B+ active users',
    'social.platforms.instagram.bestFor': 'Visual brands, B2C companies',
    'social.platforms.instagram.feature1': 'Stories and Reels creation',
    'social.platforms.instagram.feature2': 'IGTV video content',
    'social.platforms.instagram.feature3': 'Shopping Integration',
    'social.platforms.instagram.feature4': 'Hashtag optimization',
    'social.platforms.instagram.feature5': 'Instagram Ads management',
    
    'social.platforms.tiktok.description': 'Viral content platform',
    'social.platforms.tiktok.stats': '1B+ active users',
    'social.platforms.tiktok.bestFor': 'Gen Z audience, Creative brands',
    'social.platforms.tiktok.feature1': 'Viral video content',
    'social.platforms.tiktok.feature2': 'Trending Challenges',
    'social.platforms.tiktok.feature3': 'TikTok Shop Integration',
    'social.platforms.tiktok.feature4': 'Influencer Collaboration',
    'social.platforms.tiktok.feature5': 'Brand ambassadors',
    
    'social.platforms.youtube.description': 'Video content leader',
    'social.platforms.youtube.stats': '2B+ active users',
    'social.platforms.youtube.bestFor': 'Educational content, B2B services',
    'social.platforms.youtube.feature1': 'YouTube Channel management',
    'social.platforms.youtube.feature2': 'Video SEO optimization',
    'social.platforms.youtube.feature3': 'YouTube Shorts',
    'social.platforms.youtube.feature4': 'Monetization strategy',
    'social.platforms.youtube.feature5': 'YouTube Ads',
    
    // Platform Services section
    'social.platformServices.title': 'Our Services:',
    
    // Stats section
    'social.stats.title': 'Results by Platform',
    'social.stats.instagram.stat': '500K+',
    'social.stats.instagram.desc': 'Created Posts & Stories',
    'social.stats.facebook.stat': '2M+',
    'social.stats.facebook.desc': 'Reach achieved',
    'social.stats.tiktok.stat': '50M+',
    'social.stats.tiktok.desc': 'Viral Views',
    'social.stats.youtube.stat': '1M+',
    'social.stats.youtube.desc': 'Subscriber growth',
    
    // Services section
    'social.services.title': 'Our Services',
    'social.services.subtitle': 'Full spectrum for social media management',
    
    'social.services.planning.title': 'Content Planning',
    'social.services.planning.description': 'Daily post scheduling and automatic publishing',
    'social.services.planning.feature1': 'Content calendar',
    'social.services.planning.feature2': 'Auto-posting',
    'social.services.planning.feature3': 'Optimal timing',
    'social.services.planning.feature4': 'Cross-platform',
    
    'social.services.visual.title': 'Visual Content',
    'social.services.visual.description': 'Professional photos, graphic design and video production',
    'social.services.visual.feature1': 'Photo creation',
    'social.services.visual.feature2': 'Graphic design',
    'social.services.visual.feature3': 'Video editing',
    'social.services.visual.feature4': 'Brand identity',
    
    'social.services.community.title': 'Community Management',
    'social.services.community.description': 'Audience engagement, comment replies and engagement growth',
    'social.services.community.feature1': '24/7 monitoring',
    'social.services.community.feature2': 'Quick responses',
    'social.services.community.feature3': 'Crisis management',
    'social.services.community.feature4': 'Follower growth',
    
    'social.services.analytics.title': 'Analytics and Reporting',
    'social.services.analytics.description': 'Detailed analysis, ROI tracking and strategy optimization',
    'social.services.analytics.feature1': 'Performance tracking',
    'social.services.analytics.feature2': 'Engagement metrics',
    'social.services.analytics.feature3': 'ROI analysis',
    'social.services.analytics.feature4': 'Competitor monitoring',
    
    // Process section
    'social.process.title': 'How We Work',
    'social.process.subtitle': 'Our experienced process for guaranteed results',
    
    'social.process.step1.title': 'Analysis and Strategy',
    'social.process.step1.description': 'Brand analysis, target audience definition and content strategy development',
    
    'social.process.step2.title': 'Content Creation',
    'social.process.step2.description': 'Visual and textual content production according to brand identity',
    
    'social.process.step3.title': 'Publishing and Management',
    'social.process.step3.description': 'Content publishing at optimal times and audience engagement',
    
    'social.process.step4.title': 'Analysis and Optimization',
    'social.process.step4.description': 'Results analysis, reporting and continuous strategy improvement',
    
    // Testimonials section
    'social.testimonials.title': 'User Reviews',
    
    'social.testimonials.testimonial1.text': 'VIFA completely transformed our Instagram page. Clients ask us daily where did you see these beautiful photos.',
    'social.testimonials.testimonial1.author': 'Ana G.',
    'social.testimonials.testimonial1.business': 'Beauty Salon',
    'social.testimonials.testimonial1.platform': 'Instagram',
    
    'social.testimonials.testimonial2.text': 'Online orders doubled in 3 months. Their content strategy really works!',
    'social.testimonials.testimonial2.author': 'Giorgi M.',
    'social.testimonials.testimonial2.business': 'Restaurant "Georgian Table"',
    'social.testimonials.testimonial2.platform': 'Facebook',
    
    'social.testimonials.testimonial3.text': 'Our TikTok video reached 100K views! The new generation knows our brand.',
    'social.testimonials.testimonial3.author': 'Tina K.',
    'social.testimonials.testimonial3.business': 'Fashion Brand',
    'social.testimonials.testimonial3.platform': 'TikTok',
    
    // CTA section
    'social.cta.title': 'Ready to',
    'social.cta.highlight': 'Grow',
    'social.cta.subtitle': 'your brand',
    'social.cta.suffix': 'on all platforms?',
    'social.cta.description': 'Go through consultation and learn how we can help you achieve success on Instagram, Facebook, TikTok and YouTube',
    'social.cta.button': 'Project Planning',
    
    // FAQ section
    'social.faq.title': 'Frequently Asked Questions',
    'social.faq.subtitle': 'Answers to the most popular questions',
    
    'social.faq.q1.question': 'Which platforms do you work on?',
    'social.faq.q1.answer': 'We are specialists in managing Instagram, Facebook, TikTok and YouTube. We have an experienced team and proven results for all platforms.',
    
    'social.faq.q2.question': 'How soon are results visible?',
    'social.faq.q2.answer': 'First results are usually visible in 2-4 weeks, but significant growth is visible in 2-3 months. Everything depends on your business and goals.',
    
    'social.faq.q3.question': 'What if we already have social media?',
    'social.faq.q3.answer': 'Great! We will first analyze your existing pages, then create a strategy to improve their effectiveness.',
    
    'social.faq.q4.question': 'How much does the service cost per month?',
    'social.faq.q4.answer': 'The price depends on the package and number of platforms. Contact us for free consultation and individual offer.',
    
    'social.faq.q5.question': 'Do you have a guarantee?',
    'social.faq.q5.answer': 'We guarantee engagement growth and content quality. If you don\'t see results in 3 months, we will continue working for free.',
    
    // Contact section
    'social.contact.title': 'Contact Us Today',
    'social.contact.phone.title': 'Phone',
    'social.contact.phone.info': '+995 555 123 456',
    'social.contact.email.title': 'Email',
    'social.contact.email.info': 'info@vifa.ge',
    'social.contact.social.title': 'Contact',
    'social.contact.social.info': 'WhatsApp or Messenger',
    'social.contact.hours': 'Working hours: Mon-Fri 10:00-19:00 | Special support 24/7',
    
    // Web Development Page
    'webdev.businessResults.title1': 'Better Image',
    'webdev.businessResults.desc1': 'Professional website = Trust and authority',
    'webdev.businessResults.title2': 'More Opportunities',
    'webdev.businessResults.desc2': 'Online presence = Customers find you',
    'webdev.businessResults.title3': 'Easy Connection',
    'webdev.businessResults.desc3': 'WhatsApp + Phone = Instant contact',
    'webdev.businessResults.title4': 'Google Discovery',
    'webdev.businessResults.desc4': 'SEO + Maps = Customers easily find you',
    
    // Hero section
    'webdev.hero.title1': 'Website that',
    'webdev.hero.title2': 'Makes Money',
    'webdev.hero.description.part1': 'Create a',
    'webdev.hero.description.highlight': 'professional website',
    'webdev.hero.description.part2': 'that promotes business development and',
    'webdev.hero.description.part3': 'brings real income',
    
    // Packages section
    'webdev.packages.title': 'Web Development',
    'webdev.packages.titleHighlight': 'Packages',
    'webdev.packages.subtitle': 'Choose the appropriate package for your business',
    
    // Basic Package
    'webdev.packages.basic.title': '🟦 Basic Package (Starter)',
    'webdev.packages.basic.description': '👉 Perfect for those who just need simple online presence',
    'webdev.packages.basic.price': '₾250',
    'webdev.packages.basic.priceNote': 'Fixed price',
    'webdev.packages.basic.feature1': 'Single-page site (Landing Page)',
    'webdev.packages.basic.feature2': 'Basic text and images',
    'webdev.packages.basic.feature3': 'Contact form or WhatsApp button',
    'webdev.packages.basic.feature4': 'Mobile-responsive design',
    'webdev.packages.basic.feature5': 'Free hosting',
    'webdev.packages.basic.feature5Note': '- Vercel Enterprise level',
    'webdev.packages.basic.feature6': 'SSL certificate',
    'webdev.packages.basic.feature6Note': '+ Security',
    'webdev.packages.basic.delivery': 'Delivery in 7 days',
    'webdev.packages.basic.button': 'Start immediately!',
    
    // Standard Package
    'webdev.packages.standard.title': '🟩 Standard Package (Standard)',
    'webdev.packages.standard.description': '👉 For those who want a more expanded site',
    'webdev.packages.standard.price': '₾350',
    'webdev.packages.standard.priceNote': 'Fixed price',
    'webdev.packages.standard.feature1': '2-3 page website',
    'webdev.packages.standard.feature2': 'Basic SEO optimization',
    'webdev.packages.standard.feature3': 'Google Maps + Analytics',
    'webdev.packages.standard.feature4': 'Text and image insertion',
    'webdev.packages.standard.feature5': 'Free hosting + domain',
    'webdev.packages.standard.feature5Note': '- 1 year',
    'webdev.packages.standard.feature6': '95+ PageSpeed',
    'webdev.packages.standard.feature6Note': '- Fast loading',
    'webdev.packages.standard.delivery': 'Delivery in 10-12 days',
    'webdev.packages.standard.button': 'Start immediately!',
    
    // Premium Package
    'webdev.packages.premium.title': '🟨 Premium Package (Premium)',
    'webdev.packages.premium.description': '👉 Best for small businesses that need professional online showcase',
    'webdev.packages.premium.price': '₾550',
    'webdev.packages.premium.priceNote': 'Fixed price',
    'webdev.packages.premium.popular': 'Popular',
    'webdev.packages.premium.feature1': '4-5 page site',
    'webdev.packages.premium.feature2': 'Services/Products catalog',
    'webdev.packages.premium.feature3': 'Contact form + Social media integration',
    'webdev.packages.premium.feature4': 'Professional SEO',
    'webdev.packages.premium.feature4Note': '+ Google Analytics',
    'webdev.packages.premium.feature5': 'Free hosting + domain',
    'webdev.packages.premium.feature5Note': '- 1 year',
    'webdev.packages.premium.feature6': 'Lightning Speed',
    'webdev.packages.premium.feature6Note': '- 1.2s loading',
    'webdev.packages.premium.feature7': '1 week technical support',
    'webdev.packages.premium.delivery': 'Delivery in 14-16 days',
    'webdev.packages.premium.button': 'Start immediately!',
    
    // SEO Guarantee section
    'webdev.seo.title': '🏆 SEO Guarantee',
    'webdev.seo.titleHighlight': 'in all packages',
    'webdev.seo.description': 'Your website will be',
    'webdev.seo.descriptionHighlight': 'visible on Google',
    'webdev.seo.descriptionEnd': '- this is our professional guarantee',
    'webdev.seo.feature1.title': 'Responsive Design',
    'webdev.seo.feature1.desc': 'On all devices',
    'webdev.seo.feature2.title': 'Speed',
    'webdev.seo.feature2.desc': '1.2s loading',
    'webdev.seo.feature3.title': 'Security',
    'webdev.seo.feature3.desc': 'SSL + Enterprise support',
    'webdev.seo.feature4.title': '95+ Score',
    'webdev.seo.feature4.desc': 'PageSpeed optimization',
    
    // Vercel Infrastructure section
    'webdev.vercel.title1': 'Enterprise',
    'webdev.vercel.title2': 'Infrastructure',
    'webdev.vercel.description': 'Your website will run on',
    'webdev.vercel.descriptionHighlight': 'Netflix, TikTok and Airbnb',
    'webdev.vercel.descriptionEnd': 'same platform - this is our daily reality!',
    'webdev.vercel.hostingTitle': 'Vercel Hosting',
    'webdev.vercel.hostingSubtitle': 'Enterprise Performance',
    'webdev.vercel.feature1.title': 'Lightning Speed',
    'webdev.vercel.feature1.desc': '1.2 second loading anywhere in the world',
    'webdev.vercel.feature2.title': 'Global CDN',
    'webdev.vercel.feature2.desc': '100+ servers worldwide - fast everywhere',
    'webdev.vercel.feature3.title': 'Enterprise Security',
    'webdev.vercel.feature3.desc': 'DDoS protection, SSL certificate, security',
    'webdev.vercel.feature4.title': '99.99% Uptime',
    'webdev.vercel.feature4.desc': 'Your website always works',
    'webdev.vercel.comparison.title': 'Comparison with regular hosting:',
    'webdev.vercel.comparison.regular': 'Regular hosting',
    'webdev.vercel.comparison.regularSpeed': '3-8 second loading',
    'webdev.vercel.comparison.regularPrice': '₾200/month+',
    'webdev.vercel.comparison.vercel': 'Vercel Enterprise',
    'webdev.vercel.comparison.vercelSpeed': '1.2 second loading',
    'webdev.vercel.comparison.vercelPrice': 'Included!',
    
    // Analytics Dashboard
    'webdev.analytics.title': 'Live Analytics Dashboard',
    'webdev.analytics.live': 'LIVE',
    'webdev.analytics.todayVisitors': 'Today\'s visitors',
    'webdev.analytics.pageViews': 'Page Views',
    'webdev.analytics.devices': 'Devices',
    'webdev.analytics.last24h': 'Last 24 hours',
    'webdev.analytics.mobile': 'Mobile',
    'webdev.analytics.desktop': 'Desktop',
    'webdev.analytics.performance': 'Performance metrics',
    'webdev.analytics.loading': 'Loading',
    'webdev.analytics.speedScore': 'Speed Score',
    'webdev.analytics.uptime': 'Uptime',
    'webdev.analytics.insights.title': 'What you learn from analytics:',
    'webdev.analytics.insights.1': '• Which pages are most popular',
    'webdev.analytics.insights.2': '• Where customers come from',
    'webdev.analytics.insights.3': '• What time they are most active',
    'webdev.analytics.insights.4': '• Do they view on mobile or computer',
    
    // Technology section
    'webdev.tech.title': 'Modern Technologies',
    'webdev.tech.subtitle': 'For successful websites',
    'webdev.tech.react': 'Modern UI',
    'webdev.tech.typescript': 'Type Safety',
    'webdev.tech.firebase': 'Database',
    'webdev.tech.vercel': 'Enterprise Hosting',
    
    // Guarantees section
    'webdev.guarantees.1.title': 'On all devices',
    'webdev.guarantees.1.desc': 'Desktop, Tablet, Mobile - excellent view everywhere',
    'webdev.guarantees.2.title': 'Performance Optimized',
    'webdev.guarantees.2.desc': '95+ PageSpeed Score, fast loading',
    'webdev.guarantees.3.title': 'Flexible & Secure',
    'webdev.guarantees.3.desc': 'Additional features and security',
    
    // Final CTA section
    'webdev.cta.title': 'Ready for',
    'webdev.cta.highlight': 'Success',
    'webdev.cta.title2': '?',
    'webdev.cta.description': 'Get a professional website for ₾1,200 that will',
    'webdev.cta.descriptionHighlight': 'represent you in digital space in 2-3 weeks',
    'webdev.cta.button1': '📋 Place Order',
    'webdev.cta.button2': '💬 WhatsApp Connect',
    'webdev.cta.benefits': '🎁 Free consultation • 🚀 Quick start • 💰 Transparent prices',
    'webdev.cta.guarantee': 'Quality guarantee: Professional website or money back! 💪',
    
    // Footer
    'footer.brand.tagline': 'Digital Agency',
    'footer.brand.description': 'We create innovative digital solutions that help you grow your business and succeed in the digital space.',
    'footer.quickLinks.title': 'Quick Links',
    'footer.quickLinks.home': 'Home',
    'footer.quickLinks.about': 'About Us',
    'footer.quickLinks.contact': 'Contact',
    'footer.services.title': 'Our Services',
    'footer.services.webdev': 'Web Development',
    'footer.services.content': 'Content Production',
    'footer.services.ads': 'Digital Advertising',
    'footer.services.social': 'Social Media',
    'footer.contact.title': 'Contact Us',
    'footer.contact.location': 'Tbilisi, Georgia',
    'footer.newsletter.title': 'Get Updates',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.createdBy': 'Created by',
    'footer.createdByTeam': 'team',
    'footer.backToTop': 'Back to top',

    // Feature translations for services
    'webdev.features.lightningSpeed': 'Lightning Speed - 1.2s loading',
    'ads.features.targetAudience': 'Target audience definition',
    'ads.features.abTesting': 'A/B Testing & optimization',
    'ads.features.roiTracking': 'ROI tracking',
    'social.features.postsPerWeek': '3-4 posts per week',
    'social.features.storiesReels': 'Stories and Reels',
    'social.features.commentManagement': 'Comment management',
    'social.features.monthlyReports': 'Monthly Analytics reports',

    // About page translations
    'about.hero.title': 'We are',
    'about.hero.description': 'A digital agency that creates the future today. We help businesses grow in the digital space with innovative solutions.',

    'about.stats.projects': 'Completed Projects',
    'about.stats.clients': 'Satisfied Clients',
    'about.stats.experience': 'Years of Experience',
    'about.stats.support': 'Support',

    'about.story.title': 'Our',
    'about.story.titleHighlight': 'Story',
    'about.story.paragraph1': 'VIFA was founded in 2021, when our team decided to create a digital agency that would help Georgian businesses successfully operate in the digital space.',
    'about.story.paragraph2': 'Today we are a leading digital agency in Georgia, serving both small businesses and large corporations. Our goal is to create unique and effective digital solutions for every client.',
    'about.story.paragraph3': 'We believe that every business is unique and requires an individual approach. That\'s why every project of ours starts with a deep understanding of the client\'s needs.',

    'about.values.title': 'Our',
    'about.values.titleHighlight': 'Values',
    'about.values.description': 'These are the principles on which our work is based',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.description': 'We always use the latest technologies and methods to create unique and effective solutions.',
    'about.values.partnership.title': 'Partnership',
    'about.values.partnership.description': 'Our clients are our partners. We work together for their business success.',
    'about.values.quality.title': 'Quality Results',
    'about.values.quality.description': 'Every project is the result of our passion and professionalism. We strive for perfection.',
    'about.values.growth.title': 'Growth',
    'about.values.growth.description': 'We help businesses grow in the digital space and achieve their goals.',

    'about.team.ceo.name': 'Giorgi Vashakidze',
    'about.team.ceo.role': 'CEO & Founder',
    'about.team.ceo.bio': 'Digital marketing expert with 5+ years of experience',
    'about.team.ceo.skill1': 'Strategy',
    'about.team.ceo.skill2': 'Leadership',
    'about.team.ceo.skill3': 'Business Development',

    'about.team.creative.name': 'Nino Japaridze',
    'about.team.creative.role': 'Creative Director',
    'about.team.creative.bio': 'Creative director and UX/UI designer',
    'about.team.creative.skill1': 'UI/UX Design',
    'about.team.creative.skill2': 'Branding',
    'about.team.creative.skill3': 'Creative',

    'about.team.developer.name': 'David Meladze',
    'about.team.developer.role': 'Lead Developer',
    'about.team.developer.bio': 'Full-stack developer expert in modern technologies',
    'about.team.developer.skill1': 'React',
    'about.team.developer.skill2': 'Node.js',
    'about.team.developer.skill3': 'Web Development',

    'about.whatWeDo.title': 'What we',
    'about.whatWeDo.titleHighlight': 'do',
    'about.whatWeDo.description': 'Our services cover all aspects of digital marketing',

    'about.services.webdev.title': 'Web Development',
    'about.services.webdev.description': 'Modern, mobile-optimized websites and online stores',
    'about.services.content.title': 'Content Production',
    'about.services.content.description': 'Professional photo, video and branding services',
    'about.services.social.title': 'Social Media',
    'about.services.social.description': 'Full service on Facebook, Instagram and other platforms',
    'about.services.ads.title': 'Digital Advertising',
    'about.services.ads.description': 'Effective advertising campaigns and marketing strategy',

    'about.cta.title': 'Ready to start building the future?',
    'about.cta.description': 'Let\'s create something amazing together. We are waiting for your ideas and we\'ll see how we can realize them.',
    'about.cta.startProject': 'Start Project',
    'about.cta.contactUs': 'Contact Us',

    // Start Project page translations
    'startProject.hero.title': 'Start Building',
    'startProject.hero.titleHighlight': 'Successful',
    'startProject.hero.titleSuffix': 'Business',

    'startProject.progress.step': 'Step',

    'startProject.errors.submitError': 'An error occurred. Please try again.',

    // Services
    'startProject.services.website.title': 'Website + Online Store',
    'startProject.services.website.description': 'Mobile-optimized website',
    'startProject.services.website.price': 'From $200',
    'startProject.services.content.title': 'Content Production',
    'startProject.services.content.description': 'Photo/video and branding',
    'startProject.services.content.price': 'From $75',
    'startProject.services.social.title': 'Social Media',
    'startProject.services.social.description': 'Instagram/Facebook management',
    'startProject.services.social.price': '$100/month',
    'startProject.services.ads.title': 'Digital Advertising',
    'startProject.services.ads.description': 'Facebook/Instagram ads',
    'startProject.services.ads.price': '$125/month',

    // Business types
    'startProject.businessTypes.restaurant': 'Restaurant/Cafe',
    'startProject.businessTypes.retail': 'Online Store',
    'startProject.businessTypes.fitness': 'Fitness/Sports',
    'startProject.businessTypes.beauty': 'Beauty/Health',
    'startProject.businessTypes.business': 'Business Services',
    'startProject.businessTypes.other': 'Other',

    // Budget ranges
    'startProject.budget.small.range': '$125 - $375',
    'startProject.budget.small.description': 'Small Budget',
    'startProject.budget.medium.range': '$375 - $750',
    'startProject.budget.medium.description': 'Medium Budget',
    'startProject.budget.large.range': '$750 - $1,250',
    'startProject.budget.large.description': 'Large Budget',
    'startProject.budget.enterprise.range': '$1,250+',
    'startProject.budget.enterprise.description': 'Complex Project',

    // Form steps
    'startProject.step1.title': 'What services do you need?',
    'startProject.step1.subtitle': 'You can choose multiple options',
    'startProject.step2.title': 'What type of business is it?',
    'startProject.step2.subtitle': 'Choose your business category',
    'startProject.step3.title': 'What\'s your budget?',
    'startProject.step3.subtitle': 'Choose a comfortable budget for you',
    'startProject.step4.title': 'Contact Information',
    'startProject.step4.subtitle': 'Fill in information so we can contact you',
    'startProject.step5.title': 'Goals and Timeline',
    'startProject.step5.subtitle': 'Tell us about your goals',

    // Form fields
    'startProject.form.name': 'Name',
    'startProject.form.namePlaceholder': 'Your name',
    'startProject.form.businessName': 'Company Name',
    'startProject.form.businessNamePlaceholder': 'Business name',
    'startProject.form.email': 'Email',
    'startProject.form.phone': 'Phone',
    'startProject.form.goalsLabel': 'What goals do you have for this project?',
    'startProject.form.goalsPlaceholder': 'e.g: Attract more customers, increase online sales...',
    'startProject.form.timelineLabel': 'When would you like to start the project?',
    'startProject.form.timelinePlaceholder': 'e.g: As soon as possible, in 2 weeks, still in planning phase...',

    // Buttons
    'startProject.buttons.back': 'Back',
    'startProject.buttons.next': 'Next',
    'startProject.buttons.submitting': 'Submitting...',
    'startProject.buttons.submit': 'Submit Order',

    // Success page
    'startProject.success.title': 'Order submitted successfully!',
    'startProject.success.description': 'Thank you for your trust! Our team will contact you within 24 hours and provide you with a detailed proposal.',
    'startProject.success.email.subtitle': 'You will receive via email',
    'startProject.success.email.title': 'Detailed proposal',
    'startProject.success.phone.subtitle': 'Within 24 hours',
    'startProject.success.phone.title': 'We will contact you',
    'startProject.success.consultation.subtitle': 'Free',
    'startProject.success.consultation.title': 'Consultation',
    'startProject.success.newOrder': 'New Order',
    'startProject.success.backToHome': 'Back to Home',

    // Footer
    'startProject.footer.trustIndicators': '🔒 Your information is secure • 🎁 Free consultation • ⚡ Quick response',

    // SEO Meta Tags
    'seo.home.title': 'VIFA - Digital Marketing Agency in Georgia',
    'seo.home.description': 'VIFA - Leading digital marketing agency in Georgia. Web development, social media management, digital advertising. Professional services in Tbilisi.',
    'seo.home.keywords': 'digital marketing, web development, social media, advertising, Georgia, Tbilisi, VIFA',

    'seo.about.title': 'About Us - VIFA Team',
    'seo.about.description': 'About VIFA team. Our experience, goals and values in digital marketing field in Georgia.',
    'seo.about.keywords': 'VIFA team, digital marketing company, web development, Georgia',

    'seo.services.social.title': 'Social Media Management - VIFA',
    'seo.services.social.description': 'Professional social media management for Instagram, Facebook, TikTok. Content creation, publishing and analytics.',
    'seo.services.social.keywords': 'social media, Instagram management, Facebook marketing, TikTok, content creation',

    'seo.services.ads.title': 'Digital Advertising - VIFA',
    'seo.services.ads.description': 'Google Ads, Facebook and Instagram advertising campaigns management. ROI optimization and sales growth.',
    'seo.services.ads.keywords': 'Google Ads, Facebook advertising, Instagram ads, PPC, digital advertising',

    'seo.services.webdev.title': 'Web Development - VIFA',
    'seo.services.webdev.description': 'Responsive websites and online stores development. SEO optimization, security and fast loading.',
    'seo.services.webdev.keywords': 'web development, online store, website creation, SEO, responsive design',

    'seo.startProject.title': 'Start Project - VIFA',
    'seo.startProject.description': 'Start your digital project with VIFA. Free consultation and personalized solutions.',
    'seo.startProject.keywords': 'start project, consultation, digital marketing, web development',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Check localStorage or default to Georgian
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && (savedLanguage === 'ka' || savedLanguage === 'en') ? savedLanguage : 'ka';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', currentLanguage);
    
    // Set document language attribute
    document.documentElement.lang = currentLanguage === 'ka' ? 'ka-GE' : 'en-US';
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'ka' ? 'en' : 'ka');
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage] as Record<string, string>;
    return currentTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        toggleLanguage,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};