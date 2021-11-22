
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    feedbacksCollection(skip: 0, limit: 10) {
      items {
        ... on Feedback {
          personName
          personCompany
          personImage {
            url
          }
          text
          rating
          socialLinksCollection(skip: 0, limit: 5) {
            items {
              ... on SocialLink {
                href
                type
              }
            }
          }
        }
      }
    }
    `
    const data = (await api.getData(preview, "feedbackPage", fields, locale)) ?? []
    return data
}


export default function Feedback({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.feedback} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">

                    {data.feedback.feedbacksCollection.items?.map((feedback, index) => 
                    <div key={index} className="col-lg-3 h-100 wow fadeInUp">
                      <div className="card mb-2 shadow-lg">
                        <img src={feedback.personImage.url} className="card-img-top" />
                        <div className="card-body text-dark text-center">
                          <h5 className="card-title">{feedback.personName}</h5>
                          <p className="text-muted">{feedback.personCompany}</p>

                          <p>
                          {Array(Math.trunc(feedback.rating)).fill(1).map((e, i) =>
                            <i key={i} className="bi bi-star-fill"></i>
                          )}
                          {(feedback.rating - Math.trunc(feedback.rating)) > 0 ? <i className="bi bi-star-half"></i> : ""}
                          {Array(5 - Math.ceil(feedback.rating)).fill(1).map((e, i) => 
                              <i key={i} className="bi bi-star"></i>
                          )}                          
                          </p>

                          <div className="card-text mb-3">
                            <p className="blockquote text-muted">
                              {feedback.text}
                            </p>
                          </div>
                          <div className="social">
                            {feedback.socialLinksCollection.items?.map((socialLink, index) =>
                              <a key={index} href={socialLink.href} className="external"><i className={"bi bi-" + socialLink.type + " p-1"}></i></a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}
