//
//  BudgetAmountCard.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct BudgetAmountCard: View {
    var is_income: Bool
    var amount: Double
    
    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(ToCurrency(value: amount))
                .font(.headline)
                .bold()
            Text(is_income ? "Income" : "Expenses")
                .font(.subheadline)
                .foregroundColor(is_income ? Color.green : Color.red)
                .bold()
        }
        .frame(minWidth: 0, maxWidth: .infinity)
        .padding()
        .background(Color(UIColor.systemGray6))
        .cornerRadius(12)
    }
}

struct BudgetAmountCard_Previews: PreviewProvider {
    static var previews: some View {
        BudgetAmountCard(
            is_income: true,
            amount: 13250000
        )
    }
}
