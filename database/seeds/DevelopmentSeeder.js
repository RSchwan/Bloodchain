'use strict'

/*
|--------------------------------------------------------------------------
| DevelopmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const _ = require('lodash')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Consensus = use('Blockchain/Consensus')

class DevelopmentSeeder {
  randomChoice (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async run () {
    const labs = await Factory.model('App/Models/Lab').createMany(20)
    const samples = await Factory.model('App/Models/Sample').createMany(5)

    await this.asyncForEach(samples, async sample => {
      const revokeKey = _.times(20, () => _.random(35).toString(36)).join('')
      await Consensus.createConsensus(sample.patient_id, revokeKey)
    })

    await this.asyncForEach(samples, async sample => {
      let transaction = null
      for (let i = 0; i < 3; i++) {
        const lab = this.randomChoice(labs);
        await this.asyncForEach(['check-in', 'submission', 'check-out'], async action => {
          transaction = await Factory
            .model('App/Models/Transaction')
            .create({
              parent_transaction_id: transaction ? transaction.id : null,
              sample_id: sample.id,
              lab_id: lab.id,
              action: action
            })
        })
      }

      if (this.randomChoice([true, false])) {
        const lab = this.randomChoice(labs);
        await this.asyncForEach(['check-in', 'submission', 'disposal'], async action => {
          transaction = await Factory
            .model('App/Models/Transaction')
            .create({
              parent_transaction_id: transaction ? transaction.id : null,
              sample_id: sample.id,
              lab_id: lab.id,
              action: action
            })
        })
      }      
    })
  }
}

module.exports = DevelopmentSeeder
