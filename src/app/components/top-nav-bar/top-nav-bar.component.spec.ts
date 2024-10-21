import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavBarComponent } from './top-nav-bar.component';
import { RouterModule } from '@angular/router';

describe('TopNavBarComponent', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavBarComponent],
      imports: [
        RouterModule.forRoot([]) // RouterModule'ü ekliyoruz
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Bileşeni başlat
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Bileşenin başarılı bir şekilde oluşturulduğunu kontrol et
  });

  // Diğer testler buraya eklenebilir...
});
