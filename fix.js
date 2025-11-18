import fs from "fs";
import path from "path";

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) fixImports(fullPath);
    else if (file.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      content = content.replace(
        /from\s+["'](\.\/[^"']+)["']/g,
        (match, p1) => `from "${p1}.js"`
      );
      fs.writeFileSync(fullPath, content);
    }
  }
}

fixImports("./dist");
console.log("✅ All import paths fixed!");
