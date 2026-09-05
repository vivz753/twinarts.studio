import {
  Dropdown,
  Option,
  priceOptions,
  sizeOptions,
  artistOptions,
  availabilityOptions,
} from "@src/components/core/Dropdown"
import { Searchbar } from "@src/components/core/Searchbar"

export interface SearchFilterBarProps {
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  availability?: Option
  setAvailability?: React.Dispatch<React.SetStateAction<Option>>
  size?: Option
  setSize?: React.Dispatch<React.SetStateAction<Option>>
  price?: Option
  setPrice?: React.Dispatch<React.SetStateAction<Option>>
  artist: Option
  setArtist: React.Dispatch<React.SetStateAction<Option>>
  genre: Option
  setGenre: React.Dispatch<React.SetStateAction<Option>>
  genreOptions: Option[]
  clearFilters: () => void
}


// Shue 2
export const SearchFilterBar: React.FC<React.PropsWithChildren<SearchFilterBarProps>> = ({
  searchValue,
  setSearchValue,
  availability,
  setAvailability,
  size,
  setSize,
  price,
  setPrice,
  artist,
  setArtist,
  genre,
  setGenre,
  genreOptions,
  clearFilters,
}) => {
  return (
    <div className="flex w-full justify-center bg-white">
      <div className="flex w-full max-w-[1400px] flex-col items-center justify-center gap-2 px-4 py-5 text-gray-900 lg:flex-row lg:gap-10 lg:px-0">
        {/* <div className="flex w-full flex-col items-start gap-1">
          <span>Item Name</span>
          <Searchbar className="flex w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div> */}
        <div className="flex w-full flex-col items-center gap-5">
          {artist && setArtist && (
  <div className="flex items-center gap-5">
    <button
      type="button"
      onClick={() => setArtist(artistOptions[0])}
      className={artist.value === "all" ? "font-medium text-[#CA8A04]" : "text-gray-600"}
    >
      All Artwork
    </button>

    <button
      type="button"
      onClick={() => setArtist(artistOptions[2])}
      className={artist.value === "shueSnyder" ? "font-bold text-[#CA8A04]" : "text-gray-800"}
    >
      Shue's Gallery
    </button>

    <button
      type="button"
      onClick={() => setArtist(artistOptions.find((option) => option.value === "ginaLin")!)}
      className={artist.value === "ginaLin" ? "font-medium text-[#CA8A04]" : "text-gray-800"}
    >
      Gina's Gallery
    </button>
  </div>
)}
<div className="flex flex-wrap items-end justify-center gap-5">

          {availability && setAvailability && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap font-medium text-[#CA8A04]">Availability</span>
              <Dropdown
                setOption={(availability) => setAvailability(availability)}
                options={availabilityOptions}
                currentOption={availability}
              />
            </div>
          )}                    
          {genre && setGenre && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap font-medium text-[#CA8A04]">Genre</span>
              <Dropdown setOption={(genre) => setGenre(genre)} options={genreOptions} currentOption={genre} />
            </div>
          )}
          {size && setSize && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap font-medium text-[#CA8A04]">Size</span>
              <Dropdown setOption={(size) => setSize(size)} options={sizeOptions} currentOption={size} />
            </div>
          )}

          {price && setPrice && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap font-medium text-[#CA8A04]">Price</span>
              <Dropdown setOption={(price) => setPrice(price)} options={priceOptions} currentOption={price} />
            </div>
          )}
        <div className="flex flex-col justify-end">
          <button type="button" 
             onClick={clearFilters} className="whitespace-nowrap font-medium text-[#CA8A04]">
             Clear Filters
          </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
