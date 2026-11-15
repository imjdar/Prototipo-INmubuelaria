/**
 * PROPIEDADES PREMIER - AGENT & COMPANY ROUTES
 * 
 * Endpoints públicos para el Directorio de Agentes, Reseñas Verificadas y Constructoras.
 */

import { Router, Request, Response } from 'express';
import { agentRepository, propertyRepository } from '../container';

const router = Router();

// GET /api/v1/agents - Lista de todos los agentes verificados
router.get('/', (_req: Request, res: Response) => {
  const agents = agentRepository.getAllAgents();
  res.status(200).json({
    success: true,
    data: agents
  });
});

// GET /api/v1/agents/companies - Directorio corporativo de inmobiliarias y constructoras
router.get('/companies', (_req: Request, res: Response) => {
  const companies = agentRepository.getAllCompanies();
  res.status(200).json({
    success: true,
    data: companies
  });
});

// GET /api/v1/agents/:id - Perfil público de anunciante detallado con reseñas y propiedades
router.get('/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const agent = agentRepository.getAgentById(id);

  if (!agent) {
    res.status(404).json({
      success: false,
      error: 'AGENTE_NO_ENCONTRADO',
      message: `No se encontró ningún agente con el ID ${id}.`
    });
    return;
  }

  const reviews = agentRepository.getAgentReviews(agent.id);
  const allProperties = propertyRepository.findMany({ limit: 100 });
  const agentProperties = allProperties.properties.filter(p => p.userId === agent.id || p.agent?.name.includes(agent.name.split(' ')[1] || 'Serrano'));

  res.status(200).json({
    success: true,
    data: {
      agent,
      reviews,
      properties: agentProperties
    }
  });
});

export default router;
