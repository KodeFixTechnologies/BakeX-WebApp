import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'footers',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  displayPrivacyPolicyDialog: boolean = false;

    showPrivacyPolicyDialog() {
        this.displayPrivacyPolicyDialog = true;
    }

    hidePrivacyPolicyDialog() {
        this.displayPrivacyPolicyDialog = false;
    }

    displayTermsDialog: boolean = false;

    showTermsDialog() {
        this.displayTermsDialog = true;
    }

    hideTermsDialog() {
        this.displayTermsDialog = false;
    }
}
