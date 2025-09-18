#!/usr/bin/env node

// EAS Update Deployment Script for VoiceApp Me
// Automates the process of publishing over-the-air updates

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHANNELS = {
  development: 'development',
  preview: 'preview', 
  production: 'production'
};

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function getGitInfo() {
  try {
    const { stdout: hash } = await execAsync('git rev-parse --short HEAD');
    const { stdout: message } = await execAsync('git log -1 --pretty=%B');
    const { stdout: branch } = await execAsync('git branch --show-current');
    
    return {
      hash: hash.trim(),
      message: message.trim(),
      branch: branch.trim()
    };
  } catch (error) {
    log('⚠️ Could not get git information', COLORS.yellow);
    return {
      hash: 'unknown',
      message: 'Manual update',
      branch: 'unknown'
    };
  }
}

async function publishUpdate(channel, message = null, skipValidation = false) {
  try {
    const gitInfo = await getGitInfo();
    const updateMessage = message || `Update from ${gitInfo.branch} (${gitInfo.hash}): ${gitInfo.message}`;
    
    log(`\n🚀 Publishing update to ${channel} channel...`, COLORS.blue);
    log(`📝 Message: ${updateMessage}`, COLORS.cyan);
    
    if (!skipValidation) {
      log('\n🔍 Running pre-flight checks...', COLORS.yellow);
      
      // Check if there are uncommitted changes
      try {
        const { stdout } = await execAsync('git status --porcelain');
        if (stdout.trim()) {
          log('⚠️ Warning: You have uncommitted changes!', COLORS.yellow);
          log('Uncommitted files:', COLORS.yellow);
          log(stdout, COLORS.yellow);
          
          const proceed = process.argv.includes('--force');
          if (!proceed) {
            log('❌ Please commit your changes first or use --force flag', COLORS.red);
            process.exit(1);
          }
        }
      } catch (error) {
        log('⚠️ Could not check git status', COLORS.yellow);
      }
    }
    
    // Build the update command
    const updateCommand = [
      'npx eas update',
      `--channel ${channel}`,
      `--message "${updateMessage}"`,
      '--non-interactive'
    ].join(' ');
    
    log(`\n⚡ Executing: ${updateCommand}`, COLORS.cyan);
    
    // Execute the update
    const { stdout } = await execAsync(updateCommand);
    
    log('\n✅ Update published successfully!', COLORS.green);
    log(stdout, COLORS.reset);
    
    // Log the update details
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      channel,
      message: updateMessage,
      gitHash: gitInfo.hash,
      gitBranch: gitInfo.branch,
      success: true
    };
    
    await logUpdate(logEntry);
    
    log(`\n🎉 Update deployed to ${channel} channel!`, COLORS.green);
    log(`📱 Apps on the ${channel} channel will receive this update automatically`, COLORS.cyan);
    
  } catch (error) {
    log('\n❌ Failed to publish update:', COLORS.red);
    log(error.stderr || error.stdout || error.message, COLORS.red);
    
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      channel,
      error: error.message,
      success: false
    };
    
    await logUpdate(logEntry);
    process.exit(1);
  }
}

async function logUpdate(entry) {
  try {
    const logDir = path.join(__dirname, '..', 'deployment', 'logs');
    const logFile = path.join(logDir, 'updates.json');
    
    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Read existing log or create new
    let logs = [];
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf8');
      logs = JSON.parse(content);
    }
    
    // Add new entry
    logs.push(entry);
    
    // Keep only last 50 entries
    if (logs.length > 50) {
      logs = logs.slice(-50);
    }
    
    // Write back to file
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    
  } catch (error) {
    log('⚠️ Could not log update details', COLORS.yellow);
  }
}

async function listRecentUpdates() {
  try {
    log('\n📋 Recent updates:', COLORS.blue);
    
    const { stdout } = await execAsync('npx eas update:list --limit 10 --non-interactive');
    log(stdout, COLORS.reset);
    
  } catch (error) {
    log('❌ Failed to list updates:', COLORS.red);
    log(error.stderr || error.message, COLORS.red);
  }
}

async function showHelp() {
  log('\n📖 EAS Update Deployment Script for VoiceApp Me', COLORS.blue);
  log('\nUsage:', COLORS.cyan);
  log('  node scripts/deploy-update.js [command] [options]', COLORS.reset);
  
  log('\nCommands:', COLORS.cyan);
  log('  preview     Deploy to preview channel (default)', COLORS.reset);
  log('  production  Deploy to production channel', COLORS.reset);
  log('  development Deploy to development channel', COLORS.reset);
  log('  list        Show recent updates', COLORS.reset);
  log('  help        Show this help message', COLORS.reset);
  
  log('\nOptions:', COLORS.cyan);
  log('  --message "Custom message"  Custom update message', COLORS.reset);
  log('  --force                     Skip validation checks', COLORS.reset);
  
  log('\nExamples:', COLORS.cyan);
  log('  node scripts/deploy-update.js preview', COLORS.reset);
  log('  node scripts/deploy-update.js production --message "Bug fixes"', COLORS.reset);
  log('  node scripts/deploy-update.js preview --force', COLORS.reset);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'preview';
  
  // Parse options
  const messageIndex = args.indexOf('--message');
  const customMessage = messageIndex !== -1 ? args[messageIndex + 1] : null;
  const skipValidation = args.includes('--force');
  
  log('🎤 VoiceApp Me - EAS Update Deployment', COLORS.magenta);
  log('=' * 50, COLORS.cyan);
  
  switch (command) {
    case 'help':
    case '--help':
    case '-h':
      await showHelp();
      break;
      
    case 'list':
      await listRecentUpdates();
      break;
      
    case 'development':
      await publishUpdate(CHANNELS.development, customMessage, skipValidation);
      break;
      
    case 'preview':
      await publishUpdate(CHANNELS.preview, customMessage, skipValidation);
      break;
      
    case 'production':
      log('\n⚠️ WARNING: You are about to deploy to PRODUCTION!', COLORS.yellow);
      log('This will affect all production users.', COLORS.yellow);
      
      if (!args.includes('--force')) {
        log('Use --force flag to confirm production deployment', COLORS.red);
        process.exit(1);
      }
      
      await publishUpdate(CHANNELS.production, customMessage, skipValidation);
      break;
      
    default:
      log(`❌ Unknown command: ${command}`, COLORS.red);
      log('Run "node scripts/deploy-update.js help" for usage information', COLORS.cyan);
      process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    log('\n💥 Script failed:', COLORS.red);
    log(error.message, COLORS.red);
    process.exit(1);
  });
}

module.exports = {
  publishUpdate,
  listRecentUpdates,
  CHANNELS
};