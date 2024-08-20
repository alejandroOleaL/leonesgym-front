import { Component, OnInit } from '@angular/core';
import { VentaService } from './services/venta.service';
import { Venta } from './models/venta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css']
})
export class ItemVentaComponent implements OnInit{

  venta: Venta;
  titulo: String = 'Venta';

  constructor(public ventaService: VentaService,
              public activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.ventaService.getVenta(id).subscribe(venta => {
        this.venta = venta;
      })
    })
  }

}
