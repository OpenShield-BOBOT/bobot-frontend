# 🤖 BOBOT Web App — OpenShield

[![Angular](https://img.shields.io/badge/Angular-20-red.svg?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Angular%20Material-3.0-green.svg?logo=angular)](https://material.angular.dev/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-17-purple.svg?logo=primefaces)](https://primeng.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Development-orange.svg)]()

### Plataforma conversacional inteligente para subastas empresariales

El **BOBOT Web App** es una aplicación web desarrollada en **Angular 20** que integra inteligencia artificial conversacional con servicios de subastas, gestión de leads y visualización de métricas.  
Forma parte del ecosistema **OpenShield**, conectándose con el backend basado en Spring Boot.

---

## 🚀 Características principales

- 💬 **Chatbot inteligente (Gemini API)** — asistente virtual con clasificación de intención, FAQ y conexión con la API de subastas.  
- 📊 **Dashboard administrativo** — panel con métricas, gráficos y estadísticas (PrimeNG + Angular Material).  
- 👥 **Gestión de leads** — registro, calificación y seguimiento de clientes potenciales.  
- 🧠 **Integración con IA** — motor de respuestas automáticas basado en Gemini y almacenamiento de historial.  
- 🖼️ **UI moderna** — diseño responsivo con Material Design 3 y animaciones GSAP.  

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|--------------|
| **Angular 20** | Framework SPA principal |
| **TypeScript 5** | Lenguaje base del proyecto |
| **Angular Material 3** | Componentes visuales basados en Material Design |
| **PrimeNG 17** | Gráficos y tablas avanzadas |
| **RxJS + Signals** | Manejo de estado reactivo |
| **Chart.js** | Visualización de métricas |
| **Gemini API** | Respuestas inteligentes del asistente |
| **Spring Boot API (BOBOT Backend)** | Fuente de datos y autenticación |

---

## 🧩 Estructura del proyecto

```bash
src/
 ├─ app/
 │   ├─ core/                    → servicios base, modelos, environment
 │   ├─ features/
 │   │   ├─ chatbot/             → componente y servicio del asistente virtual
 │   │   ├─ dashboard/           → vista principal de métricas
 │   │   ├─ leads/               → gestión de leads y clientes
 │   │   └─ automations/                → login, registro y recuperación
 │   ├─ shared/
 │   │   ├─ components/          → componentes reutilizables (header, sidebar, footer, spinner, etc.)
 │   │   └─ material/            → módulo con imports Angular Material
 │   ├─ pages/
 │   │   └─ home
 │   ├─ layout/
 │   │   ├─ header
 │   │   ├─ layout
 │   │   └─ footer
 │   ├─ app.routes.ts            → configuración de rutas principales
 │   └─ app.component.ts
 ├─ assets/                      → imágenes, íconos y estilos globales
 ├─ environments/                → configuración para dev / prod
 ├─ index.html                   → raíz HTML
 ├─ main.ts                      → punto de entrada Angular
 └─ styles.css                   → estilos globales
```

---

## 🧠 Componentes destacados

| Módulo | Componente | Descripción |
|--------|-------------|-------------|
| Chatbot | `chatbot.component.ts` | Interfaz de conversación con el usuario |
| Dashboard | `dashboard.page.ts` | Panel de métricas y gráficos dinámicos |
| Leads | `leads.page.ts` | Gestión de clientes potenciales |
| Header / Sidebar / Footer | `shared/components/` | Navegación y estructura general |

---

## 🧰 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/OpenShield-BOBOT/bobot-frontend.git
cd bobot-frontend
```

---

### 2️⃣ Instalar dependencias
```bash
npm install
```

---

### 3️⃣ Configurar entorno
Edita el archivo:

```bash
src/environments/environment.ts
```

Y coloca tus valores:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.openshield-bobot.com', // URL del backend Spring Boot
  geminiApiKey: '<TU_API_KEY>',
};
```

---

### 4️⃣ Ejecutar el proyecto
```bash
ng serve
```

Luego abre en el navegador:
```
http://localhost:4200
```

---

## 📦 Versionado

**v1.0.0** → Primer release con módulos de chatbot, dashboard y leads.  
Incluye integración completa con el backend BOBOT, diseño modular y arquitectura escalable.

---

## 🧠 Módulos en desarrollo

- 💾 Historial conversacional persistente  
- 🧩 Configuración dinámica del bot desde el backend  

---

## 📜 Licencia
Este proyecto está bajo licencia **MIT** — consulta el archivo [LICENSE](LICENSE) para más detalles.

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
