import { ReactNode } from "react"

export enum Medium {
  // TRADITIONAL
  OIL = "oil",
  PASTEL = "pastel",
  GOUACHE = "gouache",
  CHARCOAL = "charcoal",
  PENCIL = "pencil",
  MARKER = "marker",
  ACRYLIC = "acrylic",
  // DIGITAL
  TWOD = "2d",
  THREED = "3d",
}

// Deprecated
export interface Art {
  title: string
  imageUrl: string
  medium: Medium
  content?: ReactNode
}

export interface ArtWork {
  title: string
  imageUrl: string // originally image but queried as imageUrl
  artist: "ginaLin" | "shueSnyder"
  hidden: boolean
  description: string
  width: number
  height: number
  availability: "available" | "privateCollection" | "sold" | "notForSale"
  featured: boolean
  price: number
  framed: boolean
  medium: string[] // "charcoal" | "oil" | "acrylic" | "watercolor"
  support: "canvas" | "paper" | "board" | "linen" | "panel"
  genre: string[]
  subject: string[]
  style: string[] // "traditional" | "impressionism" | "expressionism" | "abstract"
  orientation: "portrait" | "landscape" | "square" | "round/oval"
  dominantColor: "warmPalette" | "coldPalette" | "yellowDominant" | "redDominant" | "blueDominant" | "monochrome"
  date: string // YYYY-MM-DD
  tags: string[]
  id: string

  content?: ReactNode // TODO: implement into Sanity schema
}
