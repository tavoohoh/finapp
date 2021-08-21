//
//  BudgetDetailPage.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct BudgetDetailPage: View {
    @State private var showActionSheet = false
    @State private var showEditSheet = false
    @EnvironmentObject var modelData: ModelData
    
    var budget: Budget
    
    var body: some View {
        VStack {
            BudgetAmountCardStack(
                income: budget.amount,
                outcome: budget.spent
            )
            
            TransactionList(transactions: modelData.transactions)
        }
        .navigationTitle(budget.name)
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

struct BudgetDetailPage_Previews: PreviewProvider {
    static var budget: Budget = ModelData().currentPeriod.budget[0]
    
    static var previews: some View {
        BudgetDetailPage(
            budget: budget
        )
        .environmentObject(ModelData())
    }
}
