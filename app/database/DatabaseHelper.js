/**
 * Abstraktion der Datenbankoperationen in eigene Funktionen
 */

import realm from './realm'

/**
 * Generiert eine zufällige zehnstellige ID als einzigartigen Schlüssel für eine Entität
 * @returns {string} Generierte ID
 */
const makeId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/**
 * Berechnet die Höhe der Ausgaben eines Budgets in Relation zum vorherigen Wert
 *
 * @param amount Der Betrag den der Anwender in der Maske eingegeben hat
 * @param budgetSpent Die Summe der Ausgaben des Budgets
 * @param oldAmount Der alte Wert der Transaktion, muss nur übergeben werden wenn die Transaktion bearbeitet wird
 * @returns integer Entweder das neu berechnete Budget oder der Eingabeparameter amount
 */
const calculateUpdatedBudget = (amount, oldAmount, budgetSpent, type) => {
    if (type === 'E') {
        if (amount < oldAmount) {
            return budgetSpent - (oldAmount - amount)
        }
        else {
            return budgetSpent + (amount - oldAmount)
        }
    } else {
        if (amount < oldAmount) {
            return budgetSpent + (oldAmount - amount)
        } else {
            return budgetSpent - (amount - oldAmount)
        }
    }
    return oldAmount
}

/**
 * Speichert eine Transaktion in der Datenbank
 *
 * @param transaction Objekt mit allen Daten die für eine Transaktion benötigt werden
 * @returns {boolean} Gibt true zurück wenn die Speicherung erfolgreich war, sonst false
 */
export const createTransaction = (transaction) => {
    //ID erzeugen
    const id = makeId()
    //Budget laden
    const budgetObj = realm.objectForPrimaryKey('Budget', transaction.budget)
    //Budget und ID der Transaktion zuweisen
    transaction.id = id
    transaction.budget = budgetObj

    try {
        realm.write(() => {
            //Transaktion in die Datenbank schreiben
            realm.create('Transaction', transaction)

            //Die Höhe der Ausgaben des Budgets anpassen
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

/**
 * Aktualisiert eine Transaktion in der Datenbank
 *
 * @param transaction Die Transaktion die aktualisiert wird
 * @param data Die geänderten Daten der Transaktion
 * @returns {boolean} Gibt true zurück wenn die Speicherung erfolgreich war, sonst false
 */
export const updateTransaction = (transaction, data) => {
    const budgetObj = realm.objectForPrimaryKey('Budget', data.budget)
    const oldAmount = transaction.value
    try {
        realm.write(() => {
            //Werte der Transaktion aktualisieren
            transaction.name = data.name
            transaction.account = data.account
            transaction.value = data.value
            transaction.note = data.note
            transaction.date = data.date
            transaction.receipt = data.receipt
            // Berechnung der neuen Wertes im Budget
            if (budgetObj.id !== transaction.budget.id) {
                if (transaction.type === 'E') {
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
/**
 * Löscht eine Transaktion in der Datenbank
 * Wird nicht verwendet da eine Löschung im Moment nicht möglich ist
 *
 * @param transaction Transaktion die gelöscht werden soll
 * @returns {boolean} Gibt true zurück wenn die Löschung erfolgreich war, sonst false
 */
export const deleteTransaktion = (transaction) => {
    try {
        realm.write(() => {
            if (transaction.type === 'E') {
                transaction.budget.spent -= transaction.value
            } else {
                transaction.budget.spent += transaction.value
            }
            realm.delete(transaction)
        })
        return true
    } catch (e) {
        //console.warn(e.message)
        return false
    }
}

/**
 * Speichert ein neues Budget in der Datenbank
 *
 * @param budget Das Budget das gespeichert werden soll
 * @returns {boolean} Gibt true zurück wenn die Speicherung erfolgreich war, sonst false
 */
export const createBudget = (budget) => {
    const id = makeId()
    budget.id = id
    try {
        realm.write(() => {
            realm.create('Budget', budget)
        })
        return true
    } catch (e) {
        return false
    }
}

/**
 * Aktualisiert ein Budget in der Datenbank
 *
 * @param budget Budget Objekt das aktualisiert werden soll
 * @param data Geänderte Daten des Budgets
 * @returns {boolean} Gibt true zurück wenn die Speicherung erfolgreich war, sonst false
 */
export const updateBudget = (budget, data) => {
    try {
        realm.write(() => {
            budget.name = data.name
            budget.value = data.value
        })
        return true
    } catch(e){
        return false
    }
}
