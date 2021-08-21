//
//  DateFormatter.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import Foundation

func ToDate(value: String) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "yyyy-MM-DD HH:mm:ss.z"
    let date = dateFormatter.date(from: value)
    dateFormatter.dateFormat = "yyyy-MM-dd"
    return dateFormatter.string(from: date!)
}
