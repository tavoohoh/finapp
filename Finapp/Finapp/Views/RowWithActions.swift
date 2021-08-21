//
//  RowWithActions.swift
//  Finapp
//
//  Created by Gustavo Santamaría on 21/08/21.
//

import SwiftUI

struct RowWithActions: View {
    var body: some View {
        NavigationView {
            List {
                ForEach(1..<6) { i in
                    Text("Item \(i)")
//                        .swipeActions(edge: .leading, allowsFullSwipe: false) {
//                            Button {
//                                print("")
//                            } label: {
//                                Label("Star", systemImage: "star.circle")
//                            }
//                        }
                }
            }
        }
    }
}

struct RowWithActions_Previews: PreviewProvider {
    static var previews: some View {
        RowWithActions()
    }
}
