import { useState, useEffect, useMemo } from 'react'
import { WINDSOR_LOCATION_LABEL, WINDSOR_TIMEZONE } from '@/lib/constants'

export function useClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const { displayHours, displayMinutes, period, dateString } = useMemo(() => {
    const timeParts = new Intl.DateTimeFormat('en-US', {
      timeZone: WINDSOR_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).formatToParts(time)

    const hour = timeParts.find((p) => p.type === 'hour')?.value ?? '12'
    const minute = timeParts.find((p) => p.type === 'minute')?.value ?? '00'
    const dayPeriod = timeParts.find((p) => p.type === 'dayPeriod')?.value ?? ''
    const period = /^p/i.test(dayPeriod) ? 'PM' : 'AM'

    const dateString = new Intl.DateTimeFormat('en-CA', {
      timeZone: WINDSOR_TIMEZONE,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(time)

    return {
      displayHours: hour,
      displayMinutes: minute,
      period,
      dateString,
    }
  }, [time])

  return {
    time,
    displayHours,
    displayMinutes,
    period,
    dateString,
    locationLabel: WINDSOR_LOCATION_LABEL,
  }
}
