'use strict'

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')

class SitelabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('sitelab', {
      labs: labs.toJSON(),
      samples: samples.toJSON()
    })
  }
}

module.exports = SitelabController
