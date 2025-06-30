import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Player from '../models/Player.js';
import { generateIdCard } from '../utils/idCardGenerator.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Download ID card
// @route   GET /api/idcards/:playerId/download
// @access  Public
router.get('/:playerId/download', async (req, res, next) => {
  try {
    const player = await Player.findOne({ playerId: req.params.playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    if (!player.idCardGenerated) {
      return res.status(404).json({
        success: false,
        error: 'ID card not generated yet'
      });
    }
    
    const idCardPath = path.join(__dirname, '../', player.idCardPath);
    
    res.download(idCardPath, `ID_Card_${player.playerId}.pdf`, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          error: 'Error downloading ID card'
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    View ID card
// @route   GET /api/idcards/:playerId/view
// @access  Public
router.get('/:playerId/view', async (req, res, next) => {
  try {
    const player = await Player.findOne({ playerId: req.params.playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    if (!player.idCardGenerated) {
      return res.status(404).json({
        success: false,
        error: 'ID card not generated yet'
      });
    }
    
    const idCardPath = path.join(__dirname, '../', player.idCardPath);
    
    // Set proper content type for PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    res.sendFile(idCardPath, (err) => {
      if (err) {
        console.error('File send error:', err);
        res.status(500).json({
          success: false,
          error: 'Error viewing ID card'
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Generate ID card for existing player
// @route   POST /api/idcards/:playerId/generate
// @access  Public
router.post('/:playerId/generate', async (req, res, next) => {
  try {
    const player = await Player.findOne({ playerId: req.params.playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    // Generate ID card
    const idCardPath = await generateIdCard(player);
    
    // Update player
    player.idCardGenerated = true;
    player.idCardPath = idCardPath;
    await player.save();
    
    res.json({
      success: true,
      message: 'ID card generated successfully!',
      idCardPath: player.idCardPath
    });
  } catch (error) {
    next(error);
  }
});

export default router; 