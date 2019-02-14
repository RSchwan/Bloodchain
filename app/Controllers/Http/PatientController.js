'use strict'

const Consensus = use('Blockchain/Consensus')

class PatientController {
  async index ({ view }) {
    return view.render('patient')
  }

  async store ({ request, response, session }) {
    const data = request.only(['patient_id', 'revoke_key'])

    try {
      await Consensus.revokeConsensus(data.patient_id, data.revoke_key)
      session.flash({ notification: 'Consensus has been revoked' })
    } catch {
      session.flash({ notification: 'Consensus has not been revoked. Consensus Revoke Key is not valid.' })
    }

    return response.redirect('back')
  }
}

module.exports = PatientController
