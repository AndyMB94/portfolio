import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Starfield } from '@/components/Starfield'
import { Reveal } from '@/components/Reveal'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center"
    >
      <Starfield />

      <Reveal>
        <div className="relative flex flex-col items-center gap-6">
          <h1 className="font-mono text-5xl font-medium text-foreground md:text-7xl">
            Andy Mallcco
          </h1>
          <p className="font-mono text-lg text-primary md:text-xl">
            Desarrollador Full Stack — integro IA (voz, LLMs) en productos reales, de punta a
            punta
          </p>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            De la idea a producción real, no solo demos. Mi último proyecto, Vacantia, lleva la
            entrevista de trabajo a una conversación de voz en tiempo real, con IA de punta a
            punta.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button render={<a href="#proyectos" />} nativeButton={false}>
              Ver proyectos
            </Button>
            <Button render={<a href="/cv.pdf" download />} variant="outline" nativeButton={false}>
              Descargar CV
            </Button>
          </div>
        </div>
      </Reveal>

      <a
        href="#sobre-mi"
        aria-label="Desplazarse hacia abajo"
        className="absolute bottom-8 animate-bounce text-muted-foreground transition-colors hover:text-foreground motion-reduce:animate-none"
      >
        <ChevronDown className="size-6" />
      </a>
    </section>
  )
}
