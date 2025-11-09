import * as pdfjsLib from 'pdfjs-dist';

const PDF_WORKER_URL = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).href;

pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}
