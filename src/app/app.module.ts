import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component'; 

/*----importar formularios---*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms' 

/*-----importar HttpClientModule----*/
import { HttpClientModule } from '@angular/common/http';
import { LoginRestauranteComponent } from './pages/login-restaurante/login-restaurante.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    RestaurantesComponent,
    LoginClienteComponent,
    RegistroClienteComponent,
    RestauranteComponent,
    RegistroRestauranteComponent,
    LoginRestauranteComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
