//
//  BudgetRow.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct BudgetRow: View {
    var budget: Budget
    
    var body: some View {
        NavigationLink(destination: BudgetDetailPage(budget: budget)) {
            HStack {
                Text(budget.name)
                    .font(.callout)
                    .bold()
                Spacer()
                Text(ToCurrency(value: budget.amount))
                    .font(.footnote)
                    .multilineTextAlignment(.trailing)
            }
        }
    }
}

struct BudgetRow_Previews: PreviewProvider {
    static var budget: Budget = ModelData().periods[0].budget[0]
    
    static var previews: some View {
        BudgetRow(budget: budget)
    }
}
