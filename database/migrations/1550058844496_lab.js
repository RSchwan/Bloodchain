'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LabSchema extends Schema {
  up () {
    this.create('labs', (table) => {
      table.string('id').primary()
      table.string('location')
      table.string('type')
    })
  }

  down () {
    this.drop('labs')
  }
}

module.exports = LabSchema
