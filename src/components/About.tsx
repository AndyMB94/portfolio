import profileImg from '@/assets/profile.jpg'
import { Starfield } from '@/components/Starfield'

const STACK = [
  'React',
  'TypeScript',
  'Django',
  'PostgreSQL',
  'Redis',
  'Celery',
  'Socket.io',
  'Docker',
  'Deepgram',
  'DeepSeek',
  'ElevenLabs',
]

export function About() {
  return (
    <section
      id="sobre-mi"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-card px-6 py-24"
    >
      <Starfield />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 md:flex-row md:items-start">
        <img
          src={profileImg}
          alt="Andy Mallcco"
          className="size-40 shrink-0 rounded-full border border-border object-cover"
        />

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-medium text-foreground">Sobre mí</h2>

          <div className="flex max-w-xl flex-col gap-4 text-muted-foreground">
            <p>
              Actualmente trabajo en Fiberlux Tech como practicante profesional en el área de
              Innovación y Tecnología, enfocado en backend con Django y con trabajo de web
              scraping para distintos procesos del área. En paralelo, llevo como freelance un
              sistema de gastos, ingresos y rendición de cuentas para otra empresa, armando todo
              de punta a punta: backend en Django, frontend en React + Vite, base de datos en
              MySQL, desplegado en cPanel.
            </p>
            <p>
              Soy egresado de Tecsup y actualmente curso Ingeniería de Sistemas en la UPC. Tengo
              además el certificado Cambridge B2 First (Grado C).
            </p>
            <p>
              Lo que más me gusta es llevar un producto de la idea a producción real, no quedarme
              en el prototipo — y me engancha la velocidad a la que evoluciona la IA, siempre
              tratando de sumar herramientas nuevas a lo que construyo. Fuera del código, disfruto
              cocinar y escuchar música.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
