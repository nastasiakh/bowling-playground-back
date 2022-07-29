import * as express from "express";
import {UsersRepository} from "./user.repository";
import {Router} from "express";

export class UsersController {
  private users: UsersRepository;

  constructor(users: UsersRepository) {
    this.users = users;
  }

  build(): Router {
    const router = express.Router();
    router.get("/", async (req, res) => {
      const all = await this.users.getAll();
      res.send(all);
    });

    router.post("/", async (req, res) => {
      const id = await this.users.create(req.body);
      res.send({...req.body, id});
    });
    return router;
  }
}

//   async create(@Body() user: SignUpCredentials): Promise<string> {
//     const uid = await this.userService.create({
//       email: user.email,
//       password: user.password,
//     });
//     return uid;
//   }
//
//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() user: ProfileInfoRequest,
//   ): Promise<ProfileInfoRequest> {
//     const { name, gender, birthday } = await this.userService.update(id, {
//       name: user.name,
//       gender: user.gender,
//       birthday: user.birthday,
//     });
//     return { id, name, gender, birthday };
//   }
// }
