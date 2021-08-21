//
//  PeriodList.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct PeriodList: View {
    var periods: [Period]
    
    var body: some View {
        List {
            Section (header: Text("Periods")) {
                ForEach(periods) { period in
                    PeriodRow(period: period)
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
        
    }
}

struct PeriodList_Previews: PreviewProvider {
    static var periods = ModelData().periods
    
    static var previews: some View {
        PeriodList(periods: periods)
    }
}
