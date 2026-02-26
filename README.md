# AskMyNotes - AI-Powered Note-Taking App

AskMyNotes is an AI-powered web application that helps students analyze their notes, get instant answers to questions, and test their knowledge through interactive quizzes.

![AskMyNotes](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.3-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

### 🎯 Core Features
- **AI Chat**: Ask questions about your notes and get instant answers
- **Subject Management**: Create and manage up to 3 subjects with file attachments
- **Challenge Mode**: Test your knowledge with interactive quizzes

### 🔊 Voice Features
- **Text-to-Speech**: Click the volume button to hear AI responses read aloud
- **Voice Mode**: Enable voice mode (blue mic button) for auto-speaking responses
- Natural-sounding English voice using Web Speech API

### 📝 UI Features
- **Typing Animation**: Watch AI responses type out character by character
- **Analyzing Animation**: Visual feedback while AI processes your questions
- **Glassmorphism Design**: Modern, beautiful dark theme interface
- **Responsive Chat**: Smooth scrolling and message bubbles

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9+ (or pnpm/yarn)

### Installation

1. Clone the repository
```
bash
git clone <repository-url>
cd AskMyNotes
```

2. Install dependencies
```
bash
npm install
```

3. Start development server
```
bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Login Credentials
- Username: `student`
- Password: `password`

## How to Use

### Adding a Subject
1. Click "Add Subject" in the sidebar
2. Enter subject name (e.g., "Mathematics")
3. Add optional description
4. Upload notes (PDF, TXT, DOCX)
5. Click "Create Subject"

### Asking Questions
1. Select a subject from the sidebar
2. Type your question in the input box
3. Press Enter or click Send
4. Wait for AI to analyze and respond

### Voice Output
1. **Manual**: Click the Volume button to hear the last response
2. **Auto**: Enable voice mode (blue Mic button) for automatic speech

### Challenge Mode
1. Click "CHALLENGE MODE" button
2. Answer 10 math questions
3. View your score and try again

## Sample Questions

Try these questions to test the AI:

1. **Slope Question**: "What is the slope of a line that passes through the points (2, 3) and (5, 9)?"

2. **Y-Intercept Question**: "In the equation y = -4x + 7, what does the value 7 represent?"

3. **Vertical Line Question**: "Which of the following describes the slope of a perfectly vertical line?"

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Material UI
- **Icons**: Lucide React
- **Routing**: React Router 7
- **Forms**: React Hook Form

## Project Structure

```
AskMyNotes/
├── src/
│   ├── app/
│   │   ├── components/     # UI components
│   │   │   └── ui/         # Radix UI components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx         # Main app component
│   │   └── routes.tsx      # Route definitions
│   ├── lib/
│   │   ├── sampleQA.ts    # Sample Q&A data
│   │   └── quizData.ts    # Quiz questions
│   └── styles/             # CSS files
├── package.json
├── vite.config.ts
└── README.md
```

## Building for Production

```
bash
npm run build
```

The built files will be in the `dist/` directory.

## Customization

### Adding More Q&A
Edit `src/lib/sampleQA.ts` to add more questions and answers:

```
typescript
export const sampleMathQA: QA[] = [
  {
    question: "Your question here",
    answer: "Your answer here - keep it short for voice output"
  }
];
```

### Changing Quiz Questions
Edit `src/lib/quizData.ts` to modify the challenge mode questions.

## License

This project is for educational purposes.

## Support

For issues or questions, please refer to the project documentation.
