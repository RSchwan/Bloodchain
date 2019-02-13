'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SampleSchema extends Schema {
  up () {
    this.create('samples', (table) => {
      table.string('id').primary()
      table.string('patient_id')
      table.string('type')
    })
  }

  down () {
    this.drop('samples')
  }
}

module.exports = SampleSchema
