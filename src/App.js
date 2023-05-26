import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [modifiedText, setModifiedText] = useState("");
  const [textToRemove, setTextToRemove] = useState("");

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileModification = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        // Fazer a modificação no texto, removendo a parte especificada
        const modifiedContent = fileContent.replace(textToRemove, "");
        setModifiedText(modifiedContent);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([modifiedText], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "arquivo_alterado.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <h1>Upload e modificação de arquivo de texto</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <label>
        Texto a ser removido:
        <input
          type="text"
          value={textToRemove}
          onChange={(e) => setTextToRemove(e.target.value)}
        />
      </label>
      <button onClick={handleFileModification} disabled={!file}>
        Modificar Arquivo
      </button>
      {modifiedText && (
        <div>
          <h2>Conteúdo modificado:</h2>
          <p>{modifiedText}</p>
          <button onClick={handleDownload}>Baixar Arquivo</button>
        </div>
      )}
    </div>
  );
}

export default App;
