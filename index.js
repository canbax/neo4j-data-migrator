const neo4j = require("neo4j-driver");
const fs = require("fs");
const cliProgress = require("cli-progress");

const cypherQueries = fs
  .readFileSync("./all-cypher.cql", { encoding: "utf8", flag: "r" })
  .split(":begin")
  .map((x) => x.replace(":commit", "").trim())
  .filter((x) => x);

const NEO4J_URL = "bolt://asdasd.com:7687";
const NEO4J_USERNAME = "asddsa";
const NEO4J_PASSWORD = "asdasd";
const NEO4J_DB = "neo4j";

const driver = neo4j.driver(
  NEO4J_URL,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);

const session = driver.session({ database: NEO4J_DB });

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function execute() {
  for (let i = 0; i < cypherQueries.length; i++) {
    const statements = cypherQueries[i].split(";").filter((x) => x);
    for (let j = 0; j < statements.length; j++) {
      try {
        const result = await session.run(statements[j]);
        
      } catch (e) {
        // console.log("error during exection: ");
      }
    }
    bar1.increment();
    // try {
    //   const result = await session.run(
    //     `CALL apoc.cypher.runMany('${cypherQueries[i].replaceAll("'", "\\'")}', {})`
    //   );
    //   bar1.increment();
    // } catch (e) {
    //   console.log("error during exection: ", e);
    // }
  }
  session.close();
  driver.close();
}

bar1.start(cypherQueries.length, 0);
execute();
