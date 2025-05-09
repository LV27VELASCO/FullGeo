import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { resPhoneInfo } from '../../../Interface/models';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pre-check-out',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pre-check-out.component.html',
  styleUrl: './pre-check-out.component.css'
})
export class PreCheckOutComponent {

  currentRoute:string ='';

  dataPhone:resPhoneInfo={
    country:'',
    phoneText:'',
    flag:'',
    operator:'',
    date:''
  };
  
  constructor( private utils:UtilitiesService, private http: HttpClient, private router: Router ) {
    this.currentRoute = this.router.url;
  }

  
  buttonLocation:boolean=true;

  ngOnInit() {
    const data =this.utils.getItem("data");
    if(data){
      this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
    }else{
      this.utils.navigate("/")
    }
  }

  onCheckout() {
    this.buttonLocation=false;
    this.http.post(`${environment.apiUrl}/checkout`, { lookup_key: 'fullgeo_mensual' })
    .subscribe({
      next:  async (res:any)=>{
        let stripe = await loadStripe(environment.pkStripe)
        stripe?.redirectToCheckout({sessionId: res.id}) 
      },
      error: (err) => {
        this.buttonLocation = true;
      }
    })
    }

    onNavigate(id:string) {
      this.utils.navigate(`pre-checkout#pay-now`)
    }
}
