
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    quotesCollection(skip: 0, limit: 10) {
      items {
        ... on Quote {
          personName
          personInfo
          personImage {
            url
          }
          text
        }
      }
    }
    `
    const data = (await api.getData(preview, "quotesPage", fields, locale)) ?? []
    return data
}


export default function Quotes({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.quotes} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">

                    {data.quotes.quotesCollection.items?.map((quote, index) => 
                    <div key={index} className="quote-box bg-light text-dark text-center animate-box fadeInUp animated bg-dark shadow-lg wow fadeInUp">
                      <img src={quote.personImage.url} className="img-responsive" alt={quote.personName} draggable="false" />
                      <div className="desc">
                      <h2 className="display-3">{quote.personName}</h2>
                      <p className="quote fs-1">&quot;{quote.text}&quot;
                      </p>
                      <p className="text-muted">({quote.personInfo})</p>
                      </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}
