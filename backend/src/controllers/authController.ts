import prisma from '../config/prismaClient';
import { createJWT } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/validators';

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    error.type = 'input error';
    res.status(401);
    res.json({ message: 'username or email exsit try another one' });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({ message: 'password incorrect' });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: 'Email not found' });
  }
};
