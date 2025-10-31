// src/types/chatbotRequest.ts
import { Timestamp } from 'firebase/firestore';

// Business Types
export const BUSINESS_TYPES = [
  { value: 'retail', label: 'საცალო ვაჭრობა' },
  { value: 'restaurant', label: 'რესტორანი / კაფე' },
  { value: 'hotel', label: 'სასტუმრო / სტუმარმასპინძლობა' },
  { value: 'healthcare', label: 'ჯანმრთელობის დაცვა / კლინიკა' },
  { value: 'beauty', label: 'სილამაზე / კოსმეტიკა' },
  { value: 'fitness', label: 'სპორტი / ფიზიკური აქტივობა' },
  { value: 'education', label: 'განათლება / კურსები' },
  { value: 'real-estate', label: 'უძრავი ქონება' },
  { value: 'automotive', label: 'საავტომობილო მომსახურება' },
  { value: 'finance', label: 'ფინანსური მომსახურება' },
  { value: 'legal', label: 'იურიდიული მომსახურება' },
  { value: 'technology', label: 'ტექნოლოგიები / IT' },
  { value: 'consulting', label: 'საკონსულტაციო მომსახურება' },
  { value: 'e-commerce', label: 'ელექტრონული კომერცია (ონლაინ მაღაზია)' },
  { value: 'services', label: 'სხვა მომსახურება' },
  { value: 'other', label: 'სხვა' },
] as const;

// Communication Tones
export const COMMUNICATION_TONES = [
  { value: 'professional', label: 'პროფესიული', desc: 'ოფიციალური და სერიოზული' },
  { value: 'friendly', label: 'მეგობრული', desc: 'თბილი და მისასალმებელი' },
  { value: 'energetic', label: 'ენერგიული', desc: 'მხიარული და მოტივაციის მომცემი' },
  { value: 'casual', label: 'არაფორმალური', desc: 'თავისუფალი და ყოველდღიური' },
] as const;

// Primary Languages
export const LANGUAGES = [
  { value: 'georgian', label: 'ქართული' },
  { value: 'english', label: 'English' },
  { value: 'both', label: 'ორივე ენა' },
] as const;

// Primary Goals
export const PRIMARY_GOALS = [
  { value: 'customer-support', label: 'მომხმარებელთა მხარდაჭერა', desc: 'კითხვებზე პასუხგაცემა და დახმარება' },
  { value: 'increase-sales', label: 'გაყიდვების ზრდა', desc: 'პროდუქტების პრომოცია და კლიენტების კონვერტაცია' },
  { value: 'information', label: 'ინფორმაციის მიწოდება', desc: 'ბიზნესის შესახებ ინფორმაციის გაზიარება' },
  { value: 'reservations', label: 'ჯავშნები / რეზერვაციები', desc: 'მომსახურების ჯავშნა და დაგეგმვა' },
  { value: 'general-assistance', label: 'ზოგადი დახმარება', desc: 'სხვადასხვა საკითხებში ასისტირება' },
] as const;

// Status types
export type ChatbotRequestStatus = 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';

// Main ChatbotRequest interface - SIMPLIFIED
export interface ChatbotRequest {
  id: string;
  status: ChatbotRequestStatus;
  submittedAt: Timestamp;
  updatedAt?: Timestamp;

  // User Information
  userInfo: {
    fullName: string;
    companyName: string;
    contactNumber: string;
    email: string;
    socialMediaLink?: string; // optional
  };

  // Business Information
  businessInfo: {
    businessType: string; // from BUSINESS_TYPES
    description: string;
    servicesProducts: string;
    workingHours?: string; // optional
    location?: string; // optional
  };

  // Chatbot Parameters
  chatbotParams: {
    tone: 'professional' | 'friendly' | 'energetic' | 'casual';
    language: 'georgian' | 'english' | 'both';
    primaryGoal: string; // from PRIMARY_GOALS
    customPrompts?: string; // optional
  };

  // FAQ (Optional)
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Form data interface (what we collect from the form)
export interface ChatbotRequestFormData extends Omit<ChatbotRequest, 'id' | 'submittedAt' | 'updatedAt'> {
  // The form data matches the ChatbotRequest structure minus the auto-generated fields
}