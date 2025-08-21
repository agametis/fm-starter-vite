# FileMaker JavaScript Starter

(For the German version, [please scroll down](#filemaker-javascript-starter-deutsch).)

This project is a JavaScript starter template for developing web applications that can be integrated into FileMaker. It uses Vite as a build tool and fm-gofer for communication with FileMaker, providing an easy way to embed web content in FileMaker.

## Features

- Modern web development with [Vite](https://vite.dev/)
- Easy integration with FileMaker via the [fm-gofer](https://github.com/jwillinghalpern/fm-gofer) library
- Automatic creation of a single HTML file for easy deployment in FileMaker
- Example project for bidirectional communication between the web application and FileMaker

## Prerequisites

- Node.js (version 20.11 or higher)
- FileMaker Pro (version 19.4 or higher)

## Installation

1. Clone or download the repository
2. Install the dependencies:

```bash
npm install
```

## Getting Started

The main application is in the `main.js` file. This is where you start programming your web application. This file is the entry point of your application and is loaded automatically on startup.

The most important files and folders are:
- `index.html` - Basic HTML structure
- `src/main.js` - Main application code (entry point)
- `src/style.css` - File for CSS/styles
- `fm/` - Contains files for FileMaker integration

To start development, open the `main.js` file and add your code there. The application uses modern JavaScript modules that you can easily import.

## Development

To start the application in development mode:

```bash
npm run dev
```

This starts a local development server with hot-reload functionality. The application can then be used directly in the FileMaker file if development mode is also enabled there.

## Build and Deployment

To build the application and embed it in FileMaker:

```bash
npm run deploy-to-fm
```

---

# FileMaker JavaScript Starter (deutsch)

Dieses Projekt ist ein JavaScript-Starter-Template für die Entwicklung von Web-Anwendungen, die in FileMaker integriert werden können. Es nutzt Vite als Build-Tool und fm-gofer für die Kommunikation mit FileMaker und bietet eine einfache Möglichkeit, Web-Inhalte in FileMaker einzubinden.

## Funktionen

- Moderne Web-Entwicklung mit [Vite](https://vite.dev/)
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

## Erste Schritte

Die Hauptanwendung befindet sich in der Datei `main.js`. Hier beginnen Sie mit der Programmierung Ihrer Web-Anwendung. Diese Datei ist der Einstiegspunkt Ihrer Anwendung und wird automatisch beim Start geladen.

Die wichtigsten Dateien und Ordner sind:
- `index.html` - HTML-Grundgerüst
- `src/main.js` - Hauptanwendungscode (Einstiegspunkt)
- `src/style.css` - Datei für CSS/Styles
- `fm/` - Enthält Dateien für die FileMaker-Integration

Um mit der Entwicklung zu beginnen, öffnen Sie die `main.js` Datei und fügen Sie Ihren Code dort ein. Die Anwendung verwendet moderne JavaScript-Module, die Sie einfach importieren können.

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


## Credits

- [js-dev-environment](https://github.com/integrating-magic/js-dev-environment)
- [fm-gofer](https://github.com/jwillinghalpern/fm-gofer)

## Lizenz

MIT
