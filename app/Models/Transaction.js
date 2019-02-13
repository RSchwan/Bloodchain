'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
  static get updatedAtColumn () {
    return null
  }

  lab () {
    return this.belongsTo('App/Models/Lab')
  }

  sample () {
    return this.belongsTo('App/Models/Sample')
  }
}

module.exports = Transaction
