import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'

// Define the clerkPubKey variable
// const clerkPubKey =  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <ClerkProvider publishableKey={clerkPubKey}> */}
    <App />
    {/* </ClerkProvider> */}
  </StrictMode>,
)
