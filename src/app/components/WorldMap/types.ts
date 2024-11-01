import { GeometryCollection, Objects, Topology } from 'topojson-specification'

export type GeoJsonProperties = Record<string, unknown>

export interface CountryProperties extends GeoJsonProperties {
  name: string
}

export interface WorldObjects extends Objects {
  countries: GeometryCollection<CountryProperties>
  land: GeometryCollection
}

export type WorldData = Topology<WorldObjects>
