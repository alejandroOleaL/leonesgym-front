import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Periodo } from './periodo';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  periodos: Periodo[];
  public titulo:string = "Registrar cliente";

  errores: string[];

  constructor(public clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
        console.log(this.cliente)
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
