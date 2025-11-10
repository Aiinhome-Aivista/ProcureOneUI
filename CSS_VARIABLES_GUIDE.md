# CSS Variable-Based Theme System

## ✅ Implementation Complete!

All colors and theme-related properties are now defined as CSS variables in `styles.css`. The theme simply toggles the `.dark` class on the `<html>` element, and all colors automatically update!

## 🎨 How It Works

1. **CSS Variables Defined** - All colors are in `:root` (light) and `:root.dark` (dark)
2. **ThemeService** - Simply adds/removes `.dark` class on `<html>`
3. **Automatic Updates** - All components using CSS variables automatically theme

## 📝 Available CSS Variables

### Background Colors
```css
var(--bg-body)       /* Main body background */
var(--bg-surface)    /* Surface/container background */
var(--bg-card)       /* Card background */
var(--bg-hover)      /* Hover state background */
var(--bg-active)     /* Active state background */
```

### Text Colors
```css
var(--text-primary)    /* Primary text color */
var(--text-secondary)  /* Secondary text color */
var(--text-tertiary)   /* Tertiary/muted text */
var(--text-disabled)   /* Disabled text */
var(--text-inverse)    /* Inverse text (for dark backgrounds) */
```

### Border Colors
```css
var(--border-light)   /* Light borders */
var(--border-medium)  /* Medium borders */
var(--border-dark)    /* Dark borders */
var(--border-focus)   /* Focus state borders */
```

### Primary Brand Colors
```css
var(--primary-color)  /* Main primary color */
var(--primary-50) to var(--primary-950)  /* Full scale */
```

### Status Colors
```css
var(--success)  /* Success state */
var(--warning)  /* Warning state */
var(--error)    /* Error state */
var(--info)     /* Info state */
```

### Transitions
```css
var(--transition-fast)    /* 150ms */
var(--transition-normal)  /* 300ms */
var(--transition-slow)    /* 500ms */
```

### Shadows
```css
var(--shadow-sm)  /* Small shadow */
var(--shadow-md)  /* Medium shadow */
var(--shadow-lg)  /* Large shadow */
var(--shadow-xl)  /* Extra large shadow */
```

### Border Radius
```css
var(--radius-sm)   /* 0.25rem */
var(--radius-md)   /* 0.375rem */
var(--radius-lg)   /* 0.5rem */
var(--radius-xl)   /* 0.75rem */
var(--radius-2xl)  /* 1rem */
var(--radius-full) /* 9999px */
```

## 🚀 Usage Examples

### In Component Styles

```css
/* your-component.css */
.my-container {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.my-container:hover {
  background-color: var(--bg-hover);
  box-shadow: var(--shadow-md);
}

.my-text {
  color: var(--text-secondary);
}

.my-button {
  background-color: var(--primary-600);
  color: var(--text-inverse);
}
```

### In Component Template with Inline Styles

```html
<!-- Angular component template -->
<div [style.background-color]="'var(--bg-surface)'" 
     [style.color]="'var(--text-primary)'">
  Content
</div>
```

### Using Utility Classes

```html
<!-- Pre-made utility classes -->
<div class="bg-surface text-primary border-light card">
  Card content
</div>

<p class="text-secondary">Secondary text</p>

<div class="bg-card shadow-md">
  Card with shadow
</div>

<div class="status-success">Success message</div>
<div class="status-error">Error message</div>
```

### In TypeScript (if needed)

```typescript
// Read CSS variable value
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// Set CSS variable dynamically
document.documentElement.style.setProperty('--custom-var', '#ff0000');
```

## 🎯 Real Examples

### Card Component
```css
.product-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1rem;
  transition: all var(--transition-normal);
}

.product-card:hover {
  border-color: var(--border-medium);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.product-title {
  color: var(--text-primary);
  font-weight: 600;
}

.product-price {
  color: var(--primary-600);
  font-size: 1.25rem;
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
```

### Form Input
```css
.custom-input {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  transition: all var(--transition-fast);
}

.custom-input:focus {
  border-color: var(--border-focus);
  outline: none;
  box-shadow: 0 0 0 3px rgba(67, 25, 194, 0.1);
}

.custom-input::placeholder {
  color: var(--text-tertiary);
}
```

### Table
```css
.data-table {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.data-table th {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  font-weight: 600;
  border-bottom: 2px solid var(--border-medium);
}

.data-table td {
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
}

.data-table tr:hover {
  background-color: var(--bg-hover);
}
```

## 🎨 Customizing Colors

To change theme colors, edit `src/styles.css`:

```css
:root {
  /* Change light theme colors */
  --bg-body: #your-color;
  --primary-color: #your-brand-color;
}

:root.dark {
  /* Change dark theme colors */
  --bg-body: #your-dark-color;
  --primary-color: #your-dark-brand-color;
}
```

## 🔄 Theme Service API

```typescript
import { ThemeService } from './core/services';

// Inject the service
private themeService = inject(ThemeService);

// Toggle theme
this.themeService.toggle();

// Set specific theme
this.themeService.setTheme('light');
this.themeService.setTheme('dark');
this.themeService.setTheme('system'); // Follow OS preference

// Read current theme
const active = this.themeService.activeTheme(); // 'light' | 'dark'
const preference = this.themeService.themePreference(); // 'light' | 'dark' | 'system'
const system = this.themeService.systemTheme(); // 'light' | 'dark'
```

## ✨ Benefits of This Approach

1. **Centralized** - All colors in one place (`styles.css`)
2. **Automatic** - Components automatically theme without changes
3. **Maintainable** - Change colors globally by editing CSS variables
4. **Performant** - CSS handles theme switching (no JavaScript for styling)
5. **Consistent** - Same colors across entire app
6. **Flexible** - Easy to add new themes or color schemes
7. **Standard** - Uses native CSS features

## 🧪 Testing

1. Click the theme toggle button (top-right corner)
2. Theme switches instantly
3. All colors update automatically
4. Preference is saved to localStorage
5. Refresh page - theme persists

## 🎉 No More Manual Dark Mode Classes!

Instead of writing:
```css
.my-div {
  background: white;
}

.dark .my-div {
  background: #1e293b;
}
```

Just write:
```css
.my-div {
  background-color: var(--bg-surface);
}
```

And it automatically works in both themes! 🚀
