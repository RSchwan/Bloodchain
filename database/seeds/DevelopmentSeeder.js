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
    const labs = [
        await Factory.model('App/Models/Lab').create({id: 'Zurich'}),
        await Factory.model('App/Models/Lab').create({id: 'Bern'}),
        await Factory.model('App/Models/Lab').create({id: 'Geneva'}),
        await Factory.model('App/Models/Lab').create({id: 'Biel'}),
        await Factory.model('App/Models/Lab').create({id: 'Lausanne'}),
        await Factory.model('App/Models/Lab').create({id: 'Lugano'}),
        await Factory.model('App/Models/Lab').create({id: 'Luzern'})
    ];
    const samples = [
        await Factory.model('App/Models/Sample').create({id: '168600', patient_id: '105733'}),
        await Factory.model('App/Models/Sample').create({id: '104997', patient_id: '836518'}),
        await Factory.model('App/Models/Sample').create({id: '194818', patient_id: '739563'}),
        await Factory.model('App/Models/Sample').create({id: '124045', patient_id: '234975'}),
        await Factory.model('App/Models/Sample').create({id: '148933', patient_id: '907123'}),
        await Factory.model('App/Models/Sample').create({id: '165070', patient_id: '536551'}),
        await Factory.model('App/Models/Sample').create({id: '187395', patient_id: '200357'})
    ];

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
