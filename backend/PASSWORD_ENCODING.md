# Password Encoding for MongoDB Connection String

## Issue
If your MongoDB password contains special characters like `@`, `#`, `%`, `&`, etc., they need to be URL-encoded in the connection string.

## Common Special Characters and Their Encodings

| Character | URL Encoding |
|-----------|--------------|
| `@`       | `%40`        |
| `#`       | `%23`        |
| `%`       | `%25`        |
| `&`       | `%26`        |
| `+`       | `%2B`        |
| `=`       | `%3D`        |
| `?`       | `%3F`        |
| `/`       | `%2F`        |
| `:`       | `%3A`        |
| ` ` (space) | `%20`      |

## Your Case
Your password is: `Pranesh270106@`

The `@` symbol needs to be encoded as `%40`

So your password in the connection string should be: `Pranesh270106%40`

## Correct Connection String Format

**Before (incorrect):**
```
mongodb+srv://praneshr006_db_user:Pranesh270106@@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

**After (correct):**
```
mongodb+srv://praneshr006_db_user:Pranesh270106%40@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

## Quick Fix

Update your `.env` file with:

```env
MONGODB_URI=mongodb+srv://praneshr006_db_user:Pranesh270106%40@cluster0.dtpmwhm.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0
```

Notice: `Pranesh270106@` became `Pranesh270106%40`

## Online URL Encoder
If you have other special characters, you can use an online URL encoder:
- https://www.urlencoder.org/
- Just paste your password and copy the encoded version

