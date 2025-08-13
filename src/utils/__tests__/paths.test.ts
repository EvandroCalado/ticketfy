import { describe, expect, it } from 'vitest';

import {
  accountPath,
  forgotPasswordPath,
  homePath,
  resetPasswordPath,
  signInPath,
  signUpPath,
  ticketCreatePath,
  ticketEditPath,
  ticketPath,
  ticketsPath,
} from '../paths';

describe('paths', () => {
  describe('home paths', () => {
    it('should return correct home path', () => {
      expect(homePath()).toBe('/');
    });
  });

  describe('ticket paths', () => {
    it('should return correct tickets path', () => {
      expect(ticketsPath()).toBe('/tickets');
    });

    it('should return correct ticket path with id', () => {
      expect(ticketPath('123')).toBe('/tickets/123');
      expect(ticketPath('abc-def')).toBe('/tickets/abc-def');
    });

    it('should return correct ticket edit path', () => {
      expect(ticketEditPath('123')).toBe('/tickets/edit/123');
      expect(ticketEditPath('abc-def')).toBe('/tickets/edit/abc-def');
    });

    it('should return correct ticket create path', () => {
      expect(ticketCreatePath()).toBe('/tickets/create');
    });
  });

  describe('auth paths', () => {
    it('should return correct sign up path', () => {
      expect(signUpPath()).toBe('/sign-up');
    });

    it('should return correct sign in path', () => {
      expect(signInPath()).toBe('/sign-in');
    });

    it('should return correct forgot password path', () => {
      expect(forgotPasswordPath()).toBe('/forgot-password');
    });

    it('should return correct reset password path', () => {
      expect(resetPasswordPath()).toBe('/reset-password');
    });
  });

  describe('account paths', () => {
    it('should return correct account path', () => {
      expect(accountPath()).toBe('/account');
    });
  });

  describe('path parameters', () => {
    it('should handle special characters in ticket ids', () => {
      expect(ticketPath('ticket-123')).toBe('/tickets/ticket-123');
      expect(ticketEditPath('ticket_456')).toBe('/tickets/edit/ticket_456');
    });

    it('should handle empty string ticket id', () => {
      expect(ticketPath('')).toBe('/tickets/');
      expect(ticketEditPath('')).toBe('/tickets/edit/');
    });
  });
});
