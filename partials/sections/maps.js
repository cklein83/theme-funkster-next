
import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    googleMapsUrl
    address {
      ... on Contact {
        street
        zip
        city
        phone
        email
      }
    }   
    `
    const data = (await api.getData(preview, "mapsPage", fields, locale)) ?? []
    return data
}


export default function Maps({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.maps} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">  
                    <div className="col-lg-6 p-0 m-1 text-center wow fadeInUp">
                        <div className="embed-responsive">
                            <iframe src={data.maps.googleMapsUrl} className="embed-responsive-item" width="100%" height="400px" style={{ border:0 }} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="col-lg-4 p-5 pt-0 pb-0 m-1 text-center align-self-center wow fadeInUp">
                        <div className="text-center mb-4">
                            <div className="bi bi-geo-alt fs-1"></div>
                            <div className="p-0">
                                {data.maps.address.street},<br/>
                                {data.maps.address.zip} {data.maps.address.city}
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <div className="bi bi-envelope fs-1"></div>
                            <div className="p-0">
                              {data.maps.address.email}
                            </div>
                        </div>	
                        <div className="text-center mb-4">
                            <div className="bi bi-telephone fs-1"></div>
                            <div className="p-0">
                              {data.maps.address.phone}
                            </div>
                        </div>								
                    </div> 
                </div> 	
            </div>
        </>
    );
}
