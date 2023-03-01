const fs = require("fs-extra");
const currDir = process.cwd();
const path = require("path");
const prompts = require("prompts");
const { componentAdder } = require("../component-adder");

async function updateComponent(component = null) {
  try {
    const proceedResponse = await prompts({
      type: "text",
      name: "proceed",
      message:
        "Are you sure you want to update " +
        component +
        " ? This will remove all your existing changes and replace them with new (y/n) ",
      initial: "n",
    });
    if (proceedResponse.proceed == "y") {
      const configFile = fs.readFileSync(
        `${currDir}/gluestack-ui.config.ts`,
        "utf-8"
      );

      const match = configFile.match(/componentPath:\s+'([^']+)'/);
      const componentPath = match && match[1];
      const dirPath = path.resolve(currDir, componentPath, "core", component);

      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
      await componentAdder(component);
    }
    // const configFile = fs.readFileSync(
    //   `${currDir}/gluestack-ui.config.ts`,
    //   "utf-8"
    // );

    // const match = configFile.match(/componentPath:\s+'([^']+)'/);
    // const componentPath = match && match[1];
    // const dirPath = path.resolve(currDir, componentPath, "core", component);

    // if (fs.existsSync(dirPath)) {
    //   fs.rmSync(dirPath, { recursive: true, force: true });
    // }
    // await componentAdder(component);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  updateComponent,
};
