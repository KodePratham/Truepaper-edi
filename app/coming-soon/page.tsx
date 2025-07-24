"use client"

import { Shield, Clock, ArrowLeft, Rocket, Wrench, Calendar } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
  const features = [
    {
      title: 'Certificate Issuance',
      description: 'Create and issue blockchain-verified certificates',
      icon: Shield,
      eta: 'Q2 2024'
    },
    {
      title: 'Template Management',
      description: 'Design custom certificate templates',
      icon: Wrench,
      eta: 'Q2 2024'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track certificate performance and verification stats',
      icon: Calendar,
      eta: 'Q3 2024'
    },
    {
      title: 'Advanced Features',
      description: 'Bulk operations, API access, and integrations',
      icon: Rocket,
      eta: 'Q3 2024'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-semibold text-black">TruePaper</span>
            </Link>
            <Link href="/dashboard">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium py-2 px-4 transition duration-200">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <Clock className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Coming Soon</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you powerful certificate management features. 
            Stay tuned for updates!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                    ETA: {feature.eta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Be the first to know when new features are released.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-black">TruePaper</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-700">
              <Link href="#" className="hover:text-black">
                Privacy
              </Link>
              <Link href="#" className="hover:text-black">
                Terms
              </Link>
              <Link href="#" className="hover:text-black">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
