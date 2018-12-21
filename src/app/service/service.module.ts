import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import {player} from '../class/player';
import { Observable } from 'rxjs';
import { griglia } from '../class/griglia';
@Injectable({
  providedIn: 'root',
})
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServiceModule {
  
  
  public player:player[]=[]
  constructor(private http:HttpClient){}

  public getPlayers():Observable<object>{
    return this.http.get('http://192.168.1.162:8080/JerseyDemos/rest/Players');
  }
  public resetIniziative(){
    return this.http.get('http://192.168.1.162:8080/JerseyDemos/rest/resetIniziative');
  }
  public syncro(){
    return this.http.get('http://192.168.1.162:8080/JerseyDemos/rest/Syncro');
  }
  public syncroPosizione(){
    return this.http.get('http://192.168.1.162:8080/JerseyDemos/rest/SyncroPosizione');
  }
  public setIniziativa(nome:String,iniziativa:number): any {
    return this.http.put("http://192.168.1.162:8080/JerseyDemos/rest/setIniziativa/"+nome,iniziativa);
  } 
  public deletePlayer(player:player){
    return this.http.delete("http://192.168.1.162:8080/JerseyDemos/rest/deletePlayer/"+player.nome);
  }
  public addPlayer(player: any): any {
    return this.http.post("http://192.168.1.162:8080/JerseyDemos/rest/InserisciPlayer",player);
  }
  public getPosizione(nome:string){
    return this.http.get("http://192.168.1.162:8080/JerseyDemos/rest/posizione/"+nome);
  }
  public getPosizioni(){
    return this.http.get("http://192.168.1.162:8080/JerseyDemos/rest/posizioni");
  }
  public setPosizione(griglia: griglia){
    return this.http.put("http://192.168.1.162:8080/JerseyDemos/rest/movePg/",griglia);
  }
}
