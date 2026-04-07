import type {
  WeatherData,
  CalendarEvent,
  HomeDevice,
  MediaTrack,
  QuickAction,
  NoteItem,
  FeaturedItem,
} from '@/lib/dashboardTypes'

/** Mock values for Windsor, ON — replace with a weather API later. */
export const mockWeather: WeatherData = {
  locationLabel: 'Windsor, ON',
  temperature: 6,
  condition: 'Partly cloudy',
  high: 9,
  low: 1,
  humidity: 62,
  wind: 22,
  windUnit: 'km/h',
  icon: 'cloud-sun',
}

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    time: '9:00 AM',
    duration: '30 min',
    color: '#38bdf8',
  },
  {
    id: '2',
    title: 'Design Review',
    time: '11:00 AM',
    duration: '1 hr',
    color: '#a78bfa',
  },
  {
    id: '3',
    title: 'Lunch with Kristina',
    time: '12:30 PM',
    duration: '1 hr',
    color: '#34d399',
  },
  {
    id: '4',
    title: 'Project Planning',
    time: '3:00 PM',
    duration: '45 min',
    color: '#fb923c',
  },
]

export const mockDevices: HomeDevice[] = [
  {
    id: '1',
    name: 'Living Room',
    status: 'On · 80%',
    icon: 'lightbulb',
    active: true,
  },
  {
    id: '2',
    name: 'Thermostat',
    status: '72°F · Cooling',
    icon: 'thermometer',
    active: true,
  },
  {
    id: '3',
    name: 'Front Door',
    status: 'Locked',
    icon: 'lock',
    active: true,
  },
  {
    id: '4',
    name: 'Security',
    status: 'Armed · Home',
    icon: 'shield',
    active: true,
  },
  {
    id: '5',
    name: 'Garage',
    status: 'Closed',
    icon: 'warehouse',
    active: false,
  },
]

export const mockMedia: MediaTrack = {
  title: 'Weightless',
  artist: 'Marconi Union',
  album: 'Ambient Transmissions',
  progress: 142,
  duration: 480,
  isPlaying: true,
}

export const mockQuickActions: QuickAction[] = [
  { id: '1', label: 'Calendar', icon: 'calendar', color: '#38bdf8' },
  { id: '2', label: 'Music', icon: 'music', color: '#34d399' },
  { id: '3', label: 'Photos', icon: 'image', color: '#a78bfa' },
  { id: '4', label: 'News', icon: 'newspaper', color: '#fb923c' },
  { id: '5', label: 'Maps', icon: 'map-pin', color: '#f472b6' },
  { id: '6', label: 'Settings', icon: 'settings', color: '#94a3b8' },
]

export const mockNotes: NoteItem[] = [
  {
    id: '1',
    text: 'Pick up groceries on the way home',
    completed: false,
    priority: 'high',
  },
  {
    id: '2',
    text: 'Call electrician about patio lights',
    completed: false,
    priority: 'medium',
  },
  {
    id: '3',
    text: 'Water the garden beds',
    completed: true,
    priority: 'low',
  },
  {
    id: '4',
    text: 'Schedule HVAC maintenance',
    completed: false,
    priority: 'medium',
  },
]

export const mockFeatured: FeaturedItem[] = [
  {
    id: '1',
    title: 'Good Evening',
    subtitle: 'Ambient Mode Active',
    description:
      'Your home is secure and comfortable. All systems running smoothly.',
    gradient: 'from-sky-900/40 to-indigo-900/40',
    icon: 'moon',
  },
  {
    id: '2',
    title: 'Energy Report',
    subtitle: "This Week's Usage",
    description:
      'Energy consumption is down 12% compared to last week. Great job!',
    gradient: 'from-emerald-900/40 to-teal-900/40',
    icon: 'zap',
  },
  {
    id: '3',
    title: 'Weekend Forecast',
    subtitle: 'Perfect for Outdoors',
    description:
      'Saturday and Sunday will be sunny with temperatures in the mid-70s.',
    gradient: 'from-amber-900/40 to-orange-900/40',
    icon: 'sun',
  },
]
