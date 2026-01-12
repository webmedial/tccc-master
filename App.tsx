import React, { useState, useEffect } from 'react';
import { View, Topic, Question, UserProgress } from './types';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { SetSelector } from './components/SetSelector';
import { loadQuestionBank } from './services/questionManager';
import { loadProgress, saveSetProgress } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentSetId, setCurrentSetId] = useState<number>(1);
  const [lastScore, setLastScore] = useState<{score: number, total: number} | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  
  // State for resuming
  const [resumeIndex, setResumeIndex] = useState<number>(0);
  const [resumeScore, setResumeScore] = useState<number>(0);

  // The big state holding all questions
  const [questionBank, setQuestionBank] = useState<Record<string, Question[]>>({});

  // Initialize data strictly from static source & load progress
  useEffect(() => {
    const data = loadQuestionBank();
    setQuestionBank(data);
    
    const progress = loadProgress();
    setUserProgress(progress);
  }, []);

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('SET_SELECTION');
  };

  const handleStartSet = (questions: Question[], setId: number) => {
    setActiveQuestions(questions);
    setCurrentSetId(setId);
    
    // Check for existing progress
    if (selectedTopic && userProgress[selectedTopic] && userProgress[selectedTopic][setId]) {
        const savedState = userProgress[selectedTopic][setId];
        if (!savedState.isComplete) {
            // Check if the user has technically finished answering all questions (e.g. at explanation of last q)
            if (savedState.currentIndex >= questions.length) {
                // Mark as complete and show results
                const newProgress = saveSetProgress(selectedTopic, setId, savedState.score, questions.length, true, 0);
                setUserProgress(newProgress);
                setLastScore({ score: savedState.score, total: questions.length });
                setCurrentView('RESULTS');
                return;
            }

            setResumeIndex(savedState.currentIndex);
            setResumeScore(savedState.score);
        } else {
            // Restarting a completed set
            setResumeIndex(0);
            setResumeScore(0);
        }
    } else {
        setResumeIndex(0);
        setResumeScore(0);
    }

    setCurrentView('QUIZ');
  };

  const handleProgressUpdate = (score: number, total: number, isComplete: boolean, nextIndex: number) => {
    if (selectedTopic) {
        const newProgress = saveSetProgress(selectedTopic, currentSetId, score, total, isComplete, nextIndex);
        setUserProgress(newProgress);
    }
  };

  const handleQuizFinish = (score: number, total: number) => {
    setLastScore({ score, total });
    // Note: Progress is already saved via handleProgressUpdate with isComplete=true
    setCurrentView('RESULTS');
  };

  const handleExitQuiz = () => {
    setSelectedTopic(null);
    setCurrentView('DASHBOARD');
  };
  
  const handleBackToSets = () => {
    setCurrentView('SET_SELECTION');
  };

  const handleRestart = () => {
    // Restart the SAME set
    // Force re-mount by clearing first
    const currentQs = activeQuestions;
    setActiveQuestions([]); 
    
    // Reset Resume State
    setResumeIndex(0);
    setResumeScore(0);

    setTimeout(() => {
        setActiveQuestions(currentQs);
        setCurrentView('QUIZ');
    }, 10);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={handleExitQuiz}>
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-typo3-orange rounded mr-2 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T3</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-800">Consultant Trainer</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <a href="https://typo3.com/products-services/certifications/certified-consultant-tccc" target="_blank" rel="noopener noreferrer" className="text-sm text-typo3-orange hover:text-orange-700 font-medium">
                    Infos zur Prüfung
                </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-10">
        {currentView === 'DASHBOARD' && (
          <Dashboard 
            onSelectTopic={handleSelectTopic} 
            questionBank={questionBank}
            userProgress={userProgress}
          />
        )}
        
        {currentView === 'SET_SELECTION' && selectedTopic && (
          <SetSelector 
            topic={selectedTopic}
            allQuestions={questionBank[selectedTopic] || []}
            topicProgress={userProgress[selectedTopic] || {}}
            onSelectSet={handleStartSet}
            onBack={handleExitQuiz}
          />
        )}
        
        {currentView === 'QUIZ' && selectedTopic && activeQuestions.length > 0 && (
          <Quiz 
            topic={selectedTopic} 
            questions={activeQuestions}
            setId={currentSetId}
            initialIndex={resumeIndex}
            initialScore={resumeScore}
            onProgress={handleProgressUpdate}
            onFinish={handleQuizFinish} 
            onExit={handleBackToSets} 
          />
        )}

        {currentView === 'RESULTS' && lastScore && (
          <Results 
            score={lastScore.score} 
            total={lastScore.total} 
            onRestart={handleRestart} 
            onHome={handleBackToSets} 
          />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
              <p>Inoffizieller Trainer. Not affiliated with TYPO3 GmbH or TYPO3 Association.</p>
              <p className="mt-1">Content based on TCCC Syllabus v13</p>
          </div>
      </footer>
    </div>
  );
};

export default App;