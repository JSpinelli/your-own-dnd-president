import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/shared/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';
import { addCandidateAnim } from 'src/app/shared/animations';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css'],
  animations:[addCandidateAnim]
})
export class CandidateItemComponent implements OnInit {

  @Input() candidate: Candidate;
  @Input() id: number;
  @Input() isVote: boolean;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }

}
