'use client'
import { Appstore, makeStore } from '@/lib/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({children}:{children:React.ReactNode}) => {
    const storeRef = useRef<Appstore>(undefined)

    if(!storeRef.current){
        storeRef.current = makeStore()
    }
    
    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider