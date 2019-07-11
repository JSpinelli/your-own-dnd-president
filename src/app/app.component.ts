import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'your-own-dnd-president';
  show = 0;

  //Programatic Router router:Router.navigate(['/recipes'])
}
