import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/services/candidates.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Candidate } from 'src/app/shared/candidate.model';
import { Authservice } from '../../auth/auth.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  @Input() candidateToDisplay: AngularFireAction<DatabaseSnapshot<Candidate>>;
  @Input() id: number;
  subscription: Subscription;
  hasNext = true;
  hasPrevious = true;
  isEditable = false;

  constructor(
    private candServ: CandidateService,
    private candMatchServ: IngredientsService,
    private auth : Authservice,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidateToDisplay = data.candidate;
          this.isEditable = this.candidateToDisplay.owner == this.auth.currentUserId;
        }
      );
    this.route.params
      .subscribe(
        (params) => {
          this.id = params.id;
          this.hasPrevious = !(this.id == 0);
          this.hasNext = !(this.id == (this.candServ.getTotal() - 1));
        }
      );
  }

  AddIngredients() {
    this.candidateToDisplay.ingredients.forEach(element => {
      this.candMatchServ.addIngredient(element);
    });
  }

  nextCandidate() {
    this.router.navigate(['/candidates', ++this.id]);
  }
  previousCandidate() {
    this.router.navigate(['/candidates', --this.id]);
  }

  deleteCandidate() {
    this.candServ.deleteCandidate(this.id);
  }
}
