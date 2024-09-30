import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export const userGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isAuthenticated()){
    return true;
  }else
    inject(Router).navigate(['/WebAnime'])
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isAdmin()){
    return true;
  }else
    inject(Router).navigate(['/WebAnime/login'])
    return false;
}