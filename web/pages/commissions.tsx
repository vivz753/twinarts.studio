import type { NextPage } from "next"

const description = `
General Pricing Guidelines 

Prices below are approximate estimates. Final pricing may vary depending on the complexity of the composition, subject matter, and level of customization.

Twin Arts Studio offers three size categories and corresponding price ranges, based on the longest side of the painting.

•	Small (Up to 16 In.): $250 - $800
•	Medium (Over 16 to 30 In.): $801 - $2500
•	Large (Over 30 In.): $2501+

For further information, please contact us at shuesnyder@gmail.com

Twin Arts Studio
`

const Commissions: NextPage = () => {
  return (
    <div className="h-full min-h-screen w-screen pt-[90px] pb-[90px]">
      <div className="flex w-full max-w-full flex-col items-center justify-center gap-8 p-8 lg:gap-12 lg:p-12">
        <div className="flex max-w-[800px] flex-col gap-2">
          <p className="text-center text-3xl font-bold">Twin Arts Studio Commissions & Client Guides</p>

          <p className="flex whitespace-pre-line">{`
          We offer:
          `}</p>
          <ul className="flex list-disc flex-col whitespace-pre-line">
            <li>Landscapes/Seasonal scenes</li>
            <li>{`Portraits (people and pets)`}</li>
            <li>
              {`Custom artwork for home interiors and professional spaces 
              (offices, lobbies, restaurants, model home, or staging)`}
            </li>
          </ul>
          <p className="flex whitespace-pre-line">{`
          Commission Process`}</p>
          <ol className="flex list-decimal flex-col whitespace-pre-line">
            <li>Consultation: Please share reference photos, desired size, and expected timeline.</li>
            <li>Proposal</li>
            <li>
              Agreement and Payment: Once proposal is approved, a 30–50% non-refundable deposit is required to secure
              your commission and begin the project.
            </li>
            <li>
              Final delivery and payment – The remaining balance is due upon completion, prior to delivery or shipping.
              Shipping costs will be calculated based on the size and destination and are not included in the price of
              the painting.
            </li>
            <li>
              Currently, all paintings are sold unframed unless framing is specifically requested. Framing costs will be
              added to the final price if requested.
            </li>
          </ol>
          <p className="flex whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Commissions
