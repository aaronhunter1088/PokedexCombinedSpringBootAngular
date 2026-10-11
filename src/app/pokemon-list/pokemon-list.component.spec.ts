import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonListComponent} from './pokemon-list.component';
import {provideRouter} from '@angular/router';
import {MobileMenuComponent} from '../mobile-menu/mobile-menu.component';
import {NgxPaginationModule} from 'ngx-pagination';

describe('PokemonListComponent', () => {
    let component: PokemonListComponent;
    let fixture: ComponentFixture<PokemonListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MobileMenuComponent,
                NgxPaginationModule
            ],
            declarations: [
                PokemonListComponent
            ],
            providers: [
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
