import realm from './realm'

const makeId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/**
 * @param amount Der Betrag den der Anwender in der Maske eingegeben hat
 * @param budgetSpent Die Summe der Ausgaben des Budgets
 * @param oldAmount Der alte Wert der Transaktion, muss nur übergeben werden wenn die Transaktion bearbeitet wird
 * @returns integer Entweder das neu berechnete Budget oder der Eingabeparameter amount
 */
const calculateUpdatedBudget = (amount, oldAmount, budgetSpent, type) => {
    if(type === 'E'){
        if (amount < oldAmount) {
            return budgetSpent - (oldAmount - amount)
        }
        else {
            return budgetSpent + (amount - oldAmount)
        }
    } else {
        if(amount < oldAmount){
            return budgetSpent + (oldAmount - amount)
        } else {
            return budgetSpent - (amount - oldAmount)
        }
    }
    return oldAmount
}

export const getTransactionById = (id) => {
    try{
        const transaction = realm.objectForPrimaryKey('Transaction', id)
        return transaction
    } catch(e){
        return {budget: {}, value: 0}
    }
}


export const createTransaction = (transaction) => {
    //make id
    const id = makeId()
    //get budget
    const budgetObj = realm.objectForPrimaryKey('Budget', transaction.budget)
    //set them on transaction
    transaction.id = id
    transaction.budget = budgetObj

    try {
        realm.write(() => {
            //save transaction
            realm.create('Transaction', transaction)

            //modify budget with transaction value
            if (transaction.type === 'E') {
                transaction.budget.spent += transaction.value
            } else {
                transaction.budget.spent -= transaction.value
            }
        })
        return true
    } catch (e) {
        return false
    }
}

export const updateTransaction = (transaction, data) => {
    const budgetObj = realm.objectForPrimaryKey('Budget', data.budget)
    const oldAmount = transaction.value
    try {
        realm.write(() => {
            //update values
            transaction.name = data.name
            transaction.account = data.account
            transaction.value = data.value
            transaction.note = data.note
            transaction.date = data.date
            transaction.receipt = data.receipt
            // calculate new budget
            if(budgetObj.id !== transaction.budget.id){
                if(transaction.type === 'E'){
                    transaction.budget.spent -= transaction.value
                    budgetObj.spent += data.value
                } else {
                    transaction.budget.spent += transaction.value
                    budgetObj.spent -= data.value
                }
                transaction.budget = budgetObj
            } else {
                transaction.budget.spent = calculateUpdatedBudget(data.value, oldAmount, transaction.budget.spent, transaction.type)
            }
        })
        return true
    } catch (e) {
        console.warn(e.message)
        return false
    }

}

export const deleteTransaktion = (transaction) => {
    try {
        realm.write(() => {
            if(transaction.type === 'E'){
                transaction.budget.spent -= transaction.value
            } else {
                transaction.budget.spent += transaction.value
            }
            realm.delete(transaction)
        })
        return true
    } catch (e){
        //console.warn(e.message)
        return false
    }
}

export const createBudget = (budget) => {
    const id = makeId()
    budget.id = id
    try {
        realm.write(() => {
            realm.create('Budget', budget)
        })
        return true
    } catch(e){
        return false
    }
}
