//
//  BudgetList.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct BudgetList: View {
    var budgets: [Budget]
    
    var body: some View {
        List {
            Section (header: Text("Budget")) {
                ForEach(budgets) { budget in
                    BudgetRow(budget: budget)
                }
            }
        }
        .listStyle(InsetGroupedListStyle())

    }
}

struct BudgetList_Previews: PreviewProvider {
    static var budgets: [Budget] = ModelData().periods[0].budget

    static var previews: some View {
        BudgetList(budgets: budgets)
    }
}
