import { ChangeDetectorRef, Component, VERSION } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent {

  public scannerEnabled: boolean = true;
  public information: string = "No se  detectado información de ningún código. Acerque un código QR para escanear.";

  public urlEndPonint:string = 'http://localhost:8080/leonesgym/clientes/qr';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  public cliente: Cliente = new Cliente();

  public estaVencido = true;

  constructor(public clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";
    this.information = $event;

      if ($event) {
        this.clienteService.getClienteQr($event).subscribe((cliente) => this.cliente = cliente);
      }

    if(this.cliente.estatus){
        let timerInterval
      Swal.fire({
        title: `El cliente ${this.cliente.nombre} éxito!`,
        html: 'I will close in <b></b> milliseconds.',
        text: "Leones",
        imageUrl: `http://localhost:8080/leonesgym/uploads/img/${this.cliente.foto}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {},
        willClose: () => {
          clearInterval(500)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    
    this.enableScanner();

  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
  }

  public buscarPorNumero($event: any) {

      if ($event) {
        this.clienteService.getClienteNumero($event).subscribe((cliente) => this.cliente = cliente);
      }

    if(this.estaVencido){
        let timerInterval
      Swal.fire({
        title: `El cliente ${this.cliente.nombre} éxito!`,
        html: 'I will close in <b></b> milliseconds.',
        text: "Leones",
        imageUrl: `http://localhost:8080/leonesgym/uploads/img/${this.cliente.foto}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {},
        willClose: () => {
          clearInterval(500)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  }


}
