import FMGofer, {Option} from "fm-gofer";
import "./style.css";

const initWebViewer = () => {
  const scriptName = "ext_daten_von_fm";
  const param = {};

  FMGofer.PerformScriptWithOption(scriptName, param, Option.SuspendAndResume);
};

const datenAnFMSenden = () => {
  const inputElement = document.getElementById("inputData");
  const inputValue = inputElement ? inputElement.value : "";

  const scriptName = "ext_daten_an_fm_senden";
  const param = {eingabe: inputValue};

  FMGofer.PerformScriptWithOption(scriptName, param, Option.SuspendAndResume);
};

const initialisiereWebViewer = (parameter) => {
  const p = JSON.parse(parameter);

  let titel = p.titel ? p.titel : "Keine Daten von FM geladen!";
  // Hole das h1 Element
  const h1Element = document.querySelector("h1");
  // Aktualisiere das Element mit dem neuen Titel
  if (h1Element) {
    h1Element.textContent = titel;
  }
};

const datenVonFMHolen = async () => {
  const scriptName = "ext_daten_von_fm";
  const param = {};

  FMGofer.PerformScriptWithOption(scriptName, param, Option.SuspendAndResume);
};
// Funktionen im globalen Kontext definieren
window.initialisiereWebViewer = initialisiereWebViewer;
window.datenAnFMSenden = datenAnFMSenden;
window.datenVonFMHolen = datenVonFMHolen;

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  initWebViewer();
});
