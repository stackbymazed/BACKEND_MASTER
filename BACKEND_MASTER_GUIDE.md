# 🚀 Ultimate Backend Setup Guide (Node.js + Express + TypeScript + Prisma)

এই গাইডটি আপনাকে একটি ইন্ডাস্ট্রি স্ট্যান্ডার্ড ব্যাকএন্ড আর্কিটেকচার তৈরি করতে সাহায্য করবে। এখানে প্রতিটি পার্ট কেন এবং কোথায় ব্যবহার করবেন তার বিস্তারিত বিশ্লেষণ দেওয়া হলো।

---

## 📂 ১. আর্কিটেকচার ও ফোল্ডার বিশ্লেষণ (Folder Analysis)

আমাদের ব্যাকএন্ড **Layered Architecture** অনুসরণ করে। এর মানে হলো প্রতিটি কাজের জন্য আলাদা আলাদা লেয়ার বা ফোল্ডার থাকবে।

### ১.১ `src/server.ts`
*   **কাজ:** এটি প্রজেক্টের এন্ট্রি পয়েন্ট।
*   **কেন ব্যবহার করবেন:** ডাটাবেস কানেকশন চেক করা এবং সার্ভার স্টার্ট করার জন্য এটি ব্যবহৃত হয়। অ্যাপ্লিকেশনের মেইন লজিক এখানে থাকে না, শুধু স্টার্টআপ কনফিগ থাকে।

### ১.২ `src/app.ts`
*   **কাজ:** এখানে এক্সপ্রেস (Express) অ্যাপ্লিকেশন কনফিগার করা হয়।
*   **কেন ব্যবহার করবেন:** গ্লোবাল মিডলওয়্যার (CORS, JSON Parser) এবং রুট (Routes) গুলোকে এখানে রেজিস্টার করা হয়।

### ১.৩ `src/controllers/`
*   **কাজ:** ইউজারের রিকোয়েস্ট গ্রহণ করা এবং রেসপন্স পাঠানো।
*   **কেন ব্যবহার করবেন:** কন্ট্রোলার শুধু জানে ইউজার কী ডাটা পাঠালো এবং তাকে কী রিটার্ন করতে হবে। এটি কোনো বিজনেস লজিক প্রসেস করে না।

### ১.৪ `src/services/` (খুবই গুরুত্বপূর্ণ)
*   **কাজ:** আসল বিজনেস লজিক এবং ডাটাবেস অপারেশন (Prisma queries) এখানে থাকে।
*   **কেন ব্যবহার করবেন:** আপনার কোড ক্লিন রাখার জন্য। ধরুন, রেজাল্ট ক্যালকুলেট করা বা বড় কোনো ডাটা প্রসেস করা—এগুলো সার্ভিসের কাজ। কন্ট্রোলার শুধু এই সার্ভিসকে কল করে।

### ১.৫ `src/routes/`
*   **কাজ:** ইউআরএল (Endpoints) ডিফাইন করা।
*   **কেন ব্যবহার করবেন:** কোন ইউআরএল কল করলে কোন কন্ট্রোলারে যাবে তা এখানে বলে দেওয়া হয়। যেমন: `/api/v1/students` -> `StudentController`.

### ১.৬ `src/middlewares/`
*   **কাজ:** রিকোয়েস্ট ফিল্টার করা।
*   **কেন ব্যবহার করবেন:** যেমন—ইউজার লগইন করা কি না (Auth Guard) বা ইনপুট ভ্যালিডেশন চেক করা। রিকোয়েস্ট কন্ট্রোলারে যাওয়ার আগেই এখানে আটকে দেওয়া যায়।

---

## 🛠 ২. স্টেপ-বাই-স্টেপ সেটআপ (Full Setup)

### ধাপ ১: প্রজেক্ট ইনিশিয়ালাইজেশন
```bash
npm init -y
npm install express cors dotenv @prisma/client bcryptjs firebase-admin multer
npm install -D typescript @types/node @types/express @types/cors @types/multer tsx prisma nodemon
```

### ধাপ ২: টাইপস্ক্রিপ্ট কনফিগ (`npx tsc --init`)
আপনার `tsconfig.json` ফাইলে `rootDir` এবং `outDir` সেট করুন:
```json
"rootDir": "./src",
"outDir": "./dist"
```

### ধাপ ৩: ডাটাবেস ও প্রিজমা সেটআপ
```bash
npx prisma init
```
`prisma/schema.prisma` ফাইলে আপনার মডেল (Model) ডিফাইন করুন এবং রান করুন:
```bash
npx prisma generate
npx prisma db push
```

---

## 💻 ৩. বেস কোড (Core Boilerplate)

### ৩.১ সার্ভিস লেয়ার (Example: `src/services/student.service.ts`)
```typescript
import { prisma } from "../lib/prisma";

export const getAllStudents = async () => {
    return await prisma.student.findMany(); // ডাটাবেস অপারেশন এখানে থাকবে
};
```

### ৩.২ কন্ট্রোলার লেয়ার (Example: `src/controllers/student.controller.ts`)
```typescript
import { Request, Response } from "express";
import * as StudentService from "../services/student.service";

export const getStudents = async (req: Request, res: Response) => {
    try {
        const data = await StudentService.getAllStudents();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
```

---

## 🔒 ৪. বেস্ট প্র্যাকটিস (Best Practices)

1.  **Error Handling:** সবসময় `try-catch` ব্যবহার করুন অথবা একটি গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার তৈরি করুন।
2.  **Environment Variables:** কখনো পাসওয়ার্ড বা সিক্রেট কি সরাসরি কোডে লিখবেন না, সব `.env` ফাইলে রাখুন।
3.  **Response Format:** সব API এর জন্য একটি কমন রেসপন্স ফরম্যাট ফলো করুন (যেমন: `{ success: boolean, data: any, message: string }`)।
4.  **Validation:** ইউজারের কাছ থেকে আসা ডাটা প্রসেস করার আগে `Zod` বা `Joi` দিয়ে ভ্যালিডেশন করে নিন।

---

## 🚀 ৫. প্রোডাকশনে যাওয়ার জন্য প্রস্তুত (Deployment)
প্যাকেজ ডট জেসন ফাইলে এই স্ক্রিপ্টগুলো যোগ করুন:
```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "npx prisma generate && tsc",
  "start": "node dist/server.js"
}
```

এখন আপনি `npm run dev` দিয়ে কাজ শুরু করতে পারেন এবং `npm run build` দিয়ে প্রোডাকশনের জন্য কোড তৈরি করতে পারেন।
