import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {HttpClient} from "@angular/common/http";
import {DarkModeService} from "../services/dark-mode.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {environment} from "../../environments/environment";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-mobile-menu',
    imports: [
        RouterLink,
        FormsModule,
        MatSlideToggleModule
    ],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent implements OnInit {
    @Input() showGifs: boolean = this.pokemonService.getShowGifs();
    @Input() currentDarkMode: boolean = this.darkModeService.isDarkMode();
    @Input() pokemonMap: Map<number, any> = new Map<number, any>();
    @Input() tileColorParam: string = '';
    @Output() showGifsChange = new EventEmitter<boolean>();
    @Output() currentDarkModeChange = new EventEmitter<boolean>();
    @Output() pokemonMapChange = new EventEmitter<Map<number, any>>();
    pokemonNameID: string = '';
    @Input() chosenType: string = 'none';
    @Input() pageNumber: number = 1;
    @Output() chosenTypeChange = new EventEmitter<string>();
    @Output() chosenPageNumber = new EventEmitter<number>();
    @Input() pkmnPerPage: number = 10; // default
    @Output() pkmnPerPageChange = new EventEmitter<number>();
    @Input() totalPokemon: number = 0;
    @Output() totalPokemonChange = new EventEmitter<number>();
    uniqueTypes: string[] = ["bug", "dark", "dragon", "electric", "fairy", "fighting",
        "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic",
        "rock", "shadow", "steel", "stellar", "unknown", "water"];
    landingPageUrl: string = environment.landingPageUrl;

    constructor(protected pokemonService: PokemonService,
                private router: Router,
                private http: HttpClient,
                private darkModeService: DarkModeService) {
    }

    ngOnInit(): void {
        if (!this.tileColorParam) {
            this.tileColorParam = this.pokemonService.getTileColorParam();
        }
    }

    toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        menu?.classList.toggle('active');
        overlay?.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (menu?.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        menu?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    async navigateToPokedex(): Promise<void> {
        let pokemonId = this.pokemonNameID;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const idPattern = /^[1-9][0-9]{0,5}$/; // Matches numbers from 1 to 99_999
        const isNumeric = /^\d+$/.test(pokemonId);

        if (isNumeric) {
            if (!idPattern.test(pokemonId) && !isMobile) {
                alert("Pok\u00e9mon not found. Please check the ID and try again.");
                return;
            }
        } else if ((pokemonId === undefined || pokemonId.trim() === '') && !isMobile) {
            alert('Pok\u00e9mon not found. Please check the Name and try again.');
            return;
        }
        if (pokemonId === 'deoxys') {
            pokemonId = 'deoxys-normal';
        }
        try {
            const pokemon = await this.pokemonService.getPokemonByName(pokemonId);
            if (pokemon && pokemonId) {
                pokemonId = pokemonId.toString();
            }
        } catch (error) {
            console.error('Failed to fetch Pok\u00e9mon data for: ' + pokemonId, error);
            alert('Pok\u00e9mon not found. Please check the ID or Name and try again.');
            return;
        }
        console.log("searched for pokemonId: " + pokemonId);
        this.router.navigate(['pokedex', pokemonId])
            .then(() => {
                // Clear the search input after navigation
                this.pokemonNameID = '';
            });
    }

    onInput(pokemonNameID: string) {
        this.pokemonNameID = pokemonNameID;
    }

    onPageInput(page: string) {
        if (isNaN(Number(page))) {
            alert("Please enter a valid page number");
            return;
        }
        if (Number(page) < 1) {
            this.pageNumber = 1;
        }
        else {
            this.pageNumber = Number(page);
            this.chosenPageNumber.emit(this.pageNumber);
        }
    }

    onPkmnPerPageInput(pkmnPerPage: string) {
        if (isNaN(Number(pkmnPerPage))) {
            alert("Please enter a valid number of Pokemon per page");
            return;
        }
        if (Number(pkmnPerPage) < 1) {
            this.pkmnPerPage = this.pokemonService.pkmnPerPage;
        }
        else {
            this.pkmnPerPage = Number(pkmnPerPage);
            this.pkmnPerPageChange.emit(this.pkmnPerPage);
        }// reset input field after submission
    }

    toggleShowGifs() {
        this.showGifs = !this.showGifs;
        this.showGifsChange.emit(this.showGifs);
        this.pokemonService.saveShowGifs(this.showGifs);
        setTimeout(() => {
            this.closeMobileMenu();
        }, 500);
    }

    toggleDarkMode() {
        this.darkModeService.toggleDarkMode();
        this.currentDarkMode = this.darkModeService.isDarkMode();
        this.currentDarkModeChange.emit(this.currentDarkMode);
        setTimeout(() => {
            this.closeMobileMenu();
        }, 500);
    }

    showLoadingOverlay(): void {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideLoadingOverlay(): void {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    /**
     * Navigate back to the landing page with the current dark mode setting
     */
    navigateToLandingPage(): void {
        const currentDarkMode = this.darkModeService.isDarkMode();
        const url = this.landingPageUrl + "?tileNumber=3&darkmode="+currentDarkMode;
        window.location.href = url;
    }

    getByPkmnType(event: Event) {
        let selectedType = (event.target as HTMLInputElement).value;
        console.log("getByPkmnType (mobile): " + selectedType);
        this.chosenType = selectedType;
        this.chosenTypeChange.emit(selectedType);
        this.closeMobileMenu();
    }

    setPageToView() {
        this.chosenPageNumber.emit(this.pageNumber);
        this.closeMobileMenu();
    }

    setPkmnPerPage() {
        this.pkmnPerPageChange.emit(this.pkmnPerPage);
        this.closeMobileMenu();
    }
}
