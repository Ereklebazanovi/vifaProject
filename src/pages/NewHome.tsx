"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import SEO from "../components/SEO"

const NewHome: React.FC = () => {
  const [activeClient, setActiveClient] = useState<number>(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Client companies data
  const clients = [
    {
      id: "client1",
      name: "TechCorp",
      category: "ტექნოლოგია",
      description: "ვებსაიტი და ციფრული მარკეტინგი",
      color: "blue"
    },
    {
      id: "client2",
      name: "RestaurantChain",
      category: "კვება",
      description: "სოციალური მედია მართვა",
      color: "green"
    },
    {
      id: "client3",
      name: "HealthCare",
      category: "მედიცინა",
      description: "სრული ციფრული მარკეტინგი",
      color: "red"
    },
    {
      id: "client4",
      name: "ECommerce",
      category: "ვაჭრობა",
      description: "ვებ განვითარება და რეკლამა",
      color: "purple"
    },
    {
      id: "client5",
      name: "Education",
      category: "განათლება",
      description: "ბრენდინგი და მარკეტინგი",
      color: "orange"
    },
    {
      id: "client6",
      name: "Fashion",
      category: "მოდა",
      description: "სოციალური მედია და კონტენტი",
      color: "pink"
    }
  ]

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      red: "border-red-400 bg-red-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      orange: "border-orange-400 bg-orange-500/10",
      pink: "border-pink-400 bg-pink-500/10"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <>
      <SEO
        title="მთავარი - Vifa Digital"
        description="ციფრული მარკეტინგის სააგენტო - ვქმნით კომუნიკაციის ხიდს ბრენდსა და მომხარებელს შორის"
      />

      {/* Video Background - Full Page Coverage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{
                filter: `brightness(0.4) contrast(1.2) saturate(1.1)`,
              }}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
            >
              <source src="/advertising-hero-video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Fallback gradient background */}
          {(videoError || !videoLoaded) && (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          )}

          <div className="absolute inset-0 bg-slate-950/30" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-8 py-20">

          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-3 py-1 rounded">
                   გააციფრულე ბიზნესი
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                  კომუნიკაციის <span className="text-blue-400">ხიდი</span><br/>
                  ბრენდსა და <span className="text-slate-300">მომხარებლის</span> შორის
                </h1>

                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  ვქმნით ციფრული მარკეტინგის სტრატეგიებს, რომლებიც აერთებს ბრენდებს მათ აუდიტორიასთან
                </p>

                <div className="flex gap-4">
                  <Link
                    to="/start-project"
                    className="bg-blue-500 text-white px-6 py-3 font-medium hover:bg-blue-600 transition-colors"
                  >
                    პროექტის დაწყება
                  </Link>
                  <Link
                    to="/about"
                    className="border border-white/20 text-white px-6 py-3 font-medium hover:bg-white/5 transition-colors"
                  >
                    ჩვენ შესახებ
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/5">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-blue-400 rounded mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      </div>
                      <div className="text-blue-400 text-sm font-medium">ბრენდი</div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-full w-16 h-px bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2"></div>
                  </div>

                  {/* Target Audience Circle */}
                  <div className="absolute top-1/2 -right-8 w-32 h-32 border border-green-400/30 rounded-full flex items-center justify-center bg-green-500/5 transform -translate-y-1/2">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-green-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-green-400 text-xs font-medium">აუდიტორია</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-slate-400 text-sm">
                  ვირტუალური კომუნიკაციის ხიდი
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-400 rounded"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">სტრატეგიული მიდგომა</h3>
              <p className="text-slate-400">თითოეული ბრენდისთვის ინდივიდუალური სტრატეგიის შემუშავება</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-green-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">ციფრული მარკეტინგი</h3>
              <p className="text-slate-400">სრული ციფრული მარკეტინგის გადაწყვეტები ყველა პლატფორმაზე</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-purple-400"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">შედეგზე ორიენტაცია</h3>
              <p className="text-slate-400">განიცდიდი შედეგები და მზარდი ROI თქვენი ბიზნესისთვის</p>
            </div>
          </div>

          {/* Companies Section */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">ჩვენი პარტნიორები</h2>
              <div className="flex justify-center items-center gap-12 text-sm text-slate-400">
                <div><span className="text-2xl font-bold text-blue-400">50+</span> პროექტი</div>
                <div><span className="text-2xl font-bold text-green-400">98%</span> მყარები</div>
                <div><span className="text-2xl font-bold text-purple-400">3+</span> წელი</div>
              </div>
            </div>

            {/* Company Display */}
            <div className="mb-8">
              <div className="border border-slate-600 bg-slate-900/30 p-8 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium text-white">{clients[activeClient].name}</h3>
                    <p className="text-blue-400">{clients[activeClient].category}</p>
                  </div>
                  <div className={`w-16 h-16 border-2 rounded ${getColorClass(clients[activeClient].color)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{clients[activeClient].name.slice(0, 2)}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-lg">{clients[activeClient].description}</p>
              </div>
            </div>

            {/* Company Navigation */}
            <div className="grid grid-cols-6 gap-3">
              {clients.map((client, index) => (
                <button
                  key={client.id}
                  onClick={() => setActiveClient(index)}
                  className={`p-4 border rounded transition-all ${
                    activeClient === index
                      ? `${getColorClass(client.color)} border-opacity-100`
                      : "border-slate-600 bg-slate-900/20 hover:bg-slate-800/30"
                  }`}
                >
                  <div className="text-white font-bold text-sm mb-1">{client.name.slice(0, 2)}</div>
                  <div className="text-xs text-slate-400">{client.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-white mb-6">
                მზადა ხარ დაიწყო თანამშრომლობა?
              </h3>
              <Link
                to="/start-project"
                className="inline-block bg-blue-500 text-white px-10 py-4 text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                დაიწყეთ პროექტი
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewHome