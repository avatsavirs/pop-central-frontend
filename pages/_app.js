import {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {Hydrate} from 'react-query/hydration';
import GlobalStyles from 'styled-components/GlobalStyles';

function MyApp({Component, pageProps}) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
