import { useEffect, useCallback } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

const DIRECTION_MAP: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

function getCenter(rect: DOMRect) {
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2,
  }
}

function findBestCandidate(
  current: DOMRect,
  candidates: { el: HTMLElement; rect: DOMRect }[],
  direction: Direction,
): HTMLElement | null {
  const filtered = candidates.filter(({ rect }) => {
    switch (direction) {
      case 'up':
        return rect.bottom <= current.top + 5
      case 'down':
        return rect.top >= current.bottom - 5
      case 'left':
        return rect.right <= current.left + 5
      case 'right':
        return rect.left >= current.right - 5
    }
  })

  if (filtered.length === 0) return null

  const origin = getCenter(current)
  const isVertical = direction === 'up' || direction === 'down'

  filtered.sort((a, b) => {
    const ac = getCenter(a.rect)
    const bc = getCenter(b.rect)

    const aDist = isVertical
      ? Math.abs(ac.y - origin.y) + Math.abs(ac.x - origin.x) * 0.4
      : Math.abs(ac.x - origin.x) + Math.abs(ac.y - origin.y) * 0.4
    const bDist = isVertical
      ? Math.abs(bc.y - origin.y) + Math.abs(bc.x - origin.x) * 0.4
      : Math.abs(bc.x - origin.x) + Math.abs(bc.y - origin.y) * 0.4

    return aDist - bDist
  })

  return filtered[0].el
}

export function useTvFocusNavigation() {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const direction = DIRECTION_MAP[e.key]

    if (e.key === 'Enter') {
      const active = document.activeElement as HTMLElement | null
      if (active?.dataset.focusable) {
        active.click()
      }
      return
    }

    if (!direction) return
    e.preventDefault()

    const focusables = Array.from(
      document.querySelectorAll<HTMLElement>('[data-focusable="true"]'),
    )

    if (focusables.length === 0) return

    const current = document.activeElement as HTMLElement | null

    if (!current || !current.dataset.focusable) {
      focusables[0]?.focus()
      return
    }

    const currentRect = current.getBoundingClientRect()
    const candidates = focusables
      .filter((el) => el !== current)
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))

    const next = findBestCandidate(currentRect, candidates, direction)
    if (next) {
      next.focus()
      next.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
