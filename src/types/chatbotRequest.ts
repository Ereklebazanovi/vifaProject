// src/types/chatbotRequest.ts
import { Timestamp } from 'firebase/firestore';

// Business Types
export const BUSINESS_TYPES = [
  { value: 'retail', label: 'საცალო ვაჭრობა' },
  { value: 'restaurant', label: 'კვების ობიექტები (რესტორანი/კაფე)' },
  { value: 'hotel', label: 'სასტუმრო ბიზნესი' },
  { value: 'healthcare', label: 'ჯანდაცვის სექტორი / კლინიკა' },
  { value: 'beauty', label: 'სილამაზის ინდუსტრია / კოსმეტოლოგია' },
  { value: 'fitness', label: 'ფიტნესი და სპორტული სერვისები' },
  { value: 'education', label: 'საგანმანათლებლო დაწესებულება / ტრენინგი' },
  { value: 'real-estate', label: 'უძრავი ქონების მართვა' },
  { value: 'automotive', label: 'საავტომობილო სფერო' },
  { value: 'finance', label: 'ფინანსური მომსახურება' },
  { value: 'legal', label: 'იურიდიული მომსახურება' },
  { value: 'technology', label: 'ტექნოლოგიები და ინფორმაციული სერვისები (IT)' },
  { value: 'consulting', label: 'საკონსულტაციო საქმიანობა' },
  { value: 'e-commerce', label: 'ელექტრონული კომერცია' },
  { value: 'services', label: 'მომსახურების სფერო' },
  { value: 'other', label: 'სხვა' },
] as const;

// Communication Tones
export const COMMUNICATION_TONES = [
  { value: 'professional', label: 'პროფესიული', desc: 'შინაარსის მკაცრი სტრუქტურა, ტერმინოლოგიური სიზუსტის დაცვა' },
  { value: 'friendly', label: 'მეგობრული', desc: 'დადებითი კეთილგანწყობის გამოხატვა, ინტერაქციის გამარტივება' },
  { value: 'energetic', label: 'ენერგიული', desc: 'მაღალი ინტენსივობა, ადრესატის სამოქმედოდ მოტივირება' },
  { value: 'casual', label: 'არაფორმალური', desc: 'უშუალო მიმართვის ფორმა, ყოველდღიური ლექსიკის გამოყენება' },
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
    businessType: string[]; // from BUSINESS_TYPES - multiple selection
    description: string;
    servicesProducts: string;
    workingHours?: string; // optional
    location?: string; // optional
  };

  // Chatbot Parameters
  chatbotParams: {
    tone: 'professional' | 'friendly' | 'energetic' | 'casual';
    language: string[]; // from LANGUAGES - multiple selection
    primaryGoal: string[]; // from PRIMARY_GOALS - multiple selection
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