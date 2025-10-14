import { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrName, setQrName] = useState('');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('PNG');
  const [downloadSize, setDownloadSize] = useState('Medium');
  const [customSize, setCustomSize] = useState(256);

  const handleGenerate = () => {
    setQrValue(text);
  };

  const getSizeInPixels = (size) => {
    const sizes = {
      'Small': 128,
      'Medium': 256,
      'Large': 512,
      'Print (A4)': 150,
      'Custom': customSize
    };
    return sizes[size] || 256;
  };

  const handleDownload = (format = downloadFormat, size = downloadSize) => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const targetSize = getSizeInPixels(size);
    
    if (format === 'SVG') {
      // Direct SVG download
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      const filename = getFilenameSafe();
      downloadLink.download = `${filename}-${size.toLowerCase().replace(' ', '-')}.svg`;
      downloadLink.href = url;
      downloadLink.click();
      URL.revokeObjectURL(url);
      return;
    }

    // Canvas-based download for PNG and JPG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = targetSize;
      canvas.height = targetSize;
      
      // Set background color based on format
      if (format === 'JPG') {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, targetSize, targetSize);
      } else {
        ctx.clearRect(0, 0, targetSize, targetSize);
      }
      
      ctx.drawImage(img, 0, 0, targetSize, targetSize);
      
      const mimeType = format === 'JPG' ? 'image/jpeg' : 'image/png';
      const quality = format === 'JPG' ? 0.9 : 1.0;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      
      const downloadLink = document.createElement('a');
      const extension = format.toLowerCase();
      const filename = getFilenameSafe();
      downloadLink.download = `${filename}-${size.toLowerCase().replace(' ', '-')}.${extension}`;
      downloadLink.href = dataUrl;
      downloadLink.click();
      
      setShowDownloadOptions(false);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const getDisplayName = () => {
    return qrName.trim() || 'QR Code';
  };

  const getFilenameSafe = () => {
    if (!qrName.trim()) return 'qr-code';
    return qrName.trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-')          // Replace multiple hyphens with single
      .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const qrCodeElement = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(qrCodeElement);
    const displayName = getDisplayName();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${displayName}</title>
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
          <h1>${displayName}</h1>
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
          <div className="mb-6 space-y-4">
            <div>
              <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Name (optional):
              </label>
              <input
                id="name-input"
                type="text"
                value={qrName}
                onChange={(e) => setQrName(e.target.value)}
                placeholder="My QR Code, Business Card, Website Link..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            
            <div>
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
                <div className="relative">
                  <button
                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                    className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                  >
                    Download
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDownloadOptions && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10 min-w-80">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Format:</label>
                          <div className="flex gap-2">
                            {['PNG', 'JPG', 'SVG'].map((format) => (
                              <button
                                key={format}
                                onClick={() => setDownloadFormat(format)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  downloadFormat === format
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                {format}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Small', 'Medium', 'Large', 'Print (A4)', 'Custom'].map((size) => (
                              <button
                                key={size}
                                onClick={() => setDownloadSize(size)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                  downloadSize === size
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          
                          {downloadSize === 'Custom' && (
                            <div className="mt-2">
                              <label className="block text-xs text-gray-600 mb-1">Custom size (pixels):</label>
                              <input
                                type="number"
                                value={customSize}
                                onChange={(e) => setCustomSize(Math.max(50, Math.min(2048, parseInt(e.target.value) || 256)))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                min="50"
                                max="2048"
                              />
                            </div>
                          )}
                          
                          <div className="mt-1 text-xs text-gray-500">
                            {downloadSize !== 'Custom' ? `${getSizeInPixels(downloadSize)}px × ${getSizeInPixels(downloadSize)}px` : `${customSize}px × ${customSize}px`}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleDownload()}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium text-sm"
                          >
                            Download {downloadFormat}
                          </button>
                          <button
                            onClick={() => setShowDownloadOptions(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
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
      
      {/* Footer */}
      <footer className="mt-16 text-center animate-fadeIn">
        <div className="max-w-2xl mx-auto px-4">
          <div className="border-t border-gray-200 pt-8 pb-6 transform transition-all duration-1000 hover:scale-105">
            <div className="animate-pulse-slow">
              <p className="text-gray-600 text-sm mb-2 transition-colors duration-300 hover:text-blue-600">
                Powered by <span className="font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300 cursor-pointer transform hover:scale-110 inline-block">orderdabaly LLC</span>
              </p>
            </div>
            <p className="text-gray-500 text-xs transition-all duration-300 hover:text-gray-700 animate-slideUp">
              © {new Date().getFullYear()} orderdabaly LLC. All rights reserved.
            </p>
            
            {/* Animated decorative elements */}
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.5s both;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
