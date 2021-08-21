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
    
    var period: Period
    
    var body: some View {
        ScrollView {
            HStack(spacing: 24) {
                BudgetAmountCard(
                    is_income: true,
                    amount: period.total_income
                )
                BudgetAmountCard(
                    is_income: false,
                    amount: period.total_expenses
                )
            }
            .padding()
        }
        .navigationTitle("Period")
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
