'use strict'

const _ = require('lodash')

const Helpers = use('Helpers')

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')
const Transaction = use('App/Models/Transaction')

const Consensus = use('Blockchain/Consensus')
const Transactions = use('Blockchain/Transactions')

class SitelabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('sitelab', {
      labs: labs.toJSON(),
      samples: samples.toJSON()
    })
  }

  async store ({ request, response, session }) {
    const data = request.only([
      'lab_id',
      'sample_id',
      'internal_sample_id',
      'action'
    ])

    const patient_id = request.input('patient_id');

    const sample = await Sample.find(request.input('sample_id'))
    sample.patient_id = patient_id
    await sample.save()

    const revokeKey = _.times(20, () => _.random(35).toString(36)).join('')
    await Consensus.createConsensus(patient_id, revokeKey)
    session.flash({ notification: `Consensus Revoke Key for patient ${patient_id}: ${revokeKey}` })
    
    const parentTransaction = await Transaction
                                      .query()
                                      .where('sample_id', data.sample_id)
                                      .orderBy('id', 'desc')
                                      .first();

    let transaction = await Transaction.create({
      ...data,
      parent_transaction_id: parentTransaction ? parentTransaction.id : null
    })

    const file = request.file('file')
    if (file) {
      const newFileName = `${transaction.id}_${file.clientName}`
      await file.move(Helpers.tmpPath(), {
        name: newFileName
      })

      transaction.file_path = newFileName
      await transaction.save()  
    }

    transaction = await Transaction.find(transaction.id)
    await Transactions.addTransaction(transaction.id, await transaction.calculateTransactionHash())

    return response.redirect('back')
  }
}

module.exports = SitelabController
