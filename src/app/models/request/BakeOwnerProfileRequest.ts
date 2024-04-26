export interface IBakerOwnerProfile {

   personalInformation: {
        firstname: string;
        lastname: string;
        age: number | null;
        gender: string;
        phoneno: string;
    };
    locationInformation: {
        state: string;
        district: string;
        place: string;
        pincode: string;
    };
    businessInformation: {
        businessName: string;
        businessAddress: string;
        businessPhone:string;
        fssaiNo: string;
        fssaiExpiryDate: Date | null;
    };
    otherInformation:{
        profileCreateDate:Date|null;
    }

    
}


export interface IBakerOwnerProfileRequest {

    firstname: string;
    lastname: string;
    age: number | null;
    gender: string;
    phoneno: string;


    state: string;
    district: string;
    place: string;
    pincode: string;


    businessName: string;
    businessAddress: string;
    businessPhone:string,
    fssaiNo: string;
    fssaiExpiryDate: Date | null;


    profileCreateDate: Date | null;



}