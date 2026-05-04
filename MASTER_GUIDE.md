# 🚀 Backend Master Architecture Guide (Modular Pattern)

এই গাইডটি আপনাকে একটি প্রফেশনাল লেভেলের ব্যাকএন্ড প্রজেক্ট সেটআপ করতে সাহায্য করবে। এখানে আমরা **Modular Pattern** ব্যবহার করেছি যা বড় প্রজেক্টের জন্য সবচেয়ে উপযোগী।

This guide will help you set up a professional-level backend project using the **Modular Pattern**, which is ideal for large-scale applications.

---

## 📂 Folder Structure (ফোল্ডার স্ট্রাকচার)

একটি বড় প্রজেক্টের জন্য নিচের স্ট্রাকচারটি ফলো করা হয়:
For a large project, the following structure is followed:

```text
src/
├── app.ts                # App initialization (Express setup)
├── server.ts             # Entry point (Server listening)
├── config/               # Configurations (DB, Environment variables, Logger)
├── interfaces/           # Global TypeScript interfaces
├── middlewares/          # Reusable middlewares (Auth, Validation, Error Handler)
├── errors/               # Custom error classes (ApiError)
├── utils/                # Utility functions (catchAsync, sendResponse)
├── routes/               # Centralized routing (Combines all modules)
├── modules/              # FEATURE-BASED MODULES (The heart of Modular Pattern)
│   ├── User/             # User Module
│   │   ├── user.interface.ts   # TS types for user
│   │   ├── user.model.ts       # DB Model (Prisma/Mongoose)
│   │   ├── user.service.ts     # Business logic (DB operations)
│   │   ├── user.controller.ts  # Handles Request/Response
│   │   ├── user.route.ts       # Routes for this module
│   │   └── user.validation.ts  # Zod validation schema
│   └── Auth/             # Auth Module
│       ├── auth.controller.ts
│       └── ...
```

---

## 🛠️ Step-by-Step Setup (ধাপে ধাপে সেটআপ)

### Step 1: Initialize Project (প্রজেক্ট শুরু করা)
প্রথমে একটি নতুন প্রজেক্ট ফোল্ডার তৈরি করুন এবং `npm init` করুন।
First, create a project folder and run `npm init`.

```bash
npm init -y
npm install express cors dotenv helmet morgan winston zod
npm install -D typescript ts-node nodemon @types/express @types/cors @types/node @types/morgan
npx tsc --init
```

### Step 2: Global Utilities (গ্লোবাল ইউটিলিটি)
আমরা `catchAsync` এবং `sendResponse` ব্যবহার করি কোড ক্লিন রাখার জন্য।
We use `catchAsync` and `sendResponse` to keep the code clean.

**`src/utils/catchAsync.ts`**:
Handles async errors without try-catch blocks. (ট্রাই-ক্যাচ ব্লক ছাড়া এরর হ্যান্ডল করে)

**`src/utils/sendResponse.ts`**:
Standardizes API responses. (এপিআই রেসপন্স স্ট্যান্ডার্ড করে)

### Step 3: Global Error Handling (গ্লোবাল এরর হ্যান্ডলিং)
যেকোনো এরর হ্যান্ডল করার জন্য একটি সেন্ট্রাল এরর হ্যান্ডলার থাকা জরুরি।
It's essential to have a central error handler.

### Step 4: Modular Logic (মডুলার লজিক)
প্রতিটি ফিচার (যেমন: User, Product) আলাদা আলাদা ফোল্ডারে থাকবে।
Each feature (e.g., User, Product) will be in its own folder.
- **Interface**: টাইপ ডিফাইন করার জন্য।
- **Model**: ডাটাবেস এর সাথে কানেক্ট করার জন্য।
- **Service**: মেইন বিজনেস লজিক লেখার জন্য।
- **Controller**: রিকোয়েস্ট রিসিভ করা এবং রেসপন্স পাঠানোর জন্য।
- **Route**: এন্ডপয়েন্ট ডিফাইন করার জন্য।

---

## 📝 Coding Standards (কোডিং স্ট্যান্ডার্ড)

1. **Don't Repeat Yourself (DRY)**: রিইউজেবল কোড ইউটিলিটি বা মিডলওয়্যারে রাখুন।
2. **Standard Responses**: সব সময় `success`, `message`, `data` ফরম্যাট ব্যবহার করুন।
3. **Validation**: ক্লায়েন্ট থেকে আসা ডাটা সবসময় `Zod` দিয়ে ভ্যালিডেট করুন।
4. **Environment Variables**: কখনোই সিক্রেট কোড সরাসরি ফাইল এ লিখবেন না, `.env` ব্যবহার করুন।

---

## 🇧🇩 কিভাবে শুরু করবেন? (Bangla Summary)

১. **ফোল্ডার তৈরি**: প্রথমে `src` এর ভেতর `modules` ফোল্ডার করুন।
২. **ফিচার ভিত্তিক ফোল্ডার**: আপনার অ্যাপে যদি `Auth` থাকে, তবে `modules/Auth` নামে ফোল্ডার করুন।
৩. **লজিক ভাগ করা**: রুট এর কাজ শুধু কন্ট্রোলার এ পাঠানো, কন্ট্রোলার এর কাজ শুধু সার্ভিস কল করা, আর সার্ভিস এর কাজ ডাটাবেস এ কাজ করা। 

এই প্রজেক্টে অলরেডি `User` মডিউল এর একটি উদাহরণ দেওয়া আছে। আপনি চাইলে সেটা দেখে আরও মডিউল তৈরি করতে পারেন।

---

## 🚀 Future Improvements (ভবিষ্যত উন্নয়ন)
- **Database Integration**: Prisma বা Mongoose যোগ করুন।
- **Auth**: JWT এবং Passport.js দিয়ে সিকিউরিটি যোগ করুন।
- **Docker**: কন্টেইনারাইজ করার জন্য Dockerfile যোগ করুন।
