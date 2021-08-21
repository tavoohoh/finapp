//
//  ListView.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import SwiftUI

struct TransactionRow: View {
    var transaction: Transaction
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(transaction.name)
                    .font(.callout)
                    .bold()
                Text(transaction.date)
                    .font(.caption)
            }
            Spacer()
            Text(ToCurrency(value: transaction.amount))
                .font(.footnote)
                .multilineTextAlignment(.trailing)
        }
    }
}

struct TransactionRow_Previews: PreviewProvider {
    static var transactions = ModelData().transactions
    
    static var previews: some View {
        Group {
            TransactionRow(transaction: transactions[0])
        }
    }
    
}
