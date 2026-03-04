# Quick Setup Guide

## Step 1: Create .env File

Create a `.env` file in the `backend/` directory with the following content:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://praneshr006_db_user:YOUR_PASSWORD@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

## Step 2: Replace Placeholders

**IMPORTANT:** Replace the following in your `.env` file:

1. **`YOUR_PASSWORD`** - Replace with your actual MongoDB Atlas database password
2. **`myapp`** - Replace with your preferred database name (or keep `myapp`)

### Example:
If your password is `MySecurePass123` and you want to use database name `myapp`, your connection string should be:

```env
MONGODB_URI=mongodb+srv://praneshr006_db_user:MySecurePass123@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.dtpmwhm.mongodb.net
📊 Database: myapp
🚀 Backend server running on http://localhost:5000
```

## Troubleshooting

- **"Authentication failed"**: Make sure you replaced `YOUR_PASSWORD` with your actual password
- **"IP not whitelisted"**: Go to MongoDB Atlas → Network Access → Add IP Address (use 0.0.0.0/0 for development)
- **Connection timeout**: Check your internet connection

