/**
 * German Translations (Deutsch)
 */

import type { TranslationDictionary } from '../types.js'

export const de: TranslationDictionary = {
  // Error messages
  'error.packageNotFound': 'Das Paket "{{packageName}}" existiert nicht in der npm-Registry',
  'error.packageNotFoundWithSuggestion': 'Das Paket "{{packageName}}" existiert nicht',
  'error.possiblePackageNames': 'Mögliche korrekte Paketnamen:',
  'error.checkPackageName':
    'Bitte überprüfen Sie, ob der Paketname korrekt ist, oder das Paket wurde möglicherweise entfernt',
  'error.emptyVersion': 'Die Versionsinformationen für Paket "{{packageName}}" sind leer',
  'error.emptyVersionReasons':
    'Mögliche Ursachen:\n   • Probleme mit der package.json-Konfiguration\n   • Falsches Versionsformat in der Katalog-Konfiguration\n   • Probleme bei der Datensynchronisation der npm-Registry',
  'error.networkError': 'Netzwerkfehler beim Überprüfen des Pakets "{{packageName}}"',
  'error.networkRetry':
    'Bitte versuchen Sie es später erneut oder überprüfen Sie Ihre Netzwerkverbindung',
  'error.registryError': 'Registry-Fehler für "{{packageName}}": {{message}}',
  'error.workspaceNotFound': 'Kein pnpm-Workspace unter "{{path}}" gefunden',
  'error.catalogNotFound': 'Katalog "{{catalogName}}" nicht gefunden',
  'error.invalidVersion': 'Ungültige Version "{{version}}"',
  'error.invalidVersionRange': 'Ungültiger Versionsbereich "{{range}}"',
  'error.configurationError': 'Konfigurationsfehler: {{message}}',
  'error.fileSystemError': 'Dateisystemfehler: {{message}}',
  'error.cacheError': 'Cache-Fehler: {{message}}',
  'error.securityCheckFailed':
    'Sicherheitsprüfung für "{{packageName}}" fehlgeschlagen: {{message}}',
  'error.securityCheckUnavailable':
    'Sicherheitsstatus von "{{packageName}}" kann nicht überprüft werden',
  'error.updateFailed': 'Aktualisierung fehlgeschlagen: {{message}}',
  'error.packageSkipped': 'Paket "{{packageName}}" übersprungen (Prüfung fehlgeschlagen)',
  'error.unknown': 'Ein unbekannter Fehler ist aufgetreten',

  // Validation errors
  'validation.packageNameRequired': 'Paketname ist erforderlich',
  'validation.invalidFormat':
    'Ungültiges Format. Muss eines sein von: table, json, yaml, minimal, github, gitlab, junit, sarif',
  'validation.invalidSeverity':
    'Ungültiger Schweregrad. Muss eines sein von: low, moderate, high, critical',
  'validation.invalidTarget':
    'Ungültiges Ziel. Muss eines sein von: latest, greatest, minor, patch, newest',
  'validation.interactiveWithDryRun': '--interactive kann nicht mit --dry-run verwendet werden',
  'validation.includePatternsEmpty': 'Include-Muster dürfen nicht leer sein',
  'validation.excludePatternsEmpty': 'Exclude-Muster dürfen nicht leer sein',
  'validation.workspaceDirNotExist': 'Workspace-Verzeichnis existiert nicht: {{path}}',
  'validation.invalidProvider':
    'Ungültiger Provider. Muss einer der folgenden sein: auto, claude, gemini, codex',
  'validation.invalidAnalysisType':
    'Ungültiger Analysetyp. Muss einer der folgenden sein: impact, security, compatibility, recommend',
  'validation.invalidGraphType':
    'Ungültiger Graph-Typ. Muss einer der folgenden sein: {{validTypes}}',
  'validation.invalidGraphFormat':
    'Ungültiges Graph-Format. Muss eines der folgenden sein: {{validFormats}}',

  // Success messages
  'success.updateComplete': 'Aktualisierung erfolgreich abgeschlossen',
  'success.cacheCleared': 'Cache erfolgreich geleert',
  'success.configInitialized': 'Konfiguration erfolgreich initialisiert',
  'success.validationPassed': 'Alle Validierungen bestanden',

  // Info messages
  'info.checkingUpdates': 'Überprüfe veraltete Katalog-Abhängigkeiten',
  'info.foundOutdated': '{{count}} veraltete Abhängigkeiten gefunden',
  'info.noUpdatesFound': 'Alle Katalog-Abhängigkeiten sind aktuell!',
  'info.runWithUpdate': 'Führen Sie mit --update aus, um Aktualisierungen anzuwenden',
  'info.majorWarning': 'Major-Updates können inkompatible Änderungen enthalten',
  'info.securityUpdates': '{{count}} Sicherheitsupdates verfügbar',

  // Warning messages
  'warning.configExists': 'Konfigurationsdatei existiert bereits',
  'warning.workspaceNotDetected': 'Keine PNPM-Workspace-Struktur erkannt',
  'warning.deprecatedPackage': 'Das Paket "{{packageName}}" ist veraltet',

  // Summary messages
  'summary.skippedPackages': '{{count}} Paketprüfungen übersprungen:',
  'summary.notFoundPackages': 'Nicht gefunden ({{count}}): {{packages}}',
  'summary.emptyVersionPackages': 'Leere Versionsinformationen ({{count}}): {{packages}}',
  'summary.networkIssuePackages': 'Netzwerkprobleme ({{count}}): {{packages}}',
  'summary.otherIssuePackages': 'Andere Probleme ({{count}}): {{packages}}',
  'summary.securityCheckFailures': 'Sicherheitsprüfungsfehler: {{count}}',

  // Command messages
  'command.workspace.title': 'Workspace',
  'command.workspace.path': 'Pfad',
  'command.workspace.packages': 'Pakete',
  'command.workspace.catalogs': 'Kataloge',
  'command.workspace.catalogNames': 'Katalognamen',
  'command.check.analyzing': 'Analysiere Katalog-Abhängigkeiten...',
  'command.check.summary': 'Zusammenfassung',
  'command.check.majorUpdates': '{{count}} Major-Updates',
  'command.check.minorUpdates': '{{count}} Minor-Updates',
  'command.check.patchUpdates': '{{count}} Patch-Updates',
  'command.init.creating': 'Erstelle PCU-Konfiguration...',
  'command.init.success': 'PCU-Konfiguration erfolgreich initialisiert!',
  'command.init.nextSteps': 'Nächste Schritte',

  // Theme command
  'command.theme.availableThemes': 'Verfügbare Themes:',
  'command.theme.invalidTheme': 'Ungültiges Theme: {{theme}}',
  'command.theme.setTo': 'Theme gesetzt auf: {{theme}}',
  'command.theme.configured': 'Theme konfiguriert: {{theme}}',
  'command.theme.cancelled': 'Theme-Auswahl abgebrochen.',
  'command.theme.currentSettings': 'Aktuelle Theme-Einstellungen:',
  'command.theme.preview': 'Theme-Vorschau:',
  'command.theme.useHint':
    'Verwenden Sie --set <theme> zum Ändern oder --interactive für geführte Einrichtung',

  // Analyze command
  'command.analyze.autoDetecting': 'Automatische Erkennung des Katalogs für {{packageName}}...',
  'command.analyze.notFoundInCatalog': 'Paket "{{packageName}}" in keinem Katalog gefunden',
  'command.analyze.specifyManually':
    'Verwenden Sie --catalog <name>, um den Katalog manuell anzugeben',
  'command.analyze.foundInCatalog': 'Gefunden in Katalog: {{catalog}}',
  'command.analyze.runningAI': 'Führe KI-gestützte Analyse durch...',
  'command.analyze.aiFailed': 'KI-Analyse fehlgeschlagen, zeige Basisanalyse:',

  // Update command
  'command.update.planningUpdates': 'Plane Aktualisierungen...',
  'command.update.loadingConfig': 'Lade Workspace-Konfiguration...',
  'command.update.checkingVersions': 'Überprüfe Paketversionen...',
  'command.update.analyzingUpdates': 'Analysiere Aktualisierungen...',
  'command.update.allUpToDate': 'Alle Abhängigkeiten sind aktuell!',
  'command.update.foundUpdates': '{{count}} Aktualisierung(en) verfügbar',
  'command.update.noUpdatesSelected': 'Keine Aktualisierungen ausgewählt',
  'command.update.runningBatchAI': 'Führe KI-Batch-Analyse für {{count}} Pakete durch...',
  'command.update.batchAIHint': 'Analysiert alle Pakete in einer Anfrage für mehr Effizienz.',
  'command.update.processingChunks': 'Verarbeite Chunk {{current}}/{{total}}...',
  'command.update.aiResults': 'KI-Analyseergebnisse:',
  'command.update.provider': 'Anbieter: {{provider}}',
  'command.update.confidence': 'Konfidenz: {{confidence}}%',
  'command.update.processingTime': 'Verarbeitungszeit: {{time}}ms',
  'command.update.summary': 'Zusammenfassung:',
  'command.update.packageRecommendations': 'Paketempfehlungen:',
  'command.update.breakingChanges': 'Inkompatible Änderungen: {{changes}}',
  'command.update.securityFixes': 'Sicherheitskorrekturen: {{fixes}}',
  'command.update.warnings': 'Warnungen:',
  'command.update.aiSkipRecommend':
    'KI empfiehlt, {{count}} Paket(e) wegen Risiken zu überspringen.',
  'command.update.useForce': 'Verwenden Sie --force, um KI-Empfehlungen zu überschreiben.',
  'command.update.preparingApply': 'Bereite Anwendung der Aktualisierungen vor...',
  'command.update.applyingUpdates': 'Wende Aktualisierungen an...',
  'command.update.appliedUpdates': '{{count}} Aktualisierungen angewendet',
  'command.update.generatingPreview': 'Generiere Vorschau...',
  'command.update.previewComplete': 'Aktualisierungsvorschau abgeschlossen',
  'command.update.dryRunHint': 'Testlauf - keine Änderungen vorgenommen',
  'command.update.planSaved': 'Aktualisierungsplan wurde in {path} gespeichert',
  'command.update.processComplete': 'Aktualisierungsprozess abgeschlossen!',
  'command.update.aiBatchFailed': 'KI-Batch-Analyse fehlgeschlagen, fahre ohne KI-Einblicke fort:',
  'command.update.runningPnpmInstall': 'Führe pnpm install aus, um Lock-Datei zu aktualisieren...',
  'command.update.pnpmInstallSuccess': 'pnpm install erfolgreich abgeschlossen',
  'command.update.pnpmInstallFailed':
    'pnpm install fehlgeschlagen (Katalog-Updates waren erfolgreich)',
  'command.update.fetchingChangelogs': 'Lade Änderungsprotokolle...',
  'command.update.changelogUnavailable': 'Änderungsprotokoll nicht verfügbar',
  'command.update.cancelled': 'Vorgang abgebrochen',
  'command.update.moreLines': '{{count}} weitere Zeilen, verwenden Sie --verbose',
  'command.update.installError': 'Unerwarteter Fehler während der Installation',
  'command.update.suggestFix': 'Vorschläge:',
  'command.update.suggestManualInstall': 'Versuchen Sie "{{pm}} install" manuell auszuführen',
  'command.update.suggestCheckDeps': 'Überprüfen Sie Abhängigkeitskonflikte in Ihrem Workspace',
  'command.update.suggestInstallPm':
    'Stellen Sie sicher, dass {{pm}} installiert ist und sich im PATH befindet',
  'command.update.suggestRetry': 'Versuchen Sie den Befehl erneut auszuführen',
  'command.update.suggestCheckNetwork': 'Überprüfen Sie Ihre Netzwerkverbindung',

  // Rollback command
  'command.rollback.noBackups': 'Keine Backups gefunden',
  'command.rollback.createBackupHint':
    'Verwenden Sie "pcu update -b" um vor dem Update ein Backup zu erstellen',
  'command.rollback.availableBackups': 'Verfügbare Backups ({{count}})',
  'command.rollback.restoreHint':
    'Verwenden Sie "pcu rollback" um aus einem Backup wiederherzustellen',
  'command.rollback.restoringLatest': 'Wiederherstellung vom neuesten Backup',
  'command.rollback.from': 'Von',
  'command.rollback.confirmRestore':
    'Sind Sie sicher, dass Sie dieses Backup wiederherstellen möchten?',
  'command.rollback.cancelled': 'Rollback abgebrochen',
  'command.rollback.success': 'Rollback erfolgreich abgeschlossen!',
  'command.rollback.runPnpmInstall':
    'Führen Sie "pnpm install" aus, um die Lock-Datei zu synchronisieren',
  'command.rollback.selectBackup': 'Backup zum Wiederherstellen auswählen',
  'command.rollback.chooseBackup': 'Backup wählen',
  'command.rollback.warning': 'Warnung: Dies wird Ihre aktuelle pnpm-workspace.yaml überschreiben',
  'command.rollback.willRestore': 'Wiederherstellung von: {{time}}',
  'command.rollback.autoBackupNote':
    'Ihr aktueller Stand wird vor der Wiederherstellung automatisch gesichert',
  'command.rollback.preRestoreBackupCreated':
    'Vor-Wiederherstellungs-Backup gespeichert unter: {{path}}',
  'command.rollback.safetyNote':
    'Um dieses Rollback rückgängig zu machen, führen Sie "pcu rollback" erneut aus',
  'command.rollback.deleteWarning': 'Warnung: {{count}} Backup(s) werden gelöscht',
  'command.rollback.confirmDelete': 'Sind Sie sicher, dass Sie alle Backups löschen möchten?',
  'command.rollback.deletedBackups': '{{count}} Backup(s) gelöscht',
  // Rollback verification
  'command.rollback.verification.validYaml': 'Gültige YAML-Struktur',
  'command.rollback.verification.catalogsFound': '{{count}} Katalog(e) gefunden',
  'command.rollback.verification.catalogs': 'Kataloge',
  'command.rollback.verification.dependencies': 'Gesamtabhängigkeiten: {{count}}',
  'command.rollback.verification.warning': 'Rollback abgeschlossen mit Warnungen',
  'command.rollback.verification.invalidYaml': 'Ungültige YAML-Struktur',
  'command.rollback.verification.noCatalogs': 'Keine Katalogstruktur gefunden',
  'command.rollback.verification.skipped': 'Verification skipped',

  // Watch command
  'command.watch.starting': 'Überwachungsmodus wird gestartet...',
  'command.watch.watching': 'Überwache',
  'command.watch.pressCtrlC': 'Drücken Sie Strg+C zum Beenden',
  'command.watch.stopping': 'Überwachungsmodus wird beendet...',
  'command.watch.stopped': 'Überwachungsmodus beendet',
  'command.watch.checkingUpdates': 'Suche nach Updates...',
  'command.watch.foundOutdated': '{{count}} veraltete(s) Paket(e) gefunden',
  'command.watch.waitingForChanges': 'Warte auf Änderungen...',
  'command.watch.runUpdateHint': 'Führen Sie "pcu update" aus, um Updates anzuwenden',

  // Self-update command
  'command.selfUpdate.checking': 'Suche nach pcu-Updates...',
  'command.selfUpdate.updating': 'Aktualisiere pcu auf Version {{version}}...',
  'command.selfUpdate.success': 'Erfolgreich auf Version {{version}} aktualisiert!',
  'command.selfUpdate.failed': 'pcu-Aktualisierung fehlgeschlagen',
  'command.selfUpdate.latestAlready': 'Sie verwenden bereits die neueste Version ({{version}})',
  'command.selfUpdate.restartHint':
    'Bitte starten Sie Ihr Terminal neu, um die neue Version zu verwenden.',
  'command.selfUpdate.manualHint':
    'Sie können manuell aktualisieren mit: npm install -g pcu@latest',

  // AI command
  'command.ai.cacheCleared': 'KI-Analyse-Cache geleert',
  'command.ai.cacheStats': 'KI-Analyse-Cache-Statistiken',
  'command.ai.totalEntries': 'Einträge gesamt',
  'command.ai.cacheHits': 'Cache-Treffer',
  'command.ai.cacheMisses': 'Cache-Fehlschläge',
  'command.ai.hitRate': 'Trefferrate',
  'command.ai.testingAnalysis': 'Teste KI-Analyse...',
  'command.ai.testSuccess': 'KI-Analysetest erfolgreich!',
  'command.ai.testFailed': 'KI-Analysetest fehlgeschlagen:',
  'command.ai.providerStatus': 'KI-Anbieter-Status',
  'command.ai.providerDetails': 'Anbieter-Details',
  'command.ai.bestProvider': 'Bester verfügbarer Anbieter: {{provider}}',
  'command.ai.available': 'Verfügbar',
  'command.ai.notFound': 'Nicht gefunden',

  // Cache command
  'command.cache.clearingCaches': 'Caches werden geleert...',
  'command.cache.registryCacheCleared': 'Registry-Cache geleert',
  'command.cache.workspaceCacheCleared': 'Workspace-Cache geleert',
  'command.cache.aiCacheCleared': 'KI-Analyse-Cache geleert',
  'command.cache.registryCache': 'Registry-Cache',
  'command.cache.workspaceCache': 'Workspace-Cache',
  'command.cache.aiAnalysisCache': 'KI-Analyse-Cache',
  'command.cache.registryDescription': 'NPM-Registry-API-Antworten (Paketinfos, Versionen)',
  'command.cache.workspaceDescription': 'Workspace-Dateisystemdaten (package.json-Dateien)',
  'command.cache.aiDescription': 'KI-gestützte Abhängigkeitsanalyse-Ergebnisse',
  'command.cache.statistics': 'Cache-Statistiken',
  'command.cache.summary': 'Zusammenfassung',
  'command.cache.totalEntries': 'Einträge gesamt: {{count}}',
  'command.cache.totalSize': 'Gesamtgröße: {{size}}',
  'command.cache.overallHitRate': 'Gesamttrefferrate: {{rate}}%',
  'command.cache.entries': 'Einträge: {{count}}',
  'command.cache.size': 'Größe: {{size}}',
  'command.cache.hitRate': 'Trefferrate: {{rate}}%',
  'command.cache.hitsAndMisses': 'Treffer: {{hits}}, Fehlschläge: {{misses}}',
  'command.cache.errorManaging': 'Fehler bei Cache-Verwaltung:',
  'command.cache.stackTrace': 'Stack-Trace:',
  'command.cache.noStackTrace': 'Kein Stack-Trace verfügbar',

  // Common messages
  'common.stackTrace': 'Stack-Trace:',
  'common.noStackTrace': 'Kein Stack-Trace verfügbar',
  'common.yes': 'Ja',
  'common.no': 'Nein',
  'common.packagesCount': '{{count}} Paket(e)',

  // Security command
  'command.security.scanning': 'Sicherheitslücken-Scan',
  'command.security.severityFilter': 'Schweregrad-Filter: {{severity}}',
  'command.security.errorScanning': 'Fehler beim Durchführen des Sicherheitsscans:',
  'command.security.snykNotFound': 'Snyk nicht gefunden. Installieren mit: npm install -g snyk',
  'command.security.recommendations': 'Sicherheitsempfehlungen:',
  'command.security.runWithFix':
    'Mit --fix-vulns ausführen, um automatische Korrekturen anzuwenden',
  'command.security.noFixesAvailable': 'Keine Sicherheitskorrekturen verfügbar',
  'command.security.applyingFixes': 'Sicherheitskorrekturen werden angewendet...',
  'command.security.noAutoFixes': 'Keine automatischen Korrekturen verfügbar',
  'command.security.fixesApplied': 'Sicherheitskorrekturen erfolgreich angewendet',
  'command.security.verifyingFixes':
    'Sicherheitsscan wird erneut ausgeführt, um Korrekturen zu verifizieren...',
  'command.security.allFixed':
    'Alle kritischen und schwerwiegenden Sicherheitslücken wurden behoben!',
  'command.security.fixesFailed': 'Fehler beim Anwenden der Sicherheitskorrekturen:',
  'command.security.noPackageJson': 'Keine package.json in {{path}} gefunden',
  'command.security.auditFailed': 'pnpm audit fehlgeschlagen: {{message}}',
  'command.security.auditParseError': 'Fehler beim Parsen der pnpm audit-Ausgabe: {{error}}',
  'command.security.auditExitError': 'pnpm audit fehlgeschlagen mit Status {{status}}: {{error}}',
  'command.security.snykScanExitError': 'Snyk-Scan fehlgeschlagen mit Status {{status}}: {{error}}',
  'command.security.snykScanFailed': 'Snyk-Scan fehlgeschlagen: {{message}}',
  'command.security.auditFixFailed': 'pnpm audit --fix fehlgeschlagen mit Status {{status}}',

  // Check command additions
  'command.check.errorChecking': 'Fehler beim Überprüfen der Abhängigkeiten:',
  'command.check.catalogLabel': 'Katalog: {{catalog}}',
  'command.check.targetLabel': 'Ziel: {{target}}',
  'command.check.catalogsChecked': '{{count}} Kataloge überprüft',
  'command.check.totalCatalogEntries': '{{count}} Katalogeinträge insgesamt',

  // Init command additions
  'command.init.missingPackageJson': 'Fehlend: package.json',
  'command.init.missingWorkspaceYaml': 'Fehlend: pnpm-workspace.yaml',
  'command.init.creatingWorkspace': 'PNPM-Workspace-Struktur wird erstellt...',
  'command.init.workspaceCreated': 'PNPM-Workspace-Struktur erstellt',
  'command.init.useForceOverwrite':
    'Verwenden Sie --force, um bestehende Konfiguration zu überschreiben',
  'command.init.errorInitializing': 'Fehler beim Initialisieren der Konfiguration:',
  'command.init.createdPackageJson': 'Erstellt: package.json',
  'command.init.createdWorkspaceYaml': 'Erstellt: pnpm-workspace.yaml',
  'command.init.createdPackagesDir': 'Erstellt: packages/ Verzeichnis',

  // Theme command additions
  'command.theme.themeLabel': 'Theme:',
  'command.theme.custom': 'benutzerdefiniert',
  'command.theme.default': 'Standard',

  // AI command additions
  'command.ai.providerLabel': 'Anbieter:',
  'command.ai.confidenceLabel': 'Konfidenz:',
  'command.ai.summaryLabel': 'Zusammenfassung:',
  'command.ai.pathLabel': 'Pfad:',
  'command.ai.versionLabel': 'Version:',

  // Init command labels
  'command.init.configFileLabel': 'Konfigurationsdatei: {{path}}',
  'command.init.foundLabel': 'Gefunden: {{path}}',
  'command.init.createdLabel': 'Erstellt: {{path}}',

  // Theme command preview
  'command.theme.previewSuccess': 'Erfolgsmeldung',
  'command.theme.previewWarning': 'Warnmeldung',
  'command.theme.previewError': 'Fehlermeldung',
  'command.theme.previewInfo': 'Informationsmeldung',
  'command.theme.previewMajor': 'Major',
  'command.theme.previewMinor': 'Minor',
  'command.theme.previewPatch': 'Patch',
  'command.theme.previewPackageUpdates': 'Paket-Updates Beispiele',
  'command.theme.previewStatusMessages': 'Statusmeldungen',
  'command.theme.previewProgressBar': 'Fortschrittsbalken',
  'command.theme.previewPrerelease': 'Vorabversion',
  'command.theme.previewCheckingDeps': 'Abhängigkeiten prüfen...',
  'command.theme.previewUpdatesFound': '{{count}} Updates',
  'command.theme.previewUpdateComplete': 'Update abgeschlossen',
  'command.theme.previewPotentialIssue': 'Potenzielles Problem',
  'command.theme.previewOperationFailed': 'Operation fehlgeschlagen',

  // Init command next steps
  'command.init.step1': '1. Überprüfen und anpassen der Konfiguration:',
  'command.init.step2': '2. Pakete zum Workspace hinzufügen:',
  'command.init.step2Commands': 'mkdir packages/my-app && cd packages/my-app\n   pnpm init',
  'command.init.step3': '3. Abhängigkeiten installieren und Updates prüfen:',
  'command.init.step3Commands': 'pnpm install\n   pcu check',
  'command.init.step4': '4. Abhängigkeiten interaktiv aktualisieren:',
  'command.init.step4Commands': 'pcu update --interactive',
  'command.init.step5': '5. Mehr über PNPM Workspace und PCU erfahren:',

  // CLI messages
  'cli.runAgain':
    'Bitte führen Sie den Befehl erneut aus, um die aktualisierte Version zu verwenden.',
  'cli.checkingUpdates': 'Suche nach Updates...',
  'cli.latestVersion': 'ist die neueste',
  'cli.available': 'verfügbar',
  'cli.unknownCommand': 'Unbekannter Befehl: {{command}}',
  'cli.couldNotCheckUpdates': 'Updates konnten nicht geprüft werden:',
  'cli.error': 'Fehler:',
  'cli.unexpectedError': 'Unerwarteter Fehler:',
  'cli.fatalError': 'Fataler Fehler:',
  'cli.cancelled': 'Abgebrochen.',
  'cli.updateAvailable': 'Update verfügbar: {{current}} → {{latest}}',
  'cli.updateHint': 'Führen Sie "pcu self-update" aus, um zu aktualisieren.',

  // Progress bar messages
  'progress.securityAnalyzing': 'Sicherheitsanalyse wird durchgeführt...',
  'progress.securityCompleted': 'Sicherheitsanalyse abgeschlossen',
  'progress.securityFailed': 'Sicherheitsanalyse fehlgeschlagen',
  'progress.operationFailed': 'Operation fehlgeschlagen',
  'progress.processing': 'Verarbeitung...',
  'progress.success': 'ERFOLG',
  'progress.error': 'FEHLER',
  'progress.warning': 'WARNUNG',
  'progress.info': 'INFO',
  'progress.completed': 'abgeschlossen',
  'progress.failed': 'fehlgeschlagen',
  'progress.steps': 'Fortschrittsschritte',
  'progress.allStepsCompleted': 'Alle Schritte abgeschlossen!',
  'progress.overallProgress': 'Gesamtfortschritt',
  'progress.checkingPackages': '{{count}} Abhängigkeiten werden überprüft...',
  'progress.checkCompleteWithUpdates':
    '✅ Überprüfung abgeschlossen! {{count}} veraltete Abhängigkeiten gefunden',
  'progress.checkCompleteNoUpdates':
    '✅ Überprüfung abgeschlossen! Alle Abhängigkeiten sind aktuell',
  'progress.checkingPackage': 'Überprüfe Paket: {{packageName}}',
  'progress.skippingPackage': 'Paket {{packageName}} übersprungen (Überprüfung fehlgeschlagen)',

  // Security command additions
  'command.security.criticalVulnsFound': '{{count}} kritische Schwachstellen gefunden',
  'command.security.highImpactFix': 'Hoch - Sicherheitslücke behoben',

  // CLI command descriptions
  'cli.description.main': 'Deterministische Update-Engine für pnpm Workspace-Kataloge',
  'cli.description.check': 'Veraltete Katalog-Abhängigkeiten prüfen',
  'cli.description.update': 'Katalog-Abhängigkeiten aktualisieren',
  'cli.description.analyze':
    'Auswirkungen der Aktualisierung einer bestimmten Abhängigkeit analysieren',
  'cli.description.workspace': 'Workspace-Informationen und Validierung',
  'cli.description.theme': 'Farbthema konfigurieren',
  'cli.description.security': 'Sicherheitslücken-Scan und automatische Korrekturen',
  'cli.description.init': 'PCU-Konfiguration und PNPM-Workspace initialisieren',
  'cli.description.ai': 'AI-Anbieter-Status und Verfügbarkeit prüfen',
  'cli.description.cache': 'PCU-Cache für Registry- und Workspace-Daten verwalten',
  'cli.description.rollback': 'Katalog-Updates auf einen früheren Zustand zurücksetzen',
  'cli.description.watch': 'Änderungen überwachen und auf Updates prüfen',
  'cli.description.selfUpdate': 'pcu auf die neueste Version aktualisieren',
  'cli.description.graph': 'Katalog-Abhängigkeitsbeziehungen visualisieren',
  'cli.description.help': 'Hilfe für Befehl anzeigen',

  // CLI option descriptions
  'cli.option.catalog': 'Nur bestimmten Katalog prüfen',
  'cli.option.format': 'Ausgabeformat: table, json, yaml, minimal',
  'cli.option.target': 'Update-Ziel: latest, greatest, minor, patch, newest',
  'cli.option.prerelease': 'Prerelease-Versionen einschließen',
  'cli.option.include': 'Pakete einschließen, die dem Muster entsprechen',
  'cli.option.exclude': 'Pakete ausschließen, die dem Muster entsprechen',
  'cli.option.interactive': 'Interaktiver Modus zur Auswahl von Updates',
  'cli.option.dryRun': 'Änderungen anzeigen ohne Dateien zu schreiben',
  'cli.option.savePlan': 'Testlauf-Plan in Datei speichern (JSON oder YAML)',
  'cli.option.force': 'Updates erzwingen, auch wenn riskant',
  'cli.option.createBackup': 'Backup-Dateien vor dem Update erstellen',
  'cli.option.noBackup': 'Backup vor dem Update überspringen',
  'cli.option.ai': 'AI-Batch-Analyse für alle Updates aktivieren',
  'cli.option.aiStatus': 'AI-Anbieter-Status anzeigen (Standard)',
  'cli.option.aiTest': 'AI-Anbieter-Konnektivität testen',
  'cli.option.aiCacheStats': 'AI-Analyse-Cache-Statistiken anzeigen',
  'cli.option.aiClearCache': 'AI-Analyse-Cache leeren',
  'cli.option.provider': 'AI-Anbieter: auto, claude, gemini, codex',
  'cli.option.analysisType': 'AI-Analysetyp: impact, security, compatibility, recommend',
  'cli.option.skipCache': 'AI-Analyse-Cache überspringen',
  'cli.option.noAi': 'AI-Analyse deaktivieren',
  'cli.option.validate': 'Workspace-Konfiguration validieren',
  'cli.option.stats': 'Workspace-Statistiken anzeigen',
  'cli.option.setTheme': 'Theme festlegen: default, modern, minimal, neon',
  'cli.option.listThemes': 'Verfügbare Themes auflisten',
  'cli.option.audit': 'npm audit Scan durchführen (Standard: true)',
  'cli.option.fixVulns': 'Schwachstellen automatisch beheben',
  'cli.option.severity': 'Nach Schweregrad filtern: low, moderate, high, critical',
  'cli.option.includeDev': 'Entwicklungsabhängigkeiten in Scan einschließen',
  'cli.option.snyk': 'Snyk-Scan einschließen (erfordert snyk CLI)',
  'cli.option.forceOverwrite': 'Vorhandene Konfigurationsdatei überschreiben',
  'cli.option.full': 'Vollständige Konfiguration mit allen Optionen generieren',
  'cli.option.createWorkspace': 'PNPM-Workspace-Struktur erstellen wenn fehlend (Standard: true)',
  'cli.option.noCreateWorkspace': 'Erstellung der PNPM-Workspace-Struktur überspringen',
  'cli.option.status': 'Status aller AI-Anbieter anzeigen (Standard)',
  'cli.option.test': 'AI-Analyse mit Beispielanfrage testen',
  'cli.option.cacheStats': 'AI-Analyse-Cache-Statistiken anzeigen',
  'cli.option.clearCache': 'AI-Analyse-Cache löschen',
  'cli.option.clear': 'Alle Cache-Einträge löschen',
  'cli.option.version': 'Versionsinformationen anzeigen',
  'cli.option.verbose': 'Ausführliche Protokollierung aktivieren',
  'cli.option.workspace': 'Workspace-Verzeichnispfad',
  'cli.option.noColor': 'Farbausgabe deaktivieren',
  'cli.help.command': 'help [command]',
  'cli.help.description': 'Hilfe für Befehl anzeigen',
  'cli.help.option': 'Hilfeinformationen anzeigen',
  // Commander.js Hilfetext-Labels
  'cli.help.usage': 'Verwendung:',
  'cli.help.arguments': 'Argumente:',
  'cli.help.optionsTitle': 'Optionen:',
  'cli.help.commandsTitle': 'Befehle:',
  // Benutzerdefinierter Hilfetext - Optionsgruppen-Abschnitt
  'cli.help.optionGroupsTitle': 'Optionsgruppen:',
  'cli.help.groupBasic': 'Basis:',
  'cli.help.groupFilter': 'Filter:',
  'cli.help.groupOutput': 'Ausgabe:',
  'cli.help.groupAI': 'KI:',
  'cli.help.groupInstall': 'Installation:',
  // Benutzerdefinierter Hilfetext - Tipp-Abschnitt
  'cli.help.tipLabel': 'Tipp:',
  'cli.help.tipContent':
    "Verwenden Sie .pcurc.json, um Standardwerte festzulegen und Befehlszeilenoptionen zu reduzieren.\n     Führen Sie 'pcu init' aus, um eine Konfigurationsdatei zu erstellen, oder besuchen Sie https://pcu-cli.dev/{{locale}}/configuration",
  'cli.option.install': 'pnpm install nach dem Update ausführen (Standard: true)',
  'cli.option.noInstall': 'pnpm install nach dem Update überspringen',
  'cli.option.changelog': 'Änderungsprotokoll für jedes Update anzeigen',
  'cli.option.noChangelog': 'Änderungsprotokoll-Ausgabe ausblenden',
  'cli.option.updateShorthand': 'Kurzform für update-Befehl',
  'cli.option.checkShorthand': 'Kurzform für check-Befehl',
  'cli.option.analyzeShorthand': 'Kurzform für analyze-Befehl',
  'cli.option.workspaceShorthand': 'Kurzform für workspace-Befehl',
  'cli.option.themeShorthand': 'Kurzform für theme-Befehl',
  'cli.option.securityAudit': 'Kurzform für security-Befehl',
  'cli.option.securityFix': 'Kurzform für security --fix-vulns-Befehl',
  'cli.option.listBackups': 'verfügbare Backups auflisten',
  'cli.option.restoreLatest': 'vom neuesten Backup wiederherstellen',
  'cli.option.deleteAllBackups': 'alle Backups löschen',
  'cli.option.debounce': 'Debounce-Verzögerung in Millisekunden',
  'cli.option.clearConsole': 'Konsole vor jeder Prüfung leeren',
  'cli.option.exitCode': 'mit Code 1 beenden, wenn Updates verfügbar sind (für CI/CD)',
  'cli.option.noSecurity': 'Sicherheitsprüfungen überspringen',
  'cli.option.graphFormat': 'Ausgabeformat: text, mermaid, dot, json',
  'cli.option.graphType': 'Graph-Typ: catalog, package, full',

  // CLI argument descriptions
  'cli.argument.package': 'Paketname',
  'cli.argument.version': 'Neue Version (Standard: latest)',
  'cli.argument.command': 'Befehl für Hilfe',

  // Interactive prompts
  'prompt.selectPackages': 'Pakete zum Aktualisieren auswählen:',
  'prompt.selectAtLeastOne': 'Bitte wählen Sie mindestens ein Paket aus',
  'prompt.allCatalogs': 'Alle Kataloge',
  'prompt.selectCatalog': 'Katalog zum Aktualisieren auswählen:',
  'prompt.selectUpdateStrategy': 'Aktualisierungsstrategie auswählen:',
  'prompt.strategyLatest': 'Neueste Version (empfohlen)',
  'prompt.strategyGreatest': 'Höchste Version',
  'prompt.strategyMinor': 'Minor-Updates (nicht-brechend)',
  'prompt.strategyPatch': 'Nur Patches (Fehlerbehebungen)',
  'prompt.strategyNewest': 'Neueste Veröffentlichung',
  'prompt.selectPackage': 'Paket auswählen:',
  'prompt.selectWorkspace': 'Workspace auswählen:',
  'prompt.browseDirectory': 'Verzeichnis durchsuchen...',
  'prompt.parentDirectory': '.. (Übergeordnetes Verzeichnis)',
  'prompt.currentDirectory': 'Aktuelles Verzeichnis verwenden: {path}',
  'prompt.useAsWorkspace': '{path} als Workspace verwenden?',
  'prompt.configWizard': 'Konfigurationsassistent',
  'prompt.selectTheme': 'Design auswählen:',
  'prompt.themeDefault': 'Standard (klassische Farben)',
  'prompt.themeModern': 'Modern (sanfte Verläufe)',
  'prompt.themeMinimal': 'Minimal (einfache Ausgabe)',
  'prompt.themeNeon': 'Neon (hoher Kontrast)',
  'prompt.enableInteractive': 'Interaktiven Modus aktivieren?',
  'prompt.createBackups': 'Sicherung vor Aktualisierung erstellen?',
  'prompt.defaultStrategy': 'Standard-Aktualisierungsstrategie:',
  'prompt.strategyLatestStable': 'Neueste stabile Version',
  'prompt.strategyMinorUpdates': 'Nur Minor-Updates',
  'prompt.strategyPatchUpdates': 'Nur Patch-Updates',
  'prompt.networkTimeout': 'Netzwerk-Timeout (Sekunden):',
  'prompt.timeoutRequired': 'Timeout ist erforderlich',
  'prompt.timeoutPositive': 'Timeout muss größer als 0 sein',
  'prompt.impactPreview': 'Auswirkungsvorschau',
  'prompt.packagesToUpdate': 'Zu aktualisierende Pakete: {count}',
  'prompt.riskLevel': 'Risikostufe: {level}',
  'prompt.affectedPackages': 'Betroffene Pakete: {count}',
  'prompt.proceedWithUpdate': 'Mit Aktualisierung fortfahren?',
  'prompt.retryOperation': 'Vorgang wiederholen',
  'prompt.skipPackage': 'Dieses Paket überspringen',
  'prompt.continueRemaining': 'Mit verbleibenden fortfahren',
  'prompt.abortOperation': 'Vorgang abbrechen',
  'prompt.whatToDo': 'Was möchten Sie tun?',
  'prompt.checkForUpdates': 'Nach Updates suchen',
  'prompt.updateDependencies': 'Abhängigkeiten aktualisieren',
  'prompt.analyzeImpact': 'Auswirkungen analysieren',
  'prompt.showWorkspaceInfo': 'Workspace-Informationen anzeigen',
  'prompt.outputFormat': 'Ausgabeformat:',
  'prompt.formatTable': 'Tabelle (detailliert)',
  'prompt.formatJson': 'JSON',
  'prompt.formatYaml': 'YAML',
  'prompt.formatMinimal': 'Minimal',
  'prompt.interactiveMode': 'Interaktiver Modus?',
  'prompt.dryRunMode': 'Testlauf-Modus?',
  'prompt.createBackup': 'Sicherung erstellen?',
  'prompt.includePrerelease': 'Vorabversionen einschließen?',
  'prompt.warning': 'Warnung:',
  'prompt.confirmOperation': 'Sind Sie sicher, dass Sie {{operation}} möchten?',
  'prompt.browsePath': 'Durchsuchen: {{path}}',
  'prompt.securityUpdatesCount': '{{count}} Sicherheitsupdates',
  'prompt.errorMessage': 'Fehler: {{error}}',
  'prompt.cancel': 'Abbrechen',

  // Severity labels
  'severity.critical': 'Kritisch',
  'severity.high': 'Hoch',
  'severity.moderate': 'Mittel',
  'severity.low': 'Niedrig',
  'severity.info': 'Info',
  'severity.total': 'Gesamt',

  // Option group titles
  'optionGroup.global': 'Globale Optionen',
  'optionGroup.output': 'Ausgabeoptionen',
  'optionGroup.filtering': 'Filteroptionen',
  'optionGroup.update': 'Aktualisierungsoptionen',
  'optionGroup.registry': 'Registry-Optionen',

  // AI Analysis Report
  'aiReport.title': '🤖 KI-Analysebericht',
  'aiReport.provider': 'Anbieter:',
  'aiReport.analysisType': 'Analysetyp:',
  'aiReport.confidence': 'Konfidenz:',
  'aiReport.summary': '📋 Zusammenfassung',
  'aiReport.recommendations': '💡 Empfehlungen',
  'aiReport.breakingChanges': '⚠️  Wichtige Änderungen',
  'aiReport.securityFixes': '🔒 Sicherheitskorrekturen',
  'aiReport.warnings': '⚡ Warnungen',
  'aiReport.details': '📝 Details',
  'aiReport.affectedPackages': '📦 Betroffene Pakete',
  'aiReport.noPackagesAffected': 'Keine Pakete direkt betroffen',
  'aiReport.generatedAt': 'Generiert am: {{timestamp}}',
  'aiReport.processingTime': 'Verarbeitungszeit: {{time}}ms',
  'aiReport.tokensUsed': 'Verwendete Token: {{tokens}}',
  'aiReport.andMore': '... und {{count}} weitere',
  'aiReport.tablePackage': 'Paket',
  'aiReport.tableVersionChange': 'Versionsänderung',
  'aiReport.tableAction': 'Aktion',
  'aiReport.tableRisk': 'Risiko',
  'aiReport.tableReason': 'Grund',

  // Theme preset descriptions
  'theme.preset.development': 'Helle Farben für Entwicklungsumgebungen',
  'theme.preset.production': 'Dezente Farben für Produktionsumgebungen',
  'theme.preset.presentation': 'Kontrastreiche Farben für Präsentationen',
  'theme.preset.default': 'Ausgewogene Farben für allgemeine Verwendung',

  // Validation messages (commandValidator.ts)
  'validation.catalogMustBeString': 'Katalogname muss eine Zeichenkette sein',
  'validation.interactiveNotUsefulWithJson':
    'Interaktiver Modus ist mit JSON-Ausgabeformat nicht sinnvoll',
  'validation.verboseWithSilent': '--verbose und --silent können nicht zusammen verwendet werden',
  'validation.interactiveWithDryRunError':
    '--interactive kann nicht mit --dry-run verwendet werden',
  'validation.forceWithoutBackup':
    'Verwendung von --force ohne Backup. Erwägen Sie --create-backup für Sicherheit',
  'validation.majorUpdatesWarning':
    'Größere Updates können Breaking Changes enthalten. Erwägen Sie --interactive oder --force',
  'validation.patternsOverlap':
    'Einige Muster erscheinen sowohl in Include- als auch Exclude-Listen',
  'validation.catalogRequired': 'Katalogname ist erforderlich',
  'validation.catalogNoPathSeparators': 'Katalogname darf keine Pfadtrenner enthalten',
  'validation.packageRequired': 'Paketname ist erforderlich',
  'validation.invalidPackageNameFormat': 'Ungültiges Paketnamenformat',
  'validation.invalidVersionFormat':
    'Ungültiges Versionsformat. Verwenden Sie semantische Versionierung (z.B. 1.2.3)',
  'validation.multipleWorkspaceActions':
    'Mehrere Workspace-Aktionen können nicht gleichzeitig verwendet werden',
  'validation.colorWithNoColor': '--color und --no-color können nicht zusammen verwendet werden',
  'validation.deprecatedOption':
    'Option "{{option}}" ist veraltet. Verwenden Sie stattdessen "{{replacement}}"',
  'validation.configNotFound': 'Konfigurationsdatei nicht gefunden: {{path}}',
  'validation.failedToLoadJsConfig': 'Fehler beim Laden der JS-Konfigurationsdatei: {{error}}',
  'validation.failedToParseJsonConfig':
    'Fehler beim Parsen der JSON-Konfigurationsdatei: {{error}}',
  'validation.configMustBeObject': 'Konfiguration muss ein Objekt sein',
  'validation.registryMustBeObject': 'Registry-Konfiguration muss ein Objekt sein',
  'validation.updateMustBeObject': 'Update-Konfiguration muss ein Objekt sein',
  'validation.outputMustBeObject': 'Ausgabe-Konfiguration muss ein Objekt sein',
  'validation.unknownConfigKeys': 'Unbekannte Konfigurationsschlüssel: {{keys}}',
  'validation.failedToValidateConfig': 'Fehler bei der Validierung der Konfiguration: {{error}}',
  'validation.interactiveWithDryRunConflict': 'Kann --interactive nicht mit --dry-run verwenden',
  'validation.multipleWorkspaceActionsConflict':
    'Kann nicht mehrere Workspace-Aktionen gleichzeitig verwenden',
  'validation.verboseWithSilentConflict':
    'Kann nicht --verbose und --silent gleichzeitig verwenden',

  // Suggestion messages
  'suggestion.specifyWorkspace': 'Verwenden Sie -w oder --workspace um das Verzeichnis anzugeben',
  'suggestion.jsonAlreadyDetailed': 'JSON-Format enthält bereits alle Details',
  'suggestion.useDryRunFirst': 'Verwenden Sie --dry-run um Änderungen zuerst anzuzeigen',
  'suggestion.addPrereleaseWithGreatest':
    'Erwägen Sie --prerelease bei Verwendung von --target greatest',
  'suggestion.useJsonForProgrammatic': 'Verwenden Sie --format json für programmatisches Parsen',
  'suggestion.useValidateOrStats':
    'Verwenden Sie --validate zur Workspace-Prüfung oder --stats für Statistiken',
  'suggestion.globalVerboseEnabled': 'Globaler Verbose-Modus über PCU_VERBOSE aktiviert',

  // Table headers (outputFormatter.ts)
  'table.header.package': 'Paket',
  'table.header.current': 'Aktuell',
  'table.header.latest': 'Neueste',
  'table.header.type': 'Typ',
  'table.header.packagesCount': 'Pakete',
  'table.header.catalog': 'Katalog',
  'table.header.from': 'Von',
  'table.header.to': 'Nach',
  'table.header.path': 'Pfad',
  'table.header.dependencyType': 'Abhängigkeitstyp',
  'table.header.risk': 'Risiko',
  'table.header.metric': 'Metrik',
  'table.header.count': 'Anzahl',
  'table.header.severity': 'Schweregrad',
  'table.header.title': 'Titel',
  'table.header.fixAvailable': 'Fix verfügbar',

  // Format labels (outputFormatter.ts)
  'format.workspace': 'Workspace',
  'format.path': 'Pfad',
  'format.allUpToDate': 'Alle Abhängigkeiten sind aktuell',
  'format.foundOutdated': '{{count}} veraltete Abhängigkeiten gefunden',
  'format.catalog': 'Katalog',
  'format.updateCompleted': 'Aktualisierung abgeschlossen',
  'format.updateFailed': 'Aktualisierung fehlgeschlagen',
  'format.updatedDeps': 'Aktualisierte Abhängigkeiten',
  'format.skippedDeps': 'Übersprungene Abhängigkeiten',
  'format.errorsOccurred': 'Fehler aufgetreten',
  'format.updatedCount': 'Aktualisiert: {{count}}',
  'format.errorCount': 'Fehler: {{count}}',
  'format.impactAnalysis': 'Auswirkungsanalyse',
  'format.updateInfo': 'Update-Info',
  'format.riskLevel': 'Risikostufe',
  'format.affectedPackages': 'Betroffene Pakete',
  'format.securityImpact': 'Sicherheitsauswirkung',
  'format.fixesVulns': 'Behebt {{count}} Schwachstellen',
  'format.introducesVulns': 'Kann {{count}} Schwachstellen einführen',
  'format.recommendations': 'Empfehlungen',
  'format.workspaceValidation': 'Workspace-Validierung',
  'format.status': 'Status',
  'format.valid': 'GÜLTIG',
  'format.invalid': 'UNGÜLTIG',
  'format.workspaceInfo': 'Workspace-Informationen',
  'format.name': 'Name',
  'format.packages': 'Pakete',
  'format.catalogs': 'Kataloge',
  'format.errors': 'Fehler',
  'format.warnings': 'Warnungen',
  'format.workspaceStats': 'Workspace-Statistiken',
  'format.securityReport': 'Sicherheitsbericht',
  'format.scanDate': 'Scan-Datum',
  'format.tools': 'Werkzeuge',
  'format.summary': 'Zusammenfassung',
  'format.vulnerabilities': 'Schwachstellen',
  'format.noVulnsFound': 'Keine Schwachstellen gefunden',
  'format.packagesAffected': 'Betroffene Pakete',
  'format.foundOutdatedDependencies': '{{count}} veraltete Abhängigkeiten gefunden',
  'format.catalogLabel': 'Katalog',
  'format.updateLabel': 'Aktualisierung',
  'format.typeLabel': 'Typ',
  'format.updateCompletedSuccessfully': 'Aktualisierung erfolgreich abgeschlossen',
  'format.updateCompletedWithErrors': 'Aktualisierung mit {{count}} Fehlern abgeschlossen',
  'format.updatedDependenciesTitle': 'Aktualisierte Abhängigkeiten',
  'format.skippedDependencies': '{{count}} Abhängigkeiten übersprungen',
  'format.fixesVulnerabilities': 'Behebt {{count}} Schwachstellen',
  'format.introducesVulnerabilities': 'Führt {{count}} Schwachstellen ein',
  'format.workspaceInformation': 'Workspace-Informationen',
  'format.workspaceStatistics': 'Workspace-Statistiken',
  'format.packagesCount': '{{count}} Pakete',
  'format.catalogsCount': '{{count}} Kataloge',
  'format.noUpdatesPlanned': 'Keine geplanten Aktualisierungen',
  'format.plannedUpdates': 'Geplante Aktualisierungen: {{count}}',
  'format.versionConflicts': 'Versionskonflikte',
  'format.recommendation': 'Empfehlung',
  'format.conflictsDetected': 'Versionskonflikte erkannt',

  // Table headers
  'table.header.new': 'Neu',

  // Statistics labels (workspaceCommand.ts)
  'stats.totalPackages': 'Pakete insgesamt',
  'stats.packagesWithCatalogRefs': 'Pakete mit Katalogreferenzen',
  'stats.totalCatalogs': 'Kataloge insgesamt',
  'stats.catalogEntries': 'Katalogeinträge',
  'stats.totalDependencies': 'Abhängigkeiten insgesamt',
  'stats.catalogReferences': 'Katalogreferenzen',
  'stats.dependencies': 'Abhängigkeiten',
  'stats.devDependencies': 'Entwicklungsabhängigkeiten',
  'stats.peerDependencies': 'Peer-Abhängigkeiten',
  'stats.optionalDependencies': 'Optionale Abhängigkeiten',

  // Unit labels (cacheCommand.ts)
  'unit.bytes': 'B',
  'unit.kilobytes': 'KB',
  'unit.megabytes': 'MB',
  'unit.gigabytes': 'GB',

  // Global option descriptions (globalOptions.ts)
  'option.workspacePath': 'Workspace-Verzeichnispfad',
  'option.verboseLogging': 'Ausführliche Protokollierung aktivieren',
  'option.noColorOutput': 'Farbige Ausgabe deaktivieren',
  'option.registryUrl': 'NPM-Registry-URL',
  'option.timeout': 'Anfrage-Timeout in Millisekunden',
  'option.configPath': 'Pfad zur Konfigurationsdatei',
  'option.catalogOnly': 'Nur bestimmten Katalog prüfen',
  'option.outputFormat': 'Ausgabeformat',
  'option.updateTarget': 'Aktualisierungsziel',
  'option.prereleaseVersions': 'Vorabversionen einschließen',
  'option.includePattern': 'Pakete einschließen, die dem Muster entsprechen',
  'option.excludePattern': 'Pakete ausschließen, die dem Muster entsprechen',
  'option.interactiveMode': 'Interaktiver Modus zur Auswahl von Updates',
  'option.dryRunPreview': 'Änderungen anzeigen ohne Dateien zu schreiben',
  'option.forceRisky': 'Updates erzwingen, auch wenn riskant',
  'option.backupFiles': 'Backup-Dateien vor dem Aktualisieren erstellen',
  'option.aiAnalysis': 'KI-gestützte Analyse aktivieren',
  'option.aiProvider': 'Zu verwendender KI-Anbieter',
  'option.analysisTypeOpt': 'Art der KI-Analyse',
  'option.skipAiCache': 'KI-Analyse-Cache überspringen',
  'option.validateWorkspace': 'Workspace-Konfiguration validieren',
  'option.showStats': 'Workspace-Statistiken anzeigen',
  'option.showInfo': 'Workspace-Informationen anzeigen',

  // Interactive mode titles
  'interactive.check.title': 'Check-Befehl - Interaktiver Modus',
  'interactive.update.title': 'Update-Befehl - Interaktiver Modus',
  'interactive.analyze.title': 'Analyze-Befehl - Interaktiver Modus',
  'interactive.workspace.title': 'Workspace-Befehl - Interaktiver Modus',
  'interactive.theme.title': 'Theme-Befehl - Interaktiver Modus',
  'interactive.security.title': 'Security-Befehl - Interaktiver Modus',
  'interactive.init.title': 'Init-Befehl - Interaktiver Modus',
  'interactive.ai.title': 'AI-Befehl - Interaktiver Modus',
  'interactive.cache.title': 'Cache-Befehl - Interaktiver Modus',
  'interactive.rollback.title': 'Rollback-Befehl - Interaktiver Modus',
  'interactive.watch.title': 'Watch-Befehl - Interaktiver Modus',

  // Interactive common choices - format
  'interactive.choice.format.table': 'Tabelle (Standard)',
  'interactive.choice.format.json': 'JSON',
  'interactive.choice.format.yaml': 'YAML',
  'interactive.choice.format.minimal': 'Minimal',

  // Interactive common choices - target
  'interactive.choice.target.latest': 'Neueste Version (Standard)',
  'interactive.choice.target.greatest': 'Höchste Version',
  'interactive.choice.target.minor': 'Minor-Update',
  'interactive.choice.target.patch': 'Patch-Update',
  'interactive.choice.target.newest': 'Neueste Veröffentlichung',

  // Interactive common choices - severity
  'interactive.choice.severity.low': 'Niedrig',
  'interactive.choice.severity.medium': 'Mittel und höher',
  'interactive.choice.severity.high': 'Hoch',
  'interactive.choice.severity.critical': 'Kritisch',
  'interactive.choice.severity.all': 'Alle Schweregrade',

  // Interactive common choices - analysis type
  'interactive.choice.analysisType.impact': 'Auswirkungsanalyse',
  'interactive.choice.analysisType.security': 'Sicherheitsanalyse',
  'interactive.choice.analysisType.compatibility': 'Kompatibilitätsanalyse',
  'interactive.choice.analysisType.recommend': 'Empfehlungsanalyse',

  // Interactive common choices - provider
  'interactive.choice.provider.auto': 'Automatisch (Standard)',
  'interactive.choice.provider.claude': 'Claude',
  'interactive.choice.provider.gemini': 'Gemini',
  'interactive.choice.provider.codex': 'Codex',

  // Interactive common choices - theme
  'interactive.choice.theme.default': 'Standard',
  'interactive.choice.theme.modern': 'Modern',
  'interactive.choice.theme.minimal': 'Minimal',
  'interactive.choice.theme.neon': 'Neon',
  'interactive.choice.theme.ocean': 'Ozean',
  'interactive.choice.theme.forest': 'Wald',

  // Interactive prompts - check command
  'interactive.check.catalogName': 'Katalogname (leer für alle):',
  'interactive.check.outputFormat': 'Ausgabeformat:',
  'interactive.check.updateTarget': 'Aktualisierungsziel:',
  'interactive.check.includePrerelease': 'Vorabversionen einschließen?',
  'interactive.check.includePatterns': 'Einschlussmuster (durch Kommas getrennt, leer für alle):',
  'interactive.check.excludePatterns': 'Ausschlussmuster (durch Kommas getrennt, leer für keine):',
  'interactive.check.exitCode': 'Mit Code 1 beenden, wenn Updates verfügbar sind (für CI)?',

  // Interactive prompts - update command
  'interactive.update.catalogName': 'Katalogname (leer für alle):',
  'interactive.update.outputFormat': 'Ausgabeformat:',
  'interactive.update.updateTarget': 'Aktualisierungsziel:',
  'interactive.update.includePrerelease': 'Vorabversionen einschließen?',
  'interactive.update.includePatterns': 'Einschlussmuster (durch Kommas getrennt, leer für alle):',
  'interactive.update.excludePatterns': 'Ausschlussmuster (durch Kommas getrennt, leer für keine):',
  'interactive.update.dryRun': 'Testlauf (keine Änderungen)?',
  'interactive.update.force': 'Update erzwingen (auch wenn riskant)?',
  'interactive.update.createBackup': 'Backup vor dem Update erstellen?',
  'interactive.update.useAi': 'KI-Analyse aktivieren?',
  'interactive.update.aiProvider': 'KI-Anbieter:',
  'interactive.update.analysisType': 'Analysetyp:',
  'interactive.update.runInstall': 'pnpm install nach dem Update ausführen?',
  'interactive.update.showChangelog': 'Änderungsprotokoll anzeigen?',

  // Interactive prompts - analyze command
  'interactive.analyze.packageName': 'Paketname:',
  'interactive.analyze.packageNameRequired': 'Paketname ist erforderlich',
  'interactive.analyze.catalogName': 'Katalogname (leer für automatische Erkennung):',
  'interactive.analyze.targetVersion': 'Neue Version (leer für neueste):',
  'interactive.analyze.outputFormat': 'Ausgabeformat:',
  'interactive.analyze.useAi': 'KI-Analyse aktivieren?',
  'interactive.analyze.aiProvider': 'KI-Anbieter:',
  'interactive.analyze.analysisType': 'Analysetyp:',

  // Interactive prompts - workspace command
  'interactive.workspace.validate': 'Workspace validieren?',
  'interactive.workspace.stats': 'Statistiken anzeigen?',

  // Interactive prompts - theme command
  'interactive.theme.choose': 'Theme auswählen:',

  // Interactive prompts - security command
  'interactive.security.action': 'npm audit ausführen?',
  'interactive.security.severity': 'Minimale Schwere:',
  'interactive.security.includeDev': 'Entwicklungsabhängigkeiten einschließen?',
  'interactive.security.useSnyk': 'Snyk verwenden (CLI erforderlich)?',
  'interactive.security.outputFormat': 'Ausgabeformat:',

  // Interactive prompts - init command
  'interactive.init.overwrite': 'Bestehende Konfiguration überschreiben?',
  'interactive.init.createWorkspace': 'PNPM Workspace-Struktur erstellen?',

  // Interactive prompts - ai command

  // Interactive prompts - cache command

  // Interactive prompts - rollback command

  // Interactive prompts - watch command
  'interactive.watch.debounce': 'Entprellverzögerung (ms):',
  'interactive.watch.debouncePositive': 'Entprellverzögerung muss positiv sein',
  'interactive.watch.clearConsole': 'Konsole bei jeder Prüfung leeren?',

  // Missing interactive keys
  'interactive.update.mode': 'Aktualisierungsmodus:',
  'interactive.update.mode.interactive': 'Interaktive Auswahl (Pakete wählen)',
  'interactive.update.mode.dryRun': 'Testlauf (nur Vorschau)',
  'interactive.update.mode.apply': 'Alle Updates anwenden',
  'interactive.workspace.actions': 'Was möchten Sie tun?',
  'interactive.workspace.outputFormat': 'Ausgabeformat:',
  'interactive.theme.action': 'Was möchten Sie tun?',
  'interactive.theme.action.set': 'Theme auswählen und festlegen',
  'interactive.theme.action.list': 'Verfügbare Themes auflisten',
  'interactive.security.action.audit': 'Schwachstellen prüfen',
  'interactive.security.action.fix': 'Schwachstellen beheben',
  'interactive.security.action.both': 'Prüfen und beheben',
  'interactive.init.mode': 'Initialisierungsmodus:',
  'interactive.init.mode.quick': 'Schnelleinrichtung (minimale Konfiguration)',
  'interactive.init.mode.full': 'Vollständige Einrichtung (alle Optionen)',
  'interactive.ai.action': 'KI-Verwaltungsaktion:',
  'interactive.ai.action.status': 'KI-Status prüfen',
  'interactive.ai.action.test': 'KI-Verbindung testen',
  'interactive.ai.action.cacheStats': 'Cache-Statistiken anzeigen',
  'interactive.ai.action.clearCache': 'KI-Cache leeren',
  'interactive.cache.action': 'Cache-Aktion:',
  'interactive.cache.action.stats': 'Cache-Statistiken anzeigen',
  'interactive.cache.action.clear': 'Cache leeren',
  'interactive.rollback.action': 'Rollback-Aktion:',
  'interactive.rollback.action.list': 'Verfügbare Backups auflisten',
  'interactive.rollback.action.latest': 'Neuestes Backup wiederherstellen',
  'interactive.rollback.action.deleteAll': 'Alle Backups löschen',
  'interactive.watch.catalogName': 'Zu überwachender Katalogname (leer für alle):',
  'interactive.watch.updateTarget': 'Update-Ziel:',
  'interactive.watch.includePrerelease': 'Vorabversionen einschließen?',
  'interactive.watch.outputFormat': 'Ausgabeformat:',

  // Interactive cancelled message
  'interactive.cancelled': 'Vorgang abgebrochen',

  // Interactive command subtitles, intros, and completion messages
  'interactive.check.subtitle': 'Katalog-Abhängigkeiten auf veraltete Versionen prüfen',
  'interactive.check.intro': 'Bitte konfigurieren Sie die Prüfoptionen',
  'interactive.check.ready': 'Konfiguration abgeschlossen! Prüfung wird gestartet...',
  'interactive.check.catalogPlaceholder': 'z.B. default, react',
  'interactive.check.patternPlaceholder': 'z.B. react*, @types/*',

  'interactive.update.subtitle': 'Katalog-Abhängigkeiten auf neue Versionen aktualisieren',
  'interactive.update.intro': 'Bitte konfigurieren Sie die Aktualisierungsoptionen',
  'interactive.update.ready': 'Konfiguration abgeschlossen! Aktualisierung wird gestartet...',
  'interactive.update.catalogPlaceholder': 'z.B. default, react',
  'interactive.update.mode.interactiveHint': 'Zu aktualisierende Pakete manuell auswählen',
  'interactive.update.mode.dryRunHint': 'Änderungen ohne Modifikation vorschauen',
  'interactive.update.mode.applyHint': 'Alle verfügbaren Updates direkt anwenden',

  'interactive.analyze.subtitle': 'Auswirkungen von Paketaktualisierungen analysieren',
  'interactive.analyze.intro': 'Bitte konfigurieren Sie die Analyseoptionen',
  'interactive.analyze.ready': 'Konfiguration abgeschlossen! Analyse wird gestartet...',
  'interactive.analyze.packagePlaceholder': 'z.B. lodash, react',
  'interactive.analyze.versionPlaceholder': 'Leer lassen für neueste, z.B. 18.2.0, ^19.0.0',
  'interactive.analyze.catalogPlaceholder': 'Leer lassen für automatische Erkennung',

  'interactive.workspace.subtitle': 'Workspace-Informationen anzeigen und validieren',
  'interactive.workspace.intro': 'Bitte wählen Sie eine Aktion',
  'interactive.workspace.ready': 'Konfiguration abgeschlossen! Aktion wird ausgeführt...',
  'interactive.workspace.validateHint': 'Workspace-Konfiguration validieren',
  'interactive.workspace.statsHint': 'Workspace-Statistiken anzeigen',

  'interactive.theme.subtitle': 'CLI-Farbthema konfigurieren',
  'interactive.theme.intro': 'Bitte wählen Sie eine Theme-Aktion',
  'interactive.theme.ready': 'Konfiguration abgeschlossen! Theme wird angewendet...',

  'interactive.security.subtitle': 'Sicherheitslücken scannen und beheben',
  'interactive.security.intro': 'Bitte konfigurieren Sie die Sicherheitsoptionen',
  'interactive.security.ready': 'Konfiguration abgeschlossen! Sicherheitsscan wird gestartet...',

  'interactive.init.subtitle': 'PCU-Konfiguration initialisieren',
  'interactive.init.intro': 'Bitte wählen Sie den Initialisierungsmodus',
  'interactive.init.ready': 'Konfiguration abgeschlossen! Initialisierung...',

  'interactive.cache.subtitle': 'PCU-Cache verwalten',
  'interactive.cache.intro': 'Bitte wählen Sie eine Cache-Aktion',
  'interactive.cache.ready': 'Konfiguration abgeschlossen! Aktion wird ausgeführt...',

  'interactive.rollback.subtitle': 'Auf eine frühere Version zurücksetzen',
  'interactive.rollback.intro': 'Bitte wählen Sie eine Rollback-Aktion',
  'interactive.rollback.ready': 'Konfiguration abgeschlossen! Rollback wird gestartet...',

  'interactive.watch.subtitle': 'Abhängigkeitsaktualisierungen überwachen',
  'interactive.watch.intro': 'Bitte konfigurieren Sie die Überwachungsoptionen',
  'interactive.watch.ready': 'Konfiguration abgeschlossen! Überwachungsmodus wird gestartet...',
  'interactive.watch.catalogPlaceholder': 'z.B. default, react',

  // Interactive choice hints - format
  'interactive.choice.format.tableHint': 'Optimal für Terminalanzeige',
  'interactive.choice.format.jsonHint': 'Optimal für programmatische Verarbeitung',
  'interactive.choice.format.yamlHint': 'Optimal für Konfigurationsdateien',
  'interactive.choice.format.minimalHint': 'Nur wichtige Informationen anzeigen',

  // Interactive choice hints - target
  'interactive.choice.target.latestHint': 'Empfohlen, neueste stabile Version',
  'interactive.choice.target.greatestHint': 'Enthält Vorabversionen',
  'interactive.choice.target.minorHint': 'Sicher, abwärtskompatibel',
  'interactive.choice.target.patchHint': 'Am sichersten, nur Bugfixes',
  'interactive.choice.target.newestHint': 'Nach Veröffentlichungsdatum sortiert',

  // Interactive action hints
  'interactive.workspace.action.validateHint': 'Workspace-Konfiguration auf Probleme prüfen',
  'interactive.workspace.action.statsHint': 'Detaillierte Workspace-Statistiken anzeigen',

  'interactive.theme.action.setHint': 'Neues Theme auswählen und anwenden',
  'interactive.theme.action.listHint': 'Alle verfügbaren Themes anzeigen',

  'interactive.security.action.auditHint': 'Sicherheitslücken scannen',
  'interactive.security.action.fixHint': 'Schwachstellen automatisch beheben',
  'interactive.security.action.bothHint': 'Scannen und Beheben in einem Schritt',

  'interactive.init.mode.quickHint': 'Schnelleinrichtung mit Standardwerten',
  'interactive.init.mode.fullHint': 'Alle verfügbaren Optionen konfigurieren',

  'interactive.cache.action.statsHint': 'Cache-Nutzungsstatistiken anzeigen',
  'interactive.cache.action.clearHint': 'Alle zwischengespeicherten Daten löschen',

  'interactive.rollback.action.listHint': 'Alle verfügbaren Backups anzeigen',
  'interactive.rollback.action.latestHint': 'Neuestes Backup wiederherstellen',
  'interactive.rollback.action.deleteAllHint': 'Alle Backup-Dateien löschen',

  // Update reason messages (DOC-001: i18n for update reasons)
  'update.reason.security': 'Sicherheitsupdate verfügbar',
  'update.reason.major': 'Hauptversions-Update verfügbar',
  'update.reason.minor': 'Nebenversions-Update verfügbar',
  'update.reason.patch': 'Patch-Update verfügbar',
  'update.reason.default': 'Update verfügbar',
}
