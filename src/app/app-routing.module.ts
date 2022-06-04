import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  {path:'form/builder', component:TaskComponent},
  {path:':form/:answers', component:TaskComponent},
  {path:'',redirectTo:'form/builder', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
