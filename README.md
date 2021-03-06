# Bloodchain - An administration tool for clinical studies
# Overview 
The main objective of this hackathon project is to propose a solution for a clinical trial sponsor (e.g. a pharma company) allowing them to have a real-time overview of the lifecycle of samples that are taken from patients during a clinical trials.  Currently this is a manual and very time-consuming process that relies on Excel/Word, emails and phone calls to get the information needed and to resolve issues. 
The objective of the challenge is to show how a solution can be created that makes use of blockchain technology to manage the chain of custody of the end-to-end lifecycle of samples as they move from one laboratory to another while tracking basic sample information for each step. In addition to that the proposed solution offers the possibility to the patient to revoke his consent that gives the permission to a given company to conduct tests on his sample. The status of the consent of a given patient is securely stored on the blockchain, so that that once the status is modified it will be always visible. 

# Sustainability
![alt text](https://github.com/RSchwan/Bloodchain/blob/master/img/SustainabilityGoals.png)
Within the proposed bloodchain development, many sustainable goals set by the UN have been fulfilled or addressed. For instance, naturally the core service is revolved around improving health and well-being (goal 3), yet, this development is considered as the first step to build a digital infrastructure for the future of the blockchain for medical application. With the prospect of process simplification, it can encourage innovation, and economic growth (goal 8 and 9). The economical growth can be via cost effective process, which consequently increases the investment for further innovation projects to improve health and well-being and reduce inequality globally (goal 10). Furthermore, bloodchain development can lead to strengthen sustainable consumption of medical sample and production patterns in order to develop the drug/treatment in a focused effective approach (goal 12).

# Features
Bloodchain runs on a single webserver, which communicates with a centralized database and the blockchain. It can be accessed using a common browser, to make use of the functionalities listed below:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp; Submission of actions taken upon a sample.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp; Trace all actions taken upon on a sample in an admin tool.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.&nbsp; Avoid a posteriori modification of clinical results thanks to block chain and database link.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.&nbsp; Patient can revoke the consent of partcipating at the clinical study at any given time.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.&nbsp; Status of the consent of the patient is securely stored on the blockchain.

#### Submission Interface
![alt text](https://github.com/RSchwan/Bloodchain/blob/master/img/SubmissionInterface.png)
This interface will be used for a multitude of actions taken upon a sample. A non-exhaustive list of examples is listed below.
- The sample is packaged and prepared for transportation to another laboratorory or a clinical site. Many samples are handled in a container. Similiar to a sample, a container as well as other components that come into play during transportation have an ID which is linked to a transaction and can be entered in the webinterface.
- The sample arrives it's destination and prepared for further processing.
- Blood is taken from a patient and stored in the sample.
- Different components of the blood are split apart for further processing.
- Actual analysis of the blood takes place.
#### Admin tool
The admin tool allows to view the history of a sample. Upon a page request, the webserver takes the requested data from a centralized database. It hashes all the requested transaction and compared the hashes to the hashes stored on the blockchain. If they mismatch, it will be visible in the webinterface.
In such a case further investigation is required to figure out, why data on the centralized database have been modified.
Another important functionality of the admin tool is to let researchers and lab employees see, when a patient has revoked his consent.<br>
![alt text](https://github.com/RSchwan/Bloodchain/blob/master/img/AdminInterface.png)
#### Patient tool
A dedicated webinterface allows patients to revoke their consent of their samples being processed any further. A patient has a unique patient ID and a secret password, which he needs to revoke his consent.
**Note:** It is not possible for a patient or anyone else to reactivate a patients consent when it has been revoked. This is embedded in the smart contract.<br>
See ConsensusContract.sol for further information.
![alt text](https://github.com/RSchwan/Bloodchain/blob/master/img/PatientInterface.png)

# Blockchain 
The use of the blockchain in this project is of central importance, in fact the blockchain enables to store data safely, ensuring that once stored no consequent modification is possible. 
In the project the Ethereum Blockchain is used for storing two important data in the sample process: 
- The patient consent, which gives the permission of running test on the patient sample 
- Each single transaction (and the hash of its metadata) that is applied to a given sample

The first storage (patient's consent) gives the patient a safety system that detects each change on the status of the consent (true or false). In this way if the patient decide to withdraw his consent to the analysis on its sample at a certain point, but the action is ingnored by the clinical trial sponsor, the patient has a public proof (on the blockchain) that his consent was absent. 
The second storage ensures that the history of each samples (list of transactions) is securely stored on the blockchain and that after a given transaction is submitted through the webinterface no modfication of that transaction or the metadata attached to it (as for example the results of a given test) is possible. This ensures the tracking of each samples, which cannot be modified once setted.  
# Demo
![alt text](https://github.com/RSchwan/Bloodchain/blob/master/img/Demo.gif)

# Software Setup

* Clone repo.
* Install dependencies: `npm install`.
* Setup a local .env file by running `cp .env.example .env`.
* Make sure you have installed AdonisJs CLI: `npm i -g @adonisjs/cli`.
* Make sure you habe installed Truffle and Ganache: https://www.truffleframework.com/

### Migrations

Run the following command to apply database migrations.

```
adonis migration:run
```

### Setup Local Blockchain

* Start Ganache
* Cd into `truffle` folder: `cd truffle`
* Compile contracts: `truffle compile`
* Deploy contracts: `truffle deploy`
* Set `NODE_ADDRESS` in `.env` to the address of the account which created the contracts
* Set `CONSENSUS_CONTRACT_ADDRESS` in `.env` to the address of the `ConsensusContract` contract
* Set `TRANSACTIONS_CONTRACT_ADDRESS` in `.env` to the address of the `Transactions` contract

### Seeding

Run the following command to seed the development database.

```
adonis seed
```

### Development Server

Run the following command to start a development server.

```
adonis serve --dev
```
Run the following command to seed the development database.

```js
adonis seed
```
