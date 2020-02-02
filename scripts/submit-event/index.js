import Router from './router.js'
import rs from 'randomstring'
import utf8 from 'utf8'
import b64 from 'base-64'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const commonHeaders = { 'content-type': 'application/json;charset=UTF-8' }
const ghToken = 'b8a56aab7e381ae463b3adf9bf95affc5cd5af73'

function addcors(r) {
  r.headers.set('Access-Control-Allow-Origin', '*')
  r.headers.set('Access-Control-Allow-Methods', 'POST', 'GET', 'OPTIONS')
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
  const r = new Router()

  r.options('/add-event',() => {
    let res = new Response(JSON.stringify(['OK']), { status: 200, headers: commonHeaders })
    return addcors(res)
  })

  r.post('/add-event', async req => {
    let body = await req.json()

    // TODO: Also check time and dir
    if ((body.name == '' || body.name == undefined) && (body.location == ''||body.location == undefined)) {
      let err = { err: 'Bad request' }
      let res = new Response(JSON.stringify(err), { status: 400, headers: commonHeaders, })
      return addcors(res)
    }

    const fileCreation = await createFile(body)

    let res = new Response(JSON.stringify(fileCreation), { status: 200, headers: commonHeaders })
    return addcors(res)
  })



  return r.route(request)
  //if (request.method === 'POST') {
  //  const body = await request.json()
  //  // TODO: Also check time and dir
  //  if ((body.name == '' || body.name == undefined) && (body.location == ''||body.location == undefined)) {
  //    let err = { err: 'Bad request' }

  //    let response = new Response(JSON.stringify(err), {
  //      status: 400,
  //      headers: commonHeaders,
  //    })
  //    return addcors(response)
  //  }

  //  console.log(body)

  //  const r = await createFile(body)
  ////const r = await fetch(
  ////  'https://api.github.com/repos/buildandtell/o/contents/data',
  ////  {
  ////    method: 'GET',
  ////    headers: {
  ////      'Content-Type': 'application/json',
  ////      'User-Agent': 'oz',
  ////    },
  ////  },
  ////)

  ////let data = await r.json()
  ////console.log(data)

  //  let response = new Response('{"body":"Registered."}', {
  //    status: 201,
  //    headers: commonHeaders,
  //  })

  //  return addcors(response)

  //} else if (request.method === 'OPTIONS') {
  //  response = new Response(JSON.stringify(['OK']), {
  //    status: 200,
  //    headers: commonHeaders,
  //  })
  //} else {
  //  let err = { err: 'Expected POST' }
  //  response = new Response(JSON.stringify(err), {
  //    status: 405,
  //    headers: commonHeaders,
  //  })
  //}

}

async function createFile(rb) {
  // rb should be converted to a js object before passing
  let genHash = rs.generate(4)
  console.log(genHash)
  let finContents = {
    name: rb.name,
    location: rb.location,
    desc: rb.desc,
    time: rb.time,
    links: rb.links,
    notes: rb.notes
  }
  let text = JSON.stringify(finContents)
  let bytes = utf8.encode(text)
  let encodedData = b64.encode(bytes)

  let rawResponse = await fetch(
    `https://api.github.com/repos/buildandtell/o/contents/data/${rb.dir}/${genHash}.json`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'oz',
        'Authorization': `token ${ghToken}`,
      },
      body: JSON.stringify({
        message: `new event ${genHash}`,
        content: `${encodedData}`,
        branch: 'master',
      }),
    },
  )
  let data = await rawResponse.json()
  if (rawResponse.status !== 201) {
    throw 'did not create shit.'
  }
  return {sha: data.content.sha}
}