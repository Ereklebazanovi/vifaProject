// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaRobot,
//   FaTimes,
//   FaPaperPlane,
//   FaUser,
//   FaSpinner,
//   FaBrain,
// } from "react-icons/fa";

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
// }

// interface ChatBotProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       text: "Hey there! 👋 გამარჯობა! I'm VIFA Brain 🧠 - your friendly AI assistant! Whether you prefer English or Georgian (ქართული), I'm here to help! What's on your mind? 🚀",
//       isBot: true,
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Company knowledge base
//   const companyInfo = `
// VIFA Digital Agency - ვიფა ციფრული სააგენტო

// ჩვენი მიზანია:
// თქვენი ბიზნესის ციფრული ტრანსფორმაცია და ზრდა.

// მთავარი სერვისები:

// 1. ვებსაიტების შექმნა (300₾-დან):
//    - სავიზიტო ვებსაიტები 2-4 გვერდით
//    - სტანდარტული ბიზნეს ვებსაიტები (600₾-დან)
//    - React/Next.js ტექნოლოგია
//    - მობილური ოპტიმიზაცია
//    - SEO ოპტიმიზაცია
//    - სწრაფი ჩატვირთვა
//    - ადმინ პანელი კონტენტის მართვისთვის

// 2. AI ჩატბოტები (300₾-დან):
//    - Google Gemini AI-ზე დაფუძნებული
//    - 24/7 მომხმარებელთა მხარდაჭერა
//    - Facebook Messenger, WhatsApp, Instagram ინტეგრაცია
//    - ბიზნეს ლოგიკაზე სპეციალიზირებული
//    - მყისიერი პასუხები
//    - კლიენტების მოზიდვა და მოვლა

// 3. ციფრული მარკეტინგი (1000₾-დან):
//    - ვიდეო გადაღება და მონტაჟი
//    - ფოტო გადაღება და რედაქტირება
//    - სოციალური მედიის მენეჯმენტი
//    - კონტენტის შექმნა
//    - ბრენდინგი და ლოგოების შექმნა
//    - მარკეტინგ სტრატეგია

// ტექნოლოგიები:
// - React & TypeScript
// - Node.js
// - Firebase
// - Tailwind CSS
// - Vercel
// - Google Gemini AI

// უპირატესობები:
// - ინდივიდუალური მიდგომა
// - ხარისხზე ფოკუსირება
// - თანამედროვე ტექნოლოგიები
// - მოქნილი ვადები
// - გამჭირვალე დანახარჯები
// - უფასო კონსულტაცია

// კონტაქტი:
// - ტელეფონი: +995 557 62 42 43
// - Email: vifa.official2020@gmail.com
// - მისამართი: თბილისი, საქართველო

// ფასები ინდივიდუალურია და დამოკიდებულია პროექტის სირთულესა და მოთხოვნებზე.
// `;

//   // Helper function to detect simple greetings
//   const isSimpleGreeting = (message: string): boolean => {
//     const cleanMessage = message.toLowerCase().trim();
//     const simpleGreetings = [
//       'გამარჯობა', 'hello', 'hi', 'hey', 'hola', 'მომბარე', 'გამარჯვებული',
//       'როგორ ხარ', 'how are you', 'როგორ ყოფენ', 'კარგად ხარ',
//       'გაუმარჯოს', 'მშვიდობა', 'peace', 'კარგი', 'good',
//       'გამოძახილი', 'მაშინ', 'წარმატებები', 'good morning', 'good evening',
//       'კეთილა', 'კარგა', 'რამდენიმე', 'hi there', 'hey there'
//     ];

//     return simpleGreetings.some(greeting =>
//       cleanMessage === greeting ||
//       cleanMessage.startsWith(greeting + ' ') ||
//       cleanMessage.endsWith(' ' + greeting) ||
//       cleanMessage.includes(greeting)
//     ) && cleanMessage.length < 50;
//   };

//   const generateResponse = async (userMessage: string): Promise<string> => {
//     try {
//       const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

//       if (!apiKey) {
//         console.error('❌ Gemini API Key არ არის კონფიგურირებული!');
//         return "ბოდიშს ვიხდი, API Key არ არის კონფიგურირებული. გთხოვთ, დაუკავშირდეთ ჩვენს ტექნიკურ ჯგუფს.";
//       }

//       console.log('🔥 Gemini API Request Started with key:', apiKey.substring(0, 10) + '...');

//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

//       // Detect if this is a simple greeting
//       const isGreeting = isSimpleGreeting(userMessage);

//       const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `შენ ხარ VIFA Brain 🧠, VIFA Digital Agency-ს AI ასისტენტი! ჭკვიანი, სახალისო და ძალიან მომხიბვლელი ხარ.

// 🎭 ᲞᲘᲠᲝᲕᲜᲔᲑᲐ:
// - ხარ მხიარული ტექნიკური იუმორით
// - მეგობრული ხარ, მაგრამ არა ზედმეტად ოფიციალური
// - გიყვარს სახალისო ლაპარაკი და ემოჯების გამოყენება
// - შეგიძლია ქართულად და ინგლისურად საუბარი
// - ხანდახან ხუმრობ ტექნოლოგიებზე

