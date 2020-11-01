import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from "../app/hero";
import { HEROES } from './mock-heroes';
import { MessageService } from "./message.service";




@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; //URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  // usando o modelo Hero para uma lista que contesm varios Hero vindo do servidor
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }


  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('Heore foi criado');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      ); //pegando no servido fake
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
