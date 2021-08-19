//
//  Budget.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import Foundation

struct Budget: Codable, Hashable, Identifiable {
    var id: String
    var name: String
    var amount: Double
    var spent: Double
    var enabled: Bool
}
