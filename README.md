# 👕 BharatBasics

> A modern e-commerce App frontend for clothing catalogue — built with React + Vite.

## ✨ Features

- Browse categories, featured collections, and curated picks
- Product listing and detailed product view
- Cart & wishlist synced to backend
- Full address management (add/edit/delete)
- Checkout with order placement
- Order confirmation & order history
- Live product search
- Toast notifications for all actions
- Responsive design (Bootstrap 5)

## 🛠️ Tech Stack

**React 19 · Vite 8 · React Router 7 · Bootstrap 5 · React Context**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

### Clone the Repository
```bash
- git clone `https://github.com/Rohank2000/Clothing-Ecommerce-App-FrontEnd-Data-.git`
- cd `Major_Project_1_Frontend` # <your-own-repo>
- Install Dependencies
- npm install
```

#### Environment Variables

```bash
- Create a .env file in the project root:
- `BASE_URL=https://bharatbasicsapi.vercel.app/`
```

#### Run Development Server

- npm run dev

#### Build for Production

- npm run build
- npm run preview

## Live Project Link 

<a href="https://bharatbasics.vercel.app/">Live Link</a>

## Demo Link
<a href="https://drive.google.com/file/d/1hzJ8fVFbJgs6ZoRNd3VDFzVEZgjGZUdr/view?usp=sharing">Video Link</a>

## 🧭 Routes

| Path | Description |
| --- | --- |
| `/` | Home page displaying featured collections and curated picks |
| `/category/productlist/:categoryId` | Product listing page filtered by a specific category |
| `/category/productlist/details/:clothingId` | Detailed view for a selected clothing item |
| `/user/wishlist` | User's saved wishlist items |
| `/user/cart` | Shopping cart items and summary |
| `/user/profile` | User profile management overview |
| `/user/profile/address` | Manage shipping and billing addresses |
| `/user/profile/checkout` | Checkout and order placement page |
| `/user/profile/order-success` | Order confirmation screen following a successful purchase |
| `/user/profile/orders` | User's past order history |

## 🔌 API Endpoints Used

| Method & Endpoint | Description |
| --- | --- |
| `GET /api/fetch/categories` | Fetch all product categories |
| `GET /api/fetch/clothing` | Fetch available clothing items |
| `GET /api/fetch/cart?userId=...` | Retrieve cart items for a specific user |
| `GET /api/fetch/wishlist?userId=...` | Retrieve wishlist items for a specific user |
| `GET /api/fetch/addresses` | Fetch saved user addresses |
| `POST /api/addresses` | Add a new user address |
| `POST /api/addresses/:id` | Update an existing user address by ID |
| `DELETE /api/remove/addresses` | Delete a specified user address |
| `POST /api/orders` | Place a new order |
