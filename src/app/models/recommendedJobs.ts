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
