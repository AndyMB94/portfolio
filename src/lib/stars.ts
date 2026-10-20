export const STAR_FIELD_SIZE = 2000

function randomStars(count: number) {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * STAR_FIELD_SIZE)
    const y = Math.floor(Math.random() * STAR_FIELD_SIZE)
    shadows.push(`${x}px ${y}px #fff`)
  }
  return shadows.join(', ')
}

export const STARS_BOX_SHADOW = randomStars(120)
