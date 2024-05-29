import { Anton } from 'next/font/google';

/**
 * @fileoverview Este archivo contiene funciones de utilidad para agregar y exportar fuentes a utilizar en el proyecto.
 * @module utils/fonts
 * @requires next/font/google
 */

// Fuente Anton importada desde Google Fonts.
export const anton = Anton({ 
    subsets: ['latin'], 
    weight: '400'
});