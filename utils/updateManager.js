// EAS Update Manager for VoiceApp Me
// Handles over-the-air updates seamlessly

import * as Updates from 'expo-updates';
import { Alert, Platform } from 'react-native';

export class UpdateManager {
  static isUpdateAvailable = false;
  static updateInfo = null;

  /**
   * Check for available updates
   */
  static async checkForUpdate() {
    try {
      if (__DEV__) {
        console.log('🔄 Running in development mode - skipping update check');
        return null;
      }

      console.log('🔄 Checking for updates...');
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        this.isUpdateAvailable = true;
        this.updateInfo = update;
        console.log('✅ Update available:', update);
        return update;
      } else {
        console.log('📱 App is up to date');
        return null;
      }
    } catch (error) {
      console.error('❌ Error checking for updates:', error);
      return null;
    }
  }

  /**
   * Download and install update
   */
  static async downloadAndInstallUpdate() {
    try {
      if (!this.isUpdateAvailable || !this.updateInfo) {
        console.log('⚠️ No update available to install');
        return false;
      }

      console.log('⬇️ Downloading update...');
      const downloadResult = await Updates.fetchUpdateAsync();
      
      if (downloadResult.isNew) {
        console.log('🎉 Update downloaded successfully');
        
        Alert.alert(
          '🚀 Update Ready',
          'A new version of VoiceApp Me has been downloaded. The app will restart to apply the update.',
          [
            {
              text: 'Later',
              style: 'cancel',
              onPress: () => console.log('📌 Update postponed by user')
            },
            {
              text: 'Update Now',
              onPress: () => this.applyUpdate(),
              style: 'default'
            }
          ]
        );
        
        return true;
      } else {
        console.log('📱 No new update to install');
        return false;
      }
    } catch (error) {
      console.error('❌ Error downloading update:', error);
      
      Alert.alert(
        'Update Error',
        'Failed to download the update. Please try again later.',
        [{ text: 'OK' }]
      );
      
      return false;
    }
  }

  /**
   * Apply the downloaded update (restarts the app)
   */
  static async applyUpdate() {
    try {
      console.log('🔄 Applying update...');
      await Updates.reloadAsync();
    } catch (error) {
      console.error('❌ Error applying update:', error);
      
      Alert.alert(
        'Update Error',
        'Failed to apply the update. Please restart the app manually.',
        [{ text: 'OK' }]
      );
    }
  }

  /**
   * Check and handle updates automatically
   */
  static async handleAutomaticUpdate() {
    try {
      const updateInfo = await this.checkForUpdate();
      
      if (updateInfo) {
        // For critical updates, show immediate prompt
        if (updateInfo.manifest?.metadata?.critical) {
          Alert.alert(
            '🚨 Critical Update Available',
            'A critical update is available for VoiceApp Me. This update includes important security fixes and improvements.',
            [
              {
                text: 'Update Now',
                onPress: () => this.downloadAndInstallUpdate(),
                style: 'default'
              }
            ]
          );
        } else {
          // For regular updates, show optional prompt
          Alert.alert(
            '🎉 Update Available',
            'A new version of VoiceApp Me is available with bug fixes and improvements.',
            [
              {
                text: 'Later',
                style: 'cancel'
              },
              {
                text: 'Update',
                onPress: () => this.downloadAndInstallUpdate(),
                style: 'default'
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error('❌ Error in automatic update check:', error);
    }
  }

  /**
   * Get current update information
   */
  static async getCurrentUpdateInfo() {
    try {
      if (__DEV__) {
        return {
          isEmbeddedLaunch: true,
          channel: 'development',
          updateId: 'dev-build',
          createdAt: new Date(),
          runtimeVersion: Updates.runtimeVersion
        };
      }

      return {
        isEmbeddedLaunch: Updates.isEmbeddedLaunch,
        channel: Updates.channel,
        updateId: Updates.updateId,
        createdAt: Updates.createdAt,
        runtimeVersion: Updates.runtimeVersion,
        isEmergencyLaunch: Updates.isEmergencyLaunch
      };
    } catch (error) {
      console.error('❌ Error getting update info:', error);
      return null;
    }
  }

  /**
   * Initialize update manager
   */
  static async initialize() {
    try {
      console.log('🚀 Initializing UpdateManager...');
      
      const currentInfo = await this.getCurrentUpdateInfo();
      console.log('📱 Current app info:', currentInfo);
      
      // Set up update event listeners
      if (!__DEV__) {
        // Check for updates when app becomes active
        this.setupUpdateListeners();
        
        // Perform initial update check
        setTimeout(() => {
          this.handleAutomaticUpdate();
        }, 3000); // Wait 3 seconds after app startup
      }
      
      return currentInfo;
    } catch (error) {
      console.error('❌ Error initializing UpdateManager:', error);
      return null;
    }
  }

  /**
   * Set up update event listeners
   */
  static setupUpdateListeners() {
    try {
      // Listen for app state changes to check for updates
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const { AppState } = require('react-native');
        
        AppState.addEventListener('change', (nextAppState) => {
          if (nextAppState === 'active') {
            // Check for updates when app becomes active
            setTimeout(() => {
              this.checkForUpdate();
            }, 1000);
          }
        });
      }
    } catch (error) {
      console.error('❌ Error setting up update listeners:', error);
    }
  }

  /**
   * Force reload the app
   */
  static async forceReload() {
    try {
      console.log('🔄 Force reloading app...');
      await Updates.reloadAsync();
    } catch (error) {
      console.error('❌ Error force reloading:', error);
    }
  }

  /**
   * Get update status for UI display
   */
  static getUpdateStatus() {
    return {
      isUpdateAvailable: this.isUpdateAvailable,
      updateInfo: this.updateInfo,
      canUpdate: !__DEV__ && this.isUpdateAvailable
    };
  }
}

// Export convenience functions
export const checkForUpdate = () => UpdateManager.checkForUpdate();
export const downloadAndInstallUpdate = () => UpdateManager.downloadAndInstallUpdate();
export const getCurrentUpdateInfo = () => UpdateManager.getCurrentUpdateInfo();
export const initializeUpdates = () => UpdateManager.initialize();

export default UpdateManager;