import '../styles/globals.css'
import CNavBar from '../ui-component/CNavBar'


function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps}>
          <CNavBar/>
        </Component>
  )
}


export default MyApp
