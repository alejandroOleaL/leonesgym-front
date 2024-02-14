import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { URL_BACKEND } from 'src/config/config';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  urlBackend: string = URL_BACKEND;
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-ES')
  public existe:boolean=true

  constructor(public clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit(){ 
    this.activatedRoute.paramMap.subscribe(params => {
      let numero = +params.get('numero');
      if (numero) {
        this.clienteService.getClienteNumero(numero).subscribe((cliente) => this.cliente = cliente);
        console.log('buscarpornumero1', this.cliente)
      }
    });
/*
    console.log('bUSQUEDA', this.cliente)
    if(Object.entries(this.cliente).length === 0){
      console.log('CLIENTE ES NULL')
      this.existe=false;
    }*/
  setTimeout(() => {
  /*  console.log('bUSQUEDA', this.cliente)
      if(Object.entries(this.cliente).length === 0){
        console.log('CLIENTE ES NULL')
        this.existe=false; 
      }
    if(!this.existe){
      this.router.navigate(['/monitor', 0]);
    }
    else{
      this.router.navigate(['/monitor', this.cliente.id]);
    } */
    this.router.navigate(['/monitor', this.cliente.id]);
  }, 5000);

  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

}

