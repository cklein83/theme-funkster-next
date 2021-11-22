//import ContentfulImage from '../../components/contentful-image'

import SectionHead from '../../components/section-head';
import RichText from '../../components/richtext';

import * as api from '../../lib/api'

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    avatarImage { url }

    aboutsCollection(skip: 0, limit: 10) {
      items {
        ... on About {
          title
          description {
            json
          }
          icon {
            url
          }
          iconClass
        }
      }
    }    
    `
    const data = (await api.getData(preview, "aboutPage", fields, locale)) ?? []
    return data
}


export default function About({ data }) {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center" style={{zIndex: 1}}>
                    <div className="col-lg-8 col-md-8 col-sm-10 col-10" style={{zIndex: 1}}>
                        <div className="about-person text-center" style={{zIndex: 1}}>

                            {/*
                            <ContentfulImage
                                width={2000}
                                height={1000}
                                alt={`Cover Image for foo`}
                                className="about-img img-fluid rounded-circle p-0 shadow-lg"
                                src={data.about.avatarImage.url}
                            />
                            */}

                            <img src={data.about.avatarImage.url} className="about-img img-fluid rounded-circle p-0 shadow-lg" alt="About" />

                        </div>
                    </div>
                </div>
            </div>

            <div className="container wow fadeInUp">

                <SectionHead data={data.about} />

                <div className="section-body row justify-content-center">
                    <div className="col-lg-5 col-9">
                        {data.about.aboutsCollection.items?.map((about, index) => 
                        <div key={index} className="mb-5">
                            <h3 className="inline-head">
                                {about.icon != null && typeof about.icon !== "undefined"
                                  ? <img src={about.icon.url} width="48px" height="48px" className="me-1" /> 
                                  : about.iconClass && (<i className={about.iconClass + " me-1 fs-2 text-highlight"}></i>)} 
                                {about.title}                            
                            </h3>
                            <p>
                                <RichText text={about.description} />
                            </p>
                        </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
