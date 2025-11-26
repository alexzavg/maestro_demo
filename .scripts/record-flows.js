const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Configuration
const MAESTRO_BIN = path.join(os.homedir(), '.maestro/bin/maestro');
const CONFIG_PATH = path.join(__dirname, '..', '.maestro/config.yaml');
const RECORDINGS_DIR = path.join(__dirname, '..', 'recordings');

// Define your flow paths here
const flowPaths = [
  // Example:
  // '.maestro/flows/wikipedia/conditional/LaunchStepper.spec.yaml'
];

// Function to find all YAML files in a directory
function findYamlFiles(dir) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let yamlFiles = [];
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        yamlFiles = [...yamlFiles, ...findYamlFiles(fullPath)];
      } else if (file.name.endsWith('.yaml') || file.name.endsWith('.yml')) {
        yamlFiles.push(fullPath);
      }
    }
    
    return yamlFiles;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    return [];
  }
}

// Function to run maestro record and capture test status
async function recordFlow(flowPath) {
  try {
    const flowName = path.basename(flowPath, path.extname(flowPath));
    
    // Create recordings directory if it doesn't exist
    if (!fs.existsSync(RECORDINGS_DIR)) {
      fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
    }

    console.log(`\n🔵 Starting test for: ${flowPath}`);
    
    // First, run the test to get the result
    let testPassed = false;
    let output = '';
    
    try {
      // Run the test without recording first
      const testCmd = [
        MAESTRO_BIN,
        'test',
        `"${flowPath}"`,
        `--config "${CONFIG_PATH}"`,
        '-e appId=org.wikipedia'
      ].join(' ');
      
      console.log('   Running test...');
      output = execSync(testCmd, { stdio: 'pipe' }).toString();
      testPassed = true;
      console.log('   ✅ Test passed');
    } catch (error) {
      // If the test fails, we'll still try to record it
      output = error.stdout?.toString() || error.stderr?.toString() || error.message;
      testPassed = false;
      console.log('   ❌ Test failed');
    }

    // Now record the flow
    const status = testPassed ? 'passed' : 'failed';
    const outputFile = path.join(RECORDINGS_DIR, `${flowName}-${status}.mp4`);
    
    console.log(`\n🔵 Starting recording for: ${flowPath}`);
    const recordCmd = [
      MAESTRO_BIN,
      'record',
      '--local',
      `"${flowPath}"`,
      `"${outputFile}"`,
      `--config "${CONFIG_PATH}"`,
      '-e appId=org.wikipedia'
    ].join(' ');
    
    console.log(`   Command: ${recordCmd}`);
    
    try {
      execSync(recordCmd, { stdio: 'inherit' });
      console.log(`✅ Successfully recorded: ${flowName} (${status})`);
      console.log(`   Output: ${outputFile}`);
      return { success: true, passed: testPassed };
    } catch (recordError) {
      console.error(`❌ Recording failed for ${flowName}:`, recordError.message);
      return { success: false, passed: testPassed, error: recordError.message };
    }
  } catch (error) {
    console.error(`❌ Error processing ${flowPath}:`, error.message);
    return { success: false, passed: false, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Maestro flow recording...');
  
  // If no specific flows are defined, search for all YAML files in .maestro/flows
  const defaultSearchDir = path.join(__dirname, '..', '.maestro/flows');
  const flowsToRecord = flowPaths.length > 0 
    ? flowPaths.map(p => path.resolve(p))
    : findYamlFiles(defaultSearchDir);

  if (flowsToRecord.length === 0) {
    console.log('ℹ️  No flow files found to record.');
    console.log(`   Please add flow file paths to the flowPaths array in ${__filename}`);
    console.log(`   or place your YAML files in ${defaultSearchDir}`);
    return;
  }

  console.log(`📋 Found ${flowsToRecord.length} flow(s) to record:`);
  flowsToRecord.forEach((flow, index) => {
    console.log(`   ${index + 1}. ${flow}`);
  });

  let successCount = 0;
  let passedCount = 0;
  
  for (const flow of flowsToRecord) {
    const result = await recordFlow(flow);
    if (result && result.success) {
      successCount++;
      if (result.passed) passedCount++;
    }
    
    // Small delay between recordings
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  const failedCount = successCount - passedCount;
  
  console.log(`\n✨ Recording completed!`);
  console.log(`   ✅ Successfully recorded: ${successCount} flow(s)`);
  console.log(`     ✓ Passed: ${passedCount}`);
  console.log(`     ✗ Failed: ${failedCount}`);
  console.log(`   ❌ Failed to record: ${flowsToRecord.length - successCount} flow(s)`);
  console.log(`\nRecordings saved to: ${RECORDINGS_DIR}`);
  
  // Return the results for potential use by other scripts
  return {
    total: flowsToRecord.length,
    recorded: successCount,
    passed: passedCount,
    failed: failedCount,
    recordingsDir: RECORDINGS_DIR
  };
}

// Run the script
main().catch(console.error);