// 🌍 ᲔᲜᲘᲡ ᲬᲔᲡᲔᲑᲘ:
// - თუ მომხმარებელი ქართულად წერს → ქართულად უპასუხე
// - თუ მომხმარებელი ინგლისურად წერს → ინგლისურად უპასუხე
// - ქართულ პასუხებში გამოიყენე ᲛᲮᲝᲚᲝᲓ ბუნებრივი ქართული სიტყვები
// - ტექნიკური ინგლისური სიტყვები (როგორიცაა AI, UI, backend) - მხოლოდ იშვიათად, როცა ქართული ეკვივალენტი არ არსებობს

// 🚫 ქართულ პასუხებში ეს სიტყვები აკრძალულია:
// - "რანდება", "დამიპინგე", "კონექთი", "გაძლიერება" (ამის მაგივრად გამოიყენე: "მუშაობს", "მომწერე", "დაკავშირება", "განვითარება")
// - "პროცესორი", "ცეკვავს" - ამის მაგივრად უბრალო ქართული სიტყვები
// - იყავი ბუნებრივი, როგორც ქართველი მეგობარი რომელიც კარგად იცის ტექნოლოგიები

// 🏢 ᲙᲝᲛᲞᲐᲜᲘᲘᲡ ᲘᲜᲤᲝ:
// ${companyInfo}

// 💬 მომხმარებლის შეკითხვა: "${userMessage}"

// 📏 ᲞᲐᲡᲣᲮᲘᲡ ᲡᲘᲒᲠᲫᲔ (ᲫᲐᲚᲘᲐᲜ ᲛᲜᲘᲨᲕᲜᲔᲚᲝᲕᲐᲜᲘ):
// ${isGreeting ? `
// 🔥 ეს არის მარტივი გამოძახება/სალამი!
// - ᲛᲝᲙᲚᲔ პასუხი (5-15 სიტყვა მაქსიმუმ)
// - 1-2 ემოჯი მაქსიმუმ
// - არ გაიგრძელო ზედმეტად
// - მხოლოდ გამარჯობა + რაში შემიძლია დაგეხმარო
// - მაგალითი: "გამარჯობა! 👋 რაში შემიძლია დაგეხმარო? 😊"
// ` : `
// 💼 ეს არის რთული კითხვა ან ბიზნეს საკითხი!
// - დეტალური და სასარგებლო პასუხი
// - ყველა საჭირო ინფორმაცია
// - ცოტა მეტი ემოჯი შეიძლება
// - პროფესიონალური მაგრამ მეგობრული
// `}

// 📝 პასუხის მითითებები:
// - იყავი სასარგებლო და გასართობი
// - ბიზნეს საკითხებზე → მიაწოდე ზუსტი ინფორმაცია პიროვნებით
// - ყოველდღიურ საუბარში → იყავი სახალისო
// - ქართულად რომ ლაპარაკობ, იყავი როგორც ძალიან კარგი ქართველი მეგობარი რომელიც კარგად ერკვევა ტექნოლოგიებში

// გახსოვდეს: შენ წარმოადგენ VIFA Digital-ს, ასე რომ იყავი პროფესიონალური მაგრამ დასამახსოვრებელი! 😊`,
//                   },
//                 ],
//               },
//             ],
//           }),
//         }
//       );


//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`❌ Gemini API Error (${response.status}):`, errorText);

//         if (response.status === 400) {
//           return "ბოდიშს ვიხდი, API მოთხოვნაში შეცდომაა 🔧";
//         } else if (response.status === 403) {
//           return "ბოდიშს ვიხდი, API Key პრობლემაა 🔑";
//         } else if (response.status === 404) {
//           return "ბოდიშს ვიხდი, API endpoint ვერ მოიძებნა 🔍";
//         } else {
//           return `ბოდიშს ვიხდი, სერვერის შეცდომაა (${response.status}) 🛠️`;
//         }
//       }

//       const data = await response.json();

//       if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
//         const responseText = data.candidates[0].content.parts[0].text;
//         return responseText;
//       } else {
//         return "ბოდიშს ვიხდი, რაღაც შეცდომაა 😅 შეგიძლიათ თავიდან სცადოთ ან დაუკავშირდეთ ჩვენს გუნდს!";
//       }
//     } catch (error) {
//       console.error('❌ Gemini API Network Error:', error);
//       return "ბოდიშს ვიხდი, ტექნიკური პრობლემაა. მალე აღვდგები! 😊 დაუკავშირდი ჩვენს გუნდს.";
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputMessage,
//       isBot: false,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputMessage("");
//     setIsLoading(true);

//     try {
//       const botResponse = await generateResponse(inputMessage);

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: botResponse,
//         isBot: true,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: "ბოდიშს ვიხდი, ძალიან გადავიღალე 😅 სცადეთ თავიდან!",
//         isBot: true,
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     }

