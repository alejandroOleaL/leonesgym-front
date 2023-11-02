import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Role } from './role';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit{

  public usuario: Usuario = new Usuario();
  public titulo: string = "Crear Usuario";
  public USER: string = "ROLE_USER";
  public ADMIN: string = "ROLE_ADMIN";
  errores: string[];
  role: Role[];

  constructor(public usuarioService: UsuarioService,
    public router: Router, public activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.activatedRoute.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario);
          console.log(this.usuario)
        }
      });
      this.usuarioService.getRoles().subscribe(role => this.role = role);
      console.log('onInit2');
    }
  
    cargarUsuario(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if(id){
          this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
          console.log('cargarUsuario');
        }
      })
    }

  create() {
    this.usuarioService.create(this.usuario).subscribe(json => {
      //this.usuario.role = [{id: 1, nombre: 'ROLE_USER'}];
        console.log(this.usuario);
        this.router.navigate(['/usuarios'])
      swal.fire('Nuevo Usuario', `El usuario ${this.usuario.nombre} ha sido creado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
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

  compararRole(o1:Role, o2:Role){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 == null || o2 == null? false: o1.id===o2.id;
  }

}
