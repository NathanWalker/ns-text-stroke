import { Component } from '@angular/core'
import { registerElement } from '@nativescript/angular'
import { applyCustomizations } from '../native-views'
applyCustomizations();

// registerElement('StrokedLabel', () => StrokedLabel);

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {}
