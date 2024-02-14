import { Component } from '@angular/core';
import Chart from 'chart.js/auto'
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Datos } from './datos';
import { tap } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  public datos: Datos[];
  public datos2: Datos = new Datos();

  constructor(public clienteService: ClienteService,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.clienteService.getDatos().subscribe(
      datos2 => {
        const ctx = document.getElementById('myChart');
  //"ctx" hace referencia al id del componente canvas
  
    const myChart = new Chart("ctx", {
        type: 'bar',
        data: {
            labels: ['Visitas hoy', 'Inactivos', 'Activos', 'Total'],
            datasets: [{
                label: 'numero de',
                data: [datos2.visitasHoy, datos2.inactivos, datos2.activos, datos2.total],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      }
    );
    console.log(this.datos2)
    this.crearTabla1();
  }

  public crearTabla1(){
    this.clienteService.getDatos().subscribe(
      datos2 => {
        const ctx2 = document.getElementById('myChart');
  //"ctx" hace referencia al id del componente canvas
  
    const myChart = new Chart("ctx2", {
        type: 'bar',
        data: {
            labels: ['Registros Hoy', 'Visitas hoy', 'Inactivos', 'Activos', 'Total'],
            datasets: [{
                label: 'numero de',
                data: [datos2.registros, datos2.visitasHoy, datos2.inactivos, datos2.activos, datos2.total],
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      }
    );
    console.log(this.datos2)
  }

}
