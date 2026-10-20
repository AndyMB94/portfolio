import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { MapPin } from 'lucide-react'

export function Contact() {
  return (
    <section
      id="contacto"
      className="scroll-mt-20 border-t border-border bg-card px-6 py-24 text-center"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="text-3xl font-medium text-foreground">Contacto</h2>
        <p className="text-muted-foreground">
          ¿Tiene una oportunidad o quiere charlar sobre algún proyecto? Escríbame.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button render={<a href="mailto:andy.94.m.b@gmail.com" />} nativeButton={false}>
            Enviar email
          </Button>
          <Button
            render={<a href="https://wa.me/51927939655" target="_blank" rel="noreferrer" />}
            variant="outline"
            nativeButton={false}
          >
            WhatsApp
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <a
            href="https://github.com/AndyMB94"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/andy-ayrton-mallcco-bohorquez/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          <span>Lima, Perú</span>
        </div>
      </div>
    </section>
  )
}
