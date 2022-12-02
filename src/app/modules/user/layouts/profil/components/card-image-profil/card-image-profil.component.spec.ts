import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImageProfilComponent } from './card-image-profil.component';

describe('CardImageComponent', () => {
  let component: CardImageProfilComponent;
  let fixture: ComponentFixture<CardImageProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardImageProfilComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardImageProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
