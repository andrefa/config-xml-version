const fs = require('fs')
const xml2js = require('xml2js')

// return xml file content
const readFile = (fileName) => fs.readFileSync(fileName, 'utf8')

// return xml parsed
const parseXml = (content) => {
  const parser = new xml2js.Parser()
  return parser.parseStringPromise(content)
}

// return xml with updated version
const updateVersion = (xml, newVersion) => {
  const updatedXml = JSON.parse(JSON.stringify(xml))
  updatedXml.widget.$.version = newVersion
  return updatedXml
}

const writeXml = (xml, fileName, indent) => {
  const builder = new xml2js.Builder({
    renderOpts: {
      pretty: true,
      indent,
      newline: '\n'
    },
    xmldec : {
      standalone: null,
      encoding: 'utf-8'
    }
  })
  const content = builder.buildObject(xml)
  fs.writeFileSync(fileName, `${content}\n`, { flag: 'w' })
}

const run = async (parameters) => {
  const content = readFile(parameters.sourceFile)
  const xml = await parseXml(content)
  const updatedXml = await updateVersion(xml, parameters.version)
  writeXml(updatedXml, parameters.destFile, parameters.indentation)
}

module.exports = {
  readFile,
  parseXml,
  updateVersion,
  writeXml,
  run
}
