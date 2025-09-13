import { readdirSync, writeFileSync } from "fs";
import { join, parse } from "path";

const baseDir = join(__dirname, "../src/types");
const outputFile = join(__dirname, "../src/index.ts");

const staticExports = [
    `export * from "./MlbbAPI";`,
    "",
];

const files = readdirSync(baseDir)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => {
        const { name } = parse(file);
        return `export * from "./types/${name}";`;
    });

const content = [...staticExports, ...files].join("\n") + "\n";
writeFileSync(outputFile, content, "utf8");

console.log("index.ts generated");