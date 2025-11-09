// import { CreditCard, Calendar, DollarSign, Hash, Building2 } from 'lucide-react';

// export default function StatementResult({ statement }) {
//   const dataFields = [
//     {
//       icon: Building2,
//       label: 'Bank Name',
//       value: statement.bankName,
//       color: 'text-blue-600'
//     },
//     {
//       icon: CreditCard,
//       label: 'Card Last 4 Digits',
//       value: statement.cardLastFourDigits,
//       color: 'text-green-600'
//     },
//     {
//       icon: Calendar,
//       label: 'Billing Cycle',
//       value: statement.billingCycle,
//       color: 'text-purple-600'
//     },
//     {
//       icon: Calendar,
//       label: 'Payment Due Date',
//       value: statement.paymentDueDate,
//       color: 'text-orange-600'
//     },
//     {
//       icon: DollarSign,
//       label: 'Total Balance',
//       value: statement.totalBalance,
//       color: 'text-red-600'
//     }
//   ];

//   if (statement.cardVariant) {
//     dataFields.push({
//       icon: Hash,
//       label: 'Card Variant',
//       value: statement.cardVariant,
//       color: 'text-indigo-600'
//     });
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8">
//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Parsed Statement Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {dataFields.map((field, index) => {
//             const Icon = field.icon;
//             return (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start space-x-3">
//                   <Icon className={`w-6 h-6 ${field.color} mt-1 shrink-0`} />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-500 mb-1">{field.label}</p>
//                     <p className="text-lg font-semibold text-gray-900 wrap-break-words">
//                       {field.value}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


import { CreditCard, Calendar, DollarSign, Hash, Building2, Sparkles } from 'lucide-react';

export default function StatementResult({ statement }) {
  const dataFields = [
    {
      icon: Building2,
      label: 'Bank Name',
      value: statement.bankName,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      label: 'Card Last 4 Digits',
      value: statement.cardLastFourDigits,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Calendar,
      label: 'Billing Cycle',
      value: statement.billingCycle,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      label: 'Payment Due Date',
      value: statement.paymentDueDate,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: DollarSign,
      label: 'Total Balance',
      value: statement.totalBalance,
      gradient: 'from-red-500 to-rose-500'
    }
  ];

  if (statement.cardVariant) {
    dataFields.push({
      icon: Hash,
      label: 'Card Variant',
      value: statement.cardVariant,
      gradient: 'from-indigo-500 to-violet-500'
    });
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl shadow-white/5 p-8 border border-white/10">
        <div className="flex items-center space-x-3 mb-8">
          <Sparkles className="w-7 h-7 text-white" />
          <h2 className="text-3xl font-bold text-white">Statement Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataFields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-white/10 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${field.gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-400 mb-2">{field.label}</p>
                    <p className="text-xl font-bold text-white break-words">
                      {field.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
