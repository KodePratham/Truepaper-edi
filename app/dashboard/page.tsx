"use client"

import { Shield, Building, Users, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [certificates, setCertificates] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: '',
    certificateUrl: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Get organization data from localStorage or session
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      setOrganization(JSON.parse(orgData))
    }
    
    // Load certificates
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      const response = await fetch('/api/certificates')
      if (response.ok) {
        const data = await response.json()
        setCertificates(data)
      }
    } catch (error) {
      console.error('Error loading certificates:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          organizationId: organization?.id,
          organizationName: organization?.organization_name
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Certificate issued successfully!')
        setFormData({ name: '', certificateUrl: '' })
        setShowForm(false)
        loadCertificates()
      } else {
        setMessage(data.error || 'Failed to issue certificate')
      }
    } catch (error) {
      setMessage('Error issuing certificate')
    } finally {
      setIsLoading(false)
    }
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
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">
                  {organization?.organization_name || 'Organization'}
                </span>
              </div>
              <Link href="/verify" className="text-sm text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                Verify Certificate
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('organization')
                  window.location.href = '/'
                }}
                className="text-sm text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Blockchain Certificate Dashboard
          </h1>
          <p className="text-gray-300">
            Issue and manage your organization's certificates on Binance Smart Chain.
          </p>
        </div>

        {/* Issue Certificate Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-black font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center space-x-2 border border-border hover:bg-gray-100"
          >
            <Plus className="w-5 h-5" />
            <span>Issue Certificate</span>
          </button>
        </div>

        {/* Certificate Form */}
        {showForm && (
          <div className="bg-muted rounded-lg shadow-sm border border-border p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Mint New Blockchain Certificate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Enter recipient name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Certificate URL
                </label>
                <input
                  type="url"
                  name="certificateUrl"
                  value={formData.certificateUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Enter certificate URL"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 font-medium py-2 px-4 rounded-lg transition duration-200 border border-border"
                >
                  {isLoading ? 'Minting on BSC...' : 'Mint Certificate'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-black hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition duration-200 border border-border"
                >
                  Cancel
                </button>
              </div>
            </form>
            {message && (
              <div className={`mt-4 text-sm ${
                message.includes('successful') ? 'text-green-400' : 'text-red-400'
              }`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* Certificates Table */}
        <div className="bg-muted rounded-lg shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Blockchain Certificates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Certificate ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Recipient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-border">
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500">No certificates issued yet</p>
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert) => (
                    <tr key={cert.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">
                        {cert.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {cert.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {cert.organization_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {new Date(cert.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <a
                          href={cert.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-gray-300"
                        >
                          View Certificate
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
