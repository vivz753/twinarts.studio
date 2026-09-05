import { loadArtWork } from "@sanity/loadArtWork"
import { ArtWork } from "@schemas/global"
import { availabilityOptions, artistOptions,  genreOptions, sizeOptions, priceOptions } from "@src/components/core/Dropdown"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useMemo, useState } from "react"
import Modal from "@/src/components/core/Modal"
import { SearchFilterBar } from "@src/components/core/SearchFilterBar"
import { Card } from "@/src/components/core/Card"
import {
  filterByAvailability,
  filterBySearch,
  filterByGenre,
  filterByArtist,
  filterBySize,
  sortByPrice,
} from "@/src/helpers"

const GalleryPage: NextPage<{ artWork: ArtWork[] }> = ({
  artWork,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [searchValue, setSearchValue] = useState("")
  const [artist, setArtist] = useState(artistOptions[0])
  const [genre, setGenre] = useState(genreOptions[0])
  const [availability, setAvailability] = useState(availabilityOptions[0])
  const [size, setSize] = useState(sizeOptions[0])
  const [price, setPrice] = useState(priceOptions[0])
  const [activeWork, setActiveWork] = useState<ArtWork>(artWork[0])
  const [showModal, setShowModal] = useState(false)
  //Shue 1
const clearFilters = () => {
  setSearchValue("")
  setArtist(artistOptions[0])
  setAvailability(availabilityOptions[0])
  setGenre(genreOptions[0])
  setSize(sizeOptions[0])
  setPrice(priceOptions[0])
}

  //Shue 1 end
    const onNext = (): void => {
    const currIndex = artWork.findIndex((i) => i === activeWork)
    const nextIndex = currIndex < artWork.length - 1 ? currIndex + 1 : 0
    setActiveWork(() => artWork[nextIndex])
  }
  const onPrev = (): void => {
    const currIndex = artWork.findIndex((i) => i === activeWork)
    const prevIndex = currIndex > 0 ? currIndex - 1 : artWork.length - 1
    setActiveWork(() => artWork[prevIndex])
  }

  // TODO: add a debouncer
  // TODO: consider making this async
  const filteredArtwork = useMemo(
  () =>
    sortByPrice(
      filterByGenre(
        filterByAvailability(
          filterBySize(
            filterByArtist(
              filterBySearch(
                artWork.filter((product) => !product.hidden),
                searchValue,
              ),
              artist,
            ),
            size,
          ),
          availability,
        ),
        genre,
      ),
      price,
    ),
  [availability, size, searchValue, artist, genre, price, artWork],
)

  console.log("filteredArtwork", filteredArtwork)
 
  return (
    <div className="flex h-full min-h-screen flex-col items-center pt-[90px] pb-[90px]">
      <SearchFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        availability={availability}
        setAvailability={setAvailability}
        size={size}
        setSize={setSize}
        artist={artist}
        setArtist={setArtist}
        genre={genre}
        setGenre={setGenre}
        genreOptions={genreOptions}
        price={price}
        setPrice={setPrice}
        clearFilters={clearFilters}
      />
      <div className="flex w-screen items-center justify-center gap-12 px-16 py-12">
         <ul className="w-full max-w-[1400px] columns-1 gap-8 md:columns-2 lg:columns-3 xl:columns-4">   
          {filteredArtwork && filteredArtwork.length > 0 ? (
            filteredArtwork.map((a) => (
              <Card
                key={a.id}
                onClick={() => {
                  setActiveWork(a)
                  setShowModal(true)
                }}
                artWork={a}
              />
            ))
          ) : (
            <div>No artworks found.</div>
          )}
        </ul>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        project={activeWork}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}

export default GalleryPage

export const getStaticProps: GetStaticProps<{ artWork: Array<ArtWork> }> = (async () => {
  const artWork = await loadArtWork()

  console.log("getStaticProps artWork:", artWork)
  // Shue 
console.log(
  "ARTWORK PRICES:",
  artWork.map((item: ArtWork) => ({
    title: item.title,
    availability: item.availability,
    price: item.price,
  })),
)

  //
  
  return {
    props: {
      artWork: artWork,
    },
    revalidate: 60, // important to revalidate cached datasets in case updates to Sanity get published
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
}>


