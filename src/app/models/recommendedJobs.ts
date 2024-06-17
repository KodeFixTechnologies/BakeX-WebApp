// job.interface.ts
export interface RecommendedJob {
    id: number;
    title: string;
    jobDescription: string;
    jobType: string;
    postedById:number ;
    createdDate: Date;
    districtName: string;
    experienceType: string;
    appliedStatus : number;
  }
  

  // job.interface.ts
export interface Business {
  postedById:number;
  businessAddress: string;
  profileImage: string | null;
  businessName: string;
  profileImageBase64:string;
}
