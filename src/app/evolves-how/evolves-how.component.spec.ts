import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EvolvesHowComponent} from './evolves-how.component';
import {provideRouter} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';

describe('EvolvesHowComponent', () => {
    let component: EvolvesHowComponent;
    let fixture: ComponentFixture<EvolvesHowComponent>;

    beforeEach(async () => {

        const mockPokemonService = {
            getEvolutionsMap: () => new Map([
                [1, [[1], [2], [3]]]
            ]),
            getPokemonChainData: () => Promise.resolve([])
        };

        await TestBed.configureTestingModule({
            declarations: [
                EvolvesHowComponent
            ],
            providers: [
                provideRouter([]),
                {
                    provide: PokemonService,
                    useValue: mockPokemonService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EvolvesHowComponent);
        component = fixture.componentInstance;

        // Set the Pokémon ID before ngOnInit executes.
        component.pokemonID = 1;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});