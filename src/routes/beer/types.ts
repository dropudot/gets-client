export type Beer = {
  beer_id: number
  name: string
  untappd_style: string
  category: string
  subcategory: string
  style: string | null
  brewery: string
  abv: number
  description: string | null
  img_url: string | null
  last_review: string
  location: string
}

export type FilterBeer = {
  location: string
  category: string
  subcategory: string
  style: string | null
}
