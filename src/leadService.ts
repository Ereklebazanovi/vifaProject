// lib/leadService.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
///
export interface LeadData {
  services: string[];
  businessType: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  currentWebsite: string;
  goals: string;
  timeline: string;
  preferredContact: string;
}

export const submitLead = async (leadData: LeadData) => {
  try {
    // Add lead to Firestore
    const docRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      status: "new",
      submittedAt: serverTimestamp(),
      createdAt: new Date().toISOString(),
    });

    console.log("Lead submitted with ID: ", docRef.id);
    
    // Return success with document ID
    return {
      success: true,
      leadId: docRef.id,
      message: "შეკვეთა წარმატებით გაიგზავნა!"
    };
    
  } catch (error) {
    console.error("Error adding lead: ", error);
    
    return {
      success: false,
      error: error,
      message: "შეცდომა მოხდა. გთხოვთ კიდევ სცადოთ."
    };
  }
};

// Helper function to create WhatsApp message
export const createWhatsAppMessage = (leadData: LeadData): string => {
  const servicesText = leadData.services.map(service => {
    switch(service) {
      case 'website': return 'ვებსაიტი';
      case 'content': return 'კონტენტ პროდუქცია';
      case 'social': return 'სოციალური მედია';
      case 'ads': return 'ციფრული რეკლამა';
      default: return service;
    }
  }).join(', ');

  const businessTypeText = (() => {
    switch(leadData.businessType) {
      case 'restaurant': return 'რესტორანი/კაფე';
      case 'retail': return 'ონლაინ მაღაზია';
      case 'fitness': return 'ფიტნეს/სპორტი';
      case 'beauty': return 'სილამაზე/ჯანმრთელობა';
      case 'business': return 'ბიზნეს სერვისები';
      case 'other': return 'სხვა';
      default: return leadData.businessType;
    }
  })();

  const budgetText = (() => {
    switch(leadData.budget) {
      case 'small': return '500₾ - 1,500₾';
      case 'medium': return '1,500₾ - 3,000₾';
      case 'large': return '3,000₾ - 5,000₾';
      case 'enterprise': return '5,000₾+';
      default: return leadData.budget;
    }
  })();

  return `გამარჯობა! ახალი შეკვეთა Vifa Digital-ს ვებსაიტიდან:

📋 სერვისები: ${servicesText}
🏢 ბიზნესის ტიპი: ${businessTypeText}
💰 ბიუჯეტი: ${budgetText}

👤 კონტაქტი:
სახელი: ${leadData.name}
კომპანია: ${leadData.businessName}
ემაილი: ${leadData.email}
ტელეფონი: ${leadData.phone || 'არ არის მითითებული'}

🌐 არსებული ვებსაიტი: ${leadData.currentWebsite || 'არ აქვს'}

🎯 მიზნები:
${leadData.goals || 'არ არის მითითებული'}

⏰ ვადები:
${leadData.timeline || 'არ არის მითითებული'}

📞 სასურველი კომუნიკაცია: ${leadData.preferredContact}`;
};