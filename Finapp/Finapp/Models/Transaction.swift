//
//  Transaction.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import Foundation

struct Transaction: Codable, Hashable, Identifiable {
    var is_income: Bool
    var date: String
    var name: String
    var amount: Double
    var period_id: String
    var budget: String
    var id: String
}
