/**
 * French Translations (Français)
 */

import type { TranslationDictionary } from '../types.js'

export const fr: TranslationDictionary = {
  // Error messages
  'error.packageNotFound': 'Le paquet "{{packageName}}" n\'existe pas dans le registre npm',
  'error.packageNotFoundWithSuggestion': 'Le paquet "{{packageName}}" n\'existe pas',
  'error.possiblePackageNames': 'Noms de paquets possibles :',
  'error.checkPackageName':
    'Veuillez vérifier si le nom du paquet est correct, ou le paquet a peut-être été supprimé',
  'error.emptyVersion': 'Les informations de version du paquet "{{packageName}}" sont vides',
  'error.emptyVersionReasons':
    'Causes possibles :\n   • Problèmes de configuration du package.json\n   • Format de version incorrect dans la configuration du catalogue\n   • Problèmes de synchronisation des données du registre npm',
  'error.networkError': 'Erreur réseau lors de la vérification du paquet "{{packageName}}"',
  'error.networkRetry': 'Veuillez réessayer plus tard ou vérifier votre connexion réseau',
  'error.registryError': 'Erreur de registre pour "{{packageName}}" : {{message}}',
  'error.workspaceNotFound': 'Aucun workspace pnpm trouvé dans "{{path}}"',
  'error.catalogNotFound': 'Catalogue "{{catalogName}}" non trouvé',
  'error.invalidVersion': 'Version invalide "{{version}}"',
  'error.invalidVersionRange': 'Plage de version invalide "{{range}}"',
  'error.configurationError': 'Erreur de configuration : {{message}}',
  'error.fileSystemError': 'Erreur du système de fichiers : {{message}}',
  'error.cacheError': 'Erreur de cache : {{message}}',
  'error.securityCheckFailed':
    'Vérification de sécurité échouée pour "{{packageName}}" : {{message}}',
  'error.securityCheckUnavailable':
    'Impossible de vérifier le statut de sécurité de "{{packageName}}"',
  'error.updateFailed': 'Mise à jour échouée : {{message}}',
  'error.packageSkipped': 'Paquet "{{packageName}}" ignoré (vérification échouée)',
  'error.unknown': "Une erreur inconnue s'est produite",

  // Validation errors
  'validation.packageNameRequired': 'Le nom du paquet est requis',
  'validation.invalidFormat':
    'Format invalide. Doit être : table, json, yaml, minimal, github, gitlab, junit, sarif',
  'validation.invalidSeverity': 'Sévérité invalide. Doit être : low, moderate, high, critical',
  'validation.invalidTarget': 'Cible invalide. Doit être : latest, greatest, minor, patch, newest',
  'validation.interactiveWithDryRun': "Impossible d'utiliser --interactive avec --dry-run",
  'validation.includePatternsEmpty': "Les patterns d'inclusion ne peuvent pas être vides",
  'validation.excludePatternsEmpty': "Les patterns d'exclusion ne peuvent pas être vides",
  'validation.workspaceDirNotExist': "Le répertoire du workspace n'existe pas : {{path}}",
  'validation.invalidProvider':
    "Fournisseur invalide. Doit être l'un des suivants : auto, claude, gemini, codex",
  'validation.invalidAnalysisType':
    "Type d'analyse invalide. Doit être l'un des suivants : impact, security, compatibility, recommend",
  'validation.invalidGraphType':
    "Type de graphe invalide. Doit être l'un des suivants : {{validTypes}}",
  'validation.invalidGraphFormat':
    "Format de graphe invalide. Doit être l'un des suivants : {{validFormats}}",

  // Success messages
  'success.updateComplete': 'Mise à jour terminée avec succès',
  'success.cacheCleared': 'Cache vidé avec succès',
  'success.configInitialized': 'Configuration initialisée avec succès',
  'success.validationPassed': 'Toutes les validations réussies',

  // Info messages
  'info.checkingUpdates': 'Vérification des dépendances de catalogue obsolètes',
  'info.foundOutdated': '{{count}} dépendances obsolètes trouvées',
  'info.noUpdatesFound': 'Toutes les dépendances du catalogue sont à jour !',
  'info.runWithUpdate': 'Exécutez avec --update pour appliquer les mises à jour',
  'info.majorWarning': 'Les mises à jour majeures peuvent contenir des changements incompatibles',
  'info.securityUpdates': '{{count}} mises à jour de sécurité disponibles',

  // Warning messages
  'warning.configExists': 'Le fichier de configuration existe déjà',
  'warning.workspaceNotDetected': 'Structure de workspace PNPM non détectée',
  'warning.deprecatedPackage': 'Le paquet "{{packageName}}" est obsolète',

  // Summary messages
  'summary.skippedPackages': '{{count}} vérifications de paquets ignorées :',
  'summary.notFoundPackages': 'Non trouvés ({{count}}) : {{packages}}',
  'summary.emptyVersionPackages': 'Informations de version vides ({{count}}) : {{packages}}',
  'summary.networkIssuePackages': 'Problèmes réseau ({{count}}) : {{packages}}',
  'summary.otherIssuePackages': 'Autres problèmes ({{count}}) : {{packages}}',
  'summary.securityCheckFailures': 'Échecs de vérification de sécurité : {{count}}',

  // Command messages
  'command.workspace.title': 'Workspace',
  'command.workspace.path': 'Chemin',
  'command.workspace.packages': 'Paquets',
  'command.workspace.catalogs': 'Catalogues',
  'command.workspace.catalogNames': 'Noms des catalogues',
  'command.check.analyzing': 'Analyse des dépendances du catalogue...',
  'command.check.summary': 'Résumé',
  'command.check.majorUpdates': '{{count}} mises à jour majeures',
  'command.check.minorUpdates': '{{count}} mises à jour mineures',
  'command.check.patchUpdates': '{{count}} mises à jour de correctifs',
  'command.init.creating': 'Création de la configuration PCU...',
  'command.init.success': 'Configuration PCU initialisée avec succès !',
  'command.init.nextSteps': 'Prochaines étapes',

  // Theme command
  'command.theme.availableThemes': 'Thèmes disponibles :',
  'command.theme.invalidTheme': 'Thème invalide : {{theme}}',
  'command.theme.setTo': 'Thème défini sur : {{theme}}',
  'command.theme.configured': 'Thème configuré : {{theme}}',
  'command.theme.cancelled': 'Sélection du thème annulée.',
  'command.theme.currentSettings': 'Paramètres actuels du thème :',
  'command.theme.preview': 'Aperçu du thème :',
  'command.theme.useHint':
    'Utilisez --set <thème> pour changer ou --interactive pour une configuration guidée',

  // Analyze command
  'command.analyze.autoDetecting': 'Détection automatique du catalogue pour {{packageName}}...',
  'command.analyze.notFoundInCatalog': 'Paquet "{{packageName}}" non trouvé dans aucun catalogue',
  'command.analyze.specifyManually':
    'Utilisez --catalog <nom> pour spécifier le catalogue manuellement',
  'command.analyze.foundInCatalog': 'Trouvé dans le catalogue : {{catalog}}',
  'command.analyze.runningAI': "Exécution de l'analyse IA...",
  'command.analyze.aiFailed': "Analyse IA échouée, affichage de l'analyse de base :",

  // Update command
  'command.update.planningUpdates': 'Planification des mises à jour...',
  'command.update.loadingConfig': 'Chargement de la configuration du workspace...',
  'command.update.checkingVersions': 'Vérification des versions des paquets...',
  'command.update.analyzingUpdates': 'Analyse des mises à jour...',
  'command.update.allUpToDate': 'Toutes les dépendances sont à jour !',
  'command.update.foundUpdates': '{{count}} mise(s) à jour disponible(s)',
  'command.update.noUpdatesSelected': 'Aucune mise à jour sélectionnée',
  'command.update.runningBatchAI': "Exécution de l'analyse IA par lot pour {{count}} paquets...",
  'command.update.batchAIHint':
    "Analyse tous les paquets en une seule requête pour plus d'efficacité.",
  'command.update.processingChunks': 'Traitement du lot {{current}}/{{total}}...',
  'command.update.aiResults': "Résultats de l'analyse IA :",
  'command.update.provider': 'Fournisseur : {{provider}}',
  'command.update.confidence': 'Confiance : {{confidence}}%',
  'command.update.processingTime': 'Temps de traitement : {{time}}ms',
  'command.update.summary': 'Résumé :',
  'command.update.packageRecommendations': 'Recommandations de paquets :',
  'command.update.breakingChanges': 'Changements incompatibles : {{changes}}',
  'command.update.securityFixes': 'Correctifs de sécurité : {{fixes}}',
  'command.update.warnings': 'Avertissements :',
  'command.update.aiSkipRecommend':
    "L'IA recommande d'ignorer {{count}} paquet(s) en raison des risques.",
  'command.update.useForce': "Utilisez --force pour outrepasser les recommandations de l'IA.",
  'command.update.preparingApply': "Préparation de l'application des mises à jour...",
  'command.update.applyingUpdates': 'Application des mises à jour...',
  'command.update.appliedUpdates': '{{count}} mises à jour appliquées',
  'command.update.generatingPreview': "Génération de l'aperçu...",
  'command.update.previewComplete': 'Aperçu des mises à jour terminé',
  'command.update.dryRunHint': 'Simulation - aucune modification effectuée',
  'command.update.planSaved': 'Plan de mise à jour enregistré dans {path}',
  'command.update.processComplete': 'Processus de mise à jour terminé !',
  'command.update.aiBatchFailed': 'Analyse IA par lot échouée, continuation sans informations IA :',
  'command.update.runningPnpmInstall':
    'Exécution de pnpm install pour mettre à jour le fichier de verrouillage...',
  'command.update.pnpmInstallSuccess': 'pnpm install terminé avec succès',
  'command.update.pnpmInstallFailed':
    'pnpm install a échoué (les mises à jour du catalogue ont réussi)',
  'command.update.fetchingChangelogs': 'Récupération des journaux de modifications...',
  'command.update.changelogUnavailable': 'Journal des modifications non disponible',
  'command.update.cancelled': 'Opération annulée',
  'command.update.moreLines': '{{count}} lignes supplémentaires, utilisez --verbose',
  'command.update.installError': "Erreur inattendue pendant l'installation",
  'command.update.suggestFix': 'Suggestions :',
  'command.update.suggestManualInstall': 'Essayez d\'exécuter "{{pm}} install" manuellement',
  'command.update.suggestCheckDeps':
    'Vérifiez les conflits de dépendances dans votre espace de travail',
  'command.update.suggestInstallPm': 'Assurez-vous que {{pm}} est installé et dans votre PATH',
  'command.update.suggestRetry': "Essayez d'exécuter la commande à nouveau",
  'command.update.suggestCheckNetwork': 'Vérifiez votre connexion réseau',

  // Rollback command
  'command.rollback.noBackups': 'Aucune sauvegarde trouvée',
  'command.rollback.createBackupHint':
    'Utilisez "pcu update -b" pour créer une sauvegarde avant la mise à jour',
  'command.rollback.availableBackups': 'Sauvegardes disponibles ({{count}})',
  'command.rollback.restoreHint': 'Utilisez "pcu rollback" pour restaurer depuis une sauvegarde',
  'command.rollback.restoringLatest': 'Restauration depuis la dernière sauvegarde',
  'command.rollback.from': 'Depuis',
  'command.rollback.confirmRestore': 'Êtes-vous sûr de vouloir restaurer cette sauvegarde ?',
  'command.rollback.cancelled': 'Restauration annulée',
  'command.rollback.success': 'Restauration réussie !',
  'command.rollback.runPnpmInstall':
    'Exécutez "pnpm install" pour synchroniser le fichier de verrouillage',
  'command.rollback.selectBackup': 'Sélectionner une sauvegarde à restaurer',
  'command.rollback.chooseBackup': 'Choisir la sauvegarde',
  'command.rollback.warning': 'Attention : Cela écrasera votre pnpm-workspace.yaml actuel',
  'command.rollback.willRestore': 'Restauration depuis : {{time}}',
  'command.rollback.autoBackupNote':
    'Votre état actuel sera automatiquement sauvegardé avant la restauration',
  'command.rollback.preRestoreBackupCreated':
    'Sauvegarde pré-restauration enregistrée dans : {{path}}',
  'command.rollback.safetyNote': 'Pour annuler ce rollback, exécutez à nouveau "pcu rollback"',
  'command.rollback.deleteWarning': 'Attention : {{count}} sauvegarde(s) seront supprimées',
  'command.rollback.confirmDelete': 'Êtes-vous sûr de vouloir supprimer toutes les sauvegardes ?',
  'command.rollback.deletedBackups': '{{count}} sauvegarde(s) supprimée(s)',
  // Rollback verification
  'command.rollback.verification.validYaml': 'Structure YAML valide',
  'command.rollback.verification.catalogsFound': '{{count}} catalogue(s) trouvé(s)',
  'command.rollback.verification.catalogs': 'Catalogues',
  'command.rollback.verification.dependencies': 'Dépendances totales: {{count}}',
  'command.rollback.verification.warning': 'Restauration terminée avec des avertissements',
  'command.rollback.verification.invalidYaml': 'Structure YAML invalide',
  'command.rollback.verification.noCatalogs': 'Aucune structure de catalogue trouvée',
  'command.rollback.verification.skipped': 'Verification skipped',

  // Watch command
  'command.watch.starting': 'Démarrage du mode surveillance...',
  'command.watch.watching': 'Surveillance de',
  'command.watch.pressCtrlC': 'Appuyez sur Ctrl+C pour arrêter',
  'command.watch.stopping': 'Arrêt du mode surveillance...',
  'command.watch.stopped': 'Mode surveillance arrêté',
  'command.watch.checkingUpdates': 'Vérification des mises à jour...',
  'command.watch.foundOutdated': '{{count}} paquet(s) obsolète(s) trouvé(s)',
  'command.watch.waitingForChanges': 'En attente de modifications...',
  'command.watch.runUpdateHint': 'Exécutez "pcu update" pour appliquer les mises à jour',

  // Self-update command
  'command.selfUpdate.checking': 'Vérification des mises à jour de pcu...',
  'command.selfUpdate.updating': 'Mise à jour de pcu vers la version {{version}}...',
  'command.selfUpdate.success': 'Mise à jour réussie vers la version {{version}} !',
  'command.selfUpdate.failed': 'Échec de la mise à jour de pcu',
  'command.selfUpdate.latestAlready': 'Vous utilisez déjà la dernière version ({{version}})',
  'command.selfUpdate.restartHint':
    'Veuillez redémarrer votre terminal pour utiliser la nouvelle version.',
  'command.selfUpdate.manualHint':
    'Vous pouvez mettre à jour manuellement avec : npm install -g pcu@latest',

  // AI command
  'command.ai.cacheCleared': "Cache d'analyse IA vidé",
  'command.ai.cacheStats': "Statistiques du cache d'analyse IA",
  'command.ai.totalEntries': 'Entrées totales',
  'command.ai.cacheHits': 'Succès du cache',
  'command.ai.cacheMisses': 'Échecs du cache',
  'command.ai.hitRate': 'Taux de réussite',
  'command.ai.testingAnalysis': "Test de l'analyse IA...",
  'command.ai.testSuccess': "Test de l'analyse IA réussi !",
  'command.ai.testFailed': "Test de l'analyse IA échoué :",
  'command.ai.providerStatus': 'Statut du fournisseur IA',
  'command.ai.providerDetails': 'Détails du fournisseur',
  'command.ai.bestProvider': 'Meilleur fournisseur disponible : {{provider}}',
  'command.ai.available': 'Disponible',
  'command.ai.notFound': 'Non trouvé',

  // Cache command
  'command.cache.clearingCaches': 'Vidage des caches...',
  'command.cache.registryCacheCleared': 'Cache du registre vidé',
  'command.cache.workspaceCacheCleared': 'Cache du workspace vidé',
  'command.cache.aiCacheCleared': "Cache d'analyse IA vidé",
  'command.cache.registryCache': 'Cache du Registre',
  'command.cache.workspaceCache': 'Cache du Workspace',
  'command.cache.aiAnalysisCache': "Cache d'Analyse IA",
  'command.cache.registryDescription': 'Réponses API du registre NPM (infos paquets, versions)',
  'command.cache.workspaceDescription':
    'Données du système de fichiers du workspace (fichiers package.json)',
  'command.cache.aiDescription': "Résultats d'analyse de dépendances par IA",
  'command.cache.statistics': 'Statistiques du Cache',
  'command.cache.summary': 'Résumé',
  'command.cache.totalEntries': 'Entrées totales : {{count}}',
  'command.cache.totalSize': 'Taille totale : {{size}}',
  'command.cache.overallHitRate': 'Taux de réussite global : {{rate}}%',
  'command.cache.entries': 'Entrées : {{count}}',
  'command.cache.size': 'Taille : {{size}}',
  'command.cache.hitRate': 'Taux de réussite : {{rate}}%',
  'command.cache.hitsAndMisses': 'Succès : {{hits}}, Échecs : {{misses}}',
  'command.cache.errorManaging': 'Erreur de gestion du cache :',
  'command.cache.stackTrace': 'Trace de pile :',
  'command.cache.noStackTrace': 'Aucune trace de pile disponible',

  // Common messages
  'common.stackTrace': 'Trace de pile :',
  'common.noStackTrace': 'Aucune trace de pile disponible',
  'common.yes': 'Oui',
  'common.no': 'Non',
  'common.packagesCount': '{{count}} paquet(s)',

  // Security command
  'command.security.scanning': 'Analyse des vulnérabilités de sécurité',
  'command.security.severityFilter': 'Filtre de gravité : {{severity}}',
  'command.security.errorScanning': "Erreur lors de l'analyse de sécurité :",
  'command.security.snykNotFound': 'Snyk non trouvé. Installer avec : npm install -g snyk',
  'command.security.recommendations': 'Recommandations de sécurité :',
  'command.security.runWithFix':
    'Exécuter avec --fix-vulns pour appliquer les corrections automatiques',
  'command.security.noFixesAvailable': 'Aucune correction de sécurité disponible',
  'command.security.applyingFixes': 'Application des corrections de sécurité...',
  'command.security.noAutoFixes': 'Aucune correction automatique disponible',
  'command.security.fixesApplied': 'Corrections de sécurité appliquées avec succès',
  'command.security.verifyingFixes':
    "Réexécution de l'analyse de sécurité pour vérifier les corrections...",
  'command.security.allFixed':
    'Toutes les vulnérabilités critiques et de haute gravité ont été corrigées !',
  'command.security.fixesFailed': "Échec de l'application des corrections de sécurité :",
  'command.security.noPackageJson': 'Aucun package.json trouvé dans {{path}}',
  'command.security.auditFailed': 'pnpm audit a échoué : {{message}}',
  'command.security.auditParseError': "Échec de l'analyse de la sortie pnpm audit : {{error}}",
  'command.security.auditExitError': 'pnpm audit a échoué avec le statut {{status}} : {{error}}',
  'command.security.snykScanExitError':
    "L'analyse Snyk a échoué avec le statut {{status}} : {{error}}",
  'command.security.snykScanFailed': "L'analyse Snyk a échoué : {{message}}",
  'command.security.auditFixFailed': 'pnpm audit --fix a échoué avec le statut {{status}}',

  // Check command additions
  'command.check.errorChecking': 'Erreur lors de la vérification des dépendances :',
  'command.check.catalogLabel': 'Catalogue : {{catalog}}',
  'command.check.targetLabel': 'Cible : {{target}}',
  'command.check.catalogsChecked': '{{count}} catalogues vérifiés',
  'command.check.totalCatalogEntries': '{{count}} entrées de catalogue au total',

  // Init command additions
  'command.init.missingPackageJson': 'Manquant : package.json',
  'command.init.missingWorkspaceYaml': 'Manquant : pnpm-workspace.yaml',
  'command.init.creatingWorkspace': 'Création de la structure du workspace PNPM...',
  'command.init.workspaceCreated': 'Structure du workspace PNPM créée',
  'command.init.useForceOverwrite': 'Utilisez --force pour écraser la configuration existante',
  'command.init.errorInitializing': "Erreur lors de l'initialisation de la configuration :",
  'command.init.createdPackageJson': 'Créé : package.json',
  'command.init.createdWorkspaceYaml': 'Créé : pnpm-workspace.yaml',
  'command.init.createdPackagesDir': 'Créé : répertoire packages/',

  // Theme command additions
  'command.theme.themeLabel': 'Thème :',
  'command.theme.custom': 'personnalisé',
  'command.theme.default': 'par défaut',

  // AI command additions
  'command.ai.providerLabel': 'Fournisseur :',
  'command.ai.confidenceLabel': 'Confiance :',
  'command.ai.summaryLabel': 'Résumé :',
  'command.ai.pathLabel': 'Chemin :',
  'command.ai.versionLabel': 'Version :',

  // Init command labels
  'command.init.configFileLabel': 'Fichier de configuration : {{path}}',
  'command.init.foundLabel': 'Trouvé : {{path}}',
  'command.init.createdLabel': 'Créé : {{path}}',

  // Theme command preview
  'command.theme.previewSuccess': 'Message de succès',
  'command.theme.previewWarning': "Message d'avertissement",
  'command.theme.previewError': "Message d'erreur",
  'command.theme.previewInfo': "Message d'information",
  'command.theme.previewMajor': 'majeure',
  'command.theme.previewMinor': 'mineure',
  'command.theme.previewPatch': 'correctif',
  'command.theme.previewPackageUpdates': 'Exemples de mises à jour',
  'command.theme.previewStatusMessages': 'Messages de statut',
  'command.theme.previewProgressBar': 'Barre de progression',
  'command.theme.previewPrerelease': 'préversion',
  'command.theme.previewCheckingDeps': 'Vérification des dépendances...',
  'command.theme.previewUpdatesFound': '{{count}} mises à jour',
  'command.theme.previewUpdateComplete': 'Mise à jour terminée',
  'command.theme.previewPotentialIssue': 'Problème potentiel',
  'command.theme.previewOperationFailed': 'Opération échouée',

  // Init command next steps
  'command.init.step1': '1. Examiner et personnaliser la configuration :',
  'command.init.step2': '2. Ajouter des paquets à votre workspace :',
  'command.init.step2Commands': 'mkdir packages/my-app && cd packages/my-app\n   pnpm init',
  'command.init.step3': '3. Installer les dépendances et vérifier les mises à jour :',
  'command.init.step3Commands': 'pnpm install\n   pcu check',
  'command.init.step4': '4. Mettre à jour les dépendances de manière interactive :',
  'command.init.step4Commands': 'pcu update --interactive',
  'command.init.step5': '5. En savoir plus sur PNPM workspace et PCU :',

  // CLI messages
  'cli.runAgain': 'Veuillez relancer la commande pour utiliser la version mise à jour.',
  'cli.checkingUpdates': 'Recherche de mises à jour...',
  'cli.latestVersion': 'est la dernière',
  'cli.available': 'disponible',
  'cli.unknownCommand': 'Commande inconnue : {{command}}',
  'cli.couldNotCheckUpdates': 'Impossible de vérifier les mises à jour :',
  'cli.error': 'Erreur :',
  'cli.unexpectedError': 'Erreur inattendue :',
  'cli.fatalError': 'Erreur fatale :',
  'cli.cancelled': 'Annulé.',
  'cli.updateAvailable': 'Mise à jour disponible : {{current}} → {{latest}}',
  'cli.updateHint': 'Exécutez "pcu self-update" pour mettre à jour.',

  // Progress bar messages
  'progress.securityAnalyzing': 'Analyse de sécurité en cours...',
  'progress.securityCompleted': 'Analyse de sécurité terminée',
  'progress.securityFailed': 'Analyse de sécurité échouée',
  'progress.operationFailed': 'Opération échouée',
  'progress.processing': 'Traitement...',
  'progress.success': 'SUCCÈS',
  'progress.error': 'ERREUR',
  'progress.warning': 'AVERTISSEMENT',
  'progress.info': 'INFO',
  'progress.completed': 'terminé',
  'progress.failed': 'échoué',
  'progress.steps': 'Étapes de progression',
  'progress.allStepsCompleted': 'Toutes les étapes terminées !',
  'progress.overallProgress': 'Progression globale',
  'progress.checkingPackages': 'Vérification de {{count}} dépendances...',
  'progress.checkCompleteWithUpdates':
    '✅ Vérification terminée ! {{count}} dépendances obsolètes trouvées',
  'progress.checkCompleteNoUpdates':
    '✅ Vérification terminée ! Toutes les dépendances sont à jour',
  'progress.checkingPackage': 'Vérification du paquet : {{packageName}}',
  'progress.skippingPackage': 'Paquet {{packageName}} ignoré (vérification échouée)',

  // Security command additions
  'command.security.criticalVulnsFound': '{{count}} vulnérabilités critiques trouvées',
  'command.security.highImpactFix': 'Élevé - Correction de vulnérabilité de sécurité',

  // CLI command descriptions
  'cli.description.main':
    'Moteur de mise à jour déterministe pour les catalogues de workspace pnpm',
  'cli.description.check': 'vérifier les dépendances de catalogue obsolètes',
  'cli.description.update': 'mettre à jour les dépendances du catalogue',
  'cli.description.analyze': "analyser l'impact de la mise à jour d'une dépendance spécifique",
  'cli.description.workspace': 'informations et validation du workspace',
  'cli.description.theme': 'configurer le thème de couleur',
  'cli.description.security': 'analyse des vulnérabilités de sécurité et corrections automatiques',
  'cli.description.init': "initialiser la configuration PCU et l'espace de travail PNPM",
  'cli.description.ai': "vérifier l'état et la disponibilité du fournisseur IA",
  'cli.description.cache': 'gérer le cache PCU pour les données de registre et de workspace',
  'cli.description.rollback': 'restaurer les mises à jour du catalogue à un état précédent',
  'cli.description.watch': 'surveiller les modifications et vérifier les mises à jour',
  'cli.description.selfUpdate': 'mettre à jour pcu vers la dernière version',
  'cli.description.graph': 'visualiser les relations de dépendances du catalogue',
  'cli.description.help': "afficher l'aide pour la commande",

  // CLI option descriptions
  'cli.option.catalog': 'vérifier uniquement le catalogue spécifique',
  'cli.option.format': 'format de sortie : table, json, yaml, minimal',
  'cli.option.target': 'cible de mise à jour : latest, greatest, minor, patch, newest',
  'cli.option.prerelease': 'inclure les versions préliminaires',
  'cli.option.include': 'inclure les paquets correspondant au motif',
  'cli.option.exclude': 'exclure les paquets correspondant au motif',
  'cli.option.interactive': 'mode interactif pour choisir les mises à jour',
  'cli.option.dryRun': 'prévisualiser les modifications sans écrire les fichiers',
  'cli.option.savePlan': 'enregistrer le plan de simulation dans un fichier (JSON ou YAML)',
  'cli.option.force': 'forcer les mises à jour même si risquées',
  'cli.option.createBackup': 'créer des fichiers de sauvegarde avant la mise à jour',
  'cli.option.noBackup': 'ignorer la création de sauvegarde avant la mise à jour',
  'cli.option.ai': "activer l'analyse par lots IA pour toutes les mises à jour",
  'cli.option.aiStatus': 'afficher le statut du fournisseur IA (par défaut)',
  'cli.option.aiTest': 'tester la connectivité du fournisseur IA',
  'cli.option.aiCacheStats': "afficher les statistiques du cache d'analyse IA",
  'cli.option.aiClearCache': "effacer le cache d'analyse IA",
  'cli.option.provider': 'fournisseur IA : auto, claude, gemini, codex',
  'cli.option.analysisType': "type d'analyse IA : impact, security, compatibility, recommend",
  'cli.option.skipCache': "ignorer le cache d'analyse IA",
  'cli.option.noAi': "désactiver l'analyse IA",
  'cli.option.validate': 'valider la configuration du workspace',
  'cli.option.stats': 'afficher les statistiques du workspace',
  'cli.option.setTheme': 'définir le thème : default, modern, minimal, neon',
  'cli.option.listThemes': 'lister les thèmes disponibles',
  'cli.option.audit': 'effectuer une analyse npm audit (par défaut : true)',
  'cli.option.fixVulns': 'corriger automatiquement les vulnérabilités',
  'cli.option.severity': 'filtrer par sévérité : low, moderate, high, critical',
  'cli.option.includeDev': "inclure les dépendances de développement dans l'analyse",
  'cli.option.snyk': 'inclure analyse Snyk (nécessite snyk CLI)',
  'cli.option.forceOverwrite': 'écraser le fichier de configuration existant',
  'cli.option.full': 'générer une configuration complète avec toutes les options',
  'cli.option.createWorkspace':
    'créer la structure workspace PNPM si manquante (par défaut : true)',
  'cli.option.noCreateWorkspace': 'ignorer la création de la structure workspace PNPM',
  'cli.option.status': 'afficher le statut de tous les fournisseurs IA (par défaut)',
  'cli.option.test': "tester l'analyse IA avec une requête exemple",
  'cli.option.cacheStats': "afficher les statistiques du cache d'analyse IA",
  'cli.option.clearCache': "effacer le cache d'analyse IA",
  'cli.option.clear': 'effacer toutes les entrées du cache',
  'cli.option.version': 'afficher les informations de version',
  'cli.option.verbose': 'activer la journalisation détaillée',
  'cli.option.workspace': 'chemin du répertoire workspace',
  'cli.option.noColor': 'désactiver la sortie en couleur',
  'cli.help.command': 'help [command]',
  'cli.help.description': "afficher l'aide de la commande",
  'cli.help.option': "afficher les informations d'aide",
  // Libellés du texte d'aide Commander.js
  'cli.help.usage': 'Utilisation :',
  'cli.help.arguments': 'Arguments :',
  'cli.help.optionsTitle': 'Options :',
  'cli.help.commandsTitle': 'Commandes :',
  // Texte d'aide personnalisé - Section Groupes d'options
  'cli.help.optionGroupsTitle': "Groupes d'options :",
  'cli.help.groupBasic': 'Base :',
  'cli.help.groupFilter': 'Filtre :',
  'cli.help.groupOutput': 'Sortie :',
  'cli.help.groupAI': 'IA :',
  'cli.help.groupInstall': 'Installation :',
  // Texte d'aide personnalisé - Section Astuce
  'cli.help.tipLabel': 'Astuce :',
  'cli.help.tipContent':
    "Utilisez .pcurc.json pour définir les valeurs par défaut et réduire les options de ligne de commande.\n     Exécutez 'pcu init' pour créer un fichier de configuration, ou visitez https://pcu-cli.dev/{{locale}}/configuration",
  'cli.option.install': 'exécuter pnpm install après la mise à jour (par défaut : true)',
  'cli.option.noInstall': 'ignorer pnpm install après la mise à jour',
  'cli.option.changelog': 'afficher le journal des modifications pour chaque mise à jour',
  'cli.option.noChangelog': 'masquer la sortie du journal des modifications',
  'cli.option.updateShorthand': 'raccourci pour la commande update',
  'cli.option.checkShorthand': 'raccourci pour la commande check',
  'cli.option.analyzeShorthand': 'raccourci pour la commande analyze',
  'cli.option.workspaceShorthand': 'raccourci pour la commande workspace',
  'cli.option.themeShorthand': 'raccourci pour la commande theme',
  'cli.option.securityAudit': 'raccourci pour la commande security',
  'cli.option.securityFix': 'raccourci pour la commande security --fix-vulns',
  'cli.option.listBackups': 'lister les sauvegardes disponibles',
  'cli.option.restoreLatest': 'restaurer à partir de la sauvegarde la plus récente',
  'cli.option.deleteAllBackups': 'supprimer toutes les sauvegardes',
  'cli.option.debounce': 'délai de debounce en millisecondes',
  'cli.option.clearConsole': 'effacer la console avant chaque vérification',
  'cli.option.exitCode': 'sortir avec le code 1 si des mises à jour sont disponibles (pour CI/CD)',
  'cli.option.noSecurity': 'ignorer les vérifications de vulnérabilités de sécurité',
  'cli.option.graphFormat': 'format de sortie : text, mermaid, dot, json',
  'cli.option.graphType': 'type de graphe : catalog, package, full',

  // CLI argument descriptions
  'cli.argument.package': 'nom du paquet',
  'cli.argument.version': 'nouvelle version (par défaut : latest)',
  'cli.argument.command': "commande pour laquelle afficher l'aide",

  // Interactive prompts
  'prompt.selectPackages': 'Sélectionner les paquets à mettre à jour :',
  'prompt.selectAtLeastOne': 'Veuillez sélectionner au moins un paquet',
  'prompt.allCatalogs': 'Tous les catalogues',
  'prompt.selectCatalog': 'Sélectionner le catalogue à mettre à jour :',
  'prompt.selectUpdateStrategy': 'Sélectionner la stratégie de mise à jour :',
  'prompt.strategyLatest': 'Dernière version (recommandé)',
  'prompt.strategyGreatest': 'Version la plus élevée',
  'prompt.strategyMinor': 'Mises à jour mineures (non-cassantes)',
  'prompt.strategyPatch': 'Correctifs uniquement',
  'prompt.strategyNewest': 'Publication la plus récente',
  'prompt.selectPackage': 'Sélectionner un paquet :',
  'prompt.selectWorkspace': 'Sélectionner un workspace :',
  'prompt.browseDirectory': 'Parcourir le répertoire...',
  'prompt.parentDirectory': '.. (Répertoire parent)',
  'prompt.currentDirectory': 'Utiliser le répertoire actuel : {path}',
  'prompt.useAsWorkspace': 'Utiliser {path} comme workspace ?',
  'prompt.configWizard': 'Assistant de configuration',
  'prompt.selectTheme': 'Sélectionner un thème :',
  'prompt.themeDefault': 'Par défaut (couleurs classiques)',
  'prompt.themeModern': 'Moderne (dégradés doux)',
  'prompt.themeMinimal': 'Minimal (sortie simple)',
  'prompt.themeNeon': 'Néon (contraste élevé)',
  'prompt.enableInteractive': 'Activer le mode interactif ?',
  'prompt.createBackups': 'Créer une sauvegarde avant la mise à jour ?',
  'prompt.defaultStrategy': 'Stratégie de mise à jour par défaut :',
  'prompt.strategyLatestStable': 'Dernière version stable',
  'prompt.strategyMinorUpdates': 'Mises à jour mineures uniquement',
  'prompt.strategyPatchUpdates': 'Correctifs uniquement',
  'prompt.networkTimeout': 'Délai réseau (secondes) :',
  'prompt.timeoutRequired': 'Le délai est requis',
  'prompt.timeoutPositive': 'Le délai doit être supérieur à 0',
  'prompt.impactPreview': "Aperçu de l'impact",
  'prompt.packagesToUpdate': 'Paquets à mettre à jour : {count}',
  'prompt.riskLevel': 'Niveau de risque : {level}',
  'prompt.affectedPackages': 'Paquets affectés : {count}',
  'prompt.proceedWithUpdate': 'Procéder à la mise à jour ?',
  'prompt.retryOperation': "Réessayer l'opération",
  'prompt.skipPackage': 'Ignorer ce paquet',
  'prompt.continueRemaining': 'Continuer avec les restants',
  'prompt.abortOperation': "Abandonner l'opération",
  'prompt.whatToDo': 'Que souhaitez-vous faire ?',
  'prompt.checkForUpdates': 'Vérifier les mises à jour',
  'prompt.updateDependencies': 'Mettre à jour les dépendances',
  'prompt.analyzeImpact': "Analyser l'impact",
  'prompt.showWorkspaceInfo': 'Afficher les informations du workspace',
  'prompt.outputFormat': 'Format de sortie :',
  'prompt.formatTable': 'Tableau (détaillé)',
  'prompt.formatJson': 'JSON',
  'prompt.formatYaml': 'YAML',
  'prompt.formatMinimal': 'Minimal',
  'prompt.interactiveMode': 'Mode interactif ?',
  'prompt.dryRunMode': 'Mode simulation ?',
  'prompt.createBackup': 'Créer une sauvegarde ?',
  'prompt.includePrerelease': 'Inclure les versions préliminaires ?',
  'prompt.warning': 'Avertissement :',
  'prompt.confirmOperation': 'Êtes-vous sûr de vouloir {{operation}} ?',
  'prompt.browsePath': 'Parcourir : {{path}}',
  'prompt.securityUpdatesCount': '{{count}} mises à jour de sécurité',
  'prompt.errorMessage': 'Erreur : {{error}}',
  'prompt.cancel': 'Annuler',

  // Severity labels
  'severity.critical': 'Critique',
  'severity.high': 'Élevé',
  'severity.moderate': 'Modéré',
  'severity.low': 'Faible',
  'severity.info': 'Info',
  'severity.total': 'Total',

  // Option group titles
  'optionGroup.global': 'Options globales',
  'optionGroup.output': 'Options de sortie',
  'optionGroup.filtering': 'Options de filtrage',
  'optionGroup.update': 'Options de mise à jour',
  'optionGroup.registry': 'Options de registre',

  // AI Analysis Report
  'aiReport.title': "🤖 Rapport d'Analyse IA",
  'aiReport.provider': 'Fournisseur :',
  'aiReport.analysisType': "Type d'analyse :",
  'aiReport.confidence': 'Confiance :',
  'aiReport.summary': '📋 Résumé',
  'aiReport.recommendations': '💡 Recommandations',
  'aiReport.breakingChanges': '⚠️  Changements majeurs',
  'aiReport.securityFixes': '🔒 Correctifs de sécurité',
  'aiReport.warnings': '⚡ Avertissements',
  'aiReport.details': '📝 Détails',
  'aiReport.affectedPackages': '📦 Paquets affectés',
  'aiReport.noPackagesAffected': 'Aucun paquet directement affecté',
  'aiReport.generatedAt': 'Généré le : {{timestamp}}',
  'aiReport.processingTime': 'Temps de traitement : {{time}}ms',
  'aiReport.tokensUsed': 'Tokens utilisés : {{tokens}}',
  'aiReport.andMore': '... et {{count}} autres',
  'aiReport.tablePackage': 'Paquet',
  'aiReport.tableVersionChange': 'Changement de version',
  'aiReport.tableAction': 'Action',
  'aiReport.tableRisk': 'Risque',
  'aiReport.tableReason': 'Raison',

  // Theme preset descriptions
  'theme.preset.development': 'Couleurs vives pour les environnements de développement',
  'theme.preset.production': 'Couleurs subtiles pour les environnements de production',
  'theme.preset.presentation': 'Couleurs à contraste élevé pour les présentations',
  'theme.preset.default': 'Couleurs équilibrées pour un usage général',

  // Validation messages (commandValidator.ts)
  'validation.catalogMustBeString': 'Le nom du catalogue doit être une chaîne',
  'validation.interactiveNotUsefulWithJson':
    "Le mode interactif n'est pas utile avec le format de sortie JSON",
  'validation.verboseWithSilent': "Impossible d'utiliser --verbose et --silent ensemble",
  'validation.interactiveWithDryRunError': "Impossible d'utiliser --interactive avec --dry-run",
  'validation.forceWithoutBackup':
    'Utilisation de --force sans sauvegarde. Envisagez --create-backup pour la sécurité',
  'validation.majorUpdatesWarning':
    'Les mises à jour majeures peuvent contenir des changements importants. Envisagez --interactive ou --force',
  'validation.patternsOverlap':
    "Certains motifs apparaissent dans les listes d'inclusion et d'exclusion",
  'validation.catalogRequired': 'Le nom du catalogue est requis',
  'validation.catalogNoPathSeparators':
    'Le nom du catalogue ne peut pas contenir de séparateurs de chemin',
  'validation.packageRequired': 'Le nom du paquet est requis',
  'validation.invalidPackageNameFormat': 'Format de nom de paquet invalide',
  'validation.invalidVersionFormat':
    'Format de version invalide. Utilisez le versionnage sémantique (ex. 1.2.3)',
  'validation.multipleWorkspaceActions':
    "Impossible d'utiliser plusieurs actions de workspace simultanément",
  'validation.colorWithNoColor': "Impossible d'utiliser --color et --no-color ensemble",
  'validation.deprecatedOption':
    'L\'option "{{option}}" est obsolète. Utilisez "{{replacement}}" à la place',
  'validation.configNotFound': 'Fichier de configuration non trouvé : {{path}}',
  'validation.failedToLoadJsConfig':
    'Échec du chargement du fichier de configuration JS : {{error}}',
  'validation.failedToParseJsonConfig':
    "Échec de l'analyse du fichier de configuration JSON : {{error}}",
  'validation.configMustBeObject': 'La configuration doit être un objet',
  'validation.registryMustBeObject': 'La configuration du registre doit être un objet',
  'validation.updateMustBeObject': 'La configuration de mise à jour doit être un objet',
  'validation.outputMustBeObject': 'La configuration de sortie doit être un objet',
  'validation.unknownConfigKeys': 'Clés de configuration inconnues : {{keys}}',
  'validation.failedToValidateConfig': 'Échec de la validation de la configuration : {{error}}',
  'validation.interactiveWithDryRunConflict': "Impossible d'utiliser --interactive avec --dry-run",
  'validation.multipleWorkspaceActionsConflict':
    "Impossible d'utiliser plusieurs actions de workspace simultanément",
  'validation.verboseWithSilentConflict':
    "Impossible d'utiliser --verbose et --silent en même temps",

  // Suggestion messages
  'suggestion.specifyWorkspace': 'Utilisez -w ou --workspace pour spécifier le répertoire',
  'suggestion.jsonAlreadyDetailed': 'Le format JSON inclut déjà tous les détails',
  'suggestion.useDryRunFirst': "Utilisez --dry-run pour prévisualiser les changements d'abord",
  'suggestion.addPrereleaseWithGreatest':
    "Envisagez d'ajouter --prerelease lors de l'utilisation de --target greatest",
  'suggestion.useJsonForProgrammatic': "Utilisez --format json pour l'analyse programmatique",
  'suggestion.useValidateOrStats':
    'Utilisez --validate pour vérifier le workspace ou --stats pour les statistiques',
  'suggestion.globalVerboseEnabled': 'Mode verbose global activé via PCU_VERBOSE',

  // Table headers (outputFormatter.ts)
  'table.header.package': 'Paquet',
  'table.header.current': 'Actuel',
  'table.header.latest': 'Dernier',
  'table.header.type': 'Type',
  'table.header.packagesCount': 'Paquets',
  'table.header.catalog': 'Catalogue',
  'table.header.from': 'De',
  'table.header.to': 'Vers',
  'table.header.path': 'Chemin',
  'table.header.dependencyType': 'Type de dépendance',
  'table.header.risk': 'Risque',
  'table.header.metric': 'Métrique',
  'table.header.count': 'Nombre',
  'table.header.severity': 'Sévérité',
  'table.header.title': 'Titre',
  'table.header.fixAvailable': 'Correctif disponible',

  // Format labels (outputFormatter.ts)
  'format.workspace': 'Workspace',
  'format.path': 'Chemin',
  'format.allUpToDate': 'Toutes les dépendances sont à jour',
  'format.foundOutdated': '{{count}} dépendances obsolètes trouvées',
  'format.catalog': 'Catalogue',
  'format.updateCompleted': 'Mise à jour terminée',
  'format.updateFailed': 'Mise à jour échouée',
  'format.updatedDeps': 'Dépendances mises à jour',
  'format.skippedDeps': 'Dépendances ignorées',
  'format.errorsOccurred': 'Erreurs survenues',
  'format.updatedCount': 'Mis à jour : {{count}}',
  'format.errorCount': 'Erreurs : {{count}}',
  'format.impactAnalysis': "Analyse d'impact",
  'format.updateInfo': 'Info de mise à jour',
  'format.riskLevel': 'Niveau de risque',
  'format.affectedPackages': 'Paquets affectés',
  'format.securityImpact': 'Impact de sécurité',
  'format.fixesVulns': 'Corrige {{count}} vulnérabilités',
  'format.introducesVulns': 'Peut introduire {{count}} vulnérabilités',
  'format.recommendations': 'Recommandations',
  'format.workspaceValidation': 'Validation du workspace',
  'format.status': 'Statut',
  'format.valid': 'VALIDE',
  'format.invalid': 'INVALIDE',
  'format.workspaceInfo': 'Informations du workspace',
  'format.name': 'Nom',
  'format.packages': 'Paquets',
  'format.catalogs': 'Catalogues',
  'format.errors': 'Erreurs',
  'format.warnings': 'Avertissements',
  'format.workspaceStats': 'Statistiques du workspace',
  'format.securityReport': 'Rapport de sécurité',
  'format.scanDate': 'Date de scan',
  'format.tools': 'Outils',
  'format.summary': 'Résumé',
  'format.vulnerabilities': 'Vulnérabilités',
  'format.noVulnsFound': 'Aucune vulnérabilité trouvée',
  'format.packagesAffected': 'Paquets affectés',
  'format.foundOutdatedDependencies': '{{count}} dépendances obsolètes trouvées',
  'format.catalogLabel': 'Catalogue',
  'format.updateLabel': 'Mise à jour',
  'format.typeLabel': 'Type',
  'format.updateCompletedSuccessfully': 'Mise à jour terminée avec succès',
  'format.updateCompletedWithErrors': 'Mise à jour terminée avec {{count}} erreurs',
  'format.updatedDependenciesTitle': 'Dépendances mises à jour',
  'format.skippedDependencies': '{{count}} dépendances ignorées',
  'format.fixesVulnerabilities': 'Corrige {{count}} vulnérabilités',
  'format.introducesVulnerabilities': 'Introduit {{count}} vulnérabilités',
  'format.workspaceInformation': 'Informations du workspace',
  'format.workspaceStatistics': 'Statistiques du workspace',
  'format.packagesCount': '{{count}} paquets',
  'format.catalogsCount': '{{count}} catalogues',
  'format.noUpdatesPlanned': 'Aucune mise à jour prévue',
  'format.plannedUpdates': 'Mises à jour prévues: {{count}}',
  'format.versionConflicts': 'Conflits de version',
  'format.recommendation': 'Recommandation',
  'format.conflictsDetected': 'conflits de version détectés',

  // Table headers
  'table.header.new': 'Nouveau',

  // Statistics labels (workspaceCommand.ts)
  'stats.totalPackages': 'Paquets totaux',
  'stats.packagesWithCatalogRefs': 'Paquets avec références de catalogue',
  'stats.totalCatalogs': 'Catalogues totaux',
  'stats.catalogEntries': 'Entrées du catalogue',
  'stats.totalDependencies': 'Dépendances totales',
  'stats.catalogReferences': 'Références du catalogue',
  'stats.dependencies': 'Dépendances',
  'stats.devDependencies': 'Dépendances de développement',
  'stats.peerDependencies': 'Dépendances de pairs',
  'stats.optionalDependencies': 'Dépendances optionnelles',

  // Unit labels (cacheCommand.ts)
  'unit.bytes': 'o',
  'unit.kilobytes': 'Ko',
  'unit.megabytes': 'Mo',
  'unit.gigabytes': 'Go',

  // Global option descriptions (globalOptions.ts)
  'option.workspacePath': 'chemin du répertoire workspace',
  'option.verboseLogging': 'activer la journalisation détaillée',
  'option.noColorOutput': 'désactiver la sortie colorée',
  'option.registryUrl': 'URL du registre NPM',
  'option.timeout': "délai d'attente en millisecondes",
  'option.configPath': 'chemin vers le fichier de configuration',
  'option.catalogOnly': 'vérifier uniquement le catalogue spécifique',
  'option.outputFormat': 'format de sortie',
  'option.updateTarget': 'cible de mise à jour',
  'option.prereleaseVersions': 'inclure les versions préliminaires',
  'option.includePattern': 'inclure les paquets correspondant au motif',
  'option.excludePattern': 'exclure les paquets correspondant au motif',
  'option.interactiveMode': 'mode interactif pour choisir les mises à jour',
  'option.dryRunPreview': 'prévisualiser les changements sans écrire de fichiers',
  'option.forceRisky': 'forcer les mises à jour même si risquées',
  'option.backupFiles': 'créer des fichiers de sauvegarde avant la mise à jour',
  'option.aiAnalysis': "activer l'analyse par IA",
  'option.aiProvider': "fournisseur d'IA à utiliser",
  'option.analysisTypeOpt': "type d'analyse IA",
  'option.skipAiCache': "ignorer le cache d'analyse IA",
  'option.validateWorkspace': 'valider la configuration du workspace',
  'option.showStats': 'afficher les statistiques du workspace',
  'option.showInfo': 'afficher les informations du workspace',

  // Interactive mode titles
  'interactive.check.title': 'Commande Check - Mode Interactif',
  'interactive.update.title': 'Commande Update - Mode Interactif',
  'interactive.analyze.title': 'Commande Analyze - Mode Interactif',
  'interactive.workspace.title': 'Commande Workspace - Mode Interactif',
  'interactive.theme.title': 'Commande Theme - Mode Interactif',
  'interactive.security.title': 'Commande Security - Mode Interactif',
  'interactive.init.title': 'Commande Init - Mode Interactif',
  'interactive.ai.title': 'Commande AI - Mode Interactif',
  'interactive.cache.title': 'Commande Cache - Mode Interactif',
  'interactive.rollback.title': 'Commande Rollback - Mode Interactif',
  'interactive.watch.title': 'Commande Watch - Mode Interactif',

  // Interactive common choices - format
  'interactive.choice.format.table': 'Tableau (par défaut)',
  'interactive.choice.format.json': 'JSON',
  'interactive.choice.format.yaml': 'YAML',
  'interactive.choice.format.minimal': 'Minimal',

  // Interactive common choices - target
  'interactive.choice.target.latest': 'Dernière version (par défaut)',
  'interactive.choice.target.greatest': 'Version maximale',
  'interactive.choice.target.minor': 'Mise à jour mineure',
  'interactive.choice.target.patch': 'Mise à jour de correctif',
  'interactive.choice.target.newest': 'Dernière publication',

  // Interactive common choices - severity
  'interactive.choice.severity.low': 'Faible',
  'interactive.choice.severity.medium': 'Moyenne et supérieure',
  'interactive.choice.severity.high': 'Élevée',
  'interactive.choice.severity.critical': 'Critique',
  'interactive.choice.severity.all': 'Toutes les sévérités',

  // Interactive common choices - analysis type
  'interactive.choice.analysisType.impact': "Analyse d'impact",
  'interactive.choice.analysisType.security': 'Analyse de sécurité',
  'interactive.choice.analysisType.compatibility': 'Analyse de compatibilité',
  'interactive.choice.analysisType.recommend': 'Analyse de recommandation',

  // Interactive common choices - provider
  'interactive.choice.provider.auto': 'Automatique (par défaut)',
  'interactive.choice.provider.claude': 'Claude',
  'interactive.choice.provider.gemini': 'Gemini',
  'interactive.choice.provider.codex': 'Codex',

  // Interactive common choices - theme
  'interactive.choice.theme.default': 'Par défaut',
  'interactive.choice.theme.modern': 'Moderne',
  'interactive.choice.theme.minimal': 'Minimal',
  'interactive.choice.theme.neon': 'Néon',
  'interactive.choice.theme.ocean': 'Océan',
  'interactive.choice.theme.forest': 'Forêt',

  // Interactive prompts - check command
  'interactive.check.catalogName': 'Nom du catalogue (vide pour tous) :',
  'interactive.check.outputFormat': 'Format de sortie :',
  'interactive.check.updateTarget': 'Cible de mise à jour :',
  'interactive.check.includePrerelease': 'Inclure les préversions ?',
  'interactive.check.includePatterns':
    'Motifs à inclure (séparés par des virgules, vide pour tous) :',
  'interactive.check.excludePatterns':
    'Motifs à exclure (séparés par des virgules, vide pour aucun) :',
  'interactive.check.exitCode':
    'Quitter avec le code 1 si des mises à jour sont disponibles (pour CI) ?',

  // Interactive prompts - update command
  'interactive.update.catalogName': 'Nom du catalogue (vide pour tous) :',
  'interactive.update.outputFormat': 'Format de sortie :',
  'interactive.update.updateTarget': 'Cible de mise à jour :',
  'interactive.update.includePrerelease': 'Inclure les préversions ?',
  'interactive.update.includePatterns':
    'Motifs à inclure (séparés par des virgules, vide pour tous) :',
  'interactive.update.excludePatterns':
    'Motifs à exclure (séparés par des virgules, vide pour aucun) :',
  'interactive.update.dryRun': 'Simulation (sans modifications) ?',
  'interactive.update.force': 'Forcer la mise à jour (même si risqué) ?',
  'interactive.update.createBackup': 'Créer une sauvegarde avant la mise à jour ?',
  'interactive.update.useAi': "Activer l'analyse IA ?",
  'interactive.update.aiProvider': 'Fournisseur IA :',
  'interactive.update.analysisType': "Type d'analyse :",
  'interactive.update.runInstall': 'Exécuter pnpm install après la mise à jour ?',
  'interactive.update.showChangelog': 'Afficher le changelog ?',

  // Interactive prompts - analyze command
  'interactive.analyze.packageName': 'Nom du paquet :',
  'interactive.analyze.packageNameRequired': 'Le nom du paquet est requis',
  'interactive.analyze.catalogName': 'Nom du catalogue (vide pour détection automatique) :',
  'interactive.analyze.targetVersion': 'Nouvelle version (vide pour la dernière) :',
  'interactive.analyze.outputFormat': 'Format de sortie :',
  'interactive.analyze.useAi': "Activer l'analyse IA ?",
  'interactive.analyze.aiProvider': 'Fournisseur IA :',
  'interactive.analyze.analysisType': "Type d'analyse :",

  // Interactive prompts - workspace command
  'interactive.workspace.validate': 'Valider le workspace ?',
  'interactive.workspace.stats': 'Afficher les statistiques ?',

  // Interactive prompts - theme command
  'interactive.theme.choose': 'Sélectionner le thème :',

  // Interactive prompts - security command
  'interactive.security.action': 'Exécuter npm audit ?',
  'interactive.security.severity': 'Sévérité minimale :',
  'interactive.security.includeDev': 'Inclure les dépendances de développement ?',
  'interactive.security.useSnyk': 'Utiliser Snyk (CLI requis) ?',
  'interactive.security.outputFormat': 'Format de sortie :',

  // Interactive prompts - init command
  'interactive.init.overwrite': 'Écraser la configuration existante ?',
  'interactive.init.createWorkspace': 'Créer la structure du workspace PNPM ?',

  // Interactive prompts - ai command

  // Interactive prompts - cache command

  // Interactive prompts - rollback command

  // Interactive prompts - watch command
  'interactive.watch.debounce': 'Délai anti-rebond (ms) :',
  'interactive.watch.debouncePositive': 'Le délai anti-rebond doit être positif',
  'interactive.watch.clearConsole': 'Effacer la console à chaque vérification ?',

  // Missing interactive keys
  'interactive.update.mode': 'Mode de mise à jour :',
  'interactive.update.mode.interactive': 'Sélection interactive (choisir les paquets)',
  'interactive.update.mode.dryRun': 'Simulation (aperçu uniquement)',
  'interactive.update.mode.apply': 'Appliquer toutes les mises à jour',
  'interactive.workspace.actions': 'Que souhaitez-vous faire ?',
  'interactive.workspace.outputFormat': 'Format de sortie :',
  'interactive.theme.action': 'Que souhaitez-vous faire ?',
  'interactive.theme.action.set': 'Sélectionner et définir un thème',
  'interactive.theme.action.list': 'Lister les thèmes disponibles',
  'interactive.security.action.audit': 'Auditer les vulnérabilités',
  'interactive.security.action.fix': 'Corriger les vulnérabilités',
  'interactive.security.action.both': 'Auditer et corriger',
  'interactive.init.mode': "Mode d'initialisation :",
  'interactive.init.mode.quick': 'Configuration rapide (minimale)',
  'interactive.init.mode.full': 'Configuration complète (toutes les options)',
  'interactive.ai.action': 'Action de gestion IA :',
  'interactive.ai.action.status': "Vérifier le statut de l'IA",
  'interactive.ai.action.test': 'Tester la connexion IA',
  'interactive.ai.action.cacheStats': 'Afficher les statistiques du cache',
  'interactive.ai.action.clearCache': 'Vider le cache IA',
  'interactive.cache.action': 'Action cache :',
  'interactive.cache.action.stats': 'Afficher les statistiques du cache',
  'interactive.cache.action.clear': 'Vider le cache',
  'interactive.rollback.action': 'Action de restauration :',
  'interactive.rollback.action.list': 'Lister les sauvegardes disponibles',
  'interactive.rollback.action.latest': 'Restaurer la dernière sauvegarde',
  'interactive.rollback.action.deleteAll': 'Supprimer toutes les sauvegardes',
  'interactive.watch.catalogName': 'Nom du catalogue à surveiller (vide pour tous) :',
  'interactive.watch.updateTarget': 'Cible de mise à jour :',
  'interactive.watch.includePrerelease': 'Inclure les versions préliminaires ?',
  'interactive.watch.outputFormat': 'Format de sortie :',

  // Interactive cancelled message
  'interactive.cancelled': 'Opération annulée',

  // Interactive command subtitles, intros, and completion messages
  'interactive.check.subtitle': 'Vérifier les versions obsolètes des dépendances du catalogue',
  'interactive.check.intro': 'Veuillez configurer les options de vérification',
  'interactive.check.ready': 'Configuration terminée ! Démarrage de la vérification...',
  'interactive.check.catalogPlaceholder': 'ex. default, react',
  'interactive.check.patternPlaceholder': 'ex. react*, @types/*',

  'interactive.update.subtitle':
    'Mettre à jour les dépendances du catalogue vers de nouvelles versions',
  'interactive.update.intro': 'Veuillez configurer les options de mise à jour',
  'interactive.update.ready': 'Configuration terminée ! Démarrage de la mise à jour...',
  'interactive.update.catalogPlaceholder': 'ex. default, react',
  'interactive.update.mode.interactiveHint':
    'Sélectionner manuellement les paquets à mettre à jour',
  'interactive.update.mode.dryRunHint': 'Aperçu des modifications sans modifier',
  'interactive.update.mode.applyHint': 'Appliquer directement toutes les mises à jour disponibles',

  'interactive.analyze.subtitle': "Analyser l'impact des mises à jour de paquets",
  'interactive.analyze.intro': "Veuillez configurer les options d'analyse",
  'interactive.analyze.ready': "Configuration terminée ! Démarrage de l'analyse...",
  'interactive.analyze.packagePlaceholder': 'ex. lodash, react',
  'interactive.analyze.versionPlaceholder': 'Vide pour la dernière version, ex. 18.2.0, ^19.0.0',
  'interactive.analyze.catalogPlaceholder': 'Vide pour détection automatique',

  'interactive.workspace.subtitle': 'Afficher et valider les informations du workspace',
  'interactive.workspace.intro': 'Veuillez sélectionner une action',
  'interactive.workspace.ready': "Configuration terminée ! Exécution de l'action...",
  'interactive.workspace.validateHint': 'Valider la configuration du workspace',
  'interactive.workspace.statsHint': 'Afficher les statistiques du workspace',

  'interactive.theme.subtitle': 'Configurer le thème de couleurs du CLI',
  'interactive.theme.intro': 'Veuillez sélectionner une action de thème',
  'interactive.theme.ready': 'Configuration terminée ! Application du thème...',

  'interactive.security.subtitle': 'Analyser et corriger les vulnérabilités de sécurité',
  'interactive.security.intro': 'Veuillez configurer les options de sécurité',
  'interactive.security.ready': "Configuration terminée ! Démarrage de l'analyse de sécurité...",

  'interactive.init.subtitle': 'Initialiser la configuration PCU',
  'interactive.init.intro': "Veuillez sélectionner le mode d'initialisation",
  'interactive.init.ready': 'Configuration terminée ! Initialisation en cours...',

  'interactive.cache.subtitle': 'Gérer le cache PCU',
  'interactive.cache.intro': 'Veuillez sélectionner une action de cache',
  'interactive.cache.ready': "Configuration terminée ! Exécution de l'action...",

  'interactive.rollback.subtitle': 'Revenir à une version précédente',
  'interactive.rollback.intro': 'Veuillez sélectionner une action de restauration',
  'interactive.rollback.ready': 'Configuration terminée ! Démarrage de la restauration...',

  'interactive.watch.subtitle': 'Surveiller et vérifier les mises à jour de dépendances',
  'interactive.watch.intro': 'Veuillez configurer les options de surveillance',
  'interactive.watch.ready': 'Configuration terminée ! Démarrage du mode surveillance...',
  'interactive.watch.catalogPlaceholder': 'ex. default, react',

  // Interactive choice hints - format
  'interactive.choice.format.tableHint': 'Idéal pour la visualisation en terminal',
  'interactive.choice.format.jsonHint': 'Idéal pour le traitement programmatique',
  'interactive.choice.format.yamlHint': 'Idéal pour les fichiers de configuration',
  'interactive.choice.format.minimalHint': 'Afficher uniquement les informations clés',

  // Interactive choice hints - target
  'interactive.choice.target.latestHint': 'Recommandé, dernière version stable',
  'interactive.choice.target.greatestHint': 'Inclut les versions préliminaires',
  'interactive.choice.target.minorHint': 'Sûr, rétrocompatible',
  'interactive.choice.target.patchHint': 'Le plus sûr, corrections de bugs uniquement',
  'interactive.choice.target.newestHint': 'Trié par date de publication',

  // Interactive action hints
  'interactive.workspace.action.validateHint':
    'Vérifier les problèmes de configuration du workspace',
  'interactive.workspace.action.statsHint': 'Afficher les statistiques détaillées du workspace',

  'interactive.theme.action.setHint': 'Choisir et appliquer un nouveau thème',
  'interactive.theme.action.listHint': 'Afficher tous les thèmes disponibles',

  'interactive.security.action.auditHint': 'Analyser les vulnérabilités de sécurité',
  'interactive.security.action.fixHint': 'Corriger automatiquement les vulnérabilités',
  'interactive.security.action.bothHint': 'Analyser et corriger en une étape',

  'interactive.init.mode.quickHint': 'Configuration rapide avec les valeurs par défaut',
  'interactive.init.mode.fullHint': 'Configurer toutes les options disponibles',

  'interactive.cache.action.statsHint': "Afficher les statistiques d'utilisation du cache",
  'interactive.cache.action.clearHint': 'Effacer toutes les données en cache',

  'interactive.rollback.action.listHint': 'Afficher toutes les sauvegardes disponibles',
  'interactive.rollback.action.latestHint': 'Restaurer la sauvegarde la plus récente',
  'interactive.rollback.action.deleteAllHint': 'Supprimer tous les fichiers de sauvegarde',

  // Update reason messages (DOC-001: i18n for update reasons)
  'update.reason.security': 'Mise à jour de sécurité disponible',
  'update.reason.major': 'Mise à jour de version majeure disponible',
  'update.reason.minor': 'Mise à jour de version mineure disponible',
  'update.reason.patch': 'Mise à jour de correctif disponible',
  'update.reason.default': 'Mise à jour disponible',
}
