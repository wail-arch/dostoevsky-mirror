import { notFound } from "next/navigation";
import { ResultPreviewPage } from "../../../components/admin/ResultPreviewPage";

export default async function AdminResultPreviewRoute({
  searchParams
}: {
  searchParams: Promise<{ character?: string }>;
}) {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_ADMIN_PREVIEW !== "true") {
    notFound();
  }

  const params = await searchParams;

  return <ResultPreviewPage initialCharacterId={params.character} />;
}
