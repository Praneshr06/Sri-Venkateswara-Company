# Frontend React Application

React frontend built with Vite for the full-stack application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx     # Main app component
│   ├── App.css     # App styles
│   ├── main.jsx    # Entry point
│   └── index.css   # Global styles
├── index.html
└── vite.config.js
```

## API Integration

The frontend is configured to proxy API requests to the backend:
- Development: Proxies `/api/*` to `http://localhost:5000`
- Production: Update API base URL in your code

