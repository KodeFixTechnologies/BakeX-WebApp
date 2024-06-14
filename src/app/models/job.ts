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
    title: string;
    JobTypeId: number;
    CreatedDate: Date;
    ExperienceId: number;
    BusinessId: number;
    JobDescription: string;
    Salary: string;
    DistrictId: number | undefined ;
    IsActive: string;
    ProfileImage?: string | null;
    ExpertiseIds: number[];
    ExpertiseId?:number[]
}
