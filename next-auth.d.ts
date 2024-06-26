import { DefaultSession, DefaultUser } from "next-auth";
import { IUserResponse } from "#/types/other/IUser";

export interface KeycloakProfile extends Record<string, any> {
    exp: number
    iat: number
    auth_time: number
    jti: string
    iss: string
    aud: string
    sub: string
    typ: string
    azp: string
    session_state: string
    at_hash: string
    acr: string
    sid: string
    email_verified: boolean
    name: string
    preferred_username: string
    given_name: string
    family_name: string
    email: string
    picture: string
    user: any
  }

  declare module "next-auth" {
    interface Session {
        jwt?: JWT,
        userData : IUserResponse
    }
  }

  declare module "next-auth/jwt" {
    interface JWT extends KeycloakProfile {}
  }