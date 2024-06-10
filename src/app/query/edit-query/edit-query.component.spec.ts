import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQueryComponent } from './edit-query.component';

describe('EditQueryComponent', () => {
  let component: EditQueryComponent;
  let fixture: ComponentFixture<EditQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
