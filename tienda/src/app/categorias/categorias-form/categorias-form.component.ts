import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from '../categorias.service';

import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent {
  addressForm = this.fb.group({
    nombre: [null, Validators.required]
  });

  categoriaEditada:Categoria = {
    nombre: ""
  };

  constructor(private fb: FormBuilder, private categoService: CategoriasService, private route:ActivatedRoute, private router:Router, private _snackBarService: SnackBarService) {
    this.reset();
  }

  reset() {
    this.categoriaEditada = {nombre: ""};
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      if(typeof params.id !== "undefined")  {
        this.categoService.findCategoriaById(params.id).subscribe(data => {
          if(data._id === params.id) {
            this.categoriaEditada = data;
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
    this.addressForm = this.fb.group(this.categoriaEditada);
  }

  onSubmit(): void {
    this.categoriaEditada = this.addressForm.value;
    let request;
    if(typeof this.categoriaEditada._id !=="undefined") {
      request = this.categoService.editarCategoria(this.categoriaEditada);
      this._snackBarService.openSnackBar('categoría', 'editada');
      this.router.navigate(["/categorias"]);
    } else {
      request = this.categoService.insertCategoria(this.categoriaEditada);
      this._snackBarService.openSnackBar('categoría', 'insertada');
      this.router.navigate(["/categorias"]);
    }

    request.subscribe(res => {
      this.reset();
    });
  }
}
