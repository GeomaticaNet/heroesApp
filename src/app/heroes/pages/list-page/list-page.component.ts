import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styles: [
    ]
})
export class ListPageComponent implements OnInit {

    // Se crea una variable de tipo array Hero
    public heroes: Hero[] = [];

    // Se ejecuta el servicio
    constructor(private heroesService: HeroesService) {}

    ngOnInit(): void {
        // Al iniciar componente se ejecuta el observable getHeroes
        this.heroesService.getHeroes()
                            // La propiedad heroes de la clase ListComponent va a ser igual a los heroes que regresa el servicio.
            .subscribe(heroes => this.heroes = heroes);
    }

}
