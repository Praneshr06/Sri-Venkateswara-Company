# Troubleshooting Guide

## App Crashed - Common Issues and Solutions

### 1. Missing .env File

**Error:** `MONGODB_URI is not defined in .env file`

**Solution:**
1. Create a `.env` file in the `backend/` directory
2. Copy the content from `env.example`
3. Replace `<db_password>` with your actual MongoDB password

### 2. Incorrect MongoDB Connection String

**Error:** `Error connecting to MongoDB: Authentication failed`

**Solution:**
- Make sure you replaced `<db_password>` with your actual password
- Check that your username is correct: `praneshr006_db_user`
- Verify the connection string format is correct

**Correct format:**
```
mongodb+srv://praneshr006_db_user:YOUR_PASSWORD@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

### 3. IP Address Not Whitelisted

**Error:** `MongoNetworkError: connection timed out` or `IP not whitelisted`

**Solution:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Go to "Network Access" in the left sidebar
4. Click "Add IP Address"
5. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
6. Click "Confirm"
7. Wait a few minutes for changes to take effect

### 4. Missing Dependencies

**Error:** `Cannot find module 'mongoose'` or similar

**Solution:**
```bash
cd backend
npm install
```

### 5. Check Your .env File

Make sure your `.env` file looks like this (replace YOUR_PASSWORD):

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://praneshr006_db_user:YOUR_PASSWORD@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

### 6. Test MongoDB Connection

You can test your connection string directly:

1. Go to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "MongoDB Shell" or "Compass"
4. Try connecting with your credentials

### 7. Check Console Output

When you run `npm run dev`, you should see:
- ✅ MongoDB Connected: cluster0.dtpmwhm.mongodb.net
- 📊 Database: myapp
- 🚀 Backend server running on http://localhost:5000

If you see error messages, they will tell you exactly what's wrong.

### Quick Fix Checklist

- [ ] `.env` file exists in `backend/` directory
- [ ] `MONGODB_URI` is set in `.env` file
- [ ] Password in connection string is correct (no `<db_password>` placeholder)
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] All dependencies installed (`npm install`)
- [ ] Internet connection is working
- [ ] MongoDB cluster is running (not paused)

### Still Having Issues?

1. Check the exact error message in your terminal
2. Verify your MongoDB Atlas cluster is active
3. Try connecting via MongoDB Compass to test your credentials
4. Make sure there are no extra spaces in your `.env` file
5. Restart your terminal and try again

