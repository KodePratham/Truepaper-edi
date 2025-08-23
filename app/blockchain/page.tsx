"use client"

import { Shield, ArrowLeft, Zap, Globe, Lock, Code, Coins, Users } from "lucide-react"
import Link from "next/link"

export default function BlockchainPage() {
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
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white font-medium py-2 px-4 transition duration-200">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">⛓</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Built on Binance Smart Chain</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            TruePaper leverages the power of Binance Smart Chain to provide fast, secure, and cost-effective certificate management with full blockchain transparency.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How TruePaper Works on BSC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-muted rounded-lg border border-border p-6">
              <div className="bg-white p-3 rounded-lg w-fit mb-4">
                <Code className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Smart Contract Deploy</h3>
              <p className="text-gray-300 text-sm">
                TruePaperAccess contract deployed on BSC mainnet handles access control and certificate minting permissions.
              </p>
            </div>
            <div className="bg-muted rounded-lg border border-border p-6">
              <div className="bg-white p-3 rounded-lg w-fit mb-4">
                <Coins className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Pay Access Fee</h3>
              <p className="text-gray-300 text-sm">
                Organizations pay BNB to purchase access rights, recorded permanently on the blockchain.
              </p>
            </div>
            <div className="bg-muted rounded-lg border border-border p-6">
              <div className="bg-white p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Mint Certificates</h3>
              <p className="text-gray-300 text-sm">
                Each certificate is minted as a unique blockchain transaction with cryptographic hash verification.
              </p>
            </div>
            <div className="bg-muted rounded-lg border border-border p-6">
              <div className="bg-white p-3 rounded-lg w-fit mb-4">
                <Globe className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Global Verification</h3>
              <p className="text-gray-300 text-sm">
                Anyone can verify certificate authenticity by checking the blockchain transaction and smart contract state.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Architecture</h2>
          <div className="bg-muted rounded-lg border border-border p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Smart Contract Features
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Access control with BNB payment verification</li>
                  <li>• Certificate minting with unique transaction hashes</li>
                  <li>• Immutable storage of certificate metadata</li>
                  <li>• Owner-controlled fee adjustment mechanisms</li>
                  <li>• Batch certificate operations for efficiency</li>
                  <li>• Event logging for transparency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  BSC Advantages
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Low transaction fees (~$0.05 per certificate)</li>
                  <li>• Fast confirmation times (3-5 seconds)</li>
                  <li>• EVM compatibility for easy development</li>
                  <li>• High throughput (2000+ TPS capability)</li>
                  <li>• Strong ecosystem and wallet support</li>
                  <li>• Cross-chain bridging capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contract Details */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Smart Contract Integration</h2>
          <div className="bg-black border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">TruePaperAccess Contract Functions</h3>
            <div className="space-y-4 text-sm font-mono">
              <div className="bg-muted p-4 rounded border border-border">
                <span className="text-green-400">function</span> <span className="text-blue-400">purchaseAccess</span>() <span className="text-gray-400">external payable</span>
                <div className="text-gray-300 mt-1">// Pay BNB to gain certificate minting access</div>
              </div>
              <div className="bg-muted p-4 rounded border border-border">
                <span className="text-green-400">function</span> <span className="text-blue-400">hasAccess</span>(address user) <span className="text-gray-400">external view returns (bool)</span>
                <div className="text-gray-300 mt-1">// Check if organization has minting permissions</div>
              </div>
              <div className="bg-muted p-4 rounded border border-border">
                <span className="text-green-400">function</span> <span className="text-blue-400">setAccessFee</span>(uint256 newFee) <span className="text-gray-400">external onlyOwner</span>
                <div className="text-gray-300 mt-1">// Owner can adjust access fee for market conditions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Blockchain for Certificates?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tamper-Proof</h3>
              <p className="text-gray-300">Once written to the blockchain, certificate data cannot be altered or deleted by anyone.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-gray-300">Verify certificates instantly from anywhere in the world using blockchain explorers.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralized Trust</h3>
              <p className="text-gray-300">No central authority needed - the blockchain network validates all transactions.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-muted rounded-lg border border-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Issue Blockchain Certificates?</h2>
          <p className="text-gray-300 mb-6">
            Connect your MetaMask wallet and start issuing verifiable certificates on Binance Smart Chain today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test">
              <button className="bg-white text-black font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-100 border border-border">
                Start Issuing Certificates
              </button>
            </Link>
            <Link href="/verify">
              <button className="bg-black text-white font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-gray-900 border border-border">
                Verify a Certificate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
