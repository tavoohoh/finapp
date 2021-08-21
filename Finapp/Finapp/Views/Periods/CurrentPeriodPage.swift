//
//  CurrentPeriodPage.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct CurrentPeriodPage: View {
    @EnvironmentObject var modelData: ModelData
    
    var body: some View {
        NavigationView {
            PeriodPage(
                period: modelData.currentPeriod,
                title: "Current Period"
            )
        }
    }
}

struct CurrentPeriodPage_Previews: PreviewProvider {
    static var previews: some View {
        CurrentPeriodPage()
            .environmentObject(ModelData())
    }
}
