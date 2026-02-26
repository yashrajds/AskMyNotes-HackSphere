// Sample Q&A for the chat - Prewritten responses for notes
export interface QA {
  question: string;
  answer: string;
}

// Short, voice-friendly answers
export const sampleMathQA: QA[] = [
  {
    question: "What is the slope of a line that passes through the points (2, 3) and (5, 9)?",
    answer: "The slope is 2. Using the slope formula, we calculate the change in y which is 9 minus 3 equals 6, divided by the change in x which is 5 minus 2 equals 3. So 6 divided by 3 equals 2."
  },
  {
    question: "In the equation y = -4x + 7, what does the value 7 represent?",
    answer: "The value 7 represents the y-intercept. In the equation y equals mx plus b, b is the y-intercept. This means the line crosses the y-axis at the point zero comma 7."
  },
  {
    question: "Which of the following describes the slope of a perfectly vertical line?",
    answer: "The slope of a vertical line is undefined. This is because we would be dividing by zero, which is not possible in mathematics."
  }
];

// Function to get a sample answer based on the question
export function getSampleAnswer(userQuestion: string): string | null {
  const normalizedQuestion = userQuestion.toLowerCase().trim();
  
  // Check each question
  for (const qa of sampleMathQA) {
    if (normalizedQuestion.includes(qa.question.toLowerCase()) || 
        qa.question.toLowerCase().includes(normalizedQuestion)) {
      return qa.answer;
    }
  }
  
  // Keyword matching
  if (normalizedQuestion.includes("slope") && normalizedQuestion.includes("2") || normalizedQuestion.includes("points")) {
    return sampleMathQA[0].answer;
  }
  
  if (normalizedQuestion.includes("y-intercept") || normalizedQuestion.includes("y intercept") || normalizedQuestion.includes("7") || (normalizedQuestion.includes("equation") && normalizedQuestion.includes("-4"))) {
    return sampleMathQA[1].answer;
  }
  
  if (normalizedQuestion.includes("vertical") || normalizedQuestion.includes("undefined")) {
    return sampleMathQA[2].answer;
  }
  
  return null;
}

export default sampleMathQA;
