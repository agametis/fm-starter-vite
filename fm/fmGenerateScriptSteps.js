// based on an idea from
// https://github.com/integrating-magic/js-dev-environment-new

import {exec, spawn} from "child_process";
import fs from "fs";
import {platform} from "os";
import path from "path";

// Detect the operating system
const isWindows = platform() === "win32";
const isMacOS = platform() === "darwin";

// Cross-platform clipboard copy function
function copyToClipboard(data) {
  if (isMacOS) {
    // macOS implementation
    const proc = spawn("pbcopy");
    proc.stdin.write(data);
    proc.stdin.end();
    return true;
  } else if (isWindows) {
    // Windows implementation using PowerShell
    try {
      // Create a temporary file with the data
      const tempFile = path.join(process.cwd(), "temp_clipboard.txt");
      fs.writeFileSync(tempFile, data);

      // Use PowerShell to read the file and set clipboard
      exec(
        `powershell -command "Get-Content '${tempFile}' | Set-Clipboard"`,
        (error) => {
          if (error) {
            console.error(`PowerShell clipboard error: ${error}`);
          }
          // Clean up the temporary file
          try {
            fs.unlinkSync(tempFile);
          } catch (err) {
            console.error(`Error deleting temp file: ${err}`);
          }
        },
      );
      return true;
    } catch (error) {
      console.error(`Windows clipboard error: ${error}`);
      return false;
    }
  } else {
    console.error("Unsupported operating system for clipboard operations");
    return false;
  }
}

// Convert clipboard content to FileMaker XML format
function convertClipboardToFM() {
  if (isMacOS) {
    // macOS implementation using AppleScript
    exec(
      "osascript -e 'set the clipboard to (do shell script \"pbpaste\" as «class XMSS»)'",
      (error) => {
        if (error) {
          console.error(`macOS clipboard conversion error: ${error}`);
          return false;
        }
        return true;
      },
    );
  } else if (isWindows) {
    // Windows implementation for FileMaker XML conversion
    try {
      // Create a temporary file with the XML data
      const tempXmlFile = path.join(process.cwd(), "temp_fm_xml.txt");

      // Get the current clipboard content (which should be our XML)
      exec(
        `powershell -command "Get-Clipboard | Out-File -FilePath '${tempXmlFile}' -Encoding utf8"`,
        (getError) => {
          if (getError) {
            console.error(`Error getting clipboard content: ${getError}`);
            return false;
          }

          // Read the XML content
          try {
            const xmlContent = fs.readFileSync(tempXmlFile, "utf8");

            // Windows needs the XML to be in the clipboard in a special format
            // We'll use PowerShell to set it with the correct format
            // The key is to use the Windows clipboard with the FileMaker format identifier

            // Create a PowerShell script that will handle the conversion
            const psScriptPath = path.join(process.cwd(), "convert_to_fm.ps1");
            const psScript = `
            Add-Type -AssemblyName System.Windows.Forms
            $xmlContent = Get-Content -Path "${tempXmlFile}" -Raw

            # Create a DataObject that can hold multiple formats
            $dataObj = New-Object System.Windows.Forms.DataObject

            # Add the XML content as text
            $dataObj.SetData([System.Windows.Forms.DataFormats]::Text, $xmlContent)

            # Also add it as FileMaker XML format (using a custom format)
            # FileMaker uses a custom format identifier
            $dataObj.SetData("FMPR_XML", $xmlContent)

            # Set to clipboard
            [System.Windows.Forms.Clipboard]::SetDataObject($dataObj, $true)

            Write-Host "Clipboard set with FileMaker XML format"
          `;

            // Write the PowerShell script to a file
            fs.writeFileSync(psScriptPath, psScript);

            // Execute the PowerShell script
            exec(
              `powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`,
              (psError) => {
                if (psError) {
                  console.error(`PowerShell execution error: ${psError}`);
                } else {
                  console.log("XML converted to FileMaker format on Windows");
                }

                // Clean up temporary files
                try {
                  fs.unlinkSync(tempXmlFile);
                  fs.unlinkSync(psScriptPath);
                } catch (cleanupErr) {
                  console.error(`Error cleaning up temp files: ${cleanupErr}`);
                }
              },
            );

            return true;
          } catch (readError) {
            console.error(`Error reading XML file: ${readError}`);
            return false;
          }
        },
      );

      return true; // Return true as we've started the async process
    } catch (error) {
      console.error(`Windows clipboard conversion error: ${error}`);
      return false;
    }
  } else {
    console.error(
      "Unsupported operating system for FileMaker clipboard conversion",
    );
    return false;
  }
}

const xml = `<fmxmlsnippet type="FMObjectList"><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "callbackName" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$callbackName</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "promiseID" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$promiseID</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "parameter" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$parameter</Name></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="89" name="# (comment)"><Text>Your logic here</Text></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA["web"]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$webviewer</Name></Step><Step enable="True" id="175" name="Perform JavaScript in Web Viewer"><ObjectName><Calculation><![CDATA[$webviewer]]></Calculation></ObjectName><FunctionName><Calculation><![CDATA[$callbackName]]></Calculation></FunctionName><Parameters Count="1"><P><Calculation><![CDATA[$promiseID]]></Calculation></P></Parameters></Step></fmxmlsnippet>`;

// Copy XML to clipboard
if (copyToClipboard(xml)) {
  console.log("\x1b[34mXML copied to clipboard.\x1b[0m");

  // Convert clipboard content to FileMaker format
  if (convertClipboardToFM()) {
    console.log(
      "\x1b[32mConverted to script steps. Go paste it in your FM script!\x1b[0m",
    );
  } else {
    console.log(
      "\x1b[33mCopied XML to clipboard, but couldn't convert to FileMaker format.\x1b[0m",
    );
    console.log(
      "\x1b[33mYou may need to manually set it as FileMaker XML.\x1b[0m",
    );
  }
} else {
  console.log("\x1b[31mFailed to copy XML to clipboard.\x1b[0m");
}
