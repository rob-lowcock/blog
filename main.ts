import express from "npm:express@4.18.2";
import { ApolloServer } from "npm:@apollo/server@4.3.0";
import { ApolloServerPluginLandingPageDisabled } from 'npm:@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from "npm:@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "npm:@apollo/server/express4";
import { typeDefs } from "./schema.ts"
import { resolvers } from "./resolvers.ts"
import cors from "npm:cors"
import bodyParser from "npm:body-parser"
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [
  //   Deno.env.get("NODE_ENV") === 'production' ? ApolloServerPluginLandingPageDisabled()
  //     : ApolloServerPluginLandingPageLocalDefault()
  // ]
});

const app : express.app = express();

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server)
);

app.get("/", (_req: express.request, res: express.res) : void => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(8000);
console.log("🚀 Listening on port 8000");