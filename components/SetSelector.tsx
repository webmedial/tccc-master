import React from 'react';
import { Topic, Question, SetResult } from '../types';
import { Button } from './Button';

interface SetSelectorProps {
  topic: Topic;
  allQuestions: Question[];
  topicProgress: Record<number, SetResult>;
  onSelectSet: (questions: Question[], setId: number) => void;
  onBack: () => void;
}

export const SetSelector: React.FC<SetSelectorProps> = ({ topic, allQuestions, topicProgress, onSelectSet, onBack }) => {
  const setSize = 5;
  // Calculate how many full sets we have
  const totalSets = Math.floor(allQuestions.length / setSize);

  // Create array of sets based on available data
  const sets = [];
  for (let i = 0; i < totalSets; i++) {
    const startIndex = i * setSize;
    const setQuestions = allQuestions.slice(startIndex, startIndex + setSize);
    
    sets.push({
      id: i + 1,
      questions: setQuestions,
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onBack} className="text-gray-500 hover:text-typo3-orange transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
           <h2 className="text-2xl font-bold text-gray-900">{topic}</h2>
           <p className="text-gray-500 text-sm">Wähle ein Prüfungs-Set (je 5 Fragen)</p>
        </div>
      </div>

      {sets.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow">
          <p>Keine Fragen für dieses Thema gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sets.map((set) => {
            const result = topicProgress[set.id];
            
            // Logic: Is there a result? Is it finished?
            const hasStarted = !!result;
            const isComplete = result?.isComplete ?? false;
            const isPassed = result?.passed ?? false;
            
            // In Progress State
            const inProgress = hasStarted && !isComplete;

            let borderColor = 'border-gray-200 hover:border-typo3-orange';
            let bgColor = 'bg-white';
            let iconBg = 'bg-orange-100 text-typo3-orange';
            
            if (isComplete) {
                if (isPassed) {
                    borderColor = 'border-green-200';
                    bgColor = 'bg-green-50';
                    iconBg = 'bg-green-100 text-green-600';
                } else {
                    borderColor = 'border-red-200';
                    bgColor = 'bg-red-50';
                    iconBg = 'bg-red-100 text-red-600';
                }
            } else if (inProgress) {
                borderColor = 'border-blue-200';
                bgColor = 'bg-blue-50';
                iconBg = 'bg-blue-100 text-blue-600';
            }
            
            return (
                <div 
                  key={set.id}
                  className={`relative p-6 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-lg ${borderColor} ${bgColor}`}
                  onClick={() => onSelectSet(set.questions, set.id)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${iconBg}`}>
                    {isComplete ? (
                        isPassed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        )
                    ) : inProgress ? (
                        <span className="text-xs font-bold">{result.currentIndex}/{result.total}</span>
                    ) : (
                        set.id
                    )}
                  </div>
                  
                  <div className="w-full">
                    <h3 className="font-bold text-gray-900">Set {set.id}</h3>
                    {isComplete ? (
                        <div className="mt-1">
                             <span className={`text-sm font-bold ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
                                 {result.score} / {result.total} Richtig
                             </span>
                        </div>
                    ) : inProgress ? (
                        <div className="mt-1">
                             <span className="text-sm font-bold text-blue-700">
                                 Läuft... ({Math.round((result.currentIndex / result.total) * 100)}%)
                             </span>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">
                          5 Fragen
                        </p>
                    )}
                  </div>
    
                  <Button className="w-full mt-auto text-sm py-2" variant={isComplete ? 'outline' : 'primary'}>
                      {isComplete ? 'Wiederholen' : (inProgress ? 'Fortsetzen' : 'Starten')}
                  </Button>
                </div>
            );
          })}
        </div>
      )}
    </div>
  );
};