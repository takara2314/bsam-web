export interface LiveMessage {
  athletes: LocationWithDetail[]
  marks: PositionWithId[]
}

export interface StartRaceMessage {
  started: boolean
  start_at: number
  end_at: number
}

export interface PositionWithId {
  user_id: string
  latitude: number
  longitude: number
}

export interface LocationWithDetail {
  user_id: string
  latitude: number
  longitude: number
  accuracy: number
  heading: number
  heading_fixing: number
  compass_degree: number
  next_mark_no: number
  course_limit: number
}

export interface RacingSocket extends WebSocket {
  onReceiveLiveMsg?: (msg: LiveMessage) => void;
  onReceiveStartRaceMsg?: (msg: StartRaceMessage) => void;
}
