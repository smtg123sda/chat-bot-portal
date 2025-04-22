
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  }
];

const MCQEditor = () => {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const { toast } = useToast();
  
  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion({...question});
  };
  
  const handleUpdateQuestion = (field: string, value: string) => {
    if (!selectedQuestion) return;
    
    setSelectedQuestion({
      ...selectedQuestion,
      [field]: value
    });
  };
  
  const handleUpdateOption = (index: number, value: string) => {
    if (!selectedQuestion) return;
    
    const newOptions = [...selectedQuestion.options];
    newOptions[index] = value;
    
    setSelectedQuestion({
      ...selectedQuestion,
      options: newOptions
    });
  };
  
  const handleSetCorrectAnswer = (index: number) => {
    if (!selectedQuestion) return;
    
    setSelectedQuestion({
      ...selectedQuestion,
      correctAnswer: index
    });
  };
  
  const handleAddOption = () => {
    if (!selectedQuestion) return;
    if (selectedQuestion.options.length >= 6) {
      toast({
        title: "Maximum options reached",
        description: "You can have a maximum of 6 options per question.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedQuestion({
      ...selectedQuestion,
      options: [...selectedQuestion.options, ""]
    });
  };
  
  const handleRemoveOption = (index: number) => {
    if (!selectedQuestion || selectedQuestion.options.length <= 2) return;
    
    const newOptions = selectedQuestion.options.filter((_, i) => i !== index);
    const newCorrectAnswer = selectedQuestion.correctAnswer >= index && selectedQuestion.correctAnswer > 0 
      ? selectedQuestion.correctAnswer - 1 
      : selectedQuestion.correctAnswer;
    
    setSelectedQuestion({
      ...selectedQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer
    });
  };
  
  const handleSaveQuestion = () => {
    if (!selectedQuestion) return;
    
    if (!selectedQuestion.text.trim()) {
      toast({
        title: "Invalid question",
        description: "Question text cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedQuestion.options.some(option => !option.trim())) {
      toast({
        title: "Invalid options",
        description: "All options must have content",
        variant: "destructive"
      });
      return;
    }
    
    const updatedQuestions = questions.map(q => 
      q.id === selectedQuestion.id ? selectedQuestion : q
    );
    
    setQuestions(updatedQuestions);
    setSelectedQuestion(null);
    
    toast({
      title: "Question saved",
      description: "Your question has been saved successfully"
    });
  };
  
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      options: ["", ""],
      correctAnswer: 0
    };
    
    setSelectedQuestion(newQuestion);
  };
  
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    
    if (selectedQuestion && selectedQuestion.id === id) {
      setSelectedQuestion(null);
    }
    
    toast({
      title: "Question deleted",
      description: "The question has been removed"
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Manage your quiz questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {questions.map((question) => (
              <div 
                key={question.id}
                className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${
                  selectedQuestion?.id === question.id ? 'bg-accent border-primary' : ''
                }`}
                onClick={() => handleSelectQuestion(question)}
              >
                <div className="truncate flex-1">{question.text}</div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleAddQuestion}>
              <Plus className="h-4 w-4 mr-2" /> Add New Question
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        {selectedQuestion ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question</Label>
                <Input
                  id="question-text"
                  value={selectedQuestion.text}
                  onChange={(e) => handleUpdateQuestion('text', e.target.value)}
                  placeholder="Enter your question"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Options</Label>
                  <Button variant="outline" size="sm" onClick={handleAddOption}>
                    <Plus className="h-4 w-4 mr-2" /> Add Option
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {selectedQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        className="flex-1"
                        value={option}
                        onChange={(e) => handleUpdateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="correct-answer"
                            checked={selectedQuestion.correctAnswer === index}
                            onChange={() => handleSetCorrectAnswer(index)}
                            className="w-4 h-4"
                          />
                          <span className="text-xs">Correct</span>
                        </label>
                        {selectedQuestion.options.length > 2 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveOption(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedQuestion(null)}>Cancel</Button>
              <Button onClick={handleSaveQuestion}>Save Question</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <p className="text-muted-foreground">Select a question to edit or add a new one</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MCQEditor;
