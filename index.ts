import {
  Application,
  Router,
  RouterContext,
  Status
} from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

// include all routes
import router from "./routes.ts";

// global constants
const APP_HOST = '127.0.0.1'
const APP_PORT = 8000

const app = new Application();

// error handling
app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

// CORS: https://stackoverflow.com/a/62301532
// Deno CORS: https://deno.land/x/cors@v1.2.0
//app.use(oakCors());
app.use(oakCors({ 
  //origin: [`http://${APP_HOST}:8080`, `http://${APP_HOST}:8080/login`],
  //origin: `/^http:\/\/127\.0\.0\.1:8000\/[[:alnum:]]*$/i`,
  origin: [`http://${APP_HOST}:8080`, `http://${APP_HOST}:8080/login`, `http://${APP_HOST}:8080/profile`],
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(router.routes())

//app.use(router.allowedMethods())
console.log(`deno listening on ${APP_HOST}:${APP_PORT}`)
await app.listen({ hostname: APP_HOST, port: APP_PORT });