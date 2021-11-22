
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import { useEffect } from 'react';
//import Gallery from 'react-photo-gallery';

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    `
    const data = (await api.getData(preview, "galleryPage", fields, locale)) ?? []
    return data
}

/*
export default function Gallery({ data }) {

    useEffect(() => {         
    })

    const photos = [
        {
          src: '/img/gallery/pic1.jpeg',
          width: 4,
          height: 3
        },
        {
          src: '/img/gallery/pic2.jpeg',
          width: 1,
          height: 1
        }
      ];
       
    return (
        <>
            <Gallery photos={photos} />
        </>
    );
}
*/

export default function Gallery({ data }) {

    useEffect(() => {   
        /*      
        const lightbox = GLightbox({
            selector: '.glightbox',
            loop: true
        });
        */      
    })

    return (
        <>
            <div className="container">
                <SectionHead data={data.filters} />

                <div className="section-body row g-4 justify-content-center m-2 p-2 wow fadeInUp">
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic1.jpeg" className="glightbox">
                                <img src="/img/gallery/pic1.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic2.jpeg" className="glightbox">
                                <img src="/img/gallery/pic2.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic3.jpeg" className="glightbox">
                                <img src="/img/gallery/pic3.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic4.jpeg" className="glightbox">
                                <img src="/img/gallery/pic4.jpeg" />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic5.jpeg" className="glightbox">
                                <img src="/img/gallery/pic5.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic6.jpeg" className="glightbox">
                                <img src="/img/gallery/pic6.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic7.jpeg" className="glightbox">
                                <img src="/img/gallery/pic7.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic8.jpeg" className="glightbox">
                                <img src="/img/gallery/pic8.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic9.jpeg" className="glightbox">
                                <img src="/img/gallery/pic9.jpeg" />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic10.jpeg" className="glightbox">
                                <img src="/img/gallery/pic10.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic11.jpeg" className="glightbox">
                                <img src="/img/gallery/pic11.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic12.jpeg" className="glightbox">
                                <img src="/img/gallery/pic12.jpeg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="gallery-img">
                            <a href="/img/gallery/pic13.jpeg" className="glightbox">
                                <img src="/img/gallery/pic13.jpeg" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
	            
        </>
    );
}