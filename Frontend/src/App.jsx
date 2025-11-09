// import { useState, useEffect } from 'react';

// import { extractTextFromPDF } from './utils/pdfParser';
// import { parseStatementWithAI } from './Services/aiParser';
// import { saveStatement, getAllStatements , deleteStatements } from './Services/statementService';
// import { SUPPORTED_BANKS } from './types/statement';
// import { FileText, AlertCircle } from 'lucide-react';
// import FileUpload from './Components/FileUpload';
// import StatementResult from './Components/StatementResult';
// import StatementHistory from './Components/StatementHistory';

// function App() {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [parsedStatement, setParsedStatement] = useState(null);
//   const [error, setError] = useState(null);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const loadHistory = async () => {
//     try {
//       const statements = await getAllStatements();
//       setHistory(statements);
//     } catch (err) {
//       console.error('Failed to load history:', err);
//     }
//   };

//   const handleFileSelect = async (file) => {
//     setIsProcessing(true);
//     setError(null);
//     setParsedStatement(null);

//     try {
//       const extractedText = await extractTextFromPDF(file);
//       const parsed = await parseStatementWithAI(extractedText);

//       await saveStatement(parsed, extractedText.substring(0, 5000));

//       setParsedStatement(parsed);
//       await loadHistory();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred while processing the PDF');
//       console.error('Error processing PDF:', err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-4">
//             <FileText className="w-12 h-12 text-blue-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Credit Card Statement Parser
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Extract key data from credit card statements using AI
//           </p>
//           <div className="mt-4 flex flex-wrap justify-center gap-2">
//             {SUPPORTED_BANKS.map((bank) => (
//               <span
//                 key={bank}
//                 className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//               >
//                 {bank}
//               </span>
//             ))}
//           </div>
//         </div>

//         <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

//         {error && (
//           <div className="max-w-2xl mx-auto mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-start space-x-3">
//               <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
//               <div>
//                 <h3 className="text-red-800 font-semibold">Error</h3>
//                 <p className="text-red-700 text-sm mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {parsedStatement && <StatementResult statement={parsedStatement} />}

//         <StatementHistory statements={history} />

//         <div className="mt-12 text-center text-sm text-gray-500">
//           <p>Made by Rushikesh Khedekar</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { extractTextFromPDF } from './utils/pdfParser';
import { parseStatementWithAI } from './Services/aiParser';
import { saveStatement, getAllStatements, deleteStatements } from './Services/statementService';
import { SUPPORTED_BANKS } from './types/statement';
import { FileText, AlertCircle } from 'lucide-react';
import FileUpload from './Components/FileUpload';
import StatementResult from './Components/StatementResult';
import StatementHistory from './Components/StatementHistory';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedStatement, setParsedStatement] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const statements = await getAllStatements();
      setHistory(statements);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    setError(null);
    setParsedStatement(null);

    try {
      const extractedText = await extractTextFromPDF(file);
      const parsed = await parseStatementWithAI(extractedText);

      await saveStatement(parsed, extractedText.substring(0, 5000));

      setParsedStatement(parsed);
      await loadHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the PDF');
      console.error('Error processing PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-300 shadow-2xl shadow-white/20">
              <FileText className="w-14 h-14 text-black" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Credit Card Statement Parser
          </h1>
          
          <p className="text-gray-400 text-xl mb-8 font-light">
            Extract key data from credit card statements using AI-powered analysis
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {SUPPORTED_BANKS.map((bank) => (
              <span
                key={bank}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all hover:scale-105"
              >
                {bank}
              </span>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

        {/* Error Display */}
        {error && (
          <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-500/50 rounded-2xl p-6 animate-fade-in">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-red-300 font-bold text-lg mb-1">Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {parsedStatement && <StatementResult statement={parsedStatement} />}

        {/* History */}
        <StatementHistory statements={history} />

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-900 to-black rounded-full border border-white/10">
            <p className="text-gray-400 text-sm">
              Crafted by <span className="text-white font-semibold">Rushikesh Khedekar</span>
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;