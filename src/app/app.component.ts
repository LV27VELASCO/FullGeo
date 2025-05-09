import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UtilitiesService } from './services/utilities.service';
import { Country } from '../Interface/models';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from './config/languajes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule,CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {

   constructor(
    private utils: UtilitiesService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object) { }

    _countries: Country[] = [];
    urlFlagBase="https://flagcdn.com/"; 
    flag:string="co";
    codePhone:string="+57";


    ngOnInit() {
       if (isPlatformBrowser(this.platformId)) {
        // Escuchar cambios en la ruta y configurar el idioma
           let lang = localStorage.getItem('lang'); // Idioma por defecto
           if(lang && ALLOWED_LANGUAGES.includes(lang)){
              this.utils.translateText(lang);
           }else{
              this.utils.translateText("es");
           }
          // Opcional: guardar el idioma en localStorage o cookies
       }

      this.utils.getCountries().subscribe((data) => {
        this._countries = data.sort((a:any)=> a.name);
      });
      this.utils.setCountries(this._countries);
    }

}
