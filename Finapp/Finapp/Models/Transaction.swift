//
//  Transaction.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import Foundation

struct Transaction: Codable, Hashable, Identifiable {
    var id: String
    var budget: String
    var name: String
    var amount: Double
    var period_id: String
    var date: String
}
