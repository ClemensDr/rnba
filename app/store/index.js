import React from 'react'
import {AsyncStorage} from 'react-native'

const BUDGET_KEY = 'RNBAGlobalStore:Budgets'
const TRANSACTION_KEY = 'RNBAGlobalStore:Transactions'

export default {
    async getAllBudgets(){
        try {
            const budgets = await AsyncStorage.getItem(BUDGET_KEY)
            if (budgets) {
                return JSON.parse(budgets)
            } else {
                return {data: []}
            }
        } catch (error) {
            console.log(error)
            Promise.reject()
        }
    },

    async saveBudget(budget){
        this.getAllBudgets()
            .then((budgets) => {
            console.log(budgets)
                budgets.data.push(budget)
                AsyncStorage.mergeItem(BUDGET_KEY, JSON.stringify(budgets))
            })
    }
}
