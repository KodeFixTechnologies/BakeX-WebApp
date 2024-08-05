// job.interface.ts
export interface RecommendedJob {
    id: number;
    title: string;
    jobDescription: string;
    jobType: string;
    postedById:number ;
    createdDate: Date;
    districtName:string
    salary:string
    experienceType: string;
    expertiseType:string;
    appliedStatus : number;
    jobDescriptionLines?: string[];
    applyDate:Date,
    ownerActions: OwnerAction[];
    
  }
  
  export interface OwnerAction {
    ownerId: number;
    profileId: number;
    actionType: string;
    jobId: number;
    actionDate: string; // Use ISO string format for dates
  }
  // job.interface.ts
export interface Business {
  postedById:number;
  businessAddress: string;
  profileImage: string | null;
  businessName: string;
  profileImageBase64:string;
  stateName:string;
  districtName:string;

}
