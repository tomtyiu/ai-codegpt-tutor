import OpenAI from 'openai';

export interface Suggestion {
  action: string;
  patch: string;
  explanation: string;
}

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function callCodex(prompt: string): Promise<string> {
  const response = await client.responses.create({
    model: 'gpt-4.1',
    instructions: 'You are a coding assistant that provides code suggestions.',
    input: prompt,
  });
  return response.output_text;
}

export function parseSuggestion(raw: string): Suggestion {
  try {
    return JSON.parse(raw);
  } catch {
    return { action: '', patch: '', explanation: '' };
  }
}