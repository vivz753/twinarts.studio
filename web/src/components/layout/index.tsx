import Link from "next/link"
import { FC } from "react"
import { FaInstagram } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import Image from "next/image"

type NavigationLink = {
  name: string
  url: string
}

const labels: NavigationLink[] = [
  { name: "Gallery", url: "/gallery" },
  { name: "Commissions", url: "/commissions" },
  { name: "About", url: "/about" },
]

const Header: FC = () => {
  return (
    <header className="absolute top-0 z-1 flex h-[90px] w-full flex-row items-center justify-evenly gap-2 bg-yellow-600 lg:justify-start lg:gap-8 lg:px-8">
      <Link href="/" className="flex flex-row items-center gap-2">
        <div className="relative h-[50px] w-[50px] sm:h-[65px] sm:w-[65px]">
          <Image alt="Twin Arts Studio" fill style={{ objectFit: "fill" }} src={"/images/logo_black.png"} />
        </div>
        <div className="hidden flex-col sm:flex">
          <span className="text-sm sm:text-lg">Twin Arts Studio</span>
          <span className="text-xs sm:block">By Gina & Shue</span>
          <span className="italic text-xs sm:block">Original Oil Paintings & Commissions</span>
        </div>
      </Link>
      {labels.map((label, i) =>
  label.name === "Gallery" ? (
    <a key={i} href={label.url}>
      <span className="text-sm text-white hover:text-yellow-900 sm:text-base">
        {label.name}
      </span>
    </a>
  ) : (
    <Link key={i} href={label.url}>
      <span className="text-sm text-white hover:text-yellow-900 sm:text-base">
        {label.name}
      </span>
    </Link>
  )
)}
    </header>
  )
}

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 z-1 flex h-[90px] w-full flex-col items-center justify-center gap-4 bg-yellow-600 md:flex-row lg:gap-8">
      <Link className="group flex flex-row items-center gap-2" href="mailto:cyclingfuns@gmail.com">
        <MdOutlineMailOutline className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800">Shue Snyder: cyclingfuns@gmail.com</span>
      </Link>
      <Link className="group flex flex-row items-center gap-2" href="mailto:glin1987@yahoo.com">
        <MdOutlineMailOutline className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800">Gina Lin: glin1987@yahoo.com</span>
      </Link>
      {/* <Link className="group flex flex-row items-center gap-2" href="https://instagram.com/">
        <FaInstagram className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800"></span>
      </Link> */}
    </footer>
  )
}

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <div className="min-h-screen justify-center">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
