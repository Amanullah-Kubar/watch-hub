# Watch Hub - Complete Application Context & Database Schema

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Current Data Models](#current-data-models)
5. [Proposed Database Schema](#proposed-database-schema)
6. [API Endpoints](#api-endpoints)
7. [User Journey & Features](#user-journey--features)
8. [Authentication & Security](#authentication--security)

---

## Project Overview

**Watch Hub** is a luxury watch e-commerce platform built with React + TypeScript + Vite. The site showcases premium, affordable watches across multiple collections (Classic, Modern, Leather Series, Everyday Essentials, Luxury, Vintage).

### Core Features
- **Product Catalog**: Browse watches by collection
- **Collections**: Featured collections with filtering
- **Product Details**: Individual product pages with ratings and pricing
- **Wishlist**: Add/remove items from wishlist (client-side only currently)
- **Shopping Cart**: Add items to cart (UI only, no backend)
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Animations**: AOS (Animate On Scroll) + GSAP for smooth interactions

---

## Tech Stack

### Frontend
```
React 19.2.6
TypeScript 6.0.2
Vite 8.0.12
Tailwind CSS 4.3.0
React Router DOM 7.15.1
AOS (Animate On Scroll) 2.3.4
GSAP 3.x (Motion Graphics)
Lucide React (Icons)
Motion 12.40.0
```

### Build & Dev Tools
```
ESLint (Code Quality)
Tailwind CSS Vite Plugin
```

### Backend (Planned)
```
Supabase (PostgreSQL + Auth)
Node.js / Express (Optional API Layer)
```

---

## Project Structure

```
watch_hub/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                 # Navigation bar with search, cart, CTA
│   │   ├── Home.tsx                   # Main landing page with AOS animations
│   │   ├── ProductCard.tsx            # Reusable product card component
│   │   ├── hooks/
│   │   │   └── UseReveal.ts           # Custom GSAP scroll trigger hook
│   │   ├── icons/                     # SVG & icon components
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Hero banner with CTA
│   │   │   ├── CollectionsSection.tsx # Featured collections grid
│   │   │   ├── Luxury.tsx             # Luxury products section
│   │   │   ├── VintageSection.tsx     # Vintage products section
│   │   │   ├── AboutSection.tsx       # About & footer section
│   │   │   └── collections/
│   │   │       └── Collection.tsx     # Dynamic collection detail page
│   │   └── supabase/
│   │       └── queries.txt            # SQL queries placeholder
│   ├── App.tsx                         # Main routing component
│   ├── App.css                         # App-level styles
│   ├── main.tsx                        # React entry point with GSAP setup
│   ├── index.css                       # Global Tailwind styles
│   └── assets/                         # Images, fonts
├── public/
│   └── fonts/                          # Custom fonts (Nikanely serif)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

---

## Current Data Models

### 1. Product Model (In-Memory)
```typescript
interface Product {
  id: number | string;
  name: string;
  price: string;  // Currently "RS: XXX" format
  rating: number; // 4.6 - 5.0
  image: string;  // Unsplash URLs
  description?: string;
  category?: string;
}
```

**Current Products** (hardcoded in components):
- `ProductCard.tsx`: 4 featured products
- `VintageSection.tsx`: 4 vintage watches
- `Collection.tsx`: Multiple collections with products

### 2. Collection Model (In-Memory)
```typescript
interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

interface Watch {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// Collections indexed by slug:
{
  "classic": Watch[],
  "modern": Watch[],
  "leather-series": Watch[],
  "everyday-essentials": Watch[]
}
```

### 3. User State (Client-Side Only)
```typescript
// Wishlist (localStorage or state)
const [wishlist, setWishlist] = useState<string[]>([]);

// Cart (not implemented, needed)
const [cart, setCart] = useState<CartItem[]>([]);
```

---

## Proposed Database Schema

### PostgreSQL Tables (Supabase)

#### 1. `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);
```

#### 2. `categories`
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample Data
INSERT INTO categories (name, slug, description) VALUES
('Classic', 'classic', 'Timeless elegance for everyday sophistication'),
('Modern', 'modern', 'Contemporary designs with a refined edge'),
('Leather Series', 'leather-series', 'Luxury-inspired watches crafted for daily wear'),
('Everyday Essentials', 'everyday-essentials', 'Affordable watches designed to elevate your style'),
('Luxury', 'luxury', 'Premium-inspired timepieces'),
('Vintage', 'vintage', 'Vintage-inspired watches with timeless aesthetics');
```

#### 3. `products`
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(5) DEFAULT 'RS',
  rating DECIMAL(2, 1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  images_url TEXT[], -- Array of image URLs
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample Data
INSERT INTO products (category_id, name, price, rating, image_url) VALUES
(1, 'The Heritage Chrono', 189, 4.9, 'https://...'),
(1, 'Imperial Gold Minimalist', 215, 4.8, 'https://...'),
...
```

#### 4. `wishlists`
```sql
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

#### 5. `carts`
```sql
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

#### 6. `orders`
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(5) DEFAULT 'RS',
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  shipping_address JSONB,
  billing_address JSONB,
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 7. `order_items`
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 8. `reviews`
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 9. `newsletter_subscribers`
```sql
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);
```

#### 10. `settings`
```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample Data
INSERT INTO settings (key, value) VALUES
('site_name', 'Watch Hub'),
('currency', 'RS'),
('free_shipping_threshold', '500'),
('contact_email', 'support@watchhub.com');
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/signup              # User registration
POST   /api/auth/login               # User login
POST   /api/auth/logout              # User logout
POST   /api/auth/refresh             # Refresh token
GET    /api/auth/me                  # Get current user profile
```

### Products & Categories
```
GET    /api/categories               # List all categories
GET    /api/categories/:slug         # Get category by slug
GET    /api/products                 # List all products (with filters, pagination)
GET    /api/products/:id             # Get product details
GET    /api/products/search          # Search products
GET    /api/products/featured        # Get featured products
GET    /api/collections/:collectionName # Get products in collection
```

### Wishlist
```
GET    /api/wishlists                # Get user's wishlist
POST   /api/wishlists/:productId     # Add to wishlist
DELETE /api/wishlists/:productId     # Remove from wishlist
```

### Cart
```
GET    /api/carts                    # Get user's cart
POST   /api/carts                    # Add to cart
PUT    /api/carts/:cartId            # Update cart item quantity
DELETE /api/carts/:cartId            # Remove from cart
DELETE /api/carts                    # Clear cart
```

### Orders
```
POST   /api/orders                   # Create order (from cart)
GET    /api/orders                   # Get user's orders
GET    /api/orders/:orderId          # Get order details
PUT    /api/orders/:orderId          # Update order (admin only)
```

### Reviews
```
GET    /api/products/:productId/reviews    # Get product reviews
POST   /api/products/:productId/reviews    # Create review
PUT    /api/reviews/:reviewId              # Update review (owner only)
DELETE /api/reviews/:reviewId              # Delete review (owner only)
```

### Newsletter
```
POST   /api/newsletter/subscribe           # Subscribe to newsletter
POST   /api/newsletter/unsubscribe         # Unsubscribe
```

---

## User Journey & Features

### 1. Browse Products (Public)
- **User Action**: Visit homepage
- **Components**: `Navbar` → `Home` → Multiple sections
- **Data Needed**: Products, categories, images
- **Current State**: Hardcoded data from arrays

### 2. View Collection
- **User Action**: Click "Explore Collection" on featured collections
- **Route**: `/collections/:collectionName`
- **Component**: `Collection.tsx`
- **Data Needed**: Collection slug, products in collection
- **Current State**: Limited collections with sample products

### 3. Add to Wishlist (Client-Side Only)
- **User Action**: Click heart icon on product
- **State Management**: Local `useState`
- **Storage**: None (resets on page reload)
- **Needed**: User authentication + backend API

### 4. Add to Cart (UI Only, Non-Functional)
- **User Action**: Click "Add to Cart" button
- **Issue**: No cart state management
- **Needed**: Global state (Context/Redux) + backend API

### 5. Checkout (Not Implemented)
- **Missing**: Entire checkout flow
- **Needed**: Payment integration, order processing, address validation

### 6. Newsletter Signup (UI Only)
- **Current**: Email input with arrow button
- **Action**: None
- **Needed**: Backend API to save emails

---

## Authentication & Security

### Current State
- No authentication implemented
- No user accounts

### Recommended Implementation
```
1. Supabase Auth (Email + Social)
   - Google OAuth
   - GitHub OAuth
   - Email/Password

2. Session Management
   - JWT tokens in localStorage
   - Refresh token rotation
   - Automatic logout on token expiry

3. Protected Routes
   - /account (user profile)
   - /orders (order history)
   - /wishlist (saved items)

4. Role-Based Access
   - User (default)
   - Admin (product management, orders)
   - Guest (browse only)
```

### Security Measures
- HTTPS enforced
- CSRF protection for forms
- Input validation & sanitization
- Rate limiting on API endpoints
- Secure password hashing (bcrypt)
- SQL injection prevention (parameterized queries)

---

## Integration Points (Frontend ↔ Backend)

### Current Frontend-Only Features
1. **Products Display**: Hardcoded arrays
2. **Collections Navigation**: Hardcoded slugs
3. **Wishlist**: Client-side state only
4. **Cart**: UI buttons with no logic

### Required Backend Integrations
1. **Fetch Products**: Replace hardcoded arrays with API calls
2. **User Authentication**: Supabase Auth integration
3. **Wishlist Sync**: Save to database per user
4. **Cart Management**: Persistent cart across sessions
5. **Order Processing**: Create orders, track status
6. **Search & Filters**: Server-side product search

---

## Development Roadmap

### Phase 1: Backend Setup
- [ ] Set up Supabase project
- [ ] Create PostgreSQL tables
- [ ] Set up authentication

### Phase 2: API Development
- [ ] Create REST/GraphQL API
- [ ] Implement product endpoints
- [ ] Implement cart & wishlist endpoints
- [ ] Add order processing

### Phase 3: Frontend Integration
- [ ] Connect products API
- [ ] Add authentication UI
- [ ] Implement cart functionality
- [ ] Add checkout flow

### Phase 4: Advanced Features
- [ ] Search & filtering
- [ ] Product reviews
- [ ] User dashboard
- [ ] Admin panel
- [ ] Email notifications

---

## Key Hardcoded Data to Move to Database

### In `ProductCard.tsx`:
- 4 featured products array

### In `VintageSection.tsx`:
- 4 vintage watch array

### In `CollectionsSection.tsx`:
- 4 collection items array

### In `Collection.tsx`:
- `collectionsData` object with all products by slug

### In `AboutSection.tsx`:
- Newsletter subscription (no backend)
- Social links (static)

---

## Environment Variables Needed

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# API
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Analytics (Optional)
VITE_GA_ID=your-google-analytics-id

# Payment (Optional)
VITE_STRIPE_KEY=your-stripe-publishable-key
```

---

## Summary: Using This Context with ChatGPT

To generate the complete backend/database setup, ask ChatGPT:

> "I have a React + TypeScript + Vite watch e-commerce app. Here's the complete context:
> 
> [Paste entire APP_CONTEXT.md file]
> 
> Please generate:
> 1. Complete Supabase migration SQL scripts
> 2. Node.js/Express backend API with TypeScript
> 3. Supabase client integration for React
> 4. React Context/Redux state management setup
> 5. Environment configuration files"

This will give you a complete, production-ready backend to integrate with your frontend!

---

## Quick Stats

| Metric | Value |
|--------|-------|
| React Components | 10+ |
| Routes | 2 |
| Hardcoded Products | 12+ |
| Collections | 6 |
| Animation Libraries | 2 (AOS, GSAP) |
| Database Tables (Proposed) | 10 |
| API Endpoints (Proposed) | 30+ |
| Mobile Breakpoints | 4 (sm, md, lg, xl) |

