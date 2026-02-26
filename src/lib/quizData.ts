// Quiz data parsed from maths.txt
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
}

export const mathsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the slope of a line that passes through the points (2, 3) and (5, 9)?",
    options: ["A) 2", "B) 3", "C) 1/2", "D) 6"],
    correctAnswer: 0 // A
  },
  {
    id: 2,
    question: "In the equation y = -4x + 7, what does the value 7 represent?",
    options: ["A) The slope", "B) The x-intercept", "C) The y-intercept", "D) The origin"],
    correctAnswer: 2 // C
  },
  {
    id: 3,
    question: "Which of the following describes the slope of a perfectly vertical line?",
    options: ["A) Zero", "B) Positive", "C) Negative", "D) Undefined"],
    correctAnswer: 3 // D
  },
  {
    id: 4,
    question: "A right triangle has legs of length 5 cm and 12 cm. What is the length of the hypotenuse?",
    options: ["A) 17 cm", "B) 13 cm", "C) 15 cm", "D) 169 cm"],
    correctAnswer: 1 // B
  },
  {
    id: 5,
    question: "Solve for x in the equation: 3x - 12 = 18",
    options: ["A) x = 2", "B) x = 6", "C) x = 10", "D) x = 30"],
    correctAnswer: 2 // C
  },
  {
    id: 6,
    question: "Which of the following equations represents a line with a slope of 2 and a y-intercept of -3?",
    options: ["A) y = -3x + 2", "B) y = 2x - 3", "C) y = 2x + 3", "D) y = -2x - 3"],
    correctAnswer: 1 // B
  },
  {
    id: 7,
    question: "If the hypotenuse of a right triangle is 10 and one leg is 6, what is the length of the other leg?",
    options: ["A) 4", "B) 16", "C) 8", "D) 64"],
    correctAnswer: 2 // C
  },
  {
    id: 8,
    question: "What is the slope of a horizontal line?",
    options: ["A) 1", "B) Undefined", "C) 0", "D) -1"],
    correctAnswer: 2 // C
  },
  {
    id: 9,
    question: "In the Pythagorean Theorem (a² + b² = c²), which letter represents the hypotenuse?",
    options: ["A) a", "B) b", "C) c", "D) None of the above"],
    correctAnswer: 2 // C
  },
  {
    id: 10,
    question: "If a line has a negative slope, how does it appear on a graph?",
    options: [
      "A) It moves upward from left to right.",
      "B) It moves downward from left to right.",
      "C) It is a flat horizontal line.",
      "D) It is a straight vertical line."
    ],
    correctAnswer: 1 // B
  }
];

export default mathsQuiz;