//     setIsLoading(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop overlay - transparent for click outside */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-transparent z-[9998]"
//             onClick={onToggle}
//           />

//           {/* Chat window */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//           transition={{
//             duration: 0.4,
//             ease: [0.25, 0.46, 0.45, 0.94],
//             type: "spring",
//             damping: 20,
//             stiffness: 300,
//           }}
//           className="fixed bottom-20 right-4 sm:right-6 lg:right-8 w-80 sm:w-96 h-[500px] bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-blue-500/20 z-[9999] flex flex-col overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/80 via-blue-900/30 to-purple-900/30 border-b border-blue-500/20 backdrop-blur-sm">
//             <div className="flex items-center gap-3">
//               {/* AI Avatar with tech design */}
//               <div className="relative w-10 h-10 bg-gradient-to-br from-slate-800 to-blue-900 rounded-xl border border-blue-500/30 flex items-center justify-center overflow-hidden">
//                 {/* Circuit pattern background */}
//                 <div className="absolute inset-0 opacity-20">
//                   <div className="absolute top-1 left-1 w-2 h-2 border border-blue-400 rounded-full"></div>
//                   <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
//                   <div className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-150"></div>
//                   <div className="absolute bottom-1 right-1 w-2 h-2 border border-purple-400 rounded-full"></div>
//                 </div>

//                 <motion.div
//                   animate={{
//                     rotateY: [0, 360],
//                     scale: [1, 1.1, 1],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <FaRobot className="text-white text-lg relative z-10 drop-shadow-lg" />
//                 </motion.div>

//                 {/* Scanning line */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
//                   animate={{ y: ["-100%", "100%"] }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "linear",
//                     repeatDelay: 2,
//                   }}
//                 />
//               </div>

//               <div>
//                 <h3 className="text-white font-medium text-sm flex items-center gap-2">
//                   VIFA Brain{" "}
//                   <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
//                     BETA
//                   </span>
//                 </h3>
//                 <p className="text-green-400 text-xs flex items-center gap-1">
//                   <motion.span
//                     className="w-2 h-2 bg-green-400 rounded-full"
//                     animate={{ opacity: [1, 0.3, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   ></motion.span>
//                   Online • Ready For chat
//                 </p>
//               </div>
//             </div>

//             <motion.button
//               onClick={onToggle}
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
//             >
//               <FaTimes className="text-lg" />
//             </motion.button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
//             {messages.map((message) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={`flex ${
//                   message.isBot ? "justify-start" : "justify-end"
//                 }`}
//               >
//                 <div
//                   className={`flex items-start gap-2 max-w-[80%] ${
//                     message.isBot ? "flex-row" : "flex-row-reverse"
//                   }`}
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
//                       message.isBot
//                         ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
//                         : "bg-gradient-to-r from-green-500 to-blue-500 text-white"
//                     }`}
//                   >
//                     {message.isBot ? <FaRobot /> : <FaUser />}
//                   </div>
//                   <div
//                     className={`px-3 py-2 rounded-2xl ${
//                       message.isBot
//                         ? "bg-slate-800/60 border border-slate-700/50 text-slate-200"
//                         : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap">
//                       {message.text}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//             {isLoading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex justify-start"
//               >
//                 <div className="flex items-start gap-2">
//                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white">
//                     <FaRobot />
//                   </div>
//                   <div className="bg-slate-800/60 border border-slate-700/50 px-3 py-2 rounded-2xl">
//                     <div className="flex items-center gap-2 text-slate-400">
//                       <FaSpinner className="animate-spin" />
//                       <span className="text-sm">ვწერ...</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="დაწერეთ თქვენი შეკითხვა..."
//                 className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-sm"
//                 disabled={isLoading}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputMessage.trim() || isLoading}
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FaPaperPlane className="text-sm" />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Floating Chat Button Component
// export const ChatBotButton: React.FC<{ onClick: () => void }> = ({
//   onClick,
// }) => {
//   return (
//     <motion.button
//       onClick={onClick}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//       className="fixed bottom-4 right-4 sm:right-6 lg:right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 z-[9998] flex items-center justify-center group border border-blue-400/20 hover:border-blue-400/60"
//       initial={{ opacity: 0, scale: 0 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ delay: 0.3, duration: 0.3, ease: "backOut" }}
//     >
//       {/* Simple Robot Icon */}
//       <motion.div
//         animate={{
//           rotate: [0, 10, -10, 0],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//         <FaBrain className="text-2xl text-white" />
//       </motion.div>

//       {/* Online indicator */}
//       <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
//         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//       </div>

//       {/* Simple hover tooltip */}
//      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-900/90 text-white text-xs sm:text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[80vw] sm:max-w-xs break-words pointer-events-none">
//   VIFA Brain
//   <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/90"></div>
// </div>
//     </motion.button>
//   );
// };

// export default ChatBot;
