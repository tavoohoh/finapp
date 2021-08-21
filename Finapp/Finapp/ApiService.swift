//
//  PeriodsService.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import Foundation

class ApiService {
    func getPeriods(completion:@escaping ([Period]) -> ()) {
        guard let url = URL(string: "https://us-central1-tavoohoh.cloudfunctions.net/periods") else { return }
        
        URLSession.shared.dataTask(with: url) { (data, _, _) in
            let periods = try! JSONDecoder().decode([Period].self, from: data!)
            
            DispatchQueue.main.async {
                completion(periods)
            }
        }
        .resume()
    }
}
