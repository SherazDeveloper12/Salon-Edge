# 📱 Salon Edge - OTP Phone Verification

## ✅ Working Phone OTP Methods

### **1. Local SMS Gateway (Production Ready)** 🚀
**URL:** http://localhost:3000/local-sms-auth

**Features:**
- ✅ Real SMS to actual phone numbers
- ✅ Uses your local SMS gateway (192.168.18.91:8082)
- ✅ 100% FREE - No external API costs
- ✅ Fast delivery on local network
- ✅ Pakistan fully supported
- ✅ Perfect for production use

**Configuration:**
```env
REACT_APP_LOCAL_SMS_API_URL=http://192.168.18.91:8082/
REACT_APP_LOCAL_SMS_AUTH_TOKEN=fd03d49e-5b23-4e3c-8e2a-000927fdb493
```

---

### **2. Mock OTP (Development/Testing)** 🎯
**URL:** http://localhost:3000/mock-phone-auth

**Features:**
- ✅ OTP displays on screen
- ✅ No SMS gateway needed
- ✅ Perfect for development
- ✅ 5-minute validity timer
- ✅ Zero setup required

---

## 🚀 Usage

### **For Production:**
Use **Local SMS Gateway** at `/local-sms-auth`
- Real SMS delivery
- Your own gateway
- No external costs

### **For Development:**
Use **Mock OTP** at `/mock-phone-auth`
- Instant testing
- No SMS needed
- Perfect for demos

---

## 📂 Project Structure

```
src/
  services/
    localSMSService.js   # Local SMS Gateway service
  pages/
    phoneAuth/
      LocalSMSAuth.js    # Real SMS OTP page
      MockPhoneAuth.js   # Mock OTP page (dev/testing)
  navigation/
    Navigation.js        # Routes configured
```

---

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure .env:**
   ```env
   REACT_APP_LOCAL_SMS_API_URL=http://192.168.18.91:8082/
   REACT_APP_LOCAL_SMS_AUTH_TOKEN=fd03d49e-5b23-4e3c-8e2a-000927fdb493
   ```

3. **Start app:**
   ```bash
   npm start
   ```

4. **Test:**
   - Production: http://localhost:3000/local-sms-auth
   - Development: http://localhost:3000/mock-phone-auth

---

## ✨ Features

**Local SMS Gateway:**
- Real SMS delivery to phone
- Custom message templates
- OTP generation & verification
- 5-minute OTP validity
- Max 3 verification attempts
- Development mode shows OTP in console

**Mock OTP:**
- Instant OTP generation
- On-screen OTP display
- Timer countdown
- Perfect for testing

---

## 🎯 Use Cases

**Local SMS Auth:**
- Production deployment
- Real user registration
- Account verification
- Two-factor authentication

**Mock OTP:**
- Development testing
- Demo presentations
- Portfolio projects
- Quick prototyping

---

## 📞 Support

For issues with Local SMS Gateway, ensure:
- Gateway is running at 192.168.18.91:8082
- Auth token is correct
- Network connectivity is good
- Proxy is configured properly

---

**Built with ❤️ for Salon Edge**
