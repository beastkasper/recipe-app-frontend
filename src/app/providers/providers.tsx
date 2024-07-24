import React from 'react'
import {Provider} from 'react-redux'
import {store} from "../store"
interface IProviders {
    readonly children: React.ReactNode
}

export const Providers: React.FC<IProviders> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}