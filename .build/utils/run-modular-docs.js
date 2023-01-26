var docs = require("./modular-docs");
const path = require('path')
const fs = require("fs-extra");

const srcDir = docs.generateSplitterInput(path.normalize(`${__dirname}/../../docs`));
docs.split(srcDir);

// Copy shared content directory to post-splitter directory
const commonDirOutput = path.normalize(`${__dirname}/../tmp/post-splitter/shared-content`);
const commonDirInput = path.normalize(`${srcDir}/../../../../docs/shared-content`);
console.log(`Copying ${commonDirInput} to ${commonDirOutput}`);
fs.copySync(commonDirInput, commonDirOutput);

// Create symlinks to the shared content directory in the post-splitter assemblies and modules/guides directories. This is required for mod docs generation to succeed.
const source = path.normalize(`${__dirname}/../tmp/post-splitter/shared-content`);
const assemblies_target = path.normalize(`${__dirname}/../tmp/post-splitter/assemblies/shared-content`);
const guides_target = path.normalize(`${__dirname}/../tmp/post-splitter/modules/guides/shared-content`);
try {
    fs.symlinkSync(source, assemblies_target, "dir");
    console.log("Symbolic link creation in assemblies directory complete!");
  } catch (error) {
    console.error(error);
  }
try {
    fs.symlinkSync(source, guides_target, "dir");
    console.log("Symbolic link creation in modules/guides directory complete!");
  } catch (error) {
    console.error(error);
  } 