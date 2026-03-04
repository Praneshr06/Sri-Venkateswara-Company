# Backend API Server

Express.js backend server with MongoDB Atlas integration for the full-stack application.

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Atlas Setup

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account (or log in if you have one)
3. Create a new project (or use an existing one)

#### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose the **FREE (M0)** tier
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"

#### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (save these!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

#### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, add only your server's IP address
4. Click "Confirm"

#### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "5.5 or later"
5. Copy the connection string
   - It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your database user password
7. Replace `<dbname>` (or add it) with your database name (e.g., `myapp`)

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp env.example .env
```

Or create `.env` manually with:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

**Important**: Replace the `MONGODB_URI` with your actual connection string from MongoDB Atlas.

### 4. Start the Server

```bash
npm run dev
```

The server will:
- Connect to MongoDB Atlas
- Run on `http://localhost:5000`
- Show connection status in the console

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health check
- `GET /api/health` - API health check (includes database status)

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js    # MongoDB connection
├── models/
│   └── User.js        # User model (Mongoose schema)
├── routes/
│   └── api.js         # API routes
├── server.js          # Main server file
├── package.json
└── .env               # Environment variables (create this)
```

## 🔧 Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)
- `MONGODB_URI` - MongoDB Atlas connection string (required)

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 characters),
  email: String (required, unique, valid email format),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## ✅ Verification

After starting the server, you should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: myapp
🚀 Backend server running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api
💚 Health check: http://localhost:5000/health
```

## 🐛 Troubleshooting

### Connection Issues
- **"Authentication failed"**: Check your username and password in the connection string
- **"IP not whitelisted"**: Add your IP address in MongoDB Atlas Network Access
- **"Connection timeout"**: Check your internet connection and firewall settings

### Common Errors
- Make sure `.env` file exists and contains `MONGODB_URI`
- Verify the connection string format is correct
- Ensure database user has proper permissions
- Check that your cluster is running (not paused)

## 📚 Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)

