/**
 * User-Friendly Error Handler
 *
 * Provides user-friendly error messages instead of exposing technical details.
 * Categorizes errors and provides helpful suggestions where possible.
 */

import chalk from 'chalk';
import { Logger } from '../logger/Logger.js';
import { ErrorTracker } from './ErrorTracker.js';

export interface ErrorContext {
  packageName?: string;
  operation?: string;
  details?: string;
}

export interface PackageSuggestion {
  original: string;
  suggestions: string[];
  reason: string;
}

export class UserFriendlyErrorHandler {
  private static logger = Logger.getLogger('ErrorHandler');

  // Common package name corrections
  private static packageSuggestions: Map<string, string[]> = new Map([
    // Framework packages
    ['sveltekit', ['@sveltejs/kit']],
    ['vue-router', ['vue-router']],
    ['vue-cli', ['@vue/cli']],
    ['angular-cli', ['@angular/cli']],
    ['angular-core', ['@angular/core']],
    ['angular-universal', ['@nguniversal/express-engine', '@angular/universal']],
    ['react-router', ['react-router-dom']],
    ['react-dom', ['react-dom']],
    ['nextjs', ['next']],
    ['nuxtjs', ['nuxt']],

    // UI Libraries
    ['material-ui', ['@mui/material', '@material-ui/core']],
    ['mui', ['@mui/material']],
    ['antd', ['antd']],
    ['ant-design', ['antd']],
    ['prime-ng', ['primeng']],
    ['primeng', ['primeng']],
    ['ng-zorro', ['ng-zorro-antd']],
    ['bootstrap-vue', ['bootstrap-vue']],
    ['vuetify', ['vuetify']],
    ['quasar', ['quasar']],
    ['onsen-ui', ['onsenui']],
    ['ionic', ['@ionic/angular', '@ionic/react', '@ionic/vue']],

    // CSS Frameworks
    ['tailwindcss', ['tailwindcss']],
    ['tailwind', ['tailwindcss']],
    ['bulma', ['bulma']],
    ['water-css', ['water.css']],
    ['holiday-css', ['@holiday-css/main']],
    ['wing-css', ['@wing-css/wing']],
    ['picnic-css', ['picnicss']],

    // Build Tools & Bundlers
    ['webpack', ['webpack']],
    ['webpack-cli', ['webpack-cli']],
    ['rollup', ['rollup']],
    ['vite', ['vite']],
    ['parcel', ['parcel']],
    ['esbuild', ['esbuild']],
    ['swc', ['@swc/core']],

    // Testing
    ['jest', ['jest']],
    ['vitest', ['vitest']],
    ['mocha', ['mocha']],
    ['chai', ['chai']],
    ['cypress', ['cypress']],
    ['playwright', ['@playwright/test']],
    ['puppeteer', ['puppeteer']],
    ['selenium', ['selenium-webdriver']],
    ['webdriver', ['selenium-webdriver']],
    ['lambdatest', ['@lambdatest/selenium-webdriver']],
    ['applitools', ['@applitools/eyes-selenium']],
    ['experitest', ['@experitest/seetest-client']],
    ['kobiton', ['@kobiton/api']],
    ['crossbrowsertesting', ['@crossbrowsertesting/selenium']],

    // Cloud Services
    ['aws-sdk', ['@aws-sdk/client-s3', 'aws-sdk']],
    ['aws-device-farm', ['@aws-sdk/client-device-farm']],
    ['firebase', ['firebase']],
    ['firebase-test-lab', ['@google-cloud/testing']],
    ['azure', ['@azure/storage-blob', '@azure/cosmos']],
    ['azure-devtest-labs', ['@azure/arm-devtestlabs']],
    ['gcp', ['@google-cloud/storage']],

    // Databases & ORMs
    ['mongoose', ['mongoose']],
    ['sequelize', ['sequelize']],
    ['typeorm', ['typeorm']],
    ['prisma', ['@prisma/client']],
    ['knex', ['knex']],
    ['pg', ['pg']],
    ['mysql', ['mysql2']],
    ['sqlite', ['sqlite3']],
    ['redis', ['redis']],
    ['mongodb', ['mongodb']],

    // Utilities
    ['lodash', ['lodash']],
    ['loadash', ['lodash']],
    ['underscore', ['underscore']],
    ['ramda', ['ramda']],
    ['rxjs', ['rxjs']],
    ['axios', ['axios']],
    ['axois', ['axios']],
    ['fetch', ['node-fetch']],
    ['node-fetch', ['node-fetch']],
    ['request', ['axios', 'node-fetch']],
    ['superagent', ['superagent']],

    // Date/Time
    ['moment', ['moment']],
    ['momentjs', ['moment']],
    ['dayjs', ['dayjs']],
    ['date-fns', ['date-fns']],
    ['luxon', ['luxon']],

    // Linting & Formatting
    ['eslint', ['eslint']],
    ['prettier', ['prettier']],
    ['tslint', ['@typescript-eslint/eslint-plugin']],
    ['typescript-eslint', ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']],

    // Type Definitions
    ['types-node', ['@types/node']],
    ['@types-node', ['@types/node']],
    ['types-react', ['@types/react']],
    ['types-express', ['@types/express']],

    // Backend Frameworks
    ['express', ['express']],
    ['expressjs', ['express']],
    ['fastify', ['fastify']],
    ['koa', ['koa']],
    ['nestjs', ['@nestjs/core']],
    ['nest', ['@nestjs/core']],
    ['hapi', ['@hapi/hapi']],

    // State Management
    ['redux', ['redux']],
    ['mobx', ['mobx']],
    ['vuex', ['vuex']],
    ['pinia', ['pinia']],
    ['zustand', ['zustand']],
    ['recoil', ['recoil']],

    // Styling
    ['styled-components', ['styled-components']],
    ['styled-component', ['styled-components']],
    ['emotion', ['@emotion/react']],
    ['sass', ['sass']],
    ['node-sass', ['sass']],
    ['less', ['less']],
    ['stylus', ['stylus']],

    // Admin/CMS
    ['forestadmin', ['forest-express', 'forest-express-sequelize']],
    ['strapi', ['@strapi/strapi']],
    ['keystone', ['@keystone-6/core']],
    ['ghost', ['ghost']],

    // Documentation
    ['storybook', ['@storybook/react', '@storybook/vue3']],
    ['docusaurus', ['@docusaurus/core']],
    ['gitbook', ['@gitbook/cli']],
    ['typedoc', ['typedoc']],

    // Desktop Apps
    ['electron', ['electron']],
    ['tauri', ['@tauri-apps/api']],
    ['nwjs', ['nw']],

    // Mobile Development
    ['react-native', ['react-native']],
    ['expo', ['expo']],
    ['cordova', ['cordova']],
    ['phonegap', ['phonegap']],

    // Common Misspellings
    ['jquery', ['jquery']],
    ['boostrap', ['bootstrap']],
    ['bootstrap', ['bootstrap']],
    ['fontawesome', ['@fortawesome/fontawesome-free']],
    ['font-awesome', ['@fortawesome/fontawesome-free']],

    // Internationalization
    ['react-i18n', ['react-i18next']],
    ['i18n', ['i18next']],
    ['i18next', ['i18next']],
    ['vue-i18n', ['vue-i18n']],
    ['react-intl', ['react-intl']],
    ['intl', ['intl']],

    // Data Visualization & Charts
    ['chart', ['chart.js']],
    ['chartjs', ['chart.js']],
    ['chart.js', ['chart.js']],
    ['d3', ['d3']],
    ['d3js', ['d3']],
    ['plotly', ['plotly.js']],
    ['echarts', ['echarts']],
    ['highcharts', ['highcharts']],
    ['recharts', ['recharts']],
    ['victory', ['victory']],
    ['nivo', ['@nivo/core']],
    ['observable', ['@observablehq/plot']],

    // Real-time Communication & WebRTC
    ['socket.io', ['socket.io']],
    ['socketio', ['socket.io']],
    ['websocket', ['ws']],
    ['ws', ['ws']],
    ['webrtc', ['simple-peer']],
    ['peer', ['peerjs']],
    ['peerjs', ['peerjs']],
    ['signalr', ['@microsoft/signalr']],

    // Blockchain & Web3
    ['web3', ['web3']],
    ['web3js', ['web3']],
    ['ethers', ['ethers']],
    ['ethersjs', ['ethers']],
    ['ethereum', ['web3', 'ethers']],
    ['metamask', ['@metamask/sdk']],
    ['wagmi', ['wagmi']],
    ['rainbow-kit', ['@rainbow-me/rainbowkit']],
    ['wallet-connect', ['@walletconnect/client']],

    // Machine Learning & AI
    ['tensorflow', ['@tensorflow/tfjs']],
    ['tensorflowjs', ['@tensorflow/tfjs']],
    ['tfjs', ['@tensorflow/tfjs']],
    ['brain', ['brain.js']],
    ['brainjs', ['brain.js']],
    ['synaptic', ['synaptic']],
    ['ml-matrix', ['ml-matrix']],
    ['opencv', ['opencv4nodejs']],

    // Image Processing
    ['sharp', ['sharp']],
    ['jimp', ['jimp']],
    ['canvas', ['canvas']],
    ['fabric', ['fabric']],
    ['fabricjs', ['fabric']],
    ['konva', ['konva']],
    ['konvajs', ['konva']],
    ['p5', ['p5']],
    ['p5js', ['p5']],
    ['three', ['three']],
    ['threejs', ['three']],

    // Audio/Video Processing
    ['howler', ['howler']],
    ['howlerjs', ['howler']],
    ['tone', ['tone']],
    ['tonejs', ['tone']],
    ['video', ['video.js']],
    ['videojs', ['video.js']],
    ['hls', ['hls.js']],
    ['hlsjs', ['hls.js']],
    ['dash', ['dashjs']],
    ['dashjs', ['dashjs']],

    // Game Development
    ['phaser', ['phaser']],
    ['phaserjs', ['phaser']],
    ['pixijs', ['pixi.js']],
    ['pixi', ['pixi.js']],
    ['babylonjs', ['babylonjs']],
    ['babylon', ['babylonjs']],
    ['aframe', ['aframe']],

    // IoT & Hardware
    ['johnny-five', ['johnny-five']],
    ['arduino', ['johnny-five']],
    ['raspberry-pi', ['raspi']],
    ['raspi', ['raspi']],
    ['serialport', ['serialport']],
    ['noble', ['noble']],
    ['bluetooth', ['noble']],

    // Progressive Web Apps
    ['workbox', ['workbox-webpack-plugin']],
    ['sw-precache', ['workbox-webpack-plugin']],
    ['service-worker', ['workbox-webpack-plugin']],
    ['pwa', ['workbox-webpack-plugin']],

    // Map & Geolocation
    ['leaflet', ['leaflet']],
    ['mapbox', ['mapbox-gl']],
    ['google-maps', ['@googlemaps/js-api-loader']],
    ['googlemaps', ['@googlemaps/js-api-loader']],
    ['openlayers', ['ol']],
    ['ol', ['ol']],

    // Animation
    ['gsap', ['gsap']],
    ['anime', ['animejs']],
    ['animejs', ['animejs']],
    ['lottie', ['lottie-web']],
    ['lottie-web', ['lottie-web']],
    ['framer-motion', ['framer-motion']],
    ['react-spring', ['react-spring']],

    // Form & Validation
    ['formik', ['formik']],
    ['react-hook-form', ['react-hook-form']],
    ['yup', ['yup']],
    ['joi', ['joi']],
    ['ajv', ['ajv']],
    ['zod', ['zod']],
    ['superstruct', ['superstruct']],

    // Editor & Rich Text
    ['quill', ['quill']],
    ['quilljs', ['quill']],
    ['tinymce', ['tinymce']],
    ['ckeditor', ['@ckeditor/ckeditor5-build-classic']],
    ['slate', ['slate']],
    ['slatejs', ['slate']],
    ['draft', ['draft-js']],
    ['draftjs', ['draft-js']],
    ['monaco', ['monaco-editor']],
    ['monaco-editor', ['monaco-editor']],

    // HTTP & API
    ['apollo', ['@apollo/client']],
    ['apollo-client', ['@apollo/client']],
    ['graphql', ['graphql']],
    ['relay', ['react-relay']],
    ['urql', ['urql']],
    ['swr', ['swr']],
    ['react-query', ['@tanstack/react-query']],
    ['tanstack-query', ['@tanstack/react-query']],

    // More Common Typos
    ['reac', ['react']],
    ['reactjs', ['react']],
    ['veu', ['vue']],
    ['vuejs', ['vue']],
    ['angualr', ['@angular/core']],
    ['svelt', ['svelte']],
    ['sveltte', ['svelte']],
    ['typescirpt', ['typescript']],
    ['typescript', ['typescript']],
    ['javasript', ['node']],
    ['javascript', ['node']],
  ]);

  /**
   * Handle package not found errors (404)
   */
  static handlePackageNotFound(packageName: string, context?: ErrorContext): void {
    const suggestions = this.packageSuggestions.get(packageName);

    if (suggestions && suggestions.length > 0) {
      console.log(chalk.yellow(`⚠️  包 "${packageName}" 不存在`));
      console.log(chalk.cyan(`💡 可能的正确包名:`));
      suggestions.forEach((suggestion) => {
        console.log(chalk.cyan(`   • ${suggestion}`));
      });
    } else {
      console.log(chalk.yellow(`⚠️  包 "${packageName}" 在 npm registry 中不存在`));
      console.log(chalk.cyan(`💡 请检查包名是否正确，或者该包可能已被移除`));
    }

    // Track for summary
    ErrorTracker.trackSkippedPackage(packageName, new Error('Package not found (404)'));

    // Log technical details for debugging
    this.logger.debug('Package not found', { packageName, context });
  }

  /**
   * Handle empty version errors
   */
  static handleEmptyVersion(packageName: string, context?: ErrorContext): void {
    console.log(chalk.yellow(`⚠️  包 "${packageName}" 的版本信息为空`));
    console.log(chalk.cyan(`💡 这可能是由于:`));
    console.log(chalk.cyan(`   • 包的 package.json 配置问题`));
    console.log(chalk.cyan(`   • catalog 配置中的版本格式错误`));
    console.log(chalk.cyan(`   • npm registry 数据同步问题`));

    // Track for summary
    ErrorTracker.trackSkippedPackage(packageName, new Error('Version string cannot be empty'));

    this.logger.debug('Empty version string', { packageName, context });
  }

  /**
   * Handle network/timeout errors
   */
  static handleNetworkError(packageName: string, error: Error, context?: ErrorContext): void {
    console.log(chalk.yellow(`⚠️  检查包 "${packageName}" 时遇到网络问题`));
    console.log(chalk.cyan(`💡 请稍后重试，或检查网络连接`));

    // Track for summary
    ErrorTracker.trackSkippedPackage(packageName, error);

    this.logger.debug('Network error', { packageName, error: error.message, context });
  }

  /**
   * Handle security check failures
   */
  static handleSecurityCheckFailure(
    packageName: string,
    error: Error,
    context?: ErrorContext
  ): void {
    // Track for statistics
    ErrorTracker.trackSecurityFailure();

    // Only show user-friendly message, don't expose technical details
    this.logger.debug(`Security check failed for ${packageName}`, {
      error: error.message,
      context,
    });

    // Don't spam the user with security check failures unless it's critical
    if (context?.operation === 'update' || context?.operation === 'security-audit') {
      console.log(chalk.yellow(`⚠️  无法检查 "${packageName}" 的安全状态`));
    }
  }

  /**
   * Handle retry attempts silently
   */
  static handleRetryAttempt(
    packageName: string,
    attempt: number,
    maxRetries: number,
    error: Error
  ): void {
    // Log for debugging but don't spam users
    this.logger.debug(`Retry attempt ${attempt}/${maxRetries} for ${packageName}`, {
      error: error.message,
    });

    // Only show to user on final failure
    if (attempt === maxRetries) {
      this.handleFinalFailure(packageName, error);
    }
  }

  /**
   * Handle final failure after retries
   */
  static handleFinalFailure(packageName: string, error: Error): void {
    if (error.message.includes('404') || error.message.includes('Not found')) {
      this.handlePackageNotFound(packageName);
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      this.handleNetworkError(packageName, error);
    } else if (error.message.includes('Version string cannot be empty')) {
      this.handleEmptyVersion(packageName);
    } else {
      // Generic error handling
      console.log(chalk.yellow(`⚠️  跳过包 "${packageName}" (检查失败)`));
      this.logger.debug('Package check failed', { packageName, error: error.message });
    }
  }

  /**
   * Handle general package query failures
   */
  static handlePackageQueryFailure(
    packageName: string,
    error: Error,
    context?: ErrorContext
  ): void {
    // Categorize the error and provide appropriate user message
    if (error.message.includes('404') || error.message.includes('Not found')) {
      this.handlePackageNotFound(packageName, context);
    } else if (error.message.includes('Version string cannot be empty')) {
      this.handleEmptyVersion(packageName, context);
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      this.handleNetworkError(packageName, error, context);
    } else {
      // For other errors, just skip silently and log for debugging
      ErrorTracker.trackSkippedPackage(packageName, error);
      this.logger.debug(`Package query failed for ${packageName}`, {
        error: error.message,
        context,
      });
    }
  }

  /**
   * Show summary of skipped packages
   */
  static showSkippedPackagesSummary(): void {
    const totalSkipped = ErrorTracker.getTotalSkipped();
    if (totalSkipped === 0) return;

    console.log();
    console.log(chalk.cyan(`📋 跳过了 ${totalSkipped} 个包的检查:`));

    const grouped = ErrorTracker.getSkippedPackages();

    if (grouped.notFound.length > 0) {
      console.log(
        chalk.yellow(`   不存在的包 (${grouped.notFound.length}): ${grouped.notFound.join(', ')}`)
      );
    }

    if (grouped.emptyVersion.length > 0) {
      console.log(
        chalk.yellow(
          `   版本信息为空 (${grouped.emptyVersion.length}): ${grouped.emptyVersion.join(', ')}`
        )
      );
    }

    if (grouped.network.length > 0) {
      console.log(
        chalk.yellow(`   网络问题 (${grouped.network.length}): ${grouped.network.join(', ')}`)
      );
    }

    if (grouped.other.length > 0) {
      console.log(
        chalk.yellow(`   其他问题 (${grouped.other.length}): ${grouped.other.join(', ')}`)
      );
    }

    const stats = ErrorTracker.getErrorStats();
    if (stats.security > 0) {
      console.log(chalk.gray(`   安全检查失败: ${stats.security} 次`));
    }
  }

  /**
   * Get statistics for reporting
   */
  static getStatistics(): {
    totalSkipped: number;
    errorBreakdown: ReturnType<typeof ErrorTracker.getErrorStats>;
    skippedPackages: ReturnType<typeof ErrorTracker.getSkippedPackages>;
  } {
    return {
      totalSkipped: ErrorTracker.getTotalSkipped(),
      errorBreakdown: ErrorTracker.getErrorStats(),
      skippedPackages: ErrorTracker.getSkippedPackages(),
    };
  }

  /**
   * Reset error tracking (useful for testing)
   */
  static resetTracking(): void {
    ErrorTracker.reset();
  }

  /**
   * Add a new package suggestion
   */
  static addPackageSuggestion(originalName: string, suggestions: string[]): void {
    this.packageSuggestions.set(originalName, suggestions);
  }

  /**
   * Get suggestions for a package name
   */
  static getPackageSuggestions(packageName: string): string[] {
    return this.packageSuggestions.get(packageName) || [];
  }
}
