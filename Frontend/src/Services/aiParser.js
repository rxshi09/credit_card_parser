const PARSING_PROMPT = `You are an expert at parsing credit card statements. Extract the following 5 key data points from the provided credit card statement text:  
1. Bank Name (e.g., HDFC Bank, ICICI Bank, SBI Card, Axis Bank, Kotak Mahindra Bank)  
2. Card Last 4 Digits (if found two digit like 12 then return XX12)  
3. Billing Cycle (e.g., "01 Sep 2024 - 30 Sep 2024")  
4. Payment Due Date  
5. Total Balance/Amount Due  
Return ONLY a valid JSON object with this exact structure:  
{  
  "bankName": "string",  
  "cardLastFourDigits": "string",  
  "billingCycle": "string",  
  "paymentDueDate": "string",  
  "totalBalance": "string"  
}  
If you cannot find a field, use "Not Found" as the value. Be precise and extract exact values from the text.`;

// Main function to parse statement using AI API
export async function parseStatementWithAI(extractedText) {
  try {
    const response = await fetch('https://apifreellm.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `${PARSING_PROMPT}\n\nParse this credit card statement:\n\n${extractedText.substring(0, 4000)}`
      })
    });

    console.log("Parsing string");
    console.log(`${PARSING_PROMPT}\n\nParse this credit card statement:\n\n${extractedText.substring(0, 4000)}`);

    const data = await response.json();

    if (data.status === 'success') {
      console.log('AI Response:', data.response);
      return parseAIResponse(data.response);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error during AI parsing:', error);
  }

  return {
    bankName: "",
    cardLastFourDigits: "",
    billingCycle: "",
    paymentDueDate: "",
    totalBalance: ""
  };
}

// Helper function to clean and parse AI response safely
function parseAIResponse(aiResponse) {
  if (!aiResponse || typeof aiResponse !== 'string') return null;

  try {
    // Remove ```json ... ``` wrappers if present
    const cleaned = aiResponse
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // Find first JSON-like object inside the string
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found');

    // Parse safely
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    console.error('Failed to parse AI response:', error.message);
    return null;
  }
}
