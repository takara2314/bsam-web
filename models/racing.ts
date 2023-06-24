export interface LiveMessage {
  athletes: Athlete[]
  marks: Mark[]
}

export interface StartRaceMessage {
  started: boolean
  start_at: number
  end_at: number
}

export interface Athlete {
  user_id: string
  next_mark_no: number
  course_limit: number
  battery_level: number
  compass_degree: number
  location: Location
}

export interface Mark {
  user_id: string
  mark_no: number
  battery_level: number
  position: Position
}

export interface Position {
  latitude: number
  longitude: number
  accuracy: number
}

export interface Location {
  latitude: number
  longitude: number
  accuracy: number
  heading: number
  heading_fixing: number
}

export interface RacingSocket extends WebSocket {
  onReceiveLiveMsg?: (msg: LiveMessage) => void;
  onReceiveStartRaceMsg?: (msg: StartRaceMessage) => void;
}
