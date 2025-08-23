"use client"

import { Shield, Search, CheckCircle, XCircle, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState('')
  const [certificate, setCertificate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificateId.trim()) return

    setIsLoading(true)
    setError('')
    setCertificate(null)
    setSearched(true)

    try {
      const response = await fetch(`/api/certificates/verify?id=${encodeURIComponent(certificateId)}`)
      const data = await response.json()

      if (response.ok) {
        setCertificate(data.certificate)
      } else {
        setError(data.error || 'Certificate not found')
      }
    } catch (error) {
      setError('Error verifying certificate')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCertificateId('')
    setCertificate(null)
    setError('')
    setSearched(false)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="bg-black border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-xl font-semibold tracking-tight">TruePaper</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/test" className="text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                Organization Portal
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-full">
                <Search className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Verify Certificate</h1>
            <p className="text-xl text-gray-300">
              Enter a certificate ID to verify its authenticity and view details.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-muted rounded-lg shadow-sm border border-border p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Certificate ID
                </label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="flex-1 px-4 py-3 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                    placeholder="Enter certificate ID"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center space-x-2 border border-border"
                  >
                    <Search className="w-5 h-5" />
                    <span>{isLoading ? 'Verifying...' : 'Verify'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Results */}
          {searched && (
            <div className="bg-muted rounded-lg shadow-sm border border-border p-8">
              {certificate ? (
                <div>
                  {/* Success Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <h2 className="text-2xl font-bold">Certificate Verified</h2>
                      <p className="text-green-400">This certificate is authentic and valid.</p>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Certificate ID
                        </label>
                        <p className="text-white font-mono text-sm bg-black p-2 rounded border border-border">
                          {certificate.id}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Issue Date
                        </label>
                        <p className="text-white">
                          {new Date(certificate.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Recipient Name
                      </label>
                      <p className="text-white text-lg font-semibold">{certificate.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Issued By
                      </label>
                      <p className="text-white font-semibold">{certificate.organization_name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Certificate Document
                      </label>
                      <a
                        href={certificate.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-white hover:text-gray-300 font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Certificate</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <button
                      onClick={handleReset}
                      className="text-white hover:text-gray-300 font-medium"
                    >
                      Verify Another Certificate
                    </button>
                  </div>
                </div>
              ) : error ? (
                <div>
                  {/* Error Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <XCircle className="w-8 h-8 text-red-400" />
                    <div>
                      <h2 className="text-2xl font-bold">Certificate Not Found</h2>
                      <p className="text-red-400">The certificate ID you entered could not be verified.</p>
                    </div>
                  </div>

                  <div className="bg-black border border-red-400 rounded-lg p-4 mb-6">
                    <p className="text-red-400">{error}</p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-white hover:text-gray-300 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
