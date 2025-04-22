import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Mock questions
const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Jupiter', 'Mars', 'Venus', 'Saturn'],
    correctAnswer: 1
  },
  {
    id: '3',
    text: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correctAnswer: 1
  },
  {
    id: '4',
    text: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Oganesson'],
    correctAnswer: 1
  },
  {
    id: '5',
    text: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2
  }
];

const Play = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerSubmitted(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const progress = ((currentQuestionIndex + 1) / MOCK_QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">MCQ Quiz Game</h1>

      <p className="text-lg text-muted-foreground mb-8 text-center">
        Test your legal knowledge and see how well you know common law, landmark cases, and more!
      </p>
      
      {!gameOver ? (
        <Card className="shadow-lg border-2 border-accent/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}</CardTitle>
                <CardDescription>Score: {score}/{MOCK_QUESTIONS.length}</CardDescription>
              </div>
              <div className="text-2xl font-bold">
                {Math.floor(progress)}%
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium mb-6">{currentQuestion.text}</div>
            
            <RadioGroup className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                    isAnswerSubmitted 
                      ? index === currentQuestion.correctAnswer 
                        ? 'bg-green-100 border-green-500' 
                        : selectedOption === index 
                          ? 'bg-red-100 border-red-500' 
                          : 'border-gray-200'
                      : selectedOption === index 
                        ? 'bg-accent border-primary' 
                        : 'border-gray-200 hover:bg-accent/50'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem 
                    value={String(index)} 
                    id={`option-${index}`} 
                    checked={selectedOption === index}
                    disabled={isAnswerSubmitted}
                  />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            {!isAnswerSubmitted ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < MOCK_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-lg border-2 border-accent/50 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-4">{score}/{MOCK_QUESTIONS.length}</div>
            <p className="text-xl mb-2">
              You scored {score} out of {MOCK_QUESTIONS.length}
            </p>
            <p className="text-muted-foreground">
              {score === MOCK_QUESTIONS.length 
                ? "Perfect score! Amazing job!" 
                : score >= MOCK_QUESTIONS.length / 2 
                ? "Good job! Keep practicing to improve your score." 
                : "Keep practicing to improve your knowledge!"}
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={handleRestartGame}>Play Again</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Play;
