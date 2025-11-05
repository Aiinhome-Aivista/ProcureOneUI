# PrimeNG + Tailwind CSS v4 + PrimeUI Integration Guide

## ✅ Configuration Complete

Your Angular 20.3 project is now fully configured with:
- **PrimeNG 20.3.0** - UI component library
- **Tailwind CSS 4.1.16** - Utility-first CSS framework  
- **tailwindcss-primeui 0.6.1** - Official PrimeTek plugin for seamless integration
- **@primeuix/themes 1.2.5** - PrimeNG theming system
- **PostCSS 8.5.6** - CSS processing

---

## 📁 Configuration Files

### 1. `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 2. `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // Enable class-based dark mode for PrimeNG
  plugins: [
    require('tailwindcss-primeui')
  ],
};
```

### 3. `src/styles.css`
Uses Tailwind v4's new CSS import mode with `@import 'tailwindcss'` and `@theme` directive for custom colors.

### 4. `src/app/app.config.ts`
PrimeNG configuration with:
- Aura theme preset
- CSS layer management
- Dark mode support via `.dark` class selector

---

## 🎨 How It Works

### CSS Layering
The configuration uses CSS layers to ensure proper style precedence:
```
tailwind-base → primeng → tailwind-utilities
```

This ensures:
1. Tailwind base styles load first
2. PrimeNG component styles layer on top
3. Tailwind utilities have highest specificity for overrides

### Color System
- **Tailwind colors**: Use standard Tailwind classes like `bg-blue-500`, `text-red-600`
- **PrimeNG semantic tokens**: Automatically mapped via `tailwindcss-primeui` plugin
- **Custom primary colors**: Defined in `@theme` block, accessible as:
  - `bg-primary-500` (Tailwind)
  - `--p-primary-500` (PrimeNG CSS variable)

---

## 💡 Usage Examples

### 1. Using Tailwind Utilities with PrimeNG Components

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-example',
  imports: [ButtonModule],
  template: `
    <p-button 
      label="Click Me" 
      class="mt-4 shadow-lg hover:shadow-xl transition-shadow"
    />
  `
})
export class ExampleComponent {}
```

### 2. Using PrimeNG Semantic Color Utilities

Thanks to `tailwindcss-primeui`, you can use PrimeNG semantic tokens as Tailwind classes:

```html
<!-- Primary colors -->
<div class="bg-p-primary-500 text-white">Primary background</div>
<button class="text-p-primary-600 hover:text-p-primary-700">Primary text</button>

<!-- Surface colors -->
<div class="bg-p-surface-0 border border-p-surface-200">Card surface</div>

<!-- Content colors -->
<p class="text-p-content-primary">Main content text</p>
<span class="text-p-content-secondary">Secondary text</span>
```

### 3. Dark Mode Support

Toggle dark mode by adding/removing the `dark` class on the root element:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleDarkMode()" class="p-4">
      {{ isDark() ? '🌙 Dark' : '☀️ Light' }}
    </button>
  `,
  host: {
    '[class.dark]': 'isDark()'
  }
})
export class ThemeToggleComponent {
  isDark = signal(false);

  toggleDarkMode() {
    this.isDark.update(v => !v);
    document.documentElement.classList.toggle('dark');
  }
}
```

### 4. Custom Component Styling

```typescript
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-custom-card',
  imports: [CardModule],
  template: `
    <p-card 
      header="Custom Card"
      class="rounded-xl shadow-2xl border-2 border-primary-200 hover:border-primary-400 transition-all"
    >
      <p class="text-gray-700 dark:text-gray-300">
        Combining PrimeNG components with Tailwind utilities!
      </p>
    </p-card>
  `
})
export class CustomCardComponent {}
```

