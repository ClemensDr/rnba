export const makeId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
/**
 *
 * @param amount Der Betrag den der Anwender in der Maske eingegeben hat
 * @param oldBudget Die Summe der Ausgaben des alten Budgets
 * @param action Aktion die bestimmt ob die Transaktion erstellt oder bearbeitet wird
 * @param oldTransaction Der alte Wert der Transaktion, muss nur übergeben werden wenn die Transaktion bearbeitet wird
 * @returns integer Entweder das neu berechnete Budget oder der Eingabeparameter amount
 */
export const calculateSpent = (amount, oldBudget, action, oldTransaction = null) => {
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