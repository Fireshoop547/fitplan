# 🏋️ FitPlan — Personalized Workout Plans

**A world-class fitness platform connecting users with expertly-designed workout programs tailored to their level, goals, and lifestyle.**

---

## 📋 Project Overview

FitPlan solves a critical problem in the fitness industry: information overload. When someone decides to start exercising, they're overwhelmed by options and unsure if they're following the correct routine.

FitPlan provides:
- **Curated workout programs** organized by experience level (Beginner, Intermediate, Advanced)
- **Goal-focused filtering** (Strength, Muscle Gain, Fat Loss, Endurance, Flexibility)
- **Clear instructions** with sets, reps, and exercise descriptions
- **Intuitive browsing** by muscle group, duration, and difficulty

---

## 👥 Team

- **Adam Parks** — Project Lead & Lead Developer
- **Mikiyas Wolde** — Design & UX Integration
- **Tarun Sreekanth** — Quality Assurance & Documentation

---

## 🎨 Design System

FitPlan uses a **modern, professional design** inspired by world-class SaaS platforms (Fourmula.ai). The site features:

### Color Palette
- **Primary**: `#FF6B35` (Bold Orange) — CTAs, highlights
- **Secondary**: `#004E89` (Navy Blue) — Accents, cards
- **Accent**: `#F7931E` (Golden Orange) — Gradients
- **Light Mode Background**: `#FFFFFF`
- **Dark Mode Background**: `#0F1419`

### Typography
- **Headings**: System font stack, bold weights (600-800)
- **Body**: Clean, readable sans-serif
- **Font sizes**: Responsive, mobile-first approach

### Interactions
- Smooth scroll behavior
- Hover animations and transforms
- Ripple effects on buttons
- Accordion animations for FAQ
- Fade-in-up animations on scroll

---

## 📁 File Structure

```
/fitnessplanner/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling (responsive, dark mode)
├── script.js           # Interactivity & animations
└── README.md           # This file
```

---

## 🚀 Features

### 1. **Hero Section**
- Eye-catching headline with gradient text
- Dual CTA buttons
- Dynamic workout plan card preview

### 2. **Features Section**
- 6 key benefits displayed in a responsive grid
- Hover animations reveal depth

### 3. **Workout Programs**
- **Filter by difficulty**: All, Beginner, Intermediate, Advanced
- **Smooth filtering**: No page reload, instant updates
- **Rich program cards** with:
  - Program name & description
  - Duration, frequency, session length
  - Target muscle groups
  - Exercise focus (Strength, Hypertrophy, etc.)

### 4. **How It Works**
- 4-step process clearly illustrated
- Clean typography with step numbers

### 5. **FAQ Accordion**
- 6 common questions answered
- Smooth open/close animations
- Keyboard navigation (ESC to close)

### 6. **Theme Toggle**
- Dark/Light mode toggle in header
- Persisted to localStorage
- Automatic theme detection on page load

### 7. **Responsive Design**
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly buttons and spacing

---

## 💻 Technical Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Grid, Flexbox, Custom Properties, Gradients, Animations
- **Vanilla JavaScript**: No dependencies, 100% control

### Performance
- Lazy loading ready for images
- Smooth animations with CSS & JS
- Optimized font sizes and spacing

### Accessibility
- Semantic HTML
- Keyboard navigation support
- Proper contrast ratios
- ARIA labels where needed

---

## 🎯 How to Use

### Quick Start
1. Open `index.html` in a modern browser
2. Explore the sections
3. Test filtering, theme toggle, FAQ

### Customization

#### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #FF6B35;      /* Change primary accent */
    --secondary-color: #004E89;    /* Change secondary color */
    --accent-color: #F7931E;       /* Change gradient accent */
}
```

#### Add Workouts
Edit the HTML in `index.html` under "WORKOUTS SECTION":
```html
<div class="workout-card" data-level="beginner">
    <!-- Add your workout program here -->
</div>
```

#### Modify Content
All text is inline in `index.html` — easy to update titles, descriptions, and features.

---

## 🎬 Interactions & JavaScript

### Workout Filtering
```javascript
// Click filter buttons to show/hide workouts by level
// Works seamlessly with CSS animations
```

### FAQ Accordion
```javascript
// Click any question to open/close
// Press ESC to close all
// Click another to switch items
```

### Theme Toggle
```javascript
// Click moon/sun icon to toggle dark mode
// Preference saved to localStorage
```

### Scroll Animations
```javascript
// Cards fade in as you scroll
// Smooth navigation links
// Header shadow on scroll
```

---

## 📱 Responsive Behavior

| Device | Breakpoint | Changes |
|--------|-----------|---------|
| Mobile | < 768px | Single column, smaller font sizes, full-width buttons |
| Tablet | 768px - 1024px | 2-column grid, optimized padding |
| Desktop | > 1024px | Full 3-column grid, max-width container |

---

## ✅ Quality Assurance Checklist

- [x] **Functionality**: All filters, toggles, accordions work smoothly
- [x] **Responsiveness**: Mobile, tablet, desktop all optimized
- [x] **Performance**: Fast load times, smooth animations
- [x] **Accessibility**: Keyboard navigation, semantic HTML
- [x] **Dark Mode**: Complete theme support
- [x] **Cross-browser**: Works on Chrome, Firefox, Safari, Edge
- [x] **Typography**: Readable, professional hierarchy
- [x] **Design**: Modern, inspired by industry leaders

---

## 🚀 Future Enhancements

### Phase 2
- [ ] Workout database with filtering by muscle group
- [ ] Exercise library with video demonstrations
- [ ] User progress tracking
- [ ] Downloadable PDF programs
- [ ] Mobile app version

### Phase 3
- [ ] User authentication
- [ ] Custom workout builder
- [ ] Social features (share programs, compete)
- [ ] AI-powered program recommendations
- [ ] Integration with fitness wearables

### Phase 4
- [ ] Nutrition guidance
- [ ] Coach dashboard
- [ ] Premium features
- [ ] API for third-party integrations

---

## 📚 Code Standards

### HTML
- Semantic tags (`<header>`, `<section>`, `<article>`)
- Descriptive class names (BEM-inspired)
- Proper heading hierarchy

### CSS
- Mobile-first approach
- CSS variables for consistency
- Organized by component
- Comments for clarity

### JavaScript
- Vanilla JS (no dependencies)
- Event delegation where appropriate
- Keyboard accessibility
- Performance optimized

---

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not supported)

---

## 📧 Contact & Support

**Project Team:**
- Adam Parks
- Mikiyas Wolde
- Tarun Sreekanth

**Created:** 2026  
**Version:** 1.0.0  
**Status:** Production Ready

---

## 📄 License

This project is confidential and proprietary to the FitPlan team.

---

## 🎉 Credits

**Design Inspiration**: Fourmula.ai — a world-class SaaS platform  
**Icons**: Unicode emoji  
**Typography**: System font stack (maximum compatibility)  

---

**Built with ❤️ for fitness enthusiasts everywhere.**
