import Layout from 'components/Layout';
import {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {Hydrate} from 'react-query/hydration';
import 'styles/globals.css'

function MyApp({Component, pageProps}) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
