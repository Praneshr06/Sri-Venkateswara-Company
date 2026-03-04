# Full-Stack Application

A modern full-stack application with separate **React frontend** and **Express backend**, ready for server hosting and deployment.

## 📁 Project Structure

```
fullstack-app/
├── frontend/          # React application (Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express API server
│   ├── routes/
│   ├── server.js
│   └── package.json
└── package.json       # Root package.json for managing both
```

## 🚀 Features

### Frontend
- ⚡ React 18 with Vite
- 🎨 Modern, responsive UI
- 🔄 API integration with backend
- 📦 Optimized production builds

### Backend
- 🚀 Express.js REST API
- 🗄️ MongoDB Atlas integration
- 🔒 CORS configured
- 📡 RESTful endpoints
- 🛡️ Error handling middleware
- ⚙️ Environment variable support

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

## 🛠️ Installation

### Option 1: Install All at Once (Recommended)

From the root directory:
```bash
npm run install:all
```

### Option 2: Install Separately

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

## 💻 Development

### Run Both Frontend and Backend

From the root directory:
```bash
npm run dev
```

This will start:
- **Frontend** on `http://localhost:3000`
- **Backend** on `http://localhost:5000`

### Run Separately

**Frontend only:**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

**Backend only:**
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

### Backend

The backend runs directly with Node.js. For production:

```bash
cd backend
npm start
```

## 🌐 API Endpoints

The backend provides the following API endpoints:

- `GET /health` - Server health check
- `GET /api/health` - API health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example API Calls

```bash
# Health check
curl http://localhost:5000/api/health

# Get all users
curl http://localhost:5000/api/users

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

**MongoDB Atlas Setup:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free M0 tier)
3. Create a database user
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Get your connection string and add it to `.env` as `MONGODB_URI`

See `backend/README.md` for detailed MongoDB Atlas setup instructions.

### Frontend API Configuration

The frontend is configured to proxy API requests to the backend. See `frontend/vite.config.js` for proxy settings.

## 🚢 Deployment

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `frontend/dist/` folder to:
   - **Netlify**: Drag & drop or Git integration
   - **Vercel**: Run `vercel` or connect Git
   - **GitHub Pages**: Use GitHub Actions
   - **AWS S3 + CloudFront**: Upload dist contents
   - **Any static host**: Upload dist folder

### Backend Deployment

1. Set environment variables on your hosting platform
2. Deploy to:
   - **Heroku**: `git push heroku main`
   - **Railway**: Connect repository
   - **Render**: Connect repository
   - **AWS EC2/Elastic Beanstalk**: Deploy Node.js app
   - **DigitalOcean App Platform**: Connect repository
   - **VPS**: Use PM2 or similar process manager

#### Example: Deploying Backend to VPS with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start server.js --name backend-api

# Save PM2 configuration
pm2 save
pm2 startup
```

### Full-Stack Deployment Options

#### Option 1: Separate Hosting (Recommended)
- Frontend: Static hosting (Netlify, Vercel)
- Backend: Platform-as-a-Service (Railway, Render, Heroku)

#### Option 2: Same Server
- Serve frontend build from backend (Express static files)
- Or use Nginx to serve frontend and proxy API to backend

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Available Scripts

### Root Level
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run build` - Build frontend for production
- `npm run start:backend` - Start backend in production mode
- `npm run start:frontend` - Preview frontend production build

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## 🔧 Development Tips

1. **CORS**: Backend is configured to accept requests from `http://localhost:3000`. Update `FRONTEND_URL` in backend `.env` if needed.

2. **API Proxy**: Frontend Vite config proxies `/api` requests to backend. This works in development only.

3. **Environment Variables**: Use `.env` files for configuration. Never commit `.env` files to Git.

4. **Hot Reload**: Both frontend and backend support hot reload in development mode.

## 📚 Next Steps

1. Add a database (MongoDB, PostgreSQL, MySQL)
2. Implement authentication (JWT, Passport.js)
3. Add validation (Joi, express-validator)
4. Set up testing (Jest, React Testing Library)
5. Add API documentation (Swagger/OpenAPI)
6. Implement error logging and monitoring

## 📄 License

MIT
