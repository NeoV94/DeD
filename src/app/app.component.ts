import { Component, OnInit } from '@angular/core';
import { ServiceModule } from './service/service.module';
import { player } from './class/player';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { griglia } from './class/griglia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'DeD';
  public a: player[] = [];
  public d20: number[] = [];
  public d12: number[] = [];
  public d10: number[] = [];
  public d6: number[] = [];
  public d4: number[] = [];
  public d4summ: number;
  public d6summ: number;
  public d10summ: number;
  public d12summ: number;
  public d20summ: number;
  public turno: number = 0;
  public dPer: string[] = [];
  public dPersumm: number;
  public l = [[]];
  public griglia: Array<griglia> = [];
  public graficX:number=10;
  public graficY:number=5;
  public timer:any;
  public date=+new Date();
  constructor(private servizio: ServiceModule, private cookie: CookieService) {
    this.handlePlayers(this.servizio.getPlayers());
    this.syncro();
    this.l.length = this.graficY;
    for (let i = 0; i < this.l.length; i++) {
      this.l[i] = [];
      this.l[i] = new Array<string>(this.graficX);
    }
    this.getPosizioni();
    this.syncroPosizione();
    this.time();
    console.log(this.griglia.length);

    console.log(this.l);
  }
  public getPlayers() {
    // this.handlePlayers(this.servizio.getPlayers());
    this.syncro();
  }
  public resetiniziative() {
    this.servizio.resetIniziative().subscribe();
  }
  public handlePlayers(res: Observable<object>) {
    res.subscribe((res: JSON) => {
      var p: player[] = [];
      console.log('i m in');
      console.log(this.cookie.getAll());
      let i = 0;
      while (res[i] != null) {
        let play: player = new player(res[i].nome, res[i].destrezza, res[i].iniziativa, res[i].costituzione, res[i].intelligenza, res[i].saggezza, res[i].forza);
        p.push(play);
        i += 1;
      }; this.a = p;
    }, err => { console.log(err) })
  }

  public syncro() {
    this.servizio.syncro().subscribe((res: JSON) => {
      var p: player[] = [];
      console.log('i m in');
      console.log(this.cookie.getAll());
      let i = 0;
      while (res[i] != null) {
        let play: player = new player(res[i].nome, res[i].destrezza, res[i].iniziativa, res[i].costituzione, res[i].intelligenza, res[i].saggezza, res[i].forza);
        p.push(play);
        i += 1;
      }; this.a = p; this.syncro()
    }, err => { console.log(err) })
  }

  public setIniziativa(i: number, iniziativa: number) {
    this.servizio.setIniziativa(this.a[i].nome, iniziativa).subscribe();
  }
  public deletePlayer(player: player) {
    this.servizio.deletePlayer(player).subscribe();
  }

  public addPlayer(nome: String, destrezza: number, iniziativa: number) {
    let pr: player = new player(nome, destrezza, iniziativa, 0, 0, 0, 0);
    this.servizio.addPlayer(pr).subscribe();
  }
  public lanciad20() {
    this.d20.push(Math.ceil(Math.random() * 20));
    this.d20summ = this.d20.reduce((a, b) => a + b, 0);
  }
  public lanciad12() {
    this.d12.push(Math.ceil(Math.random() * 12));
    this.d12summ = this.d12.reduce((a, b) => a + b, 0);
  }
  public lanciad10() {
    this.d10.push(Math.ceil(Math.random() * 10));
    this.d10summ = this.d10.reduce((a, b) => a + b, 0);
  }
  public lanciad6() {
    this.d6.push(Math.ceil(Math.random() * 6));
    this.d6summ = this.d6.reduce((a, b) => a + b, 0);
  }
  public lanciad4() {
    this.d4.push(Math.ceil(Math.random() * 4));
    this.d4summ = this.d4.reduce((a, b) => a + b, 0);
  }
  public lanciadPer() {
    this.dPer.push(Math.ceil(Math.random() * 100) + "%");
  }

  public resetDadi(dado: number[]) {
    dado.length = 0;
  }
  public nextTurn() {
    this.turno = this.turno + 1;
    if (this.turno == this.a.length) {
      this.turno = 0;
    };
  }
  public danneggia(danneggia, danni, danneggiato) {
    console.log(danneggia + " fa " + danni + " danni a " + danneggiato);
  }

  public movePg(turno,x,y){

    this.servizio.setPosizione(new griglia(this.a[turno].nome,x,y)).subscribe(res=>{});
  }
  public syncroPosizione(){
    
    this.servizio.syncroPosizione().subscribe(res => {
      let i = 0;
      let gri1:griglia[]=[];
      while (res[i] != null) {
        let g1 = new griglia(res[i].nome, res[i].x, res[i].y);
        gri1.push(g1);
        i += 1;
      }; 
      let gg:Array<String>=[];
      for(let i of this.a){
      gg.push(i.nome);
      } 
      let ll=[[]];
    ll.length = this.graficY;
    for (let i = 0; i < ll.length; i++) {
      ll[i] = [];
      ll[i] = new Array<string>(this.graficX);
    }     
      for (let persona of gri1) {
        ll[persona.y][persona.x] = gg.indexOf(persona.nome);
      }this.l=ll;this.griglia=gri1;this.syncroPosizione();
    })
  }
  public getPosizioni(){
    this.servizio.getPosizioni().subscribe(res => {
      let i = 0;
      while (res[i] != null) {
        let g1 = new griglia(res[i].nome, res[i].x, res[i].y);
        this.griglia.push(g1);
        i += 1;
      }; 
      let gg:Array<String>=[];
      for(let i of this.a){
      gg.push(i.nome);
      }      
      for (let persona of this.griglia) {
        this.l[persona.y][persona.x] = gg.indexOf(persona.nome);
      }
    });
  }

  public resetGrafico(){
    this.l.length = this.graficY;
    for (let i = 0; i < this.l.length; i++) {
      this.l[i] = [];
      this.l[i] = new Array<string>(this.graficX);
    }
    this.getPosizioni();
  }
  public time(){
    setInterval(()=>{this.timer=+new Date() - this.date;},1);
    
  }
}
