import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic } from "../types";
import { SYLLABUS_CONTENT } from "./syllabusContext";
import { LEGACY_BOOK_CONTENT } from "./legacyBookContext";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-3-flash-preview";

export const generateQuestions = async (topic: Topic, count: number = 5): Promise<Question[]> => {
  // Mapping Topic Enum to Syllabus Domains
  let focusInstruction = "";
  
  switch(topic) {
    case Topic.GENERAL:
      focusInstruction = "Fokus auf: 'TYPO3 Basics' (Directory Structure, var/ vs config/), 'Application Context', 'Handling' und 'Media Management'.";
      break;
    case Topic.ASSOCIATION:
      focusInstruction = "Fokus auf: 'TYPO3 Association', 'TYPO3 GmbH', 'Partner Program', Committees und Funding-Modelle.";
      break;
    case Topic.LICENSING:
      focusInstruction = "Fokus auf: 'Licensing' (GPLv2/v3 Differences), 'Trademarks' (Logo usage) und 'Legal' (GDPR/DSGVO in projects).";
      break;
    case Topic.SECURITY:
      focusInstruction = "Fokus auf: 'Security Guidelines' (trustedHostsPattern, lockSSL), 'Incident Handling Steps', 'Hacked Site Procedures' und 'File Permissions'.";
      break;
    case Topic.ARCHITECTURE:
      focusInstruction = "Fokus auf: 'Hosting', 'System Requirements', 'Caching' (Varnish Header), 'Site Sets' (v13 Feature!), 'Config.yaml' vs 'Settings.php' und 'Purpose of TypoScript'.";
      break;
    case Topic.EXTENSIONS:
      focusInstruction = "Fokus auf: 'Composer' (Version constraints ~, ^, lock file), 'Extension Architecture' (TCA, ext_localconf) und 'Semantic Versioning'.";
      break;
    case Topic.PROJECT_MGMT:
      focusInstruction = "Fokus auf: 'Agile & Scrum' (Events, Artifacts), 'Kanban', 'Requirements Engineering' (Kano, Stakeholder Matrix) und 'Definition of Done'.";
      break;
    case Topic.SEO:
      focusInstruction = "Fokus auf: 'Technical SEO' (Canonical, Hreflang logic, XML Sitemaps), 'Routing' (Slugs, Path segments) und 'Robots.txt' Handling.";
      break;
    case Topic.ACCESSIBILITY:
      focusInstruction = "Fokus auf: 'WCAG Levels' (A, AA, AAA), 'Backend A11y' (CKEditor config), 'Frontend Semantics' (Landmarks, Skip-Links).";
      break;
  }

  const prompt = `
    Du bist ein strenger, präziser TYPO3 Consultant Trainer (Prüfer).
    Deine oberste Priorität ist FAKTISCHE KORREKTHEIT basierend auf den bereitgestellten Quellen.
    Erfinde KEINE Konzepte, Dateipfade oder Befehle, die nicht in TYPO3 v13 existieren.

    Erstelle ${count} anspruchsvolle Multiple-Choice-Prüfungsfragen für die "TYPO3 CMS Certified Consultant" (TCCC v13 LTS) Prüfung.
    
    WICHTIG: Die offizielle Prüfung ist auf ENGLISCH. Der User lernt aber lieber auf DEUTSCH.
    Generiere deshalb JEDES Feld (Frage, Optionen, Erklärung) ZWEISPRACHIG (Deutsch und Englisch).

    THEMA: "${topic}"
    ${focusInstruction}

    QUELLE 1 (GOLSTANDARD - HIERAN HALTEN):
    **Syllabus Context (Deep Dive)** - Enthält Fakten aus der offiziellen Dokumentation (v13).
    Verwende diese technischen Details (z.B. Dateinamen wie config.yaml, Site Sets Pfade) für die Fragen und Erklärungen.
    ${SYLLABUS_CONTENT}

    QUELLE 2 (METHODIK & HINTERGRUND):
    **Buch-Wissen** - Für Consulting-Methoden (Agile, Rechtliches).
    ${LEGACY_BOOK_CONTENT}

    STRIKTE REGELN:
    1. **Validierung**: Stelle sicher, dass die als "richtig" markierte Antwort zu 100% durch den Syllabus oder gängige v13-Praxis gedeckt ist.
    2. **V13 Spezifika**: Ignoriere veraltetes Wissen.
    3. **Format**: Mische Single-Choice und Multiple-Choice. Bei Multiple-Choice MUSS "(Wähle N)" bzw. "(Select N)" am Ende des Fragetextes stehen.
    4. **Sprache**: Das englische Original muss professionelles "Exam English" sein. Das Deutsche eine präzise Übersetzung.

    Output JSON Format mit Schlüsseln für _de und _en.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.3,
        systemInstruction: "Generiere schwere, realistische TCCC Exam Fragen für v13 LTS. Zweisprachig (DE/EN). Halte dich strikt an Fakten.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text_de: { type: Type.STRING, description: "Frage auf Deutsch" },
              text_en: { type: Type.STRING, description: "Question in English" },
              options_de: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Antwortoptionen Deutsch" },
              options_en: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Answer options English" },
              correctIndices: { type: Type.ARRAY, items: { type: Type.INTEGER } },
              explanation_de: { type: Type.STRING, description: "Erklärung Deutsch" },
              explanation_en: { type: Type.STRING, description: "Explanation English" }
            },
            required: ["text_de", "text_en", "options_de", "options_en", "correctIndices", "explanation_de", "explanation_en"],
          },
        },
      },
    });

    const rawData = response.text;
    if (!rawData) {
      throw new Error("Keine Daten von Gemini erhalten.");
    }

    const parsedQuestions = JSON.parse(rawData);

    return parsedQuestions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      text: { de: q.text_de, en: q.text_en },
      options: { de: q.options_de, en: q.options_en },
      correctIndices: q.correctIndices, 
      explanation: { de: q.explanation_de, en: q.explanation_en }
    }));

  } catch (error) {
    console.error("Fehler bei der Fragengenerierung:", error);
    throw error;
  }
};