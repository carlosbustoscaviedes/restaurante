import { Component, OnInit } from '@angular/core';

/*------conectar servicios-------*/
import { RestauranteService } from 'src/app/services/restaurante.service';


/*---------usar rutas ROUTER-----------*/
import { Router, ActivatedRoute } from "@angular/router"



/*-------conectar servivio JS-------------*/
import { CargaJSService } from 'src/app/services/carga-js.service';



/*----formGroup----*/
import { FormGroup, FormBuilder } from "@angular/forms"




/*---importar jquery---*/
import * as $ from 'jquery';
import * as jQuery from 'jquery';



@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})

export class RestaurantesComponent implements OnInit {

  /*--select por defecto----*/
  selectForm:any = FormGroup;



  /*---saludo inicial---*/
    nombrePersona:any;

    departamentos:any = []/*---todos los departamentos--*/

    ciudades:any = []

    elegir_comida = false;
    nombreCategoria = ""


    ocultarSaludo = false;


    /*-------filtro por categoria de comida-----*/
    categoriaPorComida:any = []



    /*---conetendores visuales----*/
    contenedorRestaurantes = true;
    contenedorVacio = false;
    contenedorCategoriaRestaurante = false;
    noHayCategoria = false;

    quitarSelectTodasCiudades = false;




    /*---resultado de restaurantes en la ciudad---*/
    guardarArrRestaurante:any = []



    /*-----datos que vienen del cliente-----*/
    DepartamentoCliente:any;
    CiudadCliente:any;
    /*-----datos que vienen del cliente-----*/



    /*---------guardar categoria que viene del inicio-----------*/
    guardarCategoria:any;



    /*----parametro Recibido del inicio----*/
    parametroRecibido:any;


    verificarFavorito:any

    corazonNormal = true;
    corazonRojo = false;


    constructor( private usarRuta:Router, private conectarServicio:RestauranteService, private cargarJs:CargaJSService, private recibirParametro:ActivatedRoute, private fb:FormBuilder ){

      
      /*---cargar archivo js---*/
      this.cargarJs.carga(['funcion']);
      /*---cargar archivo js---*/

    }




    ngOnInit(): void {

      /*-------------¿esta logueado?--------------*/
      if( localStorage.getItem('correo') ){

          this.corazonNormal = true;

        }else{

          this.corazonNormal = false;
        
      }


      
      /*--------recibir parametro de inicio----------*/
       this.recibirParametro.params.subscribe( resp => {
        console.log( resp['id'] );

        this.guardarCategoria = resp['id'];
        

        this.seleccionarCategoria( 'Carnes' );
      
      
      })

      /*----ejecutar automaticamente la funcion de categoria----*/
      
      


      /*---recibir parametro del inicio----*/
      this.recibirParametro.params
          .subscribe( resp => {

            //console.log('parametroRecibido: ' +  resp['categoria'] )
            this.parametroRecibido = resp['categoria'];
          
          })
      
      /*-----select por defecto------*/
      this.selectForm = this.fb.group({
        departamentoss: 'todos',
        categoriass: this.parametroRecibido,
        ciudadess:""
      })
        
        


      /*--saludo--*/
      this.nombrePersona = localStorage.getItem('nombre');

      if( this.nombrePersona ){
        
        this.ocultarSaludo = true;
      
      }else{
       
        this.ocultarSaludo = false;
      
      }
       /*--fin saludo--*/





      /*----cargar departamentos  por defecto----*/
      this.departamentos = this.conectarServicio.ciudades()
          .subscribe( (resp:any) => {

            this.departamentos = resp;
            console.log( this.departamentos )



          /*------------datos que vienen por defecto de Storage ó por defecto---------*/
          if( localStorage.getItem('departamento') ){

            this.parametroCiudad( this.departamentos, localStorage.getItem('departamento') );

            /*---combos por defecto---*/
            this.selectForm = this.fb.group({
              departamentoss: localStorage.getItem('departamento'),
              categoriass: this.parametroRecibido,
              ciudadess:""
            })

        

          }else{
            
            this.parametroCiudad( this.departamentos, 'todos' );

            /*---combos por defecto---*/
            this.selectForm = this.fb.group({
              departamentoss: 'todos',
              categoriass: this.parametroRecibido,
              ciudadess:""
            })

          } 






          /*--------------ciudad por defecto local Storage ó por defecto---------------*/
          if( localStorage.getItem('ciudad') ){
            
            this.elegirCiudad( localStorage.getItem('ciudad') );
            this.CiudadCliente = localStorage.getItem('ciudad');

            /*---combos por defecto---*/
             this.selectForm = this.fb.group({
              departamentoss : localStorage.getItem('departamento'),
              categoriass    : this.parametroRecibido,
              ciudadess      : localStorage.getItem('ciudad')
            })
      

          }else{
            
            this.elegirCiudad( 'todos' );
            this.CiudadCliente = 'todos'


             /*---combos por defecto---*/
             this.selectForm = this.fb.group({
              departamentoss : 'todos',
              categoriass    : this.parametroRecibido,
              ciudadess      : 'todos'
            
            })

          }
          
           
      })
      

      
    }



