import { Layout } from "./components/Layout"
import { VideoContextProvider } from "./contexts/VideoContext"
import GlobalStyles from "./styles/GlobalStyles"

function App() {
  return (
    <>
      <VideoContextProvider>
        <Layout />
      </VideoContextProvider>
      <GlobalStyles />
    </>
  )
}

export default App
