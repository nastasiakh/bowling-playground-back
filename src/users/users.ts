import {createOne, getAll} from "./user.repository";
import express from "express";


const router = express.Router();

router.get("/users", (req, res) => {
  return getAll().then((reference) => {
    reference.map((user) => {
      res.send(user);
    });
  });
});

router.post("/signup/info", (req) => {
  return createOne(req.body);
});

export default router;
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
