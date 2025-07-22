export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            True<span className="text-blue-400">Paper</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Secure, transparent, and immutable document verification powered by blockchain technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Upload Document
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300">
              Verify Document
            </button>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Immutable</h3>
            <p className="text-gray-300">Documents stored on blockchain cannot be altered or tampered with</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Transparent</h3>
            <p className="text-gray-300">All verification records are publicly accessible and auditable</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Secure</h3>
            <p className="text-gray-300">Cryptographic hashing ensures document integrity</p>
          </div>
        </div>
      </div>
    </main>
  )
}
