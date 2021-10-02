import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { Categoria } from 'src/app/models/Categoria';
import { Producto } from 'src/app/models/Producto';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent {
  addressForm = this.fb.group({
    referencia: [null, Validators.required],
    titulo: [null, Validators.required],
    descripcion: [null, Validators.required],
    precio: [null, Validators.required],
    categoriaId: [null, Validators.required],
  });

  productoEditado:Producto = {
    referencia: "",
    titulo: "",
    descripcion: "",
    precio: 0.0,
    categoriaId: "",
  };

  lstCategorias:Categoria[] = [];

  selected = "";

  constructor(private fb: FormBuilder, private productoService: ProductosService, private categoService: CategoriasService, private route:ActivatedRoute, private router:Router, private _snackBarService: SnackBarService) {
    this.reset();
  }

  reset() {
    this.productoEditado = {
      referencia: "",
      titulo: "",
      descripcion: "",
      precio: 0.0,
      categoriaId: "",
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      if(typeof params.id !== "undefined")  {
        this.productoService.findProductoById(params.id).subscribe(data => {
          if(data._id === params.id) {
            this.productoEditado = data;
            this.lanzarFormularioEditar();
          } else {
            this.router.navigate(["/categories"]);
          }
        })
      }
    this.lanzarFormularioEditar();
    })
  }

  lanzarFormularioEditar() {
    //Traemos los datos de categorías para lanzarlos al formulario
    this.categoService.getCategorias().subscribe(data => {
      this.lstCategorias = data;  
      //Categorría seleccionada por defecto (no funciona)
      this.selected = this.lstCategorias[0].nombre;
    });
    this.addressForm = this.fb.group(this.productoEditado);
  }

  onSubmit(): void {
    this.productoEditado = this.addressForm.value;
    let request;
    if(typeof this.productoEditado._id !=="undefined") {
      request = this.productoService.editarProducto(this.productoEditado);
      this._snackBarService.openSnackBar('producto', 'editado');
      this.router.navigate(["/productos"]);
    } else {
      request = this.productoService.insertProducto(this.productoEditado);
      this._snackBarService.openSnackBar('producto', 'insertado');
      this.router.navigate(["/productos"]);
    }

    request.subscribe(res => {
      this.reset();
    });
  }
}
