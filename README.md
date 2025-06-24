# Andromeda-Tutor: AI CodeGPT Tutor

A Visual Studio Code extension that uses OpenAI's GPT-4.1 series to annotate and tutor your code with helpful suggestions and debugging tips.

<img src="https://github.com/tomtyiu/ai-codegpt-tutor/blob/main/annotation.JPG" width="600">

## Features

- Annotate code with suggestions for readability and maintainability
- Choose between multiple OpenAI GPT-4.1 models (`gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`)
- Inline, friendly, and student-focused feedback

## Requirements

- [Node.js](https://nodejs.org/)
- An OpenAI API key (set as the `OPENAI_API_KEY` environment variable)

## Usage

1. **Install the extension** in VS Code.
2. **Set your OpenAI API key** as an environment variable:
   - On Windows (Command Prompt):
     ```
     set OPENAI_API_KEY=your-key-here
     ```
   - On PowerShell:
     ```
     $env:OPENAI_API_KEY="your-key-here"
     ```
   - On macOS/Linux:
     ```
     export OPENAI_API_KEY=your-key-here
     ```
3. **Select your preferred model** in the extension settings (`gpt-4.1`, `gpt-4.1-mini`, or `gpt-4.1-nano`).
4. **Open a code file**, then click the "Toggle Tutor Annotations" button in the editor title bar or run the `Code Tutor: Toggle Tutor Annotations` command.

## Development

- **Compile:**  
  ```
  pnpm run compile
  ```
- **Watch:**  
  ```
  pnpm run watch
  ```
- **Package for VS Code Marketplace:**  
  ```
  vsce package
  ```

## License

MIT

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
