Auth Dashboard SaaS

Aplicación web que simula un sistema de autenticación moderno con flujo completo de login, registro y acceso protegido a un dashboard.

Objetivo del proyecto

Este proyecto fue desarrollado para replicar el flujo de autenticación utilizado en aplicaciones SaaS modernas.

Permite gestionar sesiones de usuario y restringir el acceso a contenido privado mediante rutas protegidas.


Funcionalidades

- Registro de nuevos usuarios
- Inicio de sesión con validación
- Persistencia de sesión con localStorage
- Protección de rutas
- Redirección automática según estado de sesión
- Dashboard privado
- Logout

Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- LocalStorage

Flujo de autenticación

1. Usuario se registra
2. Se almacena en localStorage
3. Usuario inicia sesión
4. Se guarda la sesión activa
5. Accede al dashboard protegido
6. Puede cerrar sesión


Notas

Este proyecto utiliza almacenamiento local para simular autenticación sin backend.

Puede escalarse fácilmente a una implementación real con APIs y bases de datos.

---

## 📦 Instalación local

```bash
npm install
npm run dev
