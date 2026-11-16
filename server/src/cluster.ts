/**
 * PROPIEDADES PREMIER - MULTI-CORE CLUSTER MANAGER
 * 
 * Gestiona la concurrencia a nivel de sistema operativo utilizando todos los núcleos de CPU.
 * Resuelve el mito del "mono-hilo" en Node.js al levantar múltiples procesos hijos independientes
 * que comparten el puerto TCP mediante Round-Robin y SO_REUSEPORT.
 * Incluye auto-healing: si un worker cae por excepción no capturada, se recrea en milisegundos.
 */

import cluster from 'node:cluster';
import os from 'node:os';
import { createApp } from './index';
import { CONFIG } from './config/constants';

const availableCPUs = os.cpus().length;
// En servidores grandes (16 núcleos), reservamos recursos o limitamos por configuración
const WORKER_COUNT = parseInt(process.env.WORKER_COUNT || '0', 10) || Math.min(availableCPUs, 8);

export function startCluster(): void {
  if (cluster.isPrimary) {
    console.log(`=======================================================`);
    console.log(`🚀 [CLUSTER MASTER] Iniciando Clúster Multi-Core (PID: ${process.pid})`);
    console.log(`⚡ [HARDWARE] ${availableCPUs} núcleos de CPU detectados en el sistema`);
    console.log(`⚖️ [BALANCEO] Levantando ${WORKER_COUNT} procesos workers en paralelo...`);
    console.log(`🔒 [ALTA DISPONIBILIDAD] Auto-Healing y tolerancia a caídas activa`);
    console.log(`=======================================================`);

    // Fork de workers
    for (let i = 0; i < WORKER_COUNT; i++) {
      const worker = cluster.fork();
      console.log(`  ➔ Worker #${i + 1} lanzado con PID ${worker.process.pid}`);
    }

    // Auto-Healing: Reemplazar inmediatamente cualquier worker que falle
    cluster.on('exit', (worker, code, signal) => {
      console.warn(`⚠️ [CLUSTER ALERT] Worker PID ${worker.process.pid} finalizó (código: ${code}, señal: ${signal}).`);
      console.log(`🔄 [AUTO-HEALING] Desplegando nuevo worker de reemplazo...`);
      const newWorker = cluster.fork();
      console.log(`✅ [RECUPERADO] Nuevo Worker PID ${newWorker.process.pid} operativo.`);
    });

    // Graceful Shutdown del Clúster
    const handleShutdown = (sig: string) => {
      console.log(`\n🛑 [CLUSTER] Señal ${sig} recibida. Cerrando workers ordenadamente...`);
      for (const id in cluster.workers) {
        cluster.workers[id]?.process.kill();
      }
      process.exit(0);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } else {
    // Código que corre dentro de cada proceso Worker independiente
    const app = createApp();
    const server = app.listen(CONFIG.PORT, () => {
      console.log(`  [WORKER ACTIVO PID ${process.pid}] Atendiendo peticiones en puerto ${CONFIG.PORT}`);
    });

    // Graceful shutdown individual
    process.on('SIGTERM', () => {
      server.close(() => {
        process.exit(0);
      });
    });
  }
}

// Ejecución directa si se invoca este archivo
if (process.env.NODE_ENV !== 'test') {
  startCluster();
}
