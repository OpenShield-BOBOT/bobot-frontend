import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotPage } from './features/chatbot/pages/chatbot/chatbot.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