### 5. Responsive Design with PrimeNG

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
  <p-card class="hover:scale-105 transition-transform">
    <div class="flex flex-col items-center space-y-4">
      <span class="text-4xl">📊</span>
      <h3 class="text-xl font-bold text-p-primary-600">Analytics</h3>
      <p class="text-sm text-p-content-secondary">View your data</p>
    </div>
  </p-card>
  
  <p-card class="hover:scale-105 transition-transform">
    <div class="flex flex-col items-center space-y-4">
      <span class="text-4xl">⚙️</span>
      <h3 class="text-xl font-bold text-p-primary-600">Settings</h3>
      <p class="text-sm text-p-content-secondary">Configure app</p>
    </div>
  </p-card>
  
  <p-card class="hover:scale-105 transition-transform">
    <div class="flex flex-col items-center space-y-4">
      <span class="text-4xl">👤</span>
      <h3 class="text-xl font-bold text-p-primary-600">Profile</h3>
      <p class="text-sm text-p-content-secondary">Edit profile</p>
    </div>
  </p-card>
</div>
```

---

## 🎯 Available PrimeNG Semantic Tokens (via tailwindcss-primeui)

### Primary Colors
- `bg-p-primary-{50-950}` / `text-p-primary-{50-950}`
- `border-p-primary-{50-950}`

### Surface Colors
- `bg-p-surface-{0-950}` - Backgrounds and surfaces
- `bg-p-surface-hover` - Hover states
- `bg-p-surface-active` - Active states

### Content Colors  
- `text-p-content-primary` - Primary text
- `text-p-content-secondary` - Secondary text
- `text-p-content-tertiary` - Tertiary text
- `text-p-content-disabled` - Disabled text

### State Colors
- `bg-p-highlight-bg` / `text-p-highlight-color` - Highlighted items
- `bg-p-focus-ring` - Focus ring color

### Border Colors
- `border-p-border-{default|hover|active}` - Border states

---

## 🔧 Customization

### Changing Primary Color

Edit the `@theme` block in `src/styles.css`:

```css
@theme {
  /* Example: Change to green */
  --color-primary-500: #10b981;
  --color-primary-600: #059669;
  /* ... update other shades */
  
  /* Update PrimeNG tokens */
  --p-primary-500: var(--color-primary-500);
  --p-primary-600: var(--color-primary-600);
}
```

### Adding Custom PrimeNG Components

Just import and use them with Tailwind classes:

```typescript
import { Component } from '@angular/core';
import { DataTableModule } from 'primeng/datatable';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-data-grid',
  imports: [DataTableModule, InputTextModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-xl">
      <input 
        pInputText 
        placeholder="Search..." 
        class="w-full mb-4 focus:ring-2 focus:ring-primary-500"
      />
      <p-dataTable 
        [value]="data" 
        class="border border-gray-200"
      >
        <!-- table content -->
      </p-dataTable>
    </div>
  `
})
export class DataGridComponent {
  data = [];
}
```

---

## 🚀 Performance Tips

1. **Purge unused styles**: Tailwind v4 automatically purges unused CSS based on `content` in `tailwind.config.js`

2. **Component imports**: Use standalone components with selective PrimeNG module imports to reduce bundle size

3. **CSS layers**: The layer configuration ensures optimal CSS delivery and prevents specificity conflicts

4. **Dark mode**: Use class-based dark mode for better performance vs media query approach

---

## 📚 Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [PrimeNG Documentation](https://primeng.org/)
- [tailwindcss-primeui Plugin](https://github.com/primefaces/tailwindcss-primeui)
- [PrimeNG Theming Guide](https://primeng.org/theming)

---

## ✅ Verification

Test your setup by running:

```bash
npm start
```

Then create a test component using PrimeNG + Tailwind:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test',
  imports: [ButtonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <h1 class="text-4xl font-bold text-primary-900 mb-8">
        PrimeNG + Tailwind CSS v4 ✨
      </h1>
      
      <div class="flex gap-4">
        <p-button 
          label="Primary Button" 
          class="shadow-lg hover:shadow-xl transition-shadow"
        />
        
        <button class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
          Tailwind Button
        </button>
      </div>
      
      <p class="mt-8 text-p-content-secondary">
        Using PrimeNG semantic tokens with Tailwind utilities!
      </p>
    </div>
  `
})
export class TestComponent {}
```

---

## 🎉 You're All Set!

Your Angular project now has a powerful combination of:
- ⚡ Tailwind CSS v4 with the latest features
- 🎨 PrimeNG components with beautiful themes
- 🔗 Seamless integration via `tailwindcss-primeui`
- 🌙 Dark mode support
- 📱 Fully responsive utilities

Happy coding! 🚀
