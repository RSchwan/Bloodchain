'use strict'

const Sample = use('App/Models/Sample')

const Consensus = use('Blockchain/Consensus')

class AdminController {
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async index ({ view }) {

    const samples = await Sample.query().with('transactions').fetch()

    await this.asyncForEach(samples.rows, async sample => {
      const result = await Consensus.getConsensus(sample.patient_id)
      sample.consent = result['0']
    })

    return view.render('admin', { samples: samples.toJSON() })
  }
}

module.exports = AdminController
