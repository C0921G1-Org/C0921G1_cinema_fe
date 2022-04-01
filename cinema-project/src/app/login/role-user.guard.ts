import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';
import Swal from 'sweetalert2';


/**
 *  TuNK
 */
@Injectable({
  providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
  private role: string;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()){
      return true;
    }

    // this.router.navigateByUrl("/")

    this.router.navigate(['/'], {
      queryParams: { returnUrl: state.url }});


    Swal.fire({
      position: 'center',
      background: '#f8f9fa',
      width: 400,
      heightAuto: true,
      icon: 'error',
      title: 'Bạn không có quyền truy cập!\nVui lòng đăng nhập để tiếp tục.',

      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });

    return false;
  }

}
