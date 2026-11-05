# Guía de Sincronización en la Nube: PROPIEDADES PREMIER
**Herramientas Oficiales:** GitHub Enterprise, Linear / GitHub Projects, Cloudflare, Supabase / AWS.

---

## 1. Conexión del Repositorio a GitHub

Para subir este proyecto a tu organización o cuenta de GitHub:

```bash
# 1. Crear el repositorio en GitHub (ej: propiedades-premier-core)
# 2. Agregar el origen remoto y hacer el primer commit
git add .
git commit -m "feat(core): initial enterprise scaffolding, governance and project management plan"
git branch -M main
git remote add origin https://github.com/<tu-usuario-o-organizacion>/propiedades-premier-core.git
git push -u origin main
```

---

## 2. Importación Inmediata al Gestor de Proyectos en la Nube

Hemos preparado el archivo con los **34 paquetes de trabajo (User Stories y Tareas)** divididos en 9 Sprints:
📁 `docs/project-management/PROJECT_MANAGEMENT_IMPORT.csv`

### Opción A: Importar en Linear (Recomendado para Startups & Tech)
1. Entra a tu espacio de trabajo en [Linear](https://linear.app).
2. Ve a **Settings > Workspace > Import / Export**.
3. Selecciona **Import via CSV**.
4. Sube el archivo `docs/project-management/PROJECT_MANAGEMENT_IMPORT.csv`.
5. Mapea las columnas automáticas (`Title`, `Description`, `Status`, `Priority`, `Sprint`, `Epic`).
6. *¡Listo!* Tendrás el Roadmap visual, las Epics y los 9 Sprints configurados al instante.

### Opción B: Importar en GitHub Projects
1. En tu repositorio de GitHub, haz clic en la pestaña **Projects** > **New Project**.
2. Selecciona la plantilla **Team Planning / Roadmap**.
3. Conecta el tablero con las issues generadas por el archivo CSV o utiliza la GitHub CLI:
   ```bash
   gh project item-create <project-number> --owner <org> --title "PRO-001..."
   ```

---

## 3. Infraestructura Cloud Requerida para los Ambientes

1. **Base de Datos PostgreSQL 16 con PostGIS:**
   * Proveedor recomendado: **Supabase** (tier Pro o Enterprise) o **Neon / AWS RDS**.
   * Activar extensión: `CREATE EXTENSION postgis;`.
2. **Almacenamiento Multimedia (Zero Egress Fees):**
   * Proveedor: **Cloudflare R2**.
   * Nombre de bucket: `propiedades-premier-media-prod`.
   * Habilitar dominio personalizado con SSL para entrega rápida vía CDN.
3. **Plataformas de Pago (Ecuador):**
   * Crear cuenta de comercio en **Payphone Developer Portal** y solicitar credenciales API de producción y sandbox.
   * Solicitar credenciales de integración para **Deuna (Banco Pichincha)**.
