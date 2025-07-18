# FileMaker JavaScript Starter

Dieses Projekt ist ein JavaScript-Starter-Template für die Entwicklung von Web-Anwendungen, die in FileMaker integriert werden können. Es nutzt Vite als Build-Tool und [fm-gofer](https://github.com/jwillinghalpern/fm-gofer) für die Kommunikation mit FileMaker und bietet eine einfache Möglichkeit, Web-Inhalte in FileMaker einzubinden.

## Funktionen

- Moderne Web-Entwicklung mit Vite
- Einfache Integration mit FileMaker über die [fm-gofer](https://github.com/jwillinghalpern/fm-gofer) Bibliothek
- Automatische Erstellung einer einzigen HTML-Datei für einfaches Deployment in FileMaker
- Beispielprojekt für bidirektionale Kommunikation zwischen Web-Anwendung und FileMaker

## Voraussetzungen

- Node.js (Version 20.11 oder höher)
- FileMaker Pro (Version 19.4 oder höher)

## Installation

1. Klonen Sie das Repository oder laden Sie es herunter
2. Installieren Sie die Abhängigkeiten:

```bash
npm install
```

## Entwicklung

Um die Anwendung im Entwicklungsmodus zu starten:

```bash
npm run dev
```

Dies startet einen lokalen Entwicklungsserver mit Hot-Reload-Funktionalität. Die Anwendung kann dann in der FileMaker-Datei direkt benutzt werden, wenn dort ebenfalls der Entwicklermodus aktiviert ist.

## Build und Deployment

Um die Anwendung zu bauen und in FileMaker einzubinden:

```bash
npm run deploy-to-fm
```

Dieser Befehl führt folgende Aktionen aus:
1. Baut die Anwendung mit Vite (`npm run build`)
2. Lädt die erstellte Datei in FileMaker hoch (`npm run upload`)

Hinweis: Welche FileMaker Datei verwendet wird, ist in der Datei `fm/fmConfig.js` konfiguriert.

Die Anwendung wird als eine einzige HTML-Datei gebaut (dank vite-plugin-singlefile) und kann leicht in FileMaker integriert werden.

## FileMaker-Integration

Die Anwendung verwendet die [fm-gofer](https://github.com/jwillinghalpern/fm-gofer) Bibliothek für die Kommunikation mit FileMaker. Folgende FileMaker-Skripte werden verwendet:

- `ext_daten_von_fm`: Holt Daten von FileMaker
- `ext_daten_an_fm_senden`: Sendet Daten an FileMaker
- `uploadToFM`: Wird für das Deployment der Web-Anwendung in FileMaker verwendet

## Konfiguration

Die FileMaker-Konfiguration kann in der Datei `fm/fmConfig.js` angepasst werden:

```javascript
export const fmConfig = {
  server: "$",
  file: "FM-Starter",
  uploadScript: "uploadToFM",
  widgetName: "widgetName",
};
```

## Konfigurationsvariablen

Die `fmConfig`-Datei enthält folgende wichtige Variablen:

- `server`: Der FileMaker-Server, auf dem die Datei gehostet wird. Verwenden Sie `$` für lokale Dateien.
- `file`: Der Name der FileMaker-Datei ohne Dateiendung.
- `uploadScript`: Der Name des FileMaker-Skripts, das für den Upload der Web-Anwendung verwendet wird.
- `widgetName`: Der Name des Widgets in FileMaker, in dem die Web-Anwendung angezeigt wird.

Diese Einstellungen müssen mit Ihrer FileMaker-Umgebung übereinstimmen, damit die Integration funktioniert.


## Skript-Generierung

Mit dem folgenden Befehl können FileMaker-Skriptschritte generiert werden:

```bash
npm run generate-script-steps
```

## Credits

- [js-dev-environment](https://github.com/integrating-magic/js-dev-environment)
- [fm-gofer](https://github.com/jwillinghalpern/fm-gofer)

## Lizenz

MIT
