import Footer from './Footer';
import Nav from './Nav';

export default function Layout({children}) {
  return (
    <>
      <Nav />
      <main css={{
        flexGrow: 1
      }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
