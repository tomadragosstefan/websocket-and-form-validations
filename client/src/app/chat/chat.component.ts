import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  message: string = "";
  chatForm: FormGroup = new FormGroup("");
  
  constructor(private socketService: SocketIoService) {}

    ngOnInit(){

      this.socketService.listenToServer().subscribe((message) => {
        this.onGetMessage(message);
      })

      this.chatForm = new FormGroup({
        message: new FormControl("",[Validators.required])
      });
    }

    onSubmit(){
      this.message = this.chatForm.get("message")?.value;
      this.sendMessage();
      this.chatForm.reset();
    }

    onGetMessage(message: string){
      this.messages.push(message);
    }

    sendMessage(): void {
      this.socketService.emitToServer(this.message);
    }

}
