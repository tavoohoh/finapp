//
//  period.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import Foundation

struct Period: Codable, Hashable, Identifiable {
    var date_end: String
    var total_income: Double
    var difference: Double
    var date_start: String
    var total_expenses: Double
    var is_latest: Bool
    var total_savings: Double
    var is_active: Bool
    var budget: [Budget]
    var id: String
}
