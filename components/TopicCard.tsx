import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  icon: React.ReactNode;
  description: string;
  subDomains: string[];
  onClick: (topic: Topic) => void;
  completedSets?: number;
  totalSets?: number;
  isSuccessful?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({ 
    topic, icon, description, subDomains, onClick, 
    completedSets = 0, totalSets = 4,
    isSuccessful = true 
}) => {
  const percentage = Math.round((completedSets / totalSets) * 100);

  return (
    <div 
      onClick={() => onClick(topic)}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 group flex flex-col h-full relative overflow-hidden"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-orange-100 text-typo3-orange rounded-full group-hover:bg-typo3-orange group-hover:text-white transition-colors shrink-0">
          {icon}
        </div>
        <div className="flex-grow">
             <h3 className="text-lg font-bold text-gray-800 group-hover:text-typo3-orange transition-colors leading-tight">
              {topic}
            </h3>
            {/* Progress Bar */}
            {completedSets > 0 && (
                <div className="flex items-center mt-1.5 space-x-2">
                    <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${isSuccessful ? 'bg-green-500' : 'bg-typo3-orange'}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{completedSets}/{totalSets}</span>
                </div>
            )}
        </div>
      </div>
      
      <div className="flex-grow">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {subDomains.map((domain, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end items-center">
         <span className="text-typo3-orange text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center">
            {completedSets > 0 ? 'Fortsetzen →' : 'Starten →'}
         </span>
      </div>
    </div>
  );
};