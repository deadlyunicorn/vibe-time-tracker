import { ClientFriendlyError } from "..";

export class UserNotLoggedInError extends ClientFriendlyError {
  constructor(userId: number | null) {
    super("Invalid Action", "User is not logged in. User Id: " + userId);
  }
}
