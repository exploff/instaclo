import { DialogComponent } from './dialog/dialog.component';
import { StorageService } from './../../services/storage/storage.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../models/image.model';
import { Timestamp } from 'firebase/firestore';
import { ImageService } from '../../services/image/image.service';
import { UploadResult } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnDestroy {

  @ViewChild("videoPlayer") videoplayer !: ElementRef
  @ViewChild("imageDisplay") imageDisplay !: ElementRef

  public photo !: File

  public photoName !: string

  public takePhotoClick: boolean = false

  private facingMode: "user" | "environment" = "user"

  private stream: MediaStream | undefined

  public showCamera: boolean = false

  public user!: User;

  public postForm = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  constructor(private sanitizer: DomSanitizer, private router: Router, private storageService: StorageService, private imageService: ImageService,public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkCamera()
    this.getCurrentUser()
  }

  ngOnDestroy() {
    this.stream?.getTracks()?.forEach((track) => {
      track.stop()
    })
  }

  public choosePhoto(){
    this.takePhotoClick = true
    this.openDialog("","compatibilite")
  }
  public async takePhoto() {
    if (this.stream) {
      this.takePhotoClick = true
      const track: MediaStreamTrack = this.stream.getVideoTracks()[0]
      const imageCapture: ImageCapture = new ImageCapture(track)
      const photo: Blob = await imageCapture.takePhoto()
      const objectURL = URL.createObjectURL(photo)
      this.imageDisplay.nativeElement.src = objectURL


      const date = new Date()
      this.photoName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}.jpg`

      this.photo = new File([photo], this.photoName, { type: "image/jpg", });
      this.stop()

    }
  }
  public async switchCamera(): Promise<void> {
    if (await this.hasMultipleCamera()) {
      this.facingMode = this.facingMode === "user" ? "environment" : "user"
    }
    this.stream?.getTracks()?.forEach((track) => {
      track.stop()
    })
    this.start()
  }

  public async start(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: this.facingMode } })
      this.videoplayer.nativeElement.srcObject = this.stream;
      this.videoplayer.nativeElement.play()
    } catch (error) {
      alert(error)
    }
  }

  public stop(): void {
    this.stream?.getTracks()?.forEach((track) => {
      track.stop();
    })
  }

  public async hasMultipleCamera(): Promise<boolean> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "videoinput").length > 1
  }

  public onBack(): void {
    this.takePhotoClick = false
    this.router.navigateByUrl('/user/photos')
    window.location.reload();
  }

  public onContinue() {
    this.storageService.uploadFile(this.photo, `/images/${this.photoName}`).then(async (u: UploadResult): Promise<void> => {
      console.log(
        u.metadata)
      let fullpath = await this.storageService.getFileDownloadUrl(`/images/${this.photoName}`)
      if (this.postForm.value.description) {
        const datePhoto = Date.now()
        let image: Image = {
          id: '',
          userID: this.user.id,
          path: fullpath,
          createDate: new Timestamp(datePhoto / 1000, datePhoto / 1000000),
          description: this.postForm.value.description,
          like: [],
          comments: []
        }
        let addImage = await this.imageService.addNewImage(image)
        image.id = addImage.id
        let retunval = await this.imageService.updateImage(image)
        this.router.navigateByUrl('/user/home')
        //TODO error camera firefox
        //TODO add emoji keyboard
      }
    })

  }

  checkCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: this.facingMode } }).then(flux => {

      if (flux instanceof MediaStream) {
        this.stream = flux;
        const track: MediaStreamTrack = this.stream.getVideoTracks()[0]
        this.stream?.getTracks()?.forEach((track) => {
          track.stop();
        })
        try {
          new ImageCapture(track)
          this.showCamera = true
          this.start()
        } catch (error) {

          this.openDialog("Cette fonctionnalité n'est pas disponible sur ce support","compatibilite")
        }
      }
    }).catch(error =>{
     this.openDialog("Merci de bien vouloir autoriser la caméra","autorisation")
    })
  }

  openDialog(message:string,type:"autorisation"|"compatibilite"): void {
    this.stop()
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data:{message: message,type:type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==="Autoriser"){
        this.router.navigateByUrl('/user/photos')
      }else if (result==="Quitter"){
        this.router.navigateByUrl('/user/home')
      }else{
        this.showCamera=true
        this.takePhotoClick = true

        const blob = new Blob([result],{type: result.type})
        let url = URL.createObjectURL(blob);

        setTimeout(()=>this.imageDisplay.nativeElement.src = url, 30);
        this.photo = result;
      }
    });
  }
  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.user = this.route.snapshot.data['currentUser'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }


}
