'use strict';

import Realm from 'realm'

class Budget extends Realm.Object {}
Budget.schema = {
    name: 'Budget',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        value: 'float',
        spent: {type: 'float', default: 0},
        transactions: {type: 'linkingObjects', objectType: 'Transaction', property: 'budget'}
    }
}

class Transaction extends Realm.Object {}
Transaction.schema = {
    name: 'Transaction',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        budget: 'Budget',
        type: 'string',
        account: 'string',
        value: 'float',
        note: {type: 'string', default: ''},
        date: 'date',
        receipt: {type: 'string', optional: true}
    }
}

export default new Realm({schema: [Budget, Transaction]})
