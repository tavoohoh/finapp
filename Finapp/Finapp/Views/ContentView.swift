//
//  ContentView.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 19/08/21.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        PeriodsPage()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(ModelData())
    }
}
