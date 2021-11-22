
import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    video {
      url
      contentType
    }   
    `
    const data = (await api.getData(preview, "videoPage", fields, locale)) ?? []
    return data
}


export default function Video({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.video} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    <div className="col-lg-10 wow fadeInUp">
                        <video controls loop muted>
                            <source src={data.video.video.url} type={data.video.video.contentType} />
                        </video>
                    </div>                                       
                </div>
            </div>
        </>
    );
}
