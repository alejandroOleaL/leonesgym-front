import { ChangeDetectorRef, Component, OnDestroy, VERSION } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { URL_BACKEND } from 'src/config/config';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent  {
 
  public scannerEnabled: boolean = true;
  public information: string = "No se  detectado información de ningún código. Acerque un código QR para escanear.";

  public urlEndPonint:string = URL_BACKEND + '/leonesgym/clientes/qr';
  public urlEndPonintNumero:string = URL_BACKEND + '/leonesgym/clientes/numero/control';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  public cliente: Cliente = new Cliente();

  public estaVencido = true;
  public fechaFor: Date = new Date();

  public numControl: string;
  urlBackend: string = URL_BACKEND;

  constructor(public clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        console.log('ID enviar: ', id)
        this.clienteService.getEnviar(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";
    this.information = $event;

    console.log($event);

      if ($event) {
        this.router.navigate(['/bienvenidaqr', $event]);
      }
      
    this.enableScanner();

  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
  }

  public buscarPorNumero($event: any) {

    let numero
      if ($event) {
        numero = this.getValue($event)
      }
      this.numControl='';
      
      this.router.navigate(['/bienvenida', numero]);

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

}
