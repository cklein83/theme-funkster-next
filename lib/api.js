


async function fetchGraphQL(query, preview = false) {
  const HttpsProxyAgent = require('https-proxy-agent');

  //console.log("query: " + query)
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
      //agent: new HttpsProxyAgent('http://proxy.bechtle.de:80')
    }
  )
  .then((response) => {
    const json = response.json();
    return json;
  });
}

async function fetchy(preview, type, fields, locale = "de-DE", order = "sys_id_ASC") {

  if (locale == "en") {
    locale = "en-US"
  }

  return fetchGraphQL(
    `query {
        ${type}Collection(preview: ${preview ? 'true' : 'false'}, locale: "${locale}", order: ${order}) {
          items {
            ${fields}
          }
        }
      }`,
    preview
  )
}

function extractSingle(fetchResult, type) {
  return fetchResult?.data?.[type + "Collection"]?.items?.[0]
}

export async function getData(preview, type, fields, locale) {
  let fetchResult = await fetchy(preview, type, fields, locale)
  
  //console.log("RESULT:")
  //console.log(fetchResult)
  //console.log("##########")
  if (!fetchResult?.errors && fetchResult?.errors?.length > 0) {
      console.error("Error: " + fetchResult.errors[0]?.message)
      throw new Error("GraphQL Error: " + fetchResult.errors[0]?.message)
  }

  const result = extractSingle(fetchResult, type)
  return result;
}

function extractList(fetchResult, type) {
  return fetchResult?.data?.[type + "Collection"]?.items
}

export async function getDataList(preview, type, fields, locale = "de-DE", order = "sys_id_ASC") {
  let fetchResult = await fetchy(preview, type, fields, locale, order)

  //console.log("RESULT: ")
  //console.log(fetchResult)
  //console.log("##########")
  if (fetchResult?.errors != null && fetchResult?.errors?.length > 0) {
    console.error("Error: " + fetchResult.errors[0]?.message)
    throw new Error("GraphQL Error: " + fetchResult.errors[0]?.message)
  }

  const result = extractList(fetchResult, type)
  return result;
}