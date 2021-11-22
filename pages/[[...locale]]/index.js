
import Head from 'next/head'


import * as api from '../../lib/api'

import Nav, { MultiNav } from '../../partials/layout/nav'
import * as nav from '../../partials/layout/nav'
import Main from '../../partials/layout/main'
import Footer, * as footer from '../../partials/layout/footer'

import * as banner from '../../partials/sections/banner'
import * as about from '../../partials/sections/about'
import * as features from '../../partials/sections/features'
import * as maps from '../../partials/sections/maps'
import * as contact from '../../partials/sections/contact'
import * as skills from '../../partials/sections/skills'
import * as countto from '../../partials/sections/countto'
import * as team from '../../partials/sections/team'
import * as faq from '../../partials/sections/faq'
import * as slider from '../../partials/sections/slider'
import * as pricing from '../../partials/sections/pricing'
import * as timeline from '../../partials/sections/timeline'
import * as feedback from '../../partials/sections/feedback'
import * as quotes from '../../partials/sections/quotes'
import * as video from '../../partials/sections/video'
import * as countdown from '../../partials/sections/countdown'
import * as filters from '../../partials/sections/filters'
import * as gallery from '../../partials/sections/gallery'

import { modules } from '../../lib/modules'


export default function Home({ preview, data, modules, locale }) {
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
        <MultiNav data={data} modules={modules} locale={locale} />
        :
        <Nav data={data} modules={modules} locale={locale} />
        }
      </header>

      <main>
        <Main data={data} modules={modules} />
      </main>

      <footer>
        <Footer data={data}/>
      </footer>
    </>
  )
}

// -------

const getPathSlugs = () => {
  let x = [[], ["en"]].map((locale) => ({
    params: {
      locale,
    },
  }));
  console.log(x)
  return x
}

export async function getStaticPaths(...args) {
  const pathsWithLocale = getPathSlugs();
  return {
    paths: pathsWithLocale,
    fallback: false
  };
}

export async function getStaticProps({ preview = false, params }) {

  console.log("LOC-from-PAR: " + params.locale)
  let locale = params.locale === undefined ? "de-DE" : "en"
  console.log("Locale: " + locale)

  console.log("MODULES:")
  console.log(modules)
  console.log("##########")

  const data = {
    site: await getSite(preview, locale),
    menu: await nav.getMenu(preview, locale),
    footer: await footer.getFooter(preview, locale),
    banner: await banner.getData(preview, locale),
    about: await about.getData(preview, locale),
    features: await features.getData(preview, locale),
    maps: await maps.getData(preview, locale),
    contact: await contact.getData(preview, locale),
    skills: await skills.getData(preview, locale),
    countto: await countto.getData(preview, locale),
    team: await team.getData(preview, locale),
    faq: await faq.getData(preview, locale),
    slider: await slider.getData(preview, locale),
    pricing: await pricing.getData(preview, locale),
    timeline: await timeline.getData(preview, locale),
    feedback: await feedback.getData(preview, locale),
    quotes: await quotes.getData(preview, locale),
    video: await video.getData(preview, locale),
    countdown: await countdown.getData(preview, locale),
    filters: await filters.getData(preview, locale),
    gallery: await gallery.getData(preview, locale)
  }

  return {
    props: { preview, data, modules, locale }
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