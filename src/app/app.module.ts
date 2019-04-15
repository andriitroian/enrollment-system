import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './screens/login/login.component';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {MsalModule} from '@azure/msal-angular';
import {OfficeOAuthSettings} from './utils/utils';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		MaterialModule,
		HttpClientModule,
		MsalModule.forRoot({clientID: OfficeOAuthSettings.appId})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
