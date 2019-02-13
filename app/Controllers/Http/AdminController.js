'use strict'

const Sample = use('App/Models/Sample')

class AdminController {
  async index ({ view }) {

    const samples = await Sample.query().with('transactions').fetch()

    return view.render('admin', { samples: samples.toJSON() })
  }
}

module.exports = AdminController
