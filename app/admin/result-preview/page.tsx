import { ResultPreviewPage } from "../../../components/admin/ResultPreviewPage";

export default async function AdminResultPreviewRoute({
  searchParams
}: {
  searchParams: Promise<{ character?: string }>;
}) {
  const params = await searchParams;

  return <ResultPreviewPage initialCharacterId={params.character} />;
}
