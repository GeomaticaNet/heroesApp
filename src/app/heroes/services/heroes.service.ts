import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })  // crea la inyeccion de dependencias en el root para hacer el singleton y que el servicio se vea en toda la app
export class HeroesService {


    private baseUrl: string = environments.baseUrl;  // establece la ruta en environments de 'http://localhost:3000'


    // el constructor ejecuta el modulo httpclient
    constructor(private http: HttpClient) { }


    //GET DE TODOS LOS HEROES DE PAGINA PRINCIPAL
    // creamos el metodo de tipo observable Hero que va a emitir los heroes en base a la direccion de la api de heroes
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    // GET DE PAGINA DE VER HEROE
    getHeroById(id: string): Observable<Hero | undefined> {

        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error => of(undefined))
            );

    }

    // GET DE SUGERENCIAS DEL BUSCADOR
    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }


    // ENDPOINT AGREGAR
    // Toma como parámetro un objeto de tipo "Hero" y devuelve un observable de tipo "Hero"
    addHero(hero: Hero): Observable<Hero> {
        // Regresa un post de tipo "Hero" al endpoint y con el body "hero" de tipo "Hero"
        return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
    }

    // ENDPOINT ACTUALIZAR
    updateHero(hero: Hero): Observable<Hero> {
        // Pongo patch porque quiero actualizar parte del registro (no es destructivo)

        if (!hero.id) throw Error('Hero id is required');

        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);

    }

    // ENDPOINT BORRAR
    deleteHeroById(id: string): Observable<boolean> {

        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                // Si no da erro da true, da igual lo que devuelva
                map(resp => true),
                // Si da error da false
                catchError(err => of(false)),

            );

    }

}
