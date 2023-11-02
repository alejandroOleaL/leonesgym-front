import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  usuarios: Usuario[];
  paginador: any;

  constructor(public usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute) {} 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = +params.get('page');
  
      if(!page){
        page = 0;
      }
  
      this.usuarioService.getUsuarios(page)
      .pipe(
        tap(response => {
          console.log('UsuarioComponent: tap 3');
          (response.content as Usuario[]).forEach(usuario => {
            console.log(usuario.nombre);
          });
        })
      ).subscribe(response => {
        this.usuarios = response.content as Usuario[];
        this.paginador = response;
      });
      });
  } 

  delete(usuario: Usuario): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swal.fire(
              'Usuario eliminado!',
              `uSuario ${usuario.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

        
      }
    })
  }
}
