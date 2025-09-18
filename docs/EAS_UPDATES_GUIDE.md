# EAS Updates Guide for VoiceApp Me

## 🚀 Overview

EAS Update enables you to push small bug fixes and updates to your VoiceApp Me users immediately, without waiting for app store approvals. This is perfect for:

- 🐛 Bug fixes
- 🎨 UI/UX improvements  
- 📝 Content updates
- ⚡ Performance optimizations
- 🔧 Configuration changes

## 📋 How It Works

EAS Update works in two layers as shown in the Expo documentation:

### Update Layer (Can Change)
- JavaScript/TypeScript code
- Image assets
- App configuration
- Business logic

### Native Layer (Cannot Change)
- App config (name, bundle ID)
- Native code modifications
- App icons and splash screens
- Permissions

**Important**: Changes to the native layer require a full app store build and release.

## 🛠️ Setup Complete

Your VoiceApp Me app is already configured with EAS Updates:

### Configuration Files
- ✅ `app.config.js` - Update settings configured
- ✅ `eas.json` - Update channels defined
- ✅ `utils/updateManager.js` - Update logic implemented
- ✅ `scripts/deploy-update.js` - Deployment automation

### Update Channels
- **development** - For development testing
- **preview** - For preview builds and testing
- **production** - For production users

## 📱 Deployment Commands

### Quick Commands
```bash
# Deploy to preview channel (default)
npm run update

# Deploy to development channel  
npm run update:dev

# Deploy to preview channel
npm run update:preview

# Deploy to production (requires --force)
npm run update:production

# List recent updates
npm run update:list
```

### Advanced Commands
```bash
# Custom message
node scripts/deploy-update.js preview --message "Fixed AdOnMute tool bug"

# Force deployment (skip validation)
node scripts/deploy-update.js preview --force

# Production deployment
node scripts/deploy-update.js production --message "Critical security fix" --force
```

## 🔄 Update Flow

### 1. Development Workflow
```bash
# Make your changes to code
git add .
git commit -m "Fix: AdOnMute tool navigation issue"

# Deploy update
npm run update:preview

# Test on device with preview build
```

### 2. Automatic Updates
Your app automatically:
- ✅ Checks for updates on app launch
- ✅ Downloads updates in the background
- ✅ Prompts user to apply updates
- ✅ Handles critical vs. optional updates

### 3. Manual Updates
Users can also:
- Pull down to refresh (if implemented)
- Restart the app to check for updates
- Update through in-app settings

## 🎯 Best Practices

### When to Use Updates
- ✅ JavaScript/TypeScript code changes
- ✅ Asset updates (images, fonts)
- ✅ Configuration changes
- ✅ Bug fixes
- ✅ Content updates

### When to Use Full Builds
- ❌ App name or bundle identifier changes
- ❌ New native dependencies
- ❌ Permission changes
- ❌ New app icons
- ❌ Native code modifications

### Update Strategy
1. **Small, Frequent Updates** - Better than large infrequent ones
2. **Test Thoroughly** - Use preview channel first
3. **Rollback Plan** - Keep previous builds available
4. **User Communication** - Clear update messages

## 📊 Monitoring Updates

### View Update Status
```bash
# List recent updates
npm run update:list

# Check specific update
npx eas update:view [UPDATE_ID]

# View update branches
npx eas update:list --channel preview
```

### Update Logs
- Updates are logged in `deployment/logs/updates.json`
- Includes timestamps, channels, and success status
- Automatic cleanup (keeps last 50 entries)

## 🐛 Troubleshooting

### Common Issues

#### Update Not Appearing
```bash
# Check update was published
npm run update:list

# Force refresh on device
# - Close and reopen app
# - Or pull down to refresh
```

#### Update Fails to Apply
```bash
# Check app logs
npx expo logs

# Verify runtime version compatibility
# - Both build and update must have same runtime version
```

#### Build vs Update Confusion
- **Build**: Full native app package (.ipa/.apk)
- **Update**: JavaScript layer only
- Updates only work with compatible builds

### Debug Commands
```bash
# Check current update info
npx eas update:list --channel preview

# View specific update details  
npx eas update:view [UPDATE_ID]

# Check app configuration
npx expo config
```

## 🚀 Quick Start Examples

### Example 1: Bug Fix
```bash
# Fix bug in your code
# Commit changes
git commit -m "fix: AdOnMute tool button styling"

# Deploy update
npm run update --message "Fixed button styling in AdOnMute tool"
```

### Example 2: Content Update
```bash
# Update app content
# Commit changes  
git commit -m "update: new welcome messages"

# Deploy to preview first
npm run update:preview --message "Updated welcome messages"

# Test, then deploy to production
npm run update:production --message "Updated welcome messages"
```

### Example 3: Critical Fix
```bash
# Fix critical security issue
git commit -m "security: fix user data exposure"

# Deploy immediately to production
npm run update:production --message "Critical security fix" --force
```

## 📋 Current Setup Status

### ✅ What's Configured
- EAS Update enabled in app config
- Update channels (dev, preview, production)
- Automatic update checking
- Update manager with user prompts
- Deployment scripts with validation
- Update logging system

### 🎯 What You Can Do Now
1. **Make Code Changes** - Modify JS/TS, assets, config
2. **Deploy Updates** - Use npm run update commands
3. **Test Updates** - Apps will auto-update based on channel
4. **Monitor Updates** - View logs and update history
5. **Rollback if Needed** - Deploy previous version as new update

### 📱 User Experience
- Users get automatic update notifications
- Critical updates are mandatory
- Optional updates can be postponed
- Seamless background downloads
- Quick app restart to apply

## 🔗 Useful Links

- [Expo EAS Update Docs](https://docs.expo.dev/eas-update/introduction/)
- [Update Best Practices](https://docs.expo.dev/eas-update/optimize-updates/)
- [Rollback Guide](https://docs.expo.dev/eas-update/rollbacks/)
- [Update Channels](https://docs.expo.dev/eas-update/how-it-works/#channels)

---

**🎉 Your VoiceApp Me app now has professional over-the-air update capabilities!**

You can push updates to users instantly without app store approval processes, making your app more agile and responsive to user needs.