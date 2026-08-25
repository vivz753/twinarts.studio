import Image from "next/image"
import { ArtWork } from "@schemas/global"
import { availabilityOptions } from "@components/core/Dropdown"

const convertPrice = (price: number) => `$${String(price / 100)}`

interface CardProps {
  onClick: () => void
  artWork: ArtWork
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ onClick, artWork }) => {
  const a = artWork
  const availabilityTitle = availabilityOptions.find((o) => {
    if (a.availability === o.value) return o
  })?.title

  return (
    <li onClick={onClick} className="flex cursor-pointer flex-col rounded-md bg-yellow-600 text-white" key={a.id}>
      <span className="max-w-[380px] p-4 text-center text-lg font-semibold wrap-break-word">{a.title}</span>
      {a.imageUrl && (
        <div className="relative h-[380px] w-[380px] shrink-0 overflow-hidden bg-yellow-600">
          <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
        </div>
      )}
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            {a.artist && <span>{a.artist === "shueSnyder" ? "Shue Snyder" : "Gina Lin"}</span>}
            {a.medium && a.medium.length && <span className="capitalize">{a.medium.join(", ")}</span>}
          </div>
          <div className="flex flex-col gap-1">
            {a.width && a.height && (
              <span>
                {a.width}x{a.height} in.
              </span>
            )}
            {/* {a.tags && a.tags.length && <span>Tags: {a.tags.join(", ")}</span>} */}
            {a.availability !== "notForSale" && a.price > 0 && (
              <span>
                {convertPrice(a.price)} {a.framed ? "(framed)" : "(unframed)"}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between">
          {a.date && <span>{a.date}</span>}
          {a.availability && availabilityTitle && <span>{availabilityTitle}</span>}
        </div>
      </div>
    </li>
  )
}
