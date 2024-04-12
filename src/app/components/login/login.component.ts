import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import { Users } from '../../models/user';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,AfterViewInit {
  googleUser:any;
  user:any;
  isLogin:any;

   constructor(
          private ngZone: NgZone ,
       private authService:AuthService,
       private render:Renderer2,
       private queryService:QueryService,
       private router:Router,
       private dataService:DataService,
        // this is used to send the data from one component to another using rxjs
   ) {

   }



   ngOnInit() {
    const script= this.render.createElement('script');
    script.src= "https://accounts.google.com/gsi/client"
    script.onload=()=>{
      console.log("Script loaded")
    }
    script.onerror =(error:any)=> {
      console.log("script error",error)
    }
    this.render.appendChild(document.body,script)
   }

   ngAfterViewInit(): void {
    (window as any)['handleOauthResponse'] = (response: unknown) => {
        const responseObj = response as any;
        if (responseObj && responseObj.credential) {
            const responsePayload = this.decodeJWTToken(responseObj.credential);
            console.log(responsePayload)
            this.googleUser = responsePayload;
            const user: Users = {
                user_id: 0, // just passing if but in the api side it will not take it during creation
                name: this.googleUser.name,
                email: this.googleUser.email,
                googleId: this.googleUser.sub,
                profileImage: this.googleUser.picture
            }

            this.queryService.insertUser(user).subscribe((response) => {
                console.log("response: ",response);
                if (response == true) {
                    // Wrap the navigation inside NgZone.run()
                    this.ngZone.run(() => {
                        this.router.navigate(['/home']);
                        this.dataService.setData(true);
                    });
                    
                }else{
                    // Wrap the navigation inside NgZone.run()
                    this.ngZone.run(() => {
                      this.router.navigate(['/home']);
                      this.dataService.setData(true);
                  });
                }
             
            })
        } else {
            console.error("invalid format", response)
        }
    }
}

  

 decodeJWTToken(token:string)
 {
   return JSON.parse(atob(token.split(".")[1]));
 }
}