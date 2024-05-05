export interface Users {
    id?: number | null;
    mobileNumber: string;
    userTypeId: number;
    isMobileVerified: string;
    googleId?: string | null;
    password?: string | null;
    authId: number;
    createdAt: Date;
  }


  export interface UserProfile {
    ProfileId?: number;
    FirstName: string;
    LastName: string;
    Age: string;
    MobileNo: string;
    Gender: string;
    State: string;
    District:string
    Pincode:string
    Place: string;
    ProfileCreatedDate: string;
    EducationId: number;
    ExperienceId: number;
    ExpertiseIds: number[];
    JobTypeIds: number[];
  }
  