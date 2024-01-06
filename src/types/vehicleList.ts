interface VehicleMedia {
  brand: { thumbnail_url: string }
  image: { thumbnail_url: string }
}

interface VehicleNaming {
  make: string
  model: string
  version: string
}

export interface Vehicle {
  id: string
  media: VehicleMedia
  naming: VehicleNaming
}
