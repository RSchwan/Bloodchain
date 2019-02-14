# Bloodchain

## Setup

* Manually clone the repo and then run `npm install`.
* Setup a local .env file by running `cp .env.example .env`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Seeding

Run the following command to seed the development database.

```js
adonis seed
```

### Interface to Blockchain
* Create symbolic links from smart contracts ABI's to folder abi with

cd abi
ln -s <Path/to/ConsensusContract.json> ConsensusContract.json
