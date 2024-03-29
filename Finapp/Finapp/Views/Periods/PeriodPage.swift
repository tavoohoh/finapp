//
//  Budget.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct PeriodPage: View {
    @State private var showActionSheet = false
    @State private var showEditSheet = false
    
    var period: Period = ModelData().periods[0]
    var title: String = "Period"
    
    var body: some View {
        VStack {
            BudgetAmountCardStack(
                income: period.total_income,
                outcome: period.total_expenses
            )
            
            BudgetList(budgets: period.budget)
        }
        .navigationTitle(title)
        .toolbar {
            Button(action: { showActionSheet.toggle() }) {
                Text("Actions")
            }
        }
        .actionSheet(isPresented: $showActionSheet, content: {
            ActionSheet(
                title: Text("Actions"),
                message: Text("Select a Period action"),
                buttons: [
                    .default(Text("Terminate")),
                    .default(Text("Edit")),
                    .cancel()
                ]
            )
        })
        .sheet(isPresented: $showEditSheet) {
            Text("Actions here")
        }
    }
}

struct PeriodPage_Previews: PreviewProvider {
    static var period = ModelData().periods[0]
    
    static var previews: some View {
        PeriodPage(period: period)
    }
}
