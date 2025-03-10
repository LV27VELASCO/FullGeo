import { Component, Input } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { Country } from '../../../Interface/models';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {
    @Input() _countries: Country[] = [];
    @Input() _urlFlagBase: string = '';
    @Input() _flag: string = '';
    @Input() _codePhone: string = '';
}
