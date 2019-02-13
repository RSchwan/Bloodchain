'use strict'

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')

class AnalyserlabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('analyserlab', {
      labs: labs.toJSON(),
      samples: samples.toJSON()
    })
  }
}

module.exports = AnalyserlabController
