import { createWriteStream } from 'fs'


const schema = {
    Product: {
        id: "string",
        name: "string",
        bool: "boolean",
    },
    Store: {
        id: "number",
        name: "string",
    },
}


var logger = createWriteStream('src/core/models/test/test.ts')

Object.entries(schema).map(([key, value]) => {
    logger.write(`//----${key}----//`)

    logger.write(`\nexport interface ${key} {`)

    Object.entries(value).map(([key, value]) => logger.write(`\n\t${key}: ${value}`))
    logger.write(`\n}`)

    logger.write(`\n\nexport interface ${key}Request {`)
    Object.entries(value).map(([key, value]) => key !== "id" && logger.write(`\n\t${key}: ${value}`))
    logger.write(`\n}`)

    logger.write(`\n\nexport interface ${key}InsertRequest {`)
    logger.write(`\n\t${key.toLowerCase()}: ${key}Request`)
    logger.write(`\n}`)

    logger.write(`\n\nexport interface ${key}UpdateRequest {`)
    logger.write(`\n\t id: ${value["id"]}`)
    logger.write(`\n\t${key.toLowerCase()}: ${key}Request`)
    logger.write(`\n}`)

    logger.write(`\n\nexport interface ${key}DeleteRequest {`)
    logger.write(`\n\t id: ${value["id"]}`)
    logger.write(`\n}`)

    logger.write(`\n\nexport interface ${key}ShowRequest {`)
    logger.write(`\n\t id: ${value["id"]}`)
    logger.write(`\n}\n\n`)
})
logger.end()


