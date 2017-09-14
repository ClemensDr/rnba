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
 * @param oldBudget Die Summe der Ausgaben des alten Budgets
 * @param action Aktion die bestimmt ob die Transaktion erstellt oder bearbeitet wird
 * @param oldTransaction Der alte Wert der Transaktion, muss nur übergeben werden wenn die Transaktion bearbeitet wird
 * @returns integer Entweder das neu berechnete Budget oder der Eingabeparameter amount
 */
const calculateSpent = (amount, oldBudget, action, oldTransaction = null) => {
    if(action === 'create'){
        return oldBudget + amount
    }
    if(action === 'edit' && oldTransaction){
        if(amount < oldTransaction){
            return oldBudget - (oldTransaction - amount)
        }
        else {
            return oldBudget + (amount - oldTransaction)
        }
    }
    return oldBudget
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
            if(transaction.type === 'E'){
                transaction.budget.spent += transaction.value
            } else {
                transaction.budget.spent -= transaction.value
            }
        })
        return true
    } catch(e){
        return false
    }
}