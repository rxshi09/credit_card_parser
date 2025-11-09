// import { Clock, Building2 } from 'lucide-react';

// export default function StatementHistory({ statements }) {
//   if (statements.length === 0) {
//     return null;
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8">
//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Statement History</h2>
//         <div className="space-y-4">
//           {statements.map((statement, index) => (
//             <div
//               key={statement.id || index}
//               className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start space-x-3">
//                   <Building2 className="w-5 h-5 text-blue-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{statement.bankName}</p>
//                     <p className="text-sm text-gray-600">
//                       Card: ****{statement.cardLastFourDigits}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Balance: {statement.totalBalance}
//                     </p>
//                   </div>
//                 </div>
//                 {statement.created_at && (
//                   <div className="flex items-center space-x-1 text-sm text-gray-500">
//                     <Clock className="w-4 h-4" />
//                     <span>{new Date(statement.created_at).toLocaleDateString()}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Clock, Building2, TrendingUp } from 'lucide-react';

export default function StatementHistory({ statements }) {
  if (statements.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl shadow-white/5 p-8 border border-white/10">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="w-7 h-7 text-white" />
          <h2 className="text-3xl font-bold text-white">Statement History</h2>
        </div>
        
        <div className="space-y-4">
          {statements.map((statement, index) => (
            <div
              key={statement.id || index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  
                  <div>
                    <p className="font-bold text-xl text-white mb-2">{statement.bankName}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        Card: <span className="text-white font-medium">****{statement.cardLastFourDigits}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Balance: <span className="text-white font-medium">{statement.totalBalance}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {statement.created_at && (
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{new Date(statement.created_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}