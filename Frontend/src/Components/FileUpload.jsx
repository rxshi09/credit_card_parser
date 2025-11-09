// import { Upload } from 'lucide-react';

// export default function FileUpload({ onFileSelect, isProcessing }) {
//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === 'application/pdf') {
//       onFileSelect(file);
//     } else {
//       alert('Please select a valid PDF file');
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <label
//         htmlFor="pdf-upload"
//         className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
//           isProcessing
//             ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
//             : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
//         }`}
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <Upload className={`w-12 h-12 mb-4 ${isProcessing ? 'text-gray-400' : 'text-blue-500'}`} />
//           <p className="mb-2 text-sm text-gray-700">
//             <span className="font-semibold">Click to upload</span> or drag and drop
//           </p>
//           <p className="text-xs text-gray-500">Credit Card Statement PDF</p>
//           {isProcessing && (
//             <p className="mt-2 text-sm text-blue-600 font-medium">Processing...</p>
//           )}
//         </div>
//         <input
//           id="pdf-upload"
//           type="file"
//           className="hidden"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           disabled={isProcessing}
//         />
//       </label>
//     </div>
//   );
// }

import { Upload } from 'lucide-react';

export default function FileUpload({ onFileSelect, isProcessing }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <label
        htmlFor="pdf-upload"
        className={`group relative flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden ${
          isProcessing
            ? 'border-gray-700 bg-gray-900/50 cursor-not-allowed'
            : 'border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative flex flex-col items-center justify-center pt-5 pb-6 z-10">
          <div className={`mb-6 p-4 rounded-full transition-all ${
            isProcessing 
              ? 'bg-gray-800' 
              : 'bg-white/10 group-hover:bg-white/20 group-hover:scale-110'
          }`}>
            <Upload className={`w-10 h-10 ${isProcessing ? 'text-gray-500' : 'text-white'}`} />
          </div>
          
          <p className="mb-2 text-base font-medium text-white">
            <span className="font-bold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-400">Credit Card Statement PDF (Max 10MB)</p>
          
          {isProcessing && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-sm text-white font-medium">Processing your statement...</p>
            </div>
          )}
        </div>
        
        <input
          id="pdf-upload"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>
    </div>
  );
}
