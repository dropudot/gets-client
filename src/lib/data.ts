import { Locations } from './enums'

export let location: Locations = Locations.shroom

export function changeLocation(value: Locations) {
  location = value
}
