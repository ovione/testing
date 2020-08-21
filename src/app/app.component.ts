import { Component } from '@angular/core';
import { TestService } from './common/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';

  constructor(private testService: TestService) {}

  changeTitle(newTitle: string): void {
    this.title = newTitle;
  }

  changeTitleWithTimeout(newTitle: string): void {
    setTimeout(() => {
        this.title = newTitle;
    }, 0);
  }

  changeTitleWithAsynch(newTitle: string): void {
    this.callTestService(newTitle);
  }

  callTestService(newTitle: string): void {
    this.testService.getNewTitle(newTitle).subscribe({
      next: (nt: string) => this.title = nt});
  }

  changeTitleWithTimeoutAndAsync(newTitle: string): void {
    setTimeout(() => {
      this.callTestService(newTitle);
    }, 0);
  }
}
