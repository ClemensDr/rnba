'use strict';

/**
 * Implementierung der Datenbank Schnittstelle
 */

import Realm from 'realm'

/**
 * Schema für ein Budget
 */
class Budget extends Realm.Object {}
Budget.schema = {
    name: 'Budget',
    primaryKey: 'id',
    properties: {
        //Felder der Datenbanktabelle
        id: 'string',
        name: 'string',
        value: 'float',
        spent: {type: 'float', default: 0},
        //1-n Beziehung zwischen einem Budget und seinen Transaktionen
        transactions: {type: 'linkingObjects', objectType: 'Transaction', property: 'budget'}
    }
}

/**
 * Schema für eine Transaktion
 */
class Transaction extends Realm.Object {}
Transaction.schema = {
    name: 'Transaction',
    primaryKey: 'id',
    properties: {
        //Felder der Datenbanktabelle
        id: 'string',
        name: 'string',
        budget: 'Budget',
        type: 'string',
        account: 'string',
        value: 'float',
        note: {type: 'string', default: ''},
        date: 'date',
        //n-1 Beziehung zwischen einer Transaktion und ihrem zugehörigen Budget
        receipt: {type: 'string', optional: true}
    }
}

// Die Datei exportiert eine neue Realm Instanz mit den oben definierten Schemata
export default new Realm({schema: [Budget, Transaction]})
