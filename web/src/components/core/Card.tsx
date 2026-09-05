
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
    <li className="mb-8 inline-flex w-fit break-inside-avoid flex-col text-gray-900">
      <div className="flex w-fit flex-col items-start"></div>
      {a.imageUrl && (
        <img
          alt={a.title}
          src={a.imageUrl}
          onClick={onClick}
          className="h-auto max-h-[320px] w-auto max-w-[340px] object-contain"
  />
)}
<div className="flex max-w-[380px] flex-col gap-1.5 py-2 text-left">

  {/* Title + Artist */}
  <div className="leading-snug">
  <span className="text-base font-medium tracking-tight">{a.title}</span>
  {a.artist && (
    <span className="ml-1.5 text-[15px] font-light italic text-gray-500">
      by {a.artist === "shueSnyder" ? "Shue Snyder" : "Gina Lin"}
    </span>
  )}
</div>

  {/* Medium · Size · Year */}
  <div className="flex flex-wrap items-center gap-x-2 text-sm leading-relaxed text-gray-500">
    {a.medium && a.medium.length > 0 && (
      <span className="capitalize">{a.medium.join(", ")}</span>
    )}

    {a.medium && a.medium.length > 0 && a.width && a.height && (
  <span className="text-gray-400">·</span>
)}

    {a.width && a.height && (
      <span>
        {a.width} × {a.height} in.
      </span>
    )}

    {(a.medium?.length || (a.width && a.height)) && a.date && <span>·</span>}

    {a.date && <span>{String(a.date).slice(0, 4)}</span>}
  </div>

  {/* Price · Availability */}
  {(a.availability || a.price > 0) && (
    <div className="flex flex-wrap items-center gap-x-1.5 text-sm">
      {["available", "reserved"].includes(a.availability) && a.price > 0 && (
        <span className="font-medium">
          {convertPrice(a.price)} {a.framed ? "(framed)" : "(unframed)"}
        </span>
      )}

      {["available", "reserved"].includes(a.availability) &&
        a.price > 0 &&
        availabilityTitle && <span className="text-gray-400">·</span>}

      {a.availability && availabilityTitle && (
        <span className="text-gray-600">{availabilityTitle}</span>
      )}
    </div>
  )}

</div>
      
    </li>
  )
}
