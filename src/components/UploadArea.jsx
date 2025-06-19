import { useState } from "react";

export default function UploadArea({ onLoad, onReset }) {
    const [jsonText, setJsonText] = useState("");
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const handleFile = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setJsonText(reader.result);
        setFileName(file.name);
        setError("");
      };
      reader.readAsText(file);
    };

    const removeFile = () => {
      setJsonText("");
      setFileName("");
      setError("");
      onReset();
      document.getElementById("jsonFileInput").value = "";
    };

    const handleTextareaChange = (e) => {
      setJsonText(e.target.value);
      setFileName("");
      setError("");
    };
    
    const handleParse = () => {
        try {
          const parsed = JSON.parse(jsonText);
          if (!Array.isArray(parsed)) throw new Error();
          onLoad(parsed);
          setError("");
        } catch {
          setError(
            "Format JSON not valid. Make sure it is an array of objects."
          );
          onReset();
        }
    };

    return (
      <div className="mb-6">
        <label className="block mb-2 font-semibold ">Upload File JSON</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFile}
          className="mb-4 w-full border border-gray-300 rounded-md p-2"
          id="jsonFileInput"
        />

        {fileName && (
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 bg-gray-100 px-3 py-2 rounded mb-4">
            <span className="text-sm text-gray-700 break-words sm:truncate">
              {fileName}
            </span>
            <button
              onClick={removeFile}
              className="text-red-600 text-sm w-max"
            >
              Remove File
            </button>
          </div>
        )}

        <label className="block mb-2 font-semibold ">Or Paste JSON</label>
        <textarea
          placeholder="Paste JSON here..."
          rows={6}
          onChange={handleTextareaChange}
          className="w-full border border-gray-300 rounded-md p-2"
        ></textarea>

        <button onClick={handleParse} className="mt-2 text-white rounded">
          Submit
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    );
}