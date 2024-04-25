export interface IBakerOwnerProfileRequest {

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
        licenseno: string;
        fssaiExpiry: Date | null;
    };
    otherInformation:{
        profileCreateDate:Date|null;
    }

    
}
