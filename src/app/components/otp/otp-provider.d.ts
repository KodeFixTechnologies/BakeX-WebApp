// src/otp-provider.d.ts

interface Window {
    sendOtp(identifier: string, successCallback?: (data: any) => void, failureCallback?: (error: any) => void): void;
    verifyOtp(otpValue: string, successCallback?: (data: any) => void, failureCallback?: (error: any) => void, reqId?: string): void;
    retryOtp(channel: string | null, successCallback?: (data: any) => void, failureCallback?: (error: any) => void, reqId?: string): void;
    getWidgetData(): any;
  }
  