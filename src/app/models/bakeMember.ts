export interface BakeMember
{
    memberId: number;
    memberName?: string;
    phoneNo: string;
    businessId:number
    businessName: string;
    businessPhone: string;
    businessAddress: string;
    pinCode: string;
    fssaiLicenseNo: string;
    districtId: number;
    mandalamId: number;
    designation: string;
    profileImage: string | null;
    membershipExpiry: Date | null;
    age: Date;
    place: String
    profileImageBase64:string | null;
    district?:string;
}