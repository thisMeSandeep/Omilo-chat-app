import Features from "../components/Features"
import GetStarted from "../components/GetStarted"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <GetStarted />
    </main>
  )
}

export default Home