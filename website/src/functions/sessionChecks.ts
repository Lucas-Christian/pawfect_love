import type { APIQueue } from "./APIQueue";
import { getAdminUser } from "./getAdminUser";
import { getUser } from "./getUser";
import { Session } from "next-auth";

export async function sessionChecks(session: Session, apiQueue: APIQueue): Promise<void> {
  const { body: { user_id } } = await getUser({ name: session.user!.name!, email: session.user!.email!}, apiQueue);
  if(session.user!.email !== process.env["ADMIN_EMAIL"]) return;
  await getAdminUser(user_id, apiQueue);
}