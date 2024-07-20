export interface Job {
    jobTitle: string;
    company: string;
    location: string;
    jobType: string;
    salary: string;
    jobDescription: string;
    skills:string[]|undefined
}


export interface Jobpost {
    id:number;
    PostedById: number;
    title: string;
    jobTypeId: number | 0;
    CreatedDate: Date | undefined;
    ExperienceId: number;
    BusinessId: number;
    JobDescription: string;
    salary: string;
    DistrictId: number | undefined ;
    IsActive: string;
    ProfileImage?: string | null;
    ExpertiseIds: number[];
    ExpertiseId?:number[]
    applicantsCount?:number;
}
