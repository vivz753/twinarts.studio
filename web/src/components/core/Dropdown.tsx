import { DownCaretIcon } from "@src/components/icons/CaretIcons"
import useComponentVisible from "@src/hooks/useComponentVisible"
import clsx from "clsx"
import { FC, KeyboardEvent } from "react"

export interface Option {
  title: string
  value: string
}
export interface DropdownProps {
  className?: string
  options: Option[]
  setOption?: (option: Option) => void | Promise<any>
  currentOption: Option
  outline?: boolean
  border?: boolean
  caretStyle?: "withCircle" | "default"
}

export const Dropdown: FC<React.PropsWithChildren<DropdownProps>> = ({
  className,
  options,
  setOption,
  currentOption,
  outline = true,
  border = true,
  caretStyle = "default",
}) => {
  const [ref, showOptions, setShowOptions] = useComponentVisible(false)

  const handleOptionSelection = (option: Option): void => {
    if (option.value !== currentOption.value && setOption) setOption(option)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === " " || e.key === "Enter") {
      // Prevents accidental collapsing when toggling buttons within the component
      if (e.target === e.currentTarget) {
        e.preventDefault()
        toggleOptions()
      }
    }
  }

  const toggleOptions = (): void => setShowOptions((show) => !show)

  return (
    <button
      ref={ref}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      onClick={toggleOptions}
      className={clsx(
        "relative flex w-full min-w-fit items-center rounded-md bg-yellow-700 p-2",
        border && "border border-yellow-500",
        outline && "focus:outline focus:outline-white",
      )}
    >
      <div className={clsx(className, "flex w-full flex-row items-center gap-2")}>
        <span className="font-medium whitespace-nowrap text-white select-none">{currentOption.title}</span>
        {caretStyle === "withCircle" ? (
          <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
            <DownCaretIcon className={clsx(showOptions && "rotate-180", "h-2 w-2 fill-white")} />
          </span>
        ) : (
          <DownCaretIcon className={clsx(showOptions && "rotate-180", "ml-auto h-4 w-4 fill-white")} />
        )}
      </div>
      {showOptions && (
        <div
          className={clsx(
            "absolute bottom-[-4px] left-0 z-[1] w-full min-w-min translate-y-full flex-col rounded-t-md rounded-b-md bg-yellow-700 p-1",
          )}
        >
          {options.map((option, i) => (
            <div
              className="group w-full min-w-max cursor-pointer text-white select-none"
              key={i}
              onClick={() => handleOptionSelection(option)}
            >
              <span className="flex rounded-sm p-2 hover:bg-yellow-600">{option.title}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

export const dominantColorOptions: Option[] = [
  { title: "All", value: "all" },
  { title: "Red Dominant", value: "redDominant" },
  { title: "Yellow Dominant", value: "yellowDominant" },
  { title: "Blue Dominant", value: "blueDominant" },
  { title: "Monochrome", value: "monochrome" },
  { title: "Cold Palette", value: "coldPalette" },
  { title: "Warm Palette", value: "warmPalette" },
]
export const genreOptions: Option[] = [
  { title: "All", value: "all" },
  { title: "Portrait", value: "portrait" },
  { title: "Landscape", value: "landscape" },
  { title: "Still Life", value: "stillLife" },
  { title: "Genre Scene", value: "genreScene" },
  { title: "Wildlife", value: "wildlife" },
  { title: "Floral/Botanical", value: "floralBotanical" },
  { title: "Figurative", value: "figurative" },
]
export const sizeOptions: Option[] = [
  { title: "All", value: "any" },
  { title: "Small", value: "small" },
  { title: "Medium", value: "medium" },
  { title: "Large", value: "large" },
]
export const priceOptions: Option[] = [
  { title: "All", value: "all" },
  { title: "Low to High", value: "ascending" },
  { title: "High to Low", value: "descending" },
]
export const artistOptions: Option[] = [
  { title: "All", value: "all" },
  { title: "Gina Lin", value: "ginaLin" },
  { title: "Shue Snyder", value: "shueSnyder" },
]
export const availabilityOptions: Option[] = [
  { title: "All", value: "all" },
  { title: "Available", value: "available" },
  { title: "Not For Sale", value: "notForSale" },
  { title: "Sold", value: "sold" },
  { title: "Private Collection", value: "privateCollection" },
]
