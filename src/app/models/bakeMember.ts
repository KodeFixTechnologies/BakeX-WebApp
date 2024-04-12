export interface BakeMember
{
    membershipId: number;
    memberName: string;
    phone: string;
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
}