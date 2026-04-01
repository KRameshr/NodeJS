const fs = require("fs");
const path = require("path");

const targetFile = "source.txt";
const backupFolder = "./backups";
const backupFile = path.join(backupFolder, "backup_source.txt");

// Step 1: Ensure the backup folder exists
if (!fs.existsSync(backupFolder)) {
  fs.mkdirSync(backupFolder);
  console.log(`[System] Created folder: ${backupFolder}`);
}

// Step 2: The Backup Logic
const performBackup = () => {
  // Requirement #2: Handle FileNotFound (Exception Handling)
  if (!fs.existsSync(targetFile)) {
    console.error(`[Error] Cannot backup: '${targetFile}' not found!`);
    return;
  }

  try {
    // Requirement #1 & #3: Read and save immediately
    const content = fs.readFileSync(targetFile);
    fs.writeFileSync(backupFile, content);
    console.log(
      `[Success] Backup updated at ${new Date().toLocaleTimeString()}`,
    );
  } catch (err) {
    console.error(`[Error] Backup failed: ${err.message}`);
  }
};

// Requirement #3: Watch the file for changes
console.log(`[System] Watching for changes on: ${targetFile}...`);

// Check if file exists before watching
if (fs.existsSync(targetFile)) {
  fs.watch(targetFile, (eventType, filename) => {
    if (eventType === "change") {
      console.log(`[Event] Change detected in ${filename}`);
      performBackup();
    }
  });
} else {
  console.error(
    `[Fatal] Initial file '${targetFile}' not found. Please create it.`,
  );
}
