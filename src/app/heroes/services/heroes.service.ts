import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })  // crea la inyeccion de dependencias en el root para hacer el singleton y que el servicio se vea en toda la app
export class HeroesService {


    private baseUrl: string = environments.baseUrl;  // establece la ruta en environments de 'http://localhost:3000'


    // el constructor ejecuta el modulo httpclient
    constructor(private http: HttpClient) { }


    // creamos el metodo de tipo observable Hero que va a emitir los heroes en base a la direccion de la api de heroes
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }


    getHeroById(id: string): Observable<Hero | undefined> {

        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error => of(undefined))
            );

    }

    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }



}
