import Layout from 'components/Layout';
import {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {Hydrate} from 'react-query/hydration';
import FontImports from 'styled-components/FontImports';
import GlobalStyles from 'styled-components/GlobalStyles'
import {Provider as AuthProvider} from 'next-auth/client'

function MyApp({Component, pageProps}) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false
        }
      }
    });
  }
  return (
    <AuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydrateState}>
          <Layout>
            <GlobalStyles />
            <FontImports />
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
