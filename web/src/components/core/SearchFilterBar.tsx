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
}

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
}) => {
  return (
    <div className="group sticky top-0 z-20 flex w-full justify-center bg-yellow-600">
      <div className="bg-p2 z-[1] flex w-full flex-col items-center justify-center gap-2 rounded-md p-4 py-5 text-white lg:flex-row lg:gap-10 lg:px-14">
        {/* <div className="flex w-full flex-col items-start gap-1">
          <span>Item Name</span>
          <Searchbar className="flex w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div> */}
        <div className="flex w-full flex-row justify-between lg:w-auto lg:gap-5">
          {availability && setAvailability && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Availability</span>
              <Dropdown
                setOption={(availability) => setAvailability(availability)}
                options={availabilityOptions}
                currentOption={availability}
              />
            </div>
          )}
          {artist && setArtist && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Artist</span>
              <Dropdown setOption={(artist) => setArtist(artist)} options={artistOptions} currentOption={artist} />
            </div>
          )}
          {genre && setGenre && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Genre</span>
              <Dropdown setOption={(genre) => setGenre(genre)} options={genreOptions} currentOption={genre} />
            </div>
          )}
          {size && setSize && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Size</span>
              <Dropdown setOption={(size) => setSize(size)} options={sizeOptions} currentOption={size} />
            </div>
          )}

          {price && setPrice && (
            <div className="flex flex-col items-start gap-1">
              <span>Price</span>
              <Dropdown setOption={(price) => setPrice(price)} options={priceOptions} currentOption={price} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
