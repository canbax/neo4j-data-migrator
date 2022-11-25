const neo4j = require("neo4j-driver");
const fs = require("fs");
const cliProgress = require("cli-progress");

const cypherFile = "./all-plain.relationships.cypher";

const NEO4J_URL = "bolt://asdasd.com:7687";
const NEO4J_USERNAME = "asddsa";
const NEO4J_PASSWORD = "asdasd";
const NEO4J_DB = "neo4j";

const cypherQueries = fs
  .readFileSync(cypherFile, { encoding: "utf8", flag: "r" })
  .split(/\r?\n/)
  .filter((x) => x);

// create a new progress bar instance and use shades_classic theme

async function execute(queries, step) {
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  bar1.start(queries.length, 0);
  const driver = neo4j.driver(
    NEO4J_URL,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    {
      /* encrypted: 'ENCRYPTION_OFF' */
    }
  );

  const session = driver.session({ database: NEO4J_DB });
  const t1 = new Date().getTime();
  for (let i = 0; i < queries.length; i = i + step) {
    try {
      let cy = "";
      for (let j = 0; j < step; j++) {
        cy += queries[i - j + 1] + "\n";
      }
      await session.run(cy);
    } catch (e) {
      console.log("error during exection: ", e);
    }
    bar1.increment(step);
  }
  const deltaTime = new Date().getTime() - t1;
  console.log("executed in", deltaTime, "milliseconds");
  bar1.stop();
  session.close();
  driver.close();
}

execute(cypherQueries, 4);
