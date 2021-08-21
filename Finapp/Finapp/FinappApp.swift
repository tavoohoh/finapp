//
//  FinappApp.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import SwiftUI

@main
struct FinappApp: App {
    @StateObject private var modelData = ModelData()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(modelData)
        }
    }
}
