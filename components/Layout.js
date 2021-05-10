import Head from 'next/head';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({children}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/p_logo.png" type = "image/x-icon"/>
      </Head>
      <Nav />
      <main css={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
