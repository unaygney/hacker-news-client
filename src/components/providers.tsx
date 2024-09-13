'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'

const queryClient = new QueryClient()

type NavbarContextType = {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
      <NavbarContext.Provider value={{ isActive, setIsActive }}>
        {children}
      </NavbarContext.Provider>
    </QueryClientProvider>
  )
}

const useNavbar = () => {
  const context = useContext(NavbarContext)

  if (!context) {
    throw new Error('There is no comment context provider.')
  }

  return context
}
export { Providers, useNavbar }
