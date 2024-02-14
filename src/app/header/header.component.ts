import { Component } from "@angular/core";
import { AuthService } from "../usuarios/auth.service";
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { URL_BACKEND } from "src/config/config";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    title: string = 'App Angular'
    urlBackend: string = URL_BACKEND;
    
    constructor(public authService: AuthService,
        public router: Router){}

    logout():void{
        let username = this.authService.usuario.username;
        this.authService.logout();
        swal.fire('Logout', `Hola ${username}, has cerrado sesión!`, 'success');
        this.router.navigate(['/login']);
    }

}