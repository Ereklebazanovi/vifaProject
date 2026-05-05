// src/services/chatbotRequestService.ts
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { ChatbotRequest, ChatbotRequestFormData } from '../types/chatbotRequest';

/**
 * Submit new chatbot request to Firestore
 */
export const submitChatbotRequest = async (formData: ChatbotRequestFormData) => {
  try {
    // Add request to Firestore
    const docRef = await addDoc(collection(db, 'chatbot-requests'), {
      ...formData,
      status: 'pending',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Chatbot request submitted with ID:', docRef.id);
    
    return {
      success: true,
      requestId: docRef.id,
      message: 'ჩატბოტის მოთხოვნა წარმატებით გაიგზავნა! ჩვენი გუნდი მალე დაგიკავშირდებათ.'
    };
    
  } catch (error) {
    console.error('❌ Error submitting chatbot request:', error);
    
    return {
      success: false,
      error: error,
      message: 'შეცდომა მოხდა მოთხოვნის გაგზავნისას. გთხოვთ სცადოთ თავიდან.'
    };
  }
};

/**
 * Real-time subscription to chatbot requests (for admin dashboard)
 */
export const subscribeToChatbotRequests = (
  callback: (requests: ChatbotRequest[]) => void
) => {
  const q = query(
    collection(db, 'chatbot-requests'),
    orderBy('submittedAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const requests: ChatbotRequest[] = [];
    
    querySnapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      } as ChatbotRequest);
    });
    
    callback(requests);
  });

  return unsubscribe;
};

/**
 * Update chatbot request status
 */
export const updateChatbotRequestStatus = async (
  requestId: string, 
  status: ChatbotRequest['status']
) => {
  try {
    await updateDoc(doc(db, 'chatbot-requests', requestId), {
      status,
      updatedAt: serverTimestamp(),
    });
    
    console.log('✅ Request status updated:', { requestId, status });
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error updating request status:', error);
    return { success: false, error };
  }
};

/**
 * Helper: Format timestamp for display
 */
export const formatTimestamp = (timestamp: Timestamp): string => {
  return new Date(timestamp.toDate()).toLocaleString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Helper: Get status text in Georgian
 */
export const getStatusText = (status: ChatbotRequest['status']): string => {
  const statusMap: Record<ChatbotRequest['status'], string> = {
    pending: 'განხილვაში',
    approved: 'დამტკიცებული',
    'in-progress': 'მუშაობაში',
    completed: 'დასრულებული',
    rejected: 'უარყოფილი',
  };
  return statusMap[status];
};

/**
 * Helper: Get status color
 */
export const getStatusColor = (status: ChatbotRequest['status']): string => {
  const colorMap: Record<ChatbotRequest['status'], string> = {
    pending: 'bg-yellow-500',
    approved: 'bg-blue-500',
    'in-progress': 'bg-purple-500',
    completed: 'bg-green-500',
    rejected: 'bg-red-500',
  };
  return colorMap[status];
};