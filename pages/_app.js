import '../styles/globals.css'
import Layout from '../ui-component/Layout.js'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </>
  )
}


export default MyApp
