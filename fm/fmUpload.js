import open from "open";
import path from "path";

import {fmConfig} from "./fmConfig.js";

// ab Version node >=20.11
const __dirname = import.meta.dirname;

const {uploadScript, file, server, widgetName} = fmConfig;

// falls nicht die gewünschte FM Version startet
// kann man das fmp-Protokoll hier anpassen:
// z.B. fmp21 für FileMaker 21
const fileUrl = `fmp://${server}/${file}?script=${uploadScript}&param=`;

const thePath = path.join(__dirname, "../", "dist", "index.html");

const params = {thePath, widgetName};
const urlFM = fileUrl + encodeURIComponent(JSON.stringify(params));
open(urlFM);
