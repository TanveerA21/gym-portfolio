# ADVANCED GYM Website - Specification Document

## 1. Project Overview
- **Project Name**: ADVANCED GYM
- **Type**: Static website with 3D animations
- **Core Functionality**: Premium gym website showcasing facilities, trainers, services with immersive 3D visuals
- **Target Users**: Fitness enthusiasts, beginners, personal training clients in Mumbai

## 2. UI/UX Specification

### Layout Structure
- **Single Page Application**: All sections on one page with smooth scroll navigation
- **Sections**: Hero, About, Services, Trainers, Gallery, Membership, Contact, Location
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Visual Design

#### Color Palette
- **Primary Background**: `#0a0a0a` (near black)
- **Secondary Background**: `#141414` (dark charcoal)
- **Card Background**: `#1a1a1a` (elevated surfaces)
- **Neon Blue Accent**: `#00d4ff`
- **Neon Red Accent**: `#ff3d3d`
- **Neon Orange Accent**: `#ff6b35`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#a0a0a0`
- **Text Muted**: `#666666`

#### Typography
- **Primary Font**: "Orbitron" (headings - futuristic/gym vibe)
- **Secondary Font**: "Rajdhani" (body text - clean, modern)
- **Hero Title**: 4rem (mobile), 6rem (desktop)
- **Section Titles**: 2.5rem (mobile), 3.5rem (desktop)
- **Body Text**: 1rem
- **Small Text**: 0.875rem

#### Spacing System
- **Section Padding**: 80px vertical (mobile), 120px (desktop)
- **Container Max Width**: 1400px
- **Grid Gap**: 24px (mobile), 40px (desktop)
- **Card Padding**: 24px

#### Visual Effects
- **Glassmorphism**: backdrop-filter: blur(10px), rgba backgrounds
- **Neon Glow**: box-shadow with accent colors
- **Hover Effects**: Scale transforms, glow effects
- **Scroll Animations**: Fade up, slide in, counter animations

### Components

#### Navigation
- Fixed top navigation bar
- Logo on left
- Nav links center (desktop)
- Hamburger menu mobile
- Background blur on scroll
- Active state with neon underline

#### Hero Section
- Full viewport height
- 3D rotating dumbbell (Three.js)
- Animated tagline
- CTA buttons with glow effect
- Floating particles background

#### About Section
- Image left, content right (desktop)
- Stacked on mobile
- Mission/vision cards
- Owner introduction with image

#### Services Section
- Grid of service cards
- Icons for each service
- Hover lift effect
- Neon border on hover

#### Trainers Section
- Horizontal scroll on mobile
- Grid on desktop
- Trainer cards with image, name, specialty, experience
- Social links

#### Gallery Section
- Masonry grid
- Lightbox on click
- Hover zoom effect

#### Membership Section
- 3 pricing tiers
- Feature list per plan
- CTA button
- Recommended badge on middle plan

#### Contact Section
- Contact info cards
- WhatsApp, Phone, Email integration
- Static contact form UI

#### Location Section
- Embedded Google Map
- Address text
- Get Directions button

#### Sticky Mobile CTA
- Fixed bottom bar on mobile
- Join Now and WhatsApp buttons

## 3. Functionality Specification

### Core Features
- Smooth scroll navigation
- Mobile hamburger menu toggle
- 3D dumbbell animation (Three.js)
- GSAP scroll-triggered animations
- Animated counters for stats
- Image gallery lightbox
- Contact links (tel:, mailto:, WhatsApp)
- Responsive images

### User Interactions
- Scroll to section via nav links
- Toggle mobile menu
- Click pricing cards
- Open gallery images
- Click contact buttons

### Animations
- Hero: 3D rotating dumbbell, floating particles
- Sections: Fade in on scroll
- Counters: Count up animation
- Cards: Hover lift + glow
- Buttons: Pulse glow effect

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with neon accents visible
- [ ] 3D dumbbell renders and rotates
- [ ] All 8 sections render correctly
- [ ] Mobile menu works
- [ ] Responsive on all breakpoints
- [ ] Animations trigger on scroll

### Functional Checkpoints
- [ ] Nav links scroll to sections
- [ ] Contact links work (phone, email, WhatsApp)
- [ ] Gallery images display
- [ ] Map displays
- [ ] Mobile CTA visible on small screens

### Performance
- [ ] Page loads without errors
- [ ] Animations run smoothly
- [ ] No console errors