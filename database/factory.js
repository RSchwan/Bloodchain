'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Sample', (faker, _, data) => {
  return {
    id: faker.string({length: 16}),
    patient_id: faker.string({length: 16}),
    type: faker.pickone(['blood', 'saliva', 'tissue']),
    ...data
  }
})

Factory.blueprint('App/Models/Lab', (faker, _, data) => {
  return {
    id: faker.string({length: 16}),
    location: faker.address(),
    type: faker.pickone(['oc lab', 'result lab', 'central lab']),
    ...data
  }
})

Factory.blueprint('App/Models/Transaction', (faker, _, data) => {
  return {
    action: faker.pickone(['check-in', 'submission', 'check-out', 'disposal']),
    ...data
  }
})
