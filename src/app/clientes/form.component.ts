import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Periodo } from './periodo';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  periodos: Periodo[];
  public titulo:string = "Registrar cliente";
  public username;
  public roleUser;

  errores: string[];

  constructor(public clienteService: ClienteService,
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
        console.log(this.cliente)
        if(this.authService.hasRole('ROLE_ADMIN')){
          this.roleUser  = 'ROLE_ADMIN'
        }
        else{
          this.roleUser  = 'ROLE_USER'
        }
        this.username = this.authService.obtenerUsuario();
      }
    });
    this.clienteService.getPeriodos().subscribe(periodos => this.periodos = periodos);
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    console.log(this.cliente);
    if(this.authService.hasRole('ROLE_ADMIN')){
      this.roleUser  = 'ROLE_ADMIN'
    }
    else{
      this.roleUser  = 'ROLE_USER'
    }
    this.username = this.authService.obtenerUsuario();
    this.cliente.username = this.username;
    this.cliente.roleUser = this.roleUser;
    console.log('ENVIANDO USER: ', this.cliente.username)

    let timerInterval;
    swal.fire({
      title: "Se registra cliente nuevo!",
      html: "Terminando en <b></b> segundos.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        swal.showLoading();
        const timer = swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    
    this.clienteService.create(this.cliente)
    .subscribe(cliente => { 
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    }
    ); 
  }

  update():void{
    console.log(this.cliente);
    this.cliente.username = this.username;
    this.cliente.roleUser = this.roleUser;
    console.log('ENVIANDO USER: ', this.cliente.username)
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
    }
    )
  }

  compararPeriodo(o1:Periodo, o2:Periodo){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 == null || o2 == null? false: o1.id===o2.id;
  }

}
