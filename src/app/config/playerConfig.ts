import type { TPlayerConfig } from "../../features/player/provider"

export const PlayerConfig: TPlayerConfig = {
  Player: {
    width: 480,
    height: 320,
  },
  Rotate: {
    defaultX: 0,
    defaultY: Math.PI * -1
  },
  Zoom: {
    defaultValue: 120,
    min: 10,
    max: 120,
    step: 10,
  },
  Timeline: {
    defaultDay: "0001-01-01"
  },
}