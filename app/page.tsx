import { Shield, CheckCircle, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-semibold text-black">TruePaper</span>
            </div>
            <Link href="/test">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                Test
              </button>
            </Link>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Blockchain Certificates</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Issue tamper-proof digital certificates that can be verified instantly, anywhere in the world.
          </p>
          <div className="space-x-4">
            <Link href="/test">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200">
                Test
              </button>
            </Link>
            <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why TruePaper?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Shield className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Secure</h3>
              <p className="text-gray-700">Certificates stored on blockchain cannot be altered or forged</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Instant</h3>
              <p className="text-gray-700">Verify any certificate in seconds with our verification system</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Global</h3>
              <p className="text-gray-700">Access and verify certificates from anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="border border-gray-300 rounded-lg p-8 text-center bg-white">
              <h3 className="text-xl font-semibold mb-2 text-black">Starter</h3>
              <div className="text-3xl font-bold mb-4 text-black">
                $29<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">100 certificates/month</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Basic verification</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <Link href="/test">
                <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition duration-200">
                  Test
                </button>
              </Link>
            </div>

            <div className="border-2 border-primary-600 rounded-lg p-8 text-center bg-white">
              <h3 className="text-xl font-semibold mb-2 text-black">Professional</h3>
              <div className="text-3xl font-bold mb-4 text-black">
                $99<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">1,000 certificates/month</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Custom verification portal</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Priority support</span>
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
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-primary-100 mb-8">Start issuing secure certificates today</p>
          <Link href="/test">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition duration-200">
              Test
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
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
