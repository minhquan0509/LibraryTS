
import db from "../config/db"
const bcrypt = require('bcrypt');
import express, { Application, Request, Response } from 'express';

abstract class Person {

  private email: string;
  private password: string;
  private firstName: string;
  private lastName: string;
  private address: string;
  private phoneNumber: string;

  constructor(email: string, password: string, firstName: string, lastName: string, address: string, phoneNumber: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getFirstName() {
    return this.firstName;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public getLastName() {
    return this.lastName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public getAddress() {
    return this.address;
  }

  public setAddress(address: string) {
    this.address = address;
  }

  public getPhoneNumber() {
    return this.phoneNumber;
  }

  public setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
  //Abstract method
  abstract editUser(req: Request): any;

  abstract getHomePageUser(req: Request): any;

  public changePassword(req: Request, newPassword: string) {
    this.setPassword(newPassword);
    return db.sequelize.query(`update users set password="${newPassword}" where email="${req.body.email}"`);
  }

}

class Admin extends Person {
  private isAdmin = 1;
  public getIsAdmin() {
    return this.isAdmin;
  }

  public getHomePageUser(req: Request) {
    return db.sequelize.query("select email,firstName,lastName,address,phoneNumber,isAdmin from users");
  }

  public getUsersByEmail(email: string) {
    return db.sequelize.query(`select email,firstName,lastName,address,phoneNumber,isAdmin from users where email like "${email}"`);
  }
  //OK
  public createNewUser(req: Request, password: string) {
    console.log(`New User is added by admin ${this.getEmail()}`);
    return db.sequelize.query(`insert into users(email,firstName,lastName,address,password,isAdmin,phoneNumber) values ("${req.body.email}","${req.body.firstName}","${req.body.lastName}","${req.body.address}","${password}","${req.body.isAdmin}","${req.body.phoneNumber}")`);
  }

  public editUser(req: Request) {
    if (this.getEmail() === req.body.userEmail) {
      this.setFirstName(req.body.userFirstName);
      this.setLastName(req.body.userLastName);
      this.setAddress(req.body.userAddress);
      this.setPhoneNumber(req.body.userPhoneNumber);
    }
    console.log(`The normal user ${req.body.userEmail} is modified by the admin ${this.getEmail()} `);
    return db.sequelize.query(`update users set firstName="${req.body.userFirstName}",lastName="${req.body.userLastName}",address="${req.body.userAddress}",phoneNumber="${req.body.userPhoneNumber}" where email="${req.body.userEmail}"`);
  }

  public deleteUser(req: Request) {
    console.log(`The User is deleted by admin ${this.getEmail()}`);
    return db.sequelize.query(`delete from users where email="${req.body.email}"`);
  }

}

class NormalUser extends Person {
  private isAdmin = 0;
  public getIsAdmin() {
    return this.isAdmin;
  }
  //Override
  public getHomePageUser(req: Request) {
    return db.sequelize.query(`select email,firstName,lastName,address,phoneNumber,isAdmin from users where email="${req.user.email}"`);
  }

  //Override
  public editUser(req: Request) {
    this.setFirstName(req.body.userFirstName);
    this.setLastName(req.body.userLastName);
    this.setAddress(req.body.userAddress);
    this.setPhoneNumber(req.body.userPhoneNumber);
    return db.sequelize.query(`update users set firstName="${req.body.userFirstName}",lastName="${req.body.userLastName}",address="${req.body.userAddress}",phoneNumber="${req.body.userPhoneNumber}" where email="${req.body.userEmail}"`);
  }
}

export default { Admin, NormalUser }
