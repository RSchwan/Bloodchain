'use strict'

const Lab = use('App/Models/Lab')
const Sample = use('App/Models/Sample')
const Transaction = use('App/Models/Transaction')

class SitelabController {
  async index ({ view }) {

    const labs = await Lab.all()
    const samples = await Sample.all()

    return view.render('sitelab', {
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

    const sample = await Sample.find(request.input('sample_id'))
    sample.patient_id = request.input('patient_id')
    await sample.save()
    
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
    if (file) {
      const newFileName = `${transaction.id}_${file.clientName}`
      await Drive.put(newFileName, file)

      transaction.file_path = newFileName
      await transaction.save()  
    }

    return response.redirect('back')
  }
}

module.exports = SitelabController