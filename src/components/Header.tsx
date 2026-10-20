import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { href: '#sobre-mi', id: 'sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', id: 'proyectos', label: 'Proyectos' },
  { href: '#contacto', id: 'contacto', label: 'Contacto' },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export function Header() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="font-mono text-lg text-foreground">
          Andy Mallcco
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-sm transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
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
          <Button render={<a href="/cv.pdf" download />} size="sm" nativeButton={false}>
            Descargar CV
          </Button>
        </div>
      </div>
    </header>
  )
}
