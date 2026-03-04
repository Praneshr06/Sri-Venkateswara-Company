# Contact Form Debugging Guide

## Issue: Contact form not working

### Step 1: Check if Backend Server is Running

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. You should see:
   ```
   ✅ MongoDB Connected: ...
   🚀 Backend server running on http://localhost:5000
   📡 API endpoints available at http://localhost:5000/api
   ```

### Step 2: Test the Contact Endpoint Directly

Open your browser or use curl to test:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

Or use Postman/Thunder Client to test the endpoint.

### Step 3: Check Frontend Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try submitting the form
4. Check for any error messages

### Step 4: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try submitting the form
4. Look for the `/api/contact` request
5. Check:
   - Request status (should be 200 or 201)
   - Request payload
   - Response data

### Common Issues:

1. **Backend not running**: Make sure backend server is running on port 5000
2. **CORS error**: Check backend CORS configuration in `backend/server.js`
3. **Database connection**: Make sure MongoDB is connected (check backend console)
4. **Proxy not working**: Vite proxy should forward `/api` to `http://localhost:5000`

### Quick Fixes:

1. **Restart both servers**:
   - Stop frontend (Ctrl+C)
   - Stop backend (Ctrl+C)
   - Start backend first: `cd backend && npm run dev`
   - Start frontend: `cd frontend && npm run dev`

2. **Check MongoDB connection**: Make sure `.env` file has correct `MONGODB_URI`

3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Test the Endpoint:

Visit: http://localhost:5000/api/health

Should return:
```json
{
  "status": "success",
  "message": "API is healthy"
}
```

