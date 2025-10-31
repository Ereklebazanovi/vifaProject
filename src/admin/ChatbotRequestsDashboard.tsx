// src/admin/ChatbotRequestsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaCalendarAlt,
  FaBriefcase,
  FaUser,
  FaBuilding,
  FaGlobe,
  FaBullseye,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaRobot,
  FaFileAlt
} from 'react-icons/fa';
import {
  subscribeToChatbotRequests,
  updateChatbotRequestStatus,
  getStatusText,
  getStatusColor,
  formatTimestamp
} from '../service/chatbotRequestService';
import type { ChatbotRequest } from '../types/chatbotRequest';
import {
  BUSINESS_TYPES,
  COMMUNICATION_TONES,
  LANGUAGES,
  PRIMARY_GOALS
} from '../types/chatbotRequest';

const ChatbotRequestsDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ChatbotRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ChatbotRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ChatbotRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Real-time requests subscription
  useEffect(() => {
    const unsubscribe = subscribeToChatbotRequests((requestsData) => {
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter requests
  useEffect(() => {
    let filtered = requests;

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(req => req.status === filterStatus);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.userInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.userInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [requests, filterStatus, searchTerm]);

  const handleStatusUpdate = async (requestId: string, status: ChatbotRequest['status']) => {
    try {
      await updateChatbotRequestStatus(requestId, status);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('შეცდომა მოხდა სტატუსის განახლებისას');
    }
  };

  const exportToCSV = () => {
    const headers = [
      'სრული სახელი',
      'კომპანია',
      'ელ. ფოსტა',
      'ტელეფონი',
      'ბიზნესის ტიპი',
      'მიზანი',
      'ენა',
      'ტონი',
      'სტატუსი',
      'თარიღი'
    ];

    const csvData = filteredRequests.map(req => [
      req.userInfo.fullName,
      req.userInfo.companyName,
      req.userInfo.email,
      req.userInfo.contactNumber,
      BUSINESS_TYPES.find(t => t.value === req.businessInfo.businessType)?.label || req.businessInfo.businessType,
      PRIMARY_GOALS.find(g => g.value === req.chatbotParams.primaryGoal)?.label || req.chatbotParams.primaryGoal,
      LANGUAGES.find(l => l.value === req.chatbotParams.language)?.label || req.chatbotParams.language,
      COMMUNICATION_TONES.find(t => t.value === req.chatbotParams.tone)?.label || req.chatbotParams.tone,
      getStatusText(req.status),
      formatTimestamp(req.submittedAt)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chatbot_requests_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">იტვირთება...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FaRobot className="text-blue-400" />
              Chatbot Requests Management
            </h1>
            <p className="text-slate-400">მართეთ ჩატბოტების მოთხოვნები (გამარტივებული)</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>

            <a
              href="/admin/leads"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Lead Management
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'ახალი მოთხოვნები',
              value: requests.filter(r => r.status === 'pending').length,
              icon: <FaExclamationTriangle />,
              color: 'bg-yellow-500'
            },
            {
              title: 'დამტკიცებული',
              value: requests.filter(r => r.status === 'approved').length,
              icon: <FaCheckCircle />,
              color: 'bg-blue-500'
            },
            {
              title: 'მუშაობაში',
              value: requests.filter(r => r.status === 'in-progress').length,
              icon: <FaRobot />,
              color: 'bg-purple-500'
            },
            {
              title: 'დასრულებული',
              value: requests.filter(r => r.status === 'completed').length,
              icon: <FaCheckCircle />,
              color: 'bg-green-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ძებნა</label>
              <input
                type="text"
                placeholder="კომპანია, სახელი, ემაილი..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">სტატუსი</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="all">ყველა</option>
                <option value="pending">განხილვაში</option>
                <option value="approved">დამტკიცებული</option>
                <option value="in-progress">მუშაობაში</option>
                <option value="completed">დასრულებული</option>
                <option value="rejected">უარყოფილი</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                ფილტრების გასუფთავება
              </button>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">კლიენტი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">ბიზნესი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">ჩატბოტი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">სტატუსი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">თარიღი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">მოქმედება</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredRequests.map((request) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{request.userInfo.fullName}</div>
                        <div className="text-sm text-slate-400">{request.userInfo.companyName}</div>
                        <div className="text-sm text-blue-400">{request.userInfo.email}</div>
                        <div className="text-sm text-green-400">{request.userInfo.contactNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-sm font-medium">
                          {BUSINESS_TYPES.find(t => t.value === request.businessInfo.businessType)?.label}
                        </span>
                        <div className="text-xs text-slate-400 mt-1 max-w-xs truncate">
                          {request.businessInfo.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-slate-400">მიზანი:</span>{' '}
                          <span className="text-white">
                            {PRIMARY_GOALS.find(g => g.value === request.chatbotParams.primaryGoal)?.label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {COMMUNICATION_TONES.find(t => t.value === request.chatbotParams.tone)?.label} • {' '}
                          {LANGUAGES.find(l => l.value === request.chatbotParams.language)?.label}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusUpdate(request.id, e.target.value as ChatbotRequest['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(request.status)} border-none outline-none cursor-pointer`}
                      >
                        <option value="pending">განხილვაში</option>
                        <option value="approved">დამტკიცებული</option>
                        <option value="in-progress">მუშაობაში</option>
                        <option value="completed">დასრულებული</option>
                        <option value="rejected">უარყოფილი</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatTimestamp(request.submittedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-400/30 hover:border-blue-400/50"
                      >
                        დეტალები
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">მოთხოვნები არ მოიძებნა</div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedRequest.userInfo.companyName}</h2>
                  <p className="text-slate-400">
                    {BUSINESS_TYPES.find(t => t.value === selectedRequest.businessInfo.businessType)?.label}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <select
                  value={selectedRequest.status}
                  onChange={(e) => {
                    handleStatusUpdate(selectedRequest.id, e.target.value as ChatbotRequest['status']);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${getStatusColor(selectedRequest.status)} border-none outline-none cursor-pointer`}
                >
                  <option value="pending">განხილვაში</option>
                  <option value="approved">დამტკიცებული</option>
                  <option value="in-progress">მუშაობაში</option>
                  <option value="completed">დასრულებული</option>
                  <option value="rejected">უარყოფილი</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* User Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaUser className="text-blue-400" />
                      მომხმარებლის ინფორმაცია
                    </h3>
                    <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaUser className="text-slate-400" />
                        <span>{selectedRequest.userInfo.fullName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaBuilding className="text-slate-400" />
                        <span>{selectedRequest.userInfo.companyName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-slate-400" />
                        <a href={`mailto:${selectedRequest.userInfo.email}`} className="text-blue-400 hover:underline">
                          {selectedRequest.userInfo.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-slate-400" />
                        <a href={`tel:${selectedRequest.userInfo.contactNumber}`} className="text-blue-400 hover:underline">
                          {selectedRequest.userInfo.contactNumber}
                        </a>
                      </div>
                      {selectedRequest.userInfo.socialMediaLink && (
                        <div className="flex items-center gap-3">
                          <FaGlobe className="text-slate-400" />
                          <a
                            href={selectedRequest.userInfo.socialMediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            სოციალური მედია
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaBriefcase className="text-blue-400" />
                      ბიზნესის ინფორმაცია
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg space-y-4">
                      <div>
                        <span className="text-slate-400 text-sm">ბიზნესის ტიპი:</span>
                        <div className="text-white font-medium">
                          {BUSINESS_TYPES.find(t => t.value === selectedRequest.businessInfo.businessType)?.label}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">აღწერა:</span>
                        <p className="text-slate-300 text-sm mt-1">
                          {selectedRequest.businessInfo.description}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">სერვისები/პროდუქტები:</span>
                        <p className="text-slate-300 text-sm mt-1">
                          {selectedRequest.businessInfo.servicesProducts}
                        </p>
                      </div>
                      {selectedRequest.businessInfo.workingHours && (
                        <div>
                          <span className="text-slate-400 text-sm">სამუშაო საათები:</span>
                          <div className="text-white">{selectedRequest.businessInfo.workingHours}</div>
                        </div>
                      )}
                      {selectedRequest.businessInfo.location && (
                        <div>
                          <span className="text-slate-400 text-sm">მისამართი:</span>
                          <div className="text-white">{selectedRequest.businessInfo.location}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chatbot Parameters */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaRobot className="text-blue-400" />
                      ჩატბოტის პარამეტრები
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">ტონი:</span>
                        <span className="text-white">
                          {COMMUNICATION_TONES.find(t => t.value === selectedRequest.chatbotParams.tone)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ენა:</span>
                        <span className="text-white">
                          {LANGUAGES.find(l => l.value === selectedRequest.chatbotParams.language)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">მიზანი:</span>
                        <span className="text-white">
                          {PRIMARY_GOALS.find(g => g.value === selectedRequest.chatbotParams.primaryGoal)?.label}
                        </span>
                      </div>
                    </div>
                    {selectedRequest.chatbotParams.customPrompts && (
                      <div className="bg-slate-800/50 p-4 rounded-lg mt-3">
                        <p className="text-slate-400 text-xs mb-1">სპეციალური ინსტრუქციები:</p>
                        <p className="text-slate-300 text-sm">{selectedRequest.chatbotParams.customPrompts}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* FAQs */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaFileAlt className="text-blue-400" />
                      FAQ-ები ({selectedRequest.faqs.filter(f => f.question && f.answer).length})
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {selectedRequest.faqs
                        .filter(faq => faq.question && faq.answer)
                        .map((faq, index) => (
                          <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-blue-400 font-bold text-sm">Q{index + 1}:</span>
                              <p className="text-white text-sm font-medium">{faq.question}</p>
                            </div>
                            <div className="flex items-start gap-2 ml-6">
                              <span className="text-green-400 font-bold text-sm">A:</span>
                              <p className="text-slate-300 text-sm">{faq.answer}</p>
                            </div>
                          </div>
                        ))}
                      {selectedRequest.faqs.filter(f => f.question && f.answer).length === 0 && (
                        <div className="bg-slate-800/50 p-4 rounded-lg text-center text-slate-400">
                          FAQ-ები არ არის დამატებული
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      თარიღები
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">გაგზავნის თარიღი:</span>
                        <span className="text-white">{formatTimestamp(selectedRequest.submittedAt)}</span>
                      </div>
                      {selectedRequest.updatedAt && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">განახლების თარიღი:</span>
                          <span className="text-white">{formatTimestamp(selectedRequest.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
                <div className="text-sm text-slate-400">
                  Request ID: <span className="text-slate-300 font-mono">{selectedRequest.id}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Copy all info to clipboard
                      if (!selectedRequest) return;
                      const req = selectedRequest;
                      const info = `
Chatbot Request - ${req.userInfo.companyName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 კლიენტი: ${req.userInfo.fullName}
🏢 კომპანია: ${req.userInfo.companyName}
📧 Email: ${req.userInfo.email}
📞 ტელეფონი: ${req.userInfo.contactNumber}

🏪 ბიზნესის ტიპი: ${BUSINESS_TYPES.find(t => t.value === req.businessInfo.businessType)?.label}
📝 აღწერა: ${req.businessInfo.description}

🤖 ჩატბოტი:
- მიზანი: ${PRIMARY_GOALS.find(g => g.value === req.chatbotParams.primaryGoal)?.label}
- ტონი: ${COMMUNICATION_TONES.find(t => t.value === req.chatbotParams.tone)?.label}
- ენა: ${LANGUAGES.find(l => l.value === req.chatbotParams.language)?.label}

📋 FAQ-ები: ${req.faqs.filter(f => f.question && f.answer).length} ცალი
                      `.trim();

                      navigator.clipboard.writeText(info);
                      alert('ინფორმაცია დაკოპირდა clipboardში');
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    📋 Copy Info
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    დახურვა
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotRequestsDashboard;