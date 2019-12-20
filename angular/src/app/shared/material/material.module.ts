import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatInputModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatGridListModule,
        MatInputModule
    ]
})
export class MaterialModule { }
