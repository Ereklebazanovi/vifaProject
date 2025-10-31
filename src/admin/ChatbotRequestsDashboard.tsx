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
  FaPalette,
  FaCog,
  FaUsers,
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
  CHATBOT_GOALS, 
  CHATBOT_PLATFORMS, 
  CHATBOT_INTEGRATIONS,
  INDUSTRIES 
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
        req.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.companyInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      'კომპანია',
      'ელ. ფოსტა',
      'ტელეფონი',
      'ინდუსტრია',
      'მიზნები',
      'პლატფორმები',
      'სტატუსი',
      'თარიღი'
    ];
    
    const csvData = filteredRequests.map(req => [
      req.companyInfo.name,
      req.companyInfo.email,
      req.companyInfo.phone,
      req.companyInfo.industry,
      req.audience.mainGoals.join(', '),
      req.technical.platforms.join(', '),
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
            <p className="text-slate-400">მართეთ ჩატბოტების მოთხოვნები</p>
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
              icon: <FaCog />,
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
                placeholder="კომპანია, ემაილი..."
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">კომპანია</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">ინდუსტრია</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">მიზნები</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">პლატფორმები</th>
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
                        <div className="font-medium">{request.companyInfo.name}</div>
                        <div className="text-sm text-blue-400">{request.companyInfo.email}</div>
                        <div className="text-sm text-green-400">{request.companyInfo.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">
                        {INDUSTRIES.find(i => i.value === request.companyInfo.industry)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {request.audience.mainGoals.slice(0, 2).map((goal) => (
                          <span
                            key={goal}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                          >
                            {CHATBOT_GOALS.find(g => g.value === goal)?.label.split(' ')[0]}
                          </span>
                        ))}
                        {request.audience.mainGoals.length > 2 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                            +{request.audience.mainGoals.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {request.technical.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="text-lg"
                          >
                            {CHATBOT_PLATFORMS.find(p => p.value === platform)?.icon}
                          </span>
                        ))}
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
              {/* Modal content continues in next message... */}
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedRequest.companyInfo.name}</h2>
                  <p className="text-slate-400">
                    {INDUSTRIES.find(i => i.value === selectedRequest.companyInfo.industry)?.label}
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
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaUser className="text-blue-400" />
                      საკონტაქტო ინფორმაცია
                    </h3>
                    <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-slate-400" />
                        <a href={`mailto:${selectedRequest.companyInfo.email}`} className="text-blue-400 hover:underline">
                          {selectedRequest.companyInfo.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-slate-400" />
                        <a href={`tel:${selectedRequest.companyInfo.phone}`} className="text-blue-400 hover:underline">
                          {selectedRequest.companyInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaBuilding className="text-slate-400" />
                        <span>{selectedRequest.companyInfo.name}</span>
                      </div>
                      {selectedRequest.companyInfo.website && (
                        <div className="flex items-center gap-3">
                          <FaGlobe className="text-slate-400" />
                          <a 
                            href={selectedRequest.companyInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {selectedRequest.companyInfo.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social Media */}
                  {(selectedRequest.companyInfo.socialMedia.facebook || 
                    selectedRequest.companyInfo.socialMedia.instagram) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaGlobe className="text-blue-400" />
                        სოციალური მედია
                      </h3>
                      <div className="space-y-2 bg-slate-800/50 p-4 rounded-lg">
                        {selectedRequest.companyInfo.socialMedia.facebook && (
                          <a 
                            href={selectedRequest.companyInfo.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-400 hover:underline text-sm"
                          >
                            📘 Facebook
                          </a>
                        )}
                        {selectedRequest.companyInfo.socialMedia.instagram && (
                          <a 
                            href={selectedRequest.companyInfo.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-400 hover:underline text-sm"
                          >
                            📷 Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Goals */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaBullseye className="text-blue-400" />
                      ჩატბოტის მიზნები
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.audience.mainGoals.map(goal => (
                        <span
                          key={goal}
                          className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm rounded-full"
                        >
                          {CHATBOT_GOALS.find(g => g.value === goal)?.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaUsers className="text-blue-400" />
                      სამიზნე აუდიტორია
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <p className="text-slate-300 text-sm whitespace-pre-wrap">
                        {selectedRequest.audience.targetCustomer}
                      </p>
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaRobot className="text-blue-400" />
                      პერსონალობა
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">ტონი:</span>
                        <span className="text-white capitalize">{selectedRequest.personality.tone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">პასუხის სიგრძე:</span>
                        <span className="text-white capitalize">{selectedRequest.personality.responseLength}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ემოჯი:</span>
                        <span className="text-white">{selectedRequest.personality.useEmojis ? '✅ დიახ' : '❌ არა'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ენა:</span>
                        <span className="text-white capitalize">{selectedRequest.audience.primaryLanguage}</span>
                      </div>
                    </div>
                    {selectedRequest.personality.greetingBehavior && (
                      <div className="bg-slate-800/50 p-4 rounded-lg mt-3">
                        <p className="text-slate-400 text-xs mb-1">საგამარჯობო ქცევა:</p>
                        <p className="text-slate-300 text-sm">{selectedRequest.personality.greetingBehavior}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Products/Services */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaBriefcase className="text-blue-400" />
                      პროდუქტები / სერვისები
                    </h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg max-h-60 overflow-y-auto">
                      <p className="text-slate-300 text-sm whitespace-pre-wrap">
                        {selectedRequest.content.productsServices}
                      </p>
                    </div>
                  </div>

                  {/* FAQs - ყველაზე მნიშვნელოვანი! */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaFileAlt className="text-blue-400" />
                      FAQ-ები ({selectedRequest.content.faqs.filter(f => f.question && f.answer).length})
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {selectedRequest.content.faqs
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
                    </div>
                  </div>

                  {/* Important Links */}
                      {selectedRequest.content.importantLinks.some(l => l.label && l.url) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaGlobe className="text-blue-400" />
                        მნიშვნელოვანი ლინკები
                      </h3>
                      <div className="space-y-2 bg-slate-800/50 p-4 rounded-lg">
                        {selectedRequest.content.importantLinks
                          .filter(link => link.label && link.url)
                          .map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-400 hover:underline text-sm"
                            >
                              🔗 {link.label}
                            </a>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Example Questions */}
                  {selectedRequest.content.exampleQuestions.some(q => q) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaBullseye className="text-blue-400" />
                        მაგალითი კითხვები
                      </h3>
                      <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
                        {selectedRequest.content.exampleQuestions
                          .filter(q => q)
                          .map((question, index) => (
                            <div key={index} className="text-slate-300 text-sm">
                              • {question}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Platforms */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaCog className="text-blue-400" />
                      პლატფორმები
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.technical.platforms.map(platform => (
                        <span
                          key={platform}
                          className="px-3 py-2 bg-purple-500/20 text-purple-400 text-sm rounded-lg flex items-center gap-2"
                        >
                          <span className="text-lg">
                            {CHATBOT_PLATFORMS.find(p => p.value === platform)?.icon}
                          </span>
                          {CHATBOT_PLATFORMS.find(p => p.value === platform)?.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Integrations */}
                  {selectedRequest.technical.integrations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaCog className="text-blue-400" />
                        ინტეგრაციები
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.technical.integrations.map(integration => (
                          <span
                            key={integration}
                            className="px-3 py-1.5 bg-slate-700 text-slate-300 text-sm rounded-full"
                          >
                            {CHATBOT_INTEGRATIONS.find(i => i.value === integration)?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Branding */}
                  {selectedRequest.branding && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaPalette className="text-blue-400" />
                        ბრენდინგი
                      </h3>
                      <div className="bg-slate-800/50 p-4 rounded-lg space-y-3">
                        {selectedRequest.branding.colors && (
                          <div className="flex gap-4">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">ძირითადი ფერი</p>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-10 h-10 rounded border-2 border-slate-600"
                                  style={{ backgroundColor: selectedRequest.branding.colors.primary }}
                                />
                                <span className="text-sm text-slate-300">
                                  {selectedRequest.branding.colors.primary}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">მეორადი ფერი</p>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-10 h-10 rounded border-2 border-slate-600"
                                  style={{ backgroundColor: selectedRequest.branding.colors.secondary }}
                                />
                                <span className="text-sm text-slate-300">
                                  {selectedRequest.branding.colors.secondary}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedRequest.branding.visualPreferences && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">ვიზუალური პრეფერენსები</p>
                            <p className="text-sm text-slate-300">{selectedRequest.branding.visualPreferences}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {selectedRequest.additionalNotes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaFileAlt className="text-blue-400" />
                        დამატებითი შენიშვნები
                      </h3>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <p className="text-slate-300 text-sm whitespace-pre-wrap">
                          {selectedRequest.additionalNotes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submission Date */}
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
Chatbot Request - ${req.companyInfo.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Contact: ${req.companyInfo.email}
📞 Phone: ${req.companyInfo.phone}
🏢 Industry: ${INDUSTRIES.find(i => i.value === req.companyInfo.industry)?.label}

🎯 Goals: ${req.audience.mainGoals.map(g => CHATBOT_GOALS.find(goal => goal.value === g)?.label).join(', ')}

🤖 Personality:
- Tone: ${req.personality.tone}
- Length: ${req.personality.responseLength}
- Emojis: ${req.personality.useEmojis ? 'Yes' : 'No'}

📱 Platforms: ${req.technical.platforms.join(', ')}

📋 FAQs: ${req.content.faqs.length} total
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