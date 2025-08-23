import { Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="border-b border-border bg-black">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-xl font-semibold tracking-tight">TruePaper</span>
            </div>
            <Link href="/test">
              <button className="bg-white text-black font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-100 border border-border">
                Organization Portal
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Blockchain Certificates Made Simple
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto font-light">
            Issue tamper-proof digital certificates and verify authenticity instantly.
          </p>
          <Link href="/verify">
            <button className="bg-white text-black font-medium py-3 px-8 rounded-lg transition duration-200 hover:bg-gray-100 border border-border">
              Verify Certificate
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
      