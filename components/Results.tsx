import React from 'react';
import { Button } from './Button';
import { PieChart, Pie, Cell as PieCell, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

export const Results: React.FC<ResultsProps> = ({ score, total, onRestart, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 75;

  const data = [
    { name: 'Richtig', value: score },
    { name: 'Falsch', value: total - score },
  ];
  
  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="mb-6">
           <span className={`inline-block p-4 rounded-full ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
             {isPassed ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             )}
           </span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isPassed ? "Herzlichen Glückwunsch!" : "Weiterüben!"}
        </h2>
        <p className="text-gray-500 mb-8">
          Du hast {score} von {total} Fragen richtig beantwortet.
          <br />
          Das entspricht <strong>{percentage}%</strong> (Benötigt: 75%).
        </p>

        {/* Chart */}
        <div className="h-64 w-full mb-8">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={data}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={80}
                 fill="#8884d8"
                 paddingAngle={5}
                 dataKey="value"
               >
                 {data.map((entry, index) => (
                   <PieCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip />
             </PieChart>
           </ResponsiveContainer>
        </div>

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
          <Button onClick={onRestart} fullWidth>Set wiederholen</Button>
          <Button onClick={onHome} variant="outline" fullWidth>Anderes Thema wählen</Button>
        </div>
      </div>
    </div>
  );
};