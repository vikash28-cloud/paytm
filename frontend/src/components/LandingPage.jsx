import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from './SignUp'

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <PhoneIcon className="h-6 w-6" />
          <span className="sr-only">Paytm Wallet</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Seamless Digital Payments</h1>
        <p className="text-lg md:text-xl max-w-[600px] text-center">
          Experience the convenience of secure and instant digital payments with Paytm Wallet.
        </p>
        <Link to={"/signup"}
          href="/signup"
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#00bfa5] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#00a28e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Get Paytm Wallet
        </Link>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">&copy; 2024 Paytm Wallet. Created by Vikash Sharma.</p>
      </footer>
    </div>
  )
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default LandingPage