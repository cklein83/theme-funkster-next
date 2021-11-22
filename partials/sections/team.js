
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    membersCollection(skip: 0, limit: 10) {
      items {
        ... on TeamMember {
          name
          profession
          description
          image {
            url
          }
          facebookLink {
            ... on PageLink {
              href
            }
          }
          instagramLink {
            ... on PageLink {
              href
            }
          }              
          twitterLink {
            ... on PageLink {
              href
            }
          }              
          instagramLink {
            ... on PageLink {
              href
            }
          }                          
        }
      }
    }
    `
    const data = (await api.getData(preview, "teamPage", fields, locale)) ?? []
    return data
}


export default function Team({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.team} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">

                    {data.team.membersCollection.items?.map((member, index) => 
                    <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 wow fadeInUp">
                        <div className="card text-dark shadow-lg">
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                      <img src={member.image.url} className="img-fluid h-100 w-100" alt={member.name} />
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="card-body">
                                            <h5 className="card-title">{member.name}</h5>
                                            <p className="text-muted">{member.profession}</p>
                                            <div className="card-text mb-3">
                                              {member.description}
                                            </div>
                                            <div className="social">
                                              <a href={member.facebookLink?.href}><i className="bi bi-facebook p-1"></i></a>
                                              <a href={member.instagramLink?.href}><i className="bi bi-instagram p-1"></i></a>
                                              <a href={member.twitterLink?.href}><i className="bi bi-twitter p-1"></i></a>
                                              <a href={member.linkedinLink?.href}><i className="bi bi-linkedin p-1"></i></a>
                                            </div>
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
