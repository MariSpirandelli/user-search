import { Request, Response, Router } from 'express';

import Users from '../../core/users';
import { asyncHandler } from '../errorHandler';
import { BadRequestError, NotFoundError } from '../errors';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page && parseInt(req.query.page as string, 10);
    const pageSize = req.query.size && parseInt(req.query.size as string, 10);
    const search = req.query.search as string;

    const users = await Users.getUsers({page, pageSize, search});

    return res.status(200).json(users);
  }),
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
  }),
);

export = router;
