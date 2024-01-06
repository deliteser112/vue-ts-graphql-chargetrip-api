export interface VehicleDetail {
  range?: {
    chargetrip_range: {
      worst: string
      best: string
    }
    best: {
      city: string
      highway: string
      combined: string
    }
    worst: {
      city: string
      highway: string
      combined: string
    }
  }
  battery: {
    usable_kwh: string
  }
  routing: {
    fast_charging_support: boolean
  }
  connectors: {
    standard: string
  }[]
  performance?: {
    top_speed: number
    acceleration: number
  }
}
