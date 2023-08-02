import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-button]', // The selector for the button component (using attribute selector)
  templateUrl: './button.component.html', // The HTML template for the button component
  styleUrls: ['./button.component.scss'], // The styles for the button component
})
export class ButtonComponent implements OnInit {
  @Input() variant: 'outline' | 'text' | 'link' | '' = ''; // Input property to define the button variant
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | '' = ''; // Input property to define the button color
  @Input() icon: string = ''; // Input property to define the icon for the button
  @Input() loading: boolean = false; // Input property to indicate if the button is in loading state
  @Input() loadingText: string = ''; // Input property to provide the loading text for the button

  constructor() {}

  ngOnInit() {}

  // Host binding to dynamically set the classes for the button element
  @HostBinding('class') get classes(): string {
    // Check if both variant and color are provided
    if (this.variant && this.color) {
      // If the variant is 'link', return the corresponding classes
      if (this.variant === 'link') {
        return `btn btn-link text-${this.color}`;
      }
      // If the variant is 'text', return the corresponding classes
      if (this.variant === 'text') {
        return `btn text-${this.color}`;
      }

      // For other variants, return the corresponding classes
      return `btn btn-${this.variant}-${this.color} `;
    }
    // If only the color is provided, return the classes with the color
    else if (this.color) {
      return `btn btn-${this.color}`;
    }
    // If no variant or color is provided, return the default classes
    return 'btn';
  }

  // Function to get the icon classes
  get getIcon() {
    return `icon-${this.icon} mr-2`; // Return the classes with the provided icon and a margin-right
  }
}
