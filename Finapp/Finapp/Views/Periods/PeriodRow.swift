//
//  PeriodRow.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import SwiftUI

struct PeriodRow: View {
    var period: Period
    
    var body: some View {
        NavigationLink(destination: PeriodPage(period: period)) {
            HStack {
                Text(period.date_start)
                    .font(.callout)
                    .bold()
                Spacer()
                Text(ToCurrency(value: period.total_expenses))
                    .font(.footnote)
                    .multilineTextAlignment(.trailing)
            }
        }
    }
}

struct PeriodRow_Previews: PreviewProvider {
    static var period = ModelData().periods[0]

    static var previews: some View {
        PeriodRow(period: period)
    }
}
