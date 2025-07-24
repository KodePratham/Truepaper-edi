import { Shield, CheckCircle, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              <span className="text-lg sm:text-xl font-semibold text-black">TruePaper</span>
            </div>
            <Link href="/test">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition duration-200">
                Test
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
            Blockchain Certificates
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Issue tamper-proof digital certificates that can be verified instantly, anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/test">
              <button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition duration-200">
                Test
              </button>
            </Link>
            <button className="w-full sm:w-auto border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 sm:px-8 rounded-lg transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-black">
            Why TruePaper?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6">
              <Shield className="w-10 h-10 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Secure</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Certificates stored on blockchain cannot be altered or forged
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <Zap className="w-10 h-10 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Instant</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Verify any certificate in seconds with our verification system
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <Globe className="w-10 h-10 sm:w-8 sm:h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Global</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Access and verify certificates from anywhere, anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-black">
            Simple Pricing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
            <div className="border border-gray-300 rounded-lg p-6 sm:p-8 text-center bg-white">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Starter</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-4 text-black">
                $29<span className="text-base sm:text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">100 certificates/month</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Basic verification</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Email support</span>
                </li>
              </ul>
              <Link href="/test">
                <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition duration-200">
                  Test
                </button>
              </Link>
            </div>

            <div className="border-2 border-primary-600 rounded-lg p-6 sm:p-8 text-center bg-white">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Professional</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-4 text-black">
                $99<span className="text-base sm:text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">1,000 certificates/month</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Custom verification portal</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Priority support</span>
                </li>
              </ul>
              <Link href="/test">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                  Test
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-primary-100 mb-6 sm:mb-8 text-sm sm:text-base">
            Start issuing secure certificates today
          </p>
          <Link href="/test">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 sm:px-8 rounded-lg transition duration-200">
              Test
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-black">TruePaper</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 text-sm text-gray-700">
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
