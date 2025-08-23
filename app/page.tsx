import { Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-semibold text-black">TruePaper</span>
            </div>
            <Link href="/test">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                Organization Portal
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Blockchain Certificates Made Simple
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Issue tamper-proof digital certificates and verify authenticity instantly.
          </p>
          <Link href="/verify">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200">
              Verify Certificate
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-black">TruePaper</span>
            </div>
            <div className="flex space-x-4 text-sm text-gray-700">
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
         