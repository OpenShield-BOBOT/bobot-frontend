import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MATERIAL_IMPORTS} from '../../shared/material/material.imports';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MATERIAL_IMPORTS],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
