import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/angular/standalone';
import { ServiceService } from '../api/service.service';
import { Router } from '@angular/router';
import {ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  user: any; // Variable para almacenar la información del usuario

  constructor(private service: ServiceService, private toastController: ToastController, private router: Router) { }

  async showRegistrationAlert() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado exitosamente!',
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }


  onSubmitLogin(){
 
    const correo = (document.getElementById('floatingCorreoL') as HTMLInputElement).value;
    const contraseña = (document.getElementById('floatingPasswordL') as HTMLInputElement).value;
    const login = {
      correo: correo,
      password: contraseña

    }

    this.service.loginUser(login).subscribe({
      next: (data) => {
        this.user = data; // Asignar la información al usuario
        console.log("soy el login", data);
        this.router.navigate(['/dashboard']); 
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error); // Manejar errores
      }
    })
   }


    onSubmitRegister(){
       const nombre = (document.getElementById('floatingNombreR') as HTMLInputElement).value;
       const apellido = (document.getElementById('floatingApellidoR') as HTMLInputElement).value;
       const correo = (document.getElementById('floatingCorreoR') as HTMLInputElement).value;
       const contraseña = (document.getElementById('floatingPasswordR') as HTMLInputElement).value;
       console.log(nombre, apellido, correo, contraseña)
         
       
       const createUser= {
    
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: contraseña
    }
 

       this.service.createUser(createUser).subscribe({
        next: (data) => {
          console.log(data); 
          this.showRegistrationAlert();

          (document.getElementById('floatingNombreR') as HTMLInputElement).value = '';
          (document.getElementById('floatingApellidoR') as HTMLInputElement).value = '';
          (document.getElementById('floatingCorreoR') as HTMLInputElement).value = '';
          (document.getElementById('floatingPasswordR') as HTMLInputElement).value = '';
        }
      }) 

    }

  ngOnInit(): void {
    const correo = "helen@gmail.com";
    this.service.getUser(correo).subscribe({
      next: (data) => {
        this.user = data; // Asignar la información al usuario
        console.log(data);
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error); // Manejar errores
      }
    });
    /*     const createUser= {
    
            nombre: "alfredo",
            apellido: "rubiano",
            correo: "alfredo@gmail.com",
            password:  "123456"
        }
        */

        
         const update = {
          nombre: "alfredo",
          apellido: "alevaro",
          correo: "alfredo@gmail.com",
          password:  "123456"

         }

        this.service.updateUser(update).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (error) => {
            console.log('Error al obtener el usuario: ', error);
          }
        })
       
        const deleteCorreo = "helen@gmail.com";
        this.service.deleteUser(deleteCorreo).subscribe({
          next: (data)=>{
            console.log(data);
          },
          error: (error)=>{
            console.log("Error al elimiar el usuario", error);
          }
        })
  }

}
