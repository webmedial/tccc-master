import { Topic, Question } from '../types';

// FULL DATABASE v13
// REALISTIC EXAM SIMULATION - CONSULTANT LEVEL
// Content based on Syllabus v13 (2026)

export const STATIC_QUESTIONS: Record<Topic, Question[]> = {
  [Topic.GENERAL]: [
    // SET 1: Setup & Architecture Strategy
    {
      id: 'gen-1',
      text: { 
        de: "Sie beraten einen Enterprise-Kunden, der eine strikte Trennung von Code und Konfiguration wünscht. Das Ops-Team möchte die Site-Konfiguration (TypoScript, TSConfig, Routing) in einem Git-Repository verwalten, das getrennt von der Datenbank deployt wird. Welches Architektur-Pattern in TYPO3 v13 empfehlen Sie? (Wähle 1)", 
        en: "You are consulting an enterprise client who demands strict separation of code and configuration. The Ops team wants to manage site configuration (TypoScript, TSConfig, Routing) in a Git repository deployed separately from the database. Which architecture pattern in TYPO3 v13 do you recommend? (Select 1)" 
      },
      options: { 
        de: ["Implementierung von 'Site Sets' in einem dedizierten Site-Package (Extension). Diese werden in der `config.yaml` als Abhängigkeit referenziert.", "Nutzung von `sys_template` Datensätzen mit der Option 'Include Static from Extensions'.", "Export der Konfiguration via T3D beim Deployment.", "Ablage aller Konfigurationen in der `additional.php`."], 
        en: ["Implementation of 'Site Sets' in a dedicated Site Package (Extension). These are referenced as dependencies in `config.yaml`.", "Usage of `sys_template` records with the option 'Include Static from Extensions'.", "Export configuration via T3D during deployment.", "Storing all configurations in `additional.php`."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "**Site Sets** (v13) sind der moderne Weg, um Konfiguration file-basiert und versionierbar zu machen. Datenbank-Templates (`sys_template`) gelten als Legacy für solche Anforderungen.", 
        en: "**Site Sets** (v13) are the modern way to make configuration file-based and versionable. Database templates (`sys_template`) are considered legacy for such requirements." 
      }
    },
    {
      id: 'gen-2',
      text: { 
        de: "Ein Redakteur meldet, dass er bestimmte Seiten im Seitenbaum nicht sehen kann, obwohl er der Gruppe 'Redaktion' angehört, die Leserechte für diese Seiten hat. Sie prüfen den Benutzer und stellen fest, dass keine expliziten 'Deny'-Regeln vorliegen. Was ist die wahrscheinlichste Ursache für das Problem? (Wähle 1)", 
        en: "An editor reports that they cannot see certain pages in the page tree, although they belong to the 'Editors' group which has read access to these pages. You check the user and find no explicit 'Deny' rules. What is the most likely cause of the problem? (Select 1)" 
      },
      options: { 
        de: ["Der 'DB Mount' (Datenbankfreigabe) der Gruppe ist zu tief im Baum oder auf einen anderen Zweig gesetzt.", "Die Seiten haben das Flag 'Im Menü verbergen' gesetzt.", "Der Benutzer hat keine Schreibrechte auf die Tabelle `pages`.", "Das TSConfig `options.pageTree.showNavTitle` fehlt."], 
        en: ["The 'DB Mount' of the group is set too deep in the tree or on a different branch.", "The pages have the 'Hide in menu' flag set.", "The user has no write permissions on the `pages` table.", "The TSConfig `options.pageTree.showNavTitle` is missing."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "In TYPO3 ist der **DB Mount** der Einstiegspunkt. Alles oberhalb oder außerhalb des Mounts ist für den Redakteur im Backend unsichtbar, unabhängig von den Zugriffsrechten.", 
        en: "In TYPO3, the **DB Mount** is the entry point. Everything above or outside the mount is invisible to the editor in the backend, regardless of permission settings." 
      }
    },
    {
      id: 'gen-3',
      text: { 
        de: "Ihr Kunde plant ein Deployment auf einer Container-Infrastruktur (Docker/Kubernetes). Das Filesystem ist 'Read-Only', mit Ausnahme gemounteter Volumes. Welche Verzeichnisse MÜSSEN zwingend auf ein beschreibbares Volume gemappt werden, damit TYPO3 v13 funktioniert? (Wähle 2)", 
        en: "Your client plans a deployment on container infrastructure (Docker/Kubernetes). The filesystem is 'Read-Only', except for mounted volumes. Which directories MUST be mapped to a writable volume for TYPO3 v13 to function? (Select 2)" 
      },
      options: { 
        de: ["`var/` (für Logs, Cache, Locks, Session-Daten).", "`public/fileadmin/` (oder das konfigurierte User-Upload Verzeichnis).", "`vendor/`.", "`config/`."], 
        en: ["`var/` (for logs, cache, locks, session data).", "`public/fileadmin/` (or the configured user upload directory).", "`vendor/`.", "`config/`."] 
      },
      correctIndices: [0, 1],
      explanation: { 
        de: "`var/` enthält temporäre Laufzeitdaten. `fileadmin/` enthält User-Uploads. `config/` und `vendor/` sollten in einer Immutable-Infrastructure read-only (Teil des Images) sein.", 
        en: "`var/` contains temporary runtime data. `fileadmin/` contains user uploads. `config/` and `vendor/` should be read-only (part of the image) in immutable infrastructure." 
      }
    },
    {
      id: 'gen-4',
      text: { 
        de: "In einer Multi-Site Installation mit 5 Domains soll sichergestellt werden, dass Redakteure der Site A keinesfalls Inhalte der Site B sehen oder bearbeiten können. Beide Sites liegen im selben Page-Tree. Welche Strategie ist korrekt? (Wähle 1)", 
        en: "In a multi-site installation with 5 domains, you must ensure that editors of Site A absolutely cannot see or edit content of Site B. Both sites are in the same page tree. Which strategy is correct? (Select 1)" 
      },
      options: { 
        de: ["Zuweisung separater DB Mounts für die jeweiligen Root-Pages der Sites an die Redakteurs-Gruppen.", "Konfiguration von 'Domain Records' auf den Root-Pages.", "Nutzung von Workspaces für jede Site.", "Einschränkung via `lockToDomain` im User-Record."], 
        en: ["Assignment of separate DB Mounts for the respective root pages of the sites to the editor groups.", "Configuration of 'Domain Records' on the root pages.", "Using Workspaces for each site.", "Restriction via `lockToDomain` in the user record."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "DB Mounts isolieren die Sichtbarkeit im Backend. `lockToDomain` betrifft nur den Login-Kontext, verhindert aber nicht den Zugriff auf andere Daten, wenn man eingeloggt ist.", 
        en: "DB Mounts isolate visibility in the backend. `lockToDomain` only affects the login context but does not prevent access to other data once logged in." 
      }
    },
    {
      id: 'gen-5',
      text: { 
        de: "Ein Kunde möchte die Performance maximieren. Sie schlagen vor, den 'Production' Application Context zu nutzen. Der Hoster erlaubt jedoch keinen Zugriff auf die Webserver-Umgebungsvariablen. Wie können Sie den Context trotzdem sicher setzen? (Wähle 1)", 
        en: "A client wants to maximize performance. You suggest using the 'Production' Application Context. However, the hoster does not allow access to web server environment variables. How can you safely set the context anyway? (Select 1)" 
      },
      options: { 
        de: ["Durch Setzen von `PUTENV('TYPO3_CONTEXT=Production')` ganz am Anfang der `public/index.php` (oder einer vorgeschalteten Bootstrap-Datei).", "Eintrag in der `LocalConfiguration.php`: `'SYS' => ['applicationContext' => 'Production']`.", "Via TypoScript: `config.applicationContext = Production`.", "Durch Umbenennen der `.env` Datei."], 
        en: ["By setting `PUTENV('TYPO3_CONTEXT=Production')` at the very beginning of `public/index.php` (or a preceding bootstrap file).", "Entry in `LocalConfiguration.php`: `'SYS' => ['applicationContext' => 'Production']`.", "Via TypoScript: `config.applicationContext = Production`.", "By renaming the `.env` file."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Der Context muss bekannt sein, *bevor* TYPO3 bootet. Daher ist eine Definition im Code (`index.php`) der Fallback, wenn ENV-Vars nicht möglich sind.", 
        en: "The context must be known *before* TYPO3 boots. Therefore, defining it in code (`index.php`) is the fallback if ENV vars are not possible." 
      }
    },
    // SET 2: Handling & Configuration
    {
      id: 'gen-6',
      text: { 
        de: "Sie konfigurieren ein Review-System. Redakteure sollen Änderungen in einem 'Draft'-Workspace vornehmen. Ein Chefredakteur soll per E-Mail benachrichtigt werden, wenn Inhalte zur Veröffentlichung bereitstehen. Welches System-Feature nutzen Sie? (Wähle 1)", 
        en: "You are configuring a review system. Editors should make changes in a 'Draft' workspace. A chief editor should be notified via email when content is ready for publishing. Which system feature do you use? (Select 1)" 
      },
      options: { 
        de: ["Die integrierte 'Stage' Konfiguration in Workspaces (Custom Stages mit Benachrichtigungs-Einstellungen).", "Den Scheduler Task 'Workspace Notification Service'.", "Eine externe Extension wie 'news'.", "Das SysLog."], 
        en: ["The integrated 'Stage' configuration in Workspaces (Custom stages with notification settings).", "The Scheduler Task 'Workspace Notification Service'.", "An external extension like 'news'.", "The SysLog."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 Workspaces erlauben die Definition von 'Custom Stages' (z.B. 'Ready for Review'), bei denen E-Mail-Empfänger für Statusübergänge definiert werden können.", 
        en: "TYPO3 Workspaces allow defining 'Custom Stages' (e.g., 'Ready for Review') where email recipients can be defined for status transitions." 
      }
    },
    {
      id: 'gen-7',
      text: { 
        de: "Ihr Kunde möchte, dass Bilder beim Upload automatisch in das WebP-Format konvertiert werden, um Google PageSpeed zu verbessern. Wo ist der korrekte Ort, um diese globale Bildverarbeitungs-Logik in v13 zu aktivieren? (Wähle 1)", 
        en: "Your client wants images to be automatically converted to WebP format upon upload to improve Google PageSpeed. Where is the correct place to enable this global image processing logic in v13? (Select 1)" 
      },
      options: { 
        de: ["In den Global Settings (GFX) via `settings.php` oder Install Tool: `$GLOBALS['TYPO3_CONF_VARS']['GFX']['processor_allowTemporaryMasksAsPng'] = 0` und entsprechende Format-Settings.", "Im TypoScript Setup: `config.image_processing.webp = 1`.", "Im Extension Manager in der Extension `core`.", "Dies geschieht automatisch und kann nicht konfiguriert werden."], 
        en: ["In Global Settings (GFX) via `settings.php` or Install Tool: `$GLOBALS['TYPO3_CONF_VARS']['GFX']['processor_allowTemporaryMasksAsPng'] = 0` and respective format settings.", "In TypoScript Setup: `config.image_processing.webp = 1`.", "In Extension Manager within the `core` extension.", "This happens automatically and cannot be configured."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Die Bildverarbeitung (ImageMagick/GraphicsMagick) wird zentral in der GFX-Sektion der Systemkonfiguration gesteuert. Zusätzlich müssen im Frontend (Fluid/TypoScript) WebP als Zielformat definiert werden.", 
        en: "Image processing (ImageMagick/GraphicsMagick) is controlled centrally in the GFX section of the system configuration. Additionally, WebP must be defined as the target format in Frontend (Fluid/TypoScript)." 
      }
    },
    {
      id: 'gen-8',
      text: { 
        de: "Ein Redakteur hat versehentlich 500 Datensätze gelöscht. Sie haben kein Datenbank-Backup von heute, aber 'Soft Delete' ist aktiv. Welches Tool nutzen Sie zur Wiederherstellung? (Wähle 1)", 
        en: "An editor accidentally deleted 500 records. You have no database backup from today, but 'Soft Delete' is active. Which tool do you use for recovery? (Select 1)" 
      },
      options: { 
        de: ["Das System-Modul 'Recycler'.", "Das Install Tool 'Database Analyzer'.", "phpMyAdmin.", "Den Scheduler Task 'Table Garbage Collection'."], 
        en: ["The system module 'Recycler'.", "The Install Tool 'Database Analyzer'.", "phpMyAdmin.", "The Scheduler Task 'Table Garbage Collection'."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Der Recycler ist das dedizierte Backend-Modul, um Datensätze mit `deleted=1` Flag wiederherzustellen.", 
        en: "The Recycler is the dedicated backend module to restore records with the `deleted=1` flag." 
      }
    },
    {
      id: 'gen-9',
      text: { 
        de: "Sie sollen eine 'Wartungsseite' (Maintenance Page) einrichten, die für alle Besucher sichtbar ist, außer für Redakteure, die sich im Backend einloggen müssen. Die Seite soll einen korrekten HTTP 503 Status zurückgeben. Wie setzen Sie das in v13 \"Standard-konform\" um? (Wähle 1)", 
        en: "You need to set up a 'Maintenance Page' visible to all visitors, except for editors who need to log in to the backend. The page should return a correct HTTP 503 status. How do you implement this in v13 in a 'standard-compliant' way? (Select 1)" 
      },
      options: { 
        de: ["Über 'System Maintainers' -> 'Settings' -> 'Maintenance Mode'. Dort kann ein Template und eine IP-Whitelist definiert werden.", "Durch eine Rewrite-Rule in der `.htaccess`, die auf eine `maintenance.html` umleitet.", "Durch Deaktivieren der Root-Seite im Seitenbaum.", "Durch Installation einer 'Maintenance Mode' Extension."], 
        en: ["Via 'System Maintainers' -> 'Settings' -> 'Maintenance Mode'. There you can define a template and an IP whitelist.", "By a rewrite rule in `.htaccess` redirecting to `maintenance.html`.", "By disabling the root page in the page tree.", "By installing a 'Maintenance Mode' extension."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 v13 bietet einen nativen Maintenance Mode im Backend (Admin Tools), der genau diese Anforderungen (503, Whitelist, Custom Template) erfüllt.", 
        en: "TYPO3 v13 offers a native Maintenance Mode in the backend (Admin Tools) that meets exactly these requirements (503, Whitelist, Custom Template)." 
      }
    },
    {
      id: 'gen-10',
      text: { 
        de: "Was ist der Hauptunterschied zwischen der `config.yaml` (Site Configuration) und der `settings.php` (System Configuration)? (Wähle 1)", 
        en: "What is the main difference between `config.yaml` (Site Configuration) and `settings.php` (System Configuration)? (Select 1)" 
      },
      options: { 
        de: ["`config.yaml` steuert das Frontend-Verhalten pro Site (Routing, Entry Points, Sprachen). `settings.php` steuert globale Low-Level Systemeigenschaften (DB-Zugriff, Caching-Backends, GFX).", "`config.yaml` ist für Extensions, `settings.php` für den Core.", "`config.yaml` ist optional, `settings.php` ist Pflicht.", "`settings.php` wird nicht versioniert, `config.yaml` schon."], 
        en: ["`config.yaml` controls frontend behavior per site (routing, entry points, languages). `settings.php` controls global low-level system properties (DB access, caching backends, GFX).", "`config.yaml` is for extensions, `settings.php` is for the core.", "`config.yaml` is optional, `settings.php` is mandatory.", "`settings.php` is not versioned, `config.yaml` is."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Die Trennung ist: Site-spezifisch vs. Instanz-spezifisch (Global).", 
        en: "The separation is: Site-specific vs. Instance-specific (Global)." 
      }
    },
    // SET 3: Advanced Concepts
    {
      id: 'gen-11',
      text: { 
        de: "Ein Kunde fragt nach 'LinkHandler'. Wofür würden Sie diese Konfiguration typischerweise einsetzen? (Wähle 1)", 
        en: "A client asks about 'LinkHandler'. What would you typically use this configuration for? (Select 1)" 
      },
      options: { 
        de: ["Um im RTE oder Link-Browser das direkte Verlinken auf spezifische Datensätze (z.B. News, Produkte) zu ermöglichen, inkl. korrekter URL-Generierung zur Detailansicht.", "Um externe Links automatisch auf Gültigkeit zu prüfen.", "Um Weiterleitungen (Redirects) zu verwalten.", "Um Cross-Domain Tracking zu aktivieren."], 
        en: ["To allow direct linking to specific records (e.g., News, Products) in the RTE or Link Browser, including correct URL generation to the detail view.", "To automatically check external links for validity.", "To manage redirects.", "To enable Cross-Domain tracking."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Ohne LinkHandler können Redakteure nur auf Seiten verlinken. LinkHandler erlaubt das komfortable Auswählen von Records (z.B. 'News XYZ') und generiert den Link zur Detailseite.", 
        en: "Without LinkHandler, editors can only link to pages. LinkHandler allows convenient selection of records (e.g. 'News XYZ') and generates the link to the detail page." 
      }
    },
    {
      id: 'gen-12',
      text: { 
        de: "Sie nutzen das Form Framework (EXT:form). Der Kunde möchte, dass Formulardaten NICHT per E-Mail versendet, sondern nur in einer CSV-Datei auf dem Server gespeichert werden. Welches Konzept nutzen Sie? (Wähle 1)", 
        en: "You are using the Form Framework (EXT:form). The client wants form data NOT to be sent via email, but only stored in a CSV file on the server. Which concept do you use? (Select 1)" 
      },
      options: { 
        de: ["Konfiguration von 'Finishers' im Formular-YAML (z.B. entfernen des EmailFinishers, hinzufügen eines SaveToDiskFinishers).", "XCLASS des Mail-Versands.", "Deaktivieren des SwiftMailers.", "Ein Hook in `tt_content`."], 
        en: ["Configuration of 'Finishers' in the form YAML (e.g., removing EmailFinisher, adding SaveToDiskFinisher).", "XCLASS of the mail sending.", "Disabling SwiftMailer.", "A hook in `tt_content`."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "**Finishers** werden am Ende des Submit-Prozesses ausgeführt und bestimmen, was mit den Daten passiert (Email, Redirect, Speichern).", 
        en: "**Finishers** are executed at the end of the submit process and determine what happens with the data (Email, Redirect, Save)." 
      }
    },
    {
      id: 'gen-13',
      text: { 
        de: "Was ist der Unterschied zwischen `user TSConfig` und `group TSConfig` bezüglich der Vererbung? (Wähle 1)", 
        en: "What is the difference between `user TSConfig` and `group TSConfig` regarding inheritance? (Select 1)" 
      },
      options: { 
        de: ["User TSConfig überschreibt immer Group TSConfig. Group TSConfig wird kumuliert (von allen Gruppen des Users).", "Group TSConfig überschreibt User TSConfig.", "Es gibt keine Vererbung, es gilt nur das explizit gesetzte.", "Das alphabetisch letzte gewinnt."], 
        en: ["User TSConfig always overrides Group TSConfig. Group TSConfig is accumulated (from all user groups).", "Group TSConfig overrides User TSConfig.", "There is no inheritance, only explicit settings apply.", "The alphabetically last one wins."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Die Hierarchie ist: Global < Group (kumuliert) < User (spezifisch).", 
        en: "The hierarchy is: Global < Group (accumulated) < User (specific)." 
      }
    },
    {
      id: 'gen-14',
      text: { 
        de: "Ein Kunde beschwert sich, dass Änderungen an TypoScript-Dateien im Git nicht sofort auf der Live-Seite sichtbar sind. Welchen Cache müssen Sie (oder das Deployment-Skript) leeren? (Wähle 1)", 
        en: "A client complains that changes to TypoScript files in Git are not immediately visible on the live site. Which cache must you (or the deployment script) clear? (Select 1)" 
      },
      options: { 
        de: ["Flush System Caches (oder 'All Caches'), da TypoScript geparst und im System-Cache abgelegt wird.", "Flush Frontend Caches (nur Page Output).", "Browser Cache.", "Opcode Cache."], 
        en: ["Flush System Caches (or 'All Caches'), as TypoScript is parsed and stored in the system cache.", "Flush Frontend Caches (Page Output only).", "Browser Cache.", "Opcode Cache."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TypoScript-Parsing ist ein teurer Prozess. Das Ergebnis landet im System-Cache, nicht im Seiten-Cache.", 
        en: "TypoScript parsing is an expensive process. The result ends up in the System Cache, not the Page Cache." 
      }
    },
    {
      id: 'gen-15',
      text: { 
        de: "Welche Rolle spielt der 'Upgrade Wizard' im Install Tool nach einem Update von v12 auf v13? (Wähle 1)", 
        en: "What is the role of the 'Upgrade Wizard' in the Install Tool after an update from v12 to v13? (Select 1)" 
      },
      options: { 
        de: ["Er führt einmalige Datenbank-Migrationen und Konfigurations-Anpassungen durch, die nicht automatisch passieren können (z.B. Daten verschieben, neue Felder befüllen).", "Er installiert neue Extensions.", "Er löscht alte Backups.", "Er aktualisiert PHP."], 
        en: ["It performs one-time database migrations and configuration adjustments that cannot happen automatically (e.g., moving data, populating new fields).", "It installs new extensions.", "It deletes old backups.", "It updates PHP."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Der Wizard ist der obligatorische Schritt nach dem Austausch des Source Codes, um die Datenintegrität sicherzustellen.", 
        en: "The Wizard is the mandatory step after replacing the source code to ensure data integrity." 
      }
    },
    // SET 4: Setup Details & TSConfig
    {
      id: 'gen-16',
      text: { 
        de: "Sie wollen im Backend für eine bestimmte Seite und deren Unterseiten das Modul 'Web > Info' ausblenden. Wo konfigurieren Sie dies? (Wähle 1)", 
        en: "You want to hide the module 'Web > Info' in the backend for a specific page and its subpages. Where do you configure this? (Select 1)" 
      },
      options: { 
        de: ["In der 'Page TSConfig' der Seite (Resources > Page TSConfig).", "In der 'User TSConfig' des Admins.", "In der `ext_tables.php`.", "In der Site Configuration (YAML)."], 
        en: ["In the 'Page TSConfig' of the page (Resources > Page TSConfig).", "In the 'User TSConfig' of the admin.", "In `ext_tables.php`.", "In the Site Configuration (YAML)."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Page TSConfig steuert Eigenschaften, die sich auf den Seitenbaum beziehen (`options.hideModules`).", 
        en: "Page TSConfig controls properties related to the page tree (`options.hideModules`)." 
      }
    },
    {
      id: 'gen-17',
      text: { 
        de: "Was ist der Zweck des `[frontend.user.isLoggedIn]` Conditions in TypoScript? (Wähle 1)", 
        en: "What is the purpose of the `[frontend.user.isLoggedIn]` condition in TypoScript? (Select 1)" 
      },
      options: { 
        de: ["Um TypoScript-Code nur auszuführen, wenn ein Frontend-User eingeloggt ist (z.B. User-Menü anzeigen).", "Um Backend-User zu prüfen.", "Um Admins zu erkennen.", "Gibt es nicht."], 
        en: ["To execute TypoScript code only if a frontend user is logged in (e.g. show user menu).", "To check backend users.", "To detect admins.", "Does not exist."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Standard-Condition für personalisierte Inhalte.", 
        en: "Standard condition for personalized content." 
      }
    },
    {
      id: 'gen-18',
      text: { 
        de: "Was ist ein 'Mount Point' (in Bezug auf Seiten-Typen)? (Wähle 1)", 
        en: "What is a 'Mount Point' (regarding page types)? (Select 1)" 
      },
      options: { 
        de: ["Ein Seitentyp, der einen anderen Teil des Seitenbaums an dieser Stelle einblendet/spiegelt (Multi-Use Content).", "Ein Linux Befehl.", "Ein Datenbank-Eintrag.", "Ein Bild."], 
        en: ["A page type that displays/mirrors another part of the page tree at this location (Multi-use content).", "A Linux command.", "A database entry.", "An image."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Erlaubt es, Seitenbäume mehrfach an verschiedenen Stellen der Website zu nutzen, ohne Inhalte zu duplizieren.", 
        en: "Allows using page trees multiple times in different locations of the website without duplicating content." 
      }
    },
    {
      id: 'gen-19',
      text: { 
        de: "Welche Auswirkung hat die Einstellung `config.absRefPrefix = /` im TypoScript? (Wähle 1)", 
        en: "What is the effect of the setting `config.absRefPrefix = /` in TypoScript? (Select 1)" 
      },
      options: { 
        de: ["Alle generierten Links (CSS, Bilder, Menüs) werden absolut zur Domain-Root generiert (beginnen mit `/`). Verhindert Probleme mit RealURL/Routing Pfaden.", "Alle Links werden absolut mit `http://domain.com/...` generiert.", "Links werden relativ generiert `../`.", "Deaktiviert das Caching."], 
        en: ["All generated links (CSS, images, menus) are generated absolute to the domain root (start with `/`). Prevents issues with RealURL/Routing paths.", "All links are generated absolute with `http://domain.com/...`.", "Links are generated relative `../`.", "Disables caching."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Essentiell für modernes Routing, damit Browser Pfade wie `/en/products/detail` korrekt auflösen können.", 
        en: "Essential for modern routing so browsers can correctly resolve paths like `/en/products/detail`." 
      }
    },
    {
      id: 'gen-20',
      text: { 
        de: "Ihr Kunde möchte, dass beim Kopieren von Inhalten die Header-Überschrift automatisch mit 'Copy of...' präfixiert wird. Wo stellen Sie das ein? (Wähle 1)", 
        en: "Your client wants the header headline to be automatically prefixed with 'Copy of...' when copying content. Where do you configure this? (Select 1)" 
      },
      options: { 
        de: ["In der `Page TSConfig` (`TCEMAIN.table.tt_content.disablePrependAtCopy = 0`).", "In `settings.php`.", "Im TypoScript Setup.", "In der Extension Konfiguration."], 
        en: ["In `Page TSConfig` (`TCEMAIN.table.tt_content.disablePrependAtCopy = 0`).", "In `settings.php`.", "In TypoScript Setup.", "In Extension Configuration."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "`TCEMAIN` steuert das Verhalten des DataHandlers bei DB-Operationen.", 
        en: "`TCEMAIN` controls the behavior of the DataHandler during DB operations." 
      }
    },
  ],
  [Topic.SECURITY]: [
    {
      id: 'sec-1',
      text: { 
        de: "Ein externer Sicherheits-Auditor bemängelt, dass Ihr TYPO3-System anfällig für 'Host Header Injection' ist. Ein Angreifer könnte Passwort-Reset-Links mit einer falschen Domain generieren. Welche Konfiguration in der `settings.php` ist fehlerhaft oder fehlt? (Wähle 1)", 
        en: "An external security auditor reports that your TYPO3 system is vulnerable to 'Host Header Injection'. An attacker could generate password reset links with a fake domain. Which configuration in `settings.php` is faulty or missing? (Select 1)" 
      },
      options: { 
        de: ["`$GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern']` ist auf `.*` (alles erlaubt) gesetzt, statt auf einen restriktiven Regex.", "`lockSSL` ist deaktiviert.", "`cookieDomain` ist leer.", "`displayErrors` ist an."], 
        en: ["`$GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern']` is set to `.*` (allow all), instead of a restrictive regex.", "`lockSSL` is disabled.", "`cookieDomain` is empty.", "`displayErrors` is on."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 nutzt den HTTP Host Header zur Link-Generierung. Wenn dieser nicht validiert wird (`trustedHostsPattern`), vertraut TYPO3 blind der Eingabe des Angreifers.", 
        en: "TYPO3 uses the HTTP Host Header for link generation. If this is not validated (`trustedHostsPattern`), TYPO3 blindly trusts the attacker's input." 
      }
    },
    {
      id: 'sec-2',
      text: { 
        de: "Sie übernehmen eine gehackte TYPO3-Installation. Der Angreifer hatte Zugriff auf das Install Tool. Welche Maßnahme ist Teil der 'Incident Response' Phase 'Recover' (Wiederherstellung), NACHDEM die Lücke geschlossen wurde? (Wähle 2)", 
        en: "You are taking over a hacked TYPO3 installation. The attacker had access to the Install Tool. Which measure is part of the 'Incident Response' phase 'Recover', AFTER the vulnerability has been closed? (Select 2)" 
      },
      options: { 
        de: ["Generieren eines neuen `encryptionKey` in der `settings.php` (macht alle alten Sessions/Cookies ungültig).", "Ändern aller Datenbank- und Install-Tool-Passwörter.", "Löschen des `var/cache` Ordners.", "Update auf die neuste Major Version."], 
        en: ["Generating a new `encryptionKey` in `settings.php` (invalidates all old sessions/cookies).", "Changing all database and Install Tool passwords.", "Deleting the `var/cache` folder.", "Updating to the newest major version."] 
      },
      correctIndices: [0, 1],
      explanation: { 
        de: "Wenn der Angreifer den Encryption Key kennt, kann er dauerhaft Backdoors (Tokens) generieren. Ein Reset ist zwingend.", 
        en: "If the attacker knows the Encryption Key, they can permanently generate backdoors (tokens). A reset is mandatory." 
      }
    },
    {
      id: 'sec-3',
      text: { 
        de: "Ein Kunde möchte, dass Redakteure SVG-Grafiken hochladen dürfen. Sie wissen, dass SVGs JavaScript enthalten können (XSS). Wie konfigurieren Sie TYPO3 v13 sicher? (Wähle 1)", 
        en: "A client wants editors to be allowed to upload SVG graphics. You know that SVGs can contain JavaScript (XSS). How do you configure TYPO3 v13 securely? (Select 1)" 
      },
      options: { 
        de: ["Aktivieren des nativen SVG Sanitizers (in v13 Standard) und sicherstellen, dass keine Hooks diesen umgehen.", "Verbot von SVGs.", "Nur Admins dürfen SVGs laden.", "SVGs in ein ZIP packen."], 
        en: ["Enable the native SVG sanitizer (default in v13) and ensure no hooks bypass it.", "Ban SVGs.", "Only admins allowed to upload SVGs.", "Pack SVGs in a ZIP."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 hat einen eingebauten Sanitizer, der `<script>` Tags aus SVGs entfernt. Dieser muss aktiv bleiben.", 
        en: "TYPO3 has a built-in sanitizer that removes `<script>` tags from SVGs. This must remain active." 
      }
    },
    {
      id: 'sec-4',
      text: { 
        de: "Warum ist die Einstellung `displayErrors = 0` im Production Context sicherheitsrelevant? Es geht nicht nur um Ästhetik. (Wähle 1)", 
        en: "Why is the setting `displayErrors = 0` in Production Context security-relevant? It's not just about aesthetics. (Select 1)" 
      },
      options: { 
        de: ["Verhindert 'Information Disclosure' (Full Path Disclosure, Stack Traces, Versionen), die Angreifer für gezielte Exploits nutzen.", "Spart Performance.", "Verhindert SQL Injection.", "Stoppt Hacker."], 
        en: ["Prevents 'Information Disclosure' (Full Path Disclosure, Stack Traces, Versions) which attackers use for targeted exploits.", "Saves performance.", "Prevents SQL Injection.", "Stops hackers."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Fehlermeldungen verraten oft interne Pfade (`/var/www/html/...`) oder Library-Versionen, die bekannte Lücken haben.", 
        en: "Error messages often reveal internal paths (`/var/www/html/...`) or library versions that have known vulnerabilities." 
      }
    },
    {
      id: 'sec-5',
      text: { 
        de: "Sie konfigurieren den Webserver (Nginx/Apache). Welches Sicherheits-Header-Set (HTTP Response Headers) empfehlen Sie als 'Best Practice' für eine TYPO3 v13 Installation? (Wähle 2)", 
        en: "You are configuring the web server (Nginx/Apache). Which security header set (HTTP Response Headers) do you recommend as 'Best Practice' for a TYPO3 v13 installation? (Select 2)" 
      },
      options: { 
        de: ["`Content-Security-Policy` (CSP) zur Steuerung erlaubter Ressourcen.", "`X-Content-Type-Options: nosniff` zur Verhinderung von MIME-Type Sniffing.", "`Server: Apache`.", "`X-Powered-By: PHP`."], 
        en: ["`Content-Security-Policy` (CSP) to control allowed resources.", "`X-Content-Type-Options: nosniff` to prevent MIME-type sniffing.", "`Server: Apache`.", "`X-Powered-By: PHP`."] 
      },
      correctIndices: [0, 1],
      explanation: { 
        de: "CSP und nosniff sind essenziell gegen XSS und Drive-by-Downloads. Banner-Header (Server/Powered-By) sollten hingegen ENTFERNT werden (Security by Obscurity).", 
        en: "CSP and nosniff are essential against XSS and drive-by downloads. Banner headers (Server/Powered-By) should be REMOVED (Security by Obscurity)." 
      }
    },
    // SET 2: Security Advanced
    {
      id: 'sec-6',
      text: { 
        de: "Was ist der Unterschied zwischen Cross-Site Scripting (XSS) und Cross-Site Request Forgery (CSRF) im Kontext von TYPO3? (Wähle 1)", 
        en: "What is the difference between Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) in the context of TYPO3? (Select 1)" 
      },
      options: { 
        de: ["XSS injiziert Code (JS) in die Seite (Vertrauen des Users in die Seite). CSRF missbraucht eine bestehende Session, um Aktionen auszuführen (Vertrauen der Seite in den User).", "XSS ist serverseitig, CSRF clientseitig.", "XSS betrifft Datenbanken, CSRF Dateien.", "Es ist dasselbe."], 
        en: ["XSS injects code (JS) into the page (User trust in Site). CSRF abuses an existing session to execute actions (Site trust in User).", "XSS is server-side, CSRF client-side.", "XSS affects databases, CSRF files.", "It is the same."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 schützt gegen CSRF mit Tokens im Backend und `SameSite` Cookies. Gegen XSS hilft Escaping (Fluid) und CSP.", 
        en: "TYPO3 protects against CSRF with tokens in the backend and `SameSite` cookies. Against XSS, escaping (Fluid) and CSP help." 
      }
    },
    {
      id: 'sec-7',
      text: { 
        de: "Ein Entwickler schlägt vor, den Ordner `public/fileadmin` via `.htaccess` für die Ausführung von PHP-Skripten zu sperren. Ist das eine valide Maßnahme? (Wähle 1)", 
        en: "A developer suggests blocking the execution of PHP scripts in the `public/fileadmin` folder via `.htaccess`. Is this a valid measure? (Select 1)" 
      },
      options: { 
        de: ["Ja, absolut. Dies (File Deny Pattern) ist eine wichtige 'Defense in Depth' Maßnahme, falls ein Angreifer eine Shell hochladen kann.", "Nein, TYPO3 braucht PHP im fileadmin.", "Nein, das macht die Firewall.", "Nur für Bilder."], 
        en: ["Yes, absolutely. This (File Deny Pattern) is an important 'Defense in Depth' measure in case an attacker manages to upload a shell.", "No, TYPO3 needs PHP in fileadmin.", "No, the firewall does that.", "Only for images."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Im `fileadmin` (User Content) darf niemals ausführbarer Code liegen oder ausgeführt werden.", 
        en: "Executable code should never reside or be executed in `fileadmin` (User Content)." 
      }
    },
    {
      id: 'sec-8',
      text: { 
        de: "Ein Kunde möchte den Zugriff auf das Backend (`/typo3`) auf das Firmen-VPN beschränken. Wo implementieren Sie dies idealerweise? (Wähle 1)", 
        en: "A client wants to restrict backend access (`/typo3`) to the company VPN. Where do you ideally implement this? (Select 1)" 
      },
      options: { 
        de: ["Im Webserver (Nginx/Apache) oder der Loadbalancer/Firewall Ebene. Dies entlastet PHP.", "In einer TYPO3 Middleware.", "Im Install Tool.", "Via User TSConfig."], 
        en: ["In the webserver (Nginx/Apache) or Loadbalancer/Firewall level. This offloads PHP.", "In a TYPO3 Middleware.", "In Install Tool.", "Via User TSConfig."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Blockierung so früh wie möglich (Layer 4/7) ist effizienter als in der Applikation (Layer 7).", 
        en: "Blocking as early as possible (Layer 4/7) is more efficient than within the application (Layer 7)." 
      }
    },
    {
      id: 'sec-9',
      text: { 
        de: "Welche Passwort-Strategie verfolgt TYPO3 v13 standardmäßig für Backend-User? (Wähle 1)", 
        en: "Which password strategy does TYPO3 v13 follow by default for backend users? (Select 1)" 
      },
      options: { 
        de: ["NIST-Guidelines: Keine erzwungene Rotation, aber Prüfung auf Komplexität und bekannte Leaks. Hashing mit Argon2i oder PBKDF2.", "Rotation alle 30 Tage erzwingen.", "MD5 Hashing.", "Maximal 8 Zeichen."], 
        en: ["NIST Guidelines: No forced rotation, but check for complexity and known leaks. Hashing with Argon2i or PBKDF2.", "Force rotation every 30 days.", "MD5 Hashing.", "Max 8 chars."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Sinnlose Rotation führt zu schwachen Passwörtern (Post-it am Monitor). Starke Algorithmen sind wichtiger.", 
        en: "Senseless rotation leads to weak passwords (Post-it on monitor). Strong algorithms are more important." 
      }
    },
    {
      id: 'sec-10',
      text: { 
        de: "Was ist die 'Content Security Policy' (CSP) Integration in TYPO3 v13? (Wähle 1)", 
        en: "What is the 'Content Security Policy' (CSP) integration in TYPO3 v13? (Select 1)" 
      },
      options: { 
        de: ["Ein Core-Feature (Admin Tools), um CSP-Header zu konfigurieren (Report-Only / Enforce) und Nonces für Inline-Scripts zu verwalten.", "Eine Drittanbieter-Extension.", "Gibt es nicht.", "Nur für Frontend."], 
        en: ["A core feature (Admin Tools) to configure CSP headers (Report-Only / Enforce) and manage nonces for inline scripts.", "A third-party extension.", "Does not exist.", "Only for frontend."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "TYPO3 bietet nun native Tools, um die komplexe CSP-Konfiguration zu verwalten und Reports zu sammeln.", 
        en: "TYPO3 now offers native tools to manage complex CSP configuration and collect reports." 
      }
    },
    // SET 3: DB & Integrity
    {
      id: 'sec-11',
      text: { 
        de: "Sie entwickeln eine Extension. Warum müssen Sie `QueryBuilder->createNamedParameter($input)` verwenden, statt `$input` direkt in den SQL-String zu konkatenieren? (Wähle 1)", 
        en: "You are developing an extension. Why must you use `QueryBuilder->createNamedParameter($input)` instead of concatenating `$input` directly into the SQL string? (Select 1)" 
      },
      options: { 
        de: ["Um SQL Injection zu verhindern. Der Parameter wird escaped und als Prepared Statement ausgeführt.", "Weil es schneller ist.", "Weil Concatenation in PHP veraltet ist.", "Damit der Cache funktioniert."], 
        en: ["To prevent SQL Injection. The parameter is escaped and executed as a Prepared Statement.", "Because it is faster.", "Because concatenation is deprecated in PHP.", "So that caching works."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "SQL Injection ist die Gefahr Nr. 1 bei DB-Abfragen. Prepared Statements trennen Befehl und Daten strikt.", 
        en: "SQL Injection is the #1 threat in DB queries. Prepared Statements strictly separate command and data." 
      }
    },
    {
      id: 'sec-12',
      text: { 
        de: "Das Log-Level in Ihrer Production-Instanz steht auf 'DEBUG'. Warum ist das ein DSGVO/Security Risiko? (Wähle 1)", 
        en: "The log level in your Production instance is set to 'DEBUG'. Why is this a GDPR/Security risk? (Select 1)" 
      },
      options: { 
        de: ["Debug-Logs enthalten oft vollständige Payloads, Session-IDs oder persönliche Daten (PII), die unverschlüsselt auf der Festplatte landen.", "Die Festplatte wird voll (DoS).", "TYPO3 wird langsamer.", "Es ist kein Risiko."], 
        en: ["Debug logs often contain full payloads, session IDs, or personal data (PII) stored unencrypted on disk.", "Disk fills up (DoS).", "TYPO3 becomes slower.", "It is no risk."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Production Logs sollten nur 'WARNING' oder 'ERROR' enthalten. Zu viel Logging verletzt Datensparsamkeit.", 
        en: "Production logs should only contain 'WARNING' or 'ERROR'. Excessive logging violates data minimization." 
      }
    },
    {
      id: 'sec-13',
      text: { 
        de: "Ein Admin hat sein Passwort vergessen und der Mail-Server streikt. Sie haben SSH Zugriff. Was ist der sicherste Weg, den Zugang wiederherzustellen? (Wähle 1)", 
        en: "An admin forgot their password and the mail server is down. You have SSH access. What is the safest way to restore access? (Select 1)" 
      },
      options: { 
        de: ["Nutzen Sie die TYPO3 Console (CLI): `bin/typo3 backend:user:passwordreset <username>`.", "Editieren Sie den Hash direkt in der Datenbank.", "Erstellen Sie einen neuen Admin im Install Tool.", "Löschen Sie den User."], 
        en: ["Use the TYPO3 Console (CLI): `bin/typo3 backend:user:passwordreset <username>`.", "Edit the hash directly in the database.", "Create a new admin in the Install Tool.", "Delete the user."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Die CLI Tools nutzen die korrekte Hashing-API des Cores. Manuelles DB-Editieren ist fehleranfällig.", 
        en: "The CLI tools use the correct core hashing API. Manual DB editing is error-prone." 
      }
    },
    {
      id: 'sec-14',
      text: { 
        de: "Was müssen Sie beachten, wenn Sie Multi-Factor Authentication (MFA) für alle Backend-User erzwingen wollen? (Wähle 1)", 
        en: "What must you consider if you want to enforce Multi-Factor Authentication (MFA) for all backend users? (Select 1)" 
      },
      options: { 
        de: ["Es muss global in der Konfiguration aktiviert werden. User müssen beim nächsten Login MFA einrichten, sonst werden sie ausgesperrt. Schulung ist notwendig.", "Es geht nicht global.", "Es kostet extra.", "Nur für Admins möglich."], 
        en: ["It must be enabled globally in configuration. Users must set up MFA on next login, otherwise they are locked out. Training is necessary.", "Cannot be done globally.", "Costs extra.", "Possible only for admins."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "MFA ist ein Core-Feature. Der Rollout erfordert Change Management.", 
        en: "MFA is a core feature. Rollout requires change management." 
      }
    },
    {
      id: 'sec-15',
      text: { 
        de: "Das 'Security Status' Widget im Backend-Report-Modul zeigt 'Critical'. Was könnte eine Ursache sein? (Wähle 2)", 
        en: "The 'Security Status' widget in the Backend Report Module shows 'Critical'. What could be a cause? (Select 2)" 
      },
      options: { 
        de: ["Ein Admin-User nutzt noch das Standard-Passwort 'password'.", "Der 'trustedHostsPattern' ist unsicher konfiguriert.", "Der Cache ist voll.", "Eine Extension ist veraltet (aber sicher)."], 
        en: ["An admin user is still using the default password 'password'.", "The 'trustedHostsPattern' is insecurely configured.", "The cache is full.", "An extension is outdated (but secure)."] 
      },
      correctIndices: [0, 1],
      explanation: { 
        de: "Der Report prüft auf offensichtliche Fehlkonfigurationen.", 
        en: "The report checks for obvious misconfigurations." 
      }
    },
    // SET 4: Further Security Measures
    {
      id: 'sec-16',
      text: { 
        de: "Welche Bedeutung hat das 'SameSite' Cookie Attribut für TYPO3? (Wähle 1)", 
        en: "What is the significance of the 'SameSite' cookie attribute for TYPO3? (Select 1)" 
      },
      options: { 
        de: ["Es definiert, ob Cookies bei Cross-Site Requests (z.B. Link von externer Seite) gesendet werden. 'Lax' ist Standard und schützt vor CSRF.", "Es verschlüsselt Cookies.", "Es speichert Cookies lokal.", "Es synchronisiert Cookies zwischen Servern."], 
        en: ["It defines whether cookies are sent with Cross-Site requests (e.g. link from external site). 'Lax' is default and protects against CSRF.", "It encrypts cookies.", "It stores cookies locally.", "It synchronizes cookies between servers."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Moderne Browser-Security. TYPO3 setzt dies standardmäßig.", 
        en: "Modern browser security. TYPO3 sets this by default." 
      }
    },
    {
      id: 'sec-17',
      text: { 
        de: "Sie finden das Verzeichnis `var/` im Web-Root (`public/var/`). Warum ist das ein kritisches Risiko? (Wähle 1)", 
        en: "You find the `var/` directory inside the Web-Root (`public/var/`). Why is this a critical risk? (Select 1)" 
      },
      options: { 
        de: ["Es enthält Logs und Caches, die sensible Systeminformationen offenlegen können. Es muss außerhalb des Web-Roots liegen oder per Webserver-Config geschützt sein.", "Es sieht unschön aus.", "PHP kann nicht schreiben.", "Datenbank geht kaputt."], 
        en: ["It contains logs and caches that can reveal sensitive system information. It must be outside the Web-Root or protected by webserver config.", "It looks ugly.", "PHP cannot write.", "Database breaks."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Information Disclosure. Angreifer scannen gezielt nach `/var/log/typo3_...log`.", 
        en: "Information Disclosure. Attackers explicitly scan for `/var/log/typo3_...log`." 
      }
    },
    {
      id: 'sec-18',
      text: { 
        de: "Was verhindert der Header `X-Frame-Options: SAMEORIGIN` (oder die CSP Entsprechung `frame-ancestors`)? (Wähle 1)", 
        en: "What does the header `X-Frame-Options: SAMEORIGIN` (or the CSP equivalent `frame-ancestors`) prevent? (Select 1)" 
      },
      options: { 
        de: ["Clickjacking. Verhindert, dass das TYPO3 Backend in einem unsichtbaren iFrame auf einer fremden Seite geladen wird.", "XSS.", "SQL Injection.", "DDoS."], 
        en: ["Clickjacking. Prevents the TYPO3 backend from being loaded in an invisible iframe on a foreign site.", "XSS.", "SQL Injection.", "DDoS."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Standard-Schutz für Admin-Interfaces.", 
        en: "Standard protection for admin interfaces." 
      }
    },
    {
      id: 'sec-19',
      text: { 
        de: "Warum müssen Sie den `encryptionKey` bei der Installation ändern und geheim halten? (Wähle 1)", 
        en: "Why must you change the `encryptionKey` during installation and keep it secret? (Select 1)" 
      },
      options: { 
        de: ["Er wird zum Signieren von Tokens (z.B. File-Uploads, Passwort-Reset) genutzt. Kennt ihn ein Angreifer, kann er das System übernehmen.", "Er verschlüsselt die Datenbank.", "Er ist das Root-Passwort.", "Für HTTPS."], 
        en: ["It is used to sign tokens (e.g. file uploads, password reset). If an attacker knows it, they can take over the system.", "It encrypts the database.", "It is the root password.", "For HTTPS."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Der Key ist das 'Shared Secret' des Systems.", 
        en: "The key is the 'Shared Secret' of the system." 
      }
    },
    {
      id: 'sec-20',
      text: { 
        de: "Ein Admin aktiviert dauerhaft `ADMIN_TOOL_ENABLE_INSTALL_TOOL_IN_CONTEXT` in der `settings.php` auf Production. Wie bewerten Sie das? (Wähle 1)", 
        en: "An admin permanently enables `ADMIN_TOOL_ENABLE_INSTALL_TOOL_IN_CONTEXT` in `settings.php` on Production. How do you assess this? (Select 1)" 
      },
      options: { 
        de: ["Sicherheitsrisiko. Das Install Tool erlaubt volle Systemübernahme. Es sollte nur temporär bei Bedarf aktiviert werden.", "Praktisch für Wartung.", "Standard-Vorgehen.", "Egal, ist ja Passwort-geschützt."], 
        en: ["Security risk. The Install Tool allows full system takeover. It should only be enabled temporarily when needed.", "Convenient for maintenance.", "Standard procedure.", "Doesn't matter, it's password protected."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Reduzierung der Angriffsfläche. Auch Passwörter können geleakt werden.", 
        en: "Reducing attack surface. Even passwords can be leaked." 
      }
    },
  ],
  [Topic.ACCESSIBILITY]: [
    // SET 1
    {
      id: 'a11y-1',
      text: { 
        de: "Welches Konformitätslevel der WCAG 2.1 ist für öffentliche Stellen in der EU (gemäß BITV 2.0 / EN 301 549) gesetzlich vorgeschrieben? (Wähle 1)", 
        en: "Which WCAG 2.1 conformance level is legally required for public bodies in the EU (according to BITV 2.0 / EN 301 549)? (Select 1)" 
      },
      options: { 
        de: ["Level AA", "Level A", "Level AAA", "Level Null"], 
        en: ["Level AA", "Level A", "Level AAA", "Level Zero"] 
      },
      correctIndices: [0],
      explanation: { 
        de: "AA ist der Standard. AAA ist für spezielle Zielgruppen, A ist zu wenig.", 
        en: "AA is the standard. AAA is for special target groups, A is insufficient." 
      }
    },
    {
      id: 'a11y-2',
      text: { 
        de: "Sie binden ein rein dekoratives Bild ein (z.B. eine Trennlinie oder ein Hintergrund-Muster). Wie muss das `alt`-Attribut aussehen, damit Screenreader es korrekt ignorieren? (Wähle 1)", 
        en: "You are embedding a purely decorative image (e.g., a divider or background pattern). How must the `alt` attribute look so screen readers correctly ignore it? (Select 1)" 
      },
      options: { 
        de: ["`alt=\"\"` (leer)", "`alt=\"deko\"`", "Das Attribut weglassen", "`alt=\"Bild\"`"], 
        en: ["`alt=\"\"` (empty)", "`alt=\"deco\"`", "Omit the attribute", "`alt=\"Image\"`"] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Ein leeres Alt-Attribut signalisiert: 'Dieses Bild hat keine inhaltliche Relevanz'. Weglassen führt dazu, dass der Dateiname vorgelesen wird (schlecht).", 
        en: "An empty Alt attribute signals: 'This image has no content relevance'. Omitting it causes the filename to be read out (bad)." 
      }
    },
    {
      id: 'a11y-3',
      text: { 
        de: "Was ist ein 'Skip-Link' und warum ist er wichtig? (Wähle 1)", 
        en: "What is a 'Skip Link' and why is it important? (Select 1)" 
      },
      options: { 
        de: ["Ein versteckter Link am Anfang der Seite, der es Tastatur-Nutzern erlaubt, die Navigation zu überspringen und direkt zum Hauptinhalt zu springen.", "Ein Link, der defekte Seiten überspringt.", "Ein Link zur Startseite.", "Ein Link im Footer."], 
        en: ["A hidden link at the top of the page allowing keyboard users to skip navigation and jump directly to the main content.", "A link skipping broken pages.", "A link to the homepage.", "A link in the footer."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Ohne Skip-Link müssen Tastatur-Nutzer auf JEDER Unterseite erst durch 50 Menüpunkte tabben, bevor sie den Text lesen können.", 
        en: "Without a Skip Link, keyboard users have to tab through 50 menu items on EVERY subpage before reading the text." 
      }
    },
    {
      id: 'a11y-4',
      text: { 
        de: "Ein Formularfeld hat keinen sichtbaren Label-Text, sondern nur einen `placeholder=\"Suche...\"`. Ist das barrierefrei? (Wähle 1)", 
        en: "A form field has no visible label text, only a `placeholder=\"Search...\"`. Is this accessible? (Select 1)" 
      },
      options: { 
        de: ["Nein. Placeholder verschwinden beim Tippen und haben oft zu wenig Kontrast. Ein echtes `<label>` (ggf. visuell versteckt, aber im Code vorhanden) ist Pflicht.", "Ja, das reicht.", "Ja, wenn es rot ist.", "Kommt auf den Browser an."], 
        en: ["No. Placeholders disappear when typing and often have poor contrast. A real `<label>` (visually hidden if needed, but present in code) is mandatory.", "Yes, that's enough.", "Yes, if it is red.", "Depends on the browser."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Placeholder sind keine Labels. Screenreader benötigen die Verknüpfung via `for`-Attribut oder `aria-label`.", 
        en: "Placeholders are not labels. Screen readers need the association via `for` attribute or `aria-label`." 
      }
    },
    {
      id: 'a11y-5',
      text: { 
        de: "Welche Bedeutung hat die semantische HTML-Struktur (H1-H6) für Screenreader? (Wähle 1)", 
        en: "What is the significance of semantic HTML structure (H1-H6) for screen readers? (Select 1)" 
      },
      options: { 
        de: ["Sie dient als primäres Navigationsmittel. Blinde Nutzer springen oft von Überschrift zu Überschrift, um den Inhalt zu scannen.", "Sie ist nur für SEO wichtig.", "Sie steuert die Lautstärke.", "Sie ist egal, CSS macht die Optik."], 
        en: ["It serves as the primary navigation tool. Blind users often jump from heading to heading to scan content.", "It is only important for SEO.", "It controls volume.", "It doesn't matter, CSS handles visuals."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Eine logische Hierarchie (H1 -> H2 -> H3) ohne Sprünge ist essenziell für die Orientierung.", 
        en: "A logical hierarchy (H1 -> H2 -> H3) without skips is essential for orientation." 
      }
    },
    // SET 2
    {
      id: 'a11y-6',
      text: { 
        de: "Ihr Designer wählt ein hellgraues Text (#999) auf weißem Hintergrund (#FFF). Der Kontrastwert ist 2.8:1. Entspricht dies WCAG AA für normalen Text? (Wähle 1)", 
        en: "Your designer chooses light gray text (#999) on a white background (#FFF). The contrast ratio is 2.8:1. Does this meet WCAG AA for normal text? (Select 1)" 
      },
      options: { 
        de: ["Nein. WCAG AA erfordert mindestens 4.5:1 für normalen Text (und 3:1 für großen Text).", "Ja, es ist lesbar.", "Ja, bei großen Monitoren.", "Kommt auf die Schriftart an."], 
        en: ["No. WCAG AA requires at least 4.5:1 for normal text (and 3:1 for large text).", "Yes, it is readable.", "Yes, on large monitors.", "Depends on the font."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Kontrast ist messbar. 4.5:1 ist die magische Grenze.", 
        en: "Contrast is measurable. 4.5:1 is the magic threshold." 
      }
    },
    {
      id: 'a11y-7',
      text: { 
        de: "Ein Entwickler entfernt den Fokus-Rahmen via CSS: `*:focus { outline: none; }`, weil er 'hässlich' sei. Was ist die Konsequenz für Barrierefreiheit? (Wähle 1)", 
        en: "A developer removes the focus outline via CSS: `*:focus { outline: none; }` because it looks 'ugly'. What is the consequence for accessibility? (Select 1)" 
      },
      options: { 
        de: ["Katastrophal für Tastaturnutzer. Sie sehen nicht mehr, wo sie sich auf der Seite befinden. Es muss zwingend ein sichtbarer Ersatz-Stil definiert werden.", "Kein Problem, Mausnutzer brauchen das nicht.", "Gut für das Design.", "Egal."], 
        en: ["Catastrophic for keyboard users. They no longer see where they are on the page. A visible replacement style must be defined.", "No problem, mouse users don't need it.", "Good for design.", "Doesn't matter."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Visible Focus ist Pflicht. `outline: none` ohne Ersatz ist ein KO-Kriterium.", 
        en: "Visible Focus is mandatory. `outline: none` without replacement is a failure criterion." 
      }
    },
    {
      id: 'a11y-8',
      text: { 
        de: "Warum sind Linktexte wie 'Hier klicken' oder 'Mehr' problematisch für Screenreader-Nutzer? (Wähle 1)", 
        en: "Why are link texts like 'Click here' or 'More' problematic for screen reader users? (Select 1)" 
      },
      options: { 
        de: ["Wenn Screenreader eine Liste aller Links auf der Seite anzeigen ('Link List'), fehlt der Kontext. 'Mehr' sagt nichts über das Ziel aus.", "Sie sind zu kurz.", "Sie sind unhöflich.", "Google mag sie nicht."], 
        en: ["When screen readers display a list of all links on the page ('Link List'), context is missing. 'More' says nothing about the destination.", "They are too short.", "They are rude.", "Google doesn't like them."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Links müssen aus sich selbst heraus verständlich sein (z.B. 'Mehr über Produkte erfahren').", 
        en: "Links must be understandable on their own (e.g., 'Learn more about products')." 
      }
    },
    {
      id: 'a11y-9',
      text: { 
        de: "Welche Medien-Alternative benötigen Sie zwingend für ein vorab aufgezeichnetes Video mit Ton, um WCAG A zu erfüllen? (Wähle 1)", 
        en: "Which media alternative is mandatory for a pre-recorded video with audio to meet WCAG A? (Select 1)" 
      },
      options: { 
        de: ["Untertitel (Captions) oder ein Volltext-Transkript.", "Audiodeskription.", "Gebärdensprache.", "HD Qualität."], 
        en: ["Captions or a full-text transcript.", "Audio description.", "Sign language.", "HD Quality."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Gehörlose Nutzer brauchen den Inhalt als Text.", 
        en: "Deaf users need the content as text." 
      }
    },
    {
      id: 'a11y-10',
      text: { 
        de: "Wofür werden ARIA Landmarks (`role=\"banner\"`, `role=\"main\"`, `role=\"navigation\"`) genutzt? (Wähle 1)", 
        en: "What are ARIA Landmarks (`role=\"banner\"`, `role=\"main\"`, `role=\"navigation\"`) used for? (Select 1)" 
      },
      options: { 
        de: ["Sie ermöglichen Screenreadern, direkt zu großen Seitenbereichen zu springen (ähnlich wie Skip-Links).", "Sie stylen die Seite.", "Sie sind für Google Maps.", "Sie sind veraltet."], 
        en: ["They allow screen readers to jump directly to major page regions (similar to skip links).", "They style the page.", "They are for Google Maps.", "They are obsolete."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Strukturelle Navigation ist essenziell für blinde Nutzer.", 
        en: "Structural navigation is essential for blind users." 
      }
    },
    // SET 3
    {
      id: 'a11y-11',
      text: { 
        de: "Der Corporate-Styleguide Ihres Kunden erlaubt beliebige Textfarben. Sie müssen den CKEditor (RTE) konfigurieren. Welche Strategie empfiehlt sich für Barrierefreiheit? (Wähle 1)", 
        en: "Your client's corporate style guide allows arbitrary text colors. You need to configure the CKEditor (RTE). Which strategy is recommended for accessibility? (Select 1)" 
      },
      options: { 
        de: ["Einschränken der Farbpalette auf vorab geprüfte, kontrastreiche Kombinationen oder Deaktivieren der Farbauswahl zugunsten von CSS-Klassen.", "Erlauben aller Farben.", "Warnmeldung anzeigen.", "Automatische Korrektur."], 
        en: ["Restrict the color palette to pre-tested, high-contrast combinations or disable color selection in favor of CSS classes.", "Allow all colors.", "Show warning.", "Auto-correction."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Redakteure sollten technisch daran gehindert werden, unlesbaren Text zu erzeugen (Poka Yoke).", 
        en: "Editors should be technically prevented from creating unreadable text (Poka Yoke)." 
      }
    },
    {
      id: 'a11y-12',
      text: { 
        de: "Ein deutscher Text enthält ein englisches Zitat. Wie zeichnen Sie dieses korrekt aus? (Wähle 1)", 
        en: "A German text contains an English quote. How do you mark this up correctly? (Select 1)" 
      },
      options: { 
        de: ["Mit `<span lang=\"en\">...</span>`. Der Screenreader wechselt dann die Aussprache.", "Mit `<i>...</i>`.", "Gar nicht.", "Mit Anführungszeichen."], 
        en: ["With `<span lang=\"en\">...</span>`. The screen reader will then switch pronunciation.", "With `<i>...</i>`.", "Not at all.", "With quotation marks."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Sprachwechsel sind wichtig für die Verständlichkeit bei der Sprachausgabe.", 
        en: "Language switches are important for intelligibility in speech output." 
      }
    },
    {
      id: 'a11y-13',
      text: { 
        de: "Eine Banking-Applikation loggt den User nach 10 Minuten Inaktivität aus. Was fordert WCAG bezüglich dieses Timeouts? (Wähle 1)", 
        en: "A banking application logs the user out after 10 minutes of inactivity. What does WCAG require regarding this timeout? (Select 1)" 
      },
      options: { 
        de: ["Der Nutzer muss gewarnt werden und die Möglichkeit haben, die Zeit zu verlängern (z.B. 'Drücken Sie Taste X').", "Das ist okay so.", "Timeouts sind verboten.", "Nur visuelle Warnung."], 
        en: ["The user must be warned and given the opportunity to extend the time (e.g. 'Press key X').", "That's fine.", "Timeouts are forbidden.", "Visual warning only."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Langsame Nutzer (Motorik/Lesen) brauchen mehr Zeit.", 
        en: "Slow users (motor/reading) need more time." 
      }
    },
    {
      id: 'a11y-14',
      text: { 
        de: "Sie nutzen ein klassisches Bild-Captcha ('Wieviele Ampeln sehen Sie?'). Warum ist das ein Accessibility-Problem? (Wähle 1)", 
        en: "You are using a classic image captcha ('How many traffic lights do you see?'). Why is this an accessibility problem? (Select 1)" 
      },
      options: { 
        de: ["Es sperrt blinde Nutzer aus, da das Bild nicht per Alt-Text beschrieben werden kann (sonst wäre es sinnlos). Alternative: Audio-Captcha oder Honeypot.", "Es ist zu schwer.", "Es ist hässlich.", "Es lädt langsam."], 
        en: ["It locks out blind users because the image cannot be described via alt-text (otherwise it would be pointless). Alternative: Audio captcha or Honeypot.", "It is too hard.", "It is ugly.", "It loads slowly."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Turing-Tests müssen multimodal sein (Bild + Audio) oder unsichtbar (No-Captcha).", 
        en: "Turing tests must be multimodal (Image + Audio) or invisible (No-Captcha)." 
      }
    },
    {
      id: 'a11y-15',
      text: { 
        de: "Warum ist Valides HTML (Parsing) wichtig für Accessibility? (Wähle 1)", 
        en: "Why is Valid HTML (Parsing) important for accessibility? (Select 1)" 
      },
      options: { 
        de: ["Verschachtelungsfehler (z.B. nicht geschlossene Tags, doppelte IDs) können dazu führen, dass Screenreader den Seitenbaum falsch interpretieren oder abstürzen.", "Nur für SEO wichtig.", "Ist egal, Browser reparieren das.", "Nur für Perfektionisten."], 
        en: ["Nesting errors (e.g., unclosed tags, duplicate IDs) can cause screen readers to misinterpret the page tree or crash.", "Only important for SEO.", "Doesn't matter, browsers fix it.", "Only for perfectionists."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Assistive Technologien verlassen sich auf den DOM. Kaputter DOM = Kaputte Ausgabe.", 
        en: "Assistive technologies rely on the DOM. Broken DOM = Broken output." 
      }
    },
    // SET 4: A11y Deep Dive
    {
      id: 'a11y-16',
      text: { 
        de: "Was ist eine 'Keyboard Trap' (Tastaturfalle) und wo tritt sie häufig auf? (Wähle 1)", 
        en: "What is a 'Keyboard Trap' and where does it commonly occur? (Select 1)" 
      },
      options: { 
        de: ["Ein UI-Element (oft Modals oder Video-Player), in das man per Tab hinein gelangt, aber nicht mehr hinaus. Der Fokus ist gefangen.", "Eine physische Falle.", "Ein defektes Keyboard.", "Ein Sicherheitsfeature."], 
        en: ["A UI element (often modals or video players) that you can tab into but not out of. The focus is trapped.", "A physical trap.", "A broken keyboard.", "A security feature."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Nutzer müssen den Fokus immer bewegen können. JS-Widgets müssen dies sicherstellen.", 
        en: "Users must always be able to move focus. JS widgets must ensure this." 
      }
    },
    {
      id: 'a11y-17',
      text: { 
        de: "In einem Formular werden Fehler nur durch einen roten Rahmen um das Eingabefeld angezeigt. Warum verstößt dies gegen WCAG (Use of Color)? (Wähle 1)", 
        en: "In a form, errors are indicated only by a red border around the input field. Why does this violate WCAG (Use of Color)? (Select 1)" 
      },
      options: { 
        de: ["Informationen dürfen nicht ausschließlich durch Farbe vermittelt werden (Farbenblindheit). Es wird ein zusätzliches Icon oder Text benötigt.", "Rot ist aggressiv.", "Rahmen sind veraltet.", "Gar nicht."], 
        en: ["Information must not be conveyed solely by color (color blindness). An additional icon or text is required.", "Red is aggressive.", "Borders are outdated.", "Not at all."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Rot-Grün-Blinde sehen den Fehler nicht. Redundante Codierung (Farbe + Form/Text) ist nötig.", 
        en: "Red-green blind users won't see the error. Redundant coding (Color + Shape/Text) is necessary." 
      }
    },
    {
      id: 'a11y-18',
      text: { 
        de: "Ihr CSS nutzt Parallax-Effekte und schnelle Animationen. Ein User hat in seinem Betriebssystem 'Bewegung reduzieren' aktiviert. Wie reagieren Sie? (Wähle 1)", 
        en: "Your CSS uses parallax effects and fast animations. A user has enabled 'Reduce Motion' in their OS. How do you respond? (Select 1)" 
      },
      options: { 
        de: ["Media Query `@media (prefers-reduced-motion: reduce)` nutzen, um Animationen zu deaktivieren.", "Ignorieren.", "Langsamere Animation.", "Warnung anzeigen."], 
        en: ["Use media query `@media (prefers-reduced-motion: reduce)` to disable animations.", "Ignore.", "Slower animation.", "Show warning."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Vestibuläre Störungen können Übelkeit verursachen. Der User-Wunsch muss respektiert werden.", 
        en: "Vestibular disorders can cause nausea. The user preference must be respected." 
      }
    },
    {
      id: 'a11y-19',
      text: { 
        de: "Ein Entwickler nutzt `<table>` für das Layout der Startseite, um Spalten zu erzeugen. Was ist das Problem? (Wähle 1)", 
        en: "A developer uses `<table>` for the homepage layout to create columns. What is the problem? (Select 1)" 
      },
      options: { 
        de: ["Tabellen sind semantisch für Daten gedacht. Screenreader navigieren im 'Table Mode' (Zeile/Spalte), was bei Layouts verwirrt.", "Google straft das ab.", "Es ist langsamer.", "Kein Problem."], 
        en: ["Tables are semantically for data. Screen readers navigate in 'Table Mode' (Row/Column), which is confusing for layouts.", "Google penalizes it.", "It is slower.", "No problem."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Layout gehört ins CSS (Grid/Flexbox), nicht ins HTML.", 
        en: "Layout belongs in CSS (Grid/Flexbox), not HTML." 
      }
    },
    {
      id: 'a11y-20',
      text: { 
        de: "Sie bauen ein Custom Dropdown-Menü mit `<div>`s. Was fehlt, damit es barrierefrei ist? (Wähle 1)", 
        en: "You are building a custom dropdown menu using `<div>`s. What is missing for it to be accessible? (Select 1)" 
      },
      options: { 
        de: ["Tastatur-Support (Enter/Space zum Öffnen, Pfeiltasten) und ARIA-Attribute (`aria-expanded`, `role=\"listbox\"`).", "CSS Hover.", "JavaScript.", "Schöne Farben."], 
        en: ["Keyboard support (Enter/Space to open, arrow keys) and ARIA attributes (`aria-expanded`, `role=\"listbox\"`).", "CSS Hover.", "JavaScript.", "Nice colors."] 
      },
      correctIndices: [0],
      explanation: { 
        de: "Native HTML-Elemente (`<select>`) bringen das mit. Custom Widgets müssen dies manuell nachbauen.", 
        en: "Native HTML elements (`<select>`) have this built-in. Custom widgets must implement this manually." 
      }
    },
  ],
  [Topic.ASSOCIATION]: [
    // SET 1: Structure & Purpose
    {
      id: 'assoc-1',
      text: {
        de: "Ein Kunde möchte die Weiterentwicklung von TYPO3 finanziell unterstützen und gleichzeitig Marketing-Vorteile (Listing) erhalten. Welches Modell empfehlen Sie? (Wähle 1)",
        en: "A client wants to financially support the development of TYPO3 while gaining marketing benefits (listing). Which model do you recommend? (Select 1)"
      },
      options: {
        de: ["Eine 'Platinum Membership' in der TYPO3 Association. Dies fördert das Ökosystem und bietet maximale Sichtbarkeit im Professional Service Listing.", "Eine Spende an das Core Team.", "Den Kauf von ELTS Lizenzen.", "Sponsoring eines lokalen TYPO3 Camps."],
        en: ["A 'Platinum Membership' in the TYPO3 Association. This supports the ecosystem and offers maximum visibility in the Professional Service Listing.", "A donation to the Core Team.", "Buying ELTS licenses.", "Sponsoring a local TYPO3 Camp."]
      },
      correctIndices: [0],
      explanation: {
        de: "Mitgliedschaften (Bronze bis Platinum) sind der primäre Weg für Firmen, die Association dauerhaft zu stützen und Marketing-Vorteile zu erhalten.",
        en: "Memberships (Bronze to Platinum) are the primary way for companies to support the Association long-term and gain marketing benefits."
      }
    },
    {
      id: 'assoc-2',
      text: {
        de: "Wer ist der rechtliche Inhaber der Marke 'TYPO3' (Trademark Owner)? (Wähle 1)",
        en: "Who is the legal owner of the 'TYPO3' trademark? (Select 1)"
      },
      options: {
        de: ["Die TYPO3 Association (Schweizer Verein).", "Die TYPO3 GmbH.", "Kasper Skårhøj.", "Die Open Source Initiative."],
        en: ["The TYPO3 Association (Swiss Association).", "The TYPO3 GmbH.", "Kasper Skårhøj.", "The Open Source Initiative."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die Association hält die Markenrechte, um den Namen vor Missbrauch zu schützen. Die GmbH ist eine Tochtergesellschaft.",
        en: "The Association holds the trademark rights to protect the name from misuse. The GmbH is a subsidiary."
      }
    },
    {
      id: 'assoc-3',
      text: {
        de: "Was ist der Hauptzweck der 'TYPO3 GmbH' im Gegensatz zur Association? (Wähle 1)",
        en: "What is the main purpose of the 'TYPO3 GmbH' compared to the Association? (Select 1)"
      },
      options: {
        de: ["Erbringung kommerzieller Dienstleistungen (SLA, ELTS, Partner Programm) zur Unterstützung der Association und Professionalisierung.", "Entwicklung des Core-Codes.", "Organisation von Community Events.", "Verwaltung der Mitglieder."],
        en: ["Providing commercial services (SLA, ELTS, Partner Program) to support the Association and professionalization.", "Developing the core code.", "Organizing community events.", "Managing members."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die GmbH ist der kommerzielle Arm (Service Company), während die Association als Non-Profit Verein (Community) agiert.",
        en: "The GmbH is the commercial arm (Service Company), while the Association acts as a non-profit organization (Community)."
      }
    },
    {
      id: 'assoc-4',
      text: {
        de: "Ein Kunde fragt nach 'ELTS'. Wann ist dieses Produkt relevant? (Wähle 1)",
        en: "A client asks about 'ELTS'. When is this product relevant? (Select 1)"
      },
      options: {
        de: ["Wenn eine LTS-Version das Ende des kostenlosen Community-Supports (3 Jahre) erreicht hat, aber noch bis zu 3 weitere Jahre Sicherheitsupdates benötigt werden.", "Sofort nach Release einer neuen Version.", "Für experimentelle Features.", "Für Hosting."],
        en: ["When an LTS version has reached the end of free community support (3 years) but requires security updates for up to 3 more years.", "Immediately after a new version release.", "For experimental features.", "For hosting."]
      },
      correctIndices: [0],
      explanation: {
        de: "ELTS (Extended Long Term Support) verlängert den Lebenszyklus von 3 auf 6 Jahre gegen Gebühr.",
        en: "ELTS (Extended Long Term Support) extends the lifecycle from 3 to 6 years for a fee."
      }
    },
    {
      id: 'assoc-5',
      text: {
        de: "Welches Organ kontrolliert die Finanzen und den Vorstand (Board) der TYPO3 Association? (Wähle 1)",
        en: "Which body monitors the finances and the Board of the TYPO3 Association? (Select 1)"
      },
      options: {
        de: ["Das Business Control Committee (BCC).", "Die General Assembly.", "Das Expert Advisory Board.", "Der Präsident."],
        en: ["The Business Control Committee (BCC).", "The General Assembly.", "The Expert Advisory Board.", "The President."]
      },
      correctIndices: [0],
      explanation: {
        de: "Das BCC wird direkt von den Mitgliedern gewählt, um die Arbeit des Boards unabhängig zu prüfen.",
        en: "The BCC is elected directly by the members to independently audit the Board's work."
      }
    },
    // SET 2: Voting & Community
    {
      id: 'assoc-6',
      text: {
        de: "Eine Agentur ist Platinum Member. Wie viele Stimmen hat sie bei der General Assembly (GA)? (Wähle 1)",
        en: "An agency is a Platinum Member. How many votes does it have at the General Assembly (GA)? (Select 1)"
      },
      options: {
        de: ["Keine automatischen Firmenstimmen. Nur persönliche Mitglieder ('Community Members') haben Stimmrecht (1 Person = 1 Stimme).", "10 Stimmen.", "1 Stimme.", "Abhängig vom Umsatz."],
        en: ["No automatic company votes. Only personal members ('Community Members') have voting rights (1 person = 1 vote).", "10 votes.", "1 vote.", "Depending on revenue."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die Struktur ist basisdemokratisch. Firmen kaufen oft 'Community Memberships' für ihre Mitarbeiter, damit diese wählen können.",
        en: "The structure is grassroots democratic. Companies often buy 'Community Memberships' for their employees so they can vote."
      }
    },
    {
      id: 'assoc-7',
      text: {
        de: "Was ist das 'Community Budget' und wer entscheidet darüber? (Wähle 1)",
        en: "What is the 'Community Budget' and who decides on it? (Select 1)"
      },
      options: {
        de: ["Ein Fördertopf für Ideen/Projekte aus der Community. Die Mitglieder stimmen in einem Online-Poll über die Verteilung ab.", "Das Gehalt des Vorstands.", "Geld für Marketing.", "Entscheidet allein der Präsident."],
        en: ["A funding pool for ideas/projects from the community. Members vote on distribution in an online poll.", "The board's salary.", "Money for marketing.", "Decided solely by the President."]
      },
      correctIndices: [0],
      explanation: {
        de: "Das Community Budget ermöglicht es jedem Mitglied, Ideen einzureichen und finanzieren zu lassen.",
        en: "The Community Budget allows any member to submit ideas and get them funded."
      }
    },
    {
      id: 'assoc-8',
      text: {
        de: "Welche Rolle spielen 'Teams' und 'Committees' (z.B. Education Committee)? (Wähle 1)",
        en: "What role do 'Teams' and 'Committees' (e.g., Education Committee) play? (Select 1)"
      },
      options: {
        de: ["Sie leisten die operative Arbeit in spezifischen Bereichen (Zertifizierung, Events, Security). Mitglieder werden meist berufen.", "Sie sind nur zur Dekoration.", "Sie sind externe Prüfer.", "Sie entwickeln nur Extensions."],
        en: ["They perform operational work in specific areas (Certification, Events, Security). Members are usually appointed.", "They are just for decoration.", "They are external auditors.", "They only develop extensions."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die eigentliche Facharbeit (z.B. Erstellung von Prüfungsfragen) passiert in den Committees.",
        en: "The actual professional work (e.g. creating exam questions) happens in the committees."
      }
    },
    {
      id: 'assoc-9',
      text: {
        de: "Ein Kunde möchte sicherstellen, dass seine Agentur qualifiziert ist. Worauf sollte er achten? (Wähle 1)",
        en: "A client wants to ensure their agency is qualified. What should they look for? (Select 1)"
      },
      options: {
        de: ["Ob die Agentur 'TYPO3 Association Member' ist und idealerweise 'TYPO3 Partner' (geprüft durch GmbH) ist, sowie zertifizierte Mitarbeiter hat.", "Ob sie das Logo auf der Website haben.", "Ob sie am billigsten sind.", "Ob sie in der Schweiz sitzen."],
        en: ["Whether the agency is a 'TYPO3 Association Member' and ideally a 'TYPO3 Partner' (audited by GmbH), and has certified employees.", "Whether they have the logo on the website.", "Whether they are the cheapest.", "Whether they are based in Switzerland."]
      },
      correctIndices: [0],
      explanation: {
        de: "Der Partner-Status ist der einzige offizielle Qualitätsnachweis für Agenturen.",
        en: "Partner status is the only official proof of quality for agencies."
      }
    },
    {
      id: 'assoc-10',
      text: {
        de: "Was ist ein 'Academic Member'? (Wähle 1)",
        en: "What is an 'Academic Member'? (Select 1)"
      },
      options: {
        de: ["Eine vergünstigte Mitgliedschaft für Universitäten, Schulen und Bildungseinrichtungen.", "Ein Professor.", "Ein Student.", "Gibt es nicht."],
        en: ["A discounted membership for universities, schools, and educational institutions.", "A professor.", "A student.", "Does not exist."]
      },
      correctIndices: [0],
      explanation: {
        de: "Fördert die Verbreitung von TYPO3 im Bildungssektor.",
        en: "Promotes the spread of TYPO3 in the education sector."
      }
    },
    // SET 3: Trademark & Code of Conduct
    {
      id: 'assoc-11',
      text: {
        de: "Darf eine Agentur ihre eigene Distribution 'TYPO3 Super-Package' nennen und das offizielle Logo modifizieren (z.B. grün färben)? (Wähle 1)",
        en: "Can an agency call its own distribution 'TYPO3 Super-Package' and modify the official logo (e.g., color it green)? (Select 1)"
      },
      options: {
        de: ["Nein. 'TYPO3' ist eine geschützte Marke. Modifikationen des Logos und irreführende Produktnamen sind ohne Genehmigung verboten (Trademark Violation).", "Ja, ist Open Source.", "Nur wenn sie Member sind.", "Ja, aber nur in Deutschland."],
        en: ["No. 'TYPO3' is a protected trademark. Modification of the logo and misleading product names are forbidden without permission (Trademark Violation).", "Yes, it's Open Source.", "Only if they are members.", "Yes, but only in Germany."]
      },
      correctIndices: [0],
      explanation: {
        de: "Open Source Code != Open Brand. Die Marke schützt die Identität und Qualität, die mit dem Namen verbunden wird.",
        en: "Open Source Code != Open Brand. The trademark protects the identity and quality associated with the name."
      }
    },
    {
      id: 'assoc-12',
      text: {
        de: "Was regelt der 'Code of Conduct' der TYPO3 Community? (Wähle 1)",
        en: "What does the 'Code of Conduct' of the TYPO3 Community regulate? (Select 1)"
      },
      options: {
        de: ["Das soziale Miteinander, um ein belästigungsfreies, inklusives Umfeld auf Events und Online zu garantieren.", "Programmier-Standards (PSR).", "Preise für Projekte.", "Kleiderordnung."],
        en: ["Social interaction, ensuring a harassment-free, inclusive environment at events and online.", "Coding standards (PSR).", "Project pricing.", "Dress code."]
      },
      correctIndices: [0],
      explanation: {
        de: "Verstöße werden vom Incident Response Team geahndet.",
        en: "Violations are handled by the Incident Response Team."
      }
    },
    {
      id: 'assoc-13',
      text: {
        de: "Wie finanziert sich die Weiterentwicklung des Cores hauptsächlich? (Wähle 1)",
        en: "How is the development of the Core mainly funded? (Select 1)"
      },
      options: {
        de: ["Durch Mitgliedsbeiträge der Association und Gewinne der GmbH (die in den Core reinvestiert werden).", "Durch Google.", "Durch Lizenzgebühren pro Installation.", "Ehrenamtlich ohne Geld."],
        en: ["Through Association membership fees and profits from the GmbH (which are reinvested into the Core).", "By Google.", "By license fees per installation.", "Voluntarily without money."]
      },
      correctIndices: [0],
      explanation: {
        de: "Es ist ein Mix aus bezahlter Entwicklung (via GmbH/Budget) und ehrenamtlichen Contributions.",
        en: "It is a mix of paid development (via GmbH/Budget) and volunteer contributions."
      }
    },
    {
      id: 'assoc-14',
      text: {
        de: "Was ist ein 'Core Merger'? (Wähle 1)",
        en: "What is a 'Core Merger'? (Select 1)"
      },
      options: {
        de: ["Ein Entwickler mit Schreibrechten auf das Core-Repository, der Reviews durchführt und Code merged. Vertrauensposition.", "Jemand, der Firmen fusioniert.", "Ein Tool.", "Der Präsident."],
        en: ["A developer with write access to the core repository who performs reviews and merges code. Position of trust.", "Someone who merges companies.", "A tool.", "The President."]
      },
      correctIndices: [0],
      explanation: {
        de: "Mergers sichern die Qualität des Codes (4-Augen-Prinzip).",
        en: "Mergers ensure code quality (4-eyes principle)."
      }
    },
    {
      id: 'assoc-15',
      text: {
        de: "Was unterscheidet 'typo3.org' von 'typo3.com'? (Wähle 1)",
        en: "What distinguishes 'typo3.org' from 'typo3.com'? (Select 1)"
      },
      options: {
        de: [".org ist die Community/Tech/Doc Seite. .com ist die kommerzielle Seite der GmbH (Marketing, Partner, Services).", ".org ist veraltet.", "Kein Unterschied.", ".com ist für USA."],
        en: [".org is the Community/Tech/Doc site. .com is the commercial site of the GmbH (Marketing, Partners, Services).", ".org is obsolete.", "No difference.", ".com is for USA."]
      },
      correctIndices: [0],
      explanation: {
        de: "Klare Trennung zwischen Community-Ressourcen und Business-Angeboten.",
        en: "Clear separation between community resources and business offerings."
      }
    },
    // SET 4: Events & Certification
    {
      id: 'assoc-16',
      text: {
        de: "Welche Zertifizierungen bietet TYPO3 aktuell (Stand v13) an? (Wähle 1)",
        en: "Which certifications does TYPO3 currently offer (as of v13)? (Select 1)"
      },
      options: {
        de: ["Editor (TCCE), Integrator (TCCI), Developer (TCCD), Consultant (TCCC).", "Nur Developer.", "Master und Bachelor.", "Admin und User."],
        en: ["Editor (TCCE), Integrator (TCCI), Developer (TCCD), Consultant (TCCC).", "Only Developer.", "Master and Bachelor.", "Admin and User."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die vier Säulen decken alle relevanten Rollen ab. Integrator und Developer sind getrennt.",
        en: "The four pillars cover all relevant roles. Integrator and Developer are separated."
      }
    },
    {
      id: 'assoc-17',
      text: {
        de: "Was ist ein 'TYPO3 Camp'? (Wähle 1)",
        en: "What is a 'TYPO3 Camp'? (Select 1)"
      },
      options: {
        de: ["Ein von der Community organisiertes Barcamp (Unkonferenz) zum Wissensaustausch.", "Ein Zeltlager.", "Ein offizielles Training der GmbH.", "Eine Verkaufsveranstaltung."],
        en: ["A Barcamp (unconference) organized by the community for knowledge exchange.", "A camping trip.", "An official training by the GmbH.", "A sales event."]
      },
      correctIndices: [0],
      explanation: {
        de: "Camps sind informell und leben vom Mitmachen (Sessions).",
        en: "Camps are informal and thrive on participation (sessions)."
      }
    },
    {
      id: 'assoc-18',
      text: {
        de: "Wie lange ist eine Zertifizierung gültig? (Wähle 1)",
        en: "How long is a certification valid? (Select 1)"
      },
      options: {
        de: ["3 Jahre.", "Lebenslänglich.", "1 Jahr.", "5 Jahre."],
        en: ["3 years.", "Lifetime.", "1 year.", "5 years."]
      },
      correctIndices: [0],
      explanation: {
        de: "Dies entspricht dem Release-Zyklus der LTS Versionen.",
        en: "This corresponds to the release cycle of LTS versions."
      }
    },
    {
      id: 'assoc-19',
      text: {
        de: "Was passiert, wenn Sie eine Zertifizierung verlängern wollen (Re-Certification)? (Wähle 1)",
        en: "What happens if you want to renew a certification (Re-Certification)? (Select 1)"
      },
      options: {
        de: ["Sie können die Prüfung neu ablegen ODER (je nach Programm) Credits sammeln.", "Es ist kostenlos.", "Geht nicht, muss neu gemacht werden.", "Automatische Verlängerung."],
        en: ["You can retake the exam OR (depending on the program) collect credits.", "It is free.", "Not possible, must be redone.", "Automatic renewal."]
      },
      correctIndices: [0],
      explanation: {
        de: "Re-Zertifizierung ist notwendig, um aktuelles Wissen nachzuweisen.",
        en: "Re-certification is necessary to prove current knowledge."
      }
    },
    {
      id: 'assoc-20',
      text: {
        de: "Wer wählt die Mitglieder des 'Board' (Vorstand)? (Wähle 1)",
        en: "Who elects the members of the 'Board'? (Select 1)"
      },
      options: {
        de: ["Die General Assembly (Mitgliederversammlung).", "Der Präsident.", "Die GmbH.", "Niemand."],
        en: ["The General Assembly.", "The President.", "The GmbH.", "No one."]
      },
      correctIndices: [0],
      explanation: {
        de: "Das Board ist das höchste Exekutiv-Organ und den Mitgliedern rechenschaftspflichtig.",
        en: "The Board is the highest executive body and accountable to the members."
      }
    },
  ],
  [Topic.LICENSING]: [
    // SET 1: GPL Basics
    {
      id: 'lic-1',
      text: {
        de: "Ein Kunde beauftragt Sie, eine Extension zu entwickeln, die tief in die TYPO3 API eingreift. Er möchte den Code exklusiv besitzen und NIEMALS veröffentlichen. Ist das unter GPL erlaubt? (Wähle 1)",
        en: "A client commissions you to develop an extension that interacts deeply with the TYPO3 API. They want to own the code exclusively and NEVER publish it. Is this allowed under GPL? (Select 1)"
      },
      options: {
        de: ["Ja. Die GPL verpflichtet zur Weitergabe des Codes nur an den EMPFÄNGER (den Kunden). Solange der Kunde die Software nicht weitergibt (verteilt), muss er sie nicht veröffentlichen (Private Use).", "Nein, alles muss auf GitHub.", "Nein, TYPO3 Extensions sind immer public.", "Ja, aber nur mit Commercial License."],
        en: ["Yes. The GPL requires passing the code only to the RECIPIENT (the client). As long as the client does not distribute the software, they don't have to publish it (Private Use).", "No, everything must be on GitHub.", "No, TYPO3 extensions are always public.", "Yes, but only with a Commercial License."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die GPL zwingt nicht zur weltweiten Veröffentlichung, sondern zur Freiheit für den Empfänger. Interne Nutzung ('Inhouse') löst kein Copyleft gegenüber der Öffentlichkeit aus.",
        en: "The GPL does not force worldwide publication, but freedom for the recipient. Internal use ('Inhouse') does not trigger Copyleft towards the public."
      }
    },
    {
      id: 'lic-2',
      text: {
        de: "Darf eine Agentur eine TYPO3 Extension mit IonCube verschlüsseln und verkaufen? Die Extension nutzt `\TYPO3\CMS\Core\Utility\GeneralUtility`. (Wähle 1)",
        en: "Can an agency encrypt a TYPO3 extension with IonCube and sell it? The extension uses `\TYPO3\CMS\Core\Utility\GeneralUtility`. (Select 1)"
      },
      options: {
        de: ["Nein. Da die Extension Core-Klassen nutzt, ist sie ein 'abgeleitetes Werk' (Derivative Work) und muss unter GPL stehen. Verschlüsselung verhindert die GPL-Rechte (Study, Modify).", "Ja, wenn der Kunde zustimmt.", "Ja, Verkaufen ist immer erlaubt.", "Nur in den USA."],
        en: ["No. Since the extension uses Core classes, it is a 'Derivative Work' and must be GPL. Encryption prevents GPL rights (Study, Modify).", "Yes, if the client agrees.", "Yes, selling is always allowed.", "Only in the USA."]
      },
      correctIndices: [0],
      explanation: {
        de: "Verschlüsselung (Obfuscation) ist inkompatibel mit der GPL, da der Source Code nicht zugänglich ist.",
        en: "Encryption (Obfuscation) is incompatible with GPL because the source code is not accessible."
      }
    },
    {
      id: 'lic-3',
      text: {
        de: "Sie erstellen ein HTML/CSS Template (Theme) für TYPO3. Enthält dieses Template automatisch GPL-Code? (Wähle 1)",
        en: "You create an HTML/CSS template (theme) for TYPO3. Does this template automatically contain GPL code? (Select 1)"
      },
      options: {
        de: ["Nicht zwingend. Reine Assets (CSS, Bilder, HTML) gelten oft nicht als 'Derivative Work' des PHP-Cores. Hier ist 'Split Licensing' möglich (PHP=GPL, Assets=Proprietär).", "Ja, alles in TYPO3 ist GPL.", "Nein, Design ist immer Copyright.", "Kommt auf den Browser an."],
        en: ["Not necessarily. Pure assets (CSS, images, HTML) are often not considered 'Derivative Work' of the PHP Core. 'Split Licensing' is possible (PHP=GPL, Assets=Proprietary).", "Yes, everything in TYPO3 is GPL.", "No, design is always copyright.", "Depends on the browser."]
      },
      correctIndices: [0],
      explanation: {
        de: "Viele Theme-Verkäufer nutzen Split Licensing: Der PHP-Glue-Code ist GPL, das Design/CSS proprietär.",
        en: "Many theme sellers use Split Licensing: The PHP glue code is GPL, the design/CSS proprietary."
      }
    },
    {
      id: 'lic-4',
      text: {
        de: "Ein Kunde fordert Sie auf, die Copyright-Hinweise im Quellcode von TYPO3 zu entfernen. Dürfen Sie das? (Wähle 1)",
        en: "A client asks you to remove the copyright notices in the TYPO3 source code. Are you allowed to do that? (Select 1)"
      },
      options: {
        de: ["Nein. Die GPL verlangt, dass Copyright-Vermerke und Lizenztexte intakt bleiben (Attribution).", "Ja, der Kunde zahlt ja.", "Ja, ist Open Source.", "Nur wenn man den Autor fragt."],
        en: ["No. The GPL requires copyright notices and license texts to remain intact (Attribution).", "Yes, the client pays.", "Yes, it's Open Source.", "Only if you ask the author."]
      },
      correctIndices: [0],
      explanation: {
        de: "Sie dürfen den Code ändern, aber nicht die Urheberschaft leugnen.",
        en: "You may modify the code, but not deny authorship."
      }
    },
    {
      id: 'lic-5',
      text: {
        de: "Was bedeutet 'GPL v2 or later'? (Wähle 1)",
        en: "What does 'GPL v2 or later' mean? (Select 1)"
      },
      options: {
        de: ["Der Nutzer kann entscheiden, ob er die Software unter den Bedingungen von v2 oder einer neueren Version (v3) nutzt. Das sichert Zukunftskompatibilität.", "Es ist v2 und v3 gleichzeitig.", "Man muss zahlen.", "Nichts."],
        en: ["The user can choose to use the software under the terms of v2 or any later version (v3). This ensures future compatibility.", "It is v2 and v3 simultaneously.", "You have to pay.", "Nothing."]
      },
      correctIndices: [0],
      explanation: {
        de: "Dies erlaubt den Wechsel auf GPLv3 (die z.B. Tivoization verbietet), ohne alle Urheber zu fragen.",
        en: "This allows switching to GPLv3 (which bans Tivoization, for example) without asking all authors."
      }
    },
    // SET 2: Selling & Trademarks
    {
      id: 'lic-6',
      text: {
        de: "Dürfen Sie TYPO3 auf CD brennen und für 100€ verkaufen? (Wähle 1)",
        en: "Are you allowed to burn TYPO3 onto a CD and sell it for €100? (Select 1)"
      },
      options: {
        de: ["Ja. Die GPL erlaubt das Verkaufen ('Free' as in Speech, not Beer). Sie müssen dem Käufer aber die gleichen Rechte (Source Code, Weitergabe) einräumen.", "Nein, TYPO3 ist kostenlos.", "Nur mit Erlaubnis der Association.", "Nur an Freunde."],
        en: ["Yes. The GPL allows selling ('Free' as in Speech, not Beer). But you must grant the buyer the same rights (Source code, Distribution).", "No, TYPO3 is free.", "Only with Association permission.", "Only to friends."]
      },
      correctIndices: [0],
      explanation: {
        de: "Man darf für den 'Akt der Bereitstellung' oder Service Geld verlangen. Der Code selbst bleibt frei.",
        en: "You can charge for the 'act of provision' or service. The code itself remains free."
      }
    },
    {
      id: 'lic-7',
      text: {
        de: "Ein Kunde möchte das offizielle TYPO3-Logo auf seinen Rechnungen nutzen, um Kompetenz zu zeigen. Er ist kein Association Member. Darf er das? (Wähle 1)",
        en: "A client wants to use the official TYPO3 logo on their invoices to show competence. They are not an Association Member. Are they allowed to? (Select 1)"
      },
      options: {
        de: ["Nein. Das Logo ist eine geschützte Marke. Nutzung erfordert meist eine Mitgliedschaft oder Genehmigung (z.B. Partner).", "Ja, ist Open Source.", "Ja, wenn es klein ist.", "Egal."],
        en: ["No. The logo is a protected trademark. Usage usually requires membership or permission (e.g., Partner).", "Yes, it's Open Source.", "Yes, if it's small.", "Doesn't matter."]
      },
      correctIndices: [0],
      explanation: {
        de: "Markenrecht ist getrennt vom Urheberrecht (Lizenz). Die Marke schützt vor Verwechslung.",
        en: "Trademark law is separate from copyright (license). The trademark protects against confusion."
      }
    },
    {
      id: 'lic-8',
      text: {
        de: "Was ist der 'Viral Effect' (Copyleft) der GPL? (Wähle 1)",
        en: "What is the 'Viral Effect' (Copyleft) of the GPL? (Select 1)"
      },
      options: {
        de: ["Wenn Sie GPL-Code in Ihr Programm integrieren (linken), muss Ihr gesamtes Programm unter die GPL gestellt werden, sobald Sie es verbreiten.", "Es ist ein Virus.", "Es macht Computer langsam.", "Es löscht Dateien."],
        en: ["If you integrate (link) GPL code into your program, your entire program must be placed under the GPL as soon as you distribute it.", "It is a virus.", "It slows down computers.", "It deletes files."]
      },
      correctIndices: [0],
      explanation: {
        de: "Dies verhindert, dass freier Code in proprietäre Software 'eingesperrt' wird.",
        en: "This prevents free code from being 'locked up' in proprietary software."
      }
    },
    {
      id: 'lic-9',
      text: {
        de: "Darf eine Extension prüfen, ob ein gültiger Lizenzschlüssel (Subscription) vorhanden ist, bevor sie funktioniert? (Wähle 1)",
        en: "Can an extension check if a valid license key (subscription) exists before checking functionality? (Select 1)"
      },
      options: {
        de: ["Ja, solange der Quellcode offen ist (GPL) und der User theoretisch den Check entfernen KÖNNTE. Das Geschäftsmodell 'Service/Updates gegen Geld' ist erlaubt.", "Nein, GPL verbietet Keys.", "Nur bei Templates.", "Nein."],
        en: ["Yes, as long as the source code is open (GPL) and the user theoretically COULD remove the check. The business model 'Service/Updates for money' is allowed.", "No, GPL forbids keys.", "Only for templates.", "No."]
      },
      correctIndices: [0],
      explanation: {
        de: "Technische Schutzmaßnahmen (DRM), die den User aussperren und nicht entfernbar sind (Tivoization), sind in GPLv3 kritisch, in GPLv2 Grauzone, aber Subscription-Checks sind üblich.",
        en: "Technical protection measures (DRM) locking out the user and not being removable (Tivoization) are critical in GPLv3, gray area in GPLv2, but subscription checks are common."
      }
    },
    {
      id: 'lic-10',
      text: {
        de: "Wer haftet bei Schäden durch TYPO3 (z.B. Datenverlust durch Bug)? (Wähle 1)",
        en: "Who is liable for damages caused by TYPO3 (e.g., data loss due to a bug)? (Select 1)"
      },
      options: {
        de: ["Niemand (AS IS). Die GPL schließt Haftung aus, soweit gesetzlich möglich. Ausnahme: Eine Agentur übernimmt vertraglich die Haftung gegenüber ihrem Kunden.", "Die TYPO3 Association.", "Kasper Skårhøj.", "Der Hoster."],
        en: ["No one (AS IS). The GPL excludes liability to the extent permitted by law. Exception: An agency contractually assumes liability towards its client.", "The TYPO3 Association.", "Kasper Skårhøj.", "The Hoster."]
      },
      correctIndices: [0],
      explanation: {
        de: "Software ohne Lizenzgebühren kommt ohne Gewährleistung.",
        en: "Software without license fees comes without warranty."
      }
    },
    // SET 3: Compatibility & Legal
    {
      id: 'lic-11',
      text: {
        de: "Ist die 'MIT License' kompatibel mit GPL? (Wähle 1)",
        en: "Is the 'MIT License' compatible with GPL? (Select 1)"
      },
      options: {
        de: ["Ja. MIT ist 'permissive'. Man kann MIT-Code in ein GPL-Projekt einbinden (das Ergebnis ist dann GPL).", "Nein.", "Nur umgekehrt.", "Weiß nicht."],
        en: ["Yes. MIT is 'permissive'. You can include MIT code in a GPL project (the result is then GPL).", "No.", "Only vice versa.", "Don't know."]
      },
      correctIndices: [0],
      explanation: {
        de: "MIT erlaubt fast alles, auch die Re-Lizenzierung unter GPL.",
        en: "MIT allows almost anything, including re-licensing under GPL."
      }
    },
    {
      id: 'lic-12',
      text: {
        de: "Wem gehören die Urheberrechte (Copyright) am TYPO3 Core? (Wähle 1)",
        en: "Who owns the copyright to the TYPO3 Core? (Select 1)"
      },
      options: {
        de: ["Den jeweiligen Autoren (Contributoren). Es gibt kein 'Copyright Assignment' an die Association.", "Der Association.", "Kasper.", "Niemandem."],
        en: ["The respective authors (contributors). There is no 'Copyright Assignment' to the Association.", "The Association.", "Kasper.", "No one."]
      },
      correctIndices: [0],
      explanation: {
        de: "Jeder, der Code beisteuert, behält sein Urheberrecht. Deshalb ist eine Lizenzänderung extrem schwer (alle müssten zustimmen).",
        en: "Everyone contributing code retains their copyright. That's why changing the license is extremely hard (everyone would have to agree)."
      }
    },
    {
      id: 'lic-13',
      text: {
        de: "Was ist 'LGPL'? (Wähle 1)",
        en: "What is 'LGPL'? (Select 1)"
      },
      options: {
        de: ["Lesser GPL. Erlaubt das dynamische Linken von proprietärer Software gegen eine Library, ohne dass die proprietäre Software GPL werden muss.", "Large GPL.", "Low GPL.", "Late GPL."],
        en: ["Lesser GPL. Allows dynamic linking of proprietary software against a library without the proprietary software having to become GPL.", "Large GPL.", "Low GPL.", "Late GPL."]
      },
      correctIndices: [0],
      explanation: {
        de: "Wichtig für Bibliotheken, die breit genutzt werden sollen.",
        en: "Important for libraries intended for broad usage."
      }
    },
    {
      id: 'lic-14',
      text: {
        de: "Ein Angestellter schreibt in seiner Freizeit eine TYPO3 Extension. Wem gehören die Rechte? (Wähle 1)",
        en: "An employee writes a TYPO3 extension in their free time. Who owns the rights? (Select 1)"
      },
      options: {
        de: ["Kommt auf den Arbeitsvertrag an. Wenn es Bezug zur Arbeit hat, oft dem Arbeitgeber. Sonst dem Angestellten.", "Immer dem Arbeitgeber.", "Immer dem Angestellten.", "Der Association."],
        en: ["Depends on the employment contract. If related to work, often the employer. Otherwise the employee.", "Always the employer.", "Always the employee.", "The Association."]
      },
      correctIndices: [0],
      explanation: {
        de: "Arbeitsrechtliche Frage, aber relevant für Consultants.",
        en: "Labor law question, but relevant for consultants."
      }
    },
    {
      id: 'lic-15',
      text: {
        de: "Was passiert, wenn Sie GPL-Code verletzen (z.B. Source Code nicht mitliefern)? (Wähle 1)",
        en: "What happens if you violate GPL (e.g., not providing source code)? (Select 1)"
      },
      options: {
        de: ["Die Lizenz erlischt automatisch. Sie begehen eine Urheberrechtsverletzung und können abgemahnt werden.", "Nichts.", "Geldstrafe an Association.", "Website wird gelöscht."],
        en: ["The license terminates automatically. You commit copyright infringement and can be warned/sued.", "Nothing.", "Fine to Association.", "Website deleted."]
      },
      correctIndices: [0],
      explanation: {
        de: "Ohne Lizenz keine Nutzungsrechte -> Illegal.",
        en: "No license means no usage rights -> Illegal."
      }
    },
    // SET 4: Specific Scenarios
    {
      id: 'lic-16',
      text: {
        de: "Ein Kunde verlangt, dass Sie eine NDA (Geheimhaltung) unterschreiben, die verbietet, den Code der Extension an Dritte weiterzugeben. Die Extension basiert auf Extbase. Ist die NDA gültig? (Wähle 1)",
        en: "A client asks you to sign an NDA (Non-Disclosure Agreement) forbidding distribution of the extension code to third parties. The extension is based on Extbase. Is the NDA valid? (Select 1)"
      },
      options: {
        de: ["Ja, gegenüber Dritten. Der Kunde (Empfänger) darf entscheiden, den Code NICHT weiterzugeben. Die GPL erzwingt keine Publikation.", "Nein, GPL bricht NDA.", "Ja, aber nur 5 Jahre.", "Nein, Extbase ist public."],
        en: ["Yes, towards third parties. The client (recipient) can decide NOT to distribute the code. GPL does not enforce publication.", "No, GPL voids NDA.", "Yes, but only 5 years.", "No, Extbase is public."]
      },
      correctIndices: [0],
      explanation: {
        de: "Der Kunde hat die Freiheit, die Software *nicht* zu verteilen (Private Use).",
        en: "The client has the freedom *not* to distribute the software (Private Use)."
      }
    },
    {
      id: 'lic-17',
      text: {
        de: "Darf eine staatliche Stelle TYPO3 nutzen, obwohl sie keine GPL-Software veröffentlichen darf (Geheimschutz)? (Wähle 1)",
        en: "Can a government agency use TYPO3 even if they are not allowed to publish GPL software (Classified information)? (Select 1)"
      },
      options: {
        de: ["Ja. Solange sie die Software nur intern nutzen und nicht an Dritte weitergeben, greift die Copyleft-Pflicht nicht.", "Nein.", "Nur mit Sonderlizenz.", "Nur im Intranet."],
        en: ["Yes. As long as they only use the software internally and do not distribute it to third parties, the Copyleft obligation does not apply.", "No.", "Only with special license.", "Only in Intranet."]
      },
      correctIndices: [0],
      explanation: {
        de: "Interne Nutzung ist sicher.",
        en: "Internal use is safe."
      }
    },
    {
      id: 'lic-18',
      text: {
        de: "Was ist 'License Compatibility'? (Wähle 1)",
        en: "What is 'License Compatibility'? (Select 1)"
      },
      options: {
        de: ["Die Frage, ob zwei Lizenzen (z.B. GPL und Apache 2.0) kombiniert werden dürfen, ohne ihre Bedingungen zu verletzen.", "Ob Windows und Linux gehen.", "Ob PHP Versionen passen.", "Nichts."],
        en: ["The question of whether two licenses (e.g., GPL and Apache 2.0) can be combined without violating their terms.", "If Windows and Linux work.", "If PHP versions match.", "Nothing."]
      },
      correctIndices: [0],
      explanation: {
        de: "Apache 2.0 ist z.B. kompatibel mit GPLv3, aber tricky mit v2.",
        en: "Apache 2.0 is e.g. compatible with GPLv3, but tricky with v2."
      }
    },
    {
      id: 'lic-19',
      text: {
        de: "Müssen Sie den Quellcode von TYPO3 auf dem Server zum Download anbieten? (Wähle 1)",
        en: "Do you have to offer the TYPO3 source code for download on the server? (Select 1)"
      },
      options: {
        de: ["Wenn Sie TYPO3 als SaaS anbieten (Software as a Service) und der User keinen Code erhält, sondern nur das Frontend sieht: NEIN (ASP Loophole in GPLv2).", "Ja, immer Link im Footer.", "Ja, bei AGPL.", "Nein, nie."],
        en: ["If you offer TYPO3 as SaaS (Software as a Service) and the user receives no code but only sees the frontend: NO (ASP Loophole in GPLv2).", "Yes, always link in footer.", "Yes, with AGPL.", "No, never."]
      },
      correctIndices: [0],
      explanation: {
        de: "Bei Webseiten wird der Code nicht 'verteilt' (distributed), sondern nur 'ausgeführt' (performed). Daher greift GPLv2 Copyleft nicht. (Anders bei AGPL).",
        en: "For websites, code is not 'distributed' but 'performed'. Thus GPLv2 Copyleft does not trigger. (Different with AGPL)."
      }
    },
    {
      id: 'lic-20',
      text: {
        de: "Wie lizenzieren Sie JavaScript, das im Browser ausgeführt wird und Teil einer Extension ist? (Wähle 1)",
        en: "How do you license JavaScript executed in the browser and part of an extension? (Select 1)"
      },
      options: {
        de: ["Es wird zum Browser übertragen ('distributed'), daher MUSS es unter GPL (oder kompatibel) stehen.", "Ist egal.", "JS hat keine Lizenz.", "Proprietär."],
        en: ["It is transferred to the browser ('distributed'), so it MUST be under GPL (or compatible).", "Doesn't matter.", "JS has no license.", "Proprietary."]
      },
      correctIndices: [0],
      explanation: {
        de: "JS im Browser gilt als verteilt.",
        en: "JS in the browser is considered distributed."
      }
    },
  ],
  [Topic.ARCHITECTURE]: [
    // SET 1: Hosting & Deployment
    {
      id: 'arch-1',
      text: {
        de: "Ein Kunde möchte TYPO3 in einem Kubernetes-Cluster mit mehreren Pods (Replicas) betreiben. Welches Problem entsteht beim Standard-Caching (`var/cache`) und wie lösen Sie es? (Wähle 1)",
        en: "A client wants to run TYPO3 in a Kubernetes cluster with multiple pods (replicas). What problem arises with standard caching (`var/cache`) and how do you solve it? (Select 1)"
      },
      options: {
        de: ["Dateibasiertes Caching funktioniert nicht über Pod-Grenzen hinweg (Inkonsistenz). Lösung: Einsatz von Redis oder Memcached als Caching-Backend.", "Kein Problem, Kubernetes synchronisiert Files.", "Lösung: Caching deaktivieren.", "Lösung: NFS nutzen (langsam)."],
        en: ["File-based caching does not work across pod boundaries (inconsistency). Solution: Use Redis or Memcached as caching backend.", "No problem, Kubernetes syncs files.", "Solution: Disable caching.", "Solution: Use NFS (slow)."]
      },
      correctIndices: [0],
      explanation: {
        de: "In verteilten Systemen muss der Cache zentralisiert sein (Redis/DB), da jeder Pod sein eigenes Dateisystem hat.",
        en: "In distributed systems, the cache must be centralized (Redis/DB) as each pod has its own filesystem."
      }
    },
    {
      id: 'arch-2',
      text: {
        de: "Was ist der Vorteil von 'Symlink Linking' beim Deployment (z.B. mit Surf oder Deployer)? (Wähle 1)",
        en: "What is the advantage of 'Symlink Linking' during deployment (e.g., with Surf or Deployer)? (Select 1)"
      },
      options: {
        de: ["Atomare Umschaltung ('Atomic Switch'). Der neue Release-Ordner wird fertig vorbereitet, dann wird der Symlink `current` geändert. Fast keine Downtime.", "Spart Speicherplatz.", "Ist einfacher per FTP.", "Sicherer."],
        en: ["Atomic Switch. The new release folder is fully prepared, then the `current` symlink is changed. Almost no downtime.", "Saves disk space.", "Easier via FTP.", "More secure."]
      },
      correctIndices: [0],
      explanation: {
        de: "Standard-Verfahren für professionelle Deployments.",
        en: "Standard procedure for professional deployments."
      }
    },
    {
      id: 'arch-3',
      text: {
        de: "Ihr Varnish Reverse Proxy liefert veraltete Inhalte, obwohl Sie in TYPO3 den Cache gelöscht haben. Woran liegt es wahrscheinlich? (Wähle 1)",
        en: "Your Varnish Reverse Proxy serves outdated content even though you cleared the cache in TYPO3. What is the likely cause? (Select 1)"
      },
      options: {
        de: ["TYPO3 sendet keine PURGE/BAN Requests an Varnish, oder die IP von TYPO3 ist in Varnish nicht für PURGE erlaubt (ACL).", "Varnish ist kaputt.", "TYPO3 Cache ist nicht gelöscht.", "Browser Cache."],
        en: ["TYPO3 is not sending PURGE/BAN requests to Varnish, or TYPO3's IP is not allowed for PURGE in Varnish (ACL).", "Varnish is broken.", "TYPO3 cache is not cleared.", "Browser cache."]
      },
      correctIndices: [0],
      explanation: {
        de: "Cache-Tags müssen aktiv an den Proxy kommuniziert werden. Ohne Kommunikation (Webhook/Request) weiß Varnish nichts vom Update.",
        en: "Cache tags must be actively communicated to the proxy. Without communication (webhook/request), Varnish doesn't know about the update."
      }
    },
    {
      id: 'arch-4',
      text: {
        de: "Welche PHP-Extension ist zwingend erforderlich für TYPO3 v13? (Wähle 1)",
        en: "Which PHP extension is mandatory for TYPO3 v13? (Select 1)"
      },
      options: {
        de: ["`intl` (Internationalization Functions).", "`imagick`.", "`redis`.", "`ldap`."],
        en: ["`intl` (Internationalization Functions).", "`imagick`.", "`redis`.", "`ldap`."]
      },
      correctIndices: [0],
      explanation: {
        de: "`intl` wird für Lokalisierung, IDNA-Domains und Sorting benötigt.",
        en: "`intl` is needed for localization, IDNA domains, and sorting."
      }
    },
    {
      id: 'arch-5',
      text: {
        de: "Sie nutzen Cloud-Storage (AWS S3) für `fileadmin`. Wie binden Sie diesen in TYPO3 ein? (Wähle 1)",
        en: "You use Cloud Storage (AWS S3) for `fileadmin`. How do you integrate this into TYPO3? (Select 1)"
      },
      options: {
        de: ["Über einen FAL Driver (File Abstraction Layer). Man installiert einen S3-Adapter (z.B. `typo3/cms-driver-amazon-s3`).", "Man mountet S3 als Laufwerk im OS.", "Geht nicht.", "Per FTP."],
        en: ["Via a FAL Driver (File Abstraction Layer). You install an S3 adapter (e.g., `typo3/cms-driver-amazon-s3`).", "Mount S3 as a drive in the OS.", "Not possible.", "Via FTP."]
      },
      correctIndices: [0],
      explanation: {
        de: "FAL wurde genau dafür entwickelt: Abstraktion vom lokalen Filesystem.",
        en: "FAL was designed exactly for this: Abstraction from the local filesystem."
      }
    },
    // SET 2: Caching & Performance
    {
      id: 'arch-6',
      text: {
        de: "Was ist der 'Opcode Cache' (OPcache) und warum ist er wichtig? (Wähle 1)",
        en: "What is the 'Opcode Cache' (OPcache) and why is it important? (Select 1)"
      },
      options: {
        de: ["Er speichert den kompilierten Bytecode von PHP-Skripten im Arbeitsspeicher, damit diese nicht bei jedem Request neu geparst werden müssen. Massive Performance-Steigerung.", "Er cacht Bilder.", "Er cacht Datenbank-Abfragen.", "Er ist ein Browser-Cache."],
        en: ["It stores the compiled bytecode of PHP scripts in RAM so they don't have to be reparsed on every request. Massive performance boost.", "It caches images.", "It caches database queries.", "It is a browser cache."]
      },
      correctIndices: [0],
      explanation: {
        de: "Ohne OPcache ist modernes PHP (und TYPO3) extrem langsam.",
        en: "Without OPcache, modern PHP (and TYPO3) is extremely slow."
      }
    },
    {
      id: 'arch-7',
      text: {
        de: "Was passiert beim 'Cache Warming'? (Wähle 1)",
        en: "What happens during 'Cache Warming'? (Select 1)"
      },
      options: {
        de: ["Ein Skript ruft systematisch Seiten auf, um Caches zu füllen, bevor echte User kommen (vermeidet 'First Hit Penalty').", "Der Server wird aufgeheizt.", "Caches werden gelöscht.", "Datenbank wird optimiert."],
        en: ["A script systematically visits pages to populate caches before real users arrive (avoids 'First Hit Penalty').", "The server is heated up.", "Caches are cleared.", "Database is optimized."]
      },
      correctIndices: [0],
      explanation: {
        de: "Wichtig nach Deployments, um Performance-Einbrüche zu vermeiden.",
        en: "Important after deployments to avoid performance drops."
      }
    },
    {
      id: 'arch-8',
      text: {
        de: "Wie können Sie 'Session Locking' Probleme (User blockiert sich selbst bei parallelen Requests) in einer Load-Balancing Umgebung reduzieren? (Wähle 1)",
        en: "How can you reduce 'Session Locking' issues (user blocks themselves with parallel requests) in a load-balancing environment? (Select 1)"
      },
      options: {
        de: ["Nutzung von Redis für das Session-Backend (schnelles Locking/Unlocking) statt Filesystem oder Datenbank.", "Session abschalten.", "Nur einen Server nutzen.", "Längere Timeouts."],
        en: ["Use Redis for the session backend (fast locking/unlocking) instead of filesystem or database.", "Disable sessions.", "Use only one server.", "Longer timeouts."]
      },
      correctIndices: [0],
      explanation: {
        de: "Datenbank-Sessions sind oft langsam beim Locking. Redis ist hier performanter.",
        en: "Database sessions are often slow with locking. Redis is more performant here."
      }
    },
    {
      id: 'arch-9',
      text: {
        de: "Welche Rolle spielt der 'Dependency Injection Container' (DIC) in der TYPO3 Architektur? (Wähle 1)",
        en: "What role does the 'Dependency Injection Container' (DIC) play in TYPO3 architecture? (Select 1)"
      },
      options: {
        de: ["Er verwaltet Klasseninstanzen und deren Abhängigkeiten zentral. Erlaubt Autowiring und Austausch von Implementierungen.", "Er speichert Bilder.", "Er ist eine Datenbank.", "Er macht Backups."],
        en: ["It manages class instances and their dependencies centrally. Allows autowiring and swapping implementations.", "It stores images.", "It is a database.", "It does backups."]
      },
      correctIndices: [0],
      explanation: {
        de: "Core-Architektur-Pattern seit v10. Basiert auf Symfony DI.",
        en: "Core architecture pattern since v10. Based on Symfony DI."
      }
    },
    {
      id: 'arch-10',
      text: {
        de: "Was ist 'Static File Cache'? (Wähle 1)",
        en: "What is 'Static File Cache'? (Select 1)"
      },
      options: {
        de: ["Eine Extension, die HTML-Output als flache Dateien (.html) auf die Festplatte schreibt, damit der Webserver sie ohne PHP ausliefern kann.", "Browser Cache.", "Varnish.", "CDN."],
        en: ["An extension that writes HTML output as flat files (.html) to disk so the web server can serve them without PHP.", "Browser Cache.", "Varnish.", "CDN."]
      },
      correctIndices: [0],
      explanation: {
        de: "Günstige Alternative zu Varnish für einfache Setups.",
        en: "Cheap alternative to Varnish for simple setups."
      }
    },
    // SET 3: Configuration & TypoScript
    {
      id: 'arch-11',
      text: {
        de: "Warum wird TypoScript in PHP-Arrays kompiliert und gecacht? (Wähle 1)",
        en: "Why is TypoScript compiled into PHP arrays and cached? (Select 1)"
      },
      options: {
        de: ["Performance. Das Parsen von Text-TypoScript ist langsam. Das PHP-Array kann im Opcode-Cache liegen und extrem schnell ausgeführt werden.", "Weil PHP kein Text lesen kann.", "Zur Verschlüsselung.", "Platzersparnis."],
        en: ["Performance. Parsing text TypoScript is slow. The PHP array can reside in Opcode cache and be executed extremely fast.", "Because PHP cannot read text.", "For encryption.", "Saving space."]
      },
      correctIndices: [0],
      explanation: {
        de: "TypoScript ist zur Laufzeit ein großes PHP Array.",
        en: "TypoScript is a large PHP array at runtime."
      }
    },
    {
      id: 'arch-12',
      text: {
        de: "Welche Ebene hat die höchste Priorität bei der Konfiguration? (Wähle 1)",
        en: "Which layer has the highest priority in configuration? (Select 1)"
      },
      options: {
        de: ["`additional.php` (überschreibt `settings.php` und `DefaultConfiguration.php`).", "`settings.php`.", "`ext_conf_template.txt`.", "DefaultConfiguration.php."],
        en: ["`additional.php` (overrides `settings.php` and `DefaultConfiguration.php`).", "`settings.php`.", "`ext_conf_template.txt`.", "DefaultConfiguration.php."]
      },
      correctIndices: [0],
      explanation: {
        de: "`additional.php` wird als letztes geladen.",
        en: "`additional.php` is loaded last."
      }
    },
    {
      id: 'arch-13',
      text: {
        de: "Sie wollen einen 'Headless' Ansatz verfolgen. Welche API bietet TYPO3 v13 nativ? (Wähle 1)",
        en: "You want to pursue a 'Headless' approach. Which API does TYPO3 v13 offer natively? (Select 1)"
      },
      options: {
        de: ["Keine vollständige Content-API im Core (nur via Extensions wie `headless` oder `t3api`). Core bietet aber JSON Responses für Frontend Login etc.", "Vollständige REST API für alle Inhalte.", "GraphQL API.", "SOAP API."],
        en: ["No full Content API in Core (only via extensions like `headless` or `t3api`). Core offers JSON responses for frontend login etc.", "Full REST API for all content.", "GraphQL API.", "SOAP API."]
      },
      correctIndices: [0],
      explanation: {
        de: "TYPO3 Core ist 'Hybrid capable', aber für Full Headless werden oft Extensions genutzt.",
        en: "TYPO3 Core is 'Hybrid capable', but extensions are often used for Full Headless."
      }
    },
    {
      id: 'arch-14',
      text: {
        de: "Was ist der 'Context' in 'Fluid ViewHelpers'? (Wähle 1)",
        en: "What is the 'Context' in 'Fluid ViewHelpers'? (Select 1)"
      },
      options: {
        de: ["RenderingContext. Enthält Variablen, ControllerContext und Request-Informationen.", "Der Text-Inhalt.", "Die Datenbank.", "Der User."],
        en: ["RenderingContext. Contains variables, ControllerContext, and Request information.", "The text content.", "The database.", "The user."]
      },
      correctIndices: [0],
      explanation: {
        de: "ViewHelper greifen über den Context auf die Umgebung zu.",
        en: "ViewHelpers access the environment via the Context."
      }
    },
    {
      id: 'arch-15',
      text: {
        de: "Was ist 'Bootstrapping' in TYPO3? (Wähle 1)",
        en: "What is 'Bootstrapping' in TYPO3? (Select 1)"
      },
      options: {
        de: ["Der Startprozess des Frameworks: Laden des Autoloaders, Initialisieren des DI Containers, Laden der Konfiguration.", "CSS Framework.", "Schuhe binden.", "Install Tool starten."],
        en: ["The startup process of the framework: Loading Autoloader, initializing DI Container, loading configuration.", "CSS Framework.", "Tying shoes.", "Starting Install Tool."]
      },
      correctIndices: [0],
      explanation: {
        de: "Passiert bei jedem Request in der `index.php`.",
        en: "Happens on every request in `index.php`."
      }
    },
    // SET 4: Database & Migration
    {
      id: 'arch-16',
      text: {
        de: "Sie migrieren eine Instanz von MySQL auf PostgreSQL. Was müssen Sie beachten? (Wähle 1)",
        en: "You are migrating an instance from MySQL to PostgreSQL. What must you consider? (Select 1)"
      },
      options: {
        de: ["Case-Sensitivity von Tabellennamen und spezifische SQL-Syntax (z.B. Quoting). Doctrine DBAL abstrahiert vieles, aber 'Raw Queries' in Extensions könnten brechen.", "Nichts, ist beides SQL.", "PostgreSQL geht nicht mit TYPO3.", "Man muss Oracle Treiber kaufen."],
        en: ["Case-sensitivity of table names and specific SQL syntax (e.g. quoting). Doctrine DBAL abstracts much, but 'Raw Queries' in extensions might break.", "Nothing, both are SQL.", "PostgreSQL doesn't work with TYPO3.", "You have to buy Oracle drivers."]
      },
      correctIndices: [0],
      explanation: {
        de: "Doctrine DBAL hilft, aber proprietäres SQL ist ein Risiko.",
        en: "Doctrine DBAL helps, but proprietary SQL is a risk."
      }
    },
    {
      id: 'arch-17',
      text: {
        de: "Was ist ein 'Middle Management' Server (in großen Setups)? (Wähle 1)",
        en: "What is a 'Middle Management' server (in large setups)? (Select 1)"
      },
      options: {
        de: ["Ein Server nur für Redakteure (Backend) und Scheduler-Tasks, getrennt von den Frontend-Nodes (Delivery). Erhöht Sicherheit und Performance.", "Ein Server für Manager.", "Ein Proxy.", "Ein Backup Server."],
        en: ["A server only for editors (Backend) and Scheduler tasks, separated from Frontend nodes (Delivery). Increases security and performance.", "A server for managers.", "A proxy.", "A backup server."]
      },
      correctIndices: [0],
      explanation: {
        de: "Content Staging und Separation of Concerns.",
        en: "Content Staging and Separation of Concerns."
      }
    },
    {
      id: 'arch-18',
      text: {
        de: "Wofür wird 'Utf8mb4' in der Datenbank benötigt? (Wähle 1)",
        en: "What is 'Utf8mb4' needed for in the database? (Select 1)"
      },
      options: {
        de: ["Für volle Unicode-Unterstützung, inklusive Emojis 🚀 und seltener Schriftzeichen.", "Ist schneller.", "Spart Platz.", "Für englische Texte."],
        en: ["For full Unicode support, including Emojis 🚀 and rare characters.", "Is faster.", "Saves space.", "For English texts."]
      },
      correctIndices: [0],
      explanation: {
        de: "Standard in v13.",
        en: "Standard in v13."
      }
    },
    {
      id: 'arch-19',
      text: {
        de: "Was passiert, wenn die 'Disk Space' Partition vollläuft, auf der `var/` liegt? (Wähle 1)",
        en: "What happens if the 'Disk Space' partition hosting `var/` fills up? (Select 1)"
      },
      options: {
        de: ["TYPO3 stürzt ab / wirft Exceptions, da keine Caches, Logs oder Locks mehr geschrieben werden können (White Screen of Death).", "Alte Caches werden automatisch gelöscht.", "Nichts.", "Mailversand stoppt nur."],
        en: ["TYPO3 crashes / throws exceptions because no caches, logs, or locks can be written (White Screen of Death).", "Old caches are automatically deleted.", "Nothing.", "Only mail sending stops."]
      },
      correctIndices: [0],
      explanation: {
        de: "Ein beschreibbares Dateisystem ist überlebenswichtig.",
        en: "A writable filesystem is vital."
      }
    },
    {
      id: 'arch-20',
      text: {
        de: "Wie skalieren Sie TYPO3 horizontal (mehrere Webserver)? (Wähle 1)",
        en: "How do you scale TYPO3 horizontally (multiple web servers)? (Select 1)"
      },
      options: {
        de: ["Zentralisierte Datenbank, zentralisierter Storage (FAL -> S3/NFS), zentralisierter Session-Store (Redis) und Loadbalancer.", "Einfach Dateien kopieren.", "Geht nicht.", "Mit Docker Swarm ohne Shared Storage."],
        en: ["Centralized database, centralized storage (FAL -> S3/NFS), centralized session store (Redis), and load balancer.", "Just copy files.", "Not possible.", "With Docker Swarm without shared storage."]
      },
      correctIndices: [0],
      explanation: {
        de: "Stateless Application Principle. Alles, was State hat (Sessions, Files), muss ausgelagert werden.",
        en: "Stateless Application Principle. Everything with state (Sessions, Files) must be externalized."
      }
    },
  ],
  [Topic.EXTENSIONS]: [
    // SET 1: Composer
    {
      id: 'ext-1',
      text: {
        de: "Sie führen ein Update durch. Was bewirkt `composer update --with-dependencies`? (Wähle 1)",
        en: "You are performing an update. What does `composer update --with-dependencies` do? (Select 1)"
      },
      options: {
        de: ["Es aktualisiert die angeforderten Pakete UND deren Abhängigkeiten (rekursiv), falls erlaubt.", "Installiert nur neue Pakete.", "Löscht Abhängigkeiten.", "Zeigt Abhängigkeiten an."],
        en: ["It updates the requested packages AND their dependencies (recursively), if allowed.", "Installs only new packages.", "Deletes dependencies.", "Shows dependencies."]
      },
      correctIndices: [0],
      explanation: {
        de: "Wichtig, um konsistente Versionen zu erhalten.",
        en: "Important to maintain consistent versions."
      }
    },
    {
      id: 'ext-2',
      text: {
        de: "Was ist der Unterschied zwischen `require` und `require-dev` in der `composer.json`? (Wähle 1)",
        en: "What is the difference between `require` and `require-dev` in `composer.json`? (Select 1)"
      },
      options: {
        de: ["`require` sind Pakete für den Produktionsbetrieb. `require-dev` sind Tools für Entwicklung/Testing (PHPUnit, PHPStan), die auf Live nicht installiert werden sollten (`--no-dev`).", "`require` ist schneller.", "`require-dev` ist für Beta-Versionen.", "Kein Unterschied."],
        en: ["`require` are packages for production. `require-dev` are tools for dev/testing (PHPUnit, PHPStan) which should not be installed on Live (`--no-dev`).", "`require` is faster.", "`require-dev` is for beta versions.", "No difference."]
      },
      correctIndices: [0],
      explanation: {
        de: "Saubere Trennung von Prod-Code und Dev-Tools.",
        en: "Clean separation of prod code and dev tools."
      }
    },
    {
      id: 'ext-3',
      text: {
        de: "Ein Kunde möchte eine uralte Extension aus dem TER installieren, die kein `composer.json` hat. Geht das in v13 Composer Mode? (Wähle 1)",
        en: "A client wants to install an ancient extension from TER that has no `composer.json`. Is this possible in v13 Composer Mode? (Select 1)"
      },
      options: {
        de: ["Ja, über den 'TYPO3 Composer Repository' Helper (composer.typo3.org), der TER-Extensions in Composer-Pakete wrappt. Qualität ist aber oft fraglich.", "Nein, unmöglich.", "Ja, einfach in `typo3conf/ext` kopieren.", "Nur wenn man bezahlt."],
        en: ["Yes, via the 'TYPO3 Composer Repository' helper (composer.typo3.org) which wraps TER extensions into Composer packages. Quality is often questionable.", "No, impossible.", "Yes, just copy to `typo3conf/ext`.", "Only if you pay."]
      },
      correctIndices: [0],
      explanation: {
        de: "Bridge-Lösung für Legacy Extensions.",
        en: "Bridge solution for legacy extensions."
      }
    },
    {
      id: 'ext-4',
      text: {
        de: "Sie haben einen Merge-Konflikt in der `composer.lock`. Was tun Sie? (Wähle 1)",
        en: "You have a merge conflict in `composer.lock`. What do you do? (Select 1)"
      },
      options: {
        de: ["Niemals manuell lösen! Löschen Sie die `composer.lock`, lösen Sie Konflikte in `composer.json` und führen Sie `composer install` (oder update) aus, um die Lock-Datei neu zu generieren.", "Manuell die Hashes editieren.", "Die Datei ignorieren.", "Den Commit revertieren."],
        en: ["Never resolve manually! Delete `composer.lock`, resolve conflicts in `composer.json`, and run `composer install` (or update) to regenerate the lock file.", "Edit hashes manually.", "Ignore the file.", "Revert the commit."]
      },
      correctIndices: [0],
      explanation: {
        de: "Die Lock-Datei ist ein Hash des Zustands. Manuelles Editieren zerstört die Integrität.",
        en: "The lock file is a hash of the state. Manual editing destroys integrity."
      }
    },
    {
      id: 'ext-5',
      text: {
        de: "Was bedeutet die Version Constraint `^12.4`? (Wähle 1)",
        en: "What does the version constraint `^12.4` mean? (Select 1)"
      },
      options: {
        de: ["Erlaubt alle Versionen ab 12.4.0 bis unter 13.0.0 (also 12.x.x).", "Nur 12.4.", "Bis 12.5.", "Alles ab 12.4."],
        en: ["Allows all versions from 12.4.0 up to (but not including) 13.0.0 (so 12.x.x).", "Only 12.4.", "Up to 12.5.", "Everything from 12.4."]
      },
      correctIndices: [0],
      explanation: {
        de: "Caret (^) erlaubt Updates, die keine Breaking Changes (Major) enthalten.",
        en: "Caret (^) allows updates containing no breaking changes (Major)."
      }
    },
    // SET 2: Architecture & Extbase
    {
      id: 'ext-6',
      text: {
        de: "Wann sollten Sie 'Extbase' verwenden und wann reines PHP/Doctrine? (Wähle 1)",
        en: "When should you use 'Extbase' and when pure PHP/Doctrine? (Select 1)"
      },
      options: {
        de: ["Extbase für komplexe Domain-Logik, Validierung und Frontend-Plugins (MVC). Doctrine für Performance-kritische Massenoperationen oder simple Datenstrukturen ohne Domain-Modell.", "Extbase immer.", "Doctrine immer.", "Extbase ist veraltet."],
        en: ["Extbase for complex domain logic, validation, and frontend plugins (MVC). Doctrine for performance-critical batch operations or simple data structures without domain models.", "Extbase always.", "Doctrine always.", "Extbase is obsolete."]
      },
      correctIndices: [0],
      explanation: {
        de: "Extbase hat Overhead (Reflection, Mapping). Doctrine ist 'closer to the metal'.",
        en: "Extbase has overhead (Reflection, Mapping). Doctrine is 'closer to the metal'."
      }
    },
    {
      id: 'ext-7',
      text: {
        de: "Was ist ein 'Event Listener' (PSR-14) im Vergleich zu einem 'Hook'? (Wähle 1)",
        en: "What is an 'Event Listener' (PSR-14) compared to a 'Hook'? (Select 1)"
      },
      options: {
        de: ["Die moderne, typisierte Art der Erweiterung. Events sind Objekte, Listener sind Services. Hooks sind veraltete String-basierte Funktionsaufrufe.", "Hooks sind schneller.", "Events sind nur für JavaScript.", "Es ist das Gleiche."],
        en: ["The modern, typed way of extension. Events are objects, listeners are services. Hooks are obsolete string-based function calls.", "Hooks are faster.", "Events are only for JavaScript.", "It is the same."]
      },
      correctIndices: [0],
      explanation: {
        de: "TYPO3 migriert sukzessive alle Hooks zu PSR-14 Events.",
        en: "TYPO3 is successively migrating all hooks to PSR-14 events."
      }
    },
    {
      id: 'ext-8',
      text: {
        de: "Sie wollen in Ihrer Extension einen eigenen Scheduler-Task bereitstellen. Welche Klasse müssen Sie erweitern? (Wähle 1)",
        en: "You want to provide a custom Scheduler Task in your extension. Which class must you extend? (Select 1)"
      },
      options: {
        de: ["Sie sollten einen Symfony Command (`CommandController` in v13 via DI Tag `console.command`) erstellen. Der Scheduler kann Commands ausführen.", "Klasse `AbstractTask`.", "Interface `TaskInterface`.", "Geht nur via SQL."],
        en: ["You should create a Symfony Command (`CommandController` in v13 via DI tag `console.command`). The Scheduler can execute commands.", "Class `AbstractTask`.", "Interface `TaskInterface`.", "Only possible via SQL."]
      },
      correctIndices: [0],
      explanation: {
        de: "Der moderne Weg sind CLI Commands, die auch im Scheduler planbar sind.",
        en: "The modern way are CLI commands, which are also schedulable."
      }
    },
    {
      id: 'ext-9',
      text: {
        de: "Wo definieren Sie das Datenbank-Schema (Tabellen, Spalten) einer Extension in v13? (Wähle 1)",
        en: "Where do you define the database schema (tables, columns) of an extension in v13? (Select 1)"
      },
      options: {
        de: ["In einer `ext_tables.sql` Datei (Legacy, aber noch Standard) ODER via `Classes/Updates` (Doctrine Migrations).", "In `TCA.php`.", "In `setup.ts`.", "In `composer.json`."],
        en: ["In an `ext_tables.sql` file (Legacy but still standard) OR via `Classes/Updates` (Doctrine Migrations).", "In `TCA.php`.", "In `setup.ts`.", "In `composer.json`."]
      },
      correctIndices: [0],
      explanation: {
        de: "TYPO3 liest die SQL-Definition und bietet Schema-Updates im Install Tool an.",
        en: "TYPO3 reads the SQL definition and offers schema updates in the Install Tool."
      }
    },
    {
      id: 'ext-10',
      text: {
        de: "Was ist 'XCLASS' und warum sollten Sie es vermeiden? (Wähle 1)",
        en: "What is 'XCLASS' and why should you avoid it? (Select 1)"
      },
      options: {
        de: ["Ein Mechanismus, um eine PHP-Klasse komplett zu ersetzen. Es ist riskant, da nur EINE Extension eine Klasse xclassen kann (Konfliktpotential) und Updates erschwert werden.", "Ein Style-Attribut.", "Eine Test-Klasse.", "Ein Caching-Tool."],
        en: ["A mechanism to completely replace a PHP class. It is risky because only ONE extension can xclass a class (conflict potential) and updates become harder.", "A style attribute.", "A test class.", "A caching tool."]
      },
      correctIndices: [0],
      explanation: {
        de: "XCLASS ist die 'Nuklear-Option', wenn keine Hooks/Events da sind.",
        en: "XCLASS is the 'nuclear option' when no hooks/events are available."
      }
    },
    // SET 3: Configuration
    {
      id: 'ext-11',
      text: {
        de: "Wo liegen die öffentlichen Assets (Bilder, JS, CSS) einer Extension im Composer Mode? (Wähle 1)",
        en: "Where are the public assets (images, JS, CSS) of an extension located in Composer Mode? (Select 1)"
      },
      options: {
        de: ["In `Resources/Public/`. Composer/TYPO3 symlinkt diesen Ordner nach `public/_assets/<hash>/` (oder ähnlich).", "In `fileadmin/`.", "In `Classes/`.", "In `Configuration/`."],
        en: ["In `Resources/Public/`. Composer/TYPO3 symlinks this folder to `public/_assets/<hash>/` (or similar).", "In `fileadmin/`.", "In `Classes/`.", "In `Configuration/`."]
      },
      correctIndices: [0],
      explanation: {
        de: "Assets im Extension-Ordner sind oft nicht direkt web-zugänglich (wg. `vendor/` Schutz). Symlinks lösen das.",
        en: "Assets in the extension folder are often not directly web-accessible (due to `vendor/` protection). Symlinks solve this."
      }
    },
    {
      id: 'ext-12',
      text: {
        de: "Wie können Sie Extension-Einstellungen global konfigurierbar machen (Extension Configuration)? (Wähle 1)",
        en: "How can you make extension settings globally configurable (Extension Configuration)? (Select 1)"
      },
      options: {
        de: ["Durch eine Datei `ext_conf_template.txt` (Typoscript-Syntax), die Formularfelder im Backend unter 'Extension Settings' generiert.", "In `setup.typoscript`.", "In der Datenbank.", "In `composer.json`."],
        en: ["Through a file `ext_conf_template.txt` (Typoscript syntax), which generates form fields in the backend under 'Extension Settings'.", "In `setup.typoscript`.", "In the database.", "In `composer.json`."]
      },
      correctIndices: [0],
      explanation: {
        de: "Diese Werte sind dann über `ExtensionConfiguration->get()` abrufbar.",
        en: "These values are then retrievable via `ExtensionConfiguration->get()`."
      }
    },
    {
      id: 'ext-13',
      text: {
        de: "Was ist ein 'Service' in `Configuration/Services.yaml`? (Wähle 1)",
        en: "What is a 'Service' in `Configuration/Services.yaml`? (Select 1)"
      },
      options: {
        de: ["Eine PHP-Klasse, die im Dependency Injection Container registriert ist. Kann in andere Klassen injiziert werden.", "Ein Cronjob.", "Ein Support-Vertrag.", "Ein Frontend-Plugin."],
        en: ["A PHP class registered in the Dependency Injection Container. Can be injected into other classes.", "A cronjob.", "A support contract.", "A frontend plugin."]
      },
      correctIndices: [0],
      explanation: {
        de: "Grundlage der modernen Architektur.",
        en: "Foundation of modern architecture."
      }
    },
    {
      id: 'ext-14',
      text: {
        de: "Sie wollen, dass Ihre Extension eine Middleware bereitstellt. Wo registrieren Sie diese? (Wähle 1)",
        en: "You want your extension to provide a Middleware. Where do you register it? (Select 1)"
      },
      options: {
        de: ["In `Configuration/RequestMiddlewares.php`.", "In `ext_localconf.php`.", "In `Services.yaml`.", "Automatisch."],
        en: ["In `Configuration/RequestMiddlewares.php`.", "In `ext_localconf.php`.", "In `Services.yaml`.", "Automatically."]
      },
      correctIndices: [0],
      explanation: {
        de: "Hier wird die Reihenfolge (Stack) definiert (before/after).",
        en: "Here the order (stack) is defined (before/after)."
      }
    },
    {
      id: 'ext-15',
      text: {
        de: "Wozu dient der Ordner `Resources/Private/`? (Wähle 1)",
        en: "What is the `Resources/Private/` folder used for? (Select 1)"
      },
      options: {
        de: ["Für Templates (Fluid), Partials, Layouts und PHP-Dateien, die NICHT direkt via Browser aufrufbar sein sollen.", "Für private Bilder.", "Für Passwörter.", "Ist egal."],
        en: ["For Templates (Fluid), Partials, Layouts, and PHP files that should NOT be directly accessible via browser.", "For private images.", "For passwords.", "Doesn't matter."]
      },
      correctIndices: [0],
      explanation: {
        de: "Schutz vor direktem Zugriff. Zugriff erfolgt nur über TYPO3 (Parsing).",
        en: "Protection against direct access. Access only via TYPO3 (Parsing)."
      }
    },
    // SET 4: Quality & Testing
    {
      id: 'ext-16',
      text: {
        de: "Wie stellen Sie sicher, dass Ihre Extension Coding Guidelines (CGL) einhält? (Wähle 1)",
        en: "How do you ensure your extension follows Coding Guidelines (CGL)? (Select 1)"
      },
      options: {
        de: ["Nutzung von `php-cs-fixer` oder `phpcs` mit dem TYPO3-Regelwerk in der CI/CD Pipeline.", "Manuell lesen.", "Kunden fragen.", "Ist nicht wichtig."],
        en: ["Using `php-cs-fixer` or `phpcs` with the TYPO3 rule set in the CI/CD pipeline.", "Reading manually.", "Asking the client.", "Not important."]
      },
      correctIndices: [0],
      explanation: {
        de: "Automatisierung sichert Qualität.",
        en: "Automation ensures quality."
      }
    },
    {
      id: 'ext-17',
      text: {
        de: "Was ist 'PHPStan' im TYPO3 Kontext? (Wähle 1)",
        en: "What is 'PHPStan' in the TYPO3 context? (Select 1)"
      },
      options: {
        de: ["Ein statisches Analysetool, das Typ-Fehler und Logik-Bugs findet, ohne den Code auszuführen.", "Ein Entwickler.", "Ein Testing-Framework für Unit Tests.", "Ein Datenbank-Tool."],
        en: ["A static analysis tool that finds type errors and logic bugs without executing the code.", "A developer.", "A testing framework for Unit Tests.", "A database tool."]
      },
      correctIndices: [0],
      explanation: {
        de: "Essenziell für stabile Extensions.",
        en: "Essential for stable extensions."
      }
    },
    {
      id: 'ext-18',
      text: {
        de: "Sie wollen Unit-Tests schreiben. Wohin gehören die Test-Dateien? (Wähle 1)",
        en: "You want to write Unit Tests. Where do the test files belong? (Select 1)"
      },
      options: {
        de: ["`Tests/Unit/`.", "In `Classes/`.", "In `Resources/`.", "In `var/`."],
        en: ["`Tests/Unit/`.", "In `Classes/`.", "In `Resources/`.", "In `var/`."]
      },
      correctIndices: [0],
      explanation: {
        de: "Standard-Struktur gemäß Best Practices.",
        en: "Standard structure according to best practices."
      }
    },
    {
      id: 'ext-19',
      text: {
        de: "Was ist eine 'FlexForm'? (Wähle 1)",
        en: "What is a 'FlexForm'? (Select 1)"
      },
      options: {
        de: ["Ein XML-basiertes Konfigurationsformular für Plugins/Inhaltselemente, dessen Werte als XML in EINEM Datenbankfeld gespeichert werden.", "Ein flexibles CSS Layout.", "Ein neues HTML Formular.", "Ein Backend Modul."],
        en: ["An XML-based configuration form for plugins/content elements, whose values are stored as XML in ONE database field.", "A flexible CSS layout.", "A new HTML form.", "A backend module."]
      },
      correctIndices: [0],
      explanation: {
        de: "Erlaubt komplexe Konfigurationen pro Plugin-Instanz ohne DB-Schema-Änderung.",
        en: "Allows complex configurations per plugin instance without DB schema changes."
      }
    },
    {
      id: 'ext-20',
      text: {
        de: "Warum sollten Sie `\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance()` vermeiden, wenn möglich? (Wähle 1)",
        en: "Why should you avoid `\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance()` if possible? (Select 1)"
      },
      options: {
        de: ["Es umgeht Dependency Injection (Service Locator Pattern). Klassen sind schwerer zu testen (Mocking) und Abhängigkeiten sind versteckt.", "Es ist veraltet und gelöscht.", "Es ist zu langsam.", "Es erzeugt Fehler."],
        en: ["It bypasses Dependency Injection (Service Locator Pattern). Classes are harder to test (mocking) and dependencies are hidden.", "It is deprecated and deleted.", "It is too slow.", "It creates errors."]
      },
      correctIndices: [0],
      explanation: {
        de: "Constructor Injection ist der saubere Weg.",
        en: "Constructor Injection is the clean way."
      }
    },
  ],
  [Topic.PROJECT_MGMT]: [
    // SET 1: Methods
    {
      id: 'pm-1',
      text: {
        de: "Ein Kunde möchte einen Festpreisvertrag (Fixed Price) für ein komplexes Projekt, will aber 'agil' arbeiten. Welches Risiko besteht? (Wähle 1)",
        en: "A client wants a Fixed Price contract for a complex project but wants to work 'agile'. What is the risk? (Select 1)"
      },
      options: {
        de: ["Der 'Scope' (Umfang) ist bei Agile variabel. Festpreis fixiert Kosten und Scope. Das führt zu Qualitätsverlust oder Konflikten bei Änderungen (Change Requests).", "Kein Risiko.", "Agile ist immer billiger.", "Der Kunde hat immer Recht."],
        en: ["The 'Scope' is variable in Agile. Fixed Price fixes cost and scope. This leads to quality loss or conflicts with changes (Change Requests).", "No risk.", "Agile is always cheaper.", "The client is always right."]
      },
      correctIndices: [0],
      explanation: {
        de: "Das 'Magische Dreieck' wird verletzt. Besser: 'Time & Material' oder Festpreis pro Sprint.",
        en: "The 'Magic Triangle' is violated. Better: 'Time & Material' or fixed price per sprint."
      }
    },
    {
      id: 'pm-2',
      text: {
        de: "Was ist der 'Bus Factor' in einem TYPO3-Projekt? (Wähle 1)",
        en: "What is the 'Bus Factor' in a TYPO3 project? (Select 1)"
      },
      options: {
        de: ["Das Risiko, dass kritisches Wissen bei einer einzigen Person liegt (die 'vom Bus überfahren' werden könnte). Ziel: Wissen verteilen.", "Reisekosten.", "Hardware-Bus.", "Anzahl der Server."],
        en: ["The risk that critical knowledge lies with a single person (who could get 'hit by a bus'). Goal: Distribute knowledge.", "Travel costs.", "Hardware bus.", "Number of servers."]
      },
      correctIndices: [0],
      explanation: {
        de: "Dokumentation und Pair Programming mindern dieses Risiko.",
        en: "Documentation and Pair Programming mitigate this risk."
      }
    },
    {
      id: 'pm-3',
      text: {
        de: "Was ist der Unterschied zwischen 'Definition of Done' (DoD) und 'Acceptance Criteria' (AC)? (Wähle 1)",
        en: "What is the difference between 'Definition of Done' (DoD) and 'Acceptance Criteria' (AC)? (Select 1)"
      },
      options: {
        de: ["DoD gilt für ALLE Tickets (Qualitätsstandard, z.B. 'Getestet, Dokumentiert'). AC gilt spezifisch für EINE User Story (Funktionsumfang).", "DoD ist für Entwickler, AC für Kunden.", "Ist das Gleiche.", "AC ist optional."],
        en: ["DoD applies to ALL tickets (Quality standard, e.g., 'Tested, Documented'). AC applies specifically to ONE User Story (Functional scope).", "DoD is for developers, AC for clients.", "It is the same.", "AC is optional."]
      },
      correctIndices: [0],
      explanation: {
        de: "DoD sichert die generelle Qualität, AC die fachliche Korrektheit.",
        en: "DoD ensures general quality, AC functional correctness."
      }
    },
    {
      id: 'pm-4',
      text: {
        de: "Was ist ein 'Stakeholder' und warum ist die 'Stakeholder Matrix' wichtig? (Wähle 1)",
        en: "What is a 'Stakeholder' and why is the 'Stakeholder Matrix' important? (Select 1)"
      },
      options: {
        de: ["Jeder, der Einfluss auf das Projekt hat oder davon betroffen ist. Die Matrix hilft, Kommunikation nach Macht/Interesse zu steuern (z.B. Mächtige Gegner früh einbinden).", "Der Geldgeber.", "Nur die User.", "Das Hosting."],
        en: ["Anyone who influences or is affected by the project. The matrix helps manage communication by Power/Interest (e.g., involve powerful opponents early).", "The funder.", "Only the users.", "The hosting."]
      },
      correctIndices: [0],
      explanation: {
        de: "Ignorierte Stakeholder können Projekte scheitern lassen.",
        en: "Ignored stakeholders can cause projects to fail."
      }
    },
    {
      id: 'pm-5',
      text: {
        de: "Was bedeutet 'MVP' (Minimum Viable Product)? (Wähle 1)",
        en: "What does 'MVP' (Minimum Viable Product) mean? (Select 1)"
      },
      options: {
        de: ["Die kleinste Version eines Produkts, die funktionsfähig ist und User-Feedback ermöglicht (Lernen > Perfektion).", "Ein Prototyp ohne Funktion.", "Das fertige Produkt.", "Most Valuable Player."],
        en: ["The smallest version of a product that is functional and enables user feedback (Learning > Perfection).", "A prototype without function.", "The finished product.", "Most Valuable Player."]
      },
      correctIndices: [0],
      explanation: {
        de: "Vermeidet Entwicklung am Markt vorbei.",
        en: "Avoids developing irrelevant products."
      }
    },
    // SET 2: Scrum
    {
      id: 'pm-6',
      text: {
        de: "Was ist die Aufgabe des 'Product Owner' (PO) in Scrum? (Wähle 1)",
        en: "What is the role of the 'Product Owner' (PO) in Scrum? (Select 1)"
      },
      options: {
        de: ["Maximierung des Produktwertes, Pflege des Backlogs, Priorisierung. Er ist die Stimme des Kunden.", "Team-Management.", "Scrum-Prozess überwachen (Scrum Master).", "Code schreiben."],
        en: ["Maximizing product value, maintaining the backlog, prioritization. They are the voice of the customer.", "Team management.", "Monitoring Scrum process (Scrum Master).", "Writing code."]
      },
      correctIndices: [0],
      explanation: {
        de: "Der PO entscheidet WAS gemacht wird, das Team WIE.",
        en: "The PO decides WHAT is done, the team HOW."
      }
    },
    {
      id: 'pm-7',
      text: {
        de: "Was passiert im 'Sprint Review'? (Wähle 1)",
        en: "What happens in the 'Sprint Review'? (Select 1)"
      },
      options: {
        de: ["Das Team präsentiert das Inkrement (fertige Software) den Stakeholdern. Feedback wird eingeholt.", "Das Team bespricht Probleme (Retrospektive).", "Planung des nächsten Sprints.", "Pause."],
        en: ["The team presents the increment (finished software) to stakeholders. Feedback is collected.", "The team discusses problems (Retrospective).", "Planning the next sprint.", "Break."]
      },
      correctIndices: [0],
      explanation: {
        de: "Transparenz über den Fortschritt.",
        en: "Transparency about progress."
      }
    },
    {
      id: 'pm-8',
      text: {
        de: "Was ist 'Velocity'? (Wähle 1)",
        en: "What is 'Velocity'? (Select 1)"
      },
      options: {
        de: ["Die Menge an Arbeit (Story Points), die ein Team durchschnittlich pro Sprint schafft. Hilft bei der Prognose.", "Geschwindigkeit des Servers.", "Anzahl der Entwickler.", "Budget."],
        en: ["The amount of work (Story Points) a team completes on average per sprint. Helps with forecasting.", "Server speed.", "Number of developers.", "Budget."]
      },
      correctIndices: [0],
      explanation: {
        de: "Velocity ist ein empirischer Wert, kein Ziel.",
        en: "Velocity is an empirical value, not a target."
      }
    },
    {
      id: 'pm-9',
      text: {
        de: "Was ist ein 'Impediment'? (Wähle 1)",
        en: "What is an 'Impediment'? (Select 1)"
      },
      options: {
        de: ["Ein Hindernis, das das Team blockiert (z.B. fehlende Zugänge, Krankheit). Der Scrum Master muss es beseitigen.", "Ein Feature.", "Ein Bug.", "Ein Meeting."],
        en: ["An obstacle blocking the team (e.g., missing access, illness). The Scrum Master must remove it.", "A feature.", "A bug.", "A meeting."]
      },
      correctIndices: [0],
      explanation: {
        de: "Impediments gefährden das Sprint-Ziel.",
        en: "Impediments endanger the Sprint Goal."
      }
    },
    {
      id: 'pm-10',
      text: {
        de: "Darf der Product Owner während des Sprints neue Anforderungen hinzufügen? (Wähle 1)",
        en: "Can the Product Owner add new requirements during the sprint? (Select 1)"
      },
      options: {
        de: ["Nein, der Sprint Scope ist fix (Schutz des Teams). Ausnahmen nur bei Gefahr im Verzug oder Tausch gleich großer Items (mit Zustimmung des Teams).", "Ja, immer.", "Ja, wenn er Chef ist.", "Nie."],
        en: ["No, the Sprint Scope is fixed (protecting the team). Exceptions only in emergencies or swapping equal-sized items (with team agreement).", "Yes, always.", "Yes, if he is the boss.", "Never."]
      },
      correctIndices: [0],
      explanation: {
        de: "Stabilität ist wichtig für Fokus.",
        en: "Stability is important for focus."
      }
    },
    // SET 3: Requirements & Quality
    {
      id: 'pm-11',
      text: {
        de: "Was besagt das 'Kano-Modell' über 'Basisfaktoren' (Must-be)? (Wähle 1)",
        en: "What does the 'Kano Model' say about 'Basic Factors' (Must-be)? (Select 1)"
      },
      options: {
        de: ["Sie werden als selbstverständlich vorausgesetzt. Ihr Vorhandensein steigert die Zufriedenheit NICHT, ihr Fehlen führt aber zu extremer Unzufriedenheit.", "Sie begeistern den Kunden.", "Je mehr desto besser.", "Sind unwichtig."],
        en: ["They are taken for granted. Their presence does NOT increase satisfaction, but their absence leads to extreme dissatisfaction.", "They delight the customer.", "The more the better.", "Are unimportant."]
      },
      correctIndices: [0],
      explanation: {
        de: "Beispiel: Dass eine Webseite erreichbar ist.",
        en: "Example: That a website is accessible."
      }
    },
    {
      id: 'pm-12',
      text: {
        de: "Was sind 'Nicht-Funktionale Anforderungen' (NFR)? (Wähle 1)",
        en: "What are 'Non-Functional Requirements' (NFR)? (Select 1)"
      },
      options: {
        de: ["Qualitätsanforderungen (Wie gut?): Performance, Sicherheit, Usability, Skalierbarkeit.", "Features (Was?).", "Design.", "Kosten."],
        en: ["Quality requirements (How good?): Performance, Security, Usability, Scalability.", "Features (What?).", "Design.", "Costs."]
      },
      correctIndices: [0],
      explanation: {
        de: "Oft vergessen, aber kritisch für Architektur.",
        en: "Often forgotten, but critical for architecture."
      }
    },
    {
      id: 'pm-13',
      text: {
        de: "Was ist 'User Acceptance Testing' (UAT)? (Wähle 1)",
        en: "What is 'User Acceptance Testing' (UAT)? (Select 1)"
      },
      options: {
        de: ["Tests durch den Endnutzer/Kunden in einer realitätsnahen Umgebung vor dem Go-Live, um zu prüfen, ob die Anforderungen erfüllt sind.", "Unit Tests.", "Automatisierte Tests.", "Entwickler testen selbst."],
        en: ["Tests by the end user/client in a realistic environment before Go-Live to check if requirements are met.", "Unit Tests.", "Automated tests.", "Developers test themselves."]
      },
      correctIndices: [0],
      explanation: {
        de: "Letzte Stufe vor dem Deployment.",
        en: "Last stage before deployment."
      }
    },
    {
      id: 'pm-14',
      text: {
        de: "Was ist 'Technical Debt'? (Wähle 1)",
        en: "What is 'Technical Debt'? (Select 1)"
      },
      options: {
        de: ["Die langfristigen Kosten von kurzfristigen, suboptimalen Lösungen ('Quick & Dirty'). Muss zurückgezahlt werden (Refactoring), sonst sinkt die Entwicklungsgewschwindigkeit.", "Schulden bei der Bank.", "Alte Hardware.", "Lizenzkosten."],
        en: ["The long-term costs of short-term, suboptimal solutions ('Quick & Dirty'). Must be repaid (Refactoring), otherwise development speed drops.", "Debt at the bank.", "Old hardware.", "License costs."]
      },
      correctIndices: [0],
      explanation: {
        de: "Eine bewusste Strategie, aber gefährlich ohne Management.",
        en: "A conscious strategy, but dangerous without management."
      }
    },
    {
      id: 'pm-15',
      text: {
        de: "Was ist ein 'Wireframe'? (Wähle 1)",
        en: "What is a 'Wireframe'? (Select 1)"
      },
      options: {
        de: ["Ein schematischer Entwurf einer Seite (Struktur, Inhalt), ohne Design-Details. Fokus auf UX und Informationsarchitektur.", "Ein fertiges Design.", "Ein Code-Gerüst.", "Ein Kabel."],
        en: ["A schematic draft of a page (structure, content), without design details. Focus on UX and information architecture.", "A finished design.", "A code skeleton.", "A cable."]
      },
      correctIndices: [0],
      explanation: {
        de: "Spart Kosten, da Änderungen früh einfacher sind.",
        en: "Saves costs as changes are easier early on."
      }
    },
    // SET 4: TYPO3 Specifics
    {
      id: 'pm-16',
      text: {
        de: "Ein Kunde will wissen, warum Updates wichtig sind (Budget). Was antworten Sie? (Wähle 1)",
        en: "A client wants to know why updates are important (Budget). What do you answer? (Select 1)"
      },
      options: {
        de: ["Sicherheit (Schutz vor Hacks), Stabilität, Kompatibilität (PHP, Browser) und neue Features/Rechtssicherheit.", "Damit wir Arbeit haben.", "Weil es neu ist.", "Ist nicht wichtig."],
        en: ["Security (protection against hacks), Stability, Compatibility (PHP, Browser), and new features/legal compliance.", "So we have work.", "Because it's new.", "It is not important."]
      },
      correctIndices: [0],
      explanation: {
        de: "Software altert (Security Rot).",
        en: "Software ages (Security Rot)."
      }
    },
    {
      id: 'pm-17',
      text: {
        de: "Wie gehen Sie mit 'Scope Creep' um? (Wähle 1)",
        en: "How do you handle 'Scope Creep'? (Select 1)"
      },
      options: {
        de: ["Transparenz schaffen. Neue Anforderungen erfassen, schätzen und priorisieren (gegen bestehende Items tauschen oder Budget erhöhen). Nicht einfach 'machen'.", "Einfach machen.", "Nein sagen.", "Ignorieren."],
        en: ["Create transparency. Capture, estimate, and prioritize new requirements (swap with existing items or increase budget). Don't just 'do' it.", "Just do it.", "Say no.", "Ignore."]
      },
      correctIndices: [0],
      explanation: {
        de: "Scope Creep zerstört Budgets und Timings.",
        en: "Scope Creep destroys budgets and timings."
      }
    },
    {
      id: 'pm-18',
      text: {
        de: "Was ist ein 'SLA' (Service Level Agreement)? (Wähle 1)",
        en: "What is an 'SLA' (Service Level Agreement)? (Select 1)"
      },
      options: {
        de: ["Ein Vertrag, der Qualitätsstufen zusichert (z.B. 99.9% Uptime, Reaktionszeit < 4h).", "Eine Rechnung.", "Ein Lastenheft.", "Ein Protokoll."],
        en: ["A contract guaranteeing quality levels (e.g., 99.9% uptime, response time < 4h).", "An invoice.", "A requirement spec.", "A protocol."]
      },
      correctIndices: [0],
      explanation: {
        de: "Definiert die Erwartungshaltung im Betrieb.",
        en: "Defines expectations during operation."
      }
    },
    {
      id: 'pm-19',
      text: {
        de: "Wann nutzen Sie 'Time & Material' (Aufwand) statt Festpreis? (Wähle 1)",
        en: "When do you use 'Time & Material' instead of Fixed Price? (Select 1)"
      },
      options: {
        de: ["Wenn Anforderungen unklar sind oder sich ändern werden (Agil). Das Risiko liegt beim Kunden, aber er erhält Flexibilität.", "Wenn alles klar ist.", "Bei kleinen Projekten.", "Nie."],
        en: ["When requirements are unclear or likely to change (Agile). The risk lies with the client, but they gain flexibility.", "When everything is clear.", "For small projects.", "Never."]
      },
      correctIndices: [0],
      explanation: {
        de: "Fairstes Modell für Softwareentwicklung.",
        en: "Fairest model for software development."
      }
    },
    {
      id: 'pm-20',
      text: {
        de: "Was ist eine 'Retrospektive'? (Wähle 1)",
        en: "What is a 'Retrospective'? (Select 1)"
      },
      options: {
        de: ["Ein Meeting, um den Arbeitsprozess (nicht das Produkt) zu verbessern. 'Was lief gut, was lief schlecht?'", "Ein Review.", "Ein Planungsmeeting.", "Ein Feierabendbier."],
        en: ["A meeting to improve the work process (not the product). 'What went well, what went wrong?'", "A review.", "A planning meeting.", "After-work beer."]
      },
      correctIndices: [0],
      explanation: {
        de: "Motor der kontinuierlichen Verbesserung.",
        en: "Engine of continuous improvement."
      }
    },
  ],
  [Topic.SEO]: [
    // SET 1: Technical SEO
    {
      id: 'seo-1',
      text: {
        de: "Was bewirkt der 'Canonical Tag' im TYPO3 Core? (Wähle 1)",
        en: "What does the 'Canonical Tag' do in TYPO3 Core? (Select 1)"
      },
      options: {
        de: ["Er verhindert Duplicate Content, indem er Suchmaschinen die 'Original-URL' einer Seite anzeigt (z.B. bei Parametern). TYPO3 setzt diesen automatisch.", "Er macht Bilder schneller.", "Er blockiert Google.", "Er ist ein Meta-Keyword."],
        en: ["It prevents Duplicate Content by showing search engines the 'original URL' of a page (e.g. with parameters). TYPO3 sets this automatically.", "It speeds up images.", "It blocks Google.", "It is a meta keyword."]
      },
      correctIndices: [0],
      explanation: {
        de: "Essentiell, wenn Inhalte über mehrere URLs erreichbar sind.",
        en: "Essential if content is accessible via multiple URLs."
      }
    },
    {
      id: 'seo-2',
      text: {
        de: "Wie werden XML-Sitemaps in TYPO3 v13 generiert? (Wähle 1)",
        en: "How are XML Sitemaps generated in TYPO3 v13? (Select 1)"
      },
      options: {
        de: ["Native Integration (SEO Extension im Core). Konfigurierbar via TypoScript und Site Config. Automatische Updates.", "Manuell per FTP hochladen.", "Nur über Drittanbieter.", "Gar nicht."],
        en: ["Native integration (SEO extension in Core). Configurable via TypoScript and Site Config. Automatic updates.", "Upload manually via FTP.", "Only via third parties.", "Not at all."]
      },
      correctIndices: [0],
      explanation: {
        de: "Core Feature seit v9.",
        en: "Core feature since v9."
      }
    },
    {
      id: 'seo-3',
      text: {
        de: "Was ist 'Hreflang' und wie unterstützt TYPO3 dies? (Wähle 1)",
        en: "What is 'Hreflang' and how does TYPO3 support it? (Select 1)"
      },
      options: {
        de: ["Zeigt Google die sprachlichen Varianten einer Seite (z.B. de-CH vs de-DE). TYPO3 generiert dies automatisch basierend auf der Site Config und Übersetzungen.", "Übersetzt den Text.", "Ist für Bilder.", "Ein HTML Fehler."],
        en: ["Shows Google the language variants of a page (e.g. de-CH vs de-DE). TYPO3 generates this automatically based on Site Config and translations.", "Translates the text.", "Is for images.", "An HTML error."]
      },
      correctIndices: [0],
      explanation: {
        de: "Verhindert, dass Google Übersetzungen als Duplicate Content wertet.",
        en: "Prevents Google from marking translations as Duplicate Content."
      }
    },
    {
      id: 'seo-4',
      text: {
        de: "Sie ändern die URL-Struktur einer Website beim Relaunch. Was MÜSSEN Sie tun, um das Ranking zu erhalten? (Wähle 1)",
        en: "You are changing the URL structure of a website during a relaunch. What MUST you do to preserve ranking? (Select 1)"
      },
      options: {
        de: ["301 Redirects (Permanent) von allen alten URLs auf die neuen URLs einrichten (via Redirects Modul oder Site Config).", "302 Redirects nutzen.", "404 Fehler akzeptieren.", "Google anrufen."],
        en: ["Set up 301 Redirects (Permanent) from all old URLs to the new URLs (via Redirects module or Site Config).", "Use 302 Redirects.", "Accept 404 errors.", "Call Google."]
      },
      correctIndices: [0],
      explanation: {
        de: "Link Juice muss weitergeleitet werden. 404s zerstören das Ranking.",
        en: "Link Juice must be passed on. 404s destroy ranking."
      }
    },
    {
      id: 'seo-5',
      text: {
        de: "Was ist die `robots.txt` in TYPO3 v13? (Wähle 1)",
        en: "What is `robots.txt` in TYPO3 v13? (Select 1)"
      },
      options: {
        de: ["Kann virtuell über die Site Configuration (Settings -> Robots.txt) verwaltet werden. TYPO3 liefert sie dynamisch aus.", "Muss eine physische Datei sein.", "Gibt es nicht mehr.", "Ist eine Datenbank."],
        en: ["Can be managed virtually via Site Configuration (Settings -> Robots.txt). TYPO3 serves it dynamically.", "Must be a physical file.", "Does not exist anymore.", "Is a database."]
      },
      correctIndices: [0],
      explanation: {
        de: "Erlaubt unterschiedliche Regeln pro Site/Domain ohne Dateisystem-Zugriff.",
        en: "Allows different rules per site/domain without filesystem access."
      }
    },
    // SET 2: Performance (Core Web Vitals)
    {
      id: 'seo-6',
      text: {
        de: "Welche Auswirkung hat 'LCP' (Largest Contentful Paint) auf SEO? (Wähle 1)",
        en: "What effect does 'LCP' (Largest Contentful Paint) have on SEO? (Select 1)"
      },
      options: {
        de: ["Ranking-Faktor (Core Web Vitals). Misst die Ladezeit des Hauptinhalts. Sollte < 2.5s sein. Optimierung: Bildgrößen, Caching, schnelles Server-Antwortzeit.", "Egal.", "Nur für Mobile.", "Misst Farbe."],
        en: ["Ranking factor (Core Web Vitals). Measures loading time of main content. Should be < 2.5s. Optimization: Image sizes, caching, fast server response.", "Doesn't matter.", "Only for mobile.", "Measures color."]
      },
      correctIndices: [0],
      explanation: {
        de: "Google bewertet User Experience.",
        en: "Google evaluates User Experience."
      }
    },
    {
      id: 'seo-7',
      text: {
        de: "Wie hilft TYPO3 beim 'CLS' (Cumulative Layout Shift)? (Wähle 1)",
        en: "How does TYPO3 help with 'CLS' (Cumulative Layout Shift)? (Select 1)"
      },
      options: {
        de: ["TYPO3 rendert `width` und `height` Attribute bei Bildern automatisch, sodass der Browser Platz reservieren kann und Inhalte nicht springen.", "Gar nicht.", "Durch langsames Laden.", "Durch JavaScript."],
        en: ["TYPO3 renders `width` and `height` attributes for images automatically, so the browser can reserve space and content doesn't jump.", "Not at all.", "By loading slowly.", "Through JavaScript."]
      },
      correctIndices: [0],
      explanation: {
        de: "Layout-Sprünge frustrieren Nutzer und werden abgestraft.",
        en: "Layout shifts frustrate users and are penalized."
      }
    },
    {
      id: 'seo-8',
      text: {
        de: "Warum ist `loading=\"lazy\"` bei Bildern wichtig? (Wähle 1)",
        en: "Why is `loading=\"lazy\"` on images important? (Select 1)"
      },
      options: {
        de: ["Spart Bandbreite und beschleunigt den initialen Seitenaufbau, da Bilder erst geladen werden, wenn sie sichtbar werden.", "Sieht besser aus.", "Ist Pflicht für HTML5.", "Macht Bilder schärfer."],
        en: ["Saves bandwidth and speeds up initial page load as images are only loaded when they become visible.", "Looks better.", "Mandatory for HTML5.", "Makes images sharper."]
      },
      correctIndices: [0],
      explanation: {
        de: "TYPO3 setzt dies standardmäßig.",
        en: "TYPO3 sets this by default."
      }
    },
    {
      id: 'seo-9',
      text: {
        de: "Was ist 'Structured Data' (Schema.org) und wie wird es in TYPO3 implementiert? (Wähle 1)",
        en: "What is 'Structured Data' (Schema.org) and how is it implemented in TYPO3? (Select 1)"
      },
      options: {
        de: ["JSON-LD Code im Head, der Maschinen hilft, Inhalte (Events, Jobs, Produkte) zu verstehen -> Rich Snippets. Implementierung meist via Fluid oder SEO Extension.", "Metatags.", "CSS Klassen.", "HTML Tabellen."],
        en: ["JSON-LD code in the head helping machines understand content (Events, Jobs, Products) -> Rich Snippets. Implementation mostly via Fluid or SEO extension.", "Meta tags.", "CSS classes.", "HTML tables."]
      },
      correctIndices: [0],
      explanation: {
        de: "Verbessert die Darstellung in den Suchergebnissen (CTR).",
        en: "Improves display in search results (CTR)."
      }
    },
    {
      id: 'seo-10',
      text: {
        de: "Welche Metadaten sind für Social Media Sharing (Facebook/LinkedIn) wichtig? (Wähle 1)",
        en: "Which metadata is important for Social Media Sharing (Facebook/LinkedIn)? (Select 1)"
      },
      options: {
        de: ["Open Graph (og:title, og:image, og:description).", "Meta Keywords.", "Twitter Cards.", "H1 Tags."],
        en: ["Open Graph (og:title, og:image, og:description).", "Meta keywords.", "Twitter Cards.", "H1 tags."]
      },
      correctIndices: [0],
      explanation: {
        de: "Steuert die Vorschau beim Teilen von Links.",
        en: "Controls the preview when sharing links."
      }
    },
    // SET 3: Content & Strategy
    {
      id: 'seo-11',
      text: {
        de: "Was ist 'Duplicate Content'? (Wähle 1)",
        en: "What is 'Duplicate Content'? (Select 1)"
      },
      options: {
        de: ["Identischer Inhalt unter verschiedenen URLs (z.B. mit/ohne Trailing Slash, http/https). Google weiß nicht, welche Version ranken soll.", "Kopierter Text.", "Backup.", "Zweisprachigkeit."],
        en: ["Identical content under different URLs (e.g. with/without trailing slash, http/https). Google doesn't know which version to rank.", "Copied text.", "Backup.", "Bilingualism."]
      },
      correctIndices: [0],
      explanation: {
        de: "Muss durch Redirects oder Canonicals behoben werden.",
        en: "Must be fixed via redirects or canoncials."
      }
    },
    {
      id: 'seo-12',
      text: {
        de: "Wie optimieren Sie Title-Tags in TYPO3? (Wähle 1)",
        en: "How do you optimize Title Tags in TYPO3? (Select 1)"
      },
      options: {
        de: ["Konfiguration in `config.yaml` oder TypoScript. Aufbau: 'Seitentitel - Projektname'. Wichtigstes Keyword nach vorne. Länge ca. 60 Zeichen.", "Möglichst lang.", "Nur Projektname.", "Leer lassen."],
        en: ["Configuration in `config.yaml` or TypoScript. Structure: 'Page Title - Project Name'. Most important keyword first. Length approx. 60 chars.", "As long as possible.", "Project name only.", "Leave empty."]
      },
      correctIndices: [0],
      explanation: {
        de: "Der Title ist der wichtigste Onpage-Faktor.",
        en: "The Title is the most important Onpage factor."
      }
    },
    {
      id: 'seo-13',
      text: {
        de: "Warum sollten Sie 'Speaking URLs' (Slugs) verwenden? (Wähle 1)",
        en: "Why should you use 'Speaking URLs' (Slugs)? (Select 1)"
      },
      options: {
        de: ["Besser für User (lesbar, vertrauenswürdig) und Suchmaschinen (Keywords in URL). `id=123` ist schlecht.", "Technisch notwendig.", "Server braucht das.", "Sieht schöner aus."],
        en: ["Better for users (readable, trustworthy) and search engines (keywords in URL). `id=123` is bad.", "Technically necessary.", "Server needs it.", "Looks nicer."]
      },
      correctIndices: [0],
      explanation: {
        de: "Standard in TYPO3 v13 (Route Enhancers).",
        en: "Standard in TYPO3 v13 (Route Enhancers)."
      }
    },
    {
      id: 'seo-14',
      text: {
        de: "Was ist ein 'Meta Description'? (Wähle 1)",
        en: "What is a 'Meta Description'? (Select 1)"
      },
      options: {
        de: ["Ein kurzer Text (ca. 160 Zeichen), der in den Suchergebnissen unter dem Titel steht. Beeinflusst die Klickrate (CTR), nicht direkt das Ranking.", "Ein Ranking-Faktor.", "Versteckter Text.", "Keywords."],
        en: ["A short text (approx. 160 chars) appearing under the title in search results. Influences Click-Through Rate (CTR), not directly ranking.", "A ranking factor.", "Hidden text.", "Keywords."]
      },
      correctIndices: [0],
      explanation: {
        de: "Sollte zum Klicken animieren (Call to Action).",
        en: "Should encourage clicking (Call to Action)."
      }
    },
    {
      id: 'seo-15',
      text: {
        de: "Wie gehen Sie mit gelöschten Produkten um, die noch Traffic haben? (Wähle 1)",
        en: "How do you deal with deleted products that still have traffic? (Select 1)"
      },
      options: {
        de: ["301 Redirect auf ein ähnliches Produkt oder die Kategorie. Nicht einfach 404 (User-Frust).", "404 löschen.", "Startseite.", "Ignorieren."],
        en: ["301 Redirect to a similar product or the category. Not just 404 (User frustration).", "Delete 404.", "Homepage.", "Ignore."]
      },
      correctIndices: [0],
      explanation: {
        de: "User Experience erhalten.",
        en: "Preserve User Experience."
      }
    },
    // SET 4: Setup & Errors
    {
      id: 'seo-16',
      text: {
        de: "Was bedeutet der HTTP Status 410 (Gone)? (Wähle 1)",
        en: "What does HTTP Status 410 (Gone) mean? (Select 1)"
      },
      options: {
        de: ["Die Seite wurde dauerhaft entfernt und kommt nicht wieder. Signalisiert Google, die Seite schneller aus dem Index zu werfen als 404.", "Server Fehler.", "Verschoben.", "Wartung."],
        en: ["The page has been permanently removed and will not return. Signals Google to de-index the page faster than 404.", "Server error.", "Moved.", "Maintenance."]
      },
      correctIndices: [0],
      explanation: {
        de: "Nützlich beim Bereinigen alter Inhalte.",
        en: "Useful when cleaning up old content."
      }
    },
    {
      id: 'seo-17',
      text: {
        de: "Wie vermeiden Sie 'Thin Content' bei Paginierung (Seite 2, 3...)? (Wähle 1)",
        en: "How do you avoid 'Thin Content' with pagination (Page 2, 3...)? (Select 1)"
      },
      options: {
        de: ["Nutzung von `rel=\"prev\"` und `rel=\"next\"` (obwohl Google das weniger nutzt) oder 'View All' Page. Wichtig: Unique Titles ('Seite 2').", "Canonical auf Seite 1.", "Noindex auf alle.", "Egal."],
        en: ["Using `rel=\"prev\"` and `rel=\"next\"` (though Google uses this less) or 'View All' page. Important: Unique titles ('Page 2').", "Canonical to Page 1.", "Noindex on all.", "Doesn't matter."]
      },
      correctIndices: [0],
      explanation: {
        de: "Canonical auf Seite 1 wäre falsch, da Seite 2 anderen Inhalt hat.",
        en: "Canonical to Page 1 would be wrong as Page 2 has different content."
      }
    },
    {
      id: 'seo-18',
      text: {
        de: "Warum ist HTTPS ein Ranking-Signal? (Wähle 1)",
        en: "Why is HTTPS a ranking signal? (Select 1)"
      },
      options: {
        de: ["Sicherheit und Vertrauen für den User. Browser warnen vor HTTP.", "Ist schneller.", "Google verkauft Zertifikate.", "Egal."],
        en: ["Security and trust for the user. Browsers warn about HTTP.", "Is faster.", "Google sells certificates.", "Doesn't matter."]
      },
      correctIndices: [0],
      explanation: {
        de: "Ohne SSL ist heute kein SEO mehr möglich.",
        en: "No SEO is possible today without SSL."
      }
    },
    {
      id: 'seo-19',
      text: {
        de: "Was ist die `yoast_seo` Extension für TYPO3? (Wähle 1)",
        en: "What is the `yoast_seo` extension for TYPO3? (Select 1)"
      },
      options: {
        de: ["Eine Portierung des bekannten WordPress-Plugins. Bietet Inhaltsanalyse (Ampelsystem) und Snippet-Preview für Redakteure.", "Ein Core Feature.", "Ein Design Tool.", "Eine Datenbank."],
        en: ["A port of the famous WordPress plugin. Offers content analysis (traffic light system) and snippet preview for editors.", "A Core feature.", "A design tool.", "A database."]
      },
      correctIndices: [0],
      explanation: {
        de: "Beliebt bei Redakteuren zur Optimierung.",
        en: "Popular with editors for optimization."
      }
    },
    {
      id: 'seo-20',
      text: {
        de: "Was ist ein 'Trailing Slash' Problem? (Wähle 1)",
        en: "What is a 'Trailing Slash' problem? (Select 1)"
      },
      options: {
        de: ["`/seite` und `/seite/` sind technisch zwei verschiedene URLs. Ohne Redirect entsteht Duplicate Content.", "Ein Slash im Titel.", "Falsches HTML.", "Server Absturz."],
        en: ["`/page` and `/page/` are technically two different URLs. Without redirect, Duplicate Content occurs.", "A slash in the title.", "Wrong HTML.", "Server crash."]
      },
      correctIndices: [0],
      explanation: {
        de: "TYPO3 sollte so konfiguriert sein, dass eine Variante erzwungen wird (meist mit Slash).",
        en: "TYPO3 should be configured to enforce one variant (usually with slash)."
      }
    },
  ]
};
