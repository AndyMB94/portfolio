import { STARS_BOX_SHADOW, STAR_FIELD_SIZE } from '@/lib/stars'

export function Starfield() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
      <div className="starfield-layer absolute inset-0">
        <div
          className="absolute top-0 left-0 size-px rounded-full bg-transparent"
          style={{ boxShadow: STARS_BOX_SHADOW }}
        />
        <div
          className="absolute left-0 size-px rounded-full bg-transparent"
          style={{ top: STAR_FIELD_SIZE, boxShadow: STARS_BOX_SHADOW }}
        />
      </div>
    </div>
  )
}
