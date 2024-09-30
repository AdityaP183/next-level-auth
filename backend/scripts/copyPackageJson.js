const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "package.json");
const dest = path.join(__dirname, "dist", "package.json");

fs.copyFileSync(src, dest);
console.log("package.json copied to dist");
