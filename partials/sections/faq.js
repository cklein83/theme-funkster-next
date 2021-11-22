
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import RichText from '../../components/richtext';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    faqEntriesCollection(skip: 0, limit: 30) {
      items {
        ... on Faq {
          title
          description {
            json
          }                          
        }
      }
    }
    `
    const data = (await api.getData(preview, "faqPage", fields, locale)) ?? []
    return data
}


export default function Faq({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.faq} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    <div className="col-lg-6 p-0 m-1 text-center">
                        <div className="accordion text-dark" id="faq">

                            {data.faq.faqEntriesCollection.items?.map((faq, index) => 
                            <div key={index} className="accordion-item bg-white shadow-lg m-3 p-4 wow fadeInUp">
                                <h2 className="accordion-header" id={"faq-heading" + index}>
                                    <button className={"accordion-button fs-4" + (index > 0 ? " collapsed" : "")} type="button" data-bs-toggle="collapse" data-bs-target={"#faq-collapse" + index} aria-expanded="true" aria-controls={"faq-collapse" + index}>
                                        {faq.title}
                                    </button>
                                </h2>
                                <div id={"faq-collapse" + index} className={"accordion-collapse collapse" + (index == 0 ? " show" : "")} aria-labelledby={"faq-heading" + index}>
                                    <div className="accordion-body text-start">
                                        <RichText text={faq.description} />
                                    </div>
                                </div>
                            </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
