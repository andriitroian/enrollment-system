import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';

const materialModules = [
	MatInputModule,
	MatFormFieldModule,
	MatSelectModule,
	MatButtonModule
];

@NgModule({
	imports: materialModules,
	exports: materialModules
})
export class MaterialModule { }
