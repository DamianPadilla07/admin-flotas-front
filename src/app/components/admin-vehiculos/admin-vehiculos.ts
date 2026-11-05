import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Corregimos la ruta para que coincida con el nombre real de tu archivo
import { VehiculoService } from '../../services/vehiculo'; 

@Component({
  selector: 'app-admin-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-vehiculos.html',
  styleUrls: ['./admin-vehiculos.css']
})
export class AdminVehiculosComponent implements OnInit {
  
  // Todo va DENTRO de la clase, antes de la última llave de cierre
  
  aseguradoras: any[] = [];
  polizas: any[] = [];
  
  vehiculo: any = {
    placa: '',
    modelo: '',
    umbralDepreciacion: null,
    poliza: { id: null }
  };

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.cargarAseguradoras();
  }

  cargarAseguradoras() {
    this.vehiculoService.getAseguradoras().subscribe(data => {
      this.aseguradoras = data;
    });
  }

  onAseguradoraChange(event: any) {
    const idAseguradora = event.target.value;
    this.vehiculo.poliza.id = null; 
    
    if (idAseguradora) {
      this.vehiculoService.getPolizasByAseguradora(idAseguradora).subscribe(data => {
        this.polizas = data;
      });
    } else {
      this.polizas = []; 
    }
  }

  guardarVehiculo() {
    this.vehiculoService.crearVehiculo(this.vehiculo).subscribe({
      next: (res) => {
        alert('Vehículo registrado con éxito para el Core.');
      },
      error: (err) => {
        alert('Error del Servidor: ' + err.error.message || 'Datos inválidos para cálculo financiero.');
      }
    });
  }
} // <--- Aquí es donde realmente se cierra la clase  