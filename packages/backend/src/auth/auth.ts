import { prismaService } from '../prisma';
import { auth } from '../utils/database';

class AuthService {
  async validateUserTokenExist(token: string) {
    try {
      const authUser = await auth.verifyIdToken(token);
      const user = await prismaService.client.user.findUnique({
        where: {
          id: authUser.uid
        }
      });

      return user;
    } catch (e) {
      return undefined;
    }
  }
}

export const authService = new AuthService();
