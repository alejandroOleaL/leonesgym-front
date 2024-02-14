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
  selector: 'app-bienvenidaqr',
  templateUrl: './bienvenidaqr.component.html',
  styleUrls: ['./bienvenidaqr.component.css']
})
export class BienvenidaqrComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  urlBackend: string = URL_BACKEND;
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-ES')

  constructor(public clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.clienteService.getClienteQr(id).subscribe((cliente) => this.cliente = cliente);
        console.log('buscarpornumero1', this.cliente)
      }
    });

      
      console.log('buscarpornumero2', this.cliente)
/*
    const date = new Date(this.cliente.fechaFin);
    const fechaFor = this.formatDate(date);

  if(this.cliente.estatus){
      let timerInterval
    Swal.fire({
      title: `Bienvenido ${this.cliente.nombre}!`,
      html: `Su mensualidad se vence el día ${fechaFor}`,
      text: "Leones",
      imageUrl: URL_BACKEND + `/leonesgym/uploads/img/${this.cliente.foto}`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {},
      willClose: () => {
        clearInterval(700)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
      this.router.navigate(['/monitor']);
    })
  }
  else{
    Swal.fire({
      title: 'Oops...',
      imageUrl: URL_BACKEND + `/leonesgym/uploads/img/gatito`,
      text: `Lo sentimos ${this.cliente.nombre} su mensualidad se ha vencido!`,
      footer: '<a href="">Favor de notificar a la recepción!</a>'
    })
  }
*/
setTimeout(() => {
  console.log("this is the first message");
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


