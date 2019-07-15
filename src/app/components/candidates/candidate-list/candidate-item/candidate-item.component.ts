import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/shared/candidate.model';
import { CandidateService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css']
})
export class CandidateItemComponent implements OnInit {

  @Input() candidate: Candidate;
  @Input() id: number;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }

}
