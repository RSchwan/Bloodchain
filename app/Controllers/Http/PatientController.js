'use strict'

class PatientController {
  async index ({ view }) {
    return view.render('patient')
  }

  async store ({ request, response }) {
    const data = request.only(['patient_id', 'revoke_key'])

    console.log(data)

    return response.redirect('back')
  }
}

module.exports = PatientController
