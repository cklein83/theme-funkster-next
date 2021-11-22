
import * as api from '../../lib/api'

import PageLink from '../../components/pagelink'

import Typed from 'react-typed';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    subtitle3
    bgImage { url }
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
    `
    const data = (await api.getData(preview, "bannerPage", fields, locale)) ?? []
    return data
}
  
export default function Banner({ data, modules }) {

    var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 90,
        loop: true,
        backSpeed: 30,
        backDelay: 2500
    });   

    return (
        <>
            <div className="h-100">
                <div className="banner-inner bg-banner d-flex align-content-center justify-content-center flex-wrap text-center" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${data.banner.bgImage.url})`
                }}>
                    <div className="row g-0 justify-content-center">
                        <div className="col-lg-12 col-md-8 mx-auto text-banner p-1">
                            <h1 className="main-title mb-4">
                                {data.banner.title}
                            </h1>
                            
                            {modules.autotype ?
                            <h2 className="main-subtitle mb-4 text-banner">
                            <Typed
                                strings={[
                                    data.banner.subtitle,
                                    data.banner.subtitle2,
                                    data.banner.subtitle3]}
                                    typeSpeed={60}
                                    backSpeed={60}
                                    loop />
                            </h2>
                            :
                            <h2 className="main-subtitle mb-4 text-banner" dangerouslySetInnerHTML={{ __html: data.banner.subtitle }}/>                            
                            }
 
                            <PageLink cssClass="btn btn-primary btn-lg mb-5 me-2 p-3" pageLink={data.banner.ctaPrimary}>
                                {data.banner.ctaPrimary.name}
                            </PageLink>
                            <PageLink cssClass="btn btn-secondary btn-lg mb-5 p-3" pageLink={data.banner.ctaSecondary}>
                                {data.banner.ctaSecondary.name} <i className="icon ms-1 bi bi-box"></i>
                            </PageLink>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}