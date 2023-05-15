import { Component } from '@angular/core'
import { setupNativeCustomizations } from '../native-customizations';
setupNativeCustomizations();

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {}
