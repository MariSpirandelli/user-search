import { Request, Response, Router } from 'express';

import Users from '../../core/users';
import { UserType } from '../../types/user';
import { asyncHandler } from '../errorHandler';
import { BadRequestError, NotFoundError } from '../errors';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const page =
      (req.query.page && parseInt(req.query.page as string, 10)) || 0;
    let pageSize =
      (req.query.size && parseInt(req.query.size as string, 10)) || 50;
    let search = req.query.search as string;
    const type = req.query.type as UserType;

    if (page < 0 || pageSize < 0) {
      throw new BadRequestError('Invalid parameters!');
    }

    // specifying max results to avoid performance issues
    if (pageSize > 100) {
      pageSize = 100;
    }

    // specifying min open search length to avoid performance issues
    if (search && search.trim().length < 3) {
      throw new BadRequestError('Open search must have at least 3 chars');
    }

    if (search) {
      // encoding search string to avoid SQL injection.
      search = Buffer.from(search, 'ascii').toString();
    }

    const users = await Users.getUsers({ page, pageSize, search, type });

    return res.status(200).json(users);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    let user;
    if (id && isNaN(id)) {
      throw new BadRequestError('Invalid user id');
    }
    if (id) {
      user = await Users.get(id);
    }

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return res.status(200).json(user);
  })
);

export = router;
