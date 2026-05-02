const { ESLint } = require("eslint");
const fs = require("fs");

(async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["src/assets/Components/Products1.jsx"]);
  fs.writeFileSync("eslint_results.json", JSON.stringify(results, null, 2));
})().catch(console.error);
