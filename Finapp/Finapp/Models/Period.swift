//
//  period.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import Foundation

struct Period: Codable, Hashable, Identifiable {
    var id: String
    var date_start: String
    var is_active: Bool
    var is_latest: Bool
    var total_income: Double
    var total_expenses: Double
    var difference: Double
    var total_savings: Double
    var date_end: String
    var budget: [Budget]
}
