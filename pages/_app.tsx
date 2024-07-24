import React from "react"
import {AppProps} from 'next/app';
import {Providers} from "../src/app/providers";
import {AppLayout} from "../src/app/layout";
import "../src/app/styles/global.scss"

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Providers>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Providers>
    );
}

export default MyApp;
