import { StorageService } from './../../services/storage/storage.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Image } from '../../models/image.model';
import { Timestamp } from 'firebase/firestore';
import { ImageService } from '../../services/image/image.service';
import { UploadResult } from '@angular/fire/storage';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {

  @ViewChild ("videoPlayer") videoplayer !: ElementRef
  @ViewChild("imageDisplay") imageDisplay !: ElementRef

  public photo !: File

  public photoName !: string

  public takePhotoClick : boolean = false

  private facingMode : "user" | "environment" = "user"

  private stream : MediaStream | undefined

  public showCamera :boolean = false

  //TODO validator
  public postForm  = new FormGroup({
    discription: new FormControl('',Validators.required),
  });

  constructor(private sanitizer : DomSanitizer, private router: Router , private storageService:StorageService, private imageService:ImageService) { }

  async ngOnInit() {

    await this.checkCamera()
    if(this.showCamera){
      this.start()
    }

  }

  ngOnDestroy() {
    this.stream?.getTracks()?.forEach( (track)=>{
      track.stop()
    } )
  }

  public async takePhoto(){
    if(this.stream){
      this.takePhotoClick=true
      const track : MediaStreamTrack = this.stream.getVideoTracks()[0]
      const imageCapture : ImageCapture = new ImageCapture(track)
      const photo : Blob = await imageCapture.takePhoto()
      const objectURL = URL.createObjectURL(photo)
      this.imageDisplay.nativeElement.src= objectURL


      const date= new Date()
      this.photoName= `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}.jpg`

      this.photo = new File([photo], this.photoName,{ type: "image/jpg",});
      this.stop()

    }
  }
   public async switchCamera():Promise<void>{
    if(await this.hasMultipleCamera()){
      this.facingMode = this.facingMode === "user" ? "environment": "user"
    }
    this.stream?.getTracks()?.forEach( (track)=>{
      track.stop()
    } )
    this.start()
  }

  public async start():Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: this.facingMode }})
      this.videoplayer.nativeElement.srcObject = this.stream;
      this.videoplayer.nativeElement.play()
    } catch (error) {
      alert(error)
    }
  }

  public stop():void{
    this.stream?.getTracks()?.forEach((track) =>{
      track.stop();
    })
  }

  public async hasMultipleCamera():Promise<boolean>{
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "videoinput" ).length > 1
  }

  public onBack():void{
    this.takePhotoClick=false
    this.router.navigateByUrl('/user/photos')
    window.location.reload();
  }

  public onContinue(){


    this.storageService.uploadFile(this.photo,`/images/${this.photoName}`).then(async (u:UploadResult): Promise<void> => {
      console.log(
        u.metadata)
      let fullpath= await this.storageService.getFileDownloadUrl(`/images/${this.photoName}`)
      if(this.postForm.value.discription){
      const datePhoto=Date.now()
      let image:Image ={id:'',
      userID:'Wx1Vl4mCelUYJIsOYZrx',
      path:fullpath,
      createDate:new Timestamp( datePhoto / 1000,datePhoto / 1000000 ),
      description:this.postForm.value.discription,
      like:[]}
      let addImage=await this.imageService.addNewImage(image)
      image.id=addImage.id
      let retunval=await this.imageService.updateImage(image)
      this.router.navigateByUrl('/user/home')
      //TODO error camera firefox
      //TODO add emoji keyboard
    }
    })

  }

  async checkCamera():Promise<void>{
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: this.facingMode }})

      const track : MediaStreamTrack = this.stream.getVideoTracks()[0]
      this.stream?.getTracks()?.forEach((track) =>{
          track.stop();
        })
      try {
        const imageCapture : ImageCapture = new ImageCapture(track)
        this.showCamera=true
        }catch(error){
          alert("Cette fonctionnalité n'est pas disponible sur ce support");
          this.router.navigateByUrl('/user/home')
        }
      }catch(error){
        alert("The request is not allowed by the user agent or the platform in the current context.");
        this.router.navigateByUrl('/user/home')
      }
  }
}
