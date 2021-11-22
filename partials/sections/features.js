
import * as api from '../../lib/api'

//import ContentfulImage from '../../components/contentful-image'

import SectionHead from '../../components/section-head';
import PageLink from '../../components/pagelink'
import RichText from '../../components/richtext';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2

    featuresCollection(skip: 0, limit: 10) {
      items {
        ... on Feature {
          title
          subtitle
          description {
              json
          }

          image {
            url
          }

          ctaPrimary {
            ... on PageLink {
              name
              section
              href
            }
          }
          ctaSecondary {
            ... on PageLink {
              name
              section
              href
            }        
          }          
        }
      }
    }    
    `
    const data = (await api.getData(preview, "featurePage", fields, locale)) ?? []
    return data
}


export default function Features({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.features} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">

                    {data.features.featuresCollection.items?.map((feature, index) => 
                    <div key={index} className="col-lg-4 col-md-4">
                        <div className="card feature feature-first text-dark shadow-lg h-100 wow fadeInUp">
                            <div className="row g-0 justify-content-center">
                                <div className="col-12 p-3 text-center">
                                    <img src={feature.image.url} className="img-fluid rounded-3" alt={feature.title} />
                                </div>
                                <div className="col-lg-12 col-md-8 p-1">
                                    <div className="card-body">
                                        <h2 className="card-title">{feature.title}</h2>
                                        <p className="text-muted">{feature.subtitle}</p>
                                        <p className="card-text mb-3">
                                          <RichText text={feature.description} />
                                        </p>
                                        <div>
                                            <PageLink cssClass="btn btn-primary me-1" pageLink={feature.ctaPrimary}>
                                                {feature.ctaPrimary.name}
                                            </PageLink>
                                            <PageLink cssClass="btn btn-secondary me-1" pageLink={feature.ctaSecondary}>
                                                {feature.ctaSecondary.name}
                                            </PageLink>
                                        </div>
                                    </div>
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
