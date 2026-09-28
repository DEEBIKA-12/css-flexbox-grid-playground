const fs = require("fs");
const path = require("path");
const assert = require("assert");

const htmlPath = path.join(__dirname, "..", "app", "index.html");
const cssPath = path.join(__dirname, "..", "app", "style.css");
const jsPath = path.join(__dirname, "..", "app", "script.js");

assert.ok(fs.existsSync(htmlPath), "App HTML file should exist");
assert.ok(fs.existsSync(cssPath), "App CSS file should exist");
assert.ok(fs.existsSync(jsPath), "App JavaScript file should exist");

const html = fs.readFileSync(htmlPath, "utf8");
assert.ok(html.toLowerCase().includes("<html"), "HTML should contain an html element");

console.log("All app structure checks passed!");