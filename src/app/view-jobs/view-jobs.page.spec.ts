import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewJobsPage } from './view-jobs.page';

describe('ViewJobsPage', () => {
  let component: ViewJobsPage;
  let fixture: ComponentFixture<ViewJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
