import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component style={{ marginTop: '15' }} {...pageProps} />
        </Layout>
    );
}

export default MyApp;
