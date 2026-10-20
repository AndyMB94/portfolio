import { GithubIcon, LinkedinIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Andy Mallcco</span>
        <div className="flex items-center gap-4">
          <a href="mailto:andy.94.m.b@gmail.com" className="transition-colors hover:text-foreground">
            andy.94.m.b@gmail.com
          </a>
          <a
            href="https://github.com/AndyMB94"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/andy-ayrton-mallcco-bohorquez/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
