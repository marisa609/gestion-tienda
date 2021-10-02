import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido, PedidoDetalle } from 'src/app/models/Pedido';
import { Producto } from 'src/app/models/Producto';
import { Usuario } from 'src/app/models/Usuario';
import { ProductosService } from 'src/app/productos/productos.service';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent {
  addressForm = this.fb.group({
    numeroPedido: [null, Validators.required],
    fecha: [null, Validators.required],
    pecioTotal: [null, Validators.required],
    pedidoDetalle: [null, Validators.required],
    cliente: [null, Validators.required],
    direccionEntrega: [null, Validators.required],
  });

  pedidoEditado:Pedido = {
      numeroPedido: "",
      fecha: new Date(),
      pecioTotal: 0,
      pedidoDetalle: [],
      cliente: {
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        idUsuario: ""
      },
      direccionEntrega: {
        calle: "",
        localidad: "",
        provincia: "",
        cp: "",
      },
      
  };

  mostrarCliente = false;
  mostrarDireccionEntrega = false;
  mostrarDetalles = false;

  //USUARIOS
  usuarioSeleccionado!:Usuario;
  usuarios:Usuario[] = []; //usuarios que vamos a mostrar en el select

  //DIRECCIONES
  direccionSeleccionada!:any;

  //PRODUCTOS
  productoSeleccionado!:any;
  productos:Producto[] = [];

  //Calculo del precio total del pedido
  pecioTotal = 0;
  //Calculo del precio total del producto
  pecioTotalProducto = 0;

  constructor(private fb: FormBuilder, private pedidoService: PedidosService, private usuarioService: UsuariosService, private productoService:ProductosService, private route:ActivatedRoute, private router:Router, private _snackBarService: SnackBarService) {
    this.reset();
    
  }
  

  reset() {
    this.pedidoEditado = {
      numeroPedido: "",
      fecha: new Date(),
      pecioTotal: 0,
      cliente: {
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        idUsuario: ""
      },
      direccionEntrega: {
        calle: "",
        localidad: "",
        provincia: "",
        cp: "",
      },
      pedidoDetalle: []
    };
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reset();
      this.traerUsuarios();
      this.traerProductos();
      if(typeof params.id !== "undefined")  {
        this.pedidoService.findPedidoById(params.id).subscribe(data => {
          if(data._id === params.id) {
            this.pedidoEditado = data;
            this.lanzarFormularioEditar();
          } else {
            this.router.navigate(["/pedidos"]);
          }
        })
      }
    this.lanzarFormularioEditar();
    })
  }

  //USUARIOS
  //Llamamos al servicio de usuarios para mostrarlos en el select
  traerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.usuarios.sort((a,b) => { return a.nombre.localeCompare(b.nombre); })
    });
  }

  //Obtenemos el usuario seleccionado
  seleccionUsuario(usuario:string) {
    this.usuarioSeleccionado = JSON.parse(usuario);
    console.log(this.usuarioSeleccionado);
    //Cargamos los datos del cliente seleccionado a nuestro cliente para rellenar sus datos
    this.pedidoEditado.cliente.nombre = this.usuarioSeleccionado.nombre;
    this.pedidoEditado.cliente.apellido = this.usuarioSeleccionado.apellido;
    this.pedidoEditado.cliente.dni = this.usuarioSeleccionado.dni;
    this.pedidoEditado.cliente.email = this.usuarioSeleccionado.email;

    //Le pasamos al formulario los nuevos valores para mostrarlos
    this.addressForm.get("cliente")?.setValue(this.pedidoEditado.cliente);
  }

  //DIRECCIÓN ENTREGA
  seleccionDireccion(direccionSeleccionada:string) {
    this.direccionSeleccionada = JSON.parse(direccionSeleccionada);
    console.log(this.direccionSeleccionada);
    //Cargamos los datos del cliente seleccionado a nuestro cliente para rellenar sus datos
    this.pedidoEditado.direccionEntrega.calle = this.direccionSeleccionada.calle;
    this.pedidoEditado.direccionEntrega.localidad = this.direccionSeleccionada.localidad;
    this.pedidoEditado.direccionEntrega.provincia = this.direccionSeleccionada.provincia;
    this.pedidoEditado.direccionEntrega.cp = this.direccionSeleccionada.cp;

    //Le pasamos al formulario los nuevos valores para mostrarlos
    this.addressForm.get("direccionEntrega")?.setValue(this.pedidoEditado.direccionEntrega);
  }

  traerProductos() {
    this.productoService.getProductos().subscribe(data => {
      console.log(this.productos);
      this.productos = data;
      this.productos.sort((a,b) => { return a.referencia.localeCompare(b.referencia); })
    });
  }

  //PRODUCTO
  seleccionProducto(productoSeleccionado:string) {
    this.productoSeleccionado = JSON.parse(productoSeleccionado);
    console.log("AQUI");
    console.log(this.productoSeleccionado);
    
    //Cargamos los datos del producto seleccionado a nuestro producto para rellenar sus datos
    this.pedidoEditado.pedidoDetalle = this.productoSeleccionado;


  


    //Si queremos que se añadan en cuando selecciona el select del producto
    this.addProducto();

    //Le pasamos al formulario los nuevos valores para mostrarlos
    //this.addressForm.get("pedidoDetalle")?.setValue(this.pedidoEditado.pedidoDetalle);
  }

  lanzarFormularioEditar() {
    this.addressForm = this.fb.group(this.pedidoEditado);
    //Como el precio se va a autocarcular, no se va a poder editar
    //this.addressForm.get('pecioTotal')?.disable();
    //CLIENTE
    this.addressForm.setControl("cliente", this.fb.group(this.pedidoEditado.cliente));
    //No muestro el id del cliente, pero para hacerlo deshabilitadp sería así
    //this.addressForm.get("cliente.idUsuario")?.disable();
    //DIRECCIONES DE ENTREGA
    this.addressForm.setControl("direccionEntrega", this.fb.group(this.pedidoEditado.direccionEntrega));
    //DETALLES
    this.addressForm.setControl("pedidoDetalle", this.fb.array([]));
    if(this.pedidoEditado.pedidoDetalle.length!=0) {
      this.pedidoEditado.pedidoDetalle.forEach(prod => {
        this.addProducto(prod);
      });
    }
  }



  //DIRECCIONES

  addProducto(prod?:PedidoDetalle): void {
    if(typeof prod === "undefined") {
      prod = {
        "cantidad": 0,
        "descuento": 0,
        "refProducto": this.productoSeleccionado.referencia,
        "tituloProducto": this.productoSeleccionado.titulo,
        "precioUnitario": this.productoSeleccionado.precio,
        "precioTotal" : this.productoSeleccionado.precio * this.productoSeleccionado.cantidad
      };
    }
    
    this.getProductosFormArray().push(this.createProductoItem(prod));
  }



  //PRODUCTOS

  delProducto(i:number) {
    //this.usuario.direcciones.splice(i, 1);
    this.getProductosFormArray().removeAt(i);
  }

  getProductosFormArray(): FormArray {
    return (this.addressForm.get("pedidoDetalle") as FormArray);
  }

  createProductoItem(prod:PedidoDetalle):FormGroup {
    return this.fb.group(prod);
  } 

  onSubmit(): void {
    this.pedidoEditado = this.addressForm.value;
    let request;
    if(typeof this.pedidoEditado._id !=="undefined") {
      console.log(this.pedidoEditado);
      request = this.pedidoService.editarPedido(this.pedidoEditado);
      this._snackBarService.openSnackBar('pedido', 'editado');
      this.router.navigate(["/pedidos"]);
    } else {
      console.log(this.pedidoEditado);
      request = this.pedidoService.insertPedido(this.pedidoEditado);
      this._snackBarService.openSnackBar('pedido', 'insertado');
      this.router.navigate(["/pedidos"]);
    }

    request.subscribe(res => {
      this.reset();
    });
  }
}
