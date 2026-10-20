import { Button } from '@/components/ui/button'
import { Starfield } from '@/components/Starfield'

const HIGHLIGHTS = [
  'Pipeline de voz completo en tiempo real: React → Socket.io → Django → Celery → Deepgram (STT) → DeepSeek (LLM) → ElevenLabs (TTS) → de vuelta al navegador.',
  'Autenticación híbrida JWT (access en memoria, refresh en cookie httpOnly) con roles reales vía Django Groups.',
  'Seguridad real, no de tutorial: se encontró y cerró un hueco de costo en producción (el gateway aceptaba conexiones sin autenticar y gastaba dinero real en APIs de IA), más rate limiting y permisos por defecto seguros.',
  'Desplegado end-to-end en un VPS propio: Docker Compose, Nginx, Certbot — no solo corriendo en local.',
]

export function Projects() {
  return (
    <section id="proyectos" className="relative scroll-mt-20 overflow-hidden border-t border-border px-6 py-24">
      <Starfield />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-3xl font-medium text-foreground">Proyectos</h2>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_-15px_var(--primary)]">
          <h3 className="font-mono text-2xl text-primary">Vacantia</h3>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Plataforma de reclutamiento con IA: un candidato postula con su CV, un filtro con IA
            evalúa el fit contra el puesto y, si aprueba, pasa a una entrevista de voz real con un
            entrevistador de IA — voz a voz, no un chat de texto.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-1 text-primary">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              render={<a href="https://vacantia.andymallcco.dev/" target="_blank" rel="noreferrer" />}
              nativeButton={false}
            >
              Ver sitio en vivo
            </Button>
            <Button
              render={
                <a href="https://github.com/AndyMB94/interviewer-ai" target="_blank" rel="noreferrer" />
              }
              variant="outline"
              nativeButton={false}
            >
              Ver repo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
