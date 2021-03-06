import Router from './router.js'
import rs from 'randomstring'
import utf8 from 'utf8'
import b64 from 'base-64'
import m from 'moment'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const commonHeaders = { 'content-type': 'application/json;charset=UTF-8' }
const ghToken = ''

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

    if ((body.name == '' || body.name == undefined) && (body.location == ''||body.location == undefined)) {
      let err = { err: 'Bad request' }
      let res = new Response(JSON.stringify(err), { status: 400, headers: commonHeaders, })
      return addcors(res)
    }
    if(!m(body.time).isValid){
      let err = { err: 'Bad time!' }
      let res = new Response(JSON.stringify(err), { status: 400, headers: commonHeaders, })
      return addcors(res)
    }

    const fileCreation = await createFile(body)

    let res = new Response(JSON.stringify(fileCreation), { status: 201, headers: commonHeaders })
    return addcors(res)
  })

  return r.route(request)

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