import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { UploadResult } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  public user: User | undefined;

  editForm = new FormGroup(
    {
      bio: new FormControl('', [Validators.maxLength(255)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('' , [Validators.required]),
      pseudo: new FormControl('', [Validators.required, Validators.maxLength(12)])
    }
  );


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {}

  public onSubmit(): void {
    if (this.user != undefined) {
      if (this.editForm.valid) {
        this.user.firstName = this.editForm.controls['firstname'].value!;
        this.user.lastName = this.editForm.controls['lastname'].value!;
        this.user.pseudo = this.editForm.controls['pseudo'].value!;
        this.user.bio = this.editForm.controls['bio'].value!;
        this.userService.updateUser(this.user);
        this.router.navigate(['/user/profil/' + this.user.id]);
      }
    }
  }

  ngOnInit(): void {
    try {
      let uid = this.authenticationService.getUserUID();
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((user) => {
          this.user = user[0];
          this.editForm.controls['bio'].setValue(this.user.bio);
          this.editForm.controls['firstname'].setValue(this.user.firstName);
          this.editForm.controls['lastname'].setValue(this.user.lastName);
          this.editForm.controls['pseudo'].setValue(this.user.pseudo);
        });
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      let fileName = file.name + "_" + Date.now();
      console.log(fileName);
      this.storageService.uploadFile(file, `/images/${fileName}`).then(async (u: UploadResult): Promise<void> => {
        console.log(u.metadata)
        let fullpath = await this.storageService.getFileDownloadUrl(`/images/${fileName}`)
        console.log("modifier le profil" + fullpath);
        if (this.user != undefined) {
          this.user.profilImage = fullpath;
          this.userService.updateUser(this.user);
        }
      })
    }
  }
}
