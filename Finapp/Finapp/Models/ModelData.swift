//
//  ModelData.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 20/08/21.
//

import Foundation
import Combine

final class ModelData: ObservableObject {
    @Published var transactions: [Transaction] = load("TransactionsData.json")
    @Published var periods: [Period] = []
    @Published var currentPeriod: Period = load("CurrentPeriodData.json")
}

func load<T: Decodable>(_ filename: String) -> T {
    let data: Data

    guard let file = Bundle.main.url(forResource: filename, withExtension: nil)

    else {
        fatalError("Couldn't find \(filename) in main bundle.")
    }

    do {
        data = try Data(contentsOf: file)
    } catch {
        fatalError("Couldn't load \(filename) from main bundle:\n\(error)")
    }


    do {
        let decoder = JSONDecoder()
        return try decoder.decode(T.self, from: data)
    } catch {
        fatalError("Couldn't parse \(filename) as \(T.self):\n\(error)")
    }

}
