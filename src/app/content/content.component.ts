import { AxiosService } from './../service/axios.service';
import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [LoginComponent]
})
export class ContentComponent {


}
