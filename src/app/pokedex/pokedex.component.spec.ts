import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokedexComponent} from './pokedex.component';
import {provideRouter} from '@angular/router';
import {MobileMenuComponent} from '../mobile-menu/mobile-menu.component';
import {EvolutionsComponent} from '../evolutions/evolutions.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
          imports: [
              MobileMenuComponent
          ],
          declarations: [
              PokedexComponent,
              EvolutionsComponent
          ],
          providers: [
              provideRouter([])
          ]
      }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
