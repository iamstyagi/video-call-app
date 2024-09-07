import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstagramComponent } from './instagram.component';
import { InstaInboxComponent } from './insta-inbox/insta-inbox.component';
import { NewPostInstaComponent } from './new-post-insta/new-post-insta.component';
import { DeletedInstaPostComponent } from './deleted-insta-post/deleted-insta-post.component';


// const routes: Routes = [{ path: '', component: InstagramComponent }];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: InstagramComponent, children: [
        { path: 'insta-inbox', component: InstaInboxComponent },
        { path: 'insta-post', component: NewPostInstaComponent },
        { path: 'insta-deleted', component: DeletedInstaPostComponent },
      ]
    }
  ])],
  exports: [RouterModule]
})
export class InstagramRoutingModule { }
