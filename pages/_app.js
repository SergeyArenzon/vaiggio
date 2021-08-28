import React from 'react';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import { Provider } from 'next-auth/client';
import PropTypes from 'prop-types';


function MyApp({ Component, pageProps }) {
    MyApp.propTypes = {
        Component: PropTypes.object.isRequired,
        pageProps: PropTypes.object.isRequired,
      };

    return (
        <Provider session={pageProps.session}>
            <Layout >
                <Component {...pageProps} />
            </Layout>
        </Provider> 
    );
}

export default MyApp;
