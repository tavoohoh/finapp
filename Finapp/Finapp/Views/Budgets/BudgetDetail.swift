//
//  TransactionsView.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct BudgetDetail: View {
    var budget: Budget
    var transactions: [Transaction]
    
    var body: some View {
        ScrollView {
            HStack {
                Text(ToCurrency(value: budget.amount))
                Text(ToCurrency(value: budget.spent))
            }
            VStack {
                Text("Movements")
                Text("\(transactions.count)")
                TransactionList(transactions: transactions)
            }
        }
        .navigationTitle(budget.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct BudgetDetail_Previews: PreviewProvider {
    static var modelData = ModelData()

    static var previews: some View {
        BudgetDetail(
            budget: modelData.periods[0].budget[0],
            transactions: modelData.transactions
        )
    }
}
