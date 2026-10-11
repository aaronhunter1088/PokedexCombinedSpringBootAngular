import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MobileMenuComponent} from './mobile-menu.component';
import {provideRouter} from '@angular/router';
import {CommonModule} from "@angular/common";
import {PokedexComponent} from "../pokedex/pokedex.component";

describe('MobileMenuComponent', () => {
    let component: MobileMenuComponent;
    let fixture: ComponentFixture<MobileMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MobileMenuComponent
            ],
            declarations: [
                PokedexComponent
            ],
            providers: [
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MobileMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});