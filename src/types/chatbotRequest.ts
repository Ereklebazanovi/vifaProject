// src/types/chatbotRequest.ts
import { Timestamp } from 'firebase/firestore';

export interface ChatbotRequest {
  id: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  submittedAt: Timestamp;
  updatedAt?: Timestamp;
  
  // 1. Company Information
  companyInfo: {
    name: string;                    // კომპანიის სახელი
    website?: string;                // ვებსაიტი (optional)
    socialMedia: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
    email: string;                   // ელ. ფოსტა (required)
    phone: string;                   // ტელეფონი (required)
    industry: string;                // ინდუსტრია
  };
  
  // 2. Target Audience & Goals
  audience: {
    targetCustomer: string;          // სამიზნე მომხმარებელი (textarea)
    mainGoals: string[];             // მთავარი მიზნები (checkboxes)
    primaryLanguage: 'georgian' | 'english' | 'both'; // ენა
  };
  
  // 3. Chatbot Personality & Style
  personality: {
    tone: 'friendly' | 'professional' | 'humorous' | 'serious'; // ტონი
    responseLength: 'short' | 'medium' | 'detailed';            // პასუხის სიგრძე
    greetingBehavior: string;        // როდის უნდა მიესალმოს (textarea)
    useEmojis: boolean;              // emoji-ების გამოყენება
    stylisticPreferences?: string;   // დამატებითი სტილისტიკა (optional)
  };
  
  // 4. Chatbot Content (ყველაზე მნიშვნელოვანი!)
  content: {
    productsServices: string;        // პროდუქტები/სერვისები (textarea - დიდი)
    faqs: Array<{                    // FAQ-ები (dynamic array)
      question: string;
      answer: string;
    }>;
    importantLinks: Array<{          // მნიშვნელოვანი ლინკები (dynamic array)
      label: string;
      url: string;
    }>;
    exampleQuestions: string[];      // მაგალითი კითხვები (array of strings)
  };
  
  // 5. Technical Information
  technical: {
    platforms: string[];             // პლატფორმები (messenger, whatsapp, website, instagram)
    integrations: string[];          // ინტეგრაციები (crm, email, sheets, other)
    apiWebhooks?: string;            // API/Webhooks info (optional)
  };
  
  // 6. Design and Branding (optional section)
  branding?: {
    logoUrl?: string;                // ლოგოს URL (Firebase Storage-ში upload)
    colors?: {
      primary?: string;              // ძირითადი ფერი
      secondary?: string;            // მეორადი ფერი
    };
    visualPreferences?: string;      // ვიზუალური პრეფერენსები (textarea)
  };
  
  // 7. Additional Notes
  additionalNotes?: string;          // დამატებითი შენიშვნები (textarea)
}

// Form Data Type (without id, submittedAt - for submission)
export type ChatbotRequestFormData = Omit<ChatbotRequest, 'id' | 'submittedAt' | 'updatedAt'>;

// Goal Options (for checkboxes in Step 2)
export const CHATBOT_GOALS = [
  { value: 'sales', label: 'გაყიდვების გაზრდა' },
  { value: 'support', label: 'მომხმარებელთა მხარდაჭერა' },
  { value: 'lead_generation', label: 'ლიდების გენერირება' },
  { value: 'faq_automation', label: 'FAQ ავტომატიზაცია' },
  { value: 'appointment_booking', label: 'ვიზიტების დაჯავშნა' },
  { value: 'order_tracking', label: 'შეკვეთის თვალთვალი' },
  { value: 'feedback_collection', label: 'გამოხმაურების შეგროვება' },
];

// Platform Options (for checkboxes in Step 5)
export const CHATBOT_PLATFORMS = [
  { value: 'messenger', label: 'Facebook Messenger', icon: '💬' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  { value: 'website', label: 'ვებსაიტი (Widget)', icon: '🌐' },
  { value: 'instagram', label: 'Instagram DM', icon: '📷' },
  { value: 'telegram', label: 'Telegram', icon: '✈️' },
];

// Integration Options (for checkboxes in Step 5)
export const CHATBOT_INTEGRATIONS = [
  { value: 'crm', label: 'CRM სისტემა' },
  { value: 'email', label: 'ელ. ფოსტა (Email Marketing)' },
  { value: 'google_sheets', label: 'Google Sheets' },
  { value: 'calendar', label: 'კალენდარი (Google Calendar)' },
  { value: 'payment', label: 'გადახდის სისტემა' },
  { value: 'analytics', label: 'ანალიტიკა' },
  { value: 'other', label: 'სხვა' },
];

// Industry Options (for Step 1)
export const INDUSTRIES = [
  { value: 'ecommerce', label: 'ელექტრონული კომერცია' },
  { value: 'restaurant', label: 'რესტორანი/კაფე' },
  { value: 'healthcare', label: 'ჯანდაცვა' },
  { value: 'education', label: 'განათლება' },
  { value: 'real_estate', label: 'უძრავი ქონება' },
  { value: 'finance', label: 'ფინანსები' },
  { value: 'travel', label: 'მოგზაურობა' },
  { value: 'fitness', label: 'ფიტნესი/სპორტი' },
  { value: 'beauty', label: 'სილამაზე' },
  { value: 'technology', label: 'ტექნოლოგია' },
  { value: 'consulting', label: 'კონსულტაცია' },
  { value: 'other', label: 'სხვა' },
];