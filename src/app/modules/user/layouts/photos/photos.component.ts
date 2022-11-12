import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @ViewChild ("videoPlayer") videoplayer !: ElementRef

  public photo : SafeUrl = ""

  private facingMode : "user" | "environment" = "user"

  private stream : MediaStream | undefined

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.start()
  }

  public async takePhoto(){
    if(this.stream){
      const track : MediaStreamTrack = this.stream.getVideoTracks()[0]
      const imageCapture : ImageCapture = new ImageCapture(track)
      const photo : Blob = await imageCapture.takePhoto()
      const objectURL = URL.createObjectURL(photo)
      this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL)
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

}
