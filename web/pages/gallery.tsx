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
    // TODO: consider swapping order of filters to improve perf
    sortByPrice(
      filterByGenre(
        filterByAvailability(
          filterBySize(filterByArtist(filterBySearch(artWork, searchValue), artist), size),
          availability,
        ),
        genre,
      )?.filter((product) => !product.hidden),
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
      />
      <div className="flex w-screen items-center justify-center gap-12 px-8 py-12">
        <ul className="grid-auto-flow grid place-items-center gap-12 lg:grid-cols-2 xl:grid-cols-3 xl:gap-20">
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

  return {
    props: {
      artWork: artWork,
    },
    revalidate: 60, // important to revalidate cached datasets in case updates to Sanity get published
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
}>


