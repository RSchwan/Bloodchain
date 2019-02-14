'use strict'

const path = require('path')

const { Consensus } = require('../lib3')

const { ServiceProvider } = require('@adonisjs/fold')

class BlockchainProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Blockchain/Consensus', () => {
      const Env = this.app.use('Adonis/Src/Env')
      Consensus.init(
        Env.get('CONSENSUS_CONTRACT_ADDRESS'),
        Env.get('NODE_ADDRESS'),
        path.join(__dirname, '..', 'truffle', 'build', 'contracts', 'ConsensusContract.json'),
        Env.get('PROVIDER_ADDRESS')
      )
      return Consensus
    })
  }
}

module.exports = BlockchainProvider
