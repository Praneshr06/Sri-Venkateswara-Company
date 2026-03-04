# Debugging MongoDB Atlas Storage Issues

## Steps to Debug

### 1. Check Database Connection
Visit: `http://localhost:5000/api/test/test`

This will show:
- Connection state
- Database name
- User count
- Sample user (if any)

### 2. Check Backend Logs
When you try to signup, check your backend terminal for:
- "Creating user with data: ..."
- "User created successfully: ..."
- Any error messages

### 3. Common Issues

#### Issue: Connection String Missing Database Name
**Problem:** Connection string like: `mongodb+srv://...@cluster0.xxx.mongodb.net/?...`

**Solution:** Add database name: `mongodb+srv://...@cluster0.xxx.mongodb.net/myapp?...`

#### Issue: Password Encoding
**Problem:** Password contains special characters like `@`

**Solution:** URL encode the password:
- `@` becomes `%40`
- Example: `Pranesh270106@` → `Pranesh270106%40`

#### Issue: IP Not Whitelisted
**Problem:** Connection timeout or authentication error

**Solution:** 
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (for development)
3. Wait 2-3 minutes for changes to take effect

#### Issue: Wrong Database Name
**Problem:** Data saved to wrong database

**Solution:** Check your `.env` file - the database name is in the connection string after `.net/`

Example: `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/myapp?...`
                                                              ^^^^^^
                                                              This is your database name

### 4. Verify Data in MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections"
3. Look for a database named after your connection string (or "myapp" if that's what you used)
4. Look for a collection called "users"
5. Check if documents are there

### 5. Test Endpoint

You can test if data is being saved by:
1. Signing up a new user
2. Then checking: `http://localhost:5000/api/users`
3. This should list all users in the database

