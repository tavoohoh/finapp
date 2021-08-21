//
//  Periods.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct PeriodsPage: View {
    @EnvironmentObject var modelData: ModelData
    
    var body: some View {
        NavigationView {
            PeriodList(periods: modelData.periods)
                .navigationTitle("All Periods")
        }
    }
}

struct PeriodsPage_Previews: PreviewProvider {
    static var previews: some View {
        PeriodsPage()
            .environmentObject(ModelData())
    }
}
