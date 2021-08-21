//
//  BudgetAmountCardStack.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct BudgetAmountCardStack: View {
    var income: Double
    var outcome: Double
    
    var body: some View {
        VStack {
            HStack(spacing: 24) {
                BudgetAmountCard(
                    is_income: true,
                    amount: income
                )
                BudgetAmountCard(
                    is_income: false,
                    amount: outcome
                )
            }
            
            Text("Difference \(ToCurrency(value: income - outcome))")
                .font(.caption)
        }
        .padding()
    }
}

struct BudgetAmountCardStack_Previews: PreviewProvider {
    static var previews: some View {
        BudgetAmountCardStack(
            income: 500000,
            outcome: 345000
        )
    }
}
