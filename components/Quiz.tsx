import React, { useState, useEffect } from 'react';
import { Topic, Question } from '../types';
import { Button } from './Button';

interface QuizProps {
  topic: Topic;
  questions: Question[];
  setId: number;
  initialIndex?: number;
  initialScore?: number;
  onProgress: (score: number, total: number, isComplete: boolean, nextIndex: number) => void;
  onFinish: (score: number, total: number) => void;
  onExit: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ 
    topic, questions, setId, 
    initialIndex = 0, initialScore = 0,
    onProgress, onFinish, onExit 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [language, setLanguage] = useState<'de' | 'en'>('de'); // Language State
  
  // State for Multi-Select: Array of selected indices
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(initialScore);

  const currentQuestion = questions[currentIndex];
  
  // Safety check
  if (!currentQuestion) return <div>Error: No questions available.</div>;

  const isMultiSelect = currentQuestion.correctIndices.length > 1;

  const handleOptionClick = (index: number) => {
    if (showExplanation) return;

    if (isMultiSelect) {
      if (selectedOptions.includes(index)) {
        setSelectedOptions(selectedOptions.filter(i => i !== index));
      } else {
        setSelectedOptions([...selectedOptions, index]);
      }
    } else {
      setSelectedOptions([index]);
    }
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
    
    const sortedSelected = [...selectedOptions].sort();
    const sortedCorrect = [...currentQuestion.correctIndices].sort();
    
    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }
    
    // Save progress immediately. 
    // We save currentIndex + 1 (the next question index) so that if the user reloads 
    // while viewing the explanation, they resume at the NEXT question.
    // This prevents answering the same question twice to farm points.
    onProgress(newScore, questions.length, false, currentIndex + 1); 
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOptions([]);
      setShowExplanation(false);
      // Save progress again (redundant but safe)
      onProgress(score, questions.length, false, nextIndex);
    } else {
      // Finished
      onProgress(score, questions.length, true, 0); // Reset index for next time, mark complete
      onFinish(score, questions.length);
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  // Helper to get text in current language
  const getText = (content: { de: string; en: string }) => content[language];
  const getOptions = (options: { de: string[]; en: string[] }) => options[language];

  // Determine if we are at the very start (Question 1, no answer checked yet)
  const isFirstQuestionUnanswered = currentIndex === 0 && !showExplanation;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{topic}</div>
          <div className="flex items-center space-x-2 mt-1">
             {currentQuestion.id.startsWith('static') ? (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                 Basis-Set
               </span>
             ) : (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                 KI-Generiert
               </span>
             )}
             
             {isMultiSelect && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                 Multi-Select
               </span>
             )}
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          {/* Language Toggle */}
          <div className="bg-white border border-gray-300 rounded-lg p-1 flex items-center shadow-sm">
             <button 
               onClick={() => setLanguage('de')}
               className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'de' ? 'bg-gray-100 text-gray-900 shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
             >
               DE
             </button>
             <button 
               onClick={() => setLanguage('en')}
               className={`px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-800 shadow-sm border border-blue-100' : 'text-gray-400 hover:text-gray-600'}`}
             >
               EN
             </button>
          </div>
          
          <div className="text-sm font-bold text-typo3-orange whitespace-nowrap text-right">
            <div>Frage {currentIndex + 1} / {questions.length}</div>
            <div className="text-xs text-gray-500 font-normal mt-0.5">Set {setId}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-typo3-orange h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8 relative overflow-hidden transition-all">
        {/* Language Indicator Watermark */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <span className="text-6xl font-black">{language.toUpperCase()}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-relaxed">
          {getText(currentQuestion.text)}
        </h2>
        
        <p className="text-sm text-gray-500 mb-6 font-medium italic">
          {language === 'de' ? 
            (isMultiSelect ? "(Mehrfachauswahl: Bitte wähle alle zutreffenden Antworten)" : "(Bitte wähle eine Antwort)") :
            (isMultiSelect ? "(Multiple Choice: Please select all applicable answers)" : "(Please select one answer)")
          }
        </p>

        <div className="space-y-3">
          {getOptions(currentQuestion.options).map((option, idx) => {
            const isSelected = selectedOptions.includes(idx);
            const isCorrect = currentQuestion.correctIndices.includes(idx);
            
            let itemClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start group ";
            
            if (showExplanation) {
               if (isCorrect) {
                 itemClass += "border-green-500 bg-green-50 text-green-900";
               } else if (isSelected && !isCorrect) {
                 itemClass += "border-red-500 bg-red-50 text-red-900";
               } else {
                 itemClass += "border-gray-100 text-gray-400";
               }
            } else {
              if (isSelected) {
                itemClass += "border-typo3-orange bg-orange-50 text-typo3-orange font-semibold";
              } else {
                itemClass += "border-gray-200 hover:border-orange-300 hover:bg-gray-50 text-gray-700";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={showExplanation}
                className={itemClass}
              >
                <div className={`w-6 h-6 rounded ${isMultiSelect ? 'rounded-md' : 'rounded-full'} border flex items-center justify-center mr-3 shrink-0 text-xs mt-0.5 transition-colors
                  ${showExplanation && isCorrect ? 'bg-green-500 border-green-500 text-white' : 
                    showExplanation && isSelected && !isCorrect ? 'bg-red-500 border-red-500 text-white' : 
                    isSelected ? 'bg-typo3-orange border-typo3-orange text-white' : 'border-gray-300 text-gray-500 group-hover:border-orange-300'}
                `}>
                  {isSelected && (
                    isMultiSelect ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )
                  )}
                   {showExplanation && isCorrect && !isSelected && (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                  )}
                </div>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation Area */}
        {showExplanation && (
          <div className="mt-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg relative">
             <div className="absolute top-2 right-2 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
            <h4 className="font-bold text-blue-900 mb-2">
              {language === 'de' ? 'Offizielle Erklärung:' : 'Official Explanation:'}
            </h4>
            <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
              {getText(currentQuestion.explanation)}
            </p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center gap-4">
        <Button variant="secondary" onClick={onExit} className="text-sm">
           {isFirstQuestionUnanswered
             ? (language === 'de' ? 'Abbrechen' : 'Cancel')
             : (language === 'de' ? 'Abbrechen & Speichern' : 'Save & Exit')
           }
        </Button>
        
        {!showExplanation ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleNext}>
                {language === 'de' ? 'Überspringen' : 'Skip'}
            </Button>
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={selectedOptions.length === 0}
            >
               {language === 'de' ? 'Antwort prüfen' : 'Check Answer'}
            </Button>
          </div>
        ) : (
          <Button onClick={handleNext}>
            {currentIndex < questions.length - 1 
              ? (language === 'de' ? "Nächste Frage" : "Next Question") 
              : (language === 'de' ? "Ergebnis anzeigen" : "Show Results")}
          </Button>
        )}
      </div>
    </div>
  );
};