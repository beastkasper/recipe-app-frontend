import { AppType } from 'next/app';
import { Providers } from "../src/app/providers";
import { AppLayout } from "../src/app/layout";
import "../src/app/styles/global.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <Providers>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Providers>
    );
}

export default MyApp;
