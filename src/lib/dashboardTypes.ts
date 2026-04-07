export interface WeatherData {
  /** City / region label shown in the widget (e.g. live API would set this). */
  locationLabel: string
  /** Temperature in °C for Canadian locale. */
  temperature: number
  condition: string
  high: number
  low: number
  humidity: number
  /** Wind speed; unit in `windUnit`. */
  wind: number
  windUnit: 'km/h' | 'mph'
  icon: string
}

export interface CalendarEvent {
  id: string
  title: string
  time: string
  duration: string
  color: string
}

export interface HomeDevice {
  id: string
  name: string
  status: string
  icon: string
  active: boolean
}

export interface MediaTrack {
  title: string
  artist: string
  album: string
  progress: number
  duration: number
  isPlaying: boolean
}

export interface QuickAction {
  id: string
  label: string
  icon: string
  color: string
}

export interface NoteItem {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export interface FeaturedItem {
  id: string
  title: string
  subtitle: string
  description: string
  gradient: string
  icon: string
}
