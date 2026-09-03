export const searchData = {
  "de": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "KI-Analyse",
          null,
          [
            "PCU integriert sich mit KI-CLI-Tools, um intelligente Abhängigkeitsanalyse, Sicherheitsbewertungen und Update-Empfehlungen bereitzustellen. "
          ]
        ],
        [
          "Übersicht",
          "uebersicht",
          [
            "Die KI-Analyse erweitert die Fähigkeiten von PCU durch:",
            "Auswirkungsanalyse: Verstehen Sie, wie Updates Ihre Codebasis beeinflussen",
            "Sicherheitsbewertung: Erhalten Sie KI-gestützte Sicherheitslückenanalyse",
            "Kompatibilitätsprüfung: Erkennen Sie potenzielle Breaking Changes",
            "Update-Empfehlungen: Erhalten Sie intelligente Vorschläge für sichere Updates"
          ]
        ],
        [
          "Unterstützte KI-Anbieter",
          "unterstuetzte-ki-anbieter",
          [
            "PCU erkennt automatisch verfügbare KI-CLI-Tools und verwendet sie in der folgenden Prioritätsreihenfolge:",
            "| Anbieter | Priorität | Fähigkeiten                                          |\n| -------- | --------- | ---------------------------------------------------- |\n| Gemini   | 100       | Auswirkung, Sicherheit, Kompatibilität, Empfehlungen |\n| Claude   | 80        | Auswirkung, Sicherheit, Kompatibilität, Empfehlungen |\n| Codex    | 60        | Auswirkung, Kompatibilität, Empfehlungen             |\n| Cursor   | 40        | Auswirkung, Empfehlungen                             |",
            "Wenn keine KI-Anbieter verfügbar sind, fällt PCU automatisch auf eine regelbasierte Analyse-Engine\nzurück, die grundlegende Abhängigkeitsanalyse mit vordefinierten Regeln bietet."
          ]
        ],
        [
          "Befehle",
          "befehle",
          [
            "Verfügbare KI-Anbieter prüfen",
            "Zeigen Sie an, welche KI-Tools auf Ihrem System verfügbar sind:",
            "Dieser Befehl zeigt:",
            "Auf Ihrem System erkannte verfügbare KI-CLI-Tools",
            "Versionsinformationen für jeden Anbieter",
            "Der beste verfügbare Anbieter, der für die Analyse verwendet wird",
            "KI-Befehlsoptionen",
            "Status aller KI-Anbieter anzeigen (Standardverhalten)",
            "KI-Analyse mit einer Beispielanfrage testen, um Anbieterverbindung zu überprüfen",
            "KI-Analyse-Cache-Statistiken einschließlich Trefferrate und Größe anzeigen",
            "KI-Analyse-Cache leeren, um Speicherplatz freizugeben oder zwischengespeicherte Antworten zurückzusetzen",
            "KI-gestütztes Update",
            "Abhängigkeiten mit KI-gestützter Analyse aktualisieren:",
            "Das KI-erweiterte Update bietet:",
            "Intelligente Risikobewertung für jedes Update",
            "Breaking-Change-Erkennung mit Erklärungen",
            "Identifizierung von Sicherheitslücken",
            "Empfohlene Update-Reihenfolge",
            "KI-gestützte Analyse",
            "Analysieren Sie ein spezifisches Paket-Update mit KI-Unterstützung:",
            "Der analyze-Befehl verwendet standardmäßig den default-Katalog. Sie können einen anderen\nKatalog als erstes Argument angeben: pcu analyze my-catalog react"
          ]
        ],
        [
          "Analysetypen",
          "analysetypen",
          [
            "Auswirkungsanalyse",
            "Bewerten Sie, wie ein Abhängigkeitsupdate Ihr Projekt beeinflusst:",
            "Identifizieren Sie alle Workspace-Pakete, die die Abhängigkeit verwenden",
            "Analysieren Sie API-Änderungen zwischen Versionen",
            "Schätzen Sie den erforderlichen Migrationsaufwand",
            "Schlagen Sie Testfokusbereiche vor",
            "Sicherheitsanalyse",
            "Bietet sicherheitsorientierte Bewertung:",
            "Identifizieren Sie bekannte Schwachstellen in der aktuellen Version",
            "Prüfen Sie auf Sicherheitsfixes in der neuen Version",
            "Bewerten Sie sicherheitsrelevante Paket-Updates",
            "Empfehlen Sie Sicherheits-Best-Practices",
            "Kompatibilitätsanalyse",
            "Prüfen Sie auf potenzielle Kompatibilitätsprobleme:",
            "Erkennen Sie Breaking API-Änderungen",
            "Identifizieren Sie Peer-Dependency-Konflikte",
            "Prüfen Sie Node.js-Versionskompatibilität",
            "Validieren Sie TypeScript-Kompatibilität",
            "Empfehlungen",
            "Generieren Sie umsetzbare Empfehlungen:",
            "Schlagen Sie optimale Update-Reihenfolge vor",
            "Empfehlen Sie Versionsbereiche",
            "Identifizieren Sie Pakete, die zusammen aktualisiert werden sollten",
            "Bieten Sie Rollback-Strategien"
          ]
        ],
        [
          "Fallback-Verhalten",
          "fallback-verhalten",
          [
            "Wenn KI-Anbieter nicht verfügbar sind, verwendet PCU eine integrierte regelbasierte Analyse-Engine:",
            "Regelbasierte Analysefunktionen",
            "Versionssprung-Bewertung: Bewerten Sie das Risiko basierend auf Semver-Änderungen",
            "Bekannte Breaking-Muster: Erkennen Sie Breaking Changes für beliebte Pakete (React, TypeScript, ESLint, etc.)",
            "Sicherheitssensible Pakete: Markieren Sie sicherheitsrelevante Pakete zur sorgfältigen Überprüfung",
            "Aufwandsschätzung: Bieten Sie Migrationsaufwandsschätzungen",
            "Risikostufen",
            "| Stufe    | Beschreibung                                             |\n| -------- | -------------------------------------------------------- |\n| Niedrig  | Patch-Updates, typischerweise sicher anzuwenden          |\n| Mittel   | Minor-Updates oder große Minor-Versionssprünge           |\n| Hoch     | Major-Versionsupdate mit Breaking Changes                |\n| Kritisch | Mehrere Major-Versionssprünge oder Pre-Release-Versionen |"
          ]
        ],
        [
          "Konfiguration",
          "konfiguration",
          [
            "Umgebungsvariablen",
            "Benutzerdefinierter Pfad zur Gemini CLI-Executable",
            "Benutzerdefinierter Pfad zur Claude CLI-Executable",
            "Benutzerdefinierter Pfad zur Codex CLI-Executable",
            "Benutzerdefinierter Pfad zur Cursor CLI-Executable",
            "Erkennungsmethoden",
            "PCU verwendet mehrere Strategien zur Erkennung von KI-Anbietern:",
            "Umgebungsvariablen: Prüfen benutzerdefinierter Pfadvariablen",
            "PATH-Suche: Verwenden des which-Befehls zum Finden von Executables",
            "Bekannte Pfade: Prüfen gängiger Installationsorte",
            "Anwendungspfade: Prüfen auf GUI-Anwendungen (z.B. Cursor.app)"
          ]
        ],
        [
          "Verwendungsbeispiele",
          "verwendungsbeispiele",
          [
            "Sicherer Update-Workflow",
            "CI/CD-Integration",
            "Batch-Analyse"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "Wann KI-Analyse verwenden",
            "Major-Versionsupdate: Verwenden Sie immer KI-Analyse für Major-Versionsupgrades",
            "Sicherheitssensible Pakete: Verwenden Sie für Auth-, Crypto- und Session-Pakete",
            "Große Codebasen: KI hilft, betroffene Bereiche in Monorepos zu identifizieren",
            "Breaking-Change-Erkennung: KI liefert detaillierte Breaking-Change-Erklärungen",
            "Leistungsüberlegungen",
            "KI-Analyse fügt Verarbeitungszeit im Vergleich zu Standard-Updates hinzu",
            "Verwenden Sie --dry-run, um KI-Empfehlungen ohne Anwendung von Änderungen anzuzeigen",
            "Erwägen Sie regelbasierten Fallback für schnellere CI/CD-Pipelines, wenn KI nicht kritisch ist",
            "Kombination mit anderen Funktionen"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "Best Practices",
          null,
          [
            "Lernen Sie, wie Sie PCU effektiv in Teamumgebungen, Enterprise-Workflows und Produktionssystemen einsetzen. "
          ]
        ],
        [
          "Team-Zusammenarbeit",
          "team-zusammenarbeit",
          [
            "Gemeinsame Konfiguration",
            "Halten Sie Ihre PCU-Konfiguration teamweit konsistent, indem Sie Ihre .pcurc.json unter Versionskontrolle stellen:",
            "Code-Review-Richtlinien",
            "Checkliste vor dem Review:",
            "Führen Sie pcu check --dry-run aus, um Änderungen vorab zu betrachten",
            "Überprüfen Sie, dass keine Breaking Changes bei Major-Version-Updates vorliegen",
            "Testen Sie kritische Funktionalität nach Dependency-Updates",
            "Überprüfen Sie CHANGELOG-Dateien für aktualisierte Pakete",
            "Review-Prozess:",
            "Sicherheit zuerst: Überprüfen Sie sicherheitsrelevante Dependency-Updates immer sofort",
            "Verwandte Updates bündeln: Gruppieren Sie verwandte Pakete (z.B. React-Ökosystem) in einzelnen PRs",
            "Gründe dokumentieren: Begründen Sie Version-Pinning oder Ausschlüsse",
            "Test-Abdeckung: Stellen Sie angemessene Tests vor dem Mergen von Dependency-Updates sicher",
            "Kommunikationsstandards",
            "Verwenden Sie klare Commit-Nachrichten beim Aktualisieren von Dependencies:"
          ]
        ],
        [
          "Enterprise-Nutzung",
          "enterprise-nutzung",
          [
            "Governance und Compliance",
            "Dependency-Genehmigungsprozess:",
            "Sicherheitsscan: Alle Updates müssen Sicherheitsaudits bestehen",
            "Lizenz-Compliance: Lizenzkompatibilität mit internen Richtlinien überprüfen",
            "Stabilitätsanforderungen: LTS-Versionen in Produktionsumgebungen bevorzugen",
            "Change Management: Etablierte Change-Approval-Prozesse befolgen",
            "Konfiguration für Enterprise:",
            "Private Registry-Integration",
            "PCU für Unternehmensumgebungen mit privaten Registries konfigurieren:",
            "Umgebungsvariablen:",
            "Audit-Trail und Reporting",
            "Umfassende Aufzeichnungen von Dependency-Änderungen führen:"
          ]
        ],
        [
          "Release-Workflows",
          "release-workflows",
          [
            "Semantic Versioning-Integration",
            "Dependency-Updates mit Ihrem Release-Zyklus abstimmen:",
            "Pre-Release-Phase:",
            "Release-Vorbereitung:",
            "Nach dem Release:",
            "Staging-Umgebung-Tests",
            "Pre-Production-Validierung:"
          ]
        ],
        [
          "Sicherheits-Best Practices",
          "sicherheits-best-practices",
          [
            "Schwachstellen-Management",
            "Sofortige Reaktion PCU:",
            "Critical/High Severity: Update innerhalb von 24 Stunden",
            "Moderate Severity: Update innerhalb von 1 Woche",
            "Low Severity: In nächsten regulären Update-Zyklus einbeziehen",
            "Dependency-Validierung",
            "Sicherheitskonfiguration:",
            "Manuelle Sicherheitsüberprüfungen:",
            "Alle neuen Dependencies vor erster Nutzung überprüfen",
            "Paket-Maintainer und Download-Zahlen auditieren",
            "Paket-Authentizität und Signaturen verifizieren",
            "Bekannte Sicherheitsprobleme in Dependency-Ketten prüfen",
            "Zugriffskontrolle",
            "Token-Management:"
          ]
        ],
        [
          "Performance-Optimierung",
          "performance-optimierung",
          [
            "Caching-Strategien",
            "Lokale Entwicklung:",
            "CI/CD-Optimierung:",
            "Große Monorepo-Behandlung",
            "Konfiguration für 100+ Pakete:",
            "Selektive Verarbeitung:",
            "Netzwerk-Optimierung",
            "Registry-Konfiguration:"
          ]
        ],
        [
          "Fehlerbehandlung und Wiederherstellung",
          "fehlerbehandlung-und-wiederherstellung",
          [
            "Häufige Fehlerbehebung",
            "Netzwerkprobleme:",
            "Speicherprobleme:",
            "Backup und Wiederherstellung",
            "Backups vor Major-Updates erstellen:",
            "Version-Rollback-Strategie:",
            "Überwachung und Alarmierung",
            "CI/CD-Integration:"
          ]
        ],
        [
          "Integrationsmuster",
          "integrationsmuster",
          [
            "IDE- und Editor-Integration",
            "VS Code-Konfiguration:",
            "Automatisierungsscripts",
            "Package.json Scripts:",
            "Git Hooks-Integration:"
          ]
        ],
        [
          "Schnellreferenz Checkliste",
          "schnellreferenz-checkliste",
          [
            "Täglicher Workflow",
            "Auf Sicherheitsupdates prüfen: pcu security",
            "Veraltete Dependencies überprüfen: pcu check --limit 10",
            "Patch-Versionen aktualisieren: pcu update --target patch",
            "Wöchentlicher Workflow",
            "Umfassende Dependency-Prüfung: pcu check",
            "Minor-Versionen aktualisieren: pcu update --target minor --interactive",
            "Ausschlussregeln überprüfen und aktualisieren",
            "Dependency-Reports für Team-Review generieren",
            "Monatlicher Workflow",
            "Major-Version-Updates überprüfen: pcu check --target latest",
            "Entwicklungs-Dependencies aktualisieren: pcu update --dev",
            "Dependency-Lizenzen und Compliance auditieren",
            "PCU-Konfiguration überprüfen und optimieren",
            "Ungenutzte Dependencies aufräumen",
            "Vor Releases",
            "Vollständiges Dependency-Audit durchführen: pcu security --comprehensive",
            "Backup erstellen: pcu update --create-backup",
            "In Staging-Umgebung testen",
            "Release-Notes mit Dependency-Änderungen generieren"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "CI/CD-Integration",
          null,
          [
            "Integrieren Sie PCU in Ihre Continuous Integration und Deployment-Pipelines. PCU kann nahtlos mit bestehenden CI/CD-Workflows integriert werden und unterstützt GitHub Actions, GitLab CI, Jenkins, Azure DevOps und andere Plattformen. "
          ]
        ],
        [
          "GitHub Actions-Integration",
          "git-hub-actions-integration",
          [
            "Basis Dependency-Check-Workflow"
          ]
        ],
        [
          "GitLab CI-Integration",
          "git-lab-ci-integration",
          [
            "GitLab CI-Pipeline für PCU Dependency-Management:"
          ]
        ],
        [
          "Jenkins Pipeline-Integration",
          "jenkins-pipeline-integration",
          [
            "Enterprise-taugliche Jenkins-Pipeline für Dependency-Management:"
          ]
        ],
        [
          "Azure DevOps Pipeline",
          "azure-dev-ops-pipeline",
          [
            "Azure DevOps-Pipeline für PCU-Integration:"
          ]
        ],
        [
          "Allgemeine CI/CD Best Practices",
          "allgemeine-ci-cd-best-practices",
          [
            "Umgebungsvariablen-Konfiguration",
            "Konfigurieren Sie diese Umgebungsvariablen auf allen CI/CD-Plattformen, um PCU-Verhalten zu optimieren:",
            "Sicherheitsüberlegungen",
            "Access Token-Management",
            "Sichere Verwaltung von Access Tokens in CI/CD-Umgebungen sicherstellen:",
            "Branch-Protection-Strategie",
            "Branch-Protection konfigurieren, um direkte Pushes zum Main-Branch zu verhindern:",
            "Pull Request-Reviews erforderlich",
            "Status-Checks müssen bestehen",
            "Pushes zu geschützten Branches einschränken",
            "Signierte Commits erforderlich",
            "Fehlerbehebung",
            "Häufige CI/CD-Probleme",
            "Berechtigungsfehler",
            "Cache-Probleme",
            "Netzwerk-Timeouts",
            "Überwachung und Berichterstattung",
            "Dashboards erstellen",
            "Verwenden Sie native CI/CD-Plattform-Features zum Erstellen von Dependency-Management-Dashboards:",
            "GitHub Actions: Action-Insights und Dependency-Graphs verwenden",
            "GitLab CI: Security Dashboard und Dependency-Scanning nutzen",
            "Jenkins: HTML Publisher-Plugin konfigurieren",
            "Azure DevOps: Dashboards und Analytics verwenden",
            "Benachrichtigungskonfiguration",
            "Angemessene Benachrichtigungen einrichten, um Teams informiert zu halten:"
          ]
        ],
        [
          "Docker-Integration",
          "docker-integration",
          [
            "Containerisierte PCU-Workflows",
            "Diese CI/CD-Integrationsbeispiele bieten umfassende automatisierte Dependency-Management-Lösungen und stellen sicher, dass Ihre Projekte aktuell und sicher bleiben."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "Befehlsreferenz",
          null,
          [
            "Vollständige Referenz für alle PCU-Befehle und -Optionen. Erfahren Sie mehr über jeden Befehl, jedes Flag und jede verfügbare Konfigurationsoption. "
          ]
        ],
        [
          "Befehlsübersicht",
          "befehlsuebersicht",
          [
            "PCU bietet mehrere Hauptbefehle mit sowohl vollständigen Namen als auch praktischen Abkürzungen:",
            "| Vollständiger Befehl | Shortcuts & Aliase                        | Beschreibung                                        |\n| -------------------- | ----------------------------------------- | --------------------------------------------------- |\n| pcu init           | pcu i                                   | PNPM-Workspace und PCU-Konfiguration initialisieren |\n| pcu check          | pcu chk, pcu -c, pcu --check        | Nach veralteten Katalog-Dependencies suchen         |\n| pcu update         | pcu u, pcu -u, pcu --update         | Katalog-Dependencies aktualisieren                  |\n| pcu analyze        | pcu a, pcu -a, pcu --analyze        | Auswirkungen von Dependency-Updates analysieren     |\n| pcu ai             | -                                         | AI-Provider-Verwaltung und Analyse-Tests            |\n| pcu workspace      | pcu w, pcu -s, pcu --workspace-info | Workspace-Informationen und Validierung anzeigen    |\n| pcu theme          | pcu t, pcu -t, pcu --theme          | Farbthemen und UI-Einstellungen konfigurieren       |\n| pcu security       | pcu sec                                 | Sicherheitslücken-Scanning und -Fixes               |\n| pcu rollback       | -                                         | Katalog-Updates auf vorherigen Zustand zurücksetzen |\n| pcu help           | pcu h, pcu -h                         | Hilfeinformationen anzeigen                         |",
            "Spezielle Shortcuts",
            "| Shortcut               | Äquivalenter Befehl        | Beschreibung                            |\n| ---------------------- | -------------------------- | --------------------------------------- |\n| pcu -i               | pcu update --interactive | Interaktiver Update-Modus               |\n| pcu --security-audit | pcu security             | Sicherheitsscan ausführen               |\n| pcu --security-fix   | pcu security --fix-vulns | Sicherheitsscan mit automatischen Fixes |"
          ]
        ],
        [
          "Hybrid-Modus",
          "hybrid-modus",
          [
            "PCU bietet den Hybrid-Modus - wenn Sie einen Befehl ohne Flags ausführen, wechselt er automatisch in den interaktiven Modus und führt Sie durch die Optionen.",
            "Unterstützte Befehle",
            "Der Hybrid-Modus ist für folgende Befehle verfügbar:",
            "| Befehl       | Interaktive Optionen                               |\n| ------------ | -------------------------------------------------- |\n| check      | Format, Ziel, Prerelease, Include/Exclude-Muster   |\n| update     | Katalog, Format, Ziel, Backup, Dry-Run             |\n| analyze    | Format                                             |\n| workspace  | Validierung, Statistiken, Format                   |\n| theme      | Theme-Auswahl, Fortschrittsbalken-Stil             |\n| security   | Format, Schweregrad, Auto-Fix                      |\n| init       | Vorlage, Framework-Optionen, Interaktiver Assistent |\n| ai         | Provider-Status, Test, Cache-Operationen           |\n| rollback   | Backup-Auswahl, Bestätigung                        |",
            "Vorteile",
            "Flexibilität: Nahtloser Wechsel zwischen Automatisierung für Skripte und interaktiver Führung für Erkundung",
            "Auffindbarkeit: Erkunden Sie verfügbare Funktionen durch interaktive Prompts ohne alle Optionen auswendig zu lernen",
            "Effizienz: Erfahrene Benutzer verwenden Flags direkt, während neue Benutzer eine geführte Erfahrung erhalten"
          ]
        ],
        [
          "pcu init - Workspace initialisieren",
          "pcu-init-workspace-initialisieren",
          [
            "Eine vollständige PNPM-Workspace-Umgebung mit PCU-Konfiguration initialisieren.",
            "Optionen",
            "Bestehende Konfigurationsdatei ohne Bestätigung überschreiben",
            "Umfassende Konfiguration mit allen verfügbaren Optionen generieren",
            "Interaktiven Konfigurationsassistenten mit geführtem Setup starten",
            "Konfigurationsvorlage: minimal, standard, full, monorepo, enterprise",
            "PNPM-Workspace-Struktur erstellen, falls fehlend",
            "PNPM-Workspace-Struktur nicht erstellen",
            "Verzeichnisname für Workspace-Pakete",
            "Häufige Paketregeln in Konfiguration einbeziehen",
            "TypeScript-spezifische Paketregeln und Einstellungen hinzufügen",
            "React-Ökosystem-Paketregeln hinzufügen",
            "Vue-Ökosystem-Paketregeln hinzufügen",
            "Ausgabeformat: table, json, yaml, minimal",
            "Workspace-Verzeichnis (Standard: aktuelles Verzeichnis)",
            "Detaillierte Informationen und Fortschritt anzeigen",
            "Konfigurationsvorlagen",
            "PCU bietet vorkonfigurierte Vorlagen für häufige Projekttypen:",
            "Vorlagentypen",
            "minimal - Basiskonfiguration nur mit wesentlichen Einstellungen",
            "standard - Ausgewogene Konfiguration für die meisten Projekte geeignet",
            "full - Umfassende Konfiguration mit allen verfügbaren Optionen",
            "monorepo - Optimiert für große Monorepos mit erweiterten Features",
            "enterprise - Enterprise-tauglich mit Sicherheits- und Governance-Features",
            "Interaktiver Konfigurationsassistent",
            "Der interaktive Modus (--interactive) bietet ein geführtes Setup-Erlebnis:",
            "Assistenten-Features",
            "Projekterkennung: Erkennt automatisch Projekttyp (React, Vue, TypeScript)",
            "Workspace-Struktur: Entdeckt vorhandene Pakete und schlägt optimale Konfiguration vor",
            "Paketregeln-Setup: Interaktive Auswahl von Paketregeln und Update-Strategien",
            "Registry-Konfiguration: Setup für benutzerdefinierte NPM-Registries und Authentifizierung",
            "Performance-Tuning: Optimiert Einstellungen basierend auf Projektgröße und Anforderungen",
            "Theme-Auswahl: Wählen Sie Farbthemen und Fortschrittsbalken-Stile",
            "Validierungs-Setup: Quality Gates und Sicherheitsprüfungen konfigurieren",
            "Assistenten-Ablauf",
            "Projektanalyse: Scannt vorhandene Dateien um Projektstruktur zu verstehen",
            "Vorlagen-Auswahl: Empfiehlt geeignete Vorlagen basierend auf Analyse",
            "Paketregeln: Interaktives Setup paketspezifischer Update-Strategien",
            "Erweiterte Einstellungen: Optionale Konfiguration von Caching, Performance und UI-Einstellungen",
            "Validierung: Vorab-Checks und Konfigurationsvalidierung",
            "Dateierstellung: Erstellt alle notwendigen Dateien mit Bestätigung",
            "Erstellte Dateien und Verzeichnisse",
            "Kern-Dateien",
            "Hauptkonfigurationsdatei mit allen PCU-Einstellungen",
            "Workspace-Root-package.json (erstellt falls fehlend)",
            "PNPM-Workspace-Konfiguration (erstellt falls fehlend)",
            "Verzeichnisstruktur",
            "Standard-Verzeichnis für Workspace-Pakete (anpassbar)",
            "Erstellt für Monorepo-Vorlage - Anwendungspakete",
            "Erstellt für Monorepo-Vorlage - Entwicklungstools",
            "Erstellt für Enterprise-Vorlage - Dokumentation",
            "Erweiterte Initialisierung",
            "Framework-spezifisches Setup",
            "Nutzungsbeispiele",
            "Schnellstart",
            "Initialisiert mit Standard-Vorlage unter Verwendung automatischer Projekterkennung.",
            "Interaktives Setup",
            "Startet den vollständigen Konfigurationsassistenten mit geführtem Setup.",
            "Monorepo-Initialisierung",
            "Erstellt Enterprise-taugliches Monorepo mit TypeScript-Unterstützung und detaillierter Ausgabe."
          ]
        ],
        [
          "pcu check - Nach Updates suchen",
          "pcu-check-nach-updates-suchen",
          [
            "Nach veralteten Dependencies in Ihren pnpm-Workspace-Katalogen suchen.",
            "Optionen",
            "Nur spezifischen Katalog prüfen",
            "Ausgabeformat: table, json, yaml, minimal",
            "Update-Ziel: latest, greatest, minor, patch, newest",
            "Prerelease-Versionen einbeziehen",
            "Pakete mit übereinstimmendem Muster einbeziehen",
            "Pakete mit übereinstimmendem Muster ausschließen",
            "Ausgabeformate",
            "table: Reichhaltiges Tabellenformat mit Farben und Details",
            "minimal: Einfacher npm-check-updates-Stil (Paket → Version)",
            "json: JSON-Ausgabe für programmatische Nutzung",
            "yaml: YAML-Ausgabe für Konfigurationsdateien"
          ]
        ],
        [
          "pcu update - Dependencies aktualisieren",
          "pcu-update-dependencies-aktualisieren",
          [
            "Katalog-Dependencies auf neuere Versionen aktualisieren.",
            "Optionen",
            "Interaktiver Modus zur Auswahl von Updates",
            "Änderungen vorab betrachten ohne Dateien zu schreiben",
            "Update-Ziel: latest, greatest, minor, patch, newest",
            "Nur spezifischen Katalog aktualisieren",
            "Updates auch bei Risiken erzwingen",
            "Backup-Dateien vor Aktualisierung erstellen",
            "Pakete mit übereinstimmendem Muster einbeziehen",
            "Pakete mit übereinstimmendem Muster ausschließen",
            "Prerelease-Versionen in Updates einbeziehen",
            "Interaktive Features",
            "Der interaktive Modus (--interactive oder -i) bietet erweiterte Paketauswahl-Funktionen:",
            "Paketauswahl-Interface",
            "Multi-Select mit Checkboxen für individuelle Paket-Updates",
            "Suchfunktionalität um Pakete nach Name oder Beschreibung zu filtern",
            "Batch-Operationen um mehrere Pakete auszuwählen/abzuwählen",
            "Update-Strategieauswahl für jedes Paket (latest, greatest, minor, patch)",
            "Intelligente Konflikterkennung",
            "Peer Dependency-Erkennung mit Lösungsvorschlägen",
            "Breaking Change-Warnungen basierend auf Semantic Versioning-Analyse",
            "Impact-Analyse zeigt betroffene Workspace-Pakete",
            "Rollback-Funktionen falls Updates Probleme verursachen",
            "Nutzungsbeispiele",
            "Sicheres interaktives Update",
            "Aktualisiert Dependencies interaktiv mit automatischen Backups, beschränkt auf Minor-Version-Erhöhungen.",
            "Produktions-sicheres Update",
            "Zeigt was in Produktions-Dependencies aktualisiert werden würde, erfordert Bestätigung für Major-Updates."
          ]
        ],
        [
          "pcu analyze - Impact-Analyse",
          "pcu-analyze-impact-analyse",
          [
            "Auswirkungen der Aktualisierung einer spezifischen Dependency analysieren um potenzielle Breaking Changes und betroffene Pakete zu verstehen.",
            "Argumente",
            "Katalogname (z.B. 'default', 'react17')",
            "Paketname (z.B. 'react', '@types/node')",
            "Neue Version (optional, Standard ist latest)",
            "Optionen",
            "Ausgabeformat: table, json, yaml, minimal",
            "Analyse-Informationen",
            "Der analyze-Befehl bietet:",
            "Betroffene Dependencies durch das Update",
            "Erkannte Breaking Changes zwischen Versionen",
            "Workspace-Pakete die diese Dependency verwenden",
            "Update-Empfehlungen und Risikobewertung",
            "Versionskompatibilitäts-Analyse"
          ]
        ],
        [
          "pcu workspace - Workspace-Informationen",
          "pcu-workspace-workspace-informationen",
          [
            "Workspace-Informationen und Validierung mit umfassender Workspace-Analyse anzeigen.",
            "Optionen",
            "Workspace-Konfiguration und -Struktur validieren",
            "Detaillierte Workspace-Statistiken anzeigen",
            "Ausgabeformat: table, json, yaml, minimal"
          ]
        ],
        [
          "pcu security - Sicherheitslücken-Scanning",
          "pcu-security-sicherheitsluecken-scanning",
          [
            "Umfassendes Sicherheitslücken-Scanning mit npm audit und optionaler Snyk-Integration, mit automatisierten Fix-Funktionen.",
            "Optionen",
            "npm audit-Scan durchführen (standardmäßig aktiviert)",
            "Schwachstellen automatisch mit npm audit fix beheben",
            "Nach Schweregrad filtern: low, moderate, high, critical",
            "Entwicklungs-Dependencies in Schwachstellen-Scan einbeziehen",
            "Snyk-Sicherheitsscan einbeziehen (erfordert snyk CLI-Installation)",
            "Sicherheitsfixes automatisch ohne Bestätigung anwenden",
            "Ausgabeformat: table, json, yaml, minimal",
            "Detaillierte Schwachstelleninformationen und Lösungsschritte anzeigen"
          ]
        ],
        [
          "pcu theme - Theme-Konfiguration",
          "pcu-theme-theme-konfiguration",
          [
            "Farbthemen und UI-Erscheinungsbild konfigurieren.",
            "Optionen",
            "Farbthema setzen: default, modern, minimal, neon",
            "Alle verfügbaren Themes mit Vorschaumustern auflisten",
            "Interaktiven Theme-Konfigurationsassistenten mit Live-Vorschau starten",
            "Theme-Vorschau ohne Änderungen anzeigen",
            "Fortschrittsbalken-Stil setzen: default, gradient, fancy, minimal, rainbow, neon",
            "Alle Theme-Einstellungen auf Standardwerte zurücksetzen",
            "Verfügbare Themes",
            "Kern-Themes",
            "default - Ausgewogene Farben für allgemeine Terminal-Nutzung optimiert",
            "modern - Lebendige Farben perfekt für Entwicklungsumgebungen",
            "minimal - Sauberes einfarbiges Design für Produktionsumgebungen",
            "neon - Hoher Kontrast für Präsentationen und Demos"
          ]
        ],
        [
          "pcu ai - AI-Provider-Verwaltung",
          "pcu-ai-ai-provider-verwaltung",
          [
            "AI-Provider-Status prüfen und AI-Analyse-Cache verwalten.",
            "Optionen",
            "Status aller AI-Provider anzeigen (Standard)",
            "AI-Analyse mit einer Beispielanfrage testen",
            "AI-Analyse-Cache-Statistiken anzeigen",
            "AI-Analyse-Cache löschen",
            "Unterstützte AI-Provider",
            "PCU erkennt und verwendet automatisch verfügbare AI-CLI-Tools:",
            "| Provider   | CLI-Tool         | Erkennungsmethode              |\n| ---------- | ---------------- | ------------------------------ |\n| Claude     | claude         | PATH-Suche und Versionsausgabe |\n| Gemini     | gemini         | PATH-Suche und Versionsausgabe |\n| OpenAI     | codex          | PATH-Suche und Versionsausgabe |",
            "Verwendungsbeispiele",
            "Provider-Status anzeigen",
            "Zeigt alle erkannten AI-Provider mit Verfügbarkeitsstatus, Pfad und Version.",
            "AI-Analyse testen",
            "Führt einen Testlauf mit einem Beispiel-Abhängigkeitsupdate durch, um zu überprüfen, ob die AI-Analyse funktioniert."
          ]
        ],
        [
          "pcu rollback - Backup-Wiederherstellung",
          "pcu-rollback-backup-wiederherstellung",
          [
            "Katalog-Updates mithilfe von Backup-Dateien auf einen vorherigen Zustand zurücksetzen.",
            "Optionen",
            "Alle verfügbaren Backup-Dateien mit Zeitstempeln auflisten",
            "Automatisch auf das neueste Backup zurücksetzen",
            "Interaktive Auswahl des wiederherzustellenden Backups",
            "Alle Backup-Dateien löschen (erfordert Bestätigung)",
            "Workspace-Verzeichnispfad (Standard: aktuelles Verzeichnis)",
            "Detaillierte Informationen während des Rollbacks anzeigen",
            "Backup-System",
            "PCU erstellt automatisch Backup-Dateien, wenn Sie das Flag --create-backup mit dem Update-Befehl verwenden:",
            "Backup-Dateien werden mit Zeitstempeln gespeichert und enthalten den ursprünglichen pnpm-workspace.yaml-Zustand vor Updates.",
            "Verwendungsbeispiele",
            "Verfügbare Backups auflisten",
            "Zeigt alle Backup-Dateien mit Erstellungszeitstempeln und Dateigrößen.",
            "Auf neuestes Backup zurücksetzen",
            "Stellt automatisch das neueste Backup ohne Nachfrage wieder her.",
            "Interaktive Backup-Auswahl",
            "Öffnet eine interaktive Eingabeaufforderung zur Auswahl des wiederherzustellenden Backups."
          ]
        ],
        [
          "Interaktive Features & Fortschrittsverfolgung",
          "interaktive-features-and-fortschrittsverfolgung",
          [
            "PCU bietet erweiterte interaktive Funktionen und ausgeklügelte Fortschrittsverfolgung für alle Befehle.",
            "Interaktive Befehlsschnittstelle",
            "Paketauswahl-System",
            "Smart Multi-Select: Spezifische Pakete mit visuellen Checkboxen und Tastaturkürzeln auswählen",
            "Suchen & Filtern: Echtzeitfilterung von Paketen mit Mustervergleich und Fuzzy-Search",
            "Batch-Operationen: Ganze Gruppen mit kategorie-basierter Auswahl auswählen/abwählen",
            "Auswirkungsvorschau: Potenzielle Änderungen vor Anwendung von Updates anzeigen",
            "Konfigurationsassistent",
            "Der interaktive Konfigurationsassistent (pcu init --interactive) bietet:",
            "Workspace-Erkennung: Automatische Erkennung bestehender PNPM-Workspaces",
            "Vorlagenauswahl: Wahl zwischen minimaler und vollständiger Konfigurationsvorlage",
            "Paketregeln-Setup: Regeln für verschiedene Paketkategorien konfigurieren (React, Vue, TypeScript)",
            "Registry-Konfiguration: Benutzerdefinierte NPM-Registries und Authentifizierung einrichten",
            "Validierungs-Einstellungen: Qualitätskontrollpunkte und Sicherheitschecks konfigurieren",
            "Verzeichnis- & Dateibrowser",
            "Workspace-Navigation: Eingebauter Dateisystem-Browser für Workspace-Auswahl",
            "Pfadvalidierung: Echtzeitvalidierung von Workspace-Pfaden und -Strukturen",
            "Vorschaumodus: Workspace-Inhalte vor Bestätigung der Auswahl anzeigen",
            "Erweiterte Fortschrittsverfolgung",
            "Multi-Style Fortschrittsbalken",
            "PCU bietet sechs verschiedene Fortschrittsbalken-Stile, konfigurierbar pro Befehl oder global:",
            "Fortschrittsfunktionen",
            "Mehrstufige Verfolgung: Zeigt Fortschritt über verschiedene Phasen (scan → analyze → update)",
            "Parallele Operationsstatus: Individuelle Fortschrittsbalken für gleichzeitige Operationen",
            "Leistungsmetriken: Echtzeit-Geschwindigkeitsindikatoren, ETA-Berechnungen, verstrichene Zeit",
            "Speichersichere Anzeige: Stabile mehrzeilige Ausgabe, das Terminal-Flackern reduziert",
            "Stapelverarbeitungsstatus",
            "Warteschlangenmanagement: Zeigt anstehende, aktive und abgeschlossene Paket-Operationen",
            "Konfliktauflösung: Interaktive Behandlung von Peer-Dependency-Konflikten",
            "Fehlerwiederherstellung: Skip/Retry-Optionen für fehlgeschlagene Operationen mit detailliertem Fehlerkontext",
            "Rollback-Fähigkeiten: Änderungen rückgängig machen falls Probleme während Updates erkannt werden",
            "Fehlerbehandlung & Wiederherstellung",
            "Intelligente Fehlererkennung",
            "Validierungsfehler: Vor-Flug-Checks mit hilfreichen Vorschlägen für häufige Fehler",
            "Netzwerkprobleme: Automatische Wiederholung mit exponentialem Backoff für Registry-Ausfälle",
            "Dependency-Konflikte: Detaillierte Konfliktanalyse mit Auflösungsempfehlungen",
            "Berechtigungsprobleme: Klare Anleitung für Dateisystem-Berechtigungsprobleme",
            "Interaktive Wiederherstellungsoptionen",
            "Überspringen & Fortfahren: Problematische Pakete überspringen und mit verbleibenden Updates fortfahren",
            "Wiederholen mit Optionen: Fehlgeschlagene Operationen mit verschiedenen Parametern wiederholen",
            "Rollback-Änderungen: Partielle Änderungen rückgängig machen bei Problemen während Batch-Operationen",
            "Fehlerbericht exportieren: Detaillierte Fehlerberichte für Fehlerbehebung generieren",
            "Workspace-Integration",
            "Auto-Discovery-Features",
            "PNPM Workspace-Erkennung: Findet und validiert automatisch Workspace-Konfigurationen",
            "Katalog-Discovery: Erkennt bestehende Kataloge und ihre Paket-Mappings",
            "Paket-Analyse: Analysiert Workspace-Struktur und Dependency-Beziehungen",
            "Konfigurationsvererbung: Wendet workspace-spezifische Einstellungen automatisch an",
            "Validierung & Health-Checks",
            "Strukturvalidierung: Stellt sicher, dass Workspace PNPM Best Practices befolgt",
            "Dependency-Konsistenz: Überprüft auf Version-Mismatches zwischen Paketen",
            "Konfigurationsintegrität: Validiert PCU-Konfiguration gegen Workspace-Struktur",
            "Health-Metriken: Bietet umfassende Workspace-Health-Bewertung",
            "Nutzungsbeispiele",
            "Interaktives Update mit erweiterten Features",
            "Startet interaktives Update mit schicken Fortschrittsbalken und optimierter Batch-Verarbeitung.",
            "Konfiguration mit Vorschau",
            "Führt Konfigurationsassistenten mit Vorschaumodus und detailliertem Logging aus.",
            "Fehlerwiederherstellungs-Workflow",
            "Updates mit interaktiver Fehlerwiederherstellung, automatischen Backups und Major-Version-Bestätigung."
          ]
        ],
        [
          "Globale Optionen",
          "globale-optionen",
          [
            "Diese Optionen funktionieren mit allen Befehlen und können über Umgebungsvariablen gesetzt werden:",
            "Workspace-Verzeichnispfad",
            "Ausführliches Logging mit detaillierter Ausgabe aktivieren",
            "Farbige Ausgabe für CI/CD-Umgebungen deaktivieren",
            "NPM-Registry-URL überschreiben",
            "Request-Timeout in Millisekunden (Standard: 30000)",
            "Pfad zu benutzerdefinierter Konfigurationsdatei",
            "Versionsnummer ausgeben und nach Updates suchen",
            "Hilfe für Befehl anzeigen",
            "Umgebungsvariablen-Nutzung",
            "Alle globalen Optionen und befehlsspezifischen Einstellungen können über Umgebungsvariablen konfiguriert werden:",
            "Kern-Umgebungsvariablen",
            "Standard-Workspace-Verzeichnispfad",
            "Ausführliches Logging global aktivieren",
            "Farbige Ausgabe deaktivieren (nützlich für CI/CD)",
            "Standard-NPM-Registry-URL",
            "Request-Timeout in Millisekunden",
            "Pfad zu benutzerdefinierter Konfigurationsdatei",
            "Konfigurationspriorität",
            "Einstellungen werden in dieser Reihenfolge angewendet (spätere überschreiben frühere):",
            "Eingebaute Standardwerte",
            "Globale Konfiguration (~/.pcurc.json)",
            "Projektkonfiguration (.pcurc.json)",
            "Umgebungsvariablen (PCU_*)",
            "Kommandozeilen-Flags (höchste Priorität)"
          ]
        ],
        [
          "Auto-Update-System",
          "auto-update-system",
          [
            "PCU beinhaltet einen ausgeklügelten Auto-Update-Mechanismus, der das CLI-Tool mit den neuesten Features und Sicherheits-Patches aktuell hält.",
            "Automatische Update-Überprüfung",
            "Standardmäßig prüft PCU nach Updates wenn Sie einen Befehl ausführen:",
            "Update-Verhalten",
            "CI/CD-Umgebungserkennung",
            "PCU erkennt automatisch CI/CD-Umgebungen und überspringt Update-Checks um automatisierte Pipelines nicht zu stören:",
            "GitHub Actions: Erkannt über GITHUB_ACTIONS Umgebungsvariable",
            "CircleCI: Erkannt über CIRCLECI Umgebungsvariable",
            "Jenkins: Erkannt über JENKINS_URL Umgebungsvariable",
            "GitLab CI: Erkannt über GITLAB_CI Umgebungsvariable",
            "Azure DevOps: Erkannt über TF_BUILD Umgebungsvariable",
            "Generische CI: Erkannt über CI Umgebungsvariable",
            "Update-Installation",
            "PCU unterstützt mehrere Paketmanager mit automatischem Fallback:",
            "Konfigurationsoptionen",
            "Umgebungsvariablen",
            "Version-Checks und Update-Benachrichtigungen komplett deaktivieren",
            "Stunden zwischen Update-Checks (Standard: 24)",
            "Updates automatisch ohne Nachfrage installieren (mit Vorsicht verwenden)",
            "Timeout für Update-Check-Requests in Millisekunden (Standard: 5000)",
            "Konfigurationsdatei-Einstellungen",
            "Update-Benachrichtigungen",
            "Standard-Benachrichtigung",
            "Sicherheitsupdate-Benachrichtigung",
            "Prerelease-Benachrichtigung",
            "Manuelle Update-Befehle",
            "Fehlerbehebung bei Updates",
            "Update-Check-Fehler",
            "Cache-Bereinigung",
            "Berechtigungsprobleme",
            "Cache-Management-System",
            "PCU beinhaltet ein umfassendes Caching-System zur Performance-Optimierung und Reduzierung von Netzwerk-Requests.",
            "Cache-Typen",
            "Registry-Cache",
            "Speichert NPM-Paket-Metadaten und Versionsinformationen:",
            "Standard-TTL: 1 Stunde (3.600.000ms)",
            "Max. Größe: 10MB pro Cache-Typ",
            "Max. Einträge: 500 Pakete",
            "Festplatten-Persistierung: Aktiviert",
            "Cache-Konfiguration",
            "Gesamtes Caching-System aktivieren/deaktivieren",
            "Standard Cache-TTL in Millisekunden",
            "Maximale Gesamt-Cache-Größe in Bytes (50MB Standard)",
            "Benutzerdefinierter Cache-Verzeichnispfad",
            "Cache-Management-Befehle",
            "Cache Performance",
            "Optimierungs-Features",
            "LRU-Eviction: Least Recently Used Items werden zuerst entfernt",
            "Automatische Bereinigung: Abgelaufene Einträge werden alle 5 Minuten entfernt",
            "Größenüberwachung: Automatische Eviction bei Überschreitung der Größenlimits",
            "Parallele Verarbeitung: Cache-Operationen blockieren nicht den Hauptthread",
            "Performance-Vorteile",
            "Registry-Requests: 60-90% Reduzierung der NPM-Registry-Aufrufe",
            "Workspace-Parsing: 80-95% schnellere Workspace-Analyse bei wiederholten Ausführungen",
            "Netzwerk-Abhängigkeit: Reduzierte Abhängigkeit von Netzwerk-Konnektivität",
            "Startzeit: 2-5x schnellerer Start für nachfolgende Operationen"
          ]
        ],
        [
          "Erweiterte Cache-Funktionen",
          "erweiterte-cache-funktionen",
          [
            "PCU implementiert ein mehrschichtiges Caching-System zur Optimierung von Performance und Netzwerk-Effizienz.",
            "Cache-Architektur",
            "Registry-Cache",
            "Speichert NPM-Registry-Antworten für Package-Metadaten:",
            "Standard-TTL: 1 Stunde (3.600.000ms)",
            "Max. Größe: 10MB",
            "Max. Einträge: 500 Pakete",
            "Festplatten-Persistierung: Aktiviert",
            "Workspace-Cache",
            "Speichert Workspace-Konfiguration und package.json-Parsing-Ergebnisse:",
            "Standard-TTL: 5 Minuten (300.000ms)",
            "Max. Größe: 5MB",
            "Max. Einträge: 200 Workspaces",
            "Festplatten-Persistierung: Deaktiviert (nur Speicher)",
            "Cache-Konfiguration",
            "Umgebungsvariablen",
            "Gesamtes Caching-System aktivieren/deaktivieren",
            "Standard-Cache-TTL in Millisekunden",
            "Maximale Gesamt-Cache-Größe in Bytes (standardmäßig 50MB)",
            "Maximale Anzahl von Cache-Einträgen",
            "Benutzerdefinierter Cache-Verzeichnispfad",
            "Festplatten-Persistierung für Caches aktivieren",
            "Konfigurationsdatei-Einstellungen",
            "Cache-Management-Befehle",
            "Cache-Performance",
            "Optimierungsfeatures",
            "LRU-Entfernung: Least Recently Used-Elemente werden zuerst entfernt",
            "Automatische Bereinigung: Abgelaufene Einträge werden alle 5 Minuten entfernt",
            "Größenüberwachung: Automatische Entfernung bei Überschreitung der Größenlimits",
            "Parallele Verarbeitung: Cache-Operationen blockieren nicht den Haupt-Thread",
            "Performance-Vorteile",
            "Registry-Anfragen: 60-90% Reduzierung der NPM-Registry-Aufrufe",
            "Workspace-Parsing: 80-95% schnellere Workspace-Analyse bei wiederholten Läufen",
            "Netzwerk-Abhängigkeit: Reduzierte Abhängigkeit von Netzwerkkonnektivität",
            "Startzeit: 2-5x schnellere Startzeit für nachfolgende Operationen"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "Konfiguration",
          null,
          [
            "Konfigurieren Sie PCU für Ihren Workflow und Ihre Projektanforderungen. Lernen Sie über Konfigurationsdateien, paketspezifische Regeln und erweiterte Einstellungen. "
          ]
        ],
        [
          "Konfigurationsdateitypen",
          "konfigurationsdateitypen",
          [
            "PCU unterstützt mehrere Konfigurationsdateiformate und -standorte, um verschiedene Entwicklungsworkflows zu berücksichtigen.",
            "Unterstützte Konfigurationsdateien",
            "PCU sucht nach Konfigurationsdateien in der folgenden Reihenfolge (erste gefundene gewinnt):",
            "Primäre JSON-Konfigurationsdatei im Projektverzeichnis",
            "JavaScript-Konfigurationsdatei mit dynamischer Konfigurationsunterstützung",
            "Alternative JavaScript-Konfigurationsdateiname",
            "Globale Benutzerkonfiguration im Home-Verzeichnis",
            "Konfiguration innerhalb von package.json unter dem \"pcu\"-Schlüssel",
            "JavaScript-Konfigurationsunterstützung",
            "JavaScript-Konfigurationsdateien ermöglichen dynamische Konfiguration basierend auf Umgebung, Workspace-Struktur oder anderen Laufzeitbedingungen:",
            "Package.json-Konfiguration",
            "Für einfachere Projekte kann die Konfiguration in package.json eingebettet werden:",
            "Konfigurationsvalidierung",
            "PCU validiert Konfigurationsdateien automatisch und bietet detaillierte Fehlermeldungen für häufige Probleme:",
            "Validierungsfeatures",
            "JSON-Schema-Validierung: Stellt sicher, dass alle Konfigurationseigenschaften gültig sind",
            "Pattern-Validierung: Validiert Glob-Patterns und Paketnamenformate",
            "Typprüfung: Überprüft korrekte Datentypen für alle Konfigurationswerte",
            "Konflikterkennung: Identifiziert widersprüchliche Regeln und Konfigurationsoptionen",
            "Vorschlagssystem: Bietet hilfreiche Vorschläge zur Behebung von Konfigurationsfehlern",
            "Validierungsbeispiele"
          ]
        ],
        [
          ".pcurc.json Konfigurationsdatei Vollständige Referenz",
          "pcurc-json-konfigurationsdatei-vollstaendige-referenz",
          [
            "PCU verwendet mehrere Konfigurationsdateiformate, hauptsächlich die .pcurc.json-Datei im Projektverzeichnis. Diese kann manuell erstellt oder mit pcu init generiert werden.",
            "Vollständige Konfigurationsdateistruktur",
            "Detaillierte Konfigurationsoptionen",
            "defaults Standardeinstellungen",
            "Standard-Update-Ziel: latest | greatest | minor | patch | newest",
            "Netzwerk-Request-Timeout (Millisekunden)",
            "Backup-Datei vor Update erstellen",
            "Interaktiven Modus standardmäßig aktivieren",
            "Vorschaumodus standardmäßig aktivieren (keine tatsächlichen Updates)",
            "Updates erzwingen (Warnungen überspringen)",
            "Prerelease-Versionen einbeziehen",
            "workspace Workspace-Einstellungen",
            "Workspace-Struktur automatisch erkennen",
            "Katalogmodus: strict | loose | mixed",
            "Workspace-Root-Verzeichnispfad",
            "Paketverzeichnis-Übereinstimmungsmuster-Array (überschreibt pnpm-workspace.yaml)",
            "output Ausgabeeinstellungen",
            "Ausgabeformat: table | json | yaml | minimal",
            "Farbige Ausgabe aktivieren",
            "Ausführlichen Ausgabemodus aktivieren",
            "ui Benutzeroberflächen-Einstellungen",
            "Farbthema: default | modern | minimal | neon",
            "Fortschrittsbalken anzeigen",
            "Fortschrittsbalken-Stil: default | gradient | fancy | minimal | rainbow | neon",
            "Animationseffekte aktivieren",
            "Farbschema: auto | light | dark",
            "update Update-Verhalten-Einstellungen",
            "Beim Update standardmäßig interaktiven Modus aktivieren",
            "Zuerst Vorschau ausführen, dann fragen ob anwenden",
            "Prerelease-Versionen überspringen",
            "Major-Version-Updates bestätigen lassen",
            "Batch-Verarbeitung Paketanzahl",
            "security Sicherheitseinstellungen",
            "Sicherheitslücken automatisch beheben",
            "Major-Version-Updates für Sicherheitsfixes erlauben",
            "Bei Sicherheitsupdates benachrichtigen",
            "Sicherheitswarnstufen-Schwellenwert: low | moderate | high | critical",
            "advanced Erweiterte Einstellungen",
            "Anzahl gleichzeitiger Netzwerk-Requests",
            "Netzwerk-Request-Timeout (Millisekunden)",
            "Anzahl Wiederholungsversuche bei Fehlern",
            "Cache-Gültigkeitsdauer (Minuten, 0 deaktiviert Cache)",
            "Beim Start nach PCU-Tool-Updates suchen",
            "Maximale Batch-Verarbeitung Paketanzahl",
            "cache Cache-Einstellungen",
            "Cache-System aktivieren",
            "Cache-Lebensdauer (Millisekunden)",
            "Maximale Cache-Größe (Bytes, Standard 50MB)",
            "Maximale Cache-Einträge",
            "Cache auf Festplatte persistieren",
            "Cache-Verzeichnispfad",
            "registry Registry-Einstellungen",
            "Standard-NPM-Registry-URL",
            "Registry-Request-Timeout (Millisekunden)",
            "Registry-Request-Wiederholungsversuche",
            "Paketfilter-Einstellungen",
            "Einzuschließende Paketnamen-Übereinstimmungsmuster-Array",
            "Auszuschließende Paketnamen-Übereinstimmungsmuster-Array",
            "notification Benachrichtigungseinstellungen",
            "Benachrichtigungsfunktion aktivieren",
            "Bei verfügbaren Updates benachrichtigen",
            "Bei Sicherheitswarnungen benachrichtigen",
            "logging Protokollierungseinstellungen",
            "Protokoll-Level: error | warn | info | debug | trace",
            "Protokolldateipfad (optional)",
            "Maximale Anzahl Protokolldateien",
            "Maximale Größe einzelner Protokolldateien"
          ]
        ],
        [
          "Paketfilterung",
          "paketfilterung",
          [
            "Kontrollieren Sie, welche Pakete mit Include-/Exclude-Patterns und paketspezifischen Regeln aktualisiert werden sollen.",
            "Paketregeln-Eigenschaften",
            "Glob-Pattern zur Übereinstimmung mit Paketnamen",
            "Update-Ziel: latest, greatest, minor, patch, newest",
            "Immer vor dem Update dieser Pakete fragen",
            "Automatisch ohne Bestätigung aktualisieren",
            "Pakete, die der gleichen Update-Strategie folgen",
            "Verwandte Pakete zusammen aktualisieren"
          ]
        ],
        [
          "Sicherheitskonfiguration",
          "sicherheitskonfiguration",
          [
            "Konfigurieren Sie Sicherheitslücken-Scanning und automatische Korrekturen.",
            "Sicherheitslücken automatisch prüfen und beheben",
            "Major-Version-Upgrades für Sicherheitsfixes erlauben",
            "Benachrichtigungen bei Sicherheitsupdates anzeigen"
          ]
        ],
        [
          "Monorepo-Konfiguration",
          "monorepo-konfiguration",
          [
            "Spezielle Einstellungen für komplexe Monorepo-Setups mit mehreren Katalogen.",
            "Pakete, die Versionssynchronisation über mehrere Kataloge hinweg benötigen",
            "Katalog-Prioritätsreihenfolge für Konfliktlösung"
          ]
        ],
        [
          "Erweiterte Einstellungen",
          "erweiterte-einstellungen",
          [
            "Optimieren Sie Performance und Verhalten mit erweiterten Konfigurationsoptionen.",
            "Anzahl gleichzeitiger Netzwerk-Requests",
            "Netzwerk-Request-Timeout in Millisekunden",
            "Anzahl Wiederholungsversuche bei Fehlern",
            "Cache-Gültigkeitsdauer (0 deaktiviert Caching)",
            "Beim Start automatisch nach PCU-Tool-Updates suchen. Übersprungen in CI-Umgebungen. Zeigt\nUpdate-Benachrichtigungen und Installationsanweisungen an, wenn neuere Versionen verfügbar sind."
          ]
        ],
        [
          "UI-Konfiguration",
          "ui-konfiguration",
          [
            "Passen Sie das visuelle Erscheinungsbild und die Benutzeroberflächen-Einstellungen an.",
            "Verfügbare Themes",
            "default - Ausgewogene Farben für allgemeine Nutzung",
            "modern - Lebendige Farben für Entwicklungsumgebungen",
            "minimal - Sauber und einfach für Produktionsumgebungen",
            "neon - Hohe Kontrastfarben für Präsentationen",
            "Fortschrittsbalken-Stile",
            "PCU unterstützt 6 verschiedene Fortschrittsbalken-Stile für verbessertes visuelles Feedback während Operationen:",
            "default - Standard-Fortschrittsbalken mit Basis-Styling",
            "gradient - Farbverlauf-Fortschrittsbalken für modernes Erscheinungsbild",
            "fancy - Verbesserter Fortschrittsbalken mit dekorativen Elementen",
            "minimal - Sauberer und einfacher Fortschrittsindikator",
            "rainbow - Mehrfarbiger Fortschrittsbalken für lebendige Anzeigen",
            "neon - Hochkontrast-Fortschrittsbalken passend zum Neon-Theme",
            "Konfigurationsbeispiel:",
            "Kommandozeilen-Nutzung:"
          ]
        ],
        [
          "Konfigurationspriorität",
          "konfigurationsprioritaet",
          [
            "Konfigurationseinstellungen werden in dieser Prioritätsreihenfolge angewendet:",
            "Kommandozeilen-Flags (höchste Priorität)",
            "Paketspezifische Regeln in .pcurc.json",
            "Allgemeine Einstellungen in .pcurc.json",
            "Standardwerte (niedrigste Priorität)",
            "Verwandte Pakete erben automatisch Einstellungen von ihren übergeordneten Paketregeln, wodurch\nVersionskonsistenz über Ökosystem-Pakete hinweg sichergestellt wird."
          ]
        ],
        [
          "Beispiele",
          "beispiele",
          [
            "React-Ökosystem",
            "TypeScript-Projekt",
            "Enterprise-Setup"
          ]
        ],
        [
          "Umgebungsvariablen",
          "umgebungsvariablen",
          [
            "Alle CLI-Optionen können über Umgebungsvariablen für Automatisierung und CI/CD-Umgebungen konfiguriert werden:",
            "Umgebungsvariablen-Priorität",
            "Konfigurationsquellen werden in dieser Reihenfolge geladen (spätere überschreiben frühere):",
            "Eingebaute Standardwerte (niedrigste Priorität)",
            "Globale Konfiguration (~/.pcurc.json)",
            "Projektkonfiguration (.pcurc.json)",
            "Umgebungsvariablen (PCU_*)",
            "Kommandozeilen-Flags (höchste Priorität)"
          ]
        ],
        [
          "Registry-Konfiguration",
          "registry-konfiguration",
          [
            "PCU liest automatisch NPM- und PNPM-Konfigurationsdateien für Registry-Einstellungen:",
            "Registry-Priorität",
            "CLI --registry-Flag (höchste Priorität)",
            "PCU-Konfiguration (.pcurc.json Registry-Sektion)",
            "Projekt .npmrc/.pnpmrc",
            "Globale .npmrc/.pnpmrc",
            "Standard-NPM-Registry (niedrigste Priorität)"
          ]
        ],
        [
          "Erweiterte Cache-Konfiguration",
          "erweiterte-cache-konfiguration",
          [
            "PCU enthält ein erweiterte Caching-System zur Leistungsverbesserung:",
            "Cache-Einstellungen",
            "Cache-System aktivieren/deaktivieren",
            "Lebensdauer in Millisekunden (standardmäßig 1 Stunde)",
            "Maximale Cache-Größe in Bytes (standardmäßig 50MB)",
            "Maximale Anzahl von Cache-Einträgen",
            "Cache zwischen Läufen auf Festplatte speichern",
            "Verzeichnis für persistente Cache-Speicherung",
            "Cache-Eviction-Strategie: lru, fifo, lfu"
          ]
        ],
        [
          "Validierungskonfiguration",
          "validierungskonfiguration",
          [
            "PCU enthält umfassende Validierung mit hilfreichen Vorschlägen:",
            "Validierungsoptionen",
            "Strikten Validierungsmodus mit zusätzlichen Prüfungen aktivieren",
            "Warnungen für potenziell riskante Updates anzeigen",
            "Update-Typen, die Bestätigung erfordern: major, minor, patch",
            "Hilfreiche Vorschläge und Tipps aktivieren",
            "Leistungsoptimierungs-Vorschläge einbeziehen",
            "Best-Practice-Empfehlungen einbeziehen"
          ]
        ],
        [
          "Interaktive Modus-Konfiguration",
          "interaktive-modus-konfiguration",
          [
            "Konfigurieren Sie interaktive Eingabeaufforderungen und Benutzererfahrung:",
            "Interaktive Einstellungen",
            "Interaktive Modus-Funktionen aktivieren",
            "Anzahl der Elemente pro Seite in Listen",
            "Paketbeschreibungen in Auswahllisten anzeigen",
            "Release-Notes für Updates anzeigen (erfordert Netzwerk)",
            "Auto-Vervollständigung für Paketnamen aktivieren",
            "Fuzzy-Matching für Auto-Vervollständigung aktivieren",
            "Bestätigung für Major-Versions-Updates erforderlich"
          ]
        ],
        [
          "Monorepo-Konfiguration",
          "monorepo-konfiguration-2",
          [
            "PCU bietet erweiterte Features speziell für große Monorepos und komplexes Workspace-Management.",
            "Versionssynchronisation",
            "Halten Sie verwandte Pakete über Ihr Monorepo hinweg synchronisiert:",
            "Erweiterte Workspace-Verwaltung",
            "Katalog-Prioritätssystem",
            "Definieren Sie, welche Kataloge Vorrang haben, wenn Konflikte auftreten:",
            "Cross-Workspace-Dependencies",
            "Analysieren und verwalten Sie Abhängigkeiten zwischen Workspace-Paketen:",
            "Cross-Workspace-Dependencies analysieren",
            "Wie mit Versionskonflikten umgegangen wird: error, warn, off",
            "Pakete in Katalogen melden, die von keinem Workspace-Paket verwendet werden",
            "Validieren, dass alle Workspace-Pakete Katalogversionen verwenden",
            "Monorepo-spezifische Paketregeln",
            "Erstellen Sie anspruchsvolle Regeln für verschiedene Bereiche Ihres Monorepos:",
            "Workspace-spezifische Konfiguration",
            "Verschiedene Konfigurationen für verschiedene Teile Ihres Monorepos:",
            "Leistungsoptimierung für große Monorepos",
            "Batch-Processing-Konfiguration",
            "Anzahl der Pakete, die in jedem Batch verarbeitet werden",
            "Maximale Anzahl gleichzeitiger Operationen",
            "Workspace-Paket-Discovery zwischen Läufen cachen",
            "Mehrere Kataloge parallel verarbeiten",
            "Speicherverwaltung",
            "Monorepo-Validierung",
            "Umfassende Validierung für komplexe Workspace-Setups:",
            "Validierungsregeln",
            "Sicherstellen, dass workspace:-Protokoll für interne Dependencies verwendet wird",
            "Sicherstellen, dass alle Dependencies von Katalogen abgedeckt sind",
            "Erfordern, dass alle Workspace-Pakete die gleiche Version geteilter Dependencies verwenden",
            "Zirkuläre Dependencies zwischen Workspace-Paketen erkennen",
            "Verwendungsbeispiele für Monorepos",
            "Großes Enterprise-Monorepo-Setup",
            "CI/CD-optimierte Konfiguration"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "Entwicklung",
          null,
          [
            "Richten Sie PCU für die Entwicklung ein und lernen Sie, wie Sie zum Projekt beitragen können. Diese Anleitung behandelt Projektsetup, Architektur und Entwicklungsworkflows. "
          ]
        ],
        [
          "Voraussetzungen",
          "voraussetzungen",
          [
            "Bevor Sie mit der PCU-Entwicklung beginnen, stellen Sie sicher, dass Sie die erforderlichen Tools haben:",
            "Node.js >= 22.0.0 und pnpm >= 10.0.0 sind für die Entwicklung erforderlich."
          ]
        ],
        [
          "Projekt-Setup",
          "projekt-setup",
          [
            "Klonen und Entwicklungsumgebung einrichten:"
          ]
        ],
        [
          "Projektarchitektur",
          "projektarchitektur",
          [
            "PCU folgt Clean Architecture-Prinzipien mit klarer Trennung der Belange:",
            "Architektur-Schichten",
            "Benutzeroberfläche, Befehlsanalyse, Ausgabe-Formatierung",
            "Geschäftslogik-Orchestrierung, Anwendungsfälle",
            "Kern-Geschäftsentitäten, Value Objects, Repository-Interfaces",
            "Externe API-Clients, Dateisystem-Zugriff, Repository-Implementierungen",
            "Geteilte Hilfsprogramme, Konfiguration, Logging, Fehlerbehandlung"
          ]
        ],
        [
          "Entwicklungsworkflow",
          "entwicklungsworkflow",
          [
            "Änderungen vornehmen",
            "Feature-Branch erstellen:",
            "Änderungen vornehmen entsprechend den Coding Standards",
            "Tests für Ihre Änderungen hinzufügen:",
            "Qualitätsprüfungen bestehen lassen:",
            "Änderungen committen:",
            "Test-Strategie",
            "PCU verwendet einen umfassenden Test-Ansatz:",
            "Code-Qualität",
            "PCU hält hohe Code-Qualitätsstandards aufrecht:"
          ]
        ],
        [
          "Features hinzufügen",
          "features-hinzufuegen",
          [
            "Neue Befehle erstellen",
            "Befehlshandler erstellen in apps/cli/src/cli/commands/:",
            "Geschäftslogik hinzufügen in packages/core/src/application/services/",
            "Tests erstellen für sowohl CLI als auch Kern-Logik",
            "Dokumentation aktualisieren",
            "Neue Ausgabeformate hinzufügen",
            "Formatierer erstellen in apps/cli/src/cli/formatters/:",
            "Formatierer registrieren in der Haupt-Formatierer-Registry",
            "Tests hinzufügen und Dokumentation aktualisieren"
          ]
        ],
        [
          "Beitragsrichtlinien",
          "beitragsrichtlinien",
          [
            "Commit-Message-Konvention",
            "PCU verwendet Conventional Commits:",
            "Pull Request-Prozess",
            "Repository forken und Feature-Branch erstellen",
            "Änderungen vornehmen entsprechend dem Entwicklungsworkflow",
            "Alle Tests bestehen lassen und Code-Qualitätsprüfungen erfolgreich",
            "Dokumentation aktualisieren falls nötig",
            "Pull Request einreichen mit:",
            "Klarer Beschreibung der Änderungen",
            "Link zu verwandten Issues",
            "Screenshots für UI-Änderungen",
            "Breaking Change-Notizen falls zutreffend",
            "Code Review-Checkliste",
            "Alle Tests bestehen",
            "Code-Coverage aufrechterhalten (>85%)",
            "TypeScript-Typen sind korrekt",
            "Code-Stil folgt Projekt-Standards",
            "Dokumentation aktualisiert",
            "Breaking Changes dokumentiert",
            "Performance-Auswirkung berücksichtigt"
          ]
        ],
        [
          "Debugging",
          "debugging",
          [
            "Entwicklungs-Debugging",
            "Test-Debugging"
          ]
        ],
        [
          "Bauen und Veröffentlichen",
          "bauen-und-veroeffentlichen",
          [
            "Lokale Tests",
            "Release-Prozess",
            "Release-Notizen vorbereiten in apps/cli/CHANGELOG.md unter ## Unreleased.",
            "Bauen und testen:",
            "Den GitHub-Actions-Workflow Release ausführen (nur Maintainer):",
            "patch, minor, major: erhöhen die CLI-Version, committen die Release-Änderungen, erstellen den Tag, veröffentlichen pcu und pnpm-catalog-updates und erzeugen den GitHub Release in einem Lauf",
            "current: veröffentlicht die Version, die bereits im Repository committed ist",
            "dry_run: true: prüft den Ablauf ohne Veröffentlichung"
          ]
        ],
        [
          "Hilfe erhalten",
          "hilfe-erhalten",
          [
            "📖 Dokumentation: Prüfen Sie diese Dokumentation für detaillierte Anleitungen",
            "🐛 Issues: Melden Sie Bugs über GitHub Issues",
            "💬 Diskussionen: Stellen Sie Fragen in GitHub Discussions",
            "🔧 Entwicklung: Nehmen Sie an Entwicklungsdiskussionen in Issues und PRs teil"
          ]
        ],
        [
          "Erweiterte Architektur-Details",
          "erweiterte-architektur-details",
          [
            "Kern-Domain-Modell",
            "Basierend auf Domain-Driven Design (DDD)-Prinzipien umfasst PCUs Kern-Domain:",
            "Service-Schicht-Architektur",
            "Die Anwendungsschicht orchestriert Geschäftslogik durch Services:",
            "CLI-Schicht-Design",
            "Die CLI-Schicht bietet eine saubere Schnittstelle zur Kern-Domain:",
            "Test-Architektur",
            "Umfassende Test-Strategie über alle Schichten:",
            "Performance-Überlegungen",
            "PCU ist für Performance in großen Monorepos optimiert:"
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "Beispiele",
          null,
          [
            "Praxisnahe Beispiele und Anwendungsfälle, um das Beste aus PCU herauszuholen. Von einfachen Updates bis hin zu komplexem Monorepo-Management. "
          ]
        ],
        [
          "Basis-Workflows",
          "basis-workflows",
          [
            "Täglicher Dependency-Check",
            "Überprüfen Sie Updates als Teil Ihrer täglichen Entwicklungsroutine:",
            "Sichere Updates mit Backup",
            "Dependencies sicher mit automatischen Backups aktualisieren:",
            "Zielspezifische Updates",
            "Nur bestimmte Arten von Änderungen aktualisieren:"
          ]
        ],
        [
          "Multi-Katalog-Workspaces",
          "multi-katalog-workspaces",
          [
            "Legacy-Support-Szenario",
            "Verwaltung mehrerer React-Versionen in einem Workspace:",
            "Paket-Nutzung"
          ]
        ],
        [
          "Konfigurationsbeispiele",
          "konfigurationsbeispiele",
          [
            "React-Ökosystem-Management",
            "Koordinierte Updates für React und verwandte Pakete:",
            "TypeScript-Projekt-Konfiguration",
            "Konservative TypeScript-Updates mit automatischen Typdefinitionen:",
            "Enterprise-Konfiguration",
            "Enterprise-taugliche Konfiguration mit strikten Kontrollen:"
          ]
        ],
        [
          "CI/CD-Integration",
          "ci-cd-integration",
          [
            "GitHub Actions",
            "Dependency-Überprüfung in Ihrer CI-Pipeline automatisieren:"
          ]
        ],
        [
          "Fehlerbehandlung und Fehlerbehebung",
          "fehlerbehandlung-und-fehlerbehebung",
          [
            "Netzwerkprobleme",
            "Netzwerkprobleme und Registry-Zugriff handhaben:",
            "Workspace-Validierung",
            "Ihr Workspace-Setup validieren:",
            "Private Registries",
            "PCU liest automatisch .npmrc- und .pnpmrc-Konfigurationen:"
          ]
        ],
        [
          "Erweiterte Anwendungsfälle",
          "erweiterte-anwendungsfaelle",
          [
            "Impact-Analyse",
            "Auswirkungen der Aktualisierung spezifischer Pakete analysieren:",
            "Selektive Updates",
            "Nur spezifische Pakete oder Patterns aktualisieren:",
            "Dry-Run-Analyse",
            "Änderungen vor der Anwendung vorab betrachten:"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "Täglicher Workflow",
            "Morgen-Check: pcu -c um verfügbare Updates zu sehen",
            "Auswirkungen überprüfen: pcu -a für bedeutende Updates verwenden",
            "Sicheres Update: pcu -i -b für interaktive Updates mit Backup",
            "Tests: Test-Suite nach Updates ausführen",
            "Commit: Dependency-Updates separat committen",
            "Team-Workflow",
            "Gemeinsame Konfiguration: .pcurc.json unter Versionskontrolle committen",
            "Regelmäßige Reviews: Wöchentliche Dependency-Review-Meetings planen",
            "Sicherheitspriorität: Sicherheitsupdates immer priorisieren",
            "Dokumentation: Wichtige Dependency-Entscheidungen dokumentieren",
            "Rollback-Plan: Backups für einfaches Rollback bereithalten",
            "Release-Workflow",
            "Pre-Release-Check: pcu -c --target patch vor Releases",
            "Sicherheitsscan: autoFixVulnerabilities in CI aktivieren",
            "Version-Pinning: Exakte Versionen für Produktions-Releases verwenden",
            "Update-Zeitplan: Dependency-Updates zwischen Releases planen"
          ]
        ],
        [
          "Sicherheitsüberwachung",
          "sicherheitsueberwachung",
          [
            "Kontinuierliches Sicherheitsscanning",
            "Sicherheitsscanning in Ihren Entwicklungsworkflow integrieren:",
            "Sicherheitsfokussierte CI/CD"
          ]
        ],
        [
          "Theme-Anpassung",
          "theme-anpassung",
          [
            "Interaktives Theme-Setup",
            "PCU-Erscheinungsbild für Ihr Team konfigurieren:",
            "Team-Theme-Konfiguration"
          ]
        ],
        [
          "Performance-Optimierung",
          "performance-optimierung",
          [
            "Große Monorepo-Konfiguration",
            "PCU für große Workspaces mit hunderten von Paketen optimieren:",
            "Selektive Verarbeitung"
          ]
        ],
        [
          "Migrations-Beispiele",
          "migrations-beispiele",
          [
            "Von npm-check-updates",
            "Migration von ncu zu PCU:",
            "Zu pnpm-Katalogen konvertieren",
            "Bestehenden Workspace zur Nutzung von pnpm-Katalogen transformieren:"
          ]
        ],
        [
          "Migrations-Leitfäden",
          "migrations-leitfaeden",
          [
            "Migration von npm-check-updates",
            "Nahtloser Übergang von npm-check-updates zu PCU für pnpm-Katalog-Management:",
            "Migrations-Schritte",
            "PCU neben ncu installieren temporär zum Vergleich",
            "PCU-Konfiguration initialisieren:",
            "Ausgaben vergleichen um äquivalente Funktionalität sicherzustellen:",
            "Paketregeln migrieren aus ncu-Konfiguration",
            "ncu entfernen sobald Sie mit PCU vertraut sind",
            "Migration von Dependabot",
            "Dependabot durch PCU für granularere Kontrolle ersetzen:",
            "Migration von Renovate",
            "Übergang von Renovate zu PCU mit erweiterter Konfiguration:",
            "Hauptunterschiede",
            "| Feature           | Renovate        | PCU                                |\n| ----------------- | --------------- | ---------------------------------- |\n| Bereich       | Einzelne Pakete | Katalog-Level-Updates              |\n| Konfiguration | renovate.json   | .pcurc.json                        |\n| UI            | Web-Dashboard   | Terminal + CI-Integration          |\n| Monorepo      | Komplexe Config | Eingebaute Workspace-Unterstützung |",
            "Migrations-Konfiguration"
          ]
        ],
        [
          "Enterprise-Workflows",
          "enterprise-workflows",
          [
            "Multi-Umgebungs-Management",
            "Dependencies über Entwicklungs-, Staging- und Produktionsumgebungen verwalten:",
            "Genehmigungs-Workflows",
            "Genehmigungs-Workflows für kritische Updates implementieren:"
          ]
        ],
        [
          "CI/CD-Workflow-Integration",
          "ci-cd-workflow-integration",
          [
            "GitHub Actions Integration",
            "Vollständiges GitHub Actions Setup für automatisiertes Dependency-Management:",
            "GitLab CI Integration",
            "GitLab CI Pipeline für PCU Dependency-Management:",
            "Jenkins Pipeline Integration",
            "Jenkins Pipeline für Enterprise Dependency-Management:",
            "Azure DevOps Pipeline",
            "Azure DevOps Pipeline für PCU Integration:",
            "Docker Integration",
            "Containerisiertes PCU für konsistente CI/CD-Umgebungen:"
          ]
        ],
        [
          "Enterprise-Workflows",
          "enterprise-workflows-2",
          [
            "Multi-Umgebungs-Management",
            "Dependencies über Entwicklungs-, Staging- und Produktionsumgebungen verwalten:",
            "Genehmigungs-Workflows",
            "Genehmigungs-Workflows für kritische Updates implementieren:"
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "Häufig gestellte Fragen",
          null,
          [
            "Schnelle Antworten auf häufige Fragen zu PCU. Können Sie nicht finden, wonach Sie suchen? Schauen Sie in unseren Fehlerbehebungsguide oder öffnen Sie ein Issue. "
          ]
        ],
        [
          "Installation & Setup",
          "installation-and-setup",
          [
            "Wie installiere ich PCU?",
            "PCU kann global über npm, pnpm oder yarn installiert werden:",
            "Was sind die Systemanforderungen?",
            "Node.js: >= 18.0.0 (LTS empfohlen)",
            "pnpm: >= 8.0.0",
            "Betriebssystem: Windows, macOS, Linux",
            "Benötige ich einen pnpm-Workspace, um PCU zu verwenden?",
            "Ja, PCU ist speziell für pnpm-Workspaces mit Katalog-Dependencies entwickelt. Wenn Sie noch keinen Workspace haben, führen Sie pcu init aus, um einen zu erstellen.",
            "Kann ich PCU mit npm- oder yarn-Projekten verwenden?",
            "Nein, PCU ist ausschließlich für pnpm-Workspaces mit Katalog-Dependencies. Für andere Paketmanager verwenden Sie Tools wie npm-check-updates oder yarn upgrade-interactive."
          ]
        ],
        [
          "Konfiguration",
          "konfiguration",
          [
            "Wo soll ich meine .pcurc.json-Konfiguration platzieren?",
            "Platzieren Sie sie in Ihrem Workspace-Root-Verzeichnis (gleiche Ebene wie pnpm-workspace.yaml). PCU unterstützt auch:",
            "Globale Konfiguration: ~/.pcurc.json",
            "Projektkonfiguration: ./.pcurc.json (höchste Priorität)",
            "Was ist der Unterschied zwischen Workspace-Level- und globaler Konfiguration?",
            "Global (~/.pcurc.json): Wird auf alle PCU-Operationen über verschiedene Projekte hinweg angewendet",
            "Projekt (./.pcurc.json): Spezifisch für den aktuellen Workspace, überschreibt globale Einstellungen",
            "Kann ich verschiedene Update-Strategien für verschiedene Pakete konfigurieren?",
            "Ja! Verwenden Sie Paketregeln in Ihrer Konfiguration:"
          ]
        ],
        [
          "Befehle & Nutzung",
          "befehle-and-nutzung",
          [
            "Was ist der Unterschied zwischen pcu check und pcu -c?",
            "Sie sind identisch! PCU unterstützt sowohl vollständige Befehlsnamen als auch kurze Aliase:",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "Wie aktualisiere ich nur bestimmte Arten von Paketen?",
            "Verwenden Sie die --include- und --exclude-Flags:",
            "Was ist der Unterschied zwischen Update-Zielen?",
            "patch: Nur Bugfixes (1.0.0 → 1.0.1)",
            "minor: Neue Features, rückwärtskompatibel (1.0.0 → 1.1.0)",
            "latest: Neueste stabile Version inklusive großer Änderungen (1.0.0 → 2.0.0)",
            "greatest: Neueste Version inklusive Prereleases (1.0.0 → 2.0.0-beta.1)",
            "Wie prüfe ich, was aktualisiert werden würde, bevor ich tatsächlich aktualisiere?",
            "Verwenden Sie das --dry-run-Flag:",
            "Dies zeigt Ihnen genau, was aktualisiert werden würde, ohne Änderungen vorzunehmen."
          ]
        ],
        [
          "Fehlerbehebung",
          "fehlerbehebung",
          [
            "Warum sagt PCU \"No pnpm workspace found\"?",
            "Das bedeutet, PCU kann keine pnpm-workspace.yaml-Datei in Ihrem aktuellen Verzeichnis finden. Lösungen:",
            "Workspace erstellen: Führen Sie pcu init aus",
            "Zum Workspace-Root navigieren: cd zum Verzeichnis mit pnpm-workspace.yaml",
            "Workspace-Pfad angeben: pcu -c --workspace /path/to/workspace",
            "Warum sagt PCU \"No catalog dependencies found\"?",
            "Ihr Workspace verwendet noch keine Katalog-Dependencies. Sie benötigen:",
            "Katalog in Workspace-Datei:",
            "Kataloge in Paketen verwenden:",
            "PCU läuft sehr langsam. Wie kann ich die Performance verbessern?",
            "Versuchen Sie diese Optimierungen:",
            "Concurrency reduzieren: pcu check --concurrency 2",
            "Timeout erhöhen: pcu check --timeout 60000",
            "Caching aktivieren: Stellen Sie sicher, dass PCU_CACHE_ENABLED=true (Standard)",
            "Filterung verwenden: pcu check --include \"react*\" für spezifische Pakete",
            "Wie behebe ich \"ENOTFOUND registry.npmjs.org\"-Fehler?",
            "Das ist ein Netzwerk-Konnektivitätsproblem:",
            "Internetverbindung prüfen: ping registry.npmjs.org",
            "Proxy konfigurieren: HTTP_PROXY- und HTTPS_PROXY-Umgebungsvariablen setzen",
            "Unternehmens-Registry verwenden: .npmrc mit Ihrer Firmen-Registry konfigurieren",
            "Timeout erhöhen: PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "Sicherheit",
          "sicherheit",
          [
            "Wie behandelt PCU Sicherheitslücken?",
            "PCU integriert sich mit npm audit und optional Snyk:",
            "Soll ich alle Sicherheitslücken automatisch beheben?",
            "Seien Sie vorsichtig mit --auto-fix:",
            "✅ Sicher: Patch- und Minor-Updates für Sicherheitsfixes",
            "⚠️ Überprüfen: Major-Version-Updates, die Ihre App brechen könnten",
            "❌ Vermeiden: Blindes Auto-Fix in Produktion ohne Tests",
            "Wie behandle ich falsch positive Sicherheitswarnungen?",
            "Konfigurieren Sie ignorierte Schwachstellen in .pcurc.json:"
          ]
        ],
        [
          "Workflows & CI/CD",
          "workflows-and-ci-cd",
          [
            "Kann ich PCU in CI/CD-Pipelines verwenden?",
            "Absolut! PCU ist für Automatisierung entwickelt:",
            "Siehe unseren CI/CD-Integrationsguide für vollständige Beispiele.",
            "Wie erstelle ich automatisierte Dependency-Update-PRs?",
            "Verwenden Sie PCU mit GitHub Actions, GitLab CI oder anderen Plattformen:",
            "Schauen Sie in den CI/CD-Integrationsguide für vollständige Workflows.",
            "Was ist der beste Workflow für Team-Zusammenarbeit?",
            "Gemeinsame Konfiguration: .pcurc.json unter Versionskontrolle committen",
            "Regelmäßige Reviews: Wöchentliche Dependency-Review-Meetings planen",
            "Sicherheit zuerst: Sicherheitsupdates immer priorisieren",
            "Inkrementelle Updates: Kleinere, häufige Updates gegenüber großen Batch-Updates bevorzugen",
            "Tests: Immer nach Updates vor dem Mergen testen"
          ]
        ],
        [
          "Erweiterte Nutzung",
          "erweiterte-nutzung",
          [
            "Kann ich mehrere Kataloge in einem Workspace verwenden?",
            "Ja! PNPM unterstützt mehrere Kataloge:",
            "Dann in Paketen verwenden:",
            "Wie analysiere ich die Auswirkungen der Aktualisierung eines bestimmten Pakets?",
            "Verwenden Sie den analyze-Befehl:",
            "Kann ich bestimmte Pakete dauerhaft von Updates ausschließen?",
            "Ja, konfigurieren Sie Ausschlüsse in .pcurc.json:",
            "Wie behandle ich Monorepos mit 100+ Paketen?",
            "Performance-Tipps für große Monorepos:",
            "Batch-Verarbeitung: batchSize: 10 in erweiterten Einstellungen konfigurieren",
            "Concurrency reduzieren: concurrency: 2 setzen, um Registry nicht zu überlasten",
            "Filterung verwenden: Pakete in Gruppen mit --include-Patterns verarbeiten",
            "Caching aktivieren: Sicherstellen, dass Caching aktiviert und richtig konfiguriert ist",
            "Speicher erhöhen: NODE_OPTIONS=\"--max-old-space-size=8192\" setzen"
          ]
        ],
        [
          "Fehlermeldungen",
          "fehlermeldungen",
          [
            "\"Cannot resolve peer dependencies\"",
            "Das passiert, wenn Paketversionen in Konflikt stehen. Lösungen:",
            "Verwandte Pakete zusammen aktualisieren: pcu update --include \"react*\"",
            "Interaktiven Modus verwenden: pcu update --interactive, um Versionen sorgfältig zu wählen",
            "Peer Dependencies prüfen: Überprüfen, was jedes Paket benötigt",
            "Mehrere Kataloge verwenden: Widersprüchliche Versionen in verschiedene Kataloge trennen",
            "\"Invalid configuration in .pcurc.json\"",
            "Ihre Konfigurationsdatei hat JSON-Syntaxfehler:",
            "\"Command not found: pcu\"",
            "Installations- oder PATH-Probleme:",
            "Global neu installieren: npm install -g pcu",
            "PATH prüfen: Sicherstellen, dass npm global bin in Ihrem PATH ist",
            "npx verwenden: npx pnpm-catalog-updates check als Alternative",
            "pnpm verwenden: pnpm add -g pnpm-catalog-updates (empfohlen)"
          ]
        ],
        [
          "Integration & Tools",
          "integration-and-tools",
          [
            "Funktioniert PCU mit Renovate oder Dependabot?",
            "PCU ist eine Alternative zu diesen Tools, nicht eine Ergänzung:",
            "PCU: Manuelle Kontrolle, pnpm-spezifisch, katalog-fokussiert",
            "Renovate: Automatisierte PRs, unterstützt viele Paketmanager",
            "Dependabot: GitHub-integriert, automatisierte Sicherheitsupdates",
            "Wählen Sie basierend auf Ihren Workflow-Präferenzen. Für Migration siehe unseren Migrationsguide.",
            "Kann ich PCU in meine IDE integrieren?",
            "Obwohl es keine offizielle IDE-Erweiterung gibt, können Sie:",
            "npm-Scripts hinzufügen: Befehle in package.json konfigurieren",
            "Task-Runner verwenden: Mit VS Code-Tasks oder ähnlichem integrieren",
            "Terminal-Integration: Die meisten IDEs unterstützen Terminal-Integration",
            "Unterstützt PCU private npm-Registries?",
            "Ja! PCU liest Ihre .npmrc-Konfiguration:",
            "PCU verwendet automatisch die korrekte Registry für jeden Paketbereich."
          ]
        ],
        [
          "Haben Sie noch Fragen?",
          "haben-sie-noch-fragen",
          [
            "📖 Dokumentation: Schauen Sie in unsere umfassende Befehlsreferenz",
            "🛠️ Fehlerbehebung: Besuchen Sie unseren Fehlerbehebungsguide",
            "🐛 Bug-Reports: Erstellen Sie ein Issue",
            "💬 Diskussionen: GitHub Discussions"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "Migrationsleitfaden",
          null,
          [
            "Lernen Sie, wie Sie von bestehenden Dependency-Management-Lösungen zu PCU migrieren und Ihr Team auf pnpm-Katalog-Dependencies umstellen. "
          ]
        ],
        [
          "Migrationsübersicht",
          "migrationsuebersicht",
          [
            "PCU ist speziell für pnpm-Workspaces mit Katalog-Dependencies entwickelt. Wenn Sie derzeit andere Tools oder Paketmanager verwenden, hilft Ihnen dieser Leitfaden bei einem reibungslosen Übergang.",
            "Bevor Sie beginnen",
            "Voraussetzungen für PCU:",
            "pnpm als Ihr Paketmanager (Version 8.0.0+)",
            "Workspace-Konfiguration (pnpm-workspace.yaml)",
            "Katalog-Dependencies in Ihrem Workspace",
            "Migrationsentscheidungsmatrix:",
            "| Aktuelles Tool           | Migrationskomplexität | Vorteile                                           | Überlegungen                       |\n| ------------------------ | --------------------- | -------------------------------------------------- | ---------------------------------- |\n| npm-check-updates        | Niedrig               | Bessere pnpm-Integration, Katalog-Unterstützung    | Erfordert pnpm-Workspace-Setup     |\n| Manuelle Updates         | Niedrig               | Automatisierung, Konsistenz, Sicherheitsscan       | Anfänglicher Konfigurationsaufwand |\n| Renovate                 | Mittel                | Manuelle Kontrolle, workspace-spezifische Features | Verlust der Automatisierung        |\n| Dependabot               | Mittel                | Verbessertes Katalog-Management                    | GitHub-spezifische Features        |\n| yarn upgrade-interactive | Hoch                  | Katalog-Vorteile, bessere Performance              | Vollständiger Paketmanager-Wechsel |"
          ]
        ],
        [
          "Migration von npm-check-updates",
          "migration-von-npm-check-updates",
          [
            "Analyse des aktuellen Setups",
            "Wenn Sie derzeit npm-check-updates (ncu) verwenden, haben Sie wahrscheinlich Scripts wie:",
            "Migrationsschritte",
            "1. pnpm installieren und Workspace einrichten",
            "2. Zu Katalog-Dependencies konvertieren",
            "Katalog-Einträge in pnpm-workspace.yaml erstellen:",
            "3. Paketdateien aktualisieren",
            "package.json-Dateien konvertieren um Katalog-Referenzen zu verwenden:",
            "4. PCU installieren und konfigurieren",
            "5. Scripts aktualisieren",
            "ncu-Scripts durch PCU-Äquivalente ersetzen:",
            "Konfigurationsmigration",
            "ncu-Konfiguration → PCU-Konfiguration:"
          ]
        ],
        [
          "Migration von Renovate",
          "migration-von-renovate",
          [
            "Die Unterschiede verstehen",
            "Renovate vs PCU:",
            "Renovate: Automatisierte PR-Erstellung, Multi-Language-Unterstützung, umfangreiche Konfiguration",
            "PCU: Manuelle Kontrolle, pnpm-spezifisch, katalog-fokussiert, sicherheitsintegriert",
            "Migrationsstrategie",
            "1. Renovate-Konfiguration exportieren",
            "Analysieren Sie Ihre aktuelle renovate.json:",
            "2. Zu PCU-Konfiguration konvertieren",
            "Renovate-Regeln zu PCU-Äquivalenten mappen:",
            "3. Manuelle Workflows einrichten",
            "Automatisierte PRs durch geplante manuelle Reviews ersetzen:",
            "4. Team-Transition",
            "Phase 1: Paralleler Betrieb (2 Wochen)",
            "Renovate aktiviert lassen",
            "PCU für manuelle Checks einführen",
            "Team in PCU-Befehlen schulen",
            "Phase 2: PCU primär (2 Wochen)",
            "Renovate-PR-Erstellung deaktivieren",
            "PCU für alle Updates verwenden",
            "Review-Prozesse etablieren",
            "Phase 3: Vollständige Migration",
            "Renovate-Konfiguration entfernen",
            "PCU-Konfiguration optimieren",
            "Neue Workflows dokumentieren",
            "Renovate Feature-Mapping",
            "| Renovate Feature       | PCU-Äquivalent         | Notizen                      |\n| ---------------------- | ---------------------- | ---------------------------- |\n| Automatisierte PRs     | Manueller pcu update | Mehr Kontrolle, weniger Lärm |\n| Terminplanung          | Cron Jobs + PCU        | Flexibles Timing             |\n| Gruppen-Updates        | --include Patterns   | Verwandte Pakete gruppieren  |\n| Auto-Merge             | autoUpdate: true     | Begrenzt auf sichere Pakete  |\n| Schwachstellen-Alerts  | pcu security         | Integriertes Scanning        |\n| Konfigurations-Presets | Paketregeln            | Wiederverwendbare Muster     |"
          ]
        ],
        [
          "Migration von Dependabot",
          "migration-von-dependabot",
          [
            "GitHub-Integrations-Überlegungen",
            "Dependabot-Vorteile nachbilden:",
            "Sicherheitslücken-Warnungen",
            "Automatisierte Sicherheitsupdates",
            "GitHub-Integration",
            "PR-Erstellung und -Management",
            "Migrationsansatz",
            "1. Aktuelle Dependabot-Konfiguration auditieren",
            ".github/dependabot.yml überprüfen:",
            "2. PCU mit GitHub Actions einrichten",
            ".github/workflows/dependencies.yml erstellen:",
            "3. Sicherheitsintegration",
            "Dependabot-Sicherheitsfeatures ersetzen:",
            "4. Manueller Review-Prozess",
            "Menschenzentrierte Workflows etablieren:"
          ]
        ],
        [
          "Migration von manueller Dependency-Verwaltung",
          "migration-von-manueller-dependency-verwaltung",
          [
            "Bewertungsphase",
            "Analyse des aktuellen Zustands:",
            "Häufigkeit: Wie oft aktualisieren Sie Dependencies?",
            "Prozess: Wie ist Ihr aktueller Update-Workflow?",
            "Tests: Wie validieren Sie Updates?",
            "Sicherheit: Wie handhaben Sie Schwachstellen?",
            "Häufige manuelle Muster:",
            "Strukturierte Migration",
            "Phase 1: Bewertung (Woche 1)",
            "Phase 2: Katalog-Konvertierung (Woche 2)",
            "Phase 3: Prozess-Integration (Woche 3-4)",
            "Automatisierungsstrategie",
            "Schrittweise Automatisierung:",
            "Manueller Start: Alle Updates erfordern Bestätigung",
            "Halb-automatisiert: Auto-Update Dev-Dependencies und Types",
            "Intelligente Automatisierung: Auto-Update Patches, Bestätigung für Minors",
            "Vollautomatisierung: Auto-Update alles außer Majors",
            "Konfigurationsentwicklung:"
          ]
        ],
        [
          "Konvertierung von Nicht-pnpm-Projekten",
          "konvertierung-von-nicht-pnpm-projekten",
          [
            "Von npm-Projekten",
            "1. Dependency-Analyse",
            "2. pnpm-Migration",
            "3. Katalog-Extraktion",
            "Von Yarn-Projekten",
            "1. Workspace-Konvertierung",
            "2. Migrationsbefehle"
          ]
        ],
        [
          "Team-Übergangsstrategien",
          "team-uebergangsstrategien",
          [
            "Change Management",
            "1. Kommunikationsplan",
            "Woche -2: Migrationsplan ankündigen",
            "Woche -1: Schulungssessions und Dokumentation",
            "Woche 0: Parallelen Betrieb beginnen",
            "Woche 2: Vollständiger Übergang",
            "Woche 4: Prozessoptimierung",
            "2. Schulungsprogramm",
            "Entwickler-Schulungssession (1 Stunde):",
            "Rollout-Strategie",
            "Pilot-Projekt-Ansatz:",
            "Pilot-Projekt auswählen: Repräsentatives aber nicht-kritisches Projekt wählen",
            "Migrations-Pilot: Vollständige Migration mit Pilot-Team",
            "Lessons Learned: Probleme und Lösungen dokumentieren",
            "Skalierte Einführung: Erkenntnisse auf andere Projekte anwenden",
            "Risikominderung:"
          ]
        ],
        [
          "Validierung und Tests",
          "validierung-und-tests",
          [
            "Migrationsvalidierung",
            "1. Funktionstests",
            "2. Performance-Vergleich",
            "Erfolgsmetriken",
            "Key Performance Indicators:",
            "Installationsgeschwindigkeit: pnpm install vs npm install",
            "Update-Häufigkeit: Updates pro Monat vorher/nachher",
            "Sicherheitsreaktion: Zeit zur Behebung von Schwachstellen",
            "Entwicklerzufriedenheit: Team-Umfrageergebnisse",
            "Build-Performance: CI/CD-Ausführungszeit"
          ]
        ],
        [
          "Migrations-Checkliste",
          "migrations-checkliste",
          [
            "Vor der Migration",
            "Aktuellen Dependency-Management-Ansatz bewerten",
            "pnpm in isolierter Umgebung installieren und testen",
            "Workspace-Struktur planen",
            "Häufige Dependencies für Katalog identifizieren",
            "Aktuelle Konfiguration sichern",
            "Wichtige Teammitglieder schulen",
            "Migrationsphase",
            "Zu pnpm-Workspace-Struktur konvertieren",
            "Dependencies in Katalog extrahieren",
            "package.json-Dateien zur Katalog-Referenz-Nutzung aktualisieren",
            "PCU installieren und konfigurieren",
            "Funktionalität mit Pilot-Projekt testen",
            "CI/CD-Pipelines aktualisieren",
            "Neue Prozesse dokumentieren",
            "Nach der Migration",
            "Validieren dass alle Funktionalität funktioniert",
            "Verbleibenede Teammitglieder schulen",
            "PCU-Konfiguration optimieren",
            "Regelmäßige Wartungspläne erstellen",
            "Erfolgsmetriken überwachen und messen",
            "Feedback sammeln und iterieren",
            "Fehlerbehebung",
            "Häufige Migrationsprobleme dokumentieren",
            "Rollback-Verfahren erstellen",
            "Support-Kanäle einrichten",
            "Regelmäßige Gesundheitschecks und Optimierung"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "Performance-Optimierung",
          null,
          [
            "Maximieren Sie die PCU-Performance für große Monorepos, komplexe Workspaces und ressourcenbeschränkte Umgebungen. "
          ]
        ],
        [
          "PCU-Performance verstehen",
          "pcu-performance-verstehen",
          [
            "Die PCU-Performance hängt von mehreren Faktoren ab:",
            "Netzwerk-Latenz: Registry-Antwortzeiten und Bandbreite",
            "Workspace-Größe: Anzahl der Pakete und Abhängigkeiten",
            "Cache-Effizienz: Trefferquoten und Speicheroptimierung",
            "Systemressourcen: CPU, Arbeitsspeicher und Festplatten-I/O",
            "Konfiguration: Parallelitätseinstellungen und Timeout-Werte",
            "Performance-Profiling",
            "Detailliertes Performance-Monitoring aktivieren:",
            "Beispiel-Ausgabe-Analyse:"
          ]
        ],
        [
          "Konfigurationsoptimierung",
          "konfigurationsoptimierung",
          [
            "Parallelitätseinstellungen",
            "Parallele Operationen für Ihre Umgebung optimieren:",
            "Parallelitäts-Richtlinien:",
            "Kleine Projekte (unter 20 Pakete): concurrency: 5-8",
            "Mittlere Projekte (20-100 Pakete): concurrency: 3-5",
            "Große Projekte (über 100 Pakete): concurrency: 1-3",
            "CI/CD-Umgebungen: concurrency: 2-3",
            "Speicherverwaltung",
            "Node.js Speicheroptimierung:",
            "PCU Speicherkonfiguration:"
          ]
        ],
        [
          "Caching-Strategien",
          "caching-strategien",
          [
            "Lokale Cache-Optimierung",
            "Cache-Konfiguration:",
            "Umgebungsvariablen:",
            "Cache-Management-Befehle",
            "CI/CD Cache-Integration"
          ]
        ],
        [
          "Netzwerkoptimierung",
          "netzwerkoptimierung",
          [
            "Registry-Konfiguration",
            "Registry-Auswahl optimieren:",
            "Verbindungsoptimierung:",
            "Bandbreitenverwaltung"
          ]
        ],
        [
          "Strategien für große Monorepos",
          "strategien-fuer-grosse-monorepos",
          [
            "Workspace-Segmentierung",
            "Große Workspaces organisieren:",
            "Selektive Verarbeitung:",
            "Inkrementelle Verarbeitung",
            "Gestaffelte Updates:",
            "Verarbeitungs-Workflows:"
          ]
        ],
        [
          "Speicher- und Ressourcenverwaltung",
          "speicher-und-ressourcenverwaltung",
          [
            "Speicher-Profiling",
            "Speicherverbrauch überwachen:",
            "Speicheroptimierungstechniken:",
            "Festplatten-I/O-Optimierung",
            "SSD vs HDD Konfigurationen:",
            "Dateisystem-Caching:"
          ]
        ],
        [
          "Performance-Monitoring",
          "performance-monitoring",
          [
            "Metriken-Sammlung",
            "Eingebaute Metriken:",
            "Benutzerdefiniertes Monitoring:",
            "Benchmarking",
            "Performance-Benchmarks:",
            "Performance-Tuning-Leitfaden",
            "Schritt-für-Schritt-Optimierung:",
            "Baseline-Messung",
            "Caching aktivieren",
            "Parallelität optimieren",
            "Netzwerkoptimierung",
            "Speicher-Tuning"
          ]
        ],
        [
          "Fehlerbehebung bei Performance-Problemen",
          "fehlerbehebung-bei-performance-problemen",
          [
            "Häufige Performance-Probleme",
            "Langsame Netzwerkanfragen:",
            "Speicherprobleme:",
            "Cache-Probleme:",
            "Erkennung von Performance-Regressionen",
            "Automatisierte Performance-Tests:"
          ]
        ],
        [
          "Umgebungsspezifische Optimierungen",
          "umgebungsspezifische-optimierungen",
          [
            "Lokale Entwicklung",
            "Entwicklermaschine-Setup:",
            "CI/CD-Umgebungen",
            "Optimierung für verschiedene CI-Anbieter:",
            "Produktionsbereitstellungen",
            "Produktionstaugliche Konfiguration:"
          ]
        ],
        [
          "Performance-Checkliste",
          "performance-checkliste",
          [
            "Schnelle Erfolge",
            "Persistentes Caching aktivieren: export PCU_CACHE_ENABLED=true",
            "Parallelität für Ihre Umgebung optimieren",
            "Geografisch nahe Registries verwenden",
            "Node.js Heap-Größe für große Projekte erhöhen",
            "Request-Komprimierung und Keep-Alive aktivieren",
            "Erweiterte Optimierungen",
            "CI/CD-Caching-Strategien implementieren",
            "Workspace-Segmentierung für große Monorepos konfigurieren",
            "Performance-Monitoring und Alerts einrichten",
            "Speicherverwaltung für dauerhafte Operationen optimieren",
            "Inkrementelle Verarbeitungs-Workflows implementieren",
            "Monitoring & Wartung",
            "Regelmäßiges Performance-Benchmarking",
            "Cache-Gesundheits-Monitoring",
            "Netzwerk-Latenz-Messung",
            "Speicherverbrauchs-Profiling",
            "Erkennung von Performance-Regressionen"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "Schnellstart",
          null,
          [
            "Starten Sie in wenigen Minuten mit pnpm-catalog-updates. Diese Anleitung führt Sie durch Installation, Initialisierung und Ihr erstes Dependency-Update. ",
            "pnpm-catalog-updates ist speziell für pnpm-Workspaces mit Katalog-Abhängigkeiten entwickelt.\nStellen Sie sicher, dass Sie einen pnpm-Workspace haben, bevor Sie beginnen."
          ]
        ],
        [
          "Installation",
          "installation",
          [
            "Wählen Sie Ihre bevorzugte Installationsmethode:"
          ]
        ],
        [
          "Initialisieren Sie Ihren Workspace",
          "initialisieren-sie-ihren-workspace",
          [
            "Wenn Sie noch keinen pnpm-Workspace haben, kann PCU einen für Sie erstellen:",
            "Dieser Befehl erstellt:",
            ".pcurc.json - PCU-Konfigurationsdatei",
            "package.json - Workspace-Root-package.json (falls fehlend)",
            "pnpm-workspace.yaml - PNPM-Workspace-Konfiguration (falls fehlend)",
            "packages/ - Verzeichnis für Workspace-Pakete (falls fehlend)"
          ]
        ],
        [
          "Ihre erste Update-Überprüfung",
          "ihre-erste-update-ueberpruefung",
          [
            "Überprüfen Sie veraltete Katalog-Abhängigkeiten:",
            "Dies zeigt Ihnen eine übersichtliche Tabelle mit:",
            "Aktuellen Versionen in Ihren Katalogen",
            "Neuesten verfügbaren Versionen",
            "Paketnamen und Update-Typen",
            "Farbcodierten Dringlichkeits-Indikatoren"
          ]
        ],
        [
          "Interaktive Updates",
          "interaktive-updates",
          [
            "Aktualisieren Sie Abhängigkeiten mit einer interaktiven Benutzeroberfläche:",
            "Dies ermöglicht Ihnen:",
            "✅ Auswahl der zu aktualisierenden Abhängigkeiten",
            "🎯 Auswahl spezifischer Versionen",
            "📊 Auswirkungsanalyse anzeigen",
            "🔒 Automatische Backups erstellen"
          ]
        ],
        [
          "Häufige Befehle",
          "haeufige-befehle",
          [
            "Hier sind die am häufigsten verwendeten Befehle:",
            "| Befehl     | Beschreibung             | Beispiel                   |\n| ---------- | ------------------------ | -------------------------- |\n| pcu init | Workspace initialisieren | pcu init --verbose       |\n| pcu -c   | Nach Updates suchen      | pcu -c --catalog default |\n| pcu -i   | Interaktive Updates      | pcu -i -b                |\n| pcu -u   | Abhängigkeiten updaten   | pcu -u --target minor    |\n| pcu -a   | Auswirkungen analysieren | pcu -a default react     |"
          ]
        ],
        [
          "Was kommt als Nächstes?",
          "was-kommt-als-naechstes",
          []
        ],
        [
          "Erste Schritte Checkliste",
          "erste-schritte-checkliste",
          [
            "Folgen Sie dieser Checkliste, um PCU in Ihrem Projekt zum Laufen zu bringen:",
            "PCU installieren - Wählen Sie globale Installation oder verwenden Sie npx",
            "Workspace initialisieren - Führen Sie pcu init für die erstmalige Einrichtung aus",
            "Nach Updates suchen - Verwenden Sie pcu -c, um verfügbare Updates zu sehen",
            "Einstellungen konfigurieren - Passen Sie .pcurc.json an Ihre Bedürfnisse an",
            "Abhängigkeiten aktualisieren - Verwenden Sie den interaktiven Modus pcu -i für sichere Updates",
            "Automatisierung einrichten - Erwägen Sie CI/CD-Integration für regelmäßige Überprüfungen"
          ]
        ],
        [
          "Schnellreferenz wichtiger Befehle",
          "schnellreferenz-wichtiger-befehle",
          [
            "| Befehl         | Zweck                | Wann zu verwenden                      |\n| -------------- | -------------------- | -------------------------------------- |\n| pcu init     | Workspace einrichten | Ersteinrichtung, neue Projekte         |\n| pcu -c       | Updates überprüfen   | Tägliche Entwicklung, CI-Überprüfungen |\n| pcu -i       | Interaktives Update  | Sichere manuelle Updates               |\n| pcu -u       | Batch-Update         | Automatisierte Updates, CI/CD          |\n| pcu security | Sicherheitsscan      | Vor Releases, regelmäßige Audits       |"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Sobald Sie PCU eingerichtet haben, erkunden Sie diese erweiterten Funktionen:",
            "Konfiguration - PCU für Ihren spezifischen Workflow anpassen",
            "Sicherheitsscan - Schwachstellenscan integrieren",
            "Monorepo-Verwaltung - Erweiterte Workspace-Funktionen",
            "CI/CD-Integration - Dependency-Updates in Ihrer Pipeline automatisieren"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "Fehlerbehebung",
          null,
          [
            "Häufige Probleme und Lösungen, um Ihnen bei der Lösung von Problemen mit PCU zu helfen. Finden Sie Antworten auf häufig auftretende Fehler und Debugging-Tipps. "
          ]
        ],
        [
          "Häufige Fehler",
          "haeufige-fehler",
          [
            "Workspace nicht gefunden",
            "Fehlermeldung:",
            "Ursache: PCU konnte keine pnpm-workspace.yaml-Datei finden oder keine gültige pnpm-Workspace-Struktur erkennen.",
            "Lösungen:",
            "Keine Katalog-Dependencies",
            "Fehlermeldung:",
            "Ursache: Ihr Workspace verwendet keine pnpm-Katalog-Dependencies.",
            "Lösungen:",
            "Registry-Zugriffsprobleme",
            "Fehlermeldung:",
            "Ursache: Netzwerk-Konnektivitätsprobleme oder Registry-Zugriffsprobleme.",
            "Lösungen:",
            "Authentifizierungsfehler",
            "Fehlermeldung:",
            "Ursache: Fehlende oder ungültige Authentifizierungs-Token für private Registries.",
            "Lösungen:",
            "Konfigurationsdatei-Fehler",
            "Fehlermeldung:",
            "Ursache: Fehlerhaftes JSON oder ungültige Konfigurationsoptionen.",
            "Lösungen:"
          ]
        ],
        [
          "Debugging",
          "debugging",
          [
            "Ausführliche Protokollierung aktivieren",
            "Workspace-Validierung"
          ]
        ],
        [
          "Performance-Probleme",
          "performance-probleme",
          [
            "Langsame Netzwerk-Requests",
            "Symptome: PCU benötigt lange Zeit zum Prüfen auf Updates",
            "Lösungen:",
            "Hoher Speicherverbrauch",
            "Symptome: PCU verbraucht übermäßigen Speicher bei großen Workspaces",
            "Lösungen:"
          ]
        ],
        [
          "Umgebungsprobleme",
          "umgebungsprobleme",
          [
            "Node.js-Versionskompatibilität",
            "Fehlermeldung:",
            "Lösungen:",
            "pnpm-Versionsprobleme",
            "Fehlermeldung:",
            "Lösungen:"
          ]
        ],
        [
          "Windows-spezifische Probleme",
          "windows-spezifische-probleme",
          [
            "Pfad-Trennzeichen-Probleme",
            "Fehlermeldung:",
            "Lösungen:",
            "Berechtigungsfehler",
            "Fehlermeldung:",
            "Lösungen:"
          ]
        ],
        [
          "Hilfe erhalten",
          "hilfe-erhalten",
          [
            "Diagnoseinformationen",
            "Beim Melden von Problemen diese Diagnoseinformationen einbeziehen:",
            "Support-Kanäle",
            "🐛 Bug-Reports: GitHub Issues",
            "💬 Fragen: GitHub Discussions",
            "📖 Dokumentation: Überprüfen Sie diese Dokumentation für detaillierte Anleitungen",
            "🔧 Feature-Requests: Verwenden Sie GitHub Issues mit dem Enhancement-Label",
            "Issue-Template",
            "Beim Melden von Bugs bitte einbeziehen:",
            "PCU-Version und verwendeter Befehl",
            "Fehlermeldung (vollständige Ausgabe mit --verbose)",
            "Umgebung (OS, Node.js, pnpm-Versionen)",
            "Workspace-Struktur (pnpm-workspace.yaml, package.json)",
            "Konfiguration (.pcurc.json, .npmrc falls relevant)",
            "Schritte zur Reproduktion des Problems",
            "Erwartetes vs. tatsächliches Verhalten"
          ]
        ],
        [
          "Security Command-Probleme",
          "security-command-probleme",
          [
            "Snyk-Integrationsprobleme",
            "Fehlermeldung:",
            "Ursache: Snyk CLI ist nicht installiert, aber --snyk-Flag wird verwendet.",
            "Lösungen:",
            "Security-Fix-Fehler",
            "Fehlermeldung:",
            "Ursache: Manche Schwachstellen erfordern manuelle Eingriffe oder Major-Version-Updates.",
            "Lösungen:",
            "Theme Command-Probleme",
            "Fehlermeldung:",
            "Ursache: Versuch, ein Theme zu setzen, das nicht existiert.",
            "Lösungen:",
            "Interaktiver Modus-Probleme",
            "Fehlermeldung:",
            "Ursache: PCU in einer nicht-interaktiven Umgebung ausführen (CI, Pipe, etc.).",
            "Lösungen:"
          ]
        ],
        [
          "Befehlsspezifische Probleme",
          "befehlsspezifische-probleme",
          [
            "Analyze Command-Probleme",
            "Fehlermeldung:",
            "Ursache: Analyse eines Pakets, das im angegebenen Katalog nicht existiert.",
            "Lösungen:",
            "Update Command-Fehler",
            "Fehlermeldung:",
            "Ursache: Dateiberechtigungsprobleme oder Workspace-Strukturprobleme.",
            "Lösungen:"
          ]
        ],
        [
          "Erweiterte Fehlerbehebung",
          "erweiterte-fehlerbehebung",
          [
            "Memory Leak-Untersuchung",
            "Symptome: PCU-Prozess-Speicher wächst kontinuierlich während des Betriebs",
            "Debug-Schritte:",
            "Registry-Antwort-Probleme",
            "Symptome: Inkonsistente Ergebnisse oder Timeout-Fehler",
            "Debug-Schritte:",
            "Konfigurationsvererbungs-Probleme",
            "Symptome: Konfiguration wird nicht wie erwartet angewendet",
            "Debug-Schritte:"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "高级写作功能",
          null,
          [
            "掌握让您的文档专业而有效的高级功能。了解元数据、引导段落、样式上下文，以及区分优秀文档和良好文档的最佳实践。 "
          ]
        ],
        [
          "元数据和SEO",
          "seo",
          [
            "每个页面都应在顶部包含元数据："
          ]
        ],
        [
          "引导段落",
          "",
          [
            "使用{{ className: 'lead' }}使介绍段落脱颖而出："
          ]
        ],
        [
          "样式上下文",
          "",
          [
            "not-prose类",
            "对需要脱离散文样式的组件使用<div className=\"not-prose\">："
          ]
        ],
        [
          "文档最佳实践",
          "",
          [
            "内容结构",
            "从元数据和清晰标题开始",
            "使用引导段落进行介绍",
            "使用适当的标题层次组织",
            "为重要信息添加Notes",
            "包含实用的代码示例",
            "以清晰的后续步骤结束",
            "写作风格",
            "使用主动语态",
            "简洁而完整",
            "为每个概念包含示例",
            "测试所有代码片段",
            "保持术语一致性",
            "组织方式",
            "将相关主题组合在一起",
            "大量使用交叉引用",
            "提供多个入口点",
            "考虑用户的使用旅程",
            "包含对搜索友好的标题"
          ]
        ],
        [
          "完整的文档工作流程",
          "",
          [
            "规划：概述您的内容结构",
            "写作：为每个部分使用适当的组件",
            "审查：检查完整性和准确性",
            "测试：验证所有示例都能工作",
            "迭代：基于反馈进行改进",
            "您现在拥有创建世界级文档所需的所有工具！"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "API-Dokumentation schreiben",
          null,
          [
            "Erstellen Sie umfassende API-Dokumentation, die Entwickler lieben. Lernen Sie, Properties für Parameter, Tags für HTTP-Methoden, Libraries für SDK-Präsentation und spezialisierte Komponenten zu verwenden, die API-Referenzen klar und umsetzbar machen. "
          ]
        ],
        [
          "Properties-Listen",
          "properties-listen",
          [
            "Dokumentieren Sie API-Parameter mit <Properties> und <Property>:",
            "Eindeutiger Bezeichner für die Ressource. Wird automatisch generiert, wenn die Ressource erstellt wird.",
            "Anzeigename der Ressource. Muss zwischen 1 und 100 Zeichen liegen.",
            "Gültige E-Mail-Adresse. Muss unter allen Benutzern eindeutig sein.",
            "ISO 8601-Zeitstempel, der angibt, wann die Ressource erstellt wurde."
          ]
        ],
        [
          "HTTP-Methoden-Tags",
          "http-methoden-tags",
          [
            "Tags werden automatisch basierend auf HTTP-Methoden eingefärbt:",
            "GET\nPOST\nPUT\nDELETE\nCUSTOM\nSUCCESS\nERROR"
          ]
        ],
        [
          "Libraries-Komponenten",
          "libraries-komponenten",
          [
            "Vollständiges Library-Raster",
            "Präsentieren Sie alle offiziellen SDKs mit der <Libraries>-Komponente:",
            "Einzelne Library",
            "Verwenden Sie die <Library>-Komponente, um einzelne Libraries anzuzeigen:",
            "Kompakte Libraries",
            "Für kleinere Räume verwenden Sie den kompakten Modus mit Beschreibungen:",
            "Oder ohne Beschreibungen für eine noch kompaktere Anzeige:",
            "Library-Komponenten-Optionen",
            "language: Wählen Sie aus php, ruby, node, python, go (Standard: node)",
            "compact: Verwenden Sie kleineres Styling (Standard: false)",
            "showDescription: Beschreibungstext anzeigen/ausblenden (Standard: true)",
            "Libraries-Anwendungsfälle",
            "<Libraries />: Vollständige SDK-Übersichtsseiten, Einstiegsabschnitte",
            "<Library />: Inline-Dokumentation, spezifische Sprachleitfäden",
            "<Library compact />: Sidebar-Referenzen, kompakte Auflistungen"
          ]
        ],
        [
          "API Best Practices",
          "api-best-practices",
          [
            "Dokumentieren Sie immer alle Parameter mit Properties-Komponenten",
            "Fügen Sie Beispiel-Requests und -Responses ein",
            "Verwenden Sie ordnungsgemäße HTTP-Statuscodes mit Tags",
            "Bieten Sie klare Fehlermeldungen",
            "Schließen Sie Authentifizierungsanforderungen ein",
            "Verwenden Sie Libraries-Komponente für SDK-Seiten",
            "Halten Sie Properties-Listen fokussiert und gut organisiert"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Vervollständigen Sie Ihre Dokumentationsreise mit Erweiterte Features."
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "Schreib-Grundlagen",
          null,
          [
            "Meistern Sie die grundlegenden Bausteine des Dokumentationsschreibens. Dieser Leitfaden behandelt Standard-Markdown-Syntax, Formatierungsoptionen und grundlegende Elemente, die Sie in jedem Dokument verwenden werden. "
          ]
        ],
        [
          "Markdown-Grundlagen",
          "markdown-grundlagen",
          [
            "Standard-Markdown-Formatierung wird vollständig unterstützt und bildet die Grundlage aller Dokumentation:",
            "Fetter Text für Betonung und WichtigkeitKursiver Text für subtile BetonungInline-Code für technische Begriffe, Befehle und kurze Code-Snippets",
            "Sie können diese kombinieren: fett und kursiv oder fett mit Code"
          ]
        ],
        [
          "Textformatierung",
          "textformatierung",
          [
            "Betonung und starker Text",
            "Verwenden Sie Sternchen oder Unterstriche für Betonung:",
            "Code und technische Begriffe",
            "Für Inline-Code, Variablen oder technische Begriffe verwenden Sie Backticks:"
          ]
        ],
        [
          "Listen und Organisation",
          "listen-und-organisation",
          [
            "Ungeordnete Listen",
            "Perfekt für Feature-Listen, Anforderungen oder beliebige nicht-sequenzielle Elemente:",
            "Hauptfunktion oder Punkt",
            "Ein weiterer wichtiger Punkt",
            "Dritte Überlegung",
            "Verschachtelter Unterpunkt",
            "Zusätzliches Unterdetail",
            "Zurück zur Hauptebene",
            "Geordnete Listen",
            "Verwenden Sie diese für Schritt-für-Schritt-Anleitungen, Verfahren oder priorisierte Elemente:",
            "Erster Schritt im Prozess",
            "Zweiter Schritt mit wichtigen Details",
            "Dritter Schritt",
            "Unterschritt mit spezifischen Anweisungen",
            "Ein weiterer Unterschritt",
            "Letzter Schritt",
            "Aufgabenlisten",
            "Großartig für Checklisten und Fortschrittsverfolgung:",
            "[x] Erledigte Aufgabe",
            "[x] Ein weiterer abgeschlossener Punkt",
            "[ ] Ausstehende Aufgabe",
            "[ ] Zukünftige Verbesserung"
          ]
        ],
        [
          "Links und Navigation",
          "links-und-navigation",
          [
            "Interne Links",
            "Verlinken Sie zu anderen Seiten in Ihrer Dokumentation:",
            "Beispiele:",
            "Befehlsreferenz-Leitfaden",
            "Fehlerbehebung",
            "SDK-Dokumentation",
            "Externe Links",
            "Verlinken Sie zu externen Ressourcen:",
            "Anker-Links",
            "Verlinken Sie zu spezifischen Abschnitten innerhalb von Seiten:"
          ]
        ],
        [
          "Überschriften und Struktur",
          "ueberschriften-und-struktur",
          [
            "Erstellen Sie eine klare Dokumenthierarchie mit ordnungsgemäßen Überschriftenebenen:",
            "Best Practices für Überschriften",
            "Verwenden Sie H1 nur für Seitentitel (wird von Metadaten verwaltet)",
            "Beginnen Sie Abschnitte mit H2, Unterabschnitte mit H3",
            "Überspringen Sie keine Überschriftenebenen (kein H2 → H4)",
            "Halten Sie Überschriften beschreibend und scannbar",
            "Verwenden Sie Satzbau: \"Erste Schritte\" nicht \"Erste Schritte\""
          ]
        ],
        [
          "Zitate und Hervorhebungen",
          "zitate-und-hervorhebungen",
          [
            "Blockzitate",
            "Für wichtige Zitate oder Referenzen:",
            "\"Dokumentation ist ein Liebesbrief, den Sie an Ihr zukünftiges Ich schreiben.\"— Damian Conway",
            "Wichtiger Hinweis: Dies ist ein hervorgehobenes Zitat mit zusätzlichem Kontext, das sich über mehrere Zeilen erstreckt und wichtige Informationen liefert.",
            "Mehrzeilige Zitate",
            "Dies ist der erste Absatz eines längeren Zitats.",
            "Dies ist der zweite Absatz, der den Gedanken mit zusätzlichen Details und Kontext fortsetzt."
          ]
        ],
        [
          "Horizontale Linien",
          "horizontale-linien",
          [
            "Trennen Sie Hauptabschnitte mit horizontalen Linien:",
            "Erstellt eine visuelle Trennung:"
          ]
        ],
        [
          "Tabellen",
          "tabellen",
          [
            "Einfache Tabellen für strukturierte Daten:",
            "| Feature     | Basic  | Pro       | Enterprise |\n| ----------- | ------ | --------- | ---------- |\n| Benutzer    | 10     | 100       | Unbegrenzt |\n| Speicher    | 1GB    | 10GB      | 100GB      |\n| API-Aufrufe | 1.000  | 10.000    | Unbegrenzt |\n| Support     | E-Mail | Priorität | 24/7 Phone |",
            "Tabellenausrichtung",
            "Spaltenausrichtung kontrollieren:",
            "| Linksbündig |  Zentriert  | Rechtsbündig |\n| :---------- | :---------: | -----------: |\n| Text        |    Text     |         Text |\n| Mehr Inhalt | Mehr Inhalt |  Mehr Inhalt |"
          ]
        ],
        [
          "Sonderzeichen",
          "sonderzeichen",
          [
            "Verwenden Sie Backslashes, um spezielle Markdown-Zeichen zu maskieren:"
          ]
        ],
        [
          "Zeilenumbrüche und Abstände",
          "zeilenumbrueche-und-abstaende",
          [
            "Beenden Sie Zeilen mit zwei Leerzeichen für harte Umbrüche",
            "Verwenden Sie leere Zeilen zur Trennung von Absätzen",
            "Verwenden Sie \\ am Zeilenende für Umbrüche in Listen"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Nachdem Sie diese Grundlagen gemeistert haben, erkunden Sie:",
            "Komponenten schreiben - Interaktive UI-Elemente",
            "Code schreiben - Code-Blöcke und Syntax-Highlighting",
            "Layout schreiben - Mehrspaltige Layouts und Organisation",
            "API schreiben - API-Dokumentationskomponenten",
            "Erweitert schreiben - Erweiterte Features und Best Practices",
            "Diese Grundlagen bilden das Fundament aller großartigen Dokumentation. Meistern Sie sie zuerst, dann bauen Sie darauf mit den erweiterten Komponenten und Techniken auf, die in den anderen Leitfäden behandelt werden."
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "Code schreiben",
          null,
          [
            "Meistern Sie die Kunst, Code in Ihrer Dokumentation zu präsentieren. Lernen Sie, Syntax-Highlighting zu verwenden, mehrsprachige Beispiele zu erstellen und Code-Blöcke effektiv zu organisieren, um Entwicklern beim Verstehen und Implementieren Ihrer Lösungen zu helfen. "
          ]
        ],
        [
          "Einzelne Code-Blöcke",
          "einzelne-code-bloecke",
          [
            "Grundlegende Code-Blöcke mit automatischem Syntax-Highlighting:",
            "Der obige JavaScript-Code-Block wird mit der folgenden MDX-Syntax erstellt:",
            "Python-Beispiel:",
            "Python Code-Block MDX-Syntax:",
            "Bash/Shell-Befehle:",
            "Bash Code-Block MDX-Syntax:"
          ]
        ],
        [
          "CodeGroup für mehrere Sprachen",
          "code-group-fuer-mehrere-sprachen",
          [
            "Verwenden Sie <CodeGroup>, um dasselbe Beispiel in verschiedenen Sprachen zu zeigen:",
            "Die obige mehrsprachige Code-Gruppe wird mit der folgenden MDX-Syntax erstellt:"
          ]
        ],
        [
          "API-Endpoint-Beispiele",
          "api-endpoint-beispiele",
          [
            "Für API-Dokumentation verwenden Sie HTTP-Methoden-Tags:",
            "Das obige API-Endpoint-Beispiel wird mit der folgenden MDX-Syntax erstellt, beachten Sie die tag- und label-Attribute:",
            "Code-Block-Titel",
            "Sie können auch Titel zu einzelnen Code-Blöcken hinzufügen:"
          ]
        ],
        [
          "Unterstützte Sprachen",
          "unterstuetzte-sprachen",
          [
            "Unsere Code-Blöcke unterstützen Syntax-Highlighting für viele Programmiersprachen, einschließlich aber nicht beschränkt auf:",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Shell-Skripte: bash, shell, sh",
            "Andere Sprachen: json, yaml, xml, sql, css, html, markdown, diff",
            "Beispiel:",
            "JSON Code-Block MDX-Syntax:",
            "Code-Vergleich (Diff):",
            "Diff Code-Block MDX-Syntax:"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "Geben Sie immer die Sprache für Syntax-Highlighting an",
            "Verwenden Sie beschreibende Titel, um Code-Beispiele zu unterscheiden",
            "Fügen Sie vollständige, ausführbare Beispiele ein",
            "Halten Sie Beispiele prägnant aber funktional",
            "Verwenden Sie konsistente Formatierung und Stil",
            "Ordnen Sie Sprach-Tabs in CodeGroup nach Verwendungshäufigkeit"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Fahren Sie fort mit Layout-Komponenten, um Ihren Inhalt effektiv zu organisieren."
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "Komponenten schreiben",
          null,
          [
            "Verbessern Sie Ihre Dokumentation mit interaktiven UI-Komponenten. Lernen Sie, Notes für wichtige Informationen, Buttons für Aktionen und andere Elemente zu verwenden, die Ihre Dokumentation ansprechender und funktionaler machen. "
          ]
        ],
        [
          "Notizen und Hinweise",
          "notizen-und-hinweise",
          [
            "Die <Note>-Komponente ist perfekt, um wichtige Informationen, Warnungen oder Tipps hervorzuheben, denen Leser besondere Aufmerksamkeit schenken sollten.",
            "Grundlegende Note-Verwendung",
            "Dies ist eine grundlegende Notiz-Komponente. Sie stylt Inhalte automatisch mit einem smaragdgrünen\nThema und Info-Icon, wodurch wichtige Informationen sich vom regulären Text abheben.",
            "Notizen mit umfangreichem Inhalt",
            "Notizen unterstützen vollständige Markdown-Formatierung, einschließlich fettem Text, kursivem Text, Inline-Code und sogar Links zu anderen Seiten.",
            "Wichtige Setup-Anforderung: Bevor Sie fortfahren, stellen Sie sicher, dass Sie haben: -\nNode.js Version 18 oder höher installiert - Zugriff auf das Projekt-Repository - Gültige\nAPI-Anmeldedaten konfiguriert Siehe den Befehlsreferenz-Leitfaden für die\nAnmeldedaten-Einrichtung.",
            "Mehrabsatz-Notizen",
            "Dies ist der erste Absatz einer längeren Notiz, die mehrere verwandte Informationsstücke enthält.",
            "Dieser zweite Absatz setzt den Gedanken mit zusätzlichem Kontext fort. Sie können so viele Absätze einschließen, wie nötig sind, um das Konzept vollständig zu erklären.",
            "Denken Sie daran, dass gute Notizen prägnant aber vollständig sind und gerade genug Informationen liefern, um Lesern die Wichtigkeit der Nachricht zu verdeutlichen."
          ]
        ],
        [
          "Buttons und Aktionen",
          "buttons-und-aktionen",
          [
            "Die <Button>-Komponente erstellt Call-to-Action-Elemente, die Benutzer zu wichtigen Links oder nächsten Schritten führen.",
            "Button-Varianten",
            "Gefüllte Buttons",
            "Verwenden Sie diese für primäre Aktionen und die wichtigsten Call-to-Actions:",
            "Über Code-Komponenten lernen",
            "Umriss-Buttons",
            "Perfekt für sekundäre Aktionen und alternative Pfade:",
            "Layout-Komponenten erkunden",
            "Text-Buttons",
            "Subtile Links, die sich in den Inhalt einfügen, aber trotzdem hervorstechen:",
            "Zurück zu den Grundlagen",
            "Button-Pfeile",
            "Buttons unterstützen Richtungspfeile zur Navigationskennzeichnung:",
            "Vorheriger Abschnitt",
            "Nächster Abschnitt",
            "Button Best Practices",
            "Sparsam verwenden: Zu viele Buttons reduzieren ihre Wirksamkeit",
            "Klare Aktionswörter: \"Loslegen\", \"Mehr erfahren\", \"Dokumentation anzeigen\"",
            "Logische Hierarchie: Gefüllt für primär, Umriss für sekundär, Text für tertiär",
            "Richtungspfeile: Links für \"zurück/vorherig\", rechts für \"vorwärts/nächster\"",
            "In not-prose einwickeln: Immer <div className=\"not-prose\"> Wrapper verwenden"
          ]
        ],
        [
          "Komponenten-Styling-Kontext",
          "komponenten-styling-kontext",
          [
            "Der not-prose Wrapper",
            "Einige Komponenten müssen dem Standard-Prosa-Styling entkommen. Wickeln Sie diese Komponenten immer ein:",
            "Komponenten, die not-prose benötigen:",
            "Alle <Button>-Komponenten",
            "Benutzerdefinierte Layout-Elemente",
            "Interaktive Widgets",
            "Komplex gestylte Komponenten",
            "Komponenten, die ohne not-prose funktionieren:",
            "<Note>-Komponenten (eigenständiges Styling)",
            "Standard-Markdown-Elemente",
            "Textbasierte Komponenten",
            "Mehrere Komponenten",
            "Bei der gemeinsamen Anzeige mehrerer Komponenten:",
            "API-Dokumentations-Leitfaden",
            "Erweiterte Features",
            "Grundlagen wiederholen"
          ]
        ],
        [
          "Komponenten-Zugänglichkeit",
          "komponenten-zugaenglichkeit",
          [
            "Alle Komponenten sind mit Blick auf Zugänglichkeit entwickelt:",
            "Semantisches HTML: Ordnungsgemäße Button- und Link-Elemente",
            "ARIA-Labels: Bildschirmleser-Unterstützung wo nötig",
            "Tastaturnavigation: Vollständige Tastatur-Zugänglichkeit",
            "Fokus-Management: Klare Fokus-Indikatoren",
            "Farbkontrast: WCAG-konforme Farbschemata"
          ]
        ],
        [
          "Wann jede Komponente zu verwenden ist",
          "wann-jede-komponente-zu-verwenden-ist",
          [
            "Verwenden Sie Notizen wenn:",
            "Kritische Informationen hervorgehoben werden",
            "Vor möglichen Problemen gewarnt wird",
            "Hilfreiche Tipps oder Kontext bereitgestellt wird",
            "Voraussetzungen oder Anforderungen erklärt werden",
            "Aufmerksamkeit auf wichtige Änderungen gelenkt wird",
            "Verwenden Sie Buttons wenn:",
            "Zu nächsten logischen Schritten geleitet wird",
            "Zu externen Ressourcen verlinkt wird",
            "Klare Call-to-Action-Momente erstellt werden",
            "Zwischen Hauptabschnitten navigiert wird",
            "Primäre Aktionen hervorgehoben werden",
            "Übernutzung vermeiden:",
            "Verwenden Sie nicht für jeden Absatz Notizen",
            "Begrenzen Sie Buttons auf 1-2 pro Abschnitt",
            "Reservieren Sie Komponenten für wirklich wichtige Inhalte",
            "Lassen Sie regulären Text und Markdown den meisten Inhalt tragen"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Nachdem Sie UI-Komponenten verstehen, erkunden Sie:",
            "Code schreiben - Syntax-Highlighting und Code-Blöcke",
            "Layout schreiben - Mehrspaltige Layouts und Organisation",
            "API schreiben - API-Dokumentationskomponenten",
            "Erweitert schreiben - Erweiterte Features und Metadaten",
            "Meistern Sie diese interaktiven Elemente, um Dokumentation zu erstellen, die nicht nur informiert, sondern auch effektiv führt und Ihre Leser einbindet."
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "Layout schreiben",
          null,
          [
            "Erstellen Sie anspruchsvolle Layouts, die Lesbarkeit und Benutzererfahrung verbessern. Lernen Sie, Row- und Col-Komponenten für mehrspaltige Designs, Sticky-Positionierung und effektive Inhaltsorganisation zu verwenden. "
          ]
        ],
        [
          "Zweispaltiges Layout",
          "zweispaltiges-layout",
          [
            "Verwenden Sie <Row> und <Col> für nebeneinander stehende Inhalte:",
            "Linke Spalte",
            "Dieser Inhalt erscheint in der linken Spalte. Perfekt für Erklärungen, Beschreibungen oder ergänzende Informationen.",
            "Wichtiger Punkt eins",
            "Wichtiges Detail",
            "Zusätzlicher Kontext",
            "Rechte Spalte"
          ]
        ],
        [
          "Sticky-Spalten-Layout",
          "sticky-spalten-layout",
          [
            "Lassen Sie Inhalte beim Scrollen haften:",
            "Scrollender Inhalt",
            "Dies ist regulärer Inhalt, der normal scrollt. Sie können hier lange Erklärungen platzieren, durch die Benutzer scrollen werden, um sie vollständig zu lesen.",
            "Diese Spalte enthält die Haupterzählung oder detaillierte Informationen, die Scrollen erfordern, um vollständig konsumiert zu werden.",
            "Sticky-Referenz",
            "Dies bleibt beim Scrollen sichtbar."
          ]
        ],
        [
          "Guides-Komponente",
          "guides-komponente",
          [
            "Zeigen Sie ein Raster von Leitfaden-Links mit der <Guides>-Komponente an:",
            "Die Guides-Komponente zeigt einen vordefinierten Satz von Dokumentationsleitfäden mit Links und Beschreibungen. Perfekt für Übersichtsseiten und Einstiegsabschnitte."
          ]
        ],
        [
          "Resources-Komponente",
          "resources-komponente",
          [
            "Präsentieren Sie Hauptressourcen-Kategorien mit animierten Karten:",
            "Die Resources-Komponente zeigt animierte Ressourcenkarten mit Icons und Beschreibungen. Großartig für Haupt-Landing-Pages und API-Übersichtsabschnitte."
          ]
        ],
        [
          "Icons",
          "icons",
          [
            "Verwenden Sie einzelne Icons für Inline-Dekoration oder benutzerdefinierte Layouts:",
            "Verfügbare Icons",
            "<UserIcon /> - Einzelner Benutzer",
            "<UsersIcon /> - Mehrere Benutzer",
            "<EnvelopeIcon /> - Nachrichten/E-Mail",
            "<ChatBubbleIcon /> - Unterhaltungen",
            "<BookIcon /> - Dokumentation",
            "<CheckIcon /> - Erfolg/Vervollständigung",
            "<BellIcon /> - Benachrichtigungen",
            "<CogIcon /> - Einstellungen/Konfiguration"
          ]
        ],
        [
          "Layout Best Practices",
          "layout-best-practices",
          [
            "Verwenden Sie zweispaltige Layouts für ergänzende Inhalte",
            "Sticky-Spalten funktionieren am besten für Referenzmaterial",
            "Halten Sie Spalten in der Inhaltslänge ausgewogen",
            "Stellen Sie Mobile-Responsivität sicher (Spalten stapeln sich auf kleinen Bildschirmen)",
            "Verwenden Sie Guides für Dokumentationsübersichtsseiten",
            "Verwenden Sie Resources für API-Kategorie-Showcases",
            "Icons funktionieren gut mit benutzerdefinierten Tailwind-Klassen für Farben und Größen"
          ]
        ],
        [
          "Nächste Schritte",
          "naechste-schritte",
          [
            "Fahren Sie fort mit API-Dokumentation für spezialisierte Komponenten."
          ]
        ]
      ]
    }
  ],
  "en": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "AI Analysis",
          null,
          [
            "PCU integrates with AI CLI tools to provide intelligent dependency analysis, security assessments, and update recommendations. "
          ]
        ],
        [
          "Overview",
          "overview",
          [
            "AI analysis enhances PCU's capabilities by providing:",
            "Impact Analysis: Understand how updates affect your codebase",
            "Security Assessment: Get AI-powered security vulnerability analysis",
            "Compatibility Checking: Detect potential breaking changes",
            "Update Recommendations: Receive intelligent suggestions for safe updates"
          ]
        ],
        [
          "Supported AI Providers",
          "supported-ai-providers",
          [
            "PCU automatically detects and uses available AI CLI tools in the following priority order:",
            "| Provider | Priority | Capabilities                                     |\n| -------- | -------- | ------------------------------------------------ |\n| Gemini   | 100      | Impact, Security, Compatibility, Recommendations |\n| Claude   | 80       | Impact, Security, Compatibility, Recommendations |\n| Codex    | 60       | Impact, Compatibility, Recommendations           |\n| Cursor   | 40       | Impact, Recommendations                          |",
            "If no AI providers are available, PCU automatically falls back to a rule-based analysis engine\nthat provides basic dependency analysis using predefined rules."
          ]
        ],
        [
          "Commands",
          "commands",
          [
            "Check Available AI Providers",
            "View which AI tools are available on your system:",
            "This command displays:",
            "Available AI CLI tools detected on your system",
            "Version information for each provider",
            "The best available provider that will be used for analysis",
            "AI Command Options",
            "Show status of all AI providers (default behavior)",
            "Test AI analysis with a sample request to verify provider connectivity",
            "Show AI analysis cache statistics including hit rate and size",
            "Clear the AI analysis cache to free up space or reset cached responses",
            "AI-Powered Update",
            "Update dependencies with AI-powered analysis:",
            "The AI-enhanced update provides:",
            "Intelligent risk assessment for each update",
            "Breaking change detection with explanations",
            "Security vulnerability identification",
            "Recommended update order",
            "AI-Powered Analysis",
            "Analyze a specific package update with AI assistance:",
            "The analyze command uses the default catalog by default. You can specify a different catalog\nas the first argument: pcu analyze my-catalog react"
          ]
        ],
        [
          "Analysis Types",
          "analysis-types",
          [
            "Impact Analysis",
            "Evaluates how a dependency update will affect your project:",
            "Identifies all workspace packages using the dependency",
            "Analyzes API changes between versions",
            "Estimates migration effort required",
            "Suggests testing focus areas",
            "Security Analysis",
            "Provides security-focused assessment:",
            "Identifies known vulnerabilities in current version",
            "Checks for security fixes in new version",
            "Evaluates security-sensitive package updates",
            "Recommends security best practices",
            "Compatibility Analysis",
            "Checks for potential compatibility issues:",
            "Detects breaking API changes",
            "Identifies peer dependency conflicts",
            "Checks Node.js version compatibility",
            "Validates TypeScript compatibility",
            "Recommendations",
            "Generates actionable recommendations:",
            "Suggests optimal update order",
            "Recommends version ranges",
            "Identifies packages to update together",
            "Provides rollback strategies"
          ]
        ],
        [
          "Fallback Behavior",
          "fallback-behavior",
          [
            "When AI providers are unavailable, PCU uses a built-in rule-based analysis engine:",
            "Rule-Based Analysis Features",
            "Version Jump Assessment: Evaluates risk based on semver changes",
            "Known Breaking Patterns: Detects breaking changes for popular packages (React, TypeScript, ESLint, etc.)",
            "Security-Sensitive Packages: Flags security-related packages for careful review",
            "Effort Estimation: Provides migration effort estimates",
            "Risk Levels",
            "| Level    | Description                                          |\n| -------- | ---------------------------------------------------- |\n| Low      | Patch updates, typically safe to apply               |\n| Medium   | Minor updates or large minor version jumps           |\n| High     | Major version updates with breaking changes          |\n| Critical | Multiple major version jumps or pre-release versions |"
          ]
        ],
        [
          "Configuration",
          "configuration",
          [
            "Environment Variables",
            "Custom path to Gemini CLI executable",
            "Custom path to Claude CLI executable",
            "Custom path to Codex CLI executable",
            "Custom path to Cursor CLI executable",
            "Detection Methods",
            "PCU uses multiple strategies to detect AI providers:",
            "Environment Variables: Check custom path variables",
            "PATH Lookup: Use which command to find executables",
            "Known Paths: Check common installation locations",
            "Application Paths: Check for GUI applications (e.g., Cursor.app)"
          ]
        ],
        [
          "Usage Examples",
          "usage-examples",
          [
            "Safe Update Workflow",
            "CI/CD Integration",
            "Batch Analysis"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "When to Use AI Analysis",
            "Major Version Updates: Always use AI analysis for major version bumps",
            "Security-Sensitive Packages: Use for auth, crypto, and session packages",
            "Large Codebases: AI helps identify affected areas across monorepos",
            "Breaking Change Detection: AI provides detailed breaking change explanations",
            "Performance Considerations",
            "AI analysis adds processing time compared to standard updates",
            "Use --dry-run to preview AI recommendations without applying changes",
            "Consider using rule-based fallback for faster CI/CD pipelines when AI is not critical",
            "Combining with Other Features"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "Best Practices",
          null,
          [
            "Learn how to use PCU effectively in team environments, enterprise workflows, and production systems. "
          ]
        ],
        [
          "Team Collaboration",
          "team-collaboration",
          [
            "Shared Configuration",
            "Keep your PCU configuration consistent across team members by committing your .pcurc.json to version control:",
            "Code Review Guidelines",
            "Pre-Review Checklist:",
            "Run pcu check --dry-run to preview changes",
            "Verify no breaking changes in major version updates",
            "Test critical functionality after dependency updates",
            "Review CHANGELOG files for updated packages",
            "Review Process:",
            "Security First: Always review security-related dependency updates immediately",
            "Batch Related Updates: Group related packages (e.g., React ecosystem) in single PRs",
            "Document Reasons: Include rationale for version pinning or exclusions",
            "Test Coverage: Ensure adequate testing before merging dependency updates",
            "Communication Standards",
            "Use clear commit messages when updating dependencies:"
          ]
        ],
        [
          "Enterprise Usage",
          "enterprise-usage",
          [
            "Governance and Compliance",
            "Dependency Approval Process:",
            "Security Scanning: All updates must pass security audits",
            "License Compliance: Verify license compatibility with internal policies",
            "Stability Requirements: Prefer LTS versions in production environments",
            "Change Management: Follow established change approval processes",
            "Configuration for Enterprise:",
            "Private Registry Integration",
            "Configure PCU for corporate environments with private registries:",
            "Environment Variables:",
            "Audit Trail and Reporting",
            "Maintain comprehensive records of dependency changes:"
          ]
        ],
        [
          "Release Workflows",
          "release-workflows",
          [
            "Semantic Versioning Integration",
            "Align dependency updates with your release cycle:",
            "Pre-Release Phase:",
            "Release Preparation:",
            "Post-Release:",
            "Staging Environment Testing",
            "Pre-Production Validation:"
          ]
        ],
        [
          "Security Best Practices",
          "security-best-practices",
          [
            "Vulnerability Management",
            "Immediate Response PCU:",
            "Critical/High Severity: Update within 24 hours",
            "Moderate Severity: Update within 1 week",
            "Low Severity: Include in next regular update cycle",
            "Dependency Validation",
            "Security Configuration:",
            "Manual Security Reviews:",
            "Review all new dependencies before first use",
            "Audit package maintainers and download counts",
            "Verify package authenticity and signatures",
            "Check for known security issues in dependency chains",
            "Access Control",
            "Token Management:"
          ]
        ],
        [
          "Performance Optimization",
          "performance-optimization",
          [
            "Caching Strategies",
            "Local Development:",
            "CI/CD Optimization:",
            "Large Monorepo Handling",
            "Configuration for 100+ Packages:",
            "Selective Processing:",
            "Network Optimization",
            "Registry Configuration:"
          ]
        ],
        [
          "Error Handling and Recovery",
          "error-handling-and-recovery",
          [
            "Common Error Resolution",
            "Network Issues:",
            "Memory Issues:",
            "Backup and Recovery",
            "Create Backups Before Major Updates:",
            "Version Rollback Strategy:",
            "Monitoring and Alerting",
            "CI/CD Integration:"
          ]
        ],
        [
          "Integration Patterns",
          "integration-patterns",
          [
            "IDE and Editor Integration",
            "VS Code Configuration:",
            "Automation Scripts",
            "Package.json Scripts:",
            "Git Hooks Integration:"
          ]
        ],
        [
          "Quick Reference Checklist",
          "quick-reference-checklist",
          [
            "Daily Workflow",
            "Check for security updates: pcu security",
            "Review outdated dependencies: pcu check --limit 10",
            "Update patch versions: pcu update --target patch",
            "Weekly Workflow",
            "Comprehensive dependency check: pcu check",
            "Update minor versions: pcu update --target minor --interactive",
            "Review and update exclusion rules",
            "Generate dependency reports for team review",
            "Monthly Workflow",
            "Review major version updates: pcu check --target latest",
            "Update development dependencies: pcu update --dev",
            "Audit dependency licenses and compliance",
            "Review and optimize PCU configuration",
            "Clean up unused dependencies",
            "Before Releases",
            "Run full dependency audit: pcu security --comprehensive",
            "Create backup: pcu update --create-backup",
            "Test in staging environment",
            "Generate release notes with dependency changes"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "CI/CD Integration",
          null,
          [
            "Integrate PCU into your continuous integration and deployment pipelines. PCU can seamlessly integrate with existing CI/CD workflows, supporting GitHub Actions, GitLab CI, Jenkins, Azure DevOps, and other platforms. "
          ]
        ],
        [
          "GitHub Actions Integration",
          "git-hub-actions-integration",
          [
            "Basic Dependency Check Workflow"
          ]
        ],
        [
          "GitLab CI Integration",
          "git-lab-ci-integration",
          [
            "GitLab CI pipeline for PCU dependency management:"
          ]
        ],
        [
          "Jenkins Pipeline Integration",
          "jenkins-pipeline-integration",
          [
            "Enterprise-grade Jenkins pipeline for dependency management:"
          ]
        ],
        [
          "Azure DevOps Pipeline",
          "azure-dev-ops-pipeline",
          [
            "Azure DevOps pipeline for PCU integration:"
          ]
        ],
        [
          "General CI/CD Best Practices",
          "general-ci-cd-best-practices",
          [
            "Environment Variable Configuration",
            "Configure these environment variables across all CI/CD platforms to optimize PCU behavior:",
            "CI Mode Flag",
            "PCU includes a dedicated --ci flag for seamless integration with CI/CD pipelines:",
            "Key behaviors when --ci flag is enabled:",
            "Non-interactive execution: All prompts are skipped automatically",
            "Sensible defaults: Uses optimal defaults for CI environments",
            "No color output: Automatically disables colored output for better log compatibility",
            "JSON-friendly: Works well with --format json for programmatic parsing",
            "Example GitHub Actions workflow using --ci flag:",
            "Comparison: With vs Without CI Mode",
            "| Scenario | Without --ci | With --ci |\n|----------|----------------|-------------|\n| Missing options | Prompts user interactively | Uses sensible defaults |\n| Output format | Colored tables by default | Plain text, no colors |\n| Error handling | Interactive error messages | Exit codes for automation |\n| Progress display | Animated progress bars | Minimal progress indicators |",
            "Security Considerations",
            "Access Token Management",
            "Ensure secure management of access tokens in CI/CD environments:",
            "Branch Protection Strategy",
            "Configure branch protection to prevent direct pushes to main branch:",
            "Require pull request reviews",
            "Require status checks to pass",
            "Restrict pushes to protected branches",
            "Require signed commits",
            "Troubleshooting",
            "Common CI/CD Issues",
            "Permission Errors",
            "Cache Issues",
            "Network Timeouts",
            "Monitoring and Reporting",
            "Creating Dashboards",
            "Use CI/CD platform native features to create dependency management dashboards:",
            "GitHub Actions: Use Action insights and dependency graphs",
            "GitLab CI: Leverage Security Dashboard and dependency scanning",
            "Jenkins: Configure HTML Publisher plugin",
            "Azure DevOps: Use Dashboards and Analytics",
            "Notification Configuration",
            "Set up appropriate notifications to keep teams informed:"
          ]
        ],
        [
          "Docker Integration",
          "docker-integration",
          [
            "Containerized PCU Workflows",
            "These CI/CD integration examples provide comprehensive automated dependency management solutions, ensuring your projects stay up-to-date and secure."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "Command Reference",
          null,
          [
            "Complete reference for all PCU commands and options. Learn about every command, flag, and configuration option available. "
          ]
        ],
        [
          "Command Overview",
          "command-overview",
          [
            "PCU's primary automation contract is plan → apply → verify → rollback. Interactive and advisory\ncommands remain available for human-driven exploration.",
            "| Full Command    | Shortcuts & Aliases | Description                                     |\n| --------------- | ------------------- | ----------------------------------------------- |\n| pcu plan      | -                   | Create a portable, reviewable JSON update plan  |\n| pcu apply     | -                   | Apply a plan if its source fingerprint matches  |\n| pcu verify    | -                   | Verify exact catalog state against a plan       |\n| pcu init      | pcu i             | Initialize PNPM workspace and PCU configuration |\n| pcu check     | pcu chk, pcu -c, pcu --check | Check for outdated catalog dependencies         |\n| pcu update    | pcu u, pcu -u, pcu --update  | Update catalog dependencies                     |\n| pcu analyze   | pcu a, pcu -a, pcu --analyze | Analyze impact of dependency updates            |\n| pcu ai        | -                   | Check AI provider status and manage AI cache    |\n| pcu workspace | pcu w, pcu -s, pcu --workspace-info | Show workspace information and validation       |\n| pcu theme     | pcu t, pcu -t, pcu --theme          | Configure color themes and UI settings          |\n| pcu security  | pcu sec           | Security vulnerability scanning and fixes       |\n| pcu rollback  | -                   | Rollback catalog updates to a previous state    |\n| pcu help      | pcu h, pcu -h   | Display help information                        |"
          ]
        ],
        [
          "Deterministic workflow",
          "deterministic-workflow",
          [
            "pcu plan",
            "Creates schema-versioned JSON. Output is always printed to stdout; --out <file> also writes the\nsame artifact to disk.",
            "| Option | Description |\n| --- | --- |\n| -t, --target <type> | latest, greatest, minor, patch, or newest |\n| --catalog <name> | Limit discovery to one catalog |\n| --include <patterns...> | Include matching packages |\n| --exclude <patterns...> | Exclude matching packages |\n| --prerelease | Include prerelease versions |\n| --security | Opt into security advisory lookups while planning |\n| -o, --out <file> | Also save the artifact to a file |",
            "The plan excludes timestamps, localized reason text, and absolute paths. If\npnpm-workspace.yaml changes while registry discovery is running, planning fails instead of\npublishing an inconsistent artifact.",
            "pcu apply <plan-file>",
            "Validates the artifact and its SHA-256 source fingerprint before writing. It makes a backup by\ndefault, applies through the atomic workspace repository, then verifies every target version.",
            "| Option | Description |\n| --- | --- |\n| --force | Apply a reviewed plan that records conflicts |\n| --no-backup | Skip the normal rollback backup |\n| --install | Run pnpm install after catalog changes |",
            "apply never queries the registry or calls AI. Reapplying an already-satisfied plan returns a\nsuccessful no-op.",
            "pcu verify <plan-file>",
            "Compares each planned target version with the current catalog and returns a structured mismatch list.",
            "pcu rollback --from <backup-file> --yes --json",
            "Restores the exact update.backupPath returned by apply, creates a pre-restore safety backup, and\nreturns structured YAML/catalog verification. The backup must belong to the selected workspace.\nUse --latest --yes --json when selecting the newest backup is intentional.",
            "Workflow exit codes",
            "| Code | Meaning |\n| ---: | --- |\n| 0 | Success, including an already-applied plan |\n| 2 | Invalid input or execution/install failure |\n| 3 | Stale plan or source changed during planning |\n| 4 | Verification drift |\n| 5 | Unresolved conflicts |",
            "Special Shortcuts",
            "| Shortcut               | Equivalent Command         | Description                            |\n| ---------------------- | -------------------------- | -------------------------------------- |\n| pcu -i               | pcu update --interactive | Interactive update mode                |\n| pcu --security-audit | pcu security             | Run security scan                      |\n| pcu --security-fix   | pcu security --fix-vulns | Run security scan with automatic fixes |"
          ]
        ],
        [
          "Hybrid Mode",
          "hybrid-mode",
          [
            "PCU features Hybrid Mode - when you run any command without flags, it automatically enters interactive mode to guide you through the options. This provides a seamless experience where you can use flags for automation or skip flags for guided prompts.",
            "How It Works",
            "Supported Commands",
            "Hybrid Mode is available for all 11 main commands:",
            "| Command        | Interactive Options                                      |\n| -------------- | -------------------------------------------------------- |\n| pcu check    | format, target, catalog, filter patterns, prerelease     |\n| pcu update   | catalog, format, target, interactive, dry-run, force, backup, prerelease, AI |\n| pcu analyze  | catalog selection, package name, target version          |\n| pcu workspace| format, validation, statistics                           |\n| pcu theme    | theme selection, progress style, preview                 |\n| pcu security | format, severity filter, fix options, dev dependencies   |\n| pcu init     | template, framework options, workspace creation          |\n| pcu ai       | provider status, test, cache operations                  |\n| pcu rollback | backup selection, confirmation                           |",
            "Benefits",
            "Beginner-Friendly: New users can explore options without reading documentation",
            "Automation-Ready: Scripts and CI/CD can use flags for predictable behavior",
            "Discoverable: Interactive prompts help users discover available options",
            "Flexible: Choose your preferred workflow on a per-command basis"
          ]
        ],
        [
          "pcu init - Initialize Workspace",
          "pcu-init-initialize-workspace",
          [
            "Initialize a complete PNPM workspace environment with PCU configuration.",
            "Options",
            "Overwrite existing configuration file without confirmation",
            "Generate comprehensive configuration with all available options",
            "Launch interactive configuration wizard with guided setup",
            "Configuration template: minimal, standard, full, monorepo, enterprise",
            "Create PNPM workspace structure if missing",
            "Skip creating PNPM workspace structure",
            "Directory name for workspace packages",
            "Include common package rules in configuration",
            "Add TypeScript-specific package rules and settings",
            "Add React ecosystem package rules",
            "Add Vue ecosystem package rules",
            "Output format: table, json, yaml, minimal",
            "Workspace directory (default: current directory)",
            "Show detailed information and progress",
            "Configuration Templates",
            "PCU provides pre-configured templates for common project types:",
            "Template Types",
            "minimal - Basic configuration with essential settings only",
            "standard - Balanced configuration suitable for most projects",
            "full - Comprehensive configuration with all available options",
            "monorepo - Optimized for large monorepos with advanced features",
            "enterprise - Enterprise-ready with security and governance features",
            "Interactive Configuration Wizard",
            "The interactive mode (--interactive) provides a guided setup experience:",
            "Wizard Features",
            "Project Detection: Automatically detects project type (React, Vue, TypeScript)",
            "Workspace Structure: Discovers existing packages and suggests optimal configuration",
            "Package Rule Setup: Interactive selection of package rules and update strategies",
            "Registry Configuration: Setup for custom NPM registries and authentication",
            "Performance Tuning: Optimize settings based on project size and requirements",
            "Theme Selection: Choose color themes and progress bar styles",
            "Validation Setup: Configure quality gates and safety checks",
            "Wizard Flow",
            "Project Analysis: Scans existing files to understand project structure",
            "Template Selection: Recommends appropriate templates based on analysis",
            "Package Rules: Interactive setup of package-specific update strategies",
            "Advanced Settings: Optional configuration of caching, performance, and UI settings",
            "Validation: Pre-flight checks and configuration validation",
            "Files Creation: Creates all necessary files with confirmation",
            "Files and Directories Created",
            "Core Files",
            "Main configuration file with all PCU settings",
            "Workspace root package.json (created if missing)",
            "PNPM workspace configuration (created if missing)",
            "Directory Structure",
            "Default directory for workspace packages (customizable)",
            "Created for monorepo template - application packages",
            "Created for monorepo template - development tools",
            "Created for enterprise template - documentation",
            "Template-Specific Files",
            "Node version specification (enterprise template)",
            "Enhanced with PCU-specific patterns (if missing)",
            "TypeScript configuration (with --typescript flag)",
            "Advanced Initialization",
            "Framework-Specific Setup",
            "Custom Workspace Structure",
            "Validation and Health Checks",
            "The init command performs comprehensive validation:",
            "Pre-Initialization Checks",
            "Directory Permissions: Ensures write access to workspace directory",
            "PNPM Installation: Verifies PNPM is installed and accessible",
            "Existing Configuration: Detects and offers to merge existing configurations",
            "Git Repository: Checks if directory is a git repository",
            "Post-Initialization Validation",
            "Configuration Syntax: Validates generated configuration files",
            "Workspace Structure: Ensures PNPM workspace is properly configured",
            "Package Discovery: Verifies PCU can discover workspace packages",
            "Dependency Analysis: Basic health check of existing dependencies",
            "Usage Examples",
            "Quick Start",
            "Initializes with standard template using automatic project detection.",
            "Interactive Setup",
            "Launches the full configuration wizard with guided setup.",
            "Monorepo Initialization",
            "Creates enterprise-ready monorepo with TypeScript support and detailed output.",
            "Custom Enterprise Setup",
            "Interactive enterprise setup that overwrites existing configuration."
          ]
        ],
        [
          "pcu check - Check for Updates",
          "pcu-check-check-for-updates",
          [
            "Check for outdated dependencies in your pnpm workspace catalogs.",
            "Options",
            "Check specific catalog only",
            "Output format: table, json, yaml, minimal",
            "Update target: latest, greatest, minor, patch, newest",
            "Include prerelease versions",
            "Include packages matching pattern",
            "Exclude packages matching pattern",
            "Output Formats",
            "table: Rich table format with colors and details",
            "minimal: Simple npm-check-updates style (package → version)",
            "json: JSON output for programmatic use",
            "yaml: YAML output for configuration files"
          ]
        ],
        [
          "pcu update - Update Dependencies",
          "pcu-update-update-dependencies",
          [
            "Update catalog dependencies to newer versions.",
            "Options",
            "Interactive mode to choose updates",
            "Preview changes without writing files",
            "Update target: latest, greatest, minor, patch, newest",
            "Update specific catalog only",
            "Force updates even if risky",
            "Create backup files before updating",
            "Include packages matching pattern (can be used multiple times)",
            "Exclude packages matching pattern (can be used multiple times)",
            "Include prerelease versions in updates",
            "Output format: table, json, yaml, minimal",
            "Number of packages to process in parallel",
            "Skip packages with peer dependency conflicts",
            "Require confirmation for major version updates",
            "Interactive Features",
            "The interactive mode (--interactive or -i) provides advanced package selection capabilities:",
            "Package Selection Interface",
            "Multi-select with checkboxes for individual package updates",
            "Search functionality to filter packages by name or description",
            "Batch operations to select/deselect multiple packages",
            "Update strategy selection for each package (latest, greatest, minor, patch)",
            "Smart Conflict Resolution",
            "Peer dependency detection with resolution suggestions",
            "Breaking change warnings based on semantic versioning analysis",
            "Impact analysis showing affected workspace packages",
            "Rollback capabilities if updates cause issues",
            "Progress Tracking",
            "Real-time progress bars with multiple visual styles",
            "Batch processing status showing completed/pending updates",
            "Error recovery with skip/retry options for failed updates",
            "Success confirmation with summary of all changes made",
            "Advanced Update Strategies",
            "Usage Examples",
            "Safe Interactive Update",
            "Updates dependencies interactively with automatic backups, limiting to minor version bumps only.",
            "Production-Safe Update",
            "Shows what would be updated in production dependencies, requiring confirmation for major updates.",
            "Framework-Specific Updates",
            "Updates React ecosystem packages including TypeScript definitions, allowing prerelease versions."
          ]
        ],
        [
          "pcu analyze - Impact Analysis",
          "pcu-analyze-impact-analysis",
          [
            "Analyze the impact of updating a specific dependency to understand potential breaking changes and affected packages.",
            "Arguments",
            "Catalog name (e.g., 'default', 'react17')",
            "Package name (e.g., 'react', '@types/node')",
            "New version (optional, defaults to latest)",
            "Options",
            "Output format: table, json, yaml, minimal",
            "Analysis Information",
            "The analyze command provides:",
            "Dependencies affected by the update",
            "Breaking changes detected between versions",
            "Workspace packages that use this dependency",
            "Update recommendations and risk assessment",
            "Version compatibility analysis",
            "Usage Examples",
            "Analyze Latest Version Impact",
            "Analyzes the impact of updating React to the latest version in the default catalog.",
            "Analyze Specific Version",
            "Analyzes the impact of updating TypeScript to version 5.0.0.",
            "JSON Output for Automation",
            "Outputs analysis results as JSON for programmatic processing."
          ]
        ],
        [
          "pcu workspace - Workspace Info",
          "pcu-workspace-workspace-info",
          [
            "Show workspace information and validation with comprehensive workspace analysis.",
            "Options",
            "Validate workspace configuration and structure",
            "Show detailed workspace statistics",
            "Output format: table, json, yaml, minimal",
            "Output Information",
            "Basic Info Mode (default)",
            "Workspace name and path",
            "Total package count",
            "Number of catalogs",
            "List of catalog names",
            "Validation Mode (--validate)",
            "Configuration file validation",
            "Workspace structure validation",
            "Package.json consistency checks",
            "Catalog integrity verification",
            "Exit codes: 0 (valid), 1 (issues found)",
            "Statistics Mode (--stats)",
            "Detailed package breakdown",
            "Dependency analysis",
            "Catalog usage statistics",
            "Workspace health metrics",
            "Usage Examples",
            "Basic Workspace Information",
            "Displays workspace name, path, package count, and available catalogs.",
            "Comprehensive Validation",
            "Validates workspace configuration and structure, exits with appropriate code.",
            "Detailed Statistics",
            "Shows detailed workspace statistics in JSON format.",
            "Combined Analysis",
            "Performs validation and shows statistics together."
          ]
        ],
        [
          "pcu security - Security Vulnerability Scanning",
          "pcu-security-security-vulnerability-scanning",
          [
            "Comprehensive security vulnerability scanning using npm audit and optional Snyk integration, with automated fix capabilities.",
            "Options",
            "Perform npm audit scan (enabled by default)",
            "Automatically fix vulnerabilities using npm audit fix",
            "Filter by severity level: low, moderate, high, critical",
            "Include development dependencies in vulnerability scan",
            "Include Snyk security scan (requires snyk CLI installation)",
            "Automatically apply security fixes without confirmation",
            "Output format: table, json, yaml, minimal",
            "Workspace directory path (defaults to current directory)",
            "Show detailed vulnerability information and remediation steps",
            "Security Report Features",
            "The security command provides comprehensive vulnerability analysis:",
            "Multi-Scanner Integration: Combines npm audit and Snyk for thorough coverage",
            "Severity Classification: Categorizes vulnerabilities as critical, high, moderate, low, and info",
            "Automated Remediation: Applies security patches automatically with --fix-vulns",
            "Package Recommendations: Suggests specific version updates to resolve vulnerabilities",
            "Development Dependencies: Optional inclusion/exclusion of dev dependencies",
            "CWE/CVE Information: Detailed vulnerability identifiers and descriptions",
            "Exit Codes: Returns appropriate codes (0 for clean, 1 for vulnerabilities found)",
            "CI/CD Ready: JSON output and non-interactive mode for automation",
            "Usage Examples",
            "Basic Vulnerability Scan",
            "Performs a standard security scan using npm audit, displaying results in a formatted table.",
            "Scan with Automatic Fixes",
            "Scans for vulnerabilities and automatically applies available security fixes.",
            "High Severity Filter",
            "Shows only high and critical severity vulnerabilities, filtering out lower priority issues.",
            "Comprehensive Scan with Snyk",
            "Runs both npm audit and Snyk scan, including development dependencies with detailed vulnerability information.",
            "CI/CD Pipeline Integration",
            "Exports critical security vulnerabilities as JSON for automated processing in CI/CD pipelines.",
            "Auto-fix for Production",
            "Automatically fixes moderate and higher severity vulnerabilities in production dependencies only.",
            "Security Workflow Integration",
            "Pre-deployment Security Check",
            "Automated Security Maintenance"
          ]
        ],
        [
          "pcu theme - Theme Configuration",
          "pcu-theme-theme-configuration",
          [
            "Configure color themes and UI appearance.",
            "Options",
            "Set color theme: default, modern, minimal, neon",
            "List all available themes with preview samples",
            "Launch interactive theme configuration wizard with live preview",
            "Show theme preview without applying changes",
            "Set progress bar style: default, gradient, fancy, minimal, rainbow, neon",
            "Set environment-specific preset: development, production, presentation",
            "Reset all theme settings to defaults",
            "Available Themes",
            "Core Themes",
            "default - Balanced colors optimized for general terminal use",
            "modern - Vibrant colors perfect for development environments with syntax highlighting",
            "minimal - Clean monochrome design ideal for production environments and CI/CD",
            "neon - High contrast cyberpunk colors designed for presentations and demos",
            "Progress Bar Styles",
            "default - Standard progress indication",
            "gradient - Smooth color transitions",
            "fancy - Rich visual effects with animations",
            "minimal - Simple clean progress bars",
            "rainbow - Multi-color animated progress",
            "neon - Glowing effect progress bars",
            "Environment Presets",
            "development - Full color, detailed progress, verbose output",
            "production - Minimal colors, essential information only",
            "presentation - High contrast, large fonts, dramatic effects",
            "Advanced Theme Features",
            "Semantic Color Mapping",
            "Success - Green tones for completed operations",
            "Warning - Yellow/amber for caution states",
            "Error - Red tones for failures and critical issues",
            "Info - Blue tones for informational messages",
            "Progress - Dynamic colors for in-progress operations",
            "Highlight - Accent colors for important information",
            "Interactive Theme Configuration",
            "The interactive mode provides:",
            "Live preview of themes with sample output",
            "Custom color selection with hex code support",
            "Environment detection with automatic optimal settings",
            "Progress bar testing to see different styles in action",
            "Export/import theme configurations",
            "Per-workspace themes for project-specific styling",
            "Usage Examples",
            "List Available Themes",
            "Shows all available themes with descriptions.",
            "Set Theme Directly",
            "Directly set a specific theme.",
            "Interactive Theme Configuration",
            "Launches a guided theme selection wizard that allows you to preview themes and configure UI settings interactively."
          ]
        ],
        [
          "pcu ai - AI Provider Management",
          "pcu-ai-ai-provider-management",
          [
            "Check AI provider status, test AI analysis, and manage AI cache.",
            "Options",
            "Show status of all AI providers (default behavior)",
            "Test AI analysis with a sample request",
            "Show AI analysis cache statistics",
            "Clear AI analysis cache",
            "Provider Detection",
            "PCU automatically detects and prioritizes available AI CLI tools:",
            "| Provider | Priority | Detection Method |\n| -------- | -------- | ---------------- |\n| Claude   | 100      | claude CLI     |\n| Gemini   | 80       | gemini CLI     |\n| Codex    | 60       | codex CLI      |",
            "Status Output",
            "The status command shows:",
            "Available Providers: Which AI CLI tools are installed",
            "Provider Details: Path, version, and priority for each provider",
            "Best Provider: The recommended provider based on priority",
            "Cache Statistics: Hit rate and entry count (with --cache-stats)",
            "Usage Examples",
            "Check AI Provider Status",
            "Shows all detected AI providers with their availability and priority.",
            "Test AI Analysis",
            "Runs a test analysis with a sample package update to verify AI integration is working.",
            "View Cache Statistics",
            "Displays cache statistics including total entries, hits, misses, and hit rate.",
            "Clear AI Cache",
            "Clears all cached AI analysis results to force fresh analysis."
          ]
        ],
        [
          "pcu rollback - Backup Rollback",
          "pcu-rollback-backup-rollback",
          [
            "Rollback catalog updates to a previous state using backup files created during updates.",
            "Options",
            "List all available backup files with timestamps",
            "Rollback to the most recent backup automatically",
            "Interactive selection of backup to restore",
            "Delete all backup files (requires confirmation)",
            "Workspace directory path (default: current directory)",
            "Show detailed information during rollback",
            "Backup System",
            "PCU creates backup files automatically when you use the --create-backup flag with the update command:",
            "Backup files are stored with timestamps and contain the original pnpm-workspace.yaml state before updates.",
            "Usage Examples",
            "List Available Backups",
            "Shows all backup files with their creation timestamps and file sizes.",
            "Rollback to Latest Backup",
            "Automatically restores the most recent backup without prompting.",
            "Interactive Backup Selection",
            "Opens an interactive prompt to select which backup to restore.",
            "Clean Up Old Backups",
            "Deletes all backup files with confirmation prompt and detailed output."
          ]
        ],
        [
          "Interactive Features & Progress Tracking",
          "interactive-features-and-progress-tracking",
          [
            "PCU provides advanced interactive capabilities and sophisticated progress tracking across all commands.",
            "Interactive Command Interface",
            "Package Selection System",
            "Smart Multi-Select: Choose specific packages with visual checkboxes and keyboard shortcuts",
            "Search & Filter: Real-time package filtering with pattern matching and fuzzy search",
            "Batch Operations: Select/deselect entire groups with category-based selection",
            "Impact Preview: See potential changes before applying any updates",
            "Configuration Wizard",
            "The interactive configuration wizard (pcu init --interactive) provides:",
            "Workspace Detection: Automatic discovery of existing PNPM workspaces",
            "Template Selection: Choose between minimal and full configuration templates",
            "Package Rule Setup: Configure rules for different package categories (React, Vue, TypeScript)",
            "Registry Configuration: Set up custom NPM registries and authentication",
            "Validation Settings: Configure quality gates and safety checks",
            "Directory & File Browser",
            "Workspace Navigation: Built-in file system browser for workspace selection",
            "Path Validation: Real-time validation of workspace paths and structures",
            "Preview Mode: See workspace contents before confirming selection",
            "Advanced Progress Tracking",
            "Multi-Style Progress Bars",
            "PCU offers six different progress bar styles, configurable per command or globally:",
            "Progress Features",
            "Multi-step Tracking: Shows progress across different phases (scan → analyze → update)",
            "Parallel Operation Status: Individual progress bars for concurrent operations",
            "Performance Metrics: Real-time speed indicators, ETA calculations, elapsed time",
            "Memory-Safe Display: Stable multi-line output that reduces terminal flickering",
            "Batch Processing Status",
            "Queue Management: Shows pending, active, and completed package operations",
            "Conflict Resolution: Interactive handling of peer dependency conflicts",
            "Error Recovery: Skip/retry options for failed operations with detailed error context",
            "Rollback Capabilities: Undo changes if issues are detected during updates",
            "Error Handling & Recovery",
            "Smart Error Detection",
            "Validation Errors: Pre-flight checks with helpful suggestions for common mistakes",
            "Network Issues: Automatic retry with exponential backoff for registry failures",
            "Dependency Conflicts: Detailed conflict analysis with resolution recommendations",
            "Permission Problems: Clear guidance for file system permission issues",
            "Interactive Recovery Options",
            "Skip & Continue: Skip problematic packages and continue with remaining updates",
            "Retry with Options: Retry failed operations with different parameters",
            "Rollback Changes: Undo partial changes if issues occur during batch operations",
            "Export Error Report: Generate detailed error reports for troubleshooting",
            "Workspace Integration",
            "Auto-Discovery Features",
            "PNPM Workspace Detection: Automatically finds and validates workspace configurations",
            "Catalog Discovery: Detects existing catalogs and their package mappings",
            "Package Analysis: Analyzes workspace structure and dependency relationships",
            "Configuration Inheritance: Applies workspace-specific settings automatically",
            "Validation & Health Checks",
            "Structure Validation: Ensures workspace follows PNPM best practices",
            "Dependency Consistency: Checks for version mismatches across packages",
            "Configuration Integrity: Validates PCU configuration against workspace structure",
            "Health Metrics: Provides comprehensive workspace health assessment",
            "Usage Examples",
            "Interactive Update with Advanced Features",
            "Launches interactive update with fancy progress bars and optimized batch processing.",
            "Configuration with Preview",
            "Runs configuration wizard with preview mode and detailed logging.",
            "Error Recovery Workflow",
            "Updates with interactive error recovery, automatic backups, and major version confirmation."
          ]
        ],
        [
          "Global Options",
          "global-options",
          [
            "These options work with all commands and can be set via environment variables:",
            "Workspace directory path",
            "Enable verbose logging with detailed output",
            "Disable colored output for CI/CD environments",
            "Override NPM registry URL",
            "Request timeout in milliseconds (default: 30000)",
            "Path to custom configuration file",
            "Display language: en, zh, ja, ko, es, de, fr (default: auto-detect from system)",
            "Output the version number and check for updates",
            "Display help for command",
            "Environment Variable Usage",
            "All global options and command-specific settings can be configured via environment variables:",
            "Core Environment Variables",
            "Default workspace directory path",
            "Enable verbose logging globally",
            "Disable colored output (useful for CI/CD)",
            "Default NPM registry URL",
            "Request timeout in milliseconds",
            "Path to custom configuration file",
            "Display language: en, zh, ja, ko, es, de, fr",
            "Command-Specific Environment Variables",
            "Default catalog to use for check/update operations",
            "Default output format: table, json, yaml, minimal",
            "Default update target: latest, greatest, minor, patch, newest",
            "Include prerelease versions by default",
            "Default package inclusion pattern",
            "Default package exclusion pattern",
            "Enable interactive mode by default",
            "Enable dry-run mode by default",
            "Force updates without confirmation",
            "Create backup files before updates",
            "Theme & Display Environment Variables",
            "Default color theme: default, modern, minimal, neon",
            "Progress bar style: default, gradient, fancy, minimal, rainbow, neon",
            "Environment preset: development, production, presentation",
            "Security & Cache Environment Variables",
            "Default security severity filter: low, moderate, high, critical",
            "Automatically fix vulnerabilities",
            "Enable/disable caching system",
            "Cache time-to-live in milliseconds",
            "Custom cache directory path",
            "Advanced Configuration Environment Variables",
            "Number of parallel network requests",
            "Number of packages to process in batches",
            "Number of retry attempts for failed operations",
            "Check for PCU CLI updates on startup",
            "Environment Variable Examples",
            "Configuration Priority",
            "Settings are applied in this order (later overrides earlier):",
            "Built-in defaults",
            "Global config (~/.pcurc.json)",
            "Project config (.pcurc.json)",
            "Environment variables (PCU_*)",
            "Command-line flags (highest priority)"
          ]
        ],
        [
          "Auto-Update System",
          "auto-update-system",
          [
            "PCU includes a sophisticated auto-update mechanism that keeps the CLI tool current with the latest features and security patches.",
            "Automatic Update Checking",
            "By default, PCU checks for updates when you run any command:",
            "Update Behavior",
            "CI/CD Environment Detection",
            "PCU automatically detects CI/CD environments and skips update checks to avoid disrupting automated pipelines:",
            "GitHub Actions: Detected via GITHUB_ACTIONS environment variable",
            "CircleCI: Detected via CIRCLECI environment variable",
            "Jenkins: Detected via JENKINS_URL environment variable",
            "GitLab CI: Detected via GITLAB_CI environment variable",
            "Azure DevOps: Detected via TF_BUILD environment variable",
            "Generic CI: Detected via CI environment variable",
            "Update Installation",
            "PCU supports multiple package managers with automatic fallback:",
            "Configuration Options",
            "Environment Variables",
            "Completely disable version checking and update notifications",
            "Hours between update checks (default: 24)",
            "Automatically install updates without prompting (use with caution)",
            "Timeout for update check requests in milliseconds (default: 5000)",
            "Configuration File Settings",
            "Update Notifications",
            "Standard Notification",
            "Security Update Notification",
            "Prerelease Notification",
            "Manual Update Commands",
            "Troubleshooting Updates",
            "Update Check Failures",
            "Cache Clearing",
            "Permission Issues"
          ]
        ],
        [
          "Cache Management System",
          "cache-management-system",
          [
            "PCU includes a comprehensive caching system to optimize performance and reduce network requests.",
            "Cache Types",
            "Registry Cache",
            "Stores NPM package metadata and version information:",
            "Default TTL: 1 hour (3,600,000ms)",
            "Max Size: 10MB per cache type",
            "Max Entries: 500 packages",
            "Disk Persistence: Enabled",
            "Workspace Cache",
            "Stores workspace configuration and package.json parsing results:",
            "Default TTL: 5 minutes (300,000ms)",
            "Max Size: 5MB",
            "Max Entries: 200 workspaces",
            "Disk Persistence: Disabled (memory only)",
            "Cache Configuration",
            "Environment Variables",
            "Enable/disable entire caching system",
            "Default cache TTL in milliseconds",
            "Maximum total cache size in bytes (50MB default)",
            "Maximum number of cache entries",
            "Custom cache directory path",
            "Enable disk persistence for caches",
            "Configuration File Settings",
            "Cache Management Commands",
            "Cache Performance",
            "Optimization Features",
            "LRU Eviction: Least Recently Used items removed first",
            "Automatic Cleanup: Expired entries removed every 5 minutes",
            "Size Monitoring: Automatic eviction when size limits exceeded",
            "Parallel Processing: Cache operations don't block main thread",
            "Performance Benefits",
            "Registry Requests: 60-90% reduction in NPM registry calls",
            "Workspace Parsing: 80-95% faster workspace analysis on repeat runs",
            "Network Dependency: Reduced reliance on network connectivity",
            "Startup Time: 2-5x faster startup for subsequent operations"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "Configuration",
          null,
          [
            "Configure PCU to match your workflow and project needs. Learn about configuration files, package-specific rules, and advanced settings. "
          ]
        ],
        [
          "Configuration File Types",
          "configuration-file-types",
          [
            "PCU supports multiple configuration file formats and locations to accommodate different development workflows.",
            "Supported Configuration Files",
            "PCU searches for configuration files in the following order (first found wins):",
            "Primary JSON configuration file in project root",
            "JavaScript configuration file with dynamic configuration support",
            "Alternative JavaScript configuration filename",
            "Global user configuration in home directory",
            "Configuration within package.json under \"pcu\" key",
            "JavaScript Configuration Support",
            "JavaScript configuration files enable dynamic configuration based on environment, workspace structure, or other runtime conditions:",
            "Package.json Configuration",
            "For simpler projects, configuration can be embedded within package.json:",
            "Configuration Validation",
            "PCU automatically validates configuration files and provides detailed error messages for common issues:",
            "Validation Features",
            "JSON Schema Validation: Ensures all configuration properties are valid",
            "Pattern Validation: Validates glob patterns and package name formats",
            "Type Checking: Verifies correct data types for all configuration values",
            "Conflict Detection: Identifies conflicting rules and configuration options",
            "Suggestion System: Provides helpful suggestions for fixing configuration errors",
            "Validation Examples"
          ]
        ],
        [
          ".pcurc.json 配置文件完整参考",
          "pcurc-json",
          [
            "PCU 使用多种配置文件格式，主要使用项目根目录下的 .pcurc.json 文件进行配置。可以手动创建，或使用 pcu init 生成默认配置。",
            "完整配置文件结构",
            "配置选项详细说明",
            "defaults 默认设置",
            "默认更新目标: latest | greatest | minor | patch | newest",
            "网络请求超时时间（毫秒）",
            "更新前是否创建备份文件",
            "是否默认启用交互模式",
            "是否默认启用预览模式（不实际更新）",
            "是否强制更新（跳过警告）",
            "是否包含预发布版本",
            "workspace 工作空间设置",
            "是否自动发现工作空间结构",
            "目录模式: strict | loose | mixed",
            "工作空间根目录路径",
            "包目录匹配模式数组（会覆盖 pnpm-workspace.yaml）",
            "output 输出设置",
            "输出格式: table | json | yaml | minimal",
            "是否启用彩色输出",
            "是否启用详细输出模式",
            "ui 用户界面设置",
            "颜色主题: default | modern | minimal | neon",
            "是否显示进度条",
            "进度条样式: default | gradient | fancy | minimal | rainbow | neon",
            "是否启用动画效果",
            "颜色方案: auto | light | dark",
            "update 更新行为设置",
            "更新时是否默认启用交互模式",
            "是否先执行预览，然后询问是否应用",
            "是否跳过预发布版本",
            "主版本更新是否需要确认",
            "批量处理的包数量",
            "security 安全设置",
            "是否自动修复安全漏洞",
            "为了安全修复是否允许主版本更新",
            "有安全更新时是否通知",
            "安全警告级别阈值: low | moderate | high | critical",
            "advanced 高级设置",
            "并发网络请求数量",
            "网络请求超时时间（毫秒）",
            "失败重试次数",
            "缓存有效期（分钟，0 表示禁用缓存）",
            "启动时是否检查 PCU 工具更新",
            "批量处理的最大包数量",
            "cache 缓存设置",
            "是否启用缓存系统",
            "缓存生存时间（毫秒）",
            "最大缓存大小（字节，默认 50MB）",
            "最大缓存条目数",
            "是否持久化缓存到磁盘",
            "缓存目录路径",
            "registry 注册表设置",
            "默认 NPM 注册表 URL",
            "注册表请求超时时间（毫秒）",
            "注册表请求重试次数",
            "包过滤设置",
            "包含的包名匹配模式数组",
            "排除的包名匹配模式数组",
            "notification 通知设置",
            "是否启用通知功能",
            "有更新可用时是否通知",
            "有安全警告时是否通知",
            "logging 日志设置",
            "日志级别: error | warn | info | debug | trace",
            "日志文件路径（可选）",
            "最大日志文件数量",
            "单个日志文件最大大小"
          ]
        ],
        [
          "Package Filtering",
          "package-filtering",
          [
            "Control which packages to update with include/exclude patterns and package-specific rules.",
            "Package Rule Properties",
            "Glob patterns to match package names",
            "Update target: latest, greatest, minor, patch, newest",
            "Always ask before updating these packages",
            "Update automatically without confirmation",
            "Packages that follow the same update strategy",
            "Update related packages together"
          ]
        ],
        [
          "Security Configuration",
          "security-configuration",
          [
            "Configure security vulnerability scanning and automatic fixes.",
            "Automatically check and fix security vulnerabilities",
            "Allow major version upgrades for security fixes",
            "Show notifications on security updates"
          ]
        ],
        [
          "Monorepo Configuration",
          "monorepo-configuration",
          [
            "Special settings for complex monorepo setups with multiple catalogs.",
            "Packages that need version sync across multiple catalogs",
            "Catalog priority order for conflict resolution"
          ]
        ],
        [
          "Advanced Settings",
          "advanced-settings",
          [
            "Fine-tune performance and behavior with advanced configuration options.",
            "Number of concurrent network requests",
            "Network request timeout in milliseconds",
            "Number of retries on failure",
            "Cache validity period (0 to disable caching)",
            "Automatically check for PCU tool updates on startup. Skipped in CI environments. Shows update\nnotifications and installation instructions when newer versions are available."
          ]
        ],
        [
          "UI Configuration",
          "ui-configuration",
          [
            "Customize the visual appearance and user interface settings.",
            "Available Themes",
            "default - Balanced colors for general use",
            "modern - Vibrant colors for development environments",
            "minimal - Clean and simple for production environments",
            "neon - High contrast colors for presentations",
            "Progress Bar Styles",
            "PCU supports 6 different progress bar styles for enhanced visual feedback during operations:",
            "default - Standard progress bar with basic styling",
            "gradient - Gradient-colored progress bar for modern appearance",
            "fancy - Enhanced progress bar with decorative elements",
            "minimal - Clean and simple progress indicator",
            "rainbow - Multi-colored progress bar for vibrant displays",
            "neon - High-contrast progress bar matching neon theme",
            "Configuration Example:",
            "Command Line Usage:"
          ]
        ],
        [
          "Configuration Priority",
          "configuration-priority",
          [
            "Configuration settings are applied in this priority order:",
            "Command line flags (highest priority)",
            "Package-specific rules in .pcurc.json",
            "General settings in .pcurc.json",
            "Default values (lowest priority)",
            "Related packages automatically inherit settings from their parent package rules, ensuring version\nconsistency across ecosystem packages."
          ]
        ],
        [
          "Examples",
          "examples",
          [
            "React Ecosystem",
            "TypeScript Project",
            "Enterprise Setup"
          ]
        ],
        [
          "Environment Variables",
          "environment-variables",
          [
            "All CLI options can be configured via environment variables for automation and CI/CD environments:",
            "Environment Variable Priority",
            "Configuration sources are loaded in this order (later overrides earlier):",
            "Built-in defaults (lowest priority)",
            "Global configuration (~/.pcurc.json)",
            "Project configuration (.pcurc.json)",
            "Environment variables (PCU_*)",
            "Command-line flags (highest priority)"
          ]
        ],
        [
          "Registry Configuration",
          "registry-configuration",
          [
            "PCU automatically reads NPM and PNPM configuration files for registry settings:",
            "Registry Priority",
            "CLI --registry flag (highest priority)",
            "PCU configuration (.pcurc.json registry section)",
            "Project .npmrc/.pnpmrc",
            "Global .npmrc/.pnpmrc",
            "Default NPM registry (lowest priority)"
          ]
        ],
        [
          "Enhanced Caching Configuration",
          "enhanced-caching-configuration",
          [
            "PCU includes an advanced caching system to improve performance:",
            "Cache Settings",
            "Enable/disable caching system",
            "Time to live in milliseconds (1 hour default)",
            "Maximum cache size in bytes (50MB default)",
            "Maximum number of cache entries",
            "Save cache to disk between runs",
            "Directory for persistent cache storage",
            "Cache eviction strategy: lru, fifo, lfu"
          ]
        ],
        [
          "Validation Configuration",
          "validation-configuration",
          [
            "PCU includes comprehensive validation with helpful suggestions:",
            "Validation Options",
            "Enable strict validation mode with additional checks",
            "Show warnings for potentially risky updates",
            "Update types requiring confirmation: major, minor, patch",
            "Enable helpful suggestions and tips",
            "Include performance optimization suggestions",
            "Include best practice recommendations"
          ]
        ],
        [
          "Interactive Mode Configuration",
          "interactive-mode-configuration",
          [
            "Configure interactive prompts and user experience:",
            "Interactive Settings",
            "Enable interactive mode capabilities",
            "Number of items shown per page in lists",
            "Show package descriptions in selection lists",
            "Show release notes for updates (requires network)",
            "Enable auto-completion for package names",
            "Enable fuzzy matching for auto-completion",
            "Require confirmation for major version updates"
          ]
        ],
        [
          "Monorepo Configuration",
          "monorepo-configuration-2",
          [
            "PCU provides advanced features specifically designed for large monorepos and complex workspace management.",
            "Version Synchronization",
            "Keep related packages synchronized across your monorepo:",
            "Advanced Workspace Management",
            "Catalog Priority System",
            "Define which catalogs take precedence when conflicts arise:",
            "Cross-Workspace Dependencies",
            "Analyze and manage dependencies between workspace packages:",
            "Analyze cross-workspace dependencies",
            "How to handle version mismatches: error, warn, off",
            "Report packages in catalogs not used by any workspace package",
            "Validate that all workspace packages use catalog versions",
            "Monorepo-Specific Package Rules",
            "Create sophisticated rules for different areas of your monorepo:",
            "Workspace-Specific Configuration",
            "Different configuration for different parts of your monorepo:",
            "Performance Optimization for Large Monorepos",
            "Batch Processing Configuration",
            "Number of packages to process in each batch",
            "Maximum number of concurrent operations",
            "Cache workspace package discovery between runs",
            "Process multiple catalogs in parallel",
            "Memory Management",
            "Monorepo Validation",
            "Comprehensive validation for complex workspace setups:",
            "Validation Rules",
            "Ensure workspace: protocol is used for internal dependencies",
            "Ensure all dependencies are covered by catalogs",
            "Require all workspace packages to use the same version of shared dependencies",
            "Detect circular dependencies between workspace packages",
            "Usage Examples for Monorepos",
            "Large Enterprise Monorepo Setup",
            "CI/CD Optimized Configuration"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "Development",
          null,
          [
            "Set up PCU for development and learn how to contribute to the project. This guide covers project setup, architecture, and development workflows. "
          ]
        ],
        [
          "Prerequisites",
          "prerequisites",
          [
            "Before you start developing PCU, make sure you have the required tools:",
            "Node.js >= 22.0.0 and pnpm >= 10.0.0 are required for development."
          ]
        ],
        [
          "Project Setup",
          "project-setup",
          [
            "Clone and set up the development environment:"
          ]
        ],
        [
          "Project Architecture",
          "project-architecture",
          [
            "PCU follows clean architecture principles with clear separation of concerns:",
            "Architecture Layers",
            "User interface, command parsing, output formatting",
            "Business logic orchestration, use cases",
            "Core business entities, value objects, repository interfaces",
            "External API clients, file system access, repository implementations",
            "Shared utilities, configuration, logging, error handling"
          ]
        ],
        [
          "Development Workflow",
          "development-workflow",
          [
            "Making Changes",
            "Create a feature branch:",
            "Make your changes following the coding standards",
            "Add tests for your changes:",
            "Ensure quality checks pass:",
            "Commit your changes:",
            "Testing Strategy",
            "PCU uses a comprehensive testing approach:",
            "Code Quality",
            "PCU maintains high code quality standards:"
          ]
        ],
        [
          "Adding Features",
          "adding-features",
          [
            "Creating New Commands",
            "Create command handler in apps/cli/src/cli/commands/:",
            "Add business logic in packages/core/src/application/services/",
            "Create tests for both CLI and core logic",
            "Update documentation",
            "Adding New Output Formats",
            "Create formatter in apps/cli/src/cli/formatters/:",
            "Register formatter in the main formatter registry",
            "Add tests and update documentation"
          ]
        ],
        [
          "Contributing Guidelines",
          "contributing-guidelines",
          [
            "Commit Message Convention",
            "PCU uses Conventional Commits:",
            "Pull Request Process",
            "Fork the repository and create a feature branch",
            "Make your changes following the development workflow",
            "Ensure all tests pass and code quality checks succeed",
            "Update documentation if needed",
            "Submit a pull request with:",
            "Clear description of changes",
            "Link to related issues",
            "Screenshots for UI changes",
            "Breaking change notes if applicable",
            "Code Review Checklist",
            "All tests pass",
            "Code coverage maintained (>85%)",
            "TypeScript types are correct",
            "Code style follows project standards",
            "Documentation updated",
            "Breaking changes documented",
            "Performance impact considered"
          ]
        ],
        [
          "Debugging",
          "debugging",
          [
            "Development Debugging",
            "Testing Debugging"
          ]
        ],
        [
          "Building and Publishing",
          "building-and-publishing",
          [
            "Local Testing",
            "Release Process",
            "Prepare release notes in apps/cli/CHANGELOG.md under ## Unreleased.",
            "Build and test:",
            "Run the GitHub Actions Release workflow (maintainers only):",
            "patch, minor, major: bump the CLI version, commit the release changes, create the tag, publish pcu and pnpm-catalog-updates, and create the GitHub Release in one run",
            "current: publish the version that is already committed in the repository",
            "dry_run: true: validate the flow without publishing"
          ]
        ],
        [
          "Getting Help",
          "getting-help",
          [
            "📖 Documentation: Check this documentation for detailed guides",
            "🐛 Issues: Report bugs via GitHub Issues",
            "💬 Discussions: Ask questions in GitHub Discussions",
            "🔧 Development: Join development discussions in issues and PRs"
          ]
        ],
        [
          "Advanced Architecture Details",
          "advanced-architecture-details",
          [
            "Core Domain Model",
            "Based on Domain-Driven Design (DDD) principles, PCU's core domain includes:",
            "Service Layer Architecture",
            "The application layer orchestrates business logic through services:",
            "CLI Layer Design",
            "The CLI layer provides a clean interface to the core domain:",
            "Testing Architecture",
            "Comprehensive testing strategy across all layers:",
            "Performance Considerations",
            "PCU is optimized for performance in large monorepos:"
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "Examples",
          null,
          [
            "Real-world examples and use cases to help you get the most out of PCU. From simple updates to complex monorepo management. "
          ]
        ],
        [
          "Basic Workflows",
          "basic-workflows",
          [
            "Daily Dependency Check",
            "Check for updates as part of your daily development routine:",
            "Safe Updates with Backup",
            "Update dependencies safely with automatic backups:",
            "Target-Specific Updates",
            "Update only specific types of changes:"
          ]
        ],
        [
          "Multi-Catalog Workspaces",
          "multi-catalog-workspaces",
          [
            "Legacy Support Scenario",
            "Managing multiple React versions in one workspace:",
            "Package Usage"
          ]
        ],
        [
          "Configuration Examples",
          "configuration-examples",
          [
            "React Ecosystem Management",
            "Coordinated updates for React and related packages:",
            "TypeScript Project Configuration",
            "Conservative TypeScript updates with automatic type definitions:",
            "Enterprise Configuration",
            "Enterprise-ready configuration with strict controls:"
          ]
        ],
        [
          "CI/CD Integration",
          "ci-cd-integration",
          [
            "GitHub Actions",
            "Automate dependency checking in your CI pipeline:"
          ]
        ],
        [
          "Error Handling and Troubleshooting",
          "error-handling-and-troubleshooting",
          [
            "Network Issues",
            "Handle network problems and registry access:",
            "Workspace Validation",
            "Validate your workspace setup:",
            "Private Registries",
            "PCU automatically reads .npmrc and .pnpmrc configurations:"
          ]
        ],
        [
          "Advanced Use Cases",
          "advanced-use-cases",
          [
            "Impact Analysis",
            "Analyze the impact of updating specific packages:",
            "Selective Updates",
            "Update only specific packages or patterns:",
            "Dry Run Analysis",
            "Preview changes before applying them:"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "Daily Workflow",
            "Morning Check: pcu -c to see available updates",
            "Review Impact: Use pcu -a for significant updates",
            "Safe Update: pcu -i -b for interactive updates with backup",
            "Test: Run your test suite after updates",
            "Commit: Commit dependency updates separately",
            "Team Workflow",
            "Shared Configuration: Commit .pcurc.json to version control",
            "Regular Reviews: Schedule weekly dependency review meetings",
            "Security Priority: Always prioritize security updates",
            "Documentation: Document major dependency decisions",
            "Rollback Plan: Keep backups for easy rollback",
            "Release Workflow",
            "Pre-release Check: pcu -c --target patch before releases",
            "Security Scan: Enable autoFixVulnerabilities in CI",
            "Version Pinning: Use exact versions for production releases",
            "Update Schedule: Plan dependency updates between releases"
          ]
        ],
        [
          "Security Monitoring",
          "security-monitoring",
          [
            "Continuous Security Scanning",
            "Integrate security scanning into your development workflow:",
            "Security-Focused CI/CD"
          ]
        ],
        [
          "Theme Customization",
          "theme-customization",
          [
            "Interactive Theme Setup",
            "Configure PCU's appearance for your team:",
            "Team Theme Configuration"
          ]
        ],
        [
          "Performance Optimization",
          "performance-optimization",
          [
            "Large Monorepo Configuration",
            "Optimize PCU for large workspaces with hundreds of packages:",
            "Selective Processing"
          ]
        ],
        [
          "Migration Examples",
          "migration-examples",
          [
            "From npm-check-updates",
            "Migrating from ncu to PCU:",
            "Converting to pnpm Catalogs",
            "Transform existing workspace to use pnpm catalogs:"
          ]
        ],
        [
          "Migration Guides",
          "migration-guides",
          [
            "Migrating from npm-check-updates",
            "Transition smoothly from npm-check-updates to PCU for pnpm catalog management:",
            "Migration Steps",
            "Install PCU alongside ncu temporarily for comparison",
            "Initialize PCU configuration:",
            "Compare outputs to ensure equivalent functionality:",
            "Migrate package rules from ncu configuration",
            "Remove ncu once comfortable with PCU",
            "Migrating from Dependabot",
            "Replace Dependabot with PCU for more granular control:",
            "Migrating from Renovate",
            "Transition from Renovate to PCU with advanced configuration:",
            "Key Differences",
            "| Feature           | Renovate            | PCU                        |\n| ----------------- | ------------------- | -------------------------- |\n| Scope         | Individual packages | Catalog-level updates      |\n| Configuration | renovate.json       | .pcurc.json                |\n| UI            | Web dashboard       | Terminal + CI integration  |\n| Monorepo      | Complex config      | Built-in workspace support |",
            "Migration Configuration"
          ]
        ],
        [
          "CI/CD Workflow Integration",
          "ci-cd-workflow-integration",
          [
            "GitHub Actions Integration",
            "Complete GitHub Actions setup for automated dependency management:",
            "GitLab CI Integration",
            "GitLab CI pipeline for PCU dependency management:",
            "Jenkins Pipeline Integration",
            "Jenkins pipeline for enterprise dependency management:",
            "Azure DevOps Pipeline",
            "Azure DevOps pipeline for PCU integration:",
            "Docker Integration",
            "Containerized PCU for consistent CI/CD environments:"
          ]
        ],
        [
          "Enterprise Workflows",
          "enterprise-workflows",
          [
            "Multi-Environment Management",
            "Manage dependencies across development, staging, and production environments:",
            "Approval Workflows",
            "Implement approval workflows for critical updates:"
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "Frequently Asked Questions",
          null,
          [
            "Quick answers to common questions about PCU. Can't find what you're looking for? Check our troubleshooting guide or open an issue. "
          ]
        ],
        [
          "Installation & Setup",
          "installation-and-setup",
          [
            "How do I install PCU?",
            "PCU can be installed globally via npm, pnpm, or yarn:",
            "What are the system requirements?",
            "Node.js: >= 18.0.0 (LTS recommended)",
            "pnpm: >= 8.0.0",
            "Operating System: Windows, macOS, Linux",
            "Do I need a pnpm workspace to use PCU?",
            "Yes, PCU is specifically designed for pnpm workspaces with catalog dependencies. If you don't have a workspace yet, run pcu init to create one.",
            "Can I use PCU with npm or yarn projects?",
            "No, PCU is exclusively for pnpm workspaces using catalog dependencies. For other package managers, consider tools like npm-check-updates or yarn upgrade-interactive."
          ]
        ],
        [
          "Configuration",
          "configuration",
          [
            "Where should I place my .pcurc.json configuration?",
            "Place it in your workspace root directory (same level as pnpm-workspace.yaml). PCU also supports:",
            "Global configuration: ~/.pcurc.json",
            "Project configuration: ./.pcurc.json (highest priority)",
            "What's the difference between workspace-level and global configuration?",
            "Global (~/.pcurc.json): Applied to all PCU operations across different projects",
            "Project (./.pcurc.json): Specific to the current workspace, overrides global settings",
            "Can I configure different update strategies for different packages?",
            "Yes! Use package rules in your configuration:"
          ]
        ],
        [
          "Commands & Usage",
          "commands-and-usage",
          [
            "What's the difference between pcu check and pcu -c?",
            "They're identical! PCU supports both full command names and short aliases:",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "How do I update only specific types of packages?",
            "Use the --include and --exclude flags:",
            "What's the difference between update targets?",
            "patch: Bug fixes only (1.0.0 → 1.0.1)",
            "minor: New features, backward compatible (1.0.0 → 1.1.0)",
            "latest: Latest stable version including major changes (1.0.0 → 2.0.0)",
            "greatest: Latest version including prereleases (1.0.0 → 2.0.0-beta.1)",
            "How do I check what will be updated before actually updating?",
            "Use the --dry-run flag:",
            "This shows you exactly what would be updated without making any changes."
          ]
        ],
        [
          "Troubleshooting",
          "troubleshooting",
          [
            "Why does PCU say \"No pnpm workspace found\"?",
            "This means PCU can't find a pnpm-workspace.yaml file in your current directory. Solutions:",
            "Create a workspace: Run pcu init",
            "Navigate to workspace root: cd to the directory containing pnpm-workspace.yaml",
            "Specify workspace path: pcu -c --workspace /path/to/workspace",
            "Why does PCU say \"No catalog dependencies found\"?",
            "Your workspace doesn't use catalog dependencies yet. You need:",
            "Catalog in workspace file:",
            "Use catalogs in packages:",
            "PCU is running very slowly. How can I improve performance?",
            "Try these optimizations:",
            "Reduce concurrency: pcu check --concurrency 2",
            "Increase timeout: pcu check --timeout 60000",
            "Enable caching: Ensure PCU_CACHE_ENABLED=true (default)",
            "Use filtering: pcu check --include \"react*\" for specific packages",
            "How do I fix \"ENOTFOUND registry.npmjs.org\" errors?",
            "This is a network connectivity issue:",
            "Check internet connection: ping registry.npmjs.org",
            "Configure proxy: Set HTTP_PROXY and HTTPS_PROXY environment variables",
            "Use corporate registry: Configure .npmrc with your company's registry",
            "Increase timeout: PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "Security",
          "security",
          [
            "How does PCU handle security vulnerabilities?",
            "PCU integrates with npm audit and optionally Snyk:",
            "Should I auto-fix all security vulnerabilities?",
            "Use caution with --auto-fix:",
            "✅ Safe: Patch and minor updates for security fixes",
            "⚠️ Review: Major version updates that might break your app",
            "❌ Avoid: Blindly auto-fixing in production without testing",
            "How do I handle false positive security warnings?",
            "Configure ignored vulnerabilities in .pcurc.json:"
          ]
        ],
        [
          "Workflows & CI/CD",
          "workflows-and-ci-cd",
          [
            "Can I use PCU in CI/CD pipelines?",
            "Absolutely! PCU is designed for automation:",
            "See our CI/CD integration guide for complete examples.",
            "How do I create automated dependency update PRs?",
            "Use PCU with GitHub Actions, GitLab CI, or other platforms:",
            "Check the CI/CD integration guide for full workflows.",
            "What's the best workflow for team collaboration?",
            "Shared configuration: Commit .pcurc.json to version control",
            "Regular reviews: Schedule weekly dependency review meetings",
            "Security first: Always prioritize security updates",
            "Incremental updates: Prefer smaller, frequent updates over big batch updates",
            "Testing: Always test after updates before merging"
          ]
        ],
        [
          "Advanced Usage",
          "advanced-usage",
          [
            "Can I use multiple catalogs in one workspace?",
            "Yes! PNPM supports multiple catalogs:",
            "Then use them in packages:",
            "How do I analyze the impact of updating a specific package?",
            "Use the analyze command:",
            "Can I exclude certain packages from updates permanently?",
            "Yes, configure exclusions in .pcurc.json:",
            "How do I handle monorepos with 100+ packages?",
            "Performance tips for large monorepos:",
            "Batch processing: Configure batchSize: 10 in advanced settings",
            "Reduce concurrency: Set concurrency: 2 to avoid overwhelming the registry",
            "Use filtering: Process packages in groups with --include patterns",
            "Enable caching: Ensure caching is enabled and properly configured",
            "Increase memory: Set NODE_OPTIONS=\"--max-old-space-size=8192\""
          ]
        ],
        [
          "Error Messages",
          "error-messages",
          [
            "\"Cannot resolve peer dependencies\"",
            "This happens when package versions conflict. Solutions:",
            "Update related packages together: pcu update --include \"react*\"",
            "Use interactive mode: pcu update --interactive to choose versions carefully",
            "Check peer dependencies: Review what each package requires",
            "Use multiple catalogs: Separate conflicting versions into different catalogs",
            "\"Invalid configuration in .pcurc.json\"",
            "Your configuration file has JSON syntax errors:",
            "\"Command not found: pcu\"",
            "Installation or PATH issues:",
            "Reinstall globally: npm install -g pcu",
            "Check PATH: Ensure npm global bin is in your PATH",
            "Use npx: npx pnpm-catalog-updates check as alternative",
            "Use pnpm: pnpm add -g pnpm-catalog-updates (recommended)"
          ]
        ],
        [
          "Integration & Tools",
          "integration-and-tools",
          [
            "Does PCU work with Renovate or Dependabot?",
            "PCU is an alternative to these tools, not a complement:",
            "PCU: Manual control, pnpm-specific, catalog-focused",
            "Renovate: Automated PRs, supports many package managers",
            "Dependabot: GitHub-integrated, automated security updates",
            "Choose based on your workflow preferences. For migration, see our migration guide.",
            "Can I integrate PCU with my IDE?",
            "While there's no official IDE extension, you can:",
            "Add npm scripts: Configure commands in package.json",
            "Use task runners: Integrate with VS Code tasks or similar",
            "Terminal integration: Most IDEs support terminal integration",
            "Does PCU support private npm registries?",
            "Yes! PCU reads your .npmrc configuration:",
            "PCU will automatically use the correct registry for each package scope."
          ]
        ],
        [
          "Still Have Questions?",
          "still-have-questions",
          [
            "📖 Documentation: Check our comprehensive command reference",
            "🛠️ Troubleshooting: Visit our troubleshooting guide",
            "🐛 Bug Reports: Create an issue",
            "💬 Discussions: GitHub Discussions"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "Migration Guide",
          null,
          [
            "Learn how to migrate from existing dependency management solutions to PCU and transition your team to pnpm catalog dependencies. "
          ]
        ],
        [
          "Migration Overview",
          "migration-overview",
          [
            "PCU is specifically designed for pnpm workspaces using catalog dependencies. If you're currently using other tools or package managers, this guide will help you transition smoothly.",
            "Before You Start",
            "Prerequisites for PCU:",
            "pnpm as your package manager (version 8.0.0+)",
            "Workspace configuration (pnpm-workspace.yaml)",
            "Catalog dependencies in your workspace",
            "Migration Decision Matrix:",
            "| Current Tool             | Migration Complexity | Benefits                                    | Considerations                  |\n| ------------------------ | -------------------- | ------------------------------------------- | ------------------------------- |\n| npm-check-updates        | Low                  | Better pnpm integration, catalog support    | Requires pnpm workspace setup   |\n| Manual Updates           | Low                  | Automation, consistency, security scanning  | Initial configuration effort    |\n| Renovate                 | Medium               | Manual control, workspace-specific features | Loss of automation              |\n| Dependabot               | Medium               | Enhanced catalog management                 | GitHub-specific features        |\n| yarn upgrade-interactive | High                 | Catalog benefits, better performance        | Complete package manager change |"
          ]
        ],
        [
          "Migrating from npm-check-updates",
          "migrating-from-npm-check-updates",
          [
            "Current Setup Analysis",
            "If you're currently using npm-check-updates (ncu), you likely have scripts like:",
            "Migration Steps",
            "1. Install pnpm and Setup Workspace",
            "2. Convert to Catalog Dependencies",
            "Create catalog entries in pnpm-workspace.yaml:",
            "3. Update Package Files",
            "Convert package.json files to use catalog references:",
            "4. Install PCU and Configure",
            "5. Update Scripts",
            "Replace ncu scripts with PCU equivalents:",
            "Configuration Migration",
            "ncu Configuration → PCU Configuration:"
          ]
        ],
        [
          "Migrating from Renovate",
          "migrating-from-renovate",
          [
            "Understanding the Differences",
            "Renovate vs PCU:",
            "Renovate: Automated PR creation, multi-language support, extensive configuration",
            "PCU: Manual control, pnpm-specific, catalog-focused, security-integrated",
            "Migration Strategy",
            "1. Export Renovate Configuration",
            "Analyze your current renovate.json:",
            "2. Convert to PCU Configuration",
            "Map Renovate rules to PCU equivalents:",
            "3. Setup Manual Workflows",
            "Replace automated PRs with scheduled manual reviews:",
            "4. Team Transition",
            "Phase 1: Parallel Running (2 weeks)",
            "Keep Renovate enabled",
            "Introduce PCU for manual checks",
            "Train team on PCU commands",
            "Phase 2: PCU Primary (2 weeks)",
            "Disable Renovate PR creation",
            "Use PCU for all updates",
            "Establish review processes",
            "Phase 3: Complete Migration",
            "Remove Renovate configuration",
            "Optimize PCU configuration",
            "Document new workflows",
            "Renovate Feature Mapping",
            "| Renovate Feature      | PCU Equivalent       | Notes                    |\n| --------------------- | -------------------- | ------------------------ |\n| Automated PRs         | Manual pcu update  | More control, less noise |\n| Scheduling            | Cron jobs + PCU      | Flexible timing          |\n| Group Updates         | --include patterns | Group related packages   |\n| Auto-merge            | autoUpdate: true   | Limited to safe packages |\n| Vulnerability Alerts  | pcu security       | Integrated scanning      |\n| Configuration Presets | Package rules        | Reusable patterns        |"
          ]
        ],
        [
          "Migrating from Dependabot",
          "migrating-from-dependabot",
          [
            "GitHub Integration Considerations",
            "Dependabot Advantages to Replicate:",
            "Security vulnerability alerts",
            "Automated security updates",
            "GitHub integration",
            "PR creation and management",
            "Migration Approach",
            "1. Audit Current Dependabot Configuration",
            "Review .github/dependabot.yml:",
            "2. Setup PCU with GitHub Actions",
            "Create .github/workflows/dependencies.yml:",
            "3. Security Integration",
            "Replace Dependabot security features:",
            "4. Manual Review Process",
            "Establish human-centric workflows:"
          ]
        ],
        [
          "Migrating from Manual Dependency Management",
          "migrating-from-manual-dependency-management",
          [
            "Assessment Phase",
            "Current State Analysis:",
            "Frequency: How often do you update dependencies?",
            "Process: What's your current update workflow?",
            "Testing: How do you validate updates?",
            "Security: How do you handle vulnerabilities?",
            "Common Manual Patterns:",
            "Structured Migration",
            "Phase 1: Assessment (Week 1)",
            "Phase 2: Catalog Conversion (Week 2)",
            "Phase 3: Process Integration (Week 3-4)",
            "Automation Strategy",
            "Gradual Automation:",
            "Manual Start: All updates require confirmation",
            "Semi-Automated: Auto-update dev dependencies and types",
            "Smart Automation: Auto-update patches, confirm minors",
            "Full Automation: Auto-update everything except majors",
            "Configuration Evolution:"
          ]
        ],
        [
          "Converting Non-pnpm Projects",
          "converting-non-pnpm-projects",
          [
            "From npm Projects",
            "1. Dependency Analysis",
            "2. pnpm Migration",
            "3. Catalog Extraction",
            "From Yarn Projects",
            "1. Workspace Conversion",
            "2. Migration Commands",
            "Monorepo Conversion",
            "Large Monorepo Strategy:"
          ]
        ],
        [
          "Team Transition Strategies",
          "team-transition-strategies",
          [
            "Change Management",
            "1. Communication Plan",
            "Week -2: Announce migration plan",
            "Week -1: Training sessions and documentation",
            "Week 0: Begin parallel running",
            "Week 2: Full transition",
            "Week 4: Process optimization",
            "2. Training Program",
            "Developer Training Session (1 hour):",
            "Team Lead Training (2 hours):",
            "Configuration management",
            "Security policy integration",
            "Performance optimization",
            "Monitoring and reporting",
            "Rollout Strategy",
            "Pilot Project Approach:",
            "Select Pilot Project: Choose representative but non-critical project",
            "Migration Pilot: Complete migration with pilot team",
            "Lessons Learned: Document issues and solutions",
            "Scaled Rollout: Apply learnings to other projects",
            "Risk Mitigation:",
            "Process Integration",
            "Code Review Integration:",
            "Release Integration:"
          ]
        ],
        [
          "Validation and Testing",
          "validation-and-testing",
          [
            "Migration Validation",
            "1. Functional Testing",
            "2. Performance Comparison",
            "3. Dependency Integrity",
            "Success Metrics",
            "Key Performance Indicators:",
            "Installation Speed: pnpm install vs npm install",
            "Update Frequency: Updates per month before/after",
            "Security Response: Time to fix vulnerabilities",
            "Developer Satisfaction: Team survey results",
            "Build Performance: CI/CD execution time",
            "Monitoring Dashboard:"
          ]
        ],
        [
          "Migration Checklist",
          "migration-checklist",
          [
            "Pre-Migration",
            "Assess current dependency management approach",
            "Install and test pnpm in isolated environment",
            "Plan workspace structure",
            "Identify common dependencies for catalog",
            "Backup current configuration",
            "Train key team members",
            "Migration Phase",
            "Convert to pnpm workspace structure",
            "Extract dependencies to catalog",
            "Update package.json files to use catalog references",
            "Install and configure PCU",
            "Test functionality with pilot project",
            "Update CI/CD pipelines",
            "Document new processes",
            "Post-Migration",
            "Validate all functionality works",
            "Train remaining team members",
            "Optimize PCU configuration",
            "Establish regular maintenance schedules",
            "Monitor and measure success metrics",
            "Gather feedback and iterate",
            "Troubleshooting",
            "Document common migration issues",
            "Create rollback procedures",
            "Establish support channels",
            "Regular health checks and optimization"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "Performance Optimization",
          null,
          [
            "Maximize PCU performance for large monorepos, complex workspaces, and resource-constrained environments. "
          ]
        ],
        [
          "Understanding PCU Performance",
          "understanding-pcu-performance",
          [
            "PCU performance depends on several factors:",
            "Network latency: Registry response times and bandwidth",
            "Workspace size: Number of packages and dependencies",
            "Cache efficiency: Hit rates and storage optimization",
            "System resources: CPU, memory, and disk I/O",
            "Configuration: Concurrency settings and timeout values",
            "Performance Profiling",
            "Enable detailed performance monitoring:",
            "Sample Output Analysis:"
          ]
        ],
        [
          "Configuration Optimization",
          "configuration-optimization",
          [
            "Concurrency Settings",
            "Optimize concurrent operations for your environment:",
            "Concurrency Guidelines:",
            "Small projects (under 20 packages): concurrency: 5-8",
            "Medium projects (20-100 packages): concurrency: 3-5",
            "Large projects (over 100 packages): concurrency: 1-3",
            "CI/CD environments: concurrency: 2-3",
            "Memory Management",
            "Node.js Memory Optimization:",
            "PCU Memory Configuration:"
          ]
        ],
        [
          "Caching Strategies",
          "caching-strategies",
          [
            "Local Cache Optimization",
            "Cache Configuration:",
            "Environment Variables:",
            "Cache Management Commands",
            "CI/CD Cache Integration"
          ]
        ],
        [
          "Network Optimization",
          "network-optimization",
          [
            "Registry Configuration",
            "Optimize Registry Selection:",
            "Connection Optimization:",
            "Bandwidth Management"
          ]
        ],
        [
          "Large Monorepo Strategies",
          "large-monorepo-strategies",
          [
            "Workspace Segmentation",
            "Organize Large Workspaces:",
            "Selective Processing:",
            "Incremental Processing",
            "Staged Updates:",
            "Processing Workflows:"
          ]
        ],
        [
          "Memory and Resource Management",
          "memory-and-resource-management",
          [
            "Memory Profiling",
            "Monitor Memory Usage:",
            "Memory Optimization Techniques:",
            "Disk I/O Optimization",
            "SSD vs HDD Configurations:",
            "File System Caching:"
          ]
        ],
        [
          "Performance Monitoring",
          "performance-monitoring",
          [
            "Metrics Collection",
            "Built-in Metrics:",
            "Custom Monitoring:",
            "Benchmarking",
            "Performance Benchmarks:",
            "Performance Tuning Guide",
            "Step-by-Step Optimization:",
            "Baseline Measurement",
            "Enable Caching",
            "Optimize Concurrency",
            "Network Optimization",
            "Memory Tuning"
          ]
        ],
        [
          "Troubleshooting Performance Issues",
          "troubleshooting-performance-issues",
          [
            "Common Performance Problems",
            "Slow Network Requests:",
            "Memory Issues:",
            "Cache Problems:",
            "Performance Regression Detection",
            "Automated Performance Testing:"
          ]
        ],
        [
          "Environment-Specific Optimizations",
          "environment-specific-optimizations",
          [
            "Local Development",
            "Developer Machine Setup:",
            "CI/CD Environments",
            "Optimization for Different CI Providers:",
            "Production Deployments",
            "Production-Grade Configuration:"
          ]
        ],
        [
          "Performance Checklist",
          "performance-checklist",
          [
            "Quick Wins",
            "Enable persistent caching: export PCU_CACHE_ENABLED=true",
            "Optimize concurrency for your environment",
            "Use geographical close registries",
            "Increase Node.js heap size for large projects",
            "Enable request compression and keep-alive",
            "Advanced Optimizations",
            "Implement CI/CD caching strategies",
            "Configure workspace segmentation for large monorepos",
            "Set up performance monitoring and alerts",
            "Optimize memory management for sustained operations",
            "Implement incremental processing workflows",
            "Monitoring & Maintenance",
            "Regular performance benchmarking",
            "Cache health monitoring",
            "Network latency measurement",
            "Memory usage profiling",
            "Performance regression detection"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "Quick Start",
          null,
          [
            "Use PCU as a deterministic execution layer for pnpm catalog updates. Discovery and execution are\nseparate, so a developer, CI job, or coding agent can review the exact change before it is written.",
            "PCU is designed for pnpm workspaces that define dependencies in catalog or catalogs inside\npnpm-workspace.yaml."
          ]
        ],
        [
          "Install",
          "install",
          [
            "Node.js 20 or newer and pnpm 9 or newer are supported."
          ]
        ],
        [
          "Create a reviewable plan",
          "create-a-reviewable-plan",
          [
            "Run this from the workspace root:",
            "The JSON artifact is stable and portable. It contains:",
            "a versioned schema;",
            "the exact catalog updates and affected workspace packages;",
            "normalized filters and update criteria;",
            "a SHA-256 fingerprint of pnpm-workspace.yaml;",
            "no timestamp, localized prose, or absolute checkout path.",
            "Review pcu-plan.json directly or commit it as part of an approval workflow."
          ]
        ],
        [
          "Apply exactly the reviewed plan",
          "apply-exactly-the-reviewed-plan",
          [
            "Before writing, PCU validates the schema and checks the source fingerprint. It refuses a stale plan,\nuses atomic workspace persistence, creates a rollback backup by default, and verifies the final\ncatalog versions. apply does not query the registry or call an AI provider.",
            "Applying the same plan again is safe: if every target version is already present, PCU returns success\nwith changed: false.",
            "To regenerate the lockfile in the same step, opt in explicitly:"
          ]
        ],
        [
          "Verify in CI",
          "verify-in-ci",
          [
            "verify compares each planned target with the current catalog state and emits JSON. Exit code 0\nmeans an exact match; exit code 4 means drift."
          ]
        ],
        [
          "Recover",
          "recover",
          [
            "Unless apply was run with --no-backup, its JSON result contains update.backupPath. Passing that\nexact path to the JSON rollback contract restores the reviewed pre-apply file without prompts and\nverifies its catalog structure. Interactive pcu rollback remains available for humans."
          ]
        ],
        [
          "Exit codes",
          "exit-codes",
          [
            "| Code | Meaning |\n| ---: | --- |\n| 0 | Success, including an already-applied plan |\n| 2 | Invalid input or execution/install failure |\n| 3 | The plan is stale |\n| 4 | Verification failed |\n| 5 | The plan contains unresolved conflicts |"
          ]
        ],
        [
          "Optional advisory tools",
          "optional-advisory-tools",
          [
            "Use the interactive commands when you are exploring rather than automating:",
            "AI analysis is opt-in with pcu update --ai. It can explain a proposed change, but it is never in\nthe plan → apply → verify execution path."
          ]
        ],
        [
          "What's next?",
          "whats-next",
          []
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "Troubleshooting",
          null,
          [
            "Common issues and solutions to help you resolve problems with PCU. Find answers to frequently encountered errors and debugging tips. "
          ]
        ],
        [
          "Common Errors",
          "common-errors",
          [
            "Workspace Not Found",
            "Error Message:",
            "Cause: PCU couldn't locate a pnpm-workspace.yaml file or detect a valid pnpm workspace structure.",
            "Solutions:",
            "No Catalog Dependencies",
            "Error Message:",
            "Cause: Your workspace doesn't use pnpm catalog dependencies.",
            "Solutions:",
            "Registry Access Issues",
            "Error Message:",
            "Cause: Network connectivity issues or registry access problems.",
            "Solutions:",
            "Authentication Errors",
            "Error Message:",
            "Cause: Missing or invalid authentication tokens for private registries.",
            "Solutions:",
            "Configuration File Errors",
            "Error Message:",
            "Cause: Malformed JSON or invalid configuration options.",
            "Solutions:"
          ]
        ],
        [
          "Debugging",
          "debugging",
          [
            "Enable Verbose Logging",
            "Workspace Validation"
          ]
        ],
        [
          "Performance Issues",
          "performance-issues",
          [
            "Slow Network Requests",
            "Symptoms: PCU takes a long time to check for updates",
            "Solutions:",
            "High Memory Usage",
            "Symptoms: PCU consumes excessive memory with large workspaces",
            "Solutions:"
          ]
        ],
        [
          "Environment Issues",
          "environment-issues",
          [
            "Node.js Version Compatibility",
            "Error Message:",
            "Solutions:",
            "pnpm Version Issues",
            "Error Message:",
            "Solutions:"
          ]
        ],
        [
          "Windows-Specific Issues",
          "windows-specific-issues",
          [
            "Path Separator Issues",
            "Error Message:",
            "Solutions:",
            "Permission Errors",
            "Error Message:",
            "Solutions:"
          ]
        ],
        [
          "Getting Help",
          "getting-help",
          [
            "Diagnostic Information",
            "When reporting issues, include this diagnostic information:",
            "Support Channels",
            "🐛 Bug Reports: GitHub Issues",
            "💬 Questions: GitHub Discussions",
            "📖 Documentation: Check this documentation for detailed guides",
            "🔧 Feature Requests: Use GitHub Issues with the enhancement label",
            "Issue Template",
            "When reporting bugs, please include:",
            "PCU version and command used",
            "Error message (full output with --verbose)",
            "Environment (OS, Node.js, pnpm versions)",
            "Workspace structure (pnpm-workspace.yaml, package.json)",
            "Configuration (.pcurc.json, .npmrc if relevant)",
            "Steps to reproduce the issue",
            "Expected vs actual behavior"
          ]
        ],
        [
          "Security Command Issues",
          "security-command-issues",
          [
            "Snyk Integration Problems",
            "Error Message:",
            "Cause: Snyk CLI is not installed but --snyk flag is used.",
            "Solutions:",
            "Security Fix Failures",
            "Error Message:",
            "Cause: Some vulnerabilities require manual intervention or major version updates.",
            "Solutions:",
            "Theme Command Issues",
            "Error Message:",
            "Cause: Trying to set a theme that doesn't exist.",
            "Solutions:",
            "Interactive Mode Issues",
            "Error Message:",
            "Cause: Running PCU in a non-interactive environment (CI, pipe, etc.).",
            "Solutions:"
          ]
        ],
        [
          "Command-Specific Issues",
          "command-specific-issues",
          [
            "Analyze Command Issues",
            "Error Message:",
            "Cause: Analyzing a package that doesn't exist in the specified catalog.",
            "Solutions:",
            "Update Command Failures",
            "Error Message:",
            "Cause: File permission issues or workspace structure problems.",
            "Solutions:"
          ]
        ],
        [
          "Advanced Debugging",
          "advanced-debugging",
          [
            "Memory Leak Investigation",
            "Symptoms: PCU process memory keeps growing during operation",
            "Debug Steps:",
            "Registry Response Issues",
            "Symptoms: Inconsistent results or timeout errors",
            "Debug Steps:",
            "Configuration Inheritance Issues",
            "Symptoms: Configuration not being applied as expected",
            "Debug Steps:"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "Advanced Writing Features",
          null,
          [
            "Master the advanced features that make your documentation professional and effective. Learn about metadata, lead paragraphs, styling contexts, and the best practices that separate great docs from good ones. "
          ]
        ],
        [
          "Metadata and SEO",
          "metadata-and-seo",
          [
            "Every page should include metadata at the top:"
          ]
        ],
        [
          "Lead Paragraphs",
          "lead-paragraphs",
          [
            "Make introductory paragraphs stand out with {{ className: 'lead' }}:"
          ]
        ],
        [
          "Styling Context",
          "styling-context",
          [
            "The not-prose Class",
            "Use <div className=\"not-prose\"> for components that need to escape prose styling:"
          ]
        ],
        [
          "Documentation Best Practices",
          "documentation-best-practices",
          [
            "Content Structure",
            "Start with metadata and clear titles",
            "Use lead paragraphs for introductions",
            "Organize with proper heading hierarchy",
            "Add Notes for important information",
            "Include practical code examples",
            "End with clear next steps",
            "Writing Style",
            "Use active voice",
            "Be concise but complete",
            "Include examples for every concept",
            "Test all code snippets",
            "Maintain consistent terminology",
            "Organization",
            "Group related topics together",
            "Use cross-references liberally",
            "Provide multiple entry points",
            "Consider the user's journey",
            "Include search-friendly headings"
          ]
        ],
        [
          "Complete Documentation Workflow",
          "complete-documentation-workflow",
          [
            "Plan: Outline your content structure",
            "Write: Use appropriate components for each section",
            "Review: Check for completeness and accuracy",
            "Test: Verify all examples work",
            "Iterate: Improve based on feedback",
            "You now have all the tools needed to create world-class documentation!"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "Writing API Documentation",
          null,
          [
            "Create comprehensive API documentation that developers love. Learn to use Properties for parameters, Tags for HTTP methods, Libraries for showcasing SDKs, and specialized components that make API references clear and actionable. "
          ]
        ],
        [
          "Properties Lists",
          "properties-lists",
          [
            "Document API parameters with <Properties> and <Property>:",
            "Unique identifier for the resource. Automatically generated when the resource is created.",
            "Display name of the resource. Must be between 1 and 100 characters.",
            "Valid email address. Must be unique across all users.",
            "ISO 8601 timestamp indicating when the resource was created."
          ]
        ],
        [
          "HTTP Method Tags",
          "http-method-tags",
          [
            "Tags automatically get colored based on HTTP methods:",
            "GET\nPOST\nPUT\nDELETE\nCUSTOM\nSUCCESS\nERROR"
          ]
        ],
        [
          "Libraries Components",
          "libraries-components",
          [
            "Full Library Grid",
            "Showcase all official SDKs using the <Libraries> component:",
            "Single Library",
            "Use the <Library> component to display individual libraries:",
            "Compact Libraries",
            "For smaller spaces, use compact mode with descriptions:",
            "Or without descriptions for even more compact display:",
            "Library Component Options",
            "language: Choose from php, ruby, node, python, go (default: node)",
            "compact: Use smaller styling (default: false)",
            "showDescription: Show/hide description text (default: true)",
            "Libraries Use Cases",
            "<Libraries />: Full SDK overview pages, getting started sections",
            "<Library />: Inline documentation, specific language guides",
            "<Library compact />: Sidebar references, compact listings"
          ]
        ],
        [
          "API Best Practices",
          "api-best-practices",
          [
            "Always document all parameters with Properties components",
            "Include example requests and responses",
            "Use proper HTTP status codes with Tags",
            "Provide clear error messages",
            "Include authentication requirements",
            "Use Libraries component for SDK pages",
            "Keep Properties lists focused and well-organized"
          ]
        ],
        [
          "Next Steps",
          "next-steps",
          [
            "Complete your documentation journey with Advanced Features."
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "Writing Basics",
          null,
          [
            "Master the fundamental building blocks of documentation writing. This guide covers standard Markdown syntax, formatting options, and basic elements you'll use in every document. "
          ]
        ],
        [
          "Markdown Fundamentals",
          "markdown-fundamentals",
          [
            "Standard Markdown formatting is fully supported and forms the foundation of all documentation:",
            "Bold text for emphasis and importanceItalic text for subtle emphasisinline code for technical terms, commands, and short code snippets",
            "You can combine these: bold and italic or bold with code"
          ]
        ],
        [
          "Text Formatting",
          "text-formatting",
          [
            "Emphasis and Strong Text",
            "Use asterisks or underscores for emphasis:",
            "Code and Technical Terms",
            "For inline code, variables, or technical terms, use backticks:"
          ]
        ],
        [
          "Lists and Organization",
          "lists-and-organization",
          [
            "Unordered Lists",
            "Perfect for feature lists, requirements, or any non-sequential items:",
            "Main feature or point",
            "Another important item",
            "Third consideration",
            "Nested sub-point",
            "Additional sub-detail",
            "Back to main level",
            "Ordered Lists",
            "Use for step-by-step instructions, procedures, or prioritized items:",
            "First step in the process",
            "Second step with important details",
            "Third step",
            "Sub-step with specific instructions",
            "Another sub-step",
            "Final step",
            "Task Lists",
            "Great for checklists and progress tracking:",
            "[x] Completed task",
            "[x] Another finished item",
            "[ ] Pending task",
            "[ ] Future enhancement"
          ]
        ],
        [
          "Links and Navigation",
          "links-and-navigation",
          [
            "Internal Links",
            "Link to other pages in your documentation:",
            "Examples:",
            "Command Reference Guide",
            "Troubleshooting",
            "SDK Documentation",
            "External Links",
            "Link to external resources:",
            "Anchor Links",
            "Link to specific sections within pages:"
          ]
        ],
        [
          "Headings and Structure",
          "headings-and-structure",
          [
            "Create clear document hierarchy with proper heading levels:",
            "Heading Best Practices",
            "Use H1 only for page title (handled by metadata)",
            "Start sections with H2, subsections with H3",
            "Don't skip heading levels (no H2 → H4)",
            "Keep headings descriptive and scannable",
            "Use sentence case: \"Getting started\" not \"Getting Started\""
          ]
        ],
        [
          "Quotes and Callouts",
          "quotes-and-callouts",
          [
            "Blockquotes",
            "For important quotes or references:",
            "\"Documentation is a love letter that you write to your future self.\"— Damian Conway",
            "Important Note: This is a highlighted quote with additional context that spans multiple lines and provides crucial information.",
            "Multi-paragraph Quotes",
            "This is the first paragraph of a longer quote.",
            "This is the second paragraph that continues the thought with additional detail and context."
          ]
        ],
        [
          "Horizontal Rules",
          "horizontal-rules",
          [
            "Separate major sections with horizontal rules:",
            "Creates a visual break:"
          ]
        ],
        [
          "Tables",
          "tables",
          [
            "Simple tables for structured data:",
            "| Feature   | Basic | Pro      | Enterprise |\n| --------- | ----- | -------- | ---------- |\n| Users     | 10    | 100      | Unlimited  |\n| Storage   | 1GB   | 10GB     | 100GB      |\n| API Calls | 1,000 | 10,000   | Unlimited  |\n| Support   | Email | Priority | 24/7 Phone |",
            "Table Alignment",
            "Control column alignment:",
            "| Left Aligned | Center Aligned | Right Aligned |\n| :----------- | :------------: | ------------: |\n| Text         |      Text      |          Text |\n| More content |  More content  |  More content |"
          ]
        ],
        [
          "Special Characters",
          "special-characters",
          [
            "Use backslashes to escape special Markdown characters:"
          ]
        ],
        [
          "Line Breaks and Spacing",
          "line-breaks-and-spacing",
          [
            "End lines with two spaces for hard breaks",
            "Use empty lines to separate paragraphs",
            "Use \\ at line end for breaks in lists"
          ]
        ],
        [
          "Next Steps",
          "next-steps",
          [
            "Once you've mastered these basics, explore:",
            "Writing Components - Interactive UI elements",
            "Writing Code - Code blocks and syntax highlighting",
            "Writing Layout - Multi-column layouts and organization",
            "Writing API - API documentation components",
            "Writing Advanced - Advanced features and best practices",
            "These fundamentals form the foundation of all great documentation. Master them first, then build upon them with the advanced components and techniques covered in the other guides."
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "Writing Code",
          null,
          [
            "Master the art of presenting code in your documentation. Learn to use syntax highlighting, create multi-language examples, and organize code blocks effectively to help developers understand and implement your solutions. "
          ]
        ],
        [
          "Single Code Blocks",
          "single-code-blocks",
          [
            "Basic code blocks with automatic syntax highlighting:",
            "The JavaScript code block above is created using the following MDX syntax:",
            "Python example:",
            "Python code block MDX syntax:",
            "Bash/Shell commands:",
            "Bash code block MDX syntax:"
          ]
        ],
        [
          "CodeGroup for Multiple Languages",
          "code-group-for-multiple-languages",
          [
            "Use <CodeGroup> to show the same example in different languages:",
            "The multi-language code group above is created using the following MDX syntax:"
          ]
        ],
        [
          "API Endpoint Examples",
          "api-endpoint-examples",
          [
            "For API documentation, use HTTP method tags:",
            "The API endpoint example above is created using the following MDX syntax, note the tag and label attributes:",
            "Code Block Titles",
            "You can also add titles to individual code blocks:"
          ]
        ],
        [
          "Supported Languages",
          "supported-languages",
          [
            "Our code blocks support syntax highlighting for many programming languages, including but not limited to:",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Shell scripts: bash, shell, sh",
            "Other languages: json, yaml, xml, sql, css, html, markdown, diff",
            "Example:",
            "JSON code block MDX syntax:",
            "Code comparison (Diff):",
            "Diff code block MDX syntax:"
          ]
        ],
        [
          "Best Practices",
          "best-practices",
          [
            "Always specify the language for syntax highlighting",
            "Use descriptive titles to differentiate code examples",
            "Include complete, runnable examples",
            "Keep examples concise but functional",
            "Use consistent formatting and style",
            "Order language tabs in CodeGroup by usage frequency"
          ]
        ],
        [
          "Next Steps",
          "next-steps",
          [
            "Continue with Layout Components to organize your content effectively."
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "Writing Components",
          null,
          [
            "Enhance your documentation with interactive UI components. Learn to use Notes for important information, Buttons for actions, and other elements that make your docs more engaging and functional. "
          ]
        ],
        [
          "Notes and Callouts",
          "notes-and-callouts",
          [
            "The <Note> component is perfect for highlighting important information, warnings, or tips that readers should pay special attention to.",
            "Basic Note Usage",
            "This is a basic note component. It automatically styles content with an emerald theme and info\nicon, making important information stand out from regular text.",
            "Notes with Rich Content",
            "Notes support full Markdown formatting, including bold text, italic text, inline code, and even links to other pages.",
            "Important Setup Requirement: Before proceeding, ensure you have: - Node.js version 18 or\nhigher installed - Access to the project repository - Valid API credentials configured See the\nCommand Reference Guide for credential setup.",
            "Multi-paragraph Notes",
            "This is the first paragraph of a longer note that contains multiple pieces of related information.",
            "This second paragraph continues the thought with additional context. You can include as many paragraphs as needed to fully explain the concept.",
            "Remember that good notes are concise but complete, providing just enough information to help readers understand the importance of the message."
          ]
        ],
        [
          "Buttons and Actions",
          "buttons-and-actions",
          [
            "The <Button> component creates call-to-action elements that guide users to important links or next steps.",
            "Button Variants",
            "Filled Buttons",
            "Use for primary actions and the most important calls-to-action:",
            "Learn About Code Components",
            "Outline Buttons",
            "Perfect for secondary actions and alternative paths:",
            "Explore Layout Components",
            "Text Buttons",
            "Subtle links that blend with content while still standing out:",
            "Back to Basics",
            "Button Arrows",
            "Buttons support directional arrows to indicate navigation:",
            "Previous Section",
            "Next Section",
            "Button Best Practices",
            "Use sparingly: Too many buttons reduce their effectiveness",
            "Clear action words: \"Get Started\", \"Learn More\", \"View Documentation\"",
            "Logical hierarchy: Filled for primary, outline for secondary, text for tertiary",
            "Directional arrows: Left for \"back/previous\", right for \"forward/next\"",
            "Wrap in not-prose: Always use <div className=\"not-prose\"> wrapper"
          ]
        ],
        [
          "Component Styling Context",
          "component-styling-context",
          [
            "The not-prose Wrapper",
            "Some components need to escape the default prose styling. Always wrap these components:",
            "Components that require not-prose:",
            "All <Button> components",
            "Custom layout elements",
            "Interactive widgets",
            "Complex styled components",
            "Components that work without not-prose:",
            "<Note> components (self-contained styling)",
            "Standard Markdown elements",
            "Text-based components",
            "Multiple Components",
            "When displaying multiple components together:",
            "API Documentation Guide",
            "Advanced Features",
            "Review the Basics"
          ]
        ],
        [
          "Component Accessibility",
          "component-accessibility",
          [
            "All components are built with accessibility in mind:",
            "Semantic HTML: Proper button and link elements",
            "ARIA labels: Screen reader support where needed",
            "Keyboard navigation: Full keyboard accessibility",
            "Focus management: Clear focus indicators",
            "Color contrast: WCAG compliant color schemes"
          ]
        ],
        [
          "When to Use Each Component",
          "when-to-use-each-component",
          [
            "Use Notes When:",
            "Highlighting critical information",
            "Warning about potential issues",
            "Providing helpful tips or context",
            "Explaining prerequisites or requirements",
            "Calling attention to important changes",
            "Use Buttons When:",
            "Guiding to next logical steps",
            "Linking to external resources",
            "Creating clear call-to-action moments",
            "Navigation between major sections",
            "Highlighting primary actions",
            "Avoid Overuse:",
            "Don't use notes for every paragraph",
            "Limit buttons to 1-2 per section",
            "Reserve components for truly important content",
            "Let regular text and Markdown carry most content"
          ]
        ],
        [
          "Next Steps",
          "next-steps",
          [
            "Now that you understand UI components, explore:",
            "Writing Code - Syntax highlighting and code blocks",
            "Writing Layout - Multi-column layouts and organization",
            "Writing API - API documentation components",
            "Writing Advanced - Advanced features and metadata",
            "Master these interactive elements to create documentation that not only informs but guides and engages your readers effectively."
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "Writing Layout",
          null,
          [
            "Create sophisticated layouts that enhance readability and user experience. Learn to use Row and Col components for multi-column designs, sticky positioning, and effective content organization. "
          ]
        ],
        [
          "Two-Column Layout",
          "two-column-layout",
          [
            "Use <Row> and <Col> for side-by-side content:",
            "Left Column",
            "This content appears in the left column. Perfect for explanations, descriptions, or complementary information.",
            "Key point one",
            "Important detail",
            "Additional context",
            "Right Column"
          ]
        ],
        [
          "Sticky Column Layout",
          "sticky-column-layout",
          [
            "Make content stick while scrolling:",
            "Scrolling Content",
            "This is regular content that scrolls normally. You can put long explanations here that users will scroll through to read completely.",
            "This column contains the main narrative or detailed information that requires scrolling to consume fully.",
            "Sticky Reference",
            "This stays visible as you scroll."
          ]
        ],
        [
          "Guides Component",
          "guides-component",
          [
            "Display a grid of guide links using the <Guides> component:",
            "The Guides component shows a predefined set of documentation guides with links and descriptions. Perfect for overview pages and getting started sections."
          ]
        ],
        [
          "Resources Component",
          "resources-component",
          [
            "Showcase main resource categories with animated cards:",
            "The Resources component displays animated resource cards with icons and descriptions. Great for main landing pages and API overview sections."
          ]
        ],
        [
          "Icons",
          "icons",
          [
            "Use individual icons for inline decoration or custom layouts:",
            "Available Icons",
            "<UserIcon /> - Single user",
            "<UsersIcon /> - Multiple users",
            "<EnvelopeIcon /> - Messages/email",
            "<ChatBubbleIcon /> - Conversations",
            "<BookIcon /> - Documentation",
            "<CheckIcon /> - Success/completion",
            "<BellIcon /> - Notifications",
            "<CogIcon /> - Settings/configuration"
          ]
        ],
        [
          "Layout Best Practices",
          "layout-best-practices",
          [
            "Use two-column layouts for complementary content",
            "Sticky columns work best for reference material",
            "Keep columns balanced in content length",
            "Ensure mobile responsiveness (columns stack on small screens)",
            "Use Guides for documentation overview pages",
            "Use Resources for API category showcases",
            "Icons work well with custom Tailwind classes for colors and sizing"
          ]
        ],
        [
          "Next Steps",
          "next-steps",
          [
            "Continue with API Documentation for specialized components."
          ]
        ]
      ]
    }
  ],
  "es": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "Análisis de IA",
          null,
          [
            "PCU se integra con herramientas CLI de IA para proporcionar análisis inteligente de dependencias, evaluaciones de seguridad y recomendaciones de actualización. "
          ]
        ],
        [
          "Descripción General",
          "descripcion-general",
          [
            "El análisis de IA mejora las capacidades de PCU al proporcionar:",
            "Análisis de Impacto: Comprenda cómo las actualizaciones afectan su código",
            "Evaluación de Seguridad: Obtenga análisis de vulnerabilidades de seguridad impulsado por IA",
            "Verificación de Compatibilidad: Detecte posibles cambios incompatibles",
            "Recomendaciones de Actualización: Reciba sugerencias inteligentes para actualizaciones seguras"
          ]
        ],
        [
          "Proveedores de IA Soportados",
          "proveedores-de-ia-soportados",
          [
            "PCU detecta automáticamente y utiliza las herramientas CLI de IA disponibles en el siguiente orden de prioridad:",
            "| Proveedor | Prioridad | Capacidades                                         |\n| --------- | --------- | --------------------------------------------------- |\n| Gemini    | 100       | Impacto, Seguridad, Compatibilidad, Recomendaciones |\n| Claude    | 80        | Impacto, Seguridad, Compatibilidad, Recomendaciones |\n| Codex     | 60        | Impacto, Compatibilidad, Recomendaciones            |\n| Cursor    | 40        | Impacto, Recomendaciones                            |",
            "Si no hay proveedores de IA disponibles, PCU recurre automáticamente a un motor de análisis basado\nen reglas que proporciona análisis básico de dependencias utilizando reglas predefinidas."
          ]
        ],
        [
          "Comandos",
          "comandos",
          [
            "Verificar Proveedores de IA Disponibles",
            "Vea qué herramientas de IA están disponibles en su sistema:",
            "Este comando muestra:",
            "Herramientas CLI de IA disponibles detectadas en su sistema",
            "Información de versión para cada proveedor",
            "El mejor proveedor disponible que se utilizará para el análisis",
            "Opciones del Comando AI",
            "Mostrar estado de todos los proveedores de IA (comportamiento predeterminado)",
            "Probar análisis de IA con una solicitud de muestra para verificar conectividad del proveedor",
            "Mostrar estadísticas de caché de análisis de IA incluyendo tasa de aciertos y tamaño",
            "Limpiar caché de análisis de IA para liberar espacio o restablecer respuestas en caché",
            "Actualización con IA",
            "Actualice dependencias con análisis impulsado por IA:",
            "La actualización mejorada con IA proporciona:",
            "Evaluación de riesgo inteligente para cada actualización",
            "Detección de cambios incompatibles con explicaciones",
            "Identificación de vulnerabilidades de seguridad",
            "Orden de actualización recomendado",
            "Análisis con IA",
            "Analice una actualización de paquete específica con asistencia de IA:",
            "El comando analyze usa el catálogo default por defecto. Puede especificar un catálogo\ndiferente como primer argumento: pcu analyze my-catalog react"
          ]
        ],
        [
          "Tipos de Análisis",
          "tipos-de-analisis",
          [
            "Análisis de Impacto",
            "Evalúe cómo una actualización de dependencia afectará su proyecto:",
            "Identifique todos los paquetes del workspace que usan la dependencia",
            "Analice cambios de API entre versiones",
            "Estime el esfuerzo de migración requerido",
            "Sugiera áreas de enfoque para pruebas",
            "Análisis de Seguridad",
            "Proporciona evaluación enfocada en seguridad:",
            "Identifique vulnerabilidades conocidas en la versión actual",
            "Verifique correcciones de seguridad en la nueva versión",
            "Evalúe actualizaciones de paquetes relacionados con seguridad",
            "Recomiende mejores prácticas de seguridad",
            "Análisis de Compatibilidad",
            "Verifique posibles problemas de compatibilidad:",
            "Detecte cambios incompatibles de API",
            "Identifique conflictos de dependencias peer",
            "Verifique compatibilidad de versión de Node.js",
            "Valide compatibilidad de TypeScript",
            "Recomendaciones",
            "Genere recomendaciones accionables:",
            "Sugiera orden óptimo de actualización",
            "Recomiende rangos de versión",
            "Identifique paquetes para actualizar juntos",
            "Proporcione estrategias de reversión"
          ]
        ],
        [
          "Comportamiento de Respaldo",
          "comportamiento-de-respaldo",
          [
            "Cuando los proveedores de IA no están disponibles, PCU utiliza un motor de análisis basado en reglas incorporado:",
            "Características del Análisis Basado en Reglas",
            "Evaluación de Salto de Versión: Evalúe el riesgo basado en cambios de semver",
            "Patrones de Cambios Conocidos: Detecte cambios incompatibles para paquetes populares (React, TypeScript, ESLint, etc.)",
            "Paquetes Sensibles a Seguridad: Marque paquetes relacionados con seguridad para revisión cuidadosa",
            "Estimación de Esfuerzo: Proporcione estimaciones de esfuerzo de migración",
            "Niveles de Riesgo",
            "| Nivel   | Descripción                                                |\n| ------- | ---------------------------------------------------------- |\n| Bajo    | Actualizaciones patch, típicamente seguras de aplicar      |\n| Medio   | Actualizaciones minor o saltos de versión minor grandes    |\n| Alto    | Actualizaciones de versión major con cambios incompatibles |\n| Crítico | Múltiples saltos de versión major o versiones pre-release  |"
          ]
        ],
        [
          "Configuración",
          "configuracion",
          [
            "Variables de Entorno",
            "Ruta personalizada al ejecutable CLI de Gemini",
            "Ruta personalizada al ejecutable CLI de Claude",
            "Ruta personalizada al ejecutable CLI de Codex",
            "Ruta personalizada al ejecutable CLI de Cursor",
            "Métodos de Detección",
            "PCU utiliza múltiples estrategias para detectar proveedores de IA:",
            "Variables de Entorno: Verificar variables de ruta personalizadas",
            "Búsqueda en PATH: Usar comando which para encontrar ejecutables",
            "Rutas Conocidas: Verificar ubicaciones de instalación comunes",
            "Rutas de Aplicación: Verificar aplicaciones GUI (ej. Cursor.app)"
          ]
        ],
        [
          "Ejemplos de Uso",
          "ejemplos-de-uso",
          [
            "Flujo de Trabajo de Actualización Segura",
            "Integración CI/CD",
            "Análisis por Lotes"
          ]
        ],
        [
          "Mejores Prácticas",
          "mejores-practicas",
          [
            "Cuándo Usar Análisis de IA",
            "Actualizaciones de Versión Major: Siempre use análisis de IA para saltos de versión major",
            "Paquetes Sensibles a Seguridad: Use para paquetes de autenticación, criptografía y sesión",
            "Bases de Código Grandes: La IA ayuda a identificar áreas afectadas en monorepos",
            "Detección de Cambios Incompatibles: La IA proporciona explicaciones detalladas",
            "Consideraciones de Rendimiento",
            "El análisis de IA agrega tiempo de procesamiento comparado con actualizaciones estándar",
            "Use --dry-run para previsualizar recomendaciones de IA sin aplicar cambios",
            "Considere usar respaldo basado en reglas para pipelines CI/CD más rápidos cuando la IA no es crítica",
            "Combinación con Otras Características"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "Mejores Prácticas",
          null,
          [
            "Aprende cómo usar PCU efectivamente en entornos de equipo, flujos de trabajo empresariales y sistemas de producción. "
          ]
        ],
        [
          "Colaboración en Equipo",
          "colaboracion-en-equipo",
          [
            "Configuración Compartida",
            "Mantén tu configuración de PCU consistente entre miembros del equipo comprometiendo tu .pcurc.json al control de versiones:",
            "Directrices de Revisión de Código",
            "Lista de Verificación Pre-Revisión:",
            "Ejecutar pcu check --dry-run para previsualizar cambios",
            "Verificar que no hay cambios disruptivos en actualizaciones de versión mayor",
            "Probar funcionalidad crítica después de actualizaciones de dependencias",
            "Revisar archivos CHANGELOG para paquetes actualizados",
            "Proceso de Revisión:",
            "Seguridad Primero: Revisar siempre inmediatamente las actualizaciones de dependencias relacionadas con seguridad",
            "Agrupar Actualizaciones Relacionadas: Agrupar paquetes relacionados (ej. ecosistema React) en PRs únicos",
            "Documentar Razones: Incluir justificación para fijación de versiones o exclusiones",
            "Cobertura de Pruebas: Asegurar pruebas adecuadas antes de fusionar actualizaciones de dependencias",
            "Estándares de Comunicación",
            "Usa mensajes de commit claros al actualizar dependencias:"
          ]
        ],
        [
          "Uso Empresarial",
          "uso-empresarial",
          [
            "Gobernanza y Cumplimiento",
            "Proceso de Aprobación de Dependencias:",
            "Escaneo de Seguridad: Todas las actualizaciones deben pasar auditorías de seguridad",
            "Cumplimiento de Licencias: Verificar compatibilidad de licencias con políticas internas",
            "Requisitos de Estabilidad: Preferir versiones LTS en entornos de producción",
            "Gestión de Cambios: Seguir procesos establecidos de aprobación de cambios",
            "Configuración para Empresa:",
            "Integración de Registro Privado",
            "Configura PCU para entornos corporativos con registros privados:",
            "Variables de Entorno:",
            "Rastro de Auditoría y Reportes",
            "Mantén registros completos de cambios de dependencias:"
          ]
        ],
        [
          "Flujos de Trabajo de Lanzamiento",
          "flujos-de-trabajo-de-lanzamiento",
          [
            "Integración de Versionado Semántico",
            "Alinea las actualizaciones de dependencias con tu ciclo de lanzamiento:",
            "Fase de Pre-Lanzamiento:",
            "Preparación de Lanzamiento:",
            "Post-Lanzamiento:",
            "Pruebas en Entorno de Staging",
            "Validación Pre-Producción:"
          ]
        ],
        [
          "Mejores Prácticas de Seguridad",
          "mejores-practicas-de-seguridad",
          [
            "Gestión de Vulnerabilidades",
            "Respuesta Inmediata PCU:",
            "Severidad Crítica/Alta: Actualizar dentro de 24 horas",
            "Severidad Moderada: Actualizar dentro de 1 semana",
            "Severidad Baja: Incluir en próximo ciclo de actualización regular",
            "Validación de Dependencias",
            "Configuración de Seguridad:",
            "Revisiones Manuales de Seguridad:",
            "Revisar todas las nuevas dependencias antes del primer uso",
            "Auditar mantenedores de paquetes y conteos de descarga",
            "Verificar autenticidad y firmas de paquetes",
            "Verificar problemas de seguridad conocidos en cadenas de dependencias",
            "Control de Acceso",
            "Gestión de Tokens:"
          ]
        ],
        [
          "Optimización de Rendimiento",
          "optimizacion-de-rendimiento",
          [
            "Estrategias de Cache",
            "Desarrollo Local:",
            "Optimización CI/CD:",
            "Manejo de Monorepos Grandes",
            "Configuración para 100+ Paquetes:",
            "Procesamiento Selectivo:",
            "Optimización de Red",
            "Configuración de Registro:"
          ]
        ],
        [
          "Manejo de Errores y Recuperación",
          "manejo-de-errores-y-recuperacion",
          [
            "Resolución de Errores Comunes",
            "Problemas de Red:",
            "Problemas de Memoria:",
            "Respaldo y Recuperación",
            "Crear Respaldos Antes de Actualizaciones Mayores:",
            "Estrategia de Rollback de Versión:",
            "Monitoreo y Alertas",
            "Integración CI/CD:"
          ]
        ],
        [
          "Patrones de Integración",
          "patrones-de-integracion",
          [
            "Integración IDE y Editor",
            "Configuración VS Code:",
            "Scripts de Automatización",
            "Scripts Package.json:",
            "Integración Git Hooks:"
          ]
        ],
        [
          "Lista de Verificación de Referencia Rápida",
          "lista-de-verificacion-de-referencia-rapida",
          [
            "Flujo de Trabajo Diario",
            "Verificar actualizaciones de seguridad: pcu security",
            "Revisar dependencias desactualizadas: pcu check --limit 10",
            "Actualizar versiones patch: pcu update --target patch",
            "Flujo de Trabajo Semanal",
            "Verificación comprehensiva de dependencias: pcu check",
            "Actualizar versiones menores: pcu update --target minor --interactive",
            "Revisar y actualizar reglas de exclusión",
            "Generar reportes de dependencias para revisión del equipo",
            "Flujo de Trabajo Mensual",
            "Revisar actualizaciones de versión mayor: pcu check --target latest",
            "Actualizar dependencias de desarrollo: pcu update --dev",
            "Auditar licencias y cumplimiento de dependencias",
            "Revisar y optimizar configuración de PCU",
            "Limpiar dependencias no utilizadas",
            "Antes de Lanzamientos",
            "Ejecutar auditoría completa de dependencias: pcu security --comprehensive",
            "Crear respaldo: pcu update --create-backup",
            "Probar en entorno de staging",
            "Generar notas de lanzamiento con cambios de dependencias"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "Integración CI/CD",
          null,
          [
            "Integra PCU en tus pipelines de integración continua y despliegue. PCU puede integrarse sin problemas con flujos de trabajo CI/CD existentes, soportando GitHub Actions, GitLab CI, Jenkins, Azure DevOps y otras plataformas. "
          ]
        ],
        [
          "Integración con GitHub Actions",
          "integracion-con-git-hub-actions",
          [
            "Flujo de Trabajo Básico de Verificación de Dependencias"
          ]
        ],
        [
          "Integración con GitLab CI",
          "integracion-con-git-lab-ci",
          [
            "Pipeline de GitLab CI para gestión de dependencias con PCU:"
          ]
        ],
        [
          "Integración con Pipeline de Jenkins",
          "integracion-con-pipeline-de-jenkins",
          [
            "Pipeline de Jenkins de nivel empresarial para gestión de dependencias:"
          ]
        ],
        [
          "Pipeline de Azure DevOps",
          "pipeline-de-azure-dev-ops",
          [
            "Pipeline de Azure DevOps para integración con PCU:"
          ]
        ],
        [
          "Mejores Prácticas Generales de CI/CD",
          "mejores-practicas-generales-de-ci-cd",
          [
            "Configuración de Variables de Entorno",
            "Configura estas variables de entorno en todas las plataformas CI/CD para optimizar el comportamiento de PCU:",
            "Consideraciones de Seguridad",
            "Gestión de Tokens de Acceso",
            "Asegura la gestión segura de tokens de acceso en entornos CI/CD:",
            "Estrategia de Protección de Ramas",
            "Configura protección de ramas para prevenir pushes directos a la rama main:",
            "Requerir revisiones de pull request",
            "Requerir que las verificaciones de estado pasen",
            "Restringir pushes a ramas protegidas",
            "Requerir commits firmados",
            "Solución de Problemas",
            "Problemas Comunes de CI/CD",
            "Errores de Permisos",
            "Problemas de Caché",
            "Timeouts de Red",
            "Monitoreo y Reportes",
            "Creación de Dashboards",
            "Usa características nativas de las plataformas CI/CD para crear dashboards de gestión de dependencias:",
            "GitHub Actions: Usar Action insights y gráficos de dependencias",
            "GitLab CI: Aprovechar Security Dashboard y escaneo de dependencias",
            "Jenkins: Configurar plugin HTML Publisher",
            "Azure DevOps: Usar Dashboards y Analytics",
            "Configuración de Notificaciones",
            "Configura notificaciones apropiadas para mantener informados a los equipos:"
          ]
        ],
        [
          "Integración con Docker",
          "integracion-con-docker",
          [
            "Flujos de Trabajo PCU Contenerizados",
            "Estos ejemplos de integración CI/CD proporcionan soluciones completas de gestión automatizada de dependencias, asegurando que tus proyectos se mantengan actualizados y seguros."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "Referencia de Comandos",
          null,
          [
            "Referencia completa para todos los comandos y opciones de PCU. Aprende sobre cada comando, flag y opción de configuración disponible. "
          ]
        ],
        [
          "Resumen de Comandos",
          "resumen-de-comandos",
          [
            "PCU proporciona varios comandos principales con nombres completos y atajos convenientes:",
            "| Comando Completo | Atajos y Alias                            | Descripción                                             |\n| ---------------- | ----------------------------------------- | ------------------------------------------------------- |\n| pcu init       | pcu i                                   | Inicializar workspace PNPM y configuración PCU          |\n| pcu check      | pcu chk, pcu -c, pcu --check        | Verificar dependencias de catálogo desactualizadas      |\n| pcu update     | pcu u, pcu -u, pcu --update         | Actualizar dependencias de catálogo                     |\n| pcu analyze    | pcu a, pcu -a, pcu --analyze        | Analizar impacto de actualizaciones de dependencias     |\n| pcu ai         | -                                         | Gestión de proveedores AI y pruebas de análisis         |\n| pcu workspace  | pcu w, pcu -s, pcu --workspace-info | Mostrar información y validación del workspace          |\n| pcu theme      | pcu t, pcu -t, pcu --theme          | Configurar temas de color y configuraciones UI          |\n| pcu security   | pcu sec                                 | Escaneo y correcciones de vulnerabilidades de seguridad |\n| pcu rollback   | -                                         | Revertir actualizaciones de catálogo a un estado anterior |\n| pcu help       | pcu h, pcu -h                         | Mostrar información de ayuda                            |",
            "Atajos Especiales",
            "| Atajo                  | Comando Equivalente        | Descripción                                                |\n| ---------------------- | -------------------------- | ---------------------------------------------------------- |\n| pcu -i               | pcu update --interactive | Modo de actualización interactiva                          |\n| pcu --security-audit | pcu security             | Ejecutar escaneo de seguridad                              |\n| pcu --security-fix   | pcu security --fix-vulns | Ejecutar escaneo de seguridad con correcciones automáticas |"
          ]
        ],
        [
          "Modo Híbrido",
          "modo-hibrido",
          [
            "PCU incluye Modo Híbrido - cuando ejecutas cualquier comando sin flags, entra automáticamente en modo interactivo para guiarte a través de las opciones.",
            "Comandos Soportados",
            "El modo híbrido está disponible para los siguientes comandos:",
            "| Comando      | Opciones Interactivas                               |\n| ------------ | --------------------------------------------------- |\n| check      | Formato, target, prerelease, patrones include/exclude |\n| update     | Catálogo, formato, target, backup, dry-run          |\n| analyze    | Formato                                             |\n| workspace  | Validación, estadísticas, formato                   |\n| theme      | Selección de tema, estilo de progreso               |\n| security   | Formato, severidad, auto-fix                        |\n| init       | Plantilla, opciones de framework, asistente interactivo |\n| ai         | Estado de proveedor, prueba, operaciones de caché   |\n| rollback   | Selección de versión, formato                       |",
            "Beneficios",
            "Flexibilidad: Cambio fluido entre automatización para scripts y guía interactiva para exploración",
            "Descubribilidad: Explora funciones disponibles a través de prompts interactivos sin memorizar todas las opciones",
            "Eficiencia: Usuarios avanzados usan flags directamente mientras nuevos usuarios obtienen experiencia guiada"
          ]
        ],
        [
          "pcu init - Inicializar Workspace",
          "pcu-init-inicializar-workspace",
          [
            "Inicializar un entorno completo de workspace PNPM con configuración PCU.",
            "Opciones",
            "Sobrescribir archivo de configuración existente sin confirmación",
            "Generar configuración comprensiva con todas las opciones disponibles",
            "Lanzar asistente de configuración interactivo con configuración guiada",
            "Plantilla de configuración: minimal, standard, full, monorepo, enterprise",
            "Crear estructura de workspace PNPM si falta",
            "Omitir creación de estructura de workspace PNPM",
            "Nombre de directorio para paquetes del workspace",
            "Incluir reglas de paquetes comunes en configuración",
            "Agregar reglas de paquetes y configuraciones específicas de TypeScript",
            "Agregar reglas de paquetes del ecosistema React",
            "Agregar reglas de paquetes del ecosistema Vue",
            "Formato de salida: table, json, yaml, minimal",
            "Directorio del workspace (predeterminado: directorio actual)",
            "Mostrar información detallada y progreso",
            "Plantillas Disponibles",
            "PCU incluye plantillas predefinidas para diferentes tipos de proyectos:",
            "Minimal",
            "Standard",
            "Full",
            "Configuración comprensiva con todas las características habilitadas.",
            "Monorepo",
            "Configuración optimizada para workspaces grandes con múltiples paquetes.",
            "Enterprise",
            "Configuración orientada a empresas con características de seguridad y cumplimiento.",
            "Ejemplos"
          ]
        ],
        [
          "pcu check - Verificar Actualizaciones",
          "pcu-check-verificar-actualizaciones",
          [
            "Verificar dependencias de catálogo desactualizadas sin realizar actualizaciones.",
            "Opciones",
            "Verificar catálogo específico (predeterminado: todos los catálogos)",
            "Incluir solo paquetes que coincidan con el patrón (separados por coma)",
            "Excluir paquetes que coincidan con el patrón (separados por coma)",
            "Objetivo de actualización: latest, greatest, minor, patch, newest",
            "Incluir versiones de prelanzamiento",
            "Verificar solo dependencias de desarrollo",
            "Verificar solo dependencias de producción",
            "Mostrar solo paquetes desactualizados",
            "Limitar número de paquetes mostrados",
            "Ordenar por: name, current, latest, age, severity",
            "Verificar solo paquetes con vulnerabilidades de seguridad",
            "Mostrar qué se verificaría sin ejecutar verificaciones",
            "Formato de salida: table, json, yaml, csv, minimal",
            "Escribir salida a archivo",
            "Mostrar información detallada incluyendo notas de lanzamiento",
            "Deshabilitar salida a color",
            "Formatos de Salida",
            "Table (Predeterminado)",
            "JSON",
            "Ejemplos"
          ]
        ],
        [
          "pcu update - Actualizar Dependencias",
          "pcu-update-actualizar-dependencias",
          [
            "Actualizar dependencias de catálogo a versiones más nuevas.",
            "Opciones",
            "Actualizar catálogo específico",
            "Incluir solo paquetes que coincidan con el patrón",
            "Excluir paquetes que coincidan con el patrón",
            "Objetivo de actualización: latest, greatest, minor, patch, newest",
            "Modo interactivo para seleccionar paquetes",
            "Mostrar qué se actualizaría sin realizar cambios",
            "Actualizar sin confirmación",
            "Crear respaldo antes de actualizar",
            "Incluir versiones de prelanzamiento",
            "Actualizar solo dependencias de desarrollo",
            "Actualizar solo dependencias de producción",
            "Actualizar paquetes específicos del workspace",
            "Número de actualizaciones concurrentes",
            "Timeout para operaciones de red (ms)",
            "Omitir scripts de instalación",
            "Solo actualizar catálogos, omitir instalación de paquetes",
            "Formato de salida: table, json, yaml, minimal",
            "Mostrar información detallada del progreso",
            "Targets de Actualización",
            "Última versión estable disponible",
            "Versión más alta disponible (incluyendo prereleases si se especifica)",
            "Última versión minor compatible",
            "Última versión patch compatible",
            "Versión más nueva independientemente de restricciones semver",
            "Ejemplos",
            "Modo Interactivo",
            "El modo interactivo permite seleccionar manualmente qué paquetes actualizar:",
            "Características del modo interactivo:",
            "✅ Selección individual de paquetes",
            "🎯 Selección de versiones específicas",
            "📊 Vista previa de impacto de cambios",
            "🔒 Creación automática de respaldos",
            "📝 Notas de lanzamiento en línea"
          ]
        ],
        [
          "pcu analyze - Analizar Impacto",
          "pcu-analyze-analizar-impacto",
          [
            "Analizar el impacto de actualizar dependencias específicas.",
            "Opciones",
            "Nombre del catálogo a analizar",
            "Paquete específico a analizar",
            "Versión específica a analizar",
            "Incluir paquetes que coincidan con el patrón",
            "Excluir paquetes que coincidan con el patrón",
            "Analizar impacto en workspace específico",
            "Profundidad de análisis de dependencias",
            "Mostrar cambios potencialmente disruptivos",
            "Incluir análisis de peer dependencies",
            "Incluir análisis de impacto de seguridad",
            "Estimar impacto en rendimiento (tamaño del bundle)",
            "Formato de salida: table, json, yaml, graph",
            "Guardar análisis en archivo",
            "Mostrar análisis detallado",
            "Tipos de Análisis",
            "Análisis de Dependencias",
            "Dependencias directas e indirectas afectadas",
            "Conflictos potenciales de versiones",
            "Dependencias circulares",
            "Análisis de Compatibilidad",
            "Cambios disruptivos detectados",
            "Compatibilidad de peer dependencies",
            "Requisitos de versión de Node.js",
            "Análisis de Seguridad",
            "Vulnerabilidades corregidas",
            "Nuevas vulnerabilidades introducidas",
            "Impacto en superficie de ataque",
            "Análisis de Rendimiento",
            "Cambios en tamaño del bundle",
            "Impacto en tiempo de compilación",
            "Dependencias agregadas/removidas",
            "Ejemplos"
          ]
        ],
        [
          "pcu workspace - Información del Workspace",
          "pcu-workspace-informacion-del-workspace",
          [
            "Mostrar información detallada sobre la configuración del workspace y validación.",
            "Opciones",
            "Ejecutar validación comprensiva del workspace",
            "Validar archivo de configuración PCU",
            "Mostrar todos los paquetes del workspace",
            "Mostrar información detallada de catálogos",
            "Mostrar árbol de dependencias",
            "Ruta específica del workspace a inspeccionar",
            "Profundidad para mostrar dependencias",
            "Incluir dependencias de desarrollo",
            "Verificar dependencias no utilizadas en catálogos",
            "Intentar corregir problemas detectados automáticamente",
            "Formato de salida: table, json, yaml, tree",
            "Mostrar información detallada",
            "Información Mostrada",
            "Información del Workspace",
            "Ruta del workspace",
            "Configuración PNPM",
            "Paquetes descubiertos",
            "Estructura de directorios",
            "Información de Catálogos",
            "Catálogos disponibles",
            "Dependencias por catálogo",
            "Conflictos de versiones",
            "Dependencias no utilizadas",
            "Validación",
            "Configuración PCU válida",
            "Consistencia de catálogos",
            "Dependencias faltantes",
            "Problemas de estructura",
            "Ejemplos"
          ]
        ],
        [
          "pcu security - Escaneo de Seguridad",
          "pcu-security-escaneo-de-seguridad",
          [
            "Escanear vulnerabilidades de seguridad y aplicar correcciones.",
            "Opciones",
            "Automáticamente corregir vulnerabilidades cuando sea posible",
            "Modo de corrección automática sin confirmación",
            "Filtrar por severidad: low, moderate, high, critical",
            "Incluir solo paquetes que coincidan con el patrón",
            "Excluir paquetes que coincidan con el patrón",
            "Escanear catálogo específico",
            "Escanear workspace específico",
            "Ignorar vulnerabilidades en dependencias de desarrollo",
            "Generar reporte detallado de seguridad",
            "Formato del reporte: json, csv, html, sarif",
            "Permitir actualizaciones major para correcciones de seguridad",
            "Crear respaldo antes de aplicar correcciones",
            "Timeout para escaneo de seguridad (ms)",
            "Formato de salida: table, json, yaml, csv",
            "Guardar reporte en archivo",
            "Mostrar información detallada de vulnerabilidades",
            "Niveles de Severidad",
            "Vulnerabilidades de bajo riesgo",
            "Vulnerabilidades de riesgo moderado",
            "Vulnerabilidades de alto riesgo",
            "Vulnerabilidades críticas que requieren atención inmediata",
            "Estrategias de Corrección",
            "Automática",
            "Actualizar a versión corregida más cercana",
            "Preferir actualizaciones patch/minor",
            "Aplicar correcciones con bajo riesgo",
            "Manual",
            "Mostrar opciones de corrección disponibles",
            "Permitir selección de versión específica",
            "Requerir confirmación para cambios major",
            "Ejemplos"
          ]
        ],
        [
          "pcu theme - Configurar Temas",
          "pcu-theme-configurar-temas",
          [
            "Configurar temas de color y configuraciones de interfaz de usuario.",
            "Opciones",
            "Establecer tema específico: default, modern, minimal, neon",
            "Listar todos los temas disponibles",
            "Mostrar vista previa de todos los temas",
            "Selector interactivo de temas",
            "Estilo de barra de progreso: default, gradient, fancy, minimal, rainbow, neon",
            "Esquema de colores: auto, light, dark",
            "Habilitar/deshabilitar animaciones",
            "Restablecer a tema por defecto",
            "Aplicar configuración globalmente para el usuario",
            "Mostrar configuración detallada del tema",
            "Temas Disponibles",
            "Default",
            "Colores balanceados para uso general:",
            "🟦 Azul para información",
            "🟩 Verde para éxito",
            "🟨 Amarillo para advertencias",
            "🟥 Rojo para errores",
            "Modern",
            "Colores vibrantes para entornos de desarrollo:",
            "🔵 Azul brillante",
            "🟢 Verde neón",
            "🟡 Amarillo vibrante",
            "🔴 Rojo intenso",
            "Minimal",
            "Limpio y simple para entornos de producción:",
            "⚫ Escala de grises",
            "Contraste alto",
            "Sin colores de acento",
            "Neon",
            "Colores de alto contraste para presentaciones:",
            "🌈 Colores fluorescentes",
            "Alto contraste",
            "Efectos de brillo",
            "Estilos de Barra de Progreso",
            "default - Barra estándar",
            "gradient - Colores degradados",
            "fancy - Elementos decorativos",
            "minimal - Indicador simple",
            "rainbow - Multicolor",
            "neon - Alto contraste",
            "Ejemplos"
          ]
        ],
        [
          "pcu ai - Gestión de Proveedores AI",
          "pcu-ai-gestion-de-proveedores-ai",
          [
            "Verificar el estado de los proveedores AI y gestionar el caché de análisis AI.",
            "Opciones",
            "Mostrar estado de todos los proveedores AI (comportamiento por defecto)",
            "Probar análisis AI con una solicitud de ejemplo",
            "Mostrar estadísticas del caché de análisis AI",
            "Limpiar caché de análisis AI",
            "Detección de Proveedores",
            "El comando detecta automáticamente los proveedores AI disponibles:",
            "| Proveedor | Prioridad | Método de Detección |\n| --------- | --------- | ------------------- |\n| Claude    | 100       | CLI claude        |\n| Gemini    | 80        | CLI gemini        |\n| Codex     | 60        | CLI codex         |",
            "Ejemplos de Uso"
          ]
        ],
        [
          "pcu rollback - Restauración de Backup",
          "pcu-rollback-restauracion-de-backup",
          [
            "Restaurar actualizaciones del catálogo a un estado anterior usando archivos de backup creados durante las actualizaciones.",
            "Opciones",
            "Listar todos los archivos de backup disponibles con marcas de tiempo",
            "Restaurar automáticamente al backup más reciente",
            "Selección interactiva del backup a restaurar",
            "Eliminar todos los archivos de backup (requiere confirmación)",
            "Ruta del directorio del workspace (predeterminado: directorio actual)",
            "Mostrar información detallada durante la restauración",
            "Sistema de Backup",
            "PCU crea archivos de backup automáticamente cuando usa el flag --create-backup con el comando update:",
            "Los archivos de backup se almacenan con marcas de tiempo y contienen el estado original de pnpm-workspace.yaml antes de las actualizaciones.",
            "Ejemplos de Uso",
            "Listar Backups Disponibles",
            "Muestra todos los archivos de backup con sus marcas de tiempo de creación y tamaños de archivo.",
            "Restaurar al Último Backup",
            "Restaura automáticamente el backup más reciente sin preguntar.",
            "Selección Interactiva de Backup",
            "Abre un prompt interactivo para seleccionar qué backup restaurar.",
            "Limpiar Backups Antiguos",
            "Elimina todos los archivos de backup con prompt de confirmación y salida detallada."
          ]
        ],
        [
          "Funcionalidades Interactivas y Seguimiento de Progreso",
          "funcionalidades-interactivas-y-seguimiento-de-progreso",
          [
            "PCU proporciona capacidades interactivas avanzadas y un sofisticado seguimiento de progreso en todos los comandos.",
            "Interfaz de Comandos Interactivos",
            "Sistema de Selección de Paquetes",
            "Multi-Selección Inteligente: Elija paquetes específicos con casillas de verificación visuales y atajos de teclado",
            "Búsqueda y Filtro: Filtrado de paquetes en tiempo real con coincidencia de patrones y búsqueda difusa",
            "Operaciones por Lotes: Seleccionar/deseleccionar grupos completos con selección basada en categorías",
            "Vista Previa de Impacto: Ver cambios potenciales antes de aplicar cualquier actualización",
            "Asistente de Configuración",
            "El asistente de configuración interactivo (pcu init --interactive) proporciona:",
            "Detección de Workspace: Descubrimiento automático de workspaces PNPM existentes",
            "Selección de Plantillas: Elegir entre plantillas de configuración mínima y completa",
            "Configuración de Reglas de Paquetes: Configurar reglas para diferentes categorías de paquetes (React, Vue, TypeScript)",
            "Configuración de Registro: Configurar registros NPM personalizados y autenticación",
            "Configuración de Validación: Configurar puertas de calidad y verificaciones de seguridad",
            "Navegador de Directorios y Archivos",
            "Navegación de Workspace: Navegador de sistema de archivos integrado para selección de workspace",
            "Validación de Rutas: Validación en tiempo real de rutas y estructuras de workspace",
            "Modo Vista Previa: Ver contenidos del workspace antes de confirmar la selección",
            "Seguimiento de Progreso Avanzado",
            "Barras de Progreso Multi-Estilo",
            "PCU ofrece seis estilos diferentes de barras de progreso, configurables por comando o globalmente:",
            "Características de Progreso",
            "Seguimiento Multi-Paso: Muestra progreso a través de diferentes fases (escanear → analizar → actualizar)",
            "Estado de Operaciones Paralelas: Barras de progreso individuales para operaciones concurrentes",
            "Métricas de Rendimiento: Indicadores de velocidad en tiempo real, cálculos de ETA, tiempo transcurrido",
            "Visualización Segura de Memoria: Salida multilínea estable que reduce el parpadeo del terminal",
            "Estado de Procesamiento por Lotes",
            "Gestión de Cola: Muestra operaciones de paquetes pendientes, activas y completadas",
            "Resolución de Conflictos: Manejo interactivo de conflictos de dependencias de pares",
            "Recuperación de Errores: Opciones de omitir/reintentar para operaciones fallidas con contexto detallado de error",
            "Capacidades de Rollback: Deshacer cambios si se detectan problemas durante las actualizaciones",
            "Manejo de Errores y Recuperación",
            "Detección Inteligente de Errores",
            "Errores de Validación: Verificaciones previas con sugerencias útiles para errores comunes",
            "Problemas de Red: Reintento automático con retroceso exponencial para fallos de registro",
            "Conflictos de Dependencias: Análisis detallado de conflictos con recomendaciones de resolución",
            "Problemas de Permisos: Guía clara para problemas de permisos del sistema de archivos",
            "Opciones de Recuperación Interactiva",
            "Omitir y Continuar: Omitir paquetes problemáticos y continuar con actualizaciones restantes",
            "Reintentar con Opciones: Reintentar operaciones fallidas con diferentes parámetros",
            "Revertir Cambios: Deshacer cambios parciales si ocurren problemas durante operaciones por lotes",
            "Exportar Informe de Errores: Generar informes detallados de errores para resolución de problemas",
            "Integración de Workspace",
            "Características de Auto-Descubrimiento",
            "Detección de Workspace PNPM: Encuentra y valida automáticamente configuraciones de workspace",
            "Descubrimiento de Catálogo: Detecta catálogos existentes y sus mapeos de paquetes",
            "Análisis de Paquetes: Analiza estructura del workspace y relaciones de dependencias",
            "Herencia de Configuración: Aplica configuraciones específicas del workspace automáticamente",
            "Validación y Verificaciones de Salud",
            "Validación de Estructura: Asegura que el workspace siga las mejores prácticas de PNPM",
            "Consistencia de Dependencias: Verifica discrepancias de versiones entre paquetes",
            "Integridad de Configuración: Valida configuración de PCU contra estructura del workspace",
            "Métricas de Salud: Proporciona evaluación comprensiva de salud del workspace",
            "Ejemplos de Uso",
            "Actualización Interactiva con Características Avanzadas",
            "Lanza actualización interactiva con barras de progreso elegantes y procesamiento por lotes optimizado.",
            "Configuración con Vista Previa",
            "Ejecuta asistente de configuración con modo vista previa y registro detallado.",
            "Flujo de Trabajo de Recuperación de Errores",
            "Actualizaciones con recuperación interactiva de errores, copias de seguridad automáticas y confirmación de versiones mayores."
          ]
        ],
        [
          "Opciones Globales",
          "opciones-globales",
          [
            "Estas opciones están disponibles para todos los comandos:",
            "Directorio del workspace (predeterminado: directorio actual)",
            "Archivo de configuración personalizado",
            "Habilitar salida detallada",
            "Suprimir toda la salida excepto errores",
            "Deshabilitar salida a color",
            "Deshabilitar barras de progreso",
            "Deshabilitar caching para esta ejecución",
            "Timeout global para operaciones de red (ms)",
            "Número máximo de operaciones concurrentes",
            "Registro NPM personalizado",
            "Mostrar qué se haría sin ejecutar cambios",
            "Mostrar información de ayuda",
            "Mostrar versión de PCU"
          ]
        ],
        [
          "Sistema de Auto-Actualización",
          "sistema-de-auto-actualizacion",
          [
            "PCU incluye un sofisticado mecanismo de auto-actualización que mantiene la herramienta CLI actualizada con las últimas características y parches de seguridad.",
            "Verificación Automática de Actualizaciones",
            "Por defecto, PCU verifica actualizaciones cuando ejecutas cualquier comando:",
            "Comportamiento de Actualización",
            "Detección de Entorno CI/CD",
            "PCU detecta automáticamente entornos CI/CD y omite verificaciones de actualización para evitar interrumpir pipelines automatizados:",
            "GitHub Actions: Detectado vía variable de entorno GITHUB_ACTIONS",
            "CircleCI: Detectado vía variable de entorno CIRCLECI",
            "Jenkins: Detectado vía variable de entorno JENKINS_URL",
            "GitLab CI: Detectado vía variable de entorno GITLAB_CI",
            "Azure DevOps: Detectado vía variable de entorno TF_BUILD",
            "CI Genérico: Detectado vía variable de entorno CI",
            "Instalación de Actualización",
            "PCU soporta múltiples gestores de paquetes con fallback automático:",
            "Opciones de Configuración",
            "Variables de Entorno",
            "Deshabilitar completamente la verificación de versiones y notificaciones de actualización",
            "Horas entre verificaciones de actualización (predeterminado: 24)",
            "Instalar automáticamente actualizaciones sin preguntar (usar con precaución)",
            "Timeout para solicitudes de verificación de actualización en milisegundos (predeterminado: 5000)",
            "Configuración en Archivo",
            "Notificaciones de Actualización",
            "Notificación Estándar",
            "Notificación de Actualización de Seguridad",
            "Notificación de Prelanzamiento",
            "Comandos de Actualización Manual",
            "Resolución de Problemas de Actualización",
            "Fallos en Verificación de Actualización",
            "Limpieza de Caché",
            "Problemas de Permisos"
          ]
        ],
        [
          "Sistema de Gestión de Caché",
          "sistema-de-gestion-de-cache",
          [
            "PCU incluye un sistema de caché comprensivo para optimizar el rendimiento y reducir las solicitudes de red.",
            "Tipos de Caché",
            "Caché de Registro",
            "Almacena metadatos de paquetes NPM e información de versiones:",
            "TTL Predeterminado: 1 hora (3,600,000ms)",
            "Tamaño Máximo: 10MB por tipo de caché",
            "Entradas Máximas: 500 paquetes",
            "Persistencia en Disco: Habilitada",
            "Caché de Workspace",
            "Almacena configuración de workspace y resultados de parseo de package.json:",
            "TTL Predeterminado: 5 minutos (300,000ms)",
            "Tamaño Máximo: 5MB",
            "Entradas Máximas: 200 workspaces",
            "Persistencia en Disco: Deshabilitada (solo memoria)",
            "Caché de Análisis AI",
            "Almacena resultados de análisis de proveedores AI:",
            "TTL Predeterminado: 24 horas (86,400,000ms)",
            "Tamaño Máximo: 20MB",
            "Entradas Máximas: 100 análisis",
            "Persistencia en Disco: Habilitada",
            "Configuración de Caché",
            "Variables de Entorno",
            "Habilitar/deshabilitar todo el sistema de caché",
            "TTL predeterminado de caché en milisegundos",
            "Tamaño máximo total de caché en bytes (50MB predeterminado)",
            "Número máximo de entradas de caché",
            "Ruta personalizada del directorio de caché",
            "Habilitar persistencia en disco para cachés",
            "Configuración en Archivo",
            "Comandos de Gestión de Caché",
            "Rendimiento de Caché",
            "Características de Optimización",
            "Eliminación LRU: Los elementos menos usados recientemente se eliminan primero",
            "Limpieza Automática: Entradas expiradas se eliminan cada 5 minutos",
            "Monitoreo de Tamaño: Eliminación automática cuando se exceden los límites de tamaño",
            "Procesamiento Paralelo: Las operaciones de caché no bloquean el hilo principal",
            "Beneficios de Rendimiento",
            "Solicitudes de Registro: 60-90% de reducción en llamadas al registro NPM",
            "Parseo de Workspace: 80-95% más rápido en análisis de workspace en ejecuciones repetidas",
            "Dependencia de Red: Menor dependencia de conectividad de red",
            "Tiempo de Inicio: 2-5x más rápido en operaciones subsiguientes"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "Configuración",
          null,
          [
            "Configura PCU para que coincida con tu flujo de trabajo y necesidades del proyecto. Aprende sobre archivos de configuración, reglas específicas de paquetes y configuraciones avanzadas. "
          ]
        ],
        [
          "Tipos de Archivos de Configuración",
          "tipos-de-archivos-de-configuracion",
          [
            "PCU soporta múltiples formatos de archivos de configuración y ubicaciones para acomodar diferentes flujos de trabajo de desarrollo.",
            "Archivos de Configuración Soportados",
            "PCU busca archivos de configuración en el siguiente orden (el primero encontrado gana):",
            "Archivo de configuración JSON principal en la raíz del proyecto",
            "Archivo de configuración JavaScript con soporte de configuración dinámica",
            "Nombre de archivo de configuración JavaScript alternativo",
            "Configuración global de usuario en el directorio home",
            "Configuración dentro de package.json bajo la clave \"pcu\"",
            "Soporte de Configuración JavaScript",
            "Los archivos de configuración JavaScript permiten configuración dinámica basada en entorno, estructura del workspace u otras condiciones de tiempo de ejecución:",
            "Configuración en Package.json",
            "Para proyectos más simples, la configuración puede ser incrustada dentro de package.json:",
            "Validación de Configuración",
            "PCU automáticamente valida archivos de configuración y proporciona mensajes de error detallados para problemas comunes:",
            "Características de Validación",
            "Validación de Esquema JSON: Asegura que todas las propiedades de configuración sean válidas",
            "Validación de Patrones: Valida patrones glob y formatos de nombres de paquetes",
            "Verificación de Tipos: Verifica tipos de datos correctos para todos los valores de configuración",
            "Detección de Conflictos: Identifica reglas conflictivas y opciones de configuración",
            "Sistema de Sugerencias: Proporciona sugerencias útiles para arreglar errores de configuración",
            "Ejemplos de Validación"
          ]
        ],
        [
          "Referencia Completa del Archivo .pcurc.json",
          "referencia-completa-del-archivo-pcurc-json",
          [
            "PCU usa múltiples formatos de archivos de configuración, principalmente usando el archivo .pcurc.json en la raíz del proyecto para configuración. Puede crearse manualmente o usando pcu init para generar configuración por defecto.",
            "Estructura Completa del Archivo de Configuración",
            "Descripción Detallada de Opciones de Configuración",
            "defaults - Configuraciones Predeterminadas",
            "Objetivo de actualización predeterminado: latest | greatest | minor | patch | newest",
            "Tiempo de espera para solicitudes de red (milisegundos)",
            "Si crear archivos de respaldo antes de actualizar",
            "Si habilitar modo interactivo por defecto",
            "Si habilitar modo de vista previa por defecto (no actualizar realmente)",
            "Si forzar actualizaciones (omitir advertencias)",
            "Si incluir versiones de prelanzamiento",
            "workspace - Configuraciones del Workspace",
            "Si descubrir automáticamente la estructura del workspace",
            "Modo del catálogo: strict | loose | mixed",
            "Ruta del directorio raíz del workspace",
            "Array de patrones de coincidencia de directorios de paquetes (sobrescribe pnpm-workspace.yaml)",
            "output - Configuraciones de Salida",
            "Formato de salida: table | json | yaml | minimal",
            "Si habilitar salida a color",
            "Si habilitar modo de salida detallado",
            "ui - Configuraciones de Interfaz de Usuario",
            "Tema de colores: default | modern | minimal | neon",
            "Si mostrar barras de progreso",
            "Estilo de barra de progreso: default | gradient | fancy | minimal | rainbow | neon",
            "Si habilitar efectos de animación",
            "Esquema de colores: auto | light | dark"
          ]
        ],
        [
          "Filtrado de Paquetes",
          "filtrado-de-paquetes",
          [
            "Controla qué paquetes actualizar con patrones de incluir/excluir y reglas específicas de paquetes.",
            "Propiedades de Reglas de Paquetes",
            "Patrones glob para hacer match con nombres de paquetes",
            "Objetivo de actualización: latest, greatest, minor, patch, newest",
            "Siempre preguntar antes de actualizar estos paquetes",
            "Actualizar automáticamente sin confirmación",
            "Paquetes que siguen la misma estrategia de actualización",
            "Actualizar paquetes relacionados juntos"
          ]
        ],
        [
          "Configuración de Seguridad",
          "configuracion-de-seguridad",
          [
            "Configura el escaneo de vulnerabilidades de seguridad y correcciones automáticas.",
            "Automáticamente verificar y corregir vulnerabilidades de seguridad",
            "Permitir actualizaciones de versión mayor para correcciones de seguridad",
            "Mostrar notificaciones en actualizaciones de seguridad"
          ]
        ],
        [
          "Configuración de Monorepo",
          "configuracion-de-monorepo",
          [
            "Configuraciones especiales para configuraciones de monorepo complejas con múltiples catálogos.",
            "Paquetes que necesitan sincronización de versiones a través de múltiples catálogos",
            "Orden de prioridad de catálogos para resolución de conflictos"
          ]
        ],
        [
          "Configuraciones Avanzadas",
          "configuraciones-avanzadas",
          [
            "Ajusta finamente el rendimiento y comportamiento con opciones de configuración avanzadas.",
            "Número de solicitudes de red concurrentes",
            "Tiempo de espera de solicitud de red en milisegundos",
            "Número de reintentos en fallo",
            "Período de validez del cache (0 para deshabilitar caching)",
            "Automáticamente verificar actualizaciones de la herramienta PCU al iniciar. Se omite en entornos\nCI. Muestra notificaciones de actualización e instrucciones de instalación cuando hay versiones\nmás nuevas disponibles."
          ]
        ],
        [
          "Configuración de UI",
          "configuracion-de-ui",
          [
            "Personaliza la apariencia visual y configuraciones de interfaz de usuario.",
            "Temas Disponibles",
            "default - Colores balanceados para uso general",
            "modern - Colores vibrantes para entornos de desarrollo",
            "minimal - Limpio y simple para entornos de producción",
            "neon - Colores de alto contraste para presentaciones",
            "Estilos de Barra de Progreso",
            "PCU soporta 6 estilos diferentes de barras de progreso para retroalimentación visual mejorada durante operaciones:",
            "default - Barra de progreso estándar con estilo básico",
            "gradient - Barra de progreso con colores degradados para apariencia moderna",
            "fancy - Barra de progreso mejorada con elementos decorativos",
            "minimal - Indicador de progreso limpio y simple",
            "rainbow - Barra de progreso multicolor para pantallas vibrantes",
            "neon - Barra de progreso de alto contraste que coincide con el tema neón",
            "Ejemplo de Configuración:",
            "Uso en Línea de Comandos:"
          ]
        ],
        [
          "Prioridad de Configuración",
          "prioridad-de-configuracion",
          [
            "Las configuraciones se aplican en este orden de prioridad:",
            "Flags de línea de comandos (prioridad más alta)",
            "Reglas específicas de paquetes en .pcurc.json",
            "Configuraciones generales en .pcurc.json",
            "Valores predeterminados (prioridad más baja)",
            "Los paquetes relacionados automáticamente heredan configuraciones de sus reglas de paquetes padre,\nasegurando consistencia de versiones a través de paquetes del ecosistema."
          ]
        ],
        [
          "Ejemplos",
          "ejemplos",
          [
            "Ecosistema React",
            "Proyecto TypeScript",
            "Configuración Empresarial"
          ]
        ],
        [
          "Variables de Entorno",
          "variables-de-entorno",
          [
            "Todas las opciones de CLI pueden configurarse vía variables de entorno para automatización y entornos CI/CD:",
            "Prioridad de Variables de Entorno",
            "Las fuentes de configuración se cargan en este orden (las posteriores sobrescriben las anteriores):",
            "Valores predeterminados incorporados (prioridad más baja)",
            "Configuración global (~/.pcurc.json)",
            "Configuración del proyecto (.pcurc.json)",
            "Variables de entorno (PCU_*)",
            "Flags de línea de comandos (prioridad más alta)"
          ]
        ],
        [
          "Configuración de Registro",
          "configuracion-de-registro",
          [
            "PCU automáticamente lee archivos de configuración de NPM y PNPM para configuraciones de registro:",
            "Prioridad de Registro",
            "Flag CLI --registry (prioridad más alta)",
            "Configuración PCU (sección registry de .pcurc.json)",
            ".npmrc/.pnpmrc del proyecto",
            ".npmrc/.pnpmrc global",
            "Registro NPM predeterminado (prioridad más baja)"
          ]
        ],
        [
          "Configuración de Cache Mejorado",
          "configuracion-de-cache-mejorado",
          [
            "PCU incluye un sistema de cache avanzado para mejorar el rendimiento:",
            "Configuraciones de Cache",
            "Habilitar/deshabilitar sistema de cache",
            "Tiempo de vida en milisegundos (1 hora por defecto)",
            "Tamaño máximo de cache en bytes (50MB por defecto)",
            "Número máximo de entradas de cache",
            "Guardar cache en disco entre ejecuciones",
            "Directorio para almacenamiento persistente de cache",
            "Estrategia de desalojo de cache: lru, fifo, lfu"
          ]
        ],
        [
          "Configuración de Validación",
          "configuracion-de-validacion",
          [
            "PCU incluye validación comprensiva con sugerencias útiles:",
            "Opciones de Validación",
            "Habilitar modo de validación estricto con verificaciones adicionales",
            "Mostrar advertencias para actualizaciones potencialmente riesgosas",
            "Tipos de actualización que requieren confirmación: major, minor, patch",
            "Habilitar sugerencias y consejos útiles",
            "Incluir sugerencias de optimización de rendimiento",
            "Incluir recomendaciones de mejores prácticas"
          ]
        ],
        [
          "Configuración de Modo Interactivo",
          "configuracion-de-modo-interactivo",
          [
            "Configura prompts interactivos y experiencia de usuario:",
            "Configuraciones Interactivas",
            "Habilitar capacidades de modo interactivo",
            "Número de elementos mostrados por página en listas",
            "Mostrar descripciones de paquetes en listas de selección",
            "Mostrar notas de lanzamiento para actualizaciones (requiere red)",
            "Habilitar autocompletado para nombres de paquetes",
            "Habilitar coincidencia difusa para autocompletado",
            "Requerir confirmación para actualizaciones de versión mayor"
          ]
        ],
        [
          "Configuración de Monorepo",
          "configuracion-de-monorepo-2",
          [
            "PCU proporciona características avanzadas específicamente diseñadas para monorepos grandes y gestión compleja de workspaces.",
            "Sincronización de Versiones",
            "Mantén paquetes relacionados sincronizados a través de tu monorepo:",
            "Gestión Avanzada de Workspace",
            "Sistema de Prioridad de Catálogos",
            "Define qué catálogos tienen precedencia cuando surgen conflictos:",
            "Dependencias Cross-Workspace",
            "Analiza y gestiona dependencias entre paquetes del workspace:",
            "Analizar dependencias cross-workspace",
            "Cómo manejar desajustes de versión: error, warn, off",
            "Reportar paquetes en catálogos no usados por ningún paquete del workspace",
            "Validar que todos los paquetes del workspace usen versiones del catálogo",
            "Reglas de Paquetes Específicas de Monorepo",
            "Crea reglas sofisticadas para diferentes áreas de tu monorepo:",
            "Configuración Específica de Workspace",
            "Configuración diferente para diferentes partes de tu monorepo:",
            "Optimización de Rendimiento para Monorepos Grandes",
            "Configuración de Procesamiento por Lotes",
            "Número de paquetes a procesar en cada lote",
            "Número máximo de operaciones concurrentes",
            "Cachear descubrimiento de paquetes del workspace entre ejecuciones",
            "Procesar múltiples catálogos en paralelo",
            "Gestión de Memoria",
            "Validación de Monorepo",
            "Validación comprensiva para configuraciones complejas de workspace:",
            "Reglas de Validación",
            "Asegurar que se use el protocolo workspace: para dependencias internas",
            "Asegurar que todas las dependencias estén cubiertas por catálogos",
            "Requerir que todos los paquetes del workspace usen la misma versión de dependencias compartidas",
            "Detectar dependencias circulares entre paquetes del workspace",
            "Ejemplos de Uso para Monorepos",
            "Configuración de Monorepo Empresarial Grande",
            "Configuración Optimizada para CI/CD"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "Desarrollo",
          null,
          [
            "Configura PCU para desarrollo y aprende cómo contribuir al proyecto. Esta guía cubre configuración del proyecto, arquitectura y flujos de trabajo de desarrollo. "
          ]
        ],
        [
          "Prerrequisitos",
          "prerrequisitos",
          [
            "Antes de comenzar a desarrollar PCU, asegúrate de tener las herramientas requeridas:",
            "Se requiere Node.js >= 22.0.0 y pnpm >= 10.0.0 para desarrollo."
          ]
        ],
        [
          "Configuración del Proyecto",
          "configuracion-del-proyecto",
          [
            "Clona y configura el entorno de desarrollo:"
          ]
        ],
        [
          "Arquitectura del Proyecto",
          "arquitectura-del-proyecto",
          [
            "PCU sigue principios de arquitectura limpia con clara separación de responsabilidades:",
            "Capas de Arquitectura",
            "Interfaz de usuario, análisis de comandos, formateo de salida",
            "Orquestación de lógica de negocio, casos de uso",
            "Entidades de negocio principales, objetos de valor, interfaces de repositorio",
            "Clientes de API externa, acceso al sistema de archivos, implementaciones de repositorio",
            "Utilidades compartidas, configuración, logging, manejo de errores"
          ]
        ],
        [
          "Flujo de Trabajo de Desarrollo",
          "flujo-de-trabajo-de-desarrollo",
          [
            "Realizar Cambios",
            "Crear una rama de característica:",
            "Realizar cambios siguiendo los estándares de codificación",
            "Agregar pruebas para tus cambios:",
            "Asegurar que las verificaciones de calidad pasen:",
            "Confirmar cambios:",
            "Estrategia de Pruebas",
            "PCU usa un enfoque de pruebas integral:",
            "Calidad de Código",
            "PCU mantiene altos estándares de calidad de código:"
          ]
        ],
        [
          "Agregar Características",
          "agregar-caracteristicas",
          [
            "Crear Nuevos Comandos",
            "Crear manejador de comando en apps/cli/src/cli/commands/:",
            "Agregar lógica de negocio en packages/core/src/application/services/",
            "Crear pruebas para tanto CLI como lógica central",
            "Actualizar documentación",
            "Agregar Nuevos Formatos de Salida",
            "Crear formateador en apps/cli/src/cli/formatters/:",
            "Registrar formateador en el registro principal de formateadores",
            "Agregar pruebas y actualizar documentación"
          ]
        ],
        [
          "Guías de Contribución",
          "guias-de-contribucion",
          [
            "Convención de Mensajes de Commit",
            "PCU usa Conventional Commits:",
            "Proceso de Pull Request",
            "Fork el repositorio y crear una rama de característica",
            "Realizar cambios siguiendo el flujo de trabajo de desarrollo",
            "Asegurar que todas las pruebas pasen y las verificaciones de calidad tengan éxito",
            "Actualizar documentación si es necesario",
            "Enviar un pull request con:",
            "Descripción clara de los cambios",
            "Enlace a issues relacionados",
            "Capturas de pantalla para cambios de UI",
            "Notas de cambios importantes si aplica",
            "Lista de Verificación de Revisión de Código",
            "Todas las pruebas pasan",
            "Cobertura de código mantenida (>85%)",
            "Tipos TypeScript son correctos",
            "Estilo de código sigue estándares del proyecto",
            "Documentación actualizada",
            "Cambios importantes documentados",
            "Impacto en el rendimiento considerado"
          ]
        ],
        [
          "Depuración",
          "depuracion",
          [
            "Depuración de Desarrollo",
            "Depuración de Pruebas"
          ]
        ],
        [
          "Construcción y Publicación",
          "construccion-y-publicacion",
          [
            "Pruebas Locales",
            "Proceso de Lanzamiento",
            "Preparar las notas de la release en apps/cli/CHANGELOG.md bajo ## Unreleased.",
            "Construir y probar:",
            "Ejecutar el workflow Release de GitHub Actions (solo mantenedores):",
            "patch, minor, major: incrementan la versión del CLI, hacen commit de los cambios de release, crean la etiqueta, publican pcu y pnpm-catalog-updates y crean la GitHub Release en una sola ejecución",
            "current: publica la versión que ya está confirmada en el repositorio",
            "dry_run: true: valida el flujo sin publicar"
          ]
        ],
        [
          "Obtener Ayuda",
          "obtener-ayuda",
          [
            "📖 Documentación: Revisa esta documentación para guías detalladas",
            "🐛 Issues: Reporta bugs via GitHub Issues",
            "💬 Discusiones: Haz preguntas en GitHub Discussions",
            "🔧 Desarrollo: Únete a discusiones de desarrollo en issues y PRs"
          ]
        ],
        [
          "Detalles Avanzados de Arquitectura",
          "detalles-avanzados-de-arquitectura",
          [
            "Modelo de Dominio Central",
            "Basado en principios de Domain-Driven Design (DDD), el dominio central de PCU incluye:",
            "Arquitectura de Capa de Servicio",
            "La capa de aplicación orquesta lógica de negocio a través de servicios:",
            "Diseño de Capa CLI",
            "La capa CLI proporciona una interfaz limpia al dominio central:",
            "Arquitectura de Pruebas",
            "Estrategia de pruebas integral a través de todas las capas:",
            "Consideraciones de Rendimiento",
            "PCU está optimizado para rendimiento en monorepos grandes:"
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "Ejemplos",
          null,
          [
            "Ejemplos del mundo real y casos de uso para ayudarte a sacar el máximo provecho de PCU. Desde actualizaciones simples hasta gestión compleja de monorepos. "
          ]
        ],
        [
          "Flujos de Trabajo Básicos",
          "flujos-de-trabajo-basicos",
          [
            "Verificación Diaria de Dependencias",
            "Verifica actualizaciones como parte de tu rutina diaria de desarrollo:",
            "Actualizaciones Seguras con Respaldo",
            "Actualiza dependencias de forma segura con respaldos automáticos:",
            "Actualizaciones Específicas por Objetivo",
            "Actualiza solo tipos específicos de cambios:"
          ]
        ],
        [
          "Workspaces Multi-Catálogo",
          "workspaces-multi-catalogo",
          [
            "Escenario de Soporte Legacy",
            "Gestionar múltiples versiones de React en un workspace:",
            "Uso de Paquetes"
          ]
        ],
        [
          "Ejemplos de Configuración",
          "ejemplos-de-configuracion",
          [
            "Gestión del Ecosistema React",
            "Actualizaciones coordinadas para React y paquetes relacionados:",
            "Configuración de Proyecto TypeScript",
            "Actualizaciones conservadoras de TypeScript con definiciones de tipos automáticas:",
            "Configuración Empresarial",
            "Configuración lista para empresa con controles estrictos:"
          ]
        ],
        [
          "Integración CI/CD",
          "integracion-ci-cd",
          [
            "GitHub Actions",
            "Automatiza la verificación de dependencias en tu pipeline CI:"
          ]
        ],
        [
          "Manejo de Errores y Solución de Problemas",
          "manejo-de-errores-y-solucion-de-problemas",
          [
            "Problemas de Red",
            "Manejar problemas de red y acceso a registros:",
            "Validación de Workspace",
            "Validar la configuración de tu workspace:",
            "Registros Privados",
            "PCU lee automáticamente las configuraciones .npmrc y .pnpmrc:"
          ]
        ],
        [
          "Casos de Uso Avanzados",
          "casos-de-uso-avanzados",
          [
            "Análisis de Impacto",
            "Analizar el impacto de actualizar paquetes específicos:",
            "Actualizaciones Selectivas",
            "Actualizar solo paquetes específicos o patrones:",
            "Análisis de Ejecución en Seco",
            "Previsualizar cambios antes de aplicarlos:"
          ]
        ],
        [
          "Mejores Prácticas",
          "mejores-practicas",
          [
            "Flujo de Trabajo Diario",
            "Verificación Matutina: pcu -c para ver actualizaciones disponibles",
            "Revisar Impacto: Usar pcu -a para actualizaciones significativas",
            "Actualización Segura: pcu -i -b para actualizaciones interactivas con respaldo",
            "Pruebas: Ejecutar suite de pruebas después de actualizaciones",
            "Commit: Hacer commit de actualizaciones de dependencias por separado",
            "Flujo de Trabajo de Equipo",
            "Configuración Compartida: Hacer commit de .pcurc.json en control de versiones",
            "Revisiones Regulares: Programar reuniones semanales de revisión de dependencias",
            "Prioridad de Seguridad: Siempre priorizar actualizaciones de seguridad",
            "Documentación: Documentar decisiones importantes de dependencias",
            "Plan de Rollback: Mantener respaldos para rollback fácil",
            "Flujo de Trabajo de Release",
            "Verificación Pre-release: pcu -c --target patch antes de releases",
            "Escaneo de Seguridad: Habilitar autoFixVulnerabilities en CI",
            "Fijación de Versiones: Usar versiones exactas para releases de producción",
            "Programación de Actualizaciones: Planear actualizaciones de dependencias entre releases"
          ]
        ],
        [
          "Monitoreo de Seguridad",
          "monitoreo-de-seguridad",
          [
            "Escaneo Continuo de Seguridad",
            "Integrar escaneo de seguridad en tu flujo de trabajo de desarrollo:",
            "CI/CD Enfocado en Seguridad"
          ]
        ],
        [
          "Personalización de Temas",
          "personalizacion-de-temas",
          [
            "Configuración Interactiva de Temas",
            "Configurar la apariencia de PCU para tu equipo:",
            "Configuración de Temas de Equipo"
          ]
        ],
        [
          "Optimización de Rendimiento",
          "optimizacion-de-rendimiento",
          [
            "Configuración para Monorepo Grande",
            "Optimizar PCU para workspaces grandes con cientos de paquetes:",
            "Procesamiento Selectivo"
          ]
        ],
        [
          "Ejemplos de Migración",
          "ejemplos-de-migracion",
          [
            "Desde npm-check-updates",
            "Migrar de ncu a PCU:",
            "Convirtiendo a Catálogos pnpm",
            "Transformar workspace existente para usar catálogos pnpm:"
          ]
        ],
        [
          "Guías de Migración",
          "guias-de-migracion",
          [
            "Migrar desde npm-check-updates",
            "Transición suave desde npm-check-updates a PCU para gestión de catálogos pnpm:",
            "Pasos de Migración",
            "Instalar PCU junto con ncu temporalmente para comparación",
            "Inicializar configuración de PCU:",
            "Comparar salidas para asegurar funcionalidad equivalente:",
            "Migrar reglas de paquetes desde configuración ncu",
            "Remover ncu una vez cómodo con PCU",
            "Migrar desde Dependabot",
            "Reemplazar Dependabot con PCU para control más granular:",
            "Migrar desde Renovate",
            "Transición desde Renovate a PCU con configuración avanzada:",
            "Diferencias Clave",
            "| Característica    | Renovate               | PCU                                 |\n| ----------------- | ---------------------- | ----------------------------------- |\n| Alcance       | Paquetes individuales  | Actualizaciones a nivel de catálogo |\n| Configuración | renovate.json          | .pcurc.json                         |\n| UI            | Dashboard web          | Terminal + integración CI           |\n| Monorepo      | Configuración compleja | Soporte workspace integrado         |",
            "Configuración de Migración"
          ]
        ],
        [
          "Integración de Flujo de Trabajo CI/CD",
          "integracion-de-flujo-de-trabajo-ci-cd",
          [
            "Integración con GitHub Actions",
            "Configuración completa de GitHub Actions para gestión automatizada de dependencias:",
            "Integración con GitLab CI",
            "Pipeline de GitLab CI para gestión de dependencias con PCU:",
            "Integración con Pipeline Jenkins",
            "Pipeline de Jenkins para gestión empresarial de dependencias:",
            "Pipeline Azure DevOps",
            "Pipeline de Azure DevOps para integración con PCU:",
            "Integración con Docker",
            "PCU containerizado para entornos CI/CD consistentes:"
          ]
        ],
        [
          "Flujos de Trabajo Empresariales",
          "flujos-de-trabajo-empresariales",
          [
            "Gestión Multi-Entorno",
            "Gestionar dependencias a través de entornos de desarrollo, staging y producción:",
            "Flujos de Trabajo de Aprobación",
            "Implementar flujos de trabajo de aprobación para actualizaciones críticas:"
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "Preguntas Frecuentes",
          null,
          [
            "Respuestas rápidas a preguntas comunes sobre PCU. ¿No encuentras lo que buscas? Revisa nuestra guía de solución de problemas o abre un issue. "
          ]
        ],
        [
          "Instalación y Configuración",
          "instalacion-y-configuracion",
          [
            "¿Cómo instalo PCU?",
            "PCU puede instalarse globalmente a través de npm, pnpm o yarn:",
            "¿Cuáles son los requisitos del sistema?",
            "Node.js: >= 18.0.0 (se recomienda LTS)",
            "pnpm: >= 8.0.0",
            "Sistema Operativo: Windows, macOS, Linux",
            "¿Necesito un workspace de pnpm para usar PCU?",
            "Sí, PCU está específicamente diseñado para workspaces de pnpm con dependencias de catálogo. Si aún no tienes un workspace, ejecuta pcu init para crear uno.",
            "¿Puedo usar PCU con proyectos de npm o yarn?",
            "No, PCU es exclusivamente para workspaces de pnpm que usan dependencias de catálogo. Para otros gestores de paquetes, considera herramientas como npm-check-updates o yarn upgrade-interactive."
          ]
        ],
        [
          "Configuración",
          "configuracion",
          [
            "¿Dónde debería colocar mi configuración .pcurc.json?",
            "Colócala en el directorio raíz de tu workspace (mismo nivel que pnpm-workspace.yaml). PCU también admite:",
            "Configuración global: ~/.pcurc.json",
            "Configuración de proyecto: ./.pcurc.json (mayor prioridad)",
            "¿Cuál es la diferencia entre configuración a nivel de workspace y global?",
            "Global (~/.pcurc.json): Aplicada a todas las operaciones de PCU en diferentes proyectos",
            "Proyecto (./.pcurc.json): Específica del workspace actual, sobrescribe configuraciones globales",
            "¿Puedo configurar diferentes estrategias de actualización para diferentes paquetes?",
            "¡Sí! Usa reglas de paquetes en tu configuración:"
          ]
        ],
        [
          "Comandos y Uso",
          "comandos-y-uso",
          [
            "¿Cuál es la diferencia entre pcu check y pcu -c?",
            "¡Son idénticos! PCU admite tanto nombres de comando completos como alias cortos:",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "¿Cómo actualizo solo tipos específicos de paquetes?",
            "Usa las banderas --include y --exclude:",
            "¿Cuál es la diferencia entre objetivos de actualización?",
            "patch: Solo corrección de errores (1.0.0 → 1.0.1)",
            "minor: Nuevas características, compatible hacia atrás (1.0.0 → 1.1.0)",
            "latest: Última versión estable incluyendo cambios importantes (1.0.0 → 2.0.0)",
            "greatest: Última versión incluyendo prelanzamientos (1.0.0 → 2.0.0-beta.1)",
            "¿Cómo verifico qué se actualizará antes de actualizar realmente?",
            "Usa la bandera --dry-run:",
            "Esto te muestra exactamente qué se actualizaría sin hacer ningún cambio."
          ]
        ],
        [
          "Solución de Problemas",
          "solucion-de-problemas",
          [
            "¿Por qué PCU dice \"No se encontró workspace de pnpm\"?",
            "Esto significa que PCU no puede encontrar un archivo pnpm-workspace.yaml en tu directorio actual. Soluciones:",
            "Crear un workspace: Ejecuta pcu init",
            "Navegar a la raíz del workspace: cd al directorio que contiene pnpm-workspace.yaml",
            "Especificar ruta del workspace: pcu -c --workspace /ruta/al/workspace",
            "¿Por qué PCU dice \"No se encontraron dependencias de catálogo\"?",
            "Tu workspace aún no usa dependencias de catálogo. Necesitas:",
            "Catálogo en archivo de workspace:",
            "Usar catálogos en paquetes:",
            "PCU está ejecutándose muy lentamente. ¿Cómo puedo mejorar el rendimiento?",
            "Prueba estas optimizaciones:",
            "Reducir concurrencia: pcu check --concurrency 2",
            "Aumentar timeout: pcu check --timeout 60000",
            "Habilitar caché: Asegura PCU_CACHE_ENABLED=true (predeterminado)",
            "Usar filtrado: pcu check --include \"react*\" para paquetes específicos",
            "¿Cómo arreglo errores \"ENOTFOUND registry.npmjs.org\"?",
            "Este es un problema de conectividad de red:",
            "Verificar conexión a internet: ping registry.npmjs.org",
            "Configurar proxy: Establece variables de entorno HTTP_PROXY y HTTPS_PROXY",
            "Usar registro corporativo: Configura tu registro de la empresa en .npmrc",
            "Aumentar timeout: PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "Seguridad",
          "seguridad",
          [
            "¿Cómo maneja PCU las vulnerabilidades de seguridad?",
            "PCU se integra con npm audit y opcionalmente Snyk:",
            "¿Debería arreglar automáticamente todas las vulnerabilidades de seguridad?",
            "Usa precaución con --auto-fix:",
            "✅ Seguro: Actualizaciones de parche y versiones menores para correcciones de seguridad",
            "⚠️ Revisar: Actualizaciones de versiones importantes que podrían romper tu app",
            "❌ Evitar: Arreglar automáticamente a ciegas en producción sin probar",
            "¿Cómo manejo advertencias de seguridad de falsos positivos?",
            "Configura vulnerabilidades ignoradas en .pcurc.json:"
          ]
        ],
        [
          "Flujos de Trabajo y CI/CD",
          "flujos-de-trabajo-y-ci-cd",
          [
            "¿Puedo usar PCU en pipelines de CI/CD?",
            "¡Absolutamente! PCU está diseñado para automatización:",
            "Ve nuestra guía de integración CI/CD para ejemplos completos.",
            "¿Cómo creo PRs automatizados de actualización de dependencias?",
            "Usa PCU con GitHub Actions, GitLab CI u otras plataformas:",
            "Revisa la guía de integración CI/CD para flujos de trabajo completos.",
            "¿Cuál es el mejor flujo de trabajo para colaboración en equipo?",
            "Configuración compartida: Commitea .pcurc.json al control de versiones",
            "Revisiones regulares: Programa reuniones semanales de revisión de dependencias",
            "Seguridad primero: Siempre prioriza actualizaciones de seguridad",
            "Actualizaciones incrementales: Prefiere actualizaciones pequeñas y frecuentes sobre grandes lotes",
            "Testing: Siempre prueba después de actualizaciones antes de hacer merge"
          ]
        ],
        [
          "Uso Avanzado",
          "uso-avanzado",
          [
            "¿Puedo usar múltiples catálogos en un workspace?",
            "¡Sí! PNPM admite múltiples catálogos:",
            "Luego úsalos en paquetes:",
            "¿Cómo analizo el impacto de actualizar un paquete específico?",
            "Usa el comando analyze:",
            "¿Puedo excluir ciertos paquetes de actualizaciones permanentemente?",
            "Sí, configura exclusiones en .pcurc.json:",
            "¿Cómo manejo monorepos con 100+ paquetes?",
            "Consejos de rendimiento para monorepos grandes:",
            "Procesamiento por lotes: Configura batchSize: 10 en configuraciones avanzadas",
            "Reducir concurrencia: Establece concurrency: 2 para evitar sobrecargar el registro",
            "Usar filtrado: Procesa paquetes en grupos con patrones --include",
            "Habilitar caché: Asegura que el caché esté habilitado y configurado correctamente",
            "Aumentar memoria: Establece NODE_OPTIONS=\"--max-old-space-size=8192\""
          ]
        ],
        [
          "Mensajes de Error",
          "mensajes-de-error",
          [
            "\"No se pueden resolver dependencias peer\"",
            "Esto sucede cuando las versiones de paquetes entran en conflicto. Soluciones:",
            "Actualizar paquetes relacionados juntos: pcu update --include \"react*\"",
            "Usar modo interactivo: pcu update --interactive para elegir versiones cuidadosamente",
            "Verificar dependencias peer: Revisa lo que requiere cada paquete",
            "Usar múltiples catálogos: Separa versiones conflictivas en diferentes catálogos",
            "\"Configuración inválida en .pcurc.json\"",
            "Tu archivo de configuración tiene errores de sintaxis JSON:",
            "\"Comando no encontrado: pcu\"",
            "Problemas de instalación o PATH:",
            "Reinstalar globalmente: npm install -g pcu",
            "Verificar PATH: Asegura que npm global bin esté en tu PATH",
            "Usar npx: npx pnpm-catalog-updates check como alternativa",
            "Usar pnpm: pnpm add -g pnpm-catalog-updates (recomendado)"
          ]
        ],
        [
          "Integración y Herramientas",
          "integracion-y-herramientas",
          [
            "¿PCU funciona con Renovate o Dependabot?",
            "PCU es una alternativa a estas herramientas, no un complemento:",
            "PCU: Control manual, específico para pnpm, enfocado en catálogos",
            "Renovate: PRs automatizados, admite muchos gestores de paquetes",
            "Dependabot: Integrado con GitHub, actualizaciones de seguridad automatizadas",
            "Elige basado en tus preferencias de flujo de trabajo. Para migración, ve nuestra guía de migración.",
            "¿Puedo integrar PCU con mi IDE?",
            "Aunque no hay una extensión oficial de IDE, puedes:",
            "Agregar scripts de npm: Configura comandos en package.json",
            "Usar ejecutores de tareas: Integra con tareas de VS Code o similar",
            "Integración de terminal: La mayoría de IDEs admiten integración de terminal",
            "¿PCU admite registros npm privados?",
            "¡Sí! PCU lee tu configuración .npmrc:",
            "PCU usará automáticamente el registro correcto para cada scope de paquete."
          ]
        ],
        [
          "¿Aún Tienes Preguntas?",
          "aun-tienes-preguntas",
          [
            "📖 Documentación: Revisa nuestra referencia de comandos completa",
            "🛠️ Solución de problemas: Visita nuestra guía de solución de problemas",
            "🐛 Reportes de bugs: Crea un issue",
            "💬 Discusiones: GitHub Discussions"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "Guía de Migración",
          null,
          [
            "Aprende cómo migrar desde soluciones existentes de gestión de dependencias a PCU y hacer la transición de tu equipo a las dependencias de catálogo de pnpm. "
          ]
        ],
        [
          "Resumen de Migración",
          "resumen-de-migracion",
          [
            "PCU está específicamente diseñado para workspaces de pnpm que usan dependencias de catálogo. Si actualmente estás usando otras herramientas o gestores de paquetes, esta guía te ayudará a hacer la transición sin problemas.",
            "Antes de Comenzar",
            "Prerrequisitos para PCU:",
            "pnpm como tu gestor de paquetes (versión 8.0.0+)",
            "Configuración de workspace (pnpm-workspace.yaml)",
            "Dependencias de catálogo en tu workspace",
            "Matriz de Decisión de Migración:",
            "| Herramienta Actual       | Complejidad de Migración | Beneficios                                               | Consideraciones                          |\n| ------------------------ | ------------------------ | -------------------------------------------------------- | ---------------------------------------- |\n| npm-check-updates        | Baja                     | Mejor integración con pnpm, soporte de catálogo          | Requiere configuración de workspace pnpm |\n| Actualizaciones Manuales | Baja                     | Automatización, consistencia, escaneo de seguridad       | Esfuerzo de configuración inicial        |\n| Renovate                 | Media                    | Control manual, características específicas de workspace | Pérdida de automatización                |\n| Dependabot               | Media                    | Gestión mejorada de catálogo                             | Características específicas de GitHub    |\n| yarn upgrade-interactive | Alta                     | Beneficios de catálogo, mejor rendimiento                | Cambio completo de gestor de paquetes    |"
          ]
        ],
        [
          "Migrar desde npm-check-updates",
          "migrar-desde-npm-check-updates",
          [
            "Análisis de Configuración Actual",
            "Si actualmente estás usando npm-check-updates (ncu), probablemente tengas scripts como:",
            "Pasos de Migración",
            "1. Instalar pnpm y Configurar Workspace",
            "2. Convertir a Dependencias de Catálogo",
            "Crear entradas de catálogo en pnpm-workspace.yaml:",
            "3. Actualizar Archivos de Paquetes",
            "Convertir archivos package.json para usar referencias de catálogo:",
            "4. Instalar PCU y Configurar",
            "5. Actualizar Scripts",
            "Reemplazar scripts de ncu con equivalentes de PCU:",
            "Migración de Configuración",
            "Configuración ncu → Configuración PCU:"
          ]
        ],
        [
          "Migrar desde Renovate",
          "migrar-desde-renovate",
          [
            "Entendiendo las Diferencias",
            "Renovate vs PCU:",
            "Renovate: Creación automática de PR, soporte multi-lenguaje, configuración extensa",
            "PCU: Control manual, específico para pnpm, enfocado en catálogo, integrado con seguridad",
            "Estrategia de Migración",
            "1. Exportar Configuración de Renovate",
            "Analiza tu renovate.json actual:",
            "2. Convertir a Configuración PCU",
            "Mapear reglas de Renovate a equivalentes de PCU:",
            "3. Configurar Flujos de Trabajo Manuales",
            "Reemplazar PRs automatizados con revisiones manuales programadas:",
            "4. Transición del Equipo",
            "Fase 1: Ejecución Paralela (2 semanas)",
            "Mantener Renovate habilitado",
            "Introducir PCU para verificaciones manuales",
            "Entrenar al equipo en comandos de PCU",
            "Fase 2: PCU Primario (2 semanas)",
            "Deshabilitar creación de PR de Renovate",
            "Usar PCU para todas las actualizaciones",
            "Establecer procesos de revisión",
            "Fase 3: Migración Completa",
            "Eliminar configuración de Renovate",
            "Optimizar configuración de PCU",
            "Documentar nuevos flujos de trabajo",
            "Mapeo de Características de Renovate",
            "| Característica de Renovate | Equivalente PCU      | Notas                         |\n| -------------------------- | -------------------- | ----------------------------- |\n| PRs Automatizados          | pcu update manual  | Más control, menos ruido      |\n| Programación               | Trabajos cron + PCU  | Tiempo flexible               |\n| Actualizaciones Agrupadas  | Patrones --include | Agrupar paquetes relacionados |\n| Auto-merge                 | autoUpdate: true   | Limitado a paquetes seguros   |\n| Alertas de Vulnerabilidad  | pcu security       | Escaneo integrado             |\n| Presets de Configuración   | Reglas de paquetes   | Patrones reutilizables        |"
          ]
        ],
        [
          "Migrar desde Dependabot",
          "migrar-desde-dependabot",
          [
            "Consideraciones de Integración con GitHub",
            "Ventajas de Dependabot a Replicar:",
            "Alertas de vulnerabilidades de seguridad",
            "Actualizaciones automáticas de seguridad",
            "Integración con GitHub",
            "Creación y gestión de PR",
            "Enfoque de Migración",
            "1. Auditar Configuración Actual de Dependabot",
            "Revisar .github/dependabot.yml:",
            "2. Configurar PCU con GitHub Actions",
            "Crear .github/workflows/dependencies.yml:",
            "3. Integración de Seguridad",
            "Reemplazar características de seguridad de Dependabot:",
            "4. Proceso de Revisión Manual",
            "Establecer flujos de trabajo centrados en humanos:"
          ]
        ],
        [
          "Migrar desde Gestión Manual de Dependencias",
          "migrar-desde-gestion-manual-de-dependencias",
          [
            "Fase de Evaluación",
            "Análisis de Estado Actual:",
            "Frecuencia: ¿Con qué frecuencia actualizas dependencias?",
            "Proceso: ¿Cuál es tu flujo de trabajo actual de actualización?",
            "Pruebas: ¿Cómo validas las actualizaciones?",
            "Seguridad: ¿Cómo manejas las vulnerabilidades?",
            "Patrones Manuales Comunes:",
            "Migración Estructurada",
            "Fase 1: Evaluación (Semana 1)",
            "Fase 2: Conversión de Catálogo (Semana 2)",
            "Fase 3: Integración de Proceso (Semana 3-4)",
            "Estrategia de Automatización",
            "Automatización Gradual:",
            "Inicio Manual: Todas las actualizaciones requieren confirmación",
            "Semi-Automatizado: Auto-actualizar dependencias de desarrollo y tipos",
            "Automatización Inteligente: Auto-actualizar patches, confirmar menores",
            "Automatización Completa: Auto-actualizar todo excepto mayores",
            "Evolución de Configuración:"
          ]
        ],
        [
          "Convertir Proyectos No-pnpm",
          "convertir-proyectos-no-pnpm",
          [
            "Desde Proyectos npm",
            "1. Análisis de Dependencias",
            "2. Migración a pnpm",
            "3. Extracción de Catálogo",
            "Desde Proyectos Yarn",
            "1. Conversión de Workspace",
            "2. Comandos de Migración",
            "Conversión de Monorepo",
            "Estrategia de Monorepo Grande:"
          ]
        ],
        [
          "Estrategias de Transición del Equipo",
          "estrategias-de-transicion-del-equipo",
          [
            "Gestión del Cambio",
            "1. Plan de Comunicación",
            "Semana -2: Anunciar plan de migración",
            "Semana -1: Sesiones de entrenamiento y documentación",
            "Semana 0: Comenzar ejecución paralela",
            "Semana 2: Transición completa",
            "Semana 4: Optimización de procesos",
            "2. Programa de Entrenamiento",
            "Sesión de Entrenamiento para Desarrolladores (1 hora):",
            "Entrenamiento para Líderes de Equipo (2 horas):",
            "Gestión de configuración",
            "Integración de políticas de seguridad",
            "Optimización de rendimiento",
            "Monitoreo y reportes",
            "Estrategia de Despliegue",
            "Enfoque de Proyecto Piloto:",
            "Seleccionar Proyecto Piloto: Elegir proyecto representativo pero no crítico",
            "Migración Piloto: Completar migración con equipo piloto",
            "Lecciones Aprendidas: Documentar problemas y soluciones",
            "Despliegue Escalado: Aplicar aprendizajes a otros proyectos",
            "Mitigación de Riesgos:",
            "Integración de Procesos",
            "Integración de Revisión de Código:",
            "Integración de Lanzamiento:"
          ]
        ],
        [
          "Validación y Pruebas",
          "validacion-y-pruebas",
          [
            "Validación de Migración",
            "1. Pruebas Funcionales",
            "2. Comparación de Rendimiento",
            "3. Integridad de Dependencias",
            "Métricas de Éxito",
            "Indicadores Clave de Rendimiento:",
            "Velocidad de Instalación: pnpm install vs npm install",
            "Frecuencia de Actualización: Actualizaciones por mes antes/después",
            "Respuesta de Seguridad: Tiempo para arreglar vulnerabilidades",
            "Satisfacción del Desarrollador: Resultados de encuesta del equipo",
            "Rendimiento de Build: Tiempo de ejecución CI/CD",
            "Dashboard de Monitoreo:"
          ]
        ],
        [
          "Lista de Verificación de Migración",
          "lista-de-verificacion-de-migracion",
          [
            "Pre-Migración",
            "Evaluar enfoque actual de gestión de dependencias",
            "Instalar y probar pnpm en entorno aislado",
            "Planificar estructura de workspace",
            "Identificar dependencias comunes para catálogo",
            "Respaldar configuración actual",
            "Entrenar miembros clave del equipo",
            "Fase de Migración",
            "Convertir a estructura de workspace de pnpm",
            "Extraer dependencias a catálogo",
            "Actualizar archivos package.json para usar referencias de catálogo",
            "Instalar y configurar PCU",
            "Probar funcionalidad con proyecto piloto",
            "Actualizar pipelines de CI/CD",
            "Documentar nuevos procesos",
            "Post-Migración",
            "Validar que toda la funcionalidad funciona",
            "Entrenar miembros restantes del equipo",
            "Optimizar configuración de PCU",
            "Establecer horarios de mantenimiento regular",
            "Monitorear y medir métricas de éxito",
            "Recopilar retroalimentación e iterar",
            "Solución de Problemas",
            "Documentar problemas comunes de migración",
            "Crear procedimientos de rollback",
            "Establecer canales de soporte",
            "Verificaciones regulares de salud y optimización"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "Optimización de Rendimiento",
          null,
          [
            "Maximiza el rendimiento de PCU para monorepos grandes, workspaces complejos y entornos con recursos limitados. "
          ]
        ],
        [
          "Entendiendo el Rendimiento de PCU",
          "entendiendo-el-rendimiento-de-pcu",
          [
            "El rendimiento de PCU depende de varios factores:",
            "Latencia de red: Tiempos de respuesta del registro y ancho de banda",
            "Tamaño del workspace: Número de paquetes y dependencias",
            "Eficiencia de caché: Tasas de acierto y optimización de almacenamiento",
            "Recursos del sistema: CPU, memoria y E/S de disco",
            "Configuración: Configuraciones de concurrencia y valores de timeout",
            "Perfilado de Rendimiento",
            "Habilita monitoreo detallado de rendimiento:",
            "Análisis de Salida de Ejemplo:"
          ]
        ],
        [
          "Optimización de Configuración",
          "optimizacion-de-configuracion",
          [
            "Configuraciones de Concurrencia",
            "Optimiza las operaciones concurrentes para tu entorno:",
            "Directrices de Concurrencia:",
            "Proyectos pequeños (menos de 20 paquetes): concurrency: 5-8",
            "Proyectos medianos (20-100 paquetes): concurrency: 3-5",
            "Proyectos grandes (más de 100 paquetes): concurrency: 1-3",
            "Entornos CI/CD: concurrency: 2-3",
            "Gestión de Memoria",
            "Optimización de Memoria de Node.js:",
            "Configuración de Memoria de PCU:"
          ]
        ],
        [
          "Estrategias de Caché",
          "estrategias-de-cache",
          [
            "Optimización de Caché Local",
            "Configuración de Caché:",
            "Variables de Entorno:",
            "Comandos de Gestión de Caché",
            "Integración de Caché CI/CD"
          ]
        ],
        [
          "Optimización de Red",
          "optimizacion-de-red",
          [
            "Configuración de Registro",
            "Optimizar Selección de Registro:",
            "Optimización de Conexión:",
            "Gestión de Ancho de Banda"
          ]
        ],
        [
          "Estrategias para Monorepos Grandes",
          "estrategias-para-monorepos-grandes",
          [
            "Segmentación de Workspace",
            "Organizar Workspaces Grandes:",
            "Procesamiento Selectivo:",
            "Procesamiento Incremental",
            "Actualizaciones Escalonadas:",
            "Flujos de Trabajo de Procesamiento:"
          ]
        ],
        [
          "Gestión de Memoria y Recursos",
          "gestion-de-memoria-y-recursos",
          [
            "Perfilado de Memoria",
            "Monitorear Uso de Memoria:",
            "Técnicas de Optimización de Memoria:",
            "Optimización de E/S de Disco",
            "Configuraciones SSD vs HDD:",
            "Caché del Sistema de Archivos:"
          ]
        ],
        [
          "Monitoreo de Rendimiento",
          "monitoreo-de-rendimiento",
          [
            "Recolección de Métricas",
            "Métricas Integradas:",
            "Monitoreo Personalizado:",
            "Benchmarking",
            "Benchmarks de Rendimiento:",
            "Guía de Ajuste de Rendimiento",
            "Optimización Paso a Paso:",
            "Medición de Base",
            "Habilitar Caché",
            "Optimizar Concurrencia",
            "Optimización de Red",
            "Ajuste de Memoria"
          ]
        ],
        [
          "Solución de Problemas de Rendimiento",
          "solucion-de-problemas-de-rendimiento",
          [
            "Problemas Comunes de Rendimiento",
            "Solicitudes de Red Lentas:",
            "Problemas de Memoria:",
            "Problemas de Caché:",
            "Detección de Regresión de Rendimiento",
            "Pruebas Automatizadas de Rendimiento:"
          ]
        ],
        [
          "Optimizaciones Específicas por Entorno",
          "optimizaciones-especificas-por-entorno",
          [
            "Desarrollo Local",
            "Configuración de Máquina de Desarrollador:",
            "Entornos CI/CD",
            "Optimización para Diferentes Proveedores de CI:",
            "Despliegues de Producción",
            "Configuración de Grado de Producción:"
          ]
        ],
        [
          "Lista de Verificación de Rendimiento",
          "lista-de-verificacion-de-rendimiento",
          [
            "Mejoras Rápidas",
            "Habilitar caché persistente: export PCU_CACHE_ENABLED=true",
            "Optimizar concurrencia para tu entorno",
            "Usar registros geográficamente cercanos",
            "Aumentar tamaño de heap de Node.js para proyectos grandes",
            "Habilitar compresión de solicitudes y keep-alive",
            "Optimizaciones Avanzadas",
            "Implementar estrategias de caché CI/CD",
            "Configurar segmentación de workspace para monorepos grandes",
            "Configurar monitoreo de rendimiento y alertas",
            "Optimizar gestión de memoria para operaciones sostenidas",
            "Implementar flujos de trabajo de procesamiento incremental",
            "Monitoreo y Mantenimiento",
            "Benchmarking regular de rendimiento",
            "Monitoreo de salud del caché",
            "Medición de latencia de red",
            "Perfilado de uso de memoria",
            "Detección de regresión de rendimiento"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "Inicio Rápido",
          null,
          [
            "Comienza a usar pnpm-catalog-updates en minutos. Esta guía te llevará a través de la instalación, inicialización y tu primera actualización de dependencias. ",
            "pnpm-catalog-updates está específicamente diseñado para workspaces de pnpm que usan dependencias\nde catálogo. Asegúrate de tener un workspace de pnpm antes de comenzar."
          ]
        ],
        [
          "Instalación",
          "instalacion",
          [
            "Elige tu método de instalación preferido:"
          ]
        ],
        [
          "Inicializa tu Workspace",
          "inicializa-tu-workspace",
          [
            "Si aún no tienes un workspace de pnpm, PCU puede crear uno para ti:",
            "Este comando crea:",
            ".pcurc.json - Archivo de configuración de PCU",
            "package.json - package.json raíz del workspace (si falta)",
            "pnpm-workspace.yaml - Configuración del workspace de PNPM (si falta)",
            "packages/ - Directorio para paquetes del workspace (si falta)"
          ]
        ],
        [
          "Tu Primera Verificación de Actualizaciones",
          "tu-primera-verificacion-de-actualizaciones",
          [
            "Verifica dependencias del catálogo desactualizadas:",
            "Esto te mostrará una hermosa tabla con:",
            "Versiones actuales en tus catálogos",
            "Últimas versiones disponibles",
            "Nombres de paquetes y tipos de actualización",
            "Indicadores de urgencia codificados por color"
          ]
        ],
        [
          "Actualizaciones Interactivas",
          "actualizaciones-interactivas",
          [
            "Actualiza dependencias con una interfaz interactiva:",
            "Esto te permite:",
            "✅ Elegir qué dependencias actualizar",
            "🎯 Seleccionar versiones específicas",
            "📊 Ver análisis de impacto",
            "🔒 Crear respaldos automáticamente"
          ]
        ],
        [
          "Comandos Comunes",
          "comandos-comunes",
          [
            "Aquí están los comandos más utilizados frecuentemente:",
            "| Comando    | Descripción                  | Ejemplo                    |\n| ---------- | ---------------------------- | -------------------------- |\n| pcu init | Inicializar workspace        | pcu init --verbose       |\n| pcu -c   | Verificar actualizaciones    | pcu -c --catalog default |\n| pcu -i   | Actualizaciones interactivas | pcu -i -b                |\n| pcu -u   | Actualizar dependencias      | pcu -u --target minor    |\n| pcu -a   | Analizar impacto             | pcu -a default react     |"
          ]
        ],
        [
          "¿Qué Sigue?",
          "que-sigue",
          []
        ],
        [
          "Lista de Verificación para Comenzar",
          "lista-de-verificacion-para-comenzar",
          [
            "Sigue esta lista de verificación para que PCU funcione en tu proyecto:",
            "Instalar PCU - Elige instalación global o usa npx",
            "Inicializar workspace - Ejecuta pcu init para la configuración inicial",
            "Verificar actualizaciones - Usa pcu -c para ver actualizaciones disponibles",
            "Configurar ajustes - Personaliza .pcurc.json para tus necesidades",
            "Actualizar dependencias - Usa modo interactivo pcu -i para actualizaciones seguras",
            "Configurar automatización - Considera integración CI/CD para verificaciones regulares"
          ]
        ],
        [
          "Referencia Rápida de Comandos Esenciales",
          "referencia-rapida-de-comandos-esenciales",
          [
            "| Comando        | Propósito                 | Cuándo Usar                                 |\n| -------------- | ------------------------- | ------------------------------------------- |\n| pcu init     | Configurar workspace      | Primera configuración, nuevos proyectos     |\n| pcu -c       | Verificar actualizaciones | Desarrollo diario, verificaciones CI        |\n| pcu -i       | Actualización interactiva | Actualizaciones manuales seguras            |\n| pcu -u       | Actualización en lote     | Actualizaciones automatizadas, CI/CD        |\n| pcu security | Escaneo de seguridad      | Antes de lanzamientos, auditorías regulares |"
          ]
        ],
        [
          "Próximos Pasos",
          "proximos-pasos",
          [
            "Una vez que tengas PCU configurado, explora estas características avanzadas:",
            "Configuración - Personaliza PCU para tu flujo de trabajo específico",
            "Escaneo de Seguridad - Integra escaneo de vulnerabilidades",
            "Gestión de Monorepo - Características avanzadas de workspace",
            "Integración CI/CD - Automatiza actualizaciones de dependencias en tu pipeline"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "Solución de Problemas",
          null,
          [
            "Problemas comunes y soluciones para ayudarte a resolver problemas con PCU. Encuentra respuestas a errores frecuentemente encontrados y consejos de depuración. "
          ]
        ],
        [
          "Errores Comunes",
          "errores-comunes",
          [
            "Workspace No Encontrado",
            "Mensaje de Error:",
            "Causa: PCU no pudo localizar un archivo pnpm-workspace.yaml o detectar una estructura válida de workspace de pnpm.",
            "Soluciones:",
            "Sin Dependencias de Catálogo",
            "Mensaje de Error:",
            "Causa: Tu workspace no usa dependencias de catálogo de pnpm.",
            "Soluciones:",
            "Problemas de Acceso al Registro",
            "Mensaje de Error:",
            "Causa: Problemas de conectividad de red o problemas de acceso al registro.",
            "Soluciones:",
            "Errores de Autenticación",
            "Mensaje de Error:",
            "Causa: Tokens de autenticación faltantes o inválidos para registros privados.",
            "Soluciones:",
            "Errores del Archivo de Configuración",
            "Mensaje de Error:",
            "Causa: JSON mal formado u opciones de configuración inválidas.",
            "Soluciones:"
          ]
        ],
        [
          "Depuración",
          "depuracion",
          [
            "Habilitar Logging Detallado",
            "Validación de Workspace"
          ]
        ],
        [
          "Problemas de Rendimiento",
          "problemas-de-rendimiento",
          [
            "Solicitudes de Red Lentas",
            "Síntomas: PCU toma mucho tiempo en verificar actualizaciones",
            "Soluciones:",
            "Alto Uso de Memoria",
            "Síntomas: PCU consume memoria excesiva con workspaces grandes",
            "Soluciones:"
          ]
        ],
        [
          "Problemas de Entorno",
          "problemas-de-entorno",
          [
            "Compatibilidad de Versión de Node.js",
            "Mensaje de Error:",
            "Soluciones:",
            "Problemas de Versión de pnpm",
            "Mensaje de Error:",
            "Soluciones:"
          ]
        ],
        [
          "Problemas Específicos de Windows",
          "problemas-especificos-de-windows",
          [
            "Problemas de Separador de Rutas",
            "Mensaje de Error:",
            "Soluciones:",
            "Errores de Permisos",
            "Mensaje de Error:",
            "Soluciones:"
          ]
        ],
        [
          "Obtener Ayuda",
          "obtener-ayuda",
          [
            "Información de Diagnóstico",
            "Al reportar problemas, incluye esta información de diagnóstico:",
            "Canales de Soporte",
            "🐛 Reportes de Bugs: GitHub Issues",
            "💬 Preguntas: GitHub Discussions",
            "📖 Documentación: Consulta esta documentación para guías detalladas",
            "🔧 Solicitudes de Características: Usa GitHub Issues con la etiqueta enhancement",
            "Plantilla de Issues",
            "Al reportar bugs, por favor incluye:",
            "Versión de PCU y comando usado",
            "Mensaje de error (salida completa con --verbose)",
            "Entorno (SO, versiones de Node.js, pnpm)",
            "Estructura del workspace (pnpm-workspace.yaml, package.json)",
            "Configuración (.pcurc.json, .npmrc si es relevante)",
            "Pasos para reproducir el problema",
            "Comportamiento esperado vs actual"
          ]
        ],
        [
          "Problemas de Comando de Seguridad",
          "problemas-de-comando-de-seguridad",
          [
            "Problemas de Integración con Snyk",
            "Mensaje de Error:",
            "Causa: Snyk CLI no está instalado pero se usa el flag --snyk.",
            "Soluciones:",
            "Fallos de Corrección de Seguridad",
            "Mensaje de Error:",
            "Causa: Algunas vulnerabilidades requieren intervención manual o actualizaciones de versión mayor.",
            "Soluciones:",
            "Problemas de Comando de Tema",
            "Mensaje de Error:",
            "Causa: Intentando establecer un tema que no existe.",
            "Soluciones:",
            "Problemas de Modo Interactivo",
            "Mensaje de Error:",
            "Causa: Ejecutando PCU en un entorno no interactivo (CI, pipe, etc.).",
            "Soluciones:"
          ]
        ],
        [
          "Problemas Específicos de Comandos",
          "problemas-especificos-de-comandos",
          [
            "Problemas del Comando Analyze",
            "Mensaje de Error:",
            "Causa: Analizando un paquete que no existe en el catálogo especificado.",
            "Soluciones:",
            "Fallos del Comando Update",
            "Mensaje de Error:",
            "Causa: Problemas de permisos de archivos o problemas de estructura del workspace.",
            "Soluciones:"
          ]
        ],
        [
          "Depuración Avanzada",
          "depuracion-avanzada",
          [
            "Investigación de Memory Leaks",
            "Síntomas: La memoria del proceso PCU sigue creciendo durante la operación",
            "Pasos de Debug:",
            "Problemas de Respuesta del Registro",
            "Síntomas: Resultados inconsistentes o errores de timeout",
            "Pasos de Debug:",
            "Problemas de Herencia de Configuración",
            "Síntomas: La configuración no se aplica como se espera",
            "Pasos de Debug:"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "Características Avanzadas de Escritura",
          null,
          [
            "Domina las características avanzadas que hacen que tu documentación sea profesional y efectiva. Aprende sobre metadatos, párrafos principales, contextos de estilo y las mejores prácticas que separan la gran documentación de la buena. "
          ]
        ],
        [
          "Metadatos y SEO",
          "metadatos-y-seo",
          [
            "Cada página debe incluir metadatos en la parte superior:"
          ]
        ],
        [
          "Párrafos Principales",
          "parrafos-principales",
          [
            "Haz que los párrafos introductorios destaquen con {{ className: 'lead' }}:"
          ]
        ],
        [
          "Contexto de Estilo",
          "contexto-de-estilo",
          [
            "La Clase not-prose",
            "Usa <div className=\"not-prose\"> para componentes que necesitan escapar del estilo de prosa:"
          ]
        ],
        [
          "Mejores Prácticas de Documentación",
          "mejores-practicas-de-documentacion",
          [
            "Estructura del Contenido",
            "Comienza con metadatos y títulos claros",
            "Usa párrafos principales para introducciones",
            "Organiza con jerarquía apropiada de encabezados",
            "Agrega Notes para información importante",
            "Incluye ejemplos prácticos de código",
            "Termina con próximos pasos claros",
            "Estilo de Escritura",
            "Usa voz activa",
            "Sé conciso pero completo",
            "Incluye ejemplos para cada concepto",
            "Prueba todos los fragmentos de código",
            "Mantén terminología consistente",
            "Organización",
            "Agrupa temas relacionados",
            "Usa referencias cruzadas liberalmente",
            "Proporciona múltiples puntos de entrada",
            "Considera el viaje del usuario",
            "Incluye encabezados amigables para búsqueda"
          ]
        ],
        [
          "Flujo de Trabajo Completo de Documentación",
          "flujo-de-trabajo-completo-de-documentacion",
          [
            "Planifica: Esboza la estructura de tu contenido",
            "Escribe: Usa componentes apropiados para cada sección",
            "Revisa: Verifica completitud y precisión",
            "Prueba: Verifica que todos los ejemplos funcionen",
            "Itera: Mejora basándote en retroalimentación",
            "¡Ahora tienes todas las herramientas necesarias para crear documentación de clase mundial!"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "Escribir Documentación de API",
          null,
          [
            "Crea documentación completa de API que los desarrolladores amen. Aprende a usar Properties para parámetros, Tags para métodos HTTP, Libraries para mostrar SDKs y componentes especializados que hacen las referencias de API claras y accionables. "
          ]
        ],
        [
          "Listas de Properties",
          "listas-de-properties",
          [
            "Documenta parámetros de API con <Properties> y <Property>:",
            "Identificador único para el recurso. Se genera automáticamente cuando se crea el recurso.",
            "Nombre de visualización del recurso. Debe tener entre 1 y 100 caracteres.",
            "Dirección de correo electrónico válida. Debe ser única entre todos los usuarios.",
            "Marca de tiempo ISO 8601 que indica cuándo se creó el recurso."
          ]
        ],
        [
          "Etiquetas de Métodos HTTP",
          "etiquetas-de-metodos-http",
          [
            "Las etiquetas se colorean automáticamente basándose en métodos HTTP:",
            "GET\nPOST\nPUT\nDELETE\nPERSONALIZADO\nÉXITO\nERROR"
          ]
        ],
        [
          "Componentes Libraries",
          "componentes-libraries",
          [
            "Cuadrícula Completa de Libraries",
            "Muestra todos los SDKs oficiales usando el componente <Libraries>:",
            "Library Individual",
            "Usa el componente <Library> para mostrar bibliotecas individuales:",
            "Libraries Compactas",
            "Para espacios más pequeños, usa el modo compacto con descripciones:",
            "O sin descripciones para una visualización aún más compacta:",
            "Opciones del Componente Library",
            "language: Elige entre php, ruby, node, python, go (por defecto: node)",
            "compact: Usar estilo más pequeño (por defecto: false)",
            "showDescription: Mostrar/ocultar texto de descripción (por defecto: true)",
            "Casos de Uso de Libraries",
            "<Libraries />: Páginas de resumen completo de SDK, secciones de introducción",
            "<Library />: Documentación en línea, guías de lenguajes específicos",
            "<Library compact />: Referencias de barra lateral, listados compactos"
          ]
        ],
        [
          "Mejores Prácticas de API",
          "mejores-practicas-de-api",
          [
            "Siempre documenta todos los parámetros con componentes Properties",
            "Incluye ejemplos de solicitudes y respuestas",
            "Usa códigos de estado HTTP apropiados con Tags",
            "Proporciona mensajes de error claros",
            "Incluye requisitos de autenticación",
            "Usa el componente Libraries para páginas de SDK",
            "Mantén las listas de Properties enfocadas y bien organizadas"
          ]
        ],
        [
          "Próximos Pasos",
          "proximos-pasos",
          [
            "Completa tu viaje de documentación con Características Avanzadas."
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "Fundamentos de Escritura",
          null,
          [
            "Domina los bloques de construcción fundamentales de la escritura de documentación. Esta guía cubre la sintaxis estándar de Markdown, opciones de formato y elementos básicos que usarás en cada documento. "
          ]
        ],
        [
          "Fundamentos de Markdown",
          "fundamentos-de-markdown",
          [
            "El formato estándar de Markdown es totalmente compatible y forma la base de toda la documentación:",
            "Texto en negrita para énfasis e importanciaTexto en cursiva para énfasis sutilcódigo en línea para términos técnicos, comandos y fragmentos de código cortos",
            "Puedes combinar estos: negrita y cursiva o negrita con código"
          ]
        ],
        [
          "Formato de Texto",
          "formato-de-texto",
          [
            "Énfasis y Texto Fuerte",
            "Usa asteriscos o guiones bajos para énfasis:",
            "Código y Términos Técnicos",
            "Para código en línea, variables o términos técnicos, usa tildes invertidas:"
          ]
        ],
        [
          "Listas y Organización",
          "listas-y-organizacion",
          [
            "Listas No Ordenadas",
            "Perfectas para listas de características, requisitos o cualquier elemento no secuencial:",
            "Característica o punto principal",
            "Otro elemento importante",
            "Tercera consideración",
            "Sub-punto anidado",
            "Detalle sub-adicional",
            "De vuelta al nivel principal",
            "Listas Ordenadas",
            "Usa para instrucciones paso a paso, procedimientos o elementos priorizados:",
            "Primer paso en el proceso",
            "Segundo paso con detalles importantes",
            "Tercer paso",
            "Sub-paso con instrucciones específicas",
            "Otro sub-paso",
            "Paso final",
            "Listas de Tareas",
            "Geniales para listas de verificación y seguimiento de progreso:",
            "[x] Tarea completada",
            "[x] Otro elemento terminado",
            "[ ] Tarea pendiente",
            "[ ] Mejora futura"
          ]
        ],
        [
          "Enlaces y Navegación",
          "enlaces-y-navegacion",
          [
            "Enlaces Internos",
            "Enlaza a otras páginas en tu documentación:",
            "Ejemplos:",
            "Guía de Referencia de Comandos",
            "Solución de Problemas",
            "Documentación SDK",
            "Enlaces Externos",
            "Enlaza a recursos externos:",
            "Enlaces de Ancla",
            "Enlaza a secciones específicas dentro de páginas:"
          ]
        ],
        [
          "Encabezados y Estructura",
          "encabezados-y-estructura",
          [
            "Crea una jerarquía de documento clara con niveles de encabezado apropiados:",
            "Mejores Prácticas de Encabezados",
            "Usa H1 solo para título de página (manejado por metadata)",
            "Comienza secciones con H2, subsecciones con H3",
            "No saltes niveles de encabezado (no H2 → H4)",
            "Mantén los encabezados descriptivos y escaneables",
            "Usa formato de oración: \"Empezando\" no \"Empezando\""
          ]
        ],
        [
          "Citas y Llamadas",
          "citas-y-llamadas",
          [
            "Citas en Bloque",
            "Para citas importantes o referencias:",
            "\"La documentación es una carta de amor que escribes a tu futuro yo.\"— Damian Conway",
            "Nota Importante: Esta es una cita destacada con contexto adicional que abarca múltiples líneas y proporciona información crucial.",
            "Citas de Múltiples Párrafos",
            "Este es el primer párrafo de una cita más larga.",
            "Este es el segundo párrafo que continúa el pensamiento con detalle adicional y contexto."
          ]
        ],
        [
          "Reglas Horizontales",
          "reglas-horizontales",
          [
            "Separa secciones principales con reglas horizontales:",
            "Crea una ruptura visual:"
          ]
        ],
        [
          "Tablas",
          "tablas",
          [
            "Tablas simples para datos estructurados:",
            "| Característica | Básico | Pro       | Empresarial   |\n| -------------- | ------ | --------- | ------------- |\n| Usuarios       | 10     | 100       | Ilimitado     |\n| Almacenamiento | 1GB    | 10GB      | 100GB         |\n| Llamadas API   | 1,000  | 10,000    | Ilimitado     |\n| Soporte        | Email  | Prioridad | Teléfono 24/7 |",
            "Alineación de Tablas",
            "Controla la alineación de columnas:",
            "| Alineado Izquierda | Alineado Centro | Alineado Derecha |\n| :----------------- | :-------------: | ---------------: |\n| Texto              |      Texto      |            Texto |\n| Más contenido      |  Más contenido  |    Más contenido |"
          ]
        ],
        [
          "Caracteres Especiales",
          "caracteres-especiales",
          [
            "Usa barras invertidas para escapar caracteres especiales de Markdown:"
          ]
        ],
        [
          "Saltos de Línea y Espaciado",
          "saltos-de-linea-y-espaciado",
          [
            "Termina líneas con dos espacios para saltos duros",
            "Usa líneas vacías para separar párrafos",
            "Usa \\ al final de línea para saltos en listas"
          ]
        ],
        [
          "Siguientes Pasos",
          "siguientes-pasos",
          [
            "Una vez que hayas dominado estos fundamentos, explora:",
            "Escribiendo Componentes - Elementos UI interactivos",
            "Escribiendo Código - Bloques de código y resaltado de sintaxis",
            "Escribiendo Diseño - Diseños multi-columna y organización",
            "Escribiendo API - Componentes de documentación API",
            "Escribiendo Avanzado - Características avanzadas y mejores prácticas",
            "Estos fundamentos forman la base de toda gran documentación. Domínalos primero, luego construye sobre ellos con los componentes avanzados y técnicas cubiertas en las otras guías."
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "Escribiendo Código",
          null,
          [
            "Domina el arte de presentar código en tu documentación. Aprende a usar resaltado de sintaxis, crear ejemplos multi-lenguaje y organizar bloques de código efectivamente para ayudar a los desarrolladores a entender e implementar tus soluciones. "
          ]
        ],
        [
          "Bloques de Código Individuales",
          "bloques-de-codigo-individuales",
          [
            "Bloques de código básicos con resaltado de sintaxis automático:",
            "El bloque de código JavaScript de arriba se crea usando la siguiente sintaxis MDX:",
            "Ejemplo de Python:",
            "Sintaxis MDX del bloque de código Python:",
            "Comandos Bash/Shell:",
            "Sintaxis MDX del bloque de código Bash:"
          ]
        ],
        [
          "CodeGroup para Múltiples Lenguajes",
          "code-group-para-multiples-lenguajes",
          [
            "Usa <CodeGroup> para mostrar el mismo ejemplo en diferentes lenguajes:",
            "El grupo de código multi-lenguaje de arriba se crea usando la siguiente sintaxis MDX:"
          ]
        ],
        [
          "Ejemplos de Endpoints API",
          "ejemplos-de-endpoints-api",
          [
            "Para documentación de API, usa etiquetas de métodos HTTP:",
            "El ejemplo de endpoint API de arriba se crea usando la siguiente sintaxis MDX, nota los atributos tag y label:",
            "Títulos de Bloques de Código",
            "También puedes agregar títulos a bloques de código individuales:"
          ]
        ],
        [
          "Lenguajes Soportados",
          "lenguajes-soportados",
          [
            "Nuestros bloques de código soportan resaltado de sintaxis para muchos lenguajes de programación, incluyendo pero no limitado a:",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Scripts Shell: bash, shell, sh",
            "Otros lenguajes: json, yaml, xml, sql, css, html, markdown, diff",
            "Ejemplo:",
            "Sintaxis MDX del bloque de código JSON:",
            "Comparación de código (Diff):",
            "Sintaxis MDX del bloque de código Diff:"
          ]
        ],
        [
          "Mejores Prácticas",
          "mejores-practicas",
          [
            "Siempre especifica el lenguaje para resaltado de sintaxis",
            "Usa títulos descriptivos para diferenciar ejemplos de código",
            "Incluye ejemplos completos y ejecutables",
            "Mantén los ejemplos concisos pero funcionales",
            "Usa formato y estilo consistentes",
            "Ordena las pestañas de lenguaje en CodeGroup por frecuencia de uso"
          ]
        ],
        [
          "Siguientes Pasos",
          "siguientes-pasos",
          [
            "Continúa con Componentes de Diseño para organizar tu contenido efectivamente."
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "Escribiendo Componentes",
          null,
          [
            "Mejora tu documentación con componentes UI interactivos. Aprende a usar Notes para información importante, Buttons para acciones y otros elementos que hacen tus documentos más atractivos y funcionales. "
          ]
        ],
        [
          "Notas y Llamadas",
          "notas-y-llamadas",
          [
            "El componente <Note> es perfecto para resaltar información importante, advertencias o consejos a los que los lectores deben prestar especial atención.",
            "Uso Básico de Note",
            "Este es un componente de nota básico. Automáticamente estiliza el contenido con un tema esmeralda\ny un ícono de información, haciendo que la información importante se destaque del texto regular.",
            "Notes con Contenido Rico",
            "Las Notes soportan formato completo de Markdown, incluyendo texto en negrita, texto en cursiva, código en línea, e incluso enlaces a otras páginas.",
            "Requisito de Configuración Importante: Antes de proceder, asegúrate de tener: - Node.js\nversión 18 o superior instalado - Acceso al repositorio del proyecto - Credenciales de API válidas\nconfiguradas Consulta la Guía de Referencia de Comandos para la\nconfiguración de credenciales.",
            "Notes de Múltiples Párrafos",
            "Este es el primer párrafo de una nota más larga que contiene múltiples piezas de información relacionada.",
            "Este segundo párrafo continúa el pensamiento con contexto adicional. Puedes incluir tantos párrafos como necesites para explicar completamente el concepto.",
            "Recuerda que las buenas notas son concisas pero completas, proporcionando la información justa para ayudar a los lectores a entender la importancia del mensaje."
          ]
        ],
        [
          "Botones y Acciones",
          "botones-y-acciones",
          [
            "El componente <Button> crea elementos de llamada a la acción que guían a los usuarios hacia enlaces importantes o siguientes pasos.",
            "Variantes de Botones",
            "Botones Rellenos",
            "Usar para acciones primarias y las llamadas a la acción más importantes:",
            "Aprende Sobre Componentes de Código",
            "Botones de Contorno",
            "Perfectos para acciones secundarias y rutas alternativas:",
            "Explora Componentes de Diseño",
            "Botones de Texto",
            "Enlaces sutiles que se mezclan con el contenido mientras aún se destacan:",
            "Volver a lo Básico",
            "Flechas de Botones",
            "Los botones soportan flechas direccionales para indicar navegación:",
            "Sección Anterior",
            "Siguiente Sección",
            "Mejores Prácticas de Botones",
            "Usar con moderación: Demasiados botones reducen su efectividad",
            "Palabras de acción claras: \"Comenzar\", \"Aprender Más\", \"Ver Documentación\"",
            "Jerarquía lógica: Relleno para primario, contorno para secundario, texto para terciario",
            "Flechas direccionales: Izquierda para \"atrás/anterior\", derecha para \"adelante/siguiente\"",
            "Envolver en not-prose: Siempre usar el envoltorio <div className=\"not-prose\">"
          ]
        ],
        [
          "Contexto de Estilo de Componentes",
          "contexto-de-estilo-de-componentes",
          [
            "El Envoltorio not-prose",
            "Algunos componentes necesitan escapar del estilo de prosa predeterminado. Siempre envuelve estos componentes:",
            "Componentes que requieren not-prose:",
            "Todos los componentes <Button>",
            "Elementos de diseño personalizados",
            "Widgets interactivos",
            "Componentes con estilo complejo",
            "Componentes que funcionan sin not-prose:",
            "Componentes <Note> (estilo autocontenido)",
            "Elementos estándar de Markdown",
            "Componentes basados en texto",
            "Múltiples Componentes",
            "Al mostrar múltiples componentes juntos:",
            "Guía de Documentación API",
            "Características Avanzadas",
            "Revisar lo Básico"
          ]
        ],
        [
          "Accesibilidad de Componentes",
          "accesibilidad-de-componentes",
          [
            "Todos los componentes están construidos con accesibilidad en mente:",
            "HTML Semántico: Elementos apropiados de botón y enlace",
            "Etiquetas ARIA: Soporte para lectores de pantalla donde sea necesario",
            "Navegación por Teclado: Accesibilidad completa por teclado",
            "Gestión de Foco: Indicadores de foco claros",
            "Contraste de Color: Esquemas de color compatibles con WCAG"
          ]
        ],
        [
          "Cuándo Usar Cada Componente",
          "cuando-usar-cada-componente",
          [
            "Usar Notes Cuando:",
            "Resaltar información crítica",
            "Advertir sobre problemas potenciales",
            "Proporcionar consejos útiles o contexto",
            "Explicar prerrequisitos o requisitos",
            "Llamar la atención sobre cambios importantes",
            "Usar Buttons Cuando:",
            "Guiar hacia siguientes pasos lógicos",
            "Enlazar a recursos externos",
            "Crear momentos claros de llamada a la acción",
            "Navegación entre secciones principales",
            "Resaltar acciones primarias",
            "Evitar el Sobreuso:",
            "No usar notas para cada párrafo",
            "Limitar botones a 1-2 por sección",
            "Reservar componentes para contenido verdaderamente importante",
            "Dejar que el texto regular y Markdown lleven la mayor parte del contenido"
          ]
        ],
        [
          "Siguientes Pasos",
          "siguientes-pasos",
          [
            "Ahora que entiendes los componentes UI, explora:",
            "Escribiendo Código - Resaltado de sintaxis y bloques de código",
            "Escribiendo Diseño - Diseños multi-columna y organización",
            "Escribiendo API - Componentes de documentación API",
            "Escribiendo Avanzado - Características avanzadas y metadatos",
            "Domina estos elementos interactivos para crear documentación que no solo informe sino que guíe y enganche a tus lectores efectivamente."
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "Escribiendo Diseño",
          null,
          [
            "Crea diseños sofisticados que mejoren la legibilidad y experiencia del usuario. Aprende a usar componentes Row y Col para diseños multi-columna, posicionamiento sticky y organización efectiva de contenido. "
          ]
        ],
        [
          "Diseño de Dos Columnas",
          "diseno-de-dos-columnas",
          [
            "Usa <Row> y <Col> para contenido lado a lado:",
            "Columna Izquierda",
            "Este contenido aparece en la columna izquierda. Perfecto para explicaciones, descripciones o información complementaria.",
            "Punto clave uno",
            "Detalle importante",
            "Contexto adicional",
            "Columna Derecha"
          ]
        ],
        [
          "Diseño de Columna Sticky",
          "diseno-de-columna-sticky",
          [
            "Haz que el contenido se mantenga al hacer scroll:",
            "Contenido con Scroll",
            "Este es contenido regular que hace scroll normalmente. Puedes poner explicaciones largas aquí que los usuarios tendrán que scrollear para leer completamente.",
            "Esta columna contiene la narrativa principal o información detallada que requiere scroll para consumir totalmente.",
            "Referencia Sticky",
            "Esto se mantiene visible mientras haces scroll."
          ]
        ],
        [
          "Componente Guides",
          "componente-guides",
          [
            "Muestra una cuadrícula de enlaces de guías usando el componente <Guides>:",
            "El componente Guides muestra un conjunto predefinido de guías de documentación con enlaces y descripciones. Perfecto para páginas de resumen y secciones de inicio."
          ]
        ],
        [
          "Componente Resources",
          "componente-resources",
          [
            "Muestra categorías principales de recursos con tarjetas animadas:",
            "El componente Resources muestra tarjetas de recursos animadas con íconos y descripciones. Genial para páginas de destino principales y secciones de resumen de API."
          ]
        ],
        [
          "Íconos",
          "iconos",
          [
            "Usa íconos individuales para decoración en línea o diseños personalizados:",
            "Íconos Disponibles",
            "<UserIcon /> - Usuario único",
            "<UsersIcon /> - Múltiples usuarios",
            "<EnvelopeIcon /> - Mensajes/email",
            "<ChatBubbleIcon /> - Conversaciones",
            "<BookIcon /> - Documentación",
            "<CheckIcon /> - Éxito/completado",
            "<BellIcon /> - Notificaciones",
            "<CogIcon /> - Configuración/ajustes"
          ]
        ],
        [
          "Mejores Prácticas de Diseño",
          "mejores-practicas-de-diseno",
          [
            "Usa diseños de dos columnas para contenido complementario",
            "Las columnas sticky funcionan mejor para material de referencia",
            "Mantén las columnas balanceadas en longitud de contenido",
            "Asegura responsividad móvil (las columnas se apilan en pantallas pequeñas)",
            "Usa Guides para páginas de resumen de documentación",
            "Usa Resources para showcases de categorías de API",
            "Los íconos funcionan bien con clases personalizadas de Tailwind para colores y tamaños"
          ]
        ],
        [
          "Siguientes Pasos",
          "siguientes-pasos",
          [
            "Continúa con Documentación de API para componentes especializados."
          ]
        ]
      ]
    }
  ],
  "fr": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "Analyse IA",
          null,
          [
            "PCU s'intègre aux outils CLI d'IA pour fournir une analyse intelligente des dépendances, des évaluations de sécurité et des recommandations de mise à jour. "
          ]
        ],
        [
          "Aperçu",
          "apercu",
          [
            "L'analyse IA améliore les capacités de PCU en fournissant :",
            "Analyse d'Impact : Comprenez comment les mises à jour affectent votre code",
            "Évaluation de Sécurité : Obtenez une analyse des vulnérabilités alimentée par IA",
            "Vérification de Compatibilité : Détectez les changements incompatibles potentiels",
            "Recommandations de Mise à Jour : Recevez des suggestions intelligentes pour des mises à jour sûres"
          ]
        ],
        [
          "Fournisseurs IA Supportés",
          "fournisseurs-ia-supportes",
          [
            "PCU détecte automatiquement et utilise les outils CLI d'IA disponibles dans l'ordre de priorité suivant :",
            "| Fournisseur | Priorité | Capacités                                        |\n| ----------- | -------- | ------------------------------------------------ |\n| Gemini      | 100      | Impact, Sécurité, Compatibilité, Recommandations |\n| Claude      | 80       | Impact, Sécurité, Compatibilité, Recommandations |\n| Codex       | 60       | Impact, Compatibilité, Recommandations           |\n| Cursor      | 40       | Impact, Recommandations                          |",
            "Si aucun fournisseur IA n'est disponible, PCU se replie automatiquement sur un moteur d'analyse\nbasé sur des règles qui fournit une analyse de base des dépendances en utilisant des règles\nprédéfinies."
          ]
        ],
        [
          "Commandes",
          "commandes",
          [
            "Vérifier les Fournisseurs IA Disponibles",
            "Affichez les outils IA disponibles sur votre système :",
            "Cette commande affiche :",
            "Les outils CLI d'IA disponibles détectés sur votre système",
            "Les informations de version pour chaque fournisseur",
            "Le meilleur fournisseur disponible qui sera utilisé pour l'analyse",
            "Options de la Commande AI",
            "Afficher l'état de tous les fournisseurs IA (comportement par défaut)",
            "Tester l'analyse IA avec une requête d'exemple pour vérifier la connectivité du fournisseur",
            "Afficher les statistiques du cache d'analyse IA incluant le taux de succès et la taille",
            "Vider le cache d'analyse IA pour libérer de l'espace ou réinitialiser les réponses en cache",
            "Mise à Jour avec IA",
            "Mettez à jour les dépendances avec une analyse alimentée par IA :",
            "La mise à jour améliorée par IA fournit :",
            "Une évaluation intelligente des risques pour chaque mise à jour",
            "La détection des changements incompatibles avec explications",
            "L'identification des vulnérabilités de sécurité",
            "L'ordre de mise à jour recommandé",
            "Analyse avec IA",
            "Analysez une mise à jour de package spécifique avec l'assistance de l'IA :",
            "La commande analyze utilise le catalogue default par défaut. Vous pouvez spécifier un\ncatalogue différent comme premier argument : pcu analyze my-catalog react"
          ]
        ],
        [
          "Types d'Analyse",
          "types-d-analyse",
          [
            "Analyse d'Impact",
            "Évaluez comment une mise à jour de dépendance affectera votre projet :",
            "Identifiez tous les packages du workspace utilisant la dépendance",
            "Analysez les changements d'API entre les versions",
            "Estimez l'effort de migration requis",
            "Suggérez les zones de test prioritaires",
            "Analyse de Sécurité",
            "Fournit une évaluation axée sur la sécurité :",
            "Identifiez les vulnérabilités connues dans la version actuelle",
            "Vérifiez les correctifs de sécurité dans la nouvelle version",
            "Évaluez les mises à jour de packages liés à la sécurité",
            "Recommandez les meilleures pratiques de sécurité",
            "Analyse de Compatibilité",
            "Vérifiez les problèmes de compatibilité potentiels :",
            "Détectez les changements d'API incompatibles",
            "Identifiez les conflits de dépendances peer",
            "Vérifiez la compatibilité de version Node.js",
            "Validez la compatibilité TypeScript",
            "Recommandations",
            "Générez des recommandations actionnables :",
            "Suggérez l'ordre de mise à jour optimal",
            "Recommandez les plages de versions",
            "Identifiez les packages à mettre à jour ensemble",
            "Fournissez des stratégies de retour arrière"
          ]
        ],
        [
          "Comportement de Repli",
          "comportement-de-repli",
          [
            "Lorsque les fournisseurs IA ne sont pas disponibles, PCU utilise un moteur d'analyse basé sur des règles intégré :",
            "Fonctionnalités de l'Analyse Basée sur les Règles",
            "Évaluation du Saut de Version : Évaluez le risque basé sur les changements semver",
            "Modèles de Changements Connus : Détectez les changements incompatibles pour les packages populaires (React, TypeScript, ESLint, etc.)",
            "Packages Sensibles à la Sécurité : Signalez les packages liés à la sécurité pour un examen attentif",
            "Estimation de l'Effort : Fournissez des estimations d'effort de migration",
            "Niveaux de Risque",
            "| Niveau   | Description                                                    |\n| -------- | -------------------------------------------------------------- |\n| Faible   | Mises à jour patch, généralement sûres à appliquer             |\n| Moyen    | Mises à jour minor ou grands sauts de version minor            |\n| Élevé    | Mises à jour de version majeure avec changements incompatibles |\n| Critique | Multiples sauts de version majeure ou versions pré-release     |"
          ]
        ],
        [
          "Configuration",
          "configuration",
          [
            "Variables d'Environnement",
            "Chemin personnalisé vers l'exécutable CLI Gemini",
            "Chemin personnalisé vers l'exécutable CLI Claude",
            "Chemin personnalisé vers l'exécutable CLI Codex",
            "Chemin personnalisé vers l'exécutable CLI Cursor",
            "Méthodes de Détection",
            "PCU utilise plusieurs stratégies pour détecter les fournisseurs IA :",
            "Variables d'Environnement : Vérifier les variables de chemin personnalisées",
            "Recherche PATH : Utiliser la commande which pour trouver les exécutables",
            "Chemins Connus : Vérifier les emplacements d'installation courants",
            "Chemins d'Application : Vérifier les applications GUI (ex. Cursor.app)"
          ]
        ],
        [
          "Exemples d'Utilisation",
          "exemples-d-utilisation",
          [
            "Workflow de Mise à Jour Sécurisé",
            "Intégration CI/CD",
            "Analyse par Lots"
          ]
        ],
        [
          "Meilleures Pratiques",
          "meilleures-pratiques",
          [
            "Quand Utiliser l'Analyse IA",
            "Mises à Jour de Version Majeure : Toujours utiliser l'analyse IA pour les montées de version majeure",
            "Packages Sensibles à la Sécurité : Utiliser pour les packages d'authentification, de cryptographie et de session",
            "Grandes Bases de Code : L'IA aide à identifier les zones affectées dans les monorepos",
            "Détection de Changements Incompatibles : L'IA fournit des explications détaillées",
            "Considérations de Performance",
            "L'analyse IA ajoute du temps de traitement par rapport aux mises à jour standard",
            "Utilisez --dry-run pour prévisualiser les recommandations IA sans appliquer de changements",
            "Envisagez d'utiliser le repli basé sur les règles pour des pipelines CI/CD plus rapides quand l'IA n'est pas critique",
            "Combinaison avec d'Autres Fonctionnalités"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "Meilleures Pratiques",
          null,
          [
            "Apprenez à utiliser PCU efficacement dans les environnements d'équipe, les flux de travail d'entreprise et les systèmes de production. "
          ]
        ],
        [
          "Collaboration d'Équipe",
          "collaboration-d-equipe",
          [
            "Configuration Partagée",
            "Maintenez la cohérence de votre configuration PCU entre les membres de l'équipe en versionnant votre .pcurc.json :",
            "Directives de Révision de Code",
            "Liste de contrôle pré-révision :",
            "Exécutez pcu check --dry-run pour prévisualiser les changements",
            "Vérifiez qu'il n'y a pas de changements cassants dans les mises à jour de version majeure",
            "Testez les fonctionnalités critiques après les mises à jour de dépendances",
            "Examinez les fichiers CHANGELOG des packages mis à jour",
            "Processus de révision :",
            "Sécurité d'abord : Examinez toujours immédiatement les mises à jour de dépendances liées à la sécurité",
            "Grouper les mises à jour liées : Regroupez les packages connexes (ex. écosystème React) dans des PR uniques",
            "Documenter les raisons : Incluez la justification des épinglages de versions ou exclusions",
            "Couverture de tests : Assurez-vous d'une couverture de tests adéquate avant de fusionner les mises à jour de dépendances",
            "Standards de Communication",
            "Utilisez des messages de commit clairs lors de la mise à jour des dépendances :"
          ]
        ],
        [
          "Usage d'Entreprise",
          "usage-d-entreprise",
          [
            "Gouvernance et Conformité",
            "Processus d'approbation des dépendances :",
            "Scan de sécurité : Toutes les mises à jour doivent passer les audits de sécurité",
            "Conformité des licences : Vérifiez la compatibilité des licences avec les politiques internes",
            "Exigences de stabilité : Préférez les versions LTS dans les environnements de production",
            "Gestion des changements : Suivez les processus d'approbation des changements établis",
            "Configuration pour l'entreprise :",
            "Intégration de Registre Privé",
            "Configurez PCU pour les environnements d'entreprise avec des registres privés :",
            "Variables d'environnement :",
            "Piste d'Audit et Rapports",
            "Maintenez des enregistrements complets des changements de dépendances :"
          ]
        ],
        [
          "Flux de Travail de Release",
          "flux-de-travail-de-release",
          [
            "Intégration du Versioning Sémantique",
            "Alignez les mises à jour de dépendances avec votre cycle de release :",
            "Phase pré-release :",
            "Préparation de la release :",
            "Post-release :",
            "Tests d'Environnement de Staging",
            "Validation pré-production :"
          ]
        ],
        [
          "Meilleures Pratiques de Sécurité",
          "meilleures-pratiques-de-securite",
          [
            "Gestion des Vulnérabilités",
            "Réponse immédiate PCU :",
            "Sévérité critique/élevée : Mise à jour sous 24 heures",
            "Sévérité modérée : Mise à jour sous 1 semaine",
            "Sévérité faible : Inclure dans le prochain cycle de mise à jour régulier",
            "Validation des Dépendances",
            "Configuration de sécurité :",
            "Révisions de sécurité manuelles :",
            "Examinez toutes les nouvelles dépendances avant la première utilisation",
            "Auditez les mainteneurs de packages et les compteurs de téléchargement",
            "Vérifiez l'authenticité et les signatures des packages",
            "Vérifiez les problèmes de sécurité connus dans les chaînes de dépendances",
            "Contrôle d'Accès",
            "Gestion des tokens :"
          ]
        ],
        [
          "Optimisation des Performances",
          "optimisation-des-performances",
          [
            "Stratégies de Cache",
            "Développement local :",
            "Optimisation CI/CD :",
            "Gestion des Gros Monorepos",
            "Configuration pour 100+ packages :",
            "Traitement sélectif :",
            "Optimisation Réseau",
            "Configuration de registre :"
          ]
        ],
        [
          "Gestion d'Erreurs et Récupération",
          "gestion-d-erreurs-et-recuperation",
          [
            "Résolution d'Erreurs Courantes",
            "Problèmes réseau :",
            "Problèmes de mémoire :",
            "Sauvegarde et Récupération",
            "Créer des sauvegardes avant les mises à jour majeures :",
            "Stratégie de rollback de version :",
            "Monitoring et Alertes",
            "Intégration CI/CD :"
          ]
        ],
        [
          "Patterns d'Intégration",
          "patterns-d-integration",
          [
            "Intégration IDE et Éditeur",
            "Configuration VS Code :",
            "Scripts d'Automatisation",
            "Scripts Package.json :",
            "Intégration Git Hooks :"
          ]
        ],
        [
          "Liste de Contrôle de Référence Rapide",
          "liste-de-controle-de-reference-rapide",
          [
            "Flux de Travail Quotidien",
            "Vérifier les mises à jour de sécurité : pcu security",
            "Examiner les dépendances obsolètes : pcu check --limit 10",
            "Mettre à jour les versions de patch : pcu update --target patch",
            "Flux de Travail Hebdomadaire",
            "Vérification complète des dépendances : pcu check",
            "Mettre à jour les versions mineures : pcu update --target minor --interactive",
            "Examiner et mettre à jour les règles d'exclusion",
            "Générer des rapports de dépendances pour révision d'équipe",
            "Flux de Travail Mensuel",
            "Examiner les mises à jour de versions majeures : pcu check --target latest",
            "Mettre à jour les dépendances de développement : pcu update --dev",
            "Auditer les licences de dépendances et la conformité",
            "Examiner et optimiser la configuration PCU",
            "Nettoyer les dépendances inutilisées",
            "Avant les Releases",
            "Exécuter un audit complet des dépendances : pcu security --comprehensive",
            "Créer une sauvegarde : pcu update --create-backup",
            "Tester en environnement de staging",
            "Générer les notes de release avec les changements de dépendances"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "Intégration CI/CD",
          null,
          [
            "Intégrez PCU dans vos pipelines d'intégration continue et de déploiement. PCU peut s'intégrer parfaitement aux flux de travail CI/CD existants, prenant en charge GitHub Actions, GitLab CI, Jenkins, Azure DevOps et d'autres plateformes. "
          ]
        ],
        [
          "Intégration GitHub Actions",
          "integration-git-hub-actions",
          [
            "Flux de Travail de Vérification des Dépendances de Base"
          ]
        ],
        [
          "Intégration GitLab CI",
          "integration-git-lab-ci",
          [
            "Pipeline GitLab CI pour la gestion des dépendances PCU :"
          ]
        ],
        [
          "Intégration Pipeline Jenkins",
          "integration-pipeline-jenkins",
          [
            "Pipeline Jenkins de niveau entreprise pour la gestion des dépendances :"
          ]
        ],
        [
          "Pipeline Azure DevOps",
          "pipeline-azure-dev-ops",
          [
            "Pipeline Azure DevOps pour l'intégration PCU :"
          ]
        ],
        [
          "Meilleures Pratiques CI/CD Générales",
          "meilleures-pratiques-ci-cd-generales",
          [
            "Configuration des Variables d'Environnement",
            "Configurez ces variables d'environnement sur toutes les plateformes CI/CD pour optimiser le comportement de PCU :",
            "Considérations de Sécurité",
            "Gestion des Tokens d'Accès",
            "Assurez-vous de la gestion sécurisée des tokens d'accès dans les environnements CI/CD :",
            "Stratégie de Protection des Branches",
            "Configurez la protection des branches pour empêcher les pushes directs vers la branche principale :",
            "Exiger des révisions de pull request",
            "Exiger que les vérifications de statut passent",
            "Restreindre les pushes vers les branches protégées",
            "Exiger des commits signés",
            "Dépannage",
            "Problèmes CI/CD Courants",
            "Erreurs de Permissions",
            "Problèmes de Cache",
            "Timeouts Réseau",
            "Monitoring et Rapports",
            "Création de Tableaux de Bord",
            "Utilisez les fonctionnalités natives des plateformes CI/CD pour créer des tableaux de bord de gestion des dépendances :",
            "GitHub Actions : Utilisez les insights d'Actions et les graphiques de dépendances",
            "GitLab CI : Exploitez le Security Dashboard et le scan de dépendances",
            "Jenkins : Configurez le plugin HTML Publisher",
            "Azure DevOps : Utilisez les Dashboards et Analytics",
            "Configuration des Notifications",
            "Configurez des notifications appropriées pour tenir les équipes informées :"
          ]
        ],
        [
          "Intégration Docker",
          "integration-docker",
          [
            "Flux de Travail PCU Conteneurisé",
            "Ces exemples d'intégration CI/CD fournissent des solutions complètes de gestion automatisée des dépendances, garantissant que vos projets restent à jour et sécurisés."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "Référence des commandes",
          null,
          [
            "Référence complète pour toutes les commandes et options PCU. Apprenez chaque commande, drapeau et option de configuration disponible. "
          ]
        ],
        [
          "Aperçu des commandes",
          "apercu-des-commandes",
          [
            "PCU fournit plusieurs commandes principales avec des noms complets et des raccourcis pratiques :",
            "| Commande complète | Raccourcis et alias                       | Description                                                    |\n| ----------------- | ----------------------------------------- | -------------------------------------------------------------- |\n| pcu init        | pcu i                                   | Initialiser l'espace de travail PNPM et la configuration PCU   |\n| pcu check       | pcu chk, pcu -c, pcu --check        | Vérifier les dépendances de catalogue obsolètes                |\n| pcu update      | pcu u, pcu -u, pcu --update         | Mettre à jour les dépendances de catalogue                     |\n| pcu analyze     | pcu a, pcu -a, pcu --analyze        | Analyser l'impact des mises à jour de dépendances              |\n| pcu workspace   | pcu w, pcu -s, pcu --workspace-info | Afficher les informations et validation de l'espace de travail |\n| pcu theme       | pcu t, pcu -t, pcu --theme          | Configurer les thèmes couleur et paramètres d'interface        |\n| pcu security    | pcu sec                                 | Analyse et corrections des vulnérabilités de sécurité          |\n| pcu ai          | -                                         | Gestion des fournisseurs AI et tests d'analyse                 |\n| pcu rollback    | -                                         | Restaurer les mises à jour du catalogue à un état précédent    |\n| pcu help        | pcu h, pcu -h                         | Afficher l'aide                                                |",
            "Raccourcis spéciaux",
            "| Raccourci              | Commande équivalente       | Description                                                  |\n| ---------------------- | -------------------------- | ------------------------------------------------------------ |\n| pcu -i               | pcu update --interactive | Mode de mise à jour interactive                              |\n| pcu --security-audit | pcu security             | Exécuter l'analyse de sécurité                               |\n| pcu --security-fix   | pcu security --fix-vulns | Exécuter l'analyse de sécurité avec corrections automatiques |"
          ]
        ],
        [
          "Mode Hybride",
          "mode-hybride",
          [
            "PCU dispose du Mode Hybride - lorsque vous exécutez une commande sans drapeaux, elle entre automatiquement en mode interactif pour vous guider à travers les options.",
            "Commandes Supportées",
            "Le mode hybride est disponible pour les commandes suivantes :",
            "| Commande     | Options Interactives                                   |\n| ------------ | ------------------------------------------------------ |\n| check      | Format, cible, prerelease, motifs include/exclude      |\n| update     | Catalogue, format, cible, sauvegarde, dry-run          |\n| analyze    | Format                                                 |\n| workspace  | Validation, statistiques, format                       |\n| theme      | Sélection de thème, style de barre de progression      |\n| security   | Format, sévérité, correction automatique               |\n| init       | Modèle, options de framework, assistant interactif     |\n| ai         | Statut du fournisseur, test, opérations de cache       |\n| rollback   | Sélection de version, format                           |",
            "Avantages",
            "Flexibilité : Basculez facilement entre l'automatisation pour les scripts et le guidage interactif pour l'exploration",
            "Découvrabilité : Explorez les fonctionnalités disponibles via des invites interactives sans mémoriser toutes les options",
            "Efficacité : Les utilisateurs avancés utilisent les drapeaux directement tandis que les nouveaux utilisateurs bénéficient d'une expérience guidée"
          ]
        ],
        [
          "pcu init - Initialiser l'espace de travail",
          "pcu-init-initialiser-l-espace-de-travail",
          [
            "Initialiser un environnement d'espace de travail PNPM complet avec la configuration PCU.",
            "Options",
            "Écraser le fichier de configuration existant sans confirmation",
            "Générer une configuration complète avec toutes les options disponibles",
            "Lancer l'assistant de configuration interactif avec configuration guidée",
            "Modèle de configuration : minimal, standard, full, monorepo, enterprise",
            "Créer la structure d'espace de travail PNPM si manquante",
            "Ignorer la création de structure d'espace de travail PNPM",
            "Nom du répertoire pour les packages d'espace de travail",
            "Inclure les règles de packages communes dans la configuration",
            "Ajouter des règles et paramètres spécifiques à TypeScript",
            "Ajouter des règles pour l'écosystème React",
            "Ajouter des règles pour l'écosystème Vue",
            "Format de sortie : table, json, yaml, minimal",
            "Répertoire d'espace de travail (défaut : répertoire actuel)",
            "Afficher des informations détaillées et le progrès",
            "Modèles de configuration",
            "PCU fournit des modèles préconfigurés pour les types de projets courants :",
            "Types de modèles",
            "minimal - Configuration de base avec les paramètres essentiels uniquement",
            "standard - Configuration équilibrée adaptée à la plupart des projets",
            "full - Configuration complète avec toutes les options disponibles",
            "monorepo - Optimisé pour les grands monorepos avec fonctionnalités avancées",
            "enterprise - Prêt pour l'entreprise avec fonctionnalités de sécurité et gouvernance",
            "Assistant de configuration interactive",
            "Le mode interactif (--interactive) fournit une expérience de configuration guidée :",
            "Fonctionnalités de l'assistant",
            "Détection de projet : Détecte automatiquement le type de projet (React, Vue, TypeScript)",
            "Structure d'espace de travail : Découvre les packages existants et suggère une configuration optimale",
            "Configuration de règles de packages : Sélection interactive de règles de packages et stratégies de mise à jour",
            "Configuration de registre : Configuration pour registres NPM personnalisés et authentification",
            "Réglage des performances : Optimise les paramètres selon la taille et les exigences du projet",
            "Sélection de thème : Choix de thèmes couleur et styles de barres de progression",
            "Configuration de validation : Configure les portes de qualité et vérifications de sécurité",
            "Flux de l'assistant",
            "Analyse du projet : Analyse les fichiers existants pour comprendre la structure du projet",
            "Sélection de modèle : Recommande des modèles appropriés basés sur l'analyse",
            "Règles de packages : Configuration interactive de stratégies de mise à jour spécifiques aux packages",
            "Paramètres avancés : Configuration optionnelle de mise en cache, performances et paramètres d'interface",
            "Validation : Vérifications préalables et validation de configuration",
            "Création de fichiers : Crée tous les fichiers nécessaires avec confirmation",
            "Fichiers et répertoires créés",
            "Fichiers principaux",
            "Fichier de configuration principal avec tous les paramètres PCU",
            "package.json racine de l'espace de travail (créé si manquant)",
            "Configuration d'espace de travail PNPM (créée si manquante)",
            "Structure de répertoire",
            "Répertoire par défaut pour les packages d'espace de travail (personnalisable)",
            "Créé pour le modèle monorepo - packages d'applications",
            "Créé pour le modèle monorepo - outils de développement",
            "Créé pour le modèle enterprise - documentation",
            "Fichiers spécifiques aux modèles",
            "Spécification de version Node (modèle enterprise)",
            "Amélioré avec des motifs spécifiques à PCU (si manquant)",
            "Configuration TypeScript (avec le drapeau --typescript)",
            "Initialisation avancée",
            "Configuration spécifique au framework",
            "Structure d'espace de travail personnalisée",
            "Validation et vérifications de santé",
            "La commande init effectue une validation complète :",
            "Vérifications pré-initialisation",
            "Permissions de répertoire : Assure l'accès en écriture au répertoire de l'espace de travail",
            "Installation PNPM : Vérifie que PNPM est installé et accessible",
            "Configuration existante : Détecte et propose de fusionner les configurations existantes",
            "Dépôt Git : Vérifie si le répertoire est un dépôt git",
            "Validation post-initialisation",
            "Syntaxe de configuration : Valide les fichiers de configuration générés",
            "Structure d'espace de travail : Assure que l'espace de travail PNPM est correctement configuré",
            "Découverte de packages : Vérifie que PCU peut découvrir les packages d'espace de travail",
            "Analyse des dépendances : Vérification de santé de base des dépendances existantes",
            "Exemples d'utilisation",
            "Démarrage rapide",
            "Initialise avec le modèle standard en utilisant la détection automatique de projet.",
            "Configuration interactive",
            "Lance l'assistant de configuration complet avec configuration guidée.",
            "Initialisation de monorepo",
            "Crée un monorepo prêt pour l'entreprise avec support TypeScript et sortie détaillée.",
            "Configuration Enterprise personnalisée",
            "Configuration enterprise interactive qui écrase la configuration existante."
          ]
        ],
        [
          "pcu check - Vérifier les mises à jour",
          "pcu-check-verifier-les-mises-a-jour",
          [
            "Vérifier les dépendances obsolètes dans vos catalogues d'espace de travail pnpm.",
            "Options",
            "Vérifier uniquement le catalogue spécifique",
            "Format de sortie : table, json, yaml, minimal",
            "Cible de mise à jour : latest, greatest, minor, patch, newest",
            "Inclure les versions préliminaires",
            "Inclure les packages correspondant au motif",
            "Exclure les packages correspondant au motif",
            "Formats de sortie",
            "table : Format de tableau riche avec couleurs et détails",
            "minimal : Style simple npm-check-updates (package → version)",
            "json : Sortie JSON pour utilisation programmatique",
            "yaml : Sortie YAML pour fichiers de configuration"
          ]
        ],
        [
          "pcu update - Mettre à jour les dépendances",
          "pcu-update-mettre-a-jour-les-dependances",
          [
            "Mettre à jour les dépendances de catalogue vers des versions plus récentes.",
            "Options",
            "Mode interactif pour choisir les mises à jour",
            "Prévisualiser les modifications sans écrire de fichiers",
            "Cible de mise à jour : latest, greatest, minor, patch, newest",
            "Mettre à jour uniquement le catalogue spécifique",
            "Forcer les mises à jour même si risquées",
            "Créer des fichiers de sauvegarde avant la mise à jour",
            "Inclure les packages correspondant au motif (peut être utilisé plusieurs fois)",
            "Exclure les packages correspondant au motif (peut être utilisé plusieurs fois)",
            "Inclure les versions préliminaires dans les mises à jour",
            "Format de sortie : table, json, yaml, minimal",
            "Nombre de packages à traiter en parallèle",
            "Ignorer les packages avec conflits de dépendances pairs",
            "Exiger confirmation pour les mises à jour de version majeure",
            "Fonctionnalités interactives",
            "Le mode interactif (--interactive ou -i) fournit des capacités avancées de sélection de packages :",
            "Interface de sélection de packages",
            "Multi-sélection avec cases à cocher pour mises à jour individuelles de packages",
            "Fonctionnalité de recherche pour filtrer les packages par nom ou description",
            "Opérations par lots pour sélectionner/désélectionner plusieurs packages",
            "Sélection de stratégie de mise à jour pour chaque package (latest, greatest, minor, patch)",
            "Résolution intelligente de conflits",
            "Détection de dépendances pairs avec suggestions de résolution",
            "Avertissements de changements cassants basés sur l'analyse de versioning sémantique",
            "Analyse d'impact montrant les packages d'espace de travail affectés",
            "Capacités de rollback si les mises à jour causent des problèmes",
            "Suivi de progression",
            "Barres de progression en temps réel avec plusieurs styles visuels",
            "État de traitement par lots montrant les mises à jour terminées/en attente",
            "Récupération d'erreur avec options ignorer/réessayer pour les mises à jour échouées",
            "Confirmation de succès avec résumé de tous les changements effectués",
            "Stratégies de mise à jour avancées",
            "Exemples d'utilisation",
            "Mise à jour interactive sécurisée",
            "Met à jour les dépendances de manière interactive avec sauvegardes automatiques, limitant aux incréments de version mineure uniquement.",
            "Mise à jour sûre pour la production",
            "Montre ce qui serait mis à jour dans les dépendances de production, nécessitant confirmation pour les mises à jour majeures.",
            "Mises à jour spécifiques au framework",
            "Met à jour les packages de l'écosystème React incluant les définitions TypeScript, autorisant les versions préliminaires."
          ]
        ],
        [
          "pcu analyze - Analyse d'impact",
          "pcu-analyze-analyse-d-impact",
          [
            "Analyser l'impact de la mise à jour d'une dépendance spécifique pour comprendre les changements cassants potentiels et packages affectés.",
            "Arguments",
            "Nom du catalogue (ex : 'default', 'react17')",
            "Nom du package (ex : 'react', '@types/node')",
            "Nouvelle version (optionnelle, par défaut dernière version)",
            "Options",
            "Format de sortie : table, json, yaml, minimal",
            "Informations d'analyse",
            "La commande analyze fournit :",
            "Dépendances affectées par la mise à jour",
            "Changements cassants détectés entre versions",
            "Packages d'espace de travail qui utilisent cette dépendance",
            "Recommandations de mise à jour et évaluation de risque",
            "Analyse de compatibilité de version",
            "Exemples d'utilisation",
            "Analyser l'impact de la dernière version",
            "Analyse l'impact de mise à jour de React vers la dernière version dans le catalogue par défaut.",
            "Analyser une version spécifique",
            "Analyse l'impact de mise à jour de TypeScript vers la version 5.0.0.",
            "Sortie JSON pour automatisation",
            "Sorte les résultats d'analyse en JSON pour traitement programmatique."
          ]
        ],
        [
          "pcu workspace - Informations de l'espace de travail",
          "pcu-workspace-informations-de-l-espace-de-travail",
          [
            "Afficher les informations et validation de l'espace de travail avec analyse complète de l'espace de travail.",
            "Options",
            "Valider la configuration et structure de l'espace de travail",
            "Afficher les statistiques détaillées de l'espace de travail",
            "Format de sortie : table, json, yaml, minimal",
            "Informations de sortie",
            "Mode informations de base (par défaut)",
            "Nom et chemin de l'espace de travail",
            "Nombre total de packages",
            "Nombre de catalogues",
            "Liste des noms de catalogues",
            "Mode validation (--validate)",
            "Validation du fichier de configuration",
            "Validation de la structure de l'espace de travail",
            "Vérifications de cohérence package.json",
            "Vérification d'intégrité des catalogues",
            "Codes de sortie : 0 (valide), 1 (problèmes trouvés)",
            "Mode statistiques (--stats)",
            "Répartition détaillée des packages",
            "Analyse des dépendances",
            "Statistiques d'usage des catalogues",
            "Métriques de santé de l'espace de travail",
            "Exemples d'utilisation",
            "Informations de base de l'espace de travail",
            "Affiche le nom de l'espace de travail, chemin, nombre de packages et catalogues disponibles.",
            "Validation complète",
            "Valide la configuration et structure de l'espace de travail, sort avec code approprié.",
            "Statistiques détaillées",
            "Montre les statistiques détaillées de l'espace de travail en format JSON.",
            "Analyse combinée",
            "Effectue validation et affiche les statistiques ensemble."
          ]
        ],
        [
          "pcu security - Analyse des vulnérabilités de sécurité",
          "pcu-security-analyse-des-vulnerabilites-de-securite",
          [
            "Analyse complète des vulnérabilités de sécurité utilisant npm audit et intégration Snyk optionnelle, avec capacités de correction automatisée.",
            "Options",
            "Effectuer l'analyse npm audit (activée par défaut)",
            "Corriger automatiquement les vulnérabilités en utilisant npm audit fix",
            "Filtrer par niveau de sévérité : low, moderate, high, critical",
            "Inclure les dépendances de développement dans l'analyse de vulnérabilité",
            "Inclure l'analyse de sécurité Snyk (nécessite l'installation de snyk CLI)",
            "Appliquer automatiquement les corrections de sécurité sans confirmation",
            "Format de sortie : table, json, yaml, minimal",
            "Chemin du répertoire de l'espace de travail (par défaut répertoire actuel)",
            "Afficher les informations détaillées de vulnérabilité et étapes de remédiation",
            "Fonctionnalités du rapport de sécurité",
            "La commande security fournit une analyse complète des vulnérabilités :",
            "Intégration multi-scanners : Combine npm audit et Snyk pour une couverture complète",
            "Classification de sévérité : Catégorise les vulnérabilités comme critiques, élevées, modérées, faibles et info",
            "Remédiation automatisée : Applique les correctifs de sécurité automatiquement avec --fix-vulns",
            "Recommandations de packages : Suggère des mises à jour de version spécifiques pour résoudre les vulnérabilités",
            "Dépendances de développement : Inclusion/exclusion optionnelle des dépendances dev",
            "Informations CWE/CVE : Identifiants et descriptions détaillés des vulnérabilités",
            "Codes de sortie : Retourne des codes appropriés (0 pour propre, 1 pour vulnérabilités trouvées)",
            "Prêt pour CI/CD : Sortie JSON et mode non-interactif pour automatisation",
            "Exemples d'utilisation",
            "Analyse de vulnérabilité de base",
            "Effectue une analyse de sécurité standard utilisant npm audit, affichant les résultats dans un tableau formaté.",
            "Analyse avec corrections automatiques",
            "Analyse les vulnérabilités et applique automatiquement les corrections de sécurité disponibles.",
            "Filtre de sévérité élevée",
            "Montre uniquement les vulnérabilités de sévérité élevée et critiques, filtrant les problèmes de moindre priorité.",
            "Analyse complète avec Snyk",
            "Exécute à la fois npm audit et analyse Snyk, incluant les dépendances de développement avec informations détaillées de vulnérabilité.",
            "Intégration pipeline CI/CD",
            "Exporte les vulnérabilités de sécurité critiques en JSON pour traitement automatisé dans pipelines CI/CD.",
            "Correction automatique pour production",
            "Corrige automatiquement les vulnérabilités de sévérité modérée et supérieure dans les dépendances de production uniquement.",
            "Intégration de flux de travail de sécurité",
            "Vérification de sécurité pré-déploiement",
            "Maintenance de sécurité automatisée"
          ]
        ],
        [
          "pcu theme - Configuration de thème",
          "pcu-theme-configuration-de-theme",
          [
            "Configurer les thèmes couleur et apparence de l'interface.",
            "Options",
            "Définir le thème couleur : default, modern, minimal, neon",
            "Lister tous les thèmes disponibles avec échantillons d'aperçu",
            "Lancer l'assistant de configuration de thème interactif avec aperçu en direct",
            "Afficher l'aperçu du thème sans appliquer les modifications",
            "Définir le style de barre de progression : default, gradient, fancy, minimal, rainbow, neon",
            "Définir le préréglage spécifique à l'environnement : development, production, presentation",
            "Réinitialiser tous les paramètres de thème aux valeurs par défaut",
            "Thèmes disponibles",
            "Thèmes principaux",
            "default - Couleurs équilibrées optimisées pour usage général de terminal",
            "modern - Couleurs vives parfaites pour environnements de développement avec coloration syntaxique",
            "minimal - Design monochrome propre idéal pour environnements de production et CI/CD",
            "neon - Couleurs cyberpunk à contraste élevé conçues pour présentations et démos",
            "Styles de barres de progression",
            "default - Indication de progression standard",
            "gradient - Transitions de couleur douces",
            "fancy - Effets visuels riches avec animations",
            "minimal - Barres de progression propres et simples",
            "rainbow - Progression animée multi-couleurs",
            "neon - Barres de progression à effet lumineux",
            "Préréglages d'environnement",
            "development - Couleur complète, progression détaillée, sortie verbeuse",
            "production - Couleurs minimales, informations essentielles uniquement",
            "presentation - Contraste élevé, grandes polices, effets dramatiques",
            "Fonctionnalités de thème avancées",
            "Mappage de couleurs sémantiques",
            "Succès - Tons verts pour opérations terminées",
            "Avertissement - Jaune/ambre pour états de précaution",
            "Erreur - Tons rouges pour échecs et problèmes critiques",
            "Info - Tons bleus pour messages informatifs",
            "Progression - Couleurs dynamiques pour opérations en cours",
            "Surbrillance - Couleurs d'accent pour informations importantes",
            "Configuration de thème interactive",
            "Le mode interactif fournit :",
            "Aperçu en direct de thèmes avec sortie échantillon",
            "Sélection de couleur personnalisée avec support code hex",
            "Détection d'environnement avec paramètres optimaux automatiques",
            "Test de barres de progression pour voir différents styles en action",
            "Export/import de configurations de thèmes",
            "Thèmes par espace de travail pour stylisation spécifique au projet",
            "Exemples d'utilisation",
            "Lister les thèmes disponibles",
            "Montre tous les thèmes disponibles avec descriptions.",
            "Définir directement un thème",
            "Définit directement un thème spécifique.",
            "Configuration de thème interactive",
            "Lance un assistant de sélection de thème guidé qui permet de prévisualiser les thèmes et configurer les paramètres d'interface de manière interactive."
          ]
        ],
        [
          "pcu ai - Gestion des Fournisseurs AI",
          "pcu-ai-gestion-des-fournisseurs-ai",
          [
            "Vérifier le statut des fournisseurs AI et gérer le cache d'analyse AI.",
            "Options",
            "Afficher le statut de tous les fournisseurs AI (comportement par défaut)",
            "Tester l'analyse AI avec une requête exemple",
            "Afficher les statistiques du cache d'analyse AI",
            "Vider le cache d'analyse AI",
            "Détection des Fournisseurs",
            "La commande détecte automatiquement les fournisseurs AI disponibles :",
            "| Fournisseur | Priorité | Méthode de Détection |\n| ----------- | -------- | -------------------- |\n| Claude      | 100      | CLI claude         |\n| Gemini      | 80       | CLI gemini         |\n| Codex       | 60       | CLI codex          |",
            "Exemples d'utilisation"
          ]
        ],
        [
          "pcu rollback - Restauration de sauvegarde",
          "pcu-rollback-restauration-de-sauvegarde",
          [
            "Restaurer les mises à jour du catalogue à un état précédent en utilisant les fichiers de sauvegarde créés lors des mises à jour.",
            "Options",
            "Lister tous les fichiers de sauvegarde disponibles avec horodatages",
            "Restaurer automatiquement la sauvegarde la plus récente",
            "Sélection interactive de la sauvegarde à restaurer",
            "Supprimer tous les fichiers de sauvegarde (nécessite confirmation)",
            "Chemin du répertoire de l'espace de travail (par défaut : répertoire actuel)",
            "Afficher les informations détaillées pendant la restauration",
            "Système de sauvegarde",
            "PCU crée automatiquement des fichiers de sauvegarde lorsque vous utilisez le drapeau --create-backup avec la commande update :",
            "Les fichiers de sauvegarde sont stockés avec des horodatages et contiennent l'état original de pnpm-workspace.yaml avant les mises à jour.",
            "Exemples d'utilisation",
            "Lister les sauvegardes disponibles",
            "Affiche tous les fichiers de sauvegarde avec leurs horodatages de création et tailles de fichier.",
            "Restaurer la dernière sauvegarde",
            "Restaure automatiquement la sauvegarde la plus récente sans demander.",
            "Sélection interactive de sauvegarde",
            "Ouvre une invite interactive pour sélectionner quelle sauvegarde restaurer.",
            "Nettoyer les anciennes sauvegardes",
            "Supprime tous les fichiers de sauvegarde avec invite de confirmation et sortie détaillée."
          ]
        ],
        [
          "Fonctionnalités interactives et suivi de progression",
          "fonctionnalites-interactives-et-suivi-de-progression",
          [
            "PCU fournit des capacités interactives avancées et un suivi de progression sophistiqué pour toutes les commandes.",
            "Interface de commande interactive",
            "Système de sélection de packages",
            "Multi-sélection intelligente : Choisissez des packages spécifiques avec cases visuelles et raccourcis clavier",
            "Recherche et filtre : Filtrage de packages en temps réel avec correspondance de motifs et recherche floue",
            "Opérations par lots : Sélectionner/désélectionner des groupes entiers avec sélection basée sur catégories",
            "Aperçu d'impact : Voir les changements potentiels avant d'appliquer toute mise à jour",
            "Assistant de configuration",
            "L'assistant de configuration interactif (pcu init --interactive) fournit :",
            "Détection d'espace de travail : Découverte automatique des espaces de travail PNPM existants",
            "Sélection de modèle : Choisir entre modèles de configuration minimaux et complets",
            "Configuration de règles de packages : Configurer des règles pour différentes catégories de packages (React, Vue, TypeScript)",
            "Configuration de registre : Configurer des registres NPM personnalisés et authentification",
            "Paramètres de validation : Configurer des portes de qualité et vérifications de sécurité",
            "Navigateur de répertoires et fichiers",
            "Navigation d'espace de travail : Navigateur de système de fichiers intégré pour sélection d'espace de travail",
            "Validation de chemin : Validation en temps réel des chemins et structures d'espaces de travail",
            "Mode aperçu : Voir le contenu de l'espace de travail avant confirmation de sélection",
            "Suivi de progression avancé",
            "Barres de progression multi-styles",
            "PCU offre six styles différents de barres de progression, configurables par commande ou globalement :",
            "Fonctionnalités de progression",
            "Suivi multi-étapes : Montre la progression à travers différentes phases (scan → analyze → update)",
            "État d'opération parallèle : Barres de progression individuelles pour opérations simultanées",
            "Métriques de performance : Indicateurs de vitesse en temps réel, calculs ETA, temps écoulé",
            "Affichage sûr pour mémoire : Sortie multi-lignes stable qui réduit le scintillement du terminal",
            "État de traitement par lots",
            "Gestion de file d'attente : Montre les opérations de packages en attente, actives et terminées",
            "Résolution de conflits : Gestion interactive des conflits de dépendances pairs",
            "Récupération d'erreur : Options ignorer/réessayer pour opérations échouées avec contexte d'erreur détaillé",
            "Capacités de rollback : Annuler les modifications si des problèmes sont détectés durant les mises à jour",
            "Gestion d'erreurs et récupération",
            "Détection d'erreur intelligente",
            "Erreurs de validation : Vérifications préalables avec suggestions utiles pour erreurs communes",
            "Problèmes réseau : Réessai automatique avec backoff exponentiel pour échecs de registre",
            "Conflits de dépendances : Analyse détaillée de conflits avec recommandations de résolution",
            "Problèmes de permissions : Conseils clairs pour problèmes de permissions de système de fichiers",
            "Options de récupération interactive",
            "Ignorer et continuer : Ignorer les packages problématiques et continuer avec les mises à jour restantes",
            "Réessayer avec options : Réessayer les opérations échouées avec paramètres différents",
            "Rollback des modifications : Annuler les modifications partielles si des problèmes surviennent durant opérations par lots",
            "Exporter rapport d'erreur : Générer des rapports d'erreur détaillés pour dépannage",
            "Intégration d'espace de travail",
            "Fonctionnalités de découverte automatique",
            "Détection d'espace de travail PNPM : Trouve et valide automatiquement les configurations d'espace de travail",
            "Découverte de catalogue : Détecte les catalogues existants et leurs mappages de packages",
            "Analyse de packages : Analyse la structure de l'espace de travail et relations de dépendances",
            "Héritage de configuration : Applique automatiquement les paramètres spécifiques à l'espace de travail",
            "Validation et vérifications de santé",
            "Validation de structure : Assure que l'espace de travail suit les bonnes pratiques PNPM",
            "Cohérence des dépendances : Vérifie les incompatibilités de version entre packages",
            "Intégrité de configuration : Valide la configuration PCU contre la structure de l'espace de travail",
            "Métriques de santé : Fournit une évaluation complète de santé de l'espace de travail",
            "Exemples d'utilisation",
            "Mise à jour interactive avec fonctionnalités avancées",
            "Lance mise à jour interactive avec barres de progression fantaisie et traitement par lots optimisé.",
            "Configuration avec aperçu",
            "Exécute l'assistant de configuration avec mode aperçu et journalisation détaillée.",
            "Flux de travail de récupération d'erreur",
            "Met à jour avec récupération d'erreur interactive, sauvegardes automatiques et confirmation de version majeure."
          ]
        ],
        [
          "Options globales",
          "options-globales",
          [
            "Ces options fonctionnent avec toutes les commandes et peuvent être définies via variables d'environnement :",
            "Chemin du répertoire d'espace de travail",
            "Activer la journalisation verbeuse avec sortie détaillée",
            "Désactiver la sortie colorée pour environnements CI/CD",
            "Remplacer l'URL du registre NPM",
            "Délai d'expiration de requête en millisecondes (défaut : 30000)",
            "Chemin vers fichier de configuration personnalisé",
            "Afficher le numéro de version et vérifier les mises à jour",
            "Afficher l'aide pour la commande",
            "Utilisation de variables d'environnement",
            "Toutes les options globales et paramètres spécifiques aux commandes peuvent être configurés via variables d'environnement :",
            "Variables d'environnement principales",
            "Chemin du répertoire d'espace de travail par défaut",
            "Activer la journalisation verbeuse globalement",
            "Désactiver la sortie colorée (utile pour CI/CD)",
            "URL du registre NPM par défaut",
            "Délai d'expiration de requête en millisecondes",
            "Chemin vers fichier de configuration personnalisé",
            "Variables d'environnement spécifiques aux commandes",
            "Catalogue par défaut à utiliser pour opérations check/update",
            "Format de sortie par défaut : table, json, yaml, minimal",
            "Cible de mise à jour par défaut : latest, greatest, minor, patch, newest",
            "Inclure les versions préliminaires par défaut",
            "Motif d'inclusion de packages par défaut",
            "Motif d'exclusion de packages par défaut",
            "Activer le mode interactif par défaut",
            "Activer le mode dry-run par défaut",
            "Forcer les mises à jour sans confirmation",
            "Créer des fichiers de sauvegarde avant les mises à jour",
            "Variables d'environnement de thème et affichage",
            "Thème couleur par défaut : default, modern, minimal, neon",
            "Style de barre de progression : default, gradient, fancy, minimal, rainbow, neon",
            "Préréglage d'environnement : development, production, presentation",
            "Variables d'environnement de sécurité et cache",
            "Filtre de sévérité de sécurité par défaut : low, moderate, high, critical",
            "Corriger automatiquement les vulnérabilités",
            "Activer/désactiver le système de cache",
            "Durée de vie du cache en millisecondes",
            "Chemin du répertoire de cache personnalisé",
            "Variables d'environnement de configuration avancée",
            "Nombre de requêtes réseau parallèles",
            "Nombre de packages à traiter par lots",
            "Nombre de tentatives de réessai pour opérations échouées",
            "Vérifier les mises à jour PCU CLI au démarrage",
            "Exemples de variables d'environnement",
            "Priorité de configuration",
            "Les paramètres sont appliqués dans cet ordre (les derniers remplacent les premiers) :",
            "Valeurs par défaut intégrées",
            "Configuration globale (~/.pcurc.json)",
            "Configuration projet (.pcurc.json)",
            "Variables d'environnement (PCU_*)",
            "Drapeaux de ligne de commande (priorité la plus élevée)"
          ]
        ],
        [
          "Système de mise à jour automatique",
          "systeme-de-mise-a-jour-automatique",
          [
            "PCU inclut un mécanisme de mise à jour automatique sophistiqué qui maintient l'outil CLI à jour avec les dernières fonctionnalités et correctifs de sécurité.",
            "Vérification automatique de mise à jour",
            "Par défaut, PCU vérifie les mises à jour quand vous exécutez toute commande :",
            "Comportement de mise à jour",
            "Détection d'environnement CI/CD",
            "PCU détecte automatiquement les environnements CI/CD et ignore les vérifications de mise à jour pour éviter de perturber les pipelines automatisés :",
            "GitHub Actions : Détecté via variable d'environnement GITHUB_ACTIONS",
            "CircleCI : Détecté via variable d'environnement CIRCLECI",
            "Jenkins : Détecté via variable d'environnement JENKINS_URL",
            "GitLab CI : Détecté via variable d'environnement GITLAB_CI",
            "Azure DevOps : Détecté via variable d'environnement TF_BUILD",
            "CI générique : Détecté via variable d'environnement CI",
            "Installation de mise à jour",
            "PCU prend en charge plusieurs gestionnaires de packages avec fallback automatique :",
            "Options de configuration",
            "Variables d'environnement",
            "Désactiver complètement la vérification de version et notifications de mise à jour",
            "Heures entre vérifications de mise à jour (défaut : 24)",
            "Installer automatiquement les mises à jour sans demande (utiliser avec précaution)",
            "Délai d'expiration pour requêtes de vérification de mise à jour en millisecondes (défaut : 5000)",
            "Paramètres de fichier de configuration",
            "Notifications de mise à jour",
            "Notification standard",
            "Notification de mise à jour de sécurité",
            "Notification prerelease",
            "Commandes de mise à jour manuelle",
            "Dépannage des mises à jour",
            "Échecs de vérification de mise à jour",
            "Effacement de cache",
            "Problèmes de permissions"
          ]
        ],
        [
          "Système de gestion de cache",
          "systeme-de-gestion-de-cache",
          [
            "PCU inclut un système de cache complet pour optimiser les performances et réduire les requêtes réseau.",
            "Types de cache",
            "Cache de registre",
            "Stocke les métadonnées de packages NPM et informations de version :",
            "TTL par défaut : 1 heure (3 600 000ms)",
            "Taille max : 10MB par type de cache",
            "Entrées max : 500 packages",
            "Persistance disque : Activée",
            "Cache d'espace de travail",
            "Stocke la configuration d'espace de travail et résultats d'analyse package.json :",
            "TTL par défaut : 5 minutes (300 000ms)",
            "Taille max : 5MB",
            "Entrées max : 200 espaces de travail",
            "Persistance disque : Désactivée (mémoire uniquement)",
            "Configuration de cache",
            "Variables d'environnement",
            "Activer/désactiver le système de cache entier",
            "TTL de cache par défaut en millisecondes",
            "Taille totale maximale du cache en octets (50MB par défaut)",
            "Nombre maximum d'entrées de cache",
            "Chemin du répertoire de cache personnalisé",
            "Activer la persistance disque pour les caches",
            "Paramètres de fichier de configuration",
            "Commandes de gestion de cache",
            "Performance du cache",
            "Fonctionnalités d'optimisation",
            "Éviction LRU : Les éléments utilisés le moins récemment sont supprimés en premier",
            "Nettoyage automatique : Les entrées expirées sont supprimées toutes les 5 minutes",
            "Surveillance de taille : Éviction automatique quand les limites de taille sont dépassées",
            "Traitement parallèle : Les opérations de cache ne bloquent pas le thread principal",
            "Bénéfices de performance",
            "Requêtes de registre : 60-90% de réduction des appels au registre NPM",
            "Analyse d'espace de travail : 80-95% plus rapide sur exécutions répétées",
            "Dépendance réseau : Dépendance réduite à la connectivité réseau",
            "Temps de démarrage : 2-5x plus rapide au démarrage pour opérations subséquentes"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "Configuration",
          null,
          [
            "Configurez PCU pour correspondre à votre flux de travail et aux besoins de votre projet. Apprenez les fichiers de configuration, les règles spécifiques aux packages et les paramètres avancés. "
          ]
        ],
        [
          "Types de fichiers de configuration",
          "types-de-fichiers-de-configuration",
          [
            "PCU prend en charge plusieurs formats et emplacements de fichiers de configuration pour s'adapter aux différents flux de travail de développement.",
            "Fichiers de configuration pris en charge",
            "PCU recherche les fichiers de configuration dans l'ordre suivant (le premier trouvé l'emporte) :",
            "Fichier de configuration JSON principal dans la racine du projet",
            "Fichier de configuration JavaScript avec support de configuration dynamique",
            "Nom de fichier de configuration JavaScript alternatif",
            "Configuration utilisateur globale dans le répertoire home",
            "Configuration dans package.json sous la clé \"pcu\"",
            "Support de configuration JavaScript",
            "Les fichiers de configuration JavaScript permettent une configuration dynamique basée sur l'environnement, la structure de l'espace de travail ou d'autres conditions d'exécution :",
            "Configuration package.json",
            "Pour des projets plus simples, la configuration peut être intégrée dans package.json :",
            "Validation de configuration",
            "PCU valide automatiquement les fichiers de configuration et fournit des messages d'erreur détaillés pour les problèmes courants :",
            "Fonctionnalités de validation",
            "Validation de schéma JSON : Assure que toutes les propriétés de configuration sont valides",
            "Validation de motifs : Valide les motifs glob et les formats de noms de packages",
            "Vérification de type : Vérifie les types de données corrects pour toutes les valeurs de configuration",
            "Détection de conflits : Identifie les règles conflictuelles et les options de configuration",
            "Système de suggestions : Fournit des suggestions utiles pour corriger les erreurs de configuration",
            "Exemples de validation"
          ]
        ],
        [
          "Référence complète du fichier de configuration .pcurc.json",
          "reference-complete-du-fichier-de-configuration-pcurc-json",
          [
            "PCU utilise principalement le fichier .pcurc.json dans la racine du projet pour la configuration. Il peut être créé manuellement ou généré avec la configuration par défaut en utilisant pcu init.",
            "Structure complète du fichier de configuration",
            "Description détaillée des options de configuration",
            "defaults - Paramètres par défaut",
            "Cible de mise à jour par défaut : latest | greatest | minor | patch | newest",
            "Délai d'expiration des requêtes réseau (millisecondes)",
            "Créer des fichiers de sauvegarde avant la mise à jour",
            "Activer le mode interactif par défaut",
            "Activer le mode aperçu par défaut (pas de mise à jour réelle)",
            "Forcer les mises à jour (ignorer les avertissements)",
            "Inclure les versions préliminaires",
            "workspace - Paramètres de l'espace de travail",
            "Découvrir automatiquement la structure de l'espace de travail",
            "Mode de catalogue : strict | loose | mixed",
            "Chemin du répertoire racine de l'espace de travail",
            "Tableau de motifs de correspondance des répertoires de packages (remplace pnpm-workspace.yaml)",
            "output - Paramètres de sortie",
            "Format de sortie : table | json | yaml | minimal",
            "Activer la sortie colorée",
            "Activer le mode de sortie détaillée",
            "ui - Paramètres de l'interface utilisateur",
            "Thème de couleur : default | modern | minimal | neon",
            "Afficher les barres de progression",
            "Style de barre de progression : default | gradient | fancy | minimal | rainbow |\nneon",
            "Activer les effets d'animation",
            "Schéma de couleurs : auto | light | dark",
            "update - Paramètres de comportement de mise à jour",
            "Activer le mode interactif par défaut lors de la mise à jour",
            "Exécuter d'abord un aperçu, puis demander si appliquer",
            "Ignorer les versions préliminaires",
            "Les mises à jour de version majeure nécessitent une confirmation",
            "Nombre de packages traités par lot",
            "security - Paramètres de sécurité",
            "Corriger automatiquement les vulnérabilités de sécurité",
            "Autoriser les mises à jour de version majeure pour les corrections de sécurité",
            "Notifier lors des mises à jour de sécurité",
            "Seuil de niveau d'alerte de sécurité : low | moderate | high | critical",
            "advanced - Paramètres avancés",
            "Nombre de requêtes réseau simultanées",
            "Délai d'expiration des requêtes réseau (millisecondes)",
            "Nombre de tentatives en cas d'échec",
            "Période de validité du cache (minutes, 0 pour désactiver le cache)",
            "Vérifier les mises à jour de l'outil PCU au démarrage",
            "Nombre maximum de packages traités par lot",
            "cache - Paramètres de cache",
            "Activer le système de cache",
            "Durée de vie du cache (millisecondes)",
            "Taille maximale du cache (octets, 50MB par défaut)",
            "Nombre maximum d'entrées de cache",
            "Persister le cache sur le disque",
            "Chemin du répertoire de cache",
            "registry - Paramètres de registre",
            "URL du registre NPM par défaut",
            "Délai d'expiration des requêtes de registre (millisecondes)",
            "Nombre de tentatives de requête de registre",
            "Paramètres de filtrage de packages",
            "Tableau de motifs de correspondance de noms de packages à inclure",
            "Tableau de motifs de correspondance de noms de packages à exclure",
            "notification - Paramètres de notification",
            "Activer la fonction de notification",
            "Notifier lorsque des mises à jour sont disponibles",
            "Notifier lors d'alertes de sécurité",
            "logging - Paramètres de journalisation",
            "Niveau de journalisation : error | warn | info | debug | trace",
            "Chemin du fichier de journal (optionnel)",
            "Nombre maximum de fichiers de journal",
            "Taille maximale d'un seul fichier de journal"
          ]
        ],
        [
          "Filtrage de packages",
          "filtrage-de-packages",
          [
            "Contrôlez quels packages mettre à jour avec des motifs d'inclusion/exclusion et des règles spécifiques aux packages.",
            "Propriétés des règles de packages",
            "Motifs glob pour faire correspondre les noms de packages",
            "Cible de mise à jour : latest, greatest, minor, patch, newest",
            "Toujours demander avant de mettre à jour ces packages",
            "Mettre à jour automatiquement sans confirmation",
            "Packages qui suivent la même stratégie de mise à jour",
            "Mettre à jour les packages liés ensemble"
          ]
        ],
        [
          "Configuration de sécurité",
          "configuration-de-securite",
          [
            "Configurez l'analyse des vulnérabilités de sécurité et les corrections automatiques.",
            "Vérifier et corriger automatiquement les vulnérabilités de sécurité",
            "Autoriser les mises à jour de version majeure pour les corrections de sécurité",
            "Afficher les notifications lors des mises à jour de sécurité"
          ]
        ],
        [
          "Configuration Monorepo",
          "configuration-monorepo",
          [
            "Paramètres spéciaux pour les configurations monorepo complexes avec plusieurs catalogues.",
            "Packages qui nécessitent une synchronisation de version entre plusieurs catalogues",
            "Ordre de priorité des catalogues pour la résolution de conflits"
          ]
        ],
        [
          "Paramètres avancés",
          "parametres-avances",
          [
            "Affinez les performances et le comportement avec des options de configuration avancées.",
            "Nombre de requêtes réseau simultanées",
            "Délai d'expiration des requêtes réseau en millisecondes",
            "Nombre de tentatives en cas d'échec",
            "Période de validité du cache (0 pour désactiver le cache)",
            "Vérifier automatiquement les mises à jour de l'outil PCU au démarrage. Ignoré dans les\nenvironnements CI. Affiche les notifications de mise à jour et les instructions d'installation\nlorsque de nouvelles versions sont disponibles."
          ]
        ],
        [
          "Configuration de l'interface utilisateur",
          "configuration-de-l-interface-utilisateur",
          [
            "Personnalisez l'apparence visuelle et les paramètres de l'interface utilisateur.",
            "Thèmes disponibles",
            "default - Couleurs équilibrées pour usage général",
            "modern - Couleurs vives pour les environnements de développement",
            "minimal - Propre et simple pour les environnements de production",
            "neon - Couleurs à contraste élevé pour les présentations",
            "Styles de barres de progression",
            "PCU prend en charge 6 styles différents de barres de progression pour un retour visuel amélioré pendant les opérations :",
            "default - Barre de progression standard avec style de base",
            "gradient - Barre de progression colorée en dégradé pour une apparence moderne",
            "fancy - Barre de progression améliorée avec des éléments décoratifs",
            "minimal - Indicateur de progression propre et simple",
            "rainbow - Barre de progression multicolore pour des affichages vibrants",
            "neon - Barre de progression à contraste élevé correspondant au thème neon",
            "Exemple de configuration :",
            "Utilisation en ligne de commande :"
          ]
        ],
        [
          "Priorité de configuration",
          "priorite-de-configuration",
          [
            "Les paramètres de configuration sont appliqués dans cet ordre de priorité :",
            "Drapeaux de ligne de commande (priorité la plus élevée)",
            "Règles spécifiques aux packages dans .pcurc.json",
            "Paramètres généraux dans .pcurc.json",
            "Valeurs par défaut (priorité la plus faible)",
            "Les packages liés héritent automatiquement des paramètres de leurs règles de package parent,\nassurant la cohérence des versions entre les packages d'écosystème."
          ]
        ],
        [
          "Exemples",
          "exemples",
          [
            "Écosystème React",
            "Projet TypeScript",
            "Configuration d'entreprise"
          ]
        ],
        [
          "Variables d'environnement",
          "variables-d-environnement",
          [
            "Toutes les options CLI peuvent être configurées via des variables d'environnement pour l'automatisation et les environnements CI/CD :",
            "Priorité des variables d'environnement",
            "Les sources de configuration sont chargées dans cet ordre (les dernières remplacent les premières) :",
            "Valeurs par défaut intégrées (priorité la plus faible)",
            "Configuration globale (~/.pcurc.json)",
            "Configuration du projet (.pcurc.json)",
            "Variables d'environnement (PCU_*)",
            "Drapeaux de ligne de commande (priorité la plus élevée)"
          ]
        ],
        [
          "Configuration du registre",
          "configuration-du-registre",
          [
            "PCU lit automatiquement les fichiers de configuration NPM et PNPM pour les paramètres de registre :",
            "Priorité du registre",
            "Drapeau CLI --registry (priorité la plus élevée)",
            "Configuration PCU (section registre de .pcurc.json)",
            "Projet .npmrc/.pnpmrc",
            "Global .npmrc/.pnpmrc",
            "Registre NPM par défaut (priorité la plus faible)"
          ]
        ],
        [
          "Configuration de cache améliorée",
          "configuration-de-cache-amelioree",
          [
            "PCU inclut un système de cache avancé pour améliorer les performances :",
            "Paramètres de cache",
            "Activer/désactiver le système de cache",
            "Durée de vie en millisecondes (1 heure par défaut)",
            "Taille maximale du cache en octets (50MB par défaut)",
            "Nombre maximum d'entrées de cache",
            "Sauvegarder le cache sur le disque entre les exécutions",
            "Répertoire pour le stockage de cache persistant",
            "Stratégie d'éviction du cache : lru, fifo, lfu"
          ]
        ],
        [
          "Configuration de validation",
          "configuration-de-validation",
          [
            "PCU inclut une validation complète avec des suggestions utiles :",
            "Options de validation",
            "Activer le mode de validation stricte avec des vérifications supplémentaires",
            "Afficher des avertissements pour les mises à jour potentiellement risquées",
            "Types de mise à jour nécessitant une confirmation : major, minor, patch",
            "Activer les suggestions et conseils utiles",
            "Inclure des suggestions d'optimisation des performances",
            "Inclure des recommandations de bonnes pratiques"
          ]
        ],
        [
          "Configuration du mode interactif",
          "configuration-du-mode-interactif",
          [
            "Configurez les invites interactives et l'expérience utilisateur :",
            "Paramètres interactifs",
            "Activer les capacités du mode interactif",
            "Nombre d'éléments affichés par page dans les listes",
            "Afficher les descriptions des packages dans les listes de sélection",
            "Afficher les notes de version pour les mises à jour (nécessite le réseau)",
            "Activer l'auto-complétion pour les noms de packages",
            "Activer la correspondance floue pour l'auto-complétion",
            "Exiger une confirmation pour les mises à jour de version majeure"
          ]
        ],
        [
          "Configuration Monorepo",
          "configuration-monorepo-2",
          [
            "PCU fournit des fonctionnalités avancées spécialement conçues pour les grands monorepos et la gestion complexe d'espaces de travail.",
            "Synchronisation des versions",
            "Gardez les packages liés synchronisés dans votre monorepo :",
            "Gestion avancée de l'espace de travail",
            "Système de priorité des catalogues",
            "Définissez quels catalogues ont la priorité en cas de conflits :",
            "Dépendances inter-espaces de travail",
            "Analysez et gérez les dépendances entre les packages de l'espace de travail :",
            "Analyser les dépendances inter-espaces de travail",
            "Comment gérer les incompatibilités de version : error, warn, off",
            "Signaler les packages dans les catalogues non utilisés par aucun package d'espace de travail",
            "Valider que tous les packages d'espace de travail utilisent les versions de catalogue",
            "Règles de packages spécifiques aux monorepos",
            "Créez des règles sophistiquées pour différentes zones de votre monorepo :",
            "Configuration spécifique à l'espace de travail",
            "Configuration différente pour différentes parties de votre monorepo :",
            "Optimisation des performances pour les grands monorepos",
            "Configuration du traitement par lots",
            "Nombre de packages à traiter dans chaque lot",
            "Nombre maximum d'opérations simultanées",
            "Mettre en cache la découverte des packages d'espace de travail entre les exécutions",
            "Traiter plusieurs catalogues en parallèle",
            "Gestion de la mémoire",
            "Validation Monorepo",
            "Validation complète pour les configurations d'espace de travail complexes :",
            "Règles de validation",
            "Assurer que le protocole workspace: est utilisé pour les dépendances internes",
            "Assurer que toutes les dépendances sont couvertes par les catalogues",
            "Exiger que tous les packages d'espace de travail utilisent la même version des dépendances\npartagées",
            "Détecter les dépendances circulaires entre les packages d'espace de travail",
            "Exemples d'utilisation pour les Monorepos",
            "Configuration de monorepo d'entreprise importante",
            "Configuration optimisée pour CI/CD"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "Développement",
          null,
          [
            "Configurez PCU pour le développement et apprenez comment contribuer au projet. Ce guide couvre la configuration du projet, l'architecture et les flux de travail de développement. "
          ]
        ],
        [
          "Prérequis",
          "prerequis",
          [
            "Avant de commencer à développer PCU, assurez-vous d'avoir les outils requis :",
            "Node.js >= 22.0.0 et pnpm >= 10.0.0 sont requis pour le développement."
          ]
        ],
        [
          "Configuration du Projet",
          "configuration-du-projet",
          [
            "Cloner et configurer l'environnement de développement :"
          ]
        ],
        [
          "Architecture du Projet",
          "architecture-du-projet",
          [
            "PCU suit les principes d'architecture propre avec une séparation claire des préoccupations :",
            "Couches d'Architecture",
            "Interface utilisateur, analyse de commandes, formatage de sortie",
            "Orchestration de la logique métier, cas d'usage",
            "Entités métier principales, objets de valeur, interfaces de dépôt",
            "Clients API externes, accès au système de fichiers, implémentations de dépôt",
            "Utilitaires partagés, configuration, journalisation, gestion d'erreurs"
          ]
        ],
        [
          "Flux de Travail de Développement",
          "flux-de-travail-de-developpement",
          [
            "Effectuer des Modifications",
            "Créer une branche de fonctionnalité :",
            "Effectuer vos modifications en suivant les standards de codage",
            "Ajouter des tests pour vos modifications :",
            "S'assurer que les vérifications qualité passent :",
            "Commiter vos modifications :",
            "Stratégie de Test",
            "PCU utilise une approche de test complète :",
            "Qualité du Code",
            "PCU maintient des standards de qualité de code élevés :"
          ]
        ],
        [
          "Ajouter des Fonctionnalités",
          "ajouter-des-fonctionnalites",
          [
            "Créer de Nouvelles Commandes",
            "Créer un gestionnaire de commande dans apps/cli/src/cli/commands/ :",
            "Ajouter la logique métier dans packages/core/src/application/services/",
            "Créer des tests pour la CLI et la logique principale",
            "Mettre à jour la documentation",
            "Ajouter de Nouveaux Formats de Sortie",
            "Créer un formateur dans apps/cli/src/cli/formatters/ :",
            "Enregistrer le formateur dans le registre principal des formateurs",
            "Ajouter des tests et mettre à jour la documentation"
          ]
        ],
        [
          "Directives de Contribution",
          "directives-de-contribution",
          [
            "Convention de Message de Commit",
            "PCU utilise Conventional Commits :",
            "Processus de Pull Request",
            "Forker le dépôt et créer une branche de fonctionnalité",
            "Effectuer vos modifications en suivant le flux de travail de développement",
            "S'assurer que tous les tests passent et que les vérifications qualité réussissent",
            "Mettre à jour la documentation si nécessaire",
            "Soumettre une pull request avec :",
            "Description claire des modifications",
            "Lien vers les issues liées",
            "Captures d'écran pour les modifications UI",
            "Notes sur les changements cassants si applicable",
            "Liste de Vérification de Révision de Code",
            "Tous les tests passent",
            "Couverture de code maintenue (>85%)",
            "Types TypeScript corrects",
            "Style de code conforme aux standards du projet",
            "Documentation mise à jour",
            "Changements cassants documentés",
            "Impact sur les performances considéré"
          ]
        ],
        [
          "Débogage",
          "debogage",
          [
            "Débogage de Développement",
            "Débogage de Test"
          ]
        ],
        [
          "Construction et Publication",
          "construction-et-publication",
          [
            "Test Local",
            "Processus de Release",
            "Préparer les notes de release dans apps/cli/CHANGELOG.md sous ## Unreleased.",
            "Construire et tester :",
            "Exécuter le workflow GitHub Actions Release (mainteneurs uniquement) :",
            "patch, minor, major : incrémentent la version du CLI, commitent les changements de release, créent le tag, publient pcu et pnpm-catalog-updates, puis créent la GitHub Release dans la même exécution",
            "current : publie la version déjà commitée dans le dépôt",
            "dry_run: true : valide le flux sans publier"
          ]
        ],
        [
          "Obtenir de l'Aide",
          "obtenir-de-l-aide",
          [
            "📖 Documentation : Consultez cette documentation pour des guides détaillés",
            "🐛 Issues : Signaler des bugs via GitHub Issues",
            "💬 Discussions : Poser des questions dans GitHub Discussions",
            "🔧 Développement : Rejoindre les discussions de développement dans les issues et PRs"
          ]
        ],
        [
          "Détails d'Architecture Avancés",
          "details-d-architecture-avances",
          [
            "Modèle de Domaine Principal",
            "Basé sur les principes de Domain-Driven Design (DDD), le domaine principal de PCU inclut :",
            "Architecture de Couche de Service",
            "La couche application orchestre la logique métier à travers les services :",
            "Conception de Couche CLI",
            "La couche CLI fournit une interface propre au domaine principal :",
            "Architecture de Test",
            "Stratégie de test complète à travers toutes les couches :",
            "Considérations de Performance",
            "PCU est optimisé pour les performances dans les grands monorepos :"
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "Exemples",
          null,
          [
            "Exemples concrets et cas d'usage pour vous aider à tirer le meilleur parti de PCU. Des mises à jour simples à la gestion complexe de monorepo. "
          ]
        ],
        [
          "Flux de travail de base",
          "flux-de-travail-de-base",
          [
            "Vérification quotidienne des dépendances",
            "Vérifiez les mises à jour dans le cadre de votre routine quotidienne de développement :",
            "Mises à jour sécurisées avec sauvegarde",
            "Mettez à jour les dépendances en toute sécurité avec des sauvegardes automatiques :",
            "Mises à jour ciblées spécifiques",
            "Mettre à jour uniquement des types spécifiques de changements :"
          ]
        ],
        [
          "Espaces de travail multi-catalogues",
          "espaces-de-travail-multi-catalogues",
          [
            "Scénario de support hérité",
            "Gestion de plusieurs versions React dans un espace de travail :",
            "Utilisation de package"
          ]
        ],
        [
          "Exemples de configuration",
          "exemples-de-configuration",
          [
            "Gestion de l'écosystème React",
            "Mises à jour coordonnées pour React et les packages liés :",
            "Configuration de projet TypeScript",
            "Mises à jour conservatrices de TypeScript avec définitions de types automatiques :",
            "Configuration d'entreprise",
            "Configuration prête pour l'entreprise avec contrôles stricts :"
          ]
        ],
        [
          "Intégration CI/CD",
          "integration-ci-cd",
          [
            "GitHub Actions",
            "Automatisez la vérification des dépendances dans votre pipeline CI :"
          ]
        ],
        [
          "Gestion d'erreurs et dépannage",
          "gestion-d-erreurs-et-depannage",
          [
            "Problèmes réseau",
            "Gérer les problèmes réseau et l'accès aux registres :",
            "Validation de l'espace de travail",
            "Validez la configuration de votre espace de travail :",
            "Registres privés",
            "PCU lit automatiquement les configurations .npmrc et .pnpmrc :"
          ]
        ],
        [
          "Cas d'usage avancés",
          "cas-d-usage-avances",
          [
            "Analyse d'impact",
            "Analyser l'impact de la mise à jour de packages spécifiques :",
            "Mises à jour sélectives",
            "Mettre à jour uniquement des packages ou motifs spécifiques :",
            "Analyse d'exécution à sec",
            "Prévisualiser les modifications avant de les appliquer :"
          ]
        ],
        [
          "Bonnes pratiques",
          "bonnes-pratiques",
          [
            "Flux de travail quotidien",
            "Vérification matinale : pcu -c pour voir les mises à jour disponibles",
            "Examiner l'impact : Utiliser pcu -a pour les mises à jour importantes",
            "Mise à jour sécurisée : pcu -i -b pour les mises à jour interactives avec sauvegarde",
            "Tester : Exécuter votre suite de tests après les mises à jour",
            "Commit : Committer les mises à jour de dépendances séparément",
            "Flux de travail d'équipe",
            "Configuration partagée : Committer .pcurc.json dans le contrôle de version",
            "Révisions régulières : Planifier des réunions hebdomadaires de révision des dépendances",
            "Priorité sécurité : Toujours prioriser les mises à jour de sécurité",
            "Documentation : Documenter les décisions majeures de dépendances",
            "Plan de rollback : Conserver des sauvegardes pour un rollback facile",
            "Flux de travail de release",
            "Vérification pré-release : pcu -c --target patch avant les releases",
            "Scan de sécurité : Activer autoFixVulnerabilities en CI",
            "Épinglage de version : Utiliser des versions exactes pour les releases de production",
            "Calendrier de mise à jour : Planifier les mises à jour de dépendances entre les releases"
          ]
        ],
        [
          "Surveillance de sécurité",
          "surveillance-de-securite",
          [
            "Scan de sécurité continu",
            "Intégrez le scan de sécurité dans votre flux de travail de développement :",
            "CI/CD axé sur la sécurité"
          ]
        ],
        [
          "Personnalisation de thème",
          "personnalisation-de-theme",
          [
            "Configuration interactive de thème",
            "Configurez l'apparence de PCU pour votre équipe :",
            "Configuration de thème d'équipe"
          ]
        ],
        [
          "Optimisation des performances",
          "optimisation-des-performances",
          [
            "Configuration de grand monorepo",
            "Optimisez PCU pour de grands espaces de travail avec des centaines de packages :",
            "Traitement sélectif"
          ]
        ],
        [
          "Exemples de migration",
          "exemples-de-migration",
          [
            "Depuis npm-check-updates",
            "Migration de ncu vers PCU :",
            "Conversion vers les catalogues pnpm",
            "Transformer un espace de travail existant pour utiliser les catalogues pnpm :"
          ]
        ],
        [
          "Guides de migration",
          "guides-de-migration",
          [
            "Migration depuis npm-check-updates",
            "Transition en douceur de npm-check-updates vers PCU pour la gestion des catalogues pnpm :",
            "Étapes de migration",
            "Installer PCU aux côtés de ncu temporairement pour comparaison",
            "Initialiser la configuration PCU :",
            "Comparer les sorties pour s'assurer d'une fonctionnalité équivalente :",
            "Migrer les règles de package de la configuration ncu",
            "Supprimer ncu une fois à l'aise avec PCU",
            "Migration depuis Dependabot",
            "Remplacer Dependabot par PCU pour un contrôle plus granulaire :",
            "Migration depuis Renovate",
            "Transition de Renovate vers PCU avec configuration avancée :",
            "Différences clés",
            "| Fonctionnalité    | Renovate               | PCU                                 |\n| ----------------- | ---------------------- | ----------------------------------- |\n| Portée        | Packages individuels   | Mises à jour au niveau catalogue    |\n| Configuration | renovate.json          | .pcurc.json                         |\n| UI            | Tableau de bord web    | Terminal + intégration CI           |\n| Monorepo      | Configuration complexe | Support d'espace de travail intégré |",
            "Configuration de migration"
          ]
        ],
        [
          "Intégration de flux de travail CI/CD",
          "integration-de-flux-de-travail-ci-cd",
          [
            "Intégration GitHub Actions",
            "Configuration GitHub Actions complète pour la gestion automatisée des dépendances :",
            "Intégration GitLab CI",
            "Pipeline GitLab CI pour la gestion des dépendances PCU :",
            "Intégration de pipeline Jenkins",
            "Pipeline Jenkins pour la gestion des dépendances d'entreprise :",
            "Pipeline Azure DevOps",
            "Pipeline Azure DevOps pour l'intégration PCU :",
            "Intégration Docker",
            "PCU conteneurisé pour des environnements CI/CD cohérents :"
          ]
        ],
        [
          "Flux de travail d'entreprise",
          "flux-de-travail-d-entreprise",
          [
            "Gestion multi-environnements",
            "Gérer les dépendances à travers les environnements de développement, staging et production :",
            "Flux de travail d'approbation",
            "Implémenter des flux de travail d'approbation pour les mises à jour critiques :"
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "Questions Fréquentes",
          null,
          [
            "Réponses rapides aux questions courantes sur PCU. Vous ne trouvez pas ce que vous cherchez ? Consultez notre guide de dépannage ou ouvrez un ticket. "
          ]
        ],
        [
          "Installation et Configuration",
          "installation-et-configuration",
          [
            "Comment installer PCU ?",
            "PCU peut être installé globalement via npm, pnpm ou yarn :",
            "Quelles sont les exigences système ?",
            "Node.js: >= 18.0.0 (version LTS recommandée)",
            "pnpm: >= 8.0.0",
            "Système d'exploitation: Windows, macOS, Linux",
            "Ai-je besoin d'un espace de travail pnpm pour utiliser PCU ?",
            "Oui, PCU est spécifiquement conçu pour les espaces de travail pnpm avec des dépendances de catalogue. Si vous n'avez pas encore d'espace de travail, exécutez pcu init pour en créer un.",
            "Puis-je utiliser PCU avec des projets npm ou yarn ?",
            "Non, PCU est exclusivement pour les espaces de travail pnpm utilisant les dépendances de catalogue. Pour d'autres gestionnaires de packages, considérez des outils comme npm-check-updates ou yarn upgrade-interactive."
          ]
        ],
        [
          "Configuration",
          "configuration",
          [
            "Où dois-je placer mon fichier de configuration .pcurc.json ?",
            "Placez-le dans le répertoire racine de votre espace de travail (même niveau que pnpm-workspace.yaml). PCU prend également en charge :",
            "Configuration globale : ~/.pcurc.json",
            "Configuration de projet : ./.pcurc.json (priorité la plus élevée)",
            "Quelle est la différence entre la configuration au niveau de l'espace de travail et globale ?",
            "Globale (~/.pcurc.json) : Appliquée à toutes les opérations PCU dans différents projets",
            "Projet (./.pcurc.json) : Spécifique à l'espace de travail actuel, remplace les paramètres globaux",
            "Puis-je configurer différentes stratégies de mise à jour pour différents packages ?",
            "Oui ! Utilisez les règles de packages dans votre configuration :"
          ]
        ],
        [
          "Commandes et Utilisation",
          "commandes-et-utilisation",
          [
            "Quelle est la différence entre pcu check et pcu -c ?",
            "Elles sont identiques ! PCU prend en charge les noms de commandes complets et les alias courts :",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "Comment mettre à jour seulement des types spécifiques de packages ?",
            "Utilisez les drapeaux --include et --exclude :",
            "Quelle est la différence entre les cibles de mise à jour ?",
            "patch : Corrections de bugs uniquement (1.0.0 → 1.0.1)",
            "minor : Nouvelles fonctionnalités, rétrocompatibles (1.0.0 → 1.1.0)",
            "latest : Dernière version stable incluant les changements majeurs (1.0.0 → 2.0.0)",
            "greatest : Dernière version incluant les pré-versions (1.0.0 → 2.0.0-beta.1)",
            "Comment vérifier ce qui sera mis à jour avant de faire la mise à jour ?",
            "Utilisez le drapeau --dry-run :",
            "Cela vous montre exactement ce qui serait mis à jour sans apporter de modifications."
          ]
        ],
        [
          "Dépannage",
          "depannage",
          [
            "Pourquoi PCU dit \"Aucun espace de travail pnpm trouvé\" ?",
            "Cela signifie que PCU ne peut pas trouver un fichier pnpm-workspace.yaml dans votre répertoire actuel. Solutions :",
            "Créer un espace de travail : Exécutez pcu init",
            "Naviguer vers la racine de l'espace de travail : cd vers le répertoire contenant pnpm-workspace.yaml",
            "Spécifier le chemin de l'espace de travail : pcu -c --workspace /path/to/workspace",
            "Pourquoi PCU dit \"Aucune dépendance de catalogue trouvée\" ?",
            "Votre espace de travail n'utilise pas encore les dépendances de catalogue. Vous avez besoin de :",
            "Catalogue dans le fichier d'espace de travail :",
            "Utiliser les catalogues dans les packages :",
            "PCU fonctionne très lentement. Comment puis-je améliorer les performances ?",
            "Essayez ces optimisations :",
            "Réduire la concurrence : pcu check --concurrency 2",
            "Augmenter le timeout : pcu check --timeout 60000",
            "Activer le cache : Assurez-vous que PCU_CACHE_ENABLED=true (par défaut)",
            "Utiliser le filtrage : pcu check --include \"react*\" pour des packages spécifiques",
            "Comment corriger les erreurs \"ENOTFOUND registry.npmjs.org\" ?",
            "C'est un problème de connectivité réseau :",
            "Vérifier la connexion internet : ping registry.npmjs.org",
            "Configurer le proxy : Définir les variables d'environnement HTTP_PROXY et HTTPS_PROXY",
            "Utiliser un registre d'entreprise : Configurer .npmrc avec le registre de votre entreprise",
            "Augmenter le timeout : PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "Sécurité",
          "securite",
          [
            "Comment PCU gère-t-il les vulnérabilités de sécurité ?",
            "PCU s'intègre avec npm audit et optionnellement Snyk :",
            "Dois-je auto-corriger toutes les vulnérabilités de sécurité ?",
            "Utilisez la prudence avec --auto-fix :",
            "✅ Sûr : Mises à jour de patch et mineures pour les corrections de sécurité",
            "⚠️ À réviser : Mises à jour de versions majeures qui pourraient casser votre app",
            "❌ Éviter : Auto-correction aveugle en production sans tests",
            "Comment gérer les fausses alertes de sécurité ?",
            "Configurez les vulnérabilités ignorées dans .pcurc.json :"
          ]
        ],
        [
          "Flux de Travail et CI/CD",
          "flux-de-travail-et-ci-cd",
          [
            "Puis-je utiliser PCU dans les pipelines CI/CD ?",
            "Absolument ! PCU est conçu pour l'automatisation :",
            "Consultez notre guide d'intégration CI/CD pour des exemples complets.",
            "Comment créer des PR automatisées de mise à jour de dépendances ?",
            "Utilisez PCU avec GitHub Actions, GitLab CI ou d'autres plateformes :",
            "Consultez le guide d'intégration CI/CD pour des flux complets.",
            "Quel est le meilleur flux de travail pour la collaboration d'équipe ?",
            "Configuration partagée : Commitez .pcurc.json dans le contrôle de version",
            "Révisions régulières : Planifiez des réunions hebdomadaires de révision des dépendances",
            "Sécurité d'abord : Priorisez toujours les mises à jour de sécurité",
            "Mises à jour incrémentales : Préférez des mises à jour plus petites et fréquentes plutôt que de gros lots",
            "Tests : Testez toujours après les mises à jour avant de fusionner"
          ]
        ],
        [
          "Utilisation Avancée",
          "utilisation-avancee",
          [
            "Puis-je utiliser plusieurs catalogues dans un espace de travail ?",
            "Oui ! PNPM prend en charge plusieurs catalogues :",
            "Puis les utiliser dans les packages :",
            "Comment analyser l'impact de la mise à jour d'un package spécifique ?",
            "Utilisez la commande d'analyse :",
            "Puis-je exclure définitivement certains packages des mises à jour ?",
            "Oui, configurez les exclusions dans .pcurc.json :",
            "Comment gérer les monorepos avec plus de 100 packages ?",
            "Conseils de performance pour les grands monorepos :",
            "Traitement par lots : Configurez batchSize: 10 dans les paramètres avancés",
            "Réduire la concurrence : Définissez concurrency: 2 pour éviter de surcharger le registre",
            "Utiliser le filtrage : Traitez les packages par groupes avec des patterns --include",
            "Activer le cache : Assurez-vous que le cache est activé et bien configuré",
            "Augmenter la mémoire : Définissez NODE_OPTIONS=\"--max-old-space-size=8192\""
          ]
        ],
        [
          "Messages d'Erreur",
          "messages-d-erreur",
          [
            "\"Cannot resolve peer dependencies\"",
            "Cela arrive quand les versions de packages sont en conflit. Solutions :",
            "Mettre à jour les packages liés ensemble : pcu update --include \"react*\"",
            "Utiliser le mode interactif : pcu update --interactive pour choisir les versions soigneusement",
            "Vérifier les peer dependencies : Examiner ce que chaque package requiert",
            "Utiliser plusieurs catalogues : Séparer les versions conflictuelles dans différents catalogues",
            "\"Invalid configuration in .pcurc.json\"",
            "Votre fichier de configuration a des erreurs de syntaxe JSON :",
            "\"Command not found: pcu\"",
            "Problèmes d'installation ou de PATH :",
            "Réinstaller globalement : npm install -g pcu",
            "Vérifier le PATH : Assurez-vous que npm global bin est dans votre PATH",
            "Utiliser npx : npx pnpm-catalog-updates check comme alternative",
            "Utiliser pnpm : pnpm add -g pnpm-catalog-updates (recommandé)"
          ]
        ],
        [
          "Intégration et Outils",
          "integration-et-outils",
          [
            "PCU fonctionne-t-il avec Renovate ou Dependabot ?",
            "PCU est une alternative à ces outils, pas un complément :",
            "PCU : Contrôle manuel, spécifique à pnpm, axé sur les catalogues",
            "Renovate : PR automatisées, prend en charge de nombreux gestionnaires de packages",
            "Dependabot : Intégré à GitHub, mises à jour de sécurité automatisées",
            "Choisissez selon vos préférences de flux de travail. Pour la migration, consultez notre guide de migration.",
            "Puis-je intégrer PCU avec mon IDE ?",
            "Bien qu'il n'y ait pas d'extension IDE officielle, vous pouvez :",
            "Ajouter des scripts npm : Configurer des commandes dans package.json",
            "Utiliser des exécuteurs de tâches : Intégrer avec les tâches VS Code ou similaires",
            "Intégration terminal : La plupart des IDE prennent en charge l'intégration terminal",
            "PCU prend-il en charge les registres npm privés ?",
            "Oui ! PCU lit votre configuration .npmrc :",
            "PCU utilisera automatiquement le bon registre pour chaque scope de package."
          ]
        ],
        [
          "Vous avez encore des questions ?",
          "vous-avez-encore-des-questions",
          [
            "📖 Documentation : Consultez notre référence des commandes complète",
            "🛠️ Dépannage : Visitez notre guide de dépannage",
            "🐛 Rapports de bugs : Créer un ticket",
            "💬 Discussions : GitHub Discussions"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "Guide de Migration",
          null,
          [
            "Apprenez comment migrer depuis des solutions de gestion de dépendances existantes vers PCU et aidez votre équipe à transitionner vers les dépendances de catalogue pnpm. "
          ]
        ],
        [
          "Aperçu de la Migration",
          "apercu-de-la-migration",
          [
            "PCU est spécifiquement conçu pour les espaces de travail pnpm utilisant les dépendances de catalogue. Si vous utilisez actuellement d'autres outils ou gestionnaires de packages, ce guide vous aidera à transitionner en douceur.",
            "Avant de Commencer",
            "Prérequis pour PCU :",
            "pnpm comme gestionnaire de packages (version 8.0.0+)",
            "Configuration d'espace de travail (pnpm-workspace.yaml)",
            "Dépendances de catalogue dans votre espace de travail",
            "Matrice de Décision de Migration :",
            "| Outil Actuel             | Complexité Migration | Avantages                                                      | Considérations                                 |\n| ------------------------ | -------------------- | -------------------------------------------------------------- | ---------------------------------------------- |\n| npm-check-updates        | Faible               | Meilleure intégration pnpm, support catalogue                  | Nécessite configuration espace de travail pnpm |\n| Mises à jour manuelles   | Faible               | Automatisation, cohérence, scan sécurité                       | Effort de configuration initial                |\n| Renovate                 | Moyenne              | Contrôle manuel, fonctionnalités spécifiques espace de travail | Perte d'automatisation                         |\n| Dependabot               | Moyenne              | Gestion de catalogue améliorée                                 | Fonctionnalités spécifiques GitHub             |\n| yarn upgrade-interactive | Élevée               | Avantages catalogue, meilleures performances                   | Changement complet de gestionnaire de packages |"
          ]
        ],
        [
          "Migration depuis npm-check-updates",
          "migration-depuis-npm-check-updates",
          [
            "Analyse de la Configuration Actuelle",
            "Si vous utilisez actuellement npm-check-updates (ncu), vous avez probablement des scripts comme :",
            "Étapes de Migration",
            "1. Installer pnpm et Configurer l'Espace de Travail",
            "2. Convertir vers les Dépendances de Catalogue",
            "Créer des entrées de catalogue dans pnpm-workspace.yaml :",
            "3. Mettre à jour les Fichiers de Package",
            "Convertir les fichiers package.json pour utiliser les références de catalogue :",
            "4. Installer et Configurer PCU",
            "5. Mettre à jour les Scripts",
            "Remplacer les scripts ncu par les équivalents PCU :",
            "Migration de Configuration",
            "Configuration ncu → Configuration PCU :"
          ]
        ],
        [
          "Migration depuis Renovate",
          "migration-depuis-renovate",
          [
            "Comprendre les Différences",
            "Renovate vs PCU :",
            "Renovate : Création automatisée de PR, support multi-langages, configuration extensive",
            "PCU : Contrôle manuel, spécifique à pnpm, axé catalogue, intégré sécurité",
            "Stratégie de Migration",
            "1. Exporter la Configuration Renovate",
            "Analyser votre renovate.json actuel :",
            "2. Convertir vers la Configuration PCU",
            "Mapper les règles Renovate vers les équivalents PCU :",
            "3. Configurer les Flux Manuels",
            "Remplacer les PR automatisées par des révisions manuelles planifiées :",
            "4. Transition d'Équipe",
            "Phase 1 : Fonctionnement Parallèle (2 semaines)",
            "Garder Renovate activé",
            "Introduire PCU pour les vérifications manuelles",
            "Former l'équipe aux commandes PCU",
            "Phase 2 : PCU Principal (2 semaines)",
            "Désactiver la création de PR Renovate",
            "Utiliser PCU pour toutes les mises à jour",
            "Établir les processus de révision",
            "Phase 3 : Migration Complète",
            "Supprimer la configuration Renovate",
            "Optimiser la configuration PCU",
            "Documenter les nouveaux flux de travail",
            "Mapping des Fonctionnalités Renovate",
            "| Fonctionnalité Renovate  | Équivalent PCU       | Notes                            |\n| ------------------------ | -------------------- | -------------------------------- |\n| PR Automatisées          | pcu update manuel  | Plus de contrôle, moins de bruit |\n| Planification            | Tâches cron + PCU    | Timing flexible                  |\n| Mises à jour groupées    | Patterns --include | Grouper les packages liés        |\n| Auto-merge               | autoUpdate: true   | Limité aux packages sûrs         |\n| Alertes vulnérabilités   | pcu security       | Scan intégré                     |\n| Presets de configuration | Règles de packages   | Patterns réutilisables           |"
          ]
        ],
        [
          "Migration depuis Dependabot",
          "migration-depuis-dependabot",
          [
            "Considérations d'Intégration GitHub",
            "Avantages Dependabot à Répliquer :",
            "Alertes de vulnérabilités de sécurité",
            "Mises à jour de sécurité automatisées",
            "Intégration GitHub",
            "Création et gestion de PR",
            "Approche de Migration",
            "1. Auditer la Configuration Dependabot Actuelle",
            "Réviser .github/dependabot.yml :",
            "2. Configurer PCU avec GitHub Actions",
            "Créer .github/workflows/dependencies.yml :",
            "3. Intégration Sécurité",
            "Remplacer les fonctionnalités de sécurité Dependabot :",
            "4. Processus de Révision Manuelle",
            "Établir des flux centrés sur l'humain :"
          ]
        ],
        [
          "Migration depuis la Gestion Manuelle de Dépendances",
          "migration-depuis-la-gestion-manuelle-de-dependances",
          [
            "Phase d'Évaluation",
            "Analyse de l'État Actuel :",
            "Fréquence : À quelle fréquence mettez-vous à jour les dépendances ?",
            "Processus : Quel est votre flux de mise à jour actuel ?",
            "Tests : Comment validez-vous les mises à jour ?",
            "Sécurité : Comment gérez-vous les vulnérabilités ?",
            "Patterns Manuels Communs :",
            "Migration Structurée",
            "Phase 1 : Évaluation (Semaine 1)",
            "Phase 2 : Conversion Catalogue (Semaine 2)",
            "Phase 3 : Intégration Processus (Semaines 3-4)",
            "Stratégie d'Automatisation",
            "Automatisation Graduelle :",
            "Début Manuel : Toutes les mises à jour nécessitent confirmation",
            "Semi-Automatisé : Auto-mise à jour dev dependencies et types",
            "Automatisation Intelligente : Auto-mise à jour patches, confirmation mineurs",
            "Automatisation Complète : Auto-mise à jour tout sauf les majeures",
            "Évolution de Configuration :"
          ]
        ],
        [
          "Conversion de Projets Non-pnpm",
          "conversion-de-projets-non-pnpm",
          [
            "Depuis des Projets npm",
            "1. Analyse des Dépendances",
            "2. Migration pnpm",
            "3. Extraction de Catalogue",
            "Depuis des Projets Yarn",
            "1. Conversion d'Espace de Travail",
            "2. Commandes de Migration",
            "Conversion Monorepo",
            "Stratégie Grand Monorepo :"
          ]
        ],
        [
          "Stratégies de Transition d'Équipe",
          "strategies-de-transition-d-equipe",
          [
            "Gestion du Changement",
            "1. Plan de Communication",
            "Semaine -2 : Annoncer le plan de migration",
            "Semaine -1 : Sessions de formation et documentation",
            "Semaine 0 : Commencer le fonctionnement parallèle",
            "Semaine 2 : Transition complète",
            "Semaine 4 : Optimisation des processus",
            "2. Programme de Formation",
            "Session de Formation Développeur (1 heure) :",
            "Formation Chef d'Équipe (2 heures) :",
            "Gestion de configuration",
            "Intégration politique de sécurité",
            "Optimisation des performances",
            "Surveillance et rapports",
            "Stratégie de Déploiement",
            "Approche Projet Pilote :",
            "Sélectionner Projet Pilote : Choisir un projet représentatif mais non critique",
            "Migrer Pilote : Compléter la migration avec l'équipe pilote",
            "Leçons Apprises : Documenter les problèmes et solutions",
            "Déploiement Échelonné : Appliquer l'expérience aux autres projets",
            "Mitigation des Risques :",
            "Intégration Processus",
            "Intégration Révision de Code :",
            "Intégration Release :"
          ]
        ],
        [
          "Validation et Tests",
          "validation-et-tests",
          [
            "Validation de Migration",
            "1. Tests Fonctionnels",
            "2. Comparaison de Performance",
            "3. Intégrité des Dépendances",
            "Métriques de Succès",
            "Indicateurs Clés de Performance :",
            "Vitesse d'Installation : pnpm install vs npm install",
            "Fréquence de Mise à jour : Mises à jour par mois avant/après",
            "Réponse Sécurité : Temps pour corriger les vulnérabilités",
            "Satisfaction Développeur : Résultats sondage équipe",
            "Performance Build : Temps d'exécution CI/CD",
            "Dashboard de Surveillance :"
          ]
        ],
        [
          "Checklist de Migration",
          "checklist-de-migration",
          [
            "Pré-Migration",
            "Évaluer l'approche actuelle de gestion des dépendances",
            "Installer et tester pnpm dans un environnement isolé",
            "Planifier la structure de l'espace de travail",
            "Identifier les dépendances communes pour le catalogue",
            "Sauvegarder la configuration actuelle",
            "Former les membres clés de l'équipe",
            "Phase de Migration",
            "Convertir vers la structure d'espace de travail pnpm",
            "Extraire les dépendances vers le catalogue",
            "Mettre à jour les fichiers package.json pour utiliser les références de catalogue",
            "Installer et configurer PCU",
            "Tester la fonctionnalité avec un projet pilote",
            "Mettre à jour les pipelines CI/CD",
            "Documenter les nouveaux processus",
            "Post-Migration",
            "Valider que toute la fonctionnalité marche",
            "Former les membres restants de l'équipe",
            "Optimiser la configuration PCU",
            "Établir des calendriers de maintenance réguliers",
            "Surveiller et mesurer les métriques de succès",
            "Recueillir les commentaires et itérer",
            "Dépannage",
            "Documenter les problèmes de migration courants",
            "Créer les procédures de rollback",
            "Établir les canaux de support",
            "Vérifications de santé et optimisation régulières"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "Optimisation des Performances",
          null,
          [
            "Maximisez les performances de PCU pour les grands monorepos, les espaces de travail complexes et les environnements à ressources limitées. "
          ]
        ],
        [
          "Comprendre les Performances de PCU",
          "comprendre-les-performances-de-pcu",
          [
            "Les performances de PCU dépendent de plusieurs facteurs :",
            "Latence réseau : Temps de réponse des registres et bande passante",
            "Taille de l'espace de travail : Nombre de packages et dépendances",
            "Efficacité du cache : Taux de succès et optimisation du stockage",
            "Ressources système : CPU, mémoire et E/S disque",
            "Configuration : Paramètres de concurrence et valeurs de timeout",
            "Profilage des Performances",
            "Activez la surveillance détaillée des performances :",
            "Exemple d'Analyse de Sortie :"
          ]
        ],
        [
          "Optimisation de Configuration",
          "optimisation-de-configuration",
          [
            "Paramètres de Concurrence",
            "Optimisez les opérations concurrentes pour votre environnement :",
            "Directives de Concurrence :",
            "Petits projets (moins de 20 packages) : concurrency: 5-8",
            "Projets moyens (20-100 packages) : concurrency: 3-5",
            "Grands projets (plus de 100 packages) : concurrency: 1-3",
            "Environnements CI/CD : concurrency: 2-3",
            "Gestion Mémoire",
            "Optimisation Mémoire Node.js :",
            "Configuration Mémoire PCU :"
          ]
        ],
        [
          "Stratégies de Cache",
          "strategies-de-cache",
          [
            "Optimisation du Cache Local",
            "Configuration de Cache :",
            "Variables d'Environnement :",
            "Commandes de Gestion du Cache",
            "Intégration Cache CI/CD"
          ]
        ],
        [
          "Optimisation Réseau",
          "optimisation-reseau",
          [
            "Configuration des Registres",
            "Optimiser la Sélection de Registre :",
            "Optimisation de Connexion :",
            "Gestion de Bande Passante"
          ]
        ],
        [
          "Stratégies pour Grands Monorepos",
          "strategies-pour-grands-monorepos",
          [
            "Segmentation d'Espace de Travail",
            "Organiser les Grands Espaces de Travail :",
            "Traitement Sélectif :",
            "Traitement Incrémental",
            "Mises à jour Échelonnées :",
            "Flux de Traitement :"
          ]
        ],
        [
          "Gestion Mémoire et Ressources",
          "gestion-memoire-et-ressources",
          [
            "Profilage Mémoire",
            "Surveiller l'Utilisation Mémoire :",
            "Techniques d'Optimisation Mémoire :",
            "Optimisation E/S Disque",
            "Configurations SSD vs HDD :",
            "Cache Système de Fichiers :"
          ]
        ],
        [
          "Surveillance des Performances",
          "surveillance-des-performances",
          [
            "Collecte de Métriques",
            "Métriques Intégrées :",
            "Surveillance Personnalisée :",
            "Benchmarking",
            "Benchmarks de Performance :",
            "Guide d'Optimisation des Performances",
            "Optimisation Étape par Étape :",
            "Mesure de Base",
            "Activer le Cache",
            "Optimiser la Concurrence",
            "Optimisation Réseau",
            "Réglage Mémoire"
          ]
        ],
        [
          "Dépannage des Problèmes de Performance",
          "depannage-des-problemes-de-performance",
          [
            "Problèmes de Performance Courants",
            "Requêtes Réseau Lentes :",
            "Problèmes Mémoire :",
            "Problèmes de Cache :",
            "Détection de Régression de Performance",
            "Tests de Performance Automatisés :"
          ]
        ],
        [
          "Optimisations Spécifiques à l'Environnement",
          "optimisations-specifiques-a-l-environnement",
          [
            "Développement Local",
            "Configuration Machine Développeur :",
            "Environnements CI/CD",
            "Optimisation pour Différents Fournisseurs CI :",
            "Déploiements en Production",
            "Configuration Niveau Production :"
          ]
        ],
        [
          "Checklist de Performance",
          "checklist-de-performance",
          [
            "Gains Rapides",
            "Activer le cache persistant : export PCU_CACHE_ENABLED=true",
            "Optimiser la concurrence pour votre environnement",
            "Utiliser des registres géographiquement proches",
            "Augmenter la taille du tas Node.js pour les grands projets",
            "Activer la compression de requêtes et keep-alive",
            "Optimisations Avancées",
            "Implémenter les stratégies de cache CI/CD",
            "Configurer la segmentation d'espace de travail pour les grands monorepos",
            "Mettre en place la surveillance et alertes de performance",
            "Optimiser la gestion mémoire pour les opérations soutenues",
            "Implémenter les flux de traitement incrémental",
            "Surveillance et Maintenance",
            "Benchmarking régulier des performances",
            "Surveillance de la santé du cache",
            "Mesure de la latence réseau",
            "Profilage de l'utilisation mémoire",
            "Détection de régression de performance"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "Démarrage rapide",
          null,
          [
            "Commencez avec pnpm-catalog-updates en quelques minutes. Ce guide vous guidera à travers l'installation, l'initialisation et votre première mise à jour de dépendances. ",
            "pnpm-catalog-updates est spécialement conçu pour les espaces de travail pnpm utilisant des\ndépendances de catalogue. Assurez-vous d'avoir un espace de travail pnpm avant de commencer."
          ]
        ],
        [
          "Installation",
          "installation",
          [
            "Choisissez votre méthode d'installation préférée :"
          ]
        ],
        [
          "Initialiser votre espace de travail",
          "initialiser-votre-espace-de-travail",
          [
            "Si vous n'avez pas encore d'espace de travail pnpm, PCU peut en créer un pour vous :",
            "Cette commande crée :",
            ".pcurc.json - Fichier de configuration PCU",
            "package.json - package.json racine de l'espace de travail (si manquant)",
            "pnpm-workspace.yaml - Configuration de l'espace de travail PNPM (si manquante)",
            "packages/ - Répertoire pour les packages de l'espace de travail (si manquant)"
          ]
        ],
        [
          "Votre première vérification de mise à jour",
          "votre-premiere-verification-de-mise-a-jour",
          [
            "Vérifiez les dépendances de catalogue obsolètes :",
            "Cela vous montrera un beau tableau avec :",
            "Les versions actuelles dans vos catalogues",
            "Les dernières versions disponibles",
            "Les noms de packages et types de mise à jour",
            "Indicateurs d'urgence codés par couleur"
          ]
        ],
        [
          "Mises à jour interactives",
          "mises-a-jour-interactives",
          [
            "Mettez à jour les dépendances avec une interface interactive :",
            "Cela vous permet de :",
            "✅ Choisir quelles dépendances mettre à jour",
            "🎯 Sélectionner des versions spécifiques",
            "📊 Voir l'analyse d'impact",
            "🔒 Créer des sauvegardes automatiquement"
          ]
        ],
        [
          "Commandes courantes",
          "commandes-courantes",
          [
            "Voici les commandes les plus fréquemment utilisées :",
            "| Commande   | Description                     | Exemple                    |\n| ---------- | ------------------------------- | -------------------------- |\n| pcu init | Initialiser l'espace de travail | pcu init --verbose       |\n| pcu -c   | Vérifier les mises à jour       | pcu -c --catalog default |\n| pcu -i   | Mises à jour interactives       | pcu -i -b                |\n| pcu -u   | Mettre à jour les dépendances   | pcu -u --target minor    |\n| pcu -a   | Analyser l'impact               | pcu -a default react     |"
          ]
        ],
        [
          "Et maintenant ?",
          "et-maintenant",
          []
        ],
        [
          "Liste de vérification pour débuter",
          "liste-de-verification-pour-debuter",
          [
            "Suivez cette liste de vérification pour faire fonctionner PCU dans votre projet :",
            "Installer PCU - Choisissez l'installation globale ou utilisez npx",
            "Initialiser l'espace de travail - Exécutez pcu init pour la configuration initiale",
            "Vérifier les mises à jour - Utilisez pcu -c pour voir les mises à jour disponibles",
            "Configurer les paramètres - Personnalisez .pcurc.json selon vos besoins",
            "Mettre à jour les dépendances - Utilisez le mode interactif pcu -i pour des mises à jour sûres",
            "Configurer l'automatisation - Considérez l'intégration CI/CD pour des vérifications régulières"
          ]
        ],
        [
          "Référence rapide des commandes essentielles",
          "reference-rapide-des-commandes-essentielles",
          [
            "| Commande       | Objectif                       | Quand utiliser                            |\n| -------------- | ------------------------------ | ----------------------------------------- |\n| pcu init     | Configurer l'espace de travail | Première configuration, nouveaux projets  |\n| pcu -c       | Vérifier les mises à jour      | Développement quotidien, vérifications CI |\n| pcu -i       | Mise à jour interactive        | Mises à jour manuelles sûres              |\n| pcu -u       | Mise à jour par lots           | Mises à jour automatisées, CI/CD          |\n| pcu security | Analyse de sécurité            | Avant les versions, audits réguliers      |"
          ]
        ],
        [
          "Étapes suivantes",
          "etapes-suivantes",
          [
            "Une fois que vous avez configuré PCU, explorez ces fonctionnalités avancées :",
            "Configuration - Personnalisez PCU pour votre flux de travail spécifique",
            "Analyse de sécurité - Intégrez l'analyse des vulnérabilités",
            "Gestion de Monorepo - Fonctionnalités avancées d'espace de travail",
            "Intégration CI/CD - Automatisez les mises à jour de dépendances dans votre pipeline"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "Dépannage",
          null,
          [
            "Problèmes courants et solutions pour vous aider à résoudre les problèmes avec PCU. Trouvez des réponses aux erreurs fréquemment rencontrées et des conseils de débogage. "
          ]
        ],
        [
          "Erreurs Courantes",
          "erreurs-courantes",
          [
            "Espace de Travail Non Trouvé",
            "Message d'Erreur :",
            "Cause : PCU n'a pas pu localiser un fichier pnpm-workspace.yaml ou détecter une structure d'espace de travail pnpm valide.",
            "Solutions :",
            "Aucune Dépendance de Catalogue",
            "Message d'Erreur :",
            "Cause : Votre espace de travail n'utilise pas les dépendances de catalogue pnpm.",
            "Solutions :",
            "Problèmes d'Accès au Registre",
            "Message d'Erreur :",
            "Cause : Problèmes de connectivité réseau ou d'accès au registre.",
            "Solutions :",
            "Erreurs d'Authentification",
            "Message d'Erreur :",
            "Cause : Jetons d'authentification manquants ou invalides pour les registres privés.",
            "Solutions :",
            "Erreurs de Fichier de Configuration",
            "Message d'Erreur :",
            "Cause : JSON malformé ou options de configuration invalides.",
            "Solutions :"
          ]
        ],
        [
          "Débogage",
          "debogage",
          [
            "Activer la Journalisation Verbose",
            "Validation de l'Espace de Travail"
          ]
        ],
        [
          "Problèmes de Performance",
          "problemes-de-performance",
          [
            "Requêtes Réseau Lentes",
            "Symptômes : PCU prend beaucoup de temps pour vérifier les mises à jour",
            "Solutions :",
            "Utilisation Mémoire Élevée",
            "Symptômes : PCU consomme une mémoire excessive avec de grands espaces de travail",
            "Solutions :"
          ]
        ],
        [
          "Problèmes d'Environnement",
          "problemes-d-environnement",
          [
            "Compatibilité Version Node.js",
            "Message d'Erreur :",
            "Solutions :",
            "Problèmes de Version pnpm",
            "Message d'Erreur :",
            "Solutions :"
          ]
        ],
        [
          "Problèmes Spécifiques à Windows",
          "problemes-specifiques-a-windows",
          [
            "Problèmes de Séparateur de Chemin",
            "Message d'Erreur :",
            "Solutions :",
            "Erreurs de Permission",
            "Message d'Erreur :",
            "Solutions :"
          ]
        ],
        [
          "Obtenir de l'Aide",
          "obtenir-de-l-aide",
          [
            "Informations de Diagnostic",
            "Lors du signalement de problèmes, incluez ces informations de diagnostic :",
            "Canaux de Support",
            "🐛 Rapports de Bugs : GitHub Issues",
            "💬 Questions : GitHub Discussions",
            "📖 Documentation : Consultez cette documentation pour des guides détaillés",
            "🔧 Demandes de Fonctionnalités : Utilisez GitHub Issues avec le label enhancement",
            "Modèle de Rapport de Bug",
            "Lors du signalement de bugs, veuillez inclure :",
            "Version PCU et commande utilisée",
            "Message d'erreur (sortie complète avec --verbose)",
            "Environnement (OS, versions Node.js, pnpm)",
            "Structure de l'espace de travail (pnpm-workspace.yaml, package.json)",
            "Configuration (.pcurc.json, .npmrc si pertinent)",
            "Étapes pour reproduire le problème",
            "Comportement attendu vs réel"
          ]
        ],
        [
          "Problèmes de Commande de Sécurité",
          "problemes-de-commande-de-securite",
          [
            "Problèmes d'Intégration Snyk",
            "Message d'Erreur :",
            "Cause : Snyk CLI n'est pas installé mais le flag --snyk est utilisé.",
            "Solutions :",
            "Échecs de Correction de Sécurité",
            "Message d'Erreur :",
            "Cause : Certaines vulnérabilités nécessitent une intervention manuelle ou des mises à jour de version majeure.",
            "Solutions :",
            "Problèmes de Commande de Thème",
            "Message d'Erreur :",
            "Cause : Tentative de définir un thème qui n'existe pas.",
            "Solutions :",
            "Problèmes de Mode Interactif",
            "Message d'Erreur :",
            "Cause : Exécution de PCU dans un environnement non interactif (CI, pipe, etc.).",
            "Solutions :"
          ]
        ],
        [
          "Problèmes Spécifiques aux Commandes",
          "problemes-specifiques-aux-commandes",
          [
            "Problèmes de Commande d'Analyse",
            "Message d'Erreur :",
            "Cause : Analyse d'un package qui n'existe pas dans le catalogue spécifié.",
            "Solutions :",
            "Échecs de Commande de Mise à jour",
            "Message d'Erreur :",
            "Cause : Problèmes de permissions de fichier ou de structure d'espace de travail.",
            "Solutions :"
          ]
        ],
        [
          "Débogage Avancé",
          "debogage-avance",
          [
            "Investigation de Fuite Mémoire",
            "Symptômes : La mémoire du processus PCU continue de croître pendant l'opération",
            "Étapes de Débogage :",
            "Problèmes de Réponse du Registre",
            "Symptômes : Résultats incohérents ou erreurs de timeout",
            "Étapes de Débogage :",
            "Problèmes d'Héritage de Configuration",
            "Symptômes : Configuration non appliquée comme attendu",
            "Étapes de Débogage :"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "Fonctionnalités d'Écriture Avancées",
          null,
          [
            "Maîtrisez les fonctionnalités avancées qui rendent votre documentation professionnelle et efficace. Apprenez les métadonnées, les paragraphes d'introduction, les contextes de style et les meilleures pratiques qui distinguent une excellente documentation d'une bonne documentation. "
          ]
        ],
        [
          "Métadonnées et SEO",
          "metadonnees-et-seo",
          [
            "Chaque page doit inclure des métadonnées en haut :"
          ]
        ],
        [
          "Paragraphes d'Introduction",
          "paragraphes-d-introduction",
          [
            "Faites ressortir les paragraphes d'introduction avec {{ className: 'lead' }} :"
          ]
        ],
        [
          "Contexte de Style",
          "contexte-de-style",
          [
            "La Classe not-prose",
            "Utilisez <div className=\"not-prose\"> pour les composants qui doivent échapper au style prose :"
          ]
        ],
        [
          "Meilleures Pratiques de Documentation",
          "meilleures-pratiques-de-documentation",
          [
            "Structure du Contenu",
            "Commencez par les métadonnées et des titres clairs",
            "Utilisez des paragraphes d'introduction",
            "Organisez avec une hiérarchie de titres appropriée",
            "Ajoutez des Notes pour les informations importantes",
            "Incluez des exemples de code pratiques",
            "Terminez par des étapes suivantes claires",
            "Style d'Écriture",
            "Utilisez la voix active",
            "Soyez concis mais complet",
            "Incluez des exemples pour chaque concept",
            "Testez tous les extraits de code",
            "Maintenez une terminologie cohérente",
            "Organisation",
            "Groupez les sujets connexes ensemble",
            "Utilisez les références croisées généreusement",
            "Fournissez plusieurs points d'entrée",
            "Considérez le parcours de l'utilisateur",
            "Incluez des titres adaptés à la recherche"
          ]
        ],
        [
          "Flux de Travail de Documentation Complet",
          "flux-de-travail-de-documentation-complet",
          [
            "Planifier : Esquissez la structure de votre contenu",
            "Écrire : Utilisez les composants appropriés pour chaque section",
            "Réviser : Vérifiez l'exhaustivité et la précision",
            "Tester : Vérifiez que tous les exemples fonctionnent",
            "Itérer : Améliorez basé sur les commentaires",
            "Vous avez maintenant tous les outils nécessaires pour créer une documentation de classe mondiale !"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "Écriture de Documentation API",
          null,
          [
            "Créez une documentation API complète que les développeurs adorent. Apprenez à utiliser Properties pour les paramètres, Tags pour les méthodes HTTP, Libraries pour présenter les SDK, et des composants spécialisés qui rendent les références API claires et exploitables. "
          ]
        ],
        [
          "Listes de Propriétés",
          "listes-de-proprietes",
          [
            "Documentez les paramètres API avec <Properties> et <Property> :",
            "Identifiant unique de la ressource. Généré automatiquement lors de la création de la ressource.",
            "Nom d'affichage de la ressource. Doit contenir entre 1 et 100 caractères.",
            "Adresse email valide. Doit être unique parmi tous les utilisateurs.",
            "Horodatage ISO 8601 indiquant quand la ressource a été créée."
          ]
        ],
        [
          "Tags de Méthodes HTTP",
          "tags-de-methodes-http",
          [
            "Les tags se colorent automatiquement selon les méthodes HTTP :",
            "GET\nPOST\nPUT\nDELETE\nPERSONNALISÉ\nSUCCÈS\nERREUR"
          ]
        ],
        [
          "Composants Libraries",
          "composants-libraries",
          [
            "Grille de Bibliothèques Complète",
            "Présentez tous les SDK officiels avec le composant <Libraries> :",
            "Bibliothèque Unique",
            "Utilisez le composant <Library> pour afficher des bibliothèques individuelles :",
            "Bibliothèques Compactes",
            "Pour les espaces plus petits, utilisez le mode compact avec descriptions :",
            "Ou sans descriptions pour un affichage encore plus compact :",
            "Options du Composant Library",
            "language : Choisissez parmi php, ruby, node, python, go (par défaut : node)",
            "compact : Utilisez un style plus petit (par défaut : false)",
            "showDescription : Afficher/masquer le texte de description (par défaut : true)",
            "Cas d'Usage des Libraries",
            "<Libraries /> : Pages de présentation SDK complète, sections de démarrage",
            "<Library /> : Documentation en ligne, guides de langages spécifiques",
            "<Library compact /> : Références de barre latérale, listes compactes"
          ]
        ],
        [
          "Meilleures Pratiques API",
          "meilleures-pratiques-api",
          [
            "Toujours documenter tous les paramètres avec les composants Properties",
            "Inclure des exemples de requêtes et de réponses",
            "Utiliser les codes de statut HTTP appropriés avec les Tags",
            "Fournir des messages d'erreur clairs",
            "Inclure les exigences d'authentification",
            "Utiliser le composant Libraries pour les pages SDK",
            "Maintenir les listes Properties ciblées et bien organisées"
          ]
        ],
        [
          "Étapes Suivantes",
          "etapes-suivantes",
          [
            "Terminez votre parcours de documentation avec Fonctionnalités Avancées."
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "Bases de l'Écriture",
          null,
          [
            "Maîtrisez les éléments fondamentaux de la rédaction de documentation. Ce guide couvre la syntaxe Markdown standard, les options de formatage et les éléments de base que vous utiliserez dans chaque document. "
          ]
        ],
        [
          "Fondamentaux Markdown",
          "fondamentaux-markdown",
          [
            "Le formatage Markdown standard est entièrement pris en charge et constitue la base de toute documentation :",
            "Texte gras pour l'emphase et l'importanceTexte italique pour une emphase subtilecode en ligne pour les termes techniques, commandes et courts extraits de code",
            "Vous pouvez les combiner : gras et italique ou gras avec code"
          ]
        ],
        [
          "Formatage du Texte",
          "formatage-du-texte",
          [
            "Emphase et Texte Fort",
            "Utilisez des astérisques ou des underscores pour l'emphase :",
            "Code et Termes Techniques",
            "Pour le code en ligne, les variables ou les termes techniques, utilisez des backticks :"
          ]
        ],
        [
          "Listes et Organisation",
          "listes-et-organisation",
          [
            "Listes Non Ordonnées",
            "Parfaites pour les listes de fonctionnalités, exigences ou tout élément non séquentiel :",
            "Fonctionnalité principale ou point",
            "Autre élément important",
            "Troisième considération",
            "Sous-point imbriqué",
            "Détail supplémentaire",
            "Retour au niveau principal",
            "Listes Ordonnées",
            "Utilisez pour les instructions étape par étape, procédures ou éléments priorisés :",
            "Première étape du processus",
            "Deuxième étape avec détails importants",
            "Troisième étape",
            "Sous-étape avec instructions spécifiques",
            "Autre sous-étape",
            "Étape finale",
            "Listes de Tâches",
            "Excellentes pour les listes de vérification et le suivi de progression :",
            "[x] Tâche terminée",
            "[x] Autre élément fini",
            "[ ] Tâche en attente",
            "[ ] Amélioration future"
          ]
        ],
        [
          "Liens et Navigation",
          "liens-et-navigation",
          [
            "Liens Internes",
            "Lien vers d'autres pages de votre documentation :",
            "Exemples :",
            "Guide de Référence des Commandes",
            "Dépannage",
            "Documentation SDK",
            "Liens Externes",
            "Lien vers des ressources externes :",
            "Liens d'Ancrage",
            "Lien vers des sections spécifiques dans les pages :"
          ]
        ],
        [
          "Titres et Structure",
          "titres-et-structure",
          [
            "Créez une hiérarchie de document claire avec des niveaux de titre appropriés :",
            "Meilleures Pratiques des Titres",
            "Utilisez H1 uniquement pour le titre de page (géré par les métadonnées)",
            "Commencez les sections avec H2, les sous-sections avec H3",
            "Ne sautez pas de niveaux de titre (pas de H2 → H4)",
            "Gardez les titres descriptifs et scannables",
            "Utilisez la casse de phrase : \"Commencer\" et non \"Commencer\""
          ]
        ],
        [
          "Citations et Encadrés",
          "citations-et-encadres",
          [
            "Citations en Bloc",
            "Pour les citations importantes ou références :",
            "\"La documentation est une lettre d'amour que vous écrivez à votre futur moi.\"— Damian Conway",
            "Note Importante : Ceci est une citation mise en évidence avec un contexte supplémentaire qui s'étend sur plusieurs lignes et fournit des informations cruciales.",
            "Citations Multi-paragraphes",
            "Ceci est le premier paragraphe d'une citation plus longue.",
            "Ceci est le deuxième paragraphe qui continue la pensée avec des détails et un contexte supplémentaires."
          ]
        ],
        [
          "Règles Horizontales",
          "regles-horizontales",
          [
            "Séparez les sections majeures avec des règles horizontales :",
            "Crée une pause visuelle :"
          ]
        ],
        [
          "Tableaux",
          "tableaux",
          [
            "Tableaux simples pour les données structurées :",
            "| Fonctionnalité | De Base | Pro         | Entreprise     |\n| -------------- | ------- | ----------- | -------------- |\n| Utilisateurs   | 10      | 100         | Illimité       |\n| Stockage       | 1GB     | 10GB        | 100GB          |\n| Appels API     | 1,000   | 10,000      | Illimité       |\n| Support        | Email   | Prioritaire | 24/7 Téléphone |",
            "Alignement des Tableaux",
            "Contrôlez l'alignement des colonnes :",
            "| Aligné à Gauche | Aligné au Centre | Aligné à Droite |\n| :-------------- | :--------------: | --------------: |\n| Texte           |      Texte       |           Texte |\n| Plus de contenu | Plus de contenu  | Plus de contenu |"
          ]
        ],
        [
          "Caractères Spéciaux",
          "caracteres-speciaux",
          [
            "Utilisez des antislashs pour échapper les caractères Markdown spéciaux :"
          ]
        ],
        [
          "Sauts de Ligne et Espacement",
          "sauts-de-ligne-et-espacement",
          [
            "Terminez les lignes avec deux espaces pour des sauts durs",
            "Utilisez des lignes vides pour séparer les paragraphes",
            "Utilisez \\ en fin de ligne pour les sauts dans les listes"
          ]
        ],
        [
          "Étapes Suivantes",
          "etapes-suivantes",
          [
            "Une fois que vous avez maîtrisé ces bases, explorez :",
            "Écriture de Composants - Éléments UI interactifs",
            "Écriture de Code - Blocs de code et coloration syntaxique",
            "Écriture de Mise en Page - Mises en page multi-colonnes et organisation",
            "Écriture API - Composants de documentation API",
            "Écriture Avancée - Fonctionnalités avancées et meilleures pratiques",
            "Ces fondamentaux forment la base de toute excellente documentation. Maîtrisez-les d'abord, puis développez-les avec les composants avancés et techniques couverts dans les autres guides."
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "Écriture de Code",
          null,
          [
            "Maîtrisez l'art de présenter le code dans votre documentation. Apprenez à utiliser la coloration syntaxique, créer des exemples multi-langages et organiser efficacement les blocs de code pour aider les développeurs à comprendre et implémenter vos solutions. "
          ]
        ],
        [
          "Blocs de Code Simples",
          "blocs-de-code-simples",
          [
            "Blocs de code basiques avec coloration syntaxique automatique :",
            "Le bloc de code JavaScript ci-dessus est créé avec la syntaxe MDX suivante :",
            "Exemple Python :",
            "Syntaxe MDX du bloc de code Python :",
            "Commandes Bash/Shell :",
            "Syntaxe MDX du bloc de code Bash :"
          ]
        ],
        [
          "CodeGroup pour Multiples Langages",
          "code-group-pour-multiples-langages",
          [
            "Utilisez <CodeGroup> pour montrer le même exemple dans différents langages :",
            "Le groupe de code multi-langages ci-dessus est créé avec la syntaxe MDX suivante :"
          ]
        ],
        [
          "Exemples de Points de Terminaison API",
          "exemples-de-points-de-terminaison-api",
          [
            "Pour la documentation API, utilisez les balises de méthodes HTTP :",
            "L'exemple de point de terminaison API ci-dessus est créé avec la syntaxe MDX suivante, notez les attributs tag et label :",
            "Titres de Blocs de Code",
            "Vous pouvez également ajouter des titres aux blocs de code individuels :"
          ]
        ],
        [
          "Langages Pris en Charge",
          "langages-pris-en-charge",
          [
            "Nos blocs de code prennent en charge la coloration syntaxique pour de nombreux langages de programmation, notamment :",
            "JavaScript/TypeScript : javascript, typescript, js, ts",
            "Python : python, py",
            "Scripts Shell : bash, shell, sh",
            "Autres langages : json, yaml, xml, sql, css, html, markdown, diff",
            "Exemple :",
            "Syntaxe MDX du bloc de code JSON :",
            "Comparaison de code (Diff) :",
            "Syntaxe MDX du bloc de code Diff :"
          ]
        ],
        [
          "Meilleures Pratiques",
          "meilleures-pratiques",
          [
            "Toujours spécifier le langage pour la coloration syntaxique",
            "Utiliser des titres descriptifs pour différencier les exemples de code",
            "Inclure des exemples complets et exécutables",
            "Garder les exemples concis mais fonctionnels",
            "Utiliser un formatage et un style cohérents",
            "Ordonner les onglets de langages dans CodeGroup par fréquence d'utilisation"
          ]
        ],
        [
          "Étapes Suivantes",
          "etapes-suivantes",
          [
            "Continuez avec Composants de Mise en Page pour organiser efficacement votre contenu."
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "Écriture de Composants",
          null,
          [
            "Améliorez votre documentation avec des composants UI interactifs. Apprenez à utiliser Notes pour les informations importantes, Buttons pour les actions, et d'autres éléments qui rendent vos docs plus engageantes et fonctionnelles. "
          ]
        ],
        [
          "Notes et Encadrés",
          "notes-et-encadres",
          [
            "Le composant <Note> est parfait pour mettre en évidence les informations importantes, les avertissements ou les conseils auxquels les lecteurs doivent porter une attention particulière.",
            "Utilisation de Base des Notes",
            "Ceci est un composant de note de base. Il stylise automatiquement le contenu avec un thème\némeraude et une icône d'information, faisant ressortir les informations importantes du texte\nrégulier.",
            "Notes avec Contenu Riche",
            "Les notes supportent le formatage Markdown complet, incluant texte gras, texte italique, code en ligne, et même liens vers d'autres pages.",
            "Exigence de Configuration Importante : Avant de procéder, assurez-vous d'avoir : - Node.js\nversion 18 ou supérieure installée - Accès au dépôt du projet - Identifiants API valides\nconfigurés Voir le Guide de Référence des Commandes pour la configuration\ndes identifiants.",
            "Notes Multi-paragraphes",
            "Ceci est le premier paragraphe d'une note plus longue qui contient plusieurs éléments d'information connexes.",
            "Ce deuxième paragraphe continue la réflexion avec un contexte supplémentaire. Vous pouvez inclure autant de paragraphes que nécessaire pour expliquer complètement le concept.",
            "Rappelez-vous que de bonnes notes sont concises mais complètes, fournissant juste assez d'informations pour aider les lecteurs à comprendre l'importance du message."
          ]
        ],
        [
          "Boutons et Actions",
          "boutons-et-actions",
          [
            "Le composant <Button> crée des éléments d'appel à l'action qui guident les utilisateurs vers des liens importants ou des étapes suivantes.",
            "Variantes de Boutons",
            "Boutons Remplis",
            "Utilisez pour les actions principales et les appels à l'action les plus importants :",
            "Apprenez les Composants de Code",
            "Boutons Contour",
            "Parfaits pour les actions secondaires et les chemins alternatifs :",
            "Explorez les Composants de Mise en Page",
            "Boutons Texte",
            "Liens subtils qui se fondent avec le contenu tout en ressortant :",
            "Retour aux Bases",
            "Flèches de Boutons",
            "Les boutons supportent les flèches directionnelles pour indiquer la navigation :",
            "Section Précédente",
            "Section Suivante",
            "Meilleures Pratiques pour les Boutons",
            "Utilisez avec parcimonie : Trop de boutons réduisent leur efficacité",
            "Mots d'action clairs : \"Commencer\", \"En Savoir Plus\", \"Voir la Documentation\"",
            "Hiérarchie logique : Rempli pour primaire, contour pour secondaire, texte pour tertiaire",
            "Flèches directionnelles : Gauche pour \"retour/précédent\", droite pour \"avant/suivant\"",
            "Enveloppez dans not-prose : Utilisez toujours l'enveloppeur <div className=\"not-prose\">"
          ]
        ],
        [
          "Contexte de Style des Composants",
          "contexte-de-style-des-composants",
          [
            "L'Enveloppeur not-prose",
            "Certains composants doivent échapper au style prose par défaut. Enveloppez toujours ces composants :",
            "Composants qui requièrent not-prose :",
            "Tous les composants <Button>",
            "Éléments de mise en page personnalisés",
            "Widgets interactifs",
            "Composants stylés complexes",
            "Composants qui fonctionnent sans not-prose :",
            "Composants <Note> (style autonome)",
            "Éléments Markdown standards",
            "Composants basés sur le texte",
            "Composants Multiples",
            "Lors de l'affichage de composants multiples ensemble :",
            "Guide Documentation API",
            "Fonctionnalités Avancées",
            "Réviser les Bases"
          ]
        ],
        [
          "Accessibilité des Composants",
          "accessibilite-des-composants",
          [
            "Tous les composants sont construits avec l'accessibilité à l'esprit :",
            "HTML sémantique : Éléments bouton et lien appropriés",
            "Labels ARIA : Support de lecteur d'écran au besoin",
            "Navigation clavier : Accessibilité clavier complète",
            "Gestion du focus : Indicateurs de focus clairs",
            "Contraste des couleurs : Schémas de couleurs conformes WCAG"
          ]
        ],
        [
          "Quand Utiliser Chaque Composant",
          "quand-utiliser-chaque-composant",
          [
            "Utilisez les Notes Quand :",
            "Mettre en évidence des informations critiques",
            "Avertir de problèmes potentiels",
            "Fournir des conseils utiles ou du contexte",
            "Expliquer les prérequis ou exigences",
            "Attirer l'attention sur des changements importants",
            "Utilisez les Boutons Quand :",
            "Guider vers les étapes logiques suivantes",
            "Lier vers des ressources externes",
            "Créer des moments d'appel à l'action clairs",
            "Navigation entre sections majeures",
            "Mettre en évidence les actions principales",
            "Évitez la Surutilisation :",
            "N'utilisez pas de notes pour chaque paragraphe",
            "Limitez les boutons à 1-2 par section",
            "Réservez les composants pour le contenu vraiment important",
            "Laissez le texte régulier et Markdown porter la plupart du contenu"
          ]
        ],
        [
          "Étapes Suivantes",
          "etapes-suivantes",
          [
            "Maintenant que vous comprenez les composants UI, explorez :",
            "Écriture de Code - Mise en évidence de syntaxe et blocs de code",
            "Mise en Page d'Écriture - Mises en page multi-colonnes et organisation",
            "Écriture API - Composants de documentation API",
            "Écriture Avancée - Fonctionnalités avancées et métadonnées",
            "Maîtrisez ces éléments interactifs pour créer une documentation qui non seulement informe mais guide et engage efficacement vos lecteurs."
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "Mise en Page d'Écriture",
          null,
          [
            "Créez des mises en page sophistiquées qui améliorent la lisibilité et l'expérience utilisateur. Apprenez à utiliser les composants Row et Col pour les designs multi-colonnes, le positionnement collant et l'organisation efficace du contenu. "
          ]
        ],
        [
          "Mise en Page à Deux Colonnes",
          "mise-en-page-a-deux-colonnes",
          [
            "Utilisez <Row> et <Col> pour du contenu côte à côte :",
            "Colonne de Gauche",
            "Ce contenu apparaît dans la colonne de gauche. Parfait pour les explications, descriptions ou informations complémentaires.",
            "Point clé un",
            "Détail important",
            "Contexte supplémentaire",
            "Colonne de Droite"
          ]
        ],
        [
          "Mise en Page Colonne Collante",
          "mise-en-page-colonne-collante",
          [
            "Faites rester le contenu collé pendant le défilement :",
            "Contenu Défilant",
            "Ceci est du contenu régulier qui défile normalement. Vous pouvez mettre de longues explications ici que les utilisateurs feront défiler pour lire complètement.",
            "Cette colonne contient le récit principal ou les informations détaillées qui nécessitent un défilement pour être consommées entièrement.",
            "Référence Collante",
            "Ceci reste visible pendant que vous défilez."
          ]
        ],
        [
          "Composant Guides",
          "composant-guides",
          [
            "Affichez une grille de liens de guide en utilisant le composant <Guides> :",
            "Le composant Guides montre un ensemble prédéfini de guides de documentation avec des liens et des descriptions. Parfait pour les pages d'aperçu et les sections de démarrage."
          ]
        ],
        [
          "Composant Resources",
          "composant-resources",
          [
            "Présentez les principales catégories de ressources avec des cartes animées :",
            "Le composant Resources affiche des cartes de ressources animées avec des icônes et des descriptions. Idéal pour les pages d'accueil principales et les sections d'aperçu API."
          ]
        ],
        [
          "Icônes",
          "icones",
          [
            "Utilisez des icônes individuelles pour la décoration en ligne ou des mises en page personnalisées :",
            "Icônes Disponibles",
            "<UserIcon /> - Utilisateur unique",
            "<UsersIcon /> - Utilisateurs multiples",
            "<EnvelopeIcon /> - Messages/email",
            "<ChatBubbleIcon /> - Conversations",
            "<BookIcon /> - Documentation",
            "<CheckIcon /> - Succès/achèvement",
            "<BellIcon /> - Notifications",
            "<CogIcon /> - Paramètres/configuration"
          ]
        ],
        [
          "Meilleures Pratiques de Mise en Page",
          "meilleures-pratiques-de-mise-en-page",
          [
            "Utilisez des mises en page à deux colonnes pour du contenu complémentaire",
            "Les colonnes collantes fonctionnent mieux pour le matériel de référence",
            "Gardez les colonnes équilibrées en longueur de contenu",
            "Assurez-vous de la responsivité mobile (les colonnes s'empilent sur les petits écrans)",
            "Utilisez Guides pour les pages d'aperçu de documentation",
            "Utilisez Resources pour les vitrines de catégories API",
            "Les icônes fonctionnent bien avec les classes Tailwind personnalisées pour les couleurs et le dimensionnement"
          ]
        ],
        [
          "Étapes Suivantes",
          "etapes-suivantes",
          [
            "Continuez avec Documentation API pour les composants spécialisés."
          ]
        ]
      ]
    }
  ],
  "ja": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "AI分析",
          null,
          [
            "PCUはAI CLIツールと統合して、インテリジェントな依存関係分析、セキュリティ評価、更新推奨を提供します。 "
          ]
        ],
        [
          "概要",
          "",
          [
            "AI分析はPCUの機能を次のように強化します：",
            "影響分析：更新がコードベースにどのように影響するかを理解",
            "セキュリティ評価：AI駆動のセキュリティ脆弱性分析を取得",
            "互換性チェック：潜在的な破壊的変更を検出",
            "更新推奨：安全な更新のためのインテリジェントな提案を受信"
          ]
        ],
        [
          "サポートされるAIプロバイダー",
          "ai",
          [
            "PCUは利用可能なAI CLIツールを自動的に検出し、以下の優先順位で使用します：",
            "| プロバイダー | 優先度 | 機能                             |\n| ------------ | ------ | -------------------------------- |\n| Gemini       | 100    | 影響、セキュリティ、互換性、推奨 |\n| Claude       | 80     | 影響、セキュリティ、互換性、推奨 |\n| Codex        | 60     | 影響、互換性、推奨               |\n| Cursor       | 40     | 影響、推奨                       |",
            "AIプロバイダーが利用できない場合、PCUは自動的にルールベースの分析エンジンにフォールバックし、事前定義されたルールを使用して基本的な依存関係分析を提供します。"
          ]
        ],
        [
          "コマンド",
          "",
          [
            "利用可能なAIプロバイダーの確認",
            "システム上で利用可能なAIツールを表示：",
            "このコマンドは以下を表示します：",
            "システムで検出された利用可能なAI CLIツール",
            "各プロバイダーのバージョン情報",
            "分析に使用される最適なプロバイダー",
            "AIコマンドオプション",
            "すべてのAIプロバイダーのステータスを表示（デフォルト動作）",
            "サンプルリクエストでAI分析をテストしてプロバイダー接続を確認",
            "ヒット率やサイズを含むAI分析キャッシュ統計を表示",
            "AI分析キャッシュをクリアしてスペースを解放またはキャッシュされた応答をリセット",
            "AI駆動の更新",
            "AI駆動の分析で依存関係を更新：",
            "AI拡張更新は以下を提供：",
            "各更新のインテリジェントなリスク評価",
            "説明付きの破壊的変更検出",
            "セキュリティ脆弱性の識別",
            "推奨される更新順序",
            "AI駆動の分析",
            "AIアシスタンスで特定のパッケージ更新を分析：",
            "analyzeコマンドはデフォルトでdefaultカタログを使用します。最初の引数として異なるカタログを指定できます：pcu\n  analyze my-catalog react"
          ]
        ],
        [
          "分析タイプ",
          "",
          [
            "影響分析",
            "依存関係の更新がプロジェクトにどのように影響するかを評価：",
            "その依存関係を使用するすべてのワークスペースパッケージを識別",
            "バージョン間のAPI変更を分析",
            "必要な移行作業を見積もり",
            "テストの重点領域を提案",
            "セキュリティ分析",
            "セキュリティに焦点を当てた評価を提供：",
            "現在のバージョンの既知の脆弱性を識別",
            "新バージョンのセキュリティ修正をチェック",
            "セキュリティに関連するパッケージ更新を評価",
            "セキュリティのベストプラクティスを推奨",
            "互換性分析",
            "潜在的な互換性の問題をチェック：",
            "破壊的なAPI変更を検出",
            "ピア依存関係の競合を識別",
            "Node.jsバージョンの互換性をチェック",
            "TypeScriptの互換性を検証",
            "推奨事項",
            "実行可能な推奨事項を生成：",
            "最適な更新順序を提案",
            "バージョン範囲を推奨",
            "一緒に更新すべきパッケージを識別",
            "ロールバック戦略を提供"
          ]
        ],
        [
          "フォールバック動作",
          "",
          [
            "AIプロバイダーが利用できない場合、PCUは組み込みのルールベース分析エンジンを使用します：",
            "ルールベース分析機能",
            "バージョンジャンプ評価：セマンティックバージョニングの変更に基づいてリスクを評価",
            "既知の破壊パターン：人気パッケージ（React、TypeScript、ESLintなど）の破壊的変更を検出",
            "セキュリティ敏感パッケージ：セキュリティ関連のパッケージにフラグを立てて慎重にレビュー",
            "作業量見積もり：移行作業量の見積もりを提供",
            "リスクレベル",
            "| レベル | 説明                                                         |\n| ------ | ------------------------------------------------------------ |\n| 低     | パッチ更新、通常は安全に適用可能                             |\n| 中     | マイナー更新または大きなマイナーバージョンジャンプ           |\n| 高     | 破壊的変更を伴うメジャーバージョン更新                       |\n| 重大   | 複数のメジャーバージョンジャンプまたはプレリリースバージョン |"
          ]
        ],
        [
          "設定",
          "",
          [
            "環境変数",
            "Gemini CLI実行ファイルへのカスタムパス",
            "Claude CLI実行ファイルへのカスタムパス",
            "Codex CLI実行ファイルへのカスタムパス",
            "Cursor CLI実行ファイルへのカスタムパス",
            "検出方法",
            "PCUはAIプロバイダーを検出するために複数の戦略を使用します：",
            "環境変数：カスタムパス変数をチェック",
            "PATH検索：whichコマンドを使用して実行ファイルを検索",
            "既知のパス：一般的なインストール場所をチェック",
            "アプリケーションパス：GUIアプリケーション（例：Cursor.app）をチェック"
          ]
        ],
        [
          "使用例",
          "",
          [
            "安全な更新ワークフロー",
            "CI/CD統合",
            "バッチ分析"
          ]
        ],
        [
          "ベストプラクティス",
          "",
          [
            "AI分析を使用するタイミング",
            "メジャーバージョン更新：メジャーバージョンアップには常にAI分析を使用",
            "セキュリティ敏感パッケージ：認証、暗号化、セッションパッケージに使用",
            "大規模コードベース：AIがモノレポ全体の影響領域を識別するのに役立つ",
            "破壊的変更検出：AIが詳細な破壊的変更の説明を提供",
            "パフォーマンスの考慮事項",
            "AI分析は標準更新と比較して処理時間が追加される",
            "--dry-runを使用して変更を適用せずにAI推奨をプレビュー",
            "AIが重要でない場合、より高速なCI/CDパイプラインにはルールベースのフォールバックを検討",
            "他の機能との組み合わせ"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "ベストプラクティス",
          null,
          [
            "チーム環境、エンタープライズワークフロー、本番システムでPCUを効果的に使用する方法を学びます。 "
          ]
        ],
        [
          "チーム協働",
          "",
          [
            "共有設定",
            ".pcurc.jsonをバージョン管理にコミットして、チームメンバー間でPCU設定の一貫性を保ちます：",
            "コードレビューガイドライン",
            "レビュー前チェックリスト：",
            "pcu check --dry-runを実行して変更をプレビュー",
            "メジャーバージョン更新で破壊的変更がないことを確認",
            "依存関係更新後に重要な機能をテスト",
            "更新されたパッケージのCHANGELOGファイルをレビュー",
            "レビュープロセス：",
            "セキュリティ優先：セキュリティ関連の依存関係更新は常に即座にレビュー",
            "関連更新のバッチ処理：関連パッケージ（Reactエコシステムなど）を単一のPRにまとめる",
            "理由の文書化：バージョンロックや除外の理由を含める",
            "テストカバレッジ：依存関係更新をマージする前に十分なテストを確保",
            "コミュニケーション基準",
            "依存関係を更新する際は明確なコミットメッセージを使用します："
          ]
        ],
        [
          "エンタープライズ利用",
          "",
          [
            "ガバナンスとコンプライアンス",
            "依存関係承認プロセス：",
            "セキュリティスキャン：すべての更新はセキュリティ監査に合格する必要があります",
            "ライセンスコンプライアンス：ライセンスと内部ポリシーの互換性を検証",
            "安定性要件：本番環境ではLTSバージョンを優先",
            "変更管理：確立された変更承認プロセスに従う",
            "エンタープライズ設定：",
            "プライベートリポジトリ統合",
            "プライベートリポジトリを使用するエンタープライズ環境でPCUを設定します：",
            "環境変数：",
            "監査証跡とレポート",
            "依存関係変更の包括的な記録を維持します："
          ]
        ],
        [
          "リリースワークフロー",
          "",
          [
            "セマンティックバージョン統合",
            "依存関係更新をリリースサイクルと整合させます：",
            "プレリリース段階：",
            "リリース準備：",
            "リリース後：",
            "プレリリース環境テスト",
            "本番前検証："
          ]
        ],
        [
          "セキュリティベストプラクティス",
          "",
          [
            "脆弱性管理",
            "PCUの即時対応：",
            "クリティカル/高深刻度：24時間以内に更新",
            "中程度の深刻度：1週間以内に更新",
            "低深刻度：次回定期更新サイクルに含める",
            "依存関係検証",
            "セキュリティ設定：",
            "手動セキュリティレビュー：",
            "初回使用前にすべての新しい依存関係をレビュー",
            "パッケージメンテナーとダウンロード数を監査",
            "パッケージの真正性と署名を検証",
            "依存関係チェーン内の既知のセキュリティ問題をチェック",
            "アクセス制御",
            "トークン管理："
          ]
        ],
        [
          "パフォーマンス最適化",
          "",
          [
            "キャッシュ戦略",
            "ローカル開発：",
            "CI/CD最適化：",
            "大規模モノリポ処理",
            "100+ パッケージ設定：",
            "選択的処理：",
            "ネットワーク最適化",
            "リポジトリ設定："
          ]
        ],
        [
          "エラーハンドリングと復旧",
          "",
          [
            "一般的なエラー解決",
            "ネットワーク問題：",
            "メモリ問題：",
            "バックアップと復旧",
            "メジャー更新前のバックアップ作成：",
            "バージョンロールバック戦略：",
            "監視とアラート",
            "CI/CD統合："
          ]
        ],
        [
          "統合パターン",
          "",
          [
            "IDEとエディタ統合",
            "VS Code設定：",
            "自動化スクリプト",
            "Package.jsonスクリプト：",
            "Gitフック統合："
          ]
        ],
        [
          "クイックリファレンスチェックリスト",
          "",
          [
            "日常ワークフロー",
            "セキュリティ更新チェック：pcu security",
            "古い依存関係レビュー：pcu check --limit 10",
            "パッチバージョン更新：pcu update --target patch",
            "週次ワークフロー",
            "包括的依存関係チェック：pcu check",
            "マイナーバージョン更新：pcu update --target minor --interactive",
            "除外ルールのレビューと更新",
            "チームレビュー用依存関係レポート生成",
            "月次ワークフロー",
            "メジャーバージョン更新レビュー：pcu check --target latest",
            "開発依存関係更新：pcu update --dev",
            "依存関係ライセンスとコンプライアンス監査",
            "PCU設定のレビューと最適化",
            "未使用依存関係のクリーンアップ",
            "リリース前",
            "完全依存関係監査実行：pcu security --comprehensive",
            "バックアップ作成：pcu update --create-backup",
            "プレリリース環境でテスト",
            "依存関係変更を含むリリースノート生成"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "CI/CD Integration",
          null,
          [
            "Integrate PCU into your continuous integration and deployment pipelines. PCU can seamlessly integrate with existing CI/CD workflows, supporting GitHub Actions, GitLab CI, Jenkins, Azure DevOps, and other platforms. "
          ]
        ],
        [
          "GitHub Actions Integration",
          "git-hub-actions-integration",
          [
            "Basic Dependency Check Workflow"
          ]
        ],
        [
          "GitLab CI Integration",
          "git-lab-ci-integration",
          [
            "GitLab CI pipeline for PCU dependency management:"
          ]
        ],
        [
          "Jenkins Pipeline Integration",
          "jenkins-pipeline-integration",
          [
            "Enterprise-grade Jenkins pipeline for dependency management:"
          ]
        ],
        [
          "Azure DevOps Pipeline",
          "azure-dev-ops-pipeline",
          [
            "Azure DevOps pipeline for PCU integration:"
          ]
        ],
        [
          "General CI/CD Best Practices",
          "general-ci-cd-best-practices",
          [
            "Environment Variable Configuration",
            "Configure these environment variables across all CI/CD platforms to optimize PCU behavior:",
            "CI Mode Flag",
            "PCU includes a dedicated --ci flag for seamless integration with CI/CD pipelines:",
            "Key behaviors when --ci flag is enabled:",
            "Non-interactive execution: All prompts are skipped automatically",
            "Sensible defaults: Uses optimal defaults for CI environments",
            "No color output: Automatically disables colored output for better log compatibility",
            "JSON-friendly: Works well with --format json for programmatic parsing",
            "Example GitHub Actions workflow using --ci flag:",
            "Comparison: With vs Without CI Mode",
            "| Scenario | Without --ci | With --ci |\n|----------|----------------|-------------|\n| Missing options | Prompts user interactively | Uses sensible defaults |\n| Output format | Colored tables by default | Plain text, no colors |\n| Error handling | Interactive error messages | Exit codes for automation |\n| Progress display | Animated progress bars | Minimal progress indicators |",
            "Security Considerations",
            "Access Token Management",
            "Ensure secure management of access tokens in CI/CD environments:",
            "Branch Protection Strategy",
            "Configure branch protection to prevent direct pushes to main branch:",
            "Require pull request reviews",
            "Require status checks to pass",
            "Restrict pushes to protected branches",
            "Require signed commits",
            "Troubleshooting",
            "Common CI/CD Issues",
            "Permission Errors",
            "Cache Issues",
            "Network Timeouts",
            "Monitoring and Reporting",
            "Creating Dashboards",
            "Use CI/CD platform native features to create dependency management dashboards:",
            "GitHub Actions: Use Action insights and dependency graphs",
            "GitLab CI: Leverage Security Dashboard and dependency scanning",
            "Jenkins: Configure HTML Publisher plugin",
            "Azure DevOps: Use Dashboards and Analytics",
            "Notification Configuration",
            "Set up appropriate notifications to keep teams informed:"
          ]
        ],
        [
          "Docker Integration",
          "docker-integration",
          [
            "Containerized PCU Workflows",
            "These CI/CD integration examples provide comprehensive automated dependency management solutions, ensuring your projects stay up-to-date and secure."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "コマンドリファレンス",
          null,
          [
            "すべての PCU コマンドとオプションの完全なリファレンス。各コマンド、フラグ、および利用可能な設定オプションについて学びます。"
          ]
        ],
        [
          "コマンド概要",
          "",
          [
            "PCU はいくつかの主要なコマンドを提供し、完全名と便利な短縮形の両方があります：",
            "| 完全コマンド    | 短縮形とエイリアス                        | 説明                                   |\n| --------------- | ----------------------------------------- | -------------------------------------- |\n| pcu init      | pcu i                                   | PNPM ワークスペースと PCU 設定を初期化 |\n| pcu check     | pcu chk, pcu -c, pcu --check        | 古いカタログ依存関係をチェック         |\n| pcu update    | pcu u, pcu -u, pcu --update         | カタログ依存関係を更新                 |\n| pcu analyze   | pcu a, pcu -a, pcu --analyze        | 依存関係更新の影響を分析               |\n| pcu workspace | pcu w, pcu -s, pcu --workspace-info | ワークスペース情報と検証を表示         |\n| pcu theme     | pcu t, pcu -t, pcu --theme          | カラーテーマと UI 設定を構成           |\n| pcu security  | pcu sec                                 | セキュリティ脆弱性スキャンと修復       |\n| pcu ai        | -                                         | AIプロバイダー管理と分析テスト         |\n| pcu rollback  | -                                         | カタログ更新を以前の状態にロールバック |\n| pcu help      | pcu h, pcu -h                         | ヘルプ情報を表示                       |",
            "特別なショートカット",
            "| ショートカット         | 等価コマンド               | 説明                                           |\n| ---------------------- | -------------------------- | ---------------------------------------------- |\n| pcu -i               | pcu update --interactive | インタラクティブ更新モード                     |\n| pcu --security-audit | pcu security             | セキュリティスキャンを実行                     |\n| pcu --security-fix   | pcu security --fix-vulns | セキュリティスキャンを実行し、脆弱性を自動修復 |"
          ]
        ],
        [
          "ハイブリッドモード",
          "",
          [
            "PCU にはハイブリッドモード機能があります - フラグなしでコマンドを実行すると、自動的にインタラクティブモードに入り、各オプションを案内します。これにより、フラグを使用して自動化したり、フラグを省略してガイド付きプロンプトを受けたりできるシームレスな体験を提供します。",
            "動作の仕組み",
            "サポートされているコマンド",
            "ハイブリッドモードは 11 個すべての主要コマンドで利用可能です：",
            "| コマンド       | インタラクティブオプション                               |\n| -------------- | -------------------------------------------------------- |\n| pcu check    | フォーマット、ターゲット、カタログ、フィルターパターン、プレリリース |\n| pcu update   | カタログ、フォーマット、ターゲット、インタラクティブ、ドライラン、強制、バックアップ、プレリリース、AI |\n| pcu analyze  | カタログ選択、パッケージ名、ターゲットバージョン         |\n| pcu workspace| フォーマット、検証、統計                                 |\n| pcu theme    | テーマ選択、プログレススタイル、プレビュー               |\n| pcu security | フォーマット、重大度フィルター、修復オプション、開発依存関係 |\n| pcu init     | テンプレート、フレームワークオプション、ワークスペース作成 |\n| pcu ai       | プロバイダーステータス、テスト、キャッシュ操作           |\n| pcu rollback | バックアップ選択、確認                                   |",
            "メリット",
            "初心者に優しい：新しいユーザーはドキュメントを読まずにオプションを探索できます",
            "自動化対応：スクリプトと CI/CD はフラグを使用して予測可能な動作を実現できます",
            "発見しやすい：インタラクティブプロンプトで利用可能なオプションを発見できます",
            "柔軟性：コマンドごとに好みのワークフローを選択できます"
          ]
        ],
        [
          "pcu init - ワークスペースの初期化",
          "pcu-init",
          [
            "完全な PNPM ワークスペース環境と PCU 設定を初期化します。",
            "オプション",
            "確認なしで既存の設定ファイルを上書き",
            "利用可能なすべてのオプションを含む包括的な設定を生成",
            "ガイド付きセットアップを提供するインタラクティブ設定ウィザードを起動",
            "設定テンプレート：minimal、standard、full、monorepo、enterprise",
            "PNPM ワークスペース構造が存在しない場合は作成",
            "PNPM ワークスペース構造の作成をスキップ",
            "ワークスペースパッケージのディレクトリ名",
            "設定に一般的なパッケージルールを含める",
            "TypeScript 固有のパッケージルールと設定を追加",
            "React エコシステムのパッケージルールを追加",
            "Vue エコシステムのパッケージルールを追加",
            "出力形式：table、json、yaml、minimal",
            "ワークスペースディレクトリ（デフォルト：現在のディレクトリ）",
            "詳細な情報と進行状況を表示",
            "設定テンプレート",
            "PCU は一般的なプロジェクトタイプ用の事前設定されたテンプレートを提供します：",
            "テンプレートタイプ",
            "minimal - 基本設定のみを含むシンプルな設定",
            "standard - ほとんどのプロジェクトに適したバランスの取れた設定",
            "full - 利用可能なすべてのオプションを含む包括的な設定",
            "monorepo - 高度な機能を持つ大規模モノレポ用に最適化",
            "enterprise - セキュリティとガバナンス機能を持つエンタープライズ級",
            "インタラクティブ設定ウィザード",
            "インタラクティブモード（--interactive）はガイド付きセットアップ体験を提供します：",
            "ウィザード機能",
            "プロジェクト検出：プロジェクトタイプ（React、Vue、TypeScript）を自動検出",
            "ワークスペース構造：既存パッケージを発見し、最適な設定を提案",
            "パッケージルール設定：パッケージルールと更新戦略をインタラクティブに選択",
            "レジストリ設定：カスタム NPM レジストリと認証を設定",
            "パフォーマンス調整：プロジェクトサイズと要件に基づいて設定を最適化",
            "テーマ選択：カラーテーマとプログレスバースタイルを選択",
            "検証設定：品質ゲートとセキュリティチェックを設定",
            "作成されるファイルとディレクトリ",
            "コアファイル",
            "すべての PCU 設定を含むメイン設定ファイル",
            "ワークスペースルート package.json（存在しない場合は作成）",
            "PNPM ワークスペース設定（存在しない場合は作成）",
            "ディレクトリ構造",
            "ワークスペースパッケージのデフォルトディレクトリ（カスタマイズ可能）",
            "monorepo テンプレート用に作成 - アプリケーションパッケージ",
            "monorepo テンプレート用に作成 - 開発ツール",
            "enterprise テンプレート用に作成 - ドキュメント",
            "テンプレート固有ファイル",
            "Node バージョン仕様（enterprise テンプレート）",
            "PCU 固有のパターンで拡張（存在しない場合）",
            "TypeScript 設定（--typescript フラグ使用時）",
            "使用例",
            "クイックスタート",
            "自動プロジェクト検出を使用した標準テンプレートで初期化。",
            "インタラクティブセットアップ",
            "ガイド付きセットアップを提供する完全な設定ウィザードを起動。",
            "モノレポ初期化",
            "TypeScript サポートと詳細出力でエンタープライズ級モノレポを作成。"
          ]
        ],
        [
          "pcu check - 更新をチェック",
          "pcu-check",
          [
            "pnpm ワークスペースカタログ内の古い依存関係をチェックします。",
            "オプション",
            "特定のカタログのみをチェック",
            "出力形式：table、json、yaml、minimal",
            "更新ターゲット：latest、greatest、minor、patch、newest",
            "プレリリースバージョンを含める",
            "パターンに一致するパッケージを含める",
            "パターンに一致するパッケージを除外",
            "出力形式",
            "table：色付きで詳細情報を含む豊富なテーブル形式",
            "minimal：シンプルな npm-check-updates スタイル（package → version）",
            "json：プログラム的使用のための JSON 出力",
            "yaml：設定ファイル用の YAML 出力"
          ]
        ],
        [
          "pcu update - 依存関係を更新",
          "pcu-update",
          [
            "カタログ依存関係を新しいバージョンに更新します。",
            "オプション",
            "更新を選択するためのインタラクティブモード",
            "ファイルに書き込まずに変更をプレビュー",
            "更新ターゲット：latest、greatest、minor、patch、newest",
            "特定のカタログのみを更新",
            "リスクがあっても強制的に更新",
            "更新前にバックアップファイルを作成",
            "パターンに一致するパッケージを含める（複数回使用可能）",
            "パターンに一致するパッケージを除外（複数回使用可能）",
            "更新にプレリリースバージョンを含める",
            "出力形式：table、json、yaml、minimal",
            "並列処理するパッケージ数",
            "ピア依存関係の競合があるパッケージをスキップ",
            "メジャーバージョン更新には確認が必要",
            "インタラクティブ機能",
            "インタラクティブモード（--interactive または -i）は高度なパッケージ選択機能を提供します：",
            "パッケージ選択インターフェース",
            "マルチセレクト：チェックボックスを使用して個別のパッケージ更新を選択",
            "検索機能：名前または説明でパッケージをフィルタリング",
            "バッチ操作：複数のパッケージを選択/選択解除",
            "更新戦略選択：各パッケージに対して更新戦略を選択（latest、greatest、minor、patch）",
            "インテリジェント競合解決",
            "ピア依存関係検出：解決提案を提供",
            "破壊的変更警告：セマンティックバージョニング分析に基づく",
            "影響分析：影響を受けるワークスペースパッケージを表示",
            "ロールバック機能：更新で問題が生じた場合にロールバック可能",
            "高度な更新戦略",
            "使用例",
            "安全なインタラクティブ更新",
            "インタラクティブに依存関係を更新し、自動バックアップ、マイナーバージョン増分のみ。",
            "本番環境安全更新",
            "メジャーバージョン更新の確認が必要な本番依存関係で更新される内容を表示。",
            "フレームワーク固有更新",
            "TypeScript 定義を含む React エコシステムパッケージを更新し、プレリリースバージョンを許可。"
          ]
        ],
        [
          "pcu analyze - 影響分析",
          "pcu-analyze",
          [
            "特定の依存関係を更新する影響を分析します。",
            "引数",
            "カタログ名（例：'default'、'react17'）",
            "パッケージ名（例：'react'、'@types/node'）",
            "新しいバージョン（オプション、デフォルトは最新）"
          ]
        ],
        [
          "pcu workspace - ワークスペース情報",
          "pcu-workspace",
          [
            "ワークスペース情報と検証を表示します。",
            "オプション",
            "ワークスペース設定を検証",
            "ワークスペース統計情報を表示"
          ]
        ],
        [
          "pcu security - セキュリティ脆弱性スキャン",
          "pcu-security",
          [
            "npm audit とオプションの Snyk 統合を使用した包括的なセキュリティ脆弱性スキャンで、自動修復機能付き。",
            "オプション",
            "npm audit スキャンを実行（デフォルトで有効）",
            "npm audit fix を使用して脆弱性を自動修復",
            "重要度でフィルタリング：low, moderate, high, critical",
            "スキャンに開発依存関係を含める",
            "Snyk セキュリティスキャンを含める（snyk CLI のインストールが必要）",
            "確認なしでセキュリティ修正を自動適用",
            "出力形式：table, json, yaml, minimal",
            "ワークスペースディレクトリパス（デフォルトは現在のディレクトリ）",
            "詳細な脆弱性情報と修復手順を表示",
            "セキュリティレポート機能",
            "セキュリティコマンドは包括的な脆弱性分析を提供します：",
            "マルチスキャナー統合：npm audit と Snyk を組み合わせて包括的なカバレッジ",
            "重要度分類：脆弱性を critical、high、moderate、low、info に分類",
            "自動修復：--fix-vulns を使用してセキュリティパッチを自動適用",
            "パッケージ推奨：脆弱性を解決するための特定のバージョン更新を推奨",
            "開発依存関係：開発依存関係を含めるか除外するかを選択可能",
            "CWE/CVE 情報：詳細な脆弱性識別子と説明",
            "終了コード：適切なコードを返す（0 でクリーン、1 で脆弱性発見）",
            "CI/CD 対応：自動化のための JSON 出力と非インタラクティブモード",
            "使用例",
            "基本脆弱性スキャン",
            "npm audit を使用した標準セキュリティスキャンを実行し、フォーマットされたテーブルで結果を表示。",
            "自動修復スキャン",
            "脆弱性をスキャンし、利用可能なセキュリティ修正を自動適用。",
            "高重要度フィルタリング",
            "高重要度と重要な重要度の脆弱性のみを表示し、低優先度の問題をフィルタリング。",
            "Snyk を使用した包括的なスキャン",
            "npm audit と Snyk スキャンを実行し、開発依存関係を含め、詳細な脆弱性情報を表示。",
            "CI/CD パイプライン統合",
            "CI/CD パイプラインでの自動化処理のために、重要なセキュリティ脆弱性を JSON 形式でエクスポート。",
            "本番環境自動修復",
            "本番依存関係での中等度以上の重要度の脆弱性を自動修復。",
            "セキュリティワークフロー統合",
            "デプロイ前セキュリティチェック",
            "自動化セキュリティメンテナンス"
          ]
        ],
        [
          "pcu theme - テーマ設定",
          "pcu-theme",
          [
            "カラーテーマと UI 外観を設定します。",
            "オプション",
            "カラーテーマを設定：default, modern, minimal, neon",
            "利用可能なすべてのテーマを一覧表示",
            "ガイド付きセットアップを提供するインタラクティブテーマ設定ウィザードを起動",
            "利用可能なテーマ",
            "default - 一般的な使用に適したバランスの取れた色",
            "modern - 開発環境用の鮮やかな色",
            "minimal - 本番環境用のクリーンなスタイル",
            "neon - プレゼンテーション用の高コントラスト色",
            "使用例",
            "利用可能なテーマを一覧表示",
            "すべての利用可能なテーマとその説明を表示。",
            "テーマを直接設定",
            "指定されたテーマを直接設定。",
            "インタラクティブテーマ設定",
            "テーマをプレビューし、UI 設定をインタラクティブに設定できるガイド付きテーマ選択ウィザードを起動。"
          ]
        ],
        [
          "pcu ai - AIプロバイダー管理",
          "pcu-ai-ai",
          [
            "AIプロバイダーのステータスを確認し、AI分析キャッシュを管理します。",
            "オプション",
            "すべてのAIプロバイダーのステータスを表示（デフォルト動作）",
            "サンプルリクエストでAI分析をテスト",
            "AI分析キャッシュの統計を表示",
            "AI分析キャッシュをクリア",
            "プロバイダー検出",
            "コマンドは利用可能なAIプロバイダーを自動的に検出します：",
            "| プロバイダー | 優先度 | 検出方法       |\n| ------------ | ------ | -------------- |\n| Claude       | 100    | claude CLI   |\n| Gemini       | 80     | gemini CLI   |\n| Codex        | 60     | codex CLI    |",
            "使用例"
          ]
        ],
        [
          "pcu rollback - バックアップロールバック",
          "pcu-rollback",
          [
            "更新時に作成されたバックアップファイルを使用して、カタログ更新を以前の状態にロールバックします。",
            "オプション",
            "タイムスタンプ付きで利用可能なすべてのバックアップファイルを一覧表示",
            "最新のバックアップに自動的にロールバック",
            "復元するバックアップをインタラクティブに選択",
            "すべてのバックアップファイルを削除（確認が必要）",
            "ワークスペースディレクトリのパス（デフォルト：現在のディレクトリ）",
            "ロールバック中に詳細情報を表示",
            "バックアップシステム",
            "PCU は update コマンドで --create-backup フラグを使用すると、自動的にバックアップファイルを作成します：",
            "バックアップファイルはタイムスタンプ付きで保存され、更新前の pnpm-workspace.yaml の元の状態を含みます。",
            "使用例",
            "利用可能なバックアップの一覧",
            "作成日時とファイルサイズとともにすべてのバックアップファイルを表示します。",
            "最新のバックアップにロールバック",
            "確認なしで最新のバックアップを自動的に復元します。",
            "インタラクティブなバックアップ選択",
            "復元するバックアップを選択するためのインタラクティブプロンプトを開きます。",
            "古いバックアップのクリーンアップ",
            "確認プロンプトと詳細出力でバックアップファイルをすべて削除します。"
          ]
        ],
        [
          "インタラクティブ機能と進行状況追跡",
          "",
          [
            "PCU はすべてのコマンドで高度なインタラクティブ機能と洗練された進行状況追跡を提供します。",
            "インタラクティブコマンドインターフェース",
            "パッケージ選択システム",
            "インテリジェントマルチセレクト：視覚的なチェックボックスとキーボードショートカットで特定のパッケージを選択",
            "検索とフィルタリング：パターンマッチングとファジー検索をサポートするリアルタイムパッケージフィルタリング",
            "バッチ操作：カテゴリベースの選択により、グループ全体を選択/選択解除",
            "影響プレビュー：更新を適用する前に潜在的な変更を確認",
            "設定ウィザード",
            "インタラクティブ設定ウィザード（pcu init --interactive）は以下を提供します：",
            "ワークスペース検出：既存の PNPM ワークスペースを自動発見",
            "テンプレート選択：最小限と完全な設定テンプレートから選択",
            "パッケージルール設定：異なるパッケージカテゴリのルールを設定（React、Vue、TypeScript）",
            "レジストリ設定：カスタム NPM レジストリと認証を設定",
            "検証設定：品質ゲートとセキュリティチェックを設定",
            "カタログとファイルブラウザー",
            "ワークスペースナビゲーション：ワークスペース選択用の内蔵ファイルシステムブラウザー",
            "パス検証：ワークスペースパスと構造のリアルタイム検証",
            "プレビューモード：選択を確認する前にワークスペース内容を確認",
            "高度な進行状況追跡",
            "複数スタイルプログレスバー",
            "PCU は、コマンドごとまたはグローバルに設定可能な6つの異なるプログレスバースタイルを提供します：",
            "進行状況機能",
            "マルチステップ追跡：異なるフェーズの進行状況を表示（スキャン → 分析 → 更新）",
            "並列操作状態：並行操作のための個別プログレスバー",
            "パフォーマンスメトリクス：リアルタイム速度インジケーター、推定時間、経過時間",
            "メモリセーフ表示：端末の点滅を減らす安定したマルチライン出力",
            "バッチ処理状態",
            "キュー管理：保留中、アクティブ、完了したパッケージ操作を表示",
            "競合解決：ピア依存関係の競合をインタラクティブに処理",
            "エラー回復：失敗した操作のスキップ/再試行オプションと詳細なエラーコンテキスト",
            "ロールバック機能：更新中に問題が検出された場合、変更を元に戻すことが可能",
            "エラー処理と回復",
            "インテリジェントエラー検出",
            "検証エラー：一般的なエラーの事前チェックと有用な提案",
            "ネットワーク問題：レジストリ障害に対する指数バックオフ自動再試行",
            "依存関係競合：詳細な競合分析と解決提案",
            "権限問題：ファイルシステム権限問題の明確なガイダンス",
            "インタラクティブ回復オプション",
            "スキップして続行：問題のあるパッケージをスキップして残りの更新を続行",
            "オプション付き再試行：異なるパラメータで失敗した操作を再試行",
            "変更をロールバック：バッチ操作中に問題が発生した場合、部分的な変更を元に戻す",
            "エラーレポートのエクスポート：トラブルシューティング用の詳細なエラーレポートを生成",
            "ワークスペース統合",
            "自動発見機能",
            "PNPM ワークスペース検出：ワークスペース設定を自動的に検索・検証",
            "カタログ発見：既存のカタログとそのパッケージマッピングを検出",
            "パッケージ分析：ワークスペース構造と依存関係を分析",
            "設定継承：ワークスペース固有の設定を自動適用",
            "検証とヘルスチェック",
            "構造検証：ワークスペースが PNPM ベストプラクティスに従っているかを確認",
            "依存関係一貫性：パッケージ間のバージョン不整合をチェック",
            "設定整合性：ワークスペース構造に対して PCU 設定を検証",
            "ヘルスメトリクス：包括的なワークスペースヘルス評価を提供",
            "使用例",
            "高度な機能を持つインタラクティブ更新",
            "豪華なプログレスバーと最適化されたバッチ処理でインタラクティブ更新を起動。",
            "プレビュー付き設定",
            "プレビューモードと詳細ログで設定ウィザードを実行。",
            "エラー回復ワークフロー",
            "インタラクティブエラー回復、自動バックアップ、メジャーバージョン確認を含む更新。"
          ]
        ],
        [
          "グローバルオプション",
          "",
          [
            "これらのオプションはすべてのコマンドに適用され、環境変数で設定可能です：",
            "ワークスペースディレクトリパス",
            "詳細ログと詳細出力を有効にする",
            "CI/CD 環境でのカラー出力を無効にする",
            "NPM レジストリ URL を上書き",
            "リクエストタイムアウト（ミリ秒、デフォルト：30000）",
            "カスタム設定ファイルへのパス",
            "バージョン番号を出力し、更新をチェック",
            "コマンドヘルプを表示",
            "環境変数の使用",
            "すべてのグローバルオプションは環境変数で設定可能です：",
            "環境変数詳細設定",
            "コア環境変数",
            "デフォルトワークスペースディレクトリパス",
            "詳細ログをグローバルに有効",
            "カラー出力を無効（CI/CD に有用）",
            "デフォルト NPM レジストリ URL",
            "リクエストタイムアウト（ミリ秒）",
            "カスタム設定ファイルパス",
            "コマンド固有環境変数",
            "チェック/更新操作のデフォルトカタログ",
            "デフォルト出力形式：table、json、yaml、minimal",
            "デフォルト更新ターゲット：latest、greatest、minor、patch、newest",
            "デフォルトでプレリリースバージョンを含める",
            "デフォルトパッケージ含有パターン",
            "デフォルトパッケージ除外パターン",
            "デフォルトでインタラクティブモードを有効",
            "デフォルトでドライランモードを有効",
            "確認なしで強制更新",
            "更新前にバックアップファイルを作成",
            "テーマと表示環境変数",
            "デフォルトカラーテーマ：default、modern、minimal、neon",
            "プログレスバースタイル：default、gradient、fancy、minimal、rainbow、neon",
            "環境プリセット：development、production、presentation",
            "セキュリティとキャッシュ環境変数",
            "デフォルトセキュリティ重要度フィルター：low、moderate、high、critical",
            "脆弱性を自動修復",
            "キャッシュシステムを有効/無効",
            "キャッシュ生存時間（ミリ秒）",
            "カスタムキャッシュディレクトリパス",
            "高度な設定環境変数",
            "並列ネットワークリクエスト数",
            "バッチ処理のパッケージ数",
            "失敗した操作の再試行回数",
            "起動時に PCU CLI 更新をチェック",
            "環境変数例",
            "設定優先度",
            "設定は以下の順序で適用されます（後者が前者を上書き）：",
            "内蔵デフォルト値",
            "グローバル設定（~/.pcurc.json）",
            "プロジェクト設定（.pcurc.json）",
            "環境変数（PCU_*）",
            "コマンドラインフラグ（最高優先度）"
          ]
        ],
        [
          "自動更新システム",
          "",
          [
            "PCU には、CLI ツールを最新の機能とセキュリティパッチで最新に保つ洗練された自動更新メカニズムが含まれています。",
            "自動更新チェック",
            "デフォルトでは、PCU は任意のコマンドを実行する際に更新をチェックします：",
            "更新動作",
            "CI/CD 環境検出",
            "PCU は CI/CD 環境を自動検出し、自動化パイプラインの中断を避けるために更新チェックをスキップします：",
            "GitHub Actions：GITHUB_ACTIONS 環境変数で検出",
            "CircleCI：CIRCLECI 環境変数で検出",
            "Jenkins：JENKINS_URL 環境変数で検出",
            "GitLab CI：GITLAB_CI 環境変数で検出",
            "Azure DevOps：TF_BUILD 環境変数で検出",
            "一般的な CI：CI 環境変数で検出",
            "更新インストール",
            "PCU は複数のパッケージマネージャをサポートし、自動フォールバック機能付き：",
            "設定オプション",
            "環境変数",
            "バージョンチェックと更新通知を完全に無効",
            "更新チェック間隔時間数（デフォルト：24）",
            "プロンプトなしで更新を自動インストール（慎重に使用）",
            "更新チェックリクエストタイムアウトミリ秒数（デフォルト：5000）",
            "設定ファイル設定",
            "更新通知",
            "標準通知",
            "セキュリティ更新通知",
            "プレリリース通知",
            "手動更新コマンド",
            "更新トラブルシューティング",
            "更新チェック失敗",
            "キャッシュクリア",
            "権限問題"
          ]
        ],
        [
          "キャッシュ管理システム",
          "",
          [
            "PCU にはパフォーマンスを最適化し、ネットワークリクエストを削減する包括的なキャッシュシステムが含まれています。",
            "キャッシュタイプ",
            "レジストリキャッシュ",
            "NPM パッケージメタデータとバージョン情報を保存：",
            "デフォルト TTL：1時間（3,600,000ミリ秒）",
            "最大サイズ：キャッシュタイプごとに10MB",
            "最大エントリ数：500パッケージ",
            "ディスク永続化：有効",
            "ワークスペースキャッシュ",
            "ワークスペース設定と package.json 解析結果を保存：",
            "デフォルト TTL：5分（300,000ミリ秒）",
            "最大サイズ：5MB",
            "最大エントリ数：200ワークスペース",
            "ディスク永続化：無効（メモリのみ）",
            "キャッシュ設定",
            "環境変数",
            "キャッシュシステム全体を有効/無効",
            "デフォルトキャッシュ TTL（ミリ秒）",
            "最大総キャッシュサイズバイト数（デフォルト50MB）",
            "最大キャッシュエントリ数",
            "カスタムキャッシュディレクトリパス",
            "キャッシュのディスク永続化を有効",
            "設定ファイル設定",
            "キャッシュ管理コマンド",
            "キャッシュパフォーマンス",
            "最適化機能",
            "LRU 退避：最も使用されていないアイテムが最初に削除",
            "自動クリーンアップ：期限切れエントリが5分ごとにクリーンアップ",
            "サイズ監視：サイズ制限を超えた場合の自動退避",
            "並列処理：キャッシュ操作はメインスレッドをブロックしない",
            "パフォーマンス利点",
            "レジストリリクエスト：NPM レジストリ呼び出しが60-90%削減",
            "ワークスペース解決：繰り返し実行時のワークスペース分析が80-95%高速化",
            "ネットワーク依存：ネットワーク接続への依存を削減",
            "起動時間：後続操作の起動時間が2-5倍高速化"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "設定",
          null,
          [
            "PCUをワークフローとプロジェクトのニーズに合わせて設定します。設定ファイル、パッケージ固有のルール、高度な設定について学習します。"
          ]
        ],
        [
          "設定ファイルタイプ",
          "",
          [
            "PCUは様々な開発ワークフローに対応するため、複数の設定ファイル形式と場所をサポートしています。",
            "サポートされる設定ファイル",
            "PCUは以下の順序で設定ファイルを検索します（最初に見つかったものが有効）：",
            "プロジェクトルートのメインJSON設定ファイル",
            "動的設定をサポートするJavaScript設定ファイル",
            "代替のJavaScript設定ファイル名",
            "ホームディレクトリのグローバルユーザー設定",
            "package.jsonの\"pcu\"キー下の設定",
            "JavaScript設定サポート",
            "JavaScript設定ファイルは、環境、ワークスペース構造、その他のランタイム条件に基づく動的設定をサポートします：",
            "Package.json設定",
            "シンプルなプロジェクトの場合、設定をpackage.jsonに埋め込むことができます：",
            "設定の検証",
            "PCUは設定ファイルを自動的に検証し、一般的な問題に対して詳細なエラーメッセージを提供します：",
            "検証機能",
            "JSONスキーマ検証：すべての設定プロパティが有効であることを確保",
            "パターン検証：ワイルドカードパターンとパッケージ名形式を検証",
            "型チェック：すべての設定値の正しいデータ型を検証",
            "競合検出：競合するルールと設定オプションを識別",
            "提案システム：設定エラーの修正に役立つ提案を提供",
            "検証例"
          ]
        ],
        [
          "パッケージフィルタリング",
          "",
          [
            "包含/除外パターンとパッケージ固有のルールを使用して、更新するパッケージを制御します。",
            "パッケージルール属性",
            "パッケージ名をマッチするワイルドカードパターン",
            "更新ターゲット：latest、greatest、minor、patch、newest",
            "これらのパッケージを更新する前に常に確認する",
            "確認なしで自動更新",
            "同じ更新戦略に従うパッケージ",
            "関連パッケージをまとめて更新"
          ]
        ],
        [
          "セキュリティ設定",
          "",
          [
            "セキュリティ脆弱性スキャンと自動修復を設定します。",
            "セキュリティ脆弱性を自動でチェックして修復",
            "セキュリティ修復のためのメジャーバージョンアップグレードを許可",
            "セキュリティ更新時に通知を表示"
          ]
        ],
        [
          "高度な設定",
          "",
          [
            "高度な設定オプションでパフォーマンスと動作を微調整します。",
            "同時ネットワークリクエスト数",
            "ネットワークリクエストタイムアウト（ミリ秒）",
            "失敗時のリトライ回数",
            "キャッシュ有効期限（0でキャッシュ無効）",
            "起動時にPCUツールの更新を自動チェック。CI環境ではスキップされます。新しいバージョンがある場合、更新通知とインストール手順が表示されます。"
          ]
        ],
        [
          "UI設定",
          "ui",
          [
            "視覚的外観とユーザーインターフェース設定をカスタマイズします。",
            "利用可能なテーマ",
            "default - 汎用使用のバランス取れた色",
            "modern - 開発環境用の活気ある色",
            "minimal - プロダクション環境用の簡潔なスタイル",
            "neon - デモ用の高コントラスト色",
            "プログレスバースタイル",
            "PCUは操作中の視覚的フィードバック向上のため、6つの異なるプログレスバースタイルをサポートしています：",
            "default - 基本スタイルの標準プログレスバー",
            "gradient - モダンな外観のグラデーション色プログレスバー",
            "fancy - 装飾要素付きの拡張プログレスバー",
            "minimal - 簡潔なプログレス表示",
            "rainbow - 活気ある表示のカラフルプログレスバー",
            "neon - ネオンテーマに合う高コントラストプログレスバー",
            "設定例：",
            "コマンドライン使用："
          ]
        ],
        [
          "設定優先度",
          "",
          [
            "設定設定は以下の優先順位で適用されます：",
            "コマンドラインフラグ（最高優先度）",
            ".pcurc.jsonのパッケージ固有ルール",
            ".pcurc.jsonの一般設定",
            "デフォルト値（最低優先度）",
            "関連パッケージは自動的に親パッケージルールの設定を継承し、エコシステムパッケージ間のバージョン一貫性を保証します。"
          ]
        ],
        [
          "例",
          "",
          [
            "Reactエコシステム",
            "TypeScriptプロジェクト",
            "エンタープライズ設定"
          ]
        ],
        [
          "環境変数",
          "",
          [
            "すべてのCLIオプションは自動化とCI/CD環境に適応するため、環境変数で設定可能です：",
            "環境変数優先度",
            "設定ソースは以下の順序で読み込まれます（後者が前者を上書き）：",
            "内蔵デフォルト値（最低優先度）",
            "グローバル設定（~/.pcurc.json）",
            "プロジェクト設定（.pcurc.json）",
            "環境変数（PCU_*）",
            "コマンドラインフラグ（最高優先度）"
          ]
        ],
        [
          "レジストリ設定",
          "",
          [
            "PCUは自動的にNPMとPNPM設定ファイルのレジストリ設定を読み取ります：",
            "レジストリ優先度",
            "CLI --registryフラグ（最高優先度）",
            "PCU設定（.pcurc.jsonレジストリセクション）",
            "プロジェクト.npmrc/.pnpmrc",
            "グローバル.npmrc/.pnpmrc",
            "デフォルトNPMレジストリ（最低優先度）"
          ]
        ],
        [
          "拡張キャッシュ設定",
          "",
          [
            "PCUはパフォーマンス向上のための先進的なキャッシュシステムを含んでいます：",
            "キャッシュ設定",
            "キャッシュシステムを有効/無効にする",
            "Time To Live（ミリ秒）（デフォルト1時間）",
            "最大キャッシュサイズ（バイト）（デフォルト50MB）",
            "最大キャッシュエントリ数",
            "実行間でキャッシュをディスクに保存",
            "永続キャッシュ保存ディレクトリ",
            "キャッシュ削除戦略：lru、fifo、lfu"
          ]
        ],
        [
          "検証設定",
          "",
          [
            "PCUは有用な提案付きの包括的な検証を含んでいます：",
            "検証オプション",
            "追加チェック付きの厳密検証モードを有効にする",
            "潜在的にリスクのある更新に警告を表示",
            "確認が必要な更新タイプ：major、minor、patch",
            "有用な提案とヒントを有効にする",
            "パフォーマンス最適化提案を含める",
            "ベストプラクティス提案を含める"
          ]
        ],
        [
          "インタラクティブモード設定",
          "",
          [
            "インタラクティブプロンプトとユーザーエクスペリエンスを設定します：",
            "インタラクティブ設定",
            "インタラクティブモード機能を有効にする",
            "リストの1ページあたりの表示項目数",
            "選択リストでパッケージ説明を表示",
            "更新のリリースノートを表示（ネットワークが必要）",
            "パッケージ名の自動補完を有効にする",
            "自動補完のファジーマッチングを有効にする",
            "メジャーバージョン更新に確認が必要"
          ]
        ],
        [
          "Monorepo設定",
          "monorepo",
          [
            "PCUは大規模monorepoと複雑なワークスペース管理のために特別に設計された高度な機能を提供します。",
            "バージョン同期",
            "monorepo内で関連パッケージの同期を保ちます：",
            "高度なワークスペース管理",
            "カタログ優先度システム",
            "競合が発生した場合にどのカタログが優先されるかを定義します：",
            "クロスワークスペース依存関係",
            "ワークスペースパッケージ間の依存関係を分析・管理します：",
            "クロスワークスペース依存関係を分析",
            "バージョン不一致の処理方法：error、warn、off",
            "どのワークスペースパッケージからも使用されていないカタログ内のパッケージを報告",
            "すべてのワークスペースパッケージがカタログバージョンを使用していることを検証",
            "Monorepo固有パッケージルール",
            "monorepoの異なる領域に対して複雑なルールを作成します：",
            "ワークスペース固有設定",
            "monorepoの異なる部分に対して異なる設定を使用します：",
            "大規模Monorepoのパフォーマンス最適化",
            "バッチ処理設定",
            "バッチごとに処理するパッケージ数",
            "最大同時操作数",
            "実行間でワークスペースパッケージ発見をキャッシュ",
            "複数カタログを並列処理",
            "メモリ管理",
            "Monorepo検証",
            "複雑なワークスペース設定のための包括的検証：",
            "検証ルール",
            "内部依存関係がworkspace:プロトコルを使用することを確保",
            "すべての依存関係がカタログでカバーされていることを確保",
            "すべてのワークスペースパッケージが共有依存関係に同じバージョンを使用することを要求",
            "ワークスペースパッケージ間の循環依存関係を検出",
            "Monorepo使用例",
            "大規模エンタープライズMonorepo設定",
            "CI/CD最適化設定"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "開発",
          null,
          [
            "PCUを開発用にセットアップし、プロジェクトへの貢献方法を学びます。このガイドでは、プロジェクトのセットアップ、アーキテクチャ、および開発ワークフローを説明します。"
          ]
        ],
        [
          "前提条件",
          "",
          [
            "PCUの開発を開始する前に、必要なツールがあることを確認してください：",
            "開発にはNode.js >= 22.0.0およびpnpm >= 10.0.0が必要です。"
          ]
        ],
        [
          "プロジェクトセットアップ",
          "",
          [
            "リポジトリをクローンして開発環境をセットアップします："
          ]
        ],
        [
          "プロジェクトアーキテクチャ",
          "",
          [
            "PCUは明確な関心の分離を持つクリーンアーキテクチャの原則に従っています：",
            "アーキテクチャ層",
            "ユーザーインターフェース、コマンド解析、出力フォーマット",
            "ビジネスロジックのオーケストレーション、ユースケース",
            "コアビジネスエンティティ、値オブジェクト、リポジトリインターフェース",
            "外部APIクライアント、ファイルシステムアクセス、リポジトリ実装",
            "共有ユーティリティ、設定、ログ、エラーハンドリング"
          ]
        ],
        [
          "開発ワークフロー",
          "",
          [
            "変更を行う",
            "フィーチャーブランチを作成：",
            "コーディング標準に従って変更を行う",
            "変更にテストを追加：",
            "品質チェックが通ることを確認：",
            "変更をコミット：",
            "テスト戦略",
            "PCUは包括的なテストアプローチを使用しています：",
            "コード品質",
            "PCUは高いコード品質標準を維持しています："
          ]
        ],
        [
          "機能の追加",
          "",
          [
            "新しいコマンドの作成",
            "apps/cli/src/cli/commands/にコマンドハンドラーを作成：",
            "packages/core/src/application/services/にビジネスロジックを追加",
            "CLIとコアロジックのテストを作成",
            "ドキュメントを更新",
            "新しい出力フォーマットの追加",
            "apps/cli/src/cli/formatters/にフォーマッターを作成：",
            "メインフォーマッターレジストリにフォーマッターを登録",
            "テストを追加し、ドキュメントを更新"
          ]
        ],
        [
          "貢献ガイド",
          "",
          [
            "コミットメッセージ規約",
            "PCUはConventional Commitsを使用しています：",
            "プルリクエスト手順",
            "リポジトリをフォークしてフィーチャーブランチを作成",
            "開発ワークフローに従って変更を行う",
            "すべてのテストが通過し、コード品質チェックが成功することを確認",
            "必要に応じてドキュメントを更新",
            "プルリクエストを提出する際に含める内容：",
            "変更の明確な説明",
            "関連する課題へのリンク",
            "UI変更のスクリーンショット",
            "該当する場合の破壊的変更の説明",
            "コードレビューチェックリスト",
            "すべてのテストが通過",
            "コードカバレッジが維持されている（>85%）",
            "TypeScript型が正しい",
            "コードスタイルがプロジェクト標準に従っている",
            "ドキュメントが更新されている",
            "破壊的変更が文書化されている",
            "パフォーマンスへの影響が考慮されている"
          ]
        ],
        [
          "デバッグ",
          "",
          [
            "開発デバッグ",
            "テストデバッグ"
          ]
        ],
        [
          "ビルドとリリース",
          "",
          [
            "ローカルテスト",
            "リリースプロセス",
            "apps/cli/CHANGELOG.md の ## Unreleased にリリースノートを追加します。",
            "ビルドとテスト：",
            "GitHub Actions の Release ワークフローを実行します（メンテナーのみ）：",
            "patch、minor、major：CLI バージョンを更新し、release 用のコミットとタグを作成し、pcu と pnpm-catalog-updates を公開し、GitHub Release まで 1 回で実行します",
            "current：リポジトリにすでにコミット済みのバージョンをそのまま公開します",
            "dry_run: true：公開せずにフローだけ検証します"
          ]
        ],
        [
          "ヘルプの取得",
          "",
          [
            "📖 ドキュメント：詳細なガイドについてはこのドキュメントを参照",
            "🐛 課題：GitHub Issuesでバグを報告",
            "💬 ディスカッション：GitHub Discussionsで質問",
            "🔧 開発：IssuesやPRの開発ディスカッションに参加"
          ]
        ],
        [
          "高度なアーキテクチャ詳細",
          "",
          [
            "コアドメインモデル",
            "ドメイン駆動設計（DDD）原則に基づき、PCUのコアドメインには以下が含まれます：",
            "サービス層アーキテクチャ",
            "アプリケーション層はサービスを通じてビジネスロジックを編成します：",
            "CLI層設計",
            "CLI層はコアドメインにクリーンなインターフェースを提供します：",
            "テストアーキテクチャ",
            "全層にわたる包括的なテスト戦略：",
            "パフォーマンス考慮事項",
            "PCUは大規模なmonorepoに対してパフォーマンスが最適化されています："
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "例",
          null,
          [
            "PCUを最大限に活用するための実際の例とユースケース。シンプルな更新から複雑なmonorepo管理まで。"
          ]
        ],
        [
          "初心者完全ガイド",
          "",
          [
            "第一歩：プロジェクト設定の確認",
            "PCUを使い始める前に、プロジェクト構造を確認しましょう：",
            "まだpnpmワークスペースがない場合、PCUが作成をお手伝いします：",
            "第二歩：初回の依存関係チェック",
            "プロジェクトでどの依存関係が更新可能かを確認しましょう：",
            "第三歩：初回のセキュリティ更新",
            "セキュリティは常に最優先です。まずセキュリティ問題を処理しましょう：",
            "第四歩：初回の依存関係更新",
            "では、いくつかの依存関係を安全に更新しましょう。保守的な方法から始めます：",
            "第五歩：更新結果の検証",
            "更新後、すべてが正常であることを確認しましょう：",
            "よくある初心者のミスと回避方法",
            "ミス1：バックアップなしで更新",
            "❌ 間違った方法：",
            "✅ 正しい方法：",
            "ミス2：直接メジャーバージョン更新",
            "❌ 間違った方法：",
            "✅ 正しい方法：",
            "ミス3：セキュリティスキャンの無視",
            "❌ 間違った方法：",
            "✅ 正しい方法：",
            "初心者フレンドリーなワークフロー",
            "このシンプルな日常習慣を身につけましょう：",
            "実際のシナリオ：初回プロジェクト",
            "初心者の田中さんの初回PCU体験を追ってみましょう：",
            "これで田中さんのプロジェクトは最新で安全になりました！彼が学んだこと：",
            "✅ 常に最初にセキュリティ問題をチェックして修正",
            "✅ インタラクティブモードを使って更新を慎重に選択",
            "✅ 問題に備えてバックアップを常に作成",
            "✅ 更新後のワークスペース状態を検証"
          ]
        ],
        [
          "基本ワークフロー",
          "",
          [
            "日常的な依存関係チェック",
            "日常的な開発ルーチンの一部として更新をチェック：",
            "バックアップ付きの安全な更新",
            "自動バックアップで依存関係を安全に更新：",
            "ターゲット指定更新",
            "特定タイプの変更のみを更新："
          ]
        ],
        [
          "マルチカタログワークスペース",
          "",
          [
            "レガシーサポートシナリオ",
            "一つのワークスペースで複数のReactバージョンを管理：",
            "パッケージ使用"
          ]
        ],
        [
          "設定例",
          "",
          [
            "React エコシステム管理",
            "Reactと関連パッケージの協調更新：",
            "TypeScript プロジェクト設定",
            "保守的なTypeScript更新と自動型定義：",
            "企業設定",
            "厳格な管理を持つ企業レベル設定："
          ]
        ],
        [
          "CI/CD 統合",
          "ci-cd",
          [
            "GitHub Actions",
            "CI パイプラインで依存関係チェックを自動化："
          ]
        ],
        [
          "エラーハンドリングとトラブルシューティング",
          "",
          [
            "ネットワーク問題",
            "ネットワーク問題とレジストリアクセスの処理：",
            "ワークスペース検証",
            "ワークスペース設定を検証：",
            "プライベートレジストリ",
            "PCU は .npmrc と .pnpmrc 設定を自動的に読み取ります："
          ]
        ],
        [
          "高度なユースケース",
          "",
          [
            "影響分析",
            "特定パッケージ更新の影響を分析：",
            "選択的更新",
            "特定のパッケージやパターンのみを更新：",
            "ドライラン分析",
            "適用前に変更をプレビュー："
          ]
        ],
        [
          "ベストプラクティス",
          "",
          [
            "日常ワークフロー",
            "朝のチェック：pcu -c で利用可能な更新を確認",
            "影響レビュー：重要な更新には pcu -a を使用",
            "安全な更新：バックアップ付きインタラクティブ更新 pcu -i -b を使用",
            "テスト：更新後にテストスイートを実行",
            "コミット：依存関係更新を個別にコミット",
            "チームワークフロー",
            "設定共有：.pcurc.json をバージョン管理にコミット",
            "定期レビュー：週次依存関係レビューミーティングをスケジュール",
            "セキュリティ優先：セキュリティ更新を常に優先",
            "文書化：主要な依存関係決定を文書化",
            "ロールバック計画：簡単なロールバックのためにバックアップを保持",
            "リリースワークフロー",
            "プレリリースチェック：リリース前に pcu -c --target patch",
            "セキュリティスキャン：CI で autoFixVulnerabilities を有効化",
            "バージョン固定：本番リリースでは正確なバージョンを使用",
            "更新計画：リリース間で依存関係更新を計画"
          ]
        ],
        [
          "セキュリティモニタリング",
          "",
          [
            "継続的セキュリティスキャン",
            "開発ワークフローにセキュリティスキャンを統合：",
            "セキュリティ指向の CI/CD"
          ]
        ],
        [
          "テーマカスタマイズ",
          "",
          [
            "インタラクティブテーマ設定",
            "チーム用PCUの外観を設定：",
            "チームテーマ設定"
          ]
        ],
        [
          "パフォーマンス最適化",
          "",
          [
            "大規模 Monorepo 設定",
            "数百のパッケージを含む大規模ワークスペース用の最適化設定：",
            "並列処理戦略"
          ]
        ],
        [
          "移行例",
          "",
          [
            "npm-check-updates からの移行",
            "ncu から PCU への移行：",
            "レガシー依存関係管理からの移行",
            "既存プロジェクトを pnpm カタログシステムに移行："
          ]
        ],
        [
          "移行ガイド",
          "",
          [
            "npm/yarn ワークスペースからの移行",
            "完全な移行プロセス：",
            "段階的採用戦略"
          ]
        ],
        [
          "CI/CD ワークフロー統合",
          "ci-cd-2",
          [
            "マルチ環境デプロイメント",
            "異なる環境向けの完全な CI/CD ワークフロー："
          ]
        ],
        [
          "企業ワークフロー",
          "",
          [
            "コンプライアンスと監査",
            "企業レベルのコンプライアンスワークフロー：",
            "マルチチーム協力",
            "企業セキュリティポリシー",
            "リリース管理",
            "企業レベルのリリースパイプライン統合："
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "よくある質問",
          null,
          [
            "PCUに関するよくある質問への迅速な回答。お探しの内容が見つかりませんか？トラブルシューティングガイドをご覧いただくか、問題を提出してください。"
          ]
        ],
        [
          "インストールとセットアップ",
          "",
          [
            "PCUをインストールする方法は？",
            "PCUはnpm、pnpm、またはyarnを使用してグローバルにインストールできます：",
            "システム要件は何ですか？",
            "Node.js: >= 18.0.0（LTSバージョン推奨）",
            "pnpm: >= 8.0.0",
            "オペレーティングシステム: Windows、macOS、Linux",
            "PCUを使用するためにpnpmワークスペースが必要ですか？",
            "はい、PCUはカタログ依存関係を使用するpnpmワークスペース専用に設計されています。まだワークスペースがない場合は、pcu initを実行して作成してください。",
            "npmやyarnプロジェクトでPCUを使用できますか？",
            "いいえ、PCUはカタログ依存関係を使用するpnpmワークスペース専用です。他のパッケージマネージャーについては、npm-check-updatesやyarn upgrade-interactiveなどのツールの使用をご検討ください。"
          ]
        ],
        [
          "設定",
          "",
          [
            ".pcurc.json設定ファイルはどこに配置すべきですか？",
            "ワークスペースのルートディレクトリ（pnpm-workspace.yamlと同じレベル）に配置してください。PCUは以下もサポートしています：",
            "グローバル設定：~/.pcurc.json",
            "プロジェクト設定：./.pcurc.json（最高優先度）",
            "ワークスペースレベルとグローバル設定の違いは何ですか？",
            "グローバル（~/.pcurc.json）：異なるプロジェクト間のすべてのPCU操作に適用",
            "プロジェクト（./.pcurc.json）：現在のワークスペース固有で、グローバル設定を上書き",
            "異なるパッケージに異なる更新戦略を設定できますか？",
            "はい！設定でパッケージルールを使用してください："
          ]
        ],
        [
          "コマンドと使用法",
          "",
          [
            "pcu checkとpcu -cの違いは何ですか？",
            "完全に同じです！PCUは完全なコマンド名と短縮エイリアスの両方をサポートしています：",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "特定のタイプのパッケージのみを更新するには？",
            "--includeと--excludeフラグを使用してください：",
            "更新ターゲット間の違いは何ですか？",
            "patch：バグ修正のみ（1.0.0 → 1.0.1）",
            "minor：新機能、後方互換性あり（1.0.0 → 1.1.0）",
            "latest：最新安定版、破壊的変更を含む（1.0.0 → 2.0.0）",
            "greatest：プレリリースを含む最新版（1.0.0 → 2.0.0-beta.1）",
            "実際に更新する前に何が更新されるかを確認するには？",
            "--dry-runフラグを使用してください：",
            "これにより、変更を加えることなく、正確に何が更新されるかが表示されます。"
          ]
        ],
        [
          "トラブルシューティング",
          "",
          [
            "なぜPCUが「pnpmワークスペースが見つかりません」と言うのですか？",
            "これは、PCUが現在のディレクトリでpnpm-workspace.yamlファイルを見つけられないことを意味します。解決策：",
            "ワークスペースを作成：pcu initを実行",
            "ワークスペースルートに移動：pnpm-workspace.yamlを含むディレクトリにcd",
            "ワークスペースパスを指定：pcu -c --workspace /path/to/workspace",
            "なぜPCUが「カタログ依存関係が見つかりません」と言うのですか？",
            "ワークスペースがまだカタログ依存関係を使用していません。以下が必要です：",
            "ワークスペースファイル内のカタログ：",
            "パッケージ内でカタログを使用：",
            "PCUの動作が非常に遅いです。パフォーマンスを改善するには？",
            "以下の最適化を試してください：",
            "並行性を減らす：pcu check --concurrency 2",
            "タイムアウトを増やす：pcu check --timeout 60000",
            "キャッシュを有効にする：PCU_CACHE_ENABLED=true（デフォルト）を確認",
            "フィルタリングを使用：特定のパッケージにpcu check --include \"react*\"",
            "\"ENOTFOUND registry.npmjs.org\"エラーを修正するには？",
            "これはネットワーク接続の問題です：",
            "ネットワーク接続を確認：ping registry.npmjs.org",
            "プロキシを設定：HTTP_PROXYとHTTPS_PROXY環境変数を設定",
            "企業レジストリを使用：.npmrcで会社のレジストリを設定",
            "タイムアウトを増やす：PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "セキュリティ",
          "",
          [
            "PCUはセキュリティ脆弱性をどのように処理しますか？",
            "PCUはnpm auditとオプションのSnykを統合しています：",
            "すべてのセキュリティ脆弱性を自動修正すべきですか？",
            "--auto-fixを使用する際は注意してください：",
            "✅ 安全：セキュリティ修正のパッチおよびマイナーバージョン更新",
            "⚠️ 要レビュー：アプリケーションを破壊する可能性のあるメジャーバージョン更新",
            "❌ 回避：本番環境でテストなしの盲目的な自動修正",
            "偽陽性のセキュリティ警告を処理するには？",
            ".pcurc.jsonで無視する脆弱性を設定してください："
          ]
        ],
        [
          "ワークフローとCI/CD",
          "ci-cd",
          [
            "CI/CDパイプラインでPCUを使用できますか？",
            "もちろんです！PCUは自動化用に設計されています：",
            "完全な例については、CI/CD統合ガイドをご覧ください。",
            "自動化された依存関係更新PRを作成するには？",
            "PCUをGitHub Actions、GitLab CI、または他のプラットフォームと組み合わせて使用してください：",
            "完全なワークフローについては、CI/CD統合ガイドをご覧ください。",
            "チームコラボレーションの最適なワークフローは何ですか？",
            "設定を共有：.pcurc.jsonをバージョン管理にコミット",
            "定期レビュー：週次の依存関係レビューミーティングをスケジュール",
            "セキュリティを優先：常にセキュリティ更新を優先",
            "段階的更新：大きなバッチよりも小さく頻繁な更新を優先",
            "テスト：更新後は常にテストしてからマージ"
          ]
        ],
        [
          "高度な使用法",
          "",
          [
            "一つのワークスペースで複数のカタログを使用できますか？",
            "はい！pnpmは複数のカタログをサポートしています：",
            "その後、パッケージで使用してください：",
            "特定のパッケージを更新することの影響を分析するには？",
            "analyzeコマンドを使用してください：",
            "特定のパッケージの更新を永続的に除外できますか？",
            "はい、.pcurc.jsonで除外項目を設定してください：",
            "100+パッケージを持つmonorepoを処理するには？",
            "大規模monorepoのパフォーマンスのヒント：",
            "バッチ処理：高度な設定でbatchSize: 10を設定",
            "並行性を減らす：レジストリを圧倒しないようconcurrency: 2を設定",
            "フィルタリングを使用：--includeパターンを使用してパッケージをグループで処理",
            "キャッシュを有効にする：キャッシュが有効で正しく設定されていることを確認",
            "メモリを増やす：NODE_OPTIONS=\"--max-old-space-size=8192\"を設定"
          ]
        ],
        [
          "エラーメッセージ",
          "",
          [
            "「ピア依存関係を解決できません」",
            "これはパッケージバージョンが競合している際に発生します。解決策：",
            "関連パッケージを一緒に更新：pcu update --include \"react*\"",
            "インタラクティブモードを使用：pcu update --interactiveで慎重にバージョンを選択",
            "ピア依存関係をチェック：各パッケージの要件を確認",
            "複数カタログを使用：競合するバージョンを異なるカタログに分離",
            "「.pcurc.jsonの設定が無効です」",
            "設定ファイルにJSON構文エラーがあります：",
            "「コマンドが見つかりません：pcu」",
            "インストールまたはPATHの問題：",
            "グローバルに再インストール：npm install -g pcu",
            "PATHをチェック：npmグローバルbinがPATHに含まれていることを確認",
            "npxを使用：代替としてnpx pnpm-catalog-updates check",
            "pnpmを使用：pnpm add -g pnpm-catalog-updates（推奨）"
          ]
        ],
        [
          "統合とツール",
          "",
          [
            "PCUはRenovateやDependabotと互換性がありますか？",
            "PCUはこれらのツールの代替品であり、補完品ではありません：",
            "PCU：手動制御、pnpm特化、カタログに特化",
            "Renovate：自動化PR、複数パッケージマネージャーサポート",
            "Dependabot：GitHub統合、自動セキュリティ更新",
            "ワークフローの好みに応じて選択してください。移行については、移行ガイドをご覧ください。",
            "PCUをIDEと統合できますか？",
            "公式IDEエクステンションはありませんが、以下が可能です：",
            "npmスクリプトを追加：package.jsonでコマンドを設定",
            "タスクランナーを使用：VS Codeタスクや類似ツールと統合",
            "ターミナル統合：ほとんどのIDEはターミナル統合をサポート",
            "PCUはプライベートnpmレジストリをサポートしますか？",
            "はい！PCUは.npmrc設定を読み取ります：",
            "PCUは各パッケージスコープに対して自動的に正しいレジストリを使用します。"
          ]
        ],
        [
          "まだ質問がありますか？",
          "",
          [
            "📖 ドキュメント：包括的なコマンドリファレンスをご覧ください",
            "🛠️ トラブルシューティング：トラブルシューティングガイドをご覧ください",
            "🐛 バグ報告：イシューを作成",
            "💬 ディスカッション：GitHubディスカッション"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "マイグレーションガイド",
          null,
          [
            "既存の依存関係管理ソリューションから PCU への移行方法を学び、チームが pnpm カタログ依存関係への移行をサポートします。"
          ]
        ],
        [
          "マイグレーション概要",
          "",
          [
            "PCU はカタログ依存関係を使用する pnpm ワークスペース専用に設計されています。現在他のツールやパッケージマネージャーを使用している場合、このガイドがスムーズな移行を支援します。",
            "開始前に",
            "PCU の前提条件：",
            "パッケージマネージャーとしての pnpm（バージョン 8.0.0+）",
            "ワークスペース設定（pnpm-workspace.yaml）",
            "ワークスペース内のカタログ依存関係",
            "マイグレーション決定マトリクス：",
            "| 現在のツール             | マイグレーション複雑度 | メリット                               | 考慮事項                         |\n| ------------------------ | ---------------------- | -------------------------------------- | -------------------------------- |\n| npm-check-updates        | 低                     | より良い pnpm 統合、カタログサポート   | pnpm ワークスペース設定が必要    |\n| 手動更新                 | 低                     | 自動化、一貫性、セキュリティスキャン   | 初期設定作業                     |\n| Renovate                 | 中                     | 手動制御、ワークスペース固有機能       | 自動化の喪失                     |\n| Dependabot               | 中                     | 強化されたカタログ管理                 | GitHub 固有機能                  |\n| yarn upgrade-interactive | 高                     | カタログの利点、より良いパフォーマンス | 完全なパッケージマネージャー変更 |"
          ]
        ],
        [
          "npm-check-updates からの移行",
          "npm-check-updates",
          [
            "現在の設定分析",
            "現在 npm-check-updates (ncu) を使用している場合、以下のようなスクリプトがあるかもしれません：",
            "マイグレーション手順",
            "1. pnpm をインストールしてワークスペースを設定",
            "2. カタログ依存関係に変換",
            "pnpm-workspace.yaml でカタログエントリを作成：",
            "3. パッケージファイルを更新",
            "package.json ファイルをカタログ参照を使用するように変換：",
            "4. PCU をインストールして設定",
            "5. スクリプトを更新",
            "ncu スクリプトを PCU の同等コマンドに置き換え：",
            "設定マイグレーション",
            "ncu 設定 → PCU 設定："
          ]
        ],
        [
          "Renovate からの移行",
          "renovate",
          [
            "違いの理解",
            "Renovate vs PCU：",
            "Renovate：自動 PR 作成、多言語サポート、幅広い設定",
            "PCU：手動制御、pnpm 専用、カタログ重視、セキュリティ統合",
            "マイグレーション戦略",
            "1. Renovate 設定をエクスポート",
            "現在の renovate.json を分析：",
            "2. PCU 設定に変換",
            "Renovate ルールを PCU の同等機能にマッピング：",
            "3. 手動ワークフローを設定",
            "自動 PR を予定された手動レビューに置き換え：",
            "4. チーム移行",
            "フェーズ 1：並行実行（2週間）",
            "Renovate を有効にしたまま",
            "手動チェック用に PCU を導入",
            "チームに PCU コマンドを訓練",
            "フェーズ 2：PCU 主導（2週間）",
            "Renovate PR 作成を無効化",
            "すべての更新に PCU を使用",
            "レビュープロセスを確立",
            "フェーズ 3：完全移行",
            "Renovate 設定を削除",
            "PCU 設定を最適化",
            "新しいワークフローを文書化",
            "Renovate 機能マッピング",
            "| Renovate 機能    | PCU 同等機能         | 備考                         |\n| ---------------- | -------------------- | ---------------------------- |\n| 自動 PR          | 手動 pcu update    | より多くの制御、少ないノイズ |\n| スケジューリング | Cron ジョブ + PCU    | 柔軟なタイミング             |\n| グループ更新     | --include パターン | 関連パッケージをグループ化   |\n| 自動マージ       | autoUpdate: true   | セキュリティパッケージに限定 |\n| 脆弱性アラート   | pcu security       | 統合スキャン                 |\n| 設定プリセット   | パッケージルール     | 再利用可能なパターン         |"
          ]
        ],
        [
          "Dependabot からの移行",
          "dependabot",
          [
            "GitHub 統合の考慮事項",
            "複製すべき Dependabot の利点：",
            "セキュリティ脆弱性アラート",
            "自動セキュリティ更新",
            "GitHub 統合",
            "PR 作成と管理",
            "マイグレーション方法",
            "1. 現在の Dependabot 設定を監査",
            ".github/dependabot.yml をレビュー：",
            "2. GitHub Actions で PCU を設定",
            ".github/workflows/dependencies.yml を作成：",
            "3. セキュリティ統合",
            "Dependabot のセキュリティ機能を置き換え：",
            "4. 手動レビュープロセス",
            "人間中心のワークフローを確立："
          ]
        ],
        [
          "手動依存関係管理からの移行",
          "",
          [
            "評価フェーズ",
            "現在の状態分析：",
            "頻度：どのくらいの頻度で依存関係を更新しますか？",
            "プロセス：現在の更新ワークフローは何ですか？",
            "テスト：更新をどのように検証しますか？",
            "セキュリティ：脆弱性をどのように処理しますか？",
            "一般的な手動パターン：",
            "構造化移行",
            "フェーズ 1：評価（第1週）",
            "フェーズ 2：カタログ変換（第2週）",
            "フェーズ 3：プロセス統合（第3-4週）",
            "自動化戦略",
            "段階的自動化：",
            "手動開始：すべての更新に確認が必要",
            "半自動化：開発依存関係とタイプを自動更新",
            "インテリジェント自動化：パッチを自動、マイナーを確認",
            "フル自動化：メジャー以外のすべてを自動更新",
            "設定の進化："
          ]
        ],
        [
          "非 pnpm プロジェクトの変換",
          "pnpm",
          [
            "npm プロジェクトから",
            "1. 依存関係分析",
            "2. pnpm マイグレーション",
            "3. カタログ抽出",
            "Yarn プロジェクトから",
            "1. ワークスペース変換",
            "2. マイグレーションコマンド",
            "モノレポ変換",
            "大規模モノレポ戦略："
          ]
        ],
        [
          "チーム移行戦略",
          "",
          [
            "変更管理",
            "1. コミュニケーション計画",
            "第 -2 週：移行計画を発表",
            "第 -1 週：トレーニングセッションと文書",
            "第 0 週：並行実行開始",
            "第 2 週：完全移行",
            "第 4 週：プロセス最適化",
            "2. トレーニングプログラム",
            "開発者トレーニングセッション（1時間）：",
            "チームリーダートレーニング（2時間）：",
            "設定管理",
            "セキュリティポリシー統合",
            "パフォーマンス最適化",
            "監視とレポート",
            "ロールアウト戦略",
            "パイロットプロジェクトアプローチ：",
            "パイロットプロジェクトを選択：代表的だが重要でないプロジェクトを選択",
            "パイロットを移行：パイロットチームと移行を完了",
            "教訓を学ぶ：問題と解決策を文書化",
            "スケールアウト：他のプロジェクトに学んだことを適用",
            "リスク軽減：",
            "プロセス統合",
            "コードレビュー統合：",
            "リリース統合："
          ]
        ],
        [
          "検証とテスト",
          "",
          [
            "マイグレーション検証",
            "1. 機能テスト",
            "2. パフォーマンス比較",
            "3. 依存関係整合性",
            "成功指標",
            "主要パフォーマンス指標：",
            "インストール速度：pnpm install vs npm install",
            "更新頻度：移行前後の月次更新回数",
            "セキュリティ応答：脆弱性修正時間",
            "開発者満足度：チーム調査結果",
            "ビルドパフォーマンス：CI/CD 実行時間",
            "監視ダッシュボード："
          ]
        ],
        [
          "マイグレーションチェックリスト",
          "",
          [
            "移行前",
            "現在の依存関係管理アプローチを評価",
            "隔離環境で pnpm をインストールしてテスト",
            "ワークスペース構造を計画",
            "カタログの共通依存関係を特定",
            "現在の設定をバックアップ",
            "コアチームメンバーをトレーニング",
            "移行段階",
            "pnpm ワークスペース構造に変換",
            "依存関係をカタログに抽出",
            "カタログ参照を使用するように package.json ファイルを更新",
            "PCU をインストールして設定",
            "パイロットプロジェクトで機能をテスト",
            "CI/CD パイプラインを更新",
            "新しいプロセスを文書化",
            "移行後",
            "すべての機能が正常に動作することを検証",
            "残りのチームメンバーをトレーニング",
            "PCU 設定を最適化",
            "定期メンテナンススケジュールを確立",
            "成功指標を監視・測定",
            "フィードバックを収集して反復",
            "トラブルシューティング",
            "一般的な移行問題を文書化",
            "ロールバック手順を作成",
            "サポートチャンネルを確立",
            "定期的なヘルスチェックと最適化"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "パフォーマンス最適化",
          null,
          [
            "大規模モノレポ、複雑なワークスペース、リソース制約のある環境で PCU パフォーマンスを最大化します。"
          ]
        ],
        [
          "PCU パフォーマンスの理解",
          "pcu",
          [
            "PCU パフォーマンスは以下の要因に依存します：",
            "ネットワーク遅延：レジストリ応答時間と帯域幅",
            "ワークスペースサイズ：パッケージと依存関係の数",
            "キャッシュ効率：ヒット率とストレージ最適化",
            "システムリソース：CPU、メモリ、ディスク I/O",
            "設定：並行性設定とタイムアウト値",
            "パフォーマンス分析",
            "詳細なパフォーマンス監視を有効にします：",
            "出力分析例："
          ]
        ],
        [
          "設定最適化",
          "",
          [
            "並行性設定",
            "環境に最適化された並行操作：",
            "並行性ガイドライン：",
            "小規模プロジェクト（< 20パッケージ）：concurrency: 5-8",
            "中規模プロジェクト（20-100パッケージ）：concurrency: 3-5",
            "大規模プロジェクト（100+パッケージ）：concurrency: 1-3",
            "CI/CD 環境：concurrency: 2-3",
            "メモリ管理",
            "Node.js メモリ最適化：",
            "PCU メモリ設定："
          ]
        ],
        [
          "キャッシュ戦略",
          "",
          [
            "ローカルキャッシュ最適化",
            "キャッシュ設定：",
            "環境変数：",
            "キャッシュ管理コマンド",
            "CI/CD キャッシュ統合"
          ]
        ],
        [
          "ネットワーク最適化",
          "",
          [
            "レジストリ設定",
            "レジストリ選択の最適化：",
            "接続最適化：",
            "帯域幅管理"
          ]
        ],
        [
          "大規模モノレポ戦略",
          "",
          [
            "ワークスペース分割",
            "大規模ワークスペースの整理：",
            "選択的処理：",
            "増分処理",
            "段階的更新：",
            "処理ワークフロー："
          ]
        ],
        [
          "メモリとリソース管理",
          "",
          [
            "メモリ分析",
            "メモリ使用量の監視：",
            "メモリ最適化技術：",
            "ディスク I/O 最適化",
            "SSD vs HDD 設定：",
            "ファイルシステムキャッシュ："
          ]
        ],
        [
          "パフォーマンス監視",
          "",
          [
            "メトリクス収集",
            "内蔵メトリクス：",
            "カスタム監視：",
            "ベンチマーク",
            "パフォーマンスベンチマーク：",
            "パフォーマンスチューニングガイド",
            "段階的最適化：",
            "ベースライン測定",
            "キャッシュを有効化",
            "並行性を最適化",
            "ネットワーク最適化",
            "メモリチューニング"
          ]
        ],
        [
          "パフォーマンス問題のトラブルシューティング",
          "",
          [
            "一般的なパフォーマンス問題",
            "低速ネットワークリクエスト：",
            "メモリ問題：",
            "キャッシュ問題：",
            "パフォーマンス回帰検出",
            "自動パフォーマンステスト："
          ]
        ],
        [
          "環境固有の最適化",
          "",
          [
            "ローカル開発",
            "開発マシン設定：",
            "CI/CD 環境",
            "異なる CI プロバイダーの最適化：",
            "本番デプロイメント",
            "本番レベル設定："
          ]
        ],
        [
          "パフォーマンスチェックリスト",
          "",
          [
            "クイック改善",
            "永続キャッシュを有効化：export PCU_CACHE_ENABLED=true",
            "環境に合わせて並行性を最適化",
            "地理的に近いレジストリを使用",
            "大規模プロジェクト用に Node.js ヒープサイズを増加",
            "リクエスト圧縮とキープアライブを有効化",
            "高度な最適化",
            "CI/CD キャッシュ戦略を実装",
            "大規模モノレポ用にワークスペース分割を設定",
            "パフォーマンス監視とアラートを設定",
            "継続運用のためのメモリ管理を最適化",
            "増分処理ワークフローを実装",
            "監視とメンテナンス",
            "定期的なパフォーマンスベンチマーク",
            "キャッシュ正常性監視",
            "ネットワーク遅延測定",
            "メモリ使用量分析",
            "パフォーマンス回帰検出"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "クイックスタート",
          null,
          [
            "数分で pnpm-catalog-updates を使い始めましょう。このガイドでは、インストール、初期化、最初の依存関係更新を順を追って説明します。",
            "pnpm-catalog-updates は、カタログ依存関係を使用する pnpm\nワークスペース専用に設計されています。開始前に pnpm\nワークスペースが設定されていることを確認してください。"
          ]
        ],
        [
          "インストール",
          "",
          [
            "お好みのインストール方法を選択してください："
          ]
        ],
        [
          "ワークスペースの初期化",
          "",
          [
            "まだ pnpm ワークスペースがない場合、PCU が作成できます：",
            "このコマンドで作成されるもの：",
            ".pcurc.json - PCU 設定ファイル",
            "package.json - ワークスペースルート package.json（存在しない場合）",
            "pnpm-workspace.yaml - PNPM ワークスペース設定（存在しない場合）",
            "packages/ - ワークスペースパッケージディレクトリ（存在しない場合）"
          ]
        ],
        [
          "初回更新チェック",
          "",
          [
            "古いカタログ依存関係をチェック：",
            "これは以下を含む美しいテーブルを表示します：",
            "カタログ内の現在のバージョン",
            "利用可能な最新バージョン",
            "パッケージ名と更新タイプ",
            "緊急度を示すカラーコード"
          ]
        ],
        [
          "インタラクティブ更新",
          "",
          [
            "インタラクティブインターフェースで依存関係を更新：",
            "これにより以下が可能です：",
            "✅ 更新する依存関係を選択",
            "🎯 特定のバージョンを選択",
            "📊 影響分析を表示",
            "🔒 自動バックアップ作成"
          ]
        ],
        [
          "一般的なコマンド",
          "",
          [
            "最もよく使用されるコマンド：",
            "| コマンド   | 説明                 | 例                         |\n| ---------- | -------------------- | -------------------------- |\n| pcu init | ワークスペース初期化 | pcu init --verbose       |\n| pcu -c   | 更新チェック         | pcu -c --catalog default |\n| pcu -i   | インタラクティブ更新 | pcu -i -b                |\n| pcu -u   | 依存関係更新         | pcu -u --target minor    |\n| pcu -a   | 影響分析             | pcu -a default react     |"
          ]
        ],
        [
          "次のステップ",
          "",
          []
        ],
        [
          "開始チェックリスト",
          "",
          [
            "このチェックリストに従ってプロジェクトで PCU を稼働させましょう：",
            "PCU をインストール - グローバルインストールまたは npx を選択",
            "ワークスペースを初期化 - 初回セットアップで pcu init を実行",
            "更新をチェック - pcu -c で利用可能な更新を表示",
            "設定を構成 - 必要に応じて .pcurc.json をカスタマイズ",
            "依存関係を更新 - 安全な更新のためインタラクティブモード pcu -i を使用",
            "自動化をセットアップ - 定期的なチェックのため CI/CD 統合を検討"
          ]
        ],
        [
          "基本コマンドクイックリファレンス",
          "",
          [
            "| コマンド       | 目的                 | いつ使用するか           |\n| -------------- | -------------------- | ------------------------ |\n| pcu init     | ワークスペース設定   | 初回設定、新プロジェクト |\n| pcu -c       | 更新チェック         | 日常開発、CI チェック    |\n| pcu -i       | インタラクティブ更新 | 安全な手動更新           |\n| pcu -u       | バッチ更新           | 自動更新、CI/CD          |\n| pcu security | セキュリティスキャン | リリース前、定期監査     |"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "PCU をセットアップしたら、これらの高度な機能を探索しましょう：",
            "設定 - 特定のワークフローに合わせて PCU をカスタマイズ",
            "セキュリティスキャン - 脆弱性スキャンを統合",
            "Monorepo 管理 - 高度なワークスペース機能",
            "CI/CD 統合 - パイプラインで依存関係更新を自動化"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "トラブルシューティング",
          null,
          [
            "PCU の問題を解決するための一般的な問題と解決策。よくあるエラーの答えとデバッグのコツを見つけます。"
          ]
        ],
        [
          "一般的なエラー",
          "",
          [
            "ワークスペースが見つからない",
            "エラーメッセージ：",
            "原因： PCU が pnpm-workspace.yaml ファイルを見つけられないか、有効な pnpm ワークスペース構造を検出できません。",
            "解決策：",
            "カタログ依存関係がない",
            "エラーメッセージ：",
            "原因： あなたのワークスペースで pnpm カタログ依存関係が使用されていません。",
            "解決策：",
            "レジストリアクセス問題",
            "エラーメッセージ：",
            "原因： ネットワーク接続問題またはレジストリアクセス問題。",
            "解決策：",
            "認証エラー",
            "エラーメッセージ：",
            "原因： プライベートレジストリの認証トークンが欠落または無効です。",
            "解決策：",
            "設定ファイルエラー",
            "エラーメッセージ：",
            "原因： JSON フォーマットエラーまたは無効な設定オプション。",
            "解決策："
          ]
        ],
        [
          "デバッグ",
          "",
          [
            "詳細ログの有効化",
            "ワークスペースの検証"
          ]
        ],
        [
          "パフォーマンス問題",
          "",
          [
            "ネットワークリクエストが遅い",
            "症状： PCU の更新チェックに時間がかかりすぎる",
            "解決策：",
            "メモリ使用量が多い",
            "症状： PCU が大規模ワークスペースで過度にメモリを消費する",
            "解決策："
          ]
        ],
        [
          "環境問題",
          "",
          [
            "Node.js バージョン互換性",
            "エラーメッセージ：",
            "解決策：",
            "pnpm バージョン問題",
            "エラーメッセージ：",
            "解決策："
          ]
        ],
        [
          "Windows 固有の問題",
          "windows",
          [
            "パス区切り文字の問題",
            "エラーメッセージ：",
            "解決策：",
            "権限エラー",
            "エラーメッセージ：",
            "解決策："
          ]
        ],
        [
          "ヘルプの取得",
          "",
          [
            "診断情報",
            "問題を報告する際は、この診断情報を含めてください：",
            "サポートチャンネル",
            "🐛 バグ報告：GitHub Issues",
            "💬 質問：GitHub Discussions",
            "📖 ドキュメント：詳細なガイドについてはこのドキュメントを参照",
            "🔧 機能リクエスト：拡張ラベル付きの GitHub Issues を使用",
            "問題テンプレート",
            "バグを報告する際は、以下を含めてください：",
            "PCU バージョンと使用したコマンド",
            "エラーメッセージ（--verbose での完全出力）",
            "環境（OS、Node.js、pnpm バージョン）",
            "ワークスペース構造（pnpm-workspace.yaml、package.json）",
            "設定（関連する場合は .pcurc.json、.npmrc）",
            "問題を再現する手順",
            "期待される動作と実際の動作"
          ]
        ],
        [
          "高度なトラブルシューティング",
          "",
          [
            "複雑な依存関係の競合",
            "エラーシナリオ：",
            "症状： 更新後にバージョン競合が発生し、アプリケーションが起動しない",
            "完全な診断プロセス：",
            "CI/CD 環境の障害",
            "エラーシナリオ：",
            "症状： CI/CD で PCU が失敗するが、ローカルでは正常に動作する",
            "解決策：",
            "大規模 monorepo のパフォーマンス問題",
            "エラーシナリオ：",
            "症状： 100+ パッケージを含む monorepo で PCU がクラッシュする",
            "最適化案：",
            "プライベートレジストリ認証問題",
            "エラーシナリオ：",
            "症状： プライベートパッケージにアクセスできないが、パブリックパッケージは正常に動作する",
            "完全解決フロー：",
            "セキュリティスキャンの誤検出処理",
            "エラーシナリオ：",
            "症状： セキュリティスキャンで脆弱性が報告されるが、実際にはプロジェクトに影響しない",
            "処理戦略：",
            "ネットワーク環境のトラブルシューティング",
            "エラーシナリオ：",
            "症状： 企業ネットワーク環境で頻繁なタイムアウト、プロキシ問題",
            "解決策：",
            "バージョン制約の競合",
            "エラーシナリオ：",
            "症状： ワークスペース内のパッケージのバージョン要件が競合する",
            "解決戦略："
          ]
        ],
        [
          "復旧手順",
          "",
          [
            "更新失敗のロールバック",
            "更新が問題を引き起こした場合の完全復旧フロー：",
            "破損キャッシュの修復",
            "PCU キャッシュが破損して問題が発生する場合：",
            "ワークスペース破損の修復",
            "ワークスペース設定が破損した場合："
          ]
        ],
        [
          "ログ分析と監視",
          "",
          [
            "リアルタイム問題診断",
            "問題パターン認識",
            "これらの高度なトラブルシューティングガイドは、PCU 使用時に遭遇する複雑な問題を解決するのに役立ちます。問題が継続する場合は、「ヘルプの取得」セクションのガイダンスに従って診断情報を収集し、サポートを求めてください。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "高度なライティング機能",
          null,
          [
            "ドキュメントをプロフェッショナルで効果的にする高度な機能をマスターしましょう。メタデータ、リード段落、スタイルコンテキスト、そして優秀なドキュメントと良いドキュメントを区別するベストプラクティスについて学びます。 "
          ]
        ],
        [
          "メタデータとSEO",
          "seo",
          [
            "各ページの上部にメタデータを含める必要があります："
          ]
        ],
        [
          "リード段落",
          "",
          [
            "{{ className: 'lead' }}を使用して導入段落を目立たせます："
          ]
        ],
        [
          "スタイルコンテキスト",
          "",
          [
            "not-proseクラス",
            "プロースタイルから外れる必要があるコンポーネントには<div className=\"not-prose\">を使用します："
          ]
        ],
        [
          "ドキュメントのベストプラクティス",
          "",
          [
            "コンテンツ構造",
            "メタデータと明確なタイトルから始める",
            "導入にリード段落を使用する",
            "適切な見出し階層で整理する",
            "重要な情報にはNotesを追加する",
            "実用的なコード例を含める",
            "明確な次のステップで終了する",
            "ライティングスタイル",
            "能動態を使用する",
            "簡潔かつ完全である",
            "各概念に例を含める",
            "すべてのコードスニペットをテストする",
            "用語の一貫性を保つ",
            "組織方法",
            "関連トピックをグループ化する",
            "相互参照を多用する",
            "複数のエントリーポイントを提供する",
            "ユーザーのジャーニーを考慮する",
            "検索に優しい見出しを含める"
          ]
        ],
        [
          "完全なドキュメントワークフロー",
          "",
          [
            "計画：コンテンツ構造の概要を作成",
            "執筆：各セクションに適切なコンポーネントを使用",
            "レビュー：完全性と正確性をチェック",
            "テスト：すべての例が動作することを確認",
            "反復：フィードバックに基づいて改善",
            "これで世界クラスのドキュメントを作成するために必要なすべてのツールが揃いました！"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "APIドキュメントライティング",
          null,
          [
            "開発者に愛される包括的なAPIドキュメントを作成します。Propertiesを使用してパラメータを記録し、TagsでHTTPメソッドをマークし、LibrariesでSDKを表示し、APIリファレンスを明確で実行可能にする専用コンポーネントを学びます。 "
          ]
        ],
        [
          "プロパティリスト",
          "",
          [
            "<Properties>と<Property>を使用してAPIパラメータを記録：",
            "リソースの一意識別子。リソース作成時に自動生成されます。",
            "リソースの表示名。1文字から100文字の間である必要があります。",
            "有効なメールアドレス。すべてのユーザー間で一意である必要があります。",
            "リソースの作成時間を表すISO 8601タイムスタンプ。"
          ]
        ],
        [
          "HTTPメソッドタグ",
          "http",
          [
            "タグはHTTPメソッドに基づいて自動的に色付けされます：",
            "GET\nPOST\nPUT\nDELETE\nカスタム\n成功\nエラー"
          ]
        ],
        [
          "Librariesコンポーネント",
          "libraries",
          [
            "完全なライブラリグリッド",
            "<Libraries>コンポーネントを使用してすべての公式SDKを表示：",
            "単一ライブラリ",
            "<Library>コンポーネントを使用して単一のライブラリを表示：",
            "コンパクトライブラリ表示",
            "小さなスペースでは、説明付きのコンパクトモードを使用：",
            "または説明なしのより密なコンパクト表示：",
            "Libraryコンポーネントオプション",
            "language: php, ruby, node, python, go から選択 (デフォルト: node)",
            "compact: コンパクトスタイルを使用 (デフォルト: false)",
            "showDescription: 説明テキストの表示/非表示 (デフォルト: true)",
            "Libraries使用シナリオ",
            "<Libraries />: 完全なSDK概要ページ、入門セクション",
            "<Library />: インラインドキュメント、特定言語ガイド",
            "<Library compact />: サイドバーリファレンス、コンパクトリスト"
          ]
        ],
        [
          "APIベストプラクティス",
          "api",
          [
            "常にPropertiesコンポーネントですべてのパラメータを記録",
            "サンプルリクエストとレスポンスを含める",
            "Tagsを使用して適切なHTTPステータスコードをマーク",
            "明確なエラーメッセージを提供",
            "認証要件を含める",
            "SDKページにはLibrariesコンポーネントを使用",
            "Propertiesリストを集中的かつ整理された状態に保つ"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "高度な機能を使用してドキュメントの旅を完了しましょう。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "ライティング基礎",
          null,
          [
            "ドキュメントライティングの基本的な構成要素をマスターしましょう。このガイドでは、標準のMarkdown構文、書式設定オプション、およびすべてのドキュメントで使用する基本要素について説明します。 "
          ]
        ],
        [
          "Markdown基礎",
          "markdown",
          [
            "すべてのドキュメントの基盤となる標準的なMarkdown形式を完全サポート：",
            "太字テキストは強調と重要性のため斜体テキストは微妙な強調のためインラインコードは技術用語、コマンド、短いコードスニペットのため",
            "組み合わせて使用できます：太字と斜体 または 太字とコード"
          ]
        ],
        [
          "テキスト形式",
          "",
          [
            "強調と太字テキスト",
            "アスタリスクまたはアンダースコアを使用して強調を表現：",
            "コードと技術用語",
            "インラインコード、変数、または技術用語にはバッククォートを使用："
          ]
        ],
        [
          "リストと整理",
          "",
          [
            "順序なしリスト",
            "機能リスト、要件、またはあらゆる非順序項目に最適：",
            "主要機能または要点",
            "別の重要な項目",
            "第3の考慮事項",
            "ネストされたサブポイント",
            "追加のサブ詳細",
            "メインレベルに戻る",
            "順序ありリスト",
            "ステップバイステップの指示、手順、または優先順位付きの項目に使用：",
            "プロセスの最初のステップ",
            "重要な詳細を含む第2ステップ",
            "第3ステップ",
            "具体的な指示を含むサブステップ",
            "別のサブステップ",
            "最後のステップ",
            "タスクリスト",
            "チェックリストと進捗追跡に最適：",
            "[x] 完了したタスク",
            "[x] 別の完了した項目",
            "[ ] 保留中のタスク",
            "[ ] 将来の機能強化"
          ]
        ],
        [
          "リンクとナビゲーション",
          "",
          [
            "内部リンク",
            "ドキュメント内の他のページにリンク：",
            "例：",
            "コマンドリファレンスガイド",
            "トラブルシューティング",
            "SDKドキュメント",
            "外部リンク",
            "外部リソースにリンク：",
            "アンカーリンク",
            "ページ内の特定の部分にリンク："
          ]
        ],
        [
          "見出しと構造",
          "",
          [
            "適切な見出しレベルを使用して明確なドキュメント階層を作成：",
            "見出しのベストプラクティス",
            "H1はページタイトルのみに使用（メタデータで処理）",
            "メインセクションにはH2、サブセクションにはH3を使用",
            "見出しレベルをスキップしない（H2 → H4は禁止）",
            "見出しを説明的でスキャン可能に保つ",
            "文の大文字小文字を使用：「スタートガイド」ではなく「スタートガイド」"
          ]
        ],
        [
          "引用とコールアウト",
          "",
          [
            "ブロック引用",
            "重要な引用や参考に使用：",
            "\"ドキュメントは未来の自分への愛の手紙です。\"— Damian Conway",
            "重要な注意：これは重要な情報を複数行にわたって提供し、追加のコンテキストを含む強調表示された引用です。",
            "複数段落の引用",
            "これは長い引用の最初の段落です。",
            "これは2番目の段落で、思考を続け、追加の詳細とコンテキストを提供します。"
          ]
        ],
        [
          "水平区切り線",
          "",
          [
            "水平区切り線を使用してメインセクションを分離：",
            "視覚的な分離を作成："
          ]
        ],
        [
          "テーブル",
          "",
          [
            "構造化データのためのシンプルなテーブル：",
            "| 機能        | ベーシック | プロ   | エンタープライズ |\n| ----------- | ---------- | ------ | ---------------- |\n| ユーザー数  | 10         | 100    | 無制限           |\n| ストレージ  | 1GB        | 10GB   | 100GB            |\n| API呼び出し | 1,000      | 10,000 | 無制限           |\n| サポート    | メール     | 優先   | 24/7電話         |",
            "テーブルの配置",
            "列の配置を制御：",
            "| 左配置       |   中央配置   |       右配置 |\n| :----------- | :----------: | -----------: |\n| テキスト     |   テキスト   |     テキスト |\n| その他の内容 | その他の内容 | その他の内容 |"
          ]
        ],
        [
          "特殊文字",
          "",
          [
            "バックスラッシュを使用して特殊なMarkdown文字をエスケープ："
          ]
        ],
        [
          "改行とスペース",
          "",
          [
            "行末で2つのスペースを使用してハード改行",
            "空行を使用して段落を分離",
            "リスト内で行末の\\を使用して改行"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "これらの基礎をマスターしたら、以下を探索してください：",
            "コンポーネントライティング - インタラクティブなUI要素",
            "コードライティング - コードブロックとシンタックスハイライト",
            "レイアウトライティング - マルチカラムレイアウトと整理",
            "APIライティング - APIドキュメントコンポーネント",
            "高度なライティング - 高度な機能とベストプラクティス",
            "これらの基礎知識は、すべての優秀なドキュメントの基盤を形成します。まずこれらをマスターし、その後他のガイドでカバーされている高度なコンポーネントと技術を使ってその上に構築してください。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "コードライティング",
          null,
          [
            "ドキュメントでコードを表示する技術をマスターしましょう。シンタックスハイライトの使用、多言語の例の作成、開発者がソリューションを理解し実装するのに役立つコードブロックの効果的な整理について学びます。 "
          ]
        ],
        [
          "単一のコードブロック",
          "",
          [
            "自動シンタックスハイライト付きの基本的なコードブロック：",
            "上記のJavaScriptコードブロックは以下のMDX構文を使用して作成されます：",
            "Pythonの例：",
            "Pythonコードブロックのmdx構文：",
            "Bash/Shellコマンド：",
            "Bashコードブロックのmdx構文："
          ]
        ],
        [
          "多言語CodeGroup",
          "code-group",
          [
            "<CodeGroup>を使用して異なる言語での同じ例を表示：",
            "上記の多言語コードグループは以下のMDX構文を使用して作成されます："
          ]
        ],
        [
          "APIエンドポイントの例",
          "api",
          [
            "APIドキュメントの場合、HTTPメソッドタグを使用：",
            "上記のAPIエンドポイントの例は以下のMDX構文を使用して作成されます。tagとlabel属性に注意：",
            "コードブロックタイトル",
            "単一のコードブロックにタイトルを追加することもできます："
          ]
        ],
        [
          "サポートされている言語",
          "",
          [
            "コードブロックは多くのプログラミング言語のシンタックスハイライトをサポートしています：",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Shellスクリプト: bash, shell, sh",
            "その他の言語: json, yaml, xml, sql, css, html, markdown, diff",
            "例：",
            "JSONコードブロックのMDX構文：",
            "コード比較（Diff）：",
            "DiffコードブロックのMDX構文："
          ]
        ],
        [
          "ベストプラクティス",
          "",
          [
            "シンタックスハイライトを得るため、常にコードブロックに言語を指定する",
            "異なるコード例を区別するため説明的なタイトルを使用する",
            "完全で実行可能な例を含める",
            "例を簡潔に保ちつつ機能的に完全にする",
            "一貫したフォーマットとスタイルを使用する",
            "CodeGroupで使用頻度に基づいて言語タブを並べ替える"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "レイアウトコンポーネントを読み続けて、コンテンツを効果的に整理しましょう。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "コンポーネントライティング",
          null,
          [
            "インタラクティブなUIコンポーネントでドキュメントの効果を向上させましょう。Notesを使用して重要な情報を強調し、Buttonsでアクションガイダンスを提供し、ドキュメントをより魅力的で機能的にするその他の要素の使用方法を学びます。 "
          ]
        ],
        [
          "ヒントと注釈",
          "",
          [
            "<Note>コンポーネントは、重要な情報、警告、または読者が特に注意すべきヒントを強調表示するのに最適です。",
            "基本的なNote用法",
            "これは基本的なヒントコンポーネントです。エメラルドテーマと情報アイコンを自動的に使用してコンテンツをスタイル化し、重要な情報を通常のテキストから目立たせます。",
            "リッチコンテンツを含むNotes",
            "Notesは太字テキスト、斜体テキスト、インラインコード、さらには他のページへのリンクを含む完全なMarkdown形式をサポートしています。",
            "重要なセットアップ要件：続行する前に、以下を確認してください： - Node.js\n18以上がインストールされている - プロジェクトリポジトリにアクセスできる -\n有効なAPI認証情報が設定されている\n認証情報の設定については、コマンドリファレンスガイドを参照してください。",
            "複数段落のNotes",
            "これは、複数の関連情報を含む長いヒントの最初の段落です。",
            "2番目の段落では、追加のコンテキストと考えを提供し続けます。概念を完全に説明するために、必要な数の段落を含めることができます。",
            "良いヒントは簡潔で完全であり、読者がメッセージの重要性を理解するのに十分な情報を提供することを覚えておいてください。"
          ]
        ],
        [
          "ボタンとアクション",
          "",
          [
            "<Button>コンポーネントは、ユーザーを重要なリンクや次のステップに導く行動喚起要素を作成します。",
            "ボタンバリエーション",
            "塗りつぶしボタン",
            "主要なアクションと最も重要な行動喚起に使用：",
            "コードコンポーネントを理解する",
            "アウトラインボタン",
            "セカンダリアクションや代替パスに最適です：",
            "レイアウトコンポーネントを探索",
            "テキストボタン",
            "コンテンツに溶け込みながらも目立つ、控えめなリンク：",
            "基本に戻る",
            "ボタンの矢印",
            "ボタンはナビゲーションを示すための方向矢印をサポートしています：",
            "前のセクション",
            "次のセクション",
            "ボタンのベストプラクティス",
            "適度な使用：ボタンが多すぎると効果が薄れます",
            "明確なアクション語：「開始する」、「詳細を見る」、「ドキュメントを見る」",
            "論理的な階層：塗りつぶしは主要、アウトラインは二次的、テキストは三次的",
            "方向矢印：左矢印は「戻る/前へ」、右矢印は「進む/次へ」を示します",
            "not-proseで包む：常に<div className=\"not-prose\">ラッパーを使用"
          ]
        ],
        [
          "コンポーネントスタイルコンテキスト",
          "",
          [
            "not-proseラッパー",
            "一部のコンポーネントはデフォルトのプローズスタイルから脱却する必要があります。これらのコンポーネントは常にラップしてください：",
            "not-proseが必要なコンポーネント：",
            "すべての<Button>コンポーネント",
            "カスタムレイアウト要素",
            "インタラクティブウィジェット",
            "複雑なスタイル化されたコンポーネント",
            "not-proseが不要なコンポーネント：",
            "<Note>コンポーネント（自己完結スタイル）",
            "標準Markdown要素",
            "テキストベースのコンポーネント",
            "複数のコンポーネント",
            "複数のコンポーネントを一緒に表示する場合：",
            "APIドキュメントガイド",
            "高度な機能",
            "基本を復習"
          ]
        ],
        [
          "コンポーネントのアクセシビリティ",
          "",
          [
            "すべてのコンポーネントはアクセシビリティを考慮して設計されています：",
            "セマンティックHTML：適切なボタンとリンク要素",
            "ARIAラベル：必要に応じてスクリーンリーダーサポートを提供",
            "キーボードナビゲーション：完全なキーボードアクセシビリティ",
            "フォーカス管理：明確なフォーカスインジケーター",
            "色のコントラスト：WCAGに準拠したカラースキーム"
          ]
        ],
        [
          "各コンポーネントをいつ使用するか",
          "",
          [
            "Notesを使用する場合：",
            "重要な情報を強調表示する",
            "潜在的な問題について警告する",
            "有用なヒントやコンテキストを提供する",
            "前提条件や要件を説明する",
            "重要な変更に注意を引く",
            "Buttonsを使用する場合：",
            "次の論理的なステップに誘導する",
            "外部リソースにリンクする",
            "明確なコールトゥアクションを作成する",
            "主要セクション間のナビゲーション",
            "主要なアクションを強調表示する",
            "過度な使用を避ける：",
            "すべての段落でヒントを使用しない",
            "各セクションでボタンを1-2個に制限",
            "本当に重要なコンテンツのためにコンポーネントを保持",
            "通常のテキストとMarkdownに大部分のコンテンツを任せる"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "UIコンポーネントを理解したので、以下を探索できます：",
            "コード記述 - シンタックスハイライトとコードブロック",
            "レイアウト記述 - マルチカラムレイアウトと組織",
            "API記述 - APIドキュメントコンポーネント",
            "高度な記述 - 高度な機能とメタデータ",
            "これらのインタラクティブ要素をマスターして、情報を提供するだけでなく、読者を効果的に導き、魅力的なドキュメントを作成しましょう。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "レイアウトライティング",
          null,
          [
            "読みやすさとユーザーエクスペリエンスを向上させる複雑なレイアウトを作成します。RowとColコンポーネントを使用したマルチカラムデザイン、スティッキーポジショニング、効果的なコンテンツ整理について学びます。 "
          ]
        ],
        [
          "2カラムレイアウト",
          "2",
          [
            "<Row>と<Col>を使用してサイドバイサイドコンテンツを実現：",
            "左カラム",
            "このコンテンツは左カラムに表示されます。説明、記述、補足情報に最適です。",
            "重要なポイント1",
            "重要な詳細",
            "追加のコンテキスト",
            "右カラム"
          ]
        ],
        [
          "スティッキーカラムレイアウト",
          "",
          [
            "スクロール時にコンテンツをスティッキーに保つ：",
            "スクロールコンテンツ",
            "これは通常スクロールする一般的なコンテンツです。ユーザーがスクロールして読む必要がある長い説明をここに配置できます。",
            "このカラムには、完全に消費するためにスクロールが必要な主要な説明や詳細情報が含まれます。",
            "スティッキーリファレンス",
            "これはスクロール時に表示され続けます。"
          ]
        ],
        [
          "Guidesコンポーネント",
          "guides",
          [
            "<Guides>コンポーネントを使用してガイドリンクのグリッドを表示：",
            "Guidesコンポーネントは、リンクと説明を含む事前定義されたドキュメントガイドのコレクションを表示します。概要ページと入門セクションに最適です。"
          ]
        ],
        [
          "Resourcesコンポーネント",
          "resources",
          [
            "アニメーションカードを使用して主要なリソースカテゴリを表示：",
            "Resourcesコンポーネントは、アイコンと説明付きのアニメーションリソースカードを表示します。メインランディングページやAPI概要セクションに最適です。"
          ]
        ],
        [
          "アイコン",
          "",
          [
            "インライン装飾やカスタムレイアウトに個別のアイコンを使用：",
            "利用可能なアイコン",
            "<UserIcon /> - 単一ユーザー",
            "<UsersIcon /> - 複数ユーザー",
            "<EnvelopeIcon /> - メッセージ/メール",
            "<ChatBubbleIcon /> - 会話",
            "<BookIcon /> - ドキュメント",
            "<CheckIcon /> - 成功/完了",
            "<BellIcon /> - 通知",
            "<CogIcon /> - 設定/構成"
          ]
        ],
        [
          "レイアウトのベストプラクティス",
          "",
          [
            "補足コンテンツには2カラムレイアウトを使用",
            "スティッキーカラムは参考資料に最適",
            "カラムのコンテンツ長をバランス良く保つ",
            "モバイル対応を確保（小画面ではカラムがスタックされる）",
            "ドキュメント概要ページにはGuidesコンポーネントを使用",
            "APIカテゴリ表示にはResourcesコンポーネントを使用",
            "アイコンとカスタムTailwindクラスで色とサイズを制御"
          ]
        ],
        [
          "次のステップ",
          "",
          [
            "APIドキュメントを読み続けて専用コンポーネントについて学びましょう。"
          ]
        ]
      ]
    }
  ],
  "ko": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "AI 분석",
          null,
          [
            "PCU는 AI CLI 도구와 통합하여 지능형 의존성 분석, 보안 평가 및 업데이트 권장 사항을 제공합니다. "
          ]
        ],
        [
          "개요",
          "",
          [
            "AI 분석은 다음과 같은 방식으로 PCU의 기능을 향상시킵니다:",
            "영향 분석: 업데이트가 코드베이스에 어떤 영향을 미치는지 이해",
            "보안 평가: AI 기반 보안 취약점 분석 제공",
            "호환성 검사: 잠재적인 호환성 문제 감지",
            "업데이트 권장: 안전한 업데이트를 위한 지능형 제안 수신"
          ]
        ],
        [
          "지원되는 AI 제공업체",
          "ai",
          [
            "PCU는 사용 가능한 AI CLI 도구를 자동으로 감지하고 다음 우선 순위로 사용합니다:",
            "| 제공업체 | 우선순위 | 기능                     |\n| -------- | -------- | ------------------------ |\n| Gemini   | 100      | 영향, 보안, 호환성, 권장 |\n| Claude   | 80       | 영향, 보안, 호환성, 권장 |\n| Codex    | 60       | 영향, 호환성, 권장       |\n| Cursor   | 40       | 영향, 권장               |",
            "AI 제공업체를 사용할 수 없는 경우 PCU는 자동으로 규칙 기반 분석 엔진으로 대체되어 사전 정의된\n규칙을 사용한 기본 의존성 분석을 제공합니다."
          ]
        ],
        [
          "명령어",
          "",
          [
            "사용 가능한 AI 제공업체 확인",
            "시스템에서 사용 가능한 AI 도구 보기:",
            "이 명령어는 다음을 표시합니다:",
            "시스템에서 감지된 사용 가능한 AI CLI 도구",
            "각 제공업체의 버전 정보",
            "분석에 사용될 최적의 제공업체",
            "AI 명령어 옵션",
            "모든 AI 제공업체의 상태 표시 (기본 동작)",
            "샘플 요청으로 AI 분석을 테스트하여 제공업체 연결 확인",
            "히트율 및 크기를 포함한 AI 분석 캐시 통계 표시",
            "AI 분석 캐시를 지워 공간 확보 또는 캐시된 응답 재설정",
            "AI 기반 업데이트",
            "AI 기반 분석으로 의존성 업데이트:",
            "AI 향상 업데이트는 다음을 제공합니다:",
            "각 업데이트에 대한 지능형 위험 평가",
            "설명이 포함된 호환성 문제 감지",
            "보안 취약점 식별",
            "권장 업데이트 순서",
            "AI 기반 분석",
            "AI 지원으로 특정 패키지 업데이트 분석:",
            "analyze 명령어는 기본적으로 default 카탈로그를 사용합니다. 첫 번째 인수로 다른 카탈로그를\n지정할 수 있습니다: pcu analyze my-catalog react"
          ]
        ],
        [
          "분석 유형",
          "",
          [
            "영향 분석",
            "의존성 업데이트가 프로젝트에 어떤 영향을 미치는지 평가:",
            "해당 의존성을 사용하는 모든 워크스페이스 패키지 식별",
            "버전 간 API 변경 분석",
            "필요한 마이그레이션 작업량 추정",
            "테스트 중점 영역 제안",
            "보안 분석",
            "보안 중심 평가 제공:",
            "현재 버전의 알려진 취약점 식별",
            "새 버전의 보안 수정 확인",
            "보안 관련 패키지 업데이트 평가",
            "보안 모범 사례 권장",
            "호환성 분석",
            "잠재적인 호환성 문제 확인:",
            "호환성 문제가 있는 API 변경 감지",
            "피어 의존성 충돌 식별",
            "Node.js 버전 호환성 확인",
            "TypeScript 호환성 검증",
            "권장 사항",
            "실행 가능한 권장 사항 생성:",
            "최적의 업데이트 순서 제안",
            "버전 범위 권장",
            "함께 업데이트해야 할 패키지 식별",
            "롤백 전략 제공"
          ]
        ],
        [
          "대체 동작",
          "",
          [
            "AI 제공업체를 사용할 수 없는 경우 PCU는 내장된 규칙 기반 분석 엔진을 사용합니다:",
            "규칙 기반 분석 기능",
            "버전 점프 평가: 시맨틱 버전 변경에 따른 위험 평가",
            "알려진 호환성 문제 패턴: 인기 패키지(React, TypeScript, ESLint 등)의 호환성 문제 감지",
            "보안 민감 패키지: 보안 관련 패키지에 플래그 지정하여 신중히 검토",
            "작업량 추정: 마이그레이션 작업량 추정 제공",
            "위험 수준",
            "| 수준   | 설명                                         |\n| ------ | -------------------------------------------- |\n| 낮음   | 패치 업데이트, 일반적으로 안전하게 적용 가능 |\n| 중간   | 마이너 업데이트 또는 큰 마이너 버전 점프     |\n| 높음   | 호환성 문제가 있는 메이저 버전 업데이트      |\n| 치명적 | 여러 메이저 버전 점프 또는 프리릴리스 버전   |"
          ]
        ],
        [
          "구성",
          "",
          [
            "환경 변수",
            "Gemini CLI 실행 파일의 사용자 지정 경로",
            "Claude CLI 실행 파일의 사용자 지정 경로",
            "Codex CLI 실행 파일의 사용자 지정 경로",
            "Cursor CLI 실행 파일의 사용자 지정 경로",
            "감지 방법",
            "PCU는 AI 제공업체를 감지하기 위해 여러 전략을 사용합니다:",
            "환경 변수: 사용자 지정 경로 변수 확인",
            "PATH 조회: which 명령어를 사용하여 실행 파일 찾기",
            "알려진 경로: 일반적인 설치 위치 확인",
            "애플리케이션 경로: GUI 애플리케이션(예: Cursor.app) 확인"
          ]
        ],
        [
          "사용 예시",
          "",
          [
            "안전한 업데이트 워크플로우",
            "CI/CD 통합",
            "일괄 분석"
          ]
        ],
        [
          "모범 사례",
          "",
          [
            "AI 분석을 사용해야 할 때",
            "메이저 버전 업데이트: 메이저 버전 업그레이드에는 항상 AI 분석 사용",
            "보안 민감 패키지: 인증, 암호화 및 세션 패키지에 사용",
            "대규모 코드베이스: AI가 모노레포 전반의 영향 영역 식별에 도움",
            "호환성 문제 감지: AI가 상세한 호환성 문제 설명 제공",
            "성능 고려 사항",
            "AI 분석은 표준 업데이트에 비해 처리 시간이 추가됨",
            "--dry-run을 사용하여 변경 사항을 적용하지 않고 AI 권장 사항 미리보기",
            "AI가 중요하지 않은 경우 더 빠른 CI/CD 파이프라인을 위해 규칙 기반 대체 고려",
            "다른 기능과 결합"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "모범 사례",
          null,
          [
            "팀 환경, 기업 워크플로우 및 프로덕션 시스템에서 PCU를 효과적으로 사용하는 방법을 알아보세요. "
          ]
        ],
        [
          "팀 협업",
          "",
          [
            "공유 구성",
            ".pcurc.json을 버전 관리에 커밋하여 팀 구성원 간에 PCU 구성을 일관되게 유지하세요:",
            "코드 리뷰 가이드라인",
            "리뷰 전 체크리스트:",
            "pcu check --dry-run을 실행하여 변경 사항 미리보기",
            "주요 버전 업데이트에서 Breaking Changes가 없는지 확인",
            "종속성 업데이트 후 핵심 기능 테스트",
            "업데이트된 패키지의 CHANGELOG 파일 검토",
            "리뷰 프로세스:",
            "보안 우선: 보안 관련 종속성 업데이트는 항상 즉시 검토",
            "관련 업데이트 일괄 처리: 관련 패키지(예: React 생태계)를 단일 PR로 그룹화",
            "이유 문서화: 버전 고정이나 제외에 대한 근거 포함",
            "테스트 커버리지: 종속성 업데이트 병합 전 충분한 테스트 보장",
            "커뮤니케이션 표준",
            "종속성 업데이트 시 명확한 커밋 메시지 사용:"
          ]
        ],
        [
          "기업 사용",
          "",
          [
            "거버넌스 및 컴플라이언스",
            "종속성 승인 프로세스:",
            "보안 스캔: 모든 업데이트는 보안 감사를 통과해야 함",
            "라이선스 컴플라이언스: 내부 정책과 라이선스 호환성 확인",
            "안정성 요구사항: 프로덕션 환경에서 LTS 버전 선호",
            "변경 관리: 기존 변경 승인 프로세스 준수",
            "기업용 구성:",
            "프라이빗 레지스트리 통합",
            "프라이빗 레지스트리가 있는 기업 환경에서 PCU 구성:",
            "환경 변수:",
            "감사 추적 및 보고",
            "종속성 변경 사항의 포괄적인 기록 유지:"
          ]
        ],
        [
          "릴리스 워크플로우",
          "",
          [
            "시맨틱 버전 통합",
            "종속성 업데이트를 릴리스 주기와 맞춤:",
            "프리 릴리스 단계:",
            "릴리스 준비:",
            "릴리스 후:",
            "스테이징 환경 테스트",
            "프로덕션 전 유효성 검사:"
          ]
        ],
        [
          "보안 모범 사례",
          "",
          [
            "취약점 관리",
            "즉시 응답 PCU:",
            "치명적/높음 심각도: 24시간 내 업데이트",
            "보통 심각도: 1주일 내 업데이트",
            "낮음 심각도: 다음 정기 업데이트 주기에 포함",
            "종속성 유효성 검사",
            "보안 구성:",
            "수동 보안 검토:",
            "첫 사용 전 모든 새 종속성 검토",
            "패키지 유지 관리자 및 다운로드 횟수 감사",
            "패키지 진위성 및 서명 확인",
            "종속성 체인의 알려진 보안 문제 확인",
            "접근 제어",
            "토큰 관리:"
          ]
        ],
        [
          "성능 최적화",
          "",
          [
            "캐싱 전략",
            "로컬 개발:",
            "CI/CD 최적화:",
            "대형 모노레포 처리",
            "100+ 패키지용 구성:",
            "선택적 처리:",
            "네트워크 최적화",
            "레지스트리 구성:"
          ]
        ],
        [
          "오류 처리 및 복구",
          "",
          [
            "일반적인 오류 해결",
            "네트워크 문제:",
            "메모리 문제:",
            "백업 및 복구",
            "주요 업데이트 전 백업 생성:",
            "버전 롤백 전략:",
            "모니터링 및 알림",
            "CI/CD 통합:"
          ]
        ],
        [
          "통합 패턴",
          "",
          [
            "IDE 및 에디터 통합",
            "VS Code 구성:",
            "자동화 스크립트",
            "Package.json 스크립트:",
            "Git 훅 통합:"
          ]
        ],
        [
          "빠른 참조 체크리스트",
          "",
          [
            "일일 워크플로우",
            "보안 업데이트 확인: pcu security",
            "오래된 종속성 검토: pcu check --limit 10",
            "패치 버전 업데이트: pcu update --target patch",
            "주간 워크플로우",
            "포괄적인 종속성 확인: pcu check",
            "마이너 버전 업데이트: pcu update --target minor --interactive",
            "제외 규칙 검토 및 업데이트",
            "팀 검토용 종속성 보고서 생성",
            "월간 워크플로우",
            "주요 버전 업데이트 검토: pcu check --target latest",
            "개발 종속성 업데이트: pcu update --dev",
            "종속성 라이선스 및 컴플라이언스 감사",
            "PCU 구성 검토 및 최적화",
            "사용하지 않는 종속성 정리",
            "릴리스 전",
            "전체 종속성 감사 실행: pcu security --comprehensive",
            "백업 생성: pcu update --create-backup",
            "스테이징 환경에서 테스트",
            "종속성 변경 사항과 함께 릴리스 노트 생성"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "CI/CD 통합",
          null,
          [
            "지속적인 통합 및 배포 파이프라인에 PCU를 통합하세요. PCU는 기존 CI/CD 워크플로우와 원활하게 통합되어 GitHub Actions, GitLab CI, Jenkins, Azure DevOps 및 기타 플랫폼을 지원합니다. "
          ]
        ],
        [
          "GitHub Actions 통합",
          "git-hub-actions",
          [
            "기본 종속성 확인 워크플로우"
          ]
        ],
        [
          "GitLab CI 통합",
          "git-lab-ci",
          [
            "PCU 종속성 관리를 위한 GitLab CI 파이프라인:"
          ]
        ],
        [
          "Jenkins 파이프라인 통합",
          "jenkins",
          [
            "종속성 관리를 위한 엔터프라이즈급 Jenkins 파이프라인:"
          ]
        ],
        [
          "Azure DevOps 파이프라인",
          "azure-dev-ops",
          [
            "PCU 통합을 위한 Azure DevOps 파이프라인:"
          ]
        ],
        [
          "일반적인 CI/CD 모범 사례",
          "ci-cd",
          [
            "환경 변수 구성",
            "PCU 동작을 최적화하기 위해 모든 CI/CD 플랫폼에서 이러한 환경 변수를 구성하세요:",
            "보안 고려사항",
            "접근 토큰 관리",
            "CI/CD 환경에서 접근 토큰의 안전한 관리를 보장하세요:",
            "브랜치 보호 전략",
            "메인 브랜치로의 직접 푸시를 방지하기 위한 브랜치 보호 구성:",
            "풀 리퀘스트 검토 필요",
            "상태 확인 통과 필요",
            "보호된 브랜치로의 푸시 제한",
            "서명된 커밋 필요",
            "문제 해결",
            "일반적인 CI/CD 문제",
            "권한 오류",
            "캐시 문제",
            "네트워크 타임아웃",
            "모니터링 및 보고",
            "대시보드 생성",
            "종속성 관리 대시보드를 생성하기 위해 CI/CD 플랫폼 네이티브 기능 사용:",
            "GitHub Actions: Action 인사이트 및 종속성 그래프 사용",
            "GitLab CI: 보안 대시보드 및 종속성 스캔 활용",
            "Jenkins: HTML Publisher 플러그인 구성",
            "Azure DevOps: 대시보드 및 분석 사용",
            "알림 구성",
            "팀에게 정보를 제공하기 위한 적절한 알림 설정:"
          ]
        ],
        [
          "Docker 통합",
          "docker",
          [
            "컨테이너화된 PCU 워크플로우",
            "이러한 CI/CD 통합 예시는 포괄적인 자동화된 종속성 관리 솔루션을 제공하여 프로젝트가 최신 상태를 유지하고 안전하게 유지되도록 보장합니다."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "명령어 참조",
          null,
          [
            "모든 PCU 명령어와 옵션에 대한 완전한 참조. 사용 가능한 모든 명령어, 플래그 및 구성 옵션에 대해 알아보세요. "
          ]
        ],
        [
          "명령어 개요",
          "",
          [
            "PCU는 전체 이름과 편리한 단축키를 모두 제공하는 여러 주요 명령어를 제공합니다:",
            "| 전체 명령어     | 단축키 & 별칭                             | 설명                              |\n| --------------- | ----------------------------------------- | --------------------------------- |\n| pcu init      | pcu i                                   | PNPM 작업공간 및 PCU 구성 초기화  |\n| pcu check     | pcu chk, pcu -c, pcu --check        | 오래된 카탈로그 종속성 확인       |\n| pcu update    | pcu u, pcu -u, pcu --update         | 카탈로그 종속성 업데이트          |\n| pcu analyze   | pcu a, pcu -a, pcu --analyze        | 종속성 업데이트의 영향 분석       |\n| pcu workspace | pcu w, pcu -s, pcu --workspace-info | 작업공간 정보 및 유효성 검사 표시 |\n| pcu theme     | pcu t, pcu -t, pcu --theme          | 색상 테마 및 UI 설정 구성         |\n| pcu security  | pcu sec                                 | 보안 취약점 스캔 및 수정          |\n| pcu ai        | -                                         | AI 제공자 관리 및 분석 테스트     |\n| pcu rollback  | -                                         | 카탈로그 업데이트를 이전 상태로 롤백 |\n| pcu help      | pcu h, pcu -h                         | 도움말 정보 표시                  |",
            "특별 단축키",
            "| 단축키                 | 동등한 명령어              | 설명                              |\n| ---------------------- | -------------------------- | --------------------------------- |\n| pcu -i               | pcu update --interactive | 대화형 업데이트 모드              |\n| pcu --security-audit | pcu security             | 보안 스캔 실행                    |\n| pcu --security-fix   | pcu security --fix-vulns | 자동 수정을 포함한 보안 스캔 실행 |"
          ]
        ],
        [
          "하이브리드 모드",
          "",
          [
            "PCU는 하이브리드 모드 기능을 제공합니다 - 플래그 없이 명령어를 실행하면 자동으로 대화형 모드로 진입하여 각 옵션을 안내합니다.",
            "지원되는 명령어",
            "하이브리드 모드는 다음 명령어에서 사용할 수 있습니다:",
            "| 명령어       | 대화형 옵션                                    |\n| ------------ | ---------------------------------------------- |\n| check      | 형식, 대상, 프리릴리즈, 포함/제외 패턴         |\n| update     | 카탈로그, 형식, 대상, 백업, 드라이런           |\n| analyze    | 형식                                           |\n| workspace  | 유효성 검사, 통계, 형식                        |\n| theme      | 테마 선택, 진행률 스타일                       |\n| security   | 형식, 심각도, 자동 수정                        |\n| init       | 템플릿, 프레임워크 옵션, 대화형 마법사         |\n| ai         | 제공자 상태, 테스트, 캐시 작업                 |\n| rollback   | 버전 선택, 형식                                |",
            "장점",
            "유연성: 스크립팅을 위한 자동화와 탐색을 위한 대화형 안내 사이를 원활하게 전환",
            "탐색 가능성: 모든 옵션을 외울 필요 없이 대화형 프롬프트를 통해 사용 가능한 기능 탐색",
            "효율성: 숙련 사용자는 직접 플래그 사용, 신규 사용자는 안내된 경험 제공"
          ]
        ],
        [
          "pcu init - 작업공간 초기화",
          "pcu-init",
          [
            "PCU 구성과 함께 완전한 PNPM 작업공간 환경을 초기화합니다.",
            "옵션",
            "확인 없이 기존 구성 파일 덮어쓰기",
            "사용 가능한 모든 옵션이 포함된 포괄적인 구성 생성",
            "가이드 설정이 포함된 대화형 구성 마법사 실행",
            "구성 템플릿: minimal, standard, full, monorepo, enterprise",
            "누락된 경우 PNPM 작업공간 구조 생성",
            "PNPM 작업공간 구조 생성 건너뛰기",
            "작업공간 패키지의 디렉토리 이름",
            "구성에 일반적인 패키지 규칙 포함",
            "TypeScript 전용 패키지 규칙 및 설정 추가",
            "React 생태계 패키지 규칙 추가",
            "Vue 생태계 패키지 규칙 추가",
            "출력 형식: table, json, yaml, minimal",
            "작업공간 디렉토리 (기본값: 현재 디렉토리)",
            "자세한 정보 및 진행률 표시",
            "구성 템플릿",
            "PCU는 일반적인 프로젝트 유형에 대해 미리 구성된 템플릿을 제공합니다:",
            "템플릿 유형",
            "minimal - 필수 설정만 포함하는 기본 구성",
            "standard - 대부분의 프로젝트에 적합한 균형잡힌 구성",
            "full - 사용 가능한 모든 옵션이 포함된 포괄적인 구성",
            "monorepo - 고급 기능을 갖춘 대규모 모노레포에 최적화",
            "enterprise - 보안 및 거버넌스 기능을 갖춘 엔터프라이즈급",
            "대화형 구성 마법사",
            "대화형 모드 (--interactive)는 가이드 설정 경험을 제공합니다:",
            "마법사 기능",
            "프로젝트 감지: 프로젝트 유형 자동 감지 (React, Vue, TypeScript)",
            "작업공간 구조: 기존 패키지 탐색 및 최적 구성 제안",
            "패키지 규칙 설정: 패키지 규칙 및 업데이트 전략의 대화형 선택",
            "레지스트리 구성: 사용자 정의 NPM 레지스트리 및 인증 설정",
            "성능 튜닝: 프로젝트 크기 및 요구사항에 따른 설정 최적화",
            "테마 선택: 색상 테마 및 진행률 표시줄 스타일 선택",
            "유효성 검사 설정: 품질 게이트 및 안전 확인 구성",
            "마법사 흐름",
            "프로젝트 분석: 기존 파일을 스캔하여 프로젝트 구조 이해",
            "템플릿 선택: 분석을 바탕으로 적절한 템플릿 추천",
            "패키지 규칙: 패키지별 업데이트 전략의 대화형 설정",
            "고급 설정: 캐싱, 성능, UI 설정의 선택적 구성",
            "유효성 검사: 사전 확인 및 구성 유효성 검사",
            "파일 생성: 확인을 통한 모든 필요 파일 생성",
            "생성되는 파일 및 디렉토리",
            "핵심 파일",
            "모든 PCU 설정이 포함된 주 구성 파일",
            "작업공간 루트 package.json (누락된 경우 생성)",
            "PNPM 작업공간 구성 (누락된 경우 생성)",
            "디렉토리 구조",
            "작업공간 패키지의 기본 디렉토리 (사용자 정의 가능)",
            "모노레포 템플릿용 생성 - 애플리케이션 패키지",
            "모노레포 템플릿용 생성 - 개발 도구",
            "엔터프라이즈 템플릿용 생성 - 문서",
            "템플릿별 파일",
            "Node 버전 사양 (엔터프라이즈 템플릿)",
            "PCU 전용 패턴으로 강화 (누락된 경우)",
            "TypeScript 구성 (--typescript 플래그 사용 시)",
            "고급 초기화",
            "프레임워크별 설정",
            "사용자 정의 작업공간 구조",
            "유효성 검사 및 상태 확인",
            "init 명령어는 포괄적인 유효성 검사를 수행합니다:",
            "초기화 전 확인",
            "디렉토리 권한: 작업공간 디렉토리에 쓰기 액세스 보장",
            "PNPM 설치: PNPM이 설치되고 액세스 가능한지 확인",
            "기존 구성: 기존 구성을 감지하고 병합 제안",
            "Git 저장소: 디렉토리가 git 저장소인지 확인",
            "초기화 후 유효성 검사",
            "구성 구문: 생성된 구성 파일 유효성 검사",
            "작업공간 구조: PNPM 작업공간이 올바르게 구성되었는지 확인",
            "패키지 탐색: PCU가 작업공간 패키지를 탐색할 수 있는지 확인",
            "종속성 분석: 기존 종속성의 기본 상태 확인",
            "사용 예제",
            "빠른 시작",
            "자동 프로젝트 감지를 사용하여 표준 템플릿으로 초기화합니다.",
            "대화형 설정",
            "가이드 설정과 함께 완전한 구성 마법사를 실행합니다.",
            "모노레포 초기화",
            "TypeScript 지원과 자세한 출력을 포함한 엔터프라이즈급 모노레포를 생성합니다.",
            "사용자 정의 엔터프라이즈 설정",
            "기존 구성을 덮어쓰는 대화형 엔터프라이즈 설정입니다."
          ]
        ],
        [
          "pcu check - 업데이트 확인",
          "pcu-check",
          [
            "pnpm 작업공간 카탈로그에서 오래된 종속성을 확인합니다.",
            "옵션",
            "특정 카탈로그만 확인",
            "출력 형식: table, json, yaml, minimal",
            "업데이트 대상: latest, greatest, minor, patch, newest",
            "프리릴리즈 버전 포함",
            "패턴에 일치하는 패키지 포함",
            "패턴에 일치하는 패키지 제외",
            "출력 형식",
            "table: 색상과 세부사항이 포함된 풍부한 표 형식",
            "minimal: 간단한 npm-check-updates 스타일 (package → version)",
            "json: 프로그래밍 방식 사용을 위한 JSON 출력",
            "yaml: 구성 파일용 YAML 출력"
          ]
        ],
        [
          "pcu update - 종속성 업데이트",
          "pcu-update",
          [
            "카탈로그 종속성을 새 버전으로 업데이트합니다.",
            "옵션",
            "업데이트를 선택하는 대화형 모드",
            "파일 쓰기 없이 변경 사항 미리보기",
            "업데이트 대상: latest, greatest, minor, patch, newest",
            "특정 카탈로그만 업데이트",
            "위험하더라도 업데이트 강제 실행",
            "업데이트 전 백업 파일 생성",
            "패턴에 일치하는 패키지 포함 (여러 번 사용 가능)",
            "패턴에 일치하는 패키지 제외 (여러 번 사용 가능)",
            "업데이트에 프리릴리즈 버전 포함",
            "출력 형식: table, json, yaml, minimal",
            "병렬 처리할 패키지 수",
            "피어 종속성 충돌이 있는 패키지 건너뛰기",
            "메이저 버전 업데이트에 대한 확인 요구",
            "대화형 기능",
            "대화형 모드 (--interactive 또는 -i)는 고급 패키지 선택 기능을 제공합니다:",
            "패키지 선택 인터페이스",
            "개별 패키지 업데이트를 위한 체크박스가 있는 다중 선택",
            "이름이나 설명으로 패키지를 필터링하는 검색 기능",
            "여러 패키지를 선택/해제하는 배치 작업",
            "각 패키지에 대한 업데이트 전략 선택 (latest, greatest, minor, patch)",
            "스마트 충돌 해결",
            "해결 제안이 포함된 피어 종속성 감지",
            "의미적 버전 분석을 바탕으로 한 호환성 변경 경고",
            "영향받는 작업공간 패키지를 보여주는 영향 분석",
            "업데이트로 인한 문제 발생 시 롤백 기능",
            "진행률 추적",
            "여러 시각적 스타일의 실시간 진행률 표시줄",
            "완료/대기 중인 업데이트를 보여주는 배치 처리 상태",
            "실패한 업데이트에 대한 건너뛰기/재시도 옵션이 있는 오류 복구",
            "모든 변경 사항 요약이 포함된 성공 확인",
            "고급 업데이트 전략",
            "사용 예제",
            "안전한 대화형 업데이트",
            "자동 백업과 함께 대화형으로 종속성을 업데이트하고, 마이너 버전 범프로 제한합니다.",
            "프로덕션 안전 업데이트",
            "메이저 업데이트에 대한 확인이 필요한 프로덕션 종속성에서 업데이트될 내용을 보여줍니다.",
            "프레임워크별 업데이트",
            "프리릴리즈 버전을 허용하여 TypeScript 정의를 포함한 React 생태계 패키지를 업데이트합니다."
          ]
        ],
        [
          "pcu analyze - 영향 분석",
          "pcu-analyze",
          [
            "특정 종속성 업데이트의 영향을 분석하여 잠재적인 호환성 변경 및 영향받는 패키지를 이해합니다.",
            "인수",
            "카탈로그 이름 (예: 'default', 'react17')",
            "패키지 이름 (예: 'react', '@types/node')",
            "새 버전 (선택사항, 기본값은 latest)",
            "옵션",
            "출력 형식: table, json, yaml, minimal",
            "분석 정보",
            "analyze 명령어는 다음을 제공합니다:",
            "업데이트에 의해 영향받는 종속성",
            "버전 간 감지된 호환성 변경",
            "이 종속성을 사용하는 작업공간 패키지",
            "업데이트 권장사항 및 위험 평가",
            "버전 호환성 분석",
            "사용 예제",
            "최신 버전 영향 분석",
            "기본 카탈로그에서 React를 최신 버전으로 업데이트할 때의 영향을 분석합니다.",
            "특정 버전 분석",
            "TypeScript를 버전 5.0.0으로 업데이트할 때의 영향을 분석합니다.",
            "자동화를 위한 JSON 출력",
            "프로그래밍 방식 처리를 위해 분석 결과를 JSON으로 출력합니다."
          ]
        ],
        [
          "pcu workspace - 작업공간 정보",
          "pcu-workspace",
          [
            "포괄적인 작업공간 분석과 함께 작업공간 정보 및 유효성 검사를 표시합니다.",
            "옵션",
            "작업공간 구성 및 구조 유효성 검사",
            "자세한 작업공간 통계 표시",
            "출력 형식: table, json, yaml, minimal",
            "출력 정보",
            "기본 정보 모드 (기본값)",
            "작업공간 이름 및 경로",
            "총 패키지 수",
            "카탈로그 수",
            "카탈로그 이름 목록",
            "유효성 검사 모드 (--validate)",
            "구성 파일 유효성 검사",
            "작업공간 구조 유효성 검사",
            "Package.json 일관성 확인",
            "카탈로그 무결성 확인",
            "종료 코드: 0 (유효), 1 (문제 발견)",
            "통계 모드 (--stats)",
            "자세한 패키지 분석",
            "종속성 분석",
            "카탈로그 사용 통계",
            "작업공간 건강 지표",
            "사용 예제",
            "기본 작업공간 정보",
            "작업공간 이름, 경로, 패키지 수 및 사용 가능한 카탈로그를 표시합니다.",
            "포괄적 유효성 검사",
            "작업공간 구성 및 구조를 유효성 검사하고 적절한 코드로 종료합니다.",
            "자세한 통계",
            "JSON 형식으로 자세한 작업공간 통계를 표시합니다.",
            "결합 분석",
            "유효성 검사를 수행하고 통계를 함께 표시합니다."
          ]
        ],
        [
          "pcu security - 보안 취약점 스캔",
          "pcu-security",
          [
            "npm audit 및 선택적 Snyk 통합을 사용한 포괄적인 보안 취약점 스캔과 자동 수정 기능.",
            "옵션",
            "npm audit 스캔 수행 (기본값으로 활성화)",
            "npm audit fix를 사용하여 취약점 자동 수정",
            "심각도 수준별 필터링: low, moderate, high, critical",
            "취약점 스캔에 개발 종속성 포함",
            "Snyk 보안 스캔 포함 (snyk CLI 설치 필요)",
            "확인 없이 보안 수정 자동 적용",
            "출력 형식: table, json, yaml, minimal",
            "작업공간 디렉토리 경로 (기본값: 현재 디렉토리)",
            "자세한 취약점 정보 및 해결 단계 표시",
            "보안 리포트 기능",
            "security 명령어는 포괄적인 취약점 분석을 제공합니다:",
            "다중 스캐너 통합: 철저한 커버리지를 위해 npm audit과 Snyk 결합",
            "심각도 분류: 취약점을 critical, high, moderate, low, info로 분류",
            "자동 해결: --fix-vulns로 보안 패치 자동 적용",
            "패키지 권장사항: 취약점 해결을 위한 특정 버전 업데이트 제안",
            "개발 종속성: 개발 종속성의 선택적 포함/제외",
            "CWE/CVE 정보: 자세한 취약점 식별자 및 설명",
            "종료 코드: 적절한 코드 반환 (정상 시 0, 취약점 발견 시 1)",
            "CI/CD 지원: 자동화를 위한 JSON 출력 및 비대화형 모드",
            "사용 예제",
            "기본 취약점 스캔",
            "npm audit을 사용하여 표준 보안 스캔을 수행하고 형식화된 표로 결과를 표시합니다.",
            "자동 수정이 포함된 스캔",
            "취약점을 스캔하고 사용 가능한 보안 수정을 자동으로 적용합니다.",
            "높은 심각도 필터",
            "낮은 우선순위 문제를 필터링하여 높은 심각도 및 중요한 취약점만 표시합니다.",
            "Snyk를 포함한 포괄적 스캔",
            "npm audit과 Snyk 스캔을 모두 실행하고, 자세한 취약점 정보와 함께 개발 종속성을 포함합니다.",
            "CI/CD 파이프라인 통합",
            "CI/CD 파이프라인에서 자동 처리를 위해 중요한 보안 취약점을 JSON으로 내보냅니다.",
            "프로덕션용 자동 수정",
            "프로덕션 종속성에서만 보통 이상의 심각도 취약점을 자동으로 수정합니다.",
            "보안 워크플로 통합",
            "배포 전 보안 확인",
            "자동 보안 유지보수"
          ]
        ],
        [
          "pcu theme - 테마 구성",
          "pcu-theme",
          [
            "색상 테마 및 UI 모양을 구성합니다.",
            "옵션",
            "색상 테마 설정: default, modern, minimal, neon",
            "미리보기 샘플과 함께 사용 가능한 모든 테마 나열",
            "실시간 미리보기가 포함된 대화형 테마 구성 마법사 실행",
            "변경 사항을 적용하지 않고 테마 미리보기 표시",
            "진행률 표시줄 스타일 설정: default, gradient, fancy, minimal, rainbow, neon",
            "환경별 프리셋 설정: development, production, presentation",
            "모든 테마 설정을 기본값으로 재설정",
            "사용 가능한 테마",
            "핵심 테마",
            "default - 일반적인 터미널 사용에 최적화된 균형잡힌 색상",
            "modern - 구문 강조 표시가 있는 개발 환경에 완벽한 생생한 색상",
            "minimal - 프로덕션 환경 및 CI/CD에 이상적인 깔끔한 단색 디자인",
            "neon - 프레젠테이션 및 데모용으로 설계된 높은 대비 사이버펑크 색상",
            "진행률 표시줄 스타일",
            "default - 표준 진행률 표시",
            "gradient - 부드러운 색상 전환",
            "fancy - 애니메이션이 포함된 풍부한 시각 효과",
            "minimal - 간단하고 깔끔한 진행률 표시줄",
            "rainbow - 다색 애니메이션 진행률",
            "neon - 빛나는 효과의 진행률 표시줄",
            "환경 프리셋",
            "development - 전체 색상, 자세한 진행률, 상세한 출력",
            "production - 최소한의 색상, 필수 정보만",
            "presentation - 높은 대비, 큰 글꼴, 극적인 효과",
            "고급 테마 기능",
            "의미적 색상 매핑",
            "성공 - 완료된 작업에 대한 녹색 톤",
            "경고 - 주의 상태에 대한 노란색/호박색",
            "오류 - 실패 및 중요한 문제에 대한 빨간색 톤",
            "정보 - 정보 메시지에 대한 파란색 톤",
            "진행률 - 진행 중인 작업에 대한 동적 색상",
            "강조 - 중요한 정보에 대한 강조 색상",
            "대화형 테마 구성",
            "대화형 모드는 다음을 제공합니다:",
            "샘플 출력이 포함된 테마의 실시간 미리보기",
            "16진수 코드 지원이 포함된 사용자 정의 색상 선택",
            "자동 최적 설정이 포함된 환경 감지",
            "다양한 스타일의 실제 동작을 확인하는 진행률 표시줄 테스트",
            "테마 구성 내보내기/가져오기",
            "프로젝트별 스타일링을 위한 작업공간별 테마",
            "사용 예제",
            "사용 가능한 테마 나열",
            "설명과 함께 사용 가능한 모든 테마를 표시합니다.",
            "테마 직접 설정",
            "특정 테마를 직접 설정합니다.",
            "대화형 테마 구성",
            "테마를 미리보고 UI 설정을 대화형으로 구성할 수 있는 가이드 테마 선택 마법사를 실행합니다."
          ]
        ],
        [
          "pcu ai - AI 제공자 관리",
          "pcu-ai-ai",
          [
            "AI 제공자 상태를 확인하고 AI 분석 캐시를 관리합니다.",
            "옵션",
            "모든 AI 제공자의 상태 표시 (기본 동작)",
            "샘플 요청으로 AI 분석 테스트",
            "AI 분석 캐시 통계 표시",
            "AI 분석 캐시 삭제",
            "제공자 감지",
            "명령어가 사용 가능한 AI 제공자를 자동으로 감지합니다:",
            "| 제공자 | 우선순위 | 감지 방법      |\n| ------ | -------- | -------------- |\n| Claude | 100      | claude CLI   |\n| Gemini | 80       | gemini CLI   |\n| Codex  | 60       | codex CLI    |",
            "사용 예시"
          ]
        ],
        [
          "pcu rollback - 백업 롤백",
          "pcu-rollback",
          [
            "업데이트 중 생성된 백업 파일을 사용하여 카탈로그 업데이트를 이전 상태로 롤백합니다.",
            "옵션",
            "타임스탬프와 함께 사용 가능한 모든 백업 파일 나열",
            "가장 최근 백업으로 자동 롤백",
            "복원할 백업 대화형 선택",
            "모든 백업 파일 삭제 (확인 필요)",
            "작업공간 디렉토리 경로 (기본값: 현재 디렉토리)",
            "롤백 중 상세 정보 표시",
            "백업 시스템",
            "PCU는 update 명령에서 --create-backup 플래그를 사용하면 자동으로 백업 파일을 생성합니다:",
            "백업 파일은 타임스탬프와 함께 저장되며 업데이트 전 pnpm-workspace.yaml의 원래 상태를 포함합니다.",
            "사용 예제",
            "사용 가능한 백업 나열",
            "생성 타임스탬프와 파일 크기와 함께 모든 백업 파일을 표시합니다.",
            "최신 백업으로 롤백",
            "확인 없이 가장 최근 백업을 자동으로 복원합니다.",
            "대화형 백업 선택",
            "복원할 백업을 선택하는 대화형 프롬프트를 엽니다.",
            "오래된 백업 정리",
            "확인 프롬프트와 상세 출력으로 모든 백업 파일을 삭제합니다."
          ]
        ],
        [
          "대화형 기능 및 진행률 추적",
          "",
          [
            "PCU는 모든 명령어에서 고급 대화형 기능과 정교한 진행률 추적을 제공합니다.",
            "대화형 명령어 인터페이스",
            "패키지 선택 시스템",
            "스마트 다중 선택: 시각적 체크박스와 키보드 단축키로 특정 패키지 선택",
            "검색 및 필터: 패턴 매칭과 퍼지 검색이 포함된 실시간 패키지 필터링",
            "배치 작업: 카테고리 기반 선택으로 전체 그룹 선택/해제",
            "영향 미리보기: 업데이트를 적용하기 전에 잠재적 변경 사항 확인",
            "구성 마법사",
            "대화형 구성 마법사 (pcu init --interactive)는 다음을 제공합니다:",
            "작업공간 감지: 기존 PNPM 작업공간 자동 탐색",
            "템플릿 선택: 최소 및 전체 구성 템플릿 중 선택",
            "패키지 규칙 설정: 다양한 패키지 카테고리 (React, Vue, TypeScript) 규칙 구성",
            "레지스트리 구성: 사용자 정의 NPM 레지스트리 및 인증 설정",
            "유효성 검사 설정: 품질 게이트 및 안전 확인 구성",
            "디렉토리 및 파일 브라우저",
            "작업공간 탐색: 작업공간 선택을 위한 내장 파일 시스템 브라우저",
            "경로 유효성 검사: 작업공간 경로 및 구조의 실시간 유효성 검사",
            "미리보기 모드: 선택 확인 전 작업공간 내용 확인",
            "고급 진행률 추적",
            "다중 스타일 진행률 표시줄",
            "PCU는 명령어별 또는 전역적으로 구성 가능한 6가지 다른 진행률 표시줄 스타일을 제공합니다:",
            "진행률 기능",
            "다단계 추적: 다른 단계에서의 진행률 표시 (스캔 → 분석 → 업데이트)",
            "병렬 작업 상태: 동시 작업에 대한 개별 진행률 표시줄",
            "성능 지표: 실시간 속도 표시기, 예상 완료 시간, 경과 시간",
            "메모리 안전 표시: 터미널 깜빡임을 줄이는 안정적인 다중 라인 출력",
            "배치 처리 상태",
            "대기열 관리: 대기 중, 활성, 완료된 패키지 작업 표시",
            "충돌 해결: 피어 종속성 충돌의 대화형 처리",
            "오류 복구: 자세한 오류 컨텍스트와 함께 실패한 작업에 대한 건너뛰기/재시도 옵션",
            "롤백 기능: 업데이트 중 문제가 감지되면 변경 사항 실행 취소",
            "오류 처리 및 복구",
            "스마트 오류 감지",
            "유효성 검사 오류: 일반적인 실수에 대한 유용한 제안이 포함된 사전 확인",
            "네트워크 문제: 레지스트리 실패에 대한 지수 백오프를 포함한 자동 재시도",
            "종속성 충돌: 해결 권장사항이 포함된 자세한 충돌 분석",
            "권한 문제: 파일 시스템 권한 문제에 대한 명확한 안내",
            "대화형 복구 옵션",
            "건너뛰기 및 계속: 문제가 있는 패키지를 건너뛰고 나머지 업데이트 계속",
            "옵션을 포함한 재시도: 다른 매개변수로 실패한 작업 재시도",
            "변경 사항 롤백: 배치 작업 중 문제가 발생하면 부분 변경 사항 실행 취소",
            "오류 리포트 내보내기: 문제 해결을 위한 자세한 오류 리포트 생성",
            "작업공간 통합",
            "자동 탐색 기능",
            "PNPM 작업공간 감지: 작업공간 구성 자동 찾기 및 유효성 검사",
            "카탈로그 탐색: 기존 카탈로그 및 패키지 매핑 감지",
            "패키지 분석: 작업공간 구조 및 종속성 관계 분석",
            "구성 상속: 작업공간별 설정 자동 적용",
            "유효성 검사 및 상태 확인",
            "구조 유효성 검사: 작업공간이 PNPM 모범 사례를 따르는지 확인",
            "종속성 일관성: 패키지 간 버전 불일치 확인",
            "구성 무결성: 작업공간 구조에 대한 PCU 구성 유효성 검사",
            "건강 지표: 포괄적인 작업공간 건강 평가 제공",
            "사용 예제",
            "고급 기능을 포함한 대화형 업데이트",
            "멋진 진행률 표시줄과 최적화된 배치 처리가 포함된 대화형 업데이트를 실행합니다.",
            "미리보기가 포함된 구성",
            "미리보기 모드와 자세한 로깅이 포함된 구성 마법사를 실행합니다.",
            "오류 복구 워크플로",
            "대화형 오류 복구, 자동 백업 및 메이저 버전 확인을 통해 업데이트합니다."
          ]
        ],
        [
          "전역 옵션",
          "",
          [
            "이러한 옵션은 모든 명령어와 함께 작동하며 환경 변수를 통해 설정할 수 있습니다:",
            "작업공간 디렉토리 경로",
            "자세한 출력이 포함된 상세 로깅 활성화",
            "CI/CD 환경용 색상 출력 비활성화",
            "NPM 레지스트리 URL 재정의",
            "요청 타임아웃 (밀리초) (기본값: 30000)",
            "사용자 정의 구성 파일 경로",
            "버전 번호 출력 및 업데이트 확인",
            "명령어 도움말 표시",
            "환경 변수 사용법",
            "모든 전역 옵션과 명령어별 설정은 환경 변수를 통해 구성할 수 있습니다:",
            "핵심 환경 변수",
            "기본 작업공간 디렉토리 경로",
            "전역적으로 상세 로깅 활성화",
            "색상 출력 비활성화 (CI/CD에 유용)",
            "기본 NPM 레지스트리 URL",
            "요청 타임아웃 (밀리초)",
            "사용자 정의 구성 파일 경로",
            "명령어별 환경 변수",
            "확인/업데이트 작업에 사용할 기본 카탈로그",
            "기본 출력 형식: table, json, yaml, minimal",
            "기본 업데이트 대상: latest, greatest, minor, patch, newest",
            "기본적으로 프리릴리즈 버전 포함",
            "기본 패키지 포함 패턴",
            "기본 패키지 제외 패턴",
            "기본적으로 대화형 모드 활성화",
            "기본적으로 드라이런 모드 활성화",
            "확인 없이 업데이트 강제 실행",
            "업데이트 전 백업 파일 생성",
            "테마 및 표시 환경 변수",
            "기본 색상 테마: default, modern, minimal, neon",
            "진행률 표시줄 스타일: default, gradient, fancy, minimal, rainbow, neon",
            "환경 프리셋: development, production, presentation",
            "보안 및 캐시 환경 변수",
            "기본 보안 심각도 필터: low, moderate, high, critical",
            "자동으로 취약점 수정",
            "캐싱 시스템 활성화/비활성화",
            "캐시 생존 시간 (밀리초)",
            "사용자 정의 캐시 디렉토리 경로",
            "고급 구성 환경 변수",
            "병렬 네트워크 요청 수",
            "배치로 처리할 패키지 수",
            "실패한 작업에 대한 재시도 횟수",
            "시작 시 PCU CLI 업데이트 확인",
            "환경 변수 예제",
            "구성 우선순위",
            "설정은 다음 순서로 적용됩니다 (나중이 이전을 덮어씀):",
            "내장 기본값",
            "전역 구성 (~/.pcurc.json)",
            "프로젝트 구성 (.pcurc.json)",
            "환경 변수 (PCU_*)",
            "명령줄 플래그 (최고 우선순위)"
          ]
        ],
        [
          "자동 업데이트 시스템",
          "",
          [
            "PCU는 CLI 도구를 최신 기능 및 보안 패치로 유지하는 정교한 자동 업데이트 메커니즘을 포함합니다.",
            "자동 업데이트 확인",
            "기본적으로 PCU는 명령어를 실행할 때 업데이트를 확인합니다:",
            "업데이트 동작",
            "CI/CD 환경 감지",
            "PCU는 자동으로 CI/CD 환경을 감지하고 자동화된 파이프라인을 방해하지 않도록 업데이트 확인을 건너뜁니다:",
            "GitHub Actions: GITHUB_ACTIONS 환경 변수를 통해 감지",
            "CircleCI: CIRCLECI 환경 변수를 통해 감지",
            "Jenkins: JENKINS_URL 환경 변수를 통해 감지",
            "GitLab CI: GITLAB_CI 환경 변수를 통해 감지",
            "Azure DevOps: TF_BUILD 환경 변수를 통해 감지",
            "일반 CI: CI 환경 변수를 통해 감지",
            "업데이트 설치",
            "PCU는 자동 폴백과 함께 여러 패키지 관리자를 지원합니다:",
            "구성 옵션",
            "환경 변수",
            "버전 확인 및 업데이트 알림 완전히 비활성화",
            "업데이트 확인 간격 (시간) (기본값: 24)",
            "프롬프트 없이 업데이트 자동 설치 (주의해서 사용)",
            "업데이트 확인 요청 타임아웃 (밀리초) (기본값: 5000)",
            "구성 파일 설정",
            "업데이트 알림",
            "표준 알림",
            "보안 업데이트 알림",
            "프리릴리즈 알림",
            "수동 업데이트 명령어",
            "업데이트 문제 해결",
            "업데이트 확인 실패",
            "캐시 지우기",
            "권한 문제"
          ]
        ],
        [
          "캐시 관리 시스템",
          "",
          [
            "PCU는 성능을 최적화하고 네트워크 요청을 줄이기 위한 포괄적인 캐싱 시스템을 포함합니다.",
            "캐시 유형",
            "레지스트리 캐시",
            "NPM 패키지 메타데이터 및 버전 정보를 저장합니다:",
            "기본 TTL: 1시간 (3,600,000ms)",
            "최대 크기: 캐시 유형당 10MB",
            "최대 항목: 500개 패키지",
            "디스크 지속: 활성화",
            "작업공간 캐시",
            "작업공간 구성 및 package.json 파싱 결과를 저장합니다:",
            "기본 TTL: 5분 (300,000ms)",
            "최대 크기: 5MB",
            "최대 항목: 200개 작업공간",
            "디스크 지속: 비활성화 (메모리만)",
            "캐시 구성",
            "환경 변수",
            "전체 캐싱 시스템 활성화/비활성화",
            "기본 캐시 TTL (밀리초)",
            "최대 총 캐시 크기 (바이트) (기본값 50MB)",
            "최대 캐시 항목 수",
            "사용자 정의 캐시 디렉토리 경로",
            "캐시에 대한 디스크 지속성 활성화",
            "구성 파일 설정",
            "캐시 관리 명령어",
            "캐시 성능",
            "최적화 기능",
            "LRU 축출: 가장 오래 사용되지 않은 항목을 먼저 제거",
            "자동 정리: 5분마다 만료된 항목 제거",
            "크기 모니터링: 크기 제한을 초과하면 자동 축출",
            "병렬 처리: 캐시 작업이 주 스레드를 차단하지 않음",
            "성능 이점",
            "레지스트리 요청: NPM 레지스트리 호출 60-90% 감소",
            "작업공간 파싱: 반복 실행 시 작업공간 분석 80-95% 빨라짐",
            "네트워크 의존성: 네트워크 연결에 대한 의존성 감소",
            "시작 시간: 후속 작업에서 2-5배 빠른 시작"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "구성",
          null,
          [
            "PCU를 워크플로우와 프로젝트 요구사항에 맞게 구성하세요. 구성 파일, 패키지별 규칙 및 고급 설정에 대해 알아보세요. "
          ]
        ],
        [
          "구성 파일 유형",
          "",
          [
            "PCU는 다양한 개발 워크플로우를 수용하기 위해 여러 구성 파일 형식과 위치를 지원합니다.",
            "지원되는 구성 파일",
            "PCU는 다음 순서로 구성 파일을 검색합니다 (처음 발견된 것이 우선):",
            "프로젝트 루트의 기본 JSON 구성 파일",
            "동적 구성 지원이 있는 JavaScript 구성 파일",
            "대안 JavaScript 구성 파일명",
            "홈 디렉토리의 전역 사용자 구성",
            "package.json 내 \"pcu\" 키 아래 구성",
            "JavaScript 구성 지원",
            "JavaScript 구성 파일은 환경, 작업공간 구조 또는 기타 런타임 조건에 따른 동적 구성을 가능하게 합니다:",
            "Package.json 구성",
            "간단한 프로젝트의 경우 구성을 package.json 내에 포함할 수 있습니다:",
            "구성 유효성 검사",
            "PCU는 구성 파일을 자동으로 유효성 검사하고 일반적인 문제에 대한 자세한 오류 메시지를 제공합니다:",
            "유효성 검사 기능",
            "JSON 스키마 유효성 검사: 모든 구성 속성이 유효한지 확인",
            "패턴 유효성 검사: Glob 패턴과 패키지 이름 형식 검증",
            "타입 검사: 모든 구성 값의 올바른 데이터 타입 확인",
            "충돌 감지: 충돌하는 규칙과 구성 옵션 식별",
            "제안 시스템: 구성 오류 수정을 위한 유용한 제안 제공",
            "유효성 검사 예제"
          ]
        ],
        [
          ".pcurc.json 구성 파일 완전 참조",
          "pcurc-json",
          [
            "PCU는 여러 구성 파일 형식을 사용하며, 주로 프로젝트 루트 디렉토리의 .pcurc.json 파일로 구성됩니다. 수동으로 생성하거나 pcu init을 사용하여 기본 구성을 생성할 수 있습니다.",
            "완전한 구성 파일 구조",
            "구성 옵션 상세 설명",
            "defaults 기본 설정",
            "기본 업데이트 대상: latest | greatest | minor | patch | newest",
            "네트워크 요청 타임아웃 시간 (밀리초)",
            "업데이트 전 백업 파일 생성 여부",
            "기본적으로 대화형 모드 활성화 여부",
            "기본적으로 미리보기 모드 활성화 여부 (실제 업데이트 안 함)",
            "강제 업데이트 여부 (경고 건너뛰기)",
            "프리릴리즈 버전 포함 여부",
            "workspace 작업공간 설정",
            "작업공간 구조 자동 탐지 여부",
            "카탈로그 모드: strict | loose | mixed",
            "작업공간 루트 디렉토리 경로",
            "패키지 디렉토리 매칭 패턴 배열 (pnpm-workspace.yaml 덮어씀)",
            "output 출력 설정",
            "출력 형식: table | json | yaml | minimal",
            "컬러 출력 활성화 여부",
            "상세 출력 모드 활성화 여부",
            "ui 사용자 인터페이스 설정",
            "색상 테마: default | modern | minimal | neon",
            "진행률 표시줄 표시 여부",
            "진행률 표시줄 스타일: default | gradient | fancy | minimal | rainbow | neon",
            "애니메이션 효과 활성화 여부",
            "색상 체계: auto | light | dark",
            "update 업데이트 동작 설정",
            "업데이트 시 기본적으로 대화형 모드 활성화 여부",
            "먼저 미리보기를 실행한 후 적용할지 묻는지 여부",
            "프리릴리즈 버전 건너뛰기 여부",
            "메이저 버전 업데이트 시 확인 필요 여부",
            "배치 처리할 패키지 수",
            "security 보안 설정",
            "보안 취약점 자동 수정 여부",
            "보안 수정을 위한 메이저 버전 업데이트 허용 여부",
            "보안 업데이트 시 알림 여부",
            "보안 경고 수준 임계값: low | moderate | high | critical",
            "advanced 고급 설정",
            "동시 네트워크 요청 수",
            "네트워크 요청 타임아웃 시간 (밀리초)",
            "실패 시 재시도 횟수",
            "캐시 유효 기간 (분, 0은 캐시 비활성화)",
            "시작 시 PCU 도구 업데이트 확인 여부",
            "배치 처리할 최대 패키지 수",
            "cache 캐시 설정",
            "캐시 시스템 활성화 여부",
            "캐시 생존 시간 (밀리초)",
            "최대 캐시 크기 (바이트, 기본값 50MB)",
            "최대 캐시 항목 수",
            "디스크에 캐시 지속 여부",
            "캐시 디렉토리 경로",
            "registry 레지스트리 설정",
            "기본 NPM 레지스트리 URL",
            "레지스트리 요청 타임아웃 시간 (밀리초)",
            "레지스트리 요청 재시도 횟수",
            "패키지 필터링 설정",
            "포함할 패키지명 매칭 패턴 배열",
            "제외할 패키지명 매칭 패턴 배열",
            "notification 알림 설정",
            "알림 기능 활성화 여부",
            "업데이트 가능 시 알림 여부",
            "보안 경고 시 알림 여부",
            "logging 로그 설정",
            "로그 수준: error | warn | info | debug | trace",
            "로그 파일 경로 (선택사항)",
            "최대 로그 파일 수",
            "개별 로그 파일 최대 크기"
          ]
        ],
        [
          "패키지 필터링",
          "",
          [
            "include/exclude 패턴과 패키지별 규칙으로 업데이트할 패키지를 제어하세요.",
            "패키지 규칙 속성",
            "패키지 이름 매칭을 위한 Glob 패턴",
            "업데이트 대상: latest, greatest, minor, patch, newest",
            "이 패키지들을 업데이트하기 전 항상 확인 요청",
            "확인 없이 자동 업데이트",
            "동일한 업데이트 전략을 따르는 패키지들",
            "관련 패키지들을 함께 업데이트"
          ]
        ],
        [
          "보안 구성",
          "",
          [
            "보안 취약점 스캔 및 자동 수정을 구성하세요.",
            "보안 취약점 자동 확인 및 수정",
            "보안 수정을 위한 메이저 버전 업그레이드 허용",
            "보안 업데이트 시 알림 표시"
          ]
        ],
        [
          "모노레포 구성",
          "",
          [
            "여러 카탈로그를 가진 복잡한 모노레포 설정을 위한 특별 설정.",
            "여러 카탈로그에서 버전 동기화가 필요한 패키지들",
            "충돌 해결을 위한 카탈로그 우선순위 순서"
          ]
        ],
        [
          "고급 설정",
          "",
          [
            "고급 구성 옵션으로 성능과 동작을 세밀하게 조정하세요.",
            "동시 네트워크 요청 수",
            "네트워크 요청 타임아웃 (밀리초)",
            "실패 시 재시도 횟수",
            "캐시 유효 기간 (0은 캐싱 비활성화)",
            "시작 시 PCU 도구 업데이트 자동 확인. CI 환경에서는 건너뜀. 새 버전이 사용 가능할 때 업데이트\n알림과 설치 지침을 표시합니다."
          ]
        ],
        [
          "UI 구성",
          "ui",
          [
            "시각적 모양과 사용자 인터페이스 설정을 사용자 정의하세요.",
            "사용 가능한 테마",
            "default - 일반적인 사용을 위한 균형잡힌 색상",
            "modern - 개발 환경을 위한 생생한 색상",
            "minimal - 프로덕션 환경을 위한 깔끔하고 간단한 색상",
            "neon - 프레젠테이션을 위한 높은 대비 색상",
            "진행률 표시줄 스타일",
            "PCU는 작업 중 향상된 시각적 피드백을 위해 6가지 다른 진행률 표시줄 스타일을 지원합니다:",
            "default - 기본 스타일의 표준 진행률 표시줄",
            "gradient - 모던한 외관을 위한 그라데이션 색상 진행률 표시줄",
            "fancy - 장식 요소가 있는 향상된 진행률 표시줄",
            "minimal - 깔끔하고 간단한 진행률 지시기",
            "rainbow - 생생한 디스플레이를 위한 다색 진행률 표시줄",
            "neon - 네온 테마에 맞는 높은 대비 진행률 표시줄",
            "구성 예제:",
            "명령줄 사용법:"
          ]
        ],
        [
          "구성 우선순위",
          "",
          [
            "구성 설정은 다음 우선순위 순서로 적용됩니다:",
            "명령줄 플래그 (최고 우선순위)",
            "패키지별 규칙 in .pcurc.json",
            "일반 설정 in .pcurc.json",
            "기본값 (최저 우선순위)",
            "관련 패키지들은 자동으로 상위 패키지 규칙에서 설정을 상속받아 생태계 패키지들 간의 버전 일관성을\n보장합니다."
          ]
        ],
        [
          "예제",
          "",
          [
            "React 생태계",
            "TypeScript 프로젝트",
            "엔터프라이즈 설정"
          ]
        ],
        [
          "환경 변수",
          "",
          [
            "모든 CLI 옵션은 자동화 및 CI/CD 환경을 위해 환경 변수를 통해 구성할 수 있습니다:",
            "환경 변수 우선순위",
            "구성 소스는 다음 순서로 로드됩니다 (나중 것이 이전 것을 덮어씀):",
            "내장 기본값 (최저 우선순위)",
            "전역 구성 (~/.pcurc.json)",
            "프로젝트 구성 (.pcurc.json)",
            "환경 변수 (PCU_*)",
            "명령줄 플래그 (최고 우선순위)"
          ]
        ],
        [
          "레지스트리 구성",
          "",
          [
            "PCU는 레지스트리 설정을 위해 NPM 및 PNPM 구성 파일을 자동으로 읽습니다:",
            "레지스트리 우선순위",
            "CLI --registry 플래그 (최고 우선순위)",
            "PCU 구성 (.pcurc.json 레지스트리 섹션)",
            "프로젝트 .npmrc/.pnpmrc",
            "전역 .npmrc/.pnpmrc",
            "기본 NPM 레지스트리 (최저 우선순위)"
          ]
        ],
        [
          "향상된 캐싱 구성",
          "",
          [
            "PCU는 성능 향상을 위한 고급 캐싱 시스템을 포함합니다:",
            "캐시 설정",
            "캐싱 시스템 활성화/비활성화",
            "밀리초 단위 생존 시간 (기본값 1시간)",
            "바이트 단위 최대 캐시 크기 (기본값 50MB)",
            "최대 캐시 항목 수",
            "실행 간 캐시를 디스크에 저장",
            "지속적인 캐시 저장을 위한 디렉토리",
            "캐시 축출 전략: lru, fifo, lfu"
          ]
        ],
        [
          "유효성 검사 구성",
          "",
          [
            "PCU는 유용한 제안과 함께 포괄적인 유효성 검사를 포함합니다:",
            "유효성 검사 옵션",
            "추가 검사가 있는 엄격한 유효성 검사 모드 활성화",
            "잠재적으로 위험한 업데이트에 대한 경고 표시",
            "확인이 필요한 업데이트 유형: major, minor, patch",
            "유용한 제안과 팁 활성화",
            "성능 최적화 제안 포함",
            "모범 사례 권장사항 포함"
          ]
        ],
        [
          "대화형 모드 구성",
          "",
          [
            "대화형 프롬프트와 사용자 경험을 구성하세요:",
            "대화형 설정",
            "대화형 모드 기능 활성화",
            "목록에서 페이지당 표시되는 항목 수",
            "선택 목록에서 패키지 설명 표시",
            "업데이트에 대한 릴리스 노트 표시 (네트워크 필요)",
            "패키지 이름 자동 완성 활성화",
            "자동 완성을 위한 퍼지 매칭 활성화",
            "메이저 버전 업데이트에 대한 확인 요구"
          ]
        ],
        [
          "모노레포 구성",
          "",
          [
            "PCU는 대규모 모노레포와 복잡한 작업공간 관리를 위해 특별히 설계된 고급 기능을 제공합니다.",
            "버전 동기화",
            "모노레포 전체에서 관련 패키지를 동기화된 상태로 유지하세요:",
            "고급 작업공간 관리",
            "카탈로그 우선순위 시스템",
            "충돌이 발생할 때 어떤 카탈로그가 우선하는지 정의하세요:",
            "작업공간 간 종속성",
            "작업공간 패키지 간의 종속성을 분석하고 관리하세요:",
            "작업공간 간 종속성 분석",
            "버전 불일치 처리 방법: error, warn, off",
            "어떤 작업공간 패키지에서도 사용되지 않는 카탈로그 내 패키지 보고",
            "모든 작업공간 패키지가 카탈로그 버전을 사용하는지 검증",
            "모노레포별 패키지 규칙",
            "모노레포의 다양한 영역에 대한 정교한 규칙을 생성하세요:",
            "작업공간별 구성",
            "모노레포의 다른 부분에 대한 다른 구성:",
            "대규모 모노레포를 위한 성능 최적화",
            "배치 처리 구성",
            "각 배치에서 처리할 패키지 수",
            "최대 동시 작업 수",
            "실행 간 작업공간 패키지 탐색 캐시",
            "여러 카탈로그를 병렬로 처리",
            "메모리 관리",
            "모노레포 유효성 검사",
            "복잡한 작업공간 설정을 위한 포괄적인 유효성 검사:",
            "유효성 검사 규칙",
            "내부 종속성에 workspace: 프로토콜 사용 보장",
            "모든 종속성이 카탈로그로 커버되는지 확인",
            "모든 작업공간 패키지가 공유 종속성의 동일한 버전을 사용하도록 요구",
            "작업공간 패키지 간 순환 종속성 탐지",
            "모노레포 사용 예제",
            "대규모 엔터프라이즈 모노레포 설정",
            "CI/CD 최적화 구성"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "개발",
          null,
          [
            "PCU 개발 환경을 설정하고 프로젝트에 기여하는 방법을 알아보세요. 이 가이드는 프로젝트 설정, 아키텍처 및 개발 워크플로우를 다룹니다. "
          ]
        ],
        [
          "사전 요구사항",
          "",
          [
            "PCU 개발을 시작하기 전에 필요한 도구가 있는지 확인하세요:",
            "개발을 위해서는 Node.js >= 22.0.0과 pnpm >= 10.0.0이 필요합니다."
          ]
        ],
        [
          "프로젝트 설정",
          "",
          [
            "개발 환경을 복제하고 설정하세요:"
          ]
        ],
        [
          "프로젝트 아키텍처",
          "",
          [
            "PCU는 관심사의 명확한 분리와 함께 클린 아키텍처 원칙을 따릅니다:",
            "아키텍처 계층",
            "사용자 인터페이스, 명령 파싱, 출력 포매팅",
            "비즈니스 로직 오케스트레이션, 사용 사례",
            "핵심 비즈니스 엔티티, 값 객체, 저장소 인터페이스",
            "외부 API 클라이언트, 파일 시스템 접근, 저장소 구현",
            "공유 유틸리티, 구성, 로깅, 오류 처리"
          ]
        ],
        [
          "개발 워크플로우",
          "",
          [
            "변경 사항 만들기",
            "기능 브랜치 생성:",
            "코딩 표준을 따라 변경 사항 작성",
            "변경 사항에 대한 테스트 추가:",
            "품질 검사 통과 확인:",
            "변경 사항 커밋:",
            "테스트 전략",
            "PCU는 포괄적인 테스트 접근 방식을 사용합니다:",
            "코드 품질",
            "PCU는 높은 코드 품질 표준을 유지합니다:"
          ]
        ],
        [
          "기능 추가",
          "",
          [
            "새 명령 만들기",
            "명령 핸들러 생성 in apps/cli/src/cli/commands/:",
            "비즈니스 로직 추가 in packages/core/src/application/services/",
            "CLI와 핵심 로직 모두에 대한 테스트 생성",
            "문서 업데이트",
            "새 출력 형식 추가",
            "포매터 생성 in apps/cli/src/cli/formatters/:",
            "주 포매터 레지스트리에 포매터 등록",
            "테스트 추가 및 문서 업데이트"
          ]
        ],
        [
          "기여 가이드라인",
          "",
          [
            "커밋 메시지 규칙",
            "PCU는 Conventional Commits를 사용합니다:",
            "Pull Request 프로세스",
            "저장소 포크 및 기능 브랜치 생성",
            "개발 워크플로우에 따라 변경 사항 작성",
            "모든 테스트 통과 및 코드 품질 검사 성공 확인",
            "필요시 문서 업데이트",
            "다음을 포함한 pull request 제출:",
            "변경 사항에 대한 명확한 설명",
            "관련 이슈 링크",
            "UI 변경에 대한 스크린샷",
            "해당되는 경우 Breaking Change 노트",
            "코드 리뷰 체크리스트",
            "모든 테스트 통과",
            "코드 커버리지 유지 (>85%)",
            "TypeScript 타입이 올바름",
            "코드 스타일이 프로젝트 표준을 따름",
            "문서 업데이트됨",
            "Breaking Changes 문서화됨",
            "성능 영향 고려됨"
          ]
        ],
        [
          "디버깅",
          "",
          [
            "개발 디버깅",
            "테스트 디버깅"
          ]
        ],
        [
          "빌드 및 배포",
          "",
          [
            "로컬 테스트",
            "릴리스 프로세스",
            "apps/cli/CHANGELOG.md 의 ## Unreleased 아래에 릴리스 노트를 정리합니다.",
            "빌드 및 테스트:",
            "GitHub Actions Release 워크플로를 실행합니다 (관리자만):",
            "patch, minor, major: CLI 버전을 올리고, 릴리스 변경을 커밋하고, 태그를 만들고, pcu 와 pnpm-catalog-updates 를 배포하고, GitHub Release 까지 한 번에 처리합니다",
            "current: 저장소에 이미 커밋된 버전을 그대로 배포합니다",
            "dry_run: true: 실제 배포 없이 흐름만 검증합니다"
          ]
        ],
        [
          "도움 받기",
          "",
          [
            "📖 문서: 자세한 가이드는 이 문서를 확인하세요",
            "🐛 이슈: GitHub Issues를 통해 버그 신고",
            "💬 토론: GitHub Discussions에서 질문하기",
            "🔧 개발: 이슈 및 PR에서 개발 토론 참여"
          ]
        ],
        [
          "고급 아키텍처 세부사항",
          "",
          [
            "핵심 도메인 모델",
            "Domain-Driven Design (DDD) 원칙을 기반으로 한 PCU의 핵심 도메인:",
            "서비스 계층 아키텍처",
            "애플리케이션 계층은 서비스를 통해 비즈니스 로직을 오케스트레이션합니다:",
            "CLI 계층 디자인",
            "CLI 계층은 핵심 도메인에 대한 깔끔한 인터페이스를 제공합니다:",
            "테스트 아키텍처",
            "모든 계층에 걸친 포괄적인 테스트 전략:",
            "성능 고려사항",
            "PCU는 대형 모노레포에서의 성능을 위해 최적화되었습니다:"
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "예시",
          null,
          [
            "PCU를 최대한 활용하는 데 도움이 되는 실제 예시와 사용 사례입니다. 간단한 업데이트부터 복잡한 모노레포 관리까지. "
          ]
        ],
        [
          "기본 워크플로우",
          "",
          [
            "일일 종속성 확인",
            "일일 개발 루틴의 일부로 업데이트를 확인하세요:",
            "백업과 함께 안전한 업데이트",
            "자동 백업과 함께 종속성을 안전하게 업데이트하세요:",
            "타겟별 업데이트",
            "특정 유형의 변경 사항만 업데이트하세요:"
          ]
        ],
        [
          "멀티 카탈로그 워크스페이스",
          "",
          [
            "레거시 지원 시나리오",
            "하나의 워크스페이스에서 여러 React 버전 관리:",
            "패키지 사용법"
          ]
        ],
        [
          "구성 예시",
          "",
          [
            "React 생태계 관리",
            "React 및 관련 패키지의 조정된 업데이트:",
            "TypeScript 프로젝트 구성",
            "자동 타입 정의가 포함된 보수적인 TypeScript 업데이트:",
            "기업용 구성",
            "엄격한 제어가 포함된 기업용 구성:"
          ]
        ],
        [
          "CI/CD 통합",
          "ci-cd",
          [
            "GitHub Actions",
            "CI 파이프라인에서 종속성 확인 자동화:"
          ]
        ],
        [
          "오류 처리 및 문제 해결",
          "",
          [
            "네트워크 문제",
            "네트워크 문제 및 레지스트리 접근 처리:",
            "워크스페이스 유효성 검사",
            "워크스페이스 설정 유효성 검사:",
            "프라이빗 레지스트리",
            "PCU는 자동으로 .npmrc 및 .pnpmrc 구성을 읽습니다:"
          ]
        ],
        [
          "고급 사용 사례",
          "",
          [
            "영향 분석",
            "특정 패키지 업데이트의 영향 분석:",
            "선택적 업데이트",
            "특정 패키지나 패턴만 업데이트:",
            "드라이 런 분석",
            "적용하기 전에 변경 사항 미리보기:"
          ]
        ],
        [
          "모범 사례",
          "",
          [
            "일일 워크플로우",
            "아침 확인: pcu -c로 사용 가능한 업데이트 확인",
            "영향 검토: 중요한 업데이트에 대해 pcu -a 사용",
            "안전한 업데이트: 백업과 함께 대화형 업데이트 pcu -i -b",
            "테스트: 업데이트 후 테스트 스위트 실행",
            "커밋: 종속성 업데이트를 별도로 커밋",
            "팀 워크플로우",
            "공유 구성: .pcurc.json을 버전 관리에 커밋",
            "정기 검토: 주간 종속성 검토 회의 일정",
            "보안 우선순위: 항상 보안 업데이트 우선 처리",
            "문서화: 주요 종속성 결정 문서화",
            "롤백 계획: 쉬운 롤백을 위한 백업 유지",
            "릴리스 워크플로우",
            "프리 릴리스 확인: 릴리스 전 pcu -c --target patch",
            "보안 스캔: CI에서 autoFixVulnerabilities 활성화",
            "버전 고정: 프로덕션 릴리스에 정확한 버전 사용",
            "업데이트 일정: 릴리스 간 종속성 업데이트 계획"
          ]
        ],
        [
          "보안 모니터링",
          "",
          [
            "지속적 보안 스캔",
            "개발 워크플로우에 보안 스캔 통합:",
            "보안 중심 CI/CD"
          ]
        ],
        [
          "테마 사용자 정의",
          "",
          [
            "대화형 테마 설정",
            "팀을 위한 PCU 모양 구성:",
            "팀 테마 구성"
          ]
        ],
        [
          "성능 최적화",
          "",
          [
            "대형 모노레포 구성",
            "수백 개의 패키지가 있는 대형 워크스페이스에 대한 PCU 최적화:",
            "선택적 처리"
          ]
        ],
        [
          "마이그레이션 예시",
          "",
          [
            "npm-check-updates에서",
            "ncu에서 PCU로 마이그레이션:",
            "pnpm 카탈로그로 변환",
            "기존 워크스페이스를 pnpm 카탈로그 사용으로 변환:"
          ]
        ],
        [
          "마이그레이션 가이드",
          "",
          [
            "npm-check-updates에서 마이그레이션",
            "npm-check-updates에서 pnpm 카탈로그 관리를 위한 PCU로 원활하게 전환:",
            "마이그레이션 단계",
            "비교를 위해 ncu와 함께 PCU를 임시로 설치",
            "PCU 구성 초기화:",
            "동등한 기능을 보장하기 위해 출력 비교:",
            "ncu 구성에서 패키지 규칙 마이그레이션",
            "PCU에 익숙해지면 ncu 제거",
            "Dependabot에서 마이그레이션",
            "더 세밀한 제어를 위해 Dependabot을 PCU로 교체:",
            "Renovate에서 마이그레이션",
            "고급 구성으로 Renovate에서 PCU로 전환:",
            "주요 차이점",
            "| 기능         | Renovate      | PCU                    |\n| ------------ | ------------- | ---------------------- |\n| 범위     | 개별 패키지   | 카탈로그 수준 업데이트 |\n| 구성     | renovate.json | .pcurc.json            |\n| UI       | 웹 대시보드   | 터미널 + CI 통합       |\n| 모노레포 | 복잡한 구성   | 내장 워크스페이스 지원 |",
            "마이그레이션 구성"
          ]
        ],
        [
          "CI/CD 워크플로우 통합",
          "ci-cd-2",
          [
            "GitHub Actions 통합",
            "자동화된 종속성 관리를 위한 완전한 GitHub Actions 설정:",
            "GitLab CI 통합",
            "PCU 종속성 관리를 위한 GitLab CI 파이프라인:",
            "Jenkins 파이프라인 통합",
            "기업 종속성 관리를 위한 Jenkins 파이프라인:",
            "Azure DevOps 파이프라인",
            "PCU 통합을 위한 Azure DevOps 파이프라인:",
            "Docker 통합",
            "일관된 CI/CD 환경을 위한 컨테이너화된 PCU:"
          ]
        ],
        [
          "기업 워크플로우",
          "",
          [
            "다중 환경 관리",
            "개발, 스테이징, 프로덕션 환경에 걸친 종속성 관리:",
            "승인 워크플로우",
            "중요한 업데이트에 대한 승인 워크플로우 구현:"
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "자주 묻는 질문",
          null,
          [
            "PCU에 대한 일반적인 질문에 대한 빠른 답변입니다. 찾고 있는 내용을 찾을 수 없으신가요? 문제 해결 가이드를 확인하거나 이슈를 등록해 주세요. "
          ]
        ],
        [
          "설치 및 설정",
          "",
          [
            "PCU를 어떻게 설치하나요?",
            "PCU는 npm, pnpm 또는 yarn을 통해 전역적으로 설치할 수 있습니다:",
            "시스템 요구사항은 무엇인가요?",
            "Node.js: >= 18.0.0 (LTS 권장)",
            "pnpm: >= 8.0.0",
            "운영체제: Windows, macOS, Linux",
            "PCU를 사용하려면 pnpm 워크스페이스가 필요한가요?",
            "네, PCU는 카탈로그 의존성을 사용하는 pnpm 워크스페이스를 위해 특별히 설계되었습니다. 아직 워크스페이스가 없다면 pcu init을 실행하여 생성하세요.",
            "npm이나 yarn 프로젝트에서 PCU를 사용할 수 있나요?",
            "아니요, PCU는 카탈로그 의존성을 사용하는 pnpm 워크스페이스 전용입니다. 다른 패키지 관리자의 경우 npm-check-updates나 yarn upgrade-interactive 같은 도구를 고려해보세요."
          ]
        ],
        [
          "구성",
          "",
          [
            ".pcurc.json 구성을 어디에 두어야 하나요?",
            "워크스페이스 루트 디렉토리(pnpm-workspace.yaml과 같은 레벨)에 두세요. PCU는 또한 다음을 지원합니다:",
            "전역 구성: ~/.pcurc.json",
            "프로젝트 구성: ./.pcurc.json (최우선순위)",
            "워크스페이스 레벨과 전역 구성의 차이점은 무엇인가요?",
            "전역 (~/.pcurc.json): 다른 프로젝트 간 모든 PCU 작업에 적용",
            "프로젝트 (./.pcurc.json): 현재 워크스페이스에 특정하며 전역 설정을 재정의",
            "다른 패키지에 대해 다른 업데이트 전략을 구성할 수 있나요?",
            "네! 구성에서 패키지 규칙을 사용하세요:"
          ]
        ],
        [
          "명령어 및 사용법",
          "",
          [
            "pcu check와 pcu -c의 차이점은 무엇인가요?",
            "동일합니다! PCU는 전체 명령어 이름과 짧은 별칭을 모두 지원합니다:",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "특정 유형의 패키지만 업데이트하려면 어떻게 하나요?",
            "--include 및 --exclude 플래그를 사용하세요:",
            "업데이트 대상 간의 차이점은 무엇인가요?",
            "patch: 버그 수정만 (1.0.0 → 1.0.1)",
            "minor: 새 기능, 하위 호환 (1.0.0 → 1.1.0)",
            "latest: 주요 변경사항을 포함한 최신 안정 버전 (1.0.0 → 2.0.0)",
            "greatest: 프리릴리스를 포함한 최신 버전 (1.0.0 → 2.0.0-beta.1)",
            "실제로 업데이트하기 전에 무엇이 업데이트될지 확인하려면 어떻게 하나요?",
            "--dry-run 플래그를 사용하세요:",
            "이것은 변경사항을 적용하지 않고 정확히 무엇이 업데이트될지 보여줍니다."
          ]
        ],
        [
          "문제 해결",
          "",
          [
            "PCU가 \"pnpm 워크스페이스를 찾을 수 없음\"이라고 하는 이유는 무엇인가요?",
            "PCU가 현재 디렉토리에서 pnpm-workspace.yaml 파일을 찾을 수 없다는 의미입니다. 해결방법:",
            "워크스페이스 생성: pcu init 실행",
            "워크스페이스 루트로 이동: pnpm-workspace.yaml이 있는 디렉토리로 cd",
            "워크스페이스 경로 지정: pcu -c --workspace /path/to/workspace",
            "PCU가 \"카탈로그 의존성을 찾을 수 없음\"이라고 하는 이유는 무엇인가요?",
            "워크스페이스가 아직 카탈로그 의존성을 사용하지 않습니다. 다음이 필요합니다:",
            "워크스페이스 파일의 카탈로그:",
            "패키지에서 카탈로그 사용:",
            "PCU가 매우 느리게 실행됩니다. 성능을 어떻게 개선할 수 있나요?",
            "다음 최적화를 시도해보세요:",
            "동시성 줄이기: pcu check --concurrency 2",
            "타임아웃 늘리기: pcu check --timeout 60000",
            "캐싱 활성화: PCU_CACHE_ENABLED=true 확인 (기본값)",
            "필터링 사용: 특정 패키지에 대해 pcu check --include \"react*\"",
            "\"ENOTFOUND registry.npmjs.org\" 오류를 어떻게 수정하나요?",
            "이것은 네트워크 연결 문제입니다:",
            "인터넷 연결 확인: ping registry.npmjs.org",
            "프록시 구성: HTTP_PROXY 및 HTTPS_PROXY 환경 변수 설정",
            "기업 레지스트리 사용: 회사 레지스트리로 .npmrc 구성",
            "타임아웃 늘리기: PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "보안",
          "",
          [
            "PCU는 보안 취약점을 어떻게 처리하나요?",
            "PCU는 npm audit 및 선택적으로 Snyk과 통합됩니다:",
            "모든 보안 취약점을 자동 수정해야 하나요?",
            "--auto-fix 사용 시 주의하세요:",
            "✅ 안전: 보안 수정을 위한 패치 및 마이너 업데이트",
            "⚠️ 검토 필요: 앱을 손상시킬 수 있는 메이저 버전 업데이트",
            "❌ 피하기: 테스트 없이 프로덕션에서 무분별하게 자동 수정",
            "보안 경고 오탐을 어떻게 처리하나요?",
            ".pcurc.json에서 무시된 취약점을 구성하세요:"
          ]
        ],
        [
          "워크플로 및 CI/CD",
          "ci-cd",
          [
            "CI/CD 파이프라인에서 PCU를 사용할 수 있나요?",
            "물론입니다! PCU는 자동화를 위해 설계되었습니다:",
            "완전한 예제는 CI/CD 통합 가이드를 참조하세요.",
            "자동화된 의존성 업데이트 PR을 어떻게 생성하나요?",
            "PCU를 GitHub Actions, GitLab CI 또는 다른 플랫폼과 함께 사용하세요:",
            "전체 워크플로는 CI/CD 통합 가이드를 확인하세요.",
            "팀 협업을 위한 최적의 워크플로는 무엇인가요?",
            "공유 구성: .pcurc.json을 버전 관리에 커밋",
            "정기 검토: 주간 의존성 검토 회의 일정",
            "보안 우선: 항상 보안 업데이트를 우선시",
            "점진적 업데이트: 대량 일괄 업데이트보다 작고 빈번한 업데이트 선호",
            "테스트: 업데이트 후 병합하기 전에 항상 테스트"
          ]
        ],
        [
          "고급 사용법",
          "",
          [
            "하나의 워크스페이스에서 여러 카탈로그를 사용할 수 있나요?",
            "네! PNPM은 여러 카탈로그를 지원합니다:",
            "그런 다음 패키지에서 사용하세요:",
            "특정 패키지 업데이트의 영향을 어떻게 분석하나요?",
            "분석 명령어를 사용하세요:",
            "특정 패키지를 업데이트에서 영구적으로 제외할 수 있나요?",
            "네, .pcurc.json에서 제외사항을 구성하세요:",
            "100개 이상의 패키지가 있는 모노레포를 어떻게 처리하나요?",
            "대규모 모노레포를 위한 성능 팁:",
            "배치 처리: 고급 설정에서 batchSize: 10 구성",
            "동시성 줄이기: 레지스트리 과부하를 피하기 위해 concurrency: 2 설정",
            "필터링 사용: --include 패턴으로 패키지를 그룹별로 처리",
            "캐싱 활성화: 캐싱이 활성화되고 올바르게 구성되었는지 확인",
            "메모리 증가: NODE_OPTIONS=\"--max-old-space-size=8192\" 설정"
          ]
        ],
        [
          "오류 메시지",
          "",
          [
            "\"피어 의존성을 해결할 수 없습니다\"",
            "이것은 패키지 버전이 충돌할 때 발생합니다. 해결방법:",
            "관련 패키지를 함께 업데이트: pcu update --include \"react*\"",
            "대화형 모드 사용: pcu update --interactive로 신중하게 버전 선택",
            "피어 의존성 확인: 각 패키지가 요구하는 것을 검토",
            "여러 카탈로그 사용: 충돌하는 버전을 다른 카탈로그로 분리",
            "\".pcurc.json의 구성이 유효하지 않습니다\"",
            "구성 파일에 JSON 구문 오류가 있습니다:",
            "\"명령어를 찾을 수 없습니다: pcu\"",
            "설치 또는 PATH 문제:",
            "전역 재설치: npm install -g pcu",
            "PATH 확인: npm 전역 bin이 PATH에 있는지 확인",
            "npx 사용: 대안으로 npx pnpm-catalog-updates check",
            "pnpm 사용: pnpm add -g pnpm-catalog-updates (권장)"
          ]
        ],
        [
          "통합 및 도구",
          "",
          [
            "PCU가 Renovate 또는 Dependabot과 호환되나요?",
            "PCU는 이러한 도구의 대안이며, 보완재가 아닙니다:",
            "PCU: 수동 제어, pnpm 전용, 카탈로그 중심",
            "Renovate: 자동화된 PR, 많은 패키지 관리자 지원",
            "Dependabot: GitHub 통합, 자동화된 보안 업데이트",
            "워크플로 선호도에 따라 선택하세요. 마이그레이션에 대해서는 마이그레이션 가이드를 참조하세요.",
            "PCU를 IDE와 통합할 수 있나요?",
            "공식 IDE 확장은 없지만 다음을 할 수 있습니다:",
            "npm 스크립트 추가: package.json에서 명령어 구성",
            "작업 실행기 사용: VS Code 작업 또는 유사한 것과 통합",
            "터미널 통합: 대부분의 IDE가 터미널 통합을 지원",
            "PCU가 사설 npm 레지스트리를 지원하나요?",
            "네! PCU는 .npmrc 구성을 읽습니다:",
            "PCU는 각 패키지 스코프에 대해 올바른 레지스트리를 자동으로 사용합니다."
          ]
        ],
        [
          "여전히 질문이 있으신가요?",
          "",
          [
            "📖 문서: 포괄적인 명령어 참조를 확인하세요",
            "🛠️ 문제 해결: 문제 해결 가이드를 방문하세요",
            "🐛 버그 신고: 이슈 생성",
            "💬 토론: GitHub 토론"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "마이그레이션 가이드",
          null,
          [
            "기존 의존성 관리 솔루션에서 PCU로 마이그레이션하고 팀을 pnpm 카탈로그 의존성으로 전환하는 방법을 알아보세요. "
          ]
        ],
        [
          "마이그레이션 개요",
          "",
          [
            "PCU는 카탈로그 의존성을 사용하는 pnpm 워크스페이스를 위해 특별히 설계되었습니다. 현재 다른 도구나 패키지 관리자를 사용하고 있다면, 이 가이드가 원활한 전환에 도움이 될 것입니다.",
            "시작하기 전에",
            "PCU의 전제조건:",
            "패키지 관리자로서의 pnpm (버전 8.0.0+)",
            "워크스페이스 구성 (pnpm-workspace.yaml)",
            "워크스페이스의 카탈로그 의존성",
            "마이그레이션 의사결정 매트릭스:",
            "| 현재 도구                | 마이그레이션 복잡성 | 이점                             | 고려사항                    |\n| ------------------------ | ------------------- | -------------------------------- | --------------------------- |\n| npm-check-updates        | 낮음                | 더 나은 pnpm 통합, 카탈로그 지원 | pnpm 워크스페이스 설정 필요 |\n| 수동 업데이트            | 낮음                | 자동화, 일관성, 보안 스캔        | 초기 구성 작업              |\n| Renovate                 | 중간                | 수동 제어, 워크스페이스별 기능   | 자동화 손실                 |\n| Dependabot               | 중간                | 향상된 카탈로그 관리             | GitHub 특정 기능            |\n| yarn upgrade-interactive | 높음                | 카탈로그 이점, 더 나은 성능      | 완전한 패키지 관리자 변경   |"
          ]
        ],
        [
          "npm-check-updates에서 마이그레이션",
          "npm-check-updates",
          [
            "현재 설정 분석",
            "현재 npm-check-updates (ncu)를 사용하고 있다면, 다음과 같은 스크립트가 있을 것입니다:",
            "마이그레이션 단계",
            "1. pnpm 설치 및 워크스페이스 설정",
            "2. 카탈로그로 의존성 변환",
            "기존 package.json 의존성을 카탈로그 의존성으로 변환:",
            "3. PCU 구성",
            ".pcurc.json 생성:",
            "4. 스크립트 업데이트",
            "기존 ncu 스크립트를 PCU로 교체:",
            "5. 첫 실행 검증",
            "기능 매핑",
            "| ncu 명령어               | PCU 동등 명령어                  | 참고사항                  |\n| ------------------------ | -------------------------------- | ------------------------- |\n| ncu                    | pcu check                      | 사용 가능한 업데이트 표시 |\n| ncu -u                 | pcu update                     | 의존성 업데이트           |\n| ncu -i                 | pcu interactive                | 대화형 업데이트 선택      |\n| ncu --target minor     | pcu update --target minor      | 특정 업데이트 레벨 타겟   |\n| ncu --filter \"react*\"  | pcu update --include \"react*\"  | 패턴별 필터링             |\n| ncu --reject \"eslint*\" | pcu update --exclude \"eslint*\" | 패키지 제외               |\n| ncu --doctor           | 해당 없음                      | PCU는 자동 테스트 미지원  |"
          ]
        ],
        [
          "Renovate에서 마이그레이션",
          "renovate",
          [
            "현재 Renovate 구성 분석",
            "기존 renovate.json:",
            "전환 전략",
            "1. Renovate 비활성화",
            "2. 동등한 PCU 구성",
            "3. CI/CD 파이프라인 설정",
            "Renovate의 자동 PR 생성을 CI/CD로 대체:"
          ]
        ],
        [
          "Dependabot에서 마이그레이션",
          "dependabot",
          [
            "Dependabot 구성 비활성화",
            ".github/dependabot.yml:",
            "PCU로 보안 업데이트 처리"
          ]
        ],
        [
          "yarn에서 pnpm으로 완전 마이그레이션",
          "yarn-pnpm",
          [
            "전체 패키지 관리자 변경",
            "1. 기존 yarn 아티팩트 정리",
            "2. pnpm으로 전환",
            "3. 스크립트 및 구성 업데이트",
            "4. 팀 전환"
          ]
        ],
        [
          "팀 전환 전략",
          "",
          [
            "점진적 채택",
            "1단계: 병렬 실행",
            "기존 도구와 PCU를 모두 유지",
            "PCU로 업데이트 확인만 수행",
            "3-4주간 비교 테스트",
            "2단계: 파일럿 프로젝트",
            "작은 프로젝트에서 PCU 전면 사용",
            "팀 피드백 수집",
            "워크플로 개선",
            "3단계: 전면 전환",
            "모든 프로젝트에서 PCU 사용",
            "기존 도구 제거",
            "문서화 및 교육",
            "교육 자료",
            "팀용 체크리스트:",
            "[ ] pnpm 설치 (npm install -g pnpm)",
            "[ ] PCU 설치 (pnpm add -g pnpm-catalog-updates)",
            "[ ] 기본 명령어 학습 (pcu check, pcu update)",
            "[ ] 구성 파일 이해 (.pcurc.json)",
            "[ ] 긴급 롤백 절차 숙지",
            "일반적인 명령어 참조:"
          ]
        ],
        [
          "문제 해결",
          "",
          [
            "일반적인 마이그레이션 문제",
            "워크스페이스 감지 실패",
            "카탈로그 의존성 오류",
            "성능 문제",
            "롤백 절차",
            "즉각적인 롤백이 필요한 경우:"
          ]
        ],
        [
          "마이그레이션 후 최적화",
          "",
          [
            "고급 구성",
            "마이그레이션 완료 후 성능 최적화:",
            "모니터링 설정",
            "성공 측정",
            "마이그레이션 성공을 측정하는 지표:",
            "업데이트 빈도: 주간 의존성 업데이트 수",
            "보안 대응 시간: 취약점 발견에서 수정까지의 시간",
            "팀 채택률: PCU를 사용하는 개발자 비율",
            "자동화 수준: 수동 개입 없이 처리되는 업데이트 비율",
            "마이그레이션에 대한 추가 도움이 필요하시면 GitHub 토론에 참여하거나 이슈를 등록해 주세요."
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "성능 최적화",
          null,
          [
            "대규모 모노레포, 복잡한 워크스페이스, 리소스 제약 환경에서 PCU 성능을 최대화하세요. "
          ]
        ],
        [
          "PCU 성능 이해하기",
          "pcu",
          [
            "PCU 성능은 여러 요소에 따라 달라집니다:",
            "네트워크 지연: 레지스트리 응답 시간 및 대역폭",
            "워크스페이스 크기: 패키지 및 의존성 수",
            "캐시 효율성: 히트율 및 저장소 최적화",
            "시스템 리소스: CPU, 메모리, 디스크 I/O",
            "구성: 동시성 설정 및 타임아웃 값",
            "성능 프로파일링",
            "상세한 성능 모니터링 활성화:",
            "출력 분석 예시:"
          ]
        ],
        [
          "구성 최적화",
          "",
          [
            "동시성 설정",
            "환경에 맞는 동시 작업 최적화:",
            "동시성 가이드라인:",
            "소규모 프로젝트 (20개 미만 패키지): concurrency: 5-8",
            "중간 프로젝트 (20-100개 패키지): concurrency: 3-5",
            "대규모 프로젝트 (100개 이상 패키지): concurrency: 1-3",
            "CI/CD 환경: concurrency: 2-3",
            "메모리 관리",
            "Node.js 메모리 최적화:",
            "PCU 메모리 구성:"
          ]
        ],
        [
          "캐싱 전략",
          "",
          [
            "로컬 캐시 최적화",
            "캐시 구성:",
            "환경 변수:",
            "캐시 관리 명령어",
            "CI/CD 캐시 통합"
          ]
        ],
        [
          "네트워크 최적화",
          "",
          [
            "레지스트리 구성",
            "레지스트리 선택 최적화:",
            "연결 최적화:",
            "대역폭 관리"
          ]
        ],
        [
          "대규모 모노레포 전략",
          "",
          [
            "워크스페이스 분할",
            "대형 워크스페이스 구성:",
            "선택적 처리:",
            "점진적 처리",
            "단계적 업데이트:",
            "처리 워크플로:"
          ]
        ],
        [
          "메모리 및 리소스 관리",
          "",
          [
            "메모리 프로파일링",
            "메모리 사용량 모니터링:",
            "메모리 최적화 기법:",
            "디스크 I/O 최적화",
            "SSD vs HDD 구성:",
            "파일 시스템 캐싱:"
          ]
        ],
        [
          "성능 모니터링",
          "",
          [
            "메트릭 수집",
            "내장 메트릭:",
            "사용자 정의 모니터링:",
            "벤치마킹",
            "성능 벤치마크:",
            "성능 튜닝 가이드",
            "단계별 최적화:",
            "기준 측정",
            "캐싱 활성화",
            "동시성 최적화",
            "네트워크 최적화",
            "메모리 튜닝"
          ]
        ],
        [
          "성능 문제 해결",
          "",
          [
            "일반적인 성능 문제",
            "느린 네트워크 요청:",
            "메모리 문제:",
            "캐시 문제:",
            "성능 회귀 감지",
            "자동화된 성능 테스팅:"
          ]
        ],
        [
          "환경별 최적화",
          "",
          [
            "로컬 개발",
            "개발자 머신 설정:",
            "CI/CD 환경",
            "다양한 CI 제공업체별 최적화:",
            "프로덕션 배포",
            "프로덕션급 구성:"
          ]
        ],
        [
          "성능 체크리스트",
          "",
          [
            "빠른 개선사항",
            "영구 캐싱 활성화: export PCU_CACHE_ENABLED=true",
            "환경에 맞는 동시성 최적화",
            "지리적으로 가까운 레지스트리 사용",
            "대형 프로젝트를 위한 Node.js 힙 크기 증가",
            "요청 압축 및 keep-alive 활성화",
            "고급 최적화",
            "CI/CD 캐싱 전략 구현",
            "대규모 모노레포를 위한 워크스페이스 분할 구성",
            "성능 모니터링 및 알림 설정",
            "지속적인 작업을 위한 메모리 관리 최적화",
            "점진적 처리 워크플로 구현",
            "모니터링 및 유지보수",
            "정기적인 성능 벤치마킹",
            "캐시 상태 모니터링",
            "네트워크 지연 측정",
            "메모리 사용량 프로파일링",
            "성능 회귀 감지"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "빠른 시작",
          null,
          [
            "몇 분 안에 pnpm-catalog-updates를 시작하세요. 이 가이드는 설치, 초기화 및 첫 번째 종속성 업데이트를 안내합니다. ",
            "pnpm-catalog-updates는 카탈로그 종속성을 사용하는 pnpm 작업공간을 위해 특별히 설계되었습니다.\n시작하기 전에 pnpm 작업공간이 있는지 확인하세요."
          ]
        ],
        [
          "설치",
          "",
          [
            "선호하는 설치 방법을 선택하세요:"
          ]
        ],
        [
          "작업공간 초기화",
          "",
          [
            "아직 pnpm 작업공간이 없다면, PCU가 생성해 드릴 수 있습니다:",
            "이 명령어는 다음을 생성합니다:",
            ".pcurc.json - PCU 구성 파일",
            "package.json - 작업공간 루트 package.json (없는 경우)",
            "pnpm-workspace.yaml - PNPM 작업공간 구성 (없는 경우)",
            "packages/ - 작업공간 패키지 디렉토리 (없는 경우)"
          ]
        ],
        [
          "첫 번째 업데이트 확인",
          "",
          [
            "오래된 카탈로그 종속성을 확인하세요:",
            "다음 정보가 포함된 아름다운 표가 표시됩니다:",
            "카탈로그의 현재 버전",
            "사용 가능한 최신 버전",
            "패키지 이름 및 업데이트 유형",
            "색상으로 구분된 긴급도 표시기"
          ]
        ],
        [
          "대화형 업데이트",
          "",
          [
            "대화형 인터페이스로 종속성을 업데이트하세요:",
            "다음 기능을 사용할 수 있습니다:",
            "✅ 업데이트할 종속성 선택",
            "🎯 특정 버전 선택",
            "📊 영향 분석 확인",
            "🔒 자동 백업 생성"
          ]
        ],
        [
          "일반적인 명령어",
          "",
          [
            "가장 자주 사용되는 명령어들입니다:",
            "| 명령어     | 설명            | 예제                       |\n| ---------- | --------------- | -------------------------- |\n| pcu init | 작업공간 초기화 | pcu init --verbose       |\n| pcu -c   | 업데이트 확인   | pcu -c --catalog default |\n| pcu -i   | 대화형 업데이트 | pcu -i -b                |\n| pcu -u   | 종속성 업데이트 | pcu -u --target minor    |\n| pcu -a   | 영향 분석       | pcu -a default react     |"
          ]
        ],
        [
          "다음 단계",
          "",
          []
        ],
        [
          "시작하기 체크리스트",
          "",
          [
            "프로젝트에서 PCU를 실행하려면 이 체크리스트를 따르세요:",
            "PCU 설치 - 전역 설치 또는 npx 사용 선택",
            "작업공간 초기화 - 첫 설정을 위해 pcu init 실행",
            "업데이트 확인 - pcu -c를 사용하여 사용 가능한 업데이트 확인",
            "설정 구성 - 필요에 따라 .pcurc.json 사용자 정의",
            "종속성 업데이트 - 안전한 업데이트를 위해 대화형 모드 pcu -i 사용",
            "자동화 설정 - 정기적인 확인을 위한 CI/CD 통합 고려"
          ]
        ],
        [
          "필수 명령어 빠른 참조",
          "",
          [
            "| 명령어         | 목적            | 사용 시기            |\n| -------------- | --------------- | -------------------- |\n| pcu init     | 작업공간 설정   | 첫 설정, 새 프로젝트 |\n| pcu -c       | 업데이트 확인   | 일상 개발, CI 확인   |\n| pcu -i       | 대화형 업데이트 | 안전한 수동 업데이트 |\n| pcu -u       | 배치 업데이트   | 자동 업데이트, CI/CD |\n| pcu security | 보안 스캔       | 릴리스 전, 정기 감사 |"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "PCU를 설정한 후, 다음 고급 기능들을 탐색해보세요:",
            "구성 - 특정 워크플로우에 맞게 PCU 사용자 정의",
            "보안 스캔 - 취약점 스캔 통합",
            "모노레포 관리 - 고급 작업공간 기능",
            "CI/CD 통합 - 파이프라인에서 종속성 업데이트 자동화"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "문제 해결",
          null,
          [
            "PCU 문제 해결을 도와주는 일반적인 문제와 해결책. 자주 발생하는 오류와 디버깅 팁을 찾아보세요. "
          ]
        ],
        [
          "일반적인 오류",
          "",
          [
            "워크스페이스를 찾을 수 없음",
            "오류 메시지:",
            "원인: PCU가 pnpm-workspace.yaml 파일을 찾을 수 없거나 유효한 pnpm 워크스페이스 구조를 감지할 수 없습니다.",
            "해결책:",
            "카탈로그 의존성 없음",
            "오류 메시지:",
            "원인: 워크스페이스가 pnpm 카탈로그 의존성을 사용하지 않습니다.",
            "해결책:",
            "레지스트리 액세스 문제",
            "오류 메시지:",
            "원인: 네트워크 연결 문제 또는 레지스트리 액세스 문제입니다.",
            "해결책:",
            "인증 오류",
            "오류 메시지:",
            "원인: 개인 레지스트리를 위한 인증 토큰이 누락되었거나 유효하지 않습니다.",
            "해결책:",
            "구성 파일 오류",
            "오류 메시지:",
            "원인: 잘못된 JSON 형식이거나 유효하지 않은 구성 옵션입니다.",
            "해결책:"
          ]
        ],
        [
          "디버깅",
          "",
          [
            "상세 로깅 활성화",
            "워크스페이스 검증"
          ]
        ],
        [
          "성능 문제",
          "",
          [
            "느린 네트워크 요청",
            "증상: PCU가 업데이트 확인에 오래 걸림",
            "해결책:",
            "높은 메모리 사용량",
            "증상: PCU가 대규모 워크스페이스에서 과도한 메모리 소비",
            "해결책:"
          ]
        ],
        [
          "환경 문제",
          "",
          [
            "Node.js 버전 호환성",
            "오류 메시지:",
            "해결책:",
            "pnpm 버전 문제",
            "오류 메시지:",
            "해결책:"
          ]
        ],
        [
          "Windows 특정 문제",
          "windows",
          [
            "경로 구분자 문제",
            "오류 메시지:",
            "해결책:",
            "권한 오류",
            "오류 메시지:",
            "해결책:"
          ]
        ],
        [
          "도움 받기",
          "",
          [
            "진단 정보",
            "문제를 신고할 때 다음 진단 정보를 포함하세요:",
            "지원 채널",
            "🐛 버그 신고: GitHub Issues",
            "💬 질문: GitHub Discussions",
            "📖 문서: 상세한 가이드는 이 문서를 확인하세요",
            "🔧 기능 요청: enhancement 라벨과 함께 GitHub Issues 사용",
            "이슈 템플릿",
            "버그를 신고할 때 다음을 포함해 주세요:",
            "PCU 버전 및 사용한 명령어",
            "오류 메시지 (--verbose와 함께 전체 출력)",
            "환경 (OS, Node.js, pnpm 버전)",
            "워크스페이스 구조 (pnpm-workspace.yaml, package.json)",
            "구성 (.pcurc.json, 관련된 경우 .npmrc)",
            "재현 단계",
            "예상 vs 실제 동작"
          ]
        ],
        [
          "보안 명령어 문제",
          "",
          [
            "Snyk 통합 문제",
            "오류 메시지:",
            "원인: Snyk CLI가 설치되지 않았지만 --snyk 플래그가 사용됨.",
            "해결책:",
            "보안 수정 실패",
            "오류 메시지:",
            "원인: 일부 취약점은 수동 개입이나 메이저 버전 업데이트가 필요합니다.",
            "해결책:",
            "테마 명령어 문제",
            "오류 메시지:",
            "원인: 존재하지 않는 테마를 설정하려고 시도함.",
            "해결책:",
            "대화형 모드 문제",
            "오류 메시지:",
            "원인: 비대화형 환경(CI, 파이프 등)에서 PCU 실행.",
            "해결책:"
          ]
        ],
        [
          "명령어별 문제",
          "",
          [
            "분석 명령어 문제",
            "오류 메시지:",
            "원인: 지정된 카탈로그에 존재하지 않는 패키지를 분석하려고 시도.",
            "해결책:",
            "업데이트 명령어 실패",
            "오류 메시지:",
            "원인: 파일 권한 문제 또는 워크스페이스 구조 문제.",
            "해결책:"
          ]
        ],
        [
          "고급 디버깅",
          "",
          [
            "메모리 누수 조사",
            "증상: PCU 프로세스 메모리가 작업 중 계속 증가",
            "디버그 단계:",
            "레지스트리 응답 문제",
            "증상: 일관성 없는 결과 또는 타임아웃 오류",
            "디버그 단계:",
            "구성 상속 문제",
            "증상: 구성이 예상대로 적용되지 않음",
            "디버그 단계:"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "고급 작성 기능",
          null,
          [
            "문서를 전문적이고 효과적으로 만드는 고급 기능을 익혀보세요. 메타데이터, 서론 단락, 스타일 컨텍스트, 그리고 좋은 문서와 훌륭한 문서를 구분하는 모범 사례를 알아보세요. "
          ]
        ],
        [
          "메타데이터 및 SEO",
          "seo",
          [
            "모든 페이지는 상단에 메타데이터를 포함해야 합니다:"
          ]
        ],
        [
          "서론 단락",
          "",
          [
            "{{ className: 'lead' }}를 사용하여 서론 단락을 돋보이게 만드세요:"
          ]
        ],
        [
          "스타일 컨텍스트",
          "",
          [
            "not-prose 클래스",
            "산문 스타일에서 벗어나야 하는 컴포넌트에는 <div className=\"not-prose\">를 사용하세요:"
          ]
        ],
        [
          "문서 작성 모범 사례",
          "",
          [
            "콘텐츠 구조",
            "메타데이터와 명확한 제목으로 시작",
            "서론에는 리드 단락 사용",
            "적절한 제목 계층으로 구성",
            "중요한 정보에는 Notes 추가",
            "실용적인 코드 예제 포함",
            "명확한 다음 단계로 마무리",
            "작성 스타일",
            "능동태 사용",
            "간결하지만 완전하게 작성",
            "모든 개념에 예제 포함",
            "모든 코드 스니펫 테스트",
            "일관된 용어 유지",
            "구성",
            "관련 주제를 함께 그룹화",
            "상호 참조를 적극 활용",
            "여러 진입점 제공",
            "사용자의 여정 고려",
            "검색 친화적인 제목 포함"
          ]
        ],
        [
          "완전한 문서 작성 워크플로",
          "",
          [
            "계획: 콘텐츠 구조 개요 작성",
            "작성: 각 섹션에 적절한 컴포넌트 사용",
            "검토: 완성도와 정확성 확인",
            "테스트: 모든 예제가 작동하는지 확인",
            "반복: 피드백을 바탕으로 개선",
            "이제 세계 수준의 문서를 만드는 데 필요한 모든 도구를 갖추었습니다!"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "API 문서 작성",
          null,
          [
            "개발자들이 좋아하는 포괄적인 API 문서를 작성하세요. 매개변수용 Properties, HTTP 메서드용 Tags, SDK 소개용 Libraries, 그리고 API 참조를 명확하고 실행 가능하게 만드는 전문 컴포넌트 사용법을 알아보세요. "
          ]
        ],
        [
          "Properties 목록",
          "properties",
          [
            "<Properties>와 <Property>를 사용하여 API 매개변수를 문서화하세요:",
            "리소스의 고유 식별자입니다. 리소스가 생성될 때 자동으로 생성됩니다.",
            "리소스의 표시 이름입니다. 1자에서 100자 사이여야 합니다.",
            "유효한 이메일 주소입니다. 모든 사용자에서 고유해야 합니다.",
            "리소스가 생성된 시점을 나타내는 ISO 8601 타임스탬프입니다."
          ]
        ],
        [
          "HTTP 메서드 태그",
          "http",
          [
            "태그는 HTTP 메서드에 따라 자동으로 색상이 지정됩니다:",
            "GET\nPOST\nPUT\nDELETE\n커스텀\n성공\n오류"
          ]
        ],
        [
          "Libraries 컴포넌트",
          "libraries",
          [
            "전체 라이브러리 그리드",
            "<Libraries> 컴포넌트를 사용하여 모든 공식 SDK를 소개하세요:",
            "단일 라이브러리",
            "<Library> 컴포넌트를 사용하여 개별 라이브러리를 표시하세요:",
            "컴팩트 라이브러리",
            "작은 공간의 경우 설명과 함께 컴팩트 모드를 사용하세요:",
            "또는 더욱 컴팩트한 표시를 위해 설명 없이 사용할 수도 있습니다:",
            "라이브러리 컴포넌트 옵션",
            "language: php, ruby, node, python, go 중 선택 (기본값: node)",
            "compact: 더 작은 스타일링 사용 (기본값: false)",
            "showDescription: 설명 텍스트 표시/숨김 (기본값: true)",
            "라이브러리 사용 사례",
            "<Libraries />: 전체 SDK 개요 페이지, 시작하기 섹션",
            "<Library />: 인라인 문서, 특정 언어 가이드",
            "<Library compact />: 사이드바 참조, 컴팩트 목록"
          ]
        ],
        [
          "API 모범 사례",
          "api",
          [
            "항상 Properties 컴포넌트로 모든 매개변수를 문서화하세요",
            "요청 및 응답 예제를 포함하세요",
            "Tags와 함께 적절한 HTTP 상태 코드를 사용하세요",
            "명확한 오류 메시지를 제공하세요",
            "인증 요구사항을 포함하세요",
            "SDK 페이지에는 Libraries 컴포넌트를 사용하세요",
            "Properties 목록을 집중적이고 잘 구성되도록 유지하세요"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "고급 기능으로 문서 작성 여정을 완성하세요."
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "작성 기초",
          null,
          [
            "문서 작성의 기본 구성 요소를 익혀보세요. 이 가이드는 표준 Markdown 구문, 형식 옵션, 모든 문서에서 사용할 기본 요소들을 다룹니다. "
          ]
        ],
        [
          "Markdown 기초",
          "markdown",
          [
            "표준 Markdown 형식이 완전히 지원되며 모든 문서의 기초가 됩니다:",
            "굵은 텍스트는 강조와 중요성을 위해기울임 텍스트는 미묘한 강조를 위해인라인 코드는 기술 용어, 명령어, 짧은 코드 스니펫을 위해",
            "이들을 조합할 수 있습니다: 굵고 기울임 또는 굵은 텍스트와 코드"
          ]
        ],
        [
          "텍스트 형식",
          "",
          [
            "강조와 굵은 텍스트",
            "강조를 위해 별표나 밑줄을 사용하세요:",
            "코드와 기술 용어",
            "인라인 코드, 변수, 또는 기술 용어에는 백틱을 사용하세요:"
          ]
        ],
        [
          "목록과 구성",
          "",
          [
            "순서 없는 목록",
            "기능 목록, 요구사항, 또는 순서가 없는 항목에 완벽합니다:",
            "주요 기능이나 요점",
            "또 다른 중요한 항목",
            "세 번째 고려사항",
            "중첩된 하위 요점",
            "추가 하위 세부사항",
            "다시 주 레벨로",
            "순서 있는 목록",
            "단계별 지침, 절차, 또는 우선순위가 있는 항목에 사용하세요:",
            "프로세스의 첫 번째 단계",
            "중요한 세부사항이 있는 두 번째 단계",
            "세 번째 단계",
            "구체적인 지침이 있는 하위 단계",
            "또 다른 하위 단계",
            "마지막 단계",
            "작업 목록",
            "체크리스트와 진행 상황 추적에 좋습니다:",
            "[x] 완료된 작업",
            "[x] 완료된 또 다른 항목",
            "[ ] 대기 중인 작업",
            "[ ] 향후 개선사항"
          ]
        ],
        [
          "링크와 내비게이션",
          "",
          [
            "내부 링크",
            "문서 내 다른 페이지로 링크하기:",
            "예시:",
            "명령어 참조 가이드",
            "문제 해결",
            "SDK 문서",
            "외부 링크",
            "외부 리소스로 링크하기:",
            "앵커 링크",
            "페이지 내 특정 섹션으로 링크하기:"
          ]
        ],
        [
          "제목과 구조",
          "",
          [
            "적절한 제목 레벨로 명확한 문서 계층 구조를 만드세요:",
            "제목 모범 사례",
            "페이지 제목에만 H1 사용 (메타데이터에서 처리됨)",
            "섹션은 H2로, 하위 섹션은 H3로 시작",
            "제목 레벨을 건너뛰지 말 것 (H2 → H4 금지)",
            "제목을 설명적이고 스캔 가능하게 유지",
            "문장 케이스 사용: \"시작하기\" (올바름)"
          ]
        ],
        [
          "인용문과 강조 표시",
          "",
          [
            "블록 인용문",
            "중요한 인용문이나 참조를 위해:",
            "\"문서는 미래의 자신에게 쓰는 러브레터입니다.\"— Damian Conway",
            "중요 참고: 여러 줄에 걸쳐 있고 중요한 정보를 제공하는 추가 컨텍스트가 있는 강조된 인용문입니다.",
            "여러 단락 인용문",
            "이것은 더 긴 인용문의 첫 번째 단락입니다.",
            "이것은 추가적인 세부사항과 컨텍스트로 생각을 이어가는 두 번째 단락입니다."
          ]
        ],
        [
          "수평선",
          "",
          [
            "수평선으로 주요 섹션을 구분하세요:",
            "시각적 구분을 만듭니다:"
          ]
        ],
        [
          "표",
          "",
          [
            "구조화된 데이터를 위한 간단한 표:",
            "| 기능     | 기본    | 프로     | 엔터프라이즈 |\n| -------- | ------- | -------- | ------------ |\n| 사용자   | 10명    | 100명    | 무제한       |\n| 저장공간 | 1GB     | 10GB     | 100GB        |\n| API 호출 | 1,000회 | 10,000회 | 무제한       |\n| 지원     | 이메일  | 우선순위 | 24/7 전화    |",
            "표 정렬",
            "열 정렬 제어:",
            "| 왼쪽 정렬    | 가운데 정렬  |  오른쪽 정렬 |\n| :----------- | :----------: | -----------: |\n| 텍스트       |    텍스트    |       텍스트 |\n| 더 많은 내용 | 더 많은 내용 | 더 많은 내용 |"
          ]
        ],
        [
          "특수 문자",
          "",
          [
            "백슬래시를 사용하여 특수 Markdown 문자를 이스케이프하세요:"
          ]
        ],
        [
          "줄 바꿈과 간격",
          "",
          [
            "강제 줄 바꿈을 위해 줄 끝에 공백 두 개 추가",
            "단락을 구분하기 위해 빈 줄 사용",
            "목록에서 줄 바꿈을 위해 줄 끝에 \\ 사용"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "이러한 기초를 익혔다면 다음을 탐색해 보세요:",
            "컴포넌트 작성 - 대화형 UI 요소",
            "코드 작성 - 코드 블록과 구문 강조",
            "레이아웃 작성 - 다중 열 레이아웃과 구성",
            "API 작성 - API 문서 컴포넌트",
            "고급 작성 - 고급 기능과 모범 사례",
            "이러한 기초는 모든 훌륭한 문서의 토대가 됩니다. 먼저 이것들을 익힌 다음, 다른 가이드에서 다루는 고급 컴포넌트와 기법으로 구축해 나가세요."
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "코드 작성",
          null,
          [
            "문서에서 코드를 제시하는 기술을 익혀보세요. 구문 강조 사용법, 다중 언어 예제 생성, 효과적인 코드 블록 구성을 통해 개발자들이 솔루션을 이해하고 구현할 수 있도록 도움을 주는 방법을 알아보세요. "
          ]
        ],
        [
          "단일 코드 블록",
          "",
          [
            "자동 구문 강조가 있는 기본 코드 블록:",
            "위의 JavaScript 코드 블록은 다음 MDX 구문을 사용하여 생성됩니다:",
            "Python 예제:",
            "Python 코드 블록 MDX 구문:",
            "Bash/Shell 명령어:",
            "Bash 코드 블록 MDX 구문:"
          ]
        ],
        [
          "다중 언어를 위한 CodeGroup",
          "code-group",
          [
            "<CodeGroup>을 사용하여 같은 예제를 다른 언어로 보여주세요:",
            "위의 다중 언어 코드 그룹은 다음 MDX 구문을 사용하여 생성됩니다:"
          ]
        ],
        [
          "API 엔드포인트 예제",
          "api",
          [
            "API 문서의 경우 HTTP 메서드 태그를 사용하세요:",
            "위의 API 엔드포인트 예제는 다음 MDX 구문을 사용하여 생성됩니다. tag와 label 속성에 주목하세요:",
            "코드 블록 제목",
            "개별 코드 블록에 제목을 추가할 수도 있습니다:"
          ]
        ],
        [
          "지원되는 언어",
          "",
          [
            "코드 블록은 다음을 포함한 다양한 프로그래밍 언어의 구문 강조를 지원합니다:",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Shell scripts: bash, shell, sh",
            "기타 언어: json, yaml, xml, sql, css, html, markdown, diff",
            "예제:",
            "JSON 코드 블록 MDX 구문:",
            "코드 비교 (Diff):",
            "Diff 코드 블록 MDX 구문:"
          ]
        ],
        [
          "모범 사례",
          "",
          [
            "구문 강조를 위해 항상 언어를 지정하세요",
            "코드 예제를 구분하기 위해 설명적인 제목을 사용하세요",
            "완전하고 실행 가능한 예제를 포함하세요",
            "예제는 간결하지만 기능적으로 유지하세요",
            "일관된 형식과 스타일을 사용하세요",
            "CodeGroup에서 언어 탭을 사용 빈도순으로 정렬하세요"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "내용을 효과적으로 구성하기 위해 레이아웃 컴포넌트로 계속하세요."
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "컴포넌트 작성",
          null,
          [
            "대화형 UI 컴포넌트로 문서 효과를 향상시켜보세요. 중요한 정보를 위한 Notes 사용법, 액션을 위한 Buttons 사용법, 그리고 문서를 더욱 매력적이고 기능적으로 만드는 기타 요소들을 알아보세요. "
          ]
        ],
        [
          "노트와 콜아웃",
          "",
          [
            "<Note> 컴포넌트는 독자가 특별히 주의해야 할 중요한 정보, 경고 또는 팁을 강조하는데 완벽합니다.",
            "기본 Note 사용법",
            "이것은 기본 노트 컴포넌트입니다. 자동으로 에메랄드 테마와 정보 아이콘을 사용하여 콘텐츠를\n스타일링하고, 중요한 정보가 일반 텍스트에서 돋보이도록 합니다.",
            "풍부한 콘텐츠가 포함된 Notes",
            "Notes는 굵은 텍스트, 기울임 텍스트, 인라인 코드, 심지어 다른 페이지로의 링크까지 포함한 완전한 Markdown 형식을 지원합니다.",
            "중요한 설정 요구사항: 계속하기 전에 다음을 확인하세요: - Node.js 18 이상 버전이 설치됨 -\n프로젝트 저장소에 대한 액세스 권한 - 유효한 API 자격 증명이 구성됨 자격 증명 설정에 대해서는\n명령어 참조 가이드를 참조하세요.",
            "다중 단락 Notes",
            "이것은 여러 관련 정보 조각을 포함하는 긴 노트의 첫 번째 단락입니다.",
            "두 번째 단락은 추가적인 맥락과 함께 생각을 이어갑니다. 개념을 완전히 설명하기 위해 필요한 만큼 많은 단락을 포함할 수 있습니다.",
            "좋은 노트는 간결하지만 완전하며, 독자가 메시지의 중요성을 이해하는 데 도움이 되는 적절한 양의 정보를 제공한다는 것을 기억하세요."
          ]
        ],
        [
          "버튼과 액션",
          "",
          [
            "<Button> 컴포넌트는 사용자를 중요한 링크나 다음 단계로 안내하는 콜 투 액션 요소를 생성합니다.",
            "버튼 변형",
            "채워진 버튼",
            "주요 액션과 가장 중요한 콜 투 액션에 사용하세요:",
            "코드 컴포넌트 배우기",
            "아웃라인 버튼",
            "보조 액션과 대안 경로에 완벽합니다:",
            "레이아웃 컴포넌트 탐색",
            "텍스트 버튼",
            "콘텐츠와 조화를 이루면서도 여전히 돋보이는 미묘한 링크:",
            "기초로 돌아가기",
            "버튼 화살표",
            "버튼은 내비게이션을 나타내는 방향 화살표를 지원합니다:",
            "이전 섹션",
            "다음 섹션",
            "버튼 모범 사례",
            "적당히 사용: 너무 많은 버튼은 효과를 감소시킵니다",
            "명확한 액션 단어: \"시작하기\", \"더 알아보기\", \"문서 보기\"",
            "논리적 계층: 주요는 채워진 버튼, 보조는 아웃라인, 3차는 텍스트",
            "방향 화살표: 왼쪽은 \"뒤로/이전\", 오른쪽은 \"앞으로/다음\"",
            "not-prose로 감싸기: 항상 <div className=\"not-prose\"> 래퍼 사용"
          ]
        ],
        [
          "컴포넌트 스타일링 컨텍스트",
          "",
          [
            "not-prose 래퍼",
            "일부 컴포넌트는 기본 prose 스타일링에서 벗어나야 합니다. 항상 이러한 컴포넌트를 감싸세요:",
            "not-prose가 필요한 컴포넌트:",
            "모든 <Button> 컴포넌트",
            "커스텀 레이아웃 요소",
            "대화형 위젯",
            "복잡한 스타일 컴포넌트",
            "not-prose 없이 작동하는 컴포넌트:",
            "<Note> 컴포넌트 (자체 포함 스타일링)",
            "표준 Markdown 요소",
            "텍스트 기반 컴포넌트",
            "여러 컴포넌트",
            "여러 컴포넌트를 함께 표시할 때:",
            "API 문서 가이드",
            "고급 기능",
            "기초 복습"
          ]
        ],
        [
          "컴포넌트 접근성",
          "",
          [
            "모든 컴포넌트는 접근성을 고려하여 만들어졌습니다:",
            "시맨틱 HTML: 적절한 버튼과 링크 요소",
            "ARIA 라벨: 필요한 곳에 스크린 리더 지원",
            "키보드 내비게이션: 완전한 키보드 접근성",
            "포커스 관리: 명확한 포커스 인디케이터",
            "색상 대비: WCAG 호환 색상 스킴"
          ]
        ],
        [
          "각 컴포넌트 사용 시기",
          "",
          [
            "Notes를 사용할 때:",
            "중요한 정보 강조",
            "잠재적 문제에 대한 경고",
            "유용한 팁이나 컨텍스트 제공",
            "전제 조건이나 요구 사항 설명",
            "중요한 변경 사항에 주의 집중",
            "Buttons를 사용할 때:",
            "다음 논리적 단계로 안내",
            "외부 리소스에 링크",
            "명확한 콜 투 액션 순간 생성",
            "주요 섹션 간 내비게이션",
            "주요 액션 강조",
            "과도한 사용 피하기:",
            "모든 단락에 노트를 사용하지 마세요",
            "섹션당 버튼을 1-2개로 제한",
            "정말 중요한 콘텐츠를 위해 컴포넌트를 보존",
            "일반 텍스트와 Markdown이 대부분의 콘텐츠를 담당하도록 하세요"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "이제 UI 컴포넌트를 이해했으니 다음을 탐색해보세요:",
            "코드 작성 - 구문 강조와 코드 블록",
            "레이아웃 작성 - 다중 열 레이아웃과 조직",
            "API 작성 - API 문서 컴포넌트",
            "고급 작성 - 고급 기능과 메타데이터",
            "이러한 대화형 요소를 마스터하여 정보를 제공할 뿐만 아니라 독자를 효과적으로 안내하고 참여시키는 문서를 만드세요."
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "레이아웃 작성",
          null,
          [
            "가독성과 사용자 경험을 향상시키는 정교한 레이아웃을 만들어보세요. 다중 열 디자인을 위한 Row와 Col 컴포넌트 사용법, 스티키 포지셔닝, 그리고 효과적인 콘텐츠 구성을 배워보세요. "
          ]
        ],
        [
          "2열 레이아웃",
          "2",
          [
            "나란히 배치되는 콘텐츠를 위해 <Row>와 <Col>을 사용하세요:",
            "왼쪽 열",
            "이 콘텐츠는 왼쪽 열에 나타납니다. 설명, 묘사 또는 보완 정보에 완벽합니다.",
            "주요 포인트 1",
            "중요한 세부사항",
            "추가 컨텍스트",
            "오른쪽 열"
          ]
        ],
        [
          "스티키 열 레이아웃",
          "",
          [
            "스크롤하는 동안 콘텐츠를 고정시키세요:",
            "스크롤 콘텐츠",
            "이것은 정상적으로 스크롤되는 일반 콘텐츠입니다. 사용자가 완전히 읽기 위해 스크롤해야 하는 긴 설명을 여기에 배치할 수 있습니다.",
            "이 열에는 완전히 소비하기 위해 스크롤이 필요한 주요 내러티브나 세부 정보가 포함됩니다.",
            "스티키 참조",
            "이것은 스크롤할 때 보이는 상태로 유지됩니다."
          ]
        ],
        [
          "Guides 컴포넌트",
          "guides",
          [
            "<Guides> 컴포넌트를 사용하여 가이드 링크의 그리드를 표시하세요:",
            "Guides 컴포넌트는 링크와 설명이 포함된 미리 정의된 문서 가이드 세트를 보여줍니다. 개요 페이지와 시작 섹션에 완벽합니다."
          ]
        ],
        [
          "Resources 컴포넌트",
          "resources",
          [
            "애니메이션 카드로 주요 리소스 카테고리를 보여주세요:",
            "Resources 컴포넌트는 아이콘과 설명이 포함된 애니메이션 리소스 카드를 표시합니다. 메인 랜딩 페이지와 API 개요 섹션에 적합합니다."
          ]
        ],
        [
          "아이콘",
          "",
          [
            "인라인 장식이나 커스텀 레이아웃을 위해 개별 아이콘을 사용하세요:",
            "사용 가능한 아이콘",
            "<UserIcon /> - 단일 사용자",
            "<UsersIcon /> - 다중 사용자",
            "<EnvelopeIcon /> - 메시지/이메일",
            "<ChatBubbleIcon /> - 대화",
            "<BookIcon /> - 문서",
            "<CheckIcon /> - 성공/완료",
            "<BellIcon /> - 알림",
            "<CogIcon /> - 설정/구성"
          ]
        ],
        [
          "레이아웃 모범 사례",
          "",
          [
            "보완적인 콘텐츠에는 2열 레이아웃을 사용하세요",
            "스티키 열은 참조 자료에 가장 적합합니다",
            "열의 콘텐츠 길이를 균형 있게 유지하세요",
            "모바일 반응형을 확보하세요 (작은 화면에서는 열이 스택됩니다)",
            "문서 개요 페이지에는 Guides를 사용하세요",
            "API 카테고리 쇼케이스에는 Resources를 사용하세요",
            "아이콘은 색상과 크기 제어를 위한 커스텀 Tailwind 클래스와 잘 작동합니다"
          ]
        ],
        [
          "다음 단계",
          "",
          [
            "전문적인 컴포넌트에 대해서는 API 문서를 계속 읽어보세요."
          ]
        ]
      ]
    }
  ],
  "zh": [
    {
      "url": "/ai-analysis",
      "sections": [
        [
          "AI 分析",
          null,
          [
            "PCU 集成了 AI CLI 工具，提供智能依赖分析、安全评估和更新建议。 "
          ]
        ],
        [
          "概述",
          "",
          [
            "AI 分析通过以下方式增强 PCU 的功能：",
            "影响分析：了解更新如何影响您的代码库",
            "安全评估：获取 AI 驱动的安全漏洞分析",
            "兼容性检查：检测潜在的破坏性变更",
            "更新建议：接收安全更新的智能建议"
          ]
        ],
        [
          "支持的 AI 提供商",
          "ai",
          [
            "PCU 自动检测并按以下优先级顺序使用可用的 AI CLI 工具：",
            "| 提供商 | 优先级 | 能力                     |\n| ------ | ------ | ------------------------ |\n| Gemini | 100    | 影响、安全、兼容性、建议 |\n| Claude | 80     | 影响、安全、兼容性、建议 |\n| Codex  | 60     | 影响、兼容性、建议       |\n| Cursor | 40     | 影响、建议               |",
            "如果没有可用的 AI 提供商，PCU 会自动回退到基于规则的分析引擎，使用预定义规则提供基础依赖分析。"
          ]
        ],
        [
          "命令",
          "",
          [
            "检查可用的 AI 提供商",
            "查看系统上可用的 AI 工具：",
            "此命令显示：",
            "系统上检测到的可用 AI CLI 工具",
            "每个提供商的版本信息",
            "将用于分析的最佳可用提供商",
            "AI 命令选项",
            "显示所有 AI 提供商的状态（默认行为）",
            "使用示例请求测试 AI 分析以验证提供商连接",
            "显示 AI 分析缓存统计信息，包括命中率和大小",
            "清除 AI 分析缓存以释放空间或重置缓存响应",
            "AI 驱动的更新",
            "使用 AI 驱动的分析更新依赖：",
            "AI 增强更新提供：",
            "每个更新的智能风险评估",
            "带说明的破坏性变更检测",
            "安全漏洞识别",
            "建议的更新顺序",
            "AI 驱动的分析",
            "使用 AI 辅助分析特定包更新：",
            "analyze 命令默认使用 default catalog。您可以将不同的 catalog 指定为第一个参数：pcu analyze\n  my-catalog react"
          ]
        ],
        [
          "分析类型",
          "",
          [
            "影响分析",
            "评估依赖更新将如何影响您的项目：",
            "识别使用该依赖的所有工作区包",
            "分析版本之间的 API 变更",
            "估算所需的迁移工作量",
            "建议测试重点区域",
            "安全分析",
            "提供以安全为重点的评估：",
            "识别当前版本中的已知漏洞",
            "检查新版本中的安全修复",
            "评估与安全相关的包更新",
            "推荐安全最佳实践",
            "兼容性分析",
            "检查潜在的兼容性问题：",
            "检测破坏性 API 变更",
            "识别对等依赖冲突",
            "检查 Node.js 版本兼容性",
            "验证 TypeScript 兼容性",
            "建议",
            "生成可操作的建议：",
            "建议最优更新顺序",
            "推荐版本范围",
            "识别应一起更新的包",
            "提供回滚策略"
          ]
        ],
        [
          "回退行为",
          "",
          [
            "当 AI 提供商不可用时，PCU 使用内置的基于规则的分析引擎：",
            "基于规则的分析功能",
            "版本跳跃评估：根据语义化版本变更评估风险",
            "已知破坏模式：检测流行包（React、TypeScript、ESLint 等）的破坏性变更",
            "安全敏感包：标记与安全相关的包以进行仔细审查",
            "工作量估算：提供迁移工作量估算",
            "风险级别",
            "| 级别 | 描述                         |\n| ---- | ---------------------------- |\n| 低   | 补丁更新，通常可安全应用     |\n| 中   | 次要更新或较大的次要版本跳跃 |\n| 高   | 带有破坏性变更的主要版本更新 |\n| 关键 | 多个主要版本跳跃或预发布版本 |"
          ]
        ],
        [
          "配置",
          "",
          [
            "环境变量",
            "Gemini CLI 可执行文件的自定义路径",
            "Claude CLI 可执行文件的自定义路径",
            "Codex CLI 可执行文件的自定义路径",
            "Cursor CLI 可执行文件的自定义路径",
            "检测方法",
            "PCU 使用多种策略检测 AI 提供商：",
            "环境变量：检查自定义路径变量",
            "PATH 查找：使用 which 命令查找可执行文件",
            "已知路径：检查常见安装位置",
            "应用程序路径：检查 GUI 应用程序（如 Cursor.app）"
          ]
        ],
        [
          "使用示例",
          "",
          [
            "安全更新工作流",
            "CI/CD 集成",
            "批量分析"
          ]
        ],
        [
          "最佳实践",
          "",
          [
            "何时使用 AI 分析",
            "主要版本更新：始终对主要版本升级使用 AI 分析",
            "安全敏感包：用于认证、加密和会话包",
            "大型代码库：AI 帮助识别跨 monorepo 的受影响区域",
            "破坏性变更检测：AI 提供详细的破坏性变更解释",
            "性能考虑",
            "与标准更新相比，AI 分析会增加处理时间",
            "使用 --dry-run 预览 AI 建议而不应用变更",
            "当 AI 不是关键时，考虑对更快的 CI/CD 流水线使用基于规则的回退",
            "与其他功能结合"
          ]
        ]
      ]
    },
    {
      "url": "/best-practices",
      "sections": [
        [
          "最佳实践",
          null,
          [
            "学习如何在团队环境、企业工作流和生产系统中有效使用 PCU。 "
          ]
        ],
        [
          "团队协作",
          "",
          [
            "共享配置",
            "通过将 .pcurc.json 提交到版本控制来保持团队成员之间的 PCU 配置一致性：",
            "代码审查指南",
            "审查前检查清单：",
            "运行 pcu check --dry-run 预览更改",
            "验证主版本更新中没有破坏性变更",
            "依赖更新后测试关键功能",
            "审查更新包的 CHANGELOG 文件",
            "审查流程：",
            "安全优先：始终立即审查安全相关的依赖更新",
            "批量相关更新：在单个 PR 中组合相关包（如 React 生态系统）",
            "记录原因：包含版本锁定或排除的理由",
            "测试覆盖：在合并依赖更新前确保充分测试",
            "通信标准",
            "更新依赖时使用清晰的提交信息："
          ]
        ],
        [
          "企业级使用",
          "",
          [
            "治理和合规",
            "依赖批准流程：",
            "安全扫描：所有更新必须通过安全审核",
            "许可证合规：验证许可证与内部政策的兼容性",
            "稳定性要求：在生产环境中优先选择 LTS 版本",
            "变更管理：遵循既定的变更批准流程",
            "企业级配置：",
            "私有仓库集成",
            "为使用私有仓库的企业环境配置 PCU：",
            "环境变量：",
            "审计跟踪和报告",
            "维护依赖变更的全面记录："
          ]
        ],
        [
          "发布工作流",
          "",
          [
            "语义版本集成",
            "使依赖更新与发布周期保持一致：",
            "预发布阶段：",
            "发布准备：",
            "发布后：",
            "预发布环境测试",
            "生产前验证："
          ]
        ],
        [
          "安全最佳实践",
          "",
          [
            "漏洞管理",
            "即时响应PCU：",
            "严重/高严重性：24小时内更新",
            "中等严重性：1周内更新",
            "低严重性：包含在下次定期更新周期中",
            "依赖验证",
            "安全配置：",
            "手动安全审查：",
            "首次使用前审查所有新依赖",
            "审核包维护者和下载量",
            "验证包的真实性和签名",
            "检查依赖链中的已知安全问题",
            "访问控制",
            "令牌管理："
          ]
        ],
        [
          "性能优化",
          "",
          [
            "缓存策略",
            "本地开发：",
            "CI/CD 优化：",
            "大型单体仓库处理",
            "100+ 包的配置：",
            "选择性处理：",
            "网络优化",
            "仓库配置："
          ]
        ],
        [
          "错误处理和恢复",
          "",
          [
            "常见错误解决",
            "网络问题：",
            "内存问题：",
            "备份和恢复",
            "主要更新前创建备份：",
            "版本回滚策略：",
            "监控和告警",
            "CI/CD 集成："
          ]
        ],
        [
          "集成模式",
          "",
          [
            "IDE 和编辑器集成",
            "VS Code 配置：",
            "自动化脚本",
            "Package.json 脚本：",
            "Git 钩子集成："
          ]
        ],
        [
          "快速参考检查清单",
          "",
          [
            "日常工作流",
            "检查安全更新：pcu security",
            "审查过时依赖：pcu check --limit 10",
            "更新补丁版本：pcu update --target patch",
            "每周工作流",
            "全面依赖检查：pcu check",
            "更新小版本：pcu update --target minor --interactive",
            "审查和更新排除规则",
            "为团队审查生成依赖报告",
            "每月工作流",
            "审查主版本更新：pcu check --target latest",
            "更新开发依赖：pcu update --dev",
            "审核依赖许可证和合规性",
            "审查和优化 PCU 配置",
            "清理未使用的依赖",
            "发布前",
            "运行完整依赖审核：pcu security --comprehensive",
            "创建备份：pcu update --create-backup",
            "在预发布环境测试",
            "生成包含依赖变更的发布说明"
          ]
        ]
      ]
    },
    {
      "url": "/cicd",
      "sections": [
        [
          "CI/CD Integration",
          null,
          [
            "Integrate PCU into your continuous integration and deployment pipelines. PCU can seamlessly integrate with existing CI/CD workflows, supporting GitHub Actions, GitLab CI, Jenkins, Azure DevOps, and other platforms. "
          ]
        ],
        [
          "GitHub Actions Integration",
          "git-hub-actions-integration",
          [
            "Basic Dependency Check Workflow"
          ]
        ],
        [
          "GitLab CI Integration",
          "git-lab-ci-integration",
          [
            "GitLab CI pipeline for PCU dependency management:"
          ]
        ],
        [
          "Jenkins Pipeline Integration",
          "jenkins-pipeline-integration",
          [
            "Enterprise-grade Jenkins pipeline for dependency management:"
          ]
        ],
        [
          "Azure DevOps Pipeline",
          "azure-dev-ops-pipeline",
          [
            "Azure DevOps pipeline for PCU integration:"
          ]
        ],
        [
          "General CI/CD Best Practices",
          "general-ci-cd-best-practices",
          [
            "Environment Variable Configuration",
            "Configure these environment variables across all CI/CD platforms to optimize PCU behavior:",
            "CI Mode Flag",
            "PCU includes a dedicated --ci flag for seamless integration with CI/CD pipelines:",
            "Key behaviors when --ci flag is enabled:",
            "Non-interactive execution: All prompts are skipped automatically",
            "Sensible defaults: Uses optimal defaults for CI environments",
            "No color output: Automatically disables colored output for better log compatibility",
            "JSON-friendly: Works well with --format json for programmatic parsing",
            "Example GitHub Actions workflow using --ci flag:",
            "Comparison: With vs Without CI Mode",
            "| Scenario | Without --ci | With --ci |\n|----------|----------------|-------------|\n| Missing options | Prompts user interactively | Uses sensible defaults |\n| Output format | Colored tables by default | Plain text, no colors |\n| Error handling | Interactive error messages | Exit codes for automation |\n| Progress display | Animated progress bars | Minimal progress indicators |",
            "Security Considerations",
            "Access Token Management",
            "Ensure secure management of access tokens in CI/CD environments:",
            "Branch Protection Strategy",
            "Configure branch protection to prevent direct pushes to main branch:",
            "Require pull request reviews",
            "Require status checks to pass",
            "Restrict pushes to protected branches",
            "Require signed commits",
            "Troubleshooting",
            "Common CI/CD Issues",
            "Permission Errors",
            "Cache Issues",
            "Network Timeouts",
            "Monitoring and Reporting",
            "Creating Dashboards",
            "Use CI/CD platform native features to create dependency management dashboards:",
            "GitHub Actions: Use Action insights and dependency graphs",
            "GitLab CI: Leverage Security Dashboard and dependency scanning",
            "Jenkins: Configure HTML Publisher plugin",
            "Azure DevOps: Use Dashboards and Analytics",
            "Notification Configuration",
            "Set up appropriate notifications to keep teams informed:"
          ]
        ],
        [
          "Docker Integration",
          "docker-integration",
          [
            "Containerized PCU Workflows",
            "These CI/CD integration examples provide comprehensive automated dependency management solutions, ensuring your projects stay up-to-date and secure."
          ]
        ]
      ]
    },
    {
      "url": "/command-reference",
      "sections": [
        [
          "命令参考",
          null,
          [
            "所有 PCU 命令和选项的完整参考。了解每个命令、标志和可用的配置选项。"
          ]
        ],
        [
          "命令概览",
          "",
          [
            "PCU 提供几个主要命令，既有全名也有便捷的简写：",
            "| 完整命令        | 简写和别名                                | 描述                            |\n| --------------- | ----------------------------------------- | ------------------------------- |\n| pcu init      | pcu i                                   | 初始化 PNPM 工作空间和 PCU 配置 |\n| pcu check     | pcu chk, pcu -c, pcu --check        | 检查过时的目录依赖              |\n| pcu update    | pcu u, pcu -u, pcu --update         | 更新目录依赖                    |\n| pcu analyze   | pcu a, pcu -a, pcu --analyze        | 分析依赖更新的影响              |\n| pcu workspace | pcu w, pcu -s, pcu --workspace-info | 显示工作空间信息和验证          |\n| pcu theme     | pcu t, pcu -t, pcu --theme          | 配置颜色主题和 UI 设置          |\n| pcu security  | pcu sec                                 | 安全漏洞扫描和修复              |\n| pcu ai        | -                                         | AI 提供者管理和分析测试         |\n| pcu rollback  | -                                         | 将目录更新回滚到之前的状态      |\n| pcu help      | pcu h, pcu -h                         | 显示帮助信息                    |",
            "特殊快捷方式",
            "| 快捷方式               | 等效命令                   | 描述                       |\n| ---------------------- | -------------------------- | -------------------------- |\n| pcu -i               | pcu update --interactive | 交互式更新模式             |\n| pcu --security-audit | pcu security             | 运行安全扫描               |\n| pcu --security-fix   | pcu security --fix-vulns | 运行安全扫描并自动修复漏洞 |"
          ]
        ],
        [
          "混合模式",
          "",
          [
            "PCU 具有混合模式功能 - 当您运行任何命令但不带标志时，它会自动进入交互模式，引导您完成各项选项。这提供了无缝体验：您可以使用标志进行自动化操作，或省略标志以获得引导式提示。",
            "工作原理",
            "支持的命令",
            "混合模式适用于所有 11 个主要命令：",
            "| 命令           | 交互选项                                                 |\n| -------------- | -------------------------------------------------------- |\n| pcu check    | 格式、目标、目录、过滤模式、预发布版本                   |\n| pcu update   | 目录、格式、目标、交互、试运行、强制、备份、预发布、AI   |\n| pcu analyze  | 目录选择、包名、目标版本                                 |\n| pcu workspace| 格式、验证、统计                                         |\n| pcu theme    | 主题选择、进度条样式、预览                               |\n| pcu security | 格式、严重性过滤、修复选项、开发依赖                     |\n| pcu init     | 模板、框架选项、工作空间创建                             |\n| pcu ai       | 提供者状态、测试、缓存操作                               |\n| pcu rollback | 备份选择、确认                                           |",
            "优势",
            "新手友好：新用户可以在无需阅读文档的情况下探索选项",
            "自动化就绪：脚本和 CI/CD 可以使用标志实现可预测的行为",
            "可发现性：交互式提示帮助用户发现可用选项",
            "灵活性：根据每个命令选择您偏好的工作流程"
          ]
        ],
        [
          "pcu init - 初始化工作空间",
          "pcu-init",
          [
            "初始化完整的 PNPM 工作空间环境和 PCU 配置。",
            "选项",
            "无需确认即覆盖现有配置文件",
            "生成包含所有可用选项的全面配置",
            "启动交互式配置向导，提供引导式设置",
            "配置模板：minimal、standard、full、monorepo、enterprise",
            "如果缺失则创建 PNPM 工作空间结构",
            "跳过创建 PNPM 工作空间结构",
            "工作空间包的目录名称",
            "在配置中包含常用包规则",
            "添加 TypeScript 特定的包规则和设置",
            "添加 React 生态系统包规则",
            "添加 Vue 生态系统包规则",
            "输出格式：table、json、yaml、minimal",
            "工作空间目录（默认：当前目录）",
            "显示详细信息和进度",
            "配置模板",
            "PCU 为常见项目类型提供预配置的模板：",
            "模板类型",
            "minimal - 仅包含基本设置的简单配置",
            "standard - 适合大多数项目的平衡配置",
            "full - 包含所有可用选项的全面配置",
            "monorepo - 为大型单体仓库优化，具备高级功能",
            "enterprise - 企业级，具备安全和治理功能",
            "交互式配置向导",
            "交互式模式（--interactive）提供引导式设置体验：",
            "向导功能",
            "项目检测：自动检测项目类型（React、Vue、TypeScript）",
            "工作空间结构：发现现有包并建议最优配置",
            "包规则设置：交互式选择包规则和更新策略",
            "注册表配置：设置自定义 NPM 注册表和身份验证",
            "性能调优：根据项目大小和需求优化设置",
            "主题选择：选择颜色主题和进度条样式",
            "验证设置：配置质量门和安全检查",
            "向导流程",
            "项目分析：扫描现有文件以了解项目结构",
            "模板选择：根据分析推荐适当的模板",
            "包规则：交互式设置包特定的更新策略",
            "高级设置：可选配置缓存、性能和 UI 设置",
            "验证：预检查和配置验证",
            "文件创建：经确认后创建所有必要文件",
            "创建的文件和目录",
            "核心文件",
            "主配置文件，包含所有 PCU 设置",
            "工作空间根 package.json（如果缺失则创建）",
            "PNPM 工作空间配置（如果缺失则创建）",
            "目录结构",
            "工作空间包的默认目录（可自定义）",
            "为 monorepo 模板创建 - 应用程序包",
            "为 monorepo 模板创建 - 开发工具",
            "为 enterprise 模板创建 - 文档",
            "模板特定文件",
            "Node 版本规范（enterprise 模板）",
            "增强 PCU 特定模式（如果缺失）",
            "TypeScript 配置（使用 --typescript 标志）",
            "使用示例",
            "快速开始",
            "使用自动项目检测的标准模板初始化。",
            "交互式设置",
            "启动完整的配置向导，提供引导式设置。",
            "单体仓库初始化",
            "创建企业级单体仓库，支持 TypeScript 并显示详细输出。"
          ]
        ],
        [
          "pcu check - 检查更新",
          "pcu-check",
          [
            "检查 pnpm 工作空间目录中的过时依赖。",
            "选项",
            "仅检查特定目录",
            "输出格式：table、json、yaml、minimal",
            "更新目标：latest、greatest、minor、patch、newest",
            "包含预发布版本",
            "包含匹配模式的包",
            "排除匹配模式的包",
            "输出格式",
            "table：带颜色和详细信息的丰富表格格式",
            "minimal：简单的 npm-check-updates 风格（package → version）",
            "json：用于程序化使用的 JSON 输出",
            "yaml：用于配置文件的 YAML 输出"
          ]
        ],
        [
          "pcu update - 更新依赖",
          "pcu-update",
          [
            "将目录依赖更新到新版本。",
            "选项",
            "交互模式选择更新",
            "预览更改而不写入文件",
            "更新目标：latest、greatest、minor、patch、newest",
            "仅更新特定目录",
            "即使有风险也强制更新",
            "更新前创建备份文件",
            "包含匹配模式的包（可多次使用）",
            "排除匹配模式的包（可多次使用）",
            "在更新中包含预发布版本",
            "输出格式：table、json、yaml、minimal",
            "并行处理的包数量",
            "跳过存在对等依赖冲突的包",
            "主版本更新需要确认",
            "交互式功能",
            "交互式模式（--interactive 或 -i）提供高级包选择功能：",
            "包选择界面",
            "多选：使用复选框选择单个包更新",
            "搜索功能：按名称或描述过滤包",
            "批量操作：选择/取消选择多个包",
            "更新策略选择：为每个包选择更新策略（latest、greatest、minor、patch）",
            "智能冲突解决",
            "对等依赖检测：提供解决建议",
            "破坏性更改警告：基于语义版本分析",
            "影响分析：显示受影响的工作空间包",
            "回滚功能：如果更新导致问题可回滚",
            "高级更新策略",
            "使用示例",
            "安全交互式更新",
            "交互式更新依赖，自动备份，仅限于小版本增量。",
            "生产安全更新",
            "显示生产依赖项中将被更新的内容，主版本更新需要确认。",
            "框架特定更新",
            "更新 React 生态系统包，包括 TypeScript 定义，允许预发布版本。"
          ]
        ],
        [
          "pcu analyze - 影响分析",
          "pcu-analyze",
          [
            "分析更新特定依赖的影响，了解潜在的破坏性变更和受影响的包。",
            "参数",
            "目录名称（例如，'default'、'react17'）",
            "包名称（例如，'react'、'@types/node'）",
            "新版本（可选，默认为最新）",
            "选项",
            "输出格式：table, json, yaml, minimal",
            "分析信息",
            "analyze 命令提供：",
            "受影响的依赖 - 更新会影响哪些依赖",
            "破坏性变更检测 - 版本间的破坏性变更",
            "工作空间包 - 使用此依赖的工作空间包",
            "更新建议 - 推荐和风险评估",
            "版本兼容性 - 版本兼容性分析",
            "使用示例",
            "分析最新版本影响",
            "分析在 default 目录中将 React 更新到最新版本的影响。",
            "分析特定版本",
            "分析将 TypeScript 更新到 5.0.0 版本的影响。",
            "JSON 输出用于自动化",
            "以 JSON 格式输出分析结果，便于程序化处理。"
          ]
        ],
        [
          "pcu workspace - 工作空间信息",
          "pcu-workspace",
          [
            "显示工作空间信息和验证，提供全面的工作空间分析。",
            "选项",
            "验证工作空间配置和结构",
            "显示详细的工作空间统计信息",
            "输出格式：table, json, yaml, minimal",
            "输出信息",
            "基本信息模式（默认）",
            "工作空间名称和路径",
            "包总数",
            "目录数量",
            "目录名称列表",
            "验证模式（--validate）",
            "配置文件验证",
            "工作空间结构验证",
            "package.json 一致性检查",
            "目录完整性验证",
            "退出码：0（有效），1（发现问题）",
            "统计模式（--stats）",
            "详细的包分解",
            "依赖分析",
            "目录使用统计",
            "工作空间健康指标",
            "使用示例",
            "基本工作空间信息",
            "显示工作空间名称、路径、包数量和可用目录。",
            "全面验证",
            "验证工作空间配置和结构，返回适当的退出码。",
            "详细统计",
            "以 JSON 格式显示详细的工作空间统计信息。",
            "组合分析",
            "同时执行验证和显示统计信息。"
          ]
        ],
        [
          "pcu security - 安全漏洞扫描",
          "pcu-security",
          [
            "使用 npm audit 和可选的 Snyk 集成进行全面的安全漏洞扫描，具备自动修复功能。",
            "选项",
            "执行 npm audit 扫描（默认启用）",
            "使用 npm audit fix 自动修复漏洞",
            "按严重程度过滤：low, moderate, high, critical",
            "在扫描中包含开发依赖项",
            "包含 Snyk 安全扫描（需要安装 snyk CLI）",
            "自动应用安全修复，无需确认",
            "输出格式：table, json, yaml, minimal",
            "工作空间目录路径（默认为当前目录）",
            "显示详细的漏洞信息和修复步骤",
            "安全报告功能",
            "安全命令提供全面的漏洞分析：",
            "多扫描器集成：结合 npm audit 和 Snyk 进行全面覆盖",
            "严重程度分类：将漏洞分类为 critical、high、moderate、low 和 info",
            "自动修复：使用 --fix-vulns 自动应用安全补丁",
            "包建议：建议特定版本更新以解决漏洞",
            "开发依赖：可选择包含或排除开发依赖",
            "CWE/CVE 信息：详细的漏洞标识符和描述",
            "退出代码：返回适当的代码（0 表示清洁，1 表示发现漏洞）",
            "CI/CD 就绪：JSON 输出和非交互模式用于自动化",
            "使用示例",
            "基础漏洞扫描",
            "使用 npm audit 执行标准安全扫描，在格式化表格中显示结果。",
            "自动修复扫描",
            "扫描漏洞并自动应用可用的安全修复。",
            "高严重程度过滤",
            "仅显示高严重程度和关键严重程度的漏洞，过滤掉低优先级问题。",
            "使用 Snyk 的全面扫描",
            "运行 npm audit 和 Snyk 扫描，包括开发依赖项，显示详细的漏洞信息。",
            "CI/CD 管道集成",
            "将关键安全漏洞导出为 JSON 格式，用于 CI/CD 管道中的自动化处理。",
            "生产环境自动修复",
            "自动修复生产依赖项中中等及更高严重程度的漏洞。",
            "安全工作流集成",
            "部署前安全检查",
            "自动化安全维护"
          ]
        ],
        [
          "pcu theme - 主题配置",
          "pcu-theme",
          [
            "配置颜色主题和 UI 外观。",
            "选项",
            "设置颜色主题：default, modern, minimal, neon",
            "列出所有可用主题及预览示例",
            "启动带实时预览的交互式主题配置向导",
            "预览主题效果而不应用更改",
            "设置进度条样式：default, gradient, fancy, minimal, rainbow, neon",
            "设置环境特定预设：development, production, presentation",
            "重置所有主题设置为默认值",
            "可用主题",
            "核心主题",
            "default - 针对通用终端使用优化的平衡颜色",
            "modern - 活泼的颜色，适合带语法高亮的开发环境",
            "minimal - 简洁的单色设计，适合生产环境和 CI/CD",
            "neon - 高对比度赛博朋克风格，适合演示和展示",
            "进度条样式",
            "default - 标准进度指示",
            "gradient - 平滑的颜色过渡",
            "fancy - 带动画的丰富视觉效果",
            "minimal - 简单干净的进度条",
            "rainbow - 多色动画进度",
            "neon - 发光效果进度条",
            "环境预设",
            "development - 全彩色，详细进度，详细输出",
            "production - 最少颜色，仅显示必要信息",
            "presentation - 高对比度，大字体，戏剧化效果",
            "高级主题功能",
            "语义颜色映射",
            "Success - 绿色调用于完成的操作",
            "Warning - 黄色/琥珀色用于警告状态",
            "Error - 红色调用于失败和关键问题",
            "Info - 蓝色调用于信息性消息",
            "Progress - 动态颜色用于进行中的操作",
            "Highlight - 强调色用于重要信息",
            "交互式主题配置",
            "交互模式提供：",
            "实时预览 - 带示例输出的主题预览",
            "自定义颜色选择 - 支持十六进制颜色代码",
            "环境检测 - 自动选择最佳设置",
            "进度条测试 - 查看不同样式的实际效果",
            "导出/导入 - 主题配置的导出和导入",
            "按工作空间主题 - 项目特定的样式设置",
            "使用示例",
            "列出可用主题",
            "显示所有可用主题及其描述。",
            "直接设置主题",
            "直接设置指定主题。",
            "交互式主题配置",
            "启动引导式主题选择向导，允许您预览主题并交互式配置 UI 设置。"
          ]
        ],
        [
          "pcu ai - AI 提供者管理",
          "pcu-ai-ai",
          [
            "检查 AI 提供者状态并管理 AI 分析缓存。",
            "选项",
            "显示所有 AI 提供者的状态（默认行为）",
            "使用示例请求测试 AI 分析",
            "显示 AI 分析缓存统计",
            "清除 AI 分析缓存",
            "提供者检测",
            "命令自动检测可用的 AI 提供者：",
            "| 提供者 | 优先级 | 检测方法       |\n| ------ | ------ | -------------- |\n| Claude | 100    | claude CLI   |\n| Gemini | 80     | gemini CLI   |\n| Codex  | 60     | codex CLI    |",
            "使用示例"
          ]
        ],
        [
          "pcu rollback - 备份回滚",
          "pcu-rollback",
          [
            "使用更新期间创建的备份文件将目录更新回滚到之前的状态。",
            "选项",
            "列出所有可用的备份文件及其时间戳",
            "自动回滚到最近的备份",
            "交互式选择要恢复的备份",
            "删除所有备份文件（需要确认）",
            "工作空间目录路径（默认：当前目录）",
            "在回滚期间显示详细信息",
            "备份系统",
            "PCU 在使用 update 命令时，如果添加 --create-backup 标志，会自动创建备份文件：",
            "备份文件带有时间戳存储，包含更新前 pnpm-workspace.yaml 的原始状态。",
            "使用示例",
            "列出可用备份",
            "显示所有备份文件及其创建时间戳和文件大小。",
            "回滚到最新备份",
            "无需确认自动恢复最近的备份。",
            "交互式备份选择",
            "打开交互式提示来选择要恢复的备份。",
            "清理旧备份",
            "通过确认提示和详细输出删除所有备份文件。"
          ]
        ],
        [
          "交互式功能和进度跟踪",
          "",
          [
            "PCU 提供先进的交互功能和复杂的进度跟踪，贯穿所有命令。",
            "交互式命令界面",
            "包选择系统",
            "智能多选：使用视觉复选框和键盘快捷键选择特定包",
            "搜索和过滤：实时包过滤，支持模式匹配和模糊搜索",
            "批量操作：通过基于类别的选择来选择/取消选择整个组",
            "影响预览：在应用任何更新之前查看潜在变化",
            "配置向导",
            "交互式配置向导（pcu init --interactive）提供：",
            "工作空间检测：自动发现现有 PNPM 工作空间",
            "模板选择：在最小和完整配置模板之间选择",
            "包规则设置：为不同包类别配置规则（React、Vue、TypeScript）",
            "注册表配置：设置自定义 NPM 注册表和身份验证",
            "验证设置：配置质量门和安全检查",
            "目录和文件浏览器",
            "工作空间导航：内置文件系统浏览器用于工作空间选择",
            "路径验证：实时验证工作空间路径和结构",
            "预览模式：在确认选择之前查看工作空间内容",
            "高级进度跟踪",
            "多样式进度条",
            "PCU 提供六种不同的进度条样式，可以按命令或全局配置：",
            "进度功能",
            "多步骤跟踪：显示不同阶段的进度（扫描 → 分析 → 更新）",
            "并行操作状态：为并发操作提供单独的进度条",
            "性能指标：实时速度指示器、预计时间、经过时间",
            "内存安全显示：稳定的多行输出，减少终端闪烁",
            "批处理状态",
            "队列管理：显示待处理、活跃和已完成的包操作",
            "冲突解决：交互式处理对等依赖冲突",
            "错误恢复：为失败操作提供跳过/重试选项和详细错误上下文",
            "回滚功能：如果在更新期间检测到问题，可以撤消更改",
            "错误处理和恢复",
            "智能错误检测",
            "验证错误：预检查并为常见错误提供有用建议",
            "网络问题：注册表故障的指数退避自动重试",
            "依赖冲突：详细的冲突分析和解决建议",
            "权限问题：文件系统权限问题的清晰指导",
            "交互式恢复选项",
            "跳过并继续：跳过有问题的包并继续其余更新",
            "使用选项重试：使用不同参数重试失败的操作",
            "回滚更改：如果批量操作期间出现问题，撤消部分更改",
            "导出错误报告：生成详细的错误报告用于故障排除",
            "工作空间集成",
            "自动发现功能",
            "PNPM 工作空间检测：自动查找和验证工作空间配置",
            "目录发现：检测现有目录及其包映射",
            "包分析：分析工作空间结构和依赖关系",
            "配置继承：自动应用特定于工作空间的设置",
            "验证和健康检查",
            "结构验证：确保工作空间遵循 PNPM 最佳实践",
            "依赖一致性：检查跨包的版本不匹配",
            "配置完整性：根据工作空间结构验证 PCU 配置",
            "健康指标：提供全面的工作空间健康评估",
            "使用示例",
            "具有高级功能的交互式更新",
            "使用华丽的进度条和优化的批处理启动交互式更新。",
            "带预览的配置",
            "运行带预览模式和详细日志的配置向导。",
            "错误恢复工作流",
            "具有交互式错误恢复、自动备份和主要版本确认的更新。"
          ]
        ],
        [
          "全局选项",
          "",
          [
            "这些选项适用于所有命令，可以通过环境变量设置：",
            "工作空间目录路径",
            "启用详细日志记录和详细输出",
            "禁用 CI/CD 环境的彩色输出",
            "显示语言：en、zh、ja、ko、es、de、fr（默认：自动检测系统语言）",
            "覆盖 NPM 注册表 URL",
            "请求超时时间（毫秒，默认：30000）",
            "自定义配置文件的路径",
            "输出版本号并检查更新",
            "显示命令帮助",
            "环境变量使用",
            "所有全局选项都可以通过环境变量配置：",
            "环境变量详细配置",
            "核心环境变量",
            "默认工作空间目录路径",
            "全局启用详细日志记录",
            "禁用彩色输出（对 CI/CD 有用）",
            "显示语言：en、zh、ja、ko、es、de、fr",
            "默认 NPM 注册表 URL",
            "请求超时时间（毫秒）",
            "自定义配置文件路径",
            "命令特定环境变量",
            "用于检查/更新操作的默认目录",
            "默认输出格式：table、json、yaml、minimal",
            "默认更新目标：latest、greatest、minor、patch、newest",
            "默认包含预发布版本",
            "默认包包含模式",
            "默认包排除模式",
            "默认启用交互模式",
            "默认启用试运行模式",
            "强制更新而不确认",
            "更新前创建备份文件",
            "主题和显示环境变量",
            "默认颜色主题：default、modern、minimal、neon",
            "进度条样式：default、gradient、fancy、minimal、rainbow、neon",
            "环境预设：development、production、presentation",
            "安全和缓存环境变量",
            "默认安全严重程度过滤器：low、moderate、high、critical",
            "自动修复漏洞",
            "启用/禁用缓存系统",
            "缓存生存时间（毫秒）",
            "自定义缓存目录路径",
            "高级配置环境变量",
            "并行网络请求数",
            "批处理的包数量",
            "失败操作的重试次数",
            "启动时检查 PCU CLI 更新",
            "环境变量示例",
            "配置优先级",
            "设置按以下顺序应用（后面的会覆盖前面的）：",
            "内置默认值",
            "全局配置（~/.pcurc.json）",
            "项目配置（.pcurc.json）",
            "环境变量（PCU_*）",
            "命令行标志（最高优先级）"
          ]
        ],
        [
          "自动更新系统",
          "",
          [
            "PCU 包含一个复杂的自动更新机制，使 CLI 工具保持最新的功能和安全补丁。",
            "自动更新检查",
            "默认情况下，PCU 在运行任何命令时检查更新：",
            "更新行为",
            "CI/CD 环境检测",
            "PCU 自动检测 CI/CD 环境并跳过更新检查以避免中断自动化管道：",
            "GitHub Actions：通过 GITHUB_ACTIONS 环境变量检测",
            "CircleCI：通过 CIRCLECI 环境变量检测",
            "Jenkins：通过 JENKINS_URL 环境变量检测",
            "GitLab CI：通过 GITLAB_CI 环境变量检测",
            "Azure DevOps：通过 TF_BUILD 环境变量检测",
            "通用 CI：通过 CI 环境变量检测",
            "更新安装",
            "PCU 支持多个包管理器，具有自动回退功能：",
            "配置选项",
            "环境变量",
            "完全禁用版本检查和更新通知",
            "更新检查间隔小时数（默认：24）",
            "自动安装更新而不提示（谨慎使用）",
            "更新检查请求超时毫秒数（默认：5000）",
            "配置文件设置",
            "更新通知",
            "标准通知",
            "安全更新通知",
            "预发布通知",
            "手动更新命令",
            "更新故障排除",
            "更新检查失败",
            "清除缓存",
            "权限问题"
          ]
        ],
        [
          "缓存管理系统",
          "",
          [
            "PCU 包含一个全面的缓存系统来优化性能并减少网络请求。",
            "缓存类型",
            "注册表缓存",
            "存储 NPM 包元数据和版本信息：",
            "默认 TTL：1小时（3,600,000毫秒）",
            "最大大小：每种缓存类型10MB",
            "最大条目数：500个包",
            "磁盘持久化：启用",
            "工作空间缓存",
            "存储工作空间配置和 package.json 解析结果：",
            "默认 TTL：5分钟（300,000毫秒）",
            "最大大小：5MB",
            "最大条目数：200个工作空间",
            "磁盘持久化：禁用（仅内存）",
            "缓存配置",
            "环境变量",
            "启用/禁用整个缓存系统",
            "默认缓存 TTL（毫秒）",
            "最大总缓存大小字节数（默认50MB）",
            "最大缓存条目数",
            "自定义缓存目录路径",
            "为缓存启用磁盘持久化",
            "配置文件设置",
            "缓存管理命令",
            "缓存性能",
            "优化功能",
            "LRU 淘汰：最少使用的项目首先被移除",
            "自动清理：过期条目每5分钟清理一次",
            "大小监控：超过大小限制时自动淘汰",
            "并行处理：缓存操作不会阻塞主线程",
            "性能优势",
            "注册表请求：NPM 注册表调用减少60-90%",
            "工作空间解析：重复运行时工作空间分析快80-95%",
            "网络依赖：减少对网络连接的依赖",
            "启动时间：后续操作启动时间快2-5倍"
          ]
        ]
      ]
    },
    {
      "url": "/configuration",
      "sections": [
        [
          "配置",
          null,
          [
            "配置 PCU 以匹配您的工作流和项目需求。了解配置文件、包特定规则和高级设置。"
          ]
        ],
        [
          "配置文件类型",
          "",
          [
            "PCU 支持多种配置文件格式和位置以适应不同的开发工作流。",
            "支持的配置文件",
            "PCU 按以下顺序搜索配置文件（找到第一个生效）：",
            "项目根目录中的主要 JSON 配置文件",
            "支持动态配置的 JavaScript 配置文件",
            "替代的 JavaScript 配置文件名",
            "主目录中的全局用户配置",
            "package.json 中的 \"pcu\" 键下的配置",
            "JavaScript 配置支持",
            "JavaScript 配置文件支持基于环境、工作空间结构或其他运行时条件的动态配置：",
            "Package.json 配置",
            "对于简单项目，配置可以嵌入到 package.json 中：",
            "配置验证",
            "PCU 自动验证配置文件并为常见问题提供详细的错误消息：",
            "验证功能",
            "JSON 模式验证：确保所有配置属性有效",
            "模式验证：验证通配符模式和包名称格式",
            "类型检查：验证所有配置值的正确数据类型",
            "冲突检测：识别冲突的规则和配置选项",
            "建议系统：为修复配置错误提供有用建议",
            "验证示例"
          ]
        ],
        [
          "包过滤",
          "",
          [
            "使用包含/排除模式和包特定规则控制要更新的包。",
            "包规则属性",
            "匹配包名称的通配符模式",
            "更新目标：latest、greatest、minor、patch、newest",
            "更新这些包前总是询问",
            "无需确认自动更新",
            "遵循相同更新策略的包",
            "将相关包一起更新"
          ]
        ],
        [
          "安全配置",
          "",
          [
            "配置安全漏洞扫描和自动修复。",
            "自动检查和修复安全漏洞",
            "允许安全修复的主版本升级",
            "安全更新时显示通知"
          ]
        ],
        [
          "高级设置",
          "",
          [
            "使用高级配置选项微调性能和行为。",
            "并发网络请求数量",
            "网络请求超时时间（毫秒）",
            "失败时重试次数",
            "缓存有效期（设为 0 禁用缓存）",
            "启动时自动检查PCU工具更新。在CI环境中会跳过检查。有新版本时会显示更新通知和安装说明。"
          ]
        ],
        [
          "UI 配置",
          "ui",
          [
            "自定义视觉外观和用户界面设置。",
            "可用主题",
            "default - 通用使用的平衡颜色",
            "modern - 开发环境的活泼颜色",
            "minimal - 生产环境的简洁风格",
            "neon - 演示的高对比度颜色",
            "进度条样式",
            "PCU 支持 6 种不同的进度条样式，为操作期间提供增强的视觉反馈：",
            "default - 基本样式的标准进度条",
            "gradient - 现代外观的渐变色进度条",
            "fancy - 带装饰元素的增强进度条",
            "minimal - 简洁的进度指示器",
            "rainbow - 活泼显示的多彩进度条",
            "neon - 匹配霓虹主题的高对比度进度条",
            "配置示例：",
            "命令行使用："
          ]
        ],
        [
          "配置优先级",
          "",
          [
            "配置设置按以下优先级顺序应用：",
            "命令行标志（最高优先级）",
            ".pcurc.json 中的包特定规则",
            ".pcurc.json 中的常规设置",
            "默认值（最低优先级）",
            "相关包自动继承其父包规则的设置，确保生态系统包间的版本一致性。"
          ]
        ],
        [
          "示例",
          "",
          [
            "React 生态系统",
            "TypeScript 项目",
            "企业设置"
          ]
        ],
        [
          "环境变量",
          "",
          [
            "所有 CLI 选项都可以通过环境变量进行配置，以适应自动化和 CI/CD 环境：",
            "环境变量优先级",
            "配置源按以下顺序加载（后者覆盖前者）：",
            "内置默认值（最低优先级）",
            "全局配置（~/.pcurc.json）",
            "项目配置（.pcurc.json）",
            "环境变量（PCU_*）",
            "命令行标志（最高优先级）"
          ]
        ],
        [
          "注册表配置",
          "",
          [
            "PCU 自动读取 NPM 和 PNPM 配置文件的注册表设置：",
            "注册表优先级",
            "CLI --registry 标志（最高优先级）",
            "PCU 配置（.pcurc.json 注册表部分）",
            "项目 .npmrc/.pnpmrc",
            "全局 .npmrc/.pnpmrc",
            "默认 NPM 注册表（最低优先级）"
          ]
        ],
        [
          "增强缓存配置",
          "",
          [
            "PCU 包含先进的缓存系统以提高性能：",
            "缓存设置",
            "启用/禁用缓存系统",
            "生存时间（毫秒）（默认1小时）",
            "最大缓存大小（字节）（默认50MB）",
            "最大缓存条目数",
            "在运行之间将缓存保存到磁盘",
            "持久缓存存储目录",
            "缓存驱逐策略：lru、fifo、lfu"
          ]
        ],
        [
          "验证配置",
          "",
          [
            "PCU 包含带有有用建议的全面验证：",
            "验证选项",
            "启用带有附加检查的严格验证模式",
            "对潜在风险更新显示警告",
            "需要确认的更新类型：major、minor、patch",
            "启用有用的建议和提示",
            "包含性能优化建议",
            "包含最佳实践建议"
          ]
        ],
        [
          "交互模式配置",
          "",
          [
            "配置交互式提示和用户体验：",
            "交互设置",
            "启用交互模式功能",
            "列表中每页显示的项目数",
            "在选择列表中显示包描述",
            "显示更新的发布说明（需要网络）",
            "启用包名称自动完成",
            "启用自动完成的模糊匹配",
            "主版本更新需要确认"
          ]
        ],
        [
          "Monorepo 配置",
          "monorepo",
          [
            "PCU 为大型 monorepo 和复杂工作空间管理提供专门设计的高级功能。",
            "版本同步",
            "在您的 monorepo 中保持相关包的同步：",
            "高级工作空间管理",
            "目录优先级系统",
            "定义冲突出现时哪些目录优先：",
            "跨工作空间依赖",
            "分析和管理工作空间包之间的依赖关系：",
            "分析跨工作空间依赖关系",
            "如何处理版本不匹配：error、warn、off",
            "报告目录中未被任何工作空间包使用的包",
            "验证所有工作空间包都使用目录版本",
            "Monorepo 特定包规则",
            "为您的 monorepo 的不同区域创建复杂的规则：",
            "工作空间特定配置",
            "为您的 monorepo 的不同部分使用不同的配置：",
            "大型 Monorepo 的性能优化",
            "批处理配置",
            "每批处理的包数量",
            "最大并发操作数",
            "在运行之间缓存工作空间包发现",
            "并行处理多个目录",
            "内存管理",
            "Monorepo 验证",
            "复杂工作空间设置的全面验证：",
            "验证规则",
            "确保内部依赖使用 workspace: 协议",
            "确保所有依赖都被目录覆盖",
            "要求所有工作空间包对共享依赖使用相同版本",
            "检测工作空间包之间的循环依赖",
            "Monorepo 使用示例",
            "大型企业 Monorepo 设置",
            "CI/CD 优化配置"
          ]
        ]
      ]
    },
    {
      "url": "/development",
      "sections": [
        [
          "开发",
          null,
          [
            "设置 PCU 进行开发并学习如何为项目做出贡献。本指南涵盖项目设置、架构和开发工作流程。"
          ]
        ],
        [
          "先决条件",
          "",
          [
            "在开始开发 PCU 之前，请确保您拥有所需的工具：",
            "开发需要 Node.js >= 22.0.0 和 pnpm >= 10.0.0。"
          ]
        ],
        [
          "项目设置",
          "",
          [
            "克隆并设置开发环境："
          ]
        ],
        [
          "项目架构",
          "",
          [
            "PCU 遵循清洁架构原则，关注点清晰分离：",
            "架构层",
            "用户界面、命令解析、输出格式化",
            "业务逻辑编排、用例",
            "核心业务实体、值对象、仓库接口",
            "外部 API 客户端、文件系统访问、仓库实现",
            "共享工具、配置、日志记录、错误处理"
          ]
        ],
        [
          "开发工作流程",
          "",
          [
            "进行更改",
            "创建功能分支：",
            "按照编码标准进行更改",
            "为您的更改添加测试：",
            "确保质量检查通过：",
            "提交更改：",
            "测试策略",
            "PCU 使用综合测试方法：",
            "代码质量",
            "PCU 保持高代码质量标准："
          ]
        ],
        [
          "添加功能",
          "",
          [
            "创建新命令",
            "在 apps/cli/src/cli/commands/ 创建命令处理器：",
            "在 packages/core/src/application/services/ 添加业务逻辑",
            "为 CLI 和核心逻辑创建测试",
            "更新文档",
            "添加新输出格式",
            "在 apps/cli/src/cli/formatters/ 创建格式化器：",
            "在主格式化器注册表中注册格式化器",
            "添加测试和更新文档"
          ]
        ],
        [
          "贡献指南",
          "",
          [
            "提交消息约定",
            "PCU 使用约定式提交：",
            "拉取请求流程",
            "Fork 仓库并创建功能分支",
            "按照开发工作流程进行更改",
            "确保所有测试通过和代码质量检查成功",
            "如需要更新文档",
            "提交拉取请求包含：",
            "更改的清楚描述",
            "相关问题的链接",
            "UI 更改的屏幕截图",
            "如适用的破坏性更改说明",
            "代码审查检查清单",
            "所有测试通过",
            "代码覆盖率保持（>85%）",
            "TypeScript 类型正确",
            "代码风格遵循项目标准",
            "文档已更新",
            "破坏性更改已记录",
            "考虑性能影响"
          ]
        ],
        [
          "调试",
          "",
          [
            "开发调试",
            "测试调试"
          ]
        ],
        [
          "构建和发布",
          "",
          [
            "本地测试",
            "发布流程",
            "先在 apps/cli/CHANGELOG.md 的 ## Unreleased 下整理发布说明。",
            "构建和测试：",
            "运行 GitHub Actions 的 Release 工作流（仅维护者）：",
            "patch、minor、major：自动升级 CLI 版本、提交 release 变更、创建 tag、发布 pcu 和 pnpm-catalog-updates，并在同一次运行里创建 GitHub Release",
            "current：发布仓库里已经提交好的当前版本",
            "dry_run: true：只验证流程，不实际发布"
          ]
        ],
        [
          "获取帮助",
          "",
          [
            "📖 文档：查看此文档获取详细指南",
            "🐛 问题：通过 GitHub Issues 报告错误",
            "💬 讨论：在 GitHub Discussions 中提问",
            "🔧 开发：加入 Issues 和 PRs 中的开发讨论"
          ]
        ],
        [
          "高级架构细节",
          "",
          [
            "核心领域模型",
            "基于领域驱动设计（DDD）原则，PCU 的核心领域包括：",
            "服务层架构",
            "应用层通过服务编排业务逻辑：",
            "CLI 层设计",
            "CLI 层为核心领域提供清洁的接口：",
            "测试架构",
            "跨所有层的全面测试策略：",
            "性能考虑",
            "PCU 针对大型 monorepo 的性能进行了优化："
          ]
        ]
      ]
    },
    {
      "url": "/examples",
      "sections": [
        [
          "示例",
          null,
          [
            "真实世界的示例和用例，帮助您充分利用 PCU。从简单更新到复杂的 monorepo 管理。"
          ]
        ],
        [
          "初学者完全指南",
          "",
          [
            "第一步：了解您的项目设置",
            "在开始使用PCU之前，让我们确认您的项目结构：",
            "如果您还没有pnpm工作空间，PCU可以帮您创建：",
            "第二步：您的第一次依赖检查",
            "现在让我们看看您的项目有哪些可以更新的依赖：",
            "第三步：您的第一次安全更新",
            "安全永远是第一位的。让我们先处理任何安全问题：",
            "第四步：您的第一次依赖更新",
            "现在让我们安全地更新一些依赖。我们从保守的方式开始：",
            "第五步：验证更新结果",
            "更新后，让我们确认一切正常：",
            "常见新手错误及避免方法",
            "错误 1：忘记备份就更新",
            "❌ 错误做法：",
            "✅ 正确做法：",
            "错误 2：直接更新主版本",
            "❌ 错误做法：",
            "✅ 正确做法：",
            "错误 3：忽略安全扫描",
            "❌ 错误做法：",
            "✅ 正确做法：",
            "新手友好的工作流",
            "建立这个简单的日常习惯：",
            "真实场景：第一个项目",
            "让我们跟随新手李明的第一次PCU体验：",
            "现在李明的项目是最新和安全的！他学会了：",
            "✅ 始终先检查和修复安全问题",
            "✅ 使用交互模式仔细选择更新",
            "✅ 总是创建备份以防出现问题",
            "✅ 验证更新后的工作空间状态"
          ]
        ],
        [
          "基本工作流",
          "",
          [
            "日常依赖检查",
            "作为日常开发例程的一部分检查更新：",
            "带备份的安全更新",
            "使用自动备份安全地更新依赖：",
            "目标特定更新",
            "仅更新特定类型的更改："
          ]
        ],
        [
          "多目录工作空间",
          "",
          [
            "遗留支持场景",
            "在一个工作空间中管理多个 React 版本：",
            "包使用"
          ]
        ],
        [
          "配置示例",
          "",
          [
            "React 生态系统管理",
            "React 和相关包的协调更新：",
            "TypeScript 项目配置",
            "保守的 TypeScript 更新与自动类型定义：",
            "企业配置",
            "企业级配置，具有严格控制："
          ]
        ],
        [
          "CI/CD 集成",
          "ci-cd",
          [
            "GitHub Actions",
            "在 CI 流水线中自动化依赖检查："
          ]
        ],
        [
          "错误处理和故障排除",
          "",
          [
            "网络问题",
            "处理网络问题和注册表访问：",
            "工作空间验证",
            "验证工作空间设置：",
            "私有注册表",
            "PCU 自动读取 .npmrc 和 .pnpmrc 配置："
          ]
        ],
        [
          "高级用例",
          "",
          [
            "影响分析",
            "分析更新特定包的影响：",
            "选择性更新",
            "仅更新特定包或模式：",
            "试运行分析",
            "在应用之前预览更改："
          ]
        ],
        [
          "最佳实践",
          "",
          [
            "日常工作流",
            "晨间检查：pcu -c 查看可用更新",
            "审查影响：对重要更新使用 pcu -a",
            "安全更新：使用 pcu -i -b 进行带备份的交互式更新",
            "测试：更新后运行测试套件",
            "提交：单独提交依赖更新",
            "团队工作流",
            "共享配置：将 .pcurc.json 提交到版本控制",
            "定期审查：安排每周依赖审查会议",
            "安全优先：始终优先处理安全更新",
            "文档记录：记录主要依赖决策",
            "回滚计划：保留备份以便轻松回滚",
            "发布工作流",
            "预发布检查：发布前 pcu -c --target patch",
            "安全扫描：在 CI 中启用 autoFixVulnerabilities",
            "版本固定：生产发布使用精确版本",
            "更新计划：在发布之间规划依赖更新"
          ]
        ],
        [
          "安全监控",
          "",
          [
            "持续安全扫描",
            "将安全扫描集成到您的开发工作流中：",
            "安全导向的 CI/CD"
          ]
        ],
        [
          "主题定制",
          "",
          [
            "交互式主题设置",
            "为您的团队配置 PCU 的外观：",
            "团队主题配置"
          ]
        ],
        [
          "性能优化",
          "",
          [
            "大型 Monorepo 配置",
            "针对包含数百个包的大型工作空间的优化配置：",
            "并行处理策略"
          ]
        ],
        [
          "迁移示例",
          "",
          [
            "从 npm-check-updates 迁移",
            "从 ncu 迁移到 PCU：",
            "从传统依赖管理迁移",
            "迁移现有项目到 pnpm 目录系统："
          ]
        ],
        [
          "迁移指南",
          "",
          [
            "从 npm/yarn 工作空间迁移",
            "完整的迁移过程：",
            "渐进式采用策略"
          ]
        ],
        [
          "CI/CD 工作流集成",
          "ci-cd-2",
          [
            "多环境部署",
            "针对不同环境的完整 CI/CD 工作流："
          ]
        ],
        [
          "企业工作流",
          "",
          [
            "合规性和审计",
            "企业级合规性工作流：",
            "多团队协作",
            "企业安全策略",
            "发布管理",
            "企业级发布管道集成："
          ]
        ]
      ]
    },
    {
      "url": "/faq",
      "sections": [
        [
          "常见问题",
          null,
          [
            "关于 PCU 常见问题的快速解答。找不到您要找的内容？请查看我们的故障排除指南或提交问题。"
          ]
        ],
        [
          "安装和设置",
          "",
          [
            "如何安装 PCU？",
            "PCU 可以通过 npm、pnpm 或 yarn 全局安装：",
            "系统要求是什么？",
            "Node.js: >= 18.0.0 (推荐 LTS 版本)",
            "pnpm: >= 8.0.0",
            "操作系统: Windows、macOS、Linux",
            "我需要 pnpm 工作空间才能使用 PCU 吗？",
            "是的，PCU 专为使用目录依赖的 pnpm 工作空间设计。如果您还没有工作空间，请运行 pcu init 创建一个。",
            "我可以在 npm 或 yarn 项目中使用 PCU 吗？",
            "不可以，PCU 专用于使用目录依赖的 pnpm 工作空间。对于其他包管理器，请考虑使用 npm-check-updates 或 yarn upgrade-interactive 等工具。"
          ]
        ],
        [
          "配置",
          "",
          [
            "我应该将 .pcurc.json 配置文件放在哪里？",
            "将其放在工作空间根目录中（与 pnpm-workspace.yaml 同一级别）。PCU 还支持：",
            "全局配置：~/.pcurc.json",
            "项目配置：./.pcurc.json（最高优先级）",
            "工作空间级别和全局配置有什么区别？",
            "全局 (~/.pcurc.json)：应用于不同项目中的所有 PCU 操作",
            "项目 (./.pcurc.json)：特定于当前工作空间，覆盖全局设置",
            "我可以为不同的包配置不同的更新策略吗？",
            "可以！在配置中使用包规则："
          ]
        ],
        [
          "命令和使用",
          "",
          [
            "pcu check 和 pcu -c 有什么区别？",
            "它们完全相同！PCU 支持完整命令名称和简短别名：",
            "pcu check = pcu -c",
            "pcu update = pcu -u",
            "pcu interactive = pcu -i",
            "如何只更新特定类型的包？",
            "使用 --include 和 --exclude 标志：",
            "更新目标之间有什么区别？",
            "patch：仅错误修复 (1.0.0 → 1.0.1)",
            "minor：新功能，向后兼容 (1.0.0 → 1.1.0)",
            "latest：最新稳定版本，包括主要更改 (1.0.0 → 2.0.0)",
            "greatest：最新版本，包括预发布版本 (1.0.0 → 2.0.0-beta.1)",
            "在实际更新之前如何检查将要更新的内容？",
            "使用 --dry-run 标志：",
            "这会显示将要更新的确切内容，而不会进行任何更改。"
          ]
        ],
        [
          "故障排除",
          "",
          [
            "为什么 PCU 说\"未找到 pnpm 工作空间\"？",
            "这意味着 PCU 在您的当前目录中找不到 pnpm-workspace.yaml 文件。解决方案：",
            "创建工作空间：运行 pcu init",
            "导航到工作空间根：cd 到包含 pnpm-workspace.yaml 的目录",
            "指定工作空间路径：pcu -c --workspace /path/to/workspace",
            "为什么 PCU 说\"未找到目录依赖\"？",
            "您的工作空间尚未使用目录依赖。您需要：",
            "工作空间文件中的目录：",
            "在包中使用目录：",
            "PCU 运行非常缓慢。如何提高性能？",
            "尝试这些优化：",
            "减少并发数：pcu check --concurrency 2",
            "增加超时时间：pcu check --timeout 60000",
            "启用缓存：确保 PCU_CACHE_ENABLED=true（默认）",
            "使用过滤：pcu check --include \"react*\" 针对特定包",
            "如何修复\"ENOTFOUND registry.npmjs.org\"错误？",
            "这是网络连接问题：",
            "检查网络连接：ping registry.npmjs.org",
            "配置代理：设置 HTTP_PROXY 和 HTTPS_PROXY 环境变量",
            "使用企业注册表：在 .npmrc 中配置公司注册表",
            "增加超时时间：PCU_TIMEOUT=120000 pcu check"
          ]
        ],
        [
          "安全",
          "",
          [
            "PCU 如何处理安全漏洞？",
            "PCU 集成了 npm audit 和可选的 Snyk：",
            "我应该自动修复所有安全漏洞吗？",
            "使用 --auto-fix 时要谨慎：",
            "✅ 安全：安全修复的补丁和小版本更新",
            "⚠️ 需审查：可能破坏应用的主版本更新",
            "❌ 避免：在生产环境中盲目自动修复而不测试",
            "如何处理误报的安全警告？",
            "在 .pcurc.json 中配置忽略的漏洞："
          ]
        ],
        [
          "工作流和 CI/CD",
          "ci-cd",
          [
            "我可以在 CI/CD 流水线中使用 PCU 吗？",
            "当然可以！PCU 专为自动化而设计：",
            "查看我们的 CI/CD 集成指南 了解完整示例。",
            "如何创建自动化依赖更新 PR？",
            "将 PCU 与 GitHub Actions、GitLab CI 或其他平台结合使用：",
            "查看 CI/CD 集成指南 了解完整工作流。",
            "团队协作的最佳工作流是什么？",
            "共享配置：将 .pcurc.json 提交到版本控制",
            "定期审查：安排每周依赖审查会议",
            "安全优先：始终优先处理安全更新",
            "增量更新：偏好小而频繁的更新而非大批量更新",
            "测试：更新后始终测试再合并"
          ]
        ],
        [
          "高级用法",
          "",
          [
            "我可以在一个工作空间中使用多个目录吗？",
            "可以！PNPM 支持多个目录：",
            "然后在包中使用它们：",
            "如何分析更新特定包的影响？",
            "使用分析命令：",
            "我可以永久排除某些包的更新吗？",
            "可以，在 .pcurc.json 中配置排除项：",
            "如何处理有 100+ 包的 monorepo？",
            "大型 monorepo 的性能技巧：",
            "批处理：在高级设置中配置 batchSize: 10",
            "减少并发数：设置 concurrency: 2 避免压垮注册表",
            "使用过滤：使用 --include 模式按组处理包",
            "启用缓存：确保缓存已启用并正确配置",
            "增加内存：设置 NODE_OPTIONS=\"--max-old-space-size=8192\""
          ]
        ],
        [
          "错误消息",
          "",
          [
            "\"无法解析对等依赖\"",
            "当包版本冲突时会发生这种情况。解决方案：",
            "一起更新相关包：pcu update --include \"react*\"",
            "使用交互模式：pcu update --interactive 仔细选择版本",
            "检查对等依赖：审查每个包的要求",
            "使用多个目录：将冲突版本分离到不同目录",
            "\".pcurc.json 中的配置无效\"",
            "您的配置文件有 JSON 语法错误：",
            "\"找不到命令：pcu\"",
            "安装或 PATH 问题：",
            "重新全局安装：npm install -g pcu",
            "检查 PATH：确保 npm 全局 bin 在您的 PATH 中",
            "使用 npx：npx pnpm-catalog-updates check 作为替代",
            "使用 pnpm：pnpm add -g pnpm-catalog-updates（推荐）"
          ]
        ],
        [
          "集成和工具",
          "",
          [
            "PCU 与 Renovate 或 Dependabot 兼容吗？",
            "PCU 是这些工具的替代方案，不是补充：",
            "PCU：手动控制，pnpm 特定，专注目录",
            "Renovate：自动化 PR，支持多种包管理器",
            "Dependabot：GitHub 集成，自动安全更新",
            "根据您的工作流偏好选择。有关迁移，请查看我们的迁移指南。",
            "我可以将 PCU 与 IDE 集成吗？",
            "虽然没有官方 IDE 扩展，但您可以：",
            "添加 npm 脚本：在 package.json 中配置命令",
            "使用任务运行器：与 VS Code 任务或类似工具集成",
            "终端集成：大多数 IDE 支持终端集成",
            "PCU 支持私有 npm 注册表吗？",
            "支持！PCU 读取您的 .npmrc 配置：",
            "PCU 会自动为每个包范围使用正确的注册表。"
          ]
        ],
        [
          "仍有疑问？",
          "",
          [
            "📖 文档：查看我们全面的命令参考",
            "🛠️ 故障排除：访问我们的故障排除指南",
            "🐛 错误报告：创建问题",
            "💬 讨论：GitHub 讨论"
          ]
        ]
      ]
    },
    {
      "url": "/migration",
      "sections": [
        [
          "迁移指南",
          null,
          [
            "学习如何从现有的依赖管理解决方案迁移到 PCU，并帮助团队过渡到 pnpm 目录依赖。 "
          ]
        ],
        [
          "迁移概述",
          "",
          [
            "PCU 专为使用目录依赖的 pnpm 工作区而设计。如果您当前使用其他工具或包管理器，本指南将帮助您平滑过渡。",
            "开始之前",
            "PCU 的前置条件：",
            "pnpm 作为您的包管理器（版本 8.0.0+）",
            "工作区配置（pnpm-workspace.yaml）",
            "工作区中的目录依赖",
            "迁移决策矩阵：",
            "| 当前工具                 | 迁移复杂度 | 好处                       | 考虑因素             |\n| ------------------------ | ---------- | -------------------------- | -------------------- |\n| npm-check-updates        | 低         | 更好的 pnpm 集成，目录支持 | 需要 pnpm 工作区设置 |\n| 手动更新                 | 低         | 自动化，一致性，安全扫描   | 初始配置工作         |\n| Renovate                 | 中         | 手动控制，工作区特定功能   | 失去自动化           |\n| Dependabot               | 中         | 增强的目录管理             | GitHub 特定功能      |\n| yarn upgrade-interactive | 高         | 目录优势，更好的性能       | 完全的包管理器变更   |"
          ]
        ],
        [
          "从 npm-check-updates 迁移",
          "npm-check-updates",
          [
            "当前设置分析",
            "如果您当前使用 npm-check-updates (ncu)，您可能有以下脚本：",
            "迁移步骤",
            "1. 安装 pnpm 并设置工作区",
            "2. 转换为目录依赖",
            "在 pnpm-workspace.yaml 中创建目录条目：",
            "3. 更新包文件",
            "将 package.json 文件转换为使用目录引用：",
            "4. 安装和配置 PCU",
            "5. 更新脚本",
            "使用 PCU 等价命令替换 ncu 脚本：",
            "配置迁移",
            "ncu 配置 → PCU 配置："
          ]
        ],
        [
          "从 Renovate 迁移",
          "renovate",
          [
            "理解差异",
            "Renovate vs PCU：",
            "Renovate：自动化 PR 创建，多语言支持，广泛配置",
            "PCU：手动控制，pnpm 特定，目录专注，安全集成",
            "迁移策略",
            "1. 导出 Renovate 配置",
            "分析当前的 renovate.json：",
            "2. 转换为 PCU 配置",
            "将 Renovate 规则映射到 PCU 等价物：",
            "3. 设置手动工作流",
            "用计划的手动审查替换自动化 PR：",
            "4. 团队过渡",
            "阶段 1：并行运行（2 周）",
            "保持 Renovate 启用",
            "引入 PCU 进行手动检查",
            "培训团队使用 PCU 命令",
            "阶段 2：PCU 主导（2 周）",
            "禁用 Renovate PR 创建",
            "对所有更新使用 PCU",
            "建立审查流程",
            "阶段 3：完全迁移",
            "移除 Renovate 配置",
            "优化 PCU 配置",
            "记录新工作流",
            "Renovate 功能映射",
            "| Renovate 功能 | PCU 等价物         | 备注               |\n| ------------- | ------------------ | ------------------ |\n| 自动化 PR     | 手动 pcu update  | 更多控制，更少噪声 |\n| 调度          | Cron 作业 + PCU    | 灵活的时间安排     |\n| 分组更新      | --include 模式   | 分组相关包         |\n| 自动合并      | autoUpdate: true | 限于安全包         |\n| 漏洞警报      | pcu security     | 集成扫描           |\n| 配置预设      | 包规则             | 可重用模式         |"
          ]
        ],
        [
          "从 Dependabot 迁移",
          "dependabot",
          [
            "GitHub 集成考虑",
            "要复制的 Dependabot 优势：",
            "安全漏洞警报",
            "自动化安全更新",
            "GitHub 集成",
            "PR 创建和管理",
            "迁移方法",
            "1. 审核当前 Dependabot 配置",
            "审查 .github/dependabot.yml：",
            "2. 使用 GitHub Actions 设置 PCU",
            "创建 .github/workflows/dependencies.yml：",
            "3. 安全集成",
            "替换 Dependabot 安全功能：",
            "4. 手动审查流程",
            "建立以人为中心的工作流："
          ]
        ],
        [
          "从手动依赖管理迁移",
          "",
          [
            "评估阶段",
            "当前状态分析：",
            "频率：您多久更新一次依赖？",
            "流程：您当前的更新工作流是什么？",
            "测试：您如何验证更新？",
            "安全：您如何处理漏洞？",
            "常见手动模式：",
            "结构化迁移",
            "阶段 1：评估（第 1 周）",
            "阶段 2：目录转换（第 2 周）",
            "阶段 3：流程集成（第 3-4 周）",
            "自动化策略",
            "渐进式自动化：",
            "手动开始：所有更新都需要确认",
            "半自动化：自动更新开发依赖和类型",
            "智能自动化：自动更新补丁，确认次要版本",
            "完全自动化：自动更新除主版本外的所有内容",
            "配置演进："
          ]
        ],
        [
          "转换非 pnpm 项目",
          "pnpm",
          [
            "从 npm 项目",
            "1. 依赖分析",
            "2. pnpm 迁移",
            "3. 目录提取",
            "从 Yarn 项目",
            "1. 工作区转换",
            "2. 迁移命令",
            "单体仓库转换",
            "大型单体仓库策略："
          ]
        ],
        [
          "团队过渡策略",
          "",
          [
            "变更管理",
            "1. 沟通计划",
            "第 -2 周：宣布迁移计划",
            "第 -1 周：培训课程和文档",
            "第 0 周：开始并行运行",
            "第 2 周：完全过渡",
            "第 4 周：流程优化",
            "2. 培训项目",
            "开发者培训会议（1 小时）：",
            "团队领导培训（2 小时）：",
            "配置管理",
            "安全政策集成",
            "性能优化",
            "监控和报告",
            "推出策略",
            "试点项目方法：",
            "选择试点项目：选择代表性但非关键的项目",
            "迁移试点：与试点团队完成迁移",
            "经验教训：记录问题和解决方案",
            "规模推出：将经验应用到其他项目",
            "风险缓解：",
            "流程集成",
            "代码审查集成：",
            "发布集成："
          ]
        ],
        [
          "验证和测试",
          "",
          [
            "迁移验证",
            "1. 功能测试",
            "2. 性能比较",
            "3. 依赖完整性",
            "成功指标",
            "关键绩效指标：",
            "安装速度：pnpm install vs npm install",
            "更新频率：迁移前后每月更新次数",
            "安全响应：修复漏洞的时间",
            "开发者满意度：团队调查结果",
            "构建性能：CI/CD 执行时间",
            "监控仪表板："
          ]
        ],
        [
          "迁移检查清单",
          "",
          [
            "迁移前",
            "评估当前依赖管理方法",
            "在隔离环境中安装和测试 pnpm",
            "规划工作区结构",
            "识别目录的公共依赖",
            "备份当前配置",
            "培训核心团队成员",
            "迁移阶段",
            "转换为 pnpm 工作区结构",
            "将依赖提取到目录",
            "更新 package.json 文件以使用目录引用",
            "安装和配置 PCU",
            "使用试点项目测试功能",
            "更新 CI/CD 流水线",
            "记录新流程",
            "迁移后",
            "验证所有功能正常工作",
            "培训其余团队成员",
            "优化 PCU 配置",
            "建立定期维护计划",
            "监控和测量成功指标",
            "收集反馈并迭代",
            "故障排除",
            "记录常见迁移问题",
            "创建回滚程序",
            "建立支持渠道",
            "定期健康检查和优化"
          ]
        ]
      ]
    },
    {
      "url": "/performance",
      "sections": [
        [
          "性能优化",
          null,
          [
            "为大型单体仓库、复杂工作区和资源受限环境最大化 PCU 性能。 "
          ]
        ],
        [
          "理解 PCU 性能",
          "pcu",
          [
            "PCU 性能取决于几个因素：",
            "网络延迟：仓库响应时间和带宽",
            "工作区大小：包和依赖的数量",
            "缓存效率：命中率和存储优化",
            "系统资源：CPU、内存和磁盘 I/O",
            "配置：并发设置和超时值",
            "性能分析",
            "启用详细性能监控：",
            "输出分析示例："
          ]
        ],
        [
          "配置优化",
          "",
          [
            "并发设置",
            "为您的环境优化并发操作：",
            "并发指南：",
            "小项目（< 20 个包）：concurrency: 5-8",
            "中型项目（20-100 个包）：concurrency: 3-5",
            "大型项目（100+ 个包）：concurrency: 1-3",
            "CI/CD 环境：concurrency: 2-3",
            "内存管理",
            "Node.js 内存优化：",
            "PCU 内存配置："
          ]
        ],
        [
          "缓存策略",
          "",
          [
            "本地缓存优化",
            "缓存配置：",
            "环境变量：",
            "缓存管理命令",
            "CI/CD 缓存集成"
          ]
        ],
        [
          "网络优化",
          "",
          [
            "仓库配置",
            "优化仓库选择：",
            "连接优化：",
            "带宽管理"
          ]
        ],
        [
          "大型单体仓库策略",
          "",
          [
            "工作区分割",
            "组织大型工作区：",
            "选择性处理：",
            "增量处理",
            "分阶段更新：",
            "处理工作流："
          ]
        ],
        [
          "内存和资源管理",
          "",
          [
            "内存分析",
            "监控内存使用：",
            "内存优化技术：",
            "磁盘 I/O 优化",
            "SSD vs HDD 配置：",
            "文件系统缓存："
          ]
        ],
        [
          "性能监控",
          "",
          [
            "指标收集",
            "内置指标：",
            "自定义监控：",
            "基准测试",
            "性能基准：",
            "性能调优指南",
            "逐步优化：",
            "基线测量",
            "启用缓存",
            "优化并发",
            "网络优化",
            "内存调优"
          ]
        ],
        [
          "性能问题故障排除",
          "",
          [
            "常见性能问题",
            "慢网络请求：",
            "内存问题：",
            "缓存问题：",
            "性能回归检测",
            "自动化性能测试："
          ]
        ],
        [
          "环境特定优化",
          "",
          [
            "本地开发",
            "开发机器设置：",
            "CI/CD 环境",
            "不同 CI 提供商的优化：",
            "生产部署",
            "生产级配置："
          ]
        ],
        [
          "性能检查清单",
          "",
          [
            "快速改进",
            "启用持久缓存：export PCU_CACHE_ENABLED=true",
            "为您的环境优化并发",
            "使用地理位置接近的仓库",
            "为大型项目增加 Node.js 堆大小",
            "启用请求压缩和保持活动",
            "高级优化",
            "实施 CI/CD 缓存策略",
            "为大型单体仓库配置工作区分割",
            "设置性能监控和告警",
            "优化持续操作的内存管理",
            "实施增量处理工作流",
            "监控与维护",
            "定期性能基准测试",
            "缓存健康监控",
            "网络延迟测量",
            "内存使用分析",
            "性能回归检测"
          ]
        ]
      ]
    },
    {
      "url": "/quickstart",
      "sections": [
        [
          "快速开始",
          null,
          [
            "几分钟内开始使用 pnpm-catalog-updates。本指南将引导您完成安装、初始化和第一次依赖更新。",
            "pnpm-catalog-updates 专为使用目录依赖的 pnpm 工作空间而设计。开始之前请确保您有一个 pnpm\n工作空间。"
          ]
        ],
        [
          "安装",
          "",
          [
            "选择您首选的安装方法："
          ]
        ],
        [
          "初始化工作空间",
          "",
          [
            "如果您还没有 pnpm 工作空间，PCU 可以为您创建一个：",
            "此命令创建：",
            ".pcurc.json - PCU 配置文件",
            "package.json - 工作空间根 package.json（如果缺失）",
            "pnpm-workspace.yaml - PNPM 工作空间配置（如果缺失）",
            "packages/ - 工作空间包目录（如果缺失）"
          ]
        ],
        [
          "第一次更新检查",
          "",
          [
            "检查过时的目录依赖：",
            "这将显示一个美观的表格，包含：",
            "目录中的当前版本",
            "最新可用版本",
            "包名称和更新类型",
            "彩色编码的紧急程度指示器"
          ]
        ],
        [
          "交互式更新",
          "",
          [
            "使用交互式界面更新依赖：",
            "这让您可以：",
            "✅ 选择要更新的依赖",
            "🎯 选择特定版本",
            "📊 查看影响分析",
            "🔒 自动创建备份"
          ]
        ],
        [
          "常用命令",
          "",
          [
            "以下是最常用的命令：",
            "| 命令       | 描述           | 示例                       |\n| ---------- | -------------- | -------------------------- |\n| pcu init | 初始化工作空间 | pcu init --verbose       |\n| pcu -c   | 检查更新       | pcu -c --catalog default |\n| pcu -i   | 交互式更新     | pcu -i -b                |\n| pcu -u   | 更新依赖       | pcu -u --target minor    |\n| pcu -a   | 分析影响       | pcu -a default react     |"
          ]
        ],
        [
          "下一步",
          "",
          []
        ],
        [
          "入门清单",
          "",
          [
            "按照此清单在您的项目中运行 PCU：",
            "安装 PCU - 选择全局安装或使用 npx",
            "初始化工作空间 - 运行 pcu init 进行首次设置",
            "检查更新 - 使用 pcu -c 查看可用更新",
            "配置设置 - 根据需要自定义 .pcurc.json",
            "更新依赖 - 使用交互模式 pcu -i 进行安全更新",
            "设置自动化 - 考虑 CI/CD 集成以进行定期检查"
          ]
        ],
        [
          "基本命令快速参考",
          "",
          [
            "| 命令           | 用途         | 使用时机          |\n| -------------- | ------------ | ----------------- |\n| pcu init     | 设置工作空间 | 首次设置，新项目  |\n| pcu -c       | 检查更新     | 日常开发，CI 检查 |\n| pcu -i       | 交互式更新   | 安全手动更新      |\n| pcu -u       | 批量更新     | 自动更新，CI/CD   |\n| pcu security | 安全扫描     | 发布前，定期审核  |"
          ]
        ],
        [
          "后续步骤",
          "",
          [
            "一旦您设置了 PCU，探索这些高级功能：",
            "配置 - 为您的特定工作流程自定义 PCU",
            "安全扫描 - 集成漏洞扫描",
            "Monorepo 管理 - 高级工作空间功能",
            "CI/CD 集成 - 在您的流水线中自动化依赖更新"
          ]
        ]
      ]
    },
    {
      "url": "/troubleshooting",
      "sections": [
        [
          "故障排除",
          null,
          [
            "常见问题和解决方案，帮助您解决 PCU 的问题。查找常见错误的答案和调试技巧。"
          ]
        ],
        [
          "常见错误",
          "",
          [
            "未找到工作空间",
            "错误消息：",
            "原因： PCU 无法找到 pnpm-workspace.yaml 文件或检测到有效的 pnpm 工作空间结构。",
            "解决方案：",
            "无目录依赖",
            "错误消息：",
            "原因： 您的工作空间未使用 pnpm 目录依赖。",
            "解决方案：",
            "注册表访问问题",
            "错误消息：",
            "原因： 网络连接问题或注册表访问问题。",
            "解决方案：",
            "身份验证错误",
            "错误消息：",
            "原因： 私有注册表缺少或无效的身份验证令牌。",
            "解决方案：",
            "配置文件错误",
            "错误消息：",
            "原因： JSON 格式错误或无效配置选项。",
            "解决方案："
          ]
        ],
        [
          "调试",
          "",
          [
            "启用详细日志",
            "工作空间验证"
          ]
        ],
        [
          "性能问题",
          "",
          [
            "网络请求缓慢",
            "症状： PCU 检查更新需要很长时间",
            "解决方案：",
            "高内存使用",
            "症状： PCU 在大型工作空间中消耗过多内存",
            "解决方案："
          ]
        ],
        [
          "环境问题",
          "",
          [
            "Node.js 版本兼容性",
            "错误消息：",
            "解决方案：",
            "pnpm 版本问题",
            "错误消息：",
            "解决方案："
          ]
        ],
        [
          "Windows 特定问题",
          "windows",
          [
            "路径分隔符问题",
            "错误消息：",
            "解决方案：",
            "权限错误",
            "错误消息：",
            "解决方案："
          ]
        ],
        [
          "获取帮助",
          "",
          [
            "诊断信息",
            "报告问题时，请包含此诊断信息：",
            "支持渠道",
            "🐛 错误报告：GitHub Issues",
            "💬 问题：GitHub Discussions",
            "📖 文档：查看此文档获取详细指南",
            "🔧 功能请求：使用带增强标签的 GitHub Issues",
            "问题模板",
            "报告错误时，请包含：",
            "PCU 版本和使用的命令",
            "错误消息（带 --verbose 的完整输出）",
            "环境（操作系统、Node.js、pnpm 版本）",
            "工作空间结构（pnpm-workspace.yaml、package.json）",
            "配置（.pcurc.json、.npmrc 如果相关）",
            "重现问题的步骤",
            "预期与实际行为"
          ]
        ],
        [
          "高级故障排除",
          "",
          [
            "复杂依赖冲突",
            "错误场景：",
            "症状： 更新后出现版本冲突，应用无法启动",
            "完整诊断过程：",
            "CI/CD 环境故障",
            "错误场景：",
            "症状： CI/CD中PCU运行失败，本地工作正常",
            "解决方案：",
            "大型monorepo性能问题",
            "错误场景：",
            "症状： 在包含100+包的monorepo中PCU崩溃",
            "优化方案：",
            "私有注册表认证问题",
            "错误场景：",
            "症状： 无法访问私有包，公共包工作正常",
            "完整解决流程：",
            "安全扫描误报处理",
            "错误场景：",
            "症状： 安全扫描报告漏洞，但实际不影响项目",
            "处理策略：",
            "网络环境故障排除",
            "错误场景：",
            "症状： 企业网络环境下频繁超时，代理问题",
            "解决方案：",
            "版本约束冲突",
            "错误场景：",
            "症状： 工作空间中包的版本要求冲突",
            "解决策略："
          ]
        ],
        [
          "恢复程序",
          "",
          [
            "更新失败回滚",
            "当更新导致问题时的完整恢复流程：",
            "损坏缓存修复",
            "当PCU缓存损坏导致问题：",
            "工作空间损坏修复",
            "当工作空间配置损坏："
          ]
        ],
        [
          "日志分析和监控",
          "",
          [
            "实时问题诊断",
            "问题模式识别",
            "这些高级故障排除指南应该能帮助您解决PCU使用中遇到的复杂问题。如果问题仍然存在，请按照\"获取帮助\"部分的指导收集诊断信息并寻求支持。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-advanced",
      "sections": [
        [
          "高级写作功能",
          null,
          [
            "掌握让您的文档专业而有效的高级功能。了解元数据、引导段落、样式上下文，以及区分优秀文档和良好文档的最佳实践。 "
          ]
        ],
        [
          "元数据和SEO",
          "seo",
          [
            "每个页面都应在顶部包含元数据："
          ]
        ],
        [
          "引导段落",
          "",
          [
            "使用{{ className: 'lead' }}使介绍段落脱颖而出："
          ]
        ],
        [
          "样式上下文",
          "",
          [
            "not-prose类",
            "对需要脱离散文样式的组件使用<div className=\"not-prose\">："
          ]
        ],
        [
          "文档最佳实践",
          "",
          [
            "内容结构",
            "从元数据和清晰标题开始",
            "使用引导段落进行介绍",
            "使用适当的标题层次组织",
            "为重要信息添加Notes",
            "包含实用的代码示例",
            "以清晰的后续步骤结束",
            "写作风格",
            "使用主动语态",
            "简洁而完整",
            "为每个概念包含示例",
            "测试所有代码片段",
            "保持术语一致性",
            "组织方式",
            "将相关主题组合在一起",
            "大量使用交叉引用",
            "提供多个入口点",
            "考虑用户的使用旅程",
            "包含对搜索友好的标题"
          ]
        ],
        [
          "完整的文档工作流程",
          "",
          [
            "规划：概述您的内容结构",
            "写作：为每个部分使用适当的组件",
            "审查：检查完整性和准确性",
            "测试：验证所有示例都能工作",
            "迭代：基于反馈进行改进",
            "您现在拥有创建世界级文档所需的所有工具！"
          ]
        ]
      ]
    },
    {
      "url": "/writing-api",
      "sections": [
        [
          "API文档写作",
          null,
          [
            "创建开发者喜爱的全面API文档。学习使用Properties记录参数、Tags标记HTTP方法、Libraries展示SDK，以及使API参考清晰可操作的专门组件。 "
          ]
        ],
        [
          "属性列表",
          "",
          [
            "使用<Properties>和<Property>记录API参数：",
            "资源的唯一标识符。创建资源时自动生成。",
            "资源的显示名称。必须在1到100个字符之间。",
            "有效的电子邮件地址。在所有用户中必须唯一。",
            "ISO 8601时间戳，表示资源的创建时间。"
          ]
        ],
        [
          "HTTP方法标签",
          "http",
          [
            "标签根据HTTP方法自动着色：",
            "GET\nPOST\nPUT\nDELETE\n自定义\n成功\n错误"
          ]
        ],
        [
          "Libraries组件",
          "libraries",
          [
            "完整库网格",
            "使用<Libraries>组件展示所有官方SDK：",
            "单个库",
            "使用<Library>组件显示单个库：",
            "紧凑库展示",
            "在较小空间中，使用带描述的紧凑模式：",
            "或者无描述的更紧凑展示：",
            "Library组件选项",
            "language: 可选择 php, ruby, node, python, go (默认: node)",
            "compact: 使用紧凑样式 (默认: false)",
            "showDescription: 显示/隐藏描述文本 (默认: true)",
            "Libraries使用场景",
            "<Libraries />: 完整SDK概览页面，入门部分",
            "<Library />: 内联文档，特定语言指南",
            "<Library compact />: 侧边栏参考，紧凑列表"
          ]
        ],
        [
          "API最佳实践",
          "api",
          [
            "始终使用Properties组件记录所有参数",
            "包含示例请求和响应",
            "使用Tags标记适当的HTTP状态码",
            "提供清晰的错误消息",
            "包含身份验证要求",
            "SDK页面使用Libraries组件",
            "保持Properties列表专注且组织良好"
          ]
        ],
        [
          "下一步",
          "",
          [
            "使用高级功能完成您的文档之旅。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-basics",
      "sections": [
        [
          "写作基础",
          null,
          [
            "掌握文档写作的基础构建块。本指南涵盖标准Markdown语法、格式选项以及您在每个文档中都会使用的基本元素。 "
          ]
        ],
        [
          "Markdown基础",
          "markdown",
          [
            "完全支持标准Markdown格式，它构成了所有文档的基础：",
            "粗体文字用于强调和重要性斜体文字用于微妙的强调内联代码用于技术术语、命令和短代码片段",
            "您可以组合使用：粗体和斜体 或 粗体配代码"
          ]
        ],
        [
          "文本格式",
          "",
          [
            "强调和加粗文本",
            "使用星号或下划线表示强调：",
            "代码和技术术语",
            "对于内联代码、变量或技术术语，使用反引号："
          ]
        ],
        [
          "列表和组织",
          "",
          [
            "无序列表",
            "非常适合功能列表、需求或任何非顺序项目：",
            "主要功能或要点",
            "另一个重要项目",
            "第三个考虑因素",
            "嵌套子要点",
            "附加子详情",
            "回到主层级",
            "有序列表",
            "用于分步说明、程序或优先级项目：",
            "过程中的第一步",
            "包含重要详细信息的第二步",
            "第三步",
            "带有具体说明的子步骤",
            "另一个子步骤",
            "最后一步",
            "任务列表",
            "非常适合检查清单和进度跟踪：",
            "[x] 已完成的任务",
            "[x] 另一个完成的项目",
            "[ ] 待处理任务",
            "[ ] 未来增强功能"
          ]
        ],
        [
          "链接和导航",
          "",
          [
            "内部链接",
            "链接到文档中的其他页面：",
            "示例：",
            "命令参考指南",
            "故障排除",
            "SDK文档",
            "外部链接",
            "链接到外部资源：",
            "锚点链接",
            "链接到页面内的特定部分："
          ]
        ],
        [
          "标题和结构",
          "",
          [
            "使用适当的标题级别创建清晰的文档层次结构：",
            "标题最佳实践",
            "仅将H1用于页面标题（由元数据处理）",
            "主要部分使用H2，子部分使用H3",
            "不要跳过标题级别（不要H2 → H4）",
            "保持标题描述性和可扫描性",
            "使用句子大小写：\"入门指南\"而不是\"入门指南\""
          ]
        ],
        [
          "引用和标注",
          "",
          [
            "块引用",
            "用于重要引用或参考：",
            "\"文档是你写给未来自己的情书。\"— Damian Conway",
            "重要提示：这是一个突出显示的引用，包含跨越多行并提供关键信息的附加上下文。",
            "多段落引用",
            "这是较长引用的第一段。",
            "这是第二段，继续思考并提供额外的细节和上下文。"
          ]
        ],
        [
          "水平分割线",
          "",
          [
            "使用水平分割线分隔主要部分：",
            "创建视觉分隔："
          ]
        ],
        [
          "表格",
          "",
          [
            "用于结构化数据的简单表格：",
            "| 功能     | 基础版 | 专业版 | 企业版   |\n| -------- | ------ | ------ | -------- |\n| 用户数   | 10     | 100    | 无限制   |\n| 存储空间 | 1GB    | 10GB   | 100GB    |\n| API调用  | 1,000  | 10,000 | 无限制   |\n| 支持     | 邮件   | 优先   | 24/7电话 |",
            "表格对齐",
            "控制列对齐：",
            "| 左对齐   | 居中对齐 |   右对齐 |\n| :------- | :------: | -------: |\n| 文本     |   文本   |     文本 |\n| 更多内容 | 更多内容 | 更多内容 |"
          ]
        ],
        [
          "特殊字符",
          "",
          [
            "使用反斜杠转义特殊Markdown字符："
          ]
        ],
        [
          "换行和间距",
          "",
          [
            "行末使用两个空格进行硬换行",
            "使用空行分隔段落",
            "在列表中使用行末的\\进行换行"
          ]
        ],
        [
          "下一步",
          "",
          [
            "掌握了这些基础知识后，探索：",
            "组件写作 - 交互式UI元素",
            "代码写作 - 代码块和语法高亮",
            "布局写作 - 多列布局和组织",
            "API写作 - API文档组件",
            "高级写作 - 高级功能和最佳实践",
            "这些基础知识构成了所有优秀文档的基础。首先掌握它们，然后使用其他指南中涵盖的高级组件和技术在此基础上构建。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-code",
      "sections": [
        [
          "代码写作",
          null,
          [
            "掌握在文档中展示代码的艺术。学习使用语法高亮、创建多语言示例，以及有效组织代码块来帮助开发者理解和实现您的解决方案。 "
          ]
        ],
        [
          "单个代码块",
          "",
          [
            "带有自动语法高亮的基础代码块：",
            "上面的JavaScript代码块使用以下MDX语法创建：",
            "Python示例：",
            "Python代码块的MDX语法：",
            "Bash/Shell命令：",
            "Bash代码块的MDX语法："
          ]
        ],
        [
          "多语言CodeGroup",
          "code-group",
          [
            "使用<CodeGroup>展示不同语言的相同示例：",
            "上面的多语言代码组使用以下MDX语法创建："
          ]
        ],
        [
          "API端点示例",
          "api",
          [
            "对于API文档，使用HTTP方法标签：",
            "上面的API端点示例使用以下MDX语法创建，注意tag和label属性：",
            "代码块标题",
            "您也可以为单个代码块添加标题："
          ]
        ],
        [
          "支持的语言",
          "",
          [
            "我们的代码块支持多种编程语言的语法高亮，包括但不限于：",
            "JavaScript/TypeScript: javascript, typescript, js, ts",
            "Python: python, py",
            "Shell脚本: bash, shell, sh",
            "其他语言: json, yaml, xml, sql, css, html, markdown, diff",
            "示例：",
            "JSON代码块的MDX语法：",
            "代码对比（Diff）：",
            "Diff代码块的MDX语法："
          ]
        ],
        [
          "最佳实践",
          "",
          [
            "总是为代码块指定语言以获得语法高亮",
            "使用描述性标题来区分不同的代码示例",
            "包含完整、可运行的示例",
            "保持示例简洁但功能完整",
            "使用一致的格式和样式",
            "在CodeGroup中按照使用频率排序语言标签页"
          ]
        ],
        [
          "下一步",
          "",
          [
            "继续阅读布局组件来有效组织您的内容。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-components",
      "sections": [
        [
          "组件写作",
          null,
          [
            "通过交互式UI组件增强您的文档效果。学习如何使用Notes来突出重要信息、使用Buttons进行操作指导，以及其他让您的文档更具吸引力和功能性的元素。 "
          ]
        ],
        [
          "提示和标注",
          "",
          [
            "<Note>组件非常适合突出显示重要信息、警告或读者应该特别注意的提示。",
            "基础Note用法",
            "这是一个基础的提示组件。它自动使用翠绿主题和信息图标来样式化内容，使重要信息从常规文本中脱颖而出。",
            "包含丰富内容的Notes",
            "Notes支持完整的Markdown格式，包括粗体文本、斜体文本、内联代码，甚至是到其他页面的链接。",
            "重要设置要求：在继续之前，请确保您已经： - 安装了Node.js 18或更高版本 - 可以访问项目仓库 -\n配置了有效的API凭据 有关凭据设置，请参阅命令参考指南。",
            "多段落Notes",
            "这是包含多个相关信息片段的长提示的第一段。",
            "第二段继续提供额外的上下文思路。您可以包含任意多的段落来完整解释概念。",
            "记住，好的提示简洁而完整，提供刚好足够的信息来帮助读者理解消息的重要性。"
          ]
        ],
        [
          "按钮和操作",
          "",
          [
            "<Button>组件创建行动号召元素，引导用户到重要链接或后续步骤。",
            "按钮变体",
            "填充按钮",
            "用于主要操作和最重要的行动号召：",
            "了解代码组件",
            "轮廓按钮",
            "非常适合次要操作和替代路径：",
            "探索布局组件",
            "文本按钮",
            "与内容融合的微妙链接，同时仍然突出显示：",
            "返回基础",
            "按钮箭头",
            "按钮支持方向箭头来指示导航：",
            "上一节",
            "下一节",
            "按钮最佳实践",
            "适度使用：太多按钮会降低效果",
            "清晰的动作词：\"开始使用\"、\"了解更多\"、\"查看文档\"",
            "逻辑层次：填充用于主要，轮廓用于次要，文本用于第三级",
            "方向箭头：左箭头表示\"返回/上一个\"，右箭头表示\"前进/下一个\"",
            "包裹在not-prose中：始终使用<div className=\"not-prose\">包装器"
          ]
        ],
        [
          "组件样式上下文",
          "",
          [
            "not-prose包装器",
            "某些组件需要脱离默认的散文样式。始终包装这些组件：",
            "需要not-prose的组件：",
            "所有<Button>组件",
            "自定义布局元素",
            "交互式小部件",
            "复杂的样式化组件",
            "不需要not-prose的组件：",
            "<Note>组件（自包含样式）",
            "标准Markdown元素",
            "基于文本的组件",
            "多个组件",
            "当一起显示多个组件时：",
            "API文档指南",
            "高级功能",
            "回顾基础"
          ]
        ],
        [
          "组件可访问性",
          "",
          [
            "所有组件都考虑了可访问性：",
            "语义HTML：适当的按钮和链接元素",
            "ARIA标签：需要时提供屏幕阅读器支持",
            "键盘导航：完整的键盘可访问性",
            "焦点管理：清晰的焦点指示器",
            "颜色对比度：符合WCAG的颜色方案"
          ]
        ],
        [
          "何时使用各个组件",
          "",
          [
            "使用Notes的场合：",
            "突出显示关键信息",
            "警告潜在问题",
            "提供有用的提示或上下文",
            "解释先决条件或要求",
            "引起对重要更改的注意",
            "使用Buttons的场合：",
            "引导到下一个逻辑步骤",
            "链接到外部资源",
            "创建清晰的行动号召时机",
            "主要部分之间的导航",
            "突出显示主要操作",
            "避免过度使用：",
            "不要在每个段落都使用提示",
            "每个部分限制1-2个按钮",
            "为真正重要的内容保留组件",
            "让常规文本和Markdown承载大部分内容"
          ]
        ],
        [
          "下一步",
          "",
          [
            "现在您了解了UI组件，可以探索：",
            "代码写作 - 语法高亮和代码块",
            "布局写作 - 多列布局和组织",
            "API写作 - API文档组件",
            "高级写作 - 高级功能和元数据",
            "掌握这些交互式元素，创建不仅能提供信息，还能有效指导和吸引读者的文档。"
          ]
        ]
      ]
    },
    {
      "url": "/writing-layout",
      "sections": [
        [
          "布局写作",
          null,
          [
            "创建提升可读性和用户体验的复杂布局。学习使用Row和Col组件进行多列设计、粘性定位和有效的内容组织。 "
          ]
        ],
        [
          "双栏布局",
          "",
          [
            "使用<Row>和<Col>实现并排内容：",
            "左栏",
            "此内容出现在左栏中。非常适合解释、描述或补充信息。",
            "关键点一",
            "重要细节",
            "附加上下文",
            "右栏"
          ]
        ],
        [
          "粘性栏布局",
          "",
          [
            "让内容在滚动时保持粘性：",
            "滚动内容",
            "这是正常滚动的常规内容。您可以在这里放置用户需要滚动阅读的长解释。",
            "此栏包含需要滚动才能完整消费的主要叙述或详细信息。",
            "粘性参考",
            "这在您滚动时保持可见。"
          ]
        ],
        [
          "Guides组件",
          "guides",
          [
            "使用<Guides>组件显示指南链接网格：",
            "Guides组件显示预定义的文档指南集合，包含链接和描述。非常适合概览页面和入门部分。"
          ]
        ],
        [
          "Resources组件",
          "resources",
          [
            "使用动画卡片展示主要资源类别：",
            "Resources组件显示带有图标和描述的动画资源卡片。非常适合主要登录页面和API概览部分。"
          ]
        ],
        [
          "图标",
          "",
          [
            "使用单独的图标进行内联装饰或自定义布局：",
            "可用图标",
            "<UserIcon /> - 单个用户",
            "<UsersIcon /> - 多个用户",
            "<EnvelopeIcon /> - 消息/邮件",
            "<ChatBubbleIcon /> - 对话",
            "<BookIcon /> - 文档",
            "<CheckIcon /> - 成功/完成",
            "<BellIcon /> - 通知",
            "<CogIcon /> - 设置/配置"
          ]
        ],
        [
          "布局最佳实践",
          "",
          [
            "对补充内容使用双栏布局",
            "粘性栏最适合参考资料",
            "保持栏的内容长度平衡",
            "确保移动端响应式（小屏幕上栏会堆叠）",
            "文档概览页面使用Guides组件",
            "API类别展示使用Resources组件",
            "图标配合自定义Tailwind类可实现颜色和尺寸控制"
          ]
        ],
        [
          "下一步",
          "",
          [
            "继续阅读API文档了解专门的组件。"
          ]
        ]
      ]
    }
  ]
} as const
