import { ArtWork } from "@schemas/global"

export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export const filterBySearch = (products: ArtWork[], input: string) => {
  if (!input) return products

  const filteredProducts = products.filter((product) => {
    return (
      product.title
        .toLowerCase()
        .trim()
        .split(" ")
        .findIndex((token) => token.startsWith(input.toLowerCase()) || input.toLowerCase().includes(token)) !== -1 || // second condition for inputs w 1 token + a space
      product.title.toLowerCase().includes(input.toLowerCase()) || // for inputs w/ multiple tokens + spaces
      (product.tags &&
        product.tags?.findIndex(
          (tag) => tag.toLowerCase().startsWith(input.toLowerCase()) || input.toLowerCase().includes(tag),
        ) !== -1) ||
      (product.genre &&
        product.genre?.findIndex(
          (genre) =>
            genre.toLowerCase().startsWith(input.toLowerCase()) ||
            input.toLowerCase().startsWith(genre.toLowerCase()) ||
            input.toLowerCase().includes(genre) ||
            genre.toLowerCase().includes(input),
        ) !== -1)
      // input.toLowerCase().includes(product.artist.toLowerCase()) ||
      // product.artist.toLowerCase().startsWith(input.toLowerCase()) ||
      // input.toLowerCase().includes(product.category?.toLowerCase() || "") ||
      // product.category?.toLowerCase().startsWith(input.toLowerCase())
    )
  })

  console.log("filterByName", filteredProducts)

  return filteredProducts
}

// export const filterByDimension = (products: ArtWork[], input: { title: string; value: string }) => {
//   if (input.value === "all") return products

//   return products.filter((product) => product.dimensions.toLowerCase() === input.value.toLowerCase())
// }


export const filterByAvailability = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products

  const filtered = products.filter((product) => {
    return product.availability === input.value // IMPORTANT: do not use toLowerCase() for input.value
  })
  return filtered
}

export const filterByGenre = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => {
    return product.genre?.includes(input.value)
  })
}

export const filterByDominantColor = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => product.dominantColor?.toLowerCase() === input.value.toLowerCase())
}

export const filterByArtist = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => product.artist?.toLowerCase() === input.value.toLowerCase())
}

export const sortByPrice = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products

  const priceableStatuses = ["available", "reserved", "sold"]

  const priceableProducts = products.filter((product) =>
    priceableStatuses.includes(product.availability),
  )

  const otherProducts = products.filter(
    (product) => !priceableStatuses.includes(product.availability),
  )

  if (input.value === "ascending") {
    return [...priceableProducts].sort((a, b) => a.price - b.price).concat(otherProducts)
  } else if (input.value === "descending") {
    return [...priceableProducts].sort((a, b) => b.price - a.price).concat(otherProducts)
  }

  return products
}

export const filterBySize = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products

  const filtered = products.filter((product) => {
    const longestSide = Math.max(product.width, product.height)

    if (input.value === "large" && longestSide > 30) return true
    if (input.value === "medium" && longestSide > 16 && longestSide <= 30) return true
    if (input.value === "small" && longestSide > 0 && longestSide <= 16) return true

    return false 
  })

  return filtered
}

export const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

