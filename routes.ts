// database
import { Database } from 'https://deno.land/x/denodb/mod.ts';
import db from './db.ts';

import { Router, Status } from "https://deno.land/x/oak/mod.ts";

// include login for validation
import { checkCredentials, createCookie, checkToken } from './controllers/login.ts';



const router = new Router();

// TODO: create catch-all GET/POST app.use() ?
// TODO: chain middleware for (1) login and (2) contents?
router.post('/', (ctx) => {
  console.debug(`new general request: ${ctx.request}`)
  ctx.response.body = '{"res": "choose available route"}'
})

/** 
 * POST /login
 *              {user: {string}, pw: {string}}
 * 
 */
router.post('/login', async (ctx) => {
  // ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  // TODO: add Logger plugin
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.debug(`${time}: new login request from ${ctx.request.ip}`);

  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, "Bad Request");
  }
  // ctx.response.headers.set('Access-Control-Allow-Origin', '*');

  const body = ctx.request.body();

  let credentials;
  if (body.type === "json") {
    credentials = await body.value;
  } else {
    ctx.throw(Status.BadRequest, "Bad Request");
  }

  if (await checkCredentials(db, credentials) == true) {

    // create token
    let token = await createCookie(credentials)

    // build response
    ctx.response.body = token;
    ctx.cookies.set('token', token) // cookie valid for session: https://doc.deno.land/https/deno.land/x/oak/mod.ts#Cookies

    ctx.response.body = Status.OK
    ctx.response.body = `{"status": ${Status.OK}, "res": "access granted", "username": "${credentials.username}", "token": "${token}"}`

  } else {
    ctx.response.status = Status.Unauthorized
    ctx.response.body = `{"status": ${Status.Unauthorized}, "res": "access denied"}`
  }

});

router.get('/profile/:userid', async (ctx) => {

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.debug(`${time} show userid ${ctx.params.userid}`);

  //console.log(`headers: ${ctx.request.headers}`)
  let token = ctx.cookies.get("token") !== undefined ? ctx.cookies.get("token") : undefined;
  
  if (token) {
    const result = await checkToken(token);
    if(result){
      ctx.response.status = Status.OK
      ctx.response.body = `{"status": ${Status.OK}, "res": "token validated"}`
    }else{
      ctx.response.status = Status.Unauthorized
      ctx.response.body = `{"status": ${Status.Unauthorized}, "res": "invalid token"}`
    }
  }else{
      ctx.response.status = Status.Unauthorized
      ctx.response.body = `{"status": ${Status.Unauthorized}, "res": "invalid token"}`
  }

});

export default router;