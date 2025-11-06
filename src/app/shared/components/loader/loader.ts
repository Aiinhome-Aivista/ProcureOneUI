import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  // Input for size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | custom number (in rem)
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | number>('md');
  
  // Input for color: Tailwind color class or custom CSS color
  color = input<string>('bg-primary-600');
  
  // Input for speed: animation duration in seconds
  speed = input<number>(1);

  lines = Array.from({ length: 12 }, (_, i) => i); // [0..11]

  // Computed size in rem based on the size input
  readonly loaderSize = computed(() => {
    const sizeValue = this.size();
    if (typeof sizeValue === 'number') {
      return sizeValue;
    }
    
    const sizeMap = {
      xs: 2,    // 2rem = 32px
      sm: 3,    // 3rem = 48px
      md: 3.75, // 3.75rem = 60px (default)
      lg: 5,    // 5rem = 80px
      xl: 7     // 7rem = 112px
    };
    
    return sizeMap[sizeValue];
  });
}
