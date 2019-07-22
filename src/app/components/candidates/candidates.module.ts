import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateItemComponent } from './candidate-list/candidate-item/candidate-item.component';
import { CandidatesListComponent } from './candidate-list/candidate-list.component';
import { CandidateVoteComponent } from './candidate-vote/candidate-vote.component';
import { CandidatesComponent } from './candidate.component';
import { CandidatesRoutingModule } from './candidates-routes.module';

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
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    ],
})
export class CandidatesModule {

}
