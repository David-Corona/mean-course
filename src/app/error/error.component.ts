import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  // to retrieve the data sent from interceptor, we inject the dialog data
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}
