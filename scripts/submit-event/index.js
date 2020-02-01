addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const commonHeaders = { 'content-type': 'application/json;charset=UTF-8' }
const ghToken = '<API_TOKEN>'

function addcors(r) {
  r.headers.set('Access-Control-Allow-Origin', '*')
  r.headers.set('Access-Control-Allow-Methods', 'POST', 'OPTIONS')
  r.headers.set('Vary', 'Origin')
  r.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  )
  return r
}

/**
 * Respond with worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  let response
  // Add CORS headers

  if (request.method === 'POST') {
    const body = await request.json()
    // validate body
    if (body.name == undefined && body.location == undefined) {
      let err = { err: 'Bad request' }
      response = new Response(JSON.stringify(err), {
        status: 400,
        headers: commonHeaders,
      })
      return addcors(response)
    }

    console.log(body)

    // successful return
    response = new Response('{"body":"Registered."}', {
      status: 201,
      headers: commonHeaders,
    })
  } else if (request.method === 'OPTIONS') {
    response = new Response(JSON.stringify(['OK']), {
      status: 200,
      headers: commonHeaders,
    })
  } else {
    let err = { err: 'Expected POST' }
    response = new Response(JSON.stringify(err), {
      status: 405,
      headers: commonHeaders,
    })
  }

  return addcors(response)
}
