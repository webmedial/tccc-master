import React from 'react';
import { Topic, Question, UserProgress, SetResult } from '../types';
import { TopicCard } from './TopicCard';

interface DashboardProps {
  onSelectTopic: (topic: Topic) => void;
  questionBank: Record<string, Question[]>;
  userProgress: UserProgress;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectTopic, questionBank, userProgress }) => {
  
  // Explicit order based on TYPO3 Consultant Syllabus v13 Structure
  const orderedTopics: Topic[] = [
    Topic.GENERAL,      // Basics, Handling, Admin, Possibilities
    Topic.SECURITY,     // Security
    Topic.ACCESSIBILITY,// Accessibility
    Topic.PROJECT_MGMT, // Agile & PM
    Topic.ARCHITECTURE, // Hosting & Architecture
    Topic.SEO,          // SEO
    Topic.LICENSING,    // Licensing & Legal
    Topic.ASSOCIATION,  // Association (part of Legal/Community context)
    Topic.EXTENSIONS    // Extending TYPO3
  ];

  const topicData: Record<Topic, { description: string; subDomains: string[]; icon: React.ReactNode }> = {
    [Topic.ASSOCIATION]: {
      description: "Verstehe die Strukturen hinter dem Open-Source-Projekt, von der Association bis zur GmbH und dem Partnerprogramm.",
      subDomains: ["TYPO3 Association", "TYPO3 GmbH", "Partner Program", "Committees"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    [Topic.LICENSING]: {
      description: "Rechtliche Grundlagen, Open Source Lizenzen und Datenschutzbestimmungen sicher anwenden.",
      subDomains: ["GPL v2/v3", "Trademarks", "GDPR / DSGVO", "Legal Aspects"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    [Topic.SECURITY]: {
      description: "Konzepte zur Absicherung von TYPO3-Instanzen und Prozesse für den Ernstfall (Incident Handling).",
      subDomains: ["Security Guidelines", "Incident Handling", "Vulnerabilities (XSS/SQLi)", "Authentication"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    },
    [Topic.PROJECT_MGMT]: {
      description: "Moderne Projektmanagement-Methoden und Anforderungsmanagement im TYPO3-Kontext.",
      subDomains: ["Agile & Scrum", "Kanban", "Requirements Eng.", "Stakeholder Matrix"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
    },
    [Topic.ARCHITECTURE]: {
      description: "Technische Infrastruktur, Hosting-Strategien und Konfigurations-Konzepte verstehen.",
      subDomains: ["Hosting & Cloud", "Purpose of TypoScript", "Caching (Varnish)", "System Requirements"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    [Topic.EXTENSIONS]: {
      description: "Erweiterung des Core-Systems, Paketmanagement und Architektur-Konzepte.",
      subDomains: ["Package Management", "Composer", "Extbase / MVC", "Events & APIs"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
    },
    [Topic.SEO]: {
      description: "Technische und redaktionelle Maßnahmen zur Optimierung für Suchmaschinen und Zielgruppen.",
      subDomains: ["On-Page Optimization", "Technical SEO", "Routing & Slugs", "Social Media"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    },
    [Topic.ACCESSIBILITY]: {
      description: "Digitale Barrierefreiheit sicherstellen und Standards einhalten.",
      subDomains: ["WCAG Standards", "Backend Accessibility", "Frontend Semantics", "Testing Tools"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    },
    [Topic.GENERAL]: {
      description: "Fundamentales Wissen zu TYPO3 CMS, redaktionellem Handling und Backend-Verwaltung.",
      subDomains: ["Handling & Editorial", "Media Management", "Possibilities & Limits", "Administration"],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
  };

  const getTopicProgress = (topic: Topic) => {
      const topicProgress = userProgress[topic];
      if (!topicProgress) return { completed: 0, total: 4, isSuccessful: true };
      
      const totalQuestions = questionBank[topic]?.length || 0;
      const totalSets = Math.ceil(totalQuestions / 5) || 4; // Fallback to 4 if bank not loaded yet
      
      // We only count sets that are explicitly marked as complete for the dashboard view
      const completedResults = (Object.values(topicProgress) as SetResult[]).filter((r) => r.isComplete);
      const completedSets = completedResults.length;

      // Quality check: Check if all *completed* sets are passed with at least 80% (score/total >= 0.8)
      // Note: The general passmark in the app is 75%, but we use strict 80% for the green bar visual as requested.
      const isSuccessful = completedResults.every(r => (r.score / r.total) >= 0.8);

      return { completed: completedSets, total: totalSets, isSuccessful };
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          <span className="text-typo3-orange">TCCC</span> Master
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Wähle ein Wissensgebiet, um deine TYPO3 CMS Certified Consultant Prüfung zu simulieren.<br className="hidden md:inline" /> Die Fragen basieren auf dem offiziellen Syllabus v13 LTS (2026).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderedTopics.map((topic) => {
          const stats = getTopicProgress(topic);
          return (
            <TopicCard 
                key={topic}
                topic={topic}
                icon={topicData[topic].icon}
                description={topicData[topic].description}
                subDomains={topicData[topic].subDomains}
                onClick={onSelectTopic}
                completedSets={stats.completed}
                totalSets={stats.total}
                isSuccessful={stats.isSuccessful}
            />
          );
        })}
      </div>

       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 bg-white rounded-xl shadow border-l-4 border-typo3-orange">
           <div className="flex items-center space-x-2 mb-2">
             <h2 className="text-lg font-bold text-gray-800">Syllabus & Deep Dive Active</h2>
             <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold border border-green-200">VERIFIED MODE</span>
           </div>
           <p className="text-gray-600 text-sm mb-3">
             Die generierten Fragen basieren strikt auf dem <a href="https://typo3.org/certification/consultant" target="_blank" rel="noopener noreferrer" className="text-typo3-orange hover:underline font-semibold">TCCC Syllabus v13 LTS</a> und den dort verlinkten Dokumentationen.
           </p>
           <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
             <li>Inkl. "Hidden Knowledge" aus den verlinkten Docs</li>
             <li>Priorisiert: Site Sets, Composer, v13 Features</li>
             <li>Halluzinations-Schutz aktiviert (Temp 0.3)</li>
           </ul>
         </div>
         
         <div className="p-6 bg-blue-50 rounded-xl shadow border-l-4 border-blue-500">
           <h2 className="text-lg font-bold mb-2 text-blue-900">Trainingstipp</h2>
           <p className="text-blue-800 text-sm">
             Nutze für den "Look & Feel" von echten Fragen auch externe Ressourcen wie <a href="https://t3rrific.com/typo3-certification/app/#/free-example-questions/tccc" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-700">t3rrific.com</a>. 
             Diese App konzentriert sich auf die <strong>KI-gestützte Simulation</strong> von komplexen Szenarien basierend auf der 2026 Datenbasis.
           </p>
         </div>
       </div>
    </div>
  );
};