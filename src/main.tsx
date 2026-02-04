
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import AuthNavigator from './context/AuthNavigator'
import { WalletProvider } from './context/WalletContext'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './helpers/queryClient'


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
        <AuthNavigator>
          <Router />
        </AuthNavigator>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
)
