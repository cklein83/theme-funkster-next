
import Head from 'next/head'

import * as api from '../lib/api'

import Nav from '../partials/layout/nav'
import { MultiNav } from '../partials/layout/nav'
import * as nav from '../partials/layout/nav'
import Footer, * as footer from '../partials/layout/footer'

import RichText from '../components/richtext';

import { modules } from '../lib/modules'


export default function Imprint({ preview, data, modules }) {
  return (
    <>
      <Head>
        <title>{data.site.title}</title>

        <meta name="description" content={data.site.metaDescription} />
        <meta name="author" content="Modulseiten KLEIN" />

        <link rel="canonical" href={data.site.metaCanonical} />
        <link rel="icon" href={data.site.brandIcon.url} />
      </Head>

      <header>
        {modules.multinav ?
        <MultiNav data={data} modules={modules} sectionated={false} />
        :
        <Nav data={data} modules={modules} sectionated={false} />
        }
      </header>

      <main style={{ marginTop: '65px' }}>
        <div className="pure-page container mt-5">
          <div className="section-body row g-4 justify-content-center m-2 p-2">
            <div className="col-lg-8">
              <h1 className="mb-3">{data.imprint.title}</h1>
              <RichText text={data.imprint.text} />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer data={data}/>
      </footer>
    </>
  )
}

// -------

export async function getStaticProps({ preview = false, locale }) {

  /*
  console.log("MODULES:")
  console.log(modules)
  console.log("##########")
  */

  const data = {
    site: await getSite(preview, locale),
    menu: await nav.getMenu(preview, locale),
    footer: await footer.getFooter(preview, locale),
    imprint: await getImprint(preview, locale),
  }

  return {
    props: { preview, data, modules }
  }
}

// -------

async function getSite(preview, locale) {
  const fields = `
  title
  subtitle
  brandIcon { url }
  metaDescription
  metaCanonical

  contact {
    ... on Contact {
      name,
      street,
      zip,
      city,
      phone,
      email
    }
  }  
  `
  const data = (await api.getData(preview, "site", fields, locale)) ?? []
  return data
}

export async function getImprint(preview, locale) {
  const fields = `
  title
  text {
      json
  }  
  `
  const data = (await api.getData(preview, "imprintPage", fields, locale)) ?? []
  return data
}