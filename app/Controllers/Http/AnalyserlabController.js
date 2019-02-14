'use strict'

const Helpers = use('Helpers')

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')
const Transaction = use('App/Models/Transaction')

const Transactions = use('Blockchain/Transactions')

class AnalyserlabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('analyserlab', {
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

    session.flash({ notification: 'Your transaction has been logged' })

    return response.redirect('back')
  }
}

module.exports = AnalyserlabController
