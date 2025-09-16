import { readdirSync, writeFileSync } from "fs";
import { join, parse } from "path";

function generateExports(baseDir: string, relativeDir: string): string[] {
    return readdirSync(baseDir)
        .filter((file) => file.endsWith(".ts"))
        .map((file) => {
            const { name } = parse(file);
            return `export * from "./${relativeDir}/${name}";`;
        });
}

const srcDir = join(__dirname, "../src");

const typesDir = join(srcDir, "types");
const enumsDir = join(srcDir, "enums");
const experimentalDir = join(srcDir, "experimental");

const indexFile = join(srcDir, "index.ts");
const typesFile = join(srcDir, "types.ts");
const enumsFile = join(srcDir, "enums.ts");
const experimentalFile = join(srcDir, "experimental.ts");

const staticExports = [`export * from "./MlbbAPI";`, ""];

const typeExports = generateExports(typesDir, "types");
const enumExports = generateExports(enumsDir, "enums");
const experimentalExports = generateExports(experimentalDir, "experimental");

const indexContent = [
    "// core",
    ...staticExports,
    "// types",
    ...typeExports,
    "",
    "// enums",
    ...enumExports,
    "",
].join("\n");
writeFileSync(indexFile, indexContent, "utf8");

const typesContent = [...typeExports, ""].join("\n");
writeFileSync(typesFile, typesContent, "utf8");

const enumsContent = [...enumExports, ""].join("\n");
writeFileSync(enumsFile, enumsContent, "utf8");

const experimentalContent = [...experimentalExports, ""].join("\n");
writeFileSync(experimentalFile, experimentalContent, "utf8");

console.log("index.ts, types.ts, enums.ts, experimental.ts generated");
