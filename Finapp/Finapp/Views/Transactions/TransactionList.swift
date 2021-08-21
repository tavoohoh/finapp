//
//  TransactionListView.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct TransactionList: View {
    var transactions: [Transaction]
    
    var body: some View {
        List {
            Section(
                header: Text("Movements")) {
                ForEach(transactions) { transaction in
                    TransactionRow(transaction: transaction)
                }
            }
        }
    }
}

struct TransactionList_Previews: PreviewProvider {
    static var transactions = ModelData().transactions

    static var previews: some View {
        TransactionList(transactions: transactions)
    }
}
