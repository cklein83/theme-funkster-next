import * as api from '../../lib/api'

import Link from 'next/link'

export async function getFooter(preview, locale) {
    const fields = `
    headline1
    headline2
    pageLinkHome {
      ... on PageLink {
        id
        section
        href
        name
      }
    }
    pageLinkImprint {
      ... on PageLink {
        id
        section
        href
        name
      }
    }
    pageLinkPrivacy {
      ... on PageLink {
        id
        section
        href
        name
      }
    }
    `
    const data = (await api.getData(preview, "footer", fields, locale)) ?? []
    return data
}


export default function Footer({ data }) {
    return (
        <>
            <div className="footer bg-footer">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-lg-3 col-md-6 col-xs-4 col-4 p-3">
                            <h5>{data.site.title}</h5>
                            <p>
                              {data.site.subtitle}.
                            </p>
                            <div>
                                <Link className="navbar-brand external" href="/#home">
                                    <img src={data.site.brandIcon.url} className="brand-icon" width="32" height="32" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-xs-4 col-4 p-3">
                            <h5>{data.footer.headline1}</h5>
                            {/*
                            <div className="d-flex flex-column">
                                <a href="#" className="external">{data.footer.pagetitleHome}</a>
                                <a href="#" className="external">{data.footer.pagetitleImprint}</a>
                                <a href="#" className="external">{data.footer.pagetitlePrivacy}</a>
                            </div>
                            */}

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href={data.footer.pageLinkHome?.href} className="nav-link external">{data.footer.pageLinkHome?.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href={data.footer.pageLinkImprint?.href} className="nav-link external">{data.footer.pageLinkImprint?.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href={data.footer.pageLinkPrivacy?.href} className="nav-link external">{data.footer.pageLinkPrivacy?.name}</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-3 col-xs-4 col-4 p-3 pe-0">
                            <h5>{data.footer.headline2}</h5>
                            <p style={{ wordWrap: 'break-word' }}>
                                <i className="bi bi-telephone"></i> {data.site.contact.phone}
                                <br />
                                <i className="bi bi-envelope"></i> {data.site.contact.email}
                            </p>

                            <div className="social-links">
                                <a href="#" className="twitter p-1"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook p-1"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram p-1"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin p-1"><i className="bi bi-linkedin"></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="footer-copyright p-2 bg-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="copyright-text mb-0">
                                &copy; Designed and Developed by <a href="https://www.modulseiten.com" rel="nofollow">Modulseiten KLEIN</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </>         
    );
}