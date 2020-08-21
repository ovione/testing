import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestService } from './common/test.service';

function checkTitleFrontEnd(nl, title): void {
  expect(nl.querySelector('span').textContent).toEqual(title);
}

function checkTitleComponent(component: AppComponent, title): void {
  expect(component.title).toEqual(title);
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let nl: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        TestService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'test'`, () => {
    checkTitleComponent(component, 'test');
  });

  it('should render title', () => {
    checkTitleFrontEnd(nl, 'test');
  });

  it('should detect title', () => {
    const originalTitle = 'test';
    const newTitle = 'title changed';

    component.changeTitle(newTitle);
    checkTitleComponent(component, newTitle);
    checkTitleFrontEnd(nl, originalTitle);
    fixture.detectChanges();
    checkTitleFrontEnd(nl, newTitle);
  });

  it('should detect title with timeout', fakeAsync(() => {
    const originalTitle = 'test';
    const newTitle = 'title changed with timeout';

    component.changeTitleWithTimeout(newTitle);
    checkTitleComponent(component, originalTitle);
    checkTitleFrontEnd(nl, originalTitle);

    tick(100);
    checkTitleComponent(component, newTitle);
    checkTitleFrontEnd(nl, originalTitle);

    fixture.detectChanges();
    checkTitleFrontEnd(nl, newTitle);
  }));

  it('should detect title with async', fakeAsync(() => {
    const originalTitle = 'test';
    const newTitle = 'title changed with async';

    component.changeTitleWithAsynch(newTitle);
    checkTitleComponent(component, newTitle);
    checkTitleFrontEnd(nl, originalTitle);

    fixture.detectChanges();
    checkTitleFrontEnd(nl, newTitle);
  }));

  it('should detect title with async and timeout', fakeAsync(() => {
    const originalTitle = 'test';
    const newTitle = 'title changed with async and timeout';

    checkTitleComponent(component, originalTitle);
    checkTitleFrontEnd(nl, originalTitle);

    component.changeTitleWithTimeoutAndAsync(newTitle);
    checkTitleComponent(component, originalTitle);
    checkTitleFrontEnd(nl, originalTitle);

    tick(100);
    checkTitleComponent(component, newTitle);
    checkTitleFrontEnd(nl, originalTitle);

    fixture.detectChanges();
    checkTitleFrontEnd(nl, newTitle);
  }));
});
