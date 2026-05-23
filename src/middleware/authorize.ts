import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest, AdminRole, ErrorCode } from '../types/index.js';
import type { IAdmin } from '../models/admin.model.js';

export function authorize(...roles: AdminRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Role from session or cookie
    const role = (req.user as IAdmin | undefined)?.role ?? req.admin?.role;

    if (!role || !roles.includes(role as AdminRole)) {
      res.status(403).json({
        success: false,
        error: { 
          code: 'FORBIDDEN' as ErrorCode, 
          message: 'Insufficient permissions.' 
        },
      });
      return;
    }

    next();
  };
}