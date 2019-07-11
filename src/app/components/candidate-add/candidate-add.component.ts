import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css']
})
export class CandidateAddComponent implements OnInit, CanComponentDeactivate {

  changesSaved = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  changeMade() {
    this.changesSaved = false;
  }

  saveChanges() {
    this.changesSaved = true;
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard changes?');
    }
  }
}
