import { Component } from '@angular/core';
import { NotificationsService } from './modules/user/services/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instaclo';

  constructor(private readonly notificationsService: NotificationsService) {
    this.notificationsService.generateNotification('test', 'test');
  }
}
