import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy} from 'ngx-quicklink';


const routes: Routes = [
  // Configuración reglas de navegacion
  // {
  //   path: '',
  //   component: LayoutComponent, 
  //   children: [
  //     {
  //       // Redirigir a otra url
  //       path: '',
  //       redirectTo: "/home",
  //       pathMatch: "full"
  //     },
  //     {
  //       path: "home",
  //       component: HomeComponent
  //     },
  //     {
  //       // Paso de parametros por URL
  //       path: "category/:id",
  //       component: CategoryComponent
  //     }
  //   ]
  // }
  
  {
    // Load the routing of Website module
    path: '', 
    loadChildren: () => import('./website/website.module').then(module => module.WebsiteModule),
    data: {
      preload: true,
    }

  },
  {
    // Load the routing of CMS module
    path: 'cms', 
    loadChildren: () => import('./cms/cms.module').then(module => module.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
