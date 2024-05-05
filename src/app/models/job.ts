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
    PostedById: number;
    Title: string;
    JobTypeId: number;
    CreatedDate: Date;
    ExperienceId: number;
    BusinessId: number;
    JobDescription: string;
    Salary: string;
    DistrictId: number | undefined ;
    IsActive: string;
    ProfileImage?: Uint8Array | null;
    ExpertiseIds: number[];
}
