# Lead Generator - Product Requirements Document

## Overview
Lead Generator is a Business Lead Finder tool that helps agencies, freelancers, and sales teams discover real businesses with contact details, ratings, and website status.

## Original Problem Statement
Build a full stack premium SaaS web app - a Business Lead Finder tool with React frontend, Python FastAPI backend, and MongoDB.

## User Choices
- **Google Places API**: Mock/demo mode (API key to be added later)
- **Authentication**: Emergent-managed Google OAuth
- **Backend**: Python FastAPI + MongoDB
- **Export PDF**: Branded reports with logo
- **App Name**: Lead Generator (renamed from LeadRadar)
- **Quick chips**: Removed (user types any business type)
- **Pricing page**: Removed

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Python FastAPI, Motor (async MongoDB)
- **Database**: MongoDB
- **Auth**: Emergent OAuth (Google)
- **Styling**: Custom dark theme (#080808), Electric Orange (#FF6B2B)

## Core Features Implemented ✅

### Search & Discovery
- [x] City + Business Type search (free-form input)
- [x] No predefined chips - user types any business type
- [x] Mock business data generation (50 leads per search)
- [x] Search caching for instant repeat searches

### Lead Cards
- [x] Business name, rating, phone, email, address
- [x] Website badge (green = Has Website, red = No Website)
- [x] Category color strip on left
- [x] Copy phone button with confirmation
- [x] WhatsApp button (opens wa.me link)

### Stats Dashboard
- [x] Total Leads count with animation
- [x] Has Website count
- [x] No Website count
- [x] Animated counting from 0

### Export Functionality
- [x] CSV export
- [x] PDF export (branded with logo)
- [x] Excel export (styled with header)
- [x] Export modal with options

### Filters
- [x] No Website Only
- [x] Has Email
- [x] Rating > 4
- [x] Rating < 4

### UI/UX
- [x] Premium dark theme (#080808)
- [x] Glass morphism cards
- [x] Grain texture overlay
- [x] Orange accent color (#FF6B2B)
- [x] Clash Display + DM Sans fonts
- [x] Smooth animations (Framer Motion)
- [x] Toast notifications
- [x] Skeleton loading states
- [x] Infinite scroll

### Pages
- [x] Homepage with search
- [x] Login page (Google OAuth with improved UI)
- [x] Dashboard (same as homepage when logged in)

### Authentication
- [x] Emergent Google OAuth integration
- [x] Session management (7-day expiry)
- [x] User storage in MongoDB
- [x] Profile dropdown with user info (name, email, picture)
- [x] Plan badge in profile
- [x] Sign out functionality

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/search | Search businesses |
| POST | /api/export/csv | Export to CSV |
| POST | /api/export/pdf | Export to PDF |
| POST | /api/export/excel | Export to Excel |
| POST | /api/auth/session | Create session from OAuth |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/logout | Logout |

## What's Been Implemented
- **2026-03-27**: MVP Complete
  - Full search functionality with mock data
  - Export to CSV, PDF, Excel
  - Premium dark UI with animations
  - Google OAuth authentication
  - Pricing page with 3 plans
  - Stats dashboard with animated counters
  - Lead cards with copy/WhatsApp features
  - Filters and infinite scroll

## Backlog / Future Features

### P0 (High Priority)
- [ ] Real Google Places API integration (add API key)
- [ ] Rate limiting per plan (10/day for free)
- [ ] User usage tracking

### P1 (Medium Priority)
- [ ] Stripe payment integration
- [ ] Search history storage
- [ ] Saved leads/favorites
- [ ] Email verification

### P2 (Low Priority)
- [ ] Team access for Agency plan
- [ ] White-label reports
- [ ] Custom API access
- [ ] Bulk export
- [ ] Custom integrations

## Environment Variables
### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=leadradar
GOOGLE_PLACES_API_KEY= (to be added)
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://[app-id].preview.emergentagent.com
```

## Design System
- **Background**: #080808
- **Primary**: #FF6B2B (Electric Orange)
- **Surface**: rgba(255, 255, 255, 0.02)
- **Success**: #22C55E
- **Error**: #EF4444
- **Text**: #FFFFFF / rgba(255, 255, 255, 0.6)

## Notes
- MOCK: Google Places API is mocked with generated business data
- Auth uses Emergent-managed Google OAuth
- Pricing page is static (no payment processing)
