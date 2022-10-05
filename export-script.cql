CALL apoc.export.cypher.all('all-cypher.cql', {
    streamStatements: true,
    batchSize: 10000
});

CALL apoc.export.cypher.all('all-cypher.cql', {
    streamStatements: true
});