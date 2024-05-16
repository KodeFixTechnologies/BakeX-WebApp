// job.interface.ts
export interface RecommendedJob {
    id: number;
    title: string;
    jobDescription: string;
    jobType: string;
    createdDate: Date;
    businessAddress: string;
    profileImage: string | null;
    businessName: string;
    stateName: string;
    districtName: string;
    experienceType: string;
    appliedStatus : number;
  }
  