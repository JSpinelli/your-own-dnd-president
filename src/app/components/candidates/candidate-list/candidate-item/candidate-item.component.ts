import { Component, Input, OnInit } from '@angular/core';
import { Authservice } from 'src/app/components/auth/auth.service';
import { CandidateService } from 'src/app/services/candidates.service';
import { addCandidateAnim } from 'src/app/shared/animations';
import { Candidate } from 'src/app/shared/candidate.model';

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
  @Input() key: string;
  votes = 0;
  voteUp = null;
  voteDown = null;
  alreadyVoted = false;

  constructor(private candidateService: CandidateService, private auth: Authservice, ) { }

  ngOnInit() {
    console.log(this.candidate.votes);
    console.log(this.candidate.name);
    for (const key in this.candidate.votes) {
      if (this.candidate.votes.hasOwnProperty(key)) {
        const element = this.candidate.votes[key];
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

  onUpVote() {
    this.candidateService.upVote(this.key);
    this.voteUp = true;
    this.voteDown = false;
  }

  onDownVote() {
    this.candidateService.downVote(this.key);
    this.voteUp = false;
    this.voteDown = true;
  }

}
