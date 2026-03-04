# Contact Form Troubleshooting Guide

## Quick Checklist

1. **Backend Server Running?**
   - Open terminal in `backend` folder
   - Run: `npm run dev` or `node server.js`
   - Should see: `🚀 Backend server running on http://localhost:5000`

2. **Frontend Server Running?**
   - Open terminal in `frontend` folder
   - Run: `npm run dev`
   - Should see: `Local: http://localhost:3000`

3. **MongoDB Connected?**
   - Check backend console for: `✅ MongoDB Connected`
   - If not connected, check your `.env` file in `backend` folder
   - Make sure `MONGODB_URI` is set correctly

4. **Test the API Endpoint**
   - Open browser: `http://localhost:5000/api/contact/test`
   - Should see: `{"status":"success","message":"Contact endpoint is working"}`
   - If you see 404, the route isn't registered

## Common Issues

### Issue: "Cannot connect to server"
**Solution:**
- Make sure backend is running on port 5000
- Check if port 5000 is already in use
- Verify CORS settings in `backend/server.js`

### Issue: "Network error"
**Solution:**
- Check browser console (F12) for detailed error
- Verify Vite proxy is working (check `frontend/vite.config.js`)
- Try accessing backend directly: `http://localhost:5000/api/contact/test`

### Issue: "Validation error"
**Solution:**
- Make sure all required fields are filled (Name, Email, Subject, Message)
- Check field lengths:
  - Name: 2-50 characters
  - Subject: 3-200 characters
  - Message: 10-2000 characters

### Issue: Form submits but nothing happens
**Solution:**
- Check browser console for errors
- Check backend console for errors
- Verify MongoDB connection is working
- Check if Contact model is loaded (should see no errors in backend console on startup)

## Testing Steps

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend (in new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Test API endpoint:
   - Visit: `http://localhost:5000/api/contact/test`
   - Should return success message

4. Test form submission:
   - Fill out contact form
   - Submit
   - Check browser console for logs
   - Check backend console for logs
   - Should see success message on page

## Debug Information

The contact form includes console logging. Open browser DevTools (F12) and check:
- Network tab: See the actual request/response
- Console tab: See detailed logs
- Application tab: Check if any errors are stored

## Backend Logs to Check

When you submit the form, you should see in backend console:
```
POST /api/contact
```

If you see errors, they will be logged there.

