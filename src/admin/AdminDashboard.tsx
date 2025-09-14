import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  FaEye,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
  FaUser,
  FaBuilding,
  FaGlobe,
  FaBullseye,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes
} from 'react-icons/fa';

interface Lead {
  id: string;
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
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'lost';
  submittedAt: Timestamp;
  createdAt: string;
  notes?: string;
  lastContactedAt?: Timestamp;
}

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Real-time leads subscription
  useEffect(() => {
    const q = query(
      collection(db, 'leads'),
      orderBy('submittedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leadsData: Lead[] = [];
      querySnapshot.forEach((doc) => {
        leadsData.push({
          id: doc.id,
          ...doc.data()
        } as Lead);
      });
      setLeads(leadsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter leads based on status, service, and search
  useEffect(() => {
    let filtered = leads;

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Service filter
    if (filterService !== 'all') {
      filtered = filtered.filter(lead => 
        lead.services.includes(filterService)
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  }, [leads, filterStatus, filterService, searchTerm]);

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status,
        lastContactedAt: status === 'contacted' ? Timestamp.now() : undefined
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('შეცდომა მოხდა სტატუსის განახლებისას');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'in-progress': return 'bg-purple-500';
      case 'converted': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'ახალი';
      case 'contacted': return 'დაკავშირებული';
      case 'in-progress': return 'მუშაობაში';
      case 'converted': return 'გადაკეთებული';
      case 'lost': return 'დაკარგული';
      default: return status;
    }
  };

  const getServiceText = (service: string) => {
    switch (service) {
      case 'website': return 'ვებსაიტი';
      case 'content': return 'კონტენტი';
      case 'social': return 'სოც. მედია';
      case 'ads': return 'რეკლამა';
      default: return service;
    }
  };

  const exportToCSV = () => {
    const headers = ['სახელი', 'კომპანია', 'ემაილი', 'ტელეფონი', 'სერვისები', 'ბიუჯეტი', 'სტატუსი', 'თარიღი'];
    const csvData = filteredLeads.map(lead => [
      lead.name,
      lead.businessName,
      lead.email,
      lead.phone,
      lead.services.map(getServiceText).join(', '),
      lead.budget,
      getStatusText(lead.status),
      new Date(lead.submittedAt.toDate()).toLocaleDateString('ka-GE')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
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
            <h1 className="text-3xl font-bold mb-2">Lead Management</h1>
            <p className="text-slate-400">მართეთ შემოსული შეკვეთები</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'ახალი Lead-ები', 
              value: leads.filter(l => l.status === 'new').length,
              icon: <FaExclamationTriangle />,
              color: 'bg-blue-500'
            },
            { 
              title: 'დაკავშირებული', 
              value: leads.filter(l => l.status === 'contacted').length,
              icon: <FaPhone />,
              color: 'bg-yellow-500'
            },
            { 
              title: 'გადაკეთებული', 
              value: leads.filter(l => l.status === 'converted').length,
              icon: <FaCheckCircle />,
              color: 'bg-green-500'
            },
            { 
              title: 'სულ Lead-ები', 
              value: leads.length,
              icon: <FaUser />,
              color: 'bg-purple-500'
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ძებნა</label>
              <input
                type="text"
                placeholder="სახელი, კომპანია, ემაილი..."
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
                <option value="new">ახალი</option>
                <option value="contacted">დაკავშირებული</option>
                <option value="in-progress">მუშაობაში</option>
                <option value="converted">გადაკეთებული</option>
                <option value="lost">დაკარგული</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">სერვისი</label>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="all">ყველა</option>
                <option value="website">ვებსაიტი</option>
                <option value="content">კონტენტი</option>
                <option value="social">სოც. მედია</option>
                <option value="ads">რეკლამა</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterService('all');
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                ფილტრების გასუფთავება
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">კლიენტი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">სერვისები</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">ბიუჯეტი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">სტატუსი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">თარიღი</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">მოქმედებები</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-slate-400">{lead.businessName}</div>
                        <div className="text-sm text-slate-400">{lead.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                          >
                            {getServiceText(service)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{lead.budget}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(lead.status)} border-none outline-none`}
                      >
                        <option value="new">ახალი</option>
                        <option value="contacted">დაკავშირებული</option>
                        <option value="in-progress">მუშაობაში</option>
                        <option value="converted">გადაკეთებული</option>
                        <option value="lost">დაკარგული</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(lead.submittedAt.toDate()).toLocaleDateString('ka-GE')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="დეტალები"
                        >
                          <FaEye />
                        </button>
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                          title="ემაილი"
                        >
                          <FaEnvelope />
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                            title="ზარი"
                          >
                            <FaPhone />
                          </a>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">მონაცემები არ მოიძებნა</div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedLead.name}</h2>
                <p className="text-slate-400">{selectedLead.businessName}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-400" />
                    საკონტაქტო ინფორმაცია
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-slate-400" />
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-400 hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                    {selectedLead.phone && (
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-slate-400" />
                        <a href={`tel:${selectedLead.phone}`} className="text-blue-400 hover:underline">
                          {selectedLead.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-slate-400" />
                      <span>{selectedLead.businessName}</span>
                    </div>
                    {selectedLead.currentWebsite && (
                      <div className="flex items-center gap-3">
                        <FaGlobe className="text-slate-400" />
                        <a 
                          href={selectedLead.currentWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {selectedLead.currentWebsite}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaBriefcase className="text-blue-400" />
                    პროექტის დეტალები
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-slate-400">სერვისები:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedLead.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full"
                          >
                            {getServiceText(service)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">ბიუჯეტი:</span>
                      <div className="mt-1">{selectedLead.budget}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">ბიზნესის ტიპი:</span>
                      <div className="mt-1">{selectedLead.businessType}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaBullseye className="text-blue-400" />
                    მიზნები
                  </h3>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-slate-300">{selectedLead.goals || 'არ არის მითითებული'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaClock className="text-blue-400" />
                    ვადები
                  </h3>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-slate-300">{selectedLead.timeline || 'არ არის მითითებული'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" />
                    ინფორმაცია
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">შეკვეთის თარიღი:</span>
                      <span>{new Date(selectedLead.submittedAt.toDate()).toLocaleString('ka-GE')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">სტატუსი:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedLead.status)}`}>
                        {getStatusText(selectedLead.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">სასურველი კომუნიკაცია:</span>
                      <span>{selectedLead.preferredContact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;