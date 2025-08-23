"use client"

import { Shield, Building, Lock, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TestPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [formData, setFormData] = useState({
    organizationName: '',
    password: '',
    confirmPassword: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

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

    // Validation for sign up
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const endpoint = isSignIn ? '/api/organizations/signin' : '/api/organizations'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationName: formData.organizationName,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(isSignIn ? 'Sign in successful!' : 'Organization created successfully!')
        setFormData({ organizationName: '', password: '', confirmPassword: '' })
        
        // Store organization data and redirect to dashboard
        if (data.organization) {
          localStorage.setItem('organization', JSON.stringify(data.organization))
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        }
      } else {
        setMessage(data.error || `Failed to ${isSignIn ? 'sign in' : 'create organization'}`)
      }
    } catch (error) {
      setMessage(`Error ${isSignIn ? 'signing in' : 'creating organization'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignIn(!isSignIn)
    setMessage('')
    setFormData({ organizationName: '', password: '', confirmPassword: '' })
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
            <Link href="/">
              <button className="text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-12">
        <div className="bg-muted rounded-lg shadow-lg p-8 w-full max-w-md border border-border">
          <div className="text-center mb-8">
            <Building className="w-12 h-12 text-white mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {isSignIn ? 'Sign In to BSC Portal' : 'Join Blockchain Network'}
            </h1>
            <p className="text-gray-300">
              {isSignIn 
                ? 'Access your organization\'s blockchain certificate portal' 
                : 'Register your organization to start minting certificates on BSC'
              }
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-black rounded-lg p-1 border border-border">
            <button
              type="button"
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${
                isSignIn 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${
                !isSignIn 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Organization Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Enter organization name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {!isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-black text-white focus:ring-2 focus:ring-white focus:border-white"
                    placeholder="Confirm password"
                    required={!isSignIn}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-gray-100 disabled:opacity-50 font-medium py-2 px-4 rounded-lg transition duration-200 border border-border"
            >
              {isLoading 
                ? (isSignIn ? 'Connecting to BSC...' : 'Registering on Blockchain...') 
                : (isSignIn ? 'Connect to Blockchain' : 'Join BSC Network')
              }
            </button>
          </form>

          {message && (
            <div className={`mt-4 text-center text-sm ${
              message.includes('successful') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </div>
          )}

          {/* Switch Mode Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isSignIn 
                ? "Don't have an account? Create one" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
