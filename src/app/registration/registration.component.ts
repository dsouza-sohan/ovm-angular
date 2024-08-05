// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.scss'
// })
// export class RegistrationComponent {

// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    
})
export class RegistrationComponent  implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    onSubmit(form:any){
        console.log(form.value)
    }

    openLoginPage(){
        this.router.navigateByUrl("");
    }
  }
