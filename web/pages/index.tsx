import { loadArtWork } from "@sanity/loadArtWork"
import { ArtWork } from "@schemas/global"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Gallery from "@/src/components/core/Gallery"
import { useState } from "react"

const title = `Twin Arts Studio - Home`

const description = `Shue and Gina are twin sisters born in Taipei, Taiwan. Both were recognized for their artistic talent at a young age and received numerous awards in their childhood. They shared the same dream of becoming professional artists one day. However, life took them in different directions, and they set aside their artistic journey for nearly 60 years. Now, they have returned to their shared passion, creating original paintings inspired by nature, seasons, and the beauty of everyday life.

Please visit the Gallery and Available for Sale  to view all artwork.  For special needs, contact info@twinart.studio or visit Commission page. 
`
const Home: NextPage<{ artWork: ArtWork[] }> = ({ artWork }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [activeProject, setActiveProject] = useState<ArtWork>({} as ArtWork)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Shue's art portfolio" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <div className="min-h-screen w-screen pt-[90px] pb-[90px]">
        <div className="mt-10 flex w-full max-w-full flex-col items-center justify-center gap-8 p-8">
          <p className="text-center text-2xl font-bold">Original Oil Paintings & Commissions</p>
          <p className="flex max-w-[800px] whitespace-pre-line">{description}</p>
    {/* Featured Artwork */}
{artWork && artWork.length > 0 && (
  <div className="w-full max-w-[1400px] columns-1 gap-8 py-10 md:columns-2 lg:columns-3 xl:columns-4">
    {artWork.map((a) => (
      <div
        key={a.id}
        className="mb-8 inline-block w-full break-inside-avoid text-center"
      >
        <img
          alt={a.title}
          src={a.imageUrl}
          className="mx-auto h-auto max-h-[320px] w-auto max-w-full object-contain"
        />
      </div>
    ))}
  </div>
)}      
        </div>
      </div>
    </>
  )
}

export default Home

const Carousel = () => (
  <div className="relative flex h-full min-h-[50vh] max-w-full min-w-full lg:min-h-[500px] lg:min-w-[1000px]">
    <div className="carousel top-0 right-0 bottom-0 left-0 flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
      {/* <div className="w-full h-full flex flex-row"> */}
      <div className="slide relative flex h-full w-full shrink-0">
        <Image alt="canyon sunset" src={"/images/art/canyon-sunset.jpg"} fill style={{ objectFit: "contain" }} />
        <div className="snapper absolute top-0 left-0 w-full snap-center" />
      </div>
      <div className="slide relative flex h-full w-full shrink-0">
        <Image alt="portrait of andy" src={"/images/art/portrait-andy.jpg"} fill style={{ objectFit: "contain" }} />
        <div className="snapper absolute top-0 left-0 w-full snap-center" />
      </div>
      <div className="slide relative flex h-full w-full shrink-0">
        <Image
          alt="farm cherry blossoms"
          src={"/images/art/farm-cherry-blossoms-oil.jpg"}
          fill
          style={{ objectFit: "contain" }}
        />
        <div className="snapper absolute top-0 left-0 w-full snap-center" />
      </div>
    </div>
    {/* </div> */}
  </div>
)

export const getStaticProps: GetStaticProps<{ artWork: Array<ArtWork> }> = (async () => {
  const artWork = await loadArtWork()
  console.log("getStaticProps", artWork)

  const featuredArtWork = artWork.filter((product: ArtWork) => product.featured)
  console.log("filtered by featured:", featuredArtWork)
  return {
    props: {
      artWork: featuredArtWork,
    },
    revalidate: 60, // important to revalidate cached datasets in case updates to Sanity get published
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
}>
