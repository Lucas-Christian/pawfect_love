import type { Session } from "next-auth";
import { getAdminUser } from "./get/getAdminUser";
import { getUser } from "./get/getUser";

export async function sessionChecks(session: Session): Promise<void> {
  const { body: { user_id } } = await getUser({ name: session.user!.name!, email: session.user!.email!});
  if(session.user!.email === process.env["ADMIN_EMAIL"]) await getAdminUser(user_id.toString());
}