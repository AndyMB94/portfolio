import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <section
          id="proyectos"
          className="flex min-h-screen scroll-mt-20 items-center justify-center"
        >
          <p className="text-foreground">Proyectos (placeholder)</p>
        </section>
        <section
          id="contacto"
          className="flex min-h-screen scroll-mt-20 items-center justify-center"
        >
          <p className="text-foreground">Contacto (placeholder)</p>
        </section>
      </main>
    </>
  )
}

export default App
