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

  @Input() candidateData: AngularFireAction<DatabaseSnapshot<Candidate>>;
  candidateToDisplay: Candidate;
  @Input() id: string;
  subscription: Subscription;
  hasNext = true;
  hasPrevious = true;
  isEditable = false;
  votes = 0;
  alreadyVoted;
  voteUp;
  voteDown;

  constructor(
    private candServ: CandidateService,
    private candMatchServ: IngredientsService,
    private auth: Authservice,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.candidateData = data.candidate;
          this.candidateToDisplay = this.candidateData.payload.val();
          this.isEditable = this.candidateToDisplay.owner === this.auth.currentUserId;
        }
      );
    this.route.params
      .subscribe(
        (params) => {
          this.id = params.id;
          // this.hasPrevious = !(this.id === 0);
          // this.hasNext = !(this.id === (this.candServ.getTotal() - 1));
        }
      );
    for (const key in this.candidateToDisplay.votes) {
      if (this.candidateToDisplay.votes.hasOwnProperty(key)) {
        const element = this.candidateToDisplay.votes[key];
        if (element.value) {
          this.votes = this.votes + 1;
        } else {
          this.votes = this.votes - 1;
        }
        if (key === this.auth.currentUserId) {
          this.alreadyVoted = true;
          if (element.value) {
            this.voteUp = true;
            this.voteDown = false;
          } else {
            this.voteUp = false;
            this.voteDown = true;
          }
        }
      }
    }
  }

  AddIngredients() {
    this.candidateToDisplay.ingredients.forEach(element => {
      this.candMatchServ.addIngredient(element);
    });
  }

  // nextCandidate() {
  //   this.router.navigate(['/candidates', ++this.id]);
  // }
  // previousCandidate() {
  //   this.router.navigate(['/candidates', --this.id]);
  // }

  deleteCandidate() {
    this.candServ.deleteCandidate(this.candidateData.key);
  }


  onUpVote() {
    if (this.voteDown) {
      this.votes++;
    }
    this.votes++;
    this.candServ.upVote(this.id);
    this.voteUp = true;
    this.voteDown = false;
  }

  onDownVote() {
    if (this.voteUp) {
      this.votes--;
    }
    this.votes--;
    this.candServ.downVote(this.id);
    this.voteUp = false;
    this.voteDown = true;
  }

  publishCandidate() {
    this.candidateToDisplay.ispublic = true;
    this.candServ.publishCandidate(this.candidateData.key);
  }

}
