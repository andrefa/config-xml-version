const fs = require('fs')
const chai = require('chai')
const configXmlVersion = require('../src/config-xml-version')

const expect = chai.expect

const validXml = `
<?xml version="1.0" encoding="utf-8"?>
<widget version="1.0.0">
    <name>Test</name>
</widget>
`

const validJson = { widget: { '$': { version: '1.0.0' }, name: [ 'Test' ] } }

describe('config-xml-version', () => {

  it('expect it to read xml file', async () => {
    const content = configXmlVersion.readFile('test/valid.xml')

    expect(content.trim()).to.equal(validXml.trim())
  })

  it('expect it to properly parse the xml', async () => {
    const readXml = await configXmlVersion.parseXml(validXml)

    expect(readXml).to.deep.equal(validJson)
  })

  it('expect xml to use informed version', () => {
    const newVersion = '11.22.33'
    const updatedXml = configXmlVersion.updateVersion(validJson, newVersion)

    expect(updatedXml.widget.$.version).to.equal(newVersion)
  })

  it('expect updateVersion to not cause side effects', () => {
    const originalVersion = 1
    const xml = { widget: { '$': { version: originalVersion } } }
    const newVersion = '11.22.33'

    configXmlVersion.updateVersion(xml, newVersion)

    expect(xml.widget.$.version).to.equal(originalVersion)
  })

  it('expect it to write xml file, 2 spaces indentation', () => {
    const tempFile = `${new Date}.writetest.xml`
    configXmlVersion.writeXml(validJson, tempFile, '  ')

    expect(fs.readFileSync(tempFile, 'utf8').trim()).to.equal(validXml.replace(/[ ]{2}/g, ' ').trim())

    fs.unlinkSync(tempFile)
  })

  it('expect it to write xml file, 4 spaces indentation', () => {
    const tempFile = `${new Date}.writetest.xml`
    configXmlVersion.writeXml(validJson, tempFile, '    ')

    expect(fs.readFileSync(tempFile, 'utf8').trim()).to.equal(validXml.trim())

    fs.unlinkSync(tempFile)
  })

})
