import express from 'express';
import  teamController from '../controllers/teamController.js';

const router = express.Router();

router.post('/', (req, res, next) => teamController.createTeam(req, res, next));
router.get('/:id', (req, res, next) => teamController.getTeamById(req, res, next));
router.get('/', (req, res, next) => teamController.getAllTeams(req, res, next));
router.get('/:teamId/coach', (req, res, next) => teamController.getCoachByTeamId(req, res, next));
router.put('/:id', (req, res, next) => teamController.updateTeam(req, res, next));
router.delete('/:id', (req, res, next) => teamController.deleteTeam(req, res, next));


export default router;
