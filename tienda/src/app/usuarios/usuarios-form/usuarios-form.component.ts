import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion, UserType, Usuario } from 'src/app/models/Usuario';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent {
  
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    dni: [null, Validators.required],
    email: [null, Validators.required],
    tipoUsuario: [null, Validators.required],
    clave: [null, Validators.required],
    direcciones: [null, Validators.required],
  });

  userTypesValues = Object.values(UserType);

  usuarioEditado:Usuario = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    username: "",
    clave: "",
    tipoUsuario: UserType.CLIENT,
    direcciones: []
  };

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private route:ActivatedRoute, private router:Router, private _snackBarService: SnackBarService) {
    this.reset();
  }

  reset() {
    this.usuarioEditado = {
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      username: "",
      clave: "",
      tipoUsuario: UserType.CLIENT,
      direcciones: []
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      if(typeof params.id !== "undefined")  {
        this.usuariosService.findUsuarioById(params.id).subscribe(data => {
          console.log(data);
          if(data._id === params.id) {
            this.usuarioEditado = data;
            console.log(this.usuarioEditado);
            this.lanzarFormularioEditar();
          } else {
            this.router.navigate(["/usuarios"]);
          }
        });
      }
    this.lanzarFormularioEditar();
    });
  }

  lanzarFormularioEditar() {
    this.addressForm = this.fb.group(this.usuarioEditado);
    //direcciones
    this.addressForm.setControl("direcciones", this.fb.array([]));
    if(this.usuarioEditado.direcciones.length!=0) {
      this.usuarioEditado.direcciones.forEach(dir => {
        this.addDireccion(dir);
      });
    }
  }

  //DIRECIONES

  getDireccionesFormArray(): FormArray {
    return (this.addressForm.get("direcciones") as FormArray);
  }

  createDireccionItem(dir:Direccion):FormGroup {
    return this.fb.group(dir);
  } 

  addDireccion(dir?:Direccion): void {
    if(typeof dir === "undefined") {
      dir = {
        "calle": "",
        "localidad": "",
        "provincia": "",
        "cp" :""
      };
    }
    
    this.getDireccionesFormArray().push(this.createDireccionItem(dir));
  }

  delDireccion(i:number) {
    //this.usuario.direcciones.splice(i, 1);
    this.getDireccionesFormArray().removeAt(i);
  }

  onSubmit(){
    this.usuarioEditado = this.addressForm.value;
    let request;
    if(typeof this.usuarioEditado._id !=="undefined") {
      request = this.usuariosService.editarUsuario(this.usuarioEditado);
      this._snackBarService.openSnackBar('usuario', 'editado');
      this.router.navigate(["/usuarios"]);
    } else {
      request = this.usuariosService.insertUsuario(this.usuarioEditado);
      this._snackBarService.openSnackBar('usuario', 'insertado');
      this.router.navigate(["/usuarios"]);
    }

    request.subscribe(res => {
      this.reset();
    });
  }



  

  
}
