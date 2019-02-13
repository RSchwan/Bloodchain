'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sample extends Model {
  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }
  
  static get incrementing () {
    return false
  }

  transactions () {
    return this.hasMany('App/Models/Transaction')
  }
}

module.exports = Sample
