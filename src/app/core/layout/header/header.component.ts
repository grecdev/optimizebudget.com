import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  pageTitle: string = 'Hello world!';

  constructor(iconRegistryService: IconRegistryService, sanitizer: DomSanitizer) {
    iconRegistryService.addSvgIconConfig({
      name: 'basic-notification-icon',
      url: sanitizer.bypassSecurityTrustResourceUrl('assets/icons/basic-notification-icon.svg'),
    });
  }
}
