import { NgModule } from '@angular/core';
import { CandidatesComponent } from './candidate.component';
import { CandidatesListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateItemComponent } from './candidate-list/candidate-item/candidate-item.component';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidatesRoutingModule } from './candidates-routes.module';
import { CandidateVoteComponent } from './candidate-vote/candidate-vote.component';

@NgModule({
    declarations: [
        CandidatesComponent,
        CandidatesListComponent,
        CandidateDetailComponent,
        CandidateItemComponent,
        CandidateAddComponent,
        CandidateVoteComponent
    ],
    imports:[
        CandidatesRoutingModule,
        ReactiveFormsModule,
        CommonModule,
    ],
})
export class CandidatesModule {

}
