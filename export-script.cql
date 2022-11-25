CALL apoc.export.cypher.all("all-plain.cypher", {
    format: "plain",
    cypherFormat: "updateAll",
    separateFiles:true,
    batchSize: 10000,
    useOptimizations: {type: "UNWIND_BATCH", unwindBatchSize: 20}
})
YIELD file, batches, source, format, nodes, relationships, properties, time, rows, batchSize
RETURN file, batches, source, format, nodes, relationships, properties, time, rows, batchSize;