import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from "../app/hero";
import { HEROES } from './mock-heroes';
import { MessageService } from "./message.service";


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // usando o modelo Hero para uma lista que contesm varios Hero vindo do servidor
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('Heore foi criado');
    return of(HEROES);
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
