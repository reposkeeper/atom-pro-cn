import fs from "node:fs";

const requiredFiles = [
  "manifest.json",
  "versions.json",
  "theme.css",
  "README.md",
  "LICENSE",
];
const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing required file: ${file}`);
  }
}

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`${file} is not valid JSON: ${error.message}`);
    return {};
  }
};

const manifest = readJson("manifest.json");
const versions = readJson("versions.json");
const css = fs.existsSync("theme.css") ? fs.readFileSync("theme.css", "utf8") : "";
const readme = fs.existsSync("README.md") ? fs.readFileSync("README.md", "utf8") : "";

for (const key of ["name", "version", "minAppVersion", "author"]) {
  if (!manifest[key]) {
    failures.push(`manifest.json missing ${key}`);
  }
}

if (manifest.name !== "Atom Pro CN") {
  failures.push("manifest.json name must be Atom Pro CN");
}

if (manifest.version && !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
  failures.push("manifest.json version must be x.y.z");
}

if (manifest.version && versions[manifest.version] !== manifest.minAppVersion) {
  failures.push("versions.json must map manifest version to minAppVersion");
}

const requiredCssNeedles = [
  ".theme-dark",
  ".theme-light",
  "--font-text-theme",
  "--checkbox-radius: 2px",
  "--line-height-normal",
  "--p-spacing",
  "--list-spacing",
  "--link-decoration-hover: underline",
  "text-underline-offset: 0.16em",
  ".markdown-source-view.mod-cm6 .cm-content",
  ".markdown-source-view.mod-cm6 .HyperMD-header",
  ".markdown-source-view.mod-cm6 .HyperMD-list-line",
  ".markdown-source-view.mod-cm6 .HyperMD-quote",
  "--blockquote-border-color",
  "--callout-default",
  "--table-line-height",
  "--code-keyword",
  "--metadata-background",
  "--nav-item-color",
  "--tab-background-active",
  "--bases-table-row-height",
  "--canvas-background",
  "--graph-node",
];

for (const needle of requiredCssNeedles) {
  if (!css.includes(needle)) {
    failures.push(`theme.css missing ${needle}`);
  }
}

if (/!important/.test(css)) {
  failures.push("theme.css should not use !important");
}

if (/:has\(/.test(css)) {
  failures.push("theme.css should not use :has()");
}

if (/url\(\s*['"]?https?:\/\//i.test(css)) {
  failures.push("theme.css should not load remote assets");
}

if (/color-mix\(/.test(css)) {
  failures.push("theme.css should avoid color-mix() for conservative compatibility");
}

if (!readme.includes("Chinese typography") && !readme.includes("Chinese Typography")) {
  failures.push("README.md should describe Chinese typography");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Theme validation passed.");
