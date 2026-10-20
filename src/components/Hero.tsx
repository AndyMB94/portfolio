import { Button } from '@/components/ui/button'
import { Starfield } from '@/components/Starfield'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center"
    >
      <Starfield />

      <h1 className="relative font-mono text-5xl font-medium text-foreground md:text-7xl">
        Andy Mallcco
      </h1>
      <p className="relative font-mono text-lg text-primary md:text-xl">
        Desarrollador Full Stack — integro IA (voz, LLMs) en productos reales, de punta a punta
      </p>
      <p className="relative max-w-2xl text-base text-muted-foreground md:text-lg">
        De la idea a producción real, no solo demos. Mi último proyecto, Vacantia, lleva la
        entrevista de trabajo a una conversación de voz en tiempo real, con IA de punta a punta.
      </p>
      <div className="relative flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button render={<a href="#proyectos" />} nativeButton={false}>
          Ver proyectos
        </Button>
        <Button render={<a href="/cv.pdf" download />} variant="outline" nativeButton={false}>
          Descargar CV
        </Button>
      </div>
    </section>
  )
}
