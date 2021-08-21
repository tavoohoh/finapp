//
//  ContentView.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import SwiftUI

struct ContentView: View {
    @State private var selection: Tab = .currentPeriod

    enum Tab {
        case periods
        case currentPeriod
    }
    
    var body: some View {
        TabView(selection: $selection) {
            CurrentPeriodPage()
                .tabItem {
                    Label(
                        "Current periods",
                        systemImage: selection == Tab.currentPeriod ? "bookmark.fill" : "bookmark"
                    )
                }
                .tag(Tab.currentPeriod)
            
            PeriodsPage()
                .tabItem {
                    Label(
                        "All periods",
                        systemImage: selection == Tab.periods ? "book.fill" : "book"
                    )
                }
                .tag(Tab.periods)

        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(ModelData())
    }
}
