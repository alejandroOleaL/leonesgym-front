import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit{

  public usuario: Usuario = new Usuario();
  public titulo: string = "Crear Usuario";

  constructor(public usuarioService: UsuarioService,
    public router: Router, public activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.cargarUsuario()
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  public Create(): void{
    console.log(this.usuario);
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      swal.fire('Nuevo usuario', `El usuario ${usuario.nombre} ha sido creado con éxito!`, 'success')
    },
    err => {
      console.error(err.error.errors);
    }
    );
  }

  update(): void{
    this.usuarioService.update(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/usuario'])
        swal.fire('Usuario actualizado', 'Usuario actualizado con exito', 'success');
      }
    )
  }

}
