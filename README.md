# Blog Application with Next.js and Strapi

This is a blog application built with **Next.js** for the frontend and **Strapi** as the CMS. The application is deployed on **Vercel**, while the backend (Strapi) is hosted on **Strapi Cloud**.

---

## **Live Demo**

- **Frontend (Next.js):** [https://next-blog-gilt-gamma.vercel.app/](https://next-blog-gilt-gamma.vercel.app/)
- **Backend Admin Panel (Strapi):** [https://smiling-strength-4b0dd9b607.strapiapp.com/admin/auth/login](https://smiling-strength-4b0dd9b607.strapiapp.com/admin/auth/login)

---

## **Repository Links**

- **Frontend (Next.js):** [https://github.com/deysan/next-blog](https://github.com/deysan/next-blog)
- **Backend (Strapi):** [https://github.com/deysan/strapi-blog](https://github.com/deysan/strapi-blog)

---

## **Key Features**

- **Home Page (`/`):** Displays all blogs with pagination.
- **Blog Page (`/blog/[slug]`):** Dynamic pages for individual blog posts.
- **Tags Page (`/tags/[tag]`):** Filter blogs by tags.
- **SEO Optimized:** Includes `sitemap.xml` and `robots.txt`.
- **Responsive Design:** Optimized for mobile and desktop.

---

## **Environment Variables**

> **Note:** These are test environment variables. Replace them with your own secure values when deploying to production.

### **Frontend (`.env`)**
```env
NEXT_PUBLIC_STRAPI_API_TOKEN=6e728495ce5ab743c3ec021a
NEXT_PUBLIC_STRAPI_API_URL=https://smiling-strength-4b0dd9b607.strapiapp.com
NEXT_PUBLIC_STRAPI_DOMAIN=smiling-strength-4b0dd9b607.media.strapiapp.com
NEXT_PUBLIC_BLOG_APP_URL=https://next-blog-gilt-gamma.vercel.app
```

### **Backend (`.env`)**
```
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

---

## **SEO Links**

- **Frontend Sitemap**: https://next-blog-gilt-gamma.vercel.app/sitemap.xml
- **Frontend Robots.txt**: https://next-blog-gilt-gamma.vercel.app/robots.txt

---

## **Performance**

Tested using [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-next-blog-gilt-gamma-vercel-app/jgtikaqnzt?form_factor=mobile). Performance optimizations have been applied to improve the overall user experience.

---

#### **License**

This project is licensed under the MIT License.
