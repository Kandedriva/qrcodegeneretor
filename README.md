# QR Code Generator

A modern, responsive QR code generator built with React and Tailwind CSS. Create QR codes instantly from any text or URL with download and print functionality.

## Features

- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS styling
- ⚡ **Instant Generation**: Real-time QR code generation from text or URLs
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 💾 **Download Support**: Download QR codes as PNG images
- 🖨️ **Print Ready**: Optimized print layout that fits A4 paper perfectly
- 🔗 **Versatile Input**: Supports any text, URLs, phone numbers, or other data
- ✨ **User-Friendly**: Intuitive interface with clear visual feedback

## Screenshots

The application features a beautiful gradient background with a centered card layout, making it easy to generate and manage QR codes.

## Technologies Used

- **React**: Frontend framework for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **react-qr-code**: React component for generating QR codes
- **JavaScript**: Core programming language

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qrcodegeneretor.git
cd qrcodegeneretor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

1. **Enter Text or URL**: Type any text, URL, phone number, or other data into the input field
2. **Generate QR Code**: Click the "Generate QR Code" button to create your QR code
3. **Download**: Click "Download PNG" to save the QR code as an image file
4. **Print**: Click "Print" to open a print-ready version optimized for A4 paper

## Features in Detail

### QR Code Generation
- Supports any text input including URLs, plain text, phone numbers, email addresses
- Instant preview of generated QR codes
- High-quality SVG-based QR codes that scale perfectly

### Download Functionality
- Converts SVG QR codes to PNG format
- Automatic file download with descriptive filename
- High-resolution output suitable for digital use

### Print Optimization
- Opens print-friendly window with clean layout
- Optimized sizing for A4 paper (150x150px when printed)
- Includes content information for reference
- Professional styling for physical documents

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## Project Structure

```
qrcodegeneretor/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Application entry point
│   ├── index.css       # Tailwind CSS imports
│   └── ...
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- QR code generation powered by [react-qr-code](https://github.com/rosskhanas/react-qr-code)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

**Created with ❤️ using React and Tailwind CSS**
