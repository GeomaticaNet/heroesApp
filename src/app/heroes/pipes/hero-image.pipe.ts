import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
    name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

    transform(hero: Hero): string {

        // Si no hay id e imagen carga la imagen 'no-image'
        if(!hero.id && !hero.alt_img){
            return 'assets/no-image.png';
        }

        if(hero.alt_img) return hero.alt_img;

        // De lo contrario carga la imagen correspondiente:
        return `assets/heroes/${ hero.id }.jpg`;

    }

}
