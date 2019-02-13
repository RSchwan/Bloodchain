'use strict'

const Drive = use('Drive')

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')
const Transaction = use('App/Models/Transaction')

class AnalyserlabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('analyserlab', {
      labs: labs.toJSON(),
      samples: samples.toJSON()
    })
  }

  async store ({ request, response }) {
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

      const transaction = await Transaction.create({
        ...data,
        parent_transaction_id: parentTransaction.id
      })

      const file = request.file('file')
      const newFileName = `${transaction.id}_${file.clientName}`
      await Drive.put(newFileName, file)

      transaction.file_path = newFileName
      transaction.save()

      return response.redirect('back')
  }
}

module.exports = AnalyserlabController
