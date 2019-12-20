import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule
    ],
    exports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule,
        MenuComponent
    ]
})
export class SharedModule {
}
