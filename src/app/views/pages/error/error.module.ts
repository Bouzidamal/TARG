import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error1Component } from './error1/error1.component';


@NgModule({
  declarations: [
    ErrorComponent,
    Error1Component,
    // Error2Component,
    // Error3Component,
    // Error4Component,
    // Error5Component,
    // Error6Component,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorComponent,
        children: [
          {
            path: 'error-1',
            component: Error1Component,
           }
          // {
          //   path: 'error-2',
          //   component: Error2Component,
          // },
          // {
          //   path: 'error-3',
          //   component: Error3Component,
          // },
          // {
          //   path: 'error-4',
          //   component: Error4Component,
          // },
          // {
          //   path: 'error-5',
          //   component: Error5Component,
          // },
          // {
          //   path: 'error-6',
          //   component: Error6Component,
          // },
        ],
      },
    ]),
  ],
})
export class ErrorModule {}
