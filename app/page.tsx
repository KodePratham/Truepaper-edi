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
            <div className="flex items-center space-x-4">
              <Link href="/blockchain" className="text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                Blockchain Info
              </Link>
              <Link href="/test">
                <button className="bg-white text-black font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-100 border border-border">
                  Organization Portal
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Decentralized Certificates on BSC
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Issue immutable digital certificates on Binance Smart Chain. Each certificate is cryptographically secured and permanently stored on the blockchain for instant global verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/verify">
              <button className="bg-white text-black font-medium py-3 px-8 rounded-lg transition duration-200 hover:bg-gray-100 border border-border">
                Verify on Blockchain
              </button>
            </Link>
            <Link href="/blockchain">
              <button className="bg-black text-white font-medium py-3 px-8 rounded-lg transition duration-200 hover:bg-gray-900 border border-border">
                Learn About BSC
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Immutable Records</h3>
              <p className="text-gray-300">Certificates stored permanently on BSC blockchain, tamper-proof and verifiable forever.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⛓</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Contract Powered</h3>
              <p className="text-gray-300">Each certificate is minted as a unique token with cryptographic proof of authenticity.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🌐</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Verification</h3>
              <p className="text-gray-300">Instant verification anywhere in the world using blockchain technology and web3 integration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
