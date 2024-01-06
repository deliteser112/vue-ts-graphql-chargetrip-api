import { gql } from '@urql/vue'

export const VEHICLE_LIST_QUERY = gql`
  query ($page: Int!, $size: Int!) {
    vehicleList(page: $page, size: $size) {
      id
      naming {
        make
        model
        version
      }
      media {
        image {
          thumbnail_url
        }
        brand {
          thumbnail_url
        }
      }
    }
  }
`

export const VEHICLE_QUERY = `
query vehicle($id: ID!) {
  vehicle(id: $id) {
    id
    naming {
      make
      model
      chargetrip_version
    }
    media {
      image {
        url
      }
      brand {
        thumbnail_url
      }
    }
    battery {
      usable_kwh
    }
    range {
      best {
        highway
        city
        combined
      }
      worst {
        highway
        city
        combined
      }
      chargetrip_range {
        best
        worst
      }
    }
    routing {
      fast_charging_support
    }
    connectors {
      standard
    }
    performance {
      acceleration
      top_speed
    }
  }
}
`
