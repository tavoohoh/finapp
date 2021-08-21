//
//  CurrencyFormatter.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import Foundation

func ToCurrency(value: Double) -> String {
    let amountAsNSNumber = NSNumber(value: value)
    let formatter = NumberFormatter()
    
    formatter.numberStyle = .currency
    formatter.locale = Locale(identifier: "es_CO")
    
    return formatter.string(from: amountAsNSNumber)!
}
