import { Candidate } from './candidate.model';

export class CandidateVote extends Candidate {

    public owner: string;
    public ownerId: string;
    public upVotes: number;
    public downVotes: number;
}