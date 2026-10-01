import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Introducing } from './sections/Introducing'
import { Explorer } from './sections/Explorer'
import { Problem, HowItWorks, Features, Privacy, Comparison, Prototype, Architecture, Story, Team, Progress, Contact, Footer } from './sections/Homepage'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Problem />
        <Introducing />
        <HowItWorks />
        <Features />
        <Explorer />
        <Privacy />
        <Comparison />
        <Prototype />
        <Architecture />
        <Story />
        <Team />
        <Progress />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
