import { WorkHistory } from "./user";

export interface JobSeeker {
    profileId: number;
    firstName: string;
    lastName: string;
    stateName: string;
    districtName: string;
    experienceType: string;
    educationLevel: string;
    pinCode: string;
    mobileNo: string;
    birthDate: Date;
    workHistory:WorkHistory[]
}
