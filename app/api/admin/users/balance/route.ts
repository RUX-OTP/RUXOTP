import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch (err) {
    redirect("/"); // redirect non-admins
  }

  return (
    <div>
      {/* Admin UI here */}
    </div>
  );
}
