import { Locations } from './enums'

export let location: Locations = Locations.shroom

export const API_URL = import.meta.env.VITE_API_URL
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL

export function changeLocation(value: Locations) {
  location = value
}
