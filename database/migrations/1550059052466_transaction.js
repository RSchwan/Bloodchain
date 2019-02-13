'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('parent_transaction_id').unsigned().nullable()
      table.string('sample_id')
      table.string('lab_id')
      table.string('action')
      table.string('file_path')
      table.timestamp('created_at')
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
