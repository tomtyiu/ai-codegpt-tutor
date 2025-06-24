// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import OpenAI from 'openai';

const ANNOTATION_PROMPT = `You are a code tutor who helps students learn how to write better code. Your job is to evaluate a block of code that the user gives you. The user is writing You will then annotate any lines that could be improved with a brief suggestion and the reason why you are making that suggestion. Only make suggestions when you feel the severity is enough that it will impact the readibility and maintainability of the code. Be friendly with your suggestions and remember that these are students so they need gentle guidance. Format each suggestion as a single JSON object. It is not necessary to wrap your response in triple backticks. Here is an example of what your response should look like:
console.log(await vscode.lm.getVendors());
{ "line": 1, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }{ "line": 12, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }
`;

// Create a single decoration type to reuse
const annotationDecorationType = vscode.window.createTextEditorDecorationType({
	after: {
		color: "grey",
	},
});

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {
    const config = vscode.workspace.getConfiguration('codeTutor');
    const model = config.get<string>('openaiModel', 'gpt-4.1'); // Read model from settings

    const codeWithLineNumbers = getVisibleCodeWithLineNumbers(textEditor);

    const prompt = `${ANNOTATION_PROMPT}\n${codeWithLineNumbers}`;
    const responseText = await callCodex(prompt, model);

    await parseChatResponseFromString(responseText, textEditor);
});

// Replace model and LanguageModelChatMessage usage with callCodex
export async function callCodex(prompt: string, model: string): Promise<string> {
  const response = await client.responses.create({
    model: model,
    instructions: 'You are a coding assistant that provides inline code suggestions and debug code.',
    input: prompt,
  });
  return response.output_text;
}

// Helper to parse a single string response (not streaming)
async function parseChatResponseFromString(responseText: string, textEditor: vscode.TextEditor) {
    let accumulatedResponse = responseText;
    const decorations: { range: vscode.Range, hoverMessage: string, renderOptions: any }[] = [];

    // Try to extract all JSON objects from the accumulated response
    const matches = accumulatedResponse.match(/{[^}]+}/g);
    if (matches) {
        for (const match of matches) {
            try {
                const annotation = JSON.parse(match);
                const line = annotation.line;
                const suggestion = annotation.suggestion;
                const lineLength = textEditor.document.lineAt(line - 1).text.length;
                const range = new vscode.Range(
                    new vscode.Position(line - 1, lineLength),
                    new vscode.Position(line - 1, lineLength),
                );
                decorations.push({
                    range,
                    hoverMessage: suggestion,
                    renderOptions: {
                        after: {
                            contentText: ` ${suggestion.substring(0, 25) + "..."}`,
                        }
                    }
                });
            } catch {
                // Ignore parse errors
            }
        }
    }

    // Apply all decorations at once
    textEditor.setDecorations(annotationDecorationType, decorations);
}

function getVisibleCodeWithLineNumbers(textEditor: vscode.TextEditor) {
	// get the position of the first and last visible lines
	let currentLine = textEditor.visibleRanges[0].start.line;
	const endLine = textEditor.visibleRanges[0].end.line;

	let code = '';

	// get the text from the line at the current position.
	// The line number is 0-based, so we add 1 to it to make it 1-based.
	while (currentLine < endLine) {
		code += `${currentLine + 1}: ${textEditor.document.lineAt(currentLine).text} \n`;
		// move to the next line position
		currentLine++;
	}
	return code;
}

// This method is called when your extension is deactivated
export function deactivate() { }