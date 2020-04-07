import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCoursesPage } from './view-courses.page';

describe('ViewCoursesPage', () => {
  let component: ViewCoursesPage;
  let fixture: ComponentFixture<ViewCoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
