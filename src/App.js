import { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const qrCodeElement = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(qrCodeElement);
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              text-align: center;
            }
            .qr-container {
              display: inline-block;
              padding: 20px;
              border: 1px solid #ccc;
              margin: 20px 0;
            }
            .qr-container svg {
              width: 200px !important;
              height: 200px !important;
              max-width: 200px !important;
              max-height: 200px !important;
            }
            .qr-info {
              margin-top: 15px;
              font-size: 14px;
              color: #666;
              word-break: break-all;
            }
            @media print {
              body { margin: 0; }
              .qr-container { border: none; }
              .qr-container svg {
                width: 150px !important;
                height: 150px !important;
                max-width: 150px !important;
                max-height: 150px !important;
              }
            }
          </style>
        </head>
        <body>
          <h1>QR Code</h1>
          <div class="qr-container">
            ${svgData}
            <div class="qr-info">
              <strong>Content:</strong> ${qrValue}
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Create QR codes instantly from any text or URL</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text or URL:
            </label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com or any text..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleGenerate}
              disabled={!text.trim()}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Generate QR Code
            </button>
            
            {qrValue && (
              <>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Download PNG
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors font-medium"
                >
                  Print
                </button>
              </>
            )}
          </div>

          {qrValue && (
            <div className="text-center">
              <div className="inline-block p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <QRCode
                  id="qr-code"
                  value={qrValue}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                QR Code generated for: <span className="font-medium">{qrValue}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
