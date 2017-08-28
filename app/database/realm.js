'use strict';

import Realm from 'realm'

class Budget extends Realm.Object {}
Budget.schema = {
    name: 'Budget',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        value: 'float'
    }
}

export default new Realm({schema: [Budget]})
