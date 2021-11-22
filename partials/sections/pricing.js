
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import { RichTextWithUnstyledList } from '../../components/richtext';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    pricingCollection(skip: 0, limit: 10) {
      items {
        ... on Pricing {
          title
          subtitle
          description {
            json
          } 
          highlighted
          price                         
        }
      }
    }
    `
    const data = (await api.getData(preview, "pricingPage", fields, locale)) ?? []
    return data
}


export default function Pricing({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.pricing} />

                <div className="section-body row g-4 justify-content-center text-center m-1 p-1">
                    {data.pricing.pricingCollection.items?.map((pricing, index) => 
                    <div key={index} className="col-lg-3 col-md-4 col-sm-12 col-12 wow fadeInUp">
                        <div className={(pricing.highlighted ? "bg-highlight text-white " : "") + "card mb-4 shadow-lg p-4"}>
                            <div className="p-2">
                                <h4 className="my-0 fs-1">{pricing.title}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title display-3 text-bolder">{pricing.price} €</h1>
                                <div className="card-text">
                                    ({pricing.subtitle})
                                </div>
                                <RichTextWithUnstyledList text={pricing.description} />
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}
