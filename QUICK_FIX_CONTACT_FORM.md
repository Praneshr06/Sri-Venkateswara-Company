# Quick Fix: Contact Form Not Working

## ⚡ Quick Steps to Fix

### Step 1: Start Backend Server
Open a **NEW terminal window** and run:
```bash
cd backend
npm run dev
```

**You should see:**
```
✅ MongoDB Connected
🚀 Backend server running on http://localhost:5000
```

### Step 2: Keep Frontend Running
In your **existing terminal** (or another new one):
```bash
cd frontend
npm run dev
```

### Step 3: Test the Form
1. Open browser: `http://localhost:3000`
2. Go to Contact page
3. Fill out the form:
   - Name: (required, 2+ characters)
   - Email: (required, valid email)
   - Subject: (required, 3+ characters)
   - Message: (required, 10+ characters)
4. Click "Send Message"

## 🔍 Troubleshooting

### Error: "Cannot connect to server"
**Solution:** Backend is not running
- Open terminal
- Run: `cd backend && npm run dev`
- Wait for: `🚀 Backend server running on http://localhost:5000`

### Error: "Request timed out"
**Solution:** Backend is not responding
- Check if backend is running
- Check if port 5000 is available
- Restart backend server

### Error: "Validation error"
**Solution:** Check field requirements:
- Name: 2-50 characters
- Email: Valid email format
- Subject: 3-200 characters  
- Message: 10-2000 characters

### Form submits but nothing happens
**Check:**
1. Browser console (F12 → Console tab)
2. Backend console (terminal where backend is running)
3. Network tab (F12 → Network tab) - see the request

## ✅ Verification

**Test Backend:**
Visit: `http://localhost:5000/api/contact/test`
Should return: `{"status":"success","message":"Contact endpoint is working"}`

**Test Frontend:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. You should see: `✓ Backend connection successful`
4. If you see warning, backend is not running

## 📝 What Was Fixed

1. ✅ Fixed `AbortSignal.timeout()` compatibility issue
2. ✅ Added connection test on page load
3. ✅ Improved error messages
4. ✅ Added better timeout handling
5. ✅ Enhanced logging for debugging

## 🚨 Important Notes

- **Both servers must be running** for the form to work
- Backend on port **5000**
- Frontend on port **3000**
- MongoDB must be connected (check backend console)

If you still have issues, check the browser console (F12) for specific error messages!

