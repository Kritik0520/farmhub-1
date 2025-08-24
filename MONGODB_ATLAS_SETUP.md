# 🗄️ MongoDB Atlas Setup Guide

## 🎯 Your MongoDB Atlas Configuration

You're using MongoDB Atlas (cloud database) instead of a local MongoDB installation. Here's how to set it up:

## 📍 Your Connection String

```
mongodb+srv://kritikgoel:<db_password>@cluster0.iixiuw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## 🔧 Setup Steps

### 1. Create Environment File

```bash
# Navigate to server directory
cd server

# Copy the environment template
cp env.example .env

# Edit the .env file
nano .env
```

### 2. Update Your .env File

Replace the MongoDB URI line with your actual password:

```env
# Replace <db_password> with your actual MongoDB Atlas password
MONGODB_URI=mongodb+srv://kritikgoel:YOUR_ACTUAL_PASSWORD@cluster0.iixiuw5.mongodb.net/farmhub?retryWrites=true&w=majority&appName=Cluster0
```

**Important Notes:**
- Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB Atlas password
- The `farmhub` after `.net/` is the database name (you can change this)
- Keep the `?retryWrites=true&w=majority&appName=Cluster0` parameters

### 3. Test Connection

```bash
# Start the server
npm run dev
```

You should see:
```
🚀 FarmHub Server running on port 5000
🗄️ MongoDB Atlas Connected: cluster0.iixiuw5.mongodb.net
🗄️ Database: farmhub
```

## 🔒 Security Best Practices

### 1. Password Requirements
- Use a strong, unique password
- Don't use special characters that might cause parsing issues
- Consider using URL encoding if needed

### 2. Network Access
- Ensure your IP address is whitelisted in MongoDB Atlas
- Or use `0.0.0.0/0` for development (not recommended for production)

### 3. Database User
- Use a dedicated database user, not your main Atlas account
- Grant only necessary permissions (readWrite on farmhub database)

## 🚨 Troubleshooting

### Connection Refused
```
MongoDB Connection Error: connect ECONNREFUSED
```
**Solution**: Check your password and ensure the connection string is correct

### Authentication Failed
```
MongoDB Connection Error: Authentication failed
```
**Solution**: Verify your username and password in MongoDB Atlas

### Network Timeout
```
MongoDB Connection Error: Server selection timed out
```
**Solution**: Check your internet connection and MongoDB Atlas status

### Invalid Connection String
```
MongoDB Connection Error: Invalid connection string
```
**Solution**: Ensure the connection string format is exactly as shown above

## 📱 MongoDB Atlas Dashboard

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com
2. **Select Your Cluster**: Cluster0
3. **Database Access**: Verify your user credentials
4. **Network Access**: Check IP whitelist
5. **Collections**: Monitor your farmhub database

## 🎉 Success Indicators

When everything is working correctly, you'll see:

```
🚀 FarmHub Server running on port 5000
🗄️ MongoDB Atlas Connected: cluster0.iixiuw5.mongodb.net
🗄️ Database: farmhub
📱 SMS Service: Not configured
🌤️  Weather API: Not configured
🏪 Market API: Not configured
```

## 🔄 Next Steps

1. **Test the Connection**: Start the server and verify MongoDB connection
2. **Create Collections**: The server will automatically create the required collections
3. **Test APIs**: Try registering a farmer to test database operations
4. **Monitor**: Check MongoDB Atlas dashboard for data

## 📞 Need Help?

- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **Connection String Guide**: https://docs.mongodb.com/manual/reference/connection-string/
- **Network Access**: Ensure your IP is whitelisted in Atlas

---

**Your FarmHub platform is now configured to use MongoDB Atlas! 🎯**

