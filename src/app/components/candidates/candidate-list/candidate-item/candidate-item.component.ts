import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/shared/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';
import { addCandidateAnim } from 'src/app/shared/animations';
import { Authservice } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css'],
  animations: [addCandidateAnim]
})
export class CandidateItemComponent implements OnInit {

  @Input() candidate: Candidate;
  @Input() id: number;
  @Input() isVote: boolean;
  votes = 0;
  voteUp = null;
  voteDown = null;
  alreadyVoted = false;

  constructor(private candidateService: CandidateService, private auth: Authservice) { }

  ngOnInit() {
    this.candidate.votes.forEach(element => {
      if (element) {
        if (element.value) {
          this.votes = this.votes + 1;
        } else {
          this.votes = this.votes - 1;
        }
        if (element.id == this.auth.user.getValue().id) {
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
    });
  }

  onUpVote() {
    this.candidateService.upVote(this.id);
    this.voteUp = true;
    this.voteDown = false;
  }

  onDownVote() {
    this.candidateService.downVote(this.id);
    this.voteUp = false;
    this.voteDown = true;
  }

}
