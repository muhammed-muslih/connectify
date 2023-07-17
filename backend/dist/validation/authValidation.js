"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "please enter name" })
        .min(3, { message: "First name must be atleast 3 characters" })
        .trim(),
    userName: zod_1.z.string({ required_error: "please enter user name" })
        .min(3, { message: "user name must be atleast 3 characters" })
        .trim(),
    email: zod_1.z.string({ required_error: "please enter valid email" })
        .trim().
        toLowerCase().
        email({ message: "please provide valide email" })
        .refine(val => val.endsWith("@gmail.com"), {
        message: "email must be end with @gmail.com"
    }),
    password: zod_1.z.string({ required_error: "please provid password" })
        .trim()
        .min(5, { message: "Password must be atleast 5 characters" })
        .max(15, { message: "assword must be less than 15 characters" })
})
    .strict();
exports.userLoginSchema = zod_1.z.object({
    userName: zod_1.z.string({ required_error: "please enter user name" })
        .min(3, { message: "user name must be atleast 3 characters" })
        .trim(),
    password: zod_1.z.string({ required_error: "please provid password" })
        .trim()
        .min(5, { message: "Password must be atleast 5 characters" })
        .max(15, { message: "assword must be less than 15 characters" })
})
    .strict();
exports.adminLoginSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "please enter valid email" })
        .trim().
        toLowerCase().
        email({ message: "please provide valide email" })
        .refine(val => val.endsWith("@gmail.com"), {
        message: "email must be end with @gmail.com"
    }),
    password: zod_1.z.string({ required_error: "please provid password" })
        .trim()
        .min(5, { message: "Password must be atleast 5 characters" })
        .max(15, { message: "assword must be less than 15 characters" })
})
    .strict();