    /*----select change---*/
    parametroCiudad( array:any, Posicion:any ){

      if(Posicion == "todos"){
  
        this.quitarSelectTodasCiudades = false;
        /*----traer todos los departementos---*/
        this.conectarServicio.ciudades()
            .subscribe( resp => {
              //console.log(resp)

              this.departamentos = resp;
            
            })

        /*-----------traer todos los restaurantes-------*/
        this.ciudades = []/*--reset select ciudades--*/

        this.conectarServicio.filtrarRestaurantes( Posicion )
        .subscribe( resp => {
            console.log(resp);
            this.guardarArrRestaurante = resp;


            /*-----seleccion Categoria Automatico------*/
            this.seleccionarCategoria( this.parametroRecibido );
        })



        /*---motrar contenedores---*/
        //this.contenedorRestaurantes = true;
        this.contenedorRestaurantes = false;
        this.elegir_comida = true;
        this.contenedorVacio = false;
        this.noHayCategoria = false;

      
      }else{

        this.quitarSelectTodasCiudades = true;
        this.ciudades = array[ Posicion ].ciudades
      
      }
       
    }
    




    /*----select change---*/
    elegirCiudad( ciudad:any ){


      this.contenedorRestaurantes = true;
      this.contenedorCategoriaRestaurante = false;

      
      //console.log( ciudad );
      this.CiudadCliente = ciudad;

        this.conectarServicio.filtrarRestaurantes( ciudad )
          .subscribe( resp => {

            if( resp.length > 0 ){  

              this.guardarArrRestaurante = resp;
              console.log(resp);

              /*---motrar contenedores---*/
              this.elegir_comida = true;
              this.contenedorVacio = false;
              this.noHayCategoria = false;


               /*-----seleccion Categoria Automatico------*/
              this.seleccionarCategoria( this.parametroRecibido );

            
            }else{

              console.log("no se encontraron registros");

               /*---motrar contenedores---*/
               this.contenedorRestaurantes = false;
               this.elegir_comida = false;
               this.contenedorVacio = true;
               this.contenedorCategoriaRestaurante = false;

            }

          })
    
    }



    seleccionarCategoria( categoria:any){


      this.nombreCategoria = categoria
      console.log( this.guardarArrRestaurante )

      let RestaurantPorCategoria:any = []

      Object.values( this.guardarArrRestaurante ).forEach( (resp:any) => {
        
        let todosLosRestaurante = resp;
        let todasLasCategorias  = resp.categoria;
        console.log("categorias: " + todasLasCategorias )

        if( todasLasCategorias.indexOf( categoria ) >= 0 ){

          RestaurantPorCategoria.push(todosLosRestaurante);

          this.contenedorRestaurantes = false;
          this.contenedorCategoriaRestaurante = true;

          

        }

      })



   
      this.categoriaPorComida = RestaurantPorCategoria 

      if(this.categoriaPorComida.length > 0){

        
        console.log("hay restaurante");
        this.noHayCategoria = false;
      
      }else{

        if(categoria == "Todos"){

          /*--reset--*/
          this.categoriaPorComida = this.guardarArrRestaurante;
          this.contenedorCategoriaRestaurante = true;
          this.noHayCategoria = false;
          

        }else{

          console.log("no hay restaurante");
          this.noHayCategoria = true;
          this.contenedorCategoriaRestaurante = false;
          this.contenedorRestaurantes = false;

        }
        

      }
      
    }



    verRestaurante(id:any){

      //console.log(id);
      this.usarRuta.navigate([ 'restaurante', id ])

      localStorage.setItem( 'id', id );
      
    }



    /*---------------------FAVORITOS-------------------*/
    agregarFavoritos( data:any, i:number ){

      console.log(data)
      
      this.conectarServicio.registrarFavorito( data )
      .subscribe( resp => {
          console.log( resp )

          this.verificarFavorito = resp.id
          
          $(`#favorito${i}`).css('display', 'none');
          $(`#favoritoH${i}`).css('display', 'block');


        })

       
    }

    /*--
    borrarCategoria( i:any ){

          $(`#favorito${i}`).css('display', 'block');
          $(`#favoritoH${i}`).css('display', 'none');

    }
    --*/



             
  
   


    
    
}
