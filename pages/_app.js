import Layout from '../components/Layout';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
    return (
        // <Provider session={pageProps.session}>
            <Layout >
                <Component style={{ marginTop: '15' }} {...pageProps} />
            </Layout>
        /* </Provider> */
    );
}

export default MyApp;
