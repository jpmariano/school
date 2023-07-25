'use client'
 
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ReactNode } from 'react'

export interface providerProps {
    children?: ReactNode;
}
export const Providers: React.FC<providerProps> = ({children}) =>  (
    <Provider store={store}>{children}</Provider>
)