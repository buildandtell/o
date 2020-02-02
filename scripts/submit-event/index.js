addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const commonHeaders = { 'content-type': 'application/json;charset=UTF-8' }
const ghToken = ''

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
  //let response
  // Add CORS headers

  if (request.method === 'POST') {
    const body = await request.json()
    // validate body
    // TODO: Also check time
    if ((body.name == '' || body.name == undefined) && (body.location == ''||body.location == undefined)) {
      let err = { err: 'Bad request' }
      let response = new Response(JSON.stringify(err), {
        status: 400,
        headers: commonHeaders,
      })
      return addcors(response)
    }

    console.log(body)

  const r = await fetch(
    'https://api.github.com/repos/buildandtell/o/contents/data',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'oz',
      },
    },
  )

  let data = await r.json()
  console.log(data)


  let response = new Response('{"body":"Registered."}', {
    status: 201,
    headers: commonHeaders,
  })

  return addcors(response)

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

}
