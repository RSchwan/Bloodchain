'use strict'

const Sample = use('App/Models/Sample')

const Consensus = use('Blockchain/Consensus')
const Transactions = use('Blockchain/Transactions')

class AdminController {
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async index ({ view }) {

    const samples = await Sample.query().with('transactions').fetch()

    const matchMap = {}

    await this.asyncForEach(samples.rows, async sample => {
      const result = await Consensus.getConsensus(sample.patient_id)
      sample.consent = result['0']

      await this.asyncForEach((await sample.transactions().fetch()).rows, async transaction => {
        const localHash = await transaction.calculateTransactionHash()
        const remoteHash = await Transactions.getHash(transaction.id)
        matchMap[transaction.id] = localHash === remoteHash
        console.log(remoteHash)
      })
    })

    const JSONSamples = samples.toJSON()
    JSONSamples.forEach(sample => {
      sample.transactions.forEach(transaction => {
        transaction.hashMatch = matchMap[transaction.id]
      })
    })

    return view.render('admin', { samples: JSONSamples })
  }
}

module.exports = AdminController
